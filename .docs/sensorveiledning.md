# Sensorveiledning – Del 1 (IBE160, høst 2026)

> Kilde: foreleserens sensorveiledning (PDF). Del 1 «Prosjektkode og funksjonalitet» teller **70 %** av samlet karakter. Refleksjonsrapporten (del 2) teller 30 %.

Del 1 vurderer applikasjonen og repoet som helhet: hva gruppen har laget, hvordan det er laget, og om andre kan forstå, kjøre og videreutvikle det. Emnet handler om å **styre KI-assistert utvikling**, så sporene av prosessen (planlegging, prompts, iterasjoner, kvalitetssikring, beslutninger) vurderes like mye som sluttproduktet. Kravene ses i forhold til oppgaven og valgt ambisjonsnivå.

## Kriterier og vekting

| Nr | Kriterium | Kort beskrivelse | Vekt |
|---|---|---|---|
| 1 | Prosess og KI-styring | Sporbar vei fra plan til kode: commits, prompts, iterasjoner, beslutninger | 30 % |
| 2 | Funksjonalitet og omfang | Hva appen gjør, sett mot proposal og valgt oppgave | 20 % |
| 3 | Kvalitetssikring og testing | Tester, kodegjennomgang, retting av KI-generert kode | 15 % |
| 4 | Design og brukeropplevelse | Visuelt uttrykk, konsistens, brukervennlighet, tilgjengelighet | 10 % |
| 5 | Kodekvalitet og arkitektur | Lesbar, strukturert og sammenhengende kode | 10 % |
| 6 | README og kjørbarhet | Tydelig beskrivelse av installasjon og kjøring | 10 % |
| 7 | Ryddighet i repoet | Struktur, riktige filer, ingen hemmeligheter eller byggeartefakter | 5 % |

Kriterium 1, 6 og 7 (prosess og etterprøvbarhet) = 45 %. Kriterium 2–5 (produktet) = 55 %.

## Slik vurderer sensor

1. Leser godkjent proposal og product brief – hva gruppen har lovet.
2. Kloner repoet og sjekker ut **siste commit før fristen**. Senere endringer ignoreres.
3. Installerer og starter appen på en ren maskin **kun etter README.md**, og noterer steg som mangler, er uklare eller feiler.
4. Tester kjerneflytene fra proposal og README, også feil input og uventet bruk.
5. Vurderer design, gjerne på ulike skjermstørrelser.
6. Går gjennom historikken (`git log`, GitHub Insights): fordeling over tid, commit-meldinger, branches, PR-er, issues.
7. Leser prosessdokumentasjonen (BMAD-dokumenter, prompts/KI-økter, beslutninger, kvalitetssikring) og sjekker at den henger sammen med koden.
8. Kjører testene slik README beskriver, og vurderer hva de faktisk tester.
9. Stikkprøver sentral kode for struktur og lesbarhet.

Sensor bruker inntil ca. **15–20 minutter** på å få appen til å kjøre. Det en vanlig bruker ikke kan løse med README, regnes som mangel ved README. Kjører ikke appen, vurderes funksjonalitet ut fra kode, tester, skjermbilder og video – men det trekker tydelig ned på kriterium 6 og begrenser kriterium 2.

## Kriteriene i detalj

### 1. Prosess og KI-styring (30 %)
Viser repoet en realistisk, iterativ prosess der gruppen har styrt KI bevisst – fra krav og plan, via implementering, til testing og forbedring?

Sensor ser etter:
- **Planlegging:** BMAD-dokumenter (product brief, PRD, arkitektur, epics, stories) som faktisk brukes og **oppdateres**, ikke genereres én gang.
- **Sammenheng plan–kode:** funksjoner kan spores til krav/stories; avvik fra planen er forklart.
- **Commit-historikk:** jevn utvikling over tid; små, avgrensede commits med beskrivende meldinger.
- **Arbeidsflyt:** branches, pull requests, issues eller tilsvarende.
- **Sporbar KI-bruk:** lagrede prompts og KI-økter, med eksempler på at gruppen har presisert krav, avvist, rettet eller forbedret KI-forslag.
- **Beslutninger:** dokumenterte valg av teknologi, arkitektur og løsninger, med begrunnelse.
- **Samarbeid:** historikken viser gruppearbeid over tid (ujevn commit-statistikk alene gir ikke trekk – par-/mobprogrammering er vanlig).

| Nivå | Kjennetegn |
|---|---|
| A–B | Prosessen kan følges tydelig fra plan til ferdig app. Jevn, iterativ historikk. Prompts og beslutninger er dokumentert og koblet til konkrete endringer. Flere tydelige eksempler på kritisk vurdering og korrigering av KI. |
| C | I hovedsak sporbar. Planer og prompts finnes, men koblingen til koden er delvis implisitt. Noen store eller lite beskrivende commits. |
| D–E | Delvis synlig. Planer fremstår generert én gang og ikke brukt videre. Få prompts lagret; historikk konsentrert til få perioder/store commits. |
| F | Ingen troverdig prosess: mangler planlegging og prompts, eller historikken er i praksis én eller noen få opplastinger. |

### 2. Funksjonalitet og omfang (20 %)
Hva appen faktisk gjør og hvor godt den løser problemet i proposal, sett mot ambisjonsnivået.

Sensor ser etter:
- Kjerneflytene fra proposal og README fungerer fra start til slutt.
- Omfang og kompleksitet (f.eks. datalagring, flere brukerroller, integrasjoner, ikke-trivielle regler).
- Stabilitet: tåler vanlig bruk, feil input og gjentatte handlinger uten å krasje.
- Det som er utelatt eller endret fra proposal, er beskrevet og begrunnet.

| Nivå | Kjennetegn |
|---|---|
| A–B | Komplett og stabil kjernefunksjonalitet; omfang svarer til eller overgår proposal. |
| C | Viktigste funksjoner virker, noen ufullstendige eller med feil i mindre vanlige tilfeller. |
| D–E | Virker delvis; sentrale funksjoner mangler/feiler, eller omfanget er klart mindre enn proposal uten god begrunnelse. |
| F | Fungerer ikke, eller gjør så lite at oppgaven ikke er løst. |

### 3. Kvalitetssikring og testing (15 %)
Hvordan gruppen har kontrollert at KI-generert kode gjør det den skal, og hvordan feil er funnet og rettet.

Sensor ser etter:
- Automatiserte tester (enhet, integrasjon, ende-til-ende) som kan kjøres etter README og tester meningsfull logikk.
- Dokumenterte manuelle tester/testplaner der automatiske tester ikke passer.
- Spor av kodegjennomgang: kommentarer i PR-er, beskrivelser av feil funnet i KI-generert kode og hvordan de ble rettet.
- Grunnleggende feilhåndtering, inputvalidering og sikkerhetsbevissthet (ingen hemmeligheter i koden).

| Nivå | Kjennetegn |
|---|---|
| A–B | Relevante tester som kjører uten feil og dekker sentral logikk. Systematisk, dokumentert QA med konkrete eksempler på feil som ble avdekket og rettet. |
| C | Tester og noe dokumentert QA, men ujevn dekning eller overfladiske tester. |
| D–E | Lite testing; få, feilende eller trivielle tester; QA knapt dokumentert. |
| F | Ingen spor av testing eller kvalitetssikring av KI-generert kode. |

### 4. Design og brukeropplevelse (10 %)
Er appen gjennomtenkt utformet for brukerne? Omfatter visuelt uttrykk og hvor lett appen er å forstå og bruke (tilpasses apptypen – f.eks. CLI vurderes ut fra tydelige meldinger og strukturert utdata).

Sensor ser etter:
- Helhetlig, konsistent visuelt uttrykk (farger, typografi, avstand, komponenter).
- Tydelig navigasjon og informasjonsstruktur.
- Forståelige tilbakemeldinger, feilmeldinger og tomtilstander.
- Grunnleggende universell utforming: kontrast, tastaturnavigasjon, alternativtekst, skjemaetiketter.
- Tilpasning til relevante skjermstørrelser.
- Spor av designarbeid i prosessen (skisser, wireframes, UX-beskrivelser i planleggingsdokumentene).

| Nivå | Kjennetegn |
|---|---|
| A–B | Gjennomarbeidet, konsistent og intuitiv; bevisste designvalg tilpasset målgruppen; tilgjengelighet ivaretatt. |
| C | Ryddig og brukbar, men noen inkonsistenser/uklarheter i flyt og tilbakemeldinger. |
| D–E | Fungerer, men lite gjennomtenkt: uoversiktlig, inkonsistent eller vanskelig uten forklaring. |
| F | Så uoversiktlig eller ufullstendig at appen ikke kan brukes som tiltenkt. |

### 5. Kodekvalitet og arkitektur (10 %)
Er koden forståelig og vedlikeholdbar? Gruppen har ansvar for at KI-generert kode utgjør en sammenhengende, ryddig helhet.

Sensor ser etter:
- Mappe- og modulstruktur som samsvarer med beskrevet arkitektur.
- Lesbar kode, beskrivende navn, kommentarer der det trengs.
- Lite duplisering, død kode og utkommenterte rester fra tidligere KI-forsøk.
- Konsekvent stil, gjerne med linter/formatterer.
- Fornuftig håndtering av konfigurasjon og avhengigheter.

| Nivå | Kjennetegn |
|---|---|
| A–B | Godt strukturert, lesbar og konsekvent; tydelig arkitektur som samsvarer med dokumentasjonen. |
| C | I hovedsak ryddig, med noe duplisering, uklare navn eller deler som ikke passer inn. |
| D–E | Vanskelig å følge; mye duplisering, død kode eller uklar struktur. |
| F | Så uoversiktlig/ufullstendig at den ikke er en sammenhengende løsning. |

### 6. README og kjørbarhet (10 %)
Kan en person som ikke kjenner prosjektet forstå hva appen gjør og få den til å kjøre **kun ved å følge README**?

Sensor ser etter:
- Kort beskrivelse av hva appen gjør og for hvem, gjerne med skjermbilde.
- Forutsetninger med versjoner (Node.js, Python, database osv.).
- Steg-for-steg installasjon og oppstart med eksakte, kopierbare kommandoer.
- Konfigurasjon: nødvendige miljøvariabler, med eksempelfil (f.eks. `.env.example`) uten ekte hemmeligheter.
- Testdata/testbrukere ved behov, og hvordan testene kjøres.
- Oversikt over mappestrukturen og lenker til planleggings- og prosessdokumentasjon.
- Tilpasset og oppdatert – ikke uendret mal eller generert tekst som ikke stemmer med koden.

| Nivå | Kjennetegn |
|---|---|
| A–B | Appen kjører ved å følge README uten avvik; README er tydelig, komplett og oppdatert. |
| C | Kjører etter README, med små hull en erfaren bruker kan løse selv. |
| D–E | Mangelfull eller delvis feil; betydelig innsats for å få appen til å kjøre. |
| F | README mangler, eller appen kan ikke kjøres ut fra beskrivelsen. |

### 7. Ryddighet i repoet (5 %)
Er repoet organisert så andre finner frem, og inneholder det bare filer som hører hjemme der?

Sensor ser etter:
- Oversiktlig struktur med tydelig skille mellom kode, dokumentasjon og ressurser.
- `.gitignore` som holder byggeartefakter, avhengigheter (`node_modules`, `venv`) og lokale filer ute.
- Ingen hemmeligheter i repoet **eller historikken** (API-nøkler, passord, `.env`).
- Ingen løse testfiler, sikkerhetskopier, gamle versjoner eller tilfeldige filer i rotmappen.
- Fornuftige fil- og mappenavn.

| Nivå | Kjennetegn |
|---|---|
| A–B | Ryddig og logisk; kun relevante filer versjonert; ingen hemmeligheter. |
| C | I hovedsak ryddig, med enkelte overflødige filer eller noe uklar struktur. |
| D–E | Rotete: mange overflødige filer, byggeartefakter/avhengigheter, uklar struktur. |
| F | Svært uoversiktlig, eller inneholder ekte hemmeligheter som ikke er håndtert. |

## Typiske varseltegn
- Hele/nesten hele koden lagt inn i én eller få commits rett før fristen.
- Planleggingsdokumentene beskriver en annen app enn den som er levert, eller er tydelig generert i etterkant.
- README er uendret mal, eller kommandoene virker ikke.
- API-nøkler, passord eller `.env`-filer er committet.
- `node_modules`, `venv`, build-mapper eller store binærfiler i repoet.
- Testene feiler eller tester bare trivielle ting.
- Mye død kode, dupliserte filer eller rester fra forkastede KI-forsøk.
- Dokumentasjonen av KI-bruk er generell og kan ikke knyttes til konkrete endringer.

## Delkarakter
Bokstav per kriterium → tall (A=5, B=4, C=3, D=2, E=1, F=0) × vekt, summert.
Terskler: **A ≥ 4,5 · B ≥ 3,5 · C ≥ 2,5 · D ≥ 1,5 · E ≥ 0,5 · F < 0,5.**

Eksempel: (B, C, C, A, C, B, D) → 0,30·4 + 0,20·3 + 0,15·3 + 0,10·5 + 0,10·3 + 0,10·4 + 0,05·2 = 3,55 → **B**.

Sensor kan avvike fra beregnet karakter ut fra helhetsinntrykk, med kort begrunnelse.
