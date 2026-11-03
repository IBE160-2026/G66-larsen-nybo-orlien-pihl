---
title: "PRD: Supersøker - AI CV & Job Application Assistant"
status: draft
created: 2026-11-03
updated: 2026-11-03
---

# PRD: Supersøker - AI CV & Job Application Assistant

## 0. Dokumentets formål

Denne PRD-en beskriver hva første versjon (v1) av Supersøker skal gjøre. Den er skrevet for gruppa G66 i IBE160 og for de neste BMAD-stegene: UX, arkitektur, epics og stories. PRD-en bygger på den godkjente produktbriefen (`../../briefs/brief-supersoker-2026-09-16/brief.md` og `addendum.md`), faglærers tilbakemelding (`tilbakemelding-product-brief.md`) og den klikkbare prototypen (`../../ux/prototype-kjerneflyt.html`). Den gjentar ikke alt som står der.

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
- Det brukeren allerede har skrevet, beholdes.

#### FR-9: Etterspørre manglende stillingstittel og arbeidsgiver

Når Supersøker ikke finner stillingstittel eller arbeidsgiver i annonsen, ber den brukeren fylle dem inn før gap-analysen starter. Supersøker gjetter aldri på dem.

**Konsekvenser (testbare):**
- En annonse uten arbeidsgiver gir et felt for arbeidsgiver, med forklaring på hvorfor det trengs. Det samme gjelder stillingstittel. [ASSUMPTION: gjelder både stillingstittel og arbeidsgiver, slik suksesskriterium 5 i briefen sier]
- Gap-analysen starter ikke før feltene er fylt inn. [ASSUMPTION: feltene er obligatoriske; brukeren kan ikke hoppe over]
- Det brukeren fyller inn, brukes i overskriften på gap-analysen og i søknadsbrevet.

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
- Svaret beholdes når brukeren går tilbake til CV og annonse og frem igjen.
- Svaret lagres ikke på kontoen og brukes ikke i andre søknader.

#### FR-14: Når alle krav er dokumentert

Når alle kravene i annonsen er dokumentert, sier Supersøker det og lar brukeren gå rett til søknadsbrevet.

**Konsekvenser (testbare):**
- Testpar 4 gir meldingen «Alle krav i annonsen er dokumentert i CV-en.» og ingen svarfelt.

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
- Listen tar med krav som manglet dokumentasjon, men som brukeren har svart på.
- Krav brukeren ikke har svart på, nevnes ikke i forslagene. Supersøker sier at forslagene ikke nevner dem.
- Samme testpar gir samme faktagrunnlag i begge omskrivingsvalgene.

#### FR-18: Ærlighetsregel

Søknadsbrevet og forslagene bygger bare på CV-teksten, annonsen og brukerens svar. Realiserer UJ-1 (kanttilfelle).

**Konsekvenser (testbare):**
- Teksten påstår aldri at et krav er oppfylt når kravet mangler dokumentasjon og brukeren ikke har svart.
- Teksten legger ikke til erfaring, utdanning eller sertifiseringer som ikke står i CV-en eller i svarene.
- Når brukeren har svart, bruker teksten det hun skrev og legger ikke til detaljer som ikke står i svaret.

#### FR-19: Vise hva teksten bygger på

Ved siden av teksten viser Supersøker en liste, «Brevet bygger på», med CV-linjene, stillingstittel og arbeidsgiver fra annonsen, og brukerens svar.

**Konsekvenser (testbare):**
- Hvert svar brukeren har gitt, står i listen.
- Oppsummeringen av gap-analysen viser for hvert manglende krav om brukeren har svart, eller at kravet ikke nevnes i teksten.

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

**Notater:** Om brukeren kan lage en ny versjon av teksten med samme inndata, er et åpent spørsmål for gruppa (se §9). Det påvirker kostnaden i API-modus.

### 4.5 Økt og personvern

**Beskrivelse:** CV-er er personopplysninger. Supersøker lagrer derfor bare brukerkontoen permanent. CV-tekst, annonse, svar, gap-analyse og søknadsbrev er midlertidige data. De tas vare på mens brukeren er innlogget, og slettes når hun logger ut. Bare eieren har tilgang til dataene. Før noe sendes til en ekstern språkmodell, får brukeren vite det. Realiserer UJ-1 (avslutning).

#### FR-22: Ta vare på midlertidige data i økten

Mens brukeren er innlogget, tar Supersøker vare på CV-teksten, annonsen, stillingstittel og arbeidsgiver, svarene, gap-analysen og teksten. Brukeren kan se resultatene igjen uten ny analyse.

**Konsekvenser (testbare):**
- Brukeren kan gå mellom stegene uten å miste inndata eller resultater.
- Å gå tilbake til et resultat sender ingen nye kall til språkmodellen.

#### FR-23: Slette midlertidige data ved utlogging

Når brukeren logger ut, slettes alle midlertidige data.

**Konsekvenser (testbare):**
- Etter utlogging og ny innlogging er CV, annonse, svar og resultater borte.
- Brukerkontoen er det eneste som finnes igjen.

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
- Supersøker sender aldri automatiske gjentatte kall til språkmodellen.

#### FR-30: Feil fra språkmodellen

Når språkmodellen ikke svarer, svarer med feil, eller svaret ikke kan brukes, får brukeren en forståelig melding.

**Konsekvenser (testbare):**
- Manglende API-nøkkel, feil fra API-et og ugyldige svar gir hver sin forståelige melding, med knappen «Prøv igjen».
- CV-teksten, annonsen og svarene beholdes, slik at brukeren ikke må skrive dem på nytt.
- Meldingen viser aldri API-nøkkelen eller andre hemmeligheter.
- Halvferdige resultater vises ikke.

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

## 8. Suksessmål

Suksessmålene er briefens åtte suksesskriterier, med samme nummer (SM-N er kriterium N i briefen). De vurderes med de fire testparene. Mock-tester viser at flyten virker. Kvaliteten på språkmodellens svar vurderes separat mot ekte modell, og brevkvaliteten sjekkes manuelt med en sjekkliste.

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

Alle spørsmålene avgjøres av gruppa. Svarene føres inn i PRD-en og `.memlog.md`.

1. **Vilkår som ikke kan stå i en CV.** Skal politiattest og lignende vilkår få en egen kategori i gap-analysen, eller behandles som vanlige krav? Må avgjøres før testpar for slike vilkår lages. (4.3)
2. **Gråsoner.** Skal krav som «Tysk – grunnleggende» kunne få en tredje status, «delvis dokumentert», eller holder to statuser? (4.3)
3. **Regelbasert kontroll.** Skal v1 ha en regelbasert kontroll av språkmodellens svar, for eksempel at sitatet finnes ordrett i CV-teksten? Faglærer foreslo at gap-analysen delvis kan gjøres regelbasert. (4.3)
4. **Bestått mot ekte modell.** Språkmodellen svarer ulikt fra gang til gang. Hva regnes som bestått når testparene kjøres mot ekte modell? (§8)
5. **Annonse uten krav.** Hva ser brukeren når annonsen ikke har gjenkjennelige krav, for eksempel bare en beskrivelse av bedriften? (4.3)
6. **Ny versjon av teksten.** Kan brukeren lage en ny versjon med samme inndata, eller bare etter å ha endret svar eller omskrivingsvalg? Påvirker kostnaden i API-modus. (4.4)
7. **Inaktivitet.** Hva skjer når brukeren er inaktiv lenge eller lukker fanen uten å logge ut? Utløper økten, slettes dataene, og etter hvor lang tid? (4.5)
8. **Sideoppdatering.** Beholdes brukerens redigerte tekst når siden lastes på nytt, eller bare teksten Supersøker skrev? (4.5)
9. **Forslag til CV-en.** Skal et svar på et manglende krav, for eksempel førerkort, også gi et forslag om å legge det inn i CV-en? Kan avgjøres etter at v1-flyten virker. (4.4)

## 10. Antakelser

- **4.2, FR-9:** Etterspørselen gjelder både stillingstittel og arbeidsgiver, slik suksesskriterium 5 i briefen sier.
- **4.2, FR-9:** Feltene for stillingstittel og arbeidsgiver er obligatoriske. Brukeren kan ikke hoppe over dem.
- **4.5, FR-25:** Brukeren må bekrefte varselet før data sendes til språkmodellen, og varselet vises én gang per økt.
- **5.1, NFR-1:** WCAG 2.1 nivå AA er målet for kontrast.
