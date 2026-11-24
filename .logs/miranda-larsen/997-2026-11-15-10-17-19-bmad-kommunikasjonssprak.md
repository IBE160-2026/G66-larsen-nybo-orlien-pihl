# BMAD kommunikasjonsspråk

## 2026-11-15 kl. 10:17 — Miranda Larsen

### Oppgave
Rette oppstartsfeilen `HALT: missing config value communication_language` etter Mirandas godkjenning av en minimal rettelse. Prototypearbeidet holdes på vent.

### Plan
- Kontrollere sentral TOML-konfigurasjon og legge norsk bokmål til i eksisterende teamoverstyring.
- Verifisere rendering av bmad-build og kontrollere diffen.
- Loggføre arbeidet separat uten push eller merge.

### Resultat
Miranda godkjente KI-forslaget om å legge `communication_language = "Norwegian Bokmål"` under `[core]` i `_bmad/custom/config.toml`. Dette er eneste endring i prosjektkonfigurasjonen. Språkverdiene i eldre YAML-filer leses ikke av rendereren; den bruker fire sentrale TOML-lag. Ingen scripts, skills eller andres filer er endret.

Utført kontroll: `uv run --no-cache .../render_skill.py --project-root ... --skill .../.agents/skills/bmad-build` fullførte med exitkode 0. Generert workflow ble lest, og språkregelen i generert step-01 er `Speak in Norwegian Bokmål`. Alle renderreferanser ble dermed løst uten den tidligere feilen. Snapshot ligger i git-ignorert `_bmad/render/`. Dette var en renderkontroll, ikke oppstart av implementeringsarbeidsflyten. `git diff --check` besto, og konfigurasjonsdiffen viser bare den godkjente linjen.

Konfigurasjonsendringen er ikke inkludert i den separate loggcommiten. Ingen push eller merge. Ingen prototyper er laget og ingen nettleser- eller applikasjonstester er utført.

### Åpne punkter
- Konsept 1 – Stegvis veiviser er godkjent for bygging, men arbeidet er satt på vent av Miranda under BMAD-rettelsen. Konsept 2 og 3 avventer godkjenning av konsept 1.
