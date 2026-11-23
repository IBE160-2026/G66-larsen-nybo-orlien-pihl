---
title: 'Supersøker konsept 1 – Stegvis veiviser'
type: 'feature'
created: '2026-11-15'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Godkjent plan og eksplisitt byggeoppdrag fra Miranda">

## Intent

Lag bare konsept 1 som en moderne, profesjonell og klikkbar HTML-prototype på branchen miranda-ux-konsepter. Basert på endelig PRD 2026-11-12: simulert konto/innlogging, CV som tekst/TXT/simulert PDF med redigerbart uttrekk, annonse og obligatorisk tittel/arbeidsgiver, gap-analyse med manglende dokumentasjon først, ordrette CV-sitater, valgfrie svar, separate ansettelsesvilkår, begge teksttyper, redigering, kildegrunnlag og kopiering. Bevar negasjoner og ikke påstå at svar er bekreftet kompetanse. Vis forståelige tom-, feil- og ventetilstander. Navigasjon bevarer tekst, bekreftet endring av CV/annonse forkaster avledede data, og erstatt ikke egenredigert tekst uten bekreftelse. Ingen generering på uendret grunnlag.

Bruk bare fiktive eksempeldata. Ingen backend, API, ekte kontolagring, chat, score, eksport, historikk, CV-råd, språkvalg eller andre funksjoner utenfor V1. Simuleringer skal fremgå tydelig. Kjerneflyten skal fungere på mobil og PC med tastatur, synlige etiketter/fokus, tekststatuser og tilgjengelige meldinger. Kun filer i Mirandas UX-mappe, samt påkrevd egen sesjonslogg, kan endres. Ikke push eller merge. Konsept 2 og 3 er ikke del av arbeidet.

</frozen-after-approval>

## Implementation Notes

- Avgrenset statisk leveranse uten produksjonsavhengigheter eller irreversible handlinger; oneshot-rute. Eksisterende uregistrerte filer var kjent før oppdraget og skal være urørt. Arbeidsmappe overstyrer BMADs standardplassering etter brukerens uttrykkelige instruks.
- Kilder lest: endelig PRD, eksisterende prototype, sensorveiledning og sesjonslogg. Gjenbruk fiktive testpar fra tests/fixtures/job-applications uten å endre originalene. Eksisterende prototype er bare referanse.
- Planlagte filer: konsept-1-veiviser.html, konsept-1.css, felles/scenarioer.js, felles/prototype-logikk.js, README.md og nettleserkontroll under denne mappen.
- UX-design: lys blå/hvit arbeidsflate, mørk blå typografi, tydelig hovedhandling, varm status for dokumentasjonsgap. Aktivt steg alene på mobil. Ingen eksterne skrifter eller ressurser.
- Økt i sessionStorage simulerer bevaring ved oppdatering, inaktivitet og sletting; ingen påstand om serverhåndhevet sikkerhet. Lagringsfeil skal håndteres. Kontopassord lagres aldri.
- Kontrollplan: JS-syntaks, tilgjengelige felt, scenarier/sitater, begge teksttyper, feilinput, endringsdialoger, data ved oppdatering/utlogging, mobil/PC uten horisontal rulling og headless nettlesertester hvis tilgjengelig. Dokumenter utført separat fra planlagt.
- Implementert HTML, CSS, scenarioer, lokal logikk og README. Ingen produksjonsavhengigheter, andre konsepter eller endringer i originale fixtures. Testverktøy og skjermbilder ligger i `kontroller/`.
- BMADs oneshot-gjennomgang bruker bare aktivt lag Blind Hunter; ingen aktive lag ble hoppet over. En egen kontekstfri underagent gjennomgikk koden, og en separat underagent kjørte nettleserkontroller. Ingen modelloverstyring.
- Nettlesertest avdekket CRLF/LF-avvik: textareas normaliserer linjeskift, slik at kjente fixtures ble tolket som egen tekst. Scenarioenes CV og annonse normaliseres nå til LF før sammenligning.

## Review Triage Log

- F1, false: Bekreftet forkasting uten faktisk endring gir deaktivert analyse. Dette følger uttrykkelig FR-21: ny analyse er bare tillatt etter endret CV/annonse. Forkastingsdialogen varsler datatap. Funn trukket av reviewer etter kontroll mot kravet.
- F2, medium, patch: Endret svar kunne gi tilgang til forrige tekst uten forklaring. Synlig varsel over editoren forklarer at nye svar/valg ikke er brukt før «Lag tekst». Navigasjon bevarer originalteksten etter FR-21.
- F3, medium, patch: Reload kunne vise nye svar som kildegrunnlag for tidligere tekst. Lagret `generatedAnswers` og `generatedMode` fryser grunnlag og type for teksten til neste generering.
- F4, medium, patch: Felter kunne endres etter validering under simulert analyse. Input låses under pågående handling; svar/valg og scenariohandlinger deaktiveres også.
- F5, medium, patch: Spesialscenarioer gjenkjente ikke endret annonse. `scenarioAd()` brukes både til innlasting og eksakt sammenligning; endret tekst får mock-varsel.
- F6, medium, patch: Ventende TXT-lesing kunne overskrive senere innlimt CV. `cvRevision` og generasjonsnummer avviser foreldet leseresultat.
- F7, low, patch: Formuleringsvalg ga for generelle instruksjoner. Begge teksttyper bruker nå gjennomarbeidede, faste formuleringer for hvert testpar, basert på CV-fakta. Svar gjengis ordrett uten styrking av kompetanse.
- Reviewers etterkontroll av F2–F7: ingen gjenværende underbygde funn i de endrede områdene. Dette var statisk gjennomgang, ikke nettlesertest.

## Verification

- Chrome headless 156 på Windows: 80/80 automatiserte kontroller besto. Ingen JavaScript-unntak eller eksterne HTTP-forespørsler fra appen. Utført via lokal fil uten server eller eksterne pakker; se `kontroller/test-results.json`.
- Testet innlogging/registreringsvalidering, tom CV/fokus, fire testpar og tre supplerende scenarioer med begge teksttyper, negativt/begrenset svar, redigering, navigasjon/reload, forkastingsdialoger, feil/retry, TXT-lesing, filgrense/formatfeil, tydelig simulert PDF og øktsletting.
- Ingen horisontal overflyt på de testede skjermene ved bredder 375/390/1280/1440. Aktivt mobilsteg, etiketter, fokus ved stegbytte og enkel Tab-navigasjon kontrollert automatisk. Fem tekstkontrastpar besto 4,5:1 (laveste målte 5,72:1).
- Root inspiserte skjermbilder av innlogging på PC, resultat på PC og analyse på mobil visuelt. Full skjermlesertest, komplett tastaturgjennomgang, fysisk mobil, Edge og installasjon på annen PC er ikke utført. Backend/API og ekte PDF-uttrekk er utenfor prototypen.
- `node --check` besto for begge app-JS-filer og nettlesertestverktøyet. `git diff --check` besto.
