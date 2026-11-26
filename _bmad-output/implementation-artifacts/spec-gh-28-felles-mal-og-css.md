---
title: 'Felles HTML-mal og CSS (issue #28)'
type: 'feature'
created: '2026-11-26'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/DESIGN.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-supersoker-2026-11-25/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Appen har bare en ustylet grunnmal. Innlogging (#30) og de tre stegene (#31, #33, #34) trenger felles sideramme og stiler, ellers lager hver sin variant (PR #51 har allerede egne stiler i malen).

**Approach:** Utvid `base.html` med sideramma fra EXPERIENCE.md («Fast sideramme»), legg tokens, oppsett og komponenter fra DESIGN.md i ett lokalt stilark, og lag Jinja-makroer for delene som har logikk eller tilgjengelighetskobling.

## Boundaries & Constraints

**Always:** DESIGN.md og EXPERIENCE.md styrer utseende, tekster og oppbygning. Bare lokale ressurser (ingen nettskrifter, CDN eller UI-bibliotek). Farger, typografi og skygger er CSS-variabler i `:root` med token-navnene fra DESIGN.md (f.eks. `--mangler-band`); fargeverdier står ingen andre steder. `lang="nb"`, én `h1` per side, «Hopp til innhold» som første fokuserbare element, `fokusring` på alle kontroller, samme DOM-rekkefølge ved alle bredder. Minstebredde 1024 px, knekkpunkt 1200 px. Blokknavnene `title` og `content` beholdes (PR #51 bruker dem). Mock-stripen vises bare i mock-modus; API-modus har ingen stripe (A12).

**Vedtatt (Helle, 2026-11-26):** Komponentene vises samlet bare i en testmal i `tests/`. Appen får ingen stilside.

**Never:** Ruter eller logikk i `app/` for innlogging, innlesing, analyse eller tekst. `veksler`, `dialog` og `kildeliste` (lages i #31 og #34). JavaScript (tegnteller, dialoger, fokus ved klientfeil). Mobiloppsett. Endringer i `app/config.py`, `_bmad/`, `.docs/`, planleggingsdokumentene eller andres grener.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Mock-stripe | mock-modus | Stripe med «Mock-modus er på – ingen tekst sendes til en språkmodell.» | N/A |
| API-modus | api med nøkkel | Ingen stripe og ingen modustekst | N/A |
| Uten steg | Side uten `aktivt_steg` og uten blokkene | Ingen stegindikator, sidekolonne eller handlingslinje, heller ingen tomme beholdere | N/A |
| Stegliste | Aktivt 2, lenke for 1 | `nav` med `ol`; 1 er lenke med «Ferdig», 2 har `aria-current="step"` og «Du er her», 3 er uten lenke | N/A |
| Tilbake til steg 1 | Aktivt 1, lenker for 2 og 3 | 2 og 3 er fullførte lenker | N/A |
| Sidekolonne og linje | Siden fyller blokkene | `aside` etter `main`, deretter handlingslinjen | N/A |
| Gyldig felt | Etikett og hjelpetekst | `label` koblet til feltet, hjelpetekst i `aria-describedby`, ingen `aria-invalid`, aldri `maxlength` | N/A |
| Ugyldig felt | Feiltekst satt | `aria-invalid="true"`, feilen i `aria-describedby`, `feltfeil` rett under feltet | Verdien beholdes og escapes |
| Passordfelt | Type passord med verdi | Ingen verdi i HTML-en | Gjelder også ved feil |
| Flerlinjefelt | Verdi starter med linjeskift; teller | Linjeskiftet beholdes; tellerens id er i `aria-describedby` | N/A |
| Skrivebeskyttet | `readonly` | `readonly`, ikke `disabled` | N/A |
| Autofokus | Felt, melding eller overskrift med `autofokus` | Attributtet `autofocus` settes; av som standard | N/A |
| Feilmelding | Type feil | `role="alert"`, `tabindex="-1"`, firkantet ikon, uthevet første setning | Plass til «Prøv igjen» |
| Info og bekreftelse | Typene info og bekreftelse | Info har ingen rolle som standard, men kan få `status`; bekreftelse har `status` | N/A |
| Symboler | `✓ ? ! i` ved siden av ord | `aria-hidden="true"`; merker i huskelisten har skjult tekst «Dokumentert», «Mangler dokumentasjon» eller «Gjort» | N/A |

</frozen-after-approval>

## Code Map

- `app/templates/base.html` -- i dag bare modustekst og `<main>`. Utvides. API-teksten fjernes.
- `app/templates/index.html` -- midlertidig forside; bruker `content`.
- `app/main.py` -- `create_app()`; her monteres `/static` med `StaticFiles`, med sti fra `__file__` som `MAL_MAPPE`.
- `tests/test_pages.py` -- testen av API-banneret endres etter A12. `hent_forsiden` gjenbrukes.
- `ux-designs/.../mockups/steg-2-1024.html` -- CSS og DOM å bygge på. Variabelnavnene og manglende ARIA kopieres ikke. Fokus, deaktivert, ugyldig og meldinger mangler.
- `origin/miranda-gap-analyse-33` (PR #51) -- endres ikke her. `steg_2.html` har egen stil og stegliste. Testene søker i HTML-en, så grunnmalen kan ikke inneholde `<textarea` eller «Huskeliste», heller ikke i kommentarer.

## Tasks & Acceptance

**Execution:**
- [ ] `app/static/stil.css` -- **Variabler** og typografi. **Oppsett** etter DESIGN.md «Layout & Spacing»: innhold maks 1280 px midtstilt, marg 40/24, sidekolonne 300/240 med avstand 48/24, overskrift 54/46, dok-fliser 3/2 kolonner (enslig flis beholder bredden), to like kolonner for CV/annonse, mangler-kort og valgkort, innlogging med introduksjon (med nummerert liste) og skjemakort 460/420. **Sideramme:** flex-kolonne med `min-height: 100vh`, så handlingslinjen (`sticky`) står nederst også på korte sider; `scroll-padding-bottom` på `html`, minst linjehøyden pluss fokusringen; hopp-lenken har lys flate rundt ringen. **Komponenter:** `knapp-primar` og `knapp-sekundar` ser like ut på `a` og `button`; `knapp-deaktivert`; `lenke` på `a` og lenkestilet `button` (til «Logg ut», som sender data); felt (ugyldig med fokus viser to ringer, skrivebeskyttet), feltfeil, tegnteller, valgkort; inndata-kort, mangler-kort med svarfelt, dok-flis med bevis, vilkår-boks, sideboks, brev-ark; chips, huskeliste; meldinger og lagringsstatus; klasse for skjult tekst
- [ ] `app/main.py` -- monter `/static`
- [ ] `app/templates/makroer/` -- makroene i grensesnittet under
- [ ] `app/templates/base.html`, `index.html` -- sideramma etter grensesnittet
- [ ] `tests/maler/komponentside.html`, `tests/komponentside.py` -- alle komponenter, oppsett og varianter med testpar 1, lange kravtitler, sitater, filnavn og e-postadresse, flere lange tekstfelt. Python-fila bygger appen med `create_app()`, legger `tests/maler` til Jinja-lasteren og en testrute, og kan startes på 127.0.0.1. Testene bruker samme funksjon
- [ ] `tests/test_pages.py`, `tests/test_maler.py` -- hver rad i matrisen; komponentsiden har én `h1`, `h2`/`h3`-hierarki og `fieldset` med `legend`; alle ressursadresser i HTML-en er lokale og svarer 200
- [ ] `tests/test_stil.py` -- kontrastparene i DESIGN.md regnet ut fra CSS-variablene (tekst ≥ 4,5, kant og fokus ≥ 3); ingen hex, `rgb()`, `rgba()`, `hsl()` eller navngitte farger utenfor `:root` (`transparent`, `currentColor` og `inherit` er lov); ingen eksterne adresser
- [ ] `README.md` -- mappestruktur, hvordan en ny side bruker grunnmalen, og kommandoen for komponentsiden

**Acceptance Criteria:**
- Given komponentsiden, when den vises ved 1440 px, then innholdet er høyst 1280 px, sidekolonnen 300 px, overskriften 54 px og dok-flisene i 3 kolonner; ved 1199 og 1024 px er det 240 px, 46 px og 2 kolonner.
- Given 1024 og 1440 px, when lange kravtitler, sitater, filnavn og e-postadresse vises, then ingenting overlapper eller klippes, og siden ruller ikke sidelengs.
- Given vindu under 1024 px, when siden vises, then den kan rulles sidelengs, og knappene kan nås.
- Given tastaturnavigasjon, when Tab brukes, then hopp-lenken kommer først, fokusringen er synlig på hver kontroll (også mot mock-stripen), handlingslinjen dekker ikke fokusert element, og et ugyldig felt viser både feilkant og ring.
- Given en kort side, when den vises, then handlingslinjen står nederst i vinduet.
- Given grunnmalen, when testene fra PR #51 kjøres mot den i en midlertidig kopi, then de består.

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Design Notes

**Grensesnitt for senere sider:**

| Del | Avtale |
|---|---|
| Blokker | `title` (settes av hver side: «<Stegets navn> – Supersøker»), `bruker` (#30: e-post og «Logg ut»), `content`, `sidekolonne`, `modellfeil` (hovedkolonnen, nederst, rett over linjen), `handlingslinje`, `skript` (tom) |
| Variabler | `aktivt_steg` (1–3), `steg_lenker` (`{nummer: url}`; et annet steg med lenke er fullført) |
| `sideoverskrift` | `forste`, valgfritt `aksent`, `overtittel` (inne i `h1`), `ingress` (utenfor), `autofokus`; `h1` har `tabindex="-1"` |
| `tekstfelt` | `id`, `etikett`, `navn`, `type` eller `flerlinje`, `verdi`, `hjelpetekst`, `feil`, `teller`, `readonly`, `autofokus`, `attributter` (f.eks. `autocomplete`, `rows`, `data-*`) |
| `melding` | `type`, valgfri `tittel`, innhold via `call`, `id`, `rolle`, `autofokus` |
| Hopp-lenke | Peker til `<main id="innhold" tabindex="-1">` |

**Fokus (NFR-1):** `autofokus` dekker ved sidelasting uten JavaScript. Sidene (#31, #33, #34) bestemmer når den slås på: `h1` ved stegbytte, første ugyldige felt eller meldingen ved feil. Aldri `h1` ved vanlig lasting, for da kommer ikke hopp-lenken først.

**Makroer bare der det er noe å gjøre feil.** Knapper, kort og merker er CSS-klasser. Tekstfeltmakroen setter et ekstra linjeskift etter `<textarea>`, fordi nettleseren fjerner det første.

**Handlingslinjen ligger utenfor skjemaet.** Primærknappen kobles til med `form="<skjema-id>"`.

**Tomme blokker:** grunnmalen fanger blokken med `{% set x %}{% block ... %}{% endblock %}{% endset %}` og lager beholderen bare når `x|trim` ikke er tom.

## Verification

**Commands:**
- `uv run pytest` -- expected: alle tester består
- `uv run ruff check .` og `uv run ruff format --check .` -- expected: ingen funn
- `uv run python -m tests.komponentside` -- expected: komponentsiden vises på 127.0.0.1

**Manual checks:**
- Skjermbilder i hodeløs Edge ved 1024, 1199 og 1440 px, sammenlignet med mockupen, med kontroll av at riktige farger er paret. Tab gjennom komponentsiden i nettleser. Resultatet noteres i Implementation Notes. Skjermleser testes ikke her (T-7, #37).
