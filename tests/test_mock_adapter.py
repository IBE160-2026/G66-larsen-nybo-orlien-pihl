import json
import socket
from dataclasses import replace
from pathlib import Path

import pytest

from app.models.contracts import Mockscenario, Modelladapter, Modellgrunnlag
from app.models.mock import MockAdapter

TESTPAR = Path(__file__).parent / "fixtures" / "job-applications"
PDF_MAPPE = Path(__file__).parent / "testgrunnlag" / "pdf"
TEKSTVALG = ("helt_soknadsutkast", "forslag_til_formuleringer")
SCENARIOER = (
    ("01-mangler-sertifikat", "forerkort-b"),
    ("02-mangler-verktoy", "tig-sveising"),
    ("03-studieprosjekt-dekker-krav", "tysk"),
    ("04-alle-krav-dekket", None),
)
SVARVARIANTER = (
    (
        "01-mangler-sertifikat",
        "forerkort-b",
        "Jeg har førerkort klasse B",
        "Jeg har ikke førerkort",
        "Jeg øvelseskjører til klasse B",
    ),
    (
        "02-mangler-verktoy",
        "tig-sveising",
        "Jeg har erfaring med TIG-sveising",
        "Jeg har ikke erfaring med TIG-sveising",
        "Jeg har prøvd TIG-sveising én gang under veiledning",
    ),
    (
        "03-studieprosjekt-dekker-krav",
        "tysk",
        "Jeg kan føre samtaler på tysk",
        "Jeg kan ikke tysk",
        "Jeg kan noen enkle fraser på tysk",
    ),
)


@pytest.fixture
def adapter(monkeypatch) -> Modelladapter:
    def sperr_nettverk(*args, **kwargs):
        pytest.fail("Mock-adapteren forsøkte å bruke nettverket")

    monkeypatch.setattr(socket, "socket", sperr_nettverk)
    monkeypatch.setattr(socket, "getaddrinfo", sperr_nettverk)
    return MockAdapter()


def _testpar(scenario_id):
    mappe = TESTPAR / scenario_id
    fasit = json.loads((mappe / "fasit.json").read_text(encoding="utf-8"))
    grunnlag = Modellgrunnlag(
        cv=(mappe / "cv.txt").read_text(encoding="utf-8"),
        annonse=(mappe / "annonse.txt").read_text(encoding="utf-8"),
        **fasit["stilling"],
    )
    return grunnlag, fasit["krav"]


@pytest.mark.parametrize(("scenario_id", "gap"), SCENARIOER)
def test_analyse_samsvarer_med_fasit_og_cv(adapter, scenario_id, gap):
    grunnlag, fasit = _testpar(scenario_id)
    resultat = adapter.analyser(grunnlag)

    assert resultat.scenario == Mockscenario(scenario_id, fixtureversjon=1)
    assert resultat.innhold["ansettelsesvilkar"] == []
    krav = resultat.innhold["kompetansekrav"]
    assert len(krav) == len(fasit)
    assert {rad["id"]: rad for rad in krav} == {
        rad["id"]: {**rad, "kilde": rad.get("kilde")} for rad in fasit
    }
    assert [rad["id"] for rad in krav if rad["status"] == "mangler"] == ([gap] if gap else [])
    if gap:
        assert krav[0]["id"] == gap
    for rad in krav:
        if rad["status"] == "dekket":
            assert rad["kilde"] and rad["kilde"] in grunnlag.cv

    assert adapter.analyser(grunnlag) == resultat


@pytest.mark.parametrize("tekstvalg", TEKSTVALG)
@pytest.mark.parametrize(("scenario_id", "gap"), SCENARIOER)
def test_begge_tekstvalg_er_deterministiske(adapter, scenario_id, gap, tekstvalg):
    grunnlag, fasit = _testpar(scenario_id)
    analyse = adapter.analyser(grunnlag)
    resultat = adapter.lag_tekst(grunnlag, analyse.innhold, {}, tekstvalg)
    tekst = resultat.innhold["tekst"]

    assert resultat.scenario == analyse.scenario
    assert resultat.innhold["resultattype"] == tekstvalg
    assert grunnlag.tittel in tekst
    assert grunnlag.arbeidsgiver in tekst
    if gap:
        gaptekst = next(rad["krav"] for rad in fasit if rad["id"] == gap)
        assert gaptekst.lower() not in tekst.lower()
    if tekstvalg == "helt_soknadsutkast":
        assert tekst.startswith("Hei,\n\n")
        assert tekst.endswith(f"Vennlig hilsen\n{grunnlag.cv.splitlines()[0]}")
    else:
        assert len(tekst.splitlines()) == 4
        assert all(linje.startswith("- ") for linje in tekst.splitlines())

    assert adapter.lag_tekst(grunnlag, analyse.innhold, {}, tekstvalg) == resultat


@pytest.mark.parametrize("tekstvalg", TEKSTVALG)
@pytest.mark.parametrize(("scenario_id", "gap", "ja", "nei", "begrenset"), SVARVARIANTER)
def test_demosvar_beholder_negasjon_og_nivaa(
    adapter, scenario_id, gap, ja, nei, begrenset, tekstvalg
):
    grunnlag, _ = _testpar(scenario_id)
    analyse = adapter.analyser(grunnlag)
    uten_svar = adapter.lag_tekst(grunnlag, analyse.innhold, {}, tekstvalg).innhold["tekst"]
    linjestart = "\n- " if tekstvalg == "forslag_til_formuleringer" else "\n\n"

    for demosvar in (ja, nei, begrenset):
        varianter = (demosvar, f"  {'  '.join(demosvar.lower().split())}  . .!  ")
        for svar in varianter:
            tekst = adapter.lag_tekst(grunnlag, analyse.innhold, {gap: svar}, tekstvalg).innhold[
                "tekst"
            ]
            assert f"{linjestart}{demosvar}." in tekst
            assert tekst.replace(f"{linjestart}{demosvar}.", "") == uten_svar
    vilkarlig_svar = {gap: f"{ja} er feil. Jeg har ingen slik kompetanse."}
    assert (
        adapter.lag_tekst(grunnlag, analyse.innhold, vilkarlig_svar, tekstvalg).innhold["tekst"]
        == uten_svar
    )
    assert adapter.analyser(grunnlag) == analyse


@pytest.mark.parametrize("tekstvalg", TEKSTVALG)
@pytest.mark.parametrize("endring", [{"cv": "Min egen CV"}, {"annonse": "Min egen annonse"}])
def test_egen_tekst_bruker_merket_eksempelgrunnlag(adapter, tekstvalg, endring):
    eksempel, _ = _testpar("01-mangler-sertifikat")
    grunnlag, _ = _testpar("02-mangler-verktoy")
    grunnlag = replace(grunnlag, **endring)
    eksempelanalyse = adapter.analyser(eksempel)
    analyse = adapter.analyser(grunnlag)

    assert analyse.scenario.scenario_id == "01-mangler-sertifikat"
    assert analyse.scenario.fixtureversjon == 1
    assert "Fiktivt eksempel" in analyse.scenario.merknad
    assert "Din egen tekst er ikke analysert" in analyse.scenario.merknad
    assert analyse.innhold == eksempelanalyse.innhold

    for svar in ("jeg har førerkort klasse B !", "jeg har ikke førerkort ..", "Ukjent svar"):
        demosvar = {"forerkort-b": svar}
        resultat = adapter.lag_tekst(grunnlag, analyse.innhold, demosvar, tekstvalg)
        assert resultat.scenario == analyse.scenario
        assert (
            resultat.innhold
            == adapter.lag_tekst(eksempel, eksempelanalyse.innhold, demosvar, tekstvalg).innhold
        )


def test_testpar_gjenkjennes_med_crlf(adapter):
    grunnlag, _ = _testpar("03-studieprosjekt-dekker-krav")
    fra_nettleser = replace(
        grunnlag,
        cv=grunnlag.cv.replace("\n", "\r\n"),
        annonse=grunnlag.annonse.replace("\n", "\r\n"),
    )
    assert adapter.analyser(fra_nettleser) == adapter.analyser(grunnlag)


@pytest.mark.parametrize("scenario_id", [scenario_id for scenario_id, _ in SCENARIOER])
def test_pdf_gir_riktig_scenario_og_ordrette_sitater(adapter, scenario_id):
    # Kjør med uv run --with pypdf==6.2.0 pytest (samme parser som i PR #14).
    pypdf = pytest.importorskip("pypdf")
    grunnlag, _ = _testpar(scenario_id)
    cv = pypdf.PdfReader(PDF_MAPPE / f"{scenario_id}.pdf").pages[0].extract_text()
    fra_pdf = replace(grunnlag, cv=cv, annonse=" \n\t".join(grunnlag.annonse.split()))

    resultat = adapter.analyser(fra_pdf)

    assert resultat.scenario == Mockscenario(scenario_id, fixtureversjon=1)
    assert resultat == adapter.analyser(grunnlag)
    for rad in resultat.innhold["kompetansekrav"]:
        if rad["status"] == "dekket":
            assert rad["kilde"] and rad["kilde"] in cv


def test_ordlik_cv_uten_ordrett_sitat_gir_merket_eksempel(adapter):
    grunnlag, fasit = _testpar("02-mangler-verktoy")
    sitat = next(rad["kilde"] for rad in fasit if rad["status"] == "dekket")
    cv = grunnlag.cv.replace(sitat, sitat.replace(" ", "\n", 1))
    assert cv.split() == grunnlag.cv.split()
    assert sitat not in cv

    resultat = adapter.analyser(replace(grunnlag, cv=cv))

    assert resultat.scenario.scenario_id == "01-mangler-sertifikat"
    assert "Din egen tekst er ikke analysert" in resultat.scenario.merknad
    assert all(rad["kilde"] != sitat for rad in resultat.innhold["kompetansekrav"])
