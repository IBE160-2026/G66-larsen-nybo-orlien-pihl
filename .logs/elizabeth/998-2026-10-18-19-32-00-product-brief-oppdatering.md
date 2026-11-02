# Product brief – oppdatering etter faglærers tilbakemelding

## 2026-10-18 kl. 19:32 — elizabeth

> Skrevet i etterkant, 2026-10-26, ut fra Claude Code-transkriptet for økta (sesjon `273c0122`), `.memlog.md` og git-historikken. Sesjonslogg-skillen fantes ikke 18. oktober. Økta varte fra ca. kl. 19:32 til 21:34.

### Oppgave
Elisabeth ville gå gjennom det som var nytt i repoet, og deretter innarbeide faglærers tilbakemelding (`tilbakemelding-product-brief.md`, 2026-10-06) i product brief. Hun hadde ikke snakket med gruppa ennå, så endringene skulle lages som et forslag gruppa godkjenner i etterkant. Hun ville jobbe «coaching-vei» med forklaringer underveis for å lære mest mulig.

### Plan
- Ordne GitHub-tilgang: logge inn med kontoen Eli1409, som har skrivetilgang til organisasjonen IBE160-2026.
- Merge PR #2 (sensorveiledning og `CLAUDE.md`) og hente `main`.
- Oppdatere briefen med `bmad-product-brief` i oppdateringsmodus, punkt for punkt.
- Kvalitetssjekk med `bmad-review` (struktur og prosa), og deretter PR til gruppa.

### Resultat
- PR #2 merget til `main` kl. 20:03 (`835a57b`).
- Branch `oppdater-product-brief`, commit `0ddd074` kl. 21:21, PR #3 opprettet:
  - `brief.md`: v1 = innlogging, CV (lim inn / PDF / TXT), annonse, gap-analyse med svarfelt, søknadsbrev med grad av omskriving, tone og språk. Trinn 2 = CV-forbedring og ATS. Trinn 3 = CV-mal, DOCX, tidligere søknader og eksport. Nye suksesskriterier som kan sjekkes (0–5), basert på fiktive testpar.
  - `addendum.md`: begrunnelser, forkastede alternativer og en tabell over mulige feil i gap-analysen.
  - `.memlog.md`: beslutningslogg for økta.
- Eksempler på kritisk vurdering av KI-forslag (detaljer i `addendum.md`):
  - Claude foreslo å legge tone og språk i trinn 2. Elisabeth valgte v1 fordi tonen påvirker inntrykket hos arbeidsgiver.
  - Elisabeth ville først beholde ATS i v1, men flyttet den til trinn 2 da det kom fram at den bare var med fordi gruppa trodde oppgaven krevde det.
  - Ideen om å vise hvor i CV-en et dekket krav ble funnet, kom fra Elisabeth. Den hindrer den verste feilen i gap-analysen (et krav vist som dekket når det ikke er det).
  - Elisabeth forsto ikke det samlede suksesskriteriet (0) i første utkast. Det ble forklart og omformulert før hun godtok det.
- `bmad-review` førte til to redaksjonelle endringer: v1-lista i Scope ble erstattet med en henvisning til «The Solution», og ATS-spørsmålet ble flyttet fra briefen til PR-beskrivelsen.
- Til slutt fikk Elisabeth en enkel mal for egne notater til refleksjonsrapporten. Malen ble gitt i chatten og er ikke lagret i repoet.
- Senere arbeid med samme brief: [999-2026-10-26-20-27-56-product-brief-sammenslaing.md](999-2026-10-26-20-27-56-product-brief-sammenslaing.md).

### Åpne punkter
- Gruppa må godkjenne forslaget. Dette er videreført i det samlede forslaget fra 2026-10-26 og står allerede i `issues.md`.
- Malen for refleksjonsnotater finnes bare i chatten fra 18. oktober. Den bør lagres et sted Elisabeth bruker den.
