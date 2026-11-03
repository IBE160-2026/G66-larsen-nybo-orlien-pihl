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
