---
title: 'Visuelle designretninger for Supersøker'
type: 'feature'
created: '2026-11-15'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Mirandas oppdaterte oppdrag">

## Intent

Behold eksisterende konsept 1 og tilhørende filer uendret. Lag konsept 2 Premium / Editorial med elegant typografi, varme farger og et eksklusivt, gjennomarbeidet uttrykk, og konsept 3 Moderne / Bold med sterk identitet, kontraster og modig typografi. Prioriter visuell design fremfor komplette funksjonelle prototyper. Bruk samme realistiske Supersøker-innhold og representative skjermer som konsept 1: CV/annonse, gap-analyse og søknadstekst fra testpar 1. Lag statiske HTML/CSS-mockups med enkel navigasjon for visuell gjennomgang. Ingen backend, utvidelse av V1 eller ny funksjonell brukerreise.

Lag en enkel visuell sammenligningsside for de tre retningene og dokumenter designvalg kort. Alle prosjektfiler skal ligge i Mirandas eksisterende UX-mappe; egen sesjonslogging følger prosjektreglene. Ikke endre andre filer, pushe eller merge. Vis resultat før videre arbeid.

</frozen-after-approval>

## Implementation Notes

- Avgrenset, reversibel visuell leveranse med avklart innhold. BMAD oneshot; arbeidsfiler ligger her etter brukerens uttrykkelige instruks. Uregistrerte filer utenfor mappen er kjent fra tidligere og er urørt.
- Nye HTML-innganger for konsept 2 og 3, egne stiler og en liten felles presentasjonsrenderer under `visuelle/`. Ingen av konsept 1s HTML/CSS/JS/README/testbilder endres. Et separat designnotat beskriver den nye retningen.
- Felles datagrunnlag: prosjektets testpar 1, tre dokumenterte krav og førerkort uten dokumentasjon. Analysevisning uten svar; tekstvisning med ordrett negativt svar «Jeg har ikke førerkort.» som i konsept 1s referansebilder. Sammenligningssiden bruker nye, likt innrammede bilder av de tre skjermene.
- Konsept 2: papir, espresso/oliven, serif, fin typografisk rytme og asymmetrisk dokumentlayout. Konsept 3: blekk/lime/lilla, stor kondensert typografi, tykkere streker og markert sidefelt.
- Kontrollplan: nye mockups på PC/mobil, riktig felles innhold, enkel skjermnavigasjon, skjermbilder og kontroller som bekrefter at eksisterende filer er uendret. Ingen full funksjonell testserie for nye mockups.
- Levert to visuelle forslag, tre faste skjermer i hver, sammenligningsside, kort designnotat og nye kontrollbilder. Original README og øvrige eksisterende filer er urørt.

## Review Triage Log

- BMAD oneshot Blind Hunter var eneste aktive reviewlag; ingen aktive lag ble utelatt. Kontekstfri kildegjennomgang fant ingen underbygde vesentlige avvik i det avgrensede designoppdraget. Manglende bilder under pågående arbeid ble ikke feilrapportert som et sluttfunn.
- Root fant ved visuell kontroll en selektorfeil i skjermnavigasjonen: body fikk også data-screen, og den brede selektoren skjulte hele body ved neste skjermbytte. Rettet til `section[data-screen]`. Kontrollverktøyet ble utvidet til å kontrollere faktisk synlighet, ikke bare hidden-attributter, og avslå blanke skjermbilder. Ny full kjøring besto.
- Tilsvarende selektor i sammenligningssiden ble avgrenset til `button[data-device]`, slik at body ikke får aria-pressed. Ingen produksjonsfunksjoner eller nye brukerkrav ble lagt til.

## Verification

- 93/93 nettleserkontroller besto i Chrome headless 156 på Windows, rapport `visuelle/kontroller/visuell-rapport.json`, 2026-11-15T10:12:18.181Z. Ingen JS-unntak eller eksterne HTTP-kall.
- Identisk CV, annonse, alle CV-sitater og hele søknadsteksten er sammenlignet automatisk med den uendrede konsept 1-prototypen. Én manglende og tre dokumenterte kvalifikasjoner vises i begge nye forslag.
- Begge nye konsepter og sammenligningssiden er kontrollert uten horisontal overflyt ved 375, 390, 1280 og 1440 px. Skjermbytte, feltetiketter og seks kombinasjoner av sammenligningskontroller besto. Ti utvalgte tekstkontraster besto 4,5:1.
- 18 referansebilder (3 konsepter × 3 skjermer × PC/mobil) og 2 sammenligningsbilder er lagret i ny kontrollmappe. Root inspiserte begge nye analysevisninger på PC/mobil og sammenligningssiden visuelt.
- SHA-256-kontroll av konsept 1s seks sentrale filer besto. Git-diff for alle tidligere sporede UX-filer er tom. Konsept 1s tidligere skjermbilder/rapport ble ikke endret.
- JS-syntakskontroll besto for de to nye presentasjonsscriptene og kontrollverktøyet. Ingen ny komplett funksjonstest, backendtest, fysisk mobiltest eller full skjermleserrevisjon er utført.
