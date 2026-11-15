# Refleksjonsrapport – Programmering med KI

**Prosjekt:** Supersøker – KI-assistent for CV og jobbsøknader  
**Emne:** IBE160 – Programmering med KI, Høgskolen i Molde  
**Gruppe:** G66  
**Status:** Arbeidsutkast per 15.11.2026 – ikke godkjent av gruppa  
**Innleveringsdato:** [FYLL INN SENERE]

> **Om dette utkastet:** Rapporten følger den utdelte malen. Dokumenterte hendelser er hentet fra prosjektets GitHub-historikk og sesjonslogger samt arbeidsprosessen som er gjennomgått. Vurderingene er foreløpige refleksjoner, ikke formuleringer som Helle eller Elisabeth har godkjent. `[FYLL INN SENERE]` markerer opplysninger som må bekreftes eller skrives etter videre utvikling. Planlagte tester må ikke beskrives som gjennomførte.

## 1. Gruppeinformasjon

**Gruppemedlemmer:**

- Miranda Eriksen Larsen – [student-ID/e-post]
- Helle Hoggen Nybø – [student-ID/e-post]
- Elisabeth Kirkeland Orlien – [student-ID/e-post]

**Dato:** [Dato ved ferdigstilling]

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet

Supersøker er en KI-assistent som skal hjelpe studenter og unge jobbsøkere med å utarbeide søknadstekster til konkrete stillingsannonser. Brukeren legger inn sin CV og stillingsannonsen. Appen sammenligner annonsens kompetansekrav med opplysningene i CV-en, viser hva som er dokumentert og hva som mangler dokumentasjon, og gir brukeren mulighet til å supplere med egne opplysninger før den lager tekst.

Brukeren skal kunne velge mellom et sammenhengende søknadsutkast og forslag til formuleringer. Et sentralt prinsipp er at KI-en ikke skal finne på kompetanse, utdanning eller erfaring, og at relevante CV-sitater skal gjøre vurderingene etterprøvbare. Manglende dokumentasjon skal ikke automatisk omtales som manglende kompetanse. Et annet viktig valg er å skille mellom en gratis, deterministisk mock-modus for demonstrasjon og faktisk bruk av en språkmodell.

Prosjektet er avgrenset som et studentprosjekt med en førsteversjon (V1). Funksjoner som CV-forbedring, en tredje gap-status og avanserte eksport- og profilfunksjoner er utsatt. Avgrensningen ble viktig etter tilbakemelding fra faglærer om at omfattende spesialtilfeller kunne stjele utviklingstid fra kjerneflyten.

**Status ved dette utkastet:** Product Brief og PRD er utarbeidet, revidert og godkjent. Gruppevalg av felles UI/UX-konsept, arkitektur og implementering må dokumenteres når dette arbeidet er fullført. Tre visuelle konsepter og et supplerende testgrunnlag er levert som separate forslag fra Miranda. Disse skal ikke omtales som ferdig gruppeintegrerte løsninger før de er gjennomgått og eventuelt merget.

### 2.2 Arbeidsmetodikk

Vi har samarbeidet gjennom Teams, Git og GitHub, med separate branches, Pull Requests og felles vurdering før endringer legges i `main`. BMAD har vært brukt som rammeverk for å strukturere krav, beslutninger og videre planlegging. KI-assistenter har vært brukt til analyse, utkast, utvikling av prototyper, tekniske kontroller og forslag til forbedringer. Gruppa har beholdt ansvaret for de endelige beslutningene.

Arbeidsfordelingen har delvis fulgt selvstendige leveranser. Helle laget det første PRD-utkastet. Miranda kvalitetssikret og konkretiserte dette, særlig med tanke på testbarhet, KI-ærlighet og håndtering av feil, og foreslo løsninger på ni åpne spørsmål. Elisabeth laget en tidlig klikkbar UX-prototype og bidro med fiktive testpar og samordning av PRD-arbeidet. Etter en ny gjennomgang fra faglærer ble PRD-en ytterligere forenklet, med tydeligere prioritering og mer realistiske rammer.

I den videre designfasen laget Miranda tre ulike visuelle konsepter: Stegvis veiviser, Premium/Editorial og Moderne/Bold. Hun laget også supplerende testdata for krav om politiattest, annonser uten tydelige krav og tekstbaserte PDF-varianter av fiktive CV-er. Begge bidragene ble publisert i egne Pull Requests for gjennomgang. [FYLL INN SENERE: Helles og Elisabeths tilsvarende designbidrag og endelig arbeidsfordeling.]

Vi lærte at separate branches ikke alene hindrer konflikter. Da Helles og Mirandas PRD-versjoner inneholdt de samme filbanene, oppsto risiko for *add/add*-konflikter. I stedet for å overskrive en av versjonene valgte gruppa en kontrollert sammenslåing som beholdt begge bidrag og Git-historikken. Det ga en konkret forståelse av hvordan samarbeid, teknisk versjonskontroll og kommunikasjon henger sammen.

### 2.3 Teknologi og verktøy

| Verktøy/teknologi | Bruk dokumentert så langt |
|---|---|
| Git og GitHub | Branches, commits, Pull Requests, endringshistorikk og samarbeid |
| Visual Studio Code | Lokal utvikling og håndtering av prosjektfiler |
| Teams | Gruppas kommunikasjon og avklaringer |
| ChatGPT og Codex | Trinnvis Git-veiledning, oppgaveavgrensning, prototyper og kontroll |
| Claude Code | KI-assistert dokumentproduksjon, UX-arbeid og revisjoner i gruppa |
| BMAD | Arbeidsflyt for krav, beslutninger, design og kvalitetssikring |
| HTML, CSS, JavaScript | Visuelle konsepter og klikkbar prototype |
| Python, ReportLab og pypdf | Kontrollskript og tekstbaserte PDF-testfiler |

**Endelig teknologistakk for appen:** Frontend [FYLL INN SENERE]; backend [FYLL INN SENERE]; database [FYLL INN SENERE]; språkmodell/API [FYLL INN SENERE]. Vi må skille verktøy brukt i *prototyping* fra teknologi som faktisk blir valgt til produksjonskoden. Faglærers teknologidokument er et forslag til referanse, ikke et automatisk gruppevedtak.

### 2.4 Utviklingsfaser

**Fase 1 – Planlegging og krav.** Først ble Product Brief utarbeidet og justert etter faglærers tilbakemeldinger. PRD-en ble deretter utviklet med brukerreise, funksjonskrav FR-1–FR-30, ikke-funksjonelle krav, suksessmål og testopplegg. Miranda videreførte Helles utkast, konkretiserte krav og laget en endringsoversikt. Ni åpne spørsmål ble formulert som forslag, ikke feilaktig presentert som gruppevedtak. Etter faktisk godkjenning ble de innarbeidet i PRD-en.

**Fase 2 – Kvalitetssikring og revisjon.** Faglærer ga formativ tilbakemelding: Dokumentet var gjennomarbeidet, men kunne bli for detaljert og ressurskrevende. Gruppa forenklet blant annet regelen for endret CV/annonse, presiserte grenser, reserveregel for ekte KI-tester og skilte tydeligere mellom obligatoriske og ønskelige enkeltpunkter. Dette demonstrerte forskjellen mellom å skrive mange krav og å ha en gjennomførbar prosjektplan.

**Fase 3 – UI/UX-konsepter.** Først laget Miranda en klikkbar prototype med omfattende simulert brukerflyt. Etter å ha gjennomgått undervisningen om konseptvalg innså hun at oppgaven på det stadiet først og fremst gjaldt visuell utforskning. Hun endret derfor instruksjonen til Codex og laget to ytterligere, hovedsakelig statiske uttrykk, med samme eksempelinnhold som første konsept. Sammenligningssiden gjorde det mulig å studere de tre variantene side ved side. Premium/Editorial ble Mirandas foreløpige favoritt. Gruppa skal velge samlet retning før endelig `design`- og `experience`-dokumentasjon.

**Fase 4 – Testforberedelser.** Miranda laget en separat leveranse med fire tekstbaserte PDF-er, to T-8-scenarioer, T-9 med seks varianter, fasiter, kildehasher, sporbarhetsmatrise og kontrollskript. Kontrollene bekreftet blant annet gyldig JSON, ordrette CV-sitater og riktig uttrekk av norsk PDF-tekst. Dette er validering av *testmateriale*; appens egen PDF-leser, modellkvalitet, installasjon og ende-til-ende-flyt er ikke verifisert av disse kontrollene.

**Fase 5 – Arkitektur og implementering.** [FYLL INN SENERE: Arkitektur, teknologibegrunnelser, epics/stories, sprintplan, utviklingsiterasjoner, gjennomførte app-tester og resultat.]

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer

**Utfordring 1 – Git-konflikter i PRD-arbeidet.** Helle og Miranda arbeidet på forskjellige branches med dokumenter som hadde samme stier. Dette gjorde automatisk sammenslåing vanskelig, og Miranda var særlig opptatt av å ikke overskrive de andres arbeid. Vi sammenlignet endringer og historikk og lot en samlet PRD-branch kombinere bidragene kontrollert. KI-verktøy hjalp med kommandoer og analyse, men menneskene måtte forstå og godkjenne resultatet. Lærdommen var at en Pull Request er et forslag, ikke det samme som å endre `main`.

**Utfordring 2 – Manglende BMAD-konfigurasjon.** `bmad-build` stoppet med `HALT: missing config value communication_language`. Codex undersøkte oppsettet, og vi la inn `communication_language = "Norwegian Bokmål"` i `_bmad/custom/config.toml`. Da testarbeidet startet på en branch uten rettelsen, kom feilen tilbake. Vi brukte `git cherry-pick` for å hente inn den allerede testede rettelsen i stedet for å improvisere en ny. Deretter ble BMAD-renderingen verifisert med exitkode 0. Dette viste betydningen av å forstå hvilke commits en branch faktisk inneholder.

**Utfordring 3 – Feil i KI-generert prototypekode.** Under utvikling av visuelle konsepter oppdaget kontrollarbeidet at en CSS-selektor også kunne skjule selve siden ved navigasjon. Selektoren ble avgrenset til aktuelle seksjoner, og kontrollverktøyet ble utvidet for å oppdage blanke skjermbilder. Etter retting rapporterte Codex 93 beståtte nettleserkontroller. Det viser hvorfor faktisk testing er viktig selv når KI rapporterer at en løsning er ferdig.

### 3.2 Samarbeidsutfordringer

Parallelt KI-assistert arbeid gjør det mulig å produsere mye raskt, men gjør også kommunikasjon og versjonsstyring viktigere. Vi måtte avklare hvem som eide hvilke utkast, hva som var godkjente beslutninger, og når andre kunne merge. Vi brukte separate branches, PR-beskrivelser, Teams-godkjenninger og sesjonslogger for å gjøre prosessen synlig. Samtidig opplevde vi at uregistrerte lokale filer og endringer på forskjellige branches gjorde Git vanskelig å orientere seg i. [FYLL INN SENERE: Gruppas samlede vurdering av koordinering og eventuelle forbedringer i arbeidsfordeling.]

### 3.3 KI-spesifikke utfordringer

KI foreslo tidvis mer omfattende løsninger enn vi trengte. Første UX-konsept ble en nesten full brukerflytsimulering, selv om oppgaven i forelesningen var å utforske visuelle konsepter. Ved å endre instruksjonene fikk vi et mer relevant sammenligningsgrunnlag. På samme måte viste PRD-gjennomgangen at mange presise krav også kan gjøre prosjektet mindre realistisk å bygge. Dette er eksempler på at riktig teknisk svar ikke nødvendigvis er riktig *prosjektvalg*.

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse

**Effektivitet og produktivitet.** KI hjalp oss med å formulere testbare krav, lage alternative utforminger, produsere fiktive testfiler og kontrollere formelle detaljer. Oppgaver som manuell bygging av flere PDF-varianter eller gjentatte layoututkast kunne utføres raskere og mer systematisk.

**Læring og forståelse.** ChatGPT fungerte som en veileder i Git ved at kommandoene ble forklart én om gangen. Miranda lærte gradvis forskjellen på `fetch`, `merge`, `cherry-pick`, `push` og Pull Requests. Oppgaven ble ikke bare gjennomført; det ble også lettere å forstå hvorfor feil oppsto og hvordan man kunne redusere risikoen for å påvirke andre.

**Kvalitet på kode og dokumentasjon.** KI bidro med strukturerte krav, testkoblinger og automatiske kontroller. Når en test fant en feil, kunne KI foreslå en rettelse og kjøre kontrollene på nytt. Samtidig er verktøyets egen oppsummering ikke nok som bevis: Vi må kunne vise til de faktiske kontrollene og deres avgrensninger.

### 4.2 Begrensninger og ulemper

**Kvalitet og pålitelighet.** KI kan produsere overbevisende, men feil eller overdimensjonerte forslag. CSS-feilen i prototypen er et konkret eksempel på en teknisk feil. Et annet er den opprinnelige omfattende håndteringen av spesialtilfeller i PRD-en, der faglærer anbefalte prioritering og forenkling.

**Avhengighet og forståelse.** Når KI lager lange dokumenter og mange filer, kan det være fristende å godkjenne uten å kontrollere. Miranda forsøkte derfor å beholde konkrete kontrollpunkter, spesielt før Git-operasjoner og endringer som kunne berøre gruppa. Denne arbeidsmåten er tryggere, men koster tid og krever at vi er aktive i prosessen.

**Kreativitet og problemløsning.** KI gjorde det enkelt å utforske tre ulike visuelle retninger, men den kan også trekke mot vanlige designmønstre. Den menneskelige delen av oppgaven var å velge hva som faktisk passet Supersøkers målgruppe, sammenligne alternativene og endre bestillingen når den første løsningen ble for omfattende.

### 4.3 Sammenligning: Med og uten KI

Uten KI ville planlegging, prototyper og testdata sannsynligvis krevd mer manuelt arbeid. Det kunne gitt mer direkte erfaring med hvert tekniske valg, men også redusert hvor mange alternativer vi hadde tid til å undersøke. Med KI kunne vi produsere mer materiale, men måtte bruke tid på kvalitetssikring, avgrensning, forståelse og dokumentasjon. Verdien lå derfor ikke bare i raskere produksjon, men i at vi fikk flere forslag å vurdere kritisk.

### 4.4 Samlet vurdering

Foreløpig vurderer vi KI som et nyttig verktøy, forutsatt at vi ikke overlater produktansvaret til modellen. Målet må være å styre KI mot et bestemt problem, undersøke resultatet og kunne forklare hvorfor en løsning er valgt eller forkastet. [FYLL INN SENERE: Vurdering av den faktiske ferdige applikasjonen og hva KI betydde for sluttresultatet.]

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap

Det er gruppa som har ansvar for innlevert kode og dokumentasjon, uansett hvor stor andel KI har produsert. Vi må kunne forklare viktige funksjoner, forstå mulige feil og vise at vi har vurdert forslagene kritisk. Gjenbruk av tredjepartsbiblioteker og kode krever dessuten oppmerksomhet om lisenser og opphavsrett. [FYLL INN SENERE: Konkret kontroll av eksterne avhengigheter i den ferdige appen.]

### 5.2 Transparens

Vi har brukt Git-historikk, PR-beskrivelser, BMAD-dokumenter og sesjonslogger til å synliggjøre hvordan løsningen utviklet seg. En verdi med dette er at sensor kan se forskjellen mellom opprinnelige KI-forslag, menneskelige beslutninger og rettelser. Vi bør likevel være bevisste på at en loggoppsummering ikke nødvendigvis inneholder den fullstendige KI-instruksjonen. Presise prompts og utvalgte dialogutdrag bør derfor bevares som etterprøvbar dokumentasjon.

### 5.3 Påvirkning på læring og kompetanse

KI senker terskelen for å prøve utviklingsoppgaver, men gir ikke automatisk forståelse. Vi risikerer å lære mindre dersom vi bare aksepterer resultatene. Trinnvis veiledning, kildekontroll og diskusjon av alternative løsninger gjorde det enklere å utvikle egen kompetanse. Samtidig må vi etter hvert kunne bruke verktøyene mer selvstendig og forklare tekniske valg uten å støtte oss fullt og helt på KI.

### 5.4 Arbeidsmarkedet

KI kan redusere tidsbruken på rutinepreget koding og dokumentasjon. Det kan gjøre kompetanse i kravforståelse, kvalitetssikring, sikkerhet, arkitektur og kritisk vurdering mer verdifull. Programmeringskunnskap vil fortsatt være viktig for å finne feil og vurdere om løsninger er robuste. [FYLL INN SENERE: Gruppemedlemmenes egne vurderinger av framtidig arbeidsliv.]

### 5.5 Datasikkerhet og personvern

Supersøker håndterer potensielt sensitive opplysninger i CV-er. Derfor har vi valgt å bruke fiktive personer, stillingsannonser og CV-er i prosjektdataene. PRD-en krever midlertidig behandling av dokumentopplysninger, kontroll av brukertilgang og tydelig varsel før opplysninger sendes til ekstern modell. API-nøkler skal ikke lagres i versjonskontroll. Dette er planlagte krav, ikke bevis på at sikkerheten allerede er implementert og testet. [FYLL INN SENERE: Faktiske tester av tilgangskontroll, dataflyt og sletting.]

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold

KI-generert kode må vurderes med tanke på lesbarhet og vedlikehold. Vi har forsøkt å holde selvstendige leveranser adskilt, for eksempel UX-konsepter i Mirandas mappe og nye testdata under `tests/testgrunnlag/`. Det reduserer risikoen for at eksperimenter påvirker felles filer. Oppdagelsen og rettingen av CSS-feilen viste også at små tekniske detaljer kan få store konsekvenser for brukeropplevelsen. [FYLL INN SENERE: Eksempler fra appens faktiske arkitektur og kodevedlikehold.]

### 6.2 Standarder og beste praksis

Viktige erfaringer har vært bruk av branches og Pull Requests, sporbarhet mellom krav og test, tydelig skille mellom testdata og testresultater, bevaring av fiktive data og Git-konfigurasjon som utelukker hemmeligheter. Feilen med `communication_language` viste samtidig at et etablert arbeidsrammeverk som BMAD fortsatt avhenger av riktig oppsett og praktisk feilsøking.

### 6.3 Fremtidig utvikling

Vi forventer mer KI-støtte i planlegging, programmering, testing og dokumentasjon. En sannsynlig konsekvens er at utviklere må bli bedre til å formulere små, tydelige arbeidsoppgaver, evaluere resultater og opprettholde en sammenheng mellom krav, arkitektur, design og kode. [FYLL INN SENERE: Refleksjoner etter implementeringen.]

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer

1. Gode KI-instruksjoner krever tydelig mål, avgrensning og kontrollkriterier.
2. KI-generert innhold må vurderes mot faktiske krav og tester, ikke bare KI-ens egen oppsummering.
3. Git og branches er avgjørende når flere arbeider parallelt på samme prosjekt.
4. Detaljert planlegging er nyttig, men må balanseres mot tidsramme og realistisk V1-omfang.
5. Menneskene må ta ansvar for beslutninger og dokumentere hvilke KI-forslag som ble valgt, endret eller forkastet.

### 7.2 Hva ville dere gjort annerledes?

Vi ville avklart felles Git-praksis tidligere og skilt tydeligere mellom godkjente vedtak, forslag og arbeidsutkast. Vi ville også tidligere definert hva som var en *visuell konseptskisse* og hva som var en *funksjonell prototype*. Det kunne spart tid og gitt mer målrettet KI-bruk. [FYLL INN SENERE: Erfaringer fra apputviklingen og gruppas samlede vurdering.]

### 7.3 Anbefalinger

Vi anbefaler andre studenter å bruke KI til å undersøke alternativer, men å stille tydelige krav til hva som skal leveres. Be om en plan før store endringer, behold avgrensede commits og dokumenter konkrete eksempler på når KI ble korrigert. Skill mellom «planlagt», «kontrollert testmateriale» og «faktisk testet applikasjon». Den sistnevnte forskjellen er viktig for å kunne gjøre redelige påstander om kvalitet.

### 7.4 Personlig refleksjon (individuelt)

**Miranda Eriksen Larsen**

For meg har Supersøker vært en praktisk innføring i hvordan KI kan brukes som støtte i systemutvikling, men også hvor viktig det er å forstå prosessen selv. Jeg begynte med begrenset trygghet rundt Git og var bekymret for at endringene mine skulle kunne ødelegge noe Helle eller Elisabeth hadde gjort. Da vi møtte problemer med å sammenligne og merge PRD-versjonene, ønsket jeg derfor å ta ett steg om gangen og forstå hver kommando før jeg kjørte den.

Etter hvert lærte jeg hva `fetch`, commits, branches og Pull Requests faktisk betyr, og hvorfor en endring på min egen branch ikke automatisk påvirker `main`. Dette var en konkret mestringsopplevelse. Jeg fikk også større forståelse for at godt samarbeid ikke bare betyr å fordele oppgaver, men å gjøre arbeidet synlig og etterprøvbart for de andre.

PRD-revisjonen ble et viktig selvstendig bidrag. Jeg jobbet med tydeligere krav, kontroll av KI-sitater, behandling av negative svar og testopplegg. Jeg foreslo også løsninger på ni åpne spørsmål. Det var viktig for meg at forslagene først ble omtalt som nettopp forslag og ikke som gruppebeslutninger. Først etter at vi hadde fått tilslutning, ble de dokumentert som vedtak. Jeg lærte at en KI-assistent kan formulere mange gode detaljer, men ikke kan ta beslutninger på vegne av gruppa.

I UX-arbeidet opplevde jeg hvor lett det er å bestille mer enn man egentlig trenger. Jeg fikk først laget en omfattende klikkbar prototype. Da jeg sammenlignet arbeidet med faglærers demonstrasjon, oppdaget jeg at vi på det stadiet først og fremst skulle sammenligne hvordan løsningen kunne se ut. Jeg justerte bestillingen og fikk laget to tydelig forskjellige visuelle konsepter i tillegg. Jeg foretrekker selv Premium/Editorial, men mener gruppa må velge sammen. Denne erfaringen viste meg at en viktig del av KI-kompetansen er å vite *når man skal endre kurs*.

Arbeidet med testgrunnlaget lærte meg å skille mellom å ha en testplan og å ha gjennomført en test. Vi kunne kontrollere at fiktive CV-er, PDF-er og fasiter var konsistente, men det beviser ikke at appen eller språkmodellen vil fungere riktig. Denne forskjellen vil jeg ta med meg videre. Det samme gjelder BMAD-feilen: Selv når KI forklarte hvordan den kunne løses, måtte jeg se at løsningen faktisk ble testet og kom inn på riktig branch.

Jeg opplever foreløpig KI som et nyttig læringsverktøy, særlig når jeg får stille spørsmål og gjøre kontroller underveis. Samtidig ser jeg risikoen for å bli passiv dersom KI gjør alt automatisk. Mitt mål videre er å bli tryggere på å vurdere kode, tester og tekniske valg selv, slik at jeg ikke bare kan vise frem et resultat, men også forklare hvordan og hvorfor det ble til.

**Helle Hoggen Nybø**

[FYLLES INN AV HELLE: egne oppgaver, læring, kritiske erfaringer med KI, utfordringer og hva hun ville gjort annerledes.]

**Elisabeth Kirkeland Orlien**

[FYLLES INN AV ELISABETH: egne oppgaver, læring, kritiske erfaringer med KI, utfordringer og hva hun ville gjort annerledes.]

## 8. Vedlegg (valgfritt)

**GitHub-repository:** https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl

**Dokumenterte arbeidsbidrag som kan brukes som spor:**

- [PR #3 – Oppdatering av Product Brief](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/3)
- [PR #6 – Tidlig UX-prototype](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/6)
- [PR #8 – Mirandas PRD-revisjon](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/8)
- [PR #9 – Samlet PRD](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/9)
- [PR #11 – Dokumenterte gruppevedtak](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/11)
- [PR #12 – PRD-revisjon etter faglærers tilbakemelding](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/12)
- [PR #13 – Mirandas UX-konsepter](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/13)
- [PR #14 – Mirandas testgrunnlag](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/14)
- Sesjonslogger under `.logs/`; PRD og beslutningslogg under `_bmad-output/planning-artifacts/prds/`.
- [Sensorveiledning](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/blob/main/.docs/sensorveiledning.md)

**Flere vedlegg som bør samles før innlevering:** Fullstendige eller representative KI-prompts, dokumenterte rettelser av KI-forslag, skjermbilder av endelig app, gjennomførte testresultater og instruksjoner for å starte appen.

---

**Ordantall:** [Beregnes ved ferdigstilling]  
**Forventet lengde i malen:** 3 000–5 000 ord.  
**Merk:** Dette er et arbeidsutkast. Gruppa må korrigere felles «vi»-påstander hvis noen av medlemmene har andre erfaringer eller vurderinger.
