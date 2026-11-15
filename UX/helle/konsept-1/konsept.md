# Konsept 1: Rolig veiviser

Designkonsept for Supersøker v1, laget 2026-11-15 etter [felles-brief.md](../felles-brief.md). Galleri: [index.html](index.html). Skjermene ligger i [skjermer/](skjermer/).

## Retning

**Én ting om gangen.** Hele appen er en rolig, enkolonnes veiviser på varmt papir. Innholdet står i en smal, sentrert kolonne (720 px på desktop), med en stor stegindikator øverst og én dempet blå aksent. Alt leses ovenfra og ned, og hvert steg slutter på samme måte: med **Neste-linjen**, en tynn strek, en setning om hva som skjer når du trykker, og primærknappen rett under.

Manglende krav vises først, som en tydelig «gjør dette nå»-blokk med svarfeltet rett under kravet. Dokumenterte krav er en enkel liste med sitat. Bare steg 3 har en smal sidekolonne, for «Teksten bygger på». På mobil blir den et sammenleggbart panel.

## Hvorfor dette passer målgruppen

Primærbrukeren (PRD §2) er en student som søker sin første relevante jobb. Hun er ofte usikker på hva arbeidsgiveren vil ha, og redd for å påstå noe hun ikke kan stå for. Retningen er laget for å senke den kognitive belastningen for en nervøs førstegangssøker:

- **Én kolonne og én lesevei.** Hun trenger aldri å velge hvor hun skal se. Kolonnebredden holder brødteksten rundt 65–75 tegn per linje.
- **Det neste steget er alltid sagt med ord.** Neste-linjen forteller hva som skjer før hun trykker («Vi finner kravene i annonsen og sjekker dem mot CV-en. Det tar noen sekunder.»). Det svarer på «hva skjer hvis jeg trykker her?», som er den vanligste kilden til nøling.
- **Trygghet i formuleringene.** «Mangler dokumentasjon» står alltid sammen med «Det står ikke i CV-en. Det betyr ikke at du mangler det.» Svarfeltet sier at teksten aldri påstår mer enn hun skriver.
- **Varme, ikke klinisk.** Papir- og sandtoner og en humanistisk sans-serif skal føles som et rolig skrivebord, ikke som et skjema hos en myndighet eller et rekrutteringssystem.

## Retningskontrakt (impeccable)

- **THESIS:** Veiviseren tar ett steg om gangen og sier alltid hva som skjer videre. Den avviser arbeidsbenken med to paneler side om side og dashbordet med poengsum, som er standardoppsettet for CV-verktøy.
- **OWN-WORLD:** Varmt papir (#F4EFE6) og sand (#EAE2D3), blekkblå aksent (#34557A), rav for «gjør dette nå», dempet grønt for «Dokumentert». Humanistisk sans-serif, generøs linjeavstand, 1 px hårstreker i stedet for kort, avrundede felt (8–16 px).
- **STORY:** Brukeren forstår hva annonsen krever og hva CV-en viser. Hun stoler på at teksten ikke overdriver, svarer kort på det som mangler, og kopierer et utkast hun kan stå for.
- **FIRST VIEWPORT:** Topplinje med merke og «Logg ut», et smalt mock-bånd i full bredde, deretter stegindikatoren (tre stasjoner, 40 px sirkler, «Du er her» under aktivt steg) og overskriften (34 px) i en kolonne på 720 px. Primærhandlingen er alltid nederst i kolonnen, høyrejustert på desktop og i full bredde på mobil.
- **FORM:** `seed: none (pinned)`. Retningen er låst i oppdraget: «Én ting om gangen. En rolig, luftig, enkolonnes veiviser med smal lesebredde (ca. 680–760 px innhold sentrert), stor og tydelig steg-indikator øverst, varme nøytrale bakgrunner (papir/sand), én dempet aksentfarge, en vennlig humanistisk sans-serif og generøs linjeavstand.»
- **Signaturgrep:** Neste-linjen. Den står nederst på hvert steg og gjentas på mobil.

## Designtokens

### Farger

Kontrastforholdene er beregnet etter WCAG 2.1 (relativ luminans). Alle tekstpar oppfyller AA (≥ 4,5:1 for normal tekst).

| Token | Hex | Bruk | Kontrast |
|---|---|---|---|
| `bg` | `#F4EFE6` | Sidebakgrunn (papir) | – |
| `surface` | `#FFFDF9` | Felt, dialoger, radiokort | – |
| `sand` | `#EAE2D3` | Mock-bånd, nøytrale meldinger, «Teksten bygger på» | – |
| `line` | `#D9CFBE` | Hårstreker (dekor) | – |
| `border` | `#857A69` | Kant på felt og sekundærknapper | 4,15 på `surface`, 3,68 på `bg` (≥ 3:1 for grensesnittkomponenter) |
| `ink` | `#2A2520` | Brødtekst, overskrifter | 13,25 på `bg` · 14,94 på `surface` · 11,79 på `sand` |
| `muted` | `#5B5247` | Hjelpetekst, tellere, inaktive steg | 6,69 på `bg` · 7,54 på `surface` · 5,95 på `sand` · 6,37 på `gapBg` · 6,21 på `errBg` |
| `accent` | `#34557A` | Primærknapp, lenker, aktivt steg, fokusring | 6,73 på `bg` · 7,58 på `surface` · 6,24 på `accentSoft` |
| hvit på `accent` | `#FFFFFF` | Tekst på primærknapp | 7,70 |
| `accentSoft` | `#E2E8EF` | Infomeldinger, glorie rundt aktivt steg | `ink` 12,30 |
| `ok` | `#2D6644` | «Dokumentert», «Kopiert.» | 5,65 på `okBg` · 5,92 på `bg` |
| `okBg` | `#E3EDE2` | Bakgrunn for «Dokumentert»-merke og suksess | `ink` 12,63 |
| `gap` | `#855000` | «Mangler dokumentasjon», «Gjør dette nå» | 5,56 på `gapBg` · 6,57 på `surface` |
| `gapBg` | `#F6E9CF` | «Gjør dette nå»-blokken, API-bånd | `ink` 12,63 |
| `err` | `#A0392A` | Feilmeldinger, ugyldige felt | 5,47 på `errBg` · 5,89 på `bg` |
| hvit på `err` | `#FFFFFF` | «Forkast og endre» | 6,75 |
| `errBg` | `#F8E3DD` | Bakgrunn for feilmeldinger | `ink` 12,30 |
| `mark` | `#F1DC9C` | Markering bak sitat fra CV-en | `ink` 11,17 |
| `disabledInk` på `disabledBg` | `#5F574C` / `#E2DACC` | Deaktivert knapp («Analyserer …») | 5,12 |

Fargestrategi: avdempet (*restrained*). Nøytrale toner fra papir og sand, én aksent, og tre tilstandsfarger som bare brukes der de betyr noe. «Mangler dokumentasjon» er rav, ikke rødt, fordi det ikke er en feil. Rødt brukes bare for feil og for den destruktive knappen.

### Typografi

Fontstakk (systemfonter, ingen eksterne ressurser):
`Seravek, "Gill Sans Nova", Ubuntu, "Segoe UI", Calibri, "DejaVu Sans", "Helvetica Neue", Arial, sans-serif`. På macOS gir det Seravek, på Windows Segoe UI og på Linux Ubuntu eller DejaVu Sans.

| Rolle | Desktop | Mobil | Vekt |
|---|---|---|---|
| H1 | 34/42 px | 26/33 px | 600 |
| H2 | 23/32 px | 20/28 px | 600 |
| Ingress | 19/31 px | 16/26 px | 400 |
| Brødtekst, krav | 17–18/28 px | 16/25 px | 400 / 600 for kravnavn |
| Etikett | 17/26 px | 16/26 px | 600 |
| Hjelpetekst | 15/23 px | 14–15/21–23 px | 400, `muted` |
| Liten (tellere, «Du er her») | 14 px | 14 px | 400 / 600, tabellsifre |

Hierarkiet kommer fra størrelse og vekt, ikke fra farge. Ingen versaler og ingen etiketter over overskrifter.

### Avstand og mål

- Skala på 4 px: 4, 8, 12, 16, 24, 32, 40, 48, 56.
- Mer luft over en overskrift (40–48 px) enn under (8–14 px).
- Innholdskolonne: 720 px (innlogging: 480 px). Steg 3: tekst 680 px + mellomrom 56 px + sidekolonne 300 px.
- Mobil: 390 px bredde, 20 px marger.
- Treffflater: primærknapp 56 px høy, sekundærknapp 50–52 px, felt 50 px, «Logg ut» 40 px.

### Former

- Radius: felt 8 px, knapper, meldinger og radiokort 10 px, blokker og paneler 14 px, dialoger 16 px, statusmerker helt runde.
- Kanter: 1,5 px på felt og sekundærknapper, 2 px på valgt radiokort, fokusert felt og ugyldig felt.
- Ingen skygger i flyten. Bare dialoger har en myk skygge (y 12 px, uskarphet 18 px).

## Mønstre

**Stegnavigasjon.** Tre stasjoner koblet med en linje: ferdige steg er fylte sirkler med hake og teksten «Ferdig», aktivt steg har tall, glorie, fet etikett og «Du er her», kommende steg er åpne sirkler med prikket linje. På mobil vises bare aktivt steg («Steg 2 av 3 · Gap-analyse»), med tre korte fremdriftsstreker og «Neste: Teksten».

**Neste-linjen (signatur).** Nederst på hvert steg: hårstrek, statusmelding hvis det finnes en (feil, «Analyserer …», «Kopiert.»), deretter «Neste: …» og knappene. Primærknappen står til høyre på desktop og nederst i full bredde på mobil. En eventuell tilbakeknapp står til venstre eller over.

**Statusvisning.** Status er alltid tekst og form:
- «Dokumentert»: fylt sirkel med hake, grønn tekst på lys grønn pille. Sitatet vises under med gul markering, etter «Fra CV-en:».
- «Mangler dokumentasjon»: stiplet sirkel med pluss, ravfarget tekst på hvit pille, inne i en ravfarget blokk. Formen sier «her mangler noe du kan fylle inn», uten å se ut som en feil.
- Ansettelsesvilkår: dokumentikon, ingen status, ingen opptelling, egen seksjon.
- Opptellingen «3 av 4 kompetansekrav er dokumentert i CV-en.» står som vanlig tekst, uten prosent, måler eller farge.

**«Gjør dette nå»-blokken.** Kravet, en forklaring om at det ikke står i CV-en, en blyant med «Gjør dette nå: fortell kort hva du har», etikett med «(valgfritt)», hjelpetekst om ærlighet og svarfelt med teller (x / 1 000 tegn).

**Meldinger.** Ikon, tittel og brødtekst i en avrundet boks. Feil er røde med varseltrekant og står ved feltet de gjelder (FR-8) eller rett over knappen som retter dem (FR-30). Info er blå, suksess grønn, nøytrale sandfarget. Statusmeldinger er markert som `role="status"`/`alert` i skissene.

**Fokus.** Tydelig ring på 3 px i aksentfarge, 4,5 px utenfor elementet. Hver skjerm viser minst ett fokusert element: felt med feil, svarfeltet, «Prøv igjen», «Avbryt» i den destruktive dialogen, «Fortsett økten».

**Dialoger.** Brukes bare der fokus må holdes: den destruktive bekreftelsen (FR-21), leverandørvarselet (FR-25) og øktvarselet (FR-22). Det trygge valget har fokus når det finnes et destruktivt alternativ.

**Tomtilstander.** Stiplet ramme med forstørrelsesglass, en setning om hva som mangler og en handling («Endre CV eller annonse»). Variant A bruker en grønn melding i stedet, fordi det er et godt resultat og ikke en tom tilstand.

## Styrker

1. **Lav kognitiv belastning.** Én lesevei, én primærhandling per steg og en setning om hva som skjer videre. Lett å gjennomføre med tastatur og skjermleser, fordi DOM-rekkefølgen og den visuelle rekkefølgen er den samme.
2. **Ærligheten er synlig.** Ordene «Dokumentert» og «Mangler dokumentasjon» står sammen med sitat eller forklaring, svarfeltet sier hva teksten vil gjøre med svaret, og «Teksten bygger på» skiller sitater, svar og vilkår.
3. **Robust og billig å bygge.** Standardkomponenter (felt, radiogruppe, knapper, `<details>`) i én kolonne. Mobilversjonen er nesten den samme siden, så NFR-2 krever lite ekstra arbeid.

## Svakheter og risikoer

1. **Lange sider.** Gap-analysen er over 2 200 px høy på desktop. «Lag tekst» ligger langt nede, og brukeren må scrolle forbi de dokumenterte kravene. Mulig tiltak: legg dokumenterte krav i sammenleggbare rader, eller gjør Neste-linjen klebrig på mobil.
2. **Kan føles tregt for erfarne brukere.** Sensor og gruppa, som kjører flyten mange ganger, får mye luft og forklaring. Tettheten er bevisst valgt for primærbrukeren, ikke for testeren.
3. **Kjent uttrykk.** Varmt papir med én blå aksent er en trygg stil. Impeccable-detektoren melder `cream-palette` på galleriet. Fargene er låst i oppdraget, men gruppa bør vurdere om uttrykket blir for anonymt.
4. **Brudd i enkolonneregelen på steg 3.** Sidekolonnen er riktig etter FR-19 («ved siden av teksten»), men bryter mønsteret. På mellomstore skjermer (760–1100 px) må panelet flyttes under teksten.
5. **Systemfonter gir ulikt uttrykk.** Seravek, Segoe UI og DejaVu Sans har ulik bredde og karakter. Linjebrytingen i skissene er beregnet med Segoe UI-metrikk og 8 % margin. I appen brytes teksten automatisk, men uttrykket varierer mellom operativsystemer.
6. **Ravfargen kan leses som en advarsel.** Selv om den ikke er rød, kan en nervøs bruker oppfatte blokken som «noe er galt». Teksten motvirker dette, men det bør testes med brukere.

## Antagelser

- `[ASSUMPTION]` Briefen er fulgt uten avklaringsspørsmål. Impeccable-intervjuet (PRODUCT.md, retningsvalg) er erstattet med slutninger fra brief og PRD, fordi konseptet ble laget av en subagent uten mulighet til å spørre.
- `[ASSUMPTION]` Politiattest brukes som illustrasjon på et ansettelsesvilkår (testpar 1 har ingen), slik briefen sier.
- `[ASSUMPTION]` Leverandøren i skjerm 14 er OpenAI med modellen `gpt-5-mini` (PRD §8).
- `[ASSUMPTION]` Innlogget bruker vises med e-postadressen `ida.testesen@example.com`. Kontoen lagrer ikke navn (FR-1).
- `[ASSUMPTION]` Testbruker-hintet på innloggingen viser til README i stedet for å vise e-post og passord (FR-3: passordet står bare i README og testoppsett).
- `[ASSUMPTION]` Opprett konto har ikke felt for å gjenta passordet. PRD-en krever det ikke.
- `[ASSUMPTION]` Skjerm 06 viser at arbeidsgiveren ikke ble funnet. I testpar 1 står arbeidsgiveren i annonsen, så skjermen er en illustrasjon av FR-9, slik briefen ber om.
- `[ASSUMPTION]` Skjerm 05 viser filnavnet `cv-ida-skannet.pdf`, og at tidligere CV-tekst er beholdt (FR-4). Skjerm 04 viser `48 kB` og «originalfila er slettet» som eksempeldata.
- `[ASSUMPTION]` Variant B i skjerm 09 bruker den oppdiktede stillingen «Ferievikar, Testvik bibliotek», fordi T-9 har eget scenario uten fasit ennå.
- `[ASSUMPTION]` Knappetekster PRD-en ikke fastsetter: «Forkast og endre» (12), «Send og analyser» og «Avbryt» (14), «Logg ut nå» (15), «Endre svar eller valg» (steg 3, FR-21), «Tilbake til CV og annonse» (06), «Velg en annen fil» og «Lim inn tekst i stedet» (05).
- `[ASSUMPTION]` Feilene i skjerm 13 skjer i API-modus, men skissen beholder mock-båndet fordi briefen krever det på alle sider utenom 14, og fordi feilene kan simuleres i testoppsettet.
- `[ASSUMPTION]` Øktvarselet (25 minutter, *bør* i FR-22) er en dialog, fordi brukeren må handle før økten utløper. Variant A vises over gap-analysen.
- `[ASSUMPTION]` På steg 3 er «Endre CV eller annonse» en lenke under knappene. Den åpner dialogen i skjerm 12.
- `[ASSUMPTION]` Desktop er tegnet i 1440 px og mobil i 390 px, som briefen sier. Mellomstore bredder er ikke tegnet.

## Avvik fra briefen

- Skjermene 09, 13 og 15 viser to varianter stablet på samme ark, hver som en hel side, skilt av en mørk merkelapp («Variant A – …»). Merkelappen er en annotasjon, ikke en del av appen.
- Ingen andre avvik er kjent. Antagelsene over fyller hull i briefen, men endrer ikke noe den fastsetter.

## Kvalitetskontroll

- Alle 17 SVG-er er sjekket som velformet XML (`System.Xml.XmlDocument`), og har `viewBox`, `width`, `height`, `<title>`, `<desc>` og `role="img"`.
- Hver skjerm er rendret i Chrome og kontrollert for tekst utenfor bokser, mock-bånd, «Logg ut», status med tekst og form, fravær av poengsum, synlige etiketter og fokusring.
- Kontrast er beregnet for alle tekstpar i tabellen over.
- Impeccable-detektoren er kjørt på `index.html`. Eneste funn er `cream-palette` (se svakhet 3).
- Impeccables egen sluttgjennomgang (finish reviewer) og DESIGN.md-dokumentasjonen er ikke kjørt. Konseptet er en skisse for gruppevalg, og tokens og mønstre står i denne fila i stedet. Det bør gjøres hvis gruppa velger denne retningen.

## Slik lages skjermene på nytt

Skjermene er generert med et lite Node-skript i [kilde/](kilde/), med manuell linjebryting basert på metrikk fra Segoe UI (krever Windows-fonter i `C:/Windows/Fonts`):

```bash
node UX/helle/konsept-1/kilde/screens.js UX/helle/konsept-1/skjermer
node UX/helle/konsept-1/kilde/gallery.js UX/helle/konsept-1
```
