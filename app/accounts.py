"""Kontolager i SQLite: e-post og Argon2id-hash, ingenting annet (FR-1, AD-1, AD-2)."""

import json
import sqlite3
from contextlib import closing
from dataclasses import dataclass
from pathlib import Path

from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

MIN_PASSORD = 8
MAKS_PASSORD = 256
MAKS_EPOST = 254

MELDING_EPOST_FORMAT = "E-postadressen har feil format. Skriv den slik: navn@eksempel.no."
MELDING_EPOST_I_BRUK = (
    "Det finnes allerede en konto med denne e-postadressen. Logg inn, eller bruk en annen adresse."
)
MELDING_PASSORD_KORT = "Passordet må ha minst 8 tegn. Skriv et lengre passord."
MELDING_PASSORD_LANGT = "Passordet kan ha høyst 256 tegn. Skriv et kortere passord."

_hasher = PasswordHash((Argon2Hasher(),))
# Brukes når e-posten ikke finnes, så svartiden ikke røper om kontoen finnes
_BLINDHASH = _hasher.hash("blindpassord")


class EpostIBruk(Exception):
    """E-posten har allerede en konto."""


@dataclass(frozen=True)
class Konto:
    id: int
    epost: str


def normaliser_epost(epost: str) -> str:
    return epost.strip().lower()


def epost_feil(epost: str) -> str | None:
    """Enkel regel: én @, noe før og etter, punktum i domenet, ingen mellomrom, høyst 254 tegn."""
    lokal, _, domene = epost.partition("@")
    gyldig = (
        0 < len(epost) <= MAKS_EPOST
        and epost.count("@") == 1
        and not any(tegn.isspace() for tegn in epost)
        and lokal
        and "." in domene
        and domene.strip(".") == domene
        and ".." not in domene
    )
    return None if gyldig else MELDING_EPOST_FORMAT


def passord_feil(passord: str) -> str | None:
    if len(passord) < MIN_PASSORD:
        return MELDING_PASSORD_KORT
    if len(passord) > MAKS_PASSORD:
        return MELDING_PASSORD_LANGT
    return None


class Kontolager:
    """Databasen opprettes ved første bruk. Hvert kall bruker en egen forbindelse."""

    def __init__(self, database: Path) -> None:
        self.database = database
        database.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._koble_til()) as forbindelse, forbindelse:
            forbindelse.execute(
                "CREATE TABLE IF NOT EXISTS konto ("
                "id INTEGER PRIMARY KEY, "
                "epost TEXT NOT NULL UNIQUE, "
                "passordhash TEXT NOT NULL)"
            )

    def _koble_til(self) -> sqlite3.Connection:
        return sqlite3.connect(self.database, timeout=10)

    def opprett(self, epost: str, passord: str) -> Konto:
        """Lagrer kontoen. Unikheten håndheves av databasen, også ved samtidige kall."""
        epost = normaliser_epost(epost)
        try:
            with closing(self._koble_til()) as forbindelse, forbindelse:
                markor = forbindelse.execute(
                    "INSERT INTO konto (epost, passordhash) VALUES (?, ?)",
                    (epost, _hasher.hash(passord)),
                )
        except sqlite3.IntegrityError as feil:
            raise EpostIBruk(epost) from feil
        return Konto(id=markor.lastrowid, epost=epost)

    def kontroller(self, epost: str, passord: str) -> Konto | None:
        """Gir kontoen hvis e-post og passord stemmer. Ukjent konto og feil passord er like."""
        epost = normaliser_epost(epost)
        with closing(self._koble_til()) as forbindelse:
            rad = forbindelse.execute(
                "SELECT id, passordhash FROM konto WHERE epost = ?", (epost,)
            ).fetchone()
        hash_a_sjekke = rad[1] if rad else _BLINDHASH
        riktig = len(passord) <= MAKS_PASSORD and _hasher.verify(passord, hash_a_sjekke)
        return Konto(id=rad[0], epost=epost) if rad and riktig else None

    def finnes(self, epost: str) -> bool:
        with closing(self._koble_til()) as forbindelse:
            return (
                forbindelse.execute(
                    "SELECT 1 FROM konto WHERE epost = ?", (normaliser_epost(epost),)
                ).fetchone()
                is not None
            )


def opprett_testbruker(lager: Kontolager, fil: Path) -> None:
    """Oppretter testbrukeren fra testdataene om den mangler. Uten fil skjer ingenting."""
    if not fil.is_file():
        return
    data = json.loads(fil.read_text(encoding="utf-8"))
    if not lager.finnes(data["epost"]):
        lager.opprett(data["epost"], data["passord"])
