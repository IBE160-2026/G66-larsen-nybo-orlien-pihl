"""Serverens validering av modellresultat og frivillige svar i steg 2."""

import re
from dataclasses import dataclass, field
from typing import Literal

from pydantic import BaseModel, ConfigDict, ValidationError

ANALYSEFEIL = (
    "Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. "
    "CV og annonse er beholdt. Prøv analysen på nytt."
)
INGEN_KRAV = (
    "Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst basert "
    "på CV-en og opplysningene du har gitt."
)
BARE_VILKAR = "Vi fant ingen tydelige kompetansekrav i annonsen."
ALLE_DOKUMENTERT = "Alle kompetansekrav i annonsen er dokumentert i CV-en."
SVARGRENSE = 1000
SVARGRENSE_VISNING = f"{SVARGRENSE:,}".replace(",", " ")
SVAR_FOR_LANGT = f"Svaret er over {SVARGRENSE_VISNING} tegn. Kort det ned."


class UgyldigAnalyse(ValueError):
    """Analysen kan ikke brukes eller vises."""


class UgyldigSvar(ValueError):
    """Svarene må rettes før de kan brukes."""

    def __init__(self, melding: str, krav_id: str | None = None) -> None:
        super().__init__(melding)
        self.krav_id = krav_id


class Krav(BaseModel):
    model_config = ConfigDict(strict=True, frozen=True)

    id: str
    krav: str
    status: Literal["dekket", "mangler"]
    kilde: str | None


class _Raanalyse(BaseModel):
    model_config = ConfigDict(strict=True)

    kompetansekrav: list[Krav]
    ansettelsesvilkar: list[str]


@dataclass(frozen=True)
class GapAnalyse:
    tittel: str
    arbeidsgiver: str
    mangler: tuple[Krav, ...]
    dokumentert: tuple[Krav, ...]
    ansettelsesvilkar: tuple[str, ...]
    kontraktversjon: Literal[1] = field(init=False, default=1)

    @property
    def melding(self) -> str:
        totalt = len(self.mangler) + len(self.dokumentert)
        if not totalt:
            return BARE_VILKAR if self.ansettelsesvilkar else INGEN_KRAV
        if not self.mangler:
            return ALLE_DOKUMENTERT
        return f"{len(self.dokumentert)} av {totalt} kompetansekrav er dokumentert i CV-en."


def _finn_cv_sitat(sitat: str | None, cv: str) -> str:
    """Finn ordlyden i CV-en. Relevans vurderes separat mot fasiten i T-2."""
    if sitat and sitat.strip():
        if sitat in cv:
            return sitat
        uttrykk = r"\s+".join(map(re.escape, sitat.split()))
        # Se også etter overlappende treff før utdraget regnes som entydig.
        treff = re.finditer(rf"(?=({uttrykk}))", cv)
        forste = next(treff, None)
        if forste is not None and next(treff, None) is None:
            return forste.group(1)
    raise UgyldigAnalyse(ANALYSEFEIL)


def valider_analyse(raasvar: object, *, cv: str, tittel: str, arbeidsgiver: str) -> GapAnalyse:
    """Bruk CV og bekreftede stillingsfelt fra serverens gjeldende grunnlag."""
    if not all(isinstance(tekst, str) and tekst.strip() for tekst in (cv, tittel, arbeidsgiver)):
        raise UgyldigAnalyse("Kontroller CV-teksten, stillingstittelen og arbeidsgiveren.")
    try:
        analyse = _Raanalyse.model_validate(raasvar)
    except ValidationError:
        raise UgyldigAnalyse(ANALYSEFEIL) from None

    mangler = []
    dokumentert = []
    krav_ider = set()
    for krav in analyse.kompetansekrav:
        if not krav.id.strip() or not krav.krav.strip() or krav.id in krav_ider:
            raise UgyldigAnalyse(ANALYSEFEIL)
        krav_ider.add(krav.id)
        if krav.status == "dekket":
            kilde = _finn_cv_sitat(krav.kilde, cv)
            dokumentert.append(krav.model_copy(update={"kilde": kilde}))
        else:
            if krav.kilde is not None:
                raise UgyldigAnalyse(ANALYSEFEIL)
            mangler.append(krav)

    if any(not vilkar.strip() for vilkar in analyse.ansettelsesvilkar):
        raise UgyldigAnalyse(ANALYSEFEIL)
    return GapAnalyse(
        tittel, arbeidsgiver, tuple(mangler), tuple(dokumentert), tuple(analyse.ansettelsesvilkar)
    )


def normaliser_svarlinjer(tekst: str) -> str:
    return tekst.replace("\r\n", "\n").replace("\r", "\n")


def valider_svar(analyse: GapAnalyse, svar: object) -> dict[str, str]:
    """Valider hele innsendingen og behold innholdet med LF som linjeskift."""
    if not isinstance(svar, dict):
        raise UgyldigSvar("Svarene må sendes som tekst knyttet til hvert krav.")

    tillatte_ider = {krav.id for krav in analyse.mangler}
    resultat = {}
    for krav_id, tekst in svar.items():
        if krav_id not in tillatte_ider:
            raise UgyldigSvar("Du kan bare svare på krav som mangler dokumentasjon.")
        if not isinstance(tekst, str):
            raise UgyldigSvar("Skriv svaret som tekst.", krav_id)
        tekst = normaliser_svarlinjer(tekst)
        if len(tekst) > SVARGRENSE:
            raise UgyldigSvar(SVAR_FOR_LANGT, krav_id)
        if tekst.strip():
            resultat[krav_id] = tekst
    return resultat
