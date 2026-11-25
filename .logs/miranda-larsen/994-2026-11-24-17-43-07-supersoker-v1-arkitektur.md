# Supersøker V1 – gruppas arkitektur

## 2026-11-24 kl. 17:43 — Miranda Larsen

### Oppgave

Ferdigstill arkitekturen for GitHub-oppgave #23 og legg den frem for gjennomgang lokalt på branchen `arkitektur-supersoker-v1`.

### Plan

- Bruk gruppevedtak fra [issue #21](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/issues/21) og [PR #17](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/17), PRD og samlet UX ved `a1488c5`, sensorveiledningen og Mirandas historiske utkast ved `095ab23`.
- Utarbeid planen gruppa kan bygge etter, og samordne den endelige JSON-kontrakten i #22.
- Kontroller dokumentene og lever til gjennomgang etter brukerens godkjente plan.

### Resultat

- Opprettet [arkitekturdokumentet](../../_bmad-output/planning-artifacts/architecture/supersoker-v1/ARCHITECTURE-SPINE.md), teststrategien og BMAD-memloggen. Mirandas oppstartslogg og opprinnelige utkast ligger i historikken på PR #17.
- Gruppevedtakene er beholdt. Blant KI-forslagene ble semantiske handlingsnøkler og revisjonssjekker innarbeidet for å hindre dubletter og sene overskrivinger. Budsjettforslaget bruker en administrativ oversikt og prosessbundet RAM-bevilgning. Ved delvis fakturering beholdes hele den åpne bevilgningen fram til full avstemming. Forslagene er til gjennomgang.
- BMADs konfigurasjonsoppløsning, memlog, dokumentlint og uavhengige kontroller ble brukt. Lint ga null funn. Dokumentkontrollen fant FR-1–30, NFR-1–8 og T-1–T-10, og verifiserte lokale lenkemål og whitespace. Versjonskilder ble kontrollert. Lokal runtime rapporterte Python 3.12.14 og SQLite 3.53.1. Ingen app- eller installasjonstester eller betalte kall ble kjørt.
- Arbeidet ligger lokalt til brukerens gjennomgang. Brukeren ba uttrykkelig om å vente med commit, også i denne økten.
- Etter menneskelig kvalitetssikring ble arkitektur og teststrategi samordnet med PR #44 ved `382b1661`. Det tidligere HTTPX-forslaget ble erstattet med skjelettets TestClient og httpx2. Standard FastAPI-opplasting ble foretrukket med krav om verifisert størrelsesgrense og opprydding. Vedtak er skilt fra tekniske forslag, og kravet ved umiddelbar sideoppdatering står fortsatt åpent.
- Ny kontroll mot PR #44, kravdekning, lokale lenkemål og whitespace bestod. BMAD-lint ga null funn. Oppstart, opplasting og appflyt ble ikke kjørt i denne dokumentrunden.

### Åpne punkter

- Samordne endelig JSON-kontrakt og felles testpareksempler i #22.
- Verifiser kostnadsprotokoll, leverandørvilkår og restbudsjett før betalt API-modus.
- Røykprøv avhengighetssettet ved implementering og verifiser siste redigering ved umiddelbar reload i T-10.
- Verifiser størrelsesgrenser og opprydding etter standard FastAPI-opplasting som del av T-5.

## 2026-11-25 kl. 19:36 — Miranda Larsen

### Oppgave

Innarbeid Helles og Elisabeths gjennomgang av PR #46 på `arkitektur-supersoker-v1`.

### Plan

- Kontroller branch og arbeidsstatus. Les begge reviewene, arkitekturgrunnlaget og tilhørende logger.
- Samordne AD-4, AD-6 og teststrategien. Kjør dokumentkontroller før levering til gjennomgang.

### Resultat

- Elisabeth etterlyste Teams-vedtaket, tydelig ansvar, enklere tildeling og dokumentasjon for sensor. Helle støttet forslagene. AD-6 bruker vedtaket fra 24.11 og beskriver en engangstildeling i den lokale terminalen. Miranda er foreslått som ansvarlig for kostnadsoversikten og testing i #36 og #38. Uttrykkelig bekreftelse gjenstår. Grensen på 100 kr, kostnadssperren per kall og avstemming ved ukjent restbudsjett eller omstart er beholdt.
- Begge reviewer ba om et tydelig minimum for T-10. AD-4 og teststrategien krever at siste redigering overlever umiddelbar sideoppdatering i aktiv økt uten nytt modellkall. Utlogging og øktutløp sletter arbeidsdata, og sene modellresultater forkastes. Avansert flerfanehåndtering er et bør-krav. Playwright-krevende tester holdes utenfor standard pytest.
- Status `final` gjelder arkitekturbeslutningene. Helles forslag om å lukke PR #17 ble lagt til side etter brukerens beskjed. PR #17 beholdes åpen som historisk utkast.
- BMAD spine-lint ga null funn. Dokumentkontrollene omfattet lokale lenker, dekning for FR-1–30, NFR-1–8 og T-1–T-10, og whitespace. App-, nettleser- og betalte API-tester ble ikke kjørt. Endringene ligger lokalt til gjennomgang.

### Åpne punkter

- Bekreft Miranda som ansvarlig og verifiser budsjettprosedyren før betalt API-modus. Gjennomfør testseriene og legg rapporten for sensor i repoet i #38.
- Implementer og verifiser umiddelbar sideoppdatering, sletting og sene svar i T-10. Tidligere åpne punkter for #22, T-5 og avhengigheter følges fortsatt i `issues.md`.
