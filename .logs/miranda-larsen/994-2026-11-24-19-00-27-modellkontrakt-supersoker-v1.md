# Modellkontrakt for Supersøker V1

## 2026-11-24 kl. 19:00 — Miranda Larsen

### Oppgave

Lag fire lokale dokumenteksempler til gruppevurdering for issue #22 på `modellkontrakt-supersoker-v1`.

### Plan

- Les PRD på `main`, AD-4 og AD-5 i PR #46, gruppeforslaget og testpar 1.
- Skriv kontraktforslaget og kontroller eksemplene mot kildene.

### Resultat

- La README og tre JSON-eksempler i `tests/fixtures/modelkontrakt/`. Foreslo at serveren lager kildegrunnlag og veiledning, med faktiske brukersvar knyttet til krav-ID-er. Begge teksteksemplene bruker varianten uten svar. Førerkortkravet fremgår av veiledningen og analysen.
- Pythons JSON-parser og lokale asserteringer besto for tre filer. Kontrollene omfattet felter, typer, krav-ID-er, fasit, tre ordrette CV-sitater, identisk kildegrunnlag, separat veiledning og CV-navn i signaturen. Tekst og analyse ble også lest mot annonsen, CV-en og relevante PRD-krav. Mock, API, servervalidering og kopiering ble ikke kjørt.
- Filene og denne loggen ligger lokalt uten commit etter brukerens beskjed.
- Etter Mirandas gjennomgang ble `tekst` i formuleringsforslagene endret til én JSON-streng med fire punktlinjer. README beskriver nå strengtypen for begge resultattypene. Ny kjøring av Pythons JSON-parser og lokale asserteringer besto for alle tre filer, inkludert strengtype, punktlinjer, fasit, CV-sitater, felles kildegrunnlag og separat veiledning.

### Åpne punkter

- Miranda og gruppa gjennomgår kontraktforslaget før det låses for implementasjon.

## 2026-11-25 kl. 19:00 — Miranda Larsen

### Oppgave

Følg opp Helles og Elisabeths gjennomgang av PR #47 på `modellkontrakt-supersoker-v1` og legg fram rettingene for Miranda.

### Plan

- Kontroller branch og arbeidsstatus. Les begge reviewene, PRD-en på `main`, arkitekturen i PR #46 og testpar 1.
- Oppdater kontrakten og kontroller resultatene mot FR-11, FR-13, FR-18 og FR-19.

### Resultat

- Elisabeth etterlyste et eksempel med negativt brukersvar, riktig mappenavn og en tydelig forklaring av `mangler`, veiledning, feilformat og versjon. Kontrakten ligger nå i `tests/fixtures/modellkontrakt/`. Det nye søknadsutkastet gjengir «Jeg har ikke førerkort» ordrett i tekst og kildegrunnlag. `svar_gitt` er `true` og førerkortkravet beholder `mangler`. README beskriver regelbasert veiledning og intern normalisering av feil. `kontraktversjon: 1` er foreslått som påkrevd heltall i alle fire eksemplene. AD-5s fixtureversjon kan identifisere en revisjon av testdata uavhengig av kontraktformatet.
- Helle ba om bekreftede stillingsfelt fra steg 1 etter AD-3 og kravtekst ved siden av hvert sitat og svar i «Teksten bygger på». Serveren setter inn stillingsobjektet fra steg 1. Råanalysen inneholder kompetansekrav og ansettelsesvilkår. Alle kildeoppføringer viser nå både krav-ID og kravtekst.
- Node.js-parsing av alle fire JSON-filer og lokale asserteringer besto. Kontrollene dekket versjon, filreferanser, stillingsfeltene, fasit, tre ordrette CV-sitater, kravreferanser, svarstatus, bevart negasjon, separate veiledningstekster og CV-navn i brevene. Tekstene ble også lest mot CV og annonse. `git diff --check` besto. Kjøring av mock, API, servervalidering og kopiering gjenstår til implementasjon.
- Endringene er lokale og ukommitterte etter Mirandas beskjed.

### Åpne punkter

- Miranda og gruppa gjennomgår den oppdaterte kontrakten før den låses for implementasjon. Punktet står i `issues.md`.
