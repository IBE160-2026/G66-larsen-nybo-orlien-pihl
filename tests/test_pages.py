"""Tester av forsiden: mock-stripen (FR-26) og siderammen når siden ikke fyller den ut."""

import re

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


def hent_forsiden(**innstillinger) -> str:
    """Siden `/logg-inn` er åpen for alle og har samme ramme som resten."""
    app = create_app(Settings(_env_file=None, **innstillinger))
    svar = TestClient(app).get("/logg-inn")
    assert svar.status_code == 200
    return svar.text


def overskrifter(side: str) -> list[str]:
    funnet = re.findall(r"<h1\b[^>]*>(.*?)</h1>", side, flags=re.S)
    return [re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", h)).strip() for h in funnet]


def test_innloggingssiden_har_en_overskrift_og_ingress():
    side = hent_forsiden()
    assert overskrifter(side) == ["Søknaden din, med dine ord."]
    assert "Supersøker viser hva CV-en din dokumenterer" in side


def test_forsiden_krever_innlogging():
    app = create_app(Settings(_env_file=None))
    svar = TestClient(app, follow_redirects=False).get("/")
    assert svar.status_code == 303
    assert svar.headers["location"] == "/logg-inn"


def test_innlogget_forside_har_overskrift_og_logg_ut():
    klient = TestClient(create_app(Settings(_env_file=None)), follow_redirects=True)
    token = re.search(r'name="csrf" value="([^"]+)"', klient.get("/logg-inn").text).group(1)
    forside = klient.post(
        "/logg-inn",
        data={
            "epost": "testbruker@supersoker.no",
            "passord": "Supersoker-test-2026",
            "csrf": token,
        },
    ).text
    assert overskrifter(forside) == ["Supersøker"]
    assert "Appen er under bygging. Her kommer innlogging og de tre stegene." in forside
    assert "Logg ut" in forside


def test_forsiden_viser_mock_stripen():
    side = hent_forsiden()
    assert 'class="mock-stripe"' in side
    assert "Mock-modus er på – ingen tekst sendes til en språkmodell." in side


def test_api_modus_har_verken_stripe_eller_modustekst():
    side = hent_forsiden(mode="api", openai_api_key="test-nokkel")
    assert "mock-stripe" not in side
    assert "modus" not in side.lower()


def test_innloggingssiden_har_verken_stegindikator_sidekolonne_eller_handlingslinje():
    """Heller ingen tomme beholdere når siden ikke fyller blokkene."""
    side = hent_forsiden()
    for ubrukt in ("<nav", "<aside", "sidekolonne", "handlingslinje", "modellfeil", '"bruker"'):
        assert ubrukt not in side


def test_grunnmalen_har_ikke_felt_eller_huskeliste():
    """Sidene teller felt og søker etter huskelisten. Grunnmalen skal ikke påvirke det."""
    side = hent_forsiden()
    assert "<textarea" not in side
    assert "Huskeliste" not in side


def test_create_app_uten_argumenter_bruker_standardinnstillinger(tmp_path, monkeypatch):
    """Oppstartsveien til uvicorn (--factory) sender ikke inn innstillinger."""
    monkeypatch.chdir(tmp_path)  # tom mappe, så ingen .env påvirker testen
    svar = TestClient(create_app()).get("/logg-inn")
    assert "Mock-modus er på" in svar.text
