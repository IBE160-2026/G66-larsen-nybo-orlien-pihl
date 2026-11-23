# Konsept 2: Arbeidsbenk med bevis

Supersøker sier at den ikke finner på noe. Dette konseptet lar brukeren se det selv. CV-teksten og annonsen ligger alltid oppe som kildedokumenter, kravene står i en tabell mellom dem, og hvert dokumentert krav har et nummer (K1, K2 …) som går igjen tre steder: på raden i tabellen, ved linja i annonsen der kravet står, og som gul utheving i CV-teksten der sitatet er hentet. Uttrykket er kjølig og nøkternt, som et godt fagverktøy: lys grå flate, blekkblå primærfarge, tydelige rammer, tabulære tall og monospace for ordrett tekst.

Skissene ligger i [`skjermer/`](skjermer/), og galleriet er [`index.html`](index.html). Felles skjermliste og innhold følger [felles-brief.md](../felles-brief.md).

## Retning og begrunnelse

**Målgruppe.** Primærbrukeren er en student med lite relevant arbeidserfaring (PRD §2). Den største risikoen er at hun ikke stoler på teksten, eller at teksten påstår noe hun ikke kan forsvare i et intervju (§2.1, «Føle seg trygg»). Når kildene står synlige, slipper hun å ta Supersøker på ordet. Hun ser selv at «Norsk – morsmål» står på linje 25, og at førerkort ikke står noe sted.

**Hvorfor arbeidsbenk.** Steg 1 og 2 bruker samme tre kolonner, *CV | Krav | Annonse*. Midtkolonnen er tom med en forklaring i steg 1 og fylles med kravtabellen i steg 2. Oppsettet ligger fast mellom stegene, så brukeren lærer det én gang. Handlingene ligger alltid i midtkolonnen («Analyser kravene», «Last inn eksempel», «Lag tekst»).

**Hierarki, så det ikke blir for mye.** Kildepanelene har en gråere bakgrunn (`#F7F8FA`) og mindre monospace-tekst, slik at de leses som referansemateriale. Kravtabellen er hvit og bredest. Øverst i tabellen står kravet som mangler dokumentasjon, med svarfeltet åpent. Uthevinger og numre forklarer seg selv, og bare den valgte raden får en koblingslinje til CV-en. Ellers ville linjene krysset hverandre.

**Metode.** Konseptet er laget med impeccable-metodikken i modusen *Operate*, der brukeren skal få gjort en oppgave. Verden bidrar bare med typografi, palett, tetthet og ett signaturgrep. Navigasjon og kontroller er vanlige webkomponenter. Retningen var låst av oppdraget, med både uttrykk og førsteskjerm beskrevet. Derfor ble det ikke trukket alternative retninger, og ingen spørsmål ble stilt (se antagelsene). Skillens kvalitetsgulv (kontrast, tilstander, fokus, ingen kicker-etiketter over overskrifter, ingen fargede kantstriper på kort) er sjekket på hver skjerm.

## Signaturgrepet: nummerert bevis

| Element | Utforming | Hvorfor |
|---|---|---|
| Kravnummer `K1`–`K4`, `V1` | Liten ramme med blekkblå tekst. Fylt blekkblå når raden er valgt | Samme ID i tabell, annonse og CV. Vilkår får `V` så de ikke blandes med kompetansekrav |
| Markeringstusj | Gul bakgrunn `#FFE36E` med mørkere understrek `#8F7200` bak sitatet i CV-teksten | Folk kjenner gul overstrykningstusj som «her står det». Den gule fargen er eneste varme farge i paletten og brukes bare til dette |
| Monospace = ordrett | CV-tekst, annonse og sitater settes i monospace, alt annet i grotesk | Skillet viser hva som er brukerens egen tekst og hva som er appens. Monospace brukes ikke som pynt |
| Linjenumre | Kildepanelet for CV-en har linjenumre, og hvert sitat oppgir «CV-tekst, linje 17» | Gjør sitatet etterprøvbart, slik sitater er det i en fagtekst |
| Koblingslinje | 1,6 px blekkblå linje fra CV-merket til valgt tabellrad (skjerm 08) | Viser koblingen på desktop. Bare én om gangen |
| Utdrag ved klikk | I steg 3 og på mobil åpner et klikk på et sitat utdraget fra CV-teksten med linjenumre | Kildene er klikkbare også der det ikke er plass til hele CV-panelet |

## Designtokens

### Farger

Kontrastforholdene er beregnet med WCAG 2.1-formelen (relativ luminans).

| Token | Hex | Bruk | Kontrast |
|---|---|---|---|
| `ink` | `#121926` | Brødtekst, overskrifter | 17,61:1 på hvit · 15,40:1 på `ground` · 13,80:1 på `mark` |
| `ink-2` | `#4B5565` | Sekundærtekst, hjelpetekst | 7,54:1 på hvit · 6,59:1 på `ground` · 7,09:1 på `paper` |
| `line-no` | `#5C6675` | Linjenumre | 5,47:1 på `paper` |
| `primary` (blekkblå) | `#1C3D8F` | Primærknapp, lenker, fokusring, valgt steg, kravnummer | 9,94:1 mot hvit (begge veier) · 8,69:1 på `ground` · 8,38:1 på `primary-tint` |
| `primary-tint` | `#E6ECF8` | Valgt bakgrunn, infomeldinger | (bakgrunn) |
| `row-active` | `#F1F5FC` | Valgt tabellrad, valgt radiokort | `primary` 9,09:1 · `ink` 16,10:1 |
| `ground` | `#EDF0F4` | Sideflate | (bakgrunn) |
| `surface` | `#FFFFFF` | Paneler, felt | (bakgrunn) |
| `paper` | `#F7F8FA` | Kildepaneler, tabellhoder | (bakgrunn) |
| `line` | `#CDD3DC` | Dekorative skillelinjer og panelkanter | 1,51:1 (bærer ikke mening alene) |
| `line-strong` | `#737D8C` | Feltkanter, radioknapper, rullefelt | 4,17:1 på hvit · 3,92:1 på `paper` (krav ≥ 3:1) |
| `mark` | `#FFE36E` | Markeringstusj bak sitater | `ink` 13,80:1 · `primary` 7,79:1 |
| `mark-edge` | `#8F7200` | Understrek under utheving | 4,59:1 på hvit · 3,60:1 på `mark` |
| `ok` / `ok-bg` | `#1B6B43` / `#E4F2EA` | «Dokumentert», suksessmeldinger | 5,63:1 på `ok-bg` · 6,50:1 på hvit · 5,95:1 på `row-active` |
| `gap` / `gap-bg` | `#8A4A0B` / `#FBEEDB` | «Mangler dokumentasjon», advarsel | 5,99:1 på `gap-bg` · 6,85:1 på hvit |
| `err` / `err-bg` | `#B0261C` / `#FCEAE8` | Feilmeldinger, ugyldig felt, «Forkast»-knapp | 5,76:1 på `err-bg` · 6,69:1 på hvit · hvit på `err` 6,69:1 |
| `strip` | `#19212F` | Modusstripe (mock) | hvit 16,15:1 |
| `api` / `api-ink` | `#FFF1CC` / `#3E2A00` | Modusstripe (API) | 12,18:1 |
| `disabled-bg` / `disabled-ink` | `#E3E7ED` / `#5A6472` | Deaktivert knapp | 4,83:1 (lesbar, selv om WCAG ikke krever det) |
| `scrim` | `#121926` @ 55 % | Bakteppe bak dialoger | – |

### Typografi

- **Grotesk:** `'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif`. Én familie for hele grensesnittet, som i et fagverktøy.
- **Monospace:** `Consolas, 'Cascadia Mono', 'SF Mono', Menlo, 'DejaVu Sans Mono', monospace`. Bare til ordrett tekst (CV, annonse, sitater).
- **Tall:** `font-variant-numeric: tabular-nums` overalt, så tegntellere, linjenumre og «3 av 4» står i kolonne.
- **Skala (px, forhold ca. 1,15):** 12,5 metadata · 13–13,5 hjelpetekst · 14 etiketter (600) · 15 brødtekst · 15,5 brevtekst (linjehøyde 25) · 17 paneloverskrift (600) · 22 mobil H1 · 26 desktop H1 (600) · 30 innloggingsoverskrift. Monospace 12 px med linjehøyde 19.
- Vekter: 400 / 600 / 700. Ingen fet tekst i brødtekst, bortsett fra opptellingen «3 av 4».

### Avstand, former og ikoner

- 4-px-rutenett. Sidemarg 32 (desktop) / 16 (mobil). Kolonneavstand 16. Panelpolstring 20. Mellom felt 18–20.
- Desktopkolonner i steg 2: CV 430 · Krav 614 · Annonse 300 (av 1376). Steg 1: 520 · 320 · 504. Steg 3: 780 · 580.
- Radius: 6 på paneler og knapper, 5 på felt, 3 på kravnummer, 8 på dialoger. Ingen pilleform.
- Rammer: 1 px `line` rundt paneler, 1 px `line-strong` rundt felt. 2 px blekkblå ved fokus, 2 px rød når feltet er ugyldig.
- Skygge bare på dialoger (0 10 32, 28 % blekk). Ellers flatt.
- Ikoner: egne 16 × 16-paths, strek 1,6, avrundede ender. Hake, stiplet boks, varseltrekant, info, lås, klokke, opplasting, kopier, piler, skjold, søppelbøtte og send.
- Knapper: høyde 40 (44 for hovedhandlinger, 48 på mobil). Primær er fylt blekkblå. Sekundær er hvit med blekkblå kant. Lenkeknapp er understreket.

## Mønstre

- **Modusstripe.** En mørk stripe øverst på hver side med boksen `MOCK-MODUS` og «Ingen tekst sendes til en språkmodell. Svarene er ferdiglagde eksempler for testparene.» I API-modus blir stripen gul og navngir OpenAI (skjerm 14). Stripen ligger over dialogens bakteppe, så den er lesbar også når en dialog er åpen.
- **Stegliste.** Står midt i headeren på desktop: nummerboks + navn. Fullført steg har hake i stedet for nummer, aktivt steg er fylt blekkblått og understreket med 3 px. Formen viser forskjellen, ikke bare fargen. På mobil viser en egen linje bare «Steg 2 av 3: Gap-analyse».
- **Status.** «Dokumentert» er en fylt boks med hake. «Mangler dokumentasjon» er en stiplet, tom boks, altså noe som ikke er fylt ut ennå. Begge har alltid tekst, og ordene er PRD-ens. Forklaringen sier «Står ikke i CV-teksten. Det betyr ikke at du mangler det, bare at CV-en ikke viser det.» Opptellingen «3 av 4 kompetansekrav er dokumentert i CV-en.» er ren tekst, uten stolpe, ring eller prosent.
- **Ansettelsesvilkår.** Egen gruppe under tabellen med skjold-ikon og «telles ikke med i kravene». Vilkårene har ingen status og ikke noe svarfelt.
- **Meldinger.** Én boksmal i fire varianter (info, feil, suksess, nøytral): ikon, fet tittel som sier hva som skjedde, brødtekst som sier hva brukeren kan gjøre, og eventuelt handlinger. Feltfeil står rett under feltet med varseltrekant og rød ramme. Feil fra språkmodellen vises i midtkolonnen, der resultatet ellers ville kommet.
- **Fokus.** 2,5 px blekkblå ring med 3 px avstand. Den vises på ett naturlig element per skjerm: passordfeltet (01, 02), «Last inn eksempel» (03), «Analyser kravene» (04), det tomme annonsefeltet (05), «Arbeidsgiver» (06), «Vis i CV-en» på rad K3 (08), «Lag tekst» og «Endre CV eller annonse» (09), K3-sitatet (10), «Kopier tekst» (11, 17), «Avbryt» (12), «Prøv igjen» (13), «Send og analyser» (14), «Fortsett økten» og «E-post» (15) og «Skjul utdrag» (16). Skjerm 07 har bevisst ingen fokusring: knappen er deaktivert og kan ikke ha fokus, og statusen leses opp i et live-område.
- **Tomtilstander.** I steg 1 forklarer midtkolonnen med en liten eksempelrad hva som kommer der. I gap-analysen bruker «alle dokumentert» og «ingen tydelige krav» samme boksmal, og omskrivingsvalget står fortsatt under.
- **Venting.** Plassholderrader i grått i stedet for en snurrebass midt i innholdet. Knappen er deaktivert med teksten «Analyserer …», og tekstfeltene er låst med synlig forklaring.
- **Dialoger.** Brukes bare der handlingen ikke kan angres (12), der data skal sendes ut (14) og ved øktutløp (15). Den trygge handlingen står til venstre, bekreftelsen til høyre, og den destruktive knappen har eget navn («Forkast og endre»).
- **Mobil.** På mobil blir kolonnene til fanene «Krav», «CV-tekst» og «Annonse», med «Krav» aktiv. «Vis i CV-en» åpner utdraget som trekkspill rett under kravet, så brukeren slipper å bytte fane. På steget med teksten er alt stablet: brevet først, så en bred «Kopier tekst», så «Teksten bygger på».

## Sjekk mot de faste reglene

| Regel | Slik er den løst |
|---|---|
| Tre steg, stegliste synlig på desktop, bare aktivt steg på mobil | Header-stegliste (03–15) og «Steg N av 3» (16, 17) |
| Mock-modus på hver side | Modusstripen på alle skjermer unntatt 14, som viser API-modus |
| «Logg ut» fra alle sider etter innlogging | Header til høyre, også på mobil (03–17, ikke 01, 02 og 15B, der brukeren er utlogget) |
| Status med tekst og form | Fylt boks med hake / stiplet boks + ord |
| Ingen poengsum eller rangering | Bare opptellingen «3 av 4». Ingen meter, prosent eller sortering etter treff |
| Ikke chat | Ingen meldingstråd. Svar er vanlige skjemafelt under kravet |
| Synlige etiketter | Alle felt har etikett over feltet. Omskrivingsvalget har ledeteksten «Hva vil du at Supersøker skal lage?» |
| AA-kontrast | Se tokentabellen. All tekst ≥ 4,5:1, feltkanter og ikoner ≥ 3:1 |
| Knappetekster | «Analyser kravene», «Lag tekst», «Kopier tekst», «Endre CV eller annonse», «Prøv igjen», «Fortsett økten», «Last inn eksempel (testpar 1)» står ordrett |
| Omskrivingsvalg | «Helt søknadsutkast» forhåndsvalgt med «Et sammenhengende brev du redigerer selv.». «Forslag til formuleringer» har «Setninger du kan bruke i ditt eget brev.» |

## Styrker

1. **Åpenheten er synlig.** Hvert dokumentert krav peker til et nummerert, uthevet sted i CV-teksten med linjenummer. Det er et direkte svar på PRD-ens viktigste løfte og den verste feilen (FR-11).
2. **Oppsettet ligger fast.** Steg 1 og 2 har samme kolonner, og handlingene er alltid i midten. Brukeren mister ikke CV-en eller annonsen av syne, og «Endre CV eller annonse» står på samme sted i steg 2 og 3.
3. **Bra for testing og sensur.** Linjenumre og sitater gjør det lett å sjekke en analyse mot fasiten (T-2) og å se når et sitat ikke finnes. Mock-stripen viser alltid hvilken modus appen kjører i.
4. **Tilstandene er tegnet ut.** Feil, tomt, venting, deaktivert, fokus, ugyldig og bekreftet finnes alle, med samme boksmal.

## Svakheter og risikoer

1. **Tett på desktop.** Tre kolonner med monospace kan virke som et verktøy for fagfolk, og noen studenter kan oppleve det som mye. Kildepanelene er dempet, men det bør testes med 2–3 brukere om førsteinntrykket blir «for mye».
2. **Krever bred skjerm.** Steg 2 trenger omtrent 1280 px for tre kolonner. Mellom 900 og 1280 px må annonsepanelet trolig legges sammen til en fane eller skuff. Det er ikke tegnet.
3. **Linjenumre forutsetter stabil tekst.** Hvis CV-teksten endres, må numrene regnes på nytt. Det er greit fordi CV-en låses etter analysen (FR-21), men arkitekturen må lagre sitatets posisjon, ikke bare teksten.
4. **Monospace er bredt.** Lange CV-linjer brytes med hengende innrykk. På mobil blir utdragene smale, og et sitat kan bryte over to linjer.
5. **Utheving er ikke det samme som relevans.** Brukeren kan tro at et uthevet sitat er bevist relevant, men FR-11 sier at et ordrett sitat ikke alene beviser det. Teksten «ordrett sitat» i kolonnehodet demper dette, men det løser det ikke.
6. **Systemfonter.** Briefen krevde systemfonter i SVG-ene. Til selve appen bør gruppen vurdere en selvhostet grotesk og mono som hører sammen (for eksempel IBM Plex Sans og IBM Plex Mono), så uttrykket blir likt på alle maskiner.
7. **Koblingslinja finnes bare på desktop.** Den må tegnes på nytt når siden ruller og fungerer ikke med skjermleser. Den er et visuelt tillegg, og det tilgjengelige grepet er lenken «Vis i CV-en», som flytter fokus til sitatet.

## Antagelser

- `[ASSUMPTION]` Retningen «Arbeidsbenk med bevis» var gitt i oppdraget. impeccable-skillens retningsvalg og spørsmål ble derfor hoppet over, og alt nedenfor er valgt ut fra PRD-en uten avklaring med gruppa.
- `[ASSUMPTION]` Testpar 1 har ingen ansettelsesvilkår. «Politiattest må legges fram ved ansettelse.» er lagt inn i annonseteksten på skjerm 08, 10–12, 15 og 16 for å vise komponenten (som briefen sier).
- `[ASSUMPTION]` Kravene nummereres i den rekkefølgen de står i annonsen (K1 førerkort … K4 samarbeid), mens tabellen viser manglende krav først. Nummeret er kravets ID, ikke en rangering.
- `[ASSUMPTION]` Skjerm 06 bruker en variant av annonsen fra testpar 1 der «Testvik kommune» er fjernet, slik at arbeidsgiver mangler (FR-9).
- `[ASSUMPTION]` Skjerm 09 variant B bruker en oppdiktet, uklar annonse («Sommerjobb – Testvik Kafé») uten krav.
- `[ASSUMPTION]` Testbrukeren vises som `testbruker@example.com`. README beskriver ennå ikke testbrukeren, så hintet viser til et avsnitt «Testbruker» som må skrives.
- `[ASSUMPTION]` Fila heter `cv-ida.pdf` (48 kB) ved vellykket opplasting og `cv-ida-skannet.pdf` i feilen på skjerm 05. På 05 er den forrige CV-teksten beholdt (FR-4), slik at feilen i annonsefeltet er den første ugyldige som får fokus.
- `[ASSUMPTION]` Passordet tømmes også etter mislykket innlogging (PRD-en sier det bare for opprett konto).
- `[ASSUMPTION]` CV-teksten og annonsen låses mens analysen pågår (skjerm 07) og etter analysen (FR-21), med synlig «Låst».
- `[ASSUMPTION]` Skjerm 13 viser mock-stripen slik briefen krever. I mock-modus må feilene da komme fra testscenarier som simulerer tidsavbrudd og ugyldig sitat.
- `[ASSUMPTION]` Leverandør i skjerm 14 er OpenAI med `gpt-5-mini` (PRD §8). Bekreftelsesknappen heter «Send og analyser», og bekreftelsen i skjerm 12 heter «Forkast og endre». Ingen av disse knappetekstene er fastsatt i PRD-en.
- `[ASSUMPTION]` Øktvarselet (FR-22, *bør*) er en modal dialog, fordi brukeren må reagere før data slettes.
- `[ASSUMPTION]` I steg 3 vises ikke de fulle kildepanelene. Briefen ber om at teksten og «Teksten bygger på» står side om side, og kildene er tilgjengelige som klikkbare utdrag.
- `[ASSUMPTION]` Søknadsbrevet og forslagene er skrevet for skissen. De bruker bare opplysninger fra CV-en, annonsen og svaret, og bevarer at Ida ikke har førerkort ennå.

## Avvik fra briefen

Ingen bevisste avvik. To tolkninger bør gruppa vite om: modusstripen ligger over bakteppet i dialogene (12, 14, 15A), og skjerm 07 har ingen fokusring (begrunnet under «Fokus»).

## Om hvordan skissene ble laget

SVG-ene er generert med et lite Node-skript i en midlertidig mappe. Skriptet har tekstbryting målt med fontmetrikk og felles komponenter for knapper, felt, meldinger og kildepaneler. Det er ikke lagt i repoet, fordi skissene er konseptmateriale. Alle filene er sjekket som velformet XML, og hver skjerm er sett gjennom i nettleser på 1440 px (desktop) og 390 px (mobil).
