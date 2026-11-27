# Supersøker

Gruppe **G66 — over 30?** · Gruppeprosjekt i **IBE160 Programmering med KI** ved Høgskolen i Molde, høsten 2026 (15 studiepoeng).

Supersøker hjelper unge jobbsøkere å tilpasse en søknad til en stilling, uten å påstå noe CV-en ikke viser. Brukeren legger inn CV og stillingsannonse. Appen viser hvilke krav CV-en dokumenterer, lar brukeren fortelle om det som mangler, og lager et utkast eller forslag til formuleringer som brukeren redigerer selv. Hva som skal bygges, står i [PRD-en](_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md).

**Status 2026-11-27:** Skjelettet, den felles siderammen og kontoene (opprette konto, logge inn og ut) står. De tre stegene bygges nå, se [issuene](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/issues). Frist for levering er 15. desember 2026.

## Forutsetninger

- **Git**
- **[uv](https://docs.astral.sh/uv/getting-started/installation/)**. uv henter og bruker Python 3.12 selv, så Python trenger ikke installeres på forhånd.

Installer uv hvis du ikke har det, og åpne en ny terminal etterpå:

```sh
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS og Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Installasjon og oppstart

```sh
git clone https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl.git
cd G66-larsen-nybo-orlien-pihl
uv sync
uv run uvicorn app.main:create_app --factory --host 127.0.0.1 --port 8000
```

Åpne <http://127.0.0.1:8000> i nettleseren. Du skal se «Mock-modus er på – ingen tekst sendes til en språkmodell.» Stopp appen med `Ctrl+C`.

Appen er laget for datamaskin, og mobil støttes ikke (vedtak 15 i PRD-en). Kjerneflyten skal fungere i nettleservinduer fra 1024 px bredde.

Under utvikling kan du legge til `--reload`, så starter appen på nytt når filer endres.

## Innlogging og testbruker

Alle sider unntatt innlogging og registrering krever innlogging. Appen har en ferdig testbruker i mock-modus, så du slipper å opprette konto:

| | |
|---|---|
| E-post | `testbruker@supersoker.no` |
| Passord | `Supersoker-test-2026` |

Testbrukeren opprettes automatisk første gang appen starter, og finnes ikke i API-modus. Du kan også opprette en egen konto med «Opprett konto» (e-post og passord på 8–256 tegn; navn lagres ikke).

Kontoene ligger i SQLite-filen `data/supersoker.db`, som opprettes automatisk og ikke er med i Git. Der lagres bare e-post og Argon2id-hash av passordet.

Kjente begrensninger:

- Økter ligger i serverens minne. En omstart av serveren logger alle ut.
- Appen begrenser ikke antall innloggingsforsøk.

## Konfigurasjon

Appen starter i **mock-modus** uten noen konfigurasjon, uten API-nøkkel og uten at data sendes ut av maskinen. Vil du endre noe, kopierer du eksempelfilen. `.env` er utenfor Git og skal aldri committes.

```sh
cp .env.example .env              # macOS, Linux og Git Bash
Copy-Item .env.example .env       # Windows PowerShell
```

| Variabel | Standard | Betydning |
|---|---|---|
| `SUPERSOKER_MODE` | `mock` | `mock` bruker ferdiglagde svar. `api` bruker en ekte språkmodell. |
| `SUPERSOKER_DATABASE` | `data/supersoker.db` | Hvor kontodatabasen ligger. Mappen opprettes automatisk. |
| `OPENAI_API_KEY` | tom | Nøkkel til språkmodellen. Kreves i `api`-modus, og appen stopper ved oppstart hvis den mangler. |

## Tester og kodestil

```sh
uv run pytest                       # kjør testene
uv run ruff check .                 # sjekk kodestil
uv run ruff format --check .        # sjekk formatering
```

Testene krever hverken nøkkel eller nettverk. Ruff gjelder bare Python-filene i `app/` og `tests/`.

## Mappestruktur

| Mappe eller fil | Innhold |
|---|---|
| `app/` | Selve appen: `main.py` (oppstart), `config.py` (innstillinger), `accounts.py` (kontoer i SQLite), `sessions.py` (økter og CSRF-vern), `routes/` (sider og innlogging), `templates/` (HTML-maler, med Jinja-makroer i `templates/makroer/`) og `static/` (stilarket `stil.css`) |
| `tests/` | Automatiske tester. `tests/fixtures/job-applications/` har fire fiktive testpar med fasit, og `tests/fixtures/testbruker.json` har testbrukeren. Begge er appdata, ikke bare testdata. `tests/komponentside.py` og `tests/maler/` viser alle felles komponenter samlet. |
| `data/` | Kontodatabasen. Opprettes ved oppstart og er utenfor Git. |
| `pyproject.toml`, `uv.lock` | Avhengigheter og verktøyoppsett. `uv.lock` låser versjonene. |
| `.env.example` | Eksempel på miljøvariabler uten hemmeligheter |
| `_bmad-output/planning-artifacts/` | Product brief, PRD og UX ([samlet designforslag](_bmad-output/planning-artifacts/ux/samlet-forslag/README.md)) |
| `_bmad-output/implementation-artifacts/` | Spesifikasjoner for det som bygges, koblet til issues |
| `.docs/` | [Sensorveiledningen](.docs/sensorveiledning.md) |
| `.logs/` | Sesjonslogger per gruppemedlem: hva som ble gjort, og hva som gjenstår |
| `_bmad/`, `.claude/` | BMAD-rammeverket og oppsett for KI-assistenten |

Nye sider legges i `app/routes/` (én fil per funksjon) og maler i `app/templates/`.

## Ny side med grunnmalen

Utseende og oppførsel står i [DESIGN.md](_bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/DESIGN.md) og [EXPERIENCE.md](_bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/EXPERIENCE.md). `base.html` gir den faste siderammen: «Hopp til innhold», mock-stripen (bare i mock-modus), toppfeltet og innholdet. En side fyller bare blokkene den trenger:

```jinja
{% extends "base.html" %}
{% from "makroer/sideoverskrift.html" import sideoverskrift %}
{% from "makroer/tekstfelt.html" import tekstfelt %}
{% from "makroer/melding.html" import melding %}

{% set aktivt_steg = 1 %}

{% block title %}CV og annonse – Supersøker{% endblock %}

{% block content %}
{{ sideoverskrift("Legg inn CV-en", "og annonsen.", overtittel="Steg 1 av 3") }}
<form id="grunnlag" method="post">
  {# Meldingen får fokus bare når ingen felt har feilen #}
  {% if feilmelding %}
    {% call melding("feil", autofokus=not (cvfeil or annonsefeil)) %}{{ feilmelding }}{% endcall %}
  {% endif %}
  {# Ellers får det første ugyldige feltet fokus #}
  {{ tekstfelt("cv", "CV-tekst", "cv", flerlinje=true,
               verdi=cv, feil=cvfeil, teller=10000, autofokus=cvfeil) }}
  {{ tekstfelt("annonse", "Annonsetekst", "annonse", flerlinje=true,
               verdi=annonse, feil=annonsefeil, teller=10000,
               autofokus=annonsefeil and not cvfeil) }}
</form>
{% endblock %}

{% block handlingslinje %}
<button class="knapp-primar" type="submit" form="grunnlag">Analyser kravene →</button>
{% endblock %}
```

| Del | Bruk |
|---|---|
| Blokker | `title` (alltid: «&lt;Stegets navn&gt; – Supersøker»), `bruker` (e-postadresse og «Logg ut»), `content`, `sidekolonne`, `modellfeil` (nederst i hovedkolonnen), `handlingslinje` og `skript`. En tom blokk gir ingen tom beholder. |
| `aktivt_steg`, `steg_lenker` | `aktivt_steg` (1–3) viser stegindikatoren. `steg_lenker` er `{nummer: url}`, og et annet steg med lenke vises som fullført. Settes i malen eller sendes fra ruten. Nøklene er tall. |
| `sideoverskrift` | Sidens ene `h1`. Valg: `aksent`, `overtittel`, `ingress` og `autofokus`. |
| `tekstfelt` | `id`, `etikett` og `navn`, og ved behov `type` eller `flerlinje`, `verdi`, `hjelpetekst`, `feil`, `teller` (tegngrensen), `readonly`, `autofokus` og `attributter` (f.eks. `autocomplete`, `rows`, `data-*`). Passord skrives aldri tilbake, og feltet får aldri `maxlength`. Attributter som makroen selv styrer (bl.a. `type`, `value`, `id` og `class`), hoppes over i `attributter`. |
| `melding` | `"feil"`, `"info"` eller `"bekreftelse"`, med innhold via `call`. Valg: `tittel` (uthevet første setning), `id`, `rolle` og `autofokus`. |
| Handlingslinje | Ligger utenfor skjemaet. Koble primærknappen til med `form="<skjema-id>"`. |
| Fokus | Slå på `autofokus` for `h1` ved stegbytte. Ved feil slås den på for det første ugyldige feltet, og for feilmeldingen bare når ingen felt har feilen. Aldri for `h1` ved vanlig lasting, for da kommer ikke «Hopp til innhold» først. |
| Lenker | Alle lenker på en side må ha klassen `lenke`, eller en knappeklasse (`knapp-primar`, `knapp-sekundar`). En lenke uten klasse får nettleserens blå og lilla farger. |

Knapper, kort og merker er CSS-klasser i `app/static/stil.css`. Fargeverdier står bare i `:root` der. Komponentsiden viser klassene i bruk (`tests/maler/komponentside.html`). Start den slik, og åpne <http://127.0.0.1:8001/komponenter> (`?steg=1` og `?steg=3` viser stegindikatoren på de andre stegene):

```sh
uv run python -m tests.komponentside
```

## Medlemmer

- Miranda Eriksen Larsen
- Helle Hoggen Nybø
- Elisabeth Kirkeland Orlien
