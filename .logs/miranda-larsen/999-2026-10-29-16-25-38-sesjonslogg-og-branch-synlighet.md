# Sesjonslogg og branch-synlighet

## 2026-10-29 kl. 16:25 — Miranda Larsen

### Oppgave
Avklare hvem som kan se arbeid på en branch, og committe sesjonslogg.

### Plan
- Kontrollere Git-status og prosjektets regler for sesjonslogg.
- Skrive øktens logg og committe loggfilene lokalt.

### Resultat
Forklart at lokale endringer og commits først blir synlige via GitHub når de pushes; tilgang avhenger av repoets synlighet og tilgangsrettigheter. Kontrollert at aktiv branch er main. Opprettet denne sesjonsloggen og issues.md. Committen avgrenses til disse to filene. Ingen push utføres.

### Åpne punkter
Ingen.

## 2026-11-03 kl. 14:15 — Miranda Larsen

### Oppgave
Aktivere varig sesjonslogging for Codex gjennom AGENTS.md i prosjektroten, med eksisterende regler og Mirandas loggmappe. Brukeren ba om kun nødvendige endringer og ingen push.

### Plan
- Kontrollere skill-reglene, eksisterende logg, issues.md og Git-status.
- Opprette AGENTS.md med eksplisitt henvisning til regelverket og brukerens krav.
- Kontrollere at Codex kan lese instruksjonene og refererte filer, og committe sesjonsloggen lokalt.

### Resultat
Opprettet AGENTS.md med krav om å lese og følge .claude/skills/sesjonslogg/SKILL.md, logge alle økter som endrer tilstand (også små oppgaver), bruke .logs/miranda-larsen/ og vedlikeholde issues.md. Instruksjonene krever dokumentasjon av faktiske beslutninger, begrunnelser, vurderinger av KI-forslag, tester og resultater, samt lokale, avgrensede loggcommits før sluttoppsummeringen.

Brukeren godkjente det tidligere KI-forslaget om en AGENTS.md som peker til eksisterende regelverk. Henvisningen ble valgt for å beholde ett regelverk uten en kopi av skillen. Ingen produkt- eller teknologibeslutninger ble tatt.

Verifisering: AGENTS.md ble lest tilbake fra prosjektroten; skill-filen og issues.md finnes og er lesbare. git diff --check passerte. Ingen programtester ble kjørt fordi endringen bare gjelder agentinstruksjoner. issues.md ble lest og beholdt uendret, siden ingen åpne punkter ble opprettet eller løst. AGENTS.md beholdes utenfor loggcommiten i henhold til skillens krav. CLAUDE.md, skill-filen og andre brukeres logger er ikke endret. Ingen push utføres.

### Åpne punkter
Ingen.
