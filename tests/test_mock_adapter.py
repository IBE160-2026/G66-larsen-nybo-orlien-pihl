import json
import socket
from dataclasses import replace
from pathlib import Path

import pytest

from app.models.contracts import Mockscenario, Modelladapter, Modellgrunnlag
from app.models.mock import MockAdapter

TESTPAR = Path(__file__).parent / "fixtures" / "job-applications"
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

    for svar in (ja, nei, begrenset):
        tekst = adapter.lag_tekst(grunnlag, analyse.innhold, {gap: svar}, tekstvalg).innhold[
            "tekst"
        ]
        assert tekst.replace(f"{linjestart}{svar}.", "") == uten_svar
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

    resultat = adapter.lag_tekst(
        grunnlag, analyse.innhold, {"forerkort-b": "Jeg har førerkort klasse B"}, tekstvalg
    )
    assert resultat.scenario == analyse.scenario
    assert (
        resultat.innhold
        == adapter.lag_tekst(eksempel, eksempelanalyse.innhold, {}, tekstvalg).innhold
    )


def test_testpar_gjenkjennes_med_crlf(adapter):
    grunnlag, _ = _testpar("03-studieprosjekt-dekker-krav")
    fra_nettleser = replace(
        grunnlag,
        cv=grunnlag.cv.replace("\n", "\r\n"),
        annonse=grunnlag.annonse.replace("\n", "\r\n"),
    )
    assert adapter.analyser(fra_nettleser) == adapter.analyser(grunnlag)
