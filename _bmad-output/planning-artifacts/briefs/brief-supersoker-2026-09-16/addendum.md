---
title: "Tillegg til produktbrief: Supersøker"
status: final
created: 2026-10-18
updated: 2026-10-30
---

# Tillegg: begrunnelser for oppdateringene etter faglærers tilbakemelding

Dette tillegget forklarer hvorfor briefen ble endret etter faglærers tilbakemelding, og hvilke alternativer som ble vurdert. Det er ment som underlag for PRD, arkitektur og refleksjonsrapporten. Gruppa trenger ikke lese det for å godkjenne briefen.

## Gruppas beslutninger (2026-10-30)

Gruppa gikk gjennom avkrysningslisten i briefen og bekreftet alle punktene. Elisabeth tok først stilling til svarfelt, tone/språk og mappenavn, og ba Claude Code om anbefalinger for resten med et mål om at oppgaven verken skulle bli for vanskelig eller for lett. Gruppa tok den endelige avgjørelsen.

| Punkt | Beslutning | Begrunnelse |
|---|---|---|
| Svar på manglende krav | Variant A: svarene gjelder bare den aktuelle søknaden | Variant B krever permanent lagring, som ikke er med i v1. Variant B ligger i trinn 3. |
| Tone og språk | Bokmål og profesjonell tone i v1 | Én kombinasjon er enklere å teste mot testparene. Elisabeths begrunnelse for valg i v1 (se «Tone og språk i v1» nedenfor) er tatt vare på til trinn 3. |
| Lagring | Bare brukerkontoer lagres permanent | Lagring av dokumenter krever kryptering og en plan for sletting og personvern. *Vurdert og avvist:* Claude foreslo et mellomalternativ der resultatene (gap-analyse og brev) lagres per bruker, for å gi mer datalagring og en mer meningsfull test av eierskap. Gruppa valgte den enkleste løsningen. |
| Omfang | V1 som foreslått; trinn 2 er målet ved tid | *Forslag fra Claude, godtatt av gruppa:* I stedet for å utvide v1 er trinn 2 et uttalt mål, fordi det gjenbruker samme flyt (CV + annonse → KI → resultat). Det sikrer en realistisk v1 og gir en plan hvis det blir tid. |
| Primærbruker | Student som søker første jobb eller sommerjobb | En smal målgruppe gjør design og testpar enklere. |
| Språkmodell | `gpt-5-mini`, foreløpig | Modellen kan konfigureres, så valget kan endres etter testing. |
| Budsjett | 100 kr; Elisabeth følger opp | Mock er standard, så de fleste testene koster ingenting. Én ansvarlig person og en grense i leverandørens konto er viktigere enn selve beløpet. |
| Mappenavn | `brief-supersoker-2026-09-16` | Mellomrom og «&» skaper problemer i kommandolinjen. Mappen er flyttet med `git mv`, så historikken beholdes. |
| Suksesskriterier og testpar | Godkjent | Kriteriene kan testes konkret og kobler planen til testene. |

Seksjonene under beskriver arbeidet før beslutningene. Der de avviker, gjelder tabellen over.

## Sammenslåing av to forslag (2026-10-26)

Elisabeth (PR #3, 2026-10-18) og Miranda (branch `miranda-utvikling`, 2026-10-26) laget hvert sitt forslag til oppdatering etter samme tilbakemelding, uten å vite om hverandres arbeid. Begge fulgte faglærers trinnplan, men de skilte seg på flere punkter. Elisabeth sammenlignet forslagene med Claude Code, og de ble slått sammen etter en fremgangsmåte Claude foreslo og Elisabeth godtok: Mirandas forslag er grunnlaget for modell, testmodus, sikkerhet og kjørbarhet, og Elisabeths forslag bidrar med kilde for dekkede krav, svarfelt og begrunnelsene i dette tillegget.

| Tema | Elisabeth | Miranda | Samlet forslag | Begrunnelse |
|---|---|---|---|---|
| Modell, testmodus, nøkkel, budsjett | Åpent spørsmål | `gpt-5-mini`, mock som standard, `.env.example`, én modul, 100 kr | Mirandas | Faglærer vurderte kjørbarhet for sensor som stor risiko. Mirandas forslag gjør det konkret nok til arkitekturen. |
| Sikkerhet og lagring | Åpent spørsmål | Passordhasher, eierskapskontroll, ingen permanent dokumentlagring i v1 | Mirandas | Tilsvarer faglærers anbefaling og gir et mindre v1. |
| Primærbruker | Åpent spørsmål | Student som søker første jobb eller sommerjobb, med eksempel | Mirandas | Svarer direkte på faglærers punkt. |
| Svar på manglende krav | Svarfelt; svar lagres på profilen (variant B) | Ikke med | Svarfelt i v1, men svarene gjelder bare den aktuelle søknaden (variant A). Lagring på profilen flyttes til trinn 3. | Variant B krever permanent lagring, som strider mot Mirandas lagringsforslag. Svarfeltet beholdes fordi det hindrer at brevet bygger på et ufullstendig bilde av studenten. |
| Kilde for dekkede krav | Med | Ikke med | Med (kriterium 3) | Hindrer den verste feilen i gap-analysen (se tabellen nederst). |
| Tone og språk | Tre toner og to språk i v1 | Bokmål og profesjonell tone i v1; valg i trinn 3 | Mirandas, men lagt fram som eget avkrysningspunkt | Faglærer ba om mindre omfang. Elisabeths begrunnelse (tonen påvirker inntrykket hos arbeidsgiver) står fortsatt under «Tone og språk i v1» nedenfor, så gruppa kan velge. |
| Navn på omskrivingsvalg | «Skriv for meg» / «Gi meg forslag» | «Helt søknadsutkast» / «Forslag til formuleringer» | Mirandas | Beskriver tydeligere hva brukeren får. |
| Suksesskriterier | Per funksjon, tone sjekkes manuelt | Tittel og arbeidsgiver i brevet, A/B-tilgang, mock-kjøring, fire navngitte testpar | Mirandas som grunnlag, med Elisabeths kriterier for CV inn, kilde og svar | Mirandas dekker faglærers eksempel og kjørbarhet. Elisabeths dekker flyten med svarfelt. |
| Mappenavn med «&» | Åpent spørsmål | Ikke med | Avkrysningspunkt | Faglærer tok det opp. |
| Beslutningsform | Liste med åpne spørsmål | Avkrysningsliste | Avkrysningsliste | Gjør det synlig hva gruppa har bekreftet. |

Seksjonene under beskriver Elisabeths forslag fra 2026-10-18. Der det samlede forslaget avviker, gjelder tabellen over.

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
