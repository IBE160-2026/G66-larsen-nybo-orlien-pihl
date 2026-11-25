"""Tester av konfigurasjonen: mock er standard, og API-modus krever nøkkel (FR-26, FR-30, NFR-4)."""

import shutil
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.config import Settings


def test_mock_er_standard_nar_ingenting_er_konfigurert():
    assert Settings(_env_file=None).mode == "mock"


@pytest.mark.parametrize("nokkel", ["", "   "])
def test_api_modus_uten_nokkel_stopper_oppstart(nokkel):
    with pytest.raises(ValidationError, match="OPENAI_API_KEY"):
        Settings(_env_file=None, mode="api", openai_api_key=nokkel)


def test_api_modus_med_nokkel_er_gyldig():
    settings = Settings(_env_file=None, mode="api", openai_api_key="test-nokkel")
    assert settings.mode == "api"


def test_ugyldig_modus_nevner_gyldige_verdier():
    with pytest.raises(ValidationError, match="mock.*api"):
        Settings(_env_file=None, mode="foo")


def test_modus_og_nokkel_leses_fra_miljovariabler(monkeypatch):
    monkeypatch.setenv("SUPERSOKER_MODE", "api")
    monkeypatch.setenv("OPENAI_API_KEY", "test-nokkel")
    settings = Settings(_env_file=None)
    assert settings.mode == "api"
    assert settings.openai_api_key == "test-nokkel"


def test_env_filen_i_arbeidsmappen_leses(tmp_path, monkeypatch):
    (tmp_path / ".env").write_text(
        "SUPERSOKER_MODE=api\nOPENAI_API_KEY=test-nokkel\n", encoding="utf-8"
    )
    monkeypatch.chdir(tmp_path)
    assert Settings().mode == "api"


def test_env_example_gir_mock_modus_nar_den_kopieres_til_env(tmp_path, monkeypatch):
    """README ber brukeren kopiere .env.example til .env, og appen skal da starte i mock."""
    shutil.copy(Path(__file__).parent.parent / ".env.example", tmp_path / ".env")
    monkeypatch.chdir(tmp_path)
    assert Settings().mode == "mock"
