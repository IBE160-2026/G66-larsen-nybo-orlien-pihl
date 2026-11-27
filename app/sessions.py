"""Økter i RAM og CSRF-vern. Arbeidsområde og utløp bygges videre i #35."""

import secrets
from dataclasses import dataclass

from fastapi import Request, Response

from app.accounts import Konto

OKT_COOKIE = "okt"
CSRF_COOKIE = "csrf"


@dataclass
class Okt:
    id: str
    konto: Konto


class Okter:
    """Alle aktive økter. Serveren starter tomt, så en omstart logger alle ut."""

    def __init__(self) -> None:
        self._okter: dict[str, Okt] = {}

    def ny(self, konto: Konto) -> Okt:
        okt = Okt(id=secrets.token_urlsafe(32), konto=konto)
        self._okter[okt.id] = okt
        return okt

    def hent(self, okt_id: str | None) -> Okt | None:
        return self._okter.get(okt_id) if okt_id else None

    def slett(self, okt_id: str | None) -> None:
        if okt_id:
            self._okter.pop(okt_id, None)


def finn_okt(request: Request) -> Okt | None:
    """Økten som hører til forespørselen, eller None hvis ingen er innlogget."""
    return request.app.state.okter.hent(request.cookies.get(OKT_COOKIE))


def csrf_token(request: Request) -> str:
    """Tokenet som legges i skjemaet. Gjenbruker cookien hvis den finnes."""
    return request.cookies.get(CSRF_COOKIE) or secrets.token_urlsafe(32)


def csrf_gyldig(request: Request, skjemaverdi: str | None) -> bool:
    cookie = request.cookies.get(CSRF_COOKIE)
    return bool(cookie and skjemaverdi) and secrets.compare_digest(cookie, skjemaverdi)


def sett_cookie(response: Response, request: Request, navn: str, verdi: str) -> None:
    """HttpOnly og SameSite. Secure bare over HTTPS, så den virker lokalt over HTTP."""
    response.set_cookie(
        navn,
        verdi,
        httponly=True,
        samesite="lax",
        secure=request.url.scheme == "https",
        path="/",
    )
