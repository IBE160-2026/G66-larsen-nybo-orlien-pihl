# PRD-revisjon etter faglærers tilbakemelding

## 2026-11-12 kl. 19:57 — elizabeth

### Oppgave
Finne faglærers tilbakemelding på PRD-en og lage en forbedret PRD etter den, på en egen branch.

### Plan
- Les [tilbakemelding-prd.md](../../_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/tilbakemelding-prd.md), PRD, addendum og `.memlog.md`.
- Kjør `bmad-prd` i Update-modus. De fire beslutningene som er gruppas å ta, ble lagt fram for Elisabeth: kantsaker, grenser, reserveregel og antakelser. Elisabeth valgte faglærers forslag på alle fire.
- Skriv om PRD-en, flytt full ordlyd for vedtak 1–9 til addendum og logg nye vedtak i `.memlog.md`.

### Resultat
- Branch `prd-revisjon-tilbakemelding`, commit `989834a`. Endret: `prd.md`, `addendum.md` og `.memlog.md` i `_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/`.
- **4.1:** Alle 30 FR-er har prioritet. FR-6, FR-14 og FR-28 er «bør», resten er «må». FR-21 er forenklet: CV og annonse endres via «Endre CV eller annonse» med bekreftelse, og tilstanden «utdatert» er fjernet. 25-minuttersvarselet, serverens avvisning av duplikater og ignorering av sene svar er «bør». Utlogging og sletting etter 30 minutter er fortsatt «må».
- **4.2:** Startverdier som `[ASSUMPTION]`: 2 MB, 10 000 tegn, 1 000 tegn per svar og 30 sekunders tidsavbrudd.
- **4.3:** Reserveregel og kostnadsoverslag i §8: ca. 2 kr per serie, under 10 kr i verste fall.
- **4.4:** §0 er renset, og §9 er nå en tabell med vedtak 1–14 og berørte krav.
- **4.5:** «Teksten», «Lag tekst» og «Teksten bygger på» er de faste begrepene.
- De gamle antakelsene i §10 er bekreftet (vedtak 13). §10 inneholder nå startverdiene.
- Kontroll: 30 FR-er med prioritet, lokale lenker fungerer og `git diff --check` er ok. Status er fortsatt `draft`.
- Bevisst ikke gjort: kort brukerreise for sensor i mock-modus. UJ-1 er eneste reise etter tidligere vedtak.

### Åpne punkter
- Gruppa må godkjenne vedtak 10–14 i PR-en. Vedtak 10 overstyrer deler av gruppevedtak 7. Sett deretter PRD-status til `final`.
- UX-prototypen må oppdateres til «Lag tekst» og «Teksten bygger på», og vise flyten for «Endre CV eller annonse».
- Arkitekturen må bekrefte eller justere startverdiene i PRD §10 og kontrollere pris for gpt-5-mini.
