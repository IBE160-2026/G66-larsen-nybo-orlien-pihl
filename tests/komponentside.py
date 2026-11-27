"""Komponentsiden: alle felles komponenter samlet, til testene og til kontroll i nettleser.

Siden finnes bare her i tests/. Appen har ingen stilside.

Start:  uv run python -m tests.komponentside
"""

import json
from pathlib import Path

import uvicorn
from fastapi import FastAPI, Query, Request
from fastapi.responses import HTMLResponse
from jinja2 import ChoiceLoader, FileSystemLoader

from app.config import Settings
from app.main import create_app

TESTMALER = Path(__file__).parent / "maler"
TESTPAR = Path(__file__).parent / "fixtures" / "job-applications" / "01-mangler-sertifikat"
STI = "/komponenter"
PORT = 8001


def les_testpar() -> dict:
    """Testpar 1. Sitatene hentes fra fasiten, så de er ordrette fra CV-en."""
    fasit = json.loads((TESTPAR / "fasit.json").read_text(encoding="utf-8"))
    return {
        "stilling": fasit["stilling"],
        "mangler": [krav for krav in fasit["krav"] if krav["status"] == "mangler"],
        "dokumentert": [krav for krav in fasit["krav"] if krav["status"] == "dekket"],
        "cv": (TESTPAR / "cv.txt").read_text(encoding="utf-8"),
        "annonse": (TESTPAR / "annonse.txt").read_text(encoding="utf-8"),
    }


def lag_komponentapp(settings: Settings | None = None) -> FastAPI:
    """Den vanlige appen, utvidet med testmalene og en rute til komponentsiden."""
    app = create_app(settings)
    templates = app.state.templates
    templates.env.loader = ChoiceLoader([templates.env.loader, FileSystemLoader(TESTMALER)])
    testpar = les_testpar()

    @app.get(STI, response_class=HTMLResponse)
    def komponenter(request: Request, steg: int = Query(2, ge=1, le=3)) -> HTMLResponse:
        """?steg=1 til 3 velger hvilket steg som er aktivt i stegindikatoren."""
        lenker = {nummer: f"{STI}?steg={nummer}" for nummer in (1, 2, 3)}
        # Steg 1: de to andre er fullført. Ellers er bare stegene foran det aktive fullført.
        fullfort = (2, 3) if steg == 1 else range(1, steg)
        return templates.TemplateResponse(
            request,
            "komponentside.html",
            {
                "aktivt_steg": steg,
                "steg_lenker": {nummer: lenker[nummer] for nummer in fullfort},
                **testpar,
            },
        )

    return app


if __name__ == "__main__":
    print(f"Komponentsiden: http://127.0.0.1:{PORT}{STI}")
    uvicorn.run(lag_komponentapp(), host="127.0.0.1", port=PORT)
