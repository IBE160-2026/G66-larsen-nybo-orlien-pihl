# Supersøker

Gruppe **G66 — over 30?** · Gruppeprosjekt i **IBE160 Programmering med KI** ved Høgskolen i Molde, høsten 2026 (15 studiepoeng).

Supersøker hjelper unge jobbsøkere å tilpasse en søknad til en stilling, uten å påstå noe CV-en ikke viser. Brukeren legger inn CV og stillingsannonse. Appen viser hvilke krav CV-en dokumenterer, lar brukeren fortelle om det som mangler, og lager et utkast eller forslag til formuleringer som brukeren redigerer selv. Hva som skal bygges, står i [PRD-en](_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md).

**Status 2026-11-24:** Skjelettet står: appen starter, har konfigurasjon, tester og lint. Innlogging og de tre stegene bygges nå, se [issuene](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/issues). Frist for levering er 15. desember 2026.

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

## Konfigurasjon

Appen starter i **mock-modus** uten noen konfigurasjon, uten API-nøkkel og uten at data sendes ut av maskinen. Vil du endre noe, kopierer du eksempelfilen. `.env` er utenfor Git og skal aldri committes.

```sh
cp .env.example .env              # macOS, Linux og Git Bash
Copy-Item .env.example .env       # Windows PowerShell
```

| Variabel | Standard | Betydning |
|---|---|---|
| `SUPERSOKER_MODE` | `mock` | `mock` bruker ferdiglagde svar. `api` bruker en ekte språkmodell. |
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
| `app/` | Selve appen: `main.py` (oppstart), `config.py` (innstillinger), `routes/` (sider) og `templates/` (HTML-maler) |
| `tests/` | Automatiske tester. `tests/fixtures/job-applications/` har fire fiktive testpar med fasit. |
| `pyproject.toml`, `uv.lock` | Avhengigheter og verktøyoppsett. `uv.lock` låser versjonene. |
| `.env.example` | Eksempel på miljøvariabler uten hemmeligheter |
| `_bmad-output/planning-artifacts/` | Product brief, PRD og UX ([samlet designforslag](_bmad-output/planning-artifacts/ux/samlet-forslag/README.md)) |
| `_bmad-output/implementation-artifacts/` | Spesifikasjoner for det som bygges, koblet til issues |
| `.docs/` | [Sensorveiledningen](.docs/sensorveiledning.md) |
| `.logs/` | Sesjonslogger per gruppemedlem: hva som ble gjort, og hva som gjenstår |
| `_bmad/`, `.claude/` | BMAD-rammeverket og oppsett for KI-assistenten |

Nye sider legges i `app/routes/` (én fil per funksjon) og maler i `app/templates/`.

## Medlemmer

- Miranda Eriksen Larsen
- Helle Hoggen Nybø
- Elisabeth Kirkeland Orlien
