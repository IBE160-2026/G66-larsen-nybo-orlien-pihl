"""Oppstart av Supersøker: lager FastAPI-appen og kobler på rutene."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.config import Settings
from app.routes import pages

MAL_MAPPE = Path(__file__).parent / "templates"
STATIC_MAPPE = Path(__file__).parent / "static"


def create_app(settings: Settings | None = None) -> FastAPI:
    """Lager appen. Testene sender inn egne innstillinger."""
    settings = settings or Settings()
    templates = Jinja2Templates(directory=MAL_MAPPE)
    templates.env.globals["settings"] = settings

    app = FastAPI(title="Supersøker")
    app.state.templates = templates
    app.mount("/static", StaticFiles(directory=STATIC_MAPPE), name="static")
    app.include_router(pages.router)
    return app
