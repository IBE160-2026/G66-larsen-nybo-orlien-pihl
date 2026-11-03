# PRD Supersøker – revisjon

## 2026-11-03 kl. 14:45 — Miranda Larsen

### Oppgave
Kvalitetssikre og revidere Helles PRD på miranda mot godkjent Product Brief og sensorveiledningen. Bevare struktur og funksjoner, konkretisere testbare krav, dokumentere Mirandas ni forslag uten å påstå gruppegodkjenning, og vise diff uten commit/push av PRD-endringene.

### Plan
- Kontrollere branch og eksisterende arbeidsfiler, hente origin/prd-utkast uten merge og sammenligne utkastet.
- Lese brief, faglærers tilbakemelding, sensorveiledning, prototype, testpar og Helles research/beslutningsunderlag.
- Presisere eksisterende krav, testopplegg og V1-ferdigkriterier; skille forslag fra vedtak og lage endringsoversikt/diff.
- Gjennomføre dokumentkontroll og uavhengig kvalitets-/struktur-/språkgjennomgang. Committe bare sesjonsloggen og issues.md lokalt.

### Resultat
Aktiv branch bekreftet som miranda. Hentet origin/prd-utkast ved 4bdab526d79a9e6866e43773a7586032df67274e uten merge. Lokalt prd.md var innholdslikt kildeversjonen før endring. Manglende addendum.md, .memlog.md, extract-inputs.md og research-landscape.md hentet uten overskriving. Ingen endring av Helles eller Elisabeths logger.

Revidert [prd.md](../../_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md) med bevarte seksjoner 0–10, FR-1–FR-30 og NFR-1–NFR-8. Presisert ordrett sitatsjekk med semantisk begrensning, negative/begrensede svar, utdatering av analyse/brev, kildevisning, filfeil, venting/tidsavbrudd/dobbeltklikk, mock-scenarioer og API-feil. Lagt inn planlagt installasjonstest på annen PC, T-1–T-7 og ferdigkriterier før trinn 2. Endringsoversikt og full PRD-diff ligger i PRD-mappen; addendum har et separat revisjonsnotat og memlog er oppdatert via memlog.py.

Mirandas forslag er attribuert henne og ikke vedtatt på vegne av gruppa. Politiattestkategori, delvis-status, modelltestomfang, øktutløp/reload og øvrige §9-avklaringer står til gruppa. CV-råd beholdes som mulig forbedring i trinn 2; regenerering med uendret input er mulig utvidelse. Begrunnelse: stabil godkjent V1 før ekstra omfang. Historisk research ble lest, men pris- og lovpåstander er ikke kontrollert på nytt og brukes ikke til nye krav.

Uavhengig gjennomgang fant mindre presiseringer om kontrollform for negative svar, kildeliste for KI-utkast og dobbeltklikk per behandlingssekvens; disse ble rettet. Dokumentkontroll besto for FR-/NFR-numre, hovedstruktur og lokale Markdown-henvisninger; diff --check besto. Ingen app-, modell-, PDF- eller installasjonstester er kjørt. Testene i PRD-en er planlagt arbeid. CLAUDE.md, skill-filen, brief, prototype og testdata er urørt. PRD og underlag forblir draft/ukommittert for godkjenning. Bare logg og issues.md inngår i separat lokal commit. Ingen push eller merge til main.

Siste kvalitetssikring samme dag (etter kl. 15:02): Miranda ba om presisering av FR-13/FR-21 og FR-11/FR-30 samt et uavklart øktforslag. Svar beholdes ved navigasjon/redigering; endret CV/annonse ugyldiggjør analysen straks, men gamle svar fjernes først ved bekreftet oppstart av ny analyse. Avbrutt bekreftelse beholder utdaterte svar; feilet bekreftet analyse gjenoppretter dem ikke. Ett ugyldig eller manglende dokumenterende CV-sitat avviser hele analysen uten gyldige delresultater, med forståelig melding. T-4/T-6 oppdatert. Varsel ved 25 minutter, Fortsett økten og utlogging/sletting ved 30 minutter uten aktivitet står eksplisitt som Mirandas uavklarte gruppeforslag i FR-22/FR-23 og §9. Ingen nye obligatoriske V1-funksjoner.

Addendum, endringsoversikt, memlog (via skript) og full diff oppdatert. Struktur 0–10, FR-1–30, NFR-1–8, lokale Markdown-lenker og diffkontroll besto. Mock- og ekte KI-testing er fortsatt atskilt; ingen app- eller KI-test er kjørt. Opprinnelig mistanke om feil sesjonslogglenke ble kontrollert og avkreftet; lenken var riktig og er beholdt. Eksisterende åpne punkter i issues.md dekker fortsatt gruppeavklaringer og planlagte tester og er uendret. PRD-endringer er ikke committet/pushet; bare denne oppdaterte sesjonsloggen inngår i ny lokal loggcommit.

### Åpne punkter
- Gruppen må behandle forslagene i PRD §9 og antakelsene i §10 før relevante implementeringsvalg låses; ingen forslag er automatisk godkjent.
- Planlagt kvalitetssikring i PRD §8 gjenstår: PDF-testvarianter, automatiske/manuelle tester, ekte modelltest innenfor budsjettet og installasjon på annen PC etter README. Ingen resultater foreligger fra denne revisjonen.
