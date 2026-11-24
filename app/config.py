"""Konfigurasjon for Supersøker, lest fra miljøvariabler og eventuelt en .env-fil."""

from typing import Literal

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Innstillinger. Mock-modus er standard når ingenting er konfigurert (FR-26)."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="SUPERSOKER_",
        extra="ignore",
        populate_by_name=True,
    )

    mode: Literal["mock", "api"] = "mock"
    openai_api_key: str = Field(default="", validation_alias="OPENAI_API_KEY")

    @model_validator(mode="after")
    def krev_nokkel_i_api_modus(self) -> "Settings":
        """Stopper oppstart i API-modus uten nøkkel, i stedet for å falle tilbake til mock."""
        if self.mode == "api" and not self.openai_api_key.strip():
            raise ValueError(
                "API-modus krever OPENAI_API_KEY. "
                "Sett nøkkelen i .env, eller bruk SUPERSOKER_MODE=mock."
            )
        return self
