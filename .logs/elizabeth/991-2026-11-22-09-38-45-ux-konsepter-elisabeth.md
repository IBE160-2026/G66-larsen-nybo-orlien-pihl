# UX-konsepter (Elisabeth)

## 2026-11-22 kl. 09:38 — elizabeth

### Oppgave
Gruppa har avtalt at hver lager tre visuelle designkonsepter for Supersøker, slik at det blir ni å velge mellom. Elisabeth ba om å få laget sine tre på en måte som kan sammenlignes med Helles (PR #15) og Mirandas (PR #13).

### Plan
- Oppdaterte lokal `main` (`git checkout main`, `git pull`) og laget branchen `elisabeth/ux-konsepter`.
- Leste PR #13 og #15. Brukte Helles `felles-brief.md` (skjermnummer, PRD-regler og testpar 1-innhold) som grunnlag, slik at konseptene kan sammenlignes skjerm for skjerm.
- Valgte tre retninger som ikke overlapper de seks som finnes: «Brevet vokser», «Klar tale» og «Sjekkliste».
- Tegnet fem av de 17 skjermene som statiske HTML-skisser: 01, 03, 08, 10 og 16.
- Regnet ut kontrast og sjekket skjermbilder i Chrome headless på desktop og mobil.

### Resultat
- Nye filer i `_bmad-output/planning-artifacts/ux/elisabeth/`: `oversikt.html`, `README.md`, `konsept-1-brevet-vokser.html`, `konsept-2-klar-tale.html` og `konsept-3-sjekkliste.html`.
- README dokumenterer tokens med kontrastforhold, styrker, svakheter, `[ASSUMPTION]`-er og hvilke KI-feil som ble rettet.
- Kontroller: all tekst holder minst 4,5:1 og feltkanter minst 3:1. Gul fokus alene har bare 1,4:1 og står derfor alltid sammen med en svart kant. Ingen overflyt ved 375 px (målt i iframe) eller 504 px.
- Feil i KI-forslag som ble rettet:
  - Søknadsutkastet påsto at Ida jobber med kundeservice «hver uke», men det står ikke i CV-en (brudd på FR-18). Setningen ble rettet.
  - En tilsynelatende mobiloverflyt i konsept 2 skyldtes at headless Chrome ikke tegner smalere enn ca. 500 px. Ny måling viste ingen overflyt.
- Konseptfilene er ennå ikke committet (avventer Elisabeths gjennomgang).

### Åpne punkter
- Elisabeth går gjennom de tre konseptene og ber om endringer før de sendes til gruppa.
- Gruppa må velge én designretning av de ni konseptene, og deretter kjøres `bmad-ux` for DESIGN.md og EXPERIENCE.md.
- Gruppa bør bli enige om én plassering for UX-konseptene. Helle bruker `UX/` i rotmappen, mens Miranda og Elisabeth bruker `_bmad-output/planning-artifacts/ux/`.

## 2026-11-23 kl. 15:05 — elizabeth

### Oppgave
Elisabeth ville se UX-konseptene sine på GitHub.

### Plan
- Committet mappen `_bmad-output/planning-artifacts/ux/elisabeth/` på `elisabeth/ux-konsepter`.
- Pushet branchen til `origin` (første push, med upstream).

### Resultat
- Commit `5cabb9b` «UX: tre designkonsepter og oversikt (Elisabeth)» med de fem filene.
- Branchen ligger på GitHub: https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/tree/elisabeth/ux-konsepter
- Ingen PR er opprettet ennå.

### Åpne punkter
- Ingen nye (punktene fra 2026-11-22 står fortsatt åpne i `issues.md`).

## 2026-11-23 kl. 15:15 — elizabeth

### Oppgave
Elisabeth likte ikke de tre første konseptene så godt og ville ha tre nye som ligner på konsept 3 (Sjekkliste). De gamle skulle erstattes.

### Plan
- Så på Mirandas (PR #13) og Helles (PR #15) konsepter lokalt via egne worktrees i scratchpad.
- Lagde tre varianter med identisk HTML fra Sjekkliste og ulike stilark: Huskelapp (lyst, gul lapp, firkantede bokser), Kveld (mørkt tema, lyst brevark) og Fremdrift (huskelisten som bånd øverst, én kolonne).
- Regnet ut kontrast og tok skjermbilder ved 1440 px.

### Resultat
- Nye filer: `konsept-1-huskelapp.html`, `konsept-2-kveld.html` og `konsept-3-fremdrift.html`. De gamle tre er fjernet med `git rm` og finnes i commit `5cabb9b`.
- `oversikt.html` og `README.md` er oppdatert, og README har en egen seksjon om iterasjonen og begrunnelsen.
- Kontroll: all tekst holder minst 5,5:1 og feltkanter minst 3:1. Skjermbildene viste at lenkene i toppteksten til Kveld hadde standardblå på mørk bakgrunn. Det er rettet.
- Endringene er ikke committet ennå, fordi Elisabeth skal se gjennom dem først.

### Åpne punkter
- Elisabeth går gjennom de tre Sjekkliste-variantene og gir tilbakemelding før de committes og sendes til gruppa.
- Overflyt på mobil (375 px) er ikke målt på nytt for variantene.
