"""Sider som vises til brukeren."""

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
def forside(request: Request) -> HTMLResponse:
    """Forsiden. Her kommer innlogging og de tre stegene."""
    return request.app.state.templates.TemplateResponse(request, "index.html")
