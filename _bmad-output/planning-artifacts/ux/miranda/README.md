# Miranda · Supersøker UI/UX

Denne mappen inneholder **konsept 1 – Stegvis veiviser**. Konsept 2 og 3 er ikke laget. Eksisterende prototype utenfor mappen er urørt.

## Åpne prototypen

1. Åpne denne mappen i Filutforsker.
2. Dobbeltklikk **konsept-1-veiviser.html**, eller velg «Åpne med» → Chrome eller Edge.
3. Behold HTML, CSS og `felles/` sammen. Ingen installasjon, server, API-nøkkel eller nettforbindelse er nødvendig.

Relativ lenke: [Åpne Stegvis veiviser](konsept-1-veiviser.html).

## Prøv kjerneflyten

1. Trykk **Bruk testbruker**. Alternativt: `test@example.com` og `Test1234`. Kontooppretting er en simulering og lagrer aldri passord; bruk bare fiktive opplysninger.
2. Trykk **Last inn eksempel (testpar 1)**. Kontroller/rediger CV, annonse, stillingstittel og arbeidsgiver.
3. Trykk **Analyser kravene**. Førerkort vises som «Mangler dokumentasjon». De tre andre kravene har status og ordrette CV-sitater.
4. Skriv et valgfritt svar, eller bruk et merket eksempelsvar. Prøv også «Jeg har ikke førerkort». Svaret endrer ikke dokumentasjonsstatusen.
5. Velg **Helt søknadsutkast** eller **Forslag til formuleringer**, og trykk **Lag tekst**.
6. Rediger teksten. Kontroller **Teksten bygger på**, og trykk **Kopier tekst**. Lim inn i en teksteditor for å kontrollere innholdet. Veiledningen skal ikke følge med.
7. Gå tilbake med steglisten eller tilbakeknappen. Teksten beholdes. Ved endret svar/valg må du trykke **Lag tekst**; en melding forklarer at forrige tekst er beholdt. Egne redigeringer erstattes bare etter bekreftelse.
8. Prøv **Endre CV eller annonse**. «Avbryt» beholder alt; bekreftelse forkaster svar, analyse og tekst. CV/annonse må faktisk endres før en ny analyse tillates (FR-21).
9. Oppdater siden i aktiv økt: dokumenter, svar og redigeringer beholdes. **Logg ut** sletter de midlertidige dataene.

## Feil og andre scenarioer

Åpne **Prototypeverktøy** nederst i arbeidsflaten. Verktøyene er for designgjennomgang, ikke nye produktfunksjoner.

- Velg ett av de fire navngitte testparene og trykk **Last inn scenario**. Hvert par bruker prosjektets eksisterende fiktive CV, annonse og fasit.
- Prøv **Ingen tydelige krav**, **Kompetansekrav og politiattest** og **Bare ansettelsesvilkår**. Vilkår skal ikke telles som kompetansekrav eller få svarfelt.
- Velg feil for **neste** analyse/generering: tidsavbrudd, ugyldig sitat eller konfigurasjonsfeil. Simuleringen går raskt; den venter ikke faktisk 30 sekunder. Ugyldig sitat gjelder analyse. Konfigurasjonsfeil tilbyr ikke «Prøv igjen».
- Prøv tomme felt, feil e-post, kort registreringspassord, feil filtype, for stor fil og **Vis PDF uten lesbar tekst**. Gyldig CV-tekst beholdes ved filfeil.
- **Simuler øktutløp** demonstrerer sletting. En faktisk lokal inaktivitetskontroll er også satt til 30 minutter.

## Mobil og tilgjengelighet

Åpne nettleserens utviklerverktøy (F12), slå på mobilvisning og prøv 375 og 390 piksler. PC-visning kontrolleres ved 1280 og 1440 piksler. På mobil stables kolonner, og bare aktivt steg vises. Bruk knappene nederst for å gå tilbake.

Prøv hele flyten med Tab, Shift+Tab, Enter og mellomrom. Radiovalg bruker piltaster. Dialoger kan avbrytes med Escape. Fokus flyttes til stegoverskriften ved navigasjon og første feilfelt ved validering. Statuser har tekst, og dynamiske meldinger bruker live-regioner. Grunnlaget stables under teksteditoren på mobil.

## Hva er simulert?

| Område | Atferd |
|---|---|
| Konto og innlogging, FR-1–FR-3 | Bare skjermflyt og enkel lokal validering. Ingen ekte konto, passordhash eller tilgangskontroll. |
| CV, FR-4–FR-9 | Innliming og TXT-lesing virker lokalt. PDF viser tydelig merket eksempeltekst; PDF-format, korrupsjon og tekstuttrekk kontrolleres ikke. Filgrense 2 MB og tekstgrense 10 000 tegn er PRD-startverdier. |
| Analyse, FR-10–FR-14 | Fast fasit for testparene. Ordrett sitatkontroll utføres for eksemplene. Egen/endret CV eller annonse gir tydelig merket eksempelsvar fra testpar 1, ikke en faktisk analyse. |
| Tekst, FR-15–FR-21 | Lokale tekstmaler basert på fiktive CV-er. Svar settes inn ordrett uten semantisk tolkning. Bevarte negasjoner er ikke bevis på språkmodellkvalitet. Redigering, navigasjon, endringsbekreftelser og kopiering er interaktive. |
| Økt, FR-22–FR-24 | `sessionStorage` simulerer bevaring ved oppdatering og sletting etter utlogging/inaktivitet. Ingen serverkontroll eller produksjonssikkerhet. Faneduplisering og nettleserens gjenoppretting følger nettleserens egne regler. Ved blokkert lagring kan oppdatering miste data. |
| API og feil, FR-25–FR-30 | Ingen API-kall eller leverandør. Mock-merke på alle skjermbilder. Feiltilstander vises via prototypeverktøy. Leverandørbekreftelse og ekte API-modus er ikke implementert i denne mock-prototypen. |

NFR-1–NFR-3 styrer tilgjengelighet, responsive visninger og bokmål. NFR-5 følges med bare fiktive dokumenter. Prototypen verifiserer ikke backend-, modell-, sikkerhets- eller installasjonskravene til den ferdige appen.

Hvis automatisk kopiering blokkeres, markeres teksten og en forklaring vises. På PC: Ctrl+C / Cmd+C. På mobil: bruk markeringsmenyens Kopier.

## Designvalg og sporbarhet

Konseptet bruker lys arbeidsflate, mørk typografi og blå hovedhandling. Dokumenterte krav bruker dempet grønt; dokumentasjonsgap bruker varmt rav og omtales ikke som feil eller manglende kompetanse. Ingen score vises.

Flyten er avledet av [endelig PRD](../../prds/prd-supersoker-2026-11-03/prd.md), UJ-1. [BMAD-notatet](spec-konsept-1.md) dokumenterer oppdrag, avgrensning og gjennomgang. PRD, fixtures, felles prosjektkonfigurasjon og andre prototyper endres ikke av dette arbeidet.

## Filer og kontroller

- `konsept-1-veiviser.html`: skjermbilder, innhold og semantisk struktur.
- `konsept-1.css`: visuelt uttrykk og responsive regler.
- `felles/scenarioer.js`: kopi av de fire fiktive testparene.
- `felles/prototype-logikk.js`: lokale interaksjoner og simuleringer.
- `kontroller/`: nettleserkontroll, faktiske resultater og skjermbilder.

Syntakskontroll uten eksterne pakker, kjørt fra prosjektroten:

```powershell
node --check _bmad-output/planning-artifacts/ux/miranda/felles/prototype-logikk.js
node --check _bmad-output/planning-artifacts/ux/miranda/felles/scenarioer.js
```

**Utført:** 80/80 automatiserte kontroller besto i Chrome headless 156 på Windows. Ingen JavaScript-unntak, ingen eksterne HTTP-forespørsler og ingen horisontal overflyt på de testede skjermene ved 375/390/1280/1440 px. Fem beregnede tekstkontraster besto 4,5:1 (laveste 5,72:1). Innlogging, feilinput, scenarioer, begge teksttyper, redigering, navigasjon/reload, bekreftelser, kopieringsfallback, opplasting og øktsletting ble kontrollert. JS-syntaks og `git diff --check` besto. Skjermbilder er også inspisert visuelt.

Resultatene finnes i [kontroller/test-results.json](kontroller/test-results.json). Testverktøyet bruker Node 26.7 og en lokalt installert Chrome på standard Windows-sti. Kjør fra prosjektroten:

```powershell
node _bmad-output/planning-artifacts/ux/miranda/kontroller/nettlesertest.cjs
```

Verktøyet åpner en isolert, skjult Chrome, oppretter en midlertidig profil, kjører lokale kontroller og oppdaterer rapport og skjermbilder. Det lukker nettleseren og rydder profilen etterpå. Ingen pakkeinstallasjon trengs.

**Ikke utført:** Full skjermlesertest, komplett manuell tastaturgjennomgang, testing på fysisk mobil, Edge eller separat PC. Den automatiske kopieringsfallbacken er kontrollert; manuell innliming i en annen app og mobilens markeringsmeny er ikke testet. Kontrastkontrollen er et utvalg, ikke en full WCAG-revisjon. Ingen backend-, sikkerhets- eller modellkvalitetstester er utført.
