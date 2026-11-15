# Supersøker – testgrunnlag

## 2026-11-15 kl. 17:54 — Miranda Larsen

### Oppgave
Gjennomføre brukerens godkjente plan for selvstendig testgrunnlag på `miranda-testgrunnlag`, med prioritet T-8, T-9 og tekstbaserte PDF-varianter til T-1. Bevare eksisterende testpar, fasiter, andre brukeres filer og eksisterende uregistrerte filer. Ingen push eller merge; testarbeidet skal gjennomgås av Miranda før publisering.

### Plan
- Følge godkjent plan fra samtalen: nytt materiale bare under `tests/testgrunnlag/`, sporbarhetsmatrise T-1–T-10, supplerende scenarioer og fasiter samt fire PDF-er.
- Kontrollere data, ordrette sitater, vilkår og PDF-uttrekk separat fra app- og KI-testing. Markere ikke utførte tester «Ikke kjørt».
- Lese prosjektregler, tidligere logg og issues.md, og starte bmad-build etter skillens instruksjon.

### Resultat
Aktiv branch bekreftet som `miranda-testgrunnlag`. Lest sesjonsloggreglene, Mirandas tidligere PRD-logg og issues.md. Ingen eksisterende prosjektfiler hadde sporede endringer ved kontroll; eksisterende uregistrerte filer ble ikke endret.

Brukeren godtok planen fra forrige skrivebeskyttede gjennomgang. Dette er godkjenning av fremgangsmåten, ikke av testresultater eller nytt testmateriale.

Oppstart av `.agents/skills/bmad-build/SKILL.md` gjennom pålagt render_skill.py-kommando feilet med exitkode 1 og `HALT: missing config value communication_language`. Skillen krever uttrykkelig stopp ved feil og forbyr å kjøre workflow-kilden direkte. Ingen konfigurasjon er endret for å omgå stoppet. En parallell miljøkontroll viste også at `python.exe` ikke kunne kjøres («Ingen tilgang til filen»); tilgjengelige PDF-biblioteker er derfor ikke avklart.

Ingen testmaterialfiler er opprettet. Eksisterende testpar og fasiter er urørt. Ingen kontroll av nye fasiter eller PDF-uttrekk er utført. App-, mock-, KI- og installasjonstester: Ikke kjørt. Kun denne loggen og oppdatert issues.md inngår i separat lokal loggcommit. Ingen push eller merge.

### Åpne punkter
- Avklare manglende `communication_language` i byggskillens konfigurasjon før arbeidsflyten kan startes igjen. Deretter gjennomføre godkjent plan for testgrunnlaget; data- og PDF-kontroller samt app-/KI-tester er ikke utført.
