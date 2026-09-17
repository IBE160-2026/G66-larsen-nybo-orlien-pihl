---
title: "Produktbrief: Supersøker - AI CV & Job Application Assistant"
status: complete
created: 2026-09-16
updated: 2026-09-16
---

# Supersøker - AI CV & Job Application Assistant

## Executive Summary

Verktøyet "Supersøker" skal hjelpe studenter og unge jobbsøkere med å tilpasse CV og søknadsbrev til en konkret stillingsannonse. Ved å se brukerens dokumenter i sammenheng med arbeidsgiverens behov skal assistenten gjøre det enklere å fremheve relevant erfaring, forstå kvalifikasjonsgap og utforme en målrettet søknad.

Løsningen utvikles som en nettapplikasjon i semesterprosjektet i IBE160 Programmering med KI ved Høgskolen i Molde. Første versjon skal demonstrere en sammenhengende flyt fra innlogging og dokumentinnlasting til søknadsbrev, CV-forbedringsforslag, gap-analyse og ATS-optimalisering. Brukeren skal kunne styre graden av omskriving, språk og stil.

## The Problem

Mange studenter og unge jobbsøkere synes det er vanskelig å forstå hvilke kvalifikasjoner en arbeidsgiver legger mest vekt på. De er usikre på hvilke deler av egen erfaring som er relevante, hva CV-en mangler, og hvordan de bør formulere søknaden for den aktuelle stillingen.

Dette gjør at hver søknad kan ta mye tid, samtidig som resultatet blir generelt og lite tilpasset. Behovet er både hjelp til å skrive og hjelp til å forstå sammenhengen mellom egen bakgrunn og stillingens krav. Problembeskrivelsen er gruppens utgangspunkt; den er foreløpig ikke dokumentert gjennom brukerundersøkelser i prosjektet.

## The Solution

Brukeren logger inn i nettapplikasjonen, får valget mellom å fylle inn informasjon manuelt i definert CV mal eller laste opp en CV i PDF-, DOC- eller TXT-format. Brukeren legger så inn stillingsannonsen. Nøkkelord, ønsket tone og stil samt eventuelle tidligere søknader gir ytterligere grunnlag for tilpasningen.

Assistenten skal:

- Lage et søknadsbrev tilpasset stillingen og brukerens bakgrunn.
- Foreslå konkrete forbedringer av CV-en og relevant erfaring som bør fremheves.
- Gjøre en gap-analyse mellom CV og stillingsannonse og peke på kvalifikasjoner som mangler i dokumentasjonen.
- Gi ATS-relaterte forbedringsforslag for å tilpasse dokumentene til systemer som brukes til å behandle jobbsøknader.

Brukeren velger hvor mye AI-en skal omskrive, eller om den hovedsakelig skal foreslå endringer, og påvirker språk og stilnivå. At en kvalifikasjon ikke står i CV-en, betyr ikke nødvendigvis at brukeren mangler den. ATS-hjelp beskrives som veiledning, uten garanti for å passere et bestemt system eller bli invitert til intervju.

## What Makes This Different

Produktets tiltenkte profil er støtte for studenter og unge jobbsøkere, med kontroll over hvor omfattende AI-bearbeidingen skal være. Kombinasjonen av skrivehjelp og forklaring av gap skal hjelpe brukeren med både søknaden og forståelsen av hva stillingen etterspør.

Funksjonskombinasjonen er ikke dokumentert som unik. [Teal](https://www.tealhq.com/tool/cover-letter-generator) tilbyr allerede søknadsbrev basert på CV og stillingsannonse, og [Jobscan](https://www.jobscan.co/resume-scanner) sammenligner CV-er med stillingsannonser. Prosjektets verdi må derfor vurderes ut fra hvor nyttig og forståelig løsningen blir for den valgte målgruppen.

## Who This Serves

Primærmålgruppen er studenter og unge jobbsøkere som trenger støtte til å presentere egen bakgrunn i møte med en konkret jobbmulighet. De skal få hjelp til å identifisere relevant erfaring og bearbeide dokumentene i ønsket språk og stil.

## Success Criteria

Prosjektet regnes som vellykket når gruppen kan demonstrere en fungerende ende-til-ende-flyt der en bruker:

1. Logger inn, laster opp CV og legger inn en stillingsannonse.
2. Får relevante AI-genererte resultater: et tilpasset søknadsbrev, konkrete CV-forbedringsforslag, identifiserte kvalifikasjonsgap og ATS-relaterte forbedringsforslag.

Den ønskede brukernytten er mindre tid brukt på tilpasning, mer relevante søknader og bedre forståelse av hvilke kvalifikasjoner som bør fremheves eller avklares. Dette er ambisjoner; semesterprosjektets avtalte suksesskriterium er demonstrasjonen over.

## Scope

Første versjon er en nettapplikasjon med dokumentinnlasting, stillingsannonse, brukerens tilpasningsvalg og alle fire AI-funksjonene over, slik oppgaven krever. Omfanget begrenses til det som er nødvendig for å demonstrere hovedflyten. Et komplett rekrutteringssystem inngår ikke.

Sikker innlogging og forsvarlig håndtering av CV-er, søknader og andre personopplysninger inngår i rammene. Kryptert lagring er anbefalt i oppgaven og skal tas hensyn til i løsningsvalgene. Briefen fastsetter ikke en teknisk implementasjon.

Eksportformat er et åpent beslutningspunkt. DOC, Markdown og PDF er mulige alternativer; ingen av disse formatene er obligatoriske før valget er avklart. Nye obligatoriske funksjoner eller krav må avklares med gruppen.

## Vision

Visjonen er å gjøre det enklere for studenter og unge jobbsøkere å forstå egne muligheter og presentere relevant kompetanse. Semesterprosjektet skal vise hvordan AI kan støtte denne prosessen, samtidig som brukeren påvirker hvordan egen bakgrunn blir formulert. Videre utvikling kan bygge på erfaringene fra første versjon; briefen binder ikke gruppen til flere funksjoner.
