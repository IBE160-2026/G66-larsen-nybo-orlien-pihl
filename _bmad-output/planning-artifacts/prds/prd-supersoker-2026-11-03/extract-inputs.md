# Uttrekk av PRD-relevante innspill – Supersøker

Arbeidsunderlag for PRD (2026-11-03). Kilder:

- `briefs/brief-supersoker-2026-09-16/brief.md` (status final, oppdatert 2026-10-30) – heretter **[brief]**
- `briefs/brief-supersoker-2026-09-16/addendum.md` (oppdatert 2026-11-02) – **[add]**
- `briefs/brief-supersoker-2026-09-16/tilbakemelding-product-brief.md` (faglærer, 2026-10-06) – **[fb]**
- `ux/prototype-kjerneflyt.html` (PR #6, commit `c2f20d9` + `7b648d4`) – **[proto]**
- `.logs/elizabeth/issues.md`, `994-…-ux-prototype.md`, `995-…-walkthrough-pr3.md`, `997-…-testpar.md` – **[log]**
- `tests/fixtures/job-applications/README.md` – **[fix]**

Det som er utledet og ikke står i kildene, er merket **[inferred]**.

---

## 1. Problem, målgruppe, verdiforslag

**Problem [brief]:** Studenter og unge jobbsøkere synes det er vanskelig å forstå hvilke kvalifikasjoner en arbeidsgiver vektlegger, hvilke deler av egen erfaring som er relevante, hva CV-en mangler og hvordan søknaden bør formuleres. Hver søknad tar tid, og resultatet blir generelt. Behovet er både skrivehjelp og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav. Problemet er **ikke dokumentert gjennom brukerundersøkelser** (gruppens utgangspunkt).

**Illustrerende eksempel [brief]:** Student som søker sin første relevante sommerjobb, med erfaring fra butikk og studieprosjekter.

**Primærbruker [brief]:** Student med begrenset relevant arbeidserfaring som søker første relevante jobb eller sommerjobb. Trenger hjelp til å knytte deltidsarbeid, utdanning og studieprosjekter til annonsen, «uten å overdrive kompetansen». **Sekundær:** andre unge jobbsøkere.

**Navngitt persona (bare i prototypen, fiktiv testbruker) [proto]:** *Ida Testesen*, sykepleierstudent 2. år, deltid butikkmedarbeider (Testvik Mat), besøksvenn i Røde Kors, gruppeprosjekt om fallforebygging, førstehjelpskurs. Søker «Sommervikar i hjemmetjenesten – Testvik kommune» (testpar 1). Ingen andre personas i briefen.

**Verdiforslag [brief]:** «Ærlig støtte for studenter og unge jobbsøkere: assistenten viser hva den har bygget på, spør i stedet for å gjette, og lar brukeren styre hvor mye KI-en skriver.» Kombinasjon av skrivehjelp og forklaring av gap.
**Konkurrenter erkjent [brief]:** Teal (søknadsbrev fra CV + annonse), Jobscan (CV mot annonse). Kombinasjonen er «ikke dokumentert som unik»; verdien vurderes ut fra nytte og forståelighet for målgruppen.

**Undertittel i prototypen [proto]:** «Søknadsbrev som stemmer med CV-en din».

---

## 2. Omfang

### Innenfor v1 (MVP) [brief Scope-tabell + The Solution]

- Én brukerrolle.
- Sikker innlogging (brukerkonto; passord som sikre hasher).
- CV inn som: innlimt tekst, TXT-fil eller **tekstbasert** PDF.
- Visning av innlest CV-tekst, som brukeren kan rette før analysen.
- Beskjed når tekst ikke kan leses (skannet PDF), med mulighet til å lime inn manuelt.
- Stillingsannonse som innlimt tekst.
- Gap-analyse: kravuttrekk fra annonsen; dekkede krav **med kilde** (hvor i CV-en); krav som mangler dokumentasjon.
- Valgfritt svarfelt per manglende krav; svar gjelder bare den aktuelle søknaden (variant A).
- Søknadsbrev med to omskrivingsvalg: «Forslag til formuleringer» og «Helt søknadsutkast».
- Resultat i to tydelig merkede felt, «Gap-analyse» og «Søknadsbrev/forslag», som kan leses uten ny analyse.
- Redigerbar resultattekst; tekst kan kopieres manuelt («Kopier tekst»-knapp [add Historikk; proto]).
- Norsk bokmål, nøktern/profesjonell tone (fast).
- Mock-modus (standard, tydelig merket); API-modus krever aktivt valg.
- Eierskapskontroll på serversiden for alle lagrede brukerdata.
- Varsel om at CV og annonse sendes til ekstern leverandør før ekte modell brukes.
- Fra PR #6 (2026-11-02): resultat tas vare på mens økten varer, slettes ved utlogging; knapp «Last inn eksempel (testpar 1)»; mock på ukjent input gir tydelig merket eksempelsvar [add; proto].

### Trinn 2 (utenfor v1, mål hvis v1 er testet og stabil i tide) [brief]

- Egne CV-forbedringsforslag.
- ATS-forslag (veiledning, ingen garanti).
- Kandidat (ikke besluttet): lagring av gap-analyse og brev per bruker [add].
- DOCX nevnt som «trinn 2–3» i Elisabeths historikk; gjeldende brief plasserer DOC i trinn 3 [add Historikk vs. brief].

### Trinn 3 (utenfor v1) [brief]

- Strukturert CV-mal.
- DOC-støtte.
- Tidligere søknader.
- Lagring av svar som tilleggsopplysninger på profilen (variant B).
- Skrive svar inn i ny CV-fil (variant C) [add].
- Språk- og stilvalg (Elisabeths opprinnelige forslag: tre toner formell/nøytral/personlig, to språk norsk/engelsk).
- Fileksport. Eksportformat og CV-malens felter bestemmes først hvis trinn 3 prioriteres.

### Utenfor prosjektets kjerne [brief]

- Komplett rekrutteringssystem.
- OCR / skannede PDF-er.
- Garanti for intervju eller ATS-godkjenning.

### Eksplisitt forkastet [add]

- Chat der KI stiller oppfølgingsspørsmål i flere runder (for komplekst, uforutsigbart, vanskelig å teste).
- Permanent lagring av resultater per bruker i v1 (Claude-forslag, avvist av gruppa 2026-10-30).

---

## 3. Kjerneflyt steg for steg

Overordnet [brief]: logg inn → CV + annonse → gap-analyse (+ svar) → søknadsbrev/forslag → rediger/kopier.

### 0. Innlogging
- Ikke skissert i prototypen: «Den blir en vanlig innloggingsside med feilmeldinger.» [proto]
- Header viser «Innlogget som **Ida Testesen** (testbruker)» [proto].
- Testbruker må finnes for sensor (kriterium 8) [brief].

### Globale elementer [proto]
- Prototype-bar (kun prototype): «Vis tilstand» med valg: Vanlig flyt, Tom CV, PDF uten lesbar tekst, Ingen manglende krav, Mock med egen tekst, Feil fra språkmodellen.
- **Mock-banner** på hver side: «**Mock-modus** – Svarene er ferdiglagde eksempler. Ingen tekst sendes til en språkmodell.»
- **Stegliste** (nav «Steg i søknaden»): 1 · CV og annonse, 2 · Gap-analyse, 3 · Søknadsbrev. Aktivt steg markert (`aria-current`), fullførte steg grønne. På mobil (≤760 px) vises bare aktivt steg; to kolonner stables.
- Fokus flyttes til overskriften ved stegbytte.

### Steg 1 – «Legg inn CV og stillingsannonse» [proto]
- Ingress: «Lim inn teksten eller last opp CV-en som TXT eller PDF. Du ser teksten vi leste, og kan rette den før analysen.»
- **CV** (venstre kolonne): segmentvalg «Lim inn tekst» / «Last opp fil».
  - Fil: «Velg fil (TXT eller tekstbasert PDF)», `accept=.txt,.pdf`. Hint: «Skannede PDF-er kan ikke leses. Lim da inn teksten i stedet.»
  - Tekstfelt: etikett «CV-tekst», eller «Teksten vi leste fra fila (kan rettes)» i fil-modus. Hint: «Sjekk at utdanning, erfaring og ferdigheter kom med. Du kan rette teksten her.»
- **Stillingsannonse** (høyre kolonne): tekstfelt. Hint: «Ta med stillingstittel og arbeidsgiver, så kan brevet nevne dem.»
- Knapper: «Analyser kravene» (primær), «Last inn eksempel (testpar 1)» (sekundær; lagt til i `7b648d4`). Melding etter lasting: «Eksempel lastet inn – CV og annonse fra testpar 1 er fylt inn. Trykk «Analyser kravene».»
- **Tilstander og meldinger:**
  - Tom CV: «**CV-en er tom** – Lim inn CV-teksten, eller last opp en TXT- eller PDF-fil.» (felt `aria-invalid`, fokus dit)
  - Tom annonse: «**Annonsen er tom** – Lim inn hele stillingsannonsen, med tittel og arbeidsgiver.»
  - PDF uten tekst: «**Vi fant ingen tekst i «cv-skannet.pdf»** – PDF-en ser ut til å være skannet som bilde. Åpne CV-en, kopier teksten og lim den inn i feltet under.»
  - Feil filformat: «**«<fil>» kan ikke leses** – Velg en TXT- eller PDF-fil, eller lim inn teksten.»
  - Fil lest (TXT): «**Leste «<fil>»** – Sjekk teksten under og rett det som ble feil.» (PDF: påminnelse om å sjekke at kolonner og overskrifter kom i riktig rekkefølge.)
  - Appen går ikke videre med tom CV/annonse.

### Steg 2 – «Gap-analyse: <stillingstittel>, <arbeidsgiver>» [proto]
- Overskrift inneholder stillingstittel og arbeidsgiver (her «Sommervikar i hjemmetjenesten, Testvik kommune»).
- Oppsummering: «**3** av 4 krav dokumentert», «**1** mangler dokumentasjon».
- Forklaring: «At noe ikke står i CV-en, betyr ikke at du mangler det. Svar gjerne på kravene som mangler dokumentasjon. Svarene brukes bare i denne søknaden.»
- **«Mangler dokumentasjon i CV-en»** (vises *før* dekkede krav; oransje, ikke rød): kort per krav med status «Mangler dokumentasjon», merknad (f.eks. «Annonsen sier at dette er et krav. Det står ikke i CV-en.») og svarfelt «Har du dette? Skriv kort hva du har (valgfritt)», plassholder «For eksempel: Jeg har førerkort klasse B.»
- **«Dokumentert i CV-en»** (grønn): kort per krav med status «Dokumentert» og «Fra CV-en: <sitat i gul markering>».
- **Tomtilstand (ingen gap):** «**Alle krav i annonsen er dokumentert i CV-en.** Du kan gå rett videre til søknadsbrevet.»
- **Mock med egen tekst:** info-boks «**Eksempelsvar fra mock-modus** – Teksten din er ikke analysert. Svaret under er et fast eksempel. Last inn et testpar for å se svar som passer til teksten, eller slå på API-modus for å analysere egen tekst.»
- Modusvalg (radio, fieldset «Hvor mye skal Supersøker skrive?»): «**Helt søknadsutkast**» – «Et sammenhengende brev du redigerer selv.» (standard) / «**Forslag til formuleringer**» – «Setninger du kan bruke i ditt eget brev.»
- Knapper: «Tilbake til CV og annonse», «Lag søknadsbrev».
- Svar bevares når man går fram og tilbake.

### Steg 3 – «Søknadsbrev» [proto]
- To kolonner: **Gap-analyse** (kort: «3 av 4 krav dokumentert», «Mangler dokumentasjon: Førerkort klasse B (du har svart)» eller «(ikke besvart, nevnes ikke i brevet)», «Gå tilbake for å se hele analysen eller endre svar.») og **Søknadsbrev** / **Forslag til formuleringer** (etikett følger modus).
- Redigerbart tekstfelt + «Kopier tekst». Bekreftelse: «Kopiert. Lim inn teksten der du skriver søknaden.» Fallback: «Teksten er markert. Trykk Ctrl+C for å kopiere.»
- Info-boks: «**Teksten tas vare på mens du er innlogget** – Den slettes når du logger ut. Kopier brevet før det.» (endret i `7b648d4`, før: «Teksten lagres ikke»)
- **«Brevet bygger på»**: liste over kilder (CV-linjer, «Annonse: stillingstittel og arbeidsgiver», og «Svaret ditt: «…»» hvis besvart).
- Brevutkast: tittel, «Hei,», nevner stilling + arbeidsgiver, konkrete eksempler fra CV-en, brukerens svar flettes inn ordrett hvis gitt, «Vennlig hilsen <navn>».
- Forslagsmodus: punktliste med sitatforslag; ubesvart gap gir: «Førerkort klasse B er et krav i annonsen og står ikke i CV-en. Forslagene nevner det ikke.»
- **Modellfeil:** «**Vi fikk ikke svar fra språkmodellen** – Prøv igjen om litt. CV-en, annonsen og svarene dine er tatt vare på, så du trenger ikke skrive dem på nytt.» + knapp «Prøv igjen». Resultatfeltene skjules.
- Knapp: «Endre svar eller modus».

### Designvalg i prototypen (godtatt av gruppa i PR #6) [proto]
- Gap før dekkede krav (der brukeren skal handle). Oransje for gap = manglende dokumentasjon, ikke feil.
- Sitat fra CV-en med gul markering for hvert dekket krav (kriterium 3).
- Svarfelt rett under kravet, valgfritt.
- «Brevet bygger på» i tråd med profilen «viser hva den har bygget på».
- Mock-modus merket på hver side (kriterium 8).
- Gruppa: «Rekkefølge, farger, modusvalg, «Brevet bygger på» og mobilvisning: enig.»
- Krav, ønsker og «vi ser etter» i annonsen vises likt.

---

## 4. Beslutninger tatt av gruppa

| Dato / kilde | Beslutning |
|---|---|
| 2026-10-30 [brief, add] | **Omfang:** gap-analyse + søknadsbrev i v1; trinn 2 (CV-forbedring, ATS) er mål ved tid; trinn 3 utsatt. (Claude-forslag godtatt.) |
| 2026-10-30 | **Primærbruker:** student med lite relevant erfaring, første jobb/sommerjobb. |
| 2026-10-30 | **Svarfelt:** variant A – svar gjelder bare aktuell søknad. Variant B (profil) → trinn 3; variant C (ny CV-fil) → trinn 3. |
| 2026-10-30 | **Tone og språk:** bokmål, profesjonell (nøktern) tone. Valg → trinn 3. Elisabeths begrunnelse for valg («tonen er viktig for inntrykket hos arbeidsgiveren») bevart. |
| 2026-10-30 | **Lagring:** bare brukerkontoer permanent; CV, annonse, svar, resultater midlertidig. Originalfiler slettes etter tekstuttrekk. |
| 2026-10-30 | **Språkmodell:** OpenAI `gpt-5-mini`, foreløpig; konfigurerbar. |
| 2026-10-30 | **Budsjett:** 100 kr samlet for betalte API-kall i utviklingstesting; Elisabeth følger opp. |
| 2026-10-30 | **Mappenavn:** `brief-supersoker-2026-09-16` (flyttet med `git mv`). |
| 2026-10-30 | **Suksesskriterier + fire testpar** godkjent som grunnlag for å vurdere v1. |
| 2026-10-26 [add] | Navn på omskrivingsvalg: Mirandas «Helt søknadsutkast» / «Forslag til formuleringer» (ikke «Skriv for meg» / «Gi meg forslag»). |
| 2026-10-26 [add] | Kilde for dekkede krav med (Elisabeth) – hindrer den verste feilen. |
| 2026-10-18 [add] | CV inn: tekst, PDF, TXT i v1 (Claude-forslag, godtatt). ATS flyttet til trinn 2. Eksport → trinn 3, «Kopier tekst» i v1. |
| 2026-10-26 / 2026-10-30 [log 997] | **Testpar:** fire fiktive par i `tests/fixtures/job-applications/` (PR #4, merget 2026-11-02): 01 mangler førerkort B (førstehjelpskurs er felle), 02 mangler TIG-sveising («Word og Excel» skal dekke «Office-pakken»), 03 arrangementsplanlegging dokumentert kun i studieprosjekt + tysk mangler, 04 alle krav dekket (null gap). Format: `cv.txt`, `annonse.txt`, `fasit.json` (`kilde` står ordrett i CV-en). |
| 2026-10-26 [log 997] | **Politiattest:** tatt ut av testpar 1 (kan ikke dokumenteres i CV). Om det skal bli egen kategori er **ikke** besluttet → PRD. |
| 2026-10-30 [log 997] | **Gråsoner** (f.eks. «Tysk – grunnleggende») holdt utenfor par 3 fordi testpar bør ha entydig fasit; avgjøres i PRD. |
| 2026-11-02 [add, proto, PR #6 Helle] | Resultat tas vare på i økten, slettes ved utlogging. Mock på ukjent input: eksempelsvar med tydelig beskjed, **ingen regelbasert analyse i mock**; knapp laster testpar. Krav/ønsker/«vi ser etter» vises likt. Prototypens rekkefølge, farger, modusvalg, «Brevet bygger på», mobilvisning godtatt. |

---

## 5. Begrensninger og rammer

**Teknologi/modell [brief]**
- Nettapplikasjon. Teknologistakk er ikke valgt i briefen; faglærer: «Hold arkitekturen enkel, og samle LLM-kall i én modul.» [fb]
- OpenAI `gpt-5-mini` foreløpig; må bekreftes med testparene og kostnadsvurdering før integrasjon. Modell konfigurerbar.
- Alle modellkall i **én modul** med utskiftbar mock- og API-implementasjon.
- API-nøkkel kun på serveren via lokal miljøkonfigurasjon; `.env` utenfor Git; `.env.example` med tomme plassholdere og valg av mock/API-modus.
- Mock er standard og sender ingen data ut. API-modus krever aktivt valg, **begrenset inn- og utdatalengde** og **ingen automatiske gjentatte kall**.
- Budsjett 100 kr; hvordan grensen håndheves beskrives i arkitekturen før betalte kall aktiveres. Åpent punkt: Elisabeth setter grense i OpenAI-kontoen [log issues].

**Personvern/sikkerhet [brief]**
- Passord som sikre hasher. Eierskapskontroll på serversiden.
- Ingen permanent lagring av CV, annonse, svar, resultater; originalfiler slettes etter tekstuttrekk. Arkitektur skal konkretisere midlertidig lagring, sletting og beskyttelse ved overføring.
- Full kryptering først hvis dokumentlagring innføres senere.
- Ekte CV-er aldri i repo, testdata eller logger.
- Brukeren skal informeres om at CV og annonse sendes til ekstern leverandør før ekte modell brukes.
- Demonstrasjon og testing med fiktive dokumenter.
- Faglærer: CV-er er personopplysninger og sendes til ekstern KI-tjeneste (middels–høy risiko) [fb]. GDPR nevnes ikke eksplisitt i noen kilde [inferred: implisitt via «personopplysninger»].

**KI-ærlighet / ingen fabrikasjon [brief]**
- Brevet bygger bare på CV, annonse og brukerens svar.
- Legger ikke til erfaring brukeren ikke har oppgitt; påstår aldri at et krav er oppfylt når det ikke er dokumentert.
- Resultater omtaler **manglende dokumentasjon**, ikke manglende kompetanse.
- Manglende opplysninger (tittel/arbeidsgiver) i annonser skal **etterspørres, ikke gjettes** (kriterium 5).
- Brukeren redigerer teksten før bruk.
- ATS-hjelp senere er veiledning uten garanti.
- Verste feil: krav merket dekket uten grunnlag i CV-en [add].

**Universell utforming [proto]**
- Etiketter på alle felt, synlig fokus (3 px outline), `aria-live` på feil- og statusmeldinger (`assertive` for modellfeil), `aria-invalid` og fokus til første ugyldige felt, `aria-current` i stegliste, fieldset/legend for modusvalg, fokus til overskrift ved stegbytte.
- Lys og mørk modus (`prefers-color-scheme`), `prefers-reduced-motion`.
- Fonter: Atkinson Hyperlegible (brødtekst), Bricolage Grotesque (overskrifter).
- Farge alene bærer ikke status – tekstetiketter «Mangler dokumentasjon»/«Dokumentert» [inferred fra markup].

**Plattform/formfaktor**
- Nettapp, lokal kjøring etter README [brief].
- Responsiv: to kolonner stables under 760 px; stegliste viser bare aktivt steg på mobil [proto].

**Kjørbarhet [brief, fb]**
- Sensor skal kunne starte lokalt i mock-modus med testbruker og fiktive data uten API-nøkkel, betaling eller gruppens infrastruktur. Faglærer vurderte dette som «Stor risiko».

---

## 6. Suksesskriterier / evalueringskriterier [brief]

1. **Kjerneflyt:** testbruker kan logge inn, legge inn CV via innliming, TXT og tekstbasert PDF, legge inn annonse og få begge resultattypene med hvert testpar, uten stopp eller krasj.
2. **CV inn:** innlest tekst fra PDF/TXT vises, inneholder CV-ens innhold (utdanning, erfaring, ferdigheter) og kan rettes. Tomme inndata, feil filformat og filer uten lesbar tekst gir forståelig melding med forslag til tiltak; går ikke videre med tom CV.
3. **Gap-analyse:** for hvert testpar finnes alle forhåndsdefinerte gap, og ingen forhåndsdefinerte dokumenterte kvalifikasjoner merkes som manglende. Hvert gap knyttes til konkret krav og omtales som manglende dokumentasjon. Hvert dekket krav vises med hvor i CV-en det ble funnet.
4. **Svar på manglende krav:** brevet bruker det brukeren skrev og legger ikke til detaljer som ikke står i svaret.
5. **Søknadsbrev:** «Helt søknadsutkast» nevner riktig stillingstittel og arbeidsgiver og minst ett relevant eksempel fra CV-en. Manglende opplysninger i andre annonser etterspørres, ikke gjettes. Ingen erfaring/utdanning/sertifisering uten grunnlag.
6. **Omskrivingsgrad:** «Forslag til formuleringer» gir liste; «Helt søknadsutkast» gir sammenhengende brev. Begge prøves med samme testpar og beholder faktagrunnlaget.
7. **Sikkerhet og feil:** bruker A får ikke tilgang til bruker Bs kontoopplysninger eller midlertidige data i aktiv økt, heller ikke via direkte forespørsler. Manglende API-nøkkel, API-feil og ugyldige modellsvar gir forståelig feilmelding. Hemmeligheter vises ikke; inndata beholdes i skjemaet.
8. **Kjørbarhet:** sensor kan følge README, starte lokalt i mock-modus og prøve hele kjerneflyten med testbruker og fiktive data. Mock-modus merkes tydelig.

**Teststrategi [brief, add]:**
- Mock-svar for stabile flyttester; samme par vurderes separat mot ekte modell med registrerte resultater («mock-tester dokumenterer ikke modellens kvalitet»).
- Parene kjøres på nytt hver gang prompts endres.
- Brevkvalitet sjekkes manuelt med sjekkliste.
- Tester er «planlagt, ikke laget».
- «Mindre tidsbruk og bedre søknader er ønsket brukernytte, men hevdes ikke som dokumentert effekt.»

**Feiltyper i gap-analysen [add]:**

| Feil | Eksempel | Konsekvens |
|---|---|---|
| Overser krav | glemmer «førerkort B» | ingen spørsmål, brevet nevner det ikke |
| Finner på krav | «Python» som ikke står i annonsen | forvirrende |
| Sier mangler, men står i CV | forstår ikke at «regneark» er Excel | irriterende, men kan svares |
| **Sier dekket, men står ikke i CV** | tror studenten har førerkort | **verst**: skjult, kan gi usanne påstander |

---

## 7. Faglærers tilbakemelding (2026-10-06) og status

| Punkt [fb] | Adressert? | Hvordan [add] |
|---|---|---|
| Suksesskriterier for vage | Ja | Åtte sjekkbare kriterier, bl.a. tittel + arbeidsgiver (krit. 5) |
| Omfanget for stort | Ja | V1 / trinn 2 / trinn 3 etter faglærers forslag |
| Faste testpar med kjente gap (3–4) | Ja | Fire fiktive par (PR #4) |
| Planlegg språkmodell, nøkkel, testmodus | Ja | `gpt-5-mini`, nøkkel på server, `.env.example`, mock som standard |
| Avklar sikkerhetsnivå i v1 | Ja | Hasher, eierskapskontroll, ingen dokumentlagring |
| Konkret primærbruker | Ja | Student, første jobb/sommerjobb |
| Konkret eksempel i problem | Ja | Student som søker sommerjobb |
| Eksportformat og CV-mal | Utsatt | Avgjøres hvis trinn 3 prioriteres |
| Kjørbar for sensor uten nøkler | Ja (plan) | Kriterium 8 |
| Mappenavn med mellomrom og «&» | Ja | Omdøpt |
| Skisser resultatvisning og valg av omskrivingsgrad | Ja (2026-11-01/02) | Klikkbar prototype, PR #6 (i [add] stod «skisser lages i UX-steget etter PRD»; prototypen kom før PRD) |
| Gap-analysen kan delvis gjøres regelbasert | **Nei – ikke besluttet** | Ligger i «Innspill til PRD» |
| Hva betyr «relevant»? (BMAD-risiko) | Delvis | Erstattet av konkrete kriterier [inferred] |
| Domenelogikk lav–middels; KI-funksjonalitet høy; håndtering av svar som finner på erfaring | Delvis | Ærlighetsregler + kildevisning; validering av modellsvar ikke spesifisert [inferred] |
| Fortsett med branch/PR; oppdater brief i repoet | Ja | PR #3–#6, addendum med historikk |

Faglærers samlede vurdering: «Godt utgangspunkt med justeringer», vanskelighetsgrad **middels**, «Gjennomførbart med justert omfang».

---

## 8. «Innspill til PRD» (ikke besluttet) – gjengitt fra [add]

> Disse punktene kom fram i en gjennomgang av briefen mot faglærers tilbakemelding 2026-10-30 (forslag fra Claude). De er ikke gruppebeslutninger, men noe den som skriver PRD kan ta stilling til.

1. **Regelbasert kontroll i gap-analysen.** Faglærer pekte på at gap-analysen delvis kan gjøres regelbasert (nøkkelord i annonsen mot CV-en) for å få mer kontrollerbar logikk. Etter nedskaleringen er domenelogikken den tynneste delen av v1, så dette kan styrke både omfang og testbarhet:
   - Regelbasert matching kan enhetstestes direkte mot testparene, uten mock.
   - Den kan brukes som kontroll av modellsvaret, for eksempel ved å varsle når modellen merker et krav som dekket uten at noe i CV-en matcher. Det er den feilen tabellen «Mulige feil i gap-analysen» kaller verst.
   - Ren nøkkelordmatching kjenner ikke igjen synonymer («regneark» og «Excel»), så den bør være en kontroll ved siden av modellen, ikke en erstatning.

2. **Krav som ikke kan dokumenteres i en CV** (fra arbeidet med testparene, PR #4). Noen krav, som politiattest, leveres etter ansettelse og kan ikke stå i en CV. PRD bør avgjøre om gap-analysen skal ha en egen kategori for slike vilkår, eller om de skal behandles som vanlige krav som brukeren kan svare på i svarfeltet. Testpar for dette lages først når fasiten er bestemt.
   - (Fra [fix]: «Appen bør trolig ikke melde slike krav som gap. Det krever en egen kategori («vilkår ved ansettelse») som product brief ikke har.»)

3. **Gråsoner med svake kunnskaper** (fra arbeidet med testparene, PR #4). Et eksempel er «Tysk – grunnleggende fra ungdomsskolen» mot kravet «kunnskaper i tysk». PRD bør avgjøre om slike tilfeller regnes som dekket, som manglende eller som en egen status, for eksempel «delvis dokumentert». En egen status gir mer nyanserte resultater, men flere tilfeller å teste.

*Fra walkthrough av PR #3, 2026-11-01 (risikopunkter foreslått av Claude, valgt ut av Elisabeth):*

4. **Hva mock-modus svarer på ukjent input.** Sensor ser trolig bare mock-modus og vil teste «feil input og uventet bruk», for eksempel med en egen CV og annonse. Hvis mock da gir et fast svar laget for et av testparene, ser appen ødelagt ut. PRD bør avgjøre hvordan mock oppfører seg på input som ikke er et testpar, for eksempel et tydelig merket eksempelsvar som sier at teksten ikke er analysert, eller en enkel regelbasert analyse.
   → *Besvart 2026-11-02 (Helle, PR #6):* eksempelsvar med tydelig beskjed holder; ingen regelbasert analyse i mock; knapp som laster inn testpar.

5. **Hva som regnes som bestått med ekte modell.** Kriterium 3 krever at alle forhåndsdefinerte gap blir funnet, men modellen kan svare ulikt fra kjøring til kjøring, og noen fasiter er tolkninger (for eksempel at «samarbeidsevner» er dekket av et gruppeprosjekt). PRD bør si om kriteriet gjelder én kjøring, flere kjøringer eller en andel, og hvordan avvik registreres.
   → **Ubesvart.**

6. **Hva som skjer med resultatet uten permanent lagring.** Briefen sier at resultatene kan leses uten ny analyse, og at teksten kan redigeres, men ingenting lagres permanent. PRD bør avgjøre hva brukeren skal oppleve hvis siden lastes på nytt eller økten utløper, slik at et redigert brev ikke forsvinner uten varsel. Arkitekturen må deretter velge hvor midlertidige data ligger.
   → *Besvart 2026-11-02 (Helle, PR #6):* resultatet tas vare på mens økten varer, og slettes ved utlogging. (Øktutløp/timeout og om *redigert* tekst bevares er ikke eksplisitt avklart [inferred].)

7. **Ingen CV-innhold i logger** (til arkitekturen). Briefen sier at ekte CV-er ikke skal ligge i logger, men det er lett å bryte under feilsøking, for eksempel ved å logge prompter eller modellsvar. Det bør bli en regel i arkitekturen og et punkt i kodereview, sammen med at API-nøkler aldri committes.

8. **Svar fra UX-prototypen (PR #6, 2026-11-02).** Helle svarte på innspillene i prototypen:
   - *Resultat uten permanent lagring:* resultatet tas vare på mens økten varer, og slettes ved utlogging.
   - *Mock på ukjent input:* et eksempelsvar med tydelig beskjed holder; ingen regelbasert analyse i mock. En knapp som laster inn et testpar gjør det enkelt for sensor å se en meningsfull gjennomgang.
   - *Krav og ønsker:* annonsens krav, ønsker og «vi ser etter» vises likt.

9. **Svar i søknaden eller i CV-en?** (Helle, PR #6.) Briefen sier at brukerens svar på et manglende krav brukes i søknadsbrevet. Helle påpekte at noe, som førerkort, heller hører hjemme i CV-en enn i søknaden. PRD bør avgjøre om svarfeltet skal føre til tekst i brevet, et forslag om å legge opplysningen inn i CV-en, eller begge deler. Å skrive svaret inn i en ny CV-fil er i trinn 3 (variant C), men et forslag i tekst kan være med i v1 uten CV-mal.
   → **Ubesvart.** Prototypen viser fortsatt briefens løsning (svar flettes inn i brevet).

10. **Lagring av resultater som kandidat til trinn 2.** Hvis det blir tid, er lagring av gap-analyse og brev per bruker den enkleste utvidelsen som gir mer datalagring og en mer meningsfull test av eierskap.

**Party mode-konklusjon (2026-11-01) [log 995]:** Med 6 uker igjen er tid hovedrisikoen, ikke for lett omfang. Regelbasert kontroll er «den billigste måten å gjøre v1 mer krevende på, men den hører hjemme i en story, ikke nå». Mary trakk forslaget om lagring av resultater.

---

## 9. Risikoer og åpne spørsmål

**Uavklart, må tas i PRD:**
- Svarfelt → brev, CV-forslag, eller begge (Helles punkt 3).
- Politiattest/vilkår ved ansettelse: egen kategori eller vanlig krav?
- Gråsoner: dekket / manglende / «delvis dokumentert»?
- Regelbasert kontroll av modellsvar: med i v1 eller ikke?
- Bestått-kriterium med ekte modell: én kjøring, flere, andel? Hvordan avvik registreres?
- Øktutløp: hva skjer med redigert brev ved timeout/reload [inferred – delvis besvart].
- Hvordan modellen skal **etterspørre** manglende tittel/arbeidsgiver (krit. 5) – UI for dette finnes ikke i prototypen [inferred].
- Håndtering av ugyldige modellsvar (krit. 7) – format/validering av strukturert svar ikke spesifisert [inferred].
- Innloggingsflyt (registrering? glemt passord? testbruker-seeding) ikke spesifisert; prototypen sier bare «vanlig innloggingsside med feilmeldinger».
- Hvor mange krav en annonse kan ha / lengdegrenser for input (API-modus skal ha begrensning; tall ikke satt) [inferred].
- Hvordan 100 kr-grensen håndheves teknisk (overlatt til arkitekturen).
- Varsel om ekstern leverandør: hvor og hvordan i UI (finnes ikke i prototypen) [inferred].
- Mock-bryter mellom mock og API i UI vs. kun `.env`? Prototypen sier «slå på API-modus» uten å vise hvordan [inferred].

**Risikoer:**
- Tid: 6 uker igjen per 2026-11-01, PRD/arkitektur/kode ikke startet; frist antatt rundt 13.12 [log 995].
- PDF-lesing upålitelig for CV-er med kolonner og tabeller [add, fb].
- Modell ikke-deterministisk; noen fasiter er tolkninger.
- Verste feil: falsk «dekket» → usanne påstander.
- CV-innhold i logger under feilsøking.
- Modellvalg `gpt-5-mini`: tilgjengelighet og pris ikke verifisert.
- Kjørbarhet for sensor uten nøkkel (faglærer: «Stor risiko»).
- Ukeplan og budsjettgrense i OpenAI-kontoen er åpne punkter [log issues].

---

## 10. Kvalitative føringer (tone, stemme, følelse)

- **Ærlighet framfor overtalelse:** «uten at brevet påstår noe som ikke stemmer»; «uten å overdrive kompetansen».
- **Spør heller enn å gjette**; «viser hva den har bygget på».
- **Brukeren har kontroll:** styrer omskrivingsgrad, redigerer selv, svarer valgfritt.
- **Ikke-dømmende språk om mangler:** alltid «mangler dokumentasjon», aldri «mangler kompetanse». Oransje, ikke rød: «det er manglende dokumentasjon, ikke en feil». Fast formulering: «At noe ikke står i CV-en, betyr ikke at du mangler det.»
- **Brevets tone:** nøktern, profesjonell, norsk bokmål; enkel og personlig hilsen («Hei,» … «Vennlig hilsen») i prototypeutkastet; konkrete eksempler fra CV-en framfor generelle superlativer [inferred fra prototypetekst].
- **Brukermeldinger:** korte, du-form, overskrift + handlingsforslag (hva skjedde → hva du kan gjøre), beroligende ved feil («du trenger ikke skrive dem på nytt»).
- **Transparens om mock:** tydelig, gjentatt merking; aldri late som om egen tekst er analysert.
- **Nøktern om effekt:** ingen påstander om tidsbesparelse eller bedre søknader; ingen garanti for intervju/ATS.
- **Lesbarhet:** valg av Atkinson Hyperlegible (font designet for lesbarhet) signaliserer tilgjengelighet som verdi [inferred].
- **Smal, rolig arbeidsflate** (maks 980 px), tre tydelige steg.

---

## Vedlegg: endringer i commit `7b648d4` (2026-11-02, «Oppdater prototype og PRD-innspill etter svar i PR #6»)

Filer: `addendum.md` (+9/−1), `.memlog.md` (+1), `prototype-kjerneflyt.html` (+20/−7).

- **Prototype:**
  - Ny knapp «Last inn eksempel (testpar 1)» med bekreftelsesmelding.
  - Resultatmelding endret fra advarsel «Teksten lagres ikke – Kopier brevet før du lukker siden eller logger ut» til info «Teksten tas vare på mens du er innlogget – Den slettes når du logger ut. Kopier brevet før det.»
  - Mock-melding på ukjent input utvidet med «Last inn et testpar for å se svar som passer til teksten».
  - Designnotatene: «Åpne spørsmål» erstattet av «Tilbakemelding fra gruppa (PR #6, 2026-11-02)» og «Åpent spørsmål til PRD» (svar i brev vs. CV; innlogging ikke skissert).
- **Addendum:** `updated` 2026-11-02; nye avsnitt «Svar fra UX-prototypen (PR #6)» og «Svar i søknaden eller i CV-en?».
- **Memlog:** hendelse 2026-11-02 med Helles svar.
- Følgecommit `ea51230` logger økten i `.logs/elizabeth/994-…`.
