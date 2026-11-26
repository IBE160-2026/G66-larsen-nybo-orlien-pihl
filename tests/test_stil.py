"""Tester av stilarket: kontrast (NFR-1), fargevariabler og bare lokale ressurser."""

import re
from pathlib import Path

import pytest

from app.main import MAL_MAPPE, STATIC_MAPPE

CSS = re.sub(r"/\*.*?\*/", "", (STATIC_MAPPE / "stil.css").read_text(encoding="utf-8"), flags=re.S)
# Reglene uten nøstede klammer, også dem inne i @media
REGLER = [(selektor.strip(), kropp) for selektor, kropp in re.findall(r"([^{}]+)\{([^{}]*)\}", CSS)]


def deklarasjoner(kropp: str) -> list[tuple[str, str]]:
    deler = (del_.split(":", 1) for del_ in kropp.split(";") if ":" in del_)
    return [(navn.strip(), verdi.strip()) for navn, verdi in deler]


ROTBLOKKER = [dict(deklarasjoner(kropp)) for selektor, kropp in REGLER if selektor == ":root"]
VARIABLER = ROTBLOKKER[0]

NAVNGITTE_FARGER = """
aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet
brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue
darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange
darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise
darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen
fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred
indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen
lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta
maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue
mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin
navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen
paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red
rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue
slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white
whitesmoke yellow yellowgreen
""".split()
FARGEVERDI = re.compile(
    r"#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\("
    rf"|(?<![-\w])(?:{'|'.join(NAVNGITTE_FARGER)})(?![-\w])",
    re.IGNORECASE,
)

# Parene i tabellen «Kontrast» i DESIGN.md, pluss merker og ikon med lys tekst
TEKSTPAR = {
    "blekk": ["papir", "kort", "hvit", "mangler-band", "mangler-flate", "dok-flate", "bevis"]
    + ["feil-flate"],
    "dempet": ["papir", "kort", "mangler-flate", "dok-flate", "linje"],
    "hvit": ["blekk", "aksent", "dok", "feil"],
    "aksent": ["papir", "kort"],
    "dok": ["hvit", "dok-flate", "papir"],
    "mangler-merke": ["kort"],
    "feil": ["kort", "papir", "feil-flate"],
}
# Kanter på kontroller og fokusringen
KANTPAR = {
    "feltkant": ["hvit", "kort", "papir", "mangler-flate"],
    "blekk": ["papir", "kort", "mangler-flate"],
}


def lyshet(farge: str) -> float:
    """Relativ lyshet etter WCAG 2.1."""
    kanaler = [int(farge[i : i + 2], 16) / 255 for i in (1, 3, 5)]
    r, g, b = (k / 12.92 if k <= 0.04045 else ((k + 0.055) / 1.055) ** 2.4 for k in kanaler)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def kontrast(en: str, to: str) -> float:
    morkest, lysest = sorted(lyshet(VARIABLER[f"--{navn}"]) for navn in (en, to))
    return (lysest + 0.05) / (morkest + 0.05)


def par(oversikt: dict[str, list[str]]) -> list[tuple[str, str]]:
    return [(forgrunn, flate) for forgrunn, flater in oversikt.items() for flate in flater]


@pytest.mark.parametrize(("tekst", "flate"), par(TEKSTPAR))
def test_tekst_har_nok_kontrast(tekst, flate):
    assert kontrast(tekst, flate) >= 4.5


@pytest.mark.parametrize(("kant", "flate"), par(KANTPAR))
def test_kanter_og_fokusring_har_nok_kontrast(kant, flate):
    assert kontrast(kant, flate) >= 3


def test_fokusringen_er_blekk_og_gjelder_alle_kontroller():
    assert VARIABLER["--fokusring"] == "3px solid var(--blekk)"
    regler = {selektor: dict(deklarasjoner(kropp)) for selektor, kropp in REGLER}
    assert regler[":focus-visible"] == {"outline": "var(--fokusring)", "outline-offset": "3px"}
    assert not re.search(r"outline\s*:\s*(none|0)\b", CSS)


def test_fargekontrollen_finner_farger_og_slipper_gjennom_nokkelordene():
    for verdi in ("1px solid red", "#fff", "rgba(0, 0, 0, .1)", "0 0 2px HSL(0 0% 0%)"):
        assert FARGEVERDI.search(verdi), verdi
    for verdi in ("1px solid transparent", "currentColor", "inherit", "var(--feil)", "nowrap"):
        assert not FARGEVERDI.search(verdi), verdi


def test_fargeverdier_star_bare_i_root():
    funn = [
        f"{selektor}: {navn}: {verdi}"
        for selektor, kropp in REGLER
        if selektor != ":root"
        for navn, verdi in deklarasjoner(kropp)
        if FARGEVERDI.search(verdi)
    ]
    assert funn == []


def test_alle_variabler_som_brukes_er_definert():
    definert = {navn for blokk in ROTBLOKKER for navn in blokk}
    assert set(re.findall(r"var\((--[\w-]+)", CSS)) - definert == set()


@pytest.mark.parametrize(
    "fil",
    [STATIC_MAPPE / "stil.css", *sorted(MAL_MAPPE.rglob("*.html"))]
    + sorted((Path(__file__).parent / "maler").rglob("*.html")),
    ids=lambda fil: fil.name,
)
def test_ingen_eksterne_adresser(fil):
    innhold = fil.read_text(encoding="utf-8")
    assert not re.search(r"https?:|@import|(?:url\(|=)\s*[\"']?//", innhold)
