import json
from pathlib import Path

import pytest
from fastapi import Request
from fastapi.testclient import TestClient

from app.gap_analyse import (
    ALLE_DOKUMENTERT,
    ANALYSEFEIL,
    BARE_VILKAR,
    INGEN_KRAV,
    UgyldigAnalyse,
    UgyldigSvar,
    valider_analyse,
    valider_svar,
)
from app.main import create_app
from app.routes.steg_2 import vis_steg_2

TESTPAR = Path(__file__).parent / "fixtures" / "job-applications"


def les_testpar(mappe):
    fasit = json.loads((mappe / "fasit.json").read_text(encoding="utf-8"))
    krav = [{"kilde": None, **rad} for rad in fasit["krav"]]
    cv = (mappe / "cv.txt").read_text(encoding="utf-8")
    return {"kompetansekrav": krav, "ansettelsesvilkar": []}, {"cv": cv, **fasit["stilling"]}


@pytest.fixture
def testpar():
    return les_testpar(TESTPAR / "01-mangler-sertifikat")


@pytest.mark.parametrize("mappe", sorted(path for path in TESTPAR.iterdir() if path.is_dir()))
def test_originale_testpar(mappe):
    raasvar, grunnlag = les_testpar(mappe)
    analyse = valider_analyse(raasvar, **grunnlag)
    assert [krav.id for krav in analyse.mangler] == [
        rad["id"] for rad in raasvar["kompetansekrav"] if rad["status"] == "mangler"
    ]
    assert [krav.kilde for krav in analyse.dokumentert] == [
        rad["kilde"] for rad in raasvar["kompetansekrav"] if rad["status"] == "dekket"
    ]
    if mappe.name.startswith("04"):
        assert analyse.melding == ALLE_DOKUMENTERT
        assert not analyse.mangler


@pytest.mark.parametrize("sitat", [None, "", " ", "norsk – morsmål", "Norsk  – morsmål"])
def test_ett_ugyldig_sitat_avviser_hele_analysen(testpar, sitat):
    raasvar, grunnlag = testpar
    raasvar["kompetansekrav"][-1]["kilde"] = sitat
    with pytest.raises(UgyldigAnalyse, match="dokumentasjonen") as feil:
        valider_analyse(raasvar, **grunnlag)
    assert str(feil.value) == ANALYSEFEIL


@pytest.mark.parametrize(
    "felt, verdi",
    [
        ("status", "delvis"),
        ("status", True),
        ("kilde", "Norsk – morsmål"),
        ("id", ""),
        ("id", 42),
        ("id", "norskkunnskaper"),
        ("krav", " "),
    ],
)
def test_ugyldige_krav_avvises(testpar, felt, verdi):
    raasvar, grunnlag = testpar
    raasvar["kompetansekrav"][0][felt] = verdi
    with pytest.raises(UgyldigAnalyse):
        valider_analyse(raasvar, **grunnlag)


@pytest.mark.parametrize("felt", ["id", "krav", "status", "kilde"])
def test_obligatoriske_kravfelt(testpar, felt):
    raasvar, grunnlag = testpar
    del raasvar["kompetansekrav"][1][felt]
    with pytest.raises(UgyldigAnalyse):
        valider_analyse(raasvar, **grunnlag)


@pytest.mark.parametrize(
    "raasvar",
    [
        [],
        {},
        {"kompetansekrav": []},
        {"kompetansekrav": {}, "ansettelsesvilkar": []},
        {"kompetansekrav": [], "ansettelsesvilkar": "Politiattest"},
        {"kompetansekrav": [], "ansettelsesvilkar": [{"vilkar": "Politiattest"}]},
        {"kompetansekrav": [], "ansettelsesvilkar": [" "]},
    ],
)
def test_ugyldig_struktur(testpar, raasvar):
    _, grunnlag = testpar
    with pytest.raises(UgyldigAnalyse):
        valider_analyse(raasvar, **grunnlag)


def test_bekreftede_stillingsfelt_og_vilkar(testpar):
    raasvar, grunnlag = testpar
    raasvar["stilling"] = {"tittel": "Oppdiktet", "arbeidsgiver": "Oppdiktet"}
    raasvar["ansettelsesvilkar"] = ["Politiattest må fremlegges før tiltredelse."]
    analyse = valider_analyse(raasvar, **grunnlag)
    assert (analyse.tittel, analyse.arbeidsgiver) == (grunnlag["tittel"], grunnlag["arbeidsgiver"])
    assert analyse.ansettelsesvilkar == tuple(raasvar["ansettelsesvilkar"])
    assert analyse.melding == "3 av 4 kompetansekrav er dokumentert i CV-en."


@pytest.mark.parametrize("vilkar, melding", [([], INGEN_KRAV), (["Politiattest"], BARE_VILKAR)])
def test_tomtilstander(testpar, vilkar, melding):
    _, grunnlag = testpar
    analyse = valider_analyse({"kompetansekrav": [], "ansettelsesvilkar": vilkar}, **grunnlag)
    assert analyse.melding == melding
    assert not analyse.mangler
    assert not analyse.dokumentert


def test_svargrense_og_negativt_svar(testpar):
    raasvar, grunnlag = testpar
    analyse = valider_analyse(raasvar, **grunnlag)
    krav_id = analyse.mangler[0].id
    assert valider_svar(analyse, {krav_id: "ø" * 1000}) == {krav_id: "ø" * 1000}
    with pytest.raises(UgyldigSvar, match="1 000") as feil:
        valider_svar(analyse, {krav_id: "ø" * 1001})
    assert feil.value.krav_id == krav_id
    svar = "Jeg har ikke førerkort"
    assert valider_svar(analyse, {krav_id: svar}) == {krav_id: svar}
    assert analyse.mangler[0].status == "mangler"
    assert analyse.mangler[0].kilde is None
    assert valider_svar(analyse, {krav_id: " \t\n"}) == {}
    assert valider_svar(analyse, {}) == {}


@pytest.mark.parametrize(
    "svar",
    [
        [],
        {"ukjent": "Tekst"},
        {"norskkunnskaper": "Tekst"},
        {"politiattest": "Tekst"},
        {"forerkort-b": False},
    ],
)
def test_ugyldige_svar(testpar, svar):
    raasvar, grunnlag = testpar
    raasvar["ansettelsesvilkar"] = ["politiattest"]
    with pytest.raises(UgyldigSvar):
        valider_svar(valider_analyse(raasvar, **grunnlag), svar)


def test_steg_2_viser_analyse_og_feltfeil(testpar):
    raasvar, grunnlag = testpar
    raasvar["ansettelsesvilkar"] = ["Politiattest"]
    analyse = valider_analyse(raasvar, **grunnlag)
    app = create_app()
    svar = {"forerkort-b": "<script>" + "ø" * 1000}

    @app.get("/test-steg-2")
    def side(request: Request):
        with pytest.raises(UgyldigSvar) as feil:
            valider_svar(analyse, svar)
        return vis_steg_2(request, analyse, svar=svar, svarfeil=feil.value)

    respons = TestClient(app).get("/test-steg-2")
    assert respons.status_code == 422
    assert respons.headers["cache-control"] == "no-store"
    html = respons.text
    assert html.index("Står ikke i CV-en") < html.index("Dokumentert i CV-en")
    assert html.index("Dokumentert i CV-en") < html.index("Vilkår fra annonsen")
    assert html.count("<textarea") == 1
    assert 'aria-invalid="true"' in html
    assert "Skriv høyst 1 000 tegn i svaret." in html
    assert "&lt;script&gt;" in html
    assert "«Norsk – morsmål»" in html
    assert "Sommervikar i hjemmetjenesten · Testvik kommune" in html


@pytest.mark.parametrize(
    "bruk_krav, vilkar, melding",
    [
        (False, [], INGEN_KRAV),
        (False, ["Politiattest"], BARE_VILKAR),
        (True, ["Politiattest"], ALLE_DOKUMENTERT),
    ],
)
def test_steg_2_spesialtilstander(bruk_krav, vilkar, melding):
    raasvar, grunnlag = les_testpar(TESTPAR / "04-alle-krav-dekket")
    if not bruk_krav:
        raasvar["kompetansekrav"] = []
    raasvar["ansettelsesvilkar"] = vilkar
    analyse = valider_analyse(raasvar, **grunnlag)
    app = create_app()

    @app.get("/test-steg-2")
    def side(request: Request):
        return vis_steg_2(request, analyse, endre_url="/endre", lag_tekst_url="/lag-tekst")

    respons = TestClient(app).get("/test-steg-2")
    assert respons.status_code == 200
    html = respons.text
    assert melding in html
    assert ("Huskeliste" in html) == bruk_krav
    assert ("Vilkår fra annonsen" in html) == bool(vilkar)
    assert "<textarea" not in html
    assert "Helt søknadsutkast" in html
    assert "Forslag til formuleringer" in html
    assert 'href="/endre"' in html
    assert 'action="/lag-tekst"' in html
