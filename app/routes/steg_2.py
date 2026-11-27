"""Gjenbrukbar steg 2-visning for den kommende søknadsflyten."""

from collections.abc import Mapping

from fastapi import Request
from fastapi.responses import HTMLResponse

from app.gap_analyse import (
    SVAR_FOR_LANGT,
    SVARGRENSE,
    SVARGRENSE_VISNING,
    GapAnalyse,
    UgyldigSvar,
    normaliser_svarlinjer,
)


def vis_steg_2(
    request: Request,
    analyse: GapAnalyse,
    *,
    svar: Mapping[str, str] | None = None,
    endre_url: str | None = None,
    lag_tekst_url: str | None = None,
    tekstvalg: str = "helt_soknadsutkast",
    eksempelmerknad: str | None = None,
    svarfeil: UgyldigSvar | None = None,
) -> HTMLResponse:
    """Vis bare en godkjent analyse. Handlingsadresser kommer fra søknadsflyten."""
    return request.app.state.templates.TemplateResponse(
        request,
        "steg_2.html",
        {
            "analyse": analyse,
            "svar": {
                krav_id: normaliser_svarlinjer(tekst) for krav_id, tekst in (svar or {}).items()
            },
            "svargrense": SVARGRENSE,
            "svargrense_visning": SVARGRENSE_VISNING,
            "varselgrense": (SVARGRENSE * 9 + 9) // 10,
            "grensemelding": SVAR_FOR_LANGT,
            "endre_url": endre_url,
            "lag_tekst_url": lag_tekst_url,
            "tekstvalg": tekstvalg,
            "eksempelmerknad": eksempelmerknad,
            "svarfeil": svarfeil,
        },
        status_code=422 if svarfeil else 200,
        headers={"Cache-Control": "no-store"},
    )
