---
title: "Produktbrief: Supersøker - AI CV & Job Application Assistant"
status: draft
created: 2026-09-16
updated: 2026-10-18
---

# Supersøker - AI CV & Job Application Assistant

> **Forslag til oppdatering (2026-10-18):** Denne versjonen innarbeider faglærers tilbakemelding (`tilbakemelding-product-brief.md`). Endringene er et forslag fra Elisabeth og venter på gruppas gjennomgang og godkjenning. Begrunnelser og forkastede alternativer står i `addendum.md`. Spørsmål gruppa må avgjøre står under «Åpne spørsmål til gruppa».

## Executive Summary

Verktøyet "Supersøker" skal hjelpe studenter og unge jobbsøkere med å skrive søknadsbrev som er tilpasset en konkret stillingsannonse, uten at brevet påstår noe som ikke stemmer. Assistenten sammenligner CV-en med annonsen, viser hvilke krav som er dekket og hvilke som mangler, og lar studenten fylle inn erfaring CV-en ikke viser, før søknadsbrevet skrives.

Løsningen utvikles som en nettapplikasjon i semesterprosjektet i IBE160 Programmering med KI ved Høgskolen i Molde. Første versjon (v1) skal demonstrere en sammenhengende og stabil flyt fra innlogging og CV til gap-analyse og søknadsbrev. Flere funksjoner kommer i senere trinn når v1 er testet og stabil.

## The Problem

Mange studenter og unge jobbsøkere synes det er vanskelig å forstå hvilke kvalifikasjoner en arbeidsgiver legger mest vekt på. De er usikre på hvilke deler av egen erfaring som er relevante, hva CV-en mangler, og hvordan de bør formulere søknaden for den aktuelle stillingen.

Dette gjør at hver søknad kan ta mye tid, samtidig som resultatet blir generelt og lite tilpasset. Behovet er både hjelp til å skrive og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav. Problembeskrivelsen er gruppens utgangspunkt; den er foreløpig ikke dokumentert gjennom brukerundersøkelser i prosjektet.

## The Solution

Kjerneflyten i v1:

1. Brukeren logger inn.
2. Brukeren limer inn CV-teksten eller laster opp CV-en som PDF eller TXT. Appen viser teksten den leste, og brukeren kan rette den før hen går videre.
3. Brukeren limer inn stillingsannonsen.
4. Assistenten gjør en gap-analyse: den finner kravene i annonsen og viser hvilke som er dekket (med hvor i CV-en de ble funnet) og hvilke som mangler.
5. For hvert manglende krav kan brukeren svare i et valgfritt felt, for eksempel «Jeg har førerkort klasse B». Svarene lagres som tilleggsopplysninger på profilen og gjenbrukes i senere søknader.
6. Brukeren velger grad av omskriving («Skriv for meg» eller «Gi meg forslag»), tone (formell, nøytral eller personlig) og språk (norsk eller engelsk), og får et søknadsbrev som kan kopieres.

Søknadsbrevet bygger bare på CV-en, annonsen og brukerens egne svar. Det legger ikke til erfaring brukeren ikke har oppgitt, og det påstår aldri at et krav er oppfylt når det ikke er dokumentert. At en kvalifikasjon ikke står i CV-en, betyr ikke nødvendigvis at brukeren mangler den. Derfor får brukeren mulighet til å svare før brevet skrives.

## What Makes This Different

Produktets profil er ærlig støtte for studenter og unge jobbsøkere: assistenten viser hva den har bygget på, spør i stedet for å gjette, og lar brukeren styre hvor mye KI-en skriver. Kombinasjonen av skrivehjelp og forklaring av gap skal hjelpe brukeren med både søknaden og forståelsen av hva stillingen etterspør.

Funksjonskombinasjonen er ikke dokumentert som unik. [Teal](https://www.tealhq.com/tool/cover-letter-generator) tilbyr allerede søknadsbrev basert på CV og stillingsannonse, og [Jobscan](https://www.jobscan.co/resume-scanner) sammenligner CV-er med stillingsannonser. Prosjektets verdi må derfor vurderes ut fra hvor nyttig og forståelig løsningen blir for den valgte målgruppen.

## Who This Serves

Primærmålgruppen er studenter og unge jobbsøkere som trenger støtte til å presentere egen bakgrunn i møte med en konkret jobbmulighet. De skal få hjelp til å identifisere relevant erfaring og skrive et brev i ønsket språk og tone. En mer konkret primærbruker er et åpent spørsmål til gruppa (se under).

## Success Criteria

Kriteriene testes med 3–4 faste testpar: fiktive CV-er og stillingsannonser der gruppa kjenner fasiten (hvilke krav som er dekket og hvilke som mangler) på forhånd. Ekte CV-er brukes ikke som testdata.

**Hele flyten**

0. En ny bruker kan gå gjennom hele flyten fra innlogging til ferdig søknadsbrev med hvert av testparene, uten at appen stopper eller krasjer. Resultatet oppfyller kriteriene 1–5.

**CV inn**

1. (a) Når brukeren laster opp en PDF eller TXT, vises teksten appen leste. Den inneholder innholdet fra CV-en (for eksempel utdanning, erfaring og ferdigheter), er lesbar og kan rettes før brukeren går videre. (b) Hvis appen ikke finner tekst i fila, eller fila har feil format, får brukeren en forståelig melding med forslag til hva hen kan gjøre, for eksempel å lime inn teksten. Appen går ikke videre med en tom CV.

**Gap-analyse**

2. (a) For hvert testpar vises alle de kjente manglende kravene som manglende, og ingen av dem som dekket. (b) For hvert krav som vises som dekket, viser appen hvor i CV-en eller tilleggsopplysningene det ble funnet.

**Svar og tilleggsopplysninger**

3. (a) Når brukeren svarer på et manglende krav, bruker søknadsbrevet det brukeren skrev, og legger ikke til detaljer som ikke står i svaret. (b) Svaret lagres som en tilleggsopplysning. Ved en senere søknad med samme krav vises kravet som dekket med tilleggsopplysningen som kilde, og brukeren kan se, endre og slette den.

**Grad av omskriving**

4. Med «Skriv for meg» får brukeren et sammenhengende søknadsbrev. Med «Gi meg forslag» får brukeren forslag til innhold og formuleringer, ikke et ferdig brev. Begge følger regelen om at ingenting skal finnes på.

**Tone og språk**

5. (a) Valgt språk (norsk eller engelsk) gjelder hele brevet. (b) Formell, nøytral og personlig tone gir synlig forskjellige brev for samme testpar. Dette sjekkes manuelt med en sjekkliste.

Den ønskede brukernytten er mindre tid brukt på tilpasning, mer relevante søknader og bedre forståelse av hvilke kvalifikasjoner som bør fremheves eller avklares. Dette er ambisjoner; kriteriene over er det som avgjør om v1 er ferdig.

## Scope

Funksjonene bygges i trinn. Neste trinn påbegynnes først når det forrige er testet og stabilt. Forslagslista i oppgaven er et utgangspunkt, ikke et krav, og gruppa har avgrenset v1 selv.

**v1 – kjerneflyten:** Alt som er beskrevet under «The Solution». I tillegg kan brukeren se, endre og slette tilleggsopplysningene sine.

**Trinn 2**

- CV-forbedringsforslag
- ATS-forslag (veiledning om ordvalg og format, uten garanti for å passere et bestemt system)

**Trinn 3 – hvis tiden strekker til**

- CV-mal (skjema), og å skrive tilleggsopplysninger inn i en oppdatert CV-fil
- DOCX-støtte
- Bruk av tidligere søknader
- Eksport av søknadsbrev til fil (format avklares da)

**Utenfor prosjektet:** Et komplett rekrutteringssystem.

Sikker innlogging og forsvarlig håndtering av CV-er og andre personopplysninger inngår i rammene. Hvor langt sikkerheten skal gå i v1, er et åpent spørsmål (se under). Appen må kunne kjøres av sensor uten gruppas egne API-nøkler. Briefen fastsetter ikke teknisk implementasjon; dette avklares i arkitekturen.

## Åpne spørsmål til gruppa

Disse må avgjøres av gruppa før eller under arbeidet med PRD og arkitektur. Faglærers anbefaling står i parentes.

1. **Sikkerhet i v1:** Hvor langt skal sikkerheten gå? (Faglærer: trygg passordlagring og at CV-er bare er synlige for eieren i v1; full kryptering av lagrede dokumenter kan være et senere trinn.)
2. **Språkmodell og testmodus:** Hvilken språkmodell skal brukes, og hvordan håndteres API-nøkkelen? (Faglærer: planlegg en testmodus med mock-svar, `.env.example` og testbruker, så sensor kan kjøre appen uten gruppas nøkkel. Dette er vurdert som stor risiko.)
3. **Primærbruker:** Skal målgruppen snevres inn? (Faglærer: for eksempel en student uten mye arbeidserfaring som søker sin første relevante jobb.)
4. **Mappenavn:** Mellomrom og «&» i navnet på brief-mappen kan gi problemer i kommandolinjen. Skal den få et enklere navn?

## Vision

Visjonen er å gjøre det enklere for studenter og unge jobbsøkere å forstå egne muligheter og presentere relevant kompetanse på en ærlig måte. Semesterprosjektet skal vise hvordan KI kan støtte denne prosessen, samtidig som brukeren styrer hvordan egen bakgrunn blir formulert. Videre utvikling kan bygge på erfaringene fra første versjon; briefen binder ikke gruppen til flere funksjoner enn v1.
