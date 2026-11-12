---
title: "PRD: Supersøker - AI CV & Job Application Assistant"
status: draft
created: 2026-11-03
updated: 2026-11-12
---

# PRD: Supersøker - AI CV & Job Application Assistant

## 0. Dokumentets formål

Denne PRD-en beskriver hva første versjon (v1) av Supersøker skal gjøre, og er grunnlaget for UX, arkitektur, epics og stories. Kildegrunnlaget er:

- [Godkjent Product Brief](../../briefs/brief-supersoker-2026-09-16/brief.md) med [begrunnelser](../../briefs/brief-supersoker-2026-09-16/addendum.md).
- Faglærers tilbakemelding på [product brief](../../briefs/brief-supersoker-2026-09-16/tilbakemelding-product-brief.md) og på [PRD-en](tilbakemelding-prd.md), og [sensorveiledningen](../../../../.docs/sensorveiledning.md).
- [UX-prototypen](../../ux/prototype-kjerneflyt.html) og [de fire fiktive testparene](../../../../tests/fixtures/job-applications/README.md).

Teknisk bakgrunn, research og fullstendig ordlyd for tidligere vedtak står i [addendum.md](addendum.md). Hvem som besluttet hva og når, med begrunnelse, står i [.memlog.md](.memlog.md).

Funksjonene i §4 er bygget rundt én brukerreise (UJ-1). Kravene er nummerert FR-1 til FR-30 og tverrgående krav NFR-1 til NFR-8, slik at stories og tester kan vise til dem. Hvert FR har en prioritet (se §4). Begrepene i §3 brukes likt i hele dokumentet. Vedtak og berørte krav står i §9. Startverdier som arkitekturen kan justere, er merket `[ASSUMPTION]` og samlet i §10.

**Status:** `draft` til gruppa har godkjent revisjonen etter faglærers tilbakemelding (2026-11-12). Godkjente krav og testplan betyr ikke at tester er gjennomført.

**Ambisjonsnivå:** Supersøker er et studentprosjekt som skal demonstreres ved semesterslutt. Det skal ikke lanseres offentlig eller kommersielt. Demo og testing skjer med fiktive dokumenter, appen kjøres lokalt etter README, og mock-modus er standard.

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
    5. Hun vil at teksten skal være i hennes egne ord, og velger **«Forslag til formuleringer»** før hun trykker **«Lag tekst»**.
  - **Høydepunkt:** Thea får en liste med forslag til hva søknaden bør inneholde. Listen tar også med kravet som manglet i CV-en, basert på svaret hennes.
  - **Avslutning:** Thea kopierer teksten med **«Kopier tekst»**. Hun vet at dataene forsvinner når økten avsluttes.
  - **Kanttilfelle:** Hvis Thea ikke hadde svart på det manglende kravet, ville kravet blitt utelatt fra teksten. Supersøker påstår aldri at et udokumentert krav er oppfylt.

## 3. Ordliste

- **Bruker** — Personen som er innlogget i Supersøker. Det finnes én brukerrolle.
- **Brukerkonto** — E-postadresse og passord-hash. Det eneste Supersøker lagrer permanent. Én per bruker.
- **Testbruker** — Ferdig brukerkonto beskrevet i README, for sensor og gruppa.
- **CV-tekst** — Teksten fra brukerens CV, enten limt inn eller lest ut fra en TXT-fil eller tekstbasert PDF, og eventuelt rettet av brukeren.
- **Stillingsannonse (annonse)** — Teksten brukeren limer inn fra annonsen hun vil søke på. Kan inneholde stillingstittel, arbeidsgiver, kompetansekrav og ansettelsesvilkår. Manglende tittel/arbeidsgiver etterspørres; ingen tydelige krav håndteres som egen tomtilstand.
- **Krav** — Noe annonsen sier at arbeidsgiveren krever, ønsker eller «ser etter». Alle tre behandles likt innenfor kompetansekrav. Ansettelsesvilkår skilles ut og telles ikke som kompetansegap.
- **Ansettelsesvilkår** — Vilkår som politiattest, som ikke vurderes som CV-dokumentert kompetanse. Vises separat uten kompetansestatus og utenfor antallet dokumenterte/manglende kompetansekrav. Ingen attest lastes opp eller kontrolleres.
- **Gap-analyse** — Sammenligningen av kravene i annonsen med CV-teksten. Gir hvert kompetansekrav status «Dokumentert» eller «Mangler dokumentasjon».
- **Dokumentert** — Status for et kompetansekrav som CV-teksten dokumenterer. Vises alltid med et sitat.
- **Mangler dokumentasjon** — Status for et kompetansekrav CV-teksten ikke dokumenterer. Betyr ikke at brukeren mangler kompetansen.
- **Sitat** — Utdrag fra CV-teksten, gjengitt ordrett, som viser hvor et krav er dokumentert.
- **Svar** — Det brukeren skriver om et krav som mangler dokumentasjon. Valgfritt, og gjelder bare den aktuelle søknaden.
- **Omskrivingsvalg** — Brukerens valg av hvor mye Supersøker skal skrive: «Helt søknadsutkast» eller «Forslag til formuleringer».
- **Søknadsbrev** — Resultatet av omskrivingsvalget «Helt søknadsutkast»: et sammenhengende brev.
- **Forslag til formuleringer** — Resultatet av omskrivingsvalget med samme navn: en liste med forslag brukeren kan bruke i sitt eget brev.
- **Teksten** — Fellesbetegnelse på søknadsbrevet eller forslagene, avhengig av omskrivingsvalg. Knappen som lager den, heter «Lag tekst».
- **Økt** — Tiden fra innlogging til manuell utlogging eller automatisk utløp etter 30 minutter uten brukeraktivitet. Sideoppdatering oppretter ikke en ny økt eller nullstiller i seg selv inaktivitetstiden.
- **Midlertidige data** — CV-tekst, annonse, stillingstittel, arbeidsgiver, svar, gap-analyse og teksten. Finnes bare i økten.
- **Språkmodell** — Den eksterne KI-tjenesten Supersøker bruker i API-modus.
- **Mock-modus** — Standardmodus. Supersøker bruker ferdiglagde svar og sender ingen data til språkmodellen.
- **API-modus** — Modus der Supersøker sender midlertidige data til språkmodellen. Må slås på i konfigurasjonen.
- **Testpar** — Fiktiv CV og annonse med fasit, i `tests/fixtures/job-applications/`. Det finnes fire testpar.
- **Fasit** — Kravene i et testpar, med forventet status og sitat for hvert krav.

## 4. Funksjoner

Hvert FR har en prioritet:

- **Må** — Del av v1 og ferdigkriterium (§7.3).
- **Bør** — Bygges i v1 hvis tiden tillater det, som egne stories etter «må»-kravene. Ikke ferdigkriterium. Enkeltpunkter merket *(bør)* inne i et «må»-krav følger samme regel.

Det som kan utsettes, står i §7.2.

### 4.1 Konto og innlogging

**Beskrivelse:** Supersøker har én brukerrolle. Brukeren oppretter en konto og logger inn før hun kan legge inn CV og annonse. Brukerkontoen er det eneste som lagres permanent. Sensor og gruppa logger inn med en ferdig testbruker. Realiserer UJ-1 (starttilstand).

#### FR-1: Opprette konto

**Prioritet:** må. En besøkende kan opprette en brukerkonto med e-postadresse og passord. Realiserer UJ-1.

**Konsekvenser (testbare):**
- E-postadressen må ha gyldig format og kan bare brukes av én konto.
- Passordet må ha minst 8 tegn. Det finnes ingen andre passordregler.
- Kontoen lagrer ikke navn. Navnet i søknadsbrevet hentes fra CV-en (se 4.4).
- Ugyldig inndata gir en melding som sier hva som er feil og hvordan det rettes. E-postadressen beholdes i skjemaet, passordet tømmes.
- Passord lagres bare som sikker hash, aldri i klartekst.

#### FR-2: Logge inn og ut

**Prioritet:** må. En bruker kan logge inn med e-post og passord, og logge ut fra alle sider. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Feil e-post eller feil passord gir samme melding, slik at meldingen ikke avslører om e-postadressen finnes.
- Sider etter innlogging kan ikke åpnes uten innlogging. Forsøk sender brukeren til innloggingssiden.
- Utlogging sletter brukerens midlertidige data (se 4.5).

#### FR-3: Testbruker

**Prioritet:** må. Det finnes en testbruker som er beskrevet i README, slik at sensor kan logge inn uten å opprette konto.

**Konsekvenser (testbare):**
- Testbrukeren finnes etter installasjon og oppstart etter README, uten ekstra steg.
- Testbrukerens passord står bare i README og testoppsett, ikke i kildekode som brukes i drift.

### 4.2 CV og stillingsannonse

**Beskrivelse:** Brukeren legger inn CV-en ved å lime inn tekst eller laste opp en fil, og limer inn stillingsannonsen. Supersøker viser teksten den leste fra fila, slik at brukeren kan rette den før analysen. Supersøker går ikke videre med tom CV eller tom annonse. Realiserer UJ-1 (steg 1–2).

#### FR-4: Legge inn CV

**Prioritet:** må. En bruker kan legge inn CV-en som innlimt tekst, TXT-fil eller tekstbasert PDF. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Andre filformater avvises med meldingen ««<fil>» kan ikke leses – Velg en TXT- eller PDF-fil, eller lim inn teksten.»
- Filer over 2 MB og CV-tekst over 10 000 tegn avvises med en melding som oppgir grensen. [ASSUMPTION: startverdier, se §10] Grensene begrenser også kostnaden i API-modus.
- Originalfila slettes etter at teksten er lest ut.
- Korrupte, passordbeskyttede eller ellers uleselige filer gir en melding som navngir fila og tilbyr ny opplasting eller innliming, for eksempel «Vi kunne ikke lese filen <fil>. Prøv en TXT-fil eller tekstbasert PDF, eller lim inn teksten.» Ingen teknisk feildump vises.
- Ved feil beholdes tidligere gyldig CV-tekst. Eventuelle midlertidige filer slettes også når tekstuttrekket feiler. Filtype og grenser valideres på serveren; filendelsen alene avgjør ikke om innholdet kan leses.

**Utenfor omfang:**
- Skannede PDF-er (OCR) og DOC/DOCX.

#### FR-5: Se og rette innlest CV-tekst

**Prioritet:** må. Etter opplasting ser brukeren teksten Supersøker leste fra fila, i et redigerbart felt, og kan rette den før analysen. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Innlest tekst fra testparenes CV-er inneholder utdanning, erfaring og ferdigheter.
- For PDF minner Supersøker brukeren om å sjekke at kolonner og overskrifter kom i riktig rekkefølge.
- Det er den rettede teksten som brukes i analysen.

#### FR-6: PDF uten lesbar tekst

**Prioritet:** bør. Når en PDF ikke inneholder lesbar tekst, får brukeren beskjed om det og kan lime inn teksten i stedet.

**Konsekvenser (testbare):**
- Meldingen navngir fila og forklarer at den ser ut til å være skannet som bilde.
- Brukeren kommer ikke videre før CV-feltet har tekst.

#### FR-7: Legge inn stillingsannonse

**Prioritet:** må. En bruker kan lime inn stillingsannonsen som tekst. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Feltet har en hjelpetekst om å ta med stillingstittel og arbeidsgiver.
- Annonseteksten har samme lengdegrense som CV-teksten (10 000 tegn). [ASSUMPTION: startverdi, se §10]

#### FR-8: Kontroll før analyse

**Prioritet:** må. Supersøker starter ikke analysen når CV-en eller annonsen er tom.

**Konsekvenser (testbare):**
- Tomt felt gir en melding ved feltet, feltet merkes som ugyldig, og fokus flyttes dit.
- Felt med bare blanktegn regnes som tomme. Valideringen gjelder også på serveren.
- Det brukeren allerede har skrevet, beholdes.

#### FR-9: Etterspørre manglende stillingstittel og arbeidsgiver

**Prioritet:** må. Når Supersøker ikke finner stillingstittel eller arbeidsgiver i annonsen, ber den brukeren fylle dem inn før gap-analysen starter. Supersøker gjetter aldri på dem.

**Konsekvenser (testbare):**
- En annonse uten stillingstittel eller arbeidsgiver gir et felt for det som mangler, med forklaring på hvorfor det trengs.
- Feltene er obligatoriske. Gap-analysen starter ikke før de er fylt inn, og tomme eller blanke svar godtas ikke.
- Identifisert stillingstittel og arbeidsgiver vises og kan rettes før de brukes. Tvetydige opplysninger etterspørres fremfor å gjettes.
- Det brukeren fyller inn, brukes i overskriften på gap-analysen og i teksten.

### 4.3 Gap-analyse

**Beskrivelse:** Supersøker trekker ut kravene i annonsen og sjekker hvert krav mot CV-teksten. Hvert kompetansekrav får status «Dokumentert» eller «Mangler dokumentasjon». Dokumenterte krav vises med sitatet fra CV-en som dokumenterer dem. Krav som mangler dokumentasjon, vises først, fordi det er der brukeren skal handle. Hun kan svare kort på hvert av dem. Resultatet omtaler manglende *dokumentasjon*, ikke manglende kompetanse. Den verste feilen gap-analysen kan gjøre, er å merke et krav som dokumentert uten grunnlag i CV-en. Realiserer UJ-1 (steg 3–4).

#### FR-10: Trekke ut krav fra annonsen

**Prioritet:** må. Supersøker trekker ut kravene i stillingsannonsen. Kompetansekrav, ønsker og «vi ser etter» behandles og vises likt. Ansettelsesvilkår vises separat etter §3. Realiserer UJ-1.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle kravene i fasiten.
- Gap-analysen viser ingen krav som ikke står i annonsen.
- Ansettelsesvilkår som politiattest vises separat, uten status «Dokumentert»/«Mangler dokumentasjon», uten svarfelt for kompetansegap og utenfor kompetanseopptellingen. Ingen attest lastes opp eller kontrolleres.
- Når ingen tydelige krav eller vilkår finnes, vises «Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt.» Brukeren kan generere begge resultattyper etter FR-9 og FR-18, uten oppdiktede krav eller påstand om at alle krav er dokumentert.
- Finnes bare ansettelsesvilkår, vises disse og meldingen «Vi fant ingen tydelige kompetansekrav i annonsen.» Brukeren kan rette annonsen eller generere tekst etter samme regler; dette er ikke tomtilstanden uten krav/vilkår.

#### FR-11: Vise dokumenterte krav med kilde

**Prioritet:** må. Hvert kompetansekrav som er dokumentert, vises med status «Dokumentert» og et sitat fra CV-teksten som viser hvor det er dokumentert. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Sitatet finnes ordrett i CV-teksten som ble analysert.
- Systemet kontrollerer dette regelbasert mot den rettede CV-teksten før analysen vises. Hvis bare ét dokumenterende CV-sitat mangler eller ikke finnes ordrett, avvises hele analysen etter FR-30. Ingen kravstatuser, gap eller andre delresultater fra dette svaret vises som gyldige, og analysen kan ikke brukes til generering.
- At sitatet finnes ordrett, beviser ikke alene at det dokumenterer kravet. Relevans og betydning vurderes mot fasiten ved testing av ekte modell. Et ekte, men irrelevant sitat er en feil, ikke bestått dokumentasjon. Kontrollen er ingen garanti for semantisk riktighet.
- V1 har to kompetansestatuser. Utilstrekkelig eller uklart grunnlag gir ikke «Dokumentert».
- For hvert testpar merkes ingen av fasitens dokumenterte krav som manglende.
- Ingen kompetansekrav merkes som dokumentert uten et sitat.

#### FR-12: Vise krav som mangler dokumentasjon

**Prioritet:** må. Hvert kompetansekrav som ikke er dokumentert i CV-en, vises med status «Mangler dokumentasjon». Disse vises før de dokumenterte kompetansekravene, sammen med en oppsummering av hvor mange kompetansekrav som er dokumentert. Realiserer UJ-1.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle manglende krav i fasiten.
- Teksten sier at kravet ikke står i CV-en, ikke at brukeren mangler det.
- Overskriften inneholder stillingstittel og arbeidsgiver.
- Status vises med tekst, ikke bare med farge.

#### FR-13: Svare på krav som mangler dokumentasjon

**Prioritet:** må. Under hvert krav som mangler dokumentasjon, kan brukeren skrive et kort, valgfritt svar. Svaret gjelder bare denne søknaden. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Svarfeltet er valgfritt. Brukeren kan gå videre uten å svare.
- Hvert svar er høyst 1 000 tegn. Lengre svar avvises med en melding som oppgir grensen. [ASSUMPTION: startverdi, se §10]
- Svaret beholdes når brukeren navigerer mellom stegene.
- Svaret lagres ikke på kontoen og brukes ikke i andre søknader.
- Et utfylt svar er ikke i seg selv bekreftet kompetanse. «Jeg har ikke førerkort», «jeg holder på å lære» og tilsvarende forbehold skal beholde sin betydning i resultatet (FR-18).
- Svar forkastes bare når brukeren bekrefter å endre CV eller annonse (FR-21). Et endret svar krever ny tekst, ikke ny gap-analyse.

#### FR-14: Når alle krav er dokumentert

**Prioritet:** bør. Når alle kompetansekravene i annonsen er dokumentert, sier Supersøker det og lar brukeren gå rett til omskrivingsvalget.

**Konsekvenser (testbare):**
- Testpar 4 gir meldingen «Alle kompetansekrav i annonsen er dokumentert i CV-en.» og ingen svarfelt.
- Meldingen krever minst ett kompetansekrav og at alle kompetansekrav er dokumentert. Ansettelsesvilkår omfattes ikke av meldingen. Ingen kompetansekrav håndteres etter FR-10.

### 4.4 Teksten

**Beskrivelse:** Brukeren velger hvor mye Supersøker skal skrive: et helt søknadsutkast eller forslag til formuleringer hun kan bruke i sitt eget brev. Teksten bygger bare på CV-teksten, annonsen og brukerens svar. Den skrives på norsk bokmål i en nøktern, profesjonell tone, med konkrete eksempler fra CV-en framfor generelle superlativer. Supersøker viser hva teksten bygger på. Brukeren kan redigere teksten og kopiere den, og hun får vite at teksten slettes når hun logger ut. Realiserer UJ-1 (steg 5 til avslutning).

#### FR-15: Velge omskrivingsvalg

**Prioritet:** må. Før teksten lages, velger brukeren mellom «Helt søknadsutkast» («Et sammenhengende brev du redigerer selv.») og «Forslag til formuleringer» («Setninger du kan bruke i ditt eget brev.»), og trykker «Lag tekst». Realiserer UJ-1.

**Konsekvenser (testbare):**
- «Helt søknadsutkast» er valgt på forhånd.
- Valget kan gjøres med tastatur, og gruppen av valg har en synlig ledetekst.

#### FR-16: Helt søknadsutkast

**Prioritet:** må. Med «Helt søknadsutkast» lager Supersøker et sammenhengende søknadsbrev.

**Konsekvenser (testbare):**
- For hvert testpar nevner brevet riktig stillingstittel og arbeidsgiver og minst ett relevant eksempel fra CV-en.
- Brevet er skrevet på norsk bokmål.
- Brevet signeres med navnet fra CV-en. Har CV-en ikke noe navn, avsluttes brevet med «Vennlig hilsen [ditt navn]».

#### FR-17: Forslag til formuleringer

**Prioritet:** må. Med «Forslag til formuleringer» lager Supersøker en liste med forslag til hva søknaden bør inneholde. Realiserer UJ-1 (høydepunkt).

**Konsekvenser (testbare):**
- Resultatet er en liste, ikke et sammenhengende brev.
- Listen bruker relevant innhold fra tilleggssvar, med negasjoner og begrensninger bevart etter FR-18. Den påstår ikke at et krav er oppfylt bare fordi brukeren har svart.
- Krav brukeren ikke har svart på, nevnes ikke i forslagene som skal brukes i søknaden.
- Veiledning om utelatte krav vises utenfor søknadsteksten, tydelig merket «Veiledning – ikke del av søknaden». Den skal ikke følge med «Kopier tekst» eller blandes inn i forslagene.
- Samme testpar gir samme faktagrunnlag i begge omskrivingsvalgene.

#### FR-18: Ærlighetsregel

**Prioritet:** må. Teksten bygger bare på CV-teksten, annonsen og brukerens svar. Realiserer UJ-1 (kanttilfelle).

**Konsekvenser (testbare):**
- Teksten påstår aldri at et krav er oppfylt når kravet mangler dokumentasjon og brukeren ikke har svart.
- Teksten legger ikke til erfaring, utdanning eller sertifiseringer som ikke står i CV-en eller i svarene. Ansettelsesvilkår i annonsen er ikke bevis på at søkeren oppfyller dem; teksten påstår ikke eksempelvis at søkeren har politiattest uten grunnlag.
- Når brukeren har svart, bruker teksten det hun skrev og legger ikke til detaljer som ikke står i svaret.
- Negasjoner, forbehold og kvalifikasjonsnivå bevares i begge omskrivingsvalg. «Jeg har ikke førerkort» må aldri bli «Jeg har førerkort», og «jeg holder på å lære Python» må ikke bli «Jeg behersker Python».
- Ved usikkert eller motstridende grunnlag skal teksten ikke påstå at kravet er oppfylt. Usikkerheten kan forklares i veiledning utenfor søknadsteksten; ingen ny oppfølgingschat kreves.
- Ærlighetsregelen gjelder systemets genererte tekst. Brukerens egne redigeringer verifiseres ikke automatisk (FR-19).

#### FR-19: Vise hva teksten bygger på

**Prioritet:** må. Ved siden av teksten viser Supersøker listen «Teksten bygger på» med tilgjengelig grunnlag for den genererte teksten: CV-sitatene fra analysen, stillingstittel og arbeidsgiver, og brukerens svar. Dette er ikke en automatisk kobling mellom hver setning og en kilde.

**Konsekvenser (testbare):**
- Hvert svar brukeren har gitt, står i listen som oppgitt grunnlag; et svar er ikke nødvendigvis en bekreftelse eller brukt i teksten.
- Oppsummeringen av gap-analysen viser for hvert manglende krav om brukeren har svart, eller at kravet ikke nevnes i den genererte teksten.
- Listen merkes «Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.» Den skal ikke fremstå som verifisering av brukerens senere endringer.

#### FR-20: Redigere og kopiere teksten

**Prioritet:** må. Brukeren kan redigere teksten i Supersøker og kopiere den med «Kopier tekst». Realiserer UJ-1 (avslutning).

**Konsekvenser (testbare):**
- Etter kopiering vises «Kopiert. Lim inn teksten der du skriver søknaden.»
- Hvis kopiering ikke er tillatt i nettleseren, markeres teksten, og brukeren får beskjed om å trykke Ctrl+C.
- En melding sier at teksten tas vare på mens brukeren er innlogget, og slettes når hun logger ut.

**Utenfor omfang:**
- Nedlasting og fileksport (trinn 3).

#### FR-21: Endre svar, omskrivingsvalg, CV eller annonse

**Prioritet:** må. Fra teksten kan brukeren gå tilbake til gap-analysen og endre svarene sine eller omskrivingsvalget, eller gå tilbake og endre CV eller annonse.

**Konsekvenser (testbare):**
- CV-tekst, annonse og svar beholdes når brukeren går tilbake. Navigasjon alene starter ingen modellkall og overskriver ingen tekst.
- Endret svar eller omskrivingsvalg: ny tekst lages først når brukeren trykker «Lag tekst», uten ny gap-analyse. Før egenredigert tekst erstattes, varsles brukeren og kan avbryte.
- Endres CV eller annonse, må brukeren starte ny analyse. Etter gap-analysen kan CV og annonse bare endres via «Endre CV eller annonse». Brukeren varsles om at svar, gap-analyse og tekst, også egenredigert tekst, forkastes, og får bekrefte eller avbryte. Avbrytes det, endres ingenting. Bekreftes det, forkastes de gamle dataene og feltene kan redigeres.

**Avgrensning:** Ny tekstversjon med uendret inndata er ikke med i v1 (§7.2). Generering etter endrede svar/omskrivingsvalg og manuell retry etter feil (FR-30) er med.

### 4.5 Økt og personvern

**Beskrivelse:** CV-er er personopplysninger. Supersøker lagrer derfor bare brukerkontoen permanent. CV-tekst, annonse, svar, gap-analyse og teksten er midlertidige data. De tas vare på mens brukeren er innlogget, og slettes når hun logger ut. Bare eieren har tilgang til dataene. Før noe sendes til en ekstern språkmodell, får brukeren vite det. Realiserer UJ-1 (avslutning).

#### FR-22: Ta vare på midlertidige data i økten

**Prioritet:** må. Mens brukeren er innlogget, tar Supersøker vare på CV-teksten, annonsen, stillingstittel og arbeidsgiver, svarene, gap-analysen og teksten. Brukeren kan se resultatene igjen uten ny analyse.

**Konsekvenser (testbare):**
- Brukeren kan gå mellom stegene uten å miste inndata eller resultater.
- Å gå tilbake til et resultat sender ingen nye kall til språkmodellen.
- Ved sideoppdatering i aktiv økt beholdes egenredigert tekst og øvrige midlertidige data, uten modellkall. Dette innfører ikke permanent dokumentlagring.
- *(bør)* Etter 25 minutter uten brukeraktivitet vises et tilgjengelig varsel om utlogging om fem minutter, med «Fortsett økten». Et klikk før utløp teller som aktivitet og nullstiller inaktivitetstiden, uten modellkall. Varselet forlenger ikke økten i seg selv.

#### FR-23: Slette midlertidige data ved utlogging og øktutløp

**Prioritet:** må. Når brukeren logger ut, eller økten utløper, slettes alle midlertidige data.

**Konsekvenser (testbare):**
- Etter 30 minutter uten brukeraktivitet logges brukeren automatisk ut, og alle midlertidige data slettes, også hvis fanen er lukket eller et modellkall pågår. Kontrollen skjer på serveren. Arkitekturen definerer hva som er brukeraktivitet; bakgrunnskall forlenger ikke økten.
- Etter manuell utlogging eller øktutløp og ny innlogging er CV, annonse, svar og resultater borte. Ingenting gjenopprettes.
- Brukerkontoen er det eneste som finnes igjen.
- Slettede data gjenopprettes aldri, heller ikke av et modellsvar som kommer etter utlogging eller utløp.

#### FR-24: Bare eieren får tilgang

**Prioritet:** må. En bruker får bare tilgang til sine egne kontoopplysninger og midlertidige data. Kontrollen skjer på serveren.

**Konsekvenser (testbare):**
- Bruker A får ikke tilgang til bruker Bs kontoopplysninger eller midlertidige data i aktiv økt, heller ikke via direkte forespørsler til serveren.

#### FR-25: Varsel før data sendes til ekstern språkmodell

**Prioritet:** må. I API-modus får brukeren vite at CV-teksten, annonsen og svarene sendes til en ekstern leverandør, før første kall til språkmodellen.

**Konsekvenser (testbare):**
- Varselet navngir leverandøren.
- Ingen data sendes før brukeren har bekreftet varselet. Varselet vises én gang per økt.
- Varselet vises ikke i mock-modus.

### 4.6 Mock-modus og API-modus

**Beskrivelse:** Supersøker kan kjøre i mock-modus eller API-modus. Mock-modus er standard. Den sender ingen data ut og krever ingen API-nøkkel, slik at sensor kan prøve hele kjerneflyten med fiktive data. Svarene i mock-modus er ferdiglagde eksempler som passer til testparene. API-modus bruker en ekte språkmodell og må slås på aktivt av den som kjører Supersøker.

#### FR-26: Mock-modus som standard

**Prioritet:** må. Supersøker starter i mock-modus når ingenting annet er konfigurert.

**Konsekvenser (testbare):**
- Supersøker kan installeres og kjøres etter README uten API-nøkkel og uten betaling.
- Hver side viser at mock-modus er på, og at ingen tekst sendes til en språkmodell.
- I mock-modus sendes ingen data ut av maskinen.

#### FR-27: Laste inn eksempel

**Prioritet:** må. I mock-modus kan brukeren fylle inn CV og annonse fra testpar 1 med knappen «Last inn eksempel (testpar 1)».

**Konsekvenser (testbare):**
- Etter klikk er CV-feltet og annonsefeltet fylt ut, og en melding forteller brukeren at hun kan trykke «Analyser kravene».
- Hele kjerneflyten kan gjennomføres med testpar 1 i mock-modus.
- Alle fire testpar skal kunne velges som navngitte testscenarioer i testoppsettet. README beskriver hvordan sensor kjører hvert scenario; det kreves ikke fire nye knapper i brukerflaten.
- Hvert scenario bruker faste, tilhørende analysesvar og begge resultattyper. For par med gap finnes faste varianter uten svar, med bekreftende svar og med negativt/begrenset svar. Bare de dokumenterte scenarioene simuleres; mock tolker ikke vilkårlig tilleggstekst. Meldingen forklarer når teksten ikke påvirker eksempelsvaret.

#### FR-28: Mock-modus med egen tekst

**Prioritet:** bør. Når brukeren legger inn egen tekst i mock-modus, får hun et fast eksempelsvar som er tydelig merket.

**Konsekvenser (testbare):**
- Meldingen sier at teksten hennes ikke er analysert, og at svaret er et fast eksempel.
- Mock-modus gjør ingen regelbasert analyse av egen tekst.

#### FR-29: Slå på API-modus

**Prioritet:** må. Den som kjører Supersøker, kan slå på API-modus i konfigurasjonen.

**Konsekvenser (testbare):**
- API-modus brukes bare når den er valgt i konfigurasjonen og en API-nøkkel er satt.
- Grensene i FR-4, FR-7 og FR-13 håndheves før modellkallet. Overskridelse avvises med oppgitt grense og forslag til retting.
- Arkitekturen fastsetter i tillegg grense for samlet forespørsel og for modellens utdatalengde før betalte kall aktiveres. Den kan justere startverdiene i §10; endringer føres tilbake i PRD-en.
- Supersøker sender aldri automatiske gjentatte kall til språkmodellen.

#### FR-30: Feil fra språkmodellen

**Prioritet:** må. Når språkmodellen ikke svarer, svarer med feil, eller svaret ikke kan brukes, får brukeren en forståelig melding.

**Konsekvenser (testbare):**
- Mens et kall pågår, vises «Analyserer …» eller «Lager tekst …», og handlingsknappen deaktiveres, slik at dobbeltklikk ikke starter flere kall.
- *(bør)* Serveren avviser i tillegg dupliserte innsendinger for samme aktive handling.
- Hvert kall har et tidsavbrudd på 30 sekunder. [ASSUMPTION: startverdi, se §10] Tester simulerer svar før og etter grensen uten lang venting.
- Ved tidsavbrudd eller midlertidig API-feil vises for eksempel «Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» «Prøv igjen» krever et nytt klikk og starter høyst ett nytt kall; ingen automatiske gjentakelser.
- Manglende nøkkel, ugyldig konfigurasjon eller nådd kostnadsgrense gir beskjed om hva den som kjører appen må rette. «Prøv igjen» skal ikke foreslå at en uendret konfigurasjonsfeil løses av et nytt klikk. Appen bytter ikke stilltiende til mock.
- Ugyldig svarformat, manglende obligatoriske felt eller et manglende/ikke ordrett dokumenterende CV-sitat avviser hele analysen. Vis for eksempel «Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt.» Ingen kravstatuser, gap eller andre delresultater fra det avviste svaret vises som gyldige eller brukes til generering. At enkelte sitater er gyldige, redder ikke resten av analysen (FR-11).
- CV-teksten, annonsen og aktuelle svar beholdes ved feil. Svar som er forkastet etter FR-21, og data som er slettet etter FR-23, gjenopprettes ikke.
- Meldingen viser aldri API-nøkkelen eller andre hemmeligheter.
- Halvferdige resultater vises ikke.
- *(bør)* Sene svar etter tidsavbrudd eller etter at brukeren har startet ny analyse, ignoreres, slik at de ikke overskriver nyere data eller brukerens redigeringer.

## 5. Tverrgående krav

### 5.1 Universell utforming og design

- **NFR-1: Universell utforming.** Hele kjerneflyten kan gjennomføres med tastatur. Alle skjemafelt har synlige etiketter, og fokus er alltid synlig. Status vises med tekst, ikke bare med farge. Feil- og statusmeldinger leses opp av skjermleser. Ved stegbytte flyttes fokus til overskriften, og ved feil til første ugyldige felt. Tekst og kontroller har kontrast som oppfyller WCAG 2.1 nivå AA.
- **NFR-2: Skjermstørrelser.** Kjerneflyten fungerer på mobil og datamaskin. På smale skjermer stables kolonnene, og steglisten viser bare aktivt steg.
- **NFR-3: Meldinger.** Alle meldinger er på norsk bokmål og sier hva som er galt og hva brukeren kan gjøre. Tomtilstander forklarer hva som mangler.

### 5.2 Sikkerhet og personvern

- **NFR-4: Hemmeligheter.** API-nøkkelen finnes bare på serveren, i lokal miljøkonfigurasjon. `.env` er utenfor Git, og `.env.example` har tomme plassholdere og valg av mock- eller API-modus.
- **NFR-5: Bare fiktive dokumenter.** Repoet, testdataene og demoene bruker bare fiktive CV-er og annonser. CV-tekst og svar skrives aldri til logger.

### 5.3 Kostnad

- **NFR-6: Budsjett.** Betalte kall til språkmodellen i utviklingstestingen koster til sammen høyst 100 kr. Kostnadsoverslaget står i §8. Arkitekturen beskriver hvordan grensen håndheves, før betalte kall slås på.

### 5.4 Kjørbarhet og testbarhet

- **NFR-7: Kjørbar etter README.** En person som ikke kjenner prosjektet, kan installere og starte Supersøker på en ren maskin i mock-modus ved å følge README, og prøve hele kjerneflyten med testbrukeren og testparene.
- **Akseptansetest for NFR-7:** En annen person gjennomfører installasjon på en annen PC uten utviklerens lokale oppsett, API-nøkkel eller udokumentert hjelp. Registrer dato, testansvarlig, operativsystem, nødvendige versjoner, appens commit, kommandoer, tidsbruk, avvik og resultat i en testrapport. Rett README og gjenta berørte steg ved avvik.
- **NFR-8: Testbar uten språkmodell.** Kjerneflyten kan testes automatisk i mock-modus. Testparene kan også kjøres mot den ekte språkmodellen, og resultatene registreres etter akseptansekravet og reserveregelen i §8. Tidligere forsøk og avvik beholdes.

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
- Gap-analyse med sitat for dokumenterte krav, separat visning av ansettelsesvilkår, tomtilstand uten tydelige krav og valgfritt svar på krav som mangler dokumentasjon (4.3).
- Søknadsbrev eller forslag til formuleringer, med ærlighetsregel, «Teksten bygger på», redigering og «Kopier tekst» (4.4).
- Midlertidige data i økten, også ved sideoppdatering, utlogging og sletting etter 30 minutter uten aktivitet, og eierskapskontroll (4.5).
- Mock-modus som standard, eksempel fra testpar 1, og API-modus som må slås på (4.6).

«Bør»-krav (§4) bygges etter «må»-kravene hvis tiden tillater det.

### 7.2 Utenfor v1

**Trinn 2** (målet hvis v1 er testet og stabil i tide):
- Egne forslag til forbedring av CV-en.
- ATS-veiledning, uten garanti.

**Andre utsatte utvidelser uten fast trinn:**
- Tredje kompetansestatus «Delvis dokumentert».
- Ny tekstversjon med uendret inndata; forsøksgrense, telleregler og kostnadskontroll må bestemmes før eventuell innføring.

**Trinn 3** (utsatt):
- Strukturert CV-mal og DOC-støtte.
- Tidligere søknader.
- Lagring av svar på profilen (variant B) og innskriving av svar i en ny CV-fil (variant C).
- Valg av språk og tone.
- Fileksport og nedlasting. «Kopier tekst» holder i v1.

**Utenfor prosjektet:**
- Skannede PDF-er (OCR).

### 7.3 Ferdigkriterier før trinn 2

Listen beskriver hva som må være oppfylt, ikke utførte tester. Før ekstra funksjoner prioriteres:

- Alle «må»-krav er implementert. SM-1 til SM-8 er kontrollert med registrerte resultater. «Sekundære» i §8 betyr ikke valgfrie krav.
- Alle fire testpar fungerer i mock med begge omskrivingsvalg og alle tre CV-innleggingsmåter. Relevante automatiske tester kjøres etter README uten feil. Mock dokumenterer ikke ekte modellkvalitet.
- Ekte modell er vurdert mot fasit, ærlighetsregelen og brevsjekklisten etter akseptansekravet og reserveregelen i §8, innenfor budsjettet på 100 kr.
- Feiltilfeller, kildekontroll, endrede inndata, øktdata og A/B-tilgang er testet. Ingen kjente feil som gir falske kvalifikasjonspåstander, uvedkommende tilgang eller stopper kjerneflyten står åpne.
- Kjerneflyten er kontrollert med tastatur og på dokumenterte mobil-/PC-størrelser, med feilmeldinger, tomtilstander og kopiering kontrollert mot NFR-1 til NFR-3.
- Installasjonstesten på annen PC er dokumentert (NFR-7). README beskriver faktisk oppstart, testbruker, testscenarioer og testkommandoer.
- Startverdiene i §10 er bekreftet eller justert av arkitekturen. Mindre restfeil har dokumentert konsekvens. Krav, stories, tester og rettinger av KI-generert kode kan spores i repoet.

## 8. Suksessmål

Suksessmålene er briefens åtte suksesskriterier, med samme nummer (SM-N er kriterium N i briefen). De er gruppert etter viktighet, derfor er rekkefølgen ikke numerisk. De vurderes med de fire testparene. Mock-tester viser at flyten virker. Kvaliteten på språkmodellens svar vurderes separat mot ekte modell, og brevkvaliteten sjekkes manuelt med en sjekkliste.

### Testopplegg og sporbarhet

Alle tester nedenfor er planlagt kvalitetssikring, ikke påstander om utførte tester. Test-ID-ene er referanser for kommende tester og rapporter.

| Test-ID | Kontroll og forventning | Krav og briefkriterium |
|---|---|---|
| T-1 | Fire testpar × innliming/TXT/tekstbasert PDF × begge omskrivingsvalg i mock. Riktig scenario/fasit, navigasjon, redigering og kopiering. PDF-varianter må lages; dagens testmappe har TXT og JSON. | FR-4–FR-8, FR-14–FR-17, FR-20, FR-26–FR-28; SM-1, SM-2, SM-6, SM-8 |
| T-2 | Ekte modell: alle krav/status mot fasit, ingen oppdiktede krav. Sitater finnes ordrett og er relevante. Ansettelsesvilkår kontrolleres separat og holdes utenfor kompetanseopptellingen. Fasitens `dekket` tilsvarer «Dokumentert», `mangler` tilsvarer «Mangler dokumentasjon». Semantisk like krav godtas. | FR-10–FR-12; SM-3 |
| T-3 | Begge resultattyper uten svar, med bekreftelse, «jeg har ikke førerkort» og «jeg holder på å lære». Mock kontrollerer flyten; betydningsvariantene vurderes også mot ekte modell. Ingen nye kvalifikasjoner eller styrking av begrenset erfaring. Veiledning kopieres ikke med søknadsteksten. | FR-13, FR-17–FR-20; SM-4–SM-6 |
| T-4 | Endre svar og omskrivingsvalg: ny tekst bare ved «Lag tekst», uten ny gap-analyse, og varsel før egenredigert tekst erstattes. «Endre CV eller annonse»: avbryt endrer ingenting; bekreft forkaster svar, analyse og tekst, også hvis den nye analysen feiler. Navigasjon alene starter ingen kall. | FR-13, FR-21–FR-22; SM-1, SM-4 |
| T-5 | Tom/blank tekst, feilformat, korrupt/passordbeskyttet PDF, PDF uten tekst og verdier ved/over grensene i FR-4, FR-7 og FR-13. Ingen analyse med tom CV eller tap av tidligere gyldig tekst ved filfeil. | FR-4–FR-9, FR-13, FR-29; SM-2, SM-7 |
| T-6 | Konto/innlogging, A/B-tilgang via direkte forespørsler, utlogging, leverandørvarsel, manglende nøkkel, ugyldig svar/sitat, API-feil, tidsavbrudd og dobbeltklikk. Ingen datalekkasje eller dupliserte aktive kall. | FR-1–FR-3, FR-11, FR-23–FR-25, FR-29–FR-30, NFR-4–NFR-6; SM-7 |
| T-7 | Manuell tilgjengelighetskontroll og installasjonstest på annen PC; registrer miljø og faktiske resultater. | NFR-1–NFR-3, NFR-7; SM-8 |
| T-8 | Annonse med både kompetansekrav og politiattest, og annonse med bare ansettelsesvilkår. Vilkår vises separat uten kompetansestatus/svarfelt og utenfor opptelling. Ingen attestopplasting/kontroll, udokumentert påstand i brevet om oppfylt vilkår eller uriktig «alle kompetansekrav dokumentert». Nye supplerende fasiter planlegges; eksisterende fasiter endres bare ved faktisk behov. | FR-10–FR-14; SM-3 |
| T-9 | Annonse uten tydelige krav/vilkår gir tomtilstand og tilbyr retting eller begge resultattyper. Ingen oppdiktede krav eller «alle krav dokumentert». Manglende/tvetydig tittel og arbeidsgiver etterspørres, blanke svar avvises, rettede opplysninger brukes. Separat scenario; de fire eksisterende fasitene beholdes. | FR-9–FR-10, FR-14, FR-18; SM-3, SM-5 |
| T-10 | Sideoppdatering i aktiv økt beholder egenredigert tekst og øvrige øktdata uten modellkall og uten å nullstille tiden i seg selv. Etter utløp/utlogging og ny innlogging er data borte; sent svar gjenoppretter dem ikke. | FR-20, FR-22–FR-23, FR-30; SM-1, SM-7 |

T-6 skal ha et blandet analysesvar med gyldige sitater og ett ugyldig/manglende sitat: hele analysen avvises uten gyldige delresultater. Dette testes deterministisk med simulerte svar, separat fra ekte KI-vurdering av sitaters relevans (T-2). T-6 utvides med simulert tid ved 30 minutter, lukket fane og sent modellsvar; ingen reell venting kreves. Bygges «bør»-kravene i FR-22 og FR-30, testes også varselet ved 25 minutter, «Fortsett økten» og serverens avvisning av dupliserte innsendinger.

**Manuell brevsjekkliste (T-2/T-3):** Riktig stillingstittel og arbeidsgiver; bokmål og nøktern profesjonell tone; minst ett relevant, sporbart CV-eksempel i helt utkast; riktig resultatformat; ingen nye kvalifikasjoner; negasjoner og forbehold bevart; samme faktagrunnlag i begge omskrivingsvalg.

**Akseptansekrav for ekte modell:** Ekte modell skal bestå fire av fire testpar i tre påfølgende runder, med begge omskrivingsvalg per par. Hver runde kontrollerer gap-analysen og brevsjekklisten; ordlyden kan variere. Ingen feilaktige kvalifikasjonspåstander aksepteres. Registrer alle forsøk og avvik, ikke bare beståtte, med dato, modell-ID, prompt-/appversjon og testparversjon. Promptretting starter en ny serie; tidligere avvik beholdes. Dette er avgrenset testbevis, ingen garanti for fremtidige svar. Mock erstatter ikke ekte modelltesting.

**Reserveregel:** Er målet ikke nådd etter tre serier, godtas to påfølgende beståtte runder. Avvikene beskrives i testrapporten. Feilaktige kvalifikasjonspåstander aksepteres fortsatt ikke.

**Kostnadsoverslag:** En serie er 4 testpar × 3 runder × (1 analyse + 2 genereringer) = 36 kall. Med ca. 6 000 inndata-tokens og 2 000 utdata-tokens per kall og listepris for `gpt-5-mini` (ca. 0,25 USD per million inndata-tokens og 2 USD per million utdata-tokens) koster en serie rundt 2 kr. Selv med fem ganger så mye utdata, for eksempel på grunn av resonneringstokens, blir det under 10 kr per serie. [ASSUMPTION: pris, tokenbruk og valutakurs, se §10] Tre serier koster da høyst ca. 30 kr. Resten av budsjettet på 100 kr er til utvikling og feilsøking.

**Primære**
- **SM-3: Gap-analysen er riktig.** For hvert testpar finnes alle manglende krav i fasiten, og ingen dokumenterte krav i fasiten merkes som manglende. Hvert dokumentert kompetansekrav vises med sitat. Ansettelsesvilkår vises separat og inngår ikke i kompetanseopptellingen. Validerer FR-10, FR-11, FR-12.
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

## 9. Vedtak

Vedtakene er innarbeidet i kravene. Begrunnelse og hvem som besluttet står i [.memlog.md](.memlog.md); fullstendig ordlyd for vedtak 1–9 står i [addendum.md](addendum.md).

| Nr | Vedtak | Fase | Berørte krav |
|---|---|---|---|
| 1 | Ansettelsesvilkår vises separat fra kompetansekrav og opptelling | v1 | FR-10–FR-14, T-8 |
| 2 | «Delvis dokumentert» som tredje status | utsatt | FR-11–FR-13 |
| 3 | Ordrett-kontroll av sitater; ett ugyldig sitat avviser hele analysen | v1 | FR-11, FR-30 |
| 4 | Akseptansekrav for ekte modell: fire av fire testpar i tre runder | v1 | NFR-8, §8 |
| 5 | Tomtilstand for annonse uten tydelige krav | v1 | FR-10, FR-14, FR-18, T-9 |
| 6 | Ny tekstversjon med uendret inndata | utsatt | FR-21, FR-29 |
| 7 | Utlogging og sletting etter 30 minutter uten aktivitet (varsel ved 25 minutter er «bør», jf. vedtak 10) | v1 | FR-22, FR-23 |
| 8 | Egenredigert tekst beholdes ved sideoppdatering i aktiv økt | v1 | FR-20, FR-22 |
| 9 | Forslag til forbedring av CV-en | trinn 2 | FR-13, FR-19 |
| 10 | Prioritet «må»/«bør» på alle FR-er. FR-21 forenkles: endret CV/annonse krever bekreftet ny analyse, og tilstanden «utdatert» fjernes. 25-minuttersvarsel, serveravvisning av duplikater og ignorering av sene svar blir «bør» | v1 | FR-13, FR-21–FR-23, FR-30, T-4, T-6, T-10 |
| 11 | Startverdier for grenser og tidsavbrudd | v1 | FR-4, FR-7, FR-13, FR-29, FR-30 |
| 12 | Reserveregel og kostnadsoverslag for ekte modell | v1 | NFR-6, NFR-8, §8 |
| 13 | Antakelsene bekreftet: tittel og arbeidsgiver er obligatoriske, leverandørvarsel bekreftes én gang per økt, kontrast etter WCAG 2.1 AA | v1 | FR-9, FR-25, NFR-1 |
| 14 | «Teksten» som fellesbegrep og knappen «Lag tekst» | v1 | §3, UJ-1, FR-15–FR-21 |

Vedtak 1–9 ble godkjent av gruppa 2026-11-07. Vedtak 10–14 ble tatt 2026-11-12 etter faglærers tilbakemelding på PRD-en.

## 10. Antakelser

Startverdiene under er satt for at stories og tester skal ha konkrete tall. Arkitekturen kan justere dem; endringer føres tilbake i PRD-en.

- **FR-4, FR-7:** Filer er høyst 2 MB. CV-tekst og annonse er høyst 10 000 tegn hver.
- **FR-13:** Hvert svar er høyst 1 000 tegn.
- **FR-30:** Tidsavbrudd for modellkall er 30 sekunder. Arkitekturen måler svartiden med testparene og fastsetter endelig grense. Den kan sette en egen, lengre grense for tekstgenerering enn for analyse.
- **§8:** Kostnadsoverslaget bygger på listepris for `gpt-5-mini`, anslått tokenbruk per kall og ca. 11 kr per USD. Pris og modell kontrolleres ved integrasjon.
