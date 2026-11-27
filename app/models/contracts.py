"""Internt grensesnitt for modelloperasjonene i kontraktversjon 1."""

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Literal, Protocol, TypedDict

type Tekstvalg = Literal["helt_soknadsutkast", "forslag_til_formuleringer"]


@dataclass(frozen=True)
class Modellgrunnlag:
    """Rettet dokumenttekst og stillingsfelt bekreftet av serveren."""

    cv: str
    annonse: str
    tittel: str
    arbeidsgiver: str


class Kompetansekrav(TypedDict):
    id: str
    krav: str
    status: Literal["dekket", "mangler"]
    kilde: str | None


class Analyse(TypedDict):
    kompetansekrav: list[Kompetansekrav]
    ansettelsesvilkar: list[str]


class GenerertTekst(TypedDict):
    resultattype: Tekstvalg
    tekst: str


@dataclass(frozen=True)
class Mockscenario:
    """Intern metadata som lar serveren finne og merke eksempelgrunnlaget."""

    scenario_id: str
    fixtureversjon: int
    merknad: str | None = None


@dataclass(frozen=True)
class Modellresultat[T]:
    innhold: T
    scenario: Mockscenario | None = None


class Modelladapter(Protocol):
    def analyser(self, grunnlag: Modellgrunnlag) -> Modellresultat[Analyse]: ...

    def lag_tekst(
        self,
        grunnlag: Modellgrunnlag,
        analyse: Analyse,
        svar: Mapping[str, str],
        resultattype: Tekstvalg,
    ) -> Modellresultat[GenerertTekst]: ...
