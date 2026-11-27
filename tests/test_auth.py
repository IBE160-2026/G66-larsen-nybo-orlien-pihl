"""Tester av registrering, innlogging og utlogging gjennom HTTP (story 1.3–1.5)."""

import json
import logging
import re
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app import accounts
from app.config import Settings
from app.main import create_app

TESTBRUKER = json.loads(
    (Path(__file__).parent / "fixtures" / "testbruker.json").read_text(encoding="utf-8")
)


def lag_klient(**innstillinger) -> TestClient:
    app = create_app(Settings(_env_file=None, **innstillinger))
    return TestClient(app, follow_redirects=False)


@pytest.fixture
def klient() -> TestClient:
    return lag_klient()


def csrf_fra(klient: TestClient, sti: str) -> str:
    """Henter siden og leser tokenet slik nettleseren ville sendt det tilbake."""
    treff = re.search(r'name="csrf" value="([^"]+)"', klient.get(sti).text)
    return treff.group(1) if treff else klient.cookies["csrf"]


def registrer(klient, epost="ida@eksempel.no", passord="hemmelig-passord"):
    return klient.post(
        "/opprett-konto",
        data={"epost": epost, "passord": passord, "csrf": csrf_fra(klient, "/opprett-konto")},
    )


def logg_inn(klient, epost="ida@eksempel.no", passord="hemmelig-passord"):
    return klient.post(
        "/logg-inn",
        data={"epost": epost, "passord": passord, "csrf": csrf_fra(klient, "/logg-inn")},
    )


# --- Registrering ---


def test_gyldig_registrering_sender_til_innlogging_og_lagrer_konto(klient):
    svar = registrer(klient)
    assert svar.status_code == 303
    assert svar.headers["location"] == "/logg-inn"
    assert klient.app.state.kontoer.finnes("ida@eksempel.no")


@pytest.mark.parametrize(
    ("epost", "passord", "felt", "melding"),
    [
        ("ida", "hemmelig-passord", "epost", accounts.MELDING_EPOST_FORMAT),
        ("x" * 250 + "@e.no", "hemmelig-passord", "epost", accounts.MELDING_EPOST_FORMAT),
        ("ida@eksempel.no", "kort", "passord", accounts.MELDING_PASSORD_KORT),
        ("ida@eksempel.no", "a" * 257, "passord", accounts.MELDING_PASSORD_LANGT),
    ],
)
def test_ugyldig_registrering_viser_melding_ved_feltet(klient, epost, passord, felt, melding):
    svar = registrer(klient, epost, passord)
    assert svar.status_code == 422
    assert melding in svar.text
    assert f'id="{felt}"' in svar.text
    assert 'aria-invalid="true"' in svar.text
    assert not klient.app.state.kontoer.finnes(epost)


def test_epost_beholdes_og_passord_tommes_ved_feil(klient):
    svar = registrer(klient, "ida@eksempel.no", "kort")
    assert 'value="ida@eksempel.no"' in svar.text
    passordfelt = re.findall(r'<input[^>]*name="passord"[^>]*>', svar.text)[0]
    assert "value=" not in passordfelt


def test_forste_ugyldige_felt_far_autofocus(klient):
    begge = registrer(klient, "ida", "kort").text
    bare_passord = registrer(klient, "ida@eksempel.no", "kort").text
    assert re.search(r'id="epost"[^>]*autofocus', begge)
    assert "autofocus" not in re.findall(r'<input[^>]*name="passord"[^>]*>', begge)[0]
    assert re.search(r'id="passord"[^>]*autofocus', bare_passord)


def test_epost_i_bruk_gir_melding_ved_feltet(klient):
    registrer(klient)
    svar = registrer(klient, "IDA@eksempel.no", "annet-passord")
    assert svar.status_code == 422
    assert accounts.MELDING_EPOST_I_BRUK in svar.text


# --- Innlogging ---


def test_innlogging_gir_ny_okt_i_httponly_samesite_cookie_og_viser_epost_og_logg_ut(klient):
    registrer(klient)
    svar = logg_inn(klient)
    assert svar.status_code == 303
    assert svar.headers["location"] == "/"
    cookie = next(c for c in svar.headers.get_list("set-cookie") if c.startswith("okt="))
    assert "HttpOnly" in cookie
    assert "samesite=lax" in cookie.lower()
    forside = klient.get("/")
    assert forside.status_code == 200
    assert "ida@eksempel.no" in forside.text
    assert "Logg ut" in forside.text


@pytest.mark.parametrize(
    ("epost", "passord"), [("ida@eksempel.no", "feil-passord"), ("ukjent@eksempel.no", "x" * 12)]
)
def test_feil_innlogging_gir_samme_melding_for_ukjent_epost_og_feil_passord(klient, epost, passord):
    registrer(klient)
    svar = logg_inn(klient, epost, passord)
    assert svar.status_code == 401
    assert "Feil e-post eller passord." in svar.text
    assert "Sjekk skrivemåten og prøv igjen." in svar.text
    assert 'role="alert"' in svar.text
    assert re.search(r'id="innloggingsfeil"[^>]*autofocus', svar.text)
    assert f'value="{epost}"' in svar.text
    assert passord not in svar.text
    assert "okt=" not in svar.headers.get("set-cookie", "")


def uten_variabler(side: str) -> str:
    """Fjerner det som med rette er ulikt: CSRF-token og den innskrevne e-posten."""
    return re.sub(r'value="[^"]*"', "", side)


def test_ukjent_epost_og_feil_passord_gir_lik_side(klient):
    registrer(klient)
    a = logg_inn(klient, "ida@eksempel.no", "feil-passord-1").text
    b = logg_inn(klient, "ukjent@eksempel.no", "feil-passord-1").text
    assert uten_variabler(a) == uten_variabler(b)


def test_ny_okt_id_ved_hver_innlogging_og_gammel_id_gir_ikke_tilgang(klient):
    registrer(klient)
    logg_inn(klient)
    gammel = klient.cookies["okt"]
    # Logger inn på nytt med den gamle økten som cookie
    logg_inn(klient)
    ny = klient.cookies["okt"]
    assert ny != gammel
    assert klient.app.state.okter.hent(gammel) is None
    gammel_klient = TestClient(klient.app, follow_redirects=False, cookies={"okt": gammel})
    assert gammel_klient.get("/").status_code == 303


def test_uinnlogget_forside_sendes_til_innlogging(klient):
    svar = klient.get("/")
    assert svar.status_code == 303
    assert svar.headers["location"] == "/logg-inn"


def test_innlogget_bruker_sendes_bort_fra_innlogging_og_registrering(klient):
    registrer(klient)
    logg_inn(klient)
    for sti in ("/logg-inn", "/opprett-konto"):
        svar = klient.get(sti)
        assert svar.status_code == 303
        assert svar.headers["location"] == "/"


def test_to_klienter_ser_bare_sin_egen_epost(klient):
    registrer(klient, "ida@eksempel.no")
    registrer(klient, "per@eksempel.no")
    a = TestClient(klient.app, follow_redirects=False)
    b = TestClient(klient.app, follow_redirects=False)
    logg_inn(a, "ida@eksempel.no")
    logg_inn(b, "per@eksempel.no")
    side_a, side_b = a.get("/").text, b.get("/").text
    assert "ida@eksempel.no" in side_a
    assert "per@eksempel.no" not in side_a
    assert "per@eksempel.no" in side_b
    assert "ida@eksempel.no" not in side_b


def test_innskrevet_epost_ekkoes_aldri_som_html(klient):
    farlig = '"><script>alert(1)</script>'
    svar = registrer(klient, farlig, "hemmelig-passord")
    assert "<script>alert(1)</script>" not in svar.text
    assert "&lt;script&gt;" in svar.text


# --- Utlogging ---


def test_utlogging_sletter_okten_straks_og_gammel_id_virker_ikke(klient):
    registrer(klient)
    logg_inn(klient)
    okt_id = klient.cookies["okt"]
    svar = klient.post("/logg-ut", data={"csrf": csrf_fra(klient, "/")})
    assert svar.status_code == 303
    assert svar.headers["location"] == "/logg-inn"
    assert klient.app.state.okter.hent(okt_id) is None
    gammel = TestClient(klient.app, follow_redirects=False, cookies={"okt": okt_id})
    assert gammel.get("/").status_code == 303


# --- CSRF ---


@pytest.mark.parametrize("sti", ["/opprett-konto", "/logg-inn", "/logg-ut"])
def test_post_uten_csrf_avvises_uten_endring(klient, sti):
    svar = klient.post(sti, data={"epost": "ida@eksempel.no", "passord": "hemmelig-passord"})
    assert svar.status_code == 403
    assert "Forespørselen kunne ikke godkjennes." in svar.text
    assert "Last siden på nytt og prøv igjen." in svar.text
    assert not klient.app.state.kontoer.finnes("ida@eksempel.no")


def test_feil_csrf_token_avvises(klient):
    csrf_fra(klient, "/opprett-konto")
    svar = klient.post(
        "/opprett-konto",
        data={"epost": "ida@eksempel.no", "passord": "hemmelig-passord", "csrf": "feil"},
    )
    assert svar.status_code == 403


def test_utlogging_uten_csrf_beholder_okten(klient):
    registrer(klient)
    logg_inn(klient)
    assert klient.post("/logg-ut").status_code == 403
    assert klient.get("/").status_code == 200


# --- Testbruker ---


def test_testbruker_kan_logge_inn_etter_ren_oppstart():
    klient = lag_klient()
    svar = logg_inn(klient, TESTBRUKER["epost"], TESTBRUKER["passord"])
    assert svar.status_code == 303
    assert TESTBRUKER["epost"] in klient.get("/").text


def test_ny_oppstart_mot_samme_database_lager_ingen_ny_testbruker():
    lag_klient()
    klient = lag_klient()
    assert klient.app.state.kontoer.finnes(TESTBRUKER["epost"])
    assert logg_inn(klient, TESTBRUKER["epost"], TESTBRUKER["passord"]).status_code == 303


def test_api_modus_har_ingen_testbruker_og_skjuler_henvisningen():
    klient = lag_klient(mode="api", openai_api_key="test-nokkel")
    assert not klient.app.state.kontoer.finnes(TESTBRUKER["epost"])
    assert "Testbruker står i README." not in klient.get("/logg-inn").text


def test_mock_modus_viser_henvisningen_til_testbrukeren():
    assert "Testbruker står i README." in lag_klient().get("/logg-inn").text


def test_manglende_testbrukerfil_gir_ingen_testbruker(tmp_path):
    klient = lag_klient(testbruker_fil=tmp_path / "finnes-ikke.json")
    assert not klient.app.state.kontoer.finnes(TESTBRUKER["epost"])
    assert klient.get("/logg-inn").status_code == 200


# --- Innloggingssidens faste innhold ---


def test_innloggingssiden_har_fast_tekst_etiketter_og_tittel(klient):
    side = klient.get("/logg-inn").text
    assert "<title>Logg inn – Supersøker</title>" in side
    assert "Supersøker viser hva CV-en din dokumenterer" in side
    for punkt in (
        "Legg inn CV og annonse",
        "Se hvilke krav CV-en dokumenterer",
        "Få en tekst du kan redigere",
    ):
        assert punkt in side
    assert re.search(r'<label[^>]*for="epost"[^>]*>E-post</label>', side)
    assert re.search(r'<label[^>]*for="passord"[^>]*>Passord</label>', side)
    assert "mock-stripe" in side


def test_registreringssiden_lenker_til_innlogging(klient):
    side = klient.get("/opprett-konto").text
    assert "<title>Opprett konto – Supersøker</title>" in side
    assert 'href="/logg-inn"' in side


# --- Logging ---


def test_passord_finnes_ikke_i_loggene(klient, caplog):
    passord = "unikt-passord-for-loggtest"
    with caplog.at_level(logging.DEBUG):
        registrer(klient, "ida@eksempel.no", passord)
        logg_inn(klient, "ida@eksempel.no", passord)
        logg_inn(klient, "ida@eksempel.no", "feil-" + passord)
        registrer(klient, "ida@eksempel.no", passord)
    assert passord not in caplog.text
