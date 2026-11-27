"""Oppstart av Supersøker: lager FastAPI-appen og kobler på rutene."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.accounts import Kontolager, opprett_testbruker
from app.config import Settings
from app.routes import auth, pages
from app.sessions import Okter

MAL_MAPPE = Path(__file__).parent / "templates"
STATIC_MAPPE = Path(__file__).parent / "static"


def create_app(settings: Settings | None = None) -> FastAPI:
    """Lager appen. Testene sender inn egne innstillinger."""
    settings = settings or Settings()
    templates = Jinja2Templates(directory=MAL_MAPPE)
    templates.env.globals["settings"] = settings

    app = FastAPI(title="Supersøker")
    app.state.templates = templates
    app.state.kontoer = Kontolager(settings.database)
    app.state.okter = Okter()
    # Testbrukeren finnes bare i mock-modus, så en kjent konto aldri finnes når data kan sendes ut
    app.state.testbruker_finnes = settings.mode == "mock" and settings.testbruker_fil.is_file()
    if app.state.testbruker_finnes:
        opprett_testbruker(app.state.kontoer, settings.testbruker_fil)
    app.mount("/static", StaticFiles(directory=STATIC_MAPPE), name="static")
    app.include_router(pages.router)
    app.include_router(auth.router)
    return app
