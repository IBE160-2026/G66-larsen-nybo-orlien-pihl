---
title: 'Konto: registrering, innlogging, utlogging og testbruker (issue #30, story 1.3–1.5)'
type: 'feature'
created: '2026-11-26'
baseline_commit: 'a3255f0'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/planning-artifacts/architecture/supersoker-v1/ARCHITECTURE-SPINE.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/EXPERIENCE.md'
  - '{project-root}/app/templates/base.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Appen har ingen brukere. Alle senere funksjoner (steg 1–3, økt) krever at noen er innlogget, og sensor må kunne logge inn uten å opprette konto.

**Approach:** Konto i SQLite (bare e-post og Argon2id-hash), registrering, innlogging og utlogging med økt-ID i HttpOnly-cookie og CSRF-vern, og en testbruker som opprettes ved oppstart i mock-modus. Forsiden krever innlogging. Arbeidsområdet i økten og 30-minuttersutløpet bygges i #35.

## Boundaries & Constraints

**Always:** Navn lagres ikke (FR-1). Passord lagres bare som hash, og logges aldri (NFR-5). Samme melding for ukjent e-post og feil passord (FR-2). Ny tilfeldig økt-ID ved hver innlogging; gammel ID gir aldri tilgang igjen. Alle tilstandsendrende forespørsler, også innlogging og registrering, krever CSRF-token. Meldingene står ordrett som i EXPERIENCE.md. Sidene bygger på Helles grunnmal og makroer fra #28 (`base.html`, `tekstfelt`, `melding`, `sideoverskrift`) og lager ingen egne stiler eller farger. Passord har en øvre grense på 256 tegn, siden Argon2 er bevisst treg; grensen meldes som feil og passordet kuttes aldri. Testbrukerens passord står bare i README og `tests/fixtures/testbruker.json` (FR-3), aldri i appkoden. Cookien er HttpOnly, `SameSite=Lax`, `Path=/` og `Secure` bare når forespørselen kom over HTTPS (lokalt over HTTP virker den uten). To nye meldinger føres inn i meldingstabellen i EXPERIENCE.md, merket «ny», i samme PR: «Passordet kan ha høyst 256 tegn. Skriv et kortere passord.» og for CSRF-feil «Forespørselen kunne ikke godkjennes. Last siden på nytt og prøv igjen.» En for lang e-post bruker meldingen «E-postadressen har feil format …». «Testbruker står i README.» vises bare i mock-modus, siden testbrukeren ikke finnes i API-modus.

**Never:** Arbeidsområde, 30-minuttersutløp og rydder (#35). Endringer i `base.html`, `stil.css` og makroene (Helles, #28). Mangler en komponent, meldes det til Helle. Steg 1–3. Navn, telefon eller andre kontofelt. Sosial innlogging, glemt passord og e-postbekreftelse. Testbruker i API-modus.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Registrering | Gyldig e-post, passord ≥ 8 tegn, gyldig CSRF | Konto lagret med Argon2id, 303 til `/logg-inn` | N/A |
| Ugyldig e-post / for kort eller for langt passord / e-post i bruk | Skjema. Gyldig e-post: én `@`, noe før og etter, punktum i domenet, ingen mellomrom, høyst 254 tegn. Passord 8–256 tegn | 422, melding ved feltet (`tekstfelt` med `feil`), første ugyldige felt har `autofocus`, e-post beholdt, passord tomt | Ingen konto lagres. «I bruk» sjekkes også ved samtidig innsending via unik indeks |
| Innlogging | Riktig e-post og passord | Ny økt-ID i cookie (en eventuell gammel slettes), 303 til `/`, `bruker`-blokken i toppfeltet viser e-post og «Logg ut» | N/A |
| Feil innlogging | Ukjent e-post eller feil passord | 401, samme `melding("feil")` begge tilfeller, e-post beholdt, passord tomt, fokus på meldingen | Ukjent e-post hasher likevel et blindpassord |
| Uinnlogget | `GET /` | 303 til `/logg-inn` | N/A |
| Allerede innlogget | `GET /logg-inn` eller `/opprett-konto` med gyldig økt | 303 til `/` | N/A |
| Utlogging | `POST /logg-ut` med CSRF | Økt og cookie slettes straks uten bekreftelse, 303 til `/logg-inn`; gammel ID gir ikke tilgang | Uten CSRF: 403 |
| CSRF mangler eller er feil | Noen `POST` | 403 med siden i grunnmalen og meldingen over, ingenting endres | Ingen rå JSON- eller engelsk feilside |
| Testbruker | Oppstart i mock | Finnes med hash, ikke duplisert ved ny oppstart; finnes ikke i API-modus | Manglende fil: ingen testbruker, appen starter |

</frozen-after-approval>

## Code Map

- `EXPERIENCE.md` -- meldingstabellen får de to nye meldingene (merket «ny»)
- `app/main.py` -- `create_app`: legger på database, kontolager og økter på `app.state`, rutene og testbruker-seeding. Beholder `/static`-monteringen
- `app/config.py` -- `Settings`: legges til `database` (`data/supersoker.db`)
- `app/routes/pages.py`, `app/templates/index.html` -- `forside`: krever innlogging og fyller `bruker`-blokken i `base.html` med e-post og «Logg ut» (et skjema med `button.lenke`)
- `app/templates/base.html`, `makroer/`, `static/stil.css` -- Helles; brukes, endres ikke. Klassene `innlogging`, `skjemakort`, `skjemakort-handlinger`, `introduksjon-liste` finnes allerede
- `tests/test_pages.py` -- tester `/` uten innlogging; stripe- og overskriftstestene flyttes til `/logg-inn`, og `/` testes innlogget
- `tests/conftest.py` -- ny felles funksjon som setter `SUPERSOKER_DATABASE` til en midlertidig fil for hver test, så ingen test deler eller forurenser `data/`
- Ny: `app/accounts.py`, `app/sessions.py`, `app/routes/auth.py`, `app/templates/logg_inn.html`, `opprett_konto.html`, `tests/fixtures/testbruker.json`, `tests/test_accounts.py`, `tests/test_auth.py`
- Ikke endre: `tests/fixtures/job-applications/`, `_bmad/`, `.docs/`, `.logs/`

## Tasks & Acceptance

**Execution:**
- [x] `pyproject.toml`, `uv.lock` -- legg til `pwdlib[argon2]` og `python-multipart` -- Argon2id (AD-2) og skjemaparsing
- [x] `app/accounts.py` -- SQLite-lager (unik e-post), validering, hash og kontroll, testbruker-seeding -- AD-1, AD-2
- [x] `app/sessions.py` -- økter i RAM: lag ny, hent, slett; CSRF-token -- minste grunnlag som #35 bygger videre på
- [x] `app/routes/auth.py`, malene -- `/opprett-konto`, `/logg-inn`, `/logg-ut`, med faste tekster fra EXPERIENCE.md, egen `<title>`, `autofocus` på første ugyldige felt, og lenker mellom «Logg inn» og «Opprett konto»
- [x] `app/main.py`, `app/config.py`, `pages.py`, `index.html`, `.env.example` -- koble på, beskyttet forside, `SUPERSOKER_DATABASE`
- [x] `tests/conftest.py`, `tests/test_pages.py`, `tests/` -- isolert database per test; oppdater siderettene; test hver rad i matrisen og kriteriene under, også logger uten passord og at databasefila opprettes på en ren maskin
- [x] `README.md` -- testbruker, mappetabell, at restart logger ut

**Acceptance Criteria:**
- Gitt to klienter A og B innlogget samtidig, når hver åpner `/`, så ser hver bare sin egen e-post (grunnlag for FR-24; arbeidsdata kommer i #35).
- Gitt en normal registrering og innlogging, når `caplog` leses, så finnes ikke passordet i noen logg.
- Gitt en ren klone, når appen startes i mock, så kan README-ens testbruker logge inn uten ekstra steg.
- Gitt en ren maskin uten `data/`, når appen startes, så opprettes databasefila automatisk.
- Gitt to registreringer med samme e-post samtidig, så lagres bare én konto.
- Gitt en ugyldig CSRF-token eller et passord på 257 tegn, så vises de nye meldingene ordrett, og ingenting lagres.
- Gitt en ren klone i API-modus, så vises ikke «Testbruker står i README.» og ingen testbruker finnes.
- Gitt innloggingssiden i mock, så har den overskriften, ingressen, den nummererte listen og «Testbruker står i README.» fra EXPERIENCE.md, og hvert felt har synlig etikett.
- Gitt `uv run pytest` og `uv run ruff check .`, så består begge.

## Implementation Notes

Bygget direkte (uten delagent) av Claude Sonnet 5.5, 27.11.2026. Funn i KI-generert kode som ble rettet underveis:
- Testhjelperen som leser CSRF-token feilet når klienten allerede var innlogget (siden redirecter, så skjemaet mangler). Rettet ved å lese tokenet fra cookien når skjemaet ikke finnes.
- E-postregelen godtok `ida@.no` og `ida@eksempel.`. Skjerpet: domenet kan ikke starte eller slutte med punktum og ikke ha to på rad.
- Første testutkast for «passord tømmes» var uleselig og sjekket ingenting presist. Skrevet om til en direkte sjekk av at passordfeltet ikke har `value`.
- `tests/test_pages.py` var CRLF og lot seg ikke redigere automatisk. Konvertert til LF, som resten av repoet.

Mutasjonskontroll (14 manuelle endringer i CSRF-sjekk, økt-rotasjon, utlogging, passordgrenser, blindhash, normalisering av e-post, testbruker i API-modus, innloggingskrav, HttpOnly, statuskode): alle 14 ble oppdaget av testene.

Kjent avvik fra «ruff check . består»: 19 E501-feil i `tests/testgrunnlag/kontroller.py` (Mirandas PR #14, finnes på main). Ikke rettet her. Filene i denne PR-en er rene.

## Spec Change Log

## Review Triage Log

Selvgransking mot diffen (ingen delagenter brukt). Alle funn er egne.

| Funn | Verdi | Behandling |
|---|---|---|
| E-post `ida@.no` godtas | low | patch: skjerpet regel og lagt til tester |
| Ingen `Cache-Control: no-store` på innloggingssidene | false | Gjelder arbeidsdata, som kommer i #35 |
| Økter vokser uten utløp | false | Kjent og beskrevet i Design Notes, #35 |
| `GET /logg-ut` gir standard 405 på engelsk | low | defer: sjeldent, rettes når feilsider samles |
| Ingen grense for antall innloggingsforsøk | false | Beskrevet i Design Notes og README |
| Syntaksfeil i testbruker.json stopper oppstart | false | Fila er vår egen testdata, og feilen er tydelig |

## Design Notes

**Valg uten spørsmål:** Dobbel-innsending av CSRF-token (cookie og skjemafelt) brukes også for anonyme skjemaer. E-post lagres med små bokstaver og trimmet. Testbrukeren leses fra `tests/fixtures/testbruker.json`, slik testparene allerede er appdata (FR-27), og opprettes bare i mock-modus, så en kjent konto aldri finnes når appen kan sende data ut. Før #35 finnes ingen utløpstid: økten lever til utlogging eller omstart, og hver innlogging legger en økt i minnet som bare fjernes ved utlogging. E-postformat: enkel regel uten ekstra bibliotek. Ingen begrensning av antall innloggingsforsøk (ikke i PRD; dokumenteres som kjent begrensning i README). «E-post i bruk» avslører at en adresse har konto, men meldingen er fastsatt i EXPERIENCE.md og godtas. Rutene som hasher er vanlige `def`, ikke `async`, slik at Argon2 kjører i trådpoolen og ikke blokkerer serveren; hvert kall bruker egen SQLite-forbindelse. Passordgrensen på 256 tegn er et sikkerhetsvern utover PRD-ens «ingen andre passordregler» (valgt av Elisabeth 2026-11-27). Test hashing tar rundt 0,1 s per ny app fordi testbrukeren hashes når databasen er ny; det godtas.

## Verification

**Commands:**
- `uv run pytest` -- expected: alle tester består
- `uv run ruff check .` og `uv run ruff format --check .` -- expected: ingen funn
- Start `uv run uvicorn app.main:create_app --factory --host 127.0.0.1 --port 8000`, åpne `/` -- expected: sendt til innlogging, testbruker virker
