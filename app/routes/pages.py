"""Sider som vises til brukeren."""

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, RedirectResponse, Response

from app.sessions import CSRF_COOKIE, csrf_token, finn_okt, sett_cookie

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
def forside(request: Request) -> Response:
    """Forsiden. Krever innlogging. Her kommer de tre stegene."""
    okt = finn_okt(request)
    if okt is None:
        return RedirectResponse("/logg-inn", status_code=303)
    token = csrf_token(request)
    svar = request.app.state.templates.TemplateResponse(
        request, "index.html", {"epost": okt.konto.epost, "csrf_token": token}
    )
    sett_cookie(svar, request, CSRF_COOKIE, token)
    return svar
