# Tilbakemelding på product brief

| | |
|---|---|
| **Gruppe** | G66 – G66-larsen-nybo-orlien-pihl |
| **Product brief** | `_bmad-output/planning-artifacts/briefs/brief-AI CV & Job Application Assistant-2026-09-16/brief.md` (commit b624ead) |
| **Tilbakemelding fra** | Faglærer i IBE160 (utarbeidet med KI-støtte) |
| **Dato** | 2026-10-06 |

## Samlet vurdering

- **Godt utgangspunkt med justeringer.** Gruppen kan gå videre og innarbeide punktene under.

**Det som er bra:**

1. Briefen er ærlig og nøktern. Dere viser til Teal og Jobscan og sier at funksjonskombinasjonen ikke er unik, og dere tar forbehold om at et manglende gap i CV-en ikke betyr at brukeren mangler kvalifikasjonen, og at ATS-hjelp ikke gir noen garanti.
2. Kjerneflyten er tydelig: logg inn → last opp eller fyll inn CV → legg inn stillingsannonse → få søknadsbrev, CV-forslag, gap-analyse og ATS-forslag. At brukeren selv styrer graden av omskriving, er et godt og gjennomtenkt valg. Det er også fint å se at briefen er tatt gjennom en pull request.

**De viktigste endringene:**

1. Suksesskriteriene er for vage til å testes. «Relevante AI-genererte resultater» må konkretiseres, for eksempel at gap-analysen lister minst de kravene i annonsen som ikke finnes i CV-en, og at søknadsbrevet nevner stillingstittel og arbeidsgiver.
2. Omfanget er stort. To innleggingsmåter for CV (mal og opplasting av PDF, DOC og TXT), fire KI-funksjoner, tidligere søknader, tone og stil, sikker innlogging, kryptert lagring og eksport er mye. Dere skriver «slik oppgaven krever», men forslagslista er et utgangspunkt, ikke et krav. Dere kan selv avgrense v1.
3. Planlegg språkmodellen: hvilken modell, hvordan nøkkelen håndteres, og en testmodus med mock-svar, slik at sensor kan kjøre appen uten deres nøkkel. Planlegg også fiktive test-CV-er og -annonser, siden ekte CV-er er personopplysninger.

## Vanskelighetsgrad og gjennomførbarhet

### Vurdert vanskelighetsgrad

- **Middels**

**Sammenlignbart med:** 2) AI CV- og søknadsassistent (middels). Briefen følger forslaget tett, inkludert data inn og ut og sikkerhetskravene.

**Begrunnelse:**

| Faktor | Nivå (lav / middels / høy) | Kommentar |
|---|---|---|
| Domenelogikk – hvor mange og hvor kompliserte regler og beregninger må stemme? | Lav–middels | Lite fast logikk. Det meste styres av språkmodellen. Gap-analysen kan delvis gjøres regelbasert (nøkkelord i annonse vs. CV), noe som gir mer kontrollerbar logikk. |
| Datamodell – antall entiteter og relasjoner mellom dem | Middels | Bruker, CV (opplastet eller strukturert mal), stillingsannonse, søknad/analyse med fire resultattyper, preferanser og tidligere søknader. |
| Brukere, roller og innlogging | Middels | Sikker innlogging med én rolle. Kryptert lagring kommer i tillegg. |
| KI-funksjonalitet i appen, f.eks. kall til språkmodell, prompts i koden og håndtering av usikre svar | Høy | Fire ulike KI-funksjoner med styrbar omskriving, språk og stil. Krever gode prompts og håndtering av svar som finner på erfaring brukeren ikke har. |
| Integrasjoner og eksterne tjenester, f.eks. API-er, betaling og e-post | Middels | LLM-API med nøkkel og kostnad. |
| Sanntid, samtidighet eller flere brukere som påvirker hverandre | Lav | Ingen. |
| Filhåndtering, f.eks. opplasting, PDF-lesing og eksport | Høy | Lesing av PDF, DOC og TXT, i tillegg til eksport i et format som ikke er valgt. Lesing av CV-er med kolonner og tabeller er ofte upålitelig. |
| Sikkerhet og personvern | Middels–høy | CV-er inneholder personopplysninger, og de sendes til en ekstern KI-tjeneste. Kryptert lagring og sikker innlogging er nevnt, men ikke hvordan. |

**Hva vanskelighetsgraden betyr for dere:**

- _Middels:_ Et godt balansert valg. Pass på at kjerneflyten blir ferdig og stabil før dere legger til mer. For Supersøker betyr det: logg inn → lim inn eller last opp CV som tekst/PDF → lim inn annonse → få gap-analyse og søknadsbrev. Få den stabil før CV-mal, DOC-støtte, ATS-forslag og eksport.

### Gjennomførbarhet med BMAD og Claude Code

Dere skal planlegge med BMAD (product brief → PRD → arkitektur → epics og stories) og implementere med Claude Code. Vurderingen under tar hensyn til at det må være tid til hele denne flyten, og til testing, retting og README til slutt.

| Spørsmål | Vurdering (OK / risiko / stor risiko) | Kommentar |
|---|---|---|
| **Tid og omfang** – kan v1 realistisk bli ferdig og stabil i løpet av semesteret, med tid til flere iterasjoner? | Risiko | Med fire KI-funksjoner, to innleggingsmåter, tre filformater, kryptering og eksport er det fare for at alt blir halvferdig. En prioritert v1 er realistisk for en gruppe på fire. |
| **BMAD-flyten** – er briefen konkret nok til at PRD, arkitektur og stories kan lages uten store hull, og blir det overkommelig mange stories? | Risiko | Funksjonene er tydelige, men flere ting er uavklart: eksportformat, hvordan CV-malen ser ut, hvordan tidligere søknader brukes, og hva «relevant» betyr. |
| **Egnet for Claude Code** – bruker løsningen en vanlig, godt dokumentert teknologistakk som Claude Code håndterer godt, eller krever den nisjeteknologi, spesialmaskinvare eller mye manuell konfigurasjon? | OK | Webapp med innlogging, filopplasting og LLM-API er godt dokumentert. |
| **Kontroll på KI-ens arbeid** – kan gruppen selv avgjøre om koden gjør det riktige? Krever domenet kunnskap gruppen ikke har, f.eks. avanserte beregninger eller fagregler, så er det vanskelig å kvalitetssikre. | Risiko | Dere kan vurdere søknadsbrev og forslag selv, men det er vanskelig å sjekke systematisk. Lag 3–4 faste par av fiktiv CV og annonse med kjente gap, og sjekk at appen finner dem. |
| **Testbarhet** – finnes det tydelige regler og forventede resultater som tester kan skrives mot? | Risiko | Innlogging, filinnlesing og lagring kan testes godt. KI-delen krever mock-svar og testpar med forventede gap. |
| **Kjørbar for sensor** – kan appen kjøres lokalt etter README, uten gruppens nøkler, betalte kontoer eller egen infrastruktur? | Stor risiko | Uten testmodus kan ikke sensor prøve noen av de fire funksjonene. Dette må planlegges i arkitekturen. |
| **Avhengigheter og kostnader** – krever løsningen betalte API-er, f.eks. språkmodeller, og finnes det en plan for kostnad, testmodus eller mock-data? | Risiko | Modell, kostnad og testmodus er ikke omtalt. |

**Konklusjon om gjennomførbarhet:**

- **Gjennomførbart med justert omfang.** Se forslagene under.

**Forslag til justering av omfang eller vanskelighetsgrad:**

1. La v1 bestå av innlogging, innliming eller opplasting av CV (TXT og PDF), stillingsannonse, gap-analyse og søknadsbrev med valg av omskrivingsgrad. CV-forbedringsforslag og ATS-forslag kommer i trinn 2. CV-mal, DOC-støtte, tidligere søknader og eksport flyttes til trinn 3 eller «utenfor v1».
2. Bestem hvor langt sikkerhetskravene skal gå i v1, for eksempel trygg passordlagring og at CV-er bare er synlige for eieren. Beskriv full kryptering av lagrede dokumenter som et senere trinn hvis tiden ikke strekker til.

## Hvorfor product brief er viktig for mappen

Product brief er utgangspunktet for PRD, arkitektur, stories og til slutt koden. Del 1 av mappen vurderes blant annet på om sensor kan følge en sporbar vei fra plan til ferdig app. Den vurderes også på om appen gjør det dere har beskrevet, om den er testet, om den er godt designet, og om den kan kjøres etter README. Et uklart, for stort eller for lite brief gjør alt dette vanskeligere senere. Det er mye enklere å rette nå enn sent i semesteret.

## 1. Gjennomgang av briefens deler

| Del av brief | Status | Kommentar |
|---|---|---|
| Executive Summary – er det klart hva appen er, og hvilket problem den løser? | OK | Klart hva Supersøker er og hvem den er for. |
| The Problem – er problemet konkret, med reelle situasjoner og brukere? | OK | Godt beskrevet, og ærlig om at problemet ikke er dokumentert med brukerundersøkelser. Et konkret eksempel (for eksempel en student som søker sommerjobb) ville gjort det enda tydeligere. |
| The Solution – beskriver løsningen brukeropplevelsen, ikke bare teknologi? | OK | Beskriver flyten og hva brukeren får ut, uten å gå inn på teknologi. |
| What Makes This Different – er vurderingen ærlig og realistisk? | OK | Ærlig om konkurrentene og om at verdien ligger i hvor nyttig og forståelig løsningen blir. |
| Who This Serves – er primærbrukerne tydelige, og vet vi hva de trenger? | Juster | «Studenter og unge jobbsøkere» er en god start. Gjør primærbrukeren mer konkret, for eksempel en student uten mye arbeidserfaring som søker første relevante jobb. |
| Success Criteria – kan kriteriene faktisk sjekkes eller testes? | Endre | Kriteriet er en demo av hele flyten, men «relevante resultater» er ikke målbart. Legg til konkrete, sjekkbare kriterier per funksjon. |
| Scope – er det klart hva som er med i første versjon, og hva som ikke er det? | Endre | Alle fire funksjoner og sikkerhetskrav er med, og eksportformat er uavklart. Lag en tydelig «In for v1»/«Explicitly out»-liste med prioritering. |
| Vision – henger visjonen sammen med resten uten å blåse opp omfanget? | OK | Nøktern visjon som ikke binder gruppen til flere funksjoner. |

## 2. Utgangspunkt for del 1 av mappen

Punktene følger kriteriene i sensorveiledningen for del 1. Vektene i parentes viser hvor mye hvert kriterium teller i del 1.

| Kriterium i del 1 | Hva briefen bør legge til rette for | Status | Kommentar |
|---|---|---|---|
| **1. Prosess og KI-styring** (30 %) | Brief som er presis nok til at PRD og stories kan bygges direkte på den, slik at krav kan spores fra brief til kode. | OK | God start med branch og pull request for briefen. Fortsett med det, og avklar de åpne punktene før PRD. |
| **2. Funksjonalitet og omfang** (20 %) | Realistisk omfang for gruppen og semesteret: en tydelig kjerneflyt som kan bli ferdig og stabil, og nok innhold til å vise reell funksjonalitet. | Juster | Nok funksjonalitet, men for mye på én gang. Prioriter i trinn som foreslått over. |
| **3. Kvalitetssikring og testing** (15 %) | Suksesskriterier og funksjoner som er konkrete nok til å bli testtilfeller. | Endre | Kriteriene må gjøres sjekkbare. Faste testpar med kjente gap gir et godt testgrunnlag. |
| **4. Design og brukeropplevelse** (10 %) | Tydelige brukere og brukssituasjoner som designet kan bygges rundt, gjerne med de viktigste skjermbildene eller flytene skissert. | Juster | Flyten er tydelig. Skisser hvordan de fire resultatene vises samtidig, og hvordan brukeren velger omskrivingsgrad. |
| **5. Kodekvalitet og arkitektur** (10 %) | Teknologivalg som er begrunnet og ikke mer komplekse enn appen trenger. | OK | Briefen fastsetter riktig nok ikke teknisk løsning. Hold arkitekturen enkel, og samle LLM-kall i én modul. |
| **6. README og kjørbarhet** (10 %) | Løsning som andre kan kjøre lokalt uten betalte kontoer, og uten tilgang til gruppens egne tjenester og nøkler. | Endre | Avhengig av LLM-nøkkel. Planlegg `.env.example`, testmodus, testbruker og fiktive eksempel-CV-er. |
| **7. Ryddighet i repoet** (5 %) | En plan for hvor hemmeligheter, testdata og dokumentasjon skal ligge. | Juster | Ekte CV-er må aldri ligge i det offentlige repoet. Legg fiktive testdokumenter i en egen mappe, og hold nøkler utenfor repoet. Mellomrom og «&» i mappenavnet for briefen kan gi problemer i kommandolinjen. Vurder et enklere navn. |

## 3. Neste steg for gruppen

1. Skriv om suksesskriteriene til konkrete, sjekkbare kriterier per funksjon, og lag 3–4 fiktive testpar av CV og stillingsannonse med kjente gap.
2. Prioriter scope i trinn, og avklar eksportformat, CV-mal og hvor langt sikkerhetskravene går i v1.
3. Velg språkmodell og beskriv testmodus. Gå deretter videre til PRD.

Oppdater product brief i repoet når dere har gjort endringene, slik at historikken viser hvordan planen utviklet seg. Det er en del av prosessen sensor ser etter.
