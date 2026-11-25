---
name: Supersøker
description: Visuell identitet for Supersøker V1. Egen CSS, lokale ressurser, ingen UI-bibliotek.
status: final
created: 2026-11-25
updated: 2026-11-25
colors:
  papir: '#F6F1E8'
  kort: '#FFFDF9'
  hvit: '#FFFFFF'
  blekk: '#1E1A24'
  dempet: '#5A5262'
  linje: '#DDD3C4'
  feltkant: '#857A8C'
  aksent: '#A3401C'
  mangler-band: '#FFC247'
  mangler-flate: '#FFF0CC'
  mangler-merke: '#8A5A00'
  dok-flate: '#DCEAF7'
  dok: '#1F4E8C'
  bevis: '#FFCFC4'
  feil: '#8C0D12'
  feil-flate: '#FBE3E3'
typography:
  logo:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: 26px
    fontWeight: '400'
    letterSpacing: -0.01em
  sideoverskrift:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: 54px
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: -0.02em
  sideoverskrift-smal:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: 46px
    fontWeight: '400'
    lineHeight: '1.06'
    letterSpacing: -0.02em
  brev:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.7'
  sitat:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.45'
  seksjon:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  kravtittel:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 26px
    fontWeight: '800'
    lineHeight: '1.2'
  flistittel:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.3'
  stegtall:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 20px
    fontWeight: '400'
  ingress:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  brodtekst:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  knapp:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1'
  hjelpetekst:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  overtittel:
    fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif'
    fontSize: 13px
    fontWeight: '700'
    letterSpacing: 0.12em
rounded:
  sm: 10px
  md: 14px
  lg: 20px
  xl: 24px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '9': 36px
  '10': 40px
  '12': 48px
  innhold-maks: 1280px
  innhold-min: 1024px
  sidekolonne: 300px
  sidekolonne-smal: 240px
components:
  mock-stripe:
    background: '{colors.blekk}'
    foreground: '{colors.hvit}'
    typography: '{typography.hjelpetekst}'
  toppfelt:
    background: '{colors.papir}'
    border: '1px solid {colors.linje}'
  stegindikator:
    active: '{colors.blekk}'
    marker: '{colors.aksent}'
    link: '{colors.aksent}'
    upcoming: '{colors.dempet}'
    numbers: '{typography.stegtall}'
  sideoverskrift:
    foreground: '{colors.blekk}'
    accent: '{colors.aksent}'
    typography: '{typography.sideoverskrift}'
  knapp-primar:
    background: '{colors.blekk}'
    foreground: '{colors.hvit}'
    border: '2px solid {colors.blekk}'
    radius: '{rounded.full}'
    typography: '{typography.knapp}'
  knapp-sekundar:
    background: transparent
    foreground: '{colors.blekk}'
    border: '2px solid {colors.blekk}'
    radius: '{rounded.full}'
    typography: '{typography.knapp}'
  knapp-deaktivert:
    background: '{colors.linje}'
    foreground: '{colors.dempet}'
    border: '2px solid {colors.linje}'
  lenke:
    foreground: '{colors.aksent}'
  handlingslinje:
    background: '{colors.kort}'
    shadow: '0 -6px 16px rgba(30,26,36,.08)'
  tekstfelt:
    background: '{colors.hvit}'
    border: '1.5px solid {colors.feltkant}'
    radius: '{rounded.md}'
  tekstfelt-ugyldig:
    border: '3px solid {colors.feil}'
  fokusring:
    outline: '3px solid {colors.blekk}'
    offset: 3px
  veksler:
    background: '{colors.papir}'
    selected-background: '{colors.aksent}'
    selected-foreground: '{colors.hvit}'
    radius: '{rounded.full}'
  inndata-kort:
    background: '{colors.kort}'
    radius: '{rounded.xl}'
  melding-feil:
    background: '{colors.feil-flate}'
    foreground: '{colors.blekk}'
    border: '2px solid {colors.feil}'
    icon-shape: 'firkant med 5px hjørner'
    radius: '{rounded.md}'
  feltfeil:
    foreground: '{colors.feil}'
    icon-shape: 'firkant med 5px hjørner'
  melding-info:
    background: '{colors.kort}'
    foreground: '{colors.blekk}'
    border: '1.5px solid {colors.blekk}'
    radius: '{rounded.md}'
  melding-bekreftelse:
    background: '{colors.dok-flate}'
    foreground: '{colors.blekk}'
    icon: '{colors.dok}'
    radius: '{rounded.md}'
  mangler-kort:
    background: '{colors.kort}'
    band: '{colors.mangler-band}'
    radius: '{rounded.xl}'
    title: '{typography.kravtittel}'
  svarfelt:
    background: '{colors.mangler-flate}'
    border: '1.5px solid {colors.mangler-band}'
    radius: '{rounded.lg}'
  dok-flis:
    background: '{colors.dok-flate}'
    foreground: '{colors.blekk}'
    chip: '{colors.dok}'
    radius: '{rounded.xl}'
    title: '{typography.flistittel}'
  bevis-klistremerke:
    background: '{colors.bevis}'
    foreground: '{colors.blekk}'
    radius: '{rounded.sm}'
    shadow: '0 3px 6px rgba(30,26,36,.15)'
    typography: '{typography.sitat}'
    rotation: none
  vilkar-boks:
    border: '2px dashed {colors.feltkant}'
    radius: '{rounded.lg}'
  valgkort:
    background: '{colors.kort}'
    border: '2px solid {colors.linje}'
    selected-border: '3px solid {colors.aksent}'
    radius: '{rounded.lg}'
  sideboks:
    background: '{colors.kort}'
    border: '1px solid {colors.linje}'
    radius: '{rounded.lg}'
  huskeliste:
    done-mark: '{colors.dok}'
    open-mark: '{colors.mangler-merke}'
  brev-ark:
    background: '{colors.kort}'
    radius: '{rounded.lg}'
    typography: '{typography.brev}'
    shadow: '0 6px 18px rgba(30,26,36,.08)'
  kildeliste:
    foreground: '{colors.blekk}'
    label: '{colors.dempet}'
    quote: '{typography.brodtekst}'
  lagringsstatus:
    foreground: '{colors.dempet}'
    typography: '{typography.hjelpetekst}'
  dialog:
    background: '{colors.kort}'
    radius: '{rounded.xl}'
    backdrop: 'rgba(30,26,36,.55)'
---

# Supersøker – visuell identitet

Virkemåten står i [EXPERIENCE.md](EXPERIENCE.md). Denne fila styrer utseendet og gjelder som endelig når pull requesten er merget. Retningen er [gruppas samlede forslag](../../ux/samlet-forslag/README.md) med endringene Helle vedtok 2026-11-25; begrunnelsene står i [.memlog.md](.memlog.md). **Ved konflikt går DESIGN.md og EXPERIENCE.md foran skisser og mockups.**

## Brand & Style

Supersøker skal virke som et personlig skriveverktøy som er ærlig om hva det vet: papirbakgrunn, én serif-overskrift med kursiv aksent per side, og et brev som ser ut som et ark. Gap-analysen skal leses som en oversikt over dokumentasjon, ikke som en karakter. Derfor finnes det ingen poengsum, målere eller prikker (SM-C1).

Skygger, skillelinjer og papirfølelsen er ren stemning. Disse uttrykkene bærer en betydning:

| Uttrykk | Betyr |
|---|---|
| Gult | «Gjør noe her». Aldri feil, aldri ren informasjon. |
| Lyseblått med hake | Dokumentert i CV-en |
| Fersken-rosa lapp | Ordrett fra CV-en |
| Mørkerødt med firkantet ikon | Ekte feil |
| Blekksvart, fylt | Den viktigste handlingen |
| Serif | Logo, sideoverskrift og brukerens egne ord |

Ingen lilla og ingen grønn. Gruppa avviste begge 2026-11-23.

## Colors

- **Grunnflater:** `{colors.papir}` er sidebakgrunn, `{colors.kort}` er kort, bokser, handlingslinje og brevark, og `{colors.hvit}` er skrivefelt.
- **Tekst:** `{colors.blekk}` til brødtekst og overskrifter, `{colors.dempet}` til hjelpetekst og overtitler.
- **Skillelinjer:** `{colors.linje}` er pynt og bærer aldri informasjon alene. `{colors.feltkant}` brukes der kanten viser at noe kan fylles ut, og på vilkårsboksen.
- **Aksent (terrakotta):** `{colors.aksent}` brukes på kursiv aksent i sideoverskriften, prikken i logoen, lenker, aktivt steg, «Du er her», valgt veksler og «Valgt». **Aldri på primær- eller sekundærknapper** (endring fra forslaget, se under).
- **Mangler dokumentasjon:** `{colors.mangler-band}` er båndet øverst på kortet, `{colors.mangler-flate}` er svarflaten, og `{colors.mangler-merke}` er det åpne merket i huskelisten.
- **Dokumentert:** `{colors.dok-flate}` er flisen, `{colors.dok}` er merke, hake og chip-kant.
- **Bevis:** `{colors.bevis}` brukes bare på CV-sitatet i gap-analysen.
- **Feil:** `{colors.feil}` og `{colors.feil-flate}` brukes bare på ekte feil: validering, filfeil, innlogging og modellfeil.

**Endret fra forslaget (2026-11-25):** Primærknappen er blekksvart, ikke terrakotta, og feilfargen er `#8C0D12`, ikke `#B3261E`. Terrakotta og den gamle feilfargen hadde 1,03:1 i lyshetsforskjell. Feil og primærhandling skal ikke kunne forveksles, heller ikke i gråtoner. Lyshetsforskjellen mellom `{colors.feil}` og `{colors.blekk}` er også liten (1,78:1), så **det er formen som skiller dem**: knappen er en fylt pille, feilmeldingen en lys boks med mørk kant og firkantet ikon. Formkravene er derfor faste regler.

### Kontrast (WCAG 2.1, beregnet 2026-11-25)

Tekst krever 4,5:1. Kanter på kontroller og fokusring krever 3:1.

| Par | Forhold |
|---|---|
| blekk på papir / kort / hvit | 15,2 / 16,8 / 17,1 |
| dempet på papir / kort / mangler-flate / dok-flate / linje | 6,6 / 7,3 / 6,6 / 6,1 / 5,0 |
| hvit på blekk (primærknapp, mock-stripe) | 17,1 |
| aksent på papir / kort | 5,6 / 6,2 |
| hvit på aksent («Du er her», «Valgt») | 6,3 |
| blekk på mangler-band / mangler-flate / dok-flate / bevis / feil-flate | 10,6 / 15,1 / 14,0 / 12,2 / 14,0 |
| dok på hvit / dok-flate | 8,3 / 6,8 |
| mangler-merke på kort | 5,8 |
| feil på kort / papir / feil-flate | 9,5 / 8,6 / 7,9 |
| feltkant mot hvit / kort / papir / mangler-flate (ikke-tekst) | 4,1 / 4,0 / 3,6 / 3,6 |
| fokusring (blekk) mot papir / kort / mangler-flate | 15,2 / 16,8 / 15,1 |

`{colors.mangler-band}` mot kort (1,6:1) og `{colors.linje}` mot papir (1,3:1) er under 3:1. De er pynt: status står alltid i tekst og symbol, og kontroller har egen synlig markering.

## Typography

**Serif-regelen:** Georgia brukes i **logoen, sideoverskriften, brevarket og CV-sitatet i bevis-klistremerket**. Alt annet er sans (Segoe UI / system-ui), også steg-tall, seksjonsoverskrifter, dialogtitler, korttitler som «Logg inn» og stillingen i sidekolonnen.

CV-sitatet er et bevisst unntak fra «serif bare i logo, overskrift og brev»: serif markerer brukerens egne ord, og sitatet er brukerens ord på samme måte som brevet. Sitatene i kildelisten «Teksten bygger på» står i sans, fordi unntaket bare gjelder klistremerket.

Valget av serif er gruppas vurdering. Det er ikke brukertestet om det passer målgruppen.

| Rolle | Token |
|---|---|
| Logo | `{typography.logo}` |
| Sideoverskrift, én per side. Andre ledd i kursiv og aksent | `{typography.sideoverskrift}`; under 1200 px `{typography.sideoverskrift-smal}` |
| Brev og forslag i redigerbart ark | `{typography.brev}` |
| CV-sitat, kursiv | `{typography.sitat}` |
| Seksjonsoverskrift | `{typography.seksjon}` |
| Tittel på krav som mangler dokumentasjon | `{typography.kravtittel}`. Tung vekt brukes bare her |
| Tittel på dokumentert krav | `{typography.flistittel}` |
| Steg-tall `01`–`03`, kursiv sans | `{typography.stegtall}` |
| Ingress, brødtekst, knapp | `{typography.ingress}`, `{typography.brodtekst}`, `{typography.knapp}` |
| Hjelpetekst, tegnteller, mock-stripe | `{typography.hjelpetekst}` |
| Overtittel i versaler («Steg 2 av 3», overskrifter i sidekolonnen) | `{typography.overtittel}` |

Ingen nettskrifter lastes ned, så mock-modus virker uten nett. Segoe UI finnes normalt bare på Windows; andre maskiner bruker neste skrift i rekken og kan få andre linjebrytninger. Oppsettet må derfor tåle at tekst bryter annerledes.

## Layout & Spacing

Grunnenheten er 4 px. Skalaen står i `spacing`.

| | Fra 1200 px | 1024–1199 px |
|---|---|---|
| Innhold | Høyst `{spacing.innhold-maks}`, midtstilt | Full bredde |
| Marg i innholdet | `{spacing.10}` | `{spacing.6}` |
| Sidekolonne | `{spacing.sidekolonne}`, til høyre | `{spacing.sidekolonne-smal}`, til høyre |
| Avstand til sidekolonne | `{spacing.12}` | `{spacing.6}` |
| Dokumentert-fliser | 3 kolonner | 2 kolonner |
| Sideoverskrift | `{typography.sideoverskrift}` | `{typography.sideoverskrift-smal}` |

- Mock-stripen og sidebakgrunnen går i full bredde. Toppfelt, stegindikator, innhold og innholdet i handlingslinjen følger innholdsbredden.
- CV og annonse står side om side i to like kolonner ved begge bredder. Innholdet i mangler-kortet (krav til venstre, svarflate til høyre) og de to valgkortene står også i to kolonner.
- Innlogging og registrering har ingen sidekolonne: introduksjon til venstre og skjemakort til høyre (460 px fra 1200 px, 420 px under).
- Dokumenterte krav fyller rutenettet fra venstre. En enslig flis på siste rad beholder bredden sin.
- Under `{spacing.innhold-min}` beholder siden 1024 px minstebredde og kan rulle sidelengs. Ingenting overlapper eller forsvinner (NFR-2, vedtak 15). Mobil og nettbrett tegnes ikke.

## Elevation & Depth

Tre skygger, alle i blekk:

| Brukes på | Skygge |
|---|---|
| Mangler-kort og inndata-kort; svakere (8 %) på brevarket | `0 6px 18px rgba(30,26,36,.10)` |
| Bevis-klistremerke | `0 3px 6px rgba(30,26,36,.15)` |
| Handlingslinje (oppover) | `0 -6px 16px rgba(30,26,36,.08)` |

Skygge betyr aldri at noe kan klikkes. Klistremerket har skygge, men ingen hover-tilstand og vanlig tekstmarkør.

## Shapes

- `{rounded.sm}`: bevis-klistremerket.
- `{rounded.md}`: skrivefelt og meldinger.
- `{rounded.lg}`: sidebokser, svarflate, valgkort, vilkårsboks og brevark.
- `{rounded.xl}`: mangler-kort, dokumentert-fliser, inndata-kort og dialog.
- `{rounded.full}`: knapper, chips, veksler og «Du er her».
- Feilikonet er **firkantet** (5 px hjørner). Runde merker brukes aldri til feil.
- Ingenting er rotert. Forslaget roterte klistremerket 1,2°; det er fjernet fordi beviset skal være lett å lese og virke troverdig, også når sitatet er langt.

## Components

Oppførselen står i [EXPERIENCE.md → Component Patterns](EXPERIENCE.md#component-patterns), med de samme navnene.

| Komponent | Utseende |
|---|---|
| `mock-stripe` | Smal stripe i full bredde øverst, hvit halvfet tekst på blekk. |
| `toppfelt` | Logo `supersøker.` til venstre med aksentfarget punktum. E-postadresse og «Logg ut» som lenke til høyre. Linje under. |
| `stegindikator` | Tre like brede ledd med steg-tall og navn. Aktivt: halvfet blekk, 3 px aksentstrek under og pillen «Du er her» (hvit på aksent). Fullført: understreket aksentlenke med «✓ Ferdig» i `{colors.dok}`. Kommende: dempet, ingen lenke. |
| `sideoverskrift` | Overtittel over, deretter to ledd i serif der det siste er kursiv i aksent. Ingress under. |
| `knapp-primar` | Fylt blekkpille med hvit tekst. Én per visning. |
| `knapp-sekundar` | Gjennomsiktig pille med 2 px blekkant og blekktekst. |
| `knapp-deaktivert` | Flate i linjefargen med dempet tekst. Brukes bare mens et kall pågår. |
| `lenke` | Halvfet, understreket, i aksent. |
| `handlingslinje` | Kortflate med skygge oppover. `knapp-sekundar` til venstre og `knapp-primar` til høyre. |
| `tekstfelt` | Hvit flate med 1,5 px feltkant. Synlig etikett over, hjelpetekst mellom etikett og felt. |
| `tekstfelt-ugyldig` | 3 px feilkant. Med fokus vises **både** feilkanten og `fokusring`, med 3 px luft mellom, så de leses som to ringer. |
| `fokusring` | 3 px blekkring, 3 px utenfor elementet. Samme på alle kontroller. |
| `veksler` | Pilleformet beholder på papir med to valg. Valgt: hvit tekst på aksent og halvfet. |
| `inndata-kort` | Kortflate med tittelen «CV» eller «Stillingsannonse» i sans. |
| `melding-feil` | Lys feilflate, 2 px feilkant, firkantet ikon med `!`, blekktekst med halvfet første setning. **Ingen bred venstrekant** (forkastet: designsjekken markerer den som typisk for KI-generert design). |
| `feltfeil` | Lite firkantet ikon og halvfet feiltekst i feilfargen rett under feltet. |
| `melding-info` | Kortflate med 1,5 px blekkant og rundt `i`-ikon. Brukes til PDF-påminnelse, eksempelmerking og andre nøytrale beskjeder, også «Godt å vite». |
| `melding-bekreftelse` | Lyseblå flate med blå hake. |
| `mangler-kort` | Bredt kortflatekort med gult bånd. I båndet: hvit chip med blekkant og «? Mangler dokumentasjon», og en gjennomsiktig chip «Svar lagt til» når det er skrevet noe. Kravtittel i tung sans. |
| `svarfelt` | Gul innfelt flate i mangler-kortet med «Fortell oss kort», hjelpetekst, `tekstfelt` og tegnteller til høyre. |
| `dok-flis` | Lyseblå flis med chip «✓ Dokumentert» (hvit flate, blå kant og tekst), flistittel og `bevis-klistremerke` nederst. |
| `bevis-klistremerke` | Rett fersken-rosa lapp med skygge. «Fra CV-en din» i små versaler i sans, sitatet i serif kursiv mellom «». Lange sitater brytes og vises i sin helhet. |
| `vilkar-boks` | Stiplet kant uten fyll og uten statusmerke. |
| `valgkort` | To kort med **synlig radioknapp**, navn og én linje forklaring. Valgt: 3 px aksentkant, fylt radio og merket «Valgt». |
| `sideboks` | Kortflate med tynn linje og overtittel. |
| `huskeliste` | Punkter med skillelinjer. Gjort: fylt blå sirkel med hvit hake. Åpent: stiplet sirkel i `{colors.mangler-merke}` med `?` for krav, tom ellers. Råd: ren tekst uten sirkel. |
| `brev-ark` | Stort redigerbart ark i kortflate med serif og rolig linjeavstand. Skiller brukerens tekst fra grensesnittet. |
| `kildeliste` | Liste i `sideboks`: liten dempet merkelapp over hver oppføring, selve teksten i sans. |
| `lagringsstatus` | Liten dempet tekst under feltet den gjelder. |
| `dialog` | Midtstilt kort over mørklagt bakgrunn: tittel i sans, forklaring, `knapp-sekundar` og `knapp-primar`. |

### Skisser

- [Steg 2 ved 1024 px](mockups/steg-2-1024.html): viser alle valgene samlet ved smaleste støttede bredde.
- [Gruppas samlede forslag](../../ux/samlet-forslag/forslag.html) (1280 px): fortsatt referanse for komposisjonen av innlogging, steg 1 og steg 3. **Utdatert** på disse punktene: terrakotta knapper, feilfargen, serif i steg-tall, seksjonsoverskrifter, «Logg inn» og stillingen i sidekolonnen, rotert klistremerke, navn i toppfeltet, gul «Godt å vite»-boks, hjelpeteksten ved annonsefeltet og manglende tekster i steg 2 og 3 (se EXPERIENCE.md).
- Sammenligningene bak valgene ligger i `.working/`: [feilfarge](.working/color-themes-1-feilfarge.html), [overskrifter](.working/design-directions-2-overskrifter.html), [klistremerke](.working/design-directions-3-klistremerke.html) og [1024 px](.working/wireframe-4-bredde-1024.html).

## Do's and Don'ts

| Gjør | Ikke gjør |
|---|---|
| Bruk blekk til primær- og sekundærknapper | Lag terrakotta knapper |
| Gi feil både farge, firkantet ikon, kant og tekst | Skill feil fra annet innhold med farge alene |
| Bruk gult bare når brukeren kan gjøre noe | Bruk gult til informasjon eller rødt til manglende dokumentasjon |
| Skriv status med ord, med symbol ved siden | Vis status bare med farge eller symbol |
| Hold serif til logo, sideoverskrift, brev og CV-sitat | Bruk serif i andre titler eller etiketter |
| Hold bevis-klistremerket rett og uten hover | Roter det eller la det se klikkbart ut |
| Skriv opptellingen som en setning | Lag prikker, brøk, måler eller poengsum |
| Kontroller eksempelsitater mot kildefila før de brukes i skisser eller mockdata | Skriv om et CV-sitat |
