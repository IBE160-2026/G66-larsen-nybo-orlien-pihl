"""Lokale, faste demoresultater for de fire fiktive testparene."""

import json
from collections.abc import Mapping
from pathlib import Path
from typing import Literal, NotRequired, TypedDict

from app.models.contracts import (
    Analyse,
    GenerertTekst,
    Kompetansekrav,
    Mockscenario,
    Modellgrunnlag,
    Modellresultat,
    Tekstvalg,
)

# De fiktive testparene under tests/fixtures brukes også som appdata i mock-modus.
TESTPAR = Path(__file__).resolve().parents[2] / "tests" / "fixtures" / "job-applications"
# Oppdater versjonen når eksempelgrunnlaget eller dets faste svar endres.
FIXTUREVERSJON = 1
EKSEMPELMERKNAD = "Fiktivt eksempel fra testpar 1. Din egen tekst er ikke analysert."

# Tekstene bygger på dokumenterte kvalifikasjoner i det tilhørende testparet.
_CV_FORMULERINGER = {
    "01-mangler-sertifikat": (
        "Jeg er besøksvenn i Røde Kors besøkstjeneste.",
        "Jeg har samarbeidet med medstudenter i et gruppeprosjekt i helsefremmende arbeid.",
        "Jeg har norsk som morsmål.",
    ),
    "02-mangler-verktoy": (
        "Jeg studerer flyteknikk.",
        "Jeg kjenner Word og Excel og har brukt Excel til timelister og delelister.",
        "På verkstedet fulgte jeg sjekklistene og kvitterte for utført arbeid.",
    ),
    "03-studieprosjekt-dekker-krav": (
        "Jeg har jobbet med kundeservice ved disk på kafé.",
        "I et studieprosjekt planla jeg en næringslivsdag for 80 deltakere med medstudenter.",
        "Jeg snakker og skriver flytende engelsk.",
    ),
    "04-alle-krav-dekket": (
        "Jeg studerer til barnehagelærer og har jobbet som tilkallingsvikar i barnehage.",
        "Jeg har gjennomført førstehjelpskurs for barn og unge.",
        "Som speiderleder planlegger og leder jeg helgeturer i skog og fjell for barn.",
    ),
}

# Bare disse fiktive demosvarene brukes. Tomme og andre svar utelates.
_DEMOSVAR = {
    "forerkort-b": (
        "Jeg har førerkort klasse B",
        "Jeg har ikke førerkort",
        "Jeg øvelseskjører til klasse B",
    ),
    "tig-sveising": (
        "Jeg har erfaring med TIG-sveising",
        "Jeg har ikke erfaring med TIG-sveising",
        "Jeg har prøvd TIG-sveising én gang under veiledning",
    ),
    "tysk": (
        "Jeg kan føre samtaler på tysk",
        "Jeg kan ikke tysk",
        "Jeg kan noen enkle fraser på tysk",
    ),
}


class _Fasitkrav(TypedDict):
    id: str
    krav: str
    status: Literal["dekket", "mangler"]
    kilde: NotRequired[str]


class _Fasit(TypedDict):
    stilling: dict[str, str]
    krav: list[_Fasitkrav]


def _velg_scenario(grunnlag: Modellgrunnlag) -> Mockscenario:
    cv = grunnlag.cv.split()
    annonse = grunnlag.annonse.split()
    for scenario_id in _CV_FORMULERINGER:
        mappe = TESTPAR / scenario_id
        if (
            cv == (mappe / "cv.txt").read_text(encoding="utf-8").split()
            and annonse == (mappe / "annonse.txt").read_text(encoding="utf-8").split()
        ):
            scenario = Mockscenario(scenario_id, FIXTUREVERSJON)
            if all(
                rad.get("kilde") and rad["kilde"] in grunnlag.cv
                for rad in _les_fasit(scenario)["krav"]
                if rad["status"] == "dekket"
            ):
                return scenario
    return Mockscenario("01-mangler-sertifikat", FIXTUREVERSJON, EKSEMPELMERKNAD)


def _les_fasit(scenario: Mockscenario) -> _Fasit:
    return json.loads((TESTPAR / scenario.scenario_id / "fasit.json").read_text(encoding="utf-8"))


def _normaliser_svar(svar: str) -> str:
    return " ".join(svar.casefold().split()).rstrip(" .!")


class MockAdapter:
    """Kjøres lokalt i mock-modus. T-8 og T-9 er foreløpig ikke koblet til adapteren."""

    def analyser(self, grunnlag: Modellgrunnlag) -> Modellresultat[Analyse]:
        scenario = _velg_scenario(grunnlag)
        krav: list[Kompetansekrav] = [
            {
                "id": rad["id"],
                "krav": rad["krav"],
                "status": rad["status"],
                "kilde": rad.get("kilde"),
            }
            for rad in _les_fasit(scenario)["krav"]
        ]
        krav.sort(key=lambda rad: rad["status"] != "mangler")
        return Modellresultat({"kompetansekrav": krav, "ansettelsesvilkar": []}, scenario)

    def lag_tekst(
        self,
        grunnlag: Modellgrunnlag,
        analyse: Analyse,
        svar: Mapping[str, str],
        resultattype: Tekstvalg,
    ) -> Modellresultat[GenerertTekst]:
        scenario = _velg_scenario(grunnlag)
        formuleringer = list(_CV_FORMULERINGER[scenario.scenario_id])
        tittel, arbeidsgiver = grunnlag.tittel, grunnlag.arbeidsgiver

        if scenario.merknad:
            stilling = _les_fasit(scenario)["stilling"]
            tittel, arbeidsgiver = stilling["tittel"], stilling["arbeidsgiver"]

        for krav in analyse["kompetansekrav"]:
            if krav["status"] != "mangler":
                continue
            svartekst = _normaliser_svar(svar.get(krav["id"], ""))
            for demosvar in _DEMOSVAR.get(krav["id"], ()):
                if svartekst == _normaliser_svar(demosvar):
                    formuleringer.append(f"{demosvar}.")
                    break

        innledning = f"Jeg søker stillingen «{tittel}» hos {arbeidsgiver}."
        match resultattype:
            case "helt_soknadsutkast":
                navn = (TESTPAR / scenario.scenario_id / "cv.txt").read_text(encoding="utf-8")
                tekst = "\n\n".join(
                    ("Hei,", innledning, *formuleringer, f"Vennlig hilsen\n{navn.splitlines()[0]}")
                )
            case "forslag_til_formuleringer":
                tekst = "\n".join(f"- {linje}" for linje in (innledning, *formuleringer))
            case _:
                raise ValueError("Ukjent tekstvalg.")

        return Modellresultat({"resultattype": resultattype, "tekst": tekst}, scenario)
