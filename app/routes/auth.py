"""Registrering, innlogging og utlogging (FR-1, FR-2, story 1.3–1.4)."""

from fastapi import APIRouter, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse, Response

from app import accounts
from app.sessions import (
    CSRF_COOKIE,
    OKT_COOKIE,
    csrf_gyldig,
    csrf_token,
    finn_okt,
    sett_cookie,
)

router = APIRouter()


def _side(request: Request, mal: str, status: int = 200, **kontekst) -> HTMLResponse:
    """Viser en skjemaside med CSRF-token i skjemaet og i cookien."""
    token = csrf_token(request)
    svar = request.app.state.templates.TemplateResponse(
        request,
        mal,
        {"csrf_token": token, "testbruker_finnes": request.app.state.testbruker_finnes, **kontekst},
        status_code=status,
    )
    sett_cookie(svar, request, CSRF_COOKIE, token)
    return svar


def avvis_csrf(request: Request) -> HTMLResponse:
    return request.app.state.templates.TemplateResponse(request, "csrf_feil.html", status_code=403)


@router.get("/logg-inn", response_class=HTMLResponse)
def logg_inn_side(request: Request) -> Response:
    if finn_okt(request):
        return RedirectResponse("/", status_code=303)
    return _side(request, "logg_inn.html", epost="")


@router.post("/logg-inn", response_class=HTMLResponse)
def logg_inn(
    request: Request, epost: str = Form(""), passord: str = Form(""), csrf: str = Form("")
) -> Response:
    if not csrf_gyldig(request, csrf):
        return avvis_csrf(request)
    konto = request.app.state.kontoer.kontroller(epost, passord)
    if konto is None:
        return _side(request, "logg_inn.html", status=401, epost=epost, innloggingsfeil=True)
    okter = request.app.state.okter
    okter.slett(request.cookies.get(OKT_COOKIE))
    okt = okter.ny(konto)
    svar = RedirectResponse("/", status_code=303)
    sett_cookie(svar, request, OKT_COOKIE, okt.id)
    return svar


@router.get("/opprett-konto", response_class=HTMLResponse)
def opprett_konto_side(request: Request) -> Response:
    if finn_okt(request):
        return RedirectResponse("/", status_code=303)
    return _side(request, "opprett_konto.html", epost="", feil={})


@router.post("/opprett-konto", response_class=HTMLResponse)
def opprett_konto(
    request: Request, epost: str = Form(""), passord: str = Form(""), csrf: str = Form("")
) -> Response:
    if not csrf_gyldig(request, csrf):
        return avvis_csrf(request)
    epost = accounts.normaliser_epost(epost)
    feil = {}
    if melding := accounts.epost_feil(epost):
        feil["epost"] = melding
    if melding := accounts.passord_feil(passord):
        feil["passord"] = melding
    if not feil:
        try:
            request.app.state.kontoer.opprett(epost, passord)
        except accounts.EpostIBruk:
            feil["epost"] = accounts.MELDING_EPOST_I_BRUK
    if feil:
        return _side(request, "opprett_konto.html", status=422, epost=epost, feil=feil)
    return RedirectResponse("/logg-inn", status_code=303)


@router.post("/logg-ut")
def logg_ut(request: Request, csrf: str = Form("")) -> Response:
    if not csrf_gyldig(request, csrf):
        return avvis_csrf(request)
    request.app.state.okter.slett(request.cookies.get(OKT_COOKIE))
    svar = RedirectResponse("/logg-inn", status_code=303)
    svar.delete_cookie(OKT_COOKIE, path="/")
    return svar
