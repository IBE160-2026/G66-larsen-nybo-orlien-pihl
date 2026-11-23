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

## 2026-11-07 kl. 10:23 — Miranda Larsen

### Oppgave
Dokumentere gruppas godkjenning av Mirandas ni forslag i PRD §9 på branchen miranda-prd-ferdigstilling, etter godkjent skrivebeskyttet gjennomgang og endringsplan. Beholde antakelsene i §10 uavklarte og alle app-/modelltester som planlagte; ingen push eller merge.

### Plan
- Følge den godkjente endringsplanen i samtalen: samordne PRD, ordliste, krav, testplan, addendum, endringsoversikt og beslutningslogg.
- Beholde punkt 2 og 6 utenfor V1 og punkt 9 i trinn 2; kontrollere kravkonflikter og manglende testforventninger.
- Kontrollere dokumentene og føre sesjonen her med oppdatert issues.md; lage separat path-begrenset lokal loggcommit.

### Resultat
Bekreftet at aktiv branch allerede var miranda-prd-ferdigstilling. Oppdatert PRD §0 og §9 til dokumenterte gruppevedtak, opplyst av Miranda. Datoen er dokumentasjonsdato, ikke en påstått møtedato. Antakelsene i §10 og de fire ASSUMPTION-markørene er beholdt uavklart; status er fortsatt draft.

Gruppa har godtatt Mirandas forslag med faseplasseringen bevart: ansettelsesvilkår, ordrett sitatkontroll, modelltestkriterier, tomtilstand, inaktivitet og sideoppdatering inngår i V1. Tredje kompetansestatus og regenerering med samme inndata er utsatt fra V1; CV-råd beholdes i trinn 2. Ingen andre nye produktvedtak er lagt til. Vurdering av KI-forslag: endringsplanen fra forrige gjennomgang ble uttrykkelig godkjent av Miranda; de godkjente samordningene er utført.

Ordlisten, FR-10–FR-14/FR-18/FR-21–FR-23/FR-30, NFR-8, SM-3 og omfang/testplan er samordnet. Ansettelsesvilkår holdes utenfor kompetanseopptelling og kompetansestatuser. Bare ansettelsesvilkår skilles fra ingen krav; meldingen om alle dokumenterte kompetansekrav krever minst ett kompetansekrav. Feilbevaring i FR-30 gjenoppretter ikke svar som allerede er forkastet etter FR-21 eller data slettet ved utlogging/utløp. Dette løser motstrid om bevaring/sletting. Midlertidige data og egenredigert tekst beholdes ved reload i aktiv økt uten permanent dokumentlagring; 25/30-minuttersreglene er bindende.

T-6 er gjort ubetinget for vedtatte øktregler. Nye planlagte T-8–T-10 dekker vilkår/opptelling, ingen krav, tittel/arbeidsgiver og reload/utløp. Addendum og endringsoversikt er oppdatert. Historisk memlog er bevart og supplert via memlog.py med vedtak og gjennomførte dokumentendringer. Ingen testdata eller testkode er endret. Ingen app-, API-, PDF- eller installasjonstest er utført; testene er fortsatt planlagt. Ingen priser eller historiske researchpåstander er revalidert.

Gjennomført dokumentkontroll: FR-1–FR-30, NFR-1–NFR-8, T-1–T-10, fire ASSUMPTION-markører og lokale Markdown-lenker besto. git diff --check besto. Dokumentdiff er gjennomlest. Uregistrerte filer (inkludert prd-miranda.diff) og andres logger er urørt. Bare denne loggen og Mirandas issues.md inngår i separat lokal loggcommit; PRD-dokumentene inngår ikke. Ingen push eller merge.

Tidligere åpent punkt om §9/§10 er presisert i issues.md: §9 er vedtatt, men §10 gjenstår. Testpunktet er videreført og oppdatert med nye scenarioer. Arkitekturdetaljer og konkret kostnadsplan er synliggjort som gjenstående arbeid.

### Åpne punkter
- Avklare de fire antakelsene i PRD §10 før berørte implementeringsvalg låses; PRD beholdes draft.
- Implementere supplerende testscenarioer/fasiter og PDF-varianter, og gjennomføre planlagt kvalitetssikring T-1–T-10, ekte modellserie innenfor 100 kr og installasjon på annen PC med registrerte resultater.
- Arkitekturen må definere øvrig brukeraktivitet, midlertidig lagring og tallfestede grenser/tidsavbrudd; konkret kostnadsplan må foreligge før betalte modellserier.
