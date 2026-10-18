---
title: "Tillegg til produktbrief: Supersøker"
status: draft
created: 2026-10-18
updated: 2026-10-18
---

# Tillegg: begrunnelser for oppdateringen 2026-10-18

Dette tillegget forklarer hvorfor briefen ble endret etter faglærers tilbakemelding, og hvilke alternativer som ble vurdert. Det er ment som underlag for PRD, arkitektur og refleksjonsrapporten. Gruppa trenger ikke lese det for å godkjenne briefen.

Endringene ble utarbeidet av Elisabeth i en coaching-økt med Claude Code (BMAD `bmad-product-brief`, oppdateringsmodus). Der et forslag kom fra Claude og ble godtatt eller endret av Elisabeth, er det angitt.

## Fra tilbakemelding til endring

| Faglærers punkt | Hva vi gjorde |
|---|---|
| Omfanget er for stort | Funksjonene delt i v1, trinn 2 og trinn 3 |
| Suksesskriteriene er for vage | Nye, sjekkbare kriterier for hver del av v1, pluss ett for hele flyten |
| Lag faste testpar med kjente gap | Testpar er grunnlaget for suksesskriteriene; parene lages før/under PRD |
| Planlegg språkmodell og testmodus | Lagt fram som åpent spørsmål til gruppa; krav om at sensor kan kjøre appen uten gruppas nøkler står i Scope |
| Avklar sikkerhetsnivå i v1 | Lagt fram som åpent spørsmål til gruppa |
| Gjør primærbrukeren mer konkret | Lagt fram som åpent spørsmål til gruppa |
| Mappenavn med mellomrom og «&» | Lagt fram som åpent spørsmål til gruppa |

## Beslutninger og begrunnelser

**Kjernen i v1 er et realistisk søknadsbrev.** Hvis appen bare kunne gjøre én ting godt, skulle den hjelpe studenten med å lage en tilpasset søknad basert på CV og annonse. «Realistisk» betyr at brevet bare bygger på CV-en, annonsen og studentens egne svar, og aldri påstår at et uoppfylt krav er oppfylt. Brevet trenger ikke omtale manglene.

**Gap-analysen er en del av veien til brevet, ikke en frittstående funksjon.** For å skrive et realistisk brev må appen uansett vite hva som er dekket og hva som mangler.

**Studenten kan svare på manglende krav (enkel variant).** Appen viser manglende krav med et valgfritt tekstfelt per krav. Begrunnelse: at noe ikke står i CV-en, betyr ikke at studenten mangler det.
- *Forkastet:* en chat der KI-en stiller oppfølgingsspørsmål i flere runder. For komplekst for v1, med mer lagring, mer uforutsigbar oppførsel og vanskeligere testing.

**Svarene lagres som tilleggsopplysninger på profilen (variant B).** Studenten slipper å svare på det samme ved neste søknad.
- *Forkastet:* variant A, der svarene bare brukes i dette brevet. Studenten må da svare på nytt hver gang.
- *Utsatt til trinn 3:* variant C, der svarene skrives inn i en ny CV-fil. Krever CV-mal og eksport.

**Gap-analysen viser også dekkede krav, med kilde.** Elisabeths idé: en oppsummering der studenten raskt ser hva som er brukt. Den verste feilen gap-analysen kan gjøre, er å vise et krav som dekket når det ikke er det. Da får studenten aldri spørsmål om kravet, og brevet kan påstå noe usant. Når appen må vise hvor i CV-en et krav ble funnet, blir slike feil synlige for studenten.

**CV inn: tekst, PDF og TXT i v1** *(forslag fra Claude, godtatt av Elisabeth)*. De fleste studenter har CV-en som PDF, og innliming virker for alle. PDF-lesing er upålitelig for CV-er med kolonner og tabeller, så appen viser den utleste teksten og lar studenten rette den. Da ender alle innleggingsmåter som tekst, og resten av appen trenger bare å håndtere tekst. DOCX flyttes til trinn 2–3, CV-mal til trinn 3.

**ATS-forslag flyttes til trinn 2.** ATS kom med fordi gruppa trodde oppgaven krevde alle fire KI-funksjoner. Faglærer presiserte at forslagslista ikke er et krav. Elisabeth ville først beholde ATS i v1, men endret mening da den opprinnelige begrunnelsen falt bort. Andre grunner: usikker nytte (hvordan ATS-systemer sorterer, varierer og er ofte ukjent), vanskelig å teste om forslagene virker, og funksjonen gjelder CV-en, ikke brevet. ATS bygger på samme kravuttrekk som gap-analysen, så v1 legger grunnlaget.

Forskjellen på de to: gap-analysen spør «har jeg det de spør etter?» (innhold), mens ATS spør «er det jeg har, skrevet slik at et system finner det?» (ordvalg og format).

**Grad av omskriving i v1** (Elisabeths valg, i tråd med faglærers forslag). To nivåer: «Skriv for meg» og «Gi meg forslag».

**Tone og språk i v1** (Elisabeths valg; Claude foreslo trinn 2). Begrunnelse: tonen er viktig for inntrykket hos arbeidsgiveren. Holdes lite: tre toner (formell, nøytral, personlig) og to språk (norsk, engelsk).

**Øvrig fordeling** *(forslag fra Claude basert på faglærers tilbakemelding, godtatt av Elisabeth)*:
- CV-forbedringsforslag i trinn 2, sammen med ATS, fordi begge handler om CV-en.
- Tidligere søknader i trinn 3. Tilleggsopplysningene dekker allerede gjenbruk av innhold; å etterligne skrivestil er vanskelig å lage og teste.
- Eksport til fil i trinn 3. En «Kopier tekst»-knapp i v1 dekker behovet, og eksportformat trenger ikke avgjøres nå.

## Teststrategi for KI-delen

Suksesskriteriene bygger på 3–4 testpar: en fiktiv CV og en fiktiv stillingsannonse der gruppa vet fasiten på forhånd. Eksempel:

- **Test-CV:** har kundeservice og Excel, men ikke førerkort og ikke regnskap.
- **Test-annonse:** krever kundeservice, Excel, førerkort B og regnskap.
- **Fasit:** manglende = førerkort B og regnskap; dekket = kundeservice og Excel.

Parene kjøres på nytt hver gang prompts endres. Kriterium 5b (tone) er delvis en vurdering og sjekkes manuelt med en sjekkliste, noe sensorveiledningen godtar der automatiske tester ikke passer. Ekte CV-er brukes ikke som testdata og legges aldri i repoet.

## Mulige feil i gap-analysen

| Feil | Eksempel | Konsekvens |
|---|---|---|
| Overser et krav i annonsen | Glemmer «førerkort B» | Studenten får ikke spørsmål, brevet nevner det ikke |
| Finner på et krav | Lister «Python» som ikke står i annonsen | Forvirrende |
| Sier at noe mangler, men det står i CV-en | Forstår ikke at «regneark» er Excel | Irriterende, men studenten kan svare |
| **Sier at noe er dekket, men det står ikke i CV-en** | Tror studenten har førerkort | **Verst:** skjult, og kan gi usanne påstander i brevet |
