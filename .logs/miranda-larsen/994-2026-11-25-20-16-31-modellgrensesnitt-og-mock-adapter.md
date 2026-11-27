# Modellgrensesnitt og mock-adapter for Supersøker

## 2026-11-25 kl. 20:16 — Miranda Larsen

### Oppgave

Implementere GitHub-issue #32 på `miranda-mock-adapter-32` slik at de fire fiktive testparene kan brukes til lokal analyse og tekstgenerering.

### Plan

- Kontrollere branch og arbeidskopi. Lese FastAPI-skjelettet, issue #32, AD-5 fra arkitekturbranchen, modellkontrakten fra kontraktbranchen og de fire testparene.
- Implementere de to modelloperasjonene med faste lokale svar. Verifisere resultater og kildegrunnlag med pytest og Ruff.

### Resultat

- Opprettet `app/models/__init__.py`, `contracts.py` og `mock.py`. Adapterens råinnhold følger feltene i modellkontrakten. Scenario-ID, fixtureversjon og eventuell eksempelmerknad følger som intern metadata.
- Gjenbrukte eksisterende testpar og fasiter direkte for å unngå en ekstra kopi av CV-er, annonser og krav. Begge dokumentene må samsvare etter normalisering av linjeskift og ytre blanktegn. Egen tekst får testpar 1 som fiktivt grunnlag og bruker dets stillingsfelt.
- Begge tekstvalg bruker samme faste CV-formuleringer. Bare de faste demosvarene for hvert gap tas med. Negasjoner og forbehold beholdes, og analysekravenes status endres aldri av svarene.
- Kjørte hele pytest-suiten etter siste kodeendring. 34 tester besto, derav 23 nye adaptertester med sperret socket- og DNS-tilgang. Ruff lint og formateringskontroll besto med `.agents/` ekskludert. Kjøring fra roten med `.agents/` ga avvik i de eksisterende BMAD-skriptene.
- Endringene ligger lokalt til gjennomgang etter brukerens uttrykkelige beskjed om arbeid uten commit, push, PR eller merge.

### Åpne punkter

- Brukstilfellene må koble til adapteren og vise eksempelmerknaden med riktig kildegrunnlag. API-adapter og modusvalg i modellflyten hører til senere integrasjon. Full nettleserdekning for T-1 og T-3 gjenstår.

## 2026-11-27 kl. 07:23 — Miranda Larsen

### Oppgave

Følge opp Helles og Elisabeths review av PR #48 på `miranda-mock-adapter-32`, med PDF-gjenkjenning, robuste demosvar og avgrenset dokumentasjon.

### Plan

- Lese begge reviewene, adapteren, testene og PDF-testgrunnlaget fra PR #14.
- Oppdatere scenariovalg og demosvar og kjøre pytest, Ruff og `git diff --check`.

### Resultat

- Godtok Helles forslag om `.split()` for CV og annonse. Når ordsekvensene stemmer, må hvert fasitsitat for dekkede krav fortsatt finnes ordrett i CV-en. Ved manglende sitat brukes det merkede fiktive testpar 1 med sitt eget kildegrunnlag.
- Godtok begge reviewernes forslag om å normalisere bokstavstørrelse, mellomrom og avsluttende punktum og utropstegn ved oppslag. Adapteren bruker den faste ordlyden, inkludert negasjoner og forbehold. Faste svar virker også for det merkede eksempelet ved egen tekst. Vilkårlige svar utelates.
- Dokumenterte ved `TESTPAR` at testparene også er appdata i mock-modus. T-8 og T-9 er utenfor PR #48 og foreløpig uten kobling til adapteren.
- Hele pytest-suiten besto med 39 tester, inkludert tekstuttrekk fra alle fire PDF-ene med pypdf 6.2.0, korrekt scenario-ID, ordrette sitater og demosvar. PDF-testene bruker pypdf via `uv run --with pypdf==6.2.0 pytest` uten endring i prosjektets avhengigheter. De fire testene hoppes over i et miljø uten pypdf.
- Ruff lint og formateringskontroll besto for appen og pytest-filene. Kjøring fra roten med `.agents/` ekskludert viste 19 eksisterende lintavvik og ett formateringsavvik i kontrollskriptet fra PR #14. `git diff --check` besto.
- Endringene ligger ukommittert til Mirandas gjennomgang.

### Åpne punkter

- Brukergrensesnittet må vise hvilke demosvar mock støtter, eller gi beskjed når et svar utelates.
- Koble T-8 og T-9 til mock-adapteren i senere arbeid.
