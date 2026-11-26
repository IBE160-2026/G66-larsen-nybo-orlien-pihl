- source_spec: spec-gh-28-felles-mal-og-css.md
  summary: Handlingslinjen skal aldri dekke fokusert innhold, heller ikke flerlinjefelt (CV, annonse, brev, svar). Løses med JavaScript i #31, #33 og #34.
  evidence: EXPERIENCE.md krever det, men Chromium ruller et flerlinjefelt bare til markøren. Ved Tab ble opptil 192 av 358 px dekket, og 28 av 96 px i et kort svarfelt, aldri hele feltet. JavaScript er utenfor #28. Utsettelsen er vedtatt av Helle 2026-11-26.
- source_spec: `spec-gh-28-felles-mal-og-css.md`
  summary: Gruppa velger skjermlesertekst for et åpent punkt i huskelisten som ikke er et krav (tom sirkel), og EXPERIENCE.md oppdateres før #31 og #34 bruker det.
  evidence: DESIGN.md har tom stiplet sirkel for slike punkter, men EXPERIENCE.md har bare «Dokumentert», «Mangler dokumentasjon» og «Gjort». «Kopier teksten» høres da ut som et råd. Alvorlighet medium (granskning BH13).
- source_spec: `spec-gh-28-felles-mal-og-css.md`
  summary: Vurder om brevarket skal ha synlig kant, i DESIGN.md og i #34 eller #37.
  evidence: Koden følger DESIGN.md. Kort mot papir er omtrent 1,1:1, og DESIGN.md bruker ellers `feltkant` der en kant viser at noe kan fylles ut (granskning BH10).
- source_spec: `spec-gh-28-felles-mal-og-css.md`
  summary: Kontroller i nettleser (#37) hvilke farger komponentene faktisk pares med, og at tilstandsreglene i stilarket virker.
  evidence: Kontrasttestene bruker en håndskrevet liste over fargepar. Blekk tekst på blekk knapp besto alle testene. Tilstandsregler kan slettes uten at testene slår ut når klassen finnes i andre selektorer (granskning VG3 og VG4).
- source_spec: `spec-gh-28-felles-mal-og-css.md`
  summary: Test at malene ikke har egne fargeverdier (`style` og `<style>`), når `steg_2.html` er flyttet over til de felles klassene.
  evidence: Testen leser i dag bare `stil.css`. Innført nå ville den feilet på `<style>` i `steg_2.html` fra PR #51 (granskning BH15b).
