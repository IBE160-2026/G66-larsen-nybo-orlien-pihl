"""Tester av forsiden: hver side viser hvilken modus som er på (FR-26)."""

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


def hent_forsiden(**innstillinger) -> str:
    app = create_app(Settings(_env_file=None, **innstillinger))
    svar = TestClient(app).get("/")
    assert svar.status_code == 200
    return svar.text


def test_forsiden_viser_mock_banner():
    assert "Mock-modus er på – ingen tekst sendes til en språkmodell." in hent_forsiden()


def test_forsiden_viser_api_banner_i_api_modus():
    side = hent_forsiden(mode="api", openai_api_key="test-nokkel")
    assert "API-modus er på" in side
    assert "Mock-modus er på" not in side


def test_create_app_uten_argumenter_bruker_standardinnstillinger(tmp_path, monkeypatch):
    """Oppstartsveien til uvicorn (--factory) sender ikke inn innstillinger."""
    monkeypatch.chdir(tmp_path)  # tom mappe, så ingen .env påvirker testen
    svar = TestClient(create_app()).get("/")
    assert "Mock-modus er på" in svar.text
