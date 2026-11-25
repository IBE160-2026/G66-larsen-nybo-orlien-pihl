---
name: Supersøker
status: final
created: 2026-11-25
updated: 2026-11-25
sources:
  - ../../prds/prd-supersoker-2026-11-03/prd.md
  - ../../prds/prd-supersoker-2026-11-03/addendum.md
  - ../../briefs/brief-supersoker-2026-09-16/brief.md
  - ../../ux/samlet-forslag/README.md
  - ../../ux/samlet-forslag/forslag.html
  - ../../ux/helle/konsept-3/konsept.md
  - 'Arkitektur, utkast: PR #46 (branch arkitektur-supersoker-v1), ARCHITECTURE-SPINE.md'
  - 'Modellkontrakt, forslag: PR #47 (branch modellkontrakt-supersoker-v1)'
  - 'Epics, utkast: PR #45 (branch gh-26-epics-og-stories)'
---

# Supersøker – opplevelse og oppførsel

## Foundation

- **Plattform:** nettapp for datamaskin, fra 1024 px, testet ved 1024 og 1440 px (NFR-2, vedtak 15). Ingen mobil- eller nettbrettvisning.
- **Teknisk ramme** (arkitekturutkastet, AD-1): FastAPI med Jinja2/HTML, egen CSS og vanlig JavaScript, bare lokale ressurser. Ingen UI-bibliotek.
- **Språk:** norsk bokmål, `lang="nb"`.
- **Utseende:** [DESIGN.md](DESIGN.md). Referanser som `{colors.feil}` peker dit.
- **Forrang:** DESIGN.md og denne fila går foran skisser og mockups. PRD-en styrer kravene; er noe her i strid med den, er det en feil her.
- **Gyldighet:** gjelder som endelig når pull requesten er merget; gruppa gjennomgår den der. Forslag som ikke står i kildene, er listet under [Godkjente forslag](#godkjente-forslag).

## Information Architecture

| Flate | Nås fra | Formål | Krav |
|---|---|---|---|
| Logg inn | Oppstart, utlogging, øktutløp, beskyttet side uten innlogging | Logge inn; vei til registrering; viser at testbrukeren står i README | FR-2, FR-3 |
| Opprett konto | Lenke på Logg inn | Opprette konto med e-post og passord | FR-1 |
| Steg 1: CV og annonse | Innlogging, stegindikator | Legge inn CV og annonse, bekrefte stilling, starte analysen | FR-4–FR-9, FR-27, FR-28 |
| Steg 2: Gap-analyse | Vellykket analyse, stegindikator, tilbakeknapp i steg 3 | Se krav, svare, velge teksttype, lage tekst | FR-10–FR-15 |
| Steg 3: Teksten | Vellykket «Lag tekst», stegindikator | Lese grunnlaget, redigere og kopiere | FR-16–FR-21 |
| Dialog: Endre CV eller annonse | Knappen med samme navn | Bekrefte at analyse, svar og tekst forkastes | FR-21 |
| Dialog: Erstatt teksten | «Lag tekst» når egenredigert tekst vil bli erstattet | Hindre tap av egne endringer | FR-21 |
| Dialog: Leverandørvarsel | Første modellkall i økten, bare API-modus | Si hva som sendes og til hvem | FR-25 |

Stillingstittel og arbeidsgiver har ingen egen flate; feltene vises i steg 1. Alle dialoger ligger ett nivå over en side, aldri oppå hverandre.

Komposisjon: [steg 2 ved 1024 px](mockups/steg-2-1024.html). Innlogging, steg 1 og steg 3 bygger på [det samlede forslaget](../../ux/samlet-forslag/forslag.html) med rettelsene under [Avvik fra skissen](#avvik-fra-skissen). Opprett konto og dialogene er bare beskrevet i tekst.

### Fast sideramme

Fra toppen: `mock-stripe` (bare i mock-modus, på alle sider, også før innlogging) → `toppfelt` → `stegindikator` → `sideoverskrift` og innhold med sidekolonne → `handlingslinje`. Innlogging og registrering har ikke stegindikator, sidekolonne eller handlingslinje. «Logg ut» finnes på alle sider etter innlogging. I API-modus vises ingen stripe.

| Side | Overskrift | Sidekolonne | Handlingslinje: sekundær / primær |
|---|---|---|---|
| Logg inn | Søknaden din, *med dine ord.* | – | «Opprett konto» (lenke) / «Logg inn», i skjemakortet |
| Opprett konto | Lag en konto, *og kom i gang.* | – | «Logg inn» (lenke) / «Opprett konto», i skjemakortet |
| Steg 1 | Legg inn CV-en *og annonsen.* | «Før du analyserer», «Godt å vite» | «Last inn eksempel (testpar 1)» (bare mock) / «Analyser kravene →» |
| Steg 2 | Se hva du kan *bygge på.* | «Søknaden din», «Huskeliste» | «← Endre CV eller annonse» / «Lag tekst →» |
| Steg 3 | Nå gjør du teksten *til din.* | «Før du sender», «Teksten bygger på» | «← Endre svar eller tekstvalg» / «Kopier tekst» |

På steg 2 inneholder overskriften også stillingstittel og arbeidsgiver (FR-9, FR-12): overtittelen «Steg 2 av 3 · Sommervikar i hjemmetjenesten · Testvik kommune» er en del av samme `h1`.

## Voice and Tone

En rolig hjelper som er ærlig uten å skryte. Merkevaren står i [DESIGN.md → Brand & Style](DESIGN.md#brand--style).

| Gjør | Ikke gjør |
|---|---|
| «Står ikke i CV-en din. Det betyr ikke at du mangler det.» | «Du mangler førerkort.» |
| «3 av 4 kompetansekrav er dokumentert i CV-en.» med «Dette er en oversikt over dokumentasjon, ikke en vurdering av deg.» | «75 % match!» |
| «Skriv bare det som stemmer – vi bruker ordene dine slik de står, bare i denne søknaden.» | «Styrk søknaden ved å utdype erfaringen din.» |
| Si hva som er galt og hva brukeren kan gjøre | «Noe gikk galt.» |
| «du», korte setninger, ingen utropstegn eller emoji | Hype, gratulasjoner eller løfter om intervju |

Begrepene i PRD §3 brukes likt: «Dokumentert», «Mangler dokumentasjon», «Teksten bygger på» og «Lag tekst». Ansettelsesvilkår (PRD) har seksjonsoverskriften «Vilkår fra annonsen» (skissen).

### Meldinger

Meldinger merket **PRD** er hentet ordrett fra PRD-en og endres bare der. Meldinger merket **skisse** kommer fra det samlede forslaget. Meldinger merket **ny** er foreslått i denne spesifikasjonen. `<fil>` er filnavnet.

| Situasjon | Tekst | Kilde |
|---|---|---|
| Mock-stripe | Mock-modus er på – ingen tekst sendes til en språkmodell. | skisse |
| Feil innlogging | **Feil e-post eller passord.** Sjekk skrivemåten og prøv igjen. | skisse |
| E-post med feil format | E-postadressen har feil format. Skriv den slik: navn@eksempel.no. | ny |
| E-post i bruk | Det finnes allerede en konto med denne e-postadressen. Logg inn, eller bruk en annen adresse. | ny |
| For kort passord | Passordet må ha minst 8 tegn. Skriv et lengre passord. | ny |
| Utløpt økt | Du ble logget ut etter 30 minutter uten aktivitet. CV, annonse, svar og tekst er slettet. | ny |
| Feil filformat | «<fil>» kan ikke leses – Velg en TXT- eller PDF-fil, eller lim inn teksten. | PRD |
| Uleselig fil | Vi kunne ikke lese filen <fil>. Prøv en TXT-fil eller tekstbasert PDF, eller lim inn teksten. | PRD |
| Skannet PDF | «<fil>» ser ut til å være skannet som bilde, så vi finner ingen tekst. Lim inn CV-teksten i stedet. | ny |
| For stor fil | «<fil>» er større enn 2 MB. Velg en mindre fil, eller lim inn teksten. | ny |
| Påminnelse etter PDF | Sjekk at kolonner og overskrifter fra «<fil>» har kommet i riktig rekkefølge. | ny |
| Tomt CV-felt | CV-feltet er tomt. Lim inn CV-teksten eller last opp en fil. | ny |
| Tomt annonsefelt | Annonsefeltet er tomt. Lim inn teksten fra stillingsannonsen. | ny |
| Tom tittel / arbeidsgiver | Fyll inn stillingstittelen. Vi gjetter den ikke. / Fyll inn arbeidsgiveren. Vi gjetter den ikke. | ny |
| For lang tekst | CV-teksten er over 10 000 tegn. Kort den ned. (Tilsvarende for annonsen og, med 1 000 tegn, for svar.) | ny |
| Eksempel lastet inn | Eksempelet er lagt inn. Du kan trykke «Analyser kravene». | ny |
| Egen tekst i mock | **Teksten din er ikke analysert.** Dette er et fast eksempel med fiktivt innhold. | ny |
| Analyse pågår / tekst pågår | Analyserer … / Lager tekst … | PRD |
| Tidsavbrudd, midlertidig feil | Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen. | PRD |
| Ugyldig analyse | Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt. | PRD |
| Ugyldig tekstsvar | Teksten kunne ikke brukes. Svarene dine er beholdt. Du kan prøve igjen. | ny |
| Manglende nøkkel eller ugyldig oppsett | Språkmodellen er ikke satt opp riktig. Den som kjører appen, må rette API-nøkkelen eller konfigurasjonen. Inndataene dine er beholdt. | ny |
| Kostnadsgrense nådd | Kostnadsgrensen er nådd. Den som kjører appen, må åpne for nye kall. Inndataene dine er beholdt. | ny |
| Ingen krav | Vi fant ingen tydelige krav i annonsen. Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt. | PRD |
| Bare vilkår | Vi fant ingen tydelige kompetansekrav i annonsen. | PRD |
| Alt dokumentert | Alle kompetansekrav i annonsen er dokumentert i CV-en. | PRD |
| Uendret ny analyse | Endre CV-en eller annonsen før du analyserer på nytt. | ny |
| Eldre tekst | Teksten ble laget før du endret svar eller tekstvalg. Gå til steg 2 og trykk «Lag tekst» for å oppdatere den. | ny |
| Kopiert | Kopiert. Lim inn teksten der du skriver søknaden. | PRD |
| Kopiering sperret | Nettleseren tillot ikke kopiering. Teksten er markert – trykk Ctrl+C. | ny |
| Under teksten | Teksten tas vare på mens du er innlogget, og slettes når du logger ut. | ny (innhold fra FR-20) |
| Over kildelisten | Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk. | PRD |
| Brukerens svar i kildelisten | Oppgitt av deg. Supersøker har ikke kontrollert det. | skisse |
| Veiledning utenfor teksten | Veiledning – ikke del av søknaden | PRD |
| Godt å vite (steg 1) | CV-en og annonsen brukes bare i denne økten og slettes når du logger ut. | skisse |

### Faste tekster på sidene

Fra det samlede forslaget, med mindre noe annet står.

| Side | Ingress | Annet |
|---|---|---|
| Logg inn | Supersøker viser hva CV-en din dokumenterer, og hjelper deg med en tekst som bare bygger på det som stemmer. | Under ingressen en nummerert liste: «Legg inn CV og annonse», «Se hvilke krav CV-en dokumenterer», «Få en tekst du kan redigere». I skjemakortet: «Testbruker står i README.» |
| Steg 1 | Lim inn teksten eller last opp en fil. Vi finner kravene i annonsen og ser etter dem i CV-en. | CV-feltet: «Lim inn hele CV-en.» Annonsefeltet: «Kopier teksten fra annonsen, også stillingstittel, arbeidsgiver og kravene.» (rettet etter FR-7) |
| Steg 2 | At noe ikke står i CV-en, betyr ikke at du mangler det. | `vilkar-boks`: «Arbeidsgiveren ber om dette ved ansettelse. Det er ikke med i opptellingen, og teksten påstår ikke at du har det.» |
| Steg 3 | Les gjennom, juster og kopier når du er fornøyd. Du kjenner erfaringen din best. | – |

### Dialoger

| Dialog | Innhold | Trygt valg / handling |
|---|---|---|
| Endre CV eller annonse | Svarene, gap-analysen og teksten, også det du har redigert, forkastes. | «Avbryt» / «Forkast og endre» |
| Erstatt teksten | Du har redigert teksten. Lager du ny, erstattes endringene dine. | «Behold teksten» / «Lag ny tekst» |
| Leverandørvarsel | CV-teksten, annonsen og svarene dine sendes til OpenAI, en ekstern leverandør. | «Avbryt» / «Send og analyser» |

Knappetekster og forklaringer er godkjent av Helle 2026-11-25.

## Component Patterns

Oppførsel. Utseendet står i [DESIGN.md → Components](DESIGN.md#components).

| Komponent | Oppførsel |
|---|---|
| `mock-stripe` | Kommer fra serverkonfigurasjonen og kan ikke lukkes (FR-26). |
| `toppfelt` | Logoen er ikke en lenke som mister arbeid. «Logg ut» logger ut med en gang, uten bekreftelse, og sletter midlertidige data. |
| `stegindikator` | Fullførte steg er lenker (valgt 4.2). Et steg er fullført når innholdet finnes: steg 2 etter analyse, steg 3 etter første tekst. Navigasjon starter aldri modellkall og overskriver ingenting. Venter lagring på kvittering, skjer stegbyttet etterpå. |
| `sideoverskrift` | Sidens `h1`. Får fokus ved stegbytte. |
| `knapp-primar` | Én per visning. Er aktiv også når felt er tomme, så valideringen kan forklare hva som mangler. |
| `knapp-sekundar` | Tilbake- og sidehandlinger. Kaster aldri data uten dialog. |
| `knapp-deaktivert` | Bare mens et kall pågår. Teksten byttes til «Analyserer …» eller «Lager tekst …», og dobbeltklikk starter ikke nye kall (FR-30). |
| `lenke` | Brukes til navigasjon, aldri til å sende data. |
| `handlingslinje` | Blir liggende nederst i vinduet. Den må aldri dekke fokusert innhold. |
| `tekstfelt` | Mer tekst enn grensen kan skrives eller limes inn; feltet kutter aldri teksten stille. Grensen meldes som feil. Innholdet beholdes ved alle feil, unntatt passord. |
| `tekstfelt-ugyldig` | Merkes med `aria-invalid`, og feilteksten kobles til feltet. Merkingen fjernes når feltet er gyldig ved neste kontroll. |
| `fokusring` | Alltid synlig ved fokus. Fjernes aldri. |
| `veksler` | «Lim inn tekst» / «Last opp fil» for CV-en. Etter vellykket opplasting går den tilbake til tekstfeltet med innlest, redigerbar tekst (FR-5). Bytte sletter aldri tekst. |
| `inndata-kort` | Annonsen kan bare limes inn og har hjelpetekst om å ta med stillingstittel og arbeidsgiver (FR-7). |
| `melding-feil` | Står ved feilstedet. Skjemafeil øverst i skjemaet, filfeil i CV-kortet, modellfeil rett over handlingslinjen. «Prøv igjen» finnes bare ved tidsavbrudd, midlertidig feil og ugyldig modellsvar, og starter høyst ett nytt kall. |
| `feltfeil` | Under feltet den gjelder. Forsvinner sammen med ugyldig-merkingen. |
| `melding-info` | Nøytral beskjed uten handling som kreves. |
| `melding-bekreftelse` | Vises ved knappen som utløste den, og blir stående til neste endring eller sidebytte. |
| `mangler-kort` | Ett per manglende krav, før de dokumenterte (FR-12). Viser kravet, forklaringen og `svarfelt`. Kortet beholder status når det er svart (FR-13). |
| `svarfelt` | Valgfritt, med etiketten «Ditt svar om <krav>». Teller «n / 1 000 tegn». «Svar lagt til» vises når feltet har annet enn blanktegn. |
| `dok-flis` | Ikke klikkbar. Vises bare med sitat (FR-11). |
| `bevis-klistremerke` | Viser hele sitatet, ordrett, uten forkorting eller «…». Ikke klikkbar. |
| `vilkar-boks` | Uten status og svarfelt, og utenfor opptellingen. Teksten sier at søknaden ikke påstår at vilkåret er oppfylt. Vises ikke uten vilkår. |
| `valgkort` | En radiogruppe med ledeteksten «Hva slags tekst vil du ha?». «Helt søknadsutkast» er forhåndsvalgt (FR-15). |
| `sideboks` | Følger siden ved rulling, uten egen rulling og uten å ligge fast. |
| `huskeliste` | Hakes bare av automatisk for ting appen vet (valgt 4.3), og er ikke klikkbar. Steg 1: «CV lagt inn», «Annonse lagt inn». Steg 2: ett punkt per kompetansekrav; manglende krav holdes åpent også med «svar lagt til». Steg 3: «Les gjennom teksten» og «Sjekk at alt stemmer med deg» er råd uten sirkler; «Kopier teksten» hakes av etter kopiering og åpnes igjen hvis teksten endres. |
| `brev-ark` | Ett redigerbart tekstfelt med ren tekst, merket «Søknadsbrev» eller «Forslag til formuleringer». Forslagene har ett punkt per linje, med «- » foran (modellkontrakten). |
| `kildeliste` | Settes sammen av serveren (AD-5): stilling og arbeidsgiver, hvert CV-sitat, hvert svar merket som oppgitt av brukeren, og for hvert manglende krav om det er svart på eller ikke nevnt i teksten (FR-19). Den hevder ikke at et svar er brukt. |
| `lagringsstatus` | Under brev-arket og svarfeltene: «Lagrer …» og deretter «Lagret i økten». Ved feil: «Endringen er ikke lagret ennå. Vent litt før du går videre eller laster siden på nytt.» |
| `dialog` | Fokus går til det trygge valget. Escape gjør det samme som det trygge valget. Fokus går tilbake til knappen som åpnet dialogen. Resten av siden, også «Logg ut», kan ikke brukes mens den er åpen. |

## State Patterns

### Logg inn og Opprett konto

| Tilstand | Oppførsel |
|---|---|
| Tom | Tomme felt. Hjelpetekst om at testbrukeren står i README. |
| Feil innlogging | Samme melding for ukjent e-post og feil passord (FR-2). E-post beholdes, passord tømmes. |
| Ugyldig registrering | `feltfeil` ved hvert felt. E-post beholdes, passord tømmes (FR-1). |
| Etter utlogging | Innloggingssiden uten data fra forrige økt. |
| Etter øktutløp | `melding-info` om utløpt økt. Visningen tømmes før noe annet vises (AD-2). |

### Steg 1: CV og annonse

| Tilstand | Oppførsel |
|---|---|
| Tom | Begge felt tomme, åpne punkter i huskelisten. |
| Fil lest inn | Teksten i redigerbart CV-felt. PDF gir påminnelsen om rekkefølge (FR-5). |
| Filfeil | `melding-feil` i CV-kortet navngir fila. Tidligere gyldig CV-tekst beholdes (FR-4, FR-6). |
| Eksempel lastet inn | Begge felt fylt, `melding-info` (FR-27). |
| Tomt eller for langt felt | `feltfeil`; ingen analyse (FR-8). |
| Stilling til bekreftelse | Se under. |
| Analyserer | Primærknappen deaktivert, innholdet synlig. Ingen delresultater. |
| Modellfeil | `melding-feil` med eller uten «Prøv igjen». Alt innhold beholdes (FR-30). |
| Låst etter analyse | CV, annonse, tittel og arbeidsgiver er skrivebeskyttet, ikke deaktivert, så de kan leses. `melding-info` forklarer det. Linjen viser «Endre CV eller annonse» og «Til gap-analysen →». |
| Ulåst etter «Forkast og endre» | Analyse, svar og tekst er borte; CV og annonse kan redigeres. Uten endring gir «Analyser kravene» meldingen om uendret analyse, og intet kall (FR-21). |

**Stillingstittel og arbeidsgiver (FR-9, valgt 4.1):**
1. Første «Analyser kravene» kontrollerer CV og annonse. Er de gyldige, vises delen «Stilling og arbeidsgiver» **under annonsen** på samme side. Ingen modell kalles.
2. Delen vises **alltid**, også når begge verdiene er funnet, slik at de kan rettes. Funne verdier er forhåndsutfylt. Et felt uten entydig funn er tomt og forklarer hvorfor opplysningen trengs.
3. Fokus flyttes til det første tomme feltet, eller til tittelfeltet hvis begge er fylt ut.
4. Neste «Analyser kravene» krever begge feltene og starter analysen.

Endres annonsen før analysen, leses tittel og arbeidsgiver på nytt.

### Steg 2: Gap-analyse

Rekkefølge: opptelling → «Står ikke i CV-en» → «Dokumentert i CV-en» → «Vilkår fra annonsen» → valg av teksttype. En tom seksjon vises ikke.

| Tilstand | Oppførsel |
|---|---|
| Normal | Manglende krav først, hvert med valgfritt svar. |
| Alt dokumentert (minst ett krav) | PRD-meldingen i stedet for opptellingen. Ingen svarfelt (FR-14). |
| Ingen krav eller vilkår | PRD-meldingen. Ingen opptelling eller huskeliste. Retting og begge teksttyper er mulig (FR-10). |
| Bare vilkår | PRD-meldingen og `vilkar-boks`. Ellers som over. |
| Mange krav | Kort stables, fliser fyller flere rader. Ingenting skjules eller slås sammen. |
| Fast eksempel i mock | `melding-info` øverst om at egen tekst ikke er analysert (FR-28). Samme merking på steg 3 og i kildelisten (AD-5). |
| Svar over grensen | `feltfeil` ved svaret; ingen tekst lages. |
| Lager tekst | Primærknappen deaktivert med «Lager tekst …». |
| Modellfeil | Som i steg 1. Svar og valg beholdes. |
| «Lag tekst» uten endring | Når en tekst finnes og svar og teksttype er uendret, går knappen til den teksten uten nytt kall (FR-21, AD-4). |

### Steg 3: Teksten

| Tilstand | Oppførsel |
|---|---|
| Helt søknadsutkast | Brev i `brev-ark`, signert med navnet fra CV-en eller «[ditt navn]». |
| Forslag til formuleringer | Punktliste som ren tekst i samme ark. |
| Med veiledning | Egen `melding-info` utenfor arket, merket «Veiledning – ikke del av søknaden». Følger ikke med kopien (FR-17). |
| Redigert | Teksten merkes internt som egenredigert; lagringsstatus vises. |
| Kopiert | `melding-bekreftelse` ved teksten. Bare innholdet i arket kopieres. |
| Kopiering sperret | Teksten markeres, og Ctrl+C-meldingen vises. |
| Eldre tekst | Er svar eller teksttype endret etter at teksten ble laget, vises `melding-info` om det. |
| Ny tekst mislyktes | Den gamle teksten, også egne endringer, beholdes (AD-4). |
| Sideoppdatering | Egenredigert tekst og alle data i økten vises igjen, uten modellkall (FR-22). |

### Alle sider etter innlogging

| Tilstand | Oppførsel |
|---|---|
| Ikke innlogget | Videre til Logg inn (FR-2). |
| Utløpt økt | Oppdages ved neste forespørsel eller gjenoppretting av siden. Videre til Logg inn med melding. Data er slettet på serveren, og et sent modellsvar gjenoppretter dem ikke (FR-23). Gamle data vises aldri. |
| Direkte forespørsel til andres data | Serveren viser bare innloggede brukers egne data (FR-24). Grensesnittet har ingen flate som kan peke til en annen brukers data. |
| API-modus | Slås på i konfigurasjonen, ikke i grensesnittet (FR-29). Grensene for fil, CV, annonse og svar kontrolleres før kallet og meldes som `feltfeil`. Appen bytter aldri stilltiende til mock. |
| Leverandørvarsel (API) | Vises før første kall i økten. «Avbryt» sender ingenting og endrer ingenting; varselet kommer igjen ved neste forsøk. Etter bekreftelse vises det ikke mer i økten. |
| Ingen kontakt med serveren | Lagringsstatus eller modellfeilen sier at endringen ikke er mottatt. Teksten blir stående i feltet. |

Varselet 25 minutter før utløp (FR-22, *bør*) er utsatt etter arkitekturutkastet (AD-7) og tegnes ikke i v1. Utløpet etter 30 minutter gjelder uansett.

## Interaction Primitives

- Alt gjøres med vanlige lenker, knapper, felt og radioknapper. Ingen egne hurtigtaster, dra og slipp eller handlinger som krever hover.
- **Tab** følger leserekkefølgen: toppfelt → stegindikator → innhold → sidekolonne → handlingslinje. Sidekolonnen har ingen kontroller.
- **Enter** sender skjemaet fra enlinjefelt og aktiverer knapper og lenker. I flerlinjefelt gir Enter linjeskift og sender aldri.
- **Piltaster** bytter valg i radiogruppen og vekslerne. **Escape** lukker en dialog med det trygge valget.
- Modellkall skjer bare etter et uttrykkelig trykk på «Analyser kravene», «Lag tekst», «Prøv igjen» eller bekreftelsen i en dialog. Aldri ved navigasjon, omlasting eller skriving.
- Ingen animasjoner bærer informasjon. Ventetid vises med tekst.

## Accessibility Floor

Atferd (NFR-1, NFR-3). Kontrast står i [DESIGN.md → Colors](DESIGN.md#colors).

**Fokus**
- Synlig `fokusring` på alle kontroller.
- Ved stegbytte flyttes fokus til `h1` (`tabindex="-1"`). Hver side har egen `<title>` med stegets navn.
- Ved feil flyttes fokus til første ugyldige felt. Et ugyldig felt med fokus viser både feilkant og fokusring. Feil uten tilhørende felt (innlogging, fil, modell) får fokus på selve meldingen.
- Handlingslinjen får tilsvarende `scroll-padding-bottom`, så fokus aldri havner bak den.
- Første fokuserbare element er lenken «Hopp til innhold».

**Struktur og navn**
- Én `h1` per side; seksjoner er `h2`, kravtitler `h3`.
- Stegindikatoren er en nummerert liste i `nav` med `aria-current="step"` på aktivt steg.
- Hvert felt har synlig `label`; hjelpetekst og feil kobles med `aria-describedby`.
- Radiogruppen er `fieldset` med synlig `legend`. Veksleren er også en radiogruppe.
- Symboler (`✓`, `?`, `!`) er skjult for skjermleser når ordet står ved siden av. Merker i huskelisten har teksten «Dokumentert», «Mangler dokumentasjon» eller «Gjort».

**Opplesing**
- Feil bruker `role="alert"`. Status og bekreftelser («Analyserer …», «Kopiert», eksempel lastet inn) bruker `role="status"`.
- Tegntelleren leses ikke opp for hvert tegn, bare når 90 % av grensen nås og når den passeres.
- Lagringsstatus leses ikke opp ved vellykket lagring, bare ved feil.

**Kjent begrensning:** Fordi minstebredden er 1024 px (vedtak 15), må brukere med sterk zoom rulle sidelengs. Det oppfyller ikke WCAG 2.1 kriterium 1.4.10 (reflow). NFR-1 krever AA for kontrast; spesifikasjonen hevder ikke at hele appen oppfyller AA.

**Ikke kontrollert:** Ingenting er testet med tastatur, skjermleser eller brukere, fordi det bare finnes statiske skisser. Kontrolleres i T-7 og i #37.

## Responsive & Platform

Oppsett og knekkpunkt (1200 px) står i [DESIGN.md → Layout & Spacing](DESIGN.md#layout--spacing). Valgt 2026-11-25.

- Samme DOM-rekkefølge ved alle bredder, så tastatur og skjermleser følger det man ser.
- Handlingslinjen bruker `position: sticky` i beholderen med minstebredde, ikke `fixed`. Da kan knappene rulles fram under 1024 px i stedet for å bli klippet bort.
- Testes ved 1024 og 1440 px, med lange kravtitler, lange sitater og lange filnavn.

## Inspiration & Anti-patterns

**Hentet fra** (hva fra hvem står i [det samlede forslaget](../../ux/samlet-forslag/README.md)): Editorial (papir, serif, brevark, nummererte steg), Kort og mot (mangler-kort, «Fortell oss kort», bevis, handlingslinje) og Bento (fliser, huskeliste). Skjermer som ikke var tegnet i forslaget, bygger på [Helles konsept 3](../../ux/helle/konsept-3/konsept.md), med nye farger og uten mobil.

**Forkastet:**

| Forkastet | Hvorfor |
|---|---|
| Chat, snakkebobler, modell som spør i flere runder | Ikke-mål (PRD §6) |
| Poengsum, prosent, måler, prikker, «3/4» | Leses som karakter (SM-C1) |
| Lilla og grønt | Avvist av gruppa 2026-11-23 |
| Terrakotta knapper sammen med rød feil | Kan forveksles (valgt 2026-11-25) |
| Bred venstrekant på feilmeldinger | Markert av designsjekken som typisk KI-design (valgt 2026-11-25) |
| Rotert klistremerke | Vanskeligere å lese og mindre troverdig (valgt 2026-11-25) |
| Sidekolonne over innholdet ved 1024 px | Skyver overskriften ned og krever endret rekkefølge |

## Key Flows

### UJ-1. Thea tilpasser en søknad til en stilling hun har funnet

Thea er student og har funnet en stilling hun vil søke på. CV-en oppdaterte hun for noen uker siden. Hun er ikke innlogget. Skjermeksemplene bruker testpar 1, der navnet i CV-en er Ida Testesen.

1. Thea oppretter en konto, logger inn og kommer til steg 1.
2. Hun laster opp CV-en som PDF. Teksten vises i et redigerbart felt med påminnelsen om rekkefølge. Den stemmer.
3. Hun limer inn annonsen og trykker «Analyser kravene».
4. «Stilling og arbeidsgiver» vises under annonsen, og fokus flyttes dit. Hun kontrollerer feltene og trykker «Analyser kravene» igjen.
5. «Analyserer …» vises, og knappen er deaktivert.
6. I steg 2 står kravet CV-en ikke dokumenterer, først. Hun skriver kort om erfaring som ligner. Huskelisten viser «svar lagt til», men punktet er fortsatt åpent.
7. Hun velger «Forslag til formuleringer» og trykker «Lag tekst».
8. **Høydepunkt:** I steg 3 får Thea forslag som også tar med kravet som manglet, med hennes egne ord og forbehold. Ved siden av ser hun nøyaktig hva teksten bygger på, med svaret merket «Oppgitt av deg. Supersøker har ikke kontrollert det.» Hun ser at ingenting er funnet på.
9. Hun justerer teksten og trykker «Kopier tekst». Bekreftelsen vises ved teksten, og hun vet at alt slettes når hun logger ut.

| Avstikker | Hva som skjer |
|---|---|
| Hun svarer ikke på kravet | Kravet utelates fra teksten. Kildelisten sier at det ikke er nevnt. |
| Hun vil endre CV-en | Stegindikatoren → låst steg 1 → «Endre CV eller annonse» → dialog. «Avbryt» endrer ingenting. |
| Hun har redigert teksten og lager ny etter endret svar | «Erstatt teksten»-dialogen. «Behold teksten» lar henne bli på steg 2 uten endringer. |
| Feil fil, tomt felt eller ikke svar fra modellen | Melding ved feilstedet; det hun har skrevet, beholdes. |
| Økten utløper | Innloggingssiden med forklaring om at data er slettet. |
| Appen kjører i API-modus | Leverandørvarselet må bekreftes før første kall. |

## Avvik fra skissen

Det [samlede forslaget](../../ux/samlet-forslag/forslag.html) endres slik. Rettelsene mot kravene ble funnet da skissen ble kontrollert mot PRD-en 2026-11-25.

| Skissen | Spesifikasjonen | Grunn |
|---|---|---|
| Navnet «Ida Testesen» i toppfeltet | E-postadressen | Kontoen lagrer ikke navn (FR-1) |
| Steg 2-overskriften mangler stilling og arbeidsgiver | Tatt inn i `h1` | FR-9, FR-12 |
| Kildelisten mangler merketeksten og status for manglende krav | Tatt inn | FR-19 |
| «Teksten slettes når du logger ut. Kopier den før du går.» | Sier også at teksten tas vare på mens man er innlogget | FR-20 |
| Teksten har ingen etikett | «Søknadsbrev» / «Forslag til formuleringer» | Briefen: resultatene skal være tydelig merket |
| Hjelpeteksten ved annonsen nevner bare kravene | Nevner også stillingstittel og arbeidsgiver | FR-7 |
| Sirkler på alle punkter i «Før du sender» | Råd uten sirkler | Valg 4.3 |
| Terrakotta knapper, `#B3261E`, serif flere steder, rotert klistremerke | Se DESIGN.md | Valg 1–3 |

## Godkjente forslag

Forslag fra Claude som ikke står i kildene. Helle godkjente dem uten endringer 2026-11-25.

| Nr | Forslag |
|---|---|
| A1 | Sekundærknapper har blekk i kant og tekst. Aktivt steg, «Du er her» og «Valgt» er fortsatt terrakotta. |
| A2 | Toppfeltet viser e-postadressen. |
| A3 | Nøytrale beskjeder, også «Godt å vite», er ikke gule. |
| A4 | Steg 2: stilling og arbeidsgiver står i overtittelen, som del av `h1`. |
| A5 | Låst steg 1 er skrivebeskyttet med «Til gap-analysen →». Tittel og arbeidsgiver leses på nytt hvis annonsen endres før analyse. |
| A6 | Dialoger: fokus på trygt valg, Escape velger det, og «Logg ut» er utilgjengelig mens dialogen er åpen. |
| A7 | «Logg ut» har ingen bekreftelse, selv om data slettes. |
| A8 | Passordet tømmes også etter feil innlogging. |
| A9 | Nye tekster: meldingene merket «ny», dialogforklaringene, overskriften på Opprett konto og «Stilling og arbeidsgiver». |
| A10 | Steg 3 sier fra når teksten er eldre enn svarene eller tekstvalget. |
| A11 | Synlig lagringsstatus under redigerbare felt. |
| A12 | Ingen stripe i API-modus; leverandørvarselet informerer. |
| A13 | Modellfeil står rett over handlingslinjen. Feil uten felt får fokus på meldingen. |
| A14 | «Hopp til innhold», sparsom opplesing av tegntelleren og sidekolonne som ikke ligger fast. |
| A15 | Haken «Kopier teksten» fjernes hvis teksten endres etter kopiering. |
| A16 | Etikett over teksten: «Søknadsbrev» eller «Forslag til formuleringer». |

Etter godkjenningen er hjelpeteksten ved annonsefeltet rettet etter FR-7 (se [Avvik fra skissen](#avvik-fra-skissen)).

## Åpne punkter

- Arkitekturutkastet (PR #46) har ikke bekreftet at siste redigering overlever en umiddelbar sideoppdatering mens lagringen pågår (FR-22, T-10).
- Arkitekturen, modellkontrakten og epics ligger i umergede PR-er. Endres de, må denne fila kontrolleres på nytt.
- Epics (PR #45) må oppdateres: UX-DR1–UX-DR3, UX-DR12 og UX-DR16–UX-DR19 beskriver det gamle forslaget.
- Valget av serif er ikke brukertestet.
