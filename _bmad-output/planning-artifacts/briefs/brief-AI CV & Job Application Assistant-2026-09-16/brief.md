---
title: "Produktbrief: Supersøker - AI CV & Job Application Assistant"
status: draft
created: 2026-09-16
updated: 2026-10-26
---

# Supersøker - AI CV & Job Application Assistant

## Executive Summary

Verktøyet "Supersøker" skal hjelpe studenter og unge jobbsøkere med å tilpasse CV og søknadsbrev til en konkret stillingsannonse. Ved å se brukerens dokumenter i sammenheng med arbeidsgiverens behov skal assistenten gjøre det enklere å fremheve relevant erfaring, forstå kvalifikasjonsgap og utforme en målrettet søknad.

Løsningen utvikles som en nettapplikasjon i semesterprosjektet i IBE160 Programmering med KI ved Høgskolen i Molde. Første versjon prioriterer en stabil flyt fra innlogging, CV og stillingsannonse til gap-analyse og søknadsbrev. Brukeren skal styre graden av omskriving. Briefen er revidert etter faglærerens tilbakemelding 6. oktober 2026; forslag merket nedenfor må avklares av gruppen før PRD ferdigstilles.

**Dette må gruppen bli enig om før briefen ferdigstilles**

Punktene nedenfor er forslag i dette utkastet, ikke registrerte gruppebeslutninger. Kryss av først når gruppen har diskutert og bekreftet valget. Ved andre valg oppdateres de berørte avsnittene.

- [ ] **Omfang:** Er vi enige om søknadsbrev og gap-analyse i v1, og at CV-forbedringer, ATS, CV-mal, DOC, tidligere søknader og eksport utsettes? Se «Scope».
- [ ] **Primærbruker:** Skal vi prioritere studenter med lite relevant erfaring som søker første jobb eller sommerjobb? Se «Who This Serves».
- [ ] **Brukerflyt og språk:** Skal vi bruke tre steg, to resultatfelt og valgene «Forslag til formuleringer» og «Helt søknadsutkast», med norsk bokmål og profesjonell tone i v1? Se «The Solution».
- [ ] **Lagring:** Skal CV-er, annonser og resultater bare behandles midlertidig, uten permanent dokumentlagring i v1? Se «Scope – Sikkerhet i v1».
- [ ] **Språkmodell:** Skal vi prøve den foreslåtte modellen `gpt-5-mini`, og bekrefte valget etter testing av kvalitet, tilgjengelighet og pris? Se «Scope – Modell og kostnad».
- [ ] **Budsjett:** Er 100 kroner en passende samlet grense for betalte API-kall i utviklingstestingen, og hvem følger opp forbruket? Beløpet er et forslag, ikke en beregnet kostnad.
- [ ] **Godkjenning av resultatene:** Er vi enige om suksesskriteriene og de fire fiktive testparene som grunnlag for å vurdere om v1 fungerer? Se «Success Criteria».

Eksportformat og feltene i CV-malen trenger ikke avgjøres nå dersom disse funksjonene holdes utenfor v1. Å lage testdata, mock-modus og README er videre arbeid etter at planen er avklart.

## The Problem

Mange studenter og unge jobbsøkere synes det er vanskelig å forstå hvilke kvalifikasjoner en arbeidsgiver legger mest vekt på. De er usikre på hvilke deler av egen erfaring som er relevante, hva CV-en mangler, og hvordan de bør formulere søknaden for den aktuelle stillingen.

Dette gjør at hver søknad kan ta mye tid, samtidig som resultatet blir generelt og lite tilpasset. Behovet er både hjelp til å skrive og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav. Problembeskrivelsen er gruppens utgangspunkt; den er foreløpig ikke dokumentert gjennom brukerundersøkelser i prosjektet.

Et illustrerende eksempel er en student som søker sin første relevante sommerjobb. Studenten har erfaring fra butikk og studieprosjekter, men trenger hjelp til å se hva som er relevant for annonsen, og hvilke etterspurte kvalifikasjoner CV-en ikke dokumenterer.

## The Solution

Brukeren logger inn, limer inn CV-tekst eller laster opp en TXT-fil eller tekstbasert PDF, og limer inn stillingsannonsen. Innlest CV-tekst vises for kontroll og retting før analysen. Skannede PDF-er og OCR inngår ikke; hvis teksten ikke kan leses, får brukeren beskjed og kan lime den inn manuelt.

Assistenten skal:

- Lage et søknadsbrev tilpasset stillingen og brukerens bakgrunn.
- Gjøre en gap-analyse mellom CV og stillingsannonse og peke på kvalifikasjoner som mangler i dokumentasjonen.

Foreslått betjening er tre steg: (1) CV og annonse, (2) valg mellom «Forslag til formuleringer» og «Helt søknadsutkast», (3) resultater i to tydelig merkede felt: «Gap-analyse» og «Søknadsbrev/forslag». Begge resultatene skal kunne leses uten å starte en ny analyse. V1 bruker norsk bokmål og en nøktern, profesjonell tone; egne språk- og stilvalg utsettes.

At en kvalifikasjon ikke står i CV-en, betyr ikke nødvendigvis at brukeren mangler den. Resultatene skal derfor omtale manglende dokumentasjon og be brukeren kontrollere innholdet. Assistenten skal ikke finne på erfaring eller kvalifikasjoner. Brukeren redigerer teksten før bruk. Senere ATS-hjelp skal være veiledning uten garanti for å passere et system eller få intervju.

## What Makes This Different

Produktets tiltenkte profil er støtte for studenter og unge jobbsøkere, med kontroll over hvor omfattende AI-bearbeidingen skal være. Kombinasjonen av skrivehjelp og forklaring av gap skal hjelpe brukeren med både søknaden og forståelsen av hva stillingen etterspør.

Funksjonskombinasjonen er ikke dokumentert som unik. [Teal](https://www.tealhq.com/tool/cover-letter-generator) tilbyr allerede søknadsbrev basert på CV og stillingsannonse, og [Jobscan](https://www.jobscan.co/resume-scanner) sammenligner CV-er med stillingsannonser. Prosjektets verdi må derfor vurderes ut fra hvor nyttig og forståelig løsningen blir for den valgte målgruppen.

## Who This Serves

Foreslått primærbruker er en student med begrenset relevant arbeidserfaring som søker sin første relevante jobb eller sommerjobb. Brukeren trenger hjelp til å knytte deltidsarbeid, utdanning og studieprosjekter til annonsen, uten å overdrive kompetansen. Andre unge jobbsøkere er en sekundærmålgruppe.

## Success Criteria

V1 skal kunne demonstreres og kontrolleres mot følgende kriterier:

1. **Kjerneflyt:** En testbruker kan logge inn, legge inn CV via innliming, TXT og tekstbasert PDF, legge inn annonse og få begge resultattypene. Tomme inndata og uleselige filer gir forståelig feilmelding.
2. **Gap-analyse:** For hvert fast testpar finnes alle forhåndsdefinerte gap i resultatet, og ingen forhåndsdefinerte dokumenterte kvalifikasjoner merkes som manglende. Hvert gap knyttes til et konkret krav i annonsen og omtales som manglende dokumentasjon.
3. **Søknadsbrev:** I modusen «Helt søknadsutkast» nevnes riktig stillingstittel og arbeidsgiver, og minst ett relevant eksempel fra CV-en. Tittel og arbeidsgiver oppgis i testannonsene; manglende opplysninger i andre annonser skal etterspørres, ikke gjettes. Ingen erfaring, utdanning eller sertifisering uten grunnlag i CV-en skal tilføyes.
4. **Omskrivingsgrad:** «Forslag til formuleringer» gir en liste med forslag, mens «Helt søknadsutkast» gir et sammenhengende brev. Begge valg prøves med samme testpar og beholder faktagrunnlaget.
5. **Sikkerhet og feil:** Bruker A får ikke tilgang til bruker Bs data, heller ikke gjennom direkte forespørsler. Manglende API-nøkkel, API-feil og ugyldige modellsvar gir en forståelig feilmelding. Hemmeligheter vises ikke, og inndata beholdes i skjemaet.
6. **Kjørbarhet:** Sensor kan følge README, starte lokalt i mock-modus og prøve hele kjerneflyten med testbruker og fiktive data uten API-nøkkel, betaling eller gruppens infrastruktur. Mock-modus merkes tydelig.

Gruppen skal lage fire faste, fiktive CV/annonse-par i `tests/fixtures/job-applications/`, med forventede gap og dokumenterte kvalifikasjoner: (1) manglende sertifikat, (2) manglende verktøykompetanse, (3) relevant studieprosjekt som dokumenterer et krav, og (4) alle angitte krav dokumentert. Mock-svar brukes til stabile flyttester. De samme parene vurderes separat mot ekte modell, med registrerte resultater; mock-tester dokumenterer ikke modellens kvalitet. Testdata og tester er planlagt, ikke laget gjennom denne briefoppdateringen.

Mindre tidsbruk og bedre søknader er ønsket brukernytte, men hevdes ikke som dokumentert effekt i semesterprosjektet.

## Scope

Forslagslisten i oppgaven er et utgangspunkt, ikke et krav om alle fire KI-funksjoner i v1.

| Trinn | Omfang |
|---|---|
| **Innenfor v1** | Én brukerrolle, sikker innlogging, CV som innlimt tekst/TXT/tekstbasert PDF, innlimt annonse, gap-analyse, søknadsbrev med to omskrivingsvalg, redigerbar resultattekst og mock-modus. Tekst kan kopieres manuelt. |
| **Trinn 2, utenfor v1** | Egne CV-forbedringsforslag og ATS-forslag, etter at kjerneflyten er stabil. |
| **Trinn 3, utenfor v1** | Strukturert CV-mal, DOC-støtte, tidligere søknader, språk- og stilvalg og fileksport. CV-malens felter og eksportformat bestemmes først dersom dette trinnet prioriteres. |
| **Utenfor prosjektets kjerne** | Komplett rekrutteringssystem, OCR og garanti for intervju eller ATS-godkjenning. |

**Sikkerhet i v1:** Passord skal lagres som sikre passordhasher, ikke klartekst. Alle lagrede brukerdata skal ha eierskapskontroll på serversiden. Foreslått avgrensning er å ikke lagre CV-er, annonser og resultater permanent i v1; originalfiler slettes etter tekstuttrekk. Arkitekturen skal konkretisere midlertidig lagring, sletting og beskyttelse ved overføring. Full kryptering av permanent lagrede dokumenter vurderes hvis dokumentlagring senere innføres. Ekte CV-er skal ikke ligge i repo, testdata eller logger. Før ekte modell brukes, skal brukeren få beskjed om at CV og annonse sendes til en ekstern leverandør; demonstrasjon og testing bruker fiktive dokumenter.

**Modell og kostnad:** Foreslått modellvalg er OpenAI `gpt-5-mini`, som må bekreftes gjennom testparene og en kostnadsvurdering før integrasjon. Foreslått samlet API-budsjett er 100 kroner for utviklingstesting; beløpet må avklares og håndheving beskrives i arkitekturen før betalte kall aktiveres. Modellen skal kunne konfigureres, og alle modellkall samles i én modul med utskiftbar mock- og API-implementasjon.

**Nøkkel og konfigurasjon:** API-nøkkel brukes bare på serveren via lokal miljøkonfigurasjon; lokal `.env` holdes utenfor Git, mens `.env.example` skal inneholde tomme plassholdere og valg av mock/API-modus.

**Mock og lokal kjøring:** Mock er standard og sender ingen data ut. README skal beskrive lokal oppstart, testbruker og testdata. API-modus skal kreve et aktivt valg, begrenset inn- og utdatalengde og ingen automatiske gjentatte kall.

Modellforslaget bygger på [OpenAIs modelloversikt](https://platform.openai.com/docs/models); tilgjengelighet og pris må kontrolleres ved integrasjon. Dette er en plan for videre arbeid, ikke en bekreftelse på ferdig funksjonalitet.

## Vision

Visjonen er å gjøre det enklere for studenter og unge jobbsøkere å forstå egne muligheter og presentere relevant kompetanse. Semesterprosjektet skal vise hvordan AI kan støtte denne prosessen, samtidig som brukeren påvirker hvordan egen bakgrunn blir formulert. Videre utvikling kan bygge på erfaringene fra første versjon; briefen binder ikke gruppen til flere funksjoner.
