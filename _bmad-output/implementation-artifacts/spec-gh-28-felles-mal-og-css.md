---
title: 'Felles HTML-mal og CSS (issue #28)'
type: 'feature'
created: '2026-11-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '87a62a1d7ed645786fafab28fdcd3c1820431d70'
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
- [x] `app/static/stil.css` -- **Variabler** og typografi. **Oppsett** etter DESIGN.md «Layout & Spacing»: innhold maks 1280 px midtstilt, marg 40/24, sidekolonne 300/240 med avstand 48/24, overskrift 54/46, dok-fliser 3/2 kolonner (enslig flis beholder bredden), to like kolonner for CV/annonse, mangler-kort og valgkort, innlogging med introduksjon (med nummerert liste) og skjemakort 460/420. **Sideramme:** flex-kolonne med `min-height: 100vh`, så handlingslinjen (`sticky`) står nederst også på korte sider; `scroll-padding-bottom` på `html`, minst linjehøyden pluss fokusringen; hopp-lenken har lys flate rundt ringen. **Komponenter:** `knapp-primar` og `knapp-sekundar` ser like ut på `a` og `button`; `knapp-deaktivert`; `lenke` på `a` og lenkestilet `button` (til «Logg ut», som sender data); felt (ugyldig med fokus viser to ringer, skrivebeskyttet), feltfeil, tegnteller, valgkort; inndata-kort, mangler-kort med svarfelt, dok-flis med bevis, vilkår-boks, sideboks, brev-ark; chips, huskeliste; meldinger og lagringsstatus; klasse for skjult tekst
- [x] `app/main.py` -- monter `/static`
- [x] `app/templates/makroer/` -- makroene i grensesnittet under
- [x] `app/templates/base.html`, `index.html` -- sideramma etter grensesnittet
- [x] `tests/maler/komponentside.html`, `tests/komponentside.py` -- alle komponenter, oppsett og varianter med testpar 1, lange kravtitler, sitater, filnavn og e-postadresse, flere lange tekstfelt. Python-fila bygger appen med `create_app()`, legger `tests/maler` til Jinja-lasteren og en testrute, og kan startes på 127.0.0.1. Testene bruker samme funksjon
- [x] `tests/test_pages.py`, `tests/test_maler.py` -- hver rad i matrisen; komponentsiden har én `h1`, `h2`/`h3`-hierarki og `fieldset` med `legend`; alle ressursadresser i HTML-en er lokale og svarer 200
- [x] `tests/test_stil.py` -- kontrastparene i DESIGN.md regnet ut fra CSS-variablene (tekst ≥ 4,5, kant og fokus ≥ 3); ingen hex, `rgb()`, `rgba()`, `hsl()` eller navngitte farger utenfor `:root` (`transparent`, `currentColor` og `inherit` er lov); ingen eksterne adresser
- [x] `README.md` -- mappestruktur, hvordan en ny side bruker grunnmalen, og kommandoen for komponentsiden

**Acceptance Criteria:**
- Given komponentsiden, when den vises ved 1440 px, then innholdet er høyst 1280 px, sidekolonnen 300 px, overskriften 54 px og dok-flisene i 3 kolonner; ved 1199 og 1024 px er det 240 px, 46 px og 2 kolonner.
- Given 1024 og 1440 px, when lange kravtitler, sitater, filnavn og e-postadresse vises, then ingenting overlapper eller klippes, og siden ruller ikke sidelengs.
- Given vindu under 1024 px, when siden vises, then den kan rulles sidelengs, og knappene kan nås.
- Given tastaturnavigasjon, when Tab brukes, then hopp-lenken kommer først, fokusringen er synlig på hver kontroll (også mot mock-stripen), handlingslinjen dekker ikke fokusert element, og et ugyldig felt viser både feilkant og ring.
- Given en kort side, when den vises, then handlingslinjen står nederst i vinduet.
- Given grunnmalen, when testene fra PR #51 kjøres mot den i en midlertidig kopi, then de består.

## Implementation Notes

- Presisering fra Helle (2026-11-26): `steg_2.html` i PR #51 flyttes over til de felles klassene etter at #28 er merget, og tilpasses ikke her. Endringene i `base.html` må likevel ikke gjøre at siden slutter å virke. Det gjelder både testene i PR #51 og at siden fortsatt vises og kan brukes med sine egne stiler sammen med `stil.css`.

**Valg under byggingen (2026-11-26):**

- Stilene styres med egne klasser, ikke globale elementselektorer. Klassenavnene i `steg_2.html` (PR #51), som `.valg`, `.fliser`, `.oppsett` og `.vilkar`, er unngått.
- `min-width: 1024px` settes bare i vinduer under 1024 px. Satt for alle bredder ville et vindu på 1024 px med rullefelt (ca. 1009 px synlig) ha rullet sidelengs.
- `teller` i `tekstfelt` er tegngrensen. Makroen skriver «n / 1 000 tegn».
- `attributter` slipper ikke gjennom `maxlength` eller `value`.
- Mangler-kortet har to like kolonner slik spesifikasjonen sier (mockupen har 1fr 1.15fr).
- I huskelisten har merket skjult statusord. Det synlige statusordet under navnet (som i mockupen) er `aria-hidden`, så det ikke leses to ganger.

**Kontroll (2026-11-26):**

- `uv run pytest`: 101 tester består. `uv run ruff check .` og `uv run ruff format --check .`: ingen funn. `uv run python -m tests.komponentside` viser siden.
- Ni bevisst innlagte feil i en kopi (bl.a. farge utenfor `:root`, passord skrevet tilbake, `maxlength`, tapt linjeskift, tom beholder, ekstern skrift) fikk hver minst én test til å feile.
- PR #51 (`9263bc4`) lagt oppå i en midlertidig kopi: alle 142 tester består, derav alle 40 i `test_gap_analyse.py`. Steg 2 vist i Edge ved 1024 og 1440 px uten sidelengs rulling; Tab, tegnteller, feilmarkering og radiovalg virker.
- Hodeløs Edge: ved 1440 px er innholdet 1280, sidekolonnen 300, overskriften 54 px og flisene i 3 kolonner; ved 1199 og 1024 px er tallene 240, 46 og 2. Ved 1024, 1199, 1200 og 1440 px ble det ikke funnet sidelengs rulling, klipping eller overlapp. Ved 800 px ruller siden sidelengs, og primærknappen nås. På en kort side står handlingslinjen nederst. Skjermbilder ved 1024 px er sammenlignet med mockupen.
- Tab gjennom komponentsiden (1024 × 700 og 1440 × 900): hopp-lenken kommer først, alle stopp har 3 px ring, og et ugyldig felt viser feilkant og ring. `autofocus` på `h1`, felt og meldinger gir fokus med ring (krevde fokusemulering i hodeløs Edge). `scroll-padding-top` ble lagt til fordi ringen ble klippet øverst ved Shift+Tab.

**Ikke oppfylt eller åpent:**

- Akseptansekravet om at handlingslinjen ikke dekker fokusert element er **bare delvis oppfylt**. Chromium ruller et høyt flerlinjefelt (CV, brev, langt svar) bare til markøren, så nedre del av feltet kan ligge bak linjen når det får fokus med Tab. Markøren var synlig, og ved skriving nederst i brevfeltet ble den holdt over linjen. `scroll-margin` hadde ingen virkning. En full løsning ser ut til å kreve JavaScript, som er utenfor #28. Andre kontroller ble ikke dekket.
- Et åpent punkt i huskelisten som ikke er et krav (tom sirkel) har ikke noe statusord for skjermleser. Spesifikasjonen og EXPERIENCE.md har bare «Dokumentert», «Mangler dokumentasjon» og «Gjort», så ingen ny tekst er funnet på.
- Skjermleser, andre nettlesere enn Edge og maskiner uten Segoe UI er ikke testet (T-7, #37).

**Etter granskningen (2026-11-26):**

- Rettelsene P1–P14 er gjort (se «Review Triage Log»). `uv run pytest`: 109 tester består. `ruff check` og `ruff format --check`: ingen funn. Med PR #51 (`9263bc4`) i en midlertidig kopi består 150 tester. Oppsettmålene ved 1024, 1199, 1200 og 1440 px er uendret.
- Rettelsen P2 skapte en ny feil: `{"type": "password"}` i `attributter` ble hoppet over, og passordet kunne da vises i klartekst. Feltet behandles nå som passordfelt, med egen test.
- Med de nye variantene på komponentsiden (P8) ble det klart at også korte flerlinjefelt kan bli delvis dekket (28 av 96 px ved 1440 × 900). Avviket gjelder derfor flerlinjefelt generelt. Andre kontroller dekkes ikke.

**Etterkontroll før granskning (2026-11-26):**

- Kontrollert på nytt, uavhengig av byggingen: 101 tester består uten hoppede tester, `ruff` har ingen funn, og 142 tester består med PR #51 (`9263bc4`) i en midlertidig kopi. Steg 2 er sammenlignet i hodeløs Edge med gammel og ny grunnmal ved 1024 px, og ruller ikke sidelengs ved 1024 eller 1440 px.
- Tab med ekte tastetrykk bekrefter avviket. Ved 1024 × 700 dekker linjen opptil 61 px av CV, annonse og brev forover og 192 av 358 px av CV-feltet bakover. Ved 1440 × 900 dekker den opptil 68 px. Ingen felt blir helt skjult, og ingen andre typer kontroller dekkes.
- **Vedtatt (Helle, 2026-11-26):** Avviket godtas i #28 og utsettes til #31, #33 og #34, som uansett trenger JavaScript (se `deferred-work.md`). To alternativer ble valgt bort: å la linjen slippe taket med CSS mens et flerlinjefelt har fokus (ikke prøvd, avviker fra «Blir liggende nederst i vinduet»), og å legge til JavaScript i #28 (bryter «Never»).

## Spec Change Log

## Review Triage Log

Granskning 2026-11-26 med tre uavhengige granskere: Blind Hunter (BH, uten sammenheng), Edge Case Hunter (EC) og Verification Gap (VG). Rader med samme P-nummer har samme årsak. VG-hullene er bevist ved at granskeren la inn feil i en kopi uten at testene slo ut.

| Nr | Funn | Vurdering | Rute | Begrunnelse |
|---|---|---|---|---|
| EC1 | Grunnmalen fanger blokkene i variablene `bruker`, `sidekolonne`, `modellfeil` og `handlingslinje` | medium | patch P1 | Gjenskapt: sendes `bruker` inn fra en rute, får `content` en tom verdi. #30 ville trolig truffet dette. |
| BH3 | Filteret for `maxlength` og `value` i `attributter` skiller mellom store og små bokstaver | low | patch P2 | Gjenskapt: `Value` og `maxLength` slipper gjennom. Rettes direkte i filteret. |
| EC6 | `type` i `attributter`, eller `type="Password"`, går forbi passordsperren | low | patch P2 | Gjenskapt: dobbel `type` med passordet i `value`. |
| VG-A1 | Samme om `maxLength` | low | patch P2 | Gjenskapt. |
| VG-A2 | Samme om passord via `attributter` | low | patch P2 | Gjenskapt. |
| BH4 | `attributter` gir doble `class`, `id` og `aria-describedby`; `required: false` og `verdi=0` blir feil | low | patch P2 | Doble navn rettes i samme filter. `required` og `verdi=0` er avvist, se EC7 og EC9. |
| BH5 | Telleren teller CRLF som to tegn; tusenskillet er vanlig mellomrom | medium | patch P3 | Gjenskapt: `ab\r\ncd` gir 6. Nettlesere sender CRLF. Linjebryting i telleren skjer ikke fra 1024 px, så den delen er false. |
| EC8 | Samme om CRLF | medium | patch P3 | Gjenskapt. |
| VG-A4 | Samme om CRLF, risiko for #31 | medium | patch P3 | Gjenskapt. |
| BH1 | `.valggruppe legend { margin: 0 }` fjerner luften under radiogruppens overskrift | low | patch P4 | Selektoren er mer spesifikk enn `.seksjonstittel`. |
| BH2 | `.mangler-kort-innhold p` fjerner toppmargen på feltfeil og tegnteller | low | patch P5 | Begge er `<p>` og taper på spesifisitet. `.sideboks p` har ingen slike barn i dag. |
| BH7 | README-eksemplet slår ikke på `autofokus` på ugyldig felt | medium | patch P6 | Eksemplet kopieres av senere sider og bryter fokusregelen i EXPERIENCE.md. JavaScript-oppgaven står i `deferred-work.md`. |
| BH8 | Komponentsiden merker et oppdiktet krav «Dokumentert» med et sitat som ikke støtter det | low | patch P7 | Bekreftet. Bryter produktets hovedløfte, også i en testmal som kan havne i skjermbilder. Opptellingen stemmer heller ikke med antall kort. |
| BH9 | Komponentsiden mangler ugyldig svarfelt og skrivebeskyttet og ugyldig brevark; innlogging vises bare inne i siderammen | low | patch P8 | Variantene legges til. Egen visning av innlogging uten ramme er avvist: oppsettet vises og måles allerede, og en egen visning krever ny testrute. |
| BH11 | Lenker uten klasse får nettleserens blå og lilla farge | low | patch P9 | Ingen slike lenker finnes i dag. README må si at lenker skal ha `lenke`. Global `a`-stil er unngått for ikke å påvirke `steg_2.html`. |
| BH12 | Forsiden setter ikke `title`; standardtittelen kan skjule at en side glemmer det | false | avvist | Forsiden er midlertidig og ikke et steg. «Supersøker» er appens navn, og siden erstattes i #30. |
| VG1 | Rekkefølgen i siderammen er ikke testet | medium | patch P10 | Stegindikatoren kunne flyttes nederst uten at testene slo ut. |
| VG2 | Forsidens `h1` og tekst er ikke testet | low | patch P11 | En tom forside besto alle testene. |
| VG3 | Sletting av stilregler oppdages ikke | medium | patch P12 | Klasser i markeringen kontrolleres ikke mot stilarket. Tilstandsregler som ikke dekkes slik, utsettes til #37 (D3). |
| VG-A3 | Komponentsiden bruker `bruker-epost`, `introduksjon` og `melding-handling` uten stilregel | low | patch P12 | Bekreftet. Klassene fjernes, og testen kan kreve likhet begge veier. |
| VG4 | Kontrasttestene kontrollerer ikke hvilke farger reglene faktisk pares | medium | utsatt D3 | Krever beregnede stiler i nettleser. Hører til #37. |
| BH15a | `les()` kontrollerer ikke at alle elementer blir lukket | low | patch P13 | Én linje i testhjelperen. |
| BH15b | Fargetesten leser bare `stil.css`, ikke malene | low | utsatt D4 | En slik test ville feilet på `<style>` i `steg_2.html` når PR #51 merges. Kan innføres når siden er flyttet over. |
| BH15c | Fokustesten fanger ikke alle måter å skjule ringen på | low | avvist | Ingen slik regel finnes, og en full kontroll krever mer logikk enn feilen er verdt. |
| EC11 | Lang e-postadresse kan presse «Logg ut» over to linjer | low | patch P14 | Følger av `min-width: 0` på alle barn i `.bruker`. Én regel retter det. |
| BH6 | Makroene feiler stille ved feil `type`, `aktivt_steg` som tekst eller tekstnøkler i `steg_lenker` | low | avvist | Bare utviklerfeil som synes straks på siden. README sier at nøklene er tall. Retting krever nye sperrer. |
| EC2 | `steg_lenker` med tekstnøkler | low | avvist | Som BH6. Lenkene bygges per forespørsel og går ikke via JSON. |
| EC3 | `aktivt_steg` som tekst eller utenfor 1–3 | low | avvist | Som BH6. |
| EC5 | Ukjent meldingstype | low | avvist | Som BH6. |
| EC4 | `melding` uten `call` | false | avvist | Gir en tydelig feil med en gang, og avtalen er innhold via `call`. |
| EC7 | `required: false` gjengis som påkrevd | low | avvist | Ingen sender boolske verdier, og retting krever ny gren. |
| EC9 | `verdi` som tall | low | avvist | Tekstfelt får tekst. Retting krever ny gren. |
| EC10 | Nettlesere uten `:has()` viser «Valgt» på begge kort | low | avvist | Alle nettlesere i vanlig bruk støtter `:has()`. |
| BH10 | Brevarket har ingen synlig kant | low | utsatt D2 | Koden følger DESIGN.md, som styrer utseendet og ikke gir brevarket kant. Spørsmålet gjelder designdokumentet. |
| BH13 | Åpent punkt uten krav i huskelisten har ingen status for skjermleser | medium | utsatt D1 | Hullet finnes fra før i EXPERIENCE.md, som bare har tre statustekster. Gruppa må velge ordlyden. |
| BH14 | Ingen gjentakbar kontroll av oppsett, ingen manuell testprosedyre | false | avvist | Prosedyren står i «Verification» og resultatet i «Implementation Notes». Granskeren fikk ikke spec-en. |
| BH16 | `scroll-padding-bottom` settes også uten handlingslinje; høyden er fast | false | avvist | `scroll-padding` reserverer ingen plass i oppsettet. Med to knapper fra 1024 px er linjen alltid én rad. |
| EC12 | Handlingslinjen kan dekke fokusert tekstfelt | medium | utsatt | Allerede ført i `deferred-work.md` etter vedtaket 2026-11-26. |

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
