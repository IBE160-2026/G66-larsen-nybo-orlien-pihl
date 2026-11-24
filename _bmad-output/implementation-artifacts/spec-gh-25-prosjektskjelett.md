---
title: 'Prosjektskjelett for Supersøker (issue #25)'
type: 'feature'
created: '2026-11-24'
baseline_commit: '7c3f5ae483d589ae3a170d7cca2a5cce73287b86'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Repoet har ingen kode. Tre personer skal bygge hver sin funksjon parallelt fram til 7. desember, og trenger en felles grunnmur: en app som starter, en mappestruktur å legge ting i, tester, lint, konfigurasjon og en README som virker.

**Approach:** En minimal FastAPI-app med Jinja2 (alternativ A, vedtatt 23.11.2026 i PR #17). Konfigurasjon leses fra miljøvariabler med mock-modus som standard. Én side viser aktiv modus. Avhengigheter og Python-versjon styres med uv.

## Boundaries & Constraints

**Always:** Mock-modus er standard når ingenting er konfigurert (FR-26). `.env` er utenfor Git, og `.env.example` har tomme plassholdere (NFR-4). Appen bindes til 127.0.0.1 (AD-1). Bare kode som brukes nå: ingen tomme pakker, ingen utkommentert kode. Alle tekster til brukeren er norsk bokmål (NFR-3). Hver kommando i README kjøres før den skrives ned.

**Never:** Konto og database (#30), innlesing (#31), modellkontrakt og mock-adapter (#32), CSS og statiske filer (#28), CI, Docker. Ikke endre `_bmad/`, `.docs/`, `.logs/` eller `tests/fixtures/`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Ingen konfig | Ingen `SUPERSOKER_MODE` | `mode == "mock"` | N/A |
| API uten nøkkel | `MODE=api`, `OPENAI_API_KEY` tom | Oppstart stopper | Feilmelding sier at nøkkel mangler. Ingen stille fallback til mock (FR-30) |
| API med nøkkel | `MODE=api`, nøkkel satt | `mode == "api"` | N/A |
| Ugyldig modus | `MODE=foo` | Oppstart stopper | Valideringsfeil som nevner gyldige verdier |
| Forside, mock | `GET /` | 200 og teksten «Mock-modus er på – ingen tekst sendes til en språkmodell.» | N/A |
| Forside, api | `GET /` | 200 og tekst om at API-modus er på | N/A |

</frozen-after-approval>

## Code Map

- `README.md` -- nesten tom i dag. Skrives om. Medlemslisten har fire navn og rettes til tre.
- `.gitignore` -- dekker Python, `.env` og cache, men ikke `data/`, `*.db` og `*.sqlite3`.
- `tests/fixtures/job-applications/` -- fire testpar for senere tester. Ikke rør.
- `_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md` -- NFR-4, NFR-7, FR-26 og vedtak 15.
- Planlagt plassering (ikke opprettet nå): `app/routes/<funksjon>.py` per funksjon, `app/services/` for brukstilfeller og `app/adapters/` for modell, database og PDF. Opprettes av den som trenger dem først.

## Tasks & Acceptance

**Execution:**
- [x] `pyproject.toml`, `.python-version`, `uv.lock` -- avhengigheter via `uv add`, Python 3.12, konfig for pytest og ruff -- reproduserbar installasjon
- [x] `app/config.py` -- `Settings` med `mode` (mock|api) og `openai_api_key`, validering etter matrisen -- konfig på ett sted
- [x] `app/main.py`, `app/routes/pages.py` -- `create_app(settings)` og forsiden -- mønster for nye ruter og testbar
- [x] `app/templates/base.html`, `index.html` -- språk `nb`, `<main>`, modusbanner -- Helle bygger videre i #28
- [x] `.env.example`, `.gitignore` -- plassholdere og ignorering av data og database -- NFR-4, kriterium 7
- [x] `tests/test_config.py`, `tests/test_pages.py` -- tester av hver rad i matrisen -- kriterium 3
- [x] `README.md` -- hva appen er, forutsetninger, installasjon, oppstart, miljøvariabler, tester, mappestruktur, lenker og medlemmer (Miranda, Helle og Elisabeth) -- NFR-7, kriterium 6

**Acceptance Criteria:**
- Given en ren kloning og uv installert, when `uv sync` og oppstartskommandoen kjøres, then `GET http://127.0.0.1:8000/` gir 200 med mock-banneret.
- Given ingen `.env`, when `uv run pytest` kjøres, then alle tester består.
- Given `.env.example` kopiert til `.env`, when appen starter, then den starter i mock-modus uten endringer.
- Given at kommandoene er kjørt, when `git status` vises, then verken `.venv`, `.env`, `__pycache__` eller database er med.

## Implementation Notes

Alle oppgaver og akseptansekriterier er verifisert 2026-11-24, også i en ren kopi uten `.venv` og `.env`.

**Avvik og funn underveis:**
- **Oppstart med `--factory`:** `uvicorn app.main:create_app --factory` i stedet for en global `app = create_app()`. Da leses innstillingene først ved oppstart, og import i tester feiler ikke på utviklerens egen `.env`. README og tester følger dette.
- **`httpx` var utdatert (KI-feil):** Claude valgte `httpx` til testklienten fra hukommelsen. Første testkjøring ga en advarsel om at `httpx2` skal brukes. Byttet til `httpx2`.
- **Ruff var for bred (KI-feil):** Første `ruff check .` fant 149 «feil» i BMAD-rammeverkets skript i `_bmad/`, og `ruff format .` ville dessuten ha skrevet om Markdown (README, CLAUDE.md og alle loggfiler). Begrenset til `include = ["*.py"]` og ekskludert `_bmad`, `_bmad-output` og `.claude`.
- **Python 3.12 hentes automatisk:** Bekreftet ved at uv lastet ned 3.12.11 på en maskin som bare hadde 3.13. Installasjonskommandoene for uv er sjekket mot offisiell dokumentasjon.
- **README rettet to ganger før sjekken:** Et utsagn om arkitekturgrunnlag (PR #17 er ikke merget) og om at 1024 px «fungerer» (er et krav, ikke testet).
- **Medlemslisten** rettet til tre, etter bekreftelse fra Elisabeth.

- **Tre tester lagt til etter gjennomgangen** (11 tester totalt): oppstartsveien uten argumenter, `.env` i arbeidsmappen og `.env.example`. Hullene ble påvist ved å ødelegge koden med vilje i en ren kopi: de 8 første testene besto alle tre mutasjonene, mens de nye feiler på hver sin.
- **README-kommandoene er verifisert:** `uv sync`, `pytest`, `ruff`, oppstart (også med `--reload`), `Copy-Item`, `cp` og `git ls-remote` på klone-adressen er kjørt. uv-installasjonen er bare sjekket mot dokumentasjonen.
- **Blandede linjeskift i en testfil (egen feil):** Første forsøk på å skrive testen ga en ugyldig streng fordi `
` ble til et ekte linjeskift. Ruff fanget det.

**Kjente begrensninger:**
- Feilmeldingen ved ugyldig modus kommer fra pydantic og er på engelsk. Den vises bare til den som starter appen, ikke til brukeren (NFR-3 gjelder brukermeldinger).
- Ved `MODE=api` uten nøkkel viser uvicorn en lang feilutskrift. Meldingen på siste linje er tydelig, men utskriften er støyende.
- `.env` leses fra mappen appen startes i. Starter man den fra en annen mappe, blir det stille mock-modus.
- Forsiden har ingen CSS (Helle, #28).

## Review Triage Log

Gjennomgangen er gjort av samme økt i tre adskilte omganger (Blind Hunter, Edge Case Hunter og Verification Gap), ikke av uavhengige underagenter, etter valg fra Elisabeth. Den uavhengige kontrollen er pull request-gjennomgangen. Blind Hunter-minstekravet var N = 4 (diff på 12,5 kB).

| # | Lag | Funn | Verdikt | Utfall og bevis |
|---|---|---|---|---|
| 1 | VG | Oppstartsveien `create_app()` uten argumenter (uvicorn `--factory`) har ingen test | medium | **patch.** Mutasjon `settings or None` ga vist feil banner og 8 av 8 gamle tester besto. Ny test fanger den. |
| 2 | BH, VG | At `.env` leses (slik API-modus slås på) har ingen test | medium | **patch.** Mutasjon uten `env_file` besto gamle tester. `test_env_filen_i_arbeidsmappen_leses` feiler nå. |
| 3 | VG | `.env.example` kopiert til `.env` skal gi mock, men ingen test sjekker det | medium | **patch.** Mutasjon med `MODE=api` i eksempelfilen besto gamle tester. Ny test feiler nå. |
| 4 | EC (påstand) | «Hver kommando i README kjøres» stemte ikke for `Copy-Item`, `--reload` og klone-adressen | medium | **patch.** Alle kjørt og i orden. Repoet er offentlig, og anonym kloning virker. uv-installasjonen er sjekket mot offisiell dokumentasjon, ikke kjørt. |
| 5 | BH | Testen av ugyldig modus matcher pydantics engelske ordlyd (`'mock' or 'api'`) | low | **patch** (direkte retting): `match="mock.*api"`. |
| 6 | BH, EC | `.env` og `app` leses fra arbeidsmappen. Start fra en annen mappe gir stille mock-modus | low | Avvist: README sier `cd` først, og begrensningen er notert. Å fikse den krever sti-logikk. |
| 7 | BH | Bannerteksten har ingen rolle eller landemerke | low | Avvist: kosmetisk. Universell utforming og CSS kommer i #24 og #28. |
| 8 | BH | Ruter gjentar `request.app.state.templates.TemplateResponse` | low | Avvist: en rute med egen `Jinja2Templates` feiler høylytt på `settings`, ikke stille. |
| 9 | EC | Malen viser API-tekst for alt som ikke er `mock` (implisitt gren) | low | Avvist: bare to moduser finnes, og det er ikke planlagt flere. |
| 10 | EC | API-nøkkel med mellomrom rundt lagres uten trim | low | Avvist: dotenv trimmer verdier, og en guard ville gitt mer kode. |
| 11 | EC (påstand) | «Appen bindes til 127.0.0.1» sikres bare av `--host` i README | low | Avvist: uvicorn bruker 127.0.0.1 som standard også. |
| 12 | EC (påstand) | Feilmelding for ugyldig modus er på engelsk (NFR-3) | low | Avvist: vises bare til den som starter appen. Notert som begrensning. |
| 13 | BH | Statuslinjen i README blir utdatert | low | Avvist: README skrives ferdig i #39. |
| 14 | BH | Ingen feilsøking i README for opptatt port | low | Avvist: usannsynlig i vanlig bruk, og en feilsøkingsdel ville vokse. |
| 15 | BH | `*.db` i `.gitignore` er bredt | low | Avvist: ingen database-filer skal versjoneres. |
| 16 | BH | Bare nedre grenser på avhengighetene | false | `uv.lock` låser eksakte versjoner. |
| 17 | EC (påstand) | «Ingen tomme pakker», men to `__init__.py` er tomme | false | Begge pakkene har innhold (`routes/pages.py`) og trengs for importene. |

Ingen intent_gap eller bad_spec. Ingen defer.

## Design Notes

**uv i stedet for pip og venv:** `python` er ikke på PATH på Elisabeths maskin (Windows-snarveien til Microsoft Store), og det viser hvor lett en ren maskin stopper her. uv henter riktig Python selv, låser versjoner i `uv.lock` og er allerede nødvendig for BMAD-skriptene i repoet. Ulempen er ett ekstra installasjonssteg i README. Alternativet pip og venv trenger Python på forhånd.

**Faktorisering:** `create_app(settings)` lar testene bruke egne innstillinger uten å røre miljøet. Mappestrukturen er et forslag og justeres hvis Miranda sin endelige arkitektur (#23) velger noe annet.

**Medlemslisten:** README listet fire medlemmer (inkludert Tove O. Pihl), men gruppa er tre. Elisabeth bekreftet 2026-11-24 at listen skal rettes, så Tove O. Pihl fjernes.

## Verification

**Commands:**
- `uv sync` -- expected: installerer uten feil
- `uv run pytest` -- expected: alle tester består
- `uv run ruff check .` og `uv run ruff format --check .` -- expected: ingen funn
- `uv run uvicorn app.main:app --host 127.0.0.1 --port 8000` og `curl http://127.0.0.1:8000/` -- expected: 200 og mock-teksten

**Manual checks (if no CLI):**
- Klon grenen til en tom mappe og følg bare README. Alt skal virke uten ekstra steg.
