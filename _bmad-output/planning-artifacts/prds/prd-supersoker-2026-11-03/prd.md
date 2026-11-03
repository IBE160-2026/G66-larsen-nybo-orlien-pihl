---
title: "PRD: Supersøker - AI CV & Job Application Assistant"
status: draft
created: 2026-11-03
updated: 2026-11-03
---

# PRD: Supersøker - AI CV & Job Application Assistant

## 0. Dokumentets formål

Denne PRD-en beskriver hva første versjon (v1) av Supersøker skal gjøre. Den er skrevet for gruppa G66 i IBE160 og for de neste BMAD-stegene: UX, arkitektur, epics og stories. Den viderefører Helles utkast og dokumentstruktur. Kildegrunnlaget er:

- [Godkjent Product Brief](../../briefs/brief-supersoker-2026-09-16/brief.md) og [briefens begrunnelser](../../briefs/brief-supersoker-2026-09-16/addendum.md), med gruppas beslutninger 2026-10-30.
- [Faglærers tilbakemelding](../../briefs/brief-supersoker-2026-09-16/tilbakemelding-product-brief.md) og [sensorveiledningen](../../../../.docs/sensorveiledning.md).
- [Elisabeths UX-prototype](../../ux/prototype-kjerneflyt.html) og [de fire fiktive testparene](../../../../tests/fixtures/job-applications/README.md).
- Helles [uttrekk av innspill](extract-inputs.md), [tekniske tillegg](addendum.md), [research](research-landscape.md) og [beslutningslogg](.memlog.md), hentet fra `origin/prd-utkast` ved commit `4bdab526d79a9e6866e43773a7586032df67274e`. Researchen er historisk bakgrunn, ikke verifiserte nåværende pris- eller lovopplysninger og ikke grunnlag for å utvide v1.

**Status for revisjonen (Miranda, 2026-11-03):** Briefens godkjente omfang ligger fast. Presiseringer i funksjonskravene er forslag i dette reviderte utkastet, ikke nye gruppevedtak. §9 skiller Mirandas forslag fra fortsatt uavklarte gruppebeslutninger og mulige utvidelser. Utvidelsene er ikke obligatoriske for v1. Dokumentet forblir `draft` til gjennomgangen er godkjent.

Funksjonene i §4 er bygget rundt én brukerreise (UJ-1). Kravene er nummerert FR-1 til FR-30 og tverrgående krav NFR-1 til NFR-8, slik at stories og tester kan vise til dem. Begrepene i §3 brukes likt i hele dokumentet. Gjetninger er merket `[ASSUMPTION]` og samlet i §10. Spørsmål gruppa ikke har avgjort, står i §9. Beslutninger tatt underveis, med begrunnelse, står i `.memlog.md` i samme mappe. Teknisk bakgrunn og research står i `addendum.md`.

**Ambisjonsnivå:** Supersøker er et studentprosjekt som skal demonstreres ved semesterslutt. Det skal ikke lanseres offentlig eller kommersielt. Demo og testing skjer med fiktive dokumenter, appen kjøres lokalt etter README, og mock-modus er standard. Gruppa vurderte underveis å la medstudenter teste appen på en felles server med egne CV-er, men gikk tilbake til briefens rammer (2026-11-03).

## 1. Visjon

Supersøker hjelper studenter og unge jobbsøkere med å skrive søknadsbrev som er tilpasset en konkret stillingsannonse, uten at brevet påstår noe som ikke stemmer. Den sammenligner CV-en med annonsen, viser hvilke krav som er dokumentert og hvilke som mangler dokumentasjon, og lar brukeren fylle inn erfaring CV-en ikke viser, før teksten skrives.

Mange studenter vet ikke hvilke kvalifikasjoner arbeidsgiveren legger mest vekt på, hvilke deler av egen erfaring som er relevante, eller hvordan søknaden bør formuleres. Hver søknad tar tid, og resultatet blir ofte generelt. Supersøker gir både skrivehjelp og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav.

Supersøker skiller seg ut ved å være ærlig: den viser hva den har bygget på, spør i stedet for å gjette, og lar brukeren styre hvor mye den skriver. Problemet er gruppens utgangspunkt og er ikke dokumentert gjennom brukerundersøkelser.

## 2. Målgruppe

Primærbrukeren er en student med lite relevant arbeidserfaring som søker sin første relevante jobb eller sommerjobb. Andre unge jobbsøkere er sekundære brukere.

### 2.1 Jobber brukeren vil ha gjort

- **Forstå annonsen:** se hvilke krav arbeidsgiveren stiller, og hvilke av dem CV-en faktisk dokumenterer.
- **Bruke det hun har:** knytte deltidsjobb, utdanning og studieprosjekter til kravene, uten å overdrive.
- **Tette hull ærlig:** fortelle om erfaring CV-en ikke viser, og få den med i søknaden med egne ord.
- **Spare tid uten å miste kontroll:** få et utkast eller forslag hun kan redigere selv, i stedet for å starte med et tomt ark.
- **Føle seg trygg:** vite at søknaden ikke påstår noe hun må forsvare i et intervju uten å kunne.

### 2.2 Ikke-brukere i v1

- Arbeidsgivere og rekrutterere. Supersøker vurderer eller rangerer ikke kandidater.
- Erfarne jobbsøkere som trenger avansert karriererådgivning.
- Brukere som trenger søknaden på engelsk eller nynorsk (valg av språk og tone er i trinn 3).

### 2.3 Brukerreise

- **UJ-1. Thea tilpasser en søknad til en stilling hun har funnet.**
  - **Persona og kontekst:** Thea er student og har funnet en stilling hun vil søke på. CV-en oppdaterte hun for noen uker siden.
  - **Starttilstand:** Ikke innlogget. Thea oppretter en konto og logger inn.
  - **Forløp:**
    1. Thea laster opp CV-en sin. Teksten Supersøker har lest ut stemmer, så hun går rett videre.
    2. Hun limer inn stillingsannonsen, med stillingstittel og navn på arbeidsgiver.
    3. Hun trykker **«Analyser kravene»**. Gap-analysen viser at ett av kravene ikke er dekket av CV-en.
    4. Thea har erfaring som ligner på det som kreves, og skriver det kort i svarfeltet under kravet.
    5. Hun vil at teksten skal være i hennes egne ord, og velger **«Forslag til formuleringer»** før hun trykker **«Lag søknadsbrev»**.
  - **Høydepunkt:** Thea får en liste med forslag til hva søknaden bør inneholde. Listen tar også med kravet som manglet i CV-en, basert på svaret hennes.
  - **Avslutning:** Thea kopierer teksten med **«Kopier tekst»**. Hun vet at dataene forsvinner når økten avsluttes.
  - **Kanttilfelle:** Hvis Thea ikke hadde svart på det manglende kravet, ville kravet blitt utelatt fra teksten. Supersøker påstår aldri at et udokumentert krav er oppfylt.

## 3. Ordliste

- **Bruker** — Personen som er innlogget i Supersøker. Det finnes én brukerrolle.
- **Brukerkonto** — E-postadresse og passord-hash. Det eneste Supersøker lagrer permanent. Én per bruker.
- **Testbruker** — Ferdig brukerkonto beskrevet i README, for sensor og gruppa.
- **CV-tekst** — Teksten fra brukerens CV, enten limt inn eller lest ut fra en TXT-fil eller tekstbasert PDF, og eventuelt rettet av brukeren.
- **Stillingsannonse (annonse)** — Teksten brukeren limer inn fra annonsen hun vil søke på. Inneholder stillingstittel, arbeidsgiver og krav.
- **Krav** — Noe annonsen sier at arbeidsgiveren krever, ønsker eller «ser etter». Alle tre behandles likt.
- **Gap-analyse** — Sammenligningen av kravene i annonsen med CV-teksten. Gir hvert krav status «Dokumentert» eller «Mangler dokumentasjon».
- **Dokumentert** — Status for et krav som CV-teksten dokumenterer. Vises alltid med et sitat.
- **Mangler dokumentasjon** — Status for et krav CV-teksten ikke dokumenterer. Betyr ikke at brukeren mangler kompetansen.
- **Sitat** — Utdrag fra CV-teksten, gjengitt ordrett, som viser hvor et krav er dokumentert.
- **Svar** — Det brukeren skriver om et krav som mangler dokumentasjon. Valgfritt, og gjelder bare den aktuelle søknaden.
- **Omskrivingsvalg** — Brukerens valg av hvor mye Supersøker skal skrive: «Helt søknadsutkast» eller «Forslag til formuleringer».
- **Søknadsbrev** — Resultatet av omskrivingsvalget «Helt søknadsutkast»: et sammenhengende brev.
- **Forslag til formuleringer** — Resultatet av omskrivingsvalget med samme navn: en liste med forslag brukeren kan bruke i sitt eget brev.
- **Teksten** — Fellesbetegnelse på søknadsbrevet eller forslagene, avhengig av omskrivingsvalg.
- **Økt** — Tiden fra brukeren logger inn til hun logger ut.
- **Midlertidige data** — CV-tekst, annonse, stillingstittel, arbeidsgiver, svar, gap-analyse og teksten. Finnes bare i økten.
- **Språkmodell** — Den eksterne KI-tjenesten Supersøker bruker i API-modus.
- **Mock-modus** — Standardmodus. Supersøker bruker ferdiglagde svar og sender ingen data til språkmodellen.
- **API-modus** — Modus der Supersøker sender midlertidige data til språkmodellen. Må slås på i konfigurasjonen.
- **Testpar** — Fiktiv CV og annonse med fasit, i `tests/fixtures/job-applications/`. Det finnes fire testpar.
- **Fasit** — Kravene i et testpar, med forventet status og sitat for hvert krav.

## 4. Funksjoner

### 4.1 Konto og innlogging

**Beskrivelse:** Supersøker har én brukerrolle. Brukeren oppretter en konto og logger inn før hun kan legge inn CV og annonse. Brukerkontoen er det eneste som lagres permanent. Sensor og gruppa logger inn med en ferdig testbruker. Realiserer UJ-1 (starttilstand).

#### FR-1: Opprette konto

En besøkende kan opprette en brukerkonto med e-postadresse og passord. Realiserer UJ-1.

**Konsekvenser (testbare):**
- E-postadressen må ha gyldig format og kan bare brukes av én konto.
- Passordet må ha minst 8 tegn. Det finnes ingen andre passordregler.
- Kontoen lagrer ikke navn. Navnet i søknadsbrevet hentes fra CV-en (se 4.4).
- Ugyldig inndata gir en melding som sier hva som er feil og hvordan det rettes. E-postadressen beholdes i skjemaet, passordet tømmes.
- Passord lagres bare som sikker hash, aldri i klartekst.

#### FR-2: Logge inn og ut

En bruker kan logge inn med e-post og passord, og logge ut fra alle sider. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Feil e-post eller feil passord gir samme melding, slik at meldingen ikke avslører om e-postadressen finnes.
- Sider etter innlogging kan ikke åpnes uten innlogging. Forsøk sender brukeren til innloggingssiden.
- Utlogging sletter brukerens midlertidige data (se 4.5).

#### FR-3: Testbruker

Det finnes en testbruker som er beskrevet i README, slik at sensor kan logge inn uten å opprette konto.

**Konsekvenser (testbare):**
- Testbrukeren finnes etter installasjon og oppstart etter README, uten ekstra steg.
- Testbrukerens passord står bare i README og testoppsett, ikke i kildekode som brukes i drift.

### 4.2 CV og stillingsannonse

**Beskrivelse:** Brukeren legger inn CV-en ved å lime inn tekst eller laste opp en fil, og limer inn stillingsannonsen. Supersøker viser teksten den leste fra fila, slik at brukeren kan rette den før analysen. Supersøker går ikke videre med tom CV eller tom annonse. Realiserer UJ-1 (steg 1–2).

#### FR-4: Legge inn CV

En bruker kan legge inn CV-en som innlimt tekst, TXT-fil eller tekstbasert PDF. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Andre filformater avvises med meldingen ««<fil>» kan ikke leses – Velg en TXT- eller PDF-fil, eller lim inn teksten.»
- Filer over en fast størrelsesgrense og tekst over en fast lengdegrense avvises med en melding som oppgir grensen. Grensene settes i arkitekturen og skal begrense kostnaden i API-modus.
- Originalfila slettes etter at teksten er lest ut.
- Korrupte, passordbeskyttede eller ellers uleselige filer gir en melding som navngir fila og tilbyr ny opplasting eller innliming, for eksempel «Vi kunne ikke lese filen <fil>. Prøv en TXT-fil eller tekstbasert PDF, eller lim inn teksten.» Ingen teknisk feildump vises.
- Ved feil beholdes tidligere gyldig CV-tekst. Eventuelle midlertidige filer slettes også når tekstuttrekket feiler. Filtype og grenser valideres på serveren; filendelsen alene avgjør ikke om innholdet kan leses.

**Utenfor omfang:**
- Skannede PDF-er (OCR) og DOC/DOCX.

#### FR-5: Se og rette innlest CV-tekst

Etter opplasting ser brukeren teksten Supersøker leste fra fila, i et redigerbart felt, og kan rette den før analysen. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Innlest tekst fra testparenes CV-er inneholder utdanning, erfaring og ferdigheter.
- For PDF minner Supersøker brukeren om å sjekke at kolonner og overskrifter kom i riktig rekkefølge.
- Det er den rettede teksten som brukes i analysen.

#### FR-6: PDF uten lesbar tekst

Når en PDF ikke inneholder lesbar tekst, får brukeren beskjed om det og kan lime inn teksten i stedet.

**Konsekvenser (testbare):**
- Meldingen navngir fila og forklarer at den ser ut til å være skannet som bilde.
- Brukeren kommer ikke videre før CV-feltet har tekst.

#### FR-7: Legge inn stillingsannonse

En bruker kan lime inn stillingsannonsen som tekst. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Feltet har en hjelpetekst om å ta med stillingstittel og arbeidsgiver.
- Annonseteksten har samme lengdegrense som CV-teksten.

#### FR-8: Kontroll før analyse

Supersøker starter ikke analysen når CV-en eller annonsen er tom.

**Konsekvenser (testbare):**
- Tomt felt gir en melding ved feltet, feltet merkes som ugyldig, og fokus flyttes dit.
- Felt med bare blanktegn regnes som tomme. Valideringen gjelder også på serveren.
- Det brukeren allerede har skrevet, beholdes.

#### FR-9: Etterspørre manglende stillingstittel og arbeidsgiver

Når Supersøker ikke finner stillingstittel eller arbeidsgiver i annonsen, ber den brukeren fylle dem inn før gap-analysen starter. Supersøker gjetter aldri på dem.

**Konsekvenser (testbare):**
- En annonse uten arbeidsgiver gir et felt for arbeidsgiver, med forklaring på hvorfor det trengs. Det samme gjelder stillingstittel. [ASSUMPTION: gjelder både stillingstittel og arbeidsgiver, slik suksesskriterium 5 i briefen sier]
- Gap-analysen starter ikke før feltene er fylt inn. [ASSUMPTION: feltene er obligatoriske; brukeren kan ikke hoppe over]
- Det brukeren fyller inn, brukes i overskriften på gap-analysen og i søknadsbrevet.
- Identifisert stillingstittel og arbeidsgiver vises og kan rettes før de brukes i resultatet. Tvetydige opplysninger etterspørres fremfor å gjettes. Tomme eller blanke svar godtas ikke.

### 4.3 Gap-analyse

**Beskrivelse:** Supersøker trekker ut kravene i annonsen og sjekker hvert krav mot CV-teksten. Hvert krav får status «Dokumentert» eller «Mangler dokumentasjon». Dokumenterte krav vises med sitatet fra CV-en som dokumenterer dem. Krav som mangler dokumentasjon, vises først, fordi det er der brukeren skal handle. Hun kan svare kort på hvert av dem. Resultatet omtaler manglende *dokumentasjon*, ikke manglende kompetanse. Den verste feilen gap-analysen kan gjøre, er å merke et krav som dokumentert uten grunnlag i CV-en. Realiserer UJ-1 (steg 3–4).

#### FR-10: Trekke ut krav fra annonsen

Supersøker trekker ut kravene i stillingsannonsen. Krav, ønsker og «vi ser etter» behandles og vises likt. Realiserer UJ-1.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle kravene i fasiten.
- Gap-analysen viser ingen krav som ikke står i annonsen.

#### FR-11: Vise dokumenterte krav med kilde

Hvert krav som er dokumentert, vises med status «Dokumentert» og et sitat fra CV-teksten som viser hvor det er dokumentert. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Sitatet finnes ordrett i CV-teksten som ble analysert.
- Systemet kontrollerer dette regelbasert mot den rettede CV-teksten før analysen vises. Hvis bare ét dokumenterende CV-sitat mangler eller ikke finnes ordrett, avvises hele analysen etter FR-30. Ingen kravstatuser, gap eller andre delresultater fra dette svaret vises som gyldige, og analysen kan ikke brukes til generering.
- At sitatet finnes ordrett, beviser ikke alene at det dokumenterer kravet. Relevans og betydning vurderes mot fasiten ved testing av ekte modell. Et ekte, men irrelevant sitat er en feil, ikke bestått dokumentasjon. Kontrollen er ingen garanti for semantisk riktighet.
- For hvert testpar merkes ingen av fasitens dokumenterte krav som manglende.
- Ingen krav merkes som dokumentert uten et sitat.

#### FR-12: Vise krav som mangler dokumentasjon

Hvert krav som ikke er dokumentert i CV-en, vises med status «Mangler dokumentasjon». Disse vises før de dokumenterte kravene, sammen med en oppsummering av hvor mange krav som er dokumentert. Realiserer UJ-1.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle manglende krav i fasiten.
- Teksten sier at kravet ikke står i CV-en, ikke at brukeren mangler det.
- Overskriften inneholder stillingstittel og arbeidsgiver.
- Status vises med tekst, ikke bare med farge.

#### FR-13: Svare på krav som mangler dokumentasjon

Under hvert krav som mangler dokumentasjon, kan brukeren skrive et kort, valgfritt svar. Svaret gjelder bare denne søknaden. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Svarfeltet er valgfritt. Brukeren kan gå videre uten å svare.
- Svaret beholdes når brukeren går tilbake til CV og annonse og frem igjen uten å starte en bekreftet ny analyse med endret CV/annonse (FR-21).
- Svaret lagres ikke på kontoen og brukes ikke i andre søknader.
- Et utfylt svar er ikke i seg selv bekreftet kompetanse. «Jeg har ikke førerkort», «jeg holder på å lære» og tilsvarende forbehold skal beholde sin betydning i resultatet (FR-18).
- Endring av CV/annonse ugyldiggjør gammel analyse og tekst straks, men sletter ikke svar ved navigasjon eller redigering alene. Svar fjernes først når brukeren bekrefter å starte ny analyse av de endrede inndataene (FR-21). Endrede tilleggssvar krever ny generering, ikke ny gap-analyse.

#### FR-14: Når alle krav er dokumentert

Når alle kravene i annonsen er dokumentert, sier Supersøker det og lar brukeren gå rett til søknadsbrevet.

**Konsekvenser (testbare):**
- Testpar 4 gir meldingen «Alle krav i annonsen er dokumentert i CV-en.» og ingen svarfelt.
- Meldingen krever at minst ett krav er identifisert. Ingen gjenkjennelige krav er en egen tomtilstand; Mirandas forslag til videre flyt står i §9 punkt 5 og er ikke et gruppevedtak.

**Notater:** Fem spørsmål om gap-analysen er åpne (se §9): egen kategori for vilkår som politiattest, en eventuell tredje status «delvis dokumentert», regelbasert kontroll av modellens svar, hva som regnes som bestått mot ekte modell, og hva brukeren ser når annonsen ikke har gjenkjennelige krav.

### 4.4 Søknadsbrev

**Beskrivelse:** Brukeren velger hvor mye Supersøker skal skrive: et helt søknadsutkast eller forslag til formuleringer hun kan bruke i sitt eget brev. Teksten bygger bare på CV-teksten, annonsen og brukerens svar. Den skrives på norsk bokmål i en nøktern, profesjonell tone, med konkrete eksempler fra CV-en framfor generelle superlativer. Supersøker viser hva teksten bygger på. Brukeren kan redigere teksten og kopiere den, og hun får vite at teksten slettes når hun logger ut. Realiserer UJ-1 (steg 5 til avslutning).

#### FR-15: Velge omskrivingsvalg

Før søknadsbrevet lages, velger brukeren mellom «Helt søknadsutkast» («Et sammenhengende brev du redigerer selv.») og «Forslag til formuleringer» («Setninger du kan bruke i ditt eget brev.»). Realiserer UJ-1.

**Konsekvenser (testbare):**
- «Helt søknadsutkast» er valgt på forhånd.
- Valget kan gjøres med tastatur, og gruppen av valg har en synlig ledetekst.

#### FR-16: Helt søknadsutkast

Med «Helt søknadsutkast» lager Supersøker et sammenhengende søknadsbrev.

**Konsekvenser (testbare):**
- For hvert testpar nevner brevet riktig stillingstittel og arbeidsgiver og minst ett relevant eksempel fra CV-en.
- Brevet er skrevet på norsk bokmål.
- Brevet signeres med navnet fra CV-en. Har CV-en ikke noe navn, avsluttes brevet med «Vennlig hilsen [ditt navn]».

#### FR-17: Forslag til formuleringer

Med «Forslag til formuleringer» lager Supersøker en liste med forslag til hva søknaden bør inneholde. Realiserer UJ-1 (høydepunkt).

**Konsekvenser (testbare):**
- Resultatet er en liste, ikke et sammenhengende brev.
- Listen bruker relevant innhold fra tilleggssvar, med negasjoner og begrensninger bevart etter FR-18. Den påstår ikke at et krav er oppfylt bare fordi brukeren har svart.
- Krav brukeren ikke har svart på, nevnes ikke i forslagene som skal brukes i søknaden.
- Veiledning om utelatte krav vises utenfor søknadsteksten, tydelig merket «Veiledning – ikke del av søknaden». Den skal ikke følge med «Kopier tekst» eller blandes inn i forslagene.
- Samme testpar gir samme faktagrunnlag i begge omskrivingsvalgene.

#### FR-18: Ærlighetsregel

Søknadsbrevet og forslagene bygger bare på CV-teksten, annonsen og brukerens svar. Realiserer UJ-1 (kanttilfelle).

**Konsekvenser (testbare):**
- Teksten påstår aldri at et krav er oppfylt når kravet mangler dokumentasjon og brukeren ikke har svart.
- Teksten legger ikke til erfaring, utdanning eller sertifiseringer som ikke står i CV-en eller i svarene.
- Når brukeren har svart, bruker teksten det hun skrev og legger ikke til detaljer som ikke står i svaret.
- Negasjoner, forbehold og kvalifikasjonsnivå bevares i begge omskrivingsvalg. «Jeg har ikke førerkort» må aldri bli «Jeg har førerkort», og «jeg holder på å lære Python» må ikke bli «Jeg behersker Python».
- Ved usikkert eller motstridende grunnlag skal teksten ikke påstå at kravet er oppfylt. Usikkerheten kan forklares i veiledning utenfor søknadsteksten; ingen ny oppfølgingschat kreves.
- Ærlighetsregelen gjelder systemets genererte tekst. Brukerens egne redigeringer verifiseres ikke automatisk (FR-19).

#### FR-19: Vise hva teksten bygger på

Ved siden av teksten viser Supersøker listen «Brevet bygger på» med tilgjengelig grunnlag for KI-utkastet: CV-sitatene fra analysen, stillingstittel og arbeidsgiver, og brukerens svar. Dette er ikke en automatisk kobling mellom hver setning og en kilde.

**Konsekvenser (testbare):**
- Hvert svar brukeren har gitt, står i listen som oppgitt grunnlag; et svar er ikke nødvendigvis en bekreftelse eller brukt i teksten.
- Oppsummeringen av gap-analysen viser for hvert manglende krav om brukeren har svart, eller at kravet ikke nevnes i KI-utkastet.
- Listen merkes «Grunnlag for KI-utkastet. Egne redigeringer kontrolleres ikke automatisk.» Den skal ikke fremstå som verifisering av brukerens senere endringer.

#### FR-20: Redigere og kopiere teksten

Brukeren kan redigere teksten i Supersøker og kopiere den med «Kopier tekst». Realiserer UJ-1 (avslutning).

**Konsekvenser (testbare):**
- Etter kopiering vises «Kopiert. Lim inn teksten der du skriver søknaden.»
- Hvis kopiering ikke er tillatt i nettleseren, markeres teksten, og brukeren får beskjed om å trykke Ctrl+C.
- En melding sier at teksten tas vare på mens brukeren er innlogget, og slettes når hun logger ut.

**Utenfor omfang:**
- Nedlasting og fileksport (trinn 3).

#### FR-21: Endre svar eller omskrivingsvalg

Fra søknadsbrevet kan brukeren gå tilbake til gap-analysen og endre svarene sine eller omskrivingsvalget.

**Konsekvenser (testbare):**
- CV-tekst, annonse og svar beholdes når brukeren går tilbake.
- Endret tilleggssvar eller omskrivingsvalg gjør eksisterende tekst utdatert. Ny tekst lages først ved et eksplisitt klikk, uten ny gap-analyse når CV og annonse er uendret. Systemet skal ikke hevde at det gamle brevet gjenspeiler de nye svarene.
- Endret CV eller annonse ugyldiggjør tidligere gap-analyse og tekst straks; de merkes som utdaterte og kan ikke brukes til ny generering. Svar og egenredigert tekst beholdes ved navigasjon og redigering alene.
- Før ny analyse av endret CV/annonse startes, varsles brukeren om at gamle svar og egenredigert tekst forkastes. Først når brukeren bekrefter å starte den nye analysen, fjernes gamle tilleggssvar og tidligere resultater. Avbrytes bekreftelsen, beholdes de som utdaterte uten modellkall. Feiler den bekreftede analysen, beholdes ny CV/annonse for nytt forsøk; de fjernede svarene gjenopprettes ikke på nye krav.
- Ved ny generering varsles brukeren før egenredigert tekst erstattes. Navigasjon alene starter ingen kall og overskriver ingen tekst.

**Notater:** Om brukeren kan lage en ny versjon av teksten med samme inndata, er et åpent spørsmål for gruppa (se §9). Det påvirker kostnaden i API-modus.

### 4.5 Økt og personvern

**Beskrivelse:** CV-er er personopplysninger. Supersøker lagrer derfor bare brukerkontoen permanent. CV-tekst, annonse, svar, gap-analyse og søknadsbrev er midlertidige data. De tas vare på mens brukeren er innlogget, og slettes når hun logger ut. Bare eieren har tilgang til dataene. Før noe sendes til en ekstern språkmodell, får brukeren vite det. Realiserer UJ-1 (avslutning).

#### FR-22: Ta vare på midlertidige data i økten

Mens brukeren er innlogget, tar Supersøker vare på CV-teksten, annonsen, stillingstittel og arbeidsgiver, svarene, gap-analysen og teksten. Brukeren kan se resultatene igjen uten ny analyse.

**Konsekvenser (testbare):**
- Brukeren kan gå mellom stegene uten å miste inndata eller resultater.
- Å gå tilbake til et resultat sender ingen nye kall til språkmodellen.
- Bevaring av resultater betyr ikke at de fortsatt er gyldige etter endrede inndata. Utdaterte resultater merkes og brukes ikke som grunnlag for ny generering (FR-21).
- Bevaring av egenredigert tekst ved sideoppdatering er Mirandas forslag i §9 punkt 8. Det er ikke et vedtak om permanent lagring.

**Uavklart gruppeforslag fra Miranda (ikke obligatorisk v1-krav før vedtak):** Etter 25 minutter uten brukeraktivitet vises et tilgjengelig varsel om utlogging om fem minutter, med «Fortsett økten». Et klikk før utløp teller som aktivitet, nullstiller inaktivitetstiden og beholder midlertidige data uten modellkall. Varselet og bakgrunnskall skal ikke i seg selv forlenge økten. Arkitekturen konkretiserer øvrig brukeraktivitet. Se FR-23 og §9 punkt 7.

#### FR-23: Slette midlertidige data ved utlogging

Når brukeren logger ut, slettes alle midlertidige data.

**Konsekvenser (testbare):**
- Etter utlogging og ny innlogging er CV, annonse, svar og resultater borte.
- Brukerkontoen er det eneste som finnes igjen.
- Svar fra modellkall som fullføres etter utlogging, skal ignoreres og må ikke gjenopprette slettede data. Forslag om automatisk øktutløp står i §9 punkt 7.

**Uavklart gruppeforslag fra Miranda:** Etter 30 minutter uten brukeraktivitet logges brukeren automatisk ut, og alle midlertidige data slettes, også hvis fanen er lukket eller et modellkall pågår. «Fortsett økten» etter utløp gjenoppretter ikke økten eller data; ny innlogging kreves. Kontrollen av utløp og sletting skjer på serveren. Varsel etter 25 minutter følger FR-22. Dette er en konkretisering til gruppebehandling, ikke vedtatt ny V1-funksjonalitet.

#### FR-24: Bare eieren får tilgang

En bruker får bare tilgang til sine egne kontoopplysninger og midlertidige data. Kontrollen skjer på serveren.

**Konsekvenser (testbare):**
- Bruker A får ikke tilgang til bruker Bs kontoopplysninger eller midlertidige data i aktiv økt, heller ikke via direkte forespørsler til serveren.

#### FR-25: Varsel før data sendes til ekstern språkmodell

I API-modus får brukeren vite at CV-teksten, annonsen og svarene sendes til en ekstern leverandør, før første kall til språkmodellen.

**Konsekvenser (testbare):**
- Varselet navngir leverandøren.
- Ingen data sendes før brukeren har bekreftet varselet. [ASSUMPTION: brukeren må bekrefte, og varselet vises én gang per økt]
- Varselet vises ikke i mock-modus.

**Notater:** To spørsmål om økten er åpne for gruppa (se §9): hva som skjer når brukeren er inaktiv eller lukker fanen uten å logge ut, og om redigert tekst beholdes når siden lastes på nytt.

### 4.6 Mock-modus og API-modus

**Beskrivelse:** Supersøker kan kjøre i mock-modus eller API-modus. Mock-modus er standard. Den sender ingen data ut og krever ingen API-nøkkel, slik at sensor kan prøve hele kjerneflyten med fiktive data. Svarene i mock-modus er ferdiglagde eksempler som passer til testparene. API-modus bruker en ekte språkmodell og må slås på aktivt av den som kjører Supersøker.

#### FR-26: Mock-modus som standard

Supersøker starter i mock-modus når ingenting annet er konfigurert.

**Konsekvenser (testbare):**
- Supersøker kan installeres og kjøres etter README uten API-nøkkel og uten betaling.
- Hver side viser at mock-modus er på, og at ingen tekst sendes til en språkmodell.
- I mock-modus sendes ingen data ut av maskinen.

#### FR-27: Laste inn eksempel

I mock-modus kan brukeren fylle inn CV og annonse fra testpar 1 med knappen «Last inn eksempel (testpar 1)».

**Konsekvenser (testbare):**
- Etter klikk er CV-feltet og annonsefeltet fylt ut, og en melding forteller brukeren at hun kan trykke «Analyser kravene».
- Hele kjerneflyten kan gjennomføres med testpar 1 i mock-modus.
- Alle fire testpar skal kunne velges som navngitte testscenarioer i testoppsettet. README beskriver hvordan sensor kjører hvert scenario; det kreves ikke fire nye knapper i brukerflaten.
- Hvert scenario bruker faste, tilhørende analysesvar og begge resultattyper. For par med gap finnes faste varianter uten svar, med bekreftende svar og med negativt/begrenset svar. Bare de dokumenterte scenarioene simuleres; mock tolker ikke vilkårlig tilleggstekst. Meldingen forklarer når teksten ikke påvirker eksempelsvaret.

#### FR-28: Mock-modus med egen tekst

Når brukeren legger inn egen tekst i mock-modus, får hun et fast eksempelsvar som er tydelig merket.

**Konsekvenser (testbare):**
- Meldingen sier at teksten hennes ikke er analysert, og at svaret er et fast eksempel.
- Mock-modus gjør ingen regelbasert analyse av egen tekst.

#### FR-29: Slå på API-modus

Den som kjører Supersøker, kan slå på API-modus i konfigurasjonen.

**Konsekvenser (testbare):**
- API-modus brukes bare når den er valgt i konfigurasjonen og en API-nøkkel er satt.
- I API-modus er lengden på inndata og svar begrenset.
- Arkitekturen fastsetter tall og måleenheter for filstørrelse, CV/annonse, hvert tilleggssvar, samlet forespørsel og modellens utdatalengde før betalte kall aktiveres. Overskridelse avvises før modellkallet, med oppgitt grense og forslag til retting.
- Supersøker sender aldri automatiske gjentatte kall til språkmodellen.

#### FR-30: Feil fra språkmodellen

Når språkmodellen ikke svarer, svarer med feil, eller svaret ikke kan brukes, får brukeren en forståelig melding.

**Konsekvenser (testbare):**
- Mens et kall pågår, vises «Analyserer …» eller «Lager tekst …». Handlingsknappen deaktiveres, og serveren avviser dupliserte innsendinger for samme aktive handling. Dobbeltklikk skal starte høyst én behandlingssekvens og ikke duplisere modellkall.
- Hvert kall har et endelig tidsavbrudd. Arkitekturen fastsetter og dokumenterer grensen i sekunder før API-modus tas i bruk; tester simulerer svar før og etter grensen uten lang venting.
- Ved tidsavbrudd eller midlertidig API-feil vises for eksempel «Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» «Prøv igjen» krever et nytt klikk og starter høyst ett nytt kall; ingen automatiske gjentakelser.
- Manglende nøkkel, ugyldig konfigurasjon eller nådd kostnadsgrense gir beskjed om hva den som kjører appen må rette. «Prøv igjen» skal ikke foreslå at en uendret konfigurasjonsfeil løses av et nytt klikk. Appen bytter ikke stilltiende til mock.
- Ugyldig svarformat, manglende obligatoriske felt eller et manglende/ikke ordrett dokumenterende CV-sitat avviser hele analysen. Vis for eksempel «Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt.» Ingen kravstatuser, gap eller andre delresultater fra det avviste svaret vises som gyldige eller brukes til generering. At enkelte sitater er gyldige, redder ikke resten av analysen (FR-11).
- CV-teksten, annonsen og svarene beholdes, slik at brukeren ikke må skrive dem på nytt.
- Meldingen viser aldri API-nøkkelen eller andre hemmeligheter.
- Halvferdige resultater vises ikke.
- Sene svar etter tidsavbrudd, utlogging eller endret inndata ignoreres, slik at de ikke overskriver nyere data eller brukerens redigeringer. Feiltesten skal også kontrollere dette.

## 5. Tverrgående krav

### 5.1 Universell utforming og design

- **NFR-1: Universell utforming.** Hele kjerneflyten kan gjennomføres med tastatur. Alle skjemafelt har synlige etiketter, og fokus er alltid synlig. Status vises med tekst, ikke bare med farge. Feil- og statusmeldinger leses opp av skjermleser. Ved stegbytte flyttes fokus til overskriften, og ved feil til første ugyldige felt. Tekst og kontroller har kontrast som oppfyller WCAG 2.1 nivå AA. [ASSUMPTION: WCAG 2.1 AA er målet for kontrast]
- **NFR-2: Skjermstørrelser.** Kjerneflyten fungerer på mobil og datamaskin. På smale skjermer stables kolonnene, og steglisten viser bare aktivt steg.
- **NFR-3: Meldinger.** Alle meldinger er på norsk bokmål og sier hva som er galt og hva brukeren kan gjøre. Tomtilstander forklarer hva som mangler.

### 5.2 Sikkerhet og personvern

- **NFR-4: Hemmeligheter.** API-nøkkelen finnes bare på serveren, i lokal miljøkonfigurasjon. `.env` er utenfor Git, og `.env.example` har tomme plassholdere og valg av mock- eller API-modus.
- **NFR-5: Bare fiktive dokumenter.** Repoet, testdataene og demoene bruker bare fiktive CV-er og annonser. CV-tekst og svar skrives aldri til logger.

### 5.3 Kostnad

- **NFR-6: Budsjett.** Betalte kall til språkmodellen i utviklingstestingen koster til sammen høyst 100 kr. Arkitekturen beskriver hvordan grensen håndheves, før betalte kall slås på.

### 5.4 Kjørbarhet og testbarhet

- **NFR-7: Kjørbar etter README.** En person som ikke kjenner prosjektet, kan installere og starte Supersøker på en ren maskin i mock-modus ved å følge README, og prøve hele kjerneflyten med testbrukeren og testparene.
- **Akseptansetest for NFR-7:** En annen person gjennomfører installasjon på en annen PC uten utviklerens lokale oppsett, API-nøkkel eller udokumentert hjelp. Registrer dato, testansvarlig, operativsystem, nødvendige versjoner, appens commit, kommandoer, tidsbruk, avvik og resultat i en testrapport. Rett README og gjenta berørte steg ved avvik. Testen er planlagt; den er ikke utført gjennom denne PRD-revisjonen.
- **NFR-8: Testbar uten språkmodell.** Kjerneflyten kan testes automatisk i mock-modus. Testparene kan også kjøres mot den ekte språkmodellen, og resultatene registreres. Testparene kjøres på nytt hver gang instruksjonene til språkmodellen endres.

## 6. Ikke-mål

- Supersøker er ikke et rekrutteringssystem. Den vurderer, scorer eller rangerer ikke kandidater for arbeidsgivere.
- Supersøker gir ingen match- eller ATS-poengsum, og lover ikke intervju eller at søknaden passerer et ATS (se SM-C1).
- Supersøker skriver ikke inn søkerens erfaring på egen hånd. Den skriver bare fra CV-teksten, annonsen og svarene.
- Supersøker lanseres ikke offentlig eller kommersielt, og driftes ikke på en felles server.
- Ingen chat der språkmodellen stiller oppfølgingsspørsmål i flere runder. Gruppa forkastet det fordi det er for komplekst, uforutsigbart og vanskelig å teste.
- Ingen permanent lagring av CV-er, annonser, svar eller resultater i v1. Gruppa avviste et KI-forslag om det 2026-10-30.

## 7. MVP-omfang

### 7.1 Innenfor v1

- Én brukerrolle med konto, innlogging og testbruker (4.1).
- CV som innlimt tekst, TXT eller tekstbasert PDF, med visning og retting av innlest tekst. Stillingsannonse som innlimt tekst (4.2).
- Gap-analyse med sitat for dokumenterte krav og valgfritt svar på krav som mangler dokumentasjon (4.3).
- Søknadsbrev eller forslag til formuleringer, med ærlighetsregel, «Brevet bygger på», redigering og «Kopier tekst» (4.4).
- Midlertidige data i økten, sletting ved utlogging og eierskapskontroll (4.5).
- Mock-modus som standard, eksempel fra testpar 1, og API-modus som må slås på (4.6).

### 7.2 Utenfor v1

**Trinn 2** (målet hvis v1 er testet og stabil i tide):
- Egne forslag til forbedring av CV-en.
- ATS-veiledning, uten garanti.

**Trinn 3** (utsatt):
- Strukturert CV-mal og DOC-støtte.
- Tidligere søknader.
- Lagring av svar på profilen (variant B) og innskriving av svar i en ny CV-fil (variant C).
- Valg av språk og tone.
- Fileksport og nedlasting. En nedlastingsknapp ble vurdert for v1 (2026-11-03), men droppet: «Kopier tekst» holder.

**Utenfor prosjektet:**
- Skannede PDF-er (OCR).

### 7.3 Ferdigkriterier før trinn 2

Dette er foreslåtte operative ferdigkriterier i revisjonen, basert på briefens godkjente suksesskriterier. Før ekstra funksjoner prioriteres:

- SM-1 til SM-8 er kontrollert med registrerte resultater. «Sekundære» i §8 betyr ikke valgfrie krav.
- Alle fire testpar fungerer i mock med begge omskrivingsvalg og alle tre CV-innleggingsmåter. Relevante automatiske tester kjøres etter README uten feil. Mock dokumenterer ikke ekte modellkvalitet.
- Ekte modell er vurdert mot fasit, ærlighetsregelen og brevsjekklisten i §8. Testopplegg og kostnad er avklart etter §9 punkt 4, innenfor 100 kr.
- Feiltilfeller, kildekontroll, endrede inndata, øktdata og A/B-tilgang er testet. Ingen kjente feil som gir falske kvalifikasjonspåstander, uvedkommende tilgang eller stopper kjerneflyten står åpne.
- Kjerneflyten er kontrollert med tastatur og på dokumenterte mobil-/PC-størrelser, med feilmeldinger, tomtilstander og kopiering kontrollert mot NFR-1 til NFR-3.
- Installasjonstesten på annen PC er dokumentert (NFR-7). README beskriver faktisk oppstart, testbruker, testscenarioer og testkommandoer.
- V1-avklaringer er vedtatt av gruppa og ført i PRD/beslutningsloggen; valgfrie utvidelser er utsatt eller uttrykkelig prioritert. Mindre restfeil har dokumentert konsekvens. Krav, stories, tester og rettinger av KI-generert kode kan spores i repoet.

## 8. Suksessmål

Suksessmålene er briefens åtte suksesskriterier, med samme nummer (SM-N er kriterium N i briefen). De vurderes med de fire testparene. Mock-tester viser at flyten virker. Kvaliteten på språkmodellens svar vurderes separat mot ekte modell, og brevkvaliteten sjekkes manuelt med en sjekkliste.

### Testopplegg og sporbarhet

Alle tester nedenfor er planlagt kvalitetssikring, ikke påstander om utførte tester. Test-ID-ene er referanser for kommende tester og rapporter.

| Test-ID | Kontroll og forventning | Krav og briefkriterium |
|---|---|---|
| T-1 | Fire testpar × innliming/TXT/tekstbasert PDF × begge omskrivingsvalg i mock. Riktig scenario/fasit, navigasjon, redigering og kopiering. PDF-varianter må lages; dagens testmappe har TXT og JSON. | FR-4–FR-8, FR-14–FR-17, FR-20, FR-26–FR-28; SM-1, SM-2, SM-6, SM-8 |
| T-2 | Ekte modell: alle krav/status mot fasit, ingen oppdiktede krav. Sitater finnes ordrett og er relevante. Fasitens `dekket` tilsvarer «Dokumentert», `mangler` tilsvarer «Mangler dokumentasjon». Semantisk like krav godtas. | FR-10–FR-12; SM-3 |
| T-3 | Begge resultattyper uten svar, med bekreftelse, «jeg har ikke førerkort» og «jeg holder på å lære». Mock kontrollerer flyten; betydningsvariantene vurderes også mot ekte modell. Ingen nye kvalifikasjoner eller styrking av begrenset erfaring. Veiledning kopieres ikke med søknadsteksten. | FR-13, FR-17–FR-20; SM-4–SM-6 |
| T-4 | Endre CV, annonse, svar og omskrivingsvalg hver for seg. Navigasjon og redigering alene beholder svar, uten kall. Endret CV/annonse ugyldiggjør gammel analyse/tekst. Avbryt ny analyse: svar beholdes som utdaterte. Bekreft ny analyse: gamle svar/resultater fjernes, også hvis kallet feiler. Endret tilleggssvar krever kun ny generering. | FR-13, FR-21–FR-22; SM-1, SM-4 |
| T-5 | Tom/blank tekst, feilformat, korrupt/passordbeskyttet PDF, PDF uten tekst og verdier ved/over arkitekturens grenser. Ingen analyse med tom CV eller tap av tidligere gyldig tekst ved filfeil. | FR-4–FR-9, FR-29; SM-2, SM-7 |
| T-6 | Konto/innlogging, A/B-tilgang via direkte forespørsler, utlogging, leverandørvarsel, manglende nøkkel, ugyldig svar/sitat, API-feil, tidsavbrudd og dobbeltklikk. Ingen datalekkasje, sene overskrivinger eller dupliserte aktive kall. | FR-1–FR-3, FR-11, FR-23–FR-25, FR-29–FR-30, NFR-4–NFR-6; SM-7 |
| T-7 | Manuell tilgjengelighetskontroll og installasjonstest på annen PC; registrer miljø og faktiske resultater. | NFR-1–NFR-3, NFR-7; SM-8 |

T-6 skal ha et blandet analysesvar med gyldige sitater og ett ugyldig/manglende sitat: hele analysen avvises uten gyldige delresultater. Dette testes deterministisk med simulerte svar, separat fra ekte KI-vurdering av sitaters relevans (T-2). Hvis gruppa vedtar øktforslaget, utvides T-6 med simulert tid ved 25/30 minutter, «Fortsett økten» før/etter utløp, lukket fane og sent modellsvar; ingen reell venting i 30 minutter kreves.

**Manuell brevsjekkliste (T-2/T-3):** Riktig stillingstittel og arbeidsgiver; bokmål og nøktern profesjonell tone; minst ett relevant, sporbart CV-eksempel i helt utkast; riktig resultatformat; ingen nye kvalifikasjoner; negasjoner og forbehold bevart; samme faktagrunnlag i begge omskrivingsvalg.

**Forslag fra Miranda – ikke gruppevedtak:** Ekte modell bør bestå fire av fire testpar i tre påfølgende runder, med begge omskrivingsvalg per par. Hver runde kontrollerer gap-analysen og brevsjekklisten; ordlyden kan variere. Ingen feilaktige kvalifikasjonspåstander aksepteres. Registrer alle forsøk og avvik, ikke bare beståtte, med dato, modell-ID, prompt-/appversjon og testparversjon. Promptretting starter en ny serie; tidligere avvik beholdes. Dette er avgrenset testbevis, ingen garanti for fremtidige svar. Kjøringer og oppfølging må planlegges innenfor 100 kr før start. Hvis tid eller budsjett ikke tillater målet, må gruppa vedta og begrunne et alternativ; mock erstatter ikke ekte modelltesting.

**Primære**
- **SM-3: Gap-analysen er riktig.** For hvert testpar finnes alle manglende krav i fasiten, og ingen dokumenterte krav i fasiten merkes som manglende. Hvert dokumentert krav vises med sitat. Validerer FR-10, FR-11, FR-12.
- **SM-5: Teksten er ærlig og treffende.** «Helt søknadsutkast» nevner riktig stillingstittel og arbeidsgiver og minst ett relevant eksempel fra CV-en. Manglende opplysninger etterspørres, ikke gjettes. Teksten inneholder ingen erfaring, utdanning eller sertifisering uten grunnlag. Validerer FR-9, FR-16, FR-18.
- **SM-1: Kjerneflyten virker.** Testbrukeren kan logge inn, legge inn CV ved innliming, TXT og tekstbasert PDF, legge inn annonse og få begge omskrivingsvalgene med hvert testpar, uten stopp eller krasj. Validerer 4.1–4.4.

**Sekundære**
- **SM-2: CV inn.** Innlest tekst vises, inneholder utdanning, erfaring og ferdigheter, og kan rettes. Tom inndata, feil filformat og filer uten lesbar tekst gir en forståelig melding med forslag til tiltak. Validerer FR-4 til FR-8.
- **SM-4: Svar brukes riktig.** Teksten bruker det brukeren skrev og legger ikke til detaljer som ikke står i svaret. Validerer FR-13, FR-18.
- **SM-6: Omskrivingsvalg.** «Forslag til formuleringer» gir en liste, og «Helt søknadsutkast» gir et sammenhengende brev. Med samme testpar har begge samme faktagrunnlag. Validerer FR-15 til FR-17.
- **SM-7: Sikkerhet og feil.** Bruker A får ikke tilgang til bruker Bs data, heller ikke via direkte forespørsler. Manglende API-nøkkel, API-feil og ugyldige svar fra språkmodellen gir forståelige meldinger. Ingen hemmeligheter vises, og inndata beholdes. Validerer FR-24, FR-30, NFR-4.
- **SM-8: Kjørbarhet.** Sensor kan følge README, starte i mock-modus og prøve hele kjerneflyten med testbrukeren og fiktive data. Mock-modus er tydelig merket. Validerer FR-3, FR-26, FR-27, NFR-7.

**Motmål (skal ikke optimaliseres)**
- **SM-C1: Høyere match- eller ATS-score.** En høyere score er ikke et mål i seg selv. Å jage den fører til at teksten fylles med nøkkelord og påstander CV-en ikke støtter. Motvekt til SM-5.
- **SM-C2: Færre spørsmål til brukeren.** Færre spørsmål er ikke automatisk bedre. Supersøker skal spørre heller enn å gjette. Motvekt til SM-1 og SM-5.

## 9. Åpne spørsmål

Alle ni punkter beholder sine numre. **Forslagene kommer fra Miranda og er ikke godkjent av gruppa.** Gruppa eier avklaringene; vedtak føres i PRD-en og [.memlog.md](.memlog.md). Fram til vedtak er §3–§4 utkastets grunnmodell med to gapstatuser. Nye forslag skal ikke implementeres som vedtatte krav.

1. **Vilkår som ikke kan stå i en CV (FR-10–FR-14).** Miranda foreslår «Ansettelsesvilkår» for politiattest, utenfor kompetansegapene og antallet dokumenterte/manglende kompetansekrav. Ingen opplasting eller kontroll av politiattest. **Krever gruppeavklaring:** Briefen har ingen egen kategori; dette endrer uttrekk, visning og fasit. Gruppen må godkjenne skillet før implementering av slike tilfeller. Ordliste, FR-10 og fasit oppdateres sammen ved godkjenning.
2. **Gråsoner (FR-11–FR-13).** Miranda foreslår «Delvis dokumentert» som **mulig utvidelse**, ikke obligatorisk v1. Den krever gruppas godkjenning og nye fasiter, prompts og visning. Inntil videre gjelder to statuser; uklart eller utilstrekkelig grunnlag må ikke gi «Dokumentert». Begrenset erfaring kan beskrives nøkternt uten å påstå full oppfyllelse (FR-18).
3. **Regelbasert kontroll (FR-11/FR-30).** Miranda foreslår ordrett-kontroll av dokumenterende CV-sitater. Forslaget er konkretisert i revidert FR-11 for godkjenning av utkastet. Kontrollen beviser ikke relevans og innebærer ingen egen regelbasert gap-analysemotor. Gruppen må bekrefte presiseringen før implementering.
4. **Bestått mot ekte modell (NFR-8/§8).** Miranda foreslår fire av fire korrekte testpar i tre påfølgende runder etter §8, uten feilaktige kvalifikasjonspåstander. Dette konkretiserer, men skjerper testomfanget utover briefens ikke-tallfestede antall kjøringer. Gruppen må godkjenne opplegget og kostnadsplanen før betalte testserier.
5. **Annonse uten krav (FR-10/FR-14/FR-18).** Miranda foreslår «Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt.» Videre generering tillates uten oppdiktede krav eller påstand om at alle krav er dokumentert. Tittel og arbeidsgiver etterspørres fortsatt etter FR-9. Gruppen må bekrefte flyten før implementering. Et eget testtilfelle legges til uten å endre de fire eksisterende fasitene.
6. **Ny versjon med uendret inndata (FR-21/FR-29).** **Mulig utvidelse:** Miranda foreslår en manuell knapp med begrenset antall forsøk. Antall, hva som teller som forsøk, og kostnadskontroll må vedtas før knappen tas inn. Den er ikke et ferdigkriterium for v1. Generering etter endrede svar/omskrivingsvalg og manuell retry etter feil følger fortsatt FR-21/FR-30.
7. **Inaktivitet (FR-22–FR-23).** **Uavklart gruppeforslag fra Miranda:** Varsel etter 25 minutter uten aktivitet, med «Fortsett økten» som nullstiller inaktivitetstiden før utløp; automatisk utlogging og sletting etter 30 minutter uten aktivitet. Ny innlogging kreves etter utløp, og data gjenopprettes ikke. Serveren håndhever utløp/sletting selv om fanen lukkes; varsel og bakgrunnskall er ikke brukeraktivitet. Gruppen må godkjenne opplegget og arkitekturen definere øvrig aktivitet før implementering. Testforslaget står ved T-6 og er betinget av vedtak.
8. **Sideoppdatering (FR-20/FR-22).** Miranda foreslår å beholde egenredigert tekst ved oppdatering i aktiv økt, uten permanent dokumentlagring. Gruppen må bekrefte dette før arkitekturen velger midlertidig lagring. Utlogging/øktutløp sletter fortsatt data. Testen må skille aktiv økt fra ny innlogging.
9. **Forslag til CV-en (FR-13/FR-19).** **Mulig forbedring i trinn 2:** Miranda foreslår en enkel anbefaling utenfor søknadsteksten om å oppdatere CV-en når svaret bekrefter manglende opplysninger. Negativt/usikkert svar må ikke tolkes som bekreftet kompetanse. Ingen automatisk CV-redigering. Inkludering i v1 ville avvike fra briefens plassering av CV-forbedringer i trinn 2 og krever uttrykkelig gruppevedtak.

## 10. Antakelser

- **4.2, FR-9:** Etterspørselen gjelder både stillingstittel og arbeidsgiver, slik suksesskriterium 5 i briefen sier.
- **4.2, FR-9:** Feltene for stillingstittel og arbeidsgiver er obligatoriske. Brukeren kan ikke hoppe over dem.
- **4.5, FR-25:** Brukeren må bekrefte varselet før data sendes til språkmodellen, og varselet vises én gang per økt.
- **5.1, NFR-1:** WCAG 2.1 nivå AA er målet for kontrast.
