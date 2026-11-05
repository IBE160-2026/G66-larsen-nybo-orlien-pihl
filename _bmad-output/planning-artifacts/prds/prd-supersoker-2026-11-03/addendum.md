# Addendum til PRD: Supersøker

Innhold som hører hjemme i arkitektur- eller UX-arbeidet, eller som ikke passer i selve PRD-en.

## Til arkitekturen

- **Språkmodell:** OpenAI `gpt-5-mini` er foreløpig valg. Modellen skal kunne byttes i konfigurasjonen og bekreftes med testparene og en kostnadsvurdering før integrasjon (brief, 2026-10-30).
- **Én modul for modellkall:** Faglærer anbefalte å «holde arkitekturen enkel, og samle LLM-kall i én modul». Mock- og API-implementasjonen skal kunne byttes i samme modul (støtter FR-26 til FR-30 og NFR-8).
- **Grenser:** Arkitekturen setter størrelsesgrense for filer og lengdegrense for CV-tekst, annonse og svar fra språkmodellen (FR-4, FR-7, FR-29), og beskriver hvordan budsjettet på 100 kr håndheves (NFR-6). Elisabeth setter budsjettgrense i OpenAI-kontoen.
- **Midlertidige data:** Arkitekturen velger hvor midlertidige data ligger i økten, hvordan de slettes ved utlogging, og hvordan de beskyttes ved overføring (FR-22, FR-23). Full kryptering vurderes først hvis dokumentlagring innføres senere.
- **Regelbasert sjekk av sitater:** Fasitene i testparene har sitater som står ordrett i CV-en. Det gjør det mulig å teste FR-11 automatisk, uavhengig av åpent spørsmål 3 i PRD-en.

## Research (2026-11-03)

Fullstendig gjennomgang med kilder: `research-landscape.md`. Researchen ble gjort mens gruppa fortsatt vurderte en lansering, og brukes derfor bare delvis. Punkter som er verdt å ta med videre:

- **Lignende produkter:** Teal, Kickresume, Rezi og Jobscan er engelskspråklige og konkurrerer på ATS-nøkkelord og maler. FINN har et gratis KI-verktøy for søknadstekst. Ingen av dem fant vi med ærlig tilpasning etter norske konvensjoner. Det støtter Supersøkers verdiforslag og motmålet SM-C1.
- **Trend:** Arbeidsgivere legger mindre vekt på søknadsbrevet og mer på CV og intervju. Det kan være et argument for å prioritere trinn 2 (forslag til CV-en) og åpent spørsmål 9.
- **Hvis Supersøker skal lanseres senere:** KI-forordningen (AI Act) regner trolig ikke et CV-verktøy som kandidaten selv styrer som høyrisiko, så lenge det ikke scorer kandidater for arbeidsgivere (se ikke-målene i PRD-en). KI-generert tekst må merkes. GDPR krever databehandleravtale med OpenAI, informasjon om overføring til USA, personvernerklæring på norsk og vurdering av personvernkonsekvenser. Brukere bør advares mot å legge inn fødselsnummer og særlige kategorier av personopplysninger. Dette er ikke juridisk rådgivning, og noen påstander er merket som ikke bekreftet i research-fila.

## Vurdert og forkastet underveis (2026-11-03)

- **Testing av medstudenter på felles server med egne CV-er.** Ville krevd drift, HTTPS og håndtering av ekte personopplysninger. Gruppa holdt seg til briefens rammer.
- **Navn fra brukerkontoen i signaturen.** Kolliderte med at kontoen bare har e-post og passord. Erstattet med plassholderen «[ditt navn]».
- **Nedlasting som `.txt`.** Droppet. «Kopier tekst» holder i v1, og eksport er i trinn 3.

## Revisjonsnotat fra Miranda (2026-11-03) – utkast, ikke gruppevedtak

Avsnittene over er Helles underlag fra `origin/prd-utkast` ved `4bdab526d79a9e6866e43773a7586032df67274e` og er bevart. Gjeldende revisjonsforslag står i [PRD-en](prd.md), særlig §9; historiske formuleringer over gir ikke nye godkjenninger. Signaturregelen er navn fra CV, ellers «[ditt navn]» (FR-16), ikke alltid plassholder.

- **Kildesjekk:** Revidert FR-11 krever ordrett-kontroll i appen som forslag til gruppa. Den tidligere formuleringen om automatisk testing «uavhengig av åpent spørsmål 3» er historisk bakgrunn. Verken en treffende tekststreng alene eller mock-svar beviser riktig kvalifikasjonsvurdering.
- **Grenser og samtidighet:** Arkitekturen må angi fil-/tekstgrenser, grense per tilleggssvar, samlet inndata, utdatalengde og tidsavbrudd med måleenhet. Ett aktivt kall per handling, ingen automatiske retries, og sene svar skal ikke overskrive nyere inndata/redigeringer eller gjenopprette data etter utlogging. Tidsavbrudd er ikke en garanti for at leverandøren ikke belaster et allerede sendt kall.
- **Økt:** Mirandas uavklarte gruppeforslag er varsel etter 25 minutter uten aktivitet med «Fortsett økten», og serverhåndhevet utlogging/sletting etter 30 minutter uten aktivitet. Fortsett før utløp nullstiller tiden; etter utløp kreves ny innlogging uten gjenoppretting av data. Bevaring ved oppdatering i aktiv økt må også gruppeavklares. Permanent dokumentlagring innføres ikke. Arkitekturen definerer øvrig brukeraktivitet; varsel og bakgrunnskall forlenger ikke økten.
- **Mock:** Fire navngitte testscenarioer med faste, dokumenterte varianter er tilstrekkelig. Mock skal ikke bli en ekstra analysemodell eller tolke vilkårlig tekst. Testoppsettet må velge riktig scenario for TXT, innliming og PDF-varianten av samme CV.
- **Research:** Markeds-, pris- og regelverksnotatene er lest som historisk bakgrunn, ikke kontrollert på nytt. Forslag om lansering, intervjuchat, andre språk eller mer CV-funksjonalitet overstyrer ikke briefens V1. Nåværende modelltilgjengelighet/pris må fortsatt kontrolleres ved integrasjon.
- **Bevis:** T-1–T-7 og installasjon på annen PC er planlagte tester. Denne revisjonen har bare kontrollert dokumentene, kravnumre, kildehenvisninger og diff; ingen app-, modell- eller installasjonstest er utført.
