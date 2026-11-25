"""Felles testoppsett."""

import pytest


@pytest.fixture(autouse=True)
def rent_miljo(monkeypatch: pytest.MonkeyPatch) -> None:
    """Hindrer at utviklerens egne miljøvariabler påvirker testene."""
    monkeypatch.delenv("SUPERSOKER_MODE", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
