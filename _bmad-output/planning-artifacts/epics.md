---
stepsCompleted: [1, 2, 3, 4]
status: final
created: 2026-11-24
owner: Elisabeth (#26)
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md (med vedtak 16, PR #50)
  - _bmad-output/planning-artifacts/architecture/supersoker-v1/ARCHITECTURE-SPINE.md (final, PR #46)
  - _bmad-output/planning-artifacts/architecture/supersoker-v1/teststrategi.md (PR #46)
  - tests/fixtures/modellkontrakt/README.md (kontraktversjon 1, PR #47)
  - _bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/DESIGN.md (final, PR #49)
  - _bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/EXPERIENCE.md (final, PR #49)
  - "PR #17: gruppevedtak 2026-11-23 (alternativ A) og 2026-11-24 (økt, KI-budsjett, bør-punkter)"
  - tests/fixtures/job-applications/
excludedDocuments:
  - "architecture/technology.md: beskriver et annet prosjekt (eksempel fra faglærer), og anbefaler stille mock-fallback, som FR-30 forbyr"
  - "Enkeltkonseptene i ux/elisabeth, ux/helle, ux/miranda og ux/prototype-kjerneflyt.html: erstattet av samlet forslag"
  - "Product brief: innarbeidet i PRD-en"
  - "PR #14 (testgrunnlag): ikke merget, oppdateres i #29. Stories kobles til T-numrene i PRD-en"
  - "Mirandas arkitekturutkast (branch miranda-arkitekturgrunnlag) og ux/samlet-forslag: erstattet av final arkitektur og UX-spesifikasjon 2026-11-26"
---

# Supersøker – epics og stories

## Oversikt

Dokumentet bryter kravene i PRD-en, gruppevedtakene om arkitektur og det samlede designforslaget ned i epics og stories, slik at hver story kan spores til FR-, NFR- og T-numre og til et GitHub-issue.

**Status: final 2026-11-26, gjelder fra merge av PR #45.** Validert mot alle FR-er, NFR-er, AR-er, UX-DR-er og T-numre, og uten avhengigheter framover. Kravoversikten er oppdatert mot den endelige arkitekturen (PR #46), modellkontrakten (PR #47), UX-spesifikasjonen (PR #49) og vedtak 16 i PRD-en (PR #50). Utkastet fra 24.11 med epic-inndelingen ligger i historikken til PR #45.

Hver story viser hvilke krav den dekker, hvilket issue den hører til, og eventuelt status. Akseptansekriteriene er skrevet som Gitt/Når/Så, slik at de kan brukes direkte som tester.

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

- **FR-22 Midlertidige data i økten:** Brukeren kan gå mellom stegene og oppdatere siden uten å miste data eller starte modellkall, også egenredigert tekst. 25-minuttersvarselet er utsatt (vedtak 16).
- **FR-23 Sletting ved utlogging og utløp:** Etter 30 minutter uten brukeraktivitet slettes alle midlertidige data, også ved lukket fane eller pågående kall. Kontrollen skjer på serveren. Etter ny innlogging er data borte, og et sent modellsvar gjenoppretter dem aldri.
- **FR-24 Bare eieren får tilgang:** Bruker A får ikke tilgang til Bs data, heller ikke via direkte forespørsler. Kontrollen skjer på serveren.
- **FR-25 Varsel før data sendes ut:** I API-modus navngis leverandøren og brukeren bekrefter før første kall, én gang per økt. Vises ikke i mock.

**Mock-modus og API-modus (PRD 4.6)**

- **FR-26 Mock som standard:** Starter i mock uten konfigurasjon, nøkkel eller betaling. Hver side viser at mock er på. Ingen data sendes ut.
- **FR-27 Laste inn eksempel:** Knappen «Last inn eksempel (testpar 1)» fyller begge feltene. Alle fire testpar kan velges som scenarioer i testoppsettet. Hvert scenario har faste analysesvar og begge resultattyper, med varianter uten svar, med bekreftende og med negativt eller begrenset svar.
- **FR-28 Mock med egen tekst:** Fast, tydelig merket eksempelsvar. Meldingen sier at teksten ikke er analysert.
- **FR-29 Slå på API-modus:** Bare når valgt og nøkkel er satt. Grensene i FR-4, FR-7 og FR-13 håndheves før kallet. Arkitekturen fastsetter grense for samlet forespørsel og utdatalengde. Aldri automatiske gjentatte kall.
- **FR-30 Feil fra språkmodellen:** «Analyserer …»/«Lager tekst …» og deaktivert knapp mens kallet pågår. Tidsavbrudd 30 s. Midlertidig feil gir melding og «Prøv igjen» med høyst ett nytt kall. Manglende nøkkel, ugyldig konfigurasjon eller nådd kostnadsgrense gir melding til den som kjører appen, uten «Prøv igjen» og uten stille bytte til mock. Ugyldig svarformat eller sitat avviser hele analysen. Inndata beholdes. Hemmeligheter vises aldri. **Del av v1 (vedtak 16):** serveren avviser dupliserte innsendinger, og sene svar ignoreres.

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

Kilde: [arkitekturen](architecture/supersoker-v1/ARCHITECTURE-SPINE.md) (AD-1–AD-7, final, PR #46), [teststrategien](architecture/supersoker-v1/teststrategi.md) og [modellkontrakten](../../tests/fixtures/modellkontrakt/README.md) (PR #47). Numrene er de samme som i utkastet, slik at henvisningene i epicene står.

**Startoppsett**
- **AR-1 Skjelettet er grunnlaget (ferdig, #25, PR #44).** FastAPI med `create_app()` og `--factory`, Jinja2-maler, uv, pytest, ruff og `.env.example`. Mock er standard, og API-modus uten nøkkel stopper oppstarten.
- **AR-2 Stack (vedtatt 23.11):** Python 3.12, FastAPI, Uvicorn, Jinja2, Pydantic, SQLite fra standardbiblioteket, egen CSS og vanlig JavaScript. Versjonene står i `uv.lock`. pypdf, pwdlib (Argon2) og multipart-støtte legges til i `pyproject.toml` når storyen som trenger dem, bygges.

**Struktur og tilstand**
- **AR-3 Lagdeling og mappestruktur (AD-1):** ruter → brukstilfeller → adaptere. Én Uvicorn-prosess på loopback eier all tilstand. Nye moduler: `app/accounts.py`, `sessions.py`, `documents.py`, `application.py`, `app/models/` (`contracts.py`, `mock.py`, `api.py`, `budget.py`), `templates/` og `static/`. Visningslaget får bare data som trengs på skjermen.
- **AR-4 Konto i SQLite (AD-1, AD-2):** Én kontotabell med intern ID, unik e-post (håndhevet i databasen) og passordhash. Argon2id. Ingen CV, svar, analyser eller tekster.
- **AR-5 Økt i RAM (vedtatt 24.11, AD-2):** Arbeidsdata finnes bare i minnet. Serverrestart avslutter alle økter, og det står i README.
- **AR-6 Øktmekanisme (AD-2):** Ny tilfeldig økt-ID ved hver innlogging i HttpOnly- og SameSite-cookie. CSRF-token på tilstandsendrende forespørsler. Serveren finner konto og arbeidsområde fra økten, aldri fra en ID klienten sender. Arbeidsdata har `Cache-Control: no-store` og holdes ute av nettleserlagring, URL-er og logger. En gammel økt-ID gir aldri en ny økt.
- **AR-7 Aktivitet og utløp (AD-2):** Monoton tid. Gyldige brukerutløste endringer og navigasjon via stegkontrollene teller som aktivitet. Sideoppdatering, bakgrunnsstatus, duplikater og ferdige modellsvar teller aldri. Fristen sjekkes ved tilgang og før hver skriving. En tidsstyrt rydder sletter utløpte økter også med lukket fane. Ved sletting avbrytes lokale modelloppgaver.
- **AR-8 Lagring av redigeringer (AD-4):** Redigeringer synkroniseres fortløpende til økten med revisjon og kvittering. Stegbytte og generering som avhenger av siste redigering, venter på kvittering. Serveren avviser eldre sekvenser. Sideoppdatering viser siste lagrede tekst uten modellkall (T-10). Flere faner er en forbedring, ikke et krav.
- **AR-9 Revisjoner og sene svar (AD-4, vedtak 16):** Analyse bindes til dokumentrevisjonen. Generering bindes til dokument, analyse, svar og teksttype. Et resultat publiseres atomisk bare hvis økten er aktiv, operasjonen fortsatt pågår og revisjonene stemmer. Utløp, utlogging, tidsavbrudd og bekreftet endring gjør gamle operasjoner ugyldige.
- **AR-10 Duplikatsperre (AD-4, vedtak 16):** Serveren registrerer en operasjon som pågående med en nøkkel av økt, handling og inndataversjon før modellarbeidet starter. Gjentatt innsending under arbeid eller etter et gyldig resultat gir aldri et nytt modellkall. Etter midlertidig feil gir serveren en engangs-ID for «Prøv igjen». Låsen holdes bare rundt sjekk og endring, aldri under nettverksventing.

**Innlesing**
- **AR-11 Innlesing på serveren (AD-3):** FastAPIs `UploadFile`. Samlet forespørsel begrenses under mottak, også uten pålitelig `Content-Length`, og filens egen grense sjekkes før uttrekk. TXT dekodes som UTF-8 med valgfri BOM, tekstbasert PDF leses med pypdf. Opplastings- og parserfiler slettes i en garantert oppryddingssti, også ved feil og avbrutt mottak. Tidligere gyldig CV beholdes ved feil. PDF-parseren trenger grenser for minne og tid.
- **AR-11b Stillingsfelt finnes lokalt (AD-3):** Tittel og arbeidsgiver gjenkjennes i annonsen uten modellkall og vises alltid til bekreftelse før analyse.

**Modell**
- **AR-12 Modellkontrakten (PR #47, kontraktversjon 1):** Adapteren for `analyser` gir `kompetansekrav` (`id`, `krav`, `status` = `dekket`/`mangler`, `kilde` = ordrett sitat eller `null`) og `ansettelsesvilkar` (strenger). Serveren legger til `stilling` og `kontraktversjon`. Adapteren for `lag_tekst` gir bare `resultattype` og `tekst`. Serveren bygger `kildegrunnlag` (`stilling`, `cv_sitater`, `brukersvar`, `manglende_krav` med `svar_gitt`) og en regelbasert `veiledning`. Grensesnittet er `app/models/contracts.py` (PR #48).
- **AR-13 Validering i begge moduser (AD-5):** Struktur, statuser, krav-ID-er og alle sitater kontrolleres før analysen publiseres, mot CV-versjonen analysen gjelder. Ett ugyldig eller manglende sitat avviser hele analysen. Kontrollen slås ikke av i mock.
- **AR-14 Mock-adapter (AD-5, PR #48):** Et testpar velges når både CV og annonse samsvarer med testgrunnlaget. Ellers brukes testpar 1 som merket eksempel. Faste svarvarianter (bekreftende, negativt, begrenset) per testpar med gap. Ingen nettverkskall. Scenario-ID og fixtureversjon følger resultatet.
- **AR-15 Ingen automatiske nye forsøk (AD-4, AD-5),** heller ikke i SDK eller transport.
- **AR-16 KI-budsjett (vedtatt 24.11, AD-6):** Kostnadsoversikten føres i et Teams-dokument utenfor appen, av Miranda. En betalende prosess starter sperret og får et beløp tildelt manuelt fra terminalen, aldri fra en nettleserrute eller miljøfila. Før hver utsending reserveres maksimal kostnad i hele øre. Ukjent kostnad eller restbeløp avviser kallet. Én betalende prosess om gangen. En oppsummering av kostnadene skal inn i testrapporten i repoet.
- **AR-17 Grenser per kall (AD-6):** 2 000 000 filbyte, 10 000 tegn for CV og annonse, 1 000 tegn per svar, 30 sekunder per modellkall. Til evaluering foreslås 16 000 inndata- og 2 000 utdata-tokens per kall.

**Logging og testdata**
- **AR-18 Ingen innhold i logger (AD-2):** CV-tekst og svar logges aldri, heller ikke ved parsingsfeil, feilsvar, tidsavbrudd eller i rammeverkets og SDK-ets logging.
- **AR-19 Testdata som mangler:** PDF-varianter av testparene (T-1) og supplerende fasiter for ansettelsesvilkår (T-8) og annonse uten tydelige krav (T-9), i #29. Testparene i `tests/fixtures/` er også appdata (FR-27).
- **AR-20 Nettlesertester:** Playwright er første kandidat. Nettlesertester holdes adskilt fra `uv run pytest`, slik at kommandoene i README virker på en ren maskin uten nettlesere installert.

### UX-designkrav

Kilde: [DESIGN.md](ux-designs/ux-supersoker-2026-11-25/DESIGN.md) og [EXPERIENCE.md](ux-designs/ux-supersoker-2026-11-25/EXPERIENCE.md) (final, PR #49). Ved uenighet gjelder de to filene.

**Visuell grunnmur**
- **UX-DR1 Designtokens som CSS-variabler:** alle farger, skrifter, avstander og hjørner fra frontmatteren i DESIGN.md. Terrakotta (`aksent`) brukes bare til aksent, lenker og aktivt steg, aldri på knapper. Feil er `#8C0D12`. Ingen lilla og ingen grønn.
- **UX-DR2 Typografi:** Georgia bare i logo, sideoverskrift, brevark og CV-sitatet i klistremerket. Alt annet i Segoe UI / system-ui. Ingen nettskrifter, så mock virker uten nett.
- **UX-DR3 Former og feil:** hjørnene fra `rounded`. Feilikonet er firkantet, og runde merker brukes aldri til feil. Ingenting er rotert.

**Ramme rundt alle sider**
- **UX-DR4 Mock-stripe** øverst på alle sider i mock-modus, også før innlogging. Kan ikke lukkes. Ingen stripe i API-modus (A12).
- **UX-DR5 Fast sideramme:** toppfelt med logo, e-postadressen og «Logg ut» (uten bekreftelse, A7). Stegindikator som nummerert liste i `nav` med `aria-current="step"`. Fullførte steg er lenker. Én `h1` per side med kursiv aksent og egen `<title>`. «Hopp til innhold» først.
- **UX-DR6 Sidekolonne** per side, slik tabellen «Fast sideramme» i EXPERIENCE.md viser. Følger siden ved rulling uten å ligge fast.
- **UX-DR7 Huskeliste** som bare hakes av for ting appen vet. Manglende krav holdes åpne også med «Svar lagt til». «Kopier teksten» åpnes igjen hvis teksten endres (A15).
- **UX-DR8 Knapper og handlingslinje:** én primærknapp per visning, blekk, aktiv også ved tomme felt. Deaktivert bare mens et kall pågår, med «Analyserer …»/«Lager tekst …». Handlingslinjen er `position: sticky` og dekker aldri fokusert innhold (`scroll-padding-bottom`).

**Steg 1**
- **UX-DR9 CV- og annonsekort:** veksler «Lim inn tekst» / «Last opp fil» som går tilbake til redigerbar tekst etter opplasting. Annonsen har hjelpeteksten om tittel, arbeidsgiver og krav.
- **UX-DR10 Stilling og arbeidsgiver** vises alltid under annonsen etter første «Analyser kravene», forhåndsutfylt med funn. Fokus til første tomme felt. Neste trykk starter analysen.
- **UX-DR11 Låst steg 1 etter analyse:** feltene er skrivebeskyttet (ikke deaktivert), med «Endre CV eller annonse» og «Til gap-analysen →» (A5).

**Steg 2**
- **UX-DR12 Rekkefølge:** opptelling som setning, med «Dette er en oversikt over dokumentasjon, ikke en vurdering av deg» → «Står ikke i CV-en» → «Dokumentert i CV-en» → «Vilkår fra annonsen» → teksttype. Tomme seksjoner vises ikke. Stilling og arbeidsgiver er del av `h1` (A4).
- **UX-DR13 Mangler-kort og svarfelt:** gult bånd med «? Mangler dokumentasjon». Svarfelt med etiketten «Ditt svar om <krav>», telleren «n / 1 000 tegn» og «Svar lagt til» når feltet har innhold.
- **UX-DR14 Dokumentert-fliser og bevis-klistremerke:** lyseblå flis med «✓ Dokumentert» og hele sitatet ordrett, uten forkorting.
- **UX-DR15 Vilkår-boks og valgkort:** vilkår uten status og svarfelt. Teksttypen er en radiogruppe i `fieldset` med `legend`, og «Helt søknadsutkast» er forhåndsvalgt.

**Steg 3**
- **UX-DR16 Brevark og kildeliste:** etiketten «Søknadsbrev» eller «Forslag til formuleringer» (A16). Ett redigerbart felt med ren tekst. Kildelisten «Teksten bygger på» med merketeksten, svar merket «Oppgitt av deg. Supersøker har ikke kontrollert det.» og status for hvert manglende krav. Veiledning utenfor arket.
- **UX-DR17 Lagringsstatus (A11):** «Lagrer …» og «Lagret i økten» under brevarket og svarfeltene, og feilteksten når lagringen ikke er kvittert. Leses bare opp ved feil.

**Meldinger, dialoger og tilgjengelighet**
- **UX-DR18 Meldingstekster:** alle meldinger står ordrett i tabellen «Meldinger» i EXPERIENCE.md. `melding-feil` står ved feilstedet. «Prøv igjen» finnes bare ved tidsavbrudd, midlertidig feil og ugyldig modellsvar.
- **UX-DR19 Dialoger:** «Endre CV eller annonse», «Erstatt teksten» og «Leverandørvarsel», med tekstene i EXPERIENCE.md. Fokus på det trygge valget, Escape velger det, fokus tilbake etterpå, og resten av siden kan ikke brukes mens dialogen er åpen.
- **UX-DR20 Tilgjengelighet:** fokus til `h1` ved stegbytte og til første ugyldige felt ved feil. `aria-invalid` og `aria-describedby` på felt. `role="alert"` for feil og `role="status"` for status. Tegntelleren leses opp ved 90 % og over grensen. Symboler er skjult for skjermleser når ordet står ved siden av.
- **UX-DR21 Bredder:** knekkpunkt 1200 px, minstebredde 1024 px med sidelengs rulling under. Samme DOM-rekkefølge ved alle bredder. Testes ved 1024 og 1440 px med lange kravtitler, sitater og filnavn. Kjent begrensning: WCAG 1.4.10 (reflow) er ikke oppfylt ved sterk zoom.

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
| FR-30 | 1, 2 og 4 | Epic 1: grunnlaget for duplikatsperre og sene svar (AR-9, AR-10). Epic 2: «Analyserer …», deaktivert knapp, ugyldig analyse avvises, inndata beholdes. Epic 4: tidsavbrudd, «Prøv igjen», konfigurasjons- og budsjettfeil, og duplikatsperre og sene svar testet mot ekte modell |
| NFR-1–3 | Alle, kontrolleres samlet i 5 | Universell utforming, skjermbredder, meldinger |
| NFR-4 | 1 og 4 | Hemmeligheter (grunnlaget er ferdig i #25) |
| NFR-5 | Alle | Fiktive data, ingen innhold i logger |
| NFR-6 | 4 | Budsjett 100 kr |
| NFR-7 | 5 | Kjørbar etter README |
| NFR-8 | 2 og 4 | Testbar i mock (2), ekte modell mot fasit (4) |

Alle 30 FR-er og 8 NFR-er er koblet til minst én epic.

## Epic-liste

Rekkefølgen er 1 → 2 → 3 → 4, og 5 til slutt. Hver epic bygger bare på de foregående.

### Prioritet og kuttlinje

Sensor kjører appen i mock-modus etter README. Derfor går **Epic 1–3 og 5 foran Epic 4**. Kjerneflyten fra innlogging til kopiert tekst skal virke før API-modus bygges ferdig.

**Kuttlinje (forslag til gruppa, vedtas i PR #45):** Er story 4.4 (budsjettsperren) ikke verifisert med simulert leverandør innen **3.12.2026**, kjøres ingen betalte tester. Da står story 4.5, NFR-8 (ekte modell) og T-2 som ikke gjennomført, og avviket begrunnes i testrapporten og i PRD §9. Datoen gir tid til kjerneflyten og testene i Epic 5 før 7.12.

**Kritisk sti:** 1.3/1.4 (innlogging) → 2.2–2.4 (steg 1) → 2.6–2.7 (analyse) → 3.1 (tekst) → 5.1 (test av kjerneflyten). En forsinkelse her forsinker alt etter.

**Rekkefølge per person:**

| Person | Rekkefølge | Hvorfor |
|---|---|---|
| Elisabeth | 1.3–1.5 → 1.6 → 1.9 → 1.7 → 1.8 → 3.5 → 5.4 | Innlogging først, fordi alle trenger den for å teste. 1.9 før de andre øktstoriene, fordi Epic 2–4 bygger på den |
| Helle | 1.2 → 2.2–2.5 → 3.1–3.4 → 5.5 | Rammen først, så steg 1 og steg 3 i flytrekkefølge |
| Miranda | 2.1 → 2.6–2.8 → 4.1–4.4 → 4.5 | Mock og analyse før API, slik kuttlinjen krever |

### Felles regler for alle stories

**CSS-ansvar:** Story 1.2 lager designtokens og sideramma. Hver story lager CSS-en for sine egne komponenter, med navnene fra EXPERIENCE.md og tokenene fra DESIGN.md. Ingen story lager egne farger, skrifter eller knappestiler.

**Felles akseptansekriterium for stories med skjerm:**

**Gitt** en ny eller endret skjerm
**Når** den sammenlignes med DESIGN.md og EXPERIENCE.md
**Så** bruker den bare tokenene og komponentene derfra, og meldingene står ordrett som i meldingstabellen
**Og** den virker med tastatur og ved 1024 og 1440 px (NFR-1, NFR-2)

**Testmetode:** `uv run pytest` tester server og HTML uten nettleser. Kriterier som krever en ekte nettleser (fokus, kopiering, sideoppdatering under lagring), sier om de testes i nettlesertesten (story 5.2) eller kontrolleres manuelt (story 5.3). Ingen test skal påstå mer enn den faktisk viser.

**Sporbarhet:** Hver PR skriver hvilke stories den gjelder, for eksempel «Story 2.6», i tillegg til issuet.

**Testrapporten** ligger i `_bmad-output/implementation-artifacts/testrapport.md`. Den første storyen som skal registrere noe der (4.4, 4.5, 5.3 eller 5.5), oppretter fila med én seksjon per type: testkjøringer, runder mot ekte modell, manuelle kontroller, installasjonstest og kostnader. Rapporten inneholder bare fiktive data.

Koding kan likevel skje parallelt. Steg 1 og 2 kan bygges med en midlertidig økt, og innloggingskravet kobles på når konto (#30) er merget. NFR-1–3 er akseptansekriterier i alle stories. Epic 5 er den samlede kontrollen, ikke stedet der tilgjengelighet bygges.

### Epic 1: Innlogging og trygg økt

Brukeren kan opprette konto, logge inn og ut, og stole på at dataene bare er hennes og slettes ved utlogging eller etter 30 minutter uten aktivitet. Sensor kan logge inn med testbrukeren.

**FR:** FR-1, FR-2, FR-3, FR-22, FR-23, FR-24
**Også:** AR-1 (skjelettet, ferdig i #25), AR-3–AR-10, AR-18, UX-DR1–UX-DR8, UX-DR17, UX-DR20, UX-DR21
**Endret 2026-11-25:** Duplikatsperren og versjonssjekken (AR-9, AR-10) er flyttet hit fra Epic 4, etter forslag fra Miranda i PR #45. De hører til økten og brukes av både mock (Epic 2) og API (Epic 4).
**Issues:** #25, #30, #35 (Elisabeth), #28 (Helle)

### Epic 2: Fra CV og annonse til gap-analyse i mock-modus

Brukeren kan legge inn CV og annonse, rette teksten, se hvilke krav CV-en dokumenterer og hvilke som mangler dokumentasjon, og svare på dem. Alt fungerer i mock-modus med testparene, uten API-nøkkel.

**FR:** FR-4–FR-14, FR-26, FR-27, FR-28, FR-30 (delene som gjelder mock)
**Også:** AR-11–AR-14, AR-19, UX-DR9–UX-DR15
**Issues:** #32, #33 (Miranda), #31 (Helle), #22 (felles modellkontrakt)

### Epic 3: Ærlig søknadstekst

Brukeren kan velge helt søknadsutkast eller forslag til formuleringer, få en tekst som bare bygger på CV, annonse og egne svar, se hva den bygger på, redigere og kopiere den, og gå tilbake for å endre.

**FR:** FR-15–FR-21
**Også:** UX-DR16, UX-DR17, UX-DR19
**Issues:** #34 (Helle)

### Epic 4: Ekte språkmodell, trygt og innenfor budsjettet

Den som kjører appen, kan slå på API-modus. Brukeren varsles før data sendes ut, feil fra modellen håndteres forståelig, og budsjettet på 100 kr kan ikke overskrides.

**FR:** FR-25, FR-29, FR-30 (resten)
**NFR:** NFR-6, NFR-8 (ekte modell)
**Også:** AR-15–AR-17. Duplikatsperren og versjonssjekken fra Epic 1 (AR-9, AR-10) testes her mot ekte modellkall.
**Issues:** #36, #38 (Miranda)

### Epic 5: Klar for sensor

En person som ikke kjenner prosjektet, kan installere appen etter README og prøve hele kjerneflyten med testbrukeren og testparene. Flyten er kontrollert med tastatur og ved 1024 og 1440 px.

**NFR:** NFR-1, NFR-2, NFR-3 (samlet kontroll), NFR-7
**Tester:** T-1 og T-7 samlet · **Også:** AR-20, UX-DR18, UX-DR20, UX-DR21
**Issues:** #37, #39 (Elisabeth), #40 (Helle), #42

Epic 5 er en akseptanse-epic. Den er tatt med fordi README (kriterium 6) og NFR-7 ellers ikke ville hatt noen eier i planen.

## Epic 1: Innlogging og trygg økt

Brukeren kan opprette konto, logge inn og ut, og stole på at dataene bare er hennes og slettes ved utlogging eller etter 30 minutter uten aktivitet. Sensor kan logge inn med testbrukeren.

### Story 1.1: Appen starter i mock-modus

Som sensor,
vil jeg starte appen med én kommando uten API-nøkkel,
slik at jeg kan prøve den uten oppsett eller betaling.

**Krav:** FR-26, FR-30, NFR-4, NFR-7 · AR-1, AR-2 · **Issue:** #25 (Elisabeth) · **Status:** ferdig (PR #44)

**Akseptansekriterier:**

**Gitt** en ren klone uten `.env`
**Når** `uv sync` og oppstartskommandoen i README kjøres
**Så** svarer appen på `http://127.0.0.1:8000` i mock-modus
**Og** siden sier at ingen tekst sendes til en språkmodell

**Gitt** `SUPERSOKER_MODE=api` uten `OPENAI_API_KEY`
**Når** appen startes
**Så** stopper oppstarten med en melding om hva som må rettes
**Og** appen bytter ikke stilltiende til mock (FR-30)

**Gitt** at `.env.example` kopieres til `.env`
**Når** appen startes
**Så** starter den i mock-modus

### Story 1.2: Felles sideramme og designtokens

Som bruker,
vil jeg at alle sider har samme ramme, farger og skrift,
slik at jeg kjenner meg igjen og alltid ser om appen er i mock-modus.

**Krav:** FR-26, NFR-1–NFR-3 · UX-DR1–UX-DR5, UX-DR8, UX-DR20, UX-DR21 · **Issue:** #28 (Helle)

**Akseptansekriterier:**

**Gitt** mock-modus
**Når** en hvilken som helst side åpnes, også før innlogging
**Så** vises mock-stripen øverst med teksten fra meldingstabellen
**Og** i API-modus vises ingen stripe

**Gitt** CSS-en i `app/static/`
**Når** den sammenlignes med DESIGN.md
**Så** er alle farger, skrifter, avstander og hjørner definert som variabler fra frontmatteren
**Og** ingen farge er hardkodet utenfor variablene, og ingen nettskrift lastes ned

**Gitt** en side med stegindikator
**Når** den åpnes
**Så** er stegindikatoren en nummerert liste i `nav` med `aria-current="step"` på aktivt steg
**Og** siden har én `h1`, en egen `<title>` og «Hopp til innhold» som første fokuserbare element

**Gitt** et nettleservindu på 1024 og 1440 px
**Når** rammen vises
**Så** overlapper ingenting, og under 1024 px kan siden rulles sidelengs uten at knapper forsvinner
**Og** handlingslinjen dekker aldri fokusert innhold

### Story 1.3: Opprette konto

Som besøkende,
vil jeg opprette en konto med e-post og passord,
slik at jeg kan bruke Supersøker.

**Krav:** FR-1 · AR-3, AR-4 · UX-DR18, UX-DR20 · T-6 · **Issue:** #30 (Elisabeth)

**Akseptansekriterier:**

**Gitt** innloggingssiden
**Når** jeg følger lenken «Opprett konto»
**Så** kommer jeg til «Opprett konto», og derfra kan jeg gå tilbake med lenken «Logg inn»

**Gitt** siden «Opprett konto»
**Når** jeg sender gyldig e-post og et passord på minst 8 tegn
**Så** opprettes kontoen med Argon2id-hash i SQLite, og jeg sendes til innlogging
**Og** passordet lagres aldri i klartekst, og navn lagres ikke

**Gitt** en e-post med feil format, en e-post som er i bruk, eller et passord under 8 tegn
**Når** jeg sender skjemaet
**Så** vises meldingen fra meldingstabellen ved feltet, feltet merkes `aria-invalid`, og fokus flyttes til første ugyldige felt
**Og** e-posten beholdes, mens passordet tømmes

**Gitt** to forespørsler med samme e-post samtidig
**Når** begge behandles
**Så** opprettes bare én konto, fordi unikheten håndheves i databasen

**Gitt** en ny maskin uten database
**Når** appen startes
**Så** opprettes databasefila automatisk, og den er utenfor Git

### Story 1.4: Logge inn og ut

Som bruker,
vil jeg logge inn og ut,
slik at bare jeg kommer til arbeidet mitt.

**Krav:** FR-2 · AR-6 · UX-DR5, UX-DR18 · T-6 · **Issue:** #30 (Elisabeth)

**Akseptansekriterier:**

**Gitt** innloggingssiden
**Når** den vises
**Så** har den overskriften, ingressen og den nummererte listen fra «Faste tekster på sidene» i EXPERIENCE.md, og «Testbruker står i README.» i skjemakortet

**Gitt** en registrert konto
**Når** jeg logger inn med riktig e-post og passord
**Så** får jeg en ny tilfeldig økt-ID i en HttpOnly- og SameSite-cookie og kommer til første side etter innlogging
**Og** toppfeltet viser e-postadressen og «Logg ut»

**Gitt** ukjent e-post eller feil passord
**Når** jeg logger inn
**Så** er meldingen den samme i begge tilfeller, «Feil e-post eller passord.»
**Og** e-posten beholdes og passordet tømmes (A8)

**Gitt** at jeg ikke er innlogget
**Når** jeg åpner en side etter innlogging, også ved direkte URL
**Så** sendes jeg til innloggingssiden

**Gitt** at jeg er innlogget
**Når** jeg trykker «Logg ut» på en hvilken som helst side
**Så** slettes økten og cookien med en gang, uten bekreftelse (A7)
**Og** den gamle økt-ID-en gir ikke tilgang igjen

**Gitt** en tilstandsendrende forespørsel uten gyldig CSRF-token
**Når** den sendes
**Så** avvises den uten endring

### Story 1.5: Testbruker for sensor

Som sensor,
vil jeg logge inn med en ferdig testbruker,
slik at jeg slipper å opprette konto.

**Krav:** FR-3, NFR-7 · **Issue:** #30 (Elisabeth)

**Akseptansekriterier:**

**Gitt** en ren installasjon etter README
**Når** appen startes for første gang
**Så** finnes testbrukeren uten ekstra steg, lagret med hash
**Og** en ny oppstart lager ikke en ny testbruker

**Gitt** README
**Når** sensor leser den
**Så** står e-post og passord for testbrukeren der
**Og** passordet står ikke i kildekode som brukes i drift, bare i README og testoppsett

### Story 1.6: Arbeidsområde i økten, bare for eieren

Som bruker,
vil jeg at CV, annonse og resultater bare finnes i min økt,
slik at ingen andre ser dem og ingenting lagres permanent.

**Krav:** FR-22, FR-24, NFR-5 · AR-5, AR-6, AR-18 · T-6 · **Issue:** #35 (Elisabeth)

**Akseptansekriterier:**

**Gitt** at jeg logger inn
**Når** økten opprettes
**Så** får den ett arbeidsområde i RAM, og ingenting av det skrives til disk eller SQLite

**Gitt** at bruker A og bruker B er innlogget samtidig
**Når** A sender en direkte forespørsel mot B sine data, med hvilken som helst ID i URL eller skjema
**Så** får A bare sine egne data, fordi serveren finner arbeidsområdet fra økten

**Gitt** en side med arbeidsdata
**Når** svaret sendes
**Så** har det `Cache-Control: no-store`, og dataene står ikke i URL eller nettleserlagring

**Gitt** en fiktiv markør i CV-teksten
**Når** normal flyt, feil og utlogging kjøres i testene
**Så** finnes markøren ikke i noen logg

**Gitt** at serveren startes på nytt
**Når** jeg åpner appen
**Så** må jeg logge inn igjen, og arbeidsområdet er borte

### Story 1.7: Utløp etter 30 minutter uten aktivitet

Som bruker,
vil jeg at dataene mine slettes når jeg har vært borte i 30 minutter,
slik at de ikke blir liggende hvis jeg glemmer å logge ut.

**Krav:** FR-22, FR-23 · AR-7 · UX-DR18 · T-10 · **Issue:** #35 (Elisabeth)

**Akseptansekriterier:**

**Gitt** en injisert klokke i testene
**Når** det har gått 30 minutter siden siste aktivitet
**Så** er økten og arbeidsområdet slettet av serveren, også uten åpen fane
**Og** rydderen er en funksjon som tar klokken som parameter og kalles direkte i testene. Bakgrunnsjobben kaller bare den, og ingen test bruker `sleep`

**Gitt** en brukerutløst endring eller navigasjon via stegindikatoren 29 minutter etter forrige aktivitet
**Når** den registreres
**Så** starter fristen på nytt

**Gitt** sideoppdatering, bakgrunnsstatus, en duplisert innsending eller et ferdig modellsvar
**Når** det skjer
**Så** forlenger det ikke økten

**Gitt** en utløpt økt
**Når** jeg gjør neste forespørsel
**Så** kommer jeg til innloggingssiden med «Du ble logget ut etter 30 minutter uten aktivitet. CV, annonse, svar og tekst er slettet.»
**Og** visningen tømmes før noe annet vises, og gamle data vises aldri

### Story 1.8: Redigeringer overlever sideoppdatering

Som bruker,
vil jeg at teksten jeg har skrevet er der når jeg laster siden på nytt,
slik at jeg ikke mister arbeid.

**Krav:** FR-22 · AR-8 · UX-DR17 · T-10 · **Issue:** #35 (Elisabeth)

**Akseptansekriterier:**

**Gitt** et redigerbart felt i økten
**Når** jeg skriver
**Så** sendes endringen til serveren med en revisjon, og serveren kvitterer
**Og** «Lagrer …» og deretter «Lagret i økten» vises under feltet

**Gitt** en kvittert endring
**Når** jeg oppdaterer siden
**Så** vises den siste lagrede teksten, uten modellkall og uten at fristen forlenges

**Gitt** en eldre revisjon som kommer etter en nyere
**Når** serveren mottar den
**Så** avvises den, og den nyere teksten blir stående

**Gitt** at lagringen ikke er kvittert
**Når** jeg prøver å bytte steg
**Så** venter stegbyttet på kvitteringen
**Og** ved feil vises «Endringen er ikke lagret ennå. Vent litt før du går videre eller laster siden på nytt.», og feilen leses opp

**Gitt** en endring som er sendt, men ikke kvittert
**Når** siden lastes på nytt
**Så** samordner klienten den pågående lagringen med første innlasting, og serveren viser siste kvitterte revisjon
**Og** nettlesertesten for umiddelbar sideoppdatering (T-10) ligger i story 5.2. Flere faner er ikke et krav.

### Story 1.9: Ingen dupliserte kall og ingen sene svar

Som bruker,
vil jeg at et dobbeltklikk eller et sent svar ikke lager rot,
slik at jeg ikke betaler for ekstra kall og ikke får gamle resultater.

**Krav:** FR-23, FR-30 (vedtak 16) · AR-9, AR-10 · T-4, T-6, T-10 · **Issue:** #35 (Elisabeth)

**Akseptansekriterier:**

**Gitt** en styrt modelloppgave i testene
**Når** samme handling sendes to ganger mens den første pågår
**Så** starter bare ett modellkall, og den andre forespørselen får samme pågående operasjon

**Gitt** et gyldig resultat for uendret inndata
**Når** samme handling sendes igjen
**Så** gjenbrukes resultatet uten nytt modellkall

**Gitt** en operasjon som pågår
**Når** økten utløper, brukeren logger ut, tidsavbruddet går ut, eller inndata endres og bekreftes
**Så** blir operasjonen ugyldig, og et senere svar publiseres ikke

**Gitt** et svar som kommer tilbake
**Når** det skal publiseres
**Så** skjer det atomisk bare hvis økten er aktiv, operasjonen fortsatt pågår og revisjonene stemmer

**Gitt** en midlertidig feil
**Når** brukeren trykker «Prøv igjen»
**Så** starter høyst ett nytt kall, med en engangs-ID fra serveren
**Og** låsen holdes ikke mens modellen svarer

Mekanismen bygges her med en styrt modelloppgave. Den styrte modelloppgaven er et felles testverktøy i `tests/`, som Epic 2 og Epic 4 bruker i stedet for å lage egne. Epic 2 tar mekanismen i bruk for mock, og Epic 4 tester den mot ekte modellkall.

## Epic 2: Fra CV og annonse til gap-analyse i mock-modus

Brukeren kan legge inn CV og annonse, rette teksten, se hvilke krav CV-en dokumenterer og hvilke som mangler dokumentasjon, og svare på dem. Alt fungerer i mock-modus med testparene, uten API-nøkkel.

### Story 2.1: Modellgrensesnitt og mock-adapter

Som utvikler,
vil jeg ha ett grensesnitt for analyse og tekst med en mock-adapter som gir faste resultater for testparene,
slik at hele flyten kan bygges og testes uten språkmodell.

**Krav:** FR-26, FR-27, FR-28, NFR-8 · AR-12, AR-14 · T-1, T-3 · **Issue:** #32 (Miranda) · **Status:** i PR #48

**Akseptansekriterier:**

**Gitt** CV og annonse fra et av de fire testparene
**Når** `analyser` kalles
**Så** samsvarer kravene, statusene og sitatene med `fasit.json`, og manglende krav kommer først
**Og** resultatet har scenario-ID og fixtureversjon

**Gitt** et testpar med gap og et av de faste svarene (bekreftende, negativt, begrenset)
**Når** `lag_tekst` kalles for begge teksttyper
**Så** står svaret ordrett i teksten, med negasjon og nivå bevart
**Og** et svar som ikke er et fast demosvar, påvirker ikke teksten

**Gitt** egen tekst som ikke samsvarer med noe testpar
**Når** `analyser` eller `lag_tekst` kalles
**Så** brukes testpar 1 som eksempel, og resultatet merkes «Fiktivt eksempel fra testpar 1. Din egen tekst er ikke analysert.»

**Gitt** testene for adapteren
**Når** de kjøres
**Så** er nettverket sperret, og ingen test bruker det

**Gitt** et demosvar med annen stor/liten forbokstav eller tegnsetting på slutten
**Når** det sammenlignes med de faste svarene
**Så** gjenkjennes det likevel (fra gjennomgangen av PR #48)

### Story 2.2: Legge inn CV som tekst eller fil

Som bruker,
vil jeg lime inn CV-en eller laste den opp som TXT eller PDF, og rette teksten,
slik at analysen bygger på riktig tekst.

**Krav:** FR-4, FR-5, FR-6 · AR-11, AR-17, AR-18 · UX-DR9, UX-DR18, UX-DR20 · T-1, T-5 · **Issue:** #31 (Helle)

**Akseptansekriterier:**

**Gitt** steg 1
**Når** jeg limer inn CV-tekst eller laster opp en TXT-fil eller tekstbasert PDF
**Så** vises teksten i et redigerbart felt, og veksleren går tilbake til «Lim inn tekst»
**Og** etter en PDF vises påminnelsen om å sjekke rekkefølgen på kolonner og overskrifter

**Gitt** en fil med annet format, en korrupt eller passordbeskyttet PDF, en skannet PDF eller en fil over 2 MB
**Når** jeg laster den opp
**Så** vises riktig melding fra meldingstabellen i CV-kortet, med filnavnet
**Og** tidligere gyldig CV-tekst beholdes, og ingen teknisk feildump vises

**Gitt** en fil med feil endelse i forhold til innholdet
**Når** den lastes opp
**Så** avgjør innholdet om den kan leses, ikke endelsen

**Gitt** en TXT-fil med æ, ø og å, med og uten BOM
**Når** den leses inn
**Så** er tegnene riktige

**Gitt** en opplasting som lykkes, feiler eller avbrytes
**Når** forespørselen er ferdig
**Så** finnes ingen opplastings- eller parserfil igjen på disk

**Gitt** CV-tekst over 10 000 tegn
**Når** jeg går videre
**Så** vises grensen som feil ved feltet, og teksten kuttes ikke

### Story 2.3: Legge inn annonse og kontroll før analyse

Som bruker,
vil jeg lime inn annonsen og få beskjed hvis noe mangler,
slik at analysen ikke starter med tomme felt.

**Krav:** FR-7, FR-8 · UX-DR9, UX-DR18, UX-DR20 · T-5 · **Issue:** #31 (Helle)

**Akseptansekriterier:**

**Gitt** steg 1
**Når** jeg ser på annonsefeltet
**Så** har det hjelpeteksten «Kopier teksten fra annonsen, også stillingstittel, arbeidsgiver og kravene.»

**Gitt** tomt CV- eller annonsefelt, eller felt med bare blanktegn
**Når** jeg trykker «Analyser kravene»
**Så** vises meldingen ved feltet, feltet merkes ugyldig, og fokus flyttes til første ugyldige felt
**Og** serveren avviser det samme også uten JavaScript, og det jeg har skrevet, beholdes

**Gitt** annonse over 10 000 tegn
**Når** jeg trykker «Analyser kravene»
**Så** vises grensen som feil, og ingen analyse starter

**Gitt** at CV og annonse er fylt inn
**Når** huskelisten vises
**Så** er «CV lagt inn» og «Annonse lagt inn» hukket av

### Story 2.4: Bekrefte stillingstittel og arbeidsgiver

Som bruker,
vil jeg se og rette stillingstittel og arbeidsgiver før analysen,
slik at Supersøker aldri gjetter.

**Krav:** FR-9 · AR-11b · UX-DR10, UX-DR18 · T-9 · **Issue:** #31 (Helle)

**Akseptansekriterier:**

**Gitt** gyldig CV og annonse
**Når** jeg trykker «Analyser kravene» første gang
**Så** vises «Stilling og arbeidsgiver» under annonsen, uten modellkall
**Og** funne verdier er forhåndsutfylt, og et felt uten entydig funn er tomt med forklaring

**Gitt** at delen vises
**Når** fokus flyttes
**Så** havner det i første tomme felt, eller i tittelfeltet hvis begge er fylt

**Gitt** tom eller blank tittel eller arbeidsgiver
**Når** jeg trykker «Analyser kravene» igjen
**Så** vises «Fyll inn stillingstittelen. Vi gjetter den ikke.» eller tilsvarende for arbeidsgiveren, og analysen starter ikke

**Gitt** en tvetydig annonse (scenario fra T-9)
**Når** stillingsfeltene finnes
**Så** står feltet tomt i stedet for et gjettet svar

**Gitt** at annonsen endres før analysen
**Når** jeg trykker «Analyser kravene»
**Så** leses tittel og arbeidsgiver på nytt

### Story 2.5: Laste inn eksempel og egen tekst i mock

Som sensor,
vil jeg fylle inn testpar 1 med én knapp,
slik at jeg kan prøve flyten uten egne dokumenter.

**Krav:** FR-27, FR-28 · AR-14 · UX-DR18 · T-1 · **Issue:** #31 (Helle)

**Akseptansekriterier:**

**Gitt** mock-modus og steg 1
**Når** jeg trykker «Last inn eksempel (testpar 1)»
**Så** fylles CV og annonse med testpar 1, og «Eksempelet er lagt inn. Du kan trykke «Analyser kravene».» vises som status

**Gitt** API-modus
**Når** steg 1 vises
**Så** finnes ikke knappen

**Gitt** egen tekst i mock-modus
**Når** analysen vises
**Så** står «Teksten din er ikke analysert. Dette er et fast eksempel med fiktivt innhold.» øverst i steg 2
**Og** samme merking følger med til steg 3 og kildelisten

**Gitt** testoppsettet
**Når** README leses
**Så** står det hvordan alle fire testpar kan brukes som scenarioer

### Story 2.6: Kjøre analysen med sitatkontroll

Som bruker,
vil jeg at analysen bare vises når hvert dokumentert krav har et ekte sitat fra CV-en min,
slik at jeg kan stole på resultatet.

**Krav:** FR-10, FR-11, FR-30 (delene som gjelder mock) · AR-9, AR-10, AR-12, AR-13 · UX-DR8, UX-DR18 · T-6 · **Issue:** #33 (Miranda) · **Status:** i PR #51

**Akseptansekriterier:**

**Gitt** bekreftet CV, annonse og stillingsfelt
**Når** jeg trykker «Analyser kravene»
**Så** viser knappen «Analyserer …» og er deaktivert, og et dobbeltklikk starter ikke et nytt kall (story 1.9)

**Gitt** et analysesvar
**Når** serveren validerer det
**Så** kontrolleres struktur, statuser, krav-ID-er og at hvert sitat finnes ordrett i CV-versjonen som ble analysert
**Og** først da publiseres analysen med `stilling` og `kontraktversjon`

**Gitt** et svar med ett ugyldig eller manglende sitat
**Når** det valideres, også i mock
**Så** avvises hele analysen med «Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt.»
**Og** ingen delresultater vises eller brukes

**Gitt** uendret CV og annonse etter en analyse
**Når** analysen startes på nytt
**Så** vises «Endre CV-en eller annonsen før du analyserer på nytt.», og intet kall starter

### Story 2.7: Vise gap-analysen

Som bruker,
vil jeg se hvilke krav som mangler dokumentasjon først, og hvilke som er dokumentert med sitat,
slik at jeg vet hva jeg kan bygge på og hvor jeg bør svare.

**Krav:** FR-10, FR-12, FR-14 · UX-DR6, UX-DR7, UX-DR11–UX-DR15 · T-1, T-8, T-9 · **Issue:** #33 (Miranda)

**Akseptansekriterier:**

**Gitt** en gyldig analyse
**Når** steg 2 vises
**Så** er rekkefølgen opptelling → «Står ikke i CV-en» → «Dokumentert i CV-en» → «Vilkår fra annonsen» → teksttype
**Og** `h1` inneholder stillingstittel og arbeidsgiver, og tomme seksjoner vises ikke

**Gitt** kravene
**Når** de vises
**Så** står opptellingen som en setning, for eksempel «3 av 4 kompetansekrav er dokumentert i CV-en.», med «Dette er en oversikt over dokumentasjon, ikke en vurdering av deg.»
**Og** ingen poengsum, prosent, prikker eller brøk vises

**Gitt** et manglende krav
**Når** det vises
**Så** står det i et mangler-kort med «? Mangler dokumentasjon» og teksten om at kravet ikke står i CV-en, ikke at brukeren mangler det

**Gitt** et dokumentert krav
**Når** det vises
**Så** står det i en flis med «✓ Dokumentert» og hele sitatet ordrett

**Gitt** testpar 4
**Når** steg 2 vises
**Så** står «Alle kompetansekrav i annonsen er dokumentert i CV-en.» i stedet for opptellingen, og ingen svarfelt vises

**Gitt** en annonse uten tydelige krav, eller bare med ansettelsesvilkår (T-8, T-9)
**Når** steg 2 vises
**Så** vises PRD-meldingen for tilfellet, vilkår står i vilkår-boksen uten status eller opptelling, og begge teksttyper kan lages

**Gitt** en vellykket analyse
**Når** jeg går tilbake til steg 1
**Så** er CV, annonse, tittel og arbeidsgiver skrivebeskyttet (ikke deaktivert), med «Endre CV eller annonse» og «Til gap-analysen →»

**Gitt** mange krav og lange sitater ved 1024 px
**Når** siden vises
**Så** stables kortene og flisene fyller flere rader uten at noe skjules

### Story 2.8: Svare på krav som mangler dokumentasjon

Som bruker,
vil jeg skrive kort om erfaring CV-en ikke viser,
slik at det kan komme med i søknaden med mine egne ord.

**Krav:** FR-13, FR-22 · AR-8 · UX-DR7, UX-DR13, UX-DR17, UX-DR20 · T-3, T-4 · **Issue:** #33 (Miranda)

**Akseptansekriterier:**

**Gitt** et mangler-kort
**Når** jeg skriver i svarfeltet
**Så** har feltet etiketten «Ditt svar om <krav>», telleren «n / 1 000 tegn» og «Svar lagt til» når det har innhold
**Og** svaret lagres i økten med lagringsstatus (story 1.8)

**Gitt** et svar over 1 000 tegn
**Når** det sendes til serveren
**Så** avvises det med grensen som feil ved svaret, og teksten kuttes ikke

**Gitt** et svar
**Når** jeg går mellom stegene eller oppdaterer siden
**Så** er svaret der, og ingen modellkall starter
**Og** svaret lagres ikke på kontoen og brukes ikke i andre søknader

**Gitt** at jeg har svart
**Når** huskelisten vises
**Så** står kravet fortsatt som åpent, med «svar lagt til», og statusen i analysen endres ikke

**Gitt** mock-modus
**Når** jeg svarer på et krav i et testpar
**Så** ser jeg hvilke svar mock forstår, eller får beskjed om at svaret ikke ble brukt (fra gjennomgangen av PR #48)

**Gitt** at jeg ikke svarer på noen krav
**Når** steg 2 vises
**Så** blokkerer ingen tomme svarfelt valget av teksttype

## Epic 3: Ærlig søknadstekst

Brukeren kan velge helt søknadsutkast eller forslag til formuleringer, få en tekst som bare bygger på CV, annonse og egne svar, se hva den bygger på, redigere og kopiere den, og gå tilbake for å endre.

### Story 3.1: Velge teksttype og lage tekst

Som bruker,
vil jeg velge om jeg vil ha et helt brev eller forslag til formuleringer, og få teksten laget,
slik at jeg slipper å starte med et tomt ark.

**Krav:** FR-15, FR-16, FR-17, FR-18 · AR-9, AR-10, AR-12 · UX-DR8, UX-DR15, UX-DR16 · T-1, T-3 · **Issue:** #34 (Helle)

**Akseptansekriterier:**

**Gitt** steg 2 med en gyldig analyse
**Når** jeg ser valget av teksttype
**Så** er det en radiogruppe med ledeteksten «Hva slags tekst vil du ha?», og «Helt søknadsutkast» er forhåndsvalgt
**Og** valget kan gjøres med piltastene

**Gitt** et valg av teksttype
**Når** jeg trykker «Lag tekst»
**Så** viser knappen «Lager tekst …» og er deaktivert, og et dobbeltklikk starter ikke et nytt kall (story 1.9)
**Og** steg 3 vises med fokus på `h1` når teksten er klar

**Gitt** «Helt søknadsutkast» med et testpar
**Når** teksten vises
**Så** er den et sammenhengende brev på bokmål med riktig stillingstittel, arbeidsgiver og minst ett eksempel fra CV-en
**Og** brevet er signert med navnet fra CV-en, eller «Vennlig hilsen [ditt navn]» hvis CV-en ikke har navn

**Gitt** «Forslag til formuleringer» med samme testpar
**Når** teksten vises
**Så** er den en liste med ett punkt per linje og «- » foran, med samme faktagrunnlag som brevet

**Gitt** et manglende krav uten svar
**Når** teksten lages
**Så** nevnes ikke kravet i teksten, og teksten påstår aldri at kravet er oppfylt (FR-18)

**Gitt** svarene «Jeg har ikke førerkort» og «Jeg øvelseskjører til klasse B» i testpar 1
**Når** teksten lages i mock
**Så** står svaret med negasjonen og nivået bevart, og ingen nye kvalifikasjoner er lagt til

**Gitt** et tekstsvar med feil struktur eller feil teksttype
**Når** serveren validerer det
**Så** vises «Teksten kunne ikke brukes. Svarene dine er beholdt. Du kan prøve igjen.»

### Story 3.2: «Teksten bygger på» og veiledning

Som bruker,
vil jeg se hva teksten bygger på, og få råd som ikke blandes inn i teksten,
slik at jeg kan sjekke at ingenting er funnet på.

**Krav:** FR-17, FR-19 · AR-12 · UX-DR6, UX-DR16 · T-3 · **Issue:** #34 (Helle)

**Akseptansekriterier:**

**Gitt** en laget tekst
**Når** steg 3 vises
**Så** viser kildelisten «Teksten bygger på» stillingstittel, arbeidsgiver, hvert CV-sitat og hvert svar
**Og** listen er merket «Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.»

**Gitt** et svar fra brukeren
**Når** det står i kildelisten
**Så** er det merket «Oppgitt av deg. Supersøker har ikke kontrollert det.», uten påstand om at svaret er brukt eller bekreftet

**Gitt** et manglende krav
**Når** kildelisten vises
**Så** står det om kravet er besvart eller ikke nevnt i teksten

**Gitt** kildegrunnlaget
**Når** det lages
**Så** bygges det av serveren fra den godkjente analysen og de faktiske svarene, ikke fra modellens svar

**Gitt** et krav som er utelatt
**Når** steg 3 vises
**Så** står veiledningen i en egen melding merket «Veiledning – ikke del av søknaden», utenfor brevarket

### Story 3.3: Redigere og kopiere teksten

Som bruker,
vil jeg redigere teksten og kopiere den med ett trykk,
slik at jeg kan bruke den i søknaden min.

**Krav:** FR-20, FR-22 · AR-8 · UX-DR7, UX-DR16, UX-DR17, UX-DR18 · T-1, T-10 · **Issue:** #34 (Helle)

**Akseptansekriterier:**

**Gitt** steg 3
**Når** teksten vises
**Så** står den i ett redigerbart felt med etiketten «Søknadsbrev» eller «Forslag til formuleringer»
**Og** under står «Teksten tas vare på mens du er innlogget, og slettes når du logger ut.»

**Gitt** at jeg redigerer teksten
**Når** jeg skriver
**Så** lagres endringen i økten med lagringsstatus, og teksten merkes som egenredigert (story 1.8)

**Gitt** at jeg trykker «Kopier tekst»
**Når** nettleseren tillater det
**Så** kopieres bare innholdet i arket, uten veiledning
**Og** «Kopiert. Lim inn teksten der du skriver søknaden.» vises ved teksten, og «Kopier teksten» hakes av i huskelisten

**Gitt** at nettleseren ikke tillater kopiering
**Når** jeg trykker «Kopier tekst»
**Så** markeres teksten, og «Nettleseren tillot ikke kopiering. Teksten er markert – trykk Ctrl+C.» vises
**Og** kopiering, også når den ikke tillates, kontrolleres i nettlesertesten (story 5.2)

**Gitt** at teksten endres etter kopiering
**Når** huskelisten vises
**Så** er «Kopier teksten» åpen igjen (A15)

### Story 3.4: Endre svar eller teksttype

Som bruker,
vil jeg gå tilbake og endre svarene eller teksttypen uten å miste teksten jeg har redigert,
slik at jeg bestemmer selv når den erstattes.

**Krav:** FR-13, FR-21 · AR-9, AR-10 · UX-DR19 · T-4 · **Issue:** #34 (Helle)

**Akseptansekriterier:**

**Gitt** steg 3
**Når** jeg trykker «← Endre svar eller tekstvalg» eller bruker stegindikatoren
**Så** kommer jeg til steg 2 med svar og valg beholdt, og ingen modellkall starter

**Gitt** endret svar eller teksttype
**Når** jeg kommer tilbake til steg 3 uten å trykke «Lag tekst»
**Så** vises «Teksten ble laget før du endret svar eller tekstvalg. Gå til steg 2 og trykk «Lag tekst» for å oppdatere den.»

**Gitt** egenredigert tekst og endret svar eller teksttype
**Når** jeg trykker «Lag tekst»
**Så** åpnes dialogen «Erstatt teksten» med fokus på «Behold teksten»
**Og** «Behold teksten» eller Escape lar meg bli på steg 2 uten endring, og fokus går tilbake til knappen

**Gitt** at jeg velger «Lag ny tekst»
**Når** genereringen lykkes
**Så** erstattes teksten
**Og** hvis genereringen mislykkes, beholdes den gamle teksten med mine endringer

**Gitt** uendret svar og teksttype og en eksisterende tekst
**Når** jeg trykker «Lag tekst»
**Så** går jeg til den eksisterende teksten uten nytt kall

### Story 3.5: Endre CV eller annonse etter analysen

Som bruker,
vil jeg kunne endre CV-en eller annonsen etter analysen, med varsel om hva som forkastes,
slik at jeg ikke mister arbeid ved et uhell.

**Krav:** FR-21, FR-30 · AR-9 · UX-DR11, UX-DR19 · T-4 · **Issue:** #35 (Elisabeth). Flyttet fra #34 2026-11-26, fordi den bygger på revisjonene i story 1.9 og jevner ut fordelingen. Bekreftes av Helle i PR #45.

**Akseptansekriterier:**

**Gitt** en analyse
**Når** jeg trykker «Endre CV eller annonse» i steg 1 eller steg 2
**Så** åpnes dialogen med «Svarene, gap-analysen og teksten, også det du har redigert, forkastes.» og fokus på «Avbryt»

**Gitt** dialogen
**Når** jeg velger «Avbryt» eller trykker Escape
**Så** endres ingenting

**Gitt** dialogen
**Når** jeg velger «Forkast og endre»
**Så** forkastes analyse, svar og tekst i samme operasjon, og CV og annonse kan redigeres
**Og** en pågående operasjon blir ugyldig, slik at et sent svar ikke gjenoppretter noe (story 1.9)

**Gitt** at jeg har forkastet, men ikke endret CV eller annonse
**Når** jeg trykker «Analyser kravene»
**Så** vises «Endre CV-en eller annonsen før du analyserer på nytt.», og intet kall starter

**Gitt** at den nye analysen feiler
**Når** feilen vises
**Så** er de forkastede dataene fortsatt borte, og CV og annonse er beholdt

## Epic 4: Ekte språkmodell, trygt og innenfor budsjettet

Den som kjører appen, kan slå på API-modus. Brukeren varsles før data sendes ut, feil fra modellen håndteres forståelig, og budsjettet på 100 kr kan ikke overskrides.

### Story 4.1: API-adapter bak samme grensesnitt

Som den som kjører appen,
vil jeg slå på en ekte språkmodell i konfigurasjonen uten at resten av appen endres,
slik at mock og API oppfører seg likt.

**Krav:** FR-29, NFR-4, NFR-5 · AR-12, AR-13, AR-15, AR-17, AR-18 · T-5, T-6 · **Issue:** #36 (Miranda)

**Akseptansekriterier:**

**Gitt** `SUPERSOKER_MODE=api` og en nøkkel i `.env`
**Når** appen startes
**Så** brukes API-adapteren, som har samme `analyser` og `lag_tekst` som mock-adapteren
**Og** API-modus brukes aldri uten at den er valgt og nøkkelen er satt

**Gitt** et kall til modellen
**Når** forespørselen bygges
**Så** sendes bare nødvendig arbeidsgrunnlag, uten modellverktøy eller tilgang til URL-er
**Og** grensene for fil, CV, annonse, svar, samlet inndata og utdata er kontrollert før kallet, og brudd meldes ved feltet uten kall

**Gitt** modellens svar
**Når** det kommer tilbake
**Så** oversettes det til de interne typene og valideres med samme kontroll som i mock (story 2.6, 3.1)

**Gitt** en styrt transport i testene
**Når** et kall feiler
**Så** gjør verken adapteren, SDK-et eller transporten noe automatisk nytt forsøk

**Gitt** en fiktiv markør i CV og svar
**Når** kall, feil og tidsavbrudd kjøres i testene
**Så** finnes markøren ikke i noen logg, og nøkkelen vises aldri

### Story 4.2: Varsel før data sendes til leverandøren

Som bruker,
vil jeg vite hva som sendes og til hvem før noe forlater maskinen,
slik at jeg kan velge å la være.

**Krav:** FR-25 · UX-DR19 · T-6 · **Issue:** #36 (Miranda)

**Akseptansekriterier:**

**Gitt** API-modus og første modellkall i økten
**Når** jeg trykker «Analyser kravene»
**Så** åpnes dialogen «CV-teksten, annonsen og svarene dine sendes til OpenAI, en ekstern leverandør.» med fokus på «Avbryt»
**Og** ingenting sendes før jeg har valgt «Send og analyser»

**Gitt** dialogen
**Når** jeg velger «Avbryt» eller trykker Escape
**Så** sendes ingenting og ingenting endres, og varselet kommer igjen ved neste forsøk

**Gitt** at jeg har bekreftet
**Når** jeg gjør nye kall i samme økt
**Så** vises ikke varselet igjen
**Og** etter utlogging og ny innlogging vises det på nytt

**Gitt** mock-modus
**Når** jeg analyserer
**Så** vises aldri varselet

### Story 4.3: Feil fra språkmodellen

Som bruker,
vil jeg få en forståelig melding når modellen ikke svarer eller svarer feil,
slik at jeg vet hva jeg kan gjøre og ikke mister det jeg har skrevet.

**Krav:** FR-30 · AR-9, AR-10, AR-15 · UX-DR18 · T-6, T-10 · **Issue:** #36 (Miranda)

**Akseptansekriterier:**

**Gitt** en styrt transport som svarer etter 30 sekunder
**Når** kallet går ut på tid
**Så** vises «Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» over handlingslinjen, og fokus går til meldingen
**Og** et svar like før grensen brukes, mens et svar etter grensen ikke publiseres

**Gitt** en midlertidig feil
**Når** jeg trykker «Prøv igjen»
**Så** starter høyst ett nytt kall, og et nytt trykk mens det pågår starter ikke et til

**Gitt** manglende eller ugyldig nøkkel eller ugyldig oppsett
**Når** et kall forsøkes
**Så** vises «Språkmodellen er ikke satt opp riktig. Den som kjører appen, må rette API-nøkkelen eller konfigurasjonen. Inndataene dine er beholdt.» uten «Prøv igjen»
**Og** appen bytter aldri stilltiende til mock

**Gitt** dupliserte innsendinger og sene svar mot den styrte transporten
**Når** de testes som i story 1.9
**Så** telles nøyaktig ett transportforsøk per handling, og sene svar publiseres ikke

**Gitt** alle feiltilfeller
**Når** meldingen vises
**Så** er inndata og gyldige svar beholdt, og ingen halvferdige resultater vises

### Story 4.4: Budsjettsperre før hvert betalt kall

Som gruppe,
vil vi at betalte kall sperres automatisk når budsjettet ikke dekker dem,
slik at vi aldri bruker mer enn 100 kr til sammen.

**Krav:** NFR-6, FR-30 · AR-16, AR-17 · UX-DR18 · T-6 · **Issue:** #36 (Miranda)

Storyen har to deler. **Koden** er en terminalkommando som tildeler et beløp, en reservasjon før hvert kall og en prosesslås, testet automatisk. **Prosedyren** gjør Miranda for hånd og dokumenterer i testrapporten.

**Akseptansekriterier, kode:**

**Gitt** API-modus og en nøkkel
**Når** appen startes
**Så** er betalte kall sperret til den ansvarlige har tildelt et beløp fra terminalen
**Og** ingen nettleserrute og ingen miljøfil kan tildele budsjett, og en gammel tildeling gjelder ikke etter omstart

**Gitt** en tildeling
**Når** et kall skal sendes
**Så** reserveres maksimal kostnad i hele øre før utsending, beregnet med hele forespørselen, utdatagrensen og konservativ pris og kurs, rundet opp

**Gitt** ukjent kostnad, ukjent restbeløp eller en reservasjon som ikke får plass
**Når** et kall forsøkes
**Så** avvises det uten utsending med «Kostnadsgrensen er nådd. Den som kjører appen, må åpne for nye kall. Inndataene dine er beholdt.»

**Gitt** tidsavbrudd eller ukjent fakturering
**Når** kallet avsluttes
**Så** beholdes hele reservasjonen, og bare dokumentert ubrukt beløp frigjøres

**Gitt** to betalende prosesser på samme maskin
**Når** den andre startes
**Så** hindrer en prosesslås at begge kan sende betalte kall

**Gitt** en simulert leverandør
**Når** budsjettestene kjøres
**Så** er samtidige reservasjoner nær grensen, eksakt restbeløp og ett øre over, ukjent kostnad, krasj og omstart testet før første betalte kall

**Akseptansekriterier, prosedyre (Miranda, for hånd):**

**Gitt** første betalte kjøring
**Når** den forberedes
**Så** er modell-ID, pris, fakturerbare tokenkategorier og kurs kontrollert, og beløpet som tildeles står i Teams-oversikten

**Gitt** stans, krasj eller bytte av maskin
**Når** neste kjøring skal starte
**Så** er forbruket avstemt mot leverandøren i Teams-oversikten, nøkkelen er trukket tilbake fra den gamle prosessen, og ny tildeling gis først etterpå

### Story 4.5: Ekte modell mot fasit, med testrapport

Som gruppe,
vil vi kjøre testparene mot den ekte modellen og registrere resultatene,
slik at vi kan vise at analysen og teksten holder mål, og hva det kostet.

**Krav:** NFR-6, NFR-8, FR-10–FR-18 · AR-16 · T-2, T-3 · **Issue:** #38 (Miranda)

**Akseptansekriterier:**

**Gitt** at story 4.4 er verifisert med simulert leverandør
**Når** testparene kjøres mot ekte modell
**Så** kontrolleres hver runde mot fasiten og brevsjekklisten i PRD §8, med analyse og begge teksttyper per par
**Og** målet er fire av fire testpar i tre påfølgende runder, med reserveregelen etter tre serier

**Gitt** en runde
**Når** den registreres
**Så** står dato, modell-ID, app-, prompt- og testparversjon, resultat og avvik i testrapporten
**Og** en endret prompt starter en ny serie

**Gitt** et ordrett, men irrelevant sitat, eller en feilaktig kvalifikasjonspåstand
**Når** runden vurderes
**Så** feiler runden, og feilaktige påstander godtas aldri

**Gitt** de betalte kjøringene
**Når** testrapporten er ferdig
**Så** oppsummerer den avstemte kostnader med dato, antall kall og beløp i NOK fra Teams-oversikten, og samlet forbruk er høyst 100 kr
**Og** rapporten inneholder ingen CV-tekst, svar eller modellsvar ut over det som trengs for å vise avvik med fiktive data

## Epic 5: Klar for sensor

En person som ikke kjenner prosjektet, kan installere appen etter README og prøve hele kjerneflyten med testbrukeren og testparene. Flyten er kontrollert med tastatur og ved 1024 og 1440 px.

### Story 5.1: Automatiske tester av kjerneflyten i mock

Som gruppe,
vil vi teste hele kjerneflyten automatisk i mock-modus,
slik at vi ser med en gang hvis en endring ødelegger noe.

**Krav:** NFR-8, FR-4–FR-8, FR-14–FR-17, FR-20–FR-22, FR-26–FR-28 · AR-19 · T-1, T-4, T-10 · **Issue:** #37 (felles, Helle leder)

**Akseptansekriterier:**

**Gitt** de fire testparene
**Når** `uv run pytest` kjøres
**Så** testes hvert testpar med innliming, TXT og tekstbasert PDF og begge teksttyper (24 kombinasjoner), fra innlogging til teksten i steg 3. Kopieringen testes i story 5.2
**Og** PDF-variantene av testparene finnes i testdataene (#29)

**Gitt** kjerneflyten
**Når** testene teller modellkall
**Så** starter navigasjon og sideoppdatering ingen kall, og uendret inndata gir ingen ny analyse eller tekst

**Gitt** testene
**Når** de kjøres på en ren maskin etter README
**Så** krever de verken nøkkel, nettverk eller nettlesere, og alle består

**Gitt** en testkjøring av kjerneflyten
**Når** den er ferdig
**Så** står dato, commit og resultat under «Testkjøringer» i testrapporten

### Story 5.2: Nettlesertest av kjerneflyten

Som gruppe,
vil vi kjøre kjerneflyten i en ekte nettleser mot lokal mock,
slik at fokus, kopiering og sideoppdatering er testet slik brukeren opplever dem.

**Krav:** FR-20, FR-22, NFR-1 · AR-20 · T-7, T-10 · **Issue:** #37 (felles)

**Akseptansekriterier:**

**Gitt** en egen kommando for nettlesertester, beskrevet i README
**Når** den kjøres
**Så** gjennomføres flyten med testpar 1 fra innlogging til kopiert tekst i en ekte nettleser
**Og** `uv run pytest` virker fortsatt uten at nettlesere er installert

**Gitt** en redigering som ikke er kvittert ennå
**Når** siden oppdateres med en gang
**Så** vises siste redigering (T-10)

**Gitt** stegbytte og feil
**Når** testen sjekker fokus
**Så** står fokus på `h1` etter stegbytte og på første ugyldige felt etter feil

### Story 5.3: Manuell kontroll av tilgjengelighet og bredder

Som bruker som navigerer med tastatur eller skjermleser,
vil jeg kunne gjennomføre hele flyten,
slik at appen kan brukes av flere enn de som bruker mus.

**Krav:** NFR-1, NFR-2, NFR-3 · UX-DR18, UX-DR20, UX-DR21 · T-7 · **Issue:** #37 (felles, Helle leder)

**Akseptansekriterier:**

**Gitt** en sjekkliste i testrapporten
**Når** kjerneflyten gjennomføres bare med tastatur
**Så** kan alle steg, dialoger og knapper nås og brukes, og fokus er alltid synlig

**Gitt** en skjermleser
**Når** feil, status og stegbytte skjer
**Så** leses feil og status opp, tegntelleren bare ved 90 % og over grensen, og lagringsstatus bare ved feil

**Gitt** nettleservinduer på 1024 og 1440 px
**Når** sidene vises med lange kravtitler, sitater og filnavn
**Så** overlapper ingenting, og under 1024 px kan siden rulles sidelengs uten at noe forsvinner

**Gitt** alle meldinger og tomtilstander
**Når** de vises
**Så** er de på bokmål, står ordrett som i meldingstabellen og sier hva brukeren kan gjøre
**Og** status vises aldri bare med farge

**Gitt** kontrollen
**Når** den er ferdig
**Så** står dato, ansvarlig, nettleser, skjermleser, funn og rettinger i testrapporten

### Story 5.4: Komplett README

Som sensor,
vil jeg kunne installere, starte, logge inn og teste appen bare ved å følge README,
slik at jeg kan vurdere den innen 15–20 minutter.

**Krav:** NFR-7, FR-3, FR-27 · AR-5, AR-19, AR-20 · **Issue:** #39 (Elisabeth)

**Akseptansekriterier:**

**Gitt** README
**Når** den leses
**Så** beskriver den hva appen gjør og for hvem, med minst ett skjermbilde av kjerneflyten, og forutsetningene med versjoner
**Og** installasjon, oppstart, testbruker, testscenarioer, testkommandoer og nettlesertester har eksakte, kopierbare kommandoer

**Gitt** README
**Når** begrensningene leses
**Så** står det at en omstart av serveren logger alle ut, at økten utløper etter 30 minutter uten aktivitet, og at appen bare støtter datamaskin

**Gitt** mappetabellen
**Når** den leses
**Så** stemmer den med koden, og det står at testparene i `tests/fixtures/` også er appdata (FR-27)
**Og** det lenkes til PRD, arkitektur, UX-spesifikasjon, epics og prosessdokumentasjonen

**Gitt** API-modus
**Når** README leses
**Så** forklarer den miljøvariablene, at mock er standard, og at betalte kall er sperret til budsjettet er tildelt

### Story 5.5: Installasjonstest på en annen PC

Som gruppe,
vil vi at en annen person installerer appen på en annen PC bare med README,
slik at vi vet at sensor får den til å kjøre.

**Krav:** NFR-7 · T-7 · **Issue:** #40 (Helle)

**Akseptansekriterier:**

**Gitt** en PC uten utviklerens oppsett, API-nøkkel eller hjelp
**Når** en annen person følger README fra start
**Så** starter appen i mock-modus, og hele kjerneflyten kan gjennomføres med testbrukeren og testpar 1

**Gitt** testen
**Når** den registreres
**Så** står dato, testansvarlig, operativsystem, versjoner, commit, kommandoer, tidsbruk, avvik og resultat i testrapporten

**Gitt** et avvik
**Når** det er funnet
**Så** rettes README, og de berørte stegene gjentas og registreres

### Story 5.6: Sluttsjekk mot sensorveiledningen

Som gruppe,
vil vi sjekke repoet mot sensorveiledningen før fristen,
slik at ingenting trekker ned unødvendig.

**Krav:** NFR-4, NFR-5, NFR-7 · **Issue:** #42 (felles)

**Akseptansekriterier:**

**Gitt** repoet og historikken
**Når** de sjekkes
**Så** finnes ingen API-nøkler, passord eller `.env`, verken i siste commit eller i historikken
**Og** `.gitignore` holder ute `.venv`, databasefiler, byggeartefakter og lokale filer, og rotmappen har ingen løse filer

**Gitt** FR-1–FR-30
**Når** de krysses av i en sjekkliste
**Så** har hver FR en story som er ferdig med koblet PR, eller står som utsatt i PRD §7.2 med begrunnelse

**Gitt** PRD, arkitektur, UX-spesifikasjon og epics
**Når** status og dato sjekkes
**Så** stemmer de med siste endring, og avvik fra planen er beskrevet i dokumentet de gjelder

**Gitt** alle stories
**Når** sluttsjekken gjøres
**Så** er hver story ferdig med koblet PR eller beskrevet som utsatt med begrunnelse

**Gitt** siste commit før fristen 15.12.2026
**Når** testene kjøres etter README
**Så** består de
