---
stepsCompleted: [1, 2]
status: draft
created: 2026-11-24
owner: Elisabeth (#26)
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md
  - "origin/miranda-arkitekturgrunnlag: _bmad-output/planning-artifacts/architecture/miranda-supersoker-v1/ARCHITECTURE-SPINE.md (utkast, ikke merget)"
  - "origin/miranda-arkitekturgrunnlag: _bmad-output/planning-artifacts/architecture/miranda-supersoker-v1/avklaringer-og-testkobling.md (utkast, ikke merget)"
  - "PR #17: gruppevedtak 2026-11-23 (alternativ A) og 2026-11-24 (økt, KI-budsjett, bør-punkter)"
  - _bmad-output/planning-artifacts/ux/samlet-forslag/README.md
  - _bmad-output/planning-artifacts/ux/samlet-forslag/forslag.html
  - tests/fixtures/job-applications/
excludedDocuments:
  - "architecture/technology.md: beskriver et annet prosjekt (eksempel fra faglærer), og anbefaler stille mock-fallback, som FR-30 forbyr"
  - "Enkeltkonseptene i ux/elisabeth, ux/helle, ux/miranda og ux/prototype-kjerneflyt.html: erstattet av samlet forslag"
  - "Product brief: innarbeidet i PRD-en"
  - "PR #14 (testgrunnlag): ikke merget, oppdateres i #29. Stories kobles til T-numrene i PRD-en"
---

# Supersøker – epics og stories

## Oversikt

Dokumentet bryter kravene i PRD-en, gruppevedtakene om arkitektur og det samlede designforslaget ned i epics og stories, slik at hver story kan spores til FR-, NFR- og T-numre og til et GitHub-issue.

**Status: utkast.** Den endelige arkitekturen (#23, Miranda) og UX-spesifikasjonen (#24, Helle) er ikke ferdige. Krav som bare bygger på Mirandas utkast, er merket *(utkast AD-n)*. Det som venter på #22, #23 eller #24, er merket **sjekkes mot #NN**. Dokumentet oppdateres når de er merget.

Kravene under er en kortversjon. PRD-en er kilden, og ved uenighet gjelder PRD-en.

## Kravoversikt

### Funksjonelle krav

**Konto og innlogging (PRD 4.1)**

- **FR-1 Opprette konto:** Konto med e-post og passord. E-posten må ha gyldig format og er unik. Passordet har minst 8 tegn og ingen andre regler. Navn lagres ikke. Passordet lagres bare som sikker hash. Ugyldig inndata gir melding om hva som er feil; e-posten beholdes, passordet tømmes.
- **FR-2 Logge inn og ut:** Feil e-post eller passord gir samme melding. Sider etter innlogging sender uinnloggede til innloggingssiden. Utlogging fra alle sider sletter midlertidige data (FR-23).
- **FR-3 Testbruker:** Finnes etter installasjon og oppstart etter README, uten ekstra steg. Passordet står bare i README og testoppsett.

**CV og stillingsannonse (PRD 4.2)**

- **FR-4 Legge inn CV:** Innlimt tekst, TXT eller tekstbasert PDF. Andre formater avvises med fast melding. Filer over 2 MB og tekst over 10 000 tegn avvises med grensen oppgitt. Korrupte, passordbeskyttede eller uleselige filer gir melding som navngir fila. Tidligere gyldig CV beholdes ved feil. Originalfil og midlertidige filer slettes, også ved feil. Filtype og grenser valideres på serveren, og filendelsen alene avgjør ikke.
- **FR-5 Se og rette innlest CV-tekst:** Innlest tekst vises i redigerbart felt. For PDF minnes brukeren på å sjekke kolonner og overskrifter. Analysen bruker den rettede teksten.
- **FR-6 PDF uten lesbar tekst:** Meldingen navngir fila og sier at den ser skannet ut. Brukeren kommer ikke videre før CV-feltet har tekst.
- **FR-7 Legge inn annonse:** Innlimt tekst, med hjelpetekst om stillingstittel og arbeidsgiver. Høyst 10 000 tegn.
- **FR-8 Kontroll før analyse:** Tom eller blank CV eller annonse stopper analysen med melding ved feltet, ugyldig-markering og fokus dit. Valideres også på serveren. Det som er skrevet, beholdes.
- **FR-9 Stillingstittel og arbeidsgiver:** Mangler de, eller er de tvetydige, etterspørres de i egne obligatoriske felt med forklaring. Funnede verdier vises og kan rettes. Blanke svar godtas ikke. Verdiene brukes i overskriften på gap-analysen og i teksten. Appen gjetter aldri.

**Gap-analyse (PRD 4.3)**

- **FR-10 Trekke ut krav:** Krav, ønsker og «vi ser etter» behandles likt. Ansettelsesvilkår vises separat uten status, svarfelt eller opptelling. Tomtilstander for «ingen tydelige krav» og «bare ansettelsesvilkår», der brukeren kan rette annonsen eller lage tekst.
- **FR-11 Dokumenterte krav med kilde:** Status «Dokumentert» med sitat som finnes ordrett i den rettede CV-teksten, kontrollert regelbasert. Ett manglende eller ikke-ordrett sitat avviser hele analysen (FR-30). To statuser i v1.
- **FR-12 Krav som mangler dokumentasjon:** Vises først, med oppsummering av hvor mange som er dokumentert. Teksten sier at kravet ikke står i CV-en, ikke at brukeren mangler det. Overskriften har tittel og arbeidsgiver. Status vises med tekst, ikke bare farge.
- **FR-13 Svare på manglende krav:** Valgfritt svar på høyst 1 000 tegn per krav. Beholdes ved navigasjon, lagres ikke på kontoen. Et svar er ikke bekreftet kompetanse. Endret svar krever ny tekst, ikke ny analyse.
- **FR-14 Alle krav dokumentert:** Melding «Alle kompetansekrav i annonsen er dokumentert i CV-en.» og ingen svarfelt (testpar 4). Krever minst ett kompetansekrav.

**Teksten (PRD 4.4)**

- **FR-15 Omskrivingsvalg:** «Helt søknadsutkast» (forhåndsvalgt) eller «Forslag til formuleringer», med forklaring, og «Lag tekst». Tastaturbetjent med synlig ledetekst for gruppen.
- **FR-16 Helt søknadsutkast:** Sammenhengende brev på bokmål med riktig tittel, arbeidsgiver og minst ett relevant CV-eksempel. Signeres med navnet fra CV-en eller «Vennlig hilsen [ditt navn]».
- **FR-17 Forslag til formuleringer:** En liste, ikke et brev. Bruker svarene med negasjoner bevart. Krav uten svar nevnes ikke. Veiledning om utelatte krav står utenfor teksten, merket «Veiledning – ikke del av søknaden», og kopieres ikke. Samme faktagrunnlag som det andre valget.
- **FR-18 Ærlighetsregel:** Teksten bygger bare på CV, annonse og svar. Ingen udokumenterte krav påstås oppfylt, ingen nye kvalifikasjoner, ansettelsesvilkår er ikke bevis. Negasjoner, forbehold og nivå bevares. Gjelder generert tekst, ikke brukerens redigeringer.
- **FR-19 «Teksten bygger på»:** Liste med CV-sitater, tittel, arbeidsgiver og brukerens svar (som oppgitt grunnlag), og for hvert manglende krav om det er besvart eller utelatt. Merket «Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.»
- **FR-20 Redigere og kopiere:** Redigerbar tekst og «Kopier tekst» med bekreftelse. Fallback: teksten markeres og brukeren bes trykke Ctrl+C. Melding om at teksten slettes ved utlogging.
- **FR-21 Endre svar, valg, CV eller annonse:** Navigasjon starter ingen kall. Nytt svar eller valg gir ny tekst først ved «Lag tekst», med varsel før egenredigert tekst erstattes. «Endre CV eller annonse» varsler om at svar, analyse og tekst forkastes; avbryt endrer ingenting. Ny analyse krever faktisk endret inndata.

**Økt og personvern (PRD 4.5)**

- **FR-22 Midlertidige data i økten:** Brukeren kan gå mellom stegene og oppdatere siden uten å miste data eller starte modellkall, også egenredigert tekst. *(bør, utsatt 24.11)* 25-minuttersvarsel.
- **FR-23 Sletting ved utlogging og utløp:** Etter 30 minutter uten brukeraktivitet slettes alle midlertidige data, også ved lukket fane eller pågående kall. Kontrollen skjer på serveren. Etter ny innlogging er data borte, og et sent modellsvar gjenoppretter dem aldri.
- **FR-24 Bare eieren får tilgang:** Bruker A får ikke tilgang til Bs data, heller ikke via direkte forespørsler. Kontrollen skjer på serveren.
- **FR-25 Varsel før data sendes ut:** I API-modus navngis leverandøren og brukeren bekrefter før første kall, én gang per økt. Vises ikke i mock.

**Mock-modus og API-modus (PRD 4.6)**

- **FR-26 Mock som standard:** Starter i mock uten konfigurasjon, nøkkel eller betaling. Hver side viser at mock er på. Ingen data sendes ut.
- **FR-27 Laste inn eksempel:** Knappen «Last inn eksempel (testpar 1)» fyller begge feltene. Alle fire testpar kan velges som scenarioer i testoppsettet. Hvert scenario har faste analysesvar og begge resultattyper, med varianter uten svar, med bekreftende og med negativt eller begrenset svar.
- **FR-28 Mock med egen tekst:** Fast, tydelig merket eksempelsvar. Meldingen sier at teksten ikke er analysert.
- **FR-29 Slå på API-modus:** Bare når valgt og nøkkel er satt. Grensene i FR-4, FR-7 og FR-13 håndheves før kallet. Arkitekturen fastsetter grense for samlet forespørsel og utdatalengde. Aldri automatiske gjentatte kall.
- **FR-30 Feil fra språkmodellen:** «Analyserer …»/«Lager tekst …» og deaktivert knapp mens kallet pågår. Tidsavbrudd 30 s. Midlertidig feil gir melding og «Prøv igjen» med høyst ett nytt kall. Manglende nøkkel, ugyldig konfigurasjon eller nådd kostnadsgrense gir melding til den som kjører appen, uten «Prøv igjen» og uten stille bytte til mock. Ugyldig svarformat eller sitat avviser hele analysen. Inndata beholdes. Hemmeligheter vises aldri. **Prioritert 24.11:** serveren avviser dupliserte innsendinger, og sene svar ignoreres.

### Ikke-funksjonelle krav

- **NFR-1 Universell utforming:** Hele kjerneflyten med tastatur, synlige etiketter og synlig fokus, status med tekst, meldinger lest opp av skjermleser, fokus til overskrift ved stegbytte og til første ugyldige felt ved feil, kontrast etter WCAG 2.1 AA.
- **NFR-2 Skjermstørrelser:** Bare datamaskin. Fungerer fra 1024 px og testes ved 1024 og 1440 px. Under 1024 px kan siden rulle sidelengs uten overlapp. Ingen mobil eller nettbrett (vedtak 15).
- **NFR-3 Meldinger:** Alle meldinger på bokmål, sier hva som er galt og hva brukeren kan gjøre. Tomtilstander forklarer hva som mangler.
- **NFR-4 Hemmeligheter:** Nøkkelen bare på serveren i lokal miljøkonfigurasjon. `.env` utenfor Git, `.env.example` med tomme plassholdere og valg av modus.
- **NFR-5 Bare fiktive dokumenter:** Repo, testdata og demoer bruker bare fiktive CV-er og annonser. CV-tekst og svar skrives aldri til logger.
- **NFR-6 Budsjett:** Betalte modellkall i utviklingstestingen koster til sammen høyst 100 kr. Arkitekturen beskriver hvordan grensen håndheves før betalte kall slås på.
- **NFR-7 Kjørbar etter README:** En ukjent person installerer og starter i mock på en ren maskin og prøver hele kjerneflyten med testbruker og testpar. Akseptansetest på annen PC med testrapport.
- **NFR-8 Testbar uten språkmodell:** Kjerneflyten testes automatisk i mock. Testparene kjøres også mot ekte modell etter akseptansekravet og reserveregelen i PRD §8.

### Tilleggskrav fra arkitekturen

Kilder: gruppevedtak i PR #17 (23.11 og 24.11) og Mirandas utkast. Utkastet er ikke vedtatt, så punkt merket *(utkast AD-n)* kan endres i #23.

**Startoppsett**
- **AR-1 Skjelettet er grunnlaget for Epic 1, story 1.** PR #44 (#25) har FastAPI med `create_app()`, Jinja2-maler, uv, pytest, ruff, `.env.example` og innstillinger der mock er standard og API-modus uten nøkkel stopper oppstarten. Alle andre stories bygger på det.

**Struktur og tilstand**
- **AR-2 Alternativ A (vedtatt 23.11):** FastAPI, Jinja2/HTML, CSS, små JavaScript-moduler og SQLite.
- **AR-3 Lagdeling** *(utkast AD-1)*: ruter → brukstilfeller → adaptere for konto, dokument og modell. Visningskode har aldri tilgang til database eller modellnøkkel. Appen lytter bare på loopback, og én prosess eier alle økter. **Sjekkes mot #23** (endelig mappestruktur).
- **AR-4 Konto i SQLite (vedtatt 24.11):** Bare e-post og passordhash. Ingen CV, svar, analyser eller tekster. Argon2 via vedlikeholdt bibliotek *(utkast AD-2)*.
- **AR-5 Økt i RAM (vedtatt 24.11):** CV, annonse, analyse og tekst bare i minnet. Data beholdes ved sideoppdatering, slettes ved utlogging og etter 30 minutter uten aktivitet. **Serverrestart avslutter alle økter**, og det skal stå i README.
- **AR-6 Øktmekanisme** *(utkast AD-2)*: Tilfeldig økt-ID i HttpOnly- og SameSite-cookie, CSRF-vern på tilstandsendrende forespørsler, eierskap kontrolleres fra økten og aldri fra en bruker-ID klienten sender. Svar har `no-store`.
- **AR-7 Brukeraktivitet** *(utkast AD-2)*: Brukerutløste handlinger og aktiv redigering teller, polling og sideoppdatering gjør det ikke. En serverstyrt rydder sletter utløpte økter, og hver forespørsel sjekker fristen. Testes med simulert tid. **Sjekkes mot #23.**
- **AR-8 Lagring av redigeringer** *(utkast AD-2)*: Frontend synkroniserer redigert tekst til økten, slik at sideoppdatering beholder den. Kvittering og feil ved siste uferdige lagring må avklares. **Sjekkes mot #23.**
- **AR-9 Handlingsversjon (prioritert 24.11):** Et modellsvar lagres bare hvis økt-ID og handlingsversjon fortsatt er gyldige. Dette dekker både FR-23 og bør-punktet om sene svar.
- **AR-10 Duplikatsperre på serveren (prioritert 24.11):** Serveren avviser en ny innsending av samme handling mens en pågår.

**Innlesing**
- **AR-11 Innlesing på serveren** *(utkast AD-3)*: Bytegrense under mottak, kontroll av innhold og ikke bare filendelse, eksplisitt TXT-dekoding testet med æ, ø og å, pypdf som kandidat, ingen OCR. Midlertidige filer slettes i en garantert oppryddingssti. Gyldig CV byttes først når nytt uttrekk er godkjent. Grense for minnebruk og tid i PDF-parseren må avklares. **Sjekkes mot #23.**

**Modell**
- **AR-12 Felles modellkontrakt** *(utkast AD-4, avtales i #22)*: Én modul med `avklar_stilling`, `analyser` og `lag_tekst`, med samme skjema for mock og API. Analysen har krav med stabil krav-ID, status og sitat, og ansettelsesvilkår i egen liste. Svar kobles til krav-ID og analyseversjon. **Sjekkes mot #22 og #23.**
- **AR-13 Sitatkontroll i begge moduser** *(utkast AD-4)*: Struktur og alle sitater kontrolleres før analysen lagres, mot den CV-versjonen som ble analysert. Kontrollen slås ikke av i mock.
- **AR-14 Mock-adapter** *(utkast AD-4)*: Faste scenarioer bundet til testpar-ID og testdataversjon. Ved egen tekst brukes et merket eksempelscenario med eget fiktivt CV-grunnlag, holdt atskilt fra brukerens CV. Ingen nettressurser.
- **AR-15 Ingen automatiske nye forsøk** *(utkast AD-4)*, heller ikke i SDK-et som velges.
- **AR-16 KI-budsjett (vedtatt 24.11):** Én ansvarlig styrer betalt testing, med felles kostnadsoversikt og automatisk reservasjon og sperre før hvert modellkall. Ukjent restbudsjett betyr at betalt modus er sperret. Grensen er 100 kr samlet. **Åpent i #23:** hvor kostnadsoversikten ligger. En teller som overlever omstart er permanent lagring, og PRD-en tillater i dag bare kontoer.
- **AR-17 Grenser per kall** *(utkast, avklaringer)*: Høyst 16 000 inndata-tokens inkludert instruksjoner og høyst 2 000 utdata-tokens. Tidsavbrudd 30 s som uprøvd startverdi. Modell og pris kontrolleres ved integrasjon (#38).

**Logging og testdata**
- **AR-18 Ingen innhold i logger** *(utkast AD-2)*: CV-tekst og svar logges aldri, heller ikke i unntak, modellkall eller logging fra rammeverk og SDK. Bruk innholdsfrie feilkoder.
- **AR-19 Testdata som mangler:** PDF-varianter av testparene (T-1), supplerende fasiter for ansettelsesvilkår (T-8) og annonse uten tydelige krav (T-9). Oppdateres i #29.

### UX-designkrav

Kilde: `ux/samlet-forslag/` (forslag fra gruppa 23.11, ikke vedtatt design). Fire skjermer er tegnet: 01 innlogging, 03 steg 1, 08 steg 2 og 10 steg 3, alle ved 1280 px. **Alt sjekkes mot #24**, der Helle lager DESIGN.md og EXPERIENCE.md.

**Tokens og grunnlag**
- **UX-DR1 Fargetokens som CSS-variabler:** papir `#F6F1E8`, kort `#FFFDF9`, blekk `#1E1A24`, dempet `#5A5262`, terrakotta `#A3401C`, gult bånd `#FFC247`, svarflate `#FFF0CC`, mangler-merke `#8A5A00`, dokumentert flate `#DCEAF7`, dokumentert merke `#1F4E8C`, bevis `#FFCFC4`, feil `#B3261E`, feltkant `#857A8C`. Ingen lilla og ingen grønn.
- **UX-DR2 Typografi:** Georgia for overskrifter, stegtall og brev. Segoe UI / system-ui for grensesnittet. Tung vekt bare på kravtitler. **Åpent:** serif eller sans-serif i overskriftene.
- **UX-DR3 Former:** 20–24 px hjørner på kort og fliser, pilleformede knapper og merker. **Åpent:** om klistremerket skal roteres 1,2°.

**Ramme rundt alle sider**
- **UX-DR4 Mock-stripe:** hvit tekst på blekk øverst på hver side i mock-modus (FR-26). Skjelettet viser i dag bare en tekstlinje.
- **UX-DR5 Stegindikator:** nummererte steg *01*, *02*, *03* med strek under aktivt steg og «Du er her».
- **UX-DR6 Sidekolonnen «Søknaden din»:** stillingstittel og arbeidsgiver.
- **UX-DR7 Huskeliste i sidekolonnen:** kravene i steg 2 og «Før du sender» i steg 3. «Svar lagt til» holder punktet åpent, fordi et svar ikke er dokumentasjon (FR-13).
- **UX-DR8 Fast handlingslinje nederst** med primærknappen til høyre.

**Steg 2: gap-analysen**
- **UX-DR9 Mangler-kort:** bredt kort med gult bånd, teksten «Mangler dokumentasjon» og et spørsmålstegn. Gult betyr «gjør noe her», rødt er forbeholdt ekte feil.
- **UX-DR10 «Fortell oss kort»:** svarfelt med tegnteller (høyst 1 000, FR-13) og coachende tekst.
- **UX-DR11 Dokumentert-fliser:** lyseblå fliser side om side med hake og teksten «Dokumentert».
- **UX-DR12 Bevis-klistremerke:** CV-sitatet på fersken-rosa (FR-11).
- **UX-DR13 Opptelling som setning:** ingen prikker eller «3/4», så analysen ikke leses som en poengsum (SM-C1).

**Steg 3: teksten**
- **UX-DR14 Brevet i serif på et eget ark,** atskilt fra grensesnittet.
- **UX-DR15 Brukerens svar i «Teksten bygger på»** merkes «Oppgitt av deg. Supersøker har ikke kontrollert det.» (FR-19).

**Feil, tilgjengelighet og bredder**
- **UX-DR16 Feilmeldinger** med ikon og tekst i `#B3261E`. **Åpent:** feilrødt ligger nær terrakotta, særlig på innloggingssiden.
- **UX-DR17 Bredder:** tegnet ved 1280 px. Må tilpasses og kontrolleres ved 1024 og 1440 px (NFR-2). 1024 px er ikke tegnet.
- **UX-DR18 Tilgjengelighet:** kontrastene er regnet ut og holder minst 5,2:1 for tekst og 3:1 for feltkanter. Skjermleser og tastatur er ikke testet, fordi skjermene er statiske skisser (NFR-1, T-7).
- **UX-DR19 Skjermer som ikke er tegnet:** registrering, feil (fil, analyse, modell, konfigurasjon), tomtilstander (FR-10, FR-14), bekreftelser («Endre CV eller annonse», erstatt egenredigert tekst), leverandørvarsel (FR-25) og felt for tittel og arbeidsgiver (FR-9). **Venter på #24.**

### Kobling mellom krav og epics

| Krav | Epic | Kort |
|---|---|---|
| FR-1 | 1 | Opprette konto |
| FR-2 | 1 | Logge inn og ut |
| FR-3 | 1 | Testbruker |
| FR-4 | 2 | Legge inn CV (tekst, TXT, PDF) |
| FR-5 | 2 | Se og rette innlest CV-tekst |
| FR-6 | 2 | PDF uten lesbar tekst |
| FR-7 | 2 | Legge inn annonse |
| FR-8 | 2 | Kontroll før analyse |
| FR-9 | 2 | Stillingstittel og arbeidsgiver |
| FR-10 | 2 | Trekke ut krav og ansettelsesvilkår |
| FR-11 | 2 | Dokumenterte krav med sitat |
| FR-12 | 2 | Krav som mangler dokumentasjon |
| FR-13 | 2 | Svare på manglende krav |
| FR-14 | 2 | Alle krav dokumentert |
| FR-15 | 3 | Omskrivingsvalg |
| FR-16 | 3 | Helt søknadsutkast |
| FR-17 | 3 | Forslag til formuleringer |
| FR-18 | 3 | Ærlighetsregel |
| FR-19 | 3 | «Teksten bygger på» |
| FR-20 | 3 | Redigere og kopiere |
| FR-21 | 3 | Endre svar, valg, CV eller annonse |
| FR-22 | 1 | Midlertidige data i økten, også ved sideoppdatering |
| FR-23 | 1 | Sletting ved utlogging og etter 30 min uten aktivitet |
| FR-24 | 1 | Bare eieren får tilgang |
| FR-25 | 4 | Varsel før data sendes til leverandøren |
| FR-26 | 2 | Mock som standard (oppstarten er ferdig i #25) |
| FR-27 | 2 | Laste inn eksempel og testscenarioer |
| FR-28 | 2 | Mock med egen tekst |
| FR-29 | 4 | Slå på API-modus |
| FR-30 | 2 og 4 | Epic 2: «Analyserer …», deaktivert knapp, ugyldig analyse avvises, inndata beholdes. Epic 4: tidsavbrudd, «Prøv igjen», konfigurasjons- og budsjettfeil, duplikatsperre, sene svar |
| NFR-1–3 | Alle, kontrolleres samlet i 5 | Universell utforming, skjermbredder, meldinger |
| NFR-4 | 1 og 4 | Hemmeligheter (grunnlaget er ferdig i #25) |
| NFR-5 | Alle | Fiktive data, ingen innhold i logger |
| NFR-6 | 4 | Budsjett 100 kr |
| NFR-7 | 5 | Kjørbar etter README |
| NFR-8 | 2 og 4 | Testbar i mock (2), ekte modell mot fasit (4) |

Alle 30 FR-er og 8 NFR-er er koblet til minst én epic.

## Epics

Rekkefølgen er 1 → 2 → 3 → 4, og 5 til slutt. Hver epic bygger bare på de foregående.

Koding kan likevel skje parallelt. Steg 1 og 2 kan bygges med en midlertidig økt, og innloggingskravet kobles på når konto (#30) er merget. NFR-1–3 er akseptansekriterier i alle stories. Epic 5 er den samlede kontrollen, ikke stedet der tilgjengelighet bygges.

### Epic 1: Innlogging og trygg økt

Brukeren kan opprette konto, logge inn og ut, og stole på at dataene bare er hennes og slettes ved utlogging eller etter 30 minutter uten aktivitet. Sensor kan logge inn med testbrukeren.

**FR:** FR-1, FR-2, FR-3, FR-22, FR-23, FR-24
**Også:** AR-1 (skjelettet, ferdig i #25), AR-4–AR-8, UX-DR1–UX-DR8 (felles sideramme)
**Issues:** #25, #30, #35 (Elisabeth), #28 (Helle)
**Sjekkes mot #23:** aktivitetsdefinisjon og lagring av redigeringer (AR-7, AR-8)

### Epic 2: Fra CV og annonse til gap-analyse i mock-modus

Brukeren kan legge inn CV og annonse, rette teksten, se hvilke krav CV-en dokumenterer og hvilke som mangler dokumentasjon, og svare på dem. Alt fungerer i mock-modus med testparene, uten API-nøkkel.

**FR:** FR-4–FR-14, FR-26, FR-27, FR-28, FR-30 (delene som gjelder mock)
**Også:** AR-11–AR-14, UX-DR9–UX-DR13
**Issues:** #32, #33 (Miranda), #31 (Helle), #22 (felles modellkontrakt)
**Sjekkes mot #22 og #23:** modellkontrakt og innlesing (AR-11, AR-12)

### Epic 3: Ærlig søknadstekst

Brukeren kan velge helt søknadsutkast eller forslag til formuleringer, få en tekst som bare bygger på CV, annonse og egne svar, se hva den bygger på, redigere og kopiere den, og gå tilbake for å endre.

**FR:** FR-15–FR-21
**Også:** UX-DR14, UX-DR15
**Issues:** #34 (Helle)

### Epic 4: Ekte språkmodell, trygt og innenfor budsjettet

Den som kjører appen, kan slå på API-modus. Brukeren varsles før data sendes ut, feil fra modellen håndteres forståelig, og budsjettet på 100 kr kan ikke overskrides.

**FR:** FR-25, FR-29, FR-30 (resten)
**NFR:** NFR-6, NFR-8 (ekte modell)
**Også:** AR-9, AR-10, AR-15–AR-17
**Issues:** #36, #38 (Miranda)
**Sjekkes mot #23:** hvor kostnadsoversikten ligger (AR-16)

### Epic 5: Klar for sensor

En person som ikke kjenner prosjektet, kan installere appen etter README og prøve hele kjerneflyten med testbrukeren og testparene. Flyten er kontrollert med tastatur og ved 1024 og 1440 px.

**NFR:** NFR-1, NFR-2, NFR-3 (samlet kontroll), NFR-7
**Tester:** T-1 og T-7 samlet
**Issues:** #37, #39 (Elisabeth), #40 (Helle), #42

Epic 5 er en akseptanse-epic. Den er tatt med fordi README (kriterium 6) og NFR-7 ellers ikke ville hatt noen eier i planen.

## Stories

Ikke skrevet ennå (steg 3). Venter på #23 og #24, med frist 25.11, så akseptansekriteriene ikke må skrives om. Skrives senest 26.11, også om #23 og #24 ikke er ferdige. Da merkes de berørte stedene.
