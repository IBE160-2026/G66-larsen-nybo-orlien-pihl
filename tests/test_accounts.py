"""Tester av kontolageret: hash, unikhet, validering og testbruker (story 1.3 og 1.5)."""

import json
import sqlite3
from concurrent.futures import ThreadPoolExecutor

import pytest

from app import accounts
from app.accounts import EpostIBruk, Kontolager, opprett_testbruker


@pytest.fixture
def lager(tmp_path) -> Kontolager:
    return Kontolager(tmp_path / "ny" / "mappe" / "konto.db")


def test_databasefila_og_mappen_opprettes_automatisk(tmp_path):
    fil = tmp_path / "finnes-ikke" / "supersoker.db"
    Kontolager(fil)
    assert fil.is_file()


def test_passordet_lagres_som_argon2id_hash_og_ingen_navn(lager):
    lager.opprett("ida@eksempel.no", "hemmelig-passord")
    with sqlite3.connect(lager.database) as forbindelse:
        kolonner = [rad[1] for rad in forbindelse.execute("PRAGMA table_info(konto)")]
        (hash_,) = forbindelse.execute("SELECT passordhash FROM konto").fetchone()
    assert kolonner == ["id", "epost", "passordhash"]
    assert hash_.startswith("$argon2id$")
    assert "hemmelig-passord" not in hash_


def test_riktig_passord_gir_kontoen_og_feil_passord_gir_ingenting(lager):
    lager.opprett("ida@eksempel.no", "hemmelig-passord")
    assert lager.kontroller("ida@eksempel.no", "hemmelig-passord").epost == "ida@eksempel.no"
    assert lager.kontroller("ida@eksempel.no", "feil-passord") is None
    assert lager.kontroller("ukjent@eksempel.no", "hemmelig-passord") is None


def test_epost_lagres_med_smaa_bokstaver_og_uten_mellomrom(lager):
    lager.opprett("  Ida@Eksempel.NO ", "hemmelig-passord")
    assert lager.kontroller("IDA@eksempel.no", "hemmelig-passord") is not None
    with pytest.raises(EpostIBruk):
        lager.opprett("ida@eksempel.no", "annet-passord")


def test_samtidige_registreringer_med_samme_epost_gir_en_konto(lager):
    def registrer(_):
        try:
            lager.opprett("ida@eksempel.no", "hemmelig-passord")
            return True
        except EpostIBruk:
            return False

    with ThreadPoolExecutor(max_workers=6) as pool:
        resultater = list(pool.map(registrer, range(6)))
    assert resultater.count(True) == 1
    with sqlite3.connect(lager.database) as forbindelse:
        assert forbindelse.execute("SELECT COUNT(*) FROM konto").fetchone() == (1,)


def test_for_langt_passord_godtas_aldri_ved_innlogging(lager):
    lager.opprett("ida@eksempel.no", "a" * 256)
    assert lager.kontroller("ida@eksempel.no", "a" * 256) is not None
    assert lager.kontroller("ida@eksempel.no", "a" * 257) is None


@pytest.mark.parametrize(
    "epost",
    ["ida@eksempel.no", "a@b.c", "fornavn.etternavn@sub.domene.no", "x" * 242 + "@e.no"],
)
def test_gyldige_epostadresser(epost):
    assert accounts.epost_feil(epost) is None


@pytest.mark.parametrize(
    "epost",
    [
        "",
        "ida",
        "ida@",
        "@eksempel.no",
        "ida@eksempel",
        "ida@@eksempel.no",
        "ida @eksempel.no",
        "ida@eks empel.no",
        "x" * 250 + "@e.no",
        "a@b@c.no",
        "ida@.no",
        "ida@eksempel.",
        "ida@eks..empel.no",
    ],
)
def test_ugyldige_epostadresser(epost):
    assert accounts.epost_feil(epost) == accounts.MELDING_EPOST_FORMAT


def test_passordgrenser():
    assert accounts.passord_feil("1234567") == accounts.MELDING_PASSORD_KORT
    assert accounts.passord_feil("") == accounts.MELDING_PASSORD_KORT
    assert accounts.passord_feil("12345678") is None
    assert accounts.passord_feil("a" * 256) is None
    assert accounts.passord_feil("a" * 257) == accounts.MELDING_PASSORD_LANGT


def test_testbruker_opprettes_med_hash_og_dupliseres_ikke(lager, tmp_path):
    fil = tmp_path / "testbruker.json"
    fil.write_text(json.dumps({"epost": "test@eksempel.no", "passord": "testpassord1"}))
    opprett_testbruker(lager, fil)
    opprett_testbruker(lager, fil)
    assert lager.kontroller("test@eksempel.no", "testpassord1") is not None
    with sqlite3.connect(lager.database) as forbindelse:
        assert forbindelse.execute("SELECT COUNT(*) FROM konto").fetchone() == (1,)


def test_manglende_testbrukerfil_gir_ingen_testbruker(lager, tmp_path):
    opprett_testbruker(lager, tmp_path / "finnes-ikke.json")
    with sqlite3.connect(lager.database) as forbindelse:
        assert forbindelse.execute("SELECT COUNT(*) FROM konto").fetchone() == (0,)
