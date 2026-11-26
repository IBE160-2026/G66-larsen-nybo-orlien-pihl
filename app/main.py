"""Oppstart av Supersøker: lager FastAPI-appen og kobler på rutene."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.templating import Jinja2Templates

from app.config import Settings
from app.routes import pages

MAL_MAPPE = Path(__file__).parent / "templates"


def create_app(settings: Settings | None = None) -> FastAPI:
    """Lager appen. Testene sender inn egne innstillinger."""
    settings = settings or Settings()
    templates = Jinja2Templates(directory=MAL_MAPPE)
    templates.env.globals["settings"] = settings

    app = FastAPI(title="Supersøker")
    app.state.templates = templates
    app.include_router(pages.router)
    return app
