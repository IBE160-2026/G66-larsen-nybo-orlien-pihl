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
