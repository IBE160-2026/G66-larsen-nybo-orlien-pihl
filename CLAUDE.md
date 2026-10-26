# Prosjektinstruksjoner – G66 (IBE160)

Dette er gruppeprosjektet G66 i IBE160 Programmering med KI. Prosjektet vurderes etter sensorveiledningen nedenfor. **Sjekk alltid arbeidet opp mot kriteriene før noe regnes som ferdig**, og si fra hvis en endring svekker et kriterium.

## Arbeidsregler avledet fra kriteriene

- **Prosess (kriterium 1, 30 %):** Hold BMAD-dokumentene i `_bmad-output/planning-artifacts` oppdatert når krav eller planer endres. Koble kode til stories/krav. Foreslå små, avgrensede commits med beskrivende meldinger, og arbeid på egne branches med pull requests. Når en beslutning tas (teknologi, arkitektur, løsning), foreslå å dokumentere den med begrunnelse. Når gruppen avviser eller retter et KI-forslag, foreslå å notere det.
- **Funksjonalitet (2):** Hold deg til omfanget i proposal og product brief. Avvik skal beskrives og begrunnes.
- **Testing (3):** Skriv tester for meningsfull logikk sammen med ny funksjonalitet. Valider input og håndter feil. Dokumenter feil som blir funnet i KI-generert kode og hvordan de ble rettet.
- **Design (4):** Konsistent visuelt uttrykk, tydelige feilmeldinger og tomtilstander, grunnleggende universell utforming (kontrast, tastatur, alt-tekst, skjemaetiketter), responsivt der det er relevant.
- **Kodekvalitet (5):** Følg beskrevet arkitektur. Ingen død kode, duplisering eller utkommenterte rester fra tidligere forsøk.
- **README (6):** Oppdater README.md når installasjon, oppstart, miljøvariabler, tester eller mappestruktur endres. Kommandoene skal virke på en ren maskin.
- **Ryddighet (7):** Aldri commit hemmeligheter, `.env`, `node_modules`, `venv` eller byggeartefakter. Bruk `.env.example`. Ingen løse filer i rotmappen.

## Sensorveiledning

@.docs/sensorveiledning.md

## Sesjonslogg

Når en oppgave eller økt avsluttes, før sluttoppsummeringen, bruk `sesjonslogg`-skillen: dokumenter Oppgave + Plan + Resultat + åpne punkter i `.logs/<bruker>/`, og før åpne punkter i `.logs/<bruker>/issues.md`. Skillen committer loggfila lokalt; push gjør du selv. Gruppens egne regler for commit og språk gjelder foran dette.
