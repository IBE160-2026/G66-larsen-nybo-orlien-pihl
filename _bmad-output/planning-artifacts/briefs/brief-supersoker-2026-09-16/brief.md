---
title: "Produktbrief: Supersøker - AI CV & Job Application Assistant"
status: final
created: 2026-09-16
updated: 2026-10-30
---

# Supersøker - AI CV & Job Application Assistant

> **Godkjent av gruppa (2026-10-30):** Denne versjonen slår sammen to forslag til oppdatering etter faglærers tilbakemelding (`tilbakemelding-product-brief.md`): Elisabeths (PR #3, 2026-10-18) og Mirandas (branch `miranda-utvikling`, 2026-10-26). Hva som er hentet fra hvem, og hvorfor, står i `addendum.md`. Gruppa gikk gjennom de åpne punktene 2026-10-30; beslutningene står nedenfor.

## Executive Summary

Verktøyet "Supersøker" skal hjelpe studenter og unge jobbsøkere med å skrive søknadsbrev som er tilpasset en konkret stillingsannonse, uten at brevet påstår noe som ikke stemmer. Assistenten sammenligner CV-en med annonsen, viser hvilke krav som er dekket og hvilke som mangler, og lar studenten fylle inn erfaring CV-en ikke viser, før søknadsbrevet skrives.

Løsningen utvikles som en nettapplikasjon i semesterprosjektet i IBE160 Programmering med KI ved Høgskolen i Molde. Første versjon (v1) prioriterer en stabil flyt fra innlogging, CV og stillingsannonse til gap-analyse og søknadsbrev. Brukeren skal styre graden av omskriving. Flere funksjoner kommer i senere trinn når v1 er testet og stabil.

**Gruppas beslutninger (2026-10-30)**

- [x] **Omfang:** Gap-analyse og søknadsbrev i v1. CV-forbedringer og ATS (trinn 2) er målet dersom v1 er testet og stabil i tide; CV-mal, DOC, tidligere søknader og eksport (trinn 3) utsettes. Se «Scope».
- [x] **Primærbruker:** Studenter med lite relevant erfaring som søker første jobb eller sommerjobb. Se «Who This Serves».
- [x] **Svar på manglende krav:** Brukeren kan svare på manglende krav i v1, og svarene gjelder bare den aktuelle søknaden. Lagring på profilen er flyttet til trinn 3. Se «The Solution».
- [x] **Tone og språk:** V1 bruker norsk bokmål og profesjonell tone. Valg av tone og språk er flyttet til trinn 3. Se «The Solution».
- [x] **Lagring:** Bare brukerkontoer lagres permanent. CV-er, annonser, svar og resultater behandles midlertidig. Se «Scope – Sikkerhet i v1».
- [x] **Språkmodell:** `gpt-5-mini` er foreløpig valg og bekreftes etter testing av kvalitet, tilgjengelighet og pris. Se «Scope – Modell og kostnad».
- [x] **Budsjett:** 100 kroner samlet for betalte API-kall i utviklingstestingen. Elisabeth følger opp forbruket.
- [x] **Mappenavn:** Brief-mappen heter `brief-supersoker-2026-09-16`, uten mellomrom og «&».
- [x] **Godkjenning av resultatene:** Suksesskriteriene og de fire fiktive testparene er grunnlaget for å vurdere om v1 fungerer. Se «Success Criteria».

Eksportformat og feltene i CV-malen avgjøres først dersom trinn 3 prioriteres.

## The Problem

Mange studenter og unge jobbsøkere synes det er vanskelig å forstå hvilke kvalifikasjoner en arbeidsgiver legger mest vekt på. De er usikre på hvilke deler av egen erfaring som er relevante, hva CV-en mangler, og hvordan de bør formulere søknaden for den aktuelle stillingen.

Dette gjør at hver søknad kan ta mye tid, samtidig som resultatet blir generelt og lite tilpasset. Behovet er både hjelp til å skrive og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav. Problembeskrivelsen er gruppens utgangspunkt; den er foreløpig ikke dokumentert gjennom brukerundersøkelser i prosjektet.

Et illustrerende eksempel er en student som søker sin første relevante sommerjobb. Studenten har erfaring fra butikk og studieprosjekter, men trenger hjelp til å se hva som er relevant for annonsen, og hvilke etterspurte kvalifikasjoner CV-en ikke dokumenterer.

## The Solution

Kjerneflyten i v1 har tre steg:

1. **CV og annonse.** Brukeren logger inn, limer inn CV-teksten eller laster opp en TXT-fil eller tekstbasert PDF, og limer inn stillingsannonsen. Appen viser teksten den leste, og brukeren kan rette den før analysen. Skannede PDF-er og OCR inngår ikke; hvis teksten ikke kan leses, får brukeren beskjed og kan lime den inn manuelt.
2. **Gap-analyse.** Assistenten finner kravene i annonsen og viser hvilke som er dekket, med hvor i CV-en de ble funnet, og hvilke som mangler dokumentasjon. For hvert manglende krav kan brukeren svare i et valgfritt felt, for eksempel «Jeg har førerkort klasse B». Svarene brukes i denne søknaden.
3. **Søknadsbrev.** Brukeren velger mellom «Forslag til formuleringer» og «Helt søknadsutkast». Resultatet vises i to tydelig merkede felt, «Gap-analyse» og «Søknadsbrev/forslag», som kan leses uten å starte en ny analyse. Teksten kan redigeres og kopieres. V1 bruker norsk bokmål og en nøktern, profesjonell tone.

Søknadsbrevet bygger bare på CV-en, annonsen og brukerens egne svar. Det legger ikke til erfaring brukeren ikke har oppgitt, og det påstår aldri at et krav er oppfylt når det ikke er dokumentert. At en kvalifikasjon ikke står i CV-en, betyr ikke nødvendigvis at brukeren mangler den. Derfor får brukeren mulighet til å svare før brevet skrives, og resultatene omtaler manglende dokumentasjon, ikke manglende kompetanse. Brukeren redigerer teksten før bruk. Senere ATS-hjelp skal være veiledning uten garanti for å passere et system eller få intervju.

## What Makes This Different

Produktets profil er ærlig støtte for studenter og unge jobbsøkere: assistenten viser hva den har bygget på, spør i stedet for å gjette, og lar brukeren styre hvor mye KI-en skriver. Kombinasjonen av skrivehjelp og forklaring av gap skal hjelpe brukeren med både søknaden og forståelsen av hva stillingen etterspør.

Funksjonskombinasjonen er ikke dokumentert som unik. [Teal](https://www.tealhq.com/tool/cover-letter-generator) tilbyr allerede søknadsbrev basert på CV og stillingsannonse, og [Jobscan](https://www.jobscan.co/resume-scanner) sammenligner CV-er med stillingsannonser. Prosjektets verdi må derfor vurderes ut fra hvor nyttig og forståelig løsningen blir for den valgte målgruppen.

## Who This Serves

Primærbrukeren er en student med begrenset relevant arbeidserfaring som søker sin første relevante jobb eller sommerjobb. Brukeren trenger hjelp til å knytte deltidsarbeid, utdanning og studieprosjekter til annonsen, uten å overdrive kompetansen. Andre unge jobbsøkere er en sekundærmålgruppe.

## Success Criteria

V1 skal kunne demonstreres og kontrolleres mot følgende kriterier:

1. **Kjerneflyt:** En testbruker kan logge inn, legge inn CV via innliming, TXT og tekstbasert PDF, legge inn annonse og få begge resultattypene med hvert av testparene, uten at appen stopper eller krasjer.
2. **CV inn:** Innlest tekst fra PDF eller TXT vises, inneholder CV-ens innhold (for eksempel utdanning, erfaring og ferdigheter) og kan rettes før analysen. Tomme inndata, feil filformat og filer uten lesbar tekst gir en forståelig melding med forslag til hva brukeren kan gjøre, og appen går ikke videre med en tom CV.
3. **Gap-analyse:** For hvert fast testpar finnes alle forhåndsdefinerte gap i resultatet, og ingen forhåndsdefinerte dokumenterte kvalifikasjoner merkes som manglende. Hvert gap knyttes til et konkret krav i annonsen og omtales som manglende dokumentasjon. Hvert krav som vises som dekket, vises med hvor i CV-en det ble funnet.
4. **Svar på manglende krav:** Når brukeren svarer på et manglende krav, bruker søknadsbrevet det brukeren skrev, og legger ikke til detaljer som ikke står i svaret.
5. **Søknadsbrev:** I modusen «Helt søknadsutkast» nevnes riktig stillingstittel og arbeidsgiver, og minst ett relevant eksempel fra CV-en. Tittel og arbeidsgiver oppgis i testannonsene; manglende opplysninger i andre annonser skal etterspørres, ikke gjettes. Ingen erfaring, utdanning eller sertifisering uten grunnlag i CV-en eller brukerens svar skal tilføyes.
6. **Omskrivingsgrad:** «Forslag til formuleringer» gir en liste med forslag, mens «Helt søknadsutkast» gir et sammenhengende brev. Begge valg prøves med samme testpar og beholder faktagrunnlaget.
7. **Sikkerhet og feil:** Bruker A får ikke tilgang til bruker Bs kontoopplysninger eller midlertidige data i en aktiv økt, heller ikke gjennom direkte forespørsler. Manglende API-nøkkel, API-feil og ugyldige modellsvar gir en forståelig feilmelding. Hemmeligheter vises ikke, og inndata beholdes i skjemaet.
8. **Kjørbarhet:** Sensor kan følge README, starte lokalt i mock-modus og prøve hele kjerneflyten med testbruker og fiktive data uten API-nøkkel, betaling eller gruppens infrastruktur. Mock-modus merkes tydelig.

Gruppen skal lage fire faste, fiktive CV/annonse-par i `tests/fixtures/job-applications/`, med forventede gap og dokumenterte kvalifikasjoner: (1) manglende sertifikat, (2) manglende verktøykompetanse, (3) relevant studieprosjekt som dokumenterer et krav, og (4) alle angitte krav dokumentert. Mock-svar brukes til stabile flyttester. De samme parene vurderes separat mot ekte modell, med registrerte resultater; mock-tester dokumenterer ikke modellens kvalitet. Ekte CV-er brukes ikke som testdata. Testparene er lagt fram i PR #4; testene er planlagt, ikke laget gjennom denne briefoppdateringen.

Mindre tidsbruk og bedre søknader er ønsket brukernytte, men hevdes ikke som dokumentert effekt i semesterprosjektet.

## Scope

Forslagslisten i oppgaven er et utgangspunkt, ikke et krav om alle fire KI-funksjoner i v1. Neste trinn påbegynnes først når det forrige er testet og stabilt.

| Trinn | Omfang |
|---|---|
| **Innenfor v1** | Én brukerrolle, sikker innlogging, CV som innlimt tekst/TXT/tekstbasert PDF, innlimt annonse, gap-analyse med kilde for dekkede krav og svarfelt for manglende krav, søknadsbrev med to omskrivingsvalg, redigerbar resultattekst og mock-modus. Tekst kan kopieres manuelt. |
| **Trinn 2, utenfor v1** | Egne CV-forbedringsforslag og ATS-forslag, etter at kjerneflyten er stabil. Dette er målet dersom v1 er testet og stabil i tide. |
| **Trinn 3, utenfor v1** | Strukturert CV-mal, DOC-støtte, tidligere søknader, lagring av svar som tilleggsopplysninger på profilen, språk- og stilvalg og fileksport. CV-malens felter og eksportformat bestemmes først dersom dette trinnet prioriteres. |
| **Utenfor prosjektets kjerne** | Komplett rekrutteringssystem, OCR og garanti for intervju eller ATS-godkjenning. |

**Sikkerhet i v1:** Passord skal lagres som sikre passordhasher, ikke klartekst. Alle lagrede brukerdata skal ha eierskapskontroll på serversiden. V1 lagrer ikke CV-er, annonser, svar og resultater permanent; originalfiler slettes etter tekstuttrekk. Arkitekturen skal konkretisere midlertidig lagring, sletting og beskyttelse ved overføring. Full kryptering av permanent lagrede dokumenter vurderes hvis dokumentlagring senere innføres. Ekte CV-er skal ikke ligge i repo, testdata eller logger. Før ekte modell brukes, skal brukeren få beskjed om at CV og annonse sendes til en ekstern leverandør; demonstrasjon og testing bruker fiktive dokumenter.

**Modell og kostnad:** Foreløpig modellvalg er OpenAI `gpt-5-mini`, som må bekreftes gjennom testparene og en kostnadsvurdering før integrasjon. Samlet API-budsjett er 100 kroner for utviklingstesting, og Elisabeth følger opp forbruket. Hvordan grensen håndheves, beskrives i arkitekturen før betalte kall aktiveres. Modellen skal kunne konfigureres, og alle modellkall samles i én modul med utskiftbar mock- og API-implementasjon.

**Nøkkel og konfigurasjon:** API-nøkkel brukes bare på serveren via lokal miljøkonfigurasjon; lokal `.env` holdes utenfor Git, mens `.env.example` skal inneholde tomme plassholdere og valg av mock/API-modus.

**Mock og lokal kjøring:** Mock er standard og sender ingen data ut. README skal beskrive lokal oppstart, testbruker og testdata. API-modus skal kreve et aktivt valg, begrenset inn- og utdatalengde og ingen automatiske gjentatte kall.

Modellforslaget bygger på [OpenAIs modelloversikt](https://platform.openai.com/docs/models); tilgjengelighet og pris må kontrolleres ved integrasjon. Dette er en plan for videre arbeid, ikke en bekreftelse på ferdig funksjonalitet.

## Vision

Visjonen er å gjøre det enklere for studenter og unge jobbsøkere å forstå egne muligheter og presentere relevant kompetanse på en ærlig måte. Semesterprosjektet skal vise hvordan KI kan støtte denne prosessen, samtidig som brukeren styrer hvordan egen bakgrunn blir formulert. Videre utvikling kan bygge på erfaringene fra første versjon; briefen binder ikke gruppen til flere funksjoner enn v1.
