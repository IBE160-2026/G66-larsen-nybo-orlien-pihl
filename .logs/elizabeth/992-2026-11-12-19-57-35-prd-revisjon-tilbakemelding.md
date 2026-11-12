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
- Oppfølging: Elisabeth besluttet at arkitekturen fastsetter endelig tidsavbrudd etter måling (§10 og .memlog.md oppdatert).
- Kontroll: 30 FR-er med prioritet, lokale lenker fungerer og `git diff --check` er ok. Status er fortsatt `draft`.
- **Ferdigstilling** (commit `d8502b0`): memlog gjennomgått, kildesjekk mot brief.md og rubrikkgjennomgang uten underagenter ([review-rubric.md](../../_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/review-rubric.md)).
- **KI-forslag korrigert:** Claudes eget forslag om å sette FR-6, FR-14 og FR-28 til «bør» stred mot SM-2/briefkriterium 2, testpar 4 og ærlighetstesen. Alle tre er satt tilbake til «må», så alle FR-er er «må» og «bør» gjelder bare enkeltpunkter i FR-22 og FR-30.
- FR-21: ny analyse krever faktisk endret CV eller annonse. Skjermbredder og navn på resultatfelt er overlatt til UX.
- Innstrammet til ca. 6160 ord (−13 %), uten at krav er fjernet. Målet på 20 % ble ikke nådd.
- Status er `final`, og gjelder når gruppa har godkjent vedtak 10, 12 og 13 i PR-en.
- Bevisst ikke gjort: kort brukerreise for sensor i mock-modus. UJ-1 er eneste reise etter tidligere vedtak.

### Åpne punkter
- Gruppa må godkjenne vedtak 10, 12 og 13 i PR-en før merge. Vedtak 10 overstyrer deler av gruppevedtak 7, og vedtak 12 er et alternativ som vedtak 4 krever gruppevedtak for.
- UX-prototypen må oppdateres til «Lag tekst» og «Teksten bygger på», og vise flyten for «Endre CV eller annonse».
- Arkitekturen må bekrefte eller justere startverdiene i PRD §10 og kontrollere pris for gpt-5-mini. Tidsavbruddet fastsettes etter måling av svartid med testparene, eventuelt med egen lengre grense for tekstgenerering.
