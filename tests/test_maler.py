"""Tester av grunnmalen, makroene og komponentsiden (issue #28, NFR-1)."""

import re
from html.parser import HTMLParser
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.main import STATIC_MAPPE, create_app
from tests.komponentside import STI, lag_komponentapp

MAKROER = """
{%- from "makroer/sideoverskrift.html" import sideoverskrift -%}
{%- from "makroer/tekstfelt.html" import tekstfelt -%}
{%- from "makroer/melding.html" import melding -%}
"""
UTEN_SLUTTAGG = {"br", "hr", "img", "input", "link", "meta", "source"}


class Element:
    """Et enkelt HTML-tre, så testene kan se på struktur og ikke bare søke i tekst."""

    def __init__(self, tag: str, attributter: dict, forelder: "Element | None" = None):
        self.tag = tag
        self.attributter = attributter
        self.forelder = forelder
        self.innhold: list = []

    @property
    def klasser(self) -> list[str]:
        return (self.attributter.get("class") or "").split()

    @property
    def barn(self) -> list["Element"]:
        return [del_ for del_ in self.innhold if isinstance(del_, Element)]

    @property
    def raatekst(self) -> str:
        return "".join(d if isinstance(d, str) else d.raatekst for d in self.innhold)

    @property
    def tekst(self) -> str:
        return " ".join(self.raatekst.split())

    def alle(self):
        yield self
        for barn in self.barn:
            yield from barn.alle()

    def finn(self, tag: str | None = None, klasse: str | None = None) -> list["Element"]:
        return [
            e
            for e in self.alle()
            if (tag is None or e.tag == tag) and (klasse is None or klasse in e.klasser)
        ]

    def en(self, tag: str | None = None, klasse: str | None = None) -> "Element":
        treff = self.finn(tag, klasse)
        assert len(treff) == 1, f"ventet ett element ({tag}, {klasse}), fant {len(treff)}"
        return treff[0]

    def med_id(self, verdi: str) -> "Element":
        treff = [e for e in self.alle() if e.attributter.get("id") == verdi]
        assert len(treff) == 1, f"ventet ett element med id {verdi}, fant {len(treff)}"
        return treff[0]

    def skjult_for_skjermleser(self) -> bool:
        e = self
        while e is not None:
            if e.attributter.get("aria-hidden") == "true":
                return True
            e = e.forelder
        return False


class Trebygger(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rot = Element("dokument", {})
        self.apent = self.rot

    def handle_starttag(self, tag, attrs):
        assert len(attrs) == len(dict(attrs)), f"<{tag}> har samme attributt to ganger: {attrs}"
        element = Element(tag, dict(attrs), self.apent)
        self.apent.innhold.append(element)
        if tag not in UTEN_SLUTTAGG:
            self.apent = element

    def handle_endtag(self, tag):
        if tag in UTEN_SLUTTAGG:
            return
        assert self.apent.tag == tag, f"</{tag}> lukker <{self.apent.tag}>"
        self.apent = self.apent.forelder

    def handle_data(self, data):
        self.apent.innhold.append(data)


def les(html: str) -> Element:
    bygger = Trebygger()
    bygger.feed(html)
    bygger.close()
    assert bygger.apent is bygger.rot, f"<{bygger.apent.tag}> er ikke lukket"
    return bygger.rot


def vis(mal: str, **variabler) -> str:
    """Rendrer en liten mal i appens eget malmiljø."""
    app = create_app(Settings(_env_file=None))
    return app.state.templates.env.from_string(mal).render(**variabler)


def vis_makro(kall: str, **variabler) -> Element:
    return les(vis(MAKROER + kall, **variabler))


def vis_side(blokker: str = "", **variabler) -> Element:
    return les(vis('{% extends "base.html" %}' + blokker, **variabler))


def komponentklient() -> TestClient:
    return TestClient(lag_komponentapp(Settings(_env_file=None)))


def komponentsiden(steg: int = 2) -> Element:
    svar = komponentklient().get(STI, params={"steg": steg})
    assert svar.status_code == 200
    return les(svar.text)


# ---------- Siderammen ----------


def test_sidens_ramme_har_sprak_og_hopp_lenken_forst():
    side = vis_side()
    assert side.en("html").attributter["lang"] == "nb"
    fokuserbare = [
        e for e in side.en("body").alle() if e.tag in {"a", "button", "input", "textarea", "select"}
    ]
    assert fokuserbare[0].tekst == "Hopp til innhold"
    assert fokuserbare[0].attributter["href"] == "#innhold"
    main = side.en("main")
    assert main.attributter["id"] == "innhold"
    assert main.attributter["tabindex"] == "-1"


@pytest.mark.parametrize(
    "blokk", ["bruker", "sidekolonne", "modellfeil", "handlingslinje", "content"]
)
def test_blokk_med_bare_blanktegn_gir_ingen_beholder(blokk):
    side = vis_side(f"{{% block {blokk} %}}\n   {{% if false %}}x{{% endif %}}\n{{% endblock %}}")
    assert not side.finn("aside")
    for klasse in ("bruker", "side-med-sidekolonne", "modellfeil", "handlingslinje"):
        assert not side.finn(klasse=klasse)


def test_fylte_blokker_havner_i_riktig_rekkefolge():
    side = vis_side(
        "{% block title %}Steg – Supersøker{% endblock %}"
        "{% block bruker %}<span>test@example.com</span>{% endblock %}"
        "{% block content %}<p>Innhold</p>{% endblock %}"
        "{% block sidekolonne %}<p>Side</p>{% endblock %}"
        "{% block modellfeil %}<p>Feil fra modellen</p>{% endblock %}"
        '{% block handlingslinje %}<button form="skjema">Neste</button>{% endblock %}'
        "{% block skript %}<script></script>{% endblock %}"
    )
    assert side.en("title").tekst == "Steg – Supersøker"
    assert side.en("header").en(klasse="bruker").tekst == "test@example.com"

    ramme = side.en(klasse="side")
    assert "side-med-sidekolonne" in ramme.klasser
    assert [e.tag for e in ramme.barn] == ["main", "aside"]
    main = side.en("main")
    assert main.barn[-1].klasser == ["modellfeil"]
    assert main.barn[-1].tekst == "Feil fra modellen"
    assert side.en("aside").tekst == "Side"

    body = side.en("body").barn
    assert body.index(ramme) < body.index(side.en(klasse="handlingslinje")) < len(body) - 1
    assert body[-1].tag == "script"


def test_den_faste_siderammen_star_i_riktig_rekkefolge():
    side = vis_side(
        "{% block handlingslinje %}<button>Neste</button>{% endblock %}"
        "{% block skript %}<script></script>{% endblock %}",
        aktivt_steg=2,
    )
    deler = [(e.tag, e.klasser[0] if e.klasser else None) for e in side.en("body").barn]
    assert deler == [
        ("a", "hopp-lenke"),
        ("div", "mock-stripe"),
        ("header", "toppfelt"),
        ("nav", "stegindikator"),
        ("div", "side"),
        ("div", "handlingslinje"),
        ("script", None),
    ]


def test_grunnmalen_overskriver_ikke_variabler_med_samme_navn_som_blokkene():
    navn = ["bruker", "sidekolonne", "modellfeil", "handlingslinje"]
    vis_alle = "|".join(f"{{{{ {n} }}}}" for n in navn)
    blokker = "".join(
        f'{{% block {blokk} %}}<p class="vist">{vis_alle}</p>{{% endblock %}}'
        for blokk in [*navn, "content", "skript"]
    )
    side = vis_side(blokker, **{n: f"verdi-{n}" for n in navn})
    ventet = "|".join(f"verdi-{n}" for n in navn)
    assert [e.tekst for e in side.finn("p", "vist")] == [ventet] * 6


def stegene(aktivt_steg: int, steg_lenker: dict) -> list[Element]:
    side = vis_side(aktivt_steg=aktivt_steg, steg_lenker=steg_lenker)
    nav = side.en("nav")
    assert nav.attributter["aria-label"]
    assert [e.tag for e in nav.barn] == ["ol"]
    steg = nav.en("ol").barn
    assert [e.tag for e in steg] == ["li", "li", "li"]
    return steg


def test_stegliste_med_aktivt_steg_2():
    ferdig, aktivt, kommende = stegene(2, {1: "/steg-1"})

    assert ferdig.en("a").attributter["href"] == "/steg-1"
    assert "Ferdig" in ferdig.tekst
    assert "aria-current" not in ferdig.attributter

    assert aktivt.attributter["aria-current"] == "step"
    assert "Du er her" in aktivt.tekst
    assert not aktivt.finn("a")

    assert kommende.tekst == "03 Teksten"
    assert not kommende.finn("a")


def test_tilbake_til_steg_1_gir_to_fullforte_lenker():
    aktivt, andre, tredje = stegene(1, {2: "/steg-2", 3: "/steg-3"})
    assert aktivt.attributter["aria-current"] == "step"
    for steg, adresse in ((andre, "/steg-2"), (tredje, "/steg-3")):
        assert steg.en("a").attributter["href"] == adresse
        assert "Ferdig" in steg.tekst


def test_aktivt_steg_er_aldri_en_lenke():
    _, aktivt, _ = stegene(2, {1: "/steg-1", 2: "/steg-2"})
    assert not aktivt.finn("a")
    assert "Ferdig" not in aktivt.tekst


def test_stegvariablene_kan_settes_i_sidens_egen_mal():
    side = vis_side("{% set aktivt_steg = 3 %}")
    assert "Teksten" in side.en("nav").tekst
    assert not side.en("nav").finn("a")


# ---------- Sideoverskrift ----------


def test_overtittelen_er_del_av_h1_og_ingressen_star_utenfor():
    side = vis_makro(
        '{{ sideoverskrift("Se hva du kan", "bygge på.", overtittel="Steg 2 av 3", '
        'ingress="Ingressen.") }}'
    )
    h1 = side.en("h1")
    assert h1.tekst == "Steg 2 av 3 Se hva du kan bygge på."
    assert h1.attributter["tabindex"] == "-1"
    assert h1.en("em").tekst == "bygge på."
    assert side.en("p", "ingress").tekst == "Ingressen."


# ---------- Tekstfelt ----------


def test_gyldig_felt_kobler_etikett_og_hjelpetekst():
    side = vis_makro(
        '{{ tekstfelt("epost", "E-post", "email", type="email", hjelpetekst="Din adresse.", '
        'attributter={"autocomplete": "email", "maxlength": 5, "data-rolle": "x"}) }}'
    )
    felt = side.en("input")
    etikett = side.en("label")
    assert etikett.attributter["for"] == felt.attributter["id"] == "epost"
    assert etikett.tekst == "E-post"
    assert felt.attributter["name"] == "email"
    assert felt.attributter["aria-describedby"] == "epost-hjelp"
    assert side.med_id("epost-hjelp").tekst == "Din adresse."
    assert felt.attributter["autocomplete"] == "email"
    assert felt.attributter["data-rolle"] == "x"
    assert "aria-invalid" not in felt.attributter
    assert "maxlength" not in felt.attributter
    assert not side.finn(klasse="feltfeil")


def test_felt_uten_beskrivelser_har_ingen_aria_describedby():
    felt = vis_makro('{{ tekstfelt("a", "A", "a") }}').en("input")
    assert "aria-describedby" not in felt.attributter


@pytest.mark.parametrize("flerlinje", [False, True])
def test_ugyldig_felt_viser_feilen_rett_under_og_beholder_verdien(flerlinje):
    verdi = '"><script>alert(1)</script> & mer'
    html = vis(
        MAKROER + '{{ tekstfelt("a", "A", "a", flerlinje=flerlinje, verdi=verdi, '
        'hjelpetekst="Hjelp.", feil="Rett dette.") }}',
        flerlinje=flerlinje,
        verdi=verdi,
    )
    assert "<script>" not in html
    side = les(html)
    felt = side.en("textarea" if flerlinje else "input")
    assert felt.attributter["aria-invalid"] == "true"
    assert felt.attributter["aria-describedby"] == "a-hjelp a-feil"

    rekkefolge = side.en(klasse="felt").barn
    feilen = rekkefolge[rekkefolge.index(felt) + 1]
    assert feilen.klasser == ["feltfeil"]
    assert feilen.attributter["id"] == "a-feil"
    assert "Rett dette." in feilen.tekst
    assert feilen.en(klasse="feilikon").attributter["aria-hidden"] == "true"

    beholdt = felt.raatekst.removeprefix("\n") if flerlinje else felt.attributter["value"]
    assert beholdt == verdi


@pytest.mark.parametrize("feil", [None, "Passordet må ha minst 8 tegn."])
def test_passordfelt_skriver_aldri_verdien_tilbake(feil):
    html = vis(
        MAKROER + '{{ tekstfelt("p", "Passord", "p", type="password", verdi="hemmelig123", '
        'feil=feil, attributter={"value": "hemmelig123"}) }}',
        feil=feil,
    )
    assert "hemmelig123" not in html
    assert "value" not in les(html).en("input").attributter


def test_attributter_kan_ikke_overstyre_det_makroen_styrer():
    reserverte = {
        "Value": "annen",
        "maxLength": 5,
        "TYPE": "email",
        "Class": "annen",
        "ID": "annen",
        "Name": "annen",
        "Aria-Describedby": "annen",
        "aria-Invalid": "false",
        "ReadOnly": "readonly",
        "AutoFocus": "autofocus",
    }
    side = vis_makro(
        '{{ tekstfelt("a", "A", "a", verdi="verdi", hjelpetekst="Hjelp.", feil="Feil.", '
        "attributter=attributter) }}",
        attributter={**reserverte, "autocomplete": "off"},
    )
    # les() feiler også hvis et attributt står to ganger
    assert side.en("input").attributter == {
        "class": "felt-inndata",
        "id": "a",
        "name": "a",
        "aria-describedby": "a-hjelp a-feil",
        "aria-invalid": "true",
        "autocomplete": "off",
        "type": "text",
        "value": "verdi",
    }


@pytest.mark.parametrize("felttype", ["Password", "PASSWORD"])
def test_passordfelt_gjenkjennes_uansett_store_bokstaver(felttype):
    html = vis(
        MAKROER + '{{ tekstfelt("p", "Passord", "p", type=felttype, verdi="hemmelig123") }}',
        felttype=felttype,
    )
    assert "hemmelig123" not in html


def test_passord_bedt_om_via_attributter_vises_heller_ikke():
    html = vis(
        MAKROER + '{{ tekstfelt("p", "Passord", "p", verdi="hemmelig123", '
        'attributter={"Type": "Password"}) }}'
    )
    assert "hemmelig123" not in html
    assert les(html).en("input").attributter["type"] == "password"


def test_linjeskift_fra_nettleseren_telles_en_gang():
    """Nettleseren sender linjeskift i textarea som CRLF."""
    side = vis_makro(
        '{{ tekstfelt("a", "A", "a", flerlinje=true, verdi=verdi, teller=1000) }}',
        verdi="ab\r\ncd",
    )
    assert side.med_id("a-teller").tekst == "5 / 1 000 tegn"
    assert side.en("textarea").raatekst == "\nab\ncd"


def test_flerlinjefelt_beholder_forste_linjeskift_og_kobler_telleren():
    verdi = "\nAndre linje"
    html = vis(
        MAKROER + '{{ tekstfelt("cv", "CV", "cv", flerlinje=true, verdi=verdi, teller=10000) }}',
        verdi=verdi,
    )
    # Nettleseren fjerner ett linjeskift rett etter <textarea>, så malen må legge til ett
    assert ">\n\nAndre linje</textarea>" in html
    side = les(html)
    assert side.en("textarea").attributter["aria-describedby"] == "cv-teller"
    assert side.med_id("cv-teller").tekst == f"{len(verdi)} / 10 000 tegn"


def test_telleren_har_tusenskille_i_begge_tallene():
    side = vis_makro(
        '{{ tekstfelt("a", "A", "a", flerlinje=true, verdi="x" * 1001, teller=1000) }}'
    )
    assert side.med_id("a-teller").tekst == "1 001 / 1 000 tegn"
    assert "maxlength" not in side.en("textarea").attributter


@pytest.mark.parametrize("flerlinje", ["true", "false"])
def test_skrivebeskyttet_felt_er_ikke_deaktivert(flerlinje):
    side = vis_makro(f'{{{{ tekstfelt("a", "A", "a", flerlinje={flerlinje}, readonly=true) }}}}')
    felt = side.finn(klasse="felt-inndata")[0]
    assert "readonly" in felt.attributter
    assert "disabled" not in felt.attributter


# ---------- Autofokus ----------


@pytest.mark.parametrize(
    ("kall", "klasse"),
    [
        ('{{ tekstfelt("a", "A", "a"$) }}', "felt-inndata"),
        ('{{ tekstfelt("a", "A", "a", flerlinje=true$) }}', "felt-inndata"),
        ('{% call melding("feil"$) %}Tekst{% endcall %}', "melding"),
        ('{% call melding("info"$) %}Tekst{% endcall %}', "melding"),
        ('{% call melding("bekreftelse"$) %}Tekst{% endcall %}', "melding"),
        ('{{ sideoverskrift("Tittel"$) }}', "sideoverskrift"),
    ],
)
def test_autofokus_er_av_til_siden_slar_det_pa(kall, klasse):
    uten = vis_makro(kall.replace("$", "")).en(klasse=klasse)
    assert "autofocus" not in uten.attributter

    med = vis_makro(kall.replace("$", ", autofokus=true")).en(klasse=klasse)
    assert "autofocus" in med.attributter
    # En boks eller overskrift kan bare få fokus når den har tabindex
    if med.tag in {"div", "h1"}:
        assert med.attributter["tabindex"] == "-1"


# ---------- Meldinger ----------


def test_feilmelding_varsler_kan_fa_fokus_og_har_plass_til_prov_igjen():
    side = vis_makro(
        '{% call melding("feil", tittel=filnavn, id="filfeil") %}'
        '<button type="button">Prøv igjen</button>{% endcall %}',
        filnavn="«<b>cv</b>.docx» kan ikke leses.",
    )
    boks = side.en(klasse="melding-feil")
    assert boks.attributter["role"] == "alert"
    assert boks.attributter["tabindex"] == "-1"
    assert boks.attributter["id"] == "filfeil"
    ikon = boks.en(klasse="feilikon")  # det firkantede ikonet
    assert ikon.tekst == "!"
    assert ikon.attributter["aria-hidden"] == "true"
    tekst = boks.en(klasse="melding-tekst")
    assert tekst.barn[0].tag == "strong"
    assert tekst.barn[0].tekst == "«<b>cv</b>.docx» kan ikke leses."  # filnavnet escapes
    assert not side.finn("b")
    assert tekst.en("button").tekst == "Prøv igjen"


@pytest.mark.parametrize(
    ("kall", "rolle"),
    [
        ('melding("info")', None),
        ('melding("info", rolle="status")', "status"),
        ('melding("bekreftelse")', "status"),
    ],
)
def test_roller_for_info_og_bekreftelse(kall, rolle):
    boks = vis_makro(f"{{% call {kall} %}}Tekst{{% endcall %}}").en(klasse="melding")
    assert boks.attributter.get("role") == rolle
    assert "Tekst" in boks.tekst
    assert boks.barn[0].attributter["aria-hidden"] == "true"


# ---------- Komponentsiden ----------


@pytest.mark.parametrize("steg", [1, 2, 3])
def test_symboler_ved_siden_av_ord_er_skjult_for_skjermleser(steg):
    symboler = [
        element
        for element in komponentsiden(steg).alle()
        for del_ in element.innhold
        if isinstance(del_, str) and del_.strip() in {"✓", "?", "!", "i"}
    ]
    assert {e.tekst for e in symboler} == {"✓", "?", "!", "i"}
    assert all(e.skjult_for_skjermleser() for e in symboler)


def test_merkene_i_huskelisten_har_skjult_status_i_tekst():
    huskeliste = komponentsiden().en("ul", "huskeliste")
    # Et tomt merke (åpent punkt som ikke er et krav) har verken symbol eller statusord
    med_symbol = [merke for merke in huskeliste.finn(klasse="merke") if merke.barn]
    tekster = [merke.en(klasse="skjult").tekst for merke in med_symbol]
    assert set(tekster) == {"Dokumentert", "Mangler dokumentasjon", "Gjort"}


def test_komponentsiden_har_en_h1_og_overskrifter_uten_hopp():
    side = komponentsiden()
    nivaer = [int(e.tag[1]) for e in side.alle() if re.fullmatch("h[1-6]", e.tag)]
    assert nivaer.count(1) == 1
    assert nivaer[0] == 1
    assert {2, 3} <= set(nivaer)
    assert all(neste <= forrige + 1 for forrige, neste in zip(nivaer, nivaer[1:], strict=False))


def test_komponentsidens_radiogruppe_er_fieldset_med_legend():
    gruppe = komponentsiden().en("fieldset")
    assert gruppe.barn[0].tag == "legend"
    assert gruppe.barn[0].tekst == "Hva slags tekst vil du ha?"
    assert len([e for e in gruppe.finn("input") if e.attributter["type"] == "radio"]) == 2


def test_komponentsidens_felt_har_etiketter_og_gyldige_koblinger():
    side = komponentsiden()
    ider = [e.attributter["id"] for e in side.alle() if "id" in e.attributter]
    assert len(ider) == len(set(ider))
    felter = side.finn(klasse="felt-inndata")
    assert len([f for f in felter if f.tag == "textarea"]) > 2  # flere lange tekstfelt
    etiketter = {e.attributter.get("for") for e in side.finn("label")}
    for felt in felter:
        assert felt.attributter["id"] in etiketter
        for referanse in (felt.attributter.get("aria-describedby") or "").split():
            assert referanse in ider


def test_komponentsiden_og_stilarket_har_de_samme_klassene():
    """Komponentsiden dekker alle komponenter, og ingen klasse mangler stil eller er ubrukt."""
    css = (STATIC_MAPPE / "stil.css").read_text(encoding="utf-8")
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    selektorer = " ".join(re.findall(r"([^{}]+)\{", css))
    i_stilarket = set(re.findall(r"\.([a-z][a-z0-9-]*)", selektorer))
    brukt = {klasse for e in komponentsiden().alle() for klasse in e.klasser}
    assert brukt == i_stilarket


@pytest.mark.parametrize("sti", ["/", STI])
def test_alle_ressurser_er_lokale_og_finnes(sti):
    klient = komponentklient()
    adresser = [
        e.attributter[navn]
        for e in les(klient.get(sti).text).alle()
        for navn in ("src", "href")
        if navn in e.attributter and (navn == "src" or e.tag == "link")
    ]
    assert "/static/stil.css" in adresser
    for adresse in adresser:
        assert adresse.startswith("/") and not adresse.startswith("//"), adresse
        assert klient.get(adresse).status_code == 200, adresse


def test_appen_har_ingen_stilside():
    """Komponentene vises bare i testmalen (vedtatt 2026-11-26)."""
    klient = TestClient(create_app(Settings(_env_file=None)))
    assert klient.get(STI).status_code == 404
    assert not list((Path(STATIC_MAPPE).parent / "templates").rglob("komponent*"))
