"""Felles testoppsett."""

import pytest


@pytest.fixture(autouse=True)
def rent_miljo(monkeypatch: pytest.MonkeyPatch, tmp_path) -> None:
    """Hindrer at utviklerens miljø eller en delt database påvirker testene."""
    monkeypatch.delenv("SUPERSOKER_MODE", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.setenv("SUPERSOKER_DATABASE", str(tmp_path / "data" / "test.db"))
