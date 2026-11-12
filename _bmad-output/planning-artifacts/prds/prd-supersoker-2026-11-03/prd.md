---
title: "PRD: Supersøker - AI CV & Job Application Assistant"
status: final
created: 2026-11-03
updated: 2026-11-12
---

# PRD: Supersøker - AI CV & Job Application Assistant

## 0. Dokumentets formål

Denne PRD-en beskriver hva første versjon (v1) av Supersøker skal gjøre, og er grunnlaget for UX, arkitektur, epics og stories. Kildegrunnlaget er:

- [Godkjent Product Brief](../../briefs/brief-supersoker-2026-09-16/brief.md) med [begrunnelser](../../briefs/brief-supersoker-2026-09-16/addendum.md).
- Faglærers tilbakemelding på [product brief](../../briefs/brief-supersoker-2026-09-16/tilbakemelding-product-brief.md) og på [PRD-en](tilbakemelding-prd.md), og [sensorveiledningen](../../../../.docs/sensorveiledning.md).
- [UX-prototypen](../../ux/prototype-kjerneflyt.html) og [de fire fiktive testparene](../../../../tests/fixtures/job-applications/README.md).

Teknisk bakgrunn, research og fullstendig ordlyd for tidligere vedtak står i [addendum.md](addendum.md). Hvem som besluttet hva og når, med begrunnelse, står i [.memlog.md](.memlog.md). Kvalitetsgjennomgangen står i [review-rubric.md](review-rubric.md).

Funksjonene i §4 er bygget rundt én brukerreise (UJ-1). Kravene er nummerert FR-1 til FR-30 og NFR-1 til NFR-8, slik at stories og tester kan vise til dem. Begrepene i §3 brukes likt i hele dokumentet. Vedtak står i §9, og startverdier som arkitekturen kan justere, er merket `[ASSUMPTION]` og samlet i §10.

**Status:** `final` når pull requesten med revisjonen 2026-11-12 er godkjent av gruppa og merget. Vedtak 10, 12 og 13 i §9 godkjennes i den PR-en. Godkjente krav og testplan betyr ikke at tester er gjennomført.

**Ambisjonsnivå:** Supersøker er et studentprosjekt som skal demonstreres ved semesterslutt, ikke lanseres offentlig eller kommersielt. Demo og testing bruker fiktive dokumenter, appen kjøres lokalt etter README, og mock-modus er standard.

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

- **Bruker** — Personen som er innlogget. Det finnes én brukerrolle.
- **Brukerkonto** — E-postadresse og passord-hash. Det eneste som lagres permanent.
- **Testbruker** — Ferdig brukerkonto beskrevet i README, for sensor og gruppa.
- **CV-tekst** — Teksten fra brukerens CV, limt inn eller lest ut fra en TXT-fil eller tekstbasert PDF, eventuelt rettet av brukeren.
- **Stillingsannonse (annonse)** — Teksten brukeren limer inn fra annonsen. Kan inneholde stillingstittel, arbeidsgiver, kompetansekrav og ansettelsesvilkår.
- **Krav** — Noe annonsen sier at arbeidsgiveren krever, ønsker eller «ser etter». Alle tre behandles likt som kompetansekrav.
- **Ansettelsesvilkår** — Vilkår som politiattest, som ikke kan dokumenteres i en CV. Vises separat, uten kompetansestatus og utenfor opptellingen av kompetansekrav. Ingen attest lastes opp eller kontrolleres.
- **Gap-analyse** — Sammenligningen av kravene i annonsen med CV-teksten. Gir hvert kompetansekrav status «Dokumentert» eller «Mangler dokumentasjon».
- **Dokumentert** — Kompetansekravet er dokumentert i CV-teksten. Vises alltid med et sitat.
- **Mangler dokumentasjon** — Kompetansekravet står ikke i CV-teksten. Betyr ikke at brukeren mangler kompetansen.
- **Sitat** — Ordrett utdrag fra CV-teksten som viser hvor et krav er dokumentert.
- **Svar** — Det brukeren skriver om et krav som mangler dokumentasjon. Valgfritt, og gjelder bare den aktuelle søknaden.
- **Omskrivingsvalg** — «Helt søknadsutkast» eller «Forslag til formuleringer».
- **Søknadsbrev** — Resultatet av «Helt søknadsutkast»: et sammenhengende brev.
- **Forslag til formuleringer** — Resultatet av omskrivingsvalget med samme navn: en liste med forslag til brukerens eget brev.
- **Teksten** — Fellesbetegnelse på søknadsbrevet eller forslagene. Knappen som lager den, heter «Lag tekst».
- **Økt** — Tiden fra innlogging til utlogging eller automatisk utløp etter 30 minutter uten brukeraktivitet. Sideoppdatering starter ikke en ny økt og nullstiller ikke inaktivitetstiden.
- **Midlertidige data** — CV-tekst, annonse, stillingstittel, arbeidsgiver, svar, gap-analyse og teksten. Finnes bare i økten.
- **Språkmodell** — Den eksterne KI-tjenesten Supersøker bruker i API-modus.
- **Mock-modus** — Standardmodus. Bruker ferdiglagde svar og sender ingen data ut.
- **API-modus** — Sender midlertidige data til språkmodellen. Må slås på i konfigurasjonen.
- **Testpar** — Fiktiv CV og annonse med fasit, i `tests/fixtures/job-applications/`. Det finnes fire.
- **Fasit** — Kravene i et testpar, med forventet status og sitat for hvert krav.

## 4. Funksjoner

**Prioritet:** Alle FR-er er «må»: del av v1 og ferdigkriterium (§7.3). Enkeltpunkter merket *(bør)* bygges etter «må»-kravene hvis tiden tillater det, og er ikke ferdigkriterium. Det som er utsatt, står i §7.2.

### 4.1 Konto og innlogging

**Beskrivelse:** Én brukerrolle. Brukeren oppretter konto og logger inn før hun kan legge inn CV og annonse. Sensor og gruppa bruker en ferdig testbruker. Realiserer UJ-1 (starttilstand).

#### FR-1: Opprette konto

En besøkende kan opprette en brukerkonto med e-postadresse og passord.

**Konsekvenser (testbare):**
- E-postadressen må ha gyldig format og kan bare brukes av én konto.
- Passordet må ha minst 8 tegn. Det finnes ingen andre passordregler.
- Kontoen lagrer ikke navn. Navnet i søknadsbrevet hentes fra CV-en (FR-16).
- Ugyldig inndata gir en melding som sier hva som er feil og hvordan det rettes. E-postadressen beholdes, passordet tømmes.
- Passord lagres bare som sikker hash.

#### FR-2: Logge inn og ut

En bruker kan logge inn med e-post og passord, og logge ut fra alle sider.

**Konsekvenser (testbare):**
- Feil e-post eller feil passord gir samme melding, slik at den ikke avslører om e-postadressen finnes.
- Sider etter innlogging kan ikke åpnes uten innlogging; forsøk sender brukeren til innloggingssiden.
- Utlogging sletter brukerens midlertidige data (FR-23).

#### FR-3: Testbruker

Det finnes en testbruker som er beskrevet i README, slik at sensor kan logge inn uten å opprette konto.

**Konsekvenser (testbare):**
- Testbrukeren finnes etter installasjon og oppstart etter README, uten ekstra steg.
- Passordet står bare i README og testoppsett, ikke i kildekode som brukes i drift.

### 4.2 CV og stillingsannonse

**Beskrivelse:** Brukeren limer inn eller laster opp CV-en og limer inn annonsen. Supersøker viser teksten den leste fra fila, slik at brukeren kan rette den. Supersøker går ikke videre med tom CV eller tom annonse. Realiserer UJ-1 (steg 1–2).

#### FR-4: Legge inn CV

En bruker kan legge inn CV-en som innlimt tekst, TXT-fil eller tekstbasert PDF.

**Konsekvenser (testbare):**
- Andre filformater avvises med ««<fil>» kan ikke leses – Velg en TXT- eller PDF-fil, eller lim inn teksten.»
- Filer over 2 MB og CV-tekst over 10 000 tegn avvises med en melding som oppgir grensen. [ASSUMPTION: startverdier, se §10]
- Korrupte, passordbeskyttede eller uleselige filer gir en melding som navngir fila og tilbyr ny opplasting eller innliming, for eksempel «Vi kunne ikke lese filen <fil>. Prøv en TXT-fil eller tekstbasert PDF, eller lim inn teksten.» Ingen teknisk feildump vises.
- Ved feil beholdes tidligere gyldig CV-tekst.
- Originalfila og eventuelle midlertidige filer slettes etter tekstuttrekk, også når uttrekket feiler.
- Filtype og grenser valideres på serveren. Filendelsen alene avgjør ikke om innholdet kan leses.

**Utenfor omfang:** Skannede PDF-er (OCR) og DOC/DOCX.

#### FR-5: Se og rette innlest CV-tekst

Etter opplasting ser brukeren teksten Supersøker leste fra fila, i et redigerbart felt, og kan rette den før analysen.

**Konsekvenser (testbare):**
- Innlest tekst fra testparenes CV-er inneholder utdanning, erfaring og ferdigheter.
- For PDF minner Supersøker brukeren om å sjekke at kolonner og overskrifter kom i riktig rekkefølge.
- Analysen bruker den rettede teksten.

#### FR-6: PDF uten lesbar tekst

Når en PDF ikke inneholder lesbar tekst, får brukeren beskjed og kan lime inn teksten i stedet.

**Konsekvenser (testbare):**
- Meldingen navngir fila og forklarer at den ser ut til å være skannet som bilde.
- Brukeren kommer ikke videre før CV-feltet har tekst.

#### FR-7: Legge inn stillingsannonse

En bruker kan lime inn stillingsannonsen som tekst.

**Konsekvenser (testbare):**
- Feltet har en hjelpetekst om å ta med stillingstittel og arbeidsgiver.
- Annonsen er høyst 10 000 tegn, som CV-teksten. [ASSUMPTION: startverdi, se §10]

#### FR-8: Kontroll før analyse

Supersøker starter ikke analysen når CV-en eller annonsen er tom.

**Konsekvenser (testbare):**
- Tomt felt gir en melding ved feltet, feltet merkes som ugyldig, og fokus flyttes dit.
- Felt med bare blanktegn regnes som tomme. Valideringen gjelder også på serveren.
- Det brukeren allerede har skrevet, beholdes.

#### FR-9: Etterspørre manglende stillingstittel og arbeidsgiver

Finner Supersøker ikke stillingstittel eller arbeidsgiver i annonsen, ber den brukeren fylle dem inn før gap-analysen. Den gjetter aldri.

**Konsekvenser (testbare):**
- Det som mangler, får et eget felt med forklaring på hvorfor det trengs.
- Feltene er obligatoriske. Gap-analysen starter ikke før de er fylt inn, og blanke svar godtas ikke.
- Funnet tittel og arbeidsgiver vises og kan rettes før de brukes. Tvetydige opplysninger etterspørres.
- Det brukeren fyller inn, brukes i overskriften på gap-analysen og i teksten.

### 4.3 Gap-analyse

**Beskrivelse:** Supersøker trekker ut kravene i annonsen og sjekker hvert krav mot CV-teksten. Krav som mangler dokumentasjon, vises først, fordi det er der brukeren skal handle, og hun kan svare kort på hvert av dem. Resultatet omtaler manglende *dokumentasjon*, ikke manglende kompetanse. Den verste feilen er å merke et krav som dokumentert uten grunnlag i CV-en. Realiserer UJ-1 (steg 3–4).

#### FR-10: Trekke ut krav fra annonsen

Supersøker trekker ut kravene i annonsen. Kompetansekrav, ønsker og «vi ser etter» vises likt; ansettelsesvilkår vises separat.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle kravene i fasiten, og ingen krav som ikke står i annonsen.
- Ansettelsesvilkår vises uten kompetansestatus, uten svarfelt og utenfor opptellingen.
- Uten tydelige krav eller vilkår vises «Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt.» Brukeren kan lage begge resultattyper etter FR-9 og FR-18, uten oppdiktede krav og uten påstand om at alle krav er dokumentert.
- Finnes bare ansettelsesvilkår, vises de og meldingen «Vi fant ingen tydelige kompetansekrav i annonsen.» Brukeren kan rette annonsen eller lage tekst etter samme regler.

#### FR-11: Vise dokumenterte krav med kilde

Hvert dokumentert kompetansekrav vises med status «Dokumentert» og et sitat fra CV-teksten.

**Konsekvenser (testbare):**
- Sitatet finnes ordrett i den rettede CV-teksten. Systemet kontrollerer dette regelbasert før analysen vises.
- Mangler ett dokumenterende sitat, eller finnes det ikke ordrett, avvises hele analysen etter FR-30. Ingen delresultater vises som gyldige eller brukes til generering.
- Et ordrett sitat beviser ikke alene at det dokumenterer kravet. Et ekte, men irrelevant sitat er en feil; relevans vurderes mot fasiten ved testing av ekte modell (T-2).
- V1 har to statuser. Utilstrekkelig eller uklart grunnlag gir ikke «Dokumentert».
- For hvert testpar merkes ingen av fasitens dokumenterte krav som manglende, og ingen krav merkes som dokumentert uten sitat.

#### FR-12: Vise krav som mangler dokumentasjon

Hvert kompetansekrav som ikke er dokumentert, vises med status «Mangler dokumentasjon», før de dokumenterte og med en oppsummering av hvor mange som er dokumentert.

**Konsekvenser (testbare):**
- For hvert testpar finner gap-analysen alle manglende krav i fasiten.
- Teksten sier at kravet ikke står i CV-en, ikke at brukeren mangler det.
- Overskriften inneholder stillingstittel og arbeidsgiver.
- Status vises med tekst, ikke bare med farge.

#### FR-13: Svare på krav som mangler dokumentasjon

Under hvert krav som mangler dokumentasjon, kan brukeren skrive et kort, valgfritt svar som bare gjelder denne søknaden.

**Konsekvenser (testbare):**
- Brukeren kan gå videre uten å svare.
- Hvert svar er høyst 1 000 tegn; lengre svar avvises med en melding som oppgir grensen. [ASSUMPTION: startverdi, se §10]
- Svaret beholdes ved navigasjon mellom stegene, lagres ikke på kontoen og brukes ikke i andre søknader.
- Et svar er ikke bekreftet kompetanse. «Jeg har ikke førerkort» og «jeg holder på å lære» skal beholde sin betydning (FR-18).
- Svar forkastes bare når brukeren bekrefter å endre CV eller annonse (FR-21). Et endret svar krever ny tekst, ikke ny gap-analyse.

#### FR-14: Når alle krav er dokumentert

Når alle kompetansekravene er dokumentert, sier Supersøker det og lar brukeren gå rett til omskrivingsvalget.

**Konsekvenser (testbare):**
- Testpar 4 gir «Alle kompetansekrav i annonsen er dokumentert i CV-en.» og ingen svarfelt.
- Meldingen krever minst ett kompetansekrav. Ansettelsesvilkår omfattes ikke.

### 4.4 Teksten

**Beskrivelse:** Brukeren velger om Supersøker skal skrive et helt søknadsutkast eller forslag til formuleringer. Teksten bygger bare på CV-teksten, annonsen og brukerens svar, og skrives på norsk bokmål i en nøktern, profesjonell tone med konkrete eksempler fra CV-en. Brukeren ser hva teksten bygger på, kan redigere og kopiere den, og får vite at den slettes ved utlogging. Realiserer UJ-1 (steg 5 til avslutning).

#### FR-15: Velge omskrivingsvalg

Før teksten lages, velger brukeren «Helt søknadsutkast» («Et sammenhengende brev du redigerer selv.») eller «Forslag til formuleringer» («Setninger du kan bruke i ditt eget brev.») og trykker «Lag tekst».

**Konsekvenser (testbare):**
- «Helt søknadsutkast» er valgt på forhånd.
- Valget kan gjøres med tastatur, og gruppen av valg har en synlig ledetekst.

#### FR-16: Helt søknadsutkast

Med «Helt søknadsutkast» lager Supersøker et sammenhengende søknadsbrev.

**Konsekvenser (testbare):**
- For hvert testpar nevner brevet riktig stillingstittel og arbeidsgiver og minst ett relevant eksempel fra CV-en.
- Brevet er på norsk bokmål.
- Brevet signeres med navnet fra CV-en, eller «Vennlig hilsen [ditt navn]» hvis CV-en ikke har navn.

#### FR-17: Forslag til formuleringer

Med «Forslag til formuleringer» lager Supersøker en liste med forslag til hva søknaden bør inneholde. Realiserer UJ-1 (høydepunkt).

**Konsekvenser (testbare):**
- Resultatet er en liste, ikke et sammenhengende brev.
- Listen bruker relevant innhold fra svarene, med negasjoner og begrensninger bevart (FR-18), og påstår ikke at et krav er oppfylt bare fordi brukeren har svart.
- Krav brukeren ikke har svart på, nevnes ikke i forslagene.
- Veiledning om utelatte krav vises utenfor teksten, merket «Veiledning – ikke del av søknaden», og følger ikke med «Kopier tekst».
- Samme testpar gir samme faktagrunnlag i begge omskrivingsvalg.

#### FR-18: Ærlighetsregel

Teksten bygger bare på CV-teksten, annonsen og brukerens svar. Realiserer UJ-1 (kanttilfelle).

**Konsekvenser (testbare):**
- Teksten påstår aldri at et krav er oppfylt når det mangler dokumentasjon og brukeren ikke har svart.
- Teksten legger ikke til erfaring, utdanning eller sertifiseringer som ikke står i CV-en eller svarene. Et ansettelsesvilkår i annonsen er ikke bevis på at søkeren oppfyller det, for eksempel politiattest.
- Når brukeren har svart, bruker teksten det hun skrev uten å legge til detaljer.
- Negasjoner, forbehold og nivå bevares: «Jeg har ikke førerkort» blir aldri «Jeg har førerkort», og «jeg holder på å lære Python» blir ikke «Jeg behersker Python».
- Ved usikkert eller motstridende grunnlag påstås ikke kravet oppfylt. Usikkerheten kan forklares i veiledning utenfor teksten.
- Regelen gjelder generert tekst. Brukerens egne redigeringer kontrolleres ikke (FR-19).

#### FR-19: Vise hva teksten bygger på

Ved siden av teksten viser Supersøker listen «Teksten bygger på»: CV-sitatene fra analysen, stillingstittel og arbeidsgiver, og brukerens svar. Listen kobler ikke hver setning til en kilde.

**Konsekvenser (testbare):**
- Hvert svar brukeren har gitt, står i listen som oppgitt grunnlag, uten at det betyr at svaret er bekreftet eller brukt.
- For hvert manglende krav vises om brukeren har svart, eller at kravet ikke nevnes i teksten.
- Listen merkes «Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.»

#### FR-20: Redigere og kopiere teksten

Brukeren kan redigere teksten og kopiere den med «Kopier tekst». Realiserer UJ-1 (avslutning).

**Konsekvenser (testbare):**
- Etter kopiering vises «Kopiert. Lim inn teksten der du skriver søknaden.»
- Tillater ikke nettleseren kopiering, markeres teksten, og brukeren får beskjed om å trykke Ctrl+C.
- En melding sier at teksten tas vare på mens brukeren er innlogget, og slettes ved utlogging.

**Utenfor omfang:** Nedlasting og fileksport (trinn 3).

#### FR-21: Endre svar, omskrivingsvalg, CV eller annonse

Fra teksten kan brukeren gå tilbake og endre svarene, omskrivingsvalget, CV-en eller annonsen.

**Konsekvenser (testbare):**
- CV-tekst, annonse og svar beholdes når brukeren går tilbake. Navigasjon alene starter ingen modellkall og overskriver ingen tekst.
- Etter endret svar eller omskrivingsvalg lages ny tekst først ved «Lag tekst», uten ny gap-analyse. Før egenredigert tekst erstattes, varsles brukeren og kan avbryte.
- Etter gap-analysen kan CV og annonse bare endres via «Endre CV eller annonse». Brukeren varsles om at svar, gap-analyse og tekst, også egenredigert tekst, forkastes, og kan bekrefte eller avbryte. Avbryter hun, endres ingenting. Bekrefter hun, forkastes dataene, og feltene kan redigeres.
- «Analyser kravene» kan bare startes på nytt når CV-en eller annonsen faktisk er endret.

**Avgrensning:** Ny tekstversjon med uendret inndata er utsatt (§7.2). Manuell retry etter feil følger FR-30.

### 4.5 Økt og personvern

**Beskrivelse:** CV-er er personopplysninger. Bare brukerkontoen lagres permanent; alt annet er midlertidige data som slettes ved utlogging. Bare eieren har tilgang, og brukeren får vite det før noe sendes til en ekstern språkmodell. Realiserer UJ-1 (avslutning).

#### FR-22: Ta vare på midlertidige data i økten

Mens brukeren er innlogget, tar Supersøker vare på de midlertidige dataene, slik at brukeren kan se resultatene igjen uten ny analyse.

**Konsekvenser (testbare):**
- Brukeren kan gå mellom stegene uten å miste inndata eller resultater, og uten nye modellkall.
- Ved sideoppdatering i aktiv økt beholdes egenredigert tekst og øvrige midlertidige data, uten modellkall og uten permanent dokumentlagring.
- *(bør)* Etter 25 minutter uten aktivitet vises et tilgjengelig varsel om utlogging om fem minutter, med «Fortsett økten». Et klikk før utløp nullstiller inaktivitetstiden uten modellkall. Varselet forlenger ikke økten i seg selv.

#### FR-23: Slette midlertidige data ved utlogging og øktutløp

Når brukeren logger ut, eller økten utløper, slettes alle midlertidige data.

**Konsekvenser (testbare):**
- Etter 30 minutter uten brukeraktivitet logges brukeren ut og alle midlertidige data slettes, også ved lukket fane eller pågående modellkall. Kontrollen skjer på serveren. Arkitekturen definerer brukeraktivitet; bakgrunnskall forlenger ikke økten.
- Etter utlogging eller utløp og ny innlogging er CV, annonse, svar og resultater borte. Bare brukerkontoen finnes igjen.
- Slettede data gjenopprettes aldri, heller ikke av et modellsvar som kommer senere.

#### FR-24: Bare eieren får tilgang

En bruker får bare tilgang til egne kontoopplysninger og midlertidige data. Kontrollen skjer på serveren.

**Konsekvenser (testbare):**
- Bruker A får ikke tilgang til bruker Bs data i aktiv økt, heller ikke via direkte forespørsler til serveren.

#### FR-25: Varsel før data sendes til ekstern språkmodell

I API-modus får brukeren vite at CV-teksten, annonsen og svarene sendes til en ekstern leverandør, før første modellkall.

**Konsekvenser (testbare):**
- Varselet navngir leverandøren.
- Ingen data sendes før brukeren har bekreftet varselet. Det vises én gang per økt.
- Varselet vises ikke i mock-modus.

### 4.6 Mock-modus og API-modus

**Beskrivelse:** Mock-modus er standard, sender ingen data ut og krever ingen API-nøkkel, slik at sensor kan prøve hele kjerneflyten med fiktive data. Svarene er ferdiglagde eksempler for testparene. API-modus bruker en ekte språkmodell og må slås på aktivt.

#### FR-26: Mock-modus som standard

Supersøker starter i mock-modus når ingenting annet er konfigurert.

**Konsekvenser (testbare):**
- Supersøker kan installeres og kjøres etter README uten API-nøkkel og uten betaling.
- Hver side viser at mock-modus er på, og at ingen tekst sendes til en språkmodell.
- Ingen data sendes ut av maskinen.

#### FR-27: Laste inn eksempel

I mock-modus kan brukeren fylle inn CV og annonse fra testpar 1 med knappen «Last inn eksempel (testpar 1)».

**Konsekvenser (testbare):**
- Etter klikk er begge feltene fylt ut, og en melding sier at brukeren kan trykke «Analyser kravene».
- Hele kjerneflyten kan gjennomføres med testpar 1.
- Alle fire testpar kan velges som navngitte testscenarioer i testoppsettet, som README beskriver. Det kreves ikke egne knapper for dem.
- Hvert scenario har faste analysesvar og begge resultattyper. For par med gap finnes varianter uten svar, med bekreftende svar og med negativt eller begrenset svar. Mock tolker ikke vilkårlig tekst.

#### FR-28: Mock-modus med egen tekst

Legger brukeren inn egen tekst i mock-modus, får hun et fast eksempelsvar som er tydelig merket.

**Konsekvenser (testbare):**
- Meldingen sier at teksten ikke er analysert, og at svaret er et fast eksempel.
- Mock-modus analyserer ikke egen tekst.

#### FR-29: Slå på API-modus

Den som kjører Supersøker, kan slå på API-modus i konfigurasjonen.

**Konsekvenser (testbare):**
- API-modus brukes bare når den er valgt og en API-nøkkel er satt.
- Grensene i FR-4, FR-7 og FR-13 håndheves før modellkallet, med oppgitt grense og forslag til retting.
- Arkitekturen fastsetter grense for samlet forespørsel og modellens utdatalengde før betalte kall aktiveres, og kan justere startverdiene i §10.
- Supersøker sender aldri automatiske gjentatte kall.

#### FR-30: Feil fra språkmodellen

Når språkmodellen ikke svarer, svarer med feil, eller svaret ikke kan brukes, får brukeren en forståelig melding.

**Konsekvenser (testbare):**
- Mens et kall pågår, vises «Analyserer …» eller «Lager tekst …», og knappen er deaktivert, slik at dobbeltklikk ikke starter flere kall.
- *(bør)* Serveren avviser også dupliserte innsendinger for samme handling.
- Hvert kall har et tidsavbrudd på 30 sekunder. [ASSUMPTION: startverdi, se §10] Tester simulerer svar før og etter grensen.
- Ved tidsavbrudd eller midlertidig feil vises for eksempel «Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» «Prøv igjen» starter høyst ett nytt kall.
- Manglende nøkkel, ugyldig konfigurasjon eller nådd kostnadsgrense gir beskjed om hva den som kjører appen må rette, uten å tilby «Prøv igjen». Appen bytter ikke stilltiende til mock.
- Ugyldig svarformat, manglende felt eller et ugyldig sitat avviser hele analysen, for eksempel med «Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt.» Ingen delresultater vises eller brukes (FR-11).
- Inndata og aktuelle svar beholdes ved feil. Data som er forkastet (FR-21) eller slettet (FR-23), gjenopprettes ikke.
- Meldingen viser aldri API-nøkkelen eller andre hemmeligheter, og halvferdige resultater vises ikke.
- *(bør)* Sene svar etter tidsavbrudd eller etter ny analyse ignoreres, slik at de ikke overskriver nyere data eller redigeringer.

## 5. Tverrgående krav

### 5.1 Universell utforming og design

- **NFR-1: Universell utforming.** Hele kjerneflyten kan gjennomføres med tastatur. Alle skjemafelt har synlige etiketter, og fokus er alltid synlig. Status vises med tekst, ikke bare farge. Feil- og statusmeldinger leses opp av skjermleser. Ved stegbytte flyttes fokus til overskriften, ved feil til første ugyldige felt. Kontrast oppfyller WCAG 2.1 nivå AA.
- **NFR-2: Skjermstørrelser.** Kjerneflyten fungerer på mobil og datamaskin. På smale skjermer stables kolonnene, og steglisten viser bare aktivt steg. UX-arbeidet fastsetter skjermbreddene som testes.
- **NFR-3: Meldinger.** Alle meldinger er på norsk bokmål og sier hva som er galt og hva brukeren kan gjøre. Tomtilstander forklarer hva som mangler.

### 5.2 Sikkerhet og personvern

- **NFR-4: Hemmeligheter.** API-nøkkelen finnes bare på serveren, i lokal miljøkonfigurasjon. `.env` er utenfor Git, og `.env.example` har tomme plassholdere og valg av mock- eller API-modus.
- **NFR-5: Bare fiktive dokumenter.** Repoet, testdataene og demoene bruker bare fiktive CV-er og annonser. CV-tekst og svar skrives aldri til logger.

### 5.3 Kostnad

- **NFR-6: Budsjett.** Betalte modellkall i utviklingstestingen koster til sammen høyst 100 kr (overslag i §8). Arkitekturen beskriver hvordan grensen håndheves, før betalte kall slås på.

### 5.4 Kjørbarhet og testbarhet

- **NFR-7: Kjørbar etter README.** En person som ikke kjenner prosjektet, kan installere og starte Supersøker på en ren maskin i mock-modus etter README, og prøve hele kjerneflyten med testbrukeren og testparene. *Akseptansetest:* En annen person installerer på en annen PC uten utviklerens oppsett, API-nøkkel eller udokumentert hjelp. Dato, testansvarlig, operativsystem, versjoner, commit, kommandoer, tidsbruk, avvik og resultat registreres i en testrapport. Ved avvik rettes README, og berørte steg gjentas.
- **NFR-8: Testbar uten språkmodell.** Kjerneflyten kan testes automatisk i mock-modus. Testparene kjøres også mot ekte modell etter akseptansekravet og reserveregelen i §8, og alle forsøk og avvik beholdes.

## 6. Ikke-mål

- Supersøker er ikke et rekrutteringssystem og vurderer, scorer eller rangerer ikke kandidater.
- Ingen match- eller ATS-poengsum, og ingen løfte om intervju eller ATS-godkjenning (se SM-C1).
- Supersøker skriver ikke inn søkerens erfaring på egen hånd, bare fra CV-teksten, annonsen og svarene.
- Ingen offentlig eller kommersiell lansering, og ingen felles server.
- Ingen chat der språkmodellen stiller oppfølgingsspørsmål i flere runder. Gruppa forkastet det fordi det er for komplekst, uforutsigbart og vanskelig å teste.
- Ingen permanent lagring av CV-er, annonser, svar eller resultater i v1. Gruppa avviste et KI-forslag om det 2026-10-30.

## 7. MVP-omfang

### 7.1 Innenfor v1

- Én brukerrolle med konto, innlogging og testbruker (4.1).
- CV som innlimt tekst, TXT eller tekstbasert PDF, med visning og retting av innlest tekst, og annonse som innlimt tekst (4.2).
- Gap-analyse med sitat for dokumenterte krav, separate ansettelsesvilkår, tomtilstand uten tydelige krav og valgfrie svar (4.3).
- Søknadsbrev eller forslag til formuleringer, med ærlighetsregel, «Teksten bygger på», redigering og «Kopier tekst» (4.4).
- Midlertidige data i økten, også ved sideoppdatering, sletting ved utlogging og etter 30 minutter uten aktivitet, og eierskapskontroll (4.5).
- Mock-modus som standard, eksempel fra testpar 1, og API-modus som må slås på (4.6).

### 7.2 Utenfor v1

**Trinn 2** (målet hvis v1 er testet og stabil i tide):
- Egne forslag til forbedring av CV-en.
- ATS-veiledning, uten garanti.

**Andre utsatte utvidelser uten fast trinn:**
- Tredje kompetansestatus «Delvis dokumentert».
- Ny tekstversjon med uendret inndata. Forsøksgrense, telleregler og kostnadskontroll må bestemmes først.

**Trinn 3:**
- Strukturert CV-mal og DOC-støtte.
- Tidligere søknader.
- Lagring av svar på profilen (variant B) og innskriving av svar i en ny CV-fil (variant C).
- Valg av språk og tone.
- Fileksport og nedlasting. «Kopier tekst» holder i v1.

**Utenfor prosjektet:** Skannede PDF-er (OCR).

### 7.3 Ferdigkriterier før trinn 2

Listen beskriver hva som må være oppfylt, ikke utførte tester.

- Alle FR-er er implementert; *(bør)*-punkter er ikke påkrevd. SM-1 til SM-8 er kontrollert med registrerte resultater. «Sekundære» i §8 betyr ikke valgfrie.
- Alle fire testpar fungerer i mock med begge omskrivingsvalg og alle tre CV-innleggingsmåter. Automatiske tester kjøres etter README uten feil. Mock dokumenterer ikke modellkvalitet.
- Ekte modell er vurdert mot fasit, ærlighetsregelen og brevsjekklisten etter §8, innenfor 100 kr.
- Feiltilfeller, kildekontroll, endrede inndata, øktdata og A/B-tilgang er testet. Ingen kjente feil som gir falske kvalifikasjonspåstander, uvedkommende tilgang eller stopper kjerneflyten står åpne.
- Kjerneflyten er kontrollert med tastatur og på mobil- og PC-størrelse, med meldinger, tomtilstander og kopiering kontrollert mot NFR-1 til NFR-3.
- Installasjonstesten på annen PC er dokumentert (NFR-7). README beskriver oppstart, testbruker, testscenarioer og testkommandoer.
- Startverdiene i §10 er bekreftet eller justert. Mindre restfeil har dokumentert konsekvens. Krav, stories, tester og rettinger av KI-generert kode kan spores i repoet.

## 8. Suksessmål

Suksessmålene er briefens åtte suksesskriterier med samme nummer (SM-N er kriterium N), gruppert etter viktighet. De vurderes med de fire testparene. Mock-tester viser at flyten virker; kvaliteten på modellens svar vurderes separat mot ekte modell, og brevkvaliteten sjekkes manuelt.

### Testopplegg og sporbarhet

Testene er planlagt kvalitetssikring, ikke utførte tester.

| Test-ID | Kontroll og forventning | Krav og briefkriterium |
|---|---|---|
| T-1 | Fire testpar × innliming/TXT/tekstbasert PDF × begge omskrivingsvalg i mock: riktig scenario, navigasjon, redigering og kopiering. PDF-varianter må lages; testmappa har i dag TXT og JSON. | FR-4–FR-8, FR-14–FR-17, FR-20, FR-26–FR-28; SM-1, SM-2, SM-6, SM-8 |
| T-2 | Ekte modell: krav og status mot fasit, ingen oppdiktede krav, ordrette og relevante sitater, ansettelsesvilkår utenfor opptellingen. Fasitens `dekket`/`mangler` tilsvarer «Dokumentert»/«Mangler dokumentasjon». Semantisk like krav godtas. | FR-10–FR-12; SM-3 |
| T-3 | Begge resultattyper uten svar, med bekreftelse, med «jeg har ikke førerkort» og med «jeg holder på å lære», i mock og mot ekte modell. Ingen nye eller styrkede kvalifikasjoner; veiledning kopieres ikke. | FR-13, FR-17–FR-20; SM-4–SM-6 |
| T-4 | Endret svar eller omskrivingsvalg gir ny tekst bare ved «Lag tekst», med varsel før egenredigert tekst erstattes. «Endre CV eller annonse»: avbryt endrer ingenting, bekreft forkaster svar, analyse og tekst, også om ny analyse feiler. Ny analyse uten endring er ikke mulig. Navigasjon starter ingen kall. | FR-13, FR-21–FR-22; SM-1, SM-4 |
| T-5 | Tom/blank tekst, feil format, korrupt eller passordbeskyttet PDF, PDF uten tekst, og verdier ved og over grensene i FR-4, FR-7 og FR-13. Ingen analyse med tom CV, og gyldig tekst beholdes ved filfeil. | FR-4–FR-9, FR-13, FR-29; SM-2, SM-7 |
| T-6 | Konto og innlogging, A/B-tilgang via direkte forespørsler, utlogging, leverandørvarsel, manglende nøkkel, ugyldig svar eller sitat, API-feil, tidsavbrudd og dobbeltklikk. Ingen datalekkasje eller dupliserte kall. | FR-1–FR-3, FR-11, FR-23–FR-25, FR-29–FR-30, NFR-4–NFR-6; SM-7 |
| T-7 | Manuell tilgjengelighetskontroll og installasjonstest på annen PC, med registrert miljø og resultat. | NFR-1–NFR-3, NFR-7; SM-8 |
| T-8 | Annonse med kompetansekrav og politiattest, og annonse med bare ansettelsesvilkår. Vilkår vises separat uten status, svarfelt eller opptelling, og teksten påstår ikke at vilkåret er oppfylt. Krever nye supplerende fasiter. | FR-10–FR-14; SM-3 |
| T-9 | Annonse uten tydelige krav gir tomtilstand med retting eller begge resultattyper, uten oppdiktede krav. Manglende eller tvetydig tittel og arbeidsgiver etterspørres, og blanke svar avvises. Eget scenario; de fire fasitene endres ikke. | FR-9–FR-10, FR-14, FR-18; SM-3, SM-5 |
| T-10 | Sideoppdatering i aktiv økt beholder data uten modellkall og uten å nullstille tiden. Etter utløp eller utlogging og ny innlogging er data borte, og et sent svar gjenoppretter dem ikke. | FR-20, FR-22–FR-23, FR-30; SM-1, SM-7 |

T-6 har et simulert analysesvar med gyldige sitater og ett ugyldig: hele analysen skal avvises. Dette testes deterministisk, separat fra vurderingen av sitaters relevans (T-2). Øktreglene testes med simulert tid ved 30 minutter, lukket fane og sent modellsvar. Bygges *(bør)*-punktene, testes også varselet ved 25 minutter, «Fortsett økten» og avvisning av duplikater.

**Manuell brevsjekkliste (T-2/T-3):** Riktig stillingstittel og arbeidsgiver; bokmål og nøktern tone; minst ett relevant CV-eksempel i helt utkast; riktig resultatformat; ingen nye kvalifikasjoner; negasjoner og forbehold bevart; samme faktagrunnlag i begge omskrivingsvalg.

**Akseptansekrav for ekte modell:** Fire av fire testpar skal bestås i tre påfølgende runder, med begge omskrivingsvalg per par. Hver runde kontrollerer gap-analysen og brevsjekklisten; ordlyden kan variere. Ingen feilaktige kvalifikasjonspåstander godtas. Alle forsøk og avvik registreres med dato, modell-ID, prompt- og appversjon og testparversjon. Endres prompten, starter en ny serie. Resultatet er avgrenset testbevis, ingen garanti for fremtidige svar, og mock erstatter ikke ekte modelltesting.

**Reserveregel:** Er målet ikke nådd etter tre serier, godtas to påfølgende beståtte runder. Avvikene beskrives i testrapporten. Feilaktige kvalifikasjonspåstander godtas fortsatt ikke.

**Kostnadsoverslag:** En serie er 4 testpar × 3 runder × (1 analyse + 2 genereringer) = 36 kall. Med ca. 6 000 inndata- og 2 000 utdata-tokens per kall og listepris for `gpt-5-mini` (ca. 0,25 og 2 USD per million tokens) koster en serie rundt 2 kr, og under 10 kr selv med fem ganger så mye utdata. [ASSUMPTION: pris, tokenbruk og valutakurs, se §10] Tre serier koster høyst ca. 30 kr; resten av de 100 kronene er til utvikling og feilsøking.

**Primære**
- **SM-3: Gap-analysen er riktig.** For hvert testpar finnes alle manglende krav i fasiten, og ingen dokumenterte krav merkes som manglende. Hvert dokumentert krav vises med sitat, og ansettelsesvilkår holdes utenfor opptellingen. Validerer FR-10–FR-12.
- **SM-5: Teksten er ærlig og treffende.** «Helt søknadsutkast» nevner riktig stillingstittel og arbeidsgiver og minst ett relevant CV-eksempel. Manglende opplysninger etterspørres, og teksten inneholder ingen kvalifikasjoner uten grunnlag. Validerer FR-9, FR-16, FR-18.
- **SM-1: Kjerneflyten virker.** Testbrukeren kan logge inn, legge inn CV ved innliming, TXT og tekstbasert PDF, legge inn annonse og få begge omskrivingsvalg med hvert testpar, uten stopp eller krasj. Validerer 4.1–4.4.

**Sekundære**
- **SM-2: CV inn.** Innlest tekst vises, inneholder utdanning, erfaring og ferdigheter, og kan rettes. Tom inndata, feil format og filer uten lesbar tekst gir en forståelig melding med forslag til tiltak. Validerer FR-4–FR-8.
- **SM-4: Svar brukes riktig.** Teksten bruker det brukeren skrev, uten å legge til detaljer. Validerer FR-13, FR-18.
- **SM-6: Omskrivingsvalg.** «Forslag til formuleringer» gir en liste, «Helt søknadsutkast» et sammenhengende brev, med samme faktagrunnlag. Validerer FR-15–FR-17.
- **SM-7: Sikkerhet og feil.** Bruker A får ikke tilgang til bruker Bs data, heller ikke via direkte forespørsler. Manglende nøkkel, API-feil og ugyldige modellsvar gir forståelige meldinger, uten at hemmeligheter vises eller inndata går tapt. Validerer FR-24, FR-30, NFR-4.
- **SM-8: Kjørbarhet.** Sensor kan følge README, starte i tydelig merket mock-modus og prøve hele kjerneflyten med testbrukeren og fiktive data. Validerer FR-3, FR-26, FR-27, NFR-7.

**Motmål (skal ikke optimaliseres)**
- **SM-C1: Høyere match- eller ATS-score.** Å jage en score fører til nøkkelord og påstander CV-en ikke støtter. Motvekt til SM-5.
- **SM-C2: Færre spørsmål til brukeren.** Supersøker skal spørre heller enn å gjette. Motvekt til SM-1 og SM-5.

## 9. Vedtak

Vedtakene er innarbeidet i kravene. Begrunnelse og hvem som besluttet står i [.memlog.md](.memlog.md); full ordlyd for vedtak 1–9 står i [addendum.md](addendum.md).

| Nr | Vedtak | Fase | Berørte krav |
|---|---|---|---|
| 1 | Ansettelsesvilkår vises separat fra kompetansekrav og opptelling | v1 | FR-10–FR-14, T-8 |
| 2 | «Delvis dokumentert» som tredje status | utsatt | FR-11–FR-13 |
| 3 | Ordrett-kontroll av sitater; ett ugyldig sitat avviser hele analysen | v1 | FR-11, FR-30 |
| 4 | Akseptansekrav for ekte modell: fire av fire testpar i tre runder | v1 | NFR-8, §8 |
| 5 | Tomtilstand for annonse uten tydelige krav | v1 | FR-10, FR-14, FR-18, T-9 |
| 6 | Ny tekstversjon med uendret inndata | utsatt | FR-21, FR-29 |
| 7 | Utlogging og sletting etter 30 minutter uten aktivitet (varselet ved 25 minutter er *bør*, jf. vedtak 10) | v1 | FR-22, FR-23 |
| 8 | Egenredigert tekst beholdes ved sideoppdatering i aktiv økt | v1 | FR-20, FR-22 |
| 9 | Forslag til forbedring av CV-en | trinn 2 | FR-13, FR-19 |
| 10 | Alle FR-er er «må», enkeltpunkter kan være *bør*. FR-21 forenkles: endret CV eller annonse krever bekreftet ny analyse, og tilstanden «utdatert» fjernes. 25-minuttersvarsel, serveravvisning av duplikater og ignorering av sene svar er *bør* | v1 | FR-13, FR-21–FR-23, FR-30, T-4, T-6, T-10 |
| 11 | Startverdier for grenser og tidsavbrudd; arkitekturen fastsetter endelig tidsavbrudd etter måling | v1 | FR-4, FR-7, FR-13, FR-29, FR-30 |
| 12 | Reserveregel og kostnadsoverslag for ekte modell | v1 | NFR-6, NFR-8, §8 |
| 13 | Tittel og arbeidsgiver er obligatoriske, leverandørvarselet bekreftes én gang per økt, og kontrast følger WCAG 2.1 AA | v1 | FR-9, FR-25, NFR-1 |
| 14 | «Teksten» som fellesbegrep og knappen «Lag tekst» | v1 | §3, UJ-1, FR-15–FR-21 |

Vedtak 1–9 ble godkjent av gruppa 2026-11-07. Vedtak 10–14 ble tatt 2026-11-12 etter faglærers tilbakemelding. Vedtak 10, 12 og 13 endrer eller avgjør spørsmål gruppa selv skulle bestemme, og godkjennes av gruppa i pull requesten.

## 10. Antakelser

Startverdiene gir stories og tester konkrete tall. Arkitekturen kan justere dem, og endringer føres tilbake i PRD-en.

- **FR-4, FR-7:** Filer er høyst 2 MB. CV-tekst og annonse er høyst 10 000 tegn hver.
- **FR-13:** Hvert svar er høyst 1 000 tegn.
- **FR-30:** Tidsavbruddet er 30 sekunder. Arkitekturen måler svartiden med testparene og fastsetter endelig grense, eventuelt med en lengre grense for tekstgenerering enn for analyse.
- **§8:** Kostnadsoverslaget bygger på listepris for `gpt-5-mini`, anslått tokenbruk og ca. 11 kr per USD. Pris og modell kontrolleres ved integrasjon.
