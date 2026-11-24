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
