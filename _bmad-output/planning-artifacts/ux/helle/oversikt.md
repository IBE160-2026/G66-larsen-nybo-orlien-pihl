# Helles designkonsepter for Supersøker – oversikt

**Dato:** 2026-11-15 · **Laget av:** Helle med Claude Code (`bmad-ux` + `impeccable`, tre subagenter i parallell) · **Status:** konseptskisser til gruppevurdering, ikke vedtatt design

Dette er tre av gruppens ni konsepter. De dekker de samme 17 skjermene med det samme innholdet (testpar 1) og like filnavn, så de kan sammenlignes skjerm for skjerm. Skjermlisten, de faste reglene fra PRD-en og innholdet står i [felles-brief.md](felles-brief.md), som alle tre subagentene fikk likt.

**Se konseptene:** åpne [oversikt.html](oversikt.html) i nettleseren for alle skjermene side om side, eller galleriet i hvert konsept: [konsept 1](konsept-1/index.html) · [konsept 2](konsept-2/index.html) · [konsept 3](konsept-3/index.html).

| | Konsept 1 – Rolig veiviser | Konsept 2 – Arbeidsbenk med bevis | Konsept 3 – Kort og mot |
|---|---|---|---|
| **Kjerneidé** | Én ting om gangen | Hver påstand har synlig kilde | Mestring med store kort |
| **Layout desktop** | Én kolonne, 720 px, sentrert | Tre kolonner: CV · krav · annonse | Sentrert kortrutenett, fast handlingslinje |
| **Uttrykk** | Varmt papir, dempet blå `#34557A`, humanistisk sans | Grå/hvit, blekkblå `#1C3D8F`, grotesk + monospace for sitater | Aubergine og lime på krem, tung display-type, runde former |
| **Sitater** | Uthevet tekst under kravet | Gul markeringstusj i CV-panelet med linjenummer og K-nummer | Skjevt «bevis-klistremerke» på kortet |
| **Best for** | Nervøs førstegangssøker | Tillit, etterprøvbarhet, testing mot fasit | Mobilbruker som trenger motivasjon |
| **Gap-analysen (desktop)** | ca. 2 230 px høy | ca. 1 510 px høy | ca. 2 060 px høy |
| **Største risiko** | Lange sider, «Lag tekst» langt nede | For tett og teknisk for noen | For lekent, høyt visuelt volum |

## Konsept 1 – Rolig veiviser

**Retning:** En rolig enkolonnes veiviser med smal lesebredde, stor stegindikator med «Du er her» og én primærhandling nederst på hvert steg. Hvert steg slutter med en «Neste-linje», en setning om hva som skjer når brukeren trykker. Manglende krav vises først i en ravfarget «gjør dette nå»-blokk med svarfeltet rett under. «Teksten bygger på» er en smal sidekolonne bare på steg 3.

**Styrker**
- Lavest kognitiv belastning: én lesevei, og visuell rekkefølge = DOM-rekkefølge, som er bra for tastatur og skjermleser (NFR-1).
- Ærligheten er tydelig formulert: svarfeltet sier at «teksten påstår aldri mer enn du skriver».
- Billigst å bygge med standardkomponenter. Mobilversjonen er nesten lik desktop (NFR-2).

**Svakheter**
- Lange sider: gap-analysen er over 2 200 px høy, og «Lag tekst» ligger langt nede.
- Mye luft og forklaring kan føles tregt for gruppa og sensor, som kjører flyten mange ganger.
- Varmt papir med én blå aksent er et trygt og kjent uttrykk. Impeccable flagget kremfargen som et KI-standardvalg (se under).
- Ravfargen på manglende krav kan leses som en advarsel; bør testes med brukere.

Detaljer, tokens og kontrastforhold: [konsept-1/konsept.md](konsept-1/konsept.md).

## Konsept 2 – Arbeidsbenk med bevis

**Retning:** Åpenheten gjøres synlig. CV-teksten og annonsen står som kildepaneler på hver side av kravtabellen på steg 1 og 2. Hvert krav har et nummer (K1–K4, V1 for vilkår). Nummeret står igjen i annonsen og som gul markeringstusj på en nummerert linje i CV-teksten, og valgt rad kobles til sitatet med en linje. Uttrykket er kjølig og presist, som et godt fagverktøy.

**Styrker**
- Svarer mest direkte på PRD-ens viktigste løfte og verste feil (FR-11): brukeren *ser* hvor hvert dokumentert krav står i CV-en.
- Fast oppsett: CV og annonse forsvinner aldri, og handlingene står alltid i midtkolonnen.
- Linjenumre og sitater gjør det lett å sjekke analysen mot fasiten (T-2). Kortest side av de tre.

**Svakheter**
- Tett og teknisk på desktop; noen studenter kan oppleve det som mye.
- Tre kolonner krever ca. 1280 px. Bredder mellom 900 og 1280 px er ikke tegnet.
- En utheving kan oppfattes som bevis for relevans, selv om FR-11 sier at et ordrett sitat ikke er nok alene.
- Koblingslinja er bare visuell. Det tilgjengelige alternativet er lenken «Vis i CV-en», som flytter fokus.
- Arkitekturen må lagre sitatets posisjon i CV-teksten, ikke bare selve teksten.

Detaljer: [konsept-2/konsept.md](konsept-2/konsept.md).

## Konsept 3 – Kort og mot

**Retning:** Mobil først og oppmuntrende. Hvert krav er et stort kort. Manglende krav har et gult bånd og en «Fortell oss kort»-flate, og dokumenterte krav har sitatet som et limegrønt bevis-klistremerke. Primærknappen står i en fast handlingslinje nederst, og en fremdriftsstripe viser de tre stegene. Tonen er en vennlig coach, men det er kort og skjema, ikke chat (ikke-mål i PRD §6).

**Styrker**
- Null tvil om neste steg: én stor primærknapp på fast plass og store trykkflater, sterkest på mobil.
- Ærligheten er forklart uten juridisk tone: «Står ikke i CV-en din. Det betyr ikke at du mangler det.» og «Oppgitt av deg» i «Teksten bygger på».
- Motiverende uten poengsum, og gult (ikke rødt) for «mangler». Det meste av teksten har kontrast over 7:1.

**Svakheter**
- Høyt visuelt volum med mange krav; en kompakt kortvariant er ikke tegnet.
- Lengst side på mobil (ca. 2 900 px på 390 px).
- Det lekne (skjeve klistremerker) kan svekke tilliten eller se ut som pynt for sensor.
- Den faste handlingslinjen kan skjule fokusert innhold uten `scroll-padding-bottom`.
- Samme kremfarge-funn fra impeccable som konsept 1.

Detaljer: [konsept-3/konsept.md](konsept-3/konsept.md).

## Antagelser

Ingen spørsmål ble stilt underveis, etter avtale. Disse antagelsene er felles for alle tre konseptene:

- `[ASSUMPTION]` Testpar 1 har ingen ansettelsesvilkår. «Politiattest» er brukt som illustrasjon for å vise komponenten.
- `[ASSUMPTION]` Leverandøren i varselet før API-kall (skjerm 14) er OpenAI med `gpt-5-mini`, fordi PRD §8 nevner den modellen.
- `[ASSUMPTION]` Skjerm 06 (arbeidsgiver mangler) og 09 variant B (ingen tydelige krav) bruker oppdiktede annonsevarianter, fordi testpar 1 har både arbeidsgiver og tydelige krav.
- `[ASSUMPTION]` Feilskjermene (13) viser mock-stripen. I mock-modus kommer feilene fra testscenarier som simulerer tidsavbrudd og ugyldig sitat; i API-modus byttes stripen ut.
- `[ASSUMPTION]` Øktvarselet ved 25 minutter (*bør* i FR-22) er en dialog, fordi brukeren må handle før data slettes.
- `[ASSUMPTION]` Desktop tegnes i 1440 px og mobil i 390 px. Mellomstore bredder er ikke tegnet i noe konsept, men NFR-2 sier at UX-arbeidet skal fastsette hvilke bredder som testes.
- `[ASSUMPTION]` Søknadsutkastet og forslagene er skrevet for skissene. De er ikke fasit for mock-svarene.
- `[ASSUMPTION]` Retningene ble gitt i oppdraget, så impeccable-skillens intervju og retningsvalg ble hoppet over. PRODUCT.md og DESIGN.md ble ikke skrevet; tokens og mønstre står i hver `konsept.md`.

### Knappetekster PRD-en ikke fastsetter

Subagentene valgte uavhengig av hverandre de samme navnene. Det tyder på at navnene er naturlige, men gruppa må vedta dem:

| Sted | Forslag |
|---|---|
| Bekreft i «Endre CV eller annonse»-dialogen (FR-21) | «Forkast og endre» |
| Bekreft leverandørvarselet (FR-25) | «Send og analyser» |
| Tilbake fra steg 3 for å endre svar eller omskrivingsvalg (FR-21) | «Endre svar eller valg» (k1) / «Endre svar eller tekstvalg» (k3) |
| Logg ut fra øktvarselet (FR-22) | «Logg ut nå» |

### Der konseptene tolket ulikt

- **Testbruker på innloggingen:** konsept 1 viser bare til README. Konsept 2 viser `testbruker@example.com` og et README-avsnitt «Testbruker» som ikke finnes ennå. FR-3 sier at passordet bare skal stå i README.
- **Passordet etter mislykket innlogging:** konsept 2 og 3 tømmer det, mens PRD-en bare krever dette ved kontooppretting (FR-1).
- **CV og annonse låses** synlig mens analysen kjører og etter analysen i konsept 2. Det følger av FR-21, men vises ikke like tydelig i de andre.
- **Logg ut i dialoger:** konsept 3 lar topplinjen med «Logg ut» være synlig over dialoger. Om utlogging skal virke mens en dialog er åpen, er ikke avklart.

## Spørsmål til gruppa

1. Hvilken grunnretning passer målgruppen best: ro (1), åpenhet (2) eller motivasjon (3)? En blanding er mulig, for eksempel konsept 1s enkolonnes flyt med konsept 2s nummererte kilder i en sammenleggbar CV-visning.
2. Er primærbrukeren mest på mobil eller PC? PRD-en sier begge (NFR-2). Konsept 3 antar mobil.
3. Skal dokumenterte krav være sammenfelt som standard? Det løser langsidesproblemet i konsept 1 og 3.
4. Hvilke mellomstore bredder skal tegnes og testes (NFR-2)?
5. Knappetekstene i tabellen over.

## Kvalitetskontroll og avvik fra prosessen

- Alle 51 SVG-er (3 × 17) er kontrollert som velformet XML med `<title>`. Filnavnene er like i alle tre konseptene. Hver subagent har sett gjennom skjermene sine rendret i Chrome. Jeg har i tillegg sett på gap-analysen (skjerm 08) i alle tre.
- **Impeccable-detektoren** fant to ting i galleriene:
  - *Trang padding* på mock-stripen i `konsept-3/index.html`: rettet.
  - *Krem/beige bakgrunn* i konsept 1 og 3: står fortsatt, fordi fargene var en bevisst retning i briefen. Funnet er tatt med som svakhet over. Undertrykking ville krevd en fil utenfor `_bmad-output/planning-artifacts/ux/helle/`, så jeg gjorde det ikke.
- **Avvik fra `bmad-ux`-flyten:** Det er ikke laget DESIGN.md, EXPERIENCE.md eller memlog i `planning-artifacts`, fordi oppdraget var å holde alt i `_bmad-output/planning-artifacts/ux/helle/` og ikke stille spørsmål. Når gruppa har valgt retning, bør `bmad-ux` kjøres i Create-modus på det valgte konseptet, med denne mappa som `imports/`.
- Konsept 1 har med generatorskriptene i `konsept-1/kilde/`, så skjermene kan lages på nytt. De andre konseptene har ikke det. Mappa kan slettes hvis gruppa ikke vil ha den.
