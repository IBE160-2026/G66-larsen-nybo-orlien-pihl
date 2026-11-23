# Tilbakemelding på PRD

| | |
|---|---|
| **Gruppe** | G66 – G66-larsen-nybo-orlien-pihl |
| **PRD vurdert** | `_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md` (status i frontmatter: draft, sist endret 2026-11-07, commit 3cb9919) |
| **Dato** | 2026-11-12 |
| **Type** | Formativ tilbakemelding, ikke karakter |

## 1. Samlet inntrykk

Dette er en av de mer gjennomarbeidede PRD-ene: tydelig tese om ærlighet, 30 FR-er med testbare konsekvenser, motmål, ærlig scope og en konkret plan for hvordan KI-delen kontrolleres og testes. Risikoen er motsatt av det vanlige: PRD-en er blitt svært detaljert (ca. 7000 ord), og kantsakene rundt økt, utdaterte resultater og sene svar kan bli mer arbeid å bygge og teste enn kjerneflyten tåler på ett semester.

## 2. Dette fungerer godt

- **Ærlighet som tese, ikke pynt.** §1: «den viser hva den har bygget på, spør i stedet for å gjette» går igjen i FR-11 (sitat for hvert dokumentert krav), FR-18 (negasjoner bevares: «Jeg har ikke førerkort» må aldri bli «Jeg har førerkort») og motmålene SM-C1/SM-C2. Funksjonene tjener én idé.
- **KI-kontroll er faktisk beskrevet.** FR-11 skiller regelbasert ordrett-kontroll av sitater fra semantisk relevans («Kontrollen er ingen garanti for semantisk riktighet»). FR-30 avviser hele analysen ved ett ugyldig sitat, og FR-26–29 gir mock som standard, grenser og ingen automatiske gjentakelser. NFR-6 setter 100 kr som tak.
- **Testbarhet bygget inn.** T-1–T-10 kobler tester til FR-er og SM-er, og de fire testparene med fasit gir et konkret grunnlag. §8 sier tydelig at planlagt ikke er det samme som utført.

## 3. Oversikt per dimensjon

| Dimensjon | Vurdering | Kort begrunnelse |
|---|---|---|
| Beslutningsklarhet – er valg og avveininger synlige? | sterk | §9 og §6 oppgir hva som er vedtatt, utsatt og forkastet, med begrunnelse (f.eks. ingen chat «for komplekst, uforutsigbart og vanskelig å teste»). |
| Substans – er innholdet fortjent, eller «pynt»? | sterk | Én persona som driver flyten, NFR-er med produktspesifikt innhold (hemmeligheter, fiktive data, 100 kr), ingen boilerplate. |
| Strategisk sammenheng – har PRD-en en tese som funksjonene tjener? | sterk | Tydelig tese, trinnvis scope og suksessmål med motmål. |
| Testbarhet – vet man når hvert FR er ferdig? | god | Nesten alle FR-er har testbare konsekvenser, men sentrale tall (filstørrelse, lengder, tidsavbrudd) er skjøvet til arkitekturen. |
| Scope og avgrensning – er utelatelser eksplisitte? | god | Ikke-mål og «Utenfor v1» er eksplisitte, men v1 er tungt for fire personer og ett semester. |
| Brukbarhet for neste fase – kan UX, arkitektur og stories hente fra den? | god | Glossar, kontinuerlige ID-er og krysshenvisninger fungerer. Lengde og prosesshistorikk i selve kravteksten gjør uttrekk tyngre. |
| Formtilpasning – passer PRD-formen produktet? | god | Én UJ er nok for en enkel kjerneflyt, men det mangler en kort reise for sensor/testbruker i mock-modus. |

## 4. Viktigste forbedringer

### 4.1 Kantsaks-maskineriet kan sluke kjerneflyten
- **Alvorlighet:** høy
- **Hvor:** FR-21, FR-22, FR-23 og FR-30, f.eks. FR-21: «Endret CV eller annonse ugyldiggjør tidligere gap-analyse og tekst straks … Avbrytes bekreftelsen, beholdes de som utdaterte uten modellkall»
- **Problem og hvorfor det betyr noe:** Fire FR-er beskriver en tilstandsmaskin med utdaterte resultater, bekreftet forkasting, 25/30-minutters økt, sideoppdatering, sene svar og dobbeltklikk. Det gir mange stories og tester (T-4, T-6, T-10) for atferd som sjelden brukes. Skjer det som typisk skjer, nemlig at tiden går, blir kjernen (analyse og brev) halvferdig.
- **Forslag:** Merk hvert FR med prioritet (må i v1 / bør / kan utsettes) og forenkle regelen. Eksempel på enklere FR-21: «Endres CV eller annonse, må brukeren starte ny analyse. Brukeren varsles om at svar og egenredigert tekst forkastes, og får bekrefte eller avbryte. Avbrytes det, endres ingenting.» Da forsvinner tilstanden «beholdes som utdaterte». Vurder også om «bør»-nivå passer for sene svar og 25-minutters varsel.

### 4.2 Tall som testene trenger, mangler
- **Alvorlighet:** medium
- **Hvor:** FR-4 («en fast størrelsesgrense»), FR-29 («Arkitekturen fastsetter tall»), FR-30 («tidsavbrudd … i sekunder»)
- **Problem og hvorfor det betyr noe:** T-5 skal teste «verdier ved/over arkitekturens grenser», men uten tall kan stories ikke skrive akseptansekriterier, og kostnadsgrensen i NFR-6 kan ikke regnes på.
- **Forslag:** Sett startverdier i PRD-en og merk dem `[ASSUMPTION]`, så arkitekturen kan justere dem. For eksempel: «Fil: høyst 2 MB. CV og annonse: høyst 10 000 tegn hver. Svar: høyst 1 000 tegn. Tidsavbrudd: 30 sekunder.»

### 4.3 Akseptansekravet for ekte modell kan bli umulig å nå innenfor 100 kr
- **Alvorlighet:** medium
- **Hvor:** NFR-8 og §8: «fire av fire testpar i tre påfølgende runder … Promptretting starter en ny serie»
- **Problem og hvorfor det betyr noe:** Kravet er bra, men en språkmodell gir varierende svar. Hver promptendring nullstiller serien, så budsjettet kan gå tomt før målet er nådd. PRD-en sier bare at gruppa da «må vedta og begrunne et alternativ».
- **Forslag:** Legg inn et enkelt overslag («en serie = 4 par × 2 valg × 3 runder = 24 genereringer + 12 analyser ≈ x kr») og en reserveregel nå, f.eks. «Er målet ikke nådd etter tre serier, godtas to påfølgende runder, og avvikene beskrives i testrapporten.»

### 4.4 Prosesshistorikk og personnavn i kravteksten
- **Alvorlighet:** medium
- **Hvor:** §0 («viderefører … utkast»), §9 («ni forslag», dokumentasjonsdato, faseplassering), FR-14 og FR-21 med «Vedtak: Se §9 punkt 1–5»
- **Problem og hvorfor det betyr noe:** UX, arkitektur og stories skal kunne hente krav uten å vite hvem som foreslo hva eller når. Vedtakene er allerede innarbeidet i FR-ene, så §9 dupliserer dem og øker lengden. Dokumentet står fortsatt som `draft`.
- **Forslag:** Flytt §9-historikken til `.memlog.md`/addendum og la §9 bli en kort tabell «Vedtak → berørte FR-er». Kutt navn og prosessfortelling i §0. Da kan PRD-en kortes ned betydelig uten å miste krav.

### 4.5 Begrepsbruk rundt søknadsbrev, tekst og knapp
- **Alvorlighet:** lav
- **Hvor:** UJ-1 steg 5 («Forslag til formuleringer» … «Lag søknadsbrev»), §3 «Søknadsbrev» (bare resultat av «Helt søknadsutkast»), FR-21 («Fra søknadsbrevet kan brukeren gå tilbake»)
- **Problem og hvorfor det betyr noe:** Samme knapp heter «Lag søknadsbrev» selv om resultatet kan være en liste, og «søknadsbrev» brukes både snevert og som seksjonsnavn. Det gir uklare knappetekster i UX og uklare stories.
- **Forslag:** Bruk «Teksten» konsekvent som fellesbegrep, døp knappen «Lag tekst», og skriv FR-21 som «Fra teksten kan brukeren gå tilbake …».

## 5. Mekaniske funn

- FR-1–FR-30, NFR-1–NFR-8, T-1–T-10 og SM-1–SM-8/SM-C1–C2 er kontinuerlige uten duplikater. Krysshenvisningene jeg stikkprøvde (FR-11 → FR-30, FR-21 → FR-13, T-ene → FR/SM) løser seg.
- `[ASSUMPTION]`: fire inline (FR-9 ×2, FR-25, NFR-1), fire i §10. Indeksen stemmer med teksten.
- Glossar: «dekket»/«mangler» i fasitene mappes til «Dokumentert»/«Mangler dokumentasjon» i T-2, som er greit. «KI-utkastet» (FR-19) og «Brevet bygger på» brukes om både brev og liste (se 4.5). SM-ene står i rekkefølgen 3, 5, 1, 2, 4 …, noe som kan forvirre.
- UJ-1 har navngitt protagonist. Det finnes bare én UJ.

## 6. Før dere går videre

**Avklar før UX, arkitektur og epics:**
- De fire antakelsene i §10 er små og kan avgjøres nå (obligatorisk tittel/arbeidsgiver, bekreftelse av leverandørvarsel, WCAG AA).
- Startverdier for grenser og tidsavbrudd (4.2).
- Hvilke av FR-21–FR-23 og FR-30 som må være med i v1 (4.1). Dette avgjør hvor mange stories dere får.
- Reserveregel og kostnadsoverslag for ekte-modell-testen (4.3).

**Kan vente:** Valg av lagringsløsning for økten, nøyaktig definisjon av «brukeraktivitet», endelig modellvalg og pris (alt er riktig plassert hos arkitekturen), og «Delvis dokumentert» og CV-råd (trinn 2).

**Oppfølging av tilbakemelding på product brief: ja.** Suksesskriteriene er gjort sjekkbare med fire fiktive testpar og fasit, v1 er avgrenset i trinn, mock-modus og `.env.example` er krav (FR-26, NFR-4), modellvalget er notert, og testpar og kostnad er omtalt.

## 7. Refleksjonsspørsmål

1. §9 viser at mange krav kom fra gjennomgang og forslag underveis. Hvilke av dem ville dere ha utelatt hvis dere bare hadde fire ukers utviklingstid, og hva forteller det om hva som er kjernen i Supersøker?
2. FR-11 og FR-30 forutsetter at KI kan lyve med ekte sitater som ikke dokumenterer kravet. Hvordan vil dere i praksis oppdage slike tilfeller når dere vurderer KI-generert kode og KI-svar, og hva har dere godtatt eller endret fra KI-forslagene i PRD-arbeidet?

_Vurdert mot kvalitetsrubrikken i bmad-prd. Dette er veiledning, ikke sensur._
