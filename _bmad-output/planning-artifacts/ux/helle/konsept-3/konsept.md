# Konsept 3 – «Kort og mot»

Designkonsept for Supersøker v1, laget etter [felles-brief.md](../felles-brief.md). Galleri med alle 17 skjermene: [index.html](index.html). SVG-ene ligger i [skjermer/](skjermer/).

## Retning

**Mobil-først, uttrykksfullt og oppmuntrende.** Hvert krav er et stort, taktilt kort. Et krav som mangler dokumentasjon, har et gult fargebånd og en tydelig «Fortell oss kort»-flate rett under kravet. Et dokumentert krav har et grønt bånd, og sitatet fra CV-en er klistret på som et limegrønt «bevis-klistremerke», litt skjevt. Overskriftene er store og tunge. En fremdriftsstripe viser de tre stegene, og primærknappen ligger alltid i en fast handlingslinje nederst, der tommelen er.

Tonen er en vennlig coach som er ærlig uten å skryte. Den sier «Står ikke i CV-en din. Det betyr ikke at du mangler det.» og «Skriv bare det som stemmer – vi bruker ordene dine slik de står.» Det er **ikke** en chat: alt er kort og skjemafelt, ingen snakkebobler og ingen modell som stiller spørsmål (PRD §6).

Desktop er den mobile layouten skalert opp: innholdet står i en sentrert kolonne på 1040 px, med kortene i et rutenett med to kolonner (tre for de små dokumenterte kravkortene) og den samme faste handlingslinjen nederst.

### Hvorfor dette passer målgruppen

Primærbrukeren (PRD §2) er en student med lite relevant erfaring som søker sin første relevante jobb. Hun er ofte usikker og gjør det meste på telefonen.

- **Mestring framfor vurdering.** Gap-analysen kan føles som en karakter. Her er hvert krav et kort brukeren kan *gjøre noe med*: det gule kortet inviterer til å fortelle, og det grønne kortet viser beviset. Ingen poengsum, prosent eller måler (SM-C1). «3 av 4» står som en vanlig setning, ikke som en grafisk indikator.
- **Ingen tvil om neste steg.** Én primærknapp per skjerm, alltid på samme sted (nederst til høyre på desktop, i full bredde nederst på mobil). Knappene er 58–60 px høye, godt over minstekravet på 44 px for trykkflater.
- **Ærlighet synes.** Klistremerket gjør sitatkravet (FR-11) til noe brukeren ser og forstår: «dette står faktisk i CV-en din». Svaret hennes vises i «Teksten bygger på» som «Oppgitt av deg. Supersøker har ikke kontrollert det.»
- **Selvsikkert uten å skryte.** Tung typografi og mettede farger gir energi. Ordene sier aldri at hun er kvalifisert, bare hva CV-en viser.

### Avgrensning mot de to andre retningene

Konseptet er ikke en rolig, nøytral veiviser i én kolonne, og ikke en nøktern arbeidsbenk med kildepaneler side om side. Kortene, fargebåndene, klistremerket og handlingslinjen er det som skiller det fra de to andre.

## Designtokens

### Farger

Kontrastforhold er beregnet etter WCAG 2.1 (relativ luminans). AA krever 4,5:1 for vanlig tekst, 3:1 for stor tekst (≥ 24 px, eller ≥ 18,7 px fet) og 3:1 for grenser på skjemakontroller og fokusindikatorer.

| Token | Hex | Rolle |
|---|---|---|
| `ink` (blekk) | `#24102F` | Brødtekst, overskrifter, fokusring på lys bakgrunn |
| `plum` (aubergine) | `#4B1D63` | Topplinje, primærknapp, aktivt steg, ikoner, valgt alternativ |
| `cream` (krem) | `#FFF3E2` | Sidebakgrunn |
| `cream2` | `#F6E6CF` | Veksler-bakgrunn, merknadsbånd |
| `card` | `#FFFDF9` | Kortflater og felt |
| `muted` | `#5C4868` | Hjelpetekst, tegnteller, sekundær tekst |
| `lime` (aksent) | `#C9F46A` | Mock-stripe, bevis-klistremerke, «Valgt», «Du er her», logo |
| `mari` (ringblomst) | `#FFC247` | Bånd for «Mangler dokumentasjon», API-stripe |
| `mariTint` | `#FFF0CC` | «Fortell oss kort»-flaten, coachmeldinger, brukerens svar |
| `mint` | `#E3F8C4` | Bånd for «Dokumentert», bekreftelse «Kopiert» |
| `err` | `#B3261E` | Feiltekst, ugyldig feltkant, feilikon |
| `errTint` | `#FDE7E4` | Bakgrunn for feilmeldinger |
| `info` | `#E9E1F2` | Informasjonsmeldinger (sletting, testbruker, Analyserer) |
| `line` | `#8A7894` | Kant på felt og ikke-valgte kontroller |
| `hair` | `#E8D8C4` | Dekorative kortkanter og skillelinjer (ikke informasjonsbærende) |
| `disBg` / `disTx` | `#E4DCE6` / `#6E6277` | Deaktivert knapp |

| Forgrunn på bakgrunn | Forhold | Krav | Bruk |
|---|---|---|---|
| ink på cream | 16,11:1 | AA tekst | Brødtekst og overskrifter |
| ink på card | 17,37:1 | AA tekst | Tekst i kort og felt |
| muted på cream | 7,42:1 | AA tekst | Hjelpetekst på siden |
| muted på card | 8,01:1 | AA tekst | Hjelpetekst og tellere i kort |
| muted på mariTint | 7,20:1 | AA tekst | Hjelpetekst i «Fortell oss kort» |
| muted på cream2 | 6,64:1 | AA tekst | Variantetiketter |
| cream på plum | 11,58:1 | AA tekst | Logo, «Logg ut» og aktivt steg i topplinjen |
| card på plum | 12,49:1 | AA tekst | Tekst på primærknapp |
| lime på plum | 10,05:1 | AA tekst | «Du er her» og fokusring på mørk bakgrunn |
| ink på lime | 13,97:1 | AA tekst | Mock-stripe og klistremerke-sitat |
| ink på mari | 10,97:1 | AA tekst | Statuschip og API-stripe |
| ink på mariTint | 15,62:1 | AA tekst | Svartekst og coachmeldinger |
| ink på mint | 15,54:1 | AA tekst | Bekreftelser |
| ink på info | 13,88:1 | AA tekst | Informasjonsmeldinger |
| ink på errTint | 14,89:1 | AA tekst | Brødtekst i feilmeldinger |
| err på card | 6,43:1 | AA tekst | Feiltekst ved felt |
| err på cream | 5,97:1 | AA tekst | Feiltekst på siden |
| err på errTint | 5,52:1 | AA tekst | Feilikon og kant i feilmelding |
| plum på cream / card | 11,58 / 12,49:1 | AA tekst | Lenker, sekundærknapper |
| line på card | 3,98:1 | AA ikke-tekst (3:1) | Feltkanter |
| line på cream | 3,69:1 | AA ikke-tekst (3:1) | Stiplet kant på kommende steg |
| ink-fokusring på cream / card | 16,11 / 17,37:1 | AA ikke-tekst | Fokusindikator |
| disTx på disBg | 4,26:1 | Unntatt (deaktivert) | Holdt lesbar likevel |

Statusfargene bærer aldri informasjon alene. «Mangler dokumentasjon» har alltid tekst + stiplet sirkel med spørsmålstegn. «Dokumentert» har alltid tekst + sirkel med hake. Gult er bevisst valgt i stedet for rødt, fordi manglende dokumentasjon ikke er en feil. Rødt er forbeholdt ekte feil (validering og systemfeil).

### Typografi

Bare systemfonter, uten eksterne ressurser:

- **Display** (`.d`): `'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Roboto, Arial, sans-serif`, vekt 800–900.
- **Tekst** (`.t`): `'Segoe UI Variable Text', 'Segoe UI', system-ui, …`, vekt 400 / 600 / 700.

| Rolle | Desktop | Mobil | Vekt |
|---|---|---|---|
| Sideoverskrift (h1) | 52 px / 1,08 | 32 px / 1,08 | 900 |
| Seksjonsoverskrift (h2) | 30 px / 1,15 | 24 px | 900 |
| Kravtittel i kort | 22–30 px / 1,22 | 21–24 px | 800–900 |
| Opptelling («3 av 4 …») | 26 px | 20 px | 700 |
| Ingress | 19 px / 1,5 | 16 px / 1,5 | 400 |
| Brødtekst, felt | 17 px / 1,5 | 16 px | 400 |
| Etikett | 16–17 px | 15–16 px | 700 |
| Hjelpetekst, teller | 15 px | 14–15 px | 400 |
| Knapp | 18 px | 16–18 px | 700 |

### Avstand og former

- Grunnenhet 4 px. Vanlige steg: 8, 12, 16, 20, 24, 28, 36, 48 px. Mer luft over en seksjonsoverskrift (48 px) enn under (18 px).
- Desktop: innholdskolonne 1040 px sentrert (x = 200), kolonneavstand 24 px. Mobil: 20 px marg, innhold 350 px.
- Radius: kort 28 px (mobil 24), innfelte flater 20–22 px, felt 16 px, knapper og chips helt runde (pille).
- Dybde: myk løfteskygge (`dy 6, blur 9, 13 % blekk`) på kort og primærknapp, og en sterkere, kortere skygge på klistremerket. Ingen harde forskjøvne skygger.
- Ikoner: egne enkle paths på et 24 × 24-rutenett med samme strektykkelse (2,2) og runde ender.

## Sentrale mønstre

- **Topplinje + modusstripe.** Aubergine topplinje med logo og «Logg ut» (pilleknapp med ikon) på alle sider etter innlogging. Rett under ligger en limegrønn stripe med skjoldikon: «Mock-modus er på – ingen tekst sendes til en språkmodell.» I API-modus (skjerm 14) blir stripen oransje med et papirfly-ikon og navngir OpenAI.
- **Fremdriftsstripe for stegene.** På desktop er det tre piller: ferdig (hake + «Ferdig»), aktiv (fylt aubergine, nummer i lime, «Du er her») og kommende (stiplet kant). På mobil vises bare aktivt steg som tekst («Steg 2 av 3 · Gap-analyse») over en stripe i tre deler med en markør på aktivt steg.
- **Kravkort.** Fargebånd med statuschip (tekst + ikon i hvit pille med blekk-kant) og tung kravtittel. Det manglende kravet har forklaringen og «Fortell oss kort»-flaten (gul innfelt flate, blyantikon, synlig etikett, valgfritt felt, teller «56 / 1 000 tegn»). Dokumenterte krav har et klistremerke med «Fra CV-en din» og sitatet i anførselstegn. På desktop er det manglende kravet et bredt kort med kravet til venstre og svarflaten til høyre.
- **Ansettelsesvilkår.** Flatt kort med stiplet kant og seglikon, uten status og uten svarfelt, merket «Vilkår fra annonsen» og forklart som utenfor opptellingen.
- **Omskrivingsvalg.** Store radiokort med synlig ledetekst («Hva slags tekst vil du ha?»). Valgt kort har tykk aubergine kant, fylt radioknapp og en «Valgt»-merkelapp.
- **Handlingslinje.** Fast linje nederst med myk skygge oppover. Sekundærknappen (konturert) står til venstre og primærknappen (fylt) til høyre. På mobil er primærknappen i full bredde og sekundærhandlingen en understreket tekstknapp under. Når en bekreftelse vises (skjerm 17), flyttes sekundærhandlingen opp i innholdet, slik at linjen ikke tar for mye av skjermen. Bekreftelser som «Kopiert. Lim inn teksten der du skriver søknaden.» vises i et grønt felt ved knappen.
- **Meldinger.** Avrundede bokser med ikon til venstre, fet tittel og forklaring som sier hva som er galt og hva brukeren kan gjøre (NFR-3). Typer: feil (rød kant, varseltrekant eller klokke), info (lilla, i, lås, klokke), coach (gul, kompass) og bekreftelse (grønn, hake).
- **Feltfeil.** 3 px rød kant + varseltrekant + rød tekst under feltet + fokusring. Fokus flyttes til første ugyldige felt (NFR-1).
- **Fokus.** 3 px blekk-ring med 5 px avstand rundt elementet (lime på aubergine). Hver skjerm viser minst ett fokusert element.
- **Dialoger.** Kort med stort ikon i farget sirkel, tung tittel, punktliste over konsekvenser og to knapper. Når handlingen forkaster data eller sender data ut, har det trygge valget («Avbryt») fokus (skjerm 12 og 14). I øktvarselet (15) har «Fortsett økten» fokus, fordi det er det trygge valget der. Overlegget dekker innholdet, men ikke topplinjen, så modusstripen og «Logg ut» alltid er synlige.
- **Varianter på samme ark** (skjerm 9, 13 og 15) er merket med en stiplet etikett som er en merknad til gruppa, ikke en del av grensesnittet.

## Styrker

1. **Tydelig neste steg.** Én primærknapp på et fast sted og store trykkflater, med en fremdriftsstripe som viser hvor man er. Det er sterkest på mobil, der målgruppen faktisk er.
2. **Ærlighetsprinsippet blir synlig og forståelig.** Bevis-klistremerket, «Står ikke i CV-en din. Det betyr ikke at du mangler det.» og «Oppgitt av deg» i «Teksten bygger på» gjør FR-11, FR-12 og FR-19 konkrete uten juridisk tone.
3. **Motiverende uten å gjøre analysen til en karakter.** Energiske farger og tung typografi, men ingen poengsum, måler eller prosent. Gult for «mangler» signaliserer «gjør noe her», ikke «feil».
4. Status vises alltid med tekst + form, kontrasten er god (det meste ≥ 7:1), og fokusringen er tydelig.

## Svakheter og risikoer

1. **Høyt visuelt volum.** Fargebånd, klistremerker og skygger på mange kort kan bli mye for noen, særlig i gap-analysen med mange krav (tester med 10+ krav er ikke skissert). Tiltak: kompakt kortvariant ved mange krav.
2. **Lange sider på mobil.** Gap-analysen blir nesten 3 000 px høy på 390 px. Den faste handlingslinjen hjelper, men brukeren må rulle langt for å se alle krav. Det kan være aktuelt å la dokumenterte krav være sammenfelt som standard.
3. **Lekenhet kan svekke tilliten.** Et skjevt klistremerke kan virke uformelt for noen, og en sensor kan oppfatte det som pynt. Rotasjonen må være liten (≤ 2°) og må aldri gjøre sitatet vanskelig å lese.
4. **Systemfonter gir ulik karakter.** Tung display-vekt ser kraftig ut med Segoe UI (Windows), men på andre plattformer faller den tilbake til Helvetica Neue eller Roboto. Linjebrytingen i SVG-ene er beregnet med margin, men i ekte kode må tekst flyte fritt.
5. **Fast handlingslinje tar plass** på små skjermer og kan dekke fokusert innhold. Implementasjonen må sørge for `scroll-padding-bottom` slik at fokus aldri havner bak linjen.
6. **Kremgrunnen er et kjent KI-standardvalg.** Impeccable-detektoren flagget den varme kremfargen som et vanlig standardvalg. Den er beholdt fordi oppdraget ba om «aubergine/blekk mot varm krem», og identiteten bæres av aubergine, lime og ringblomst, ikke av grunnen. Gruppa kan vurdere en kjøligere grunn.
7. **Farger må holdes i sjakk.** Lime brukes både for mock-stripe og klistremerke. Hvis den spres til flere roller, mister begge betydning.

## Antagelser

- `[ASSUMPTION]` Ansettelsesvilkåret «Politiattest» er bare en illustrasjon av komponenten. Testpar 1 har ingen ansettelsesvilkår (jf. briefen).
- `[ASSUMPTION]` Leverandøren i skjerm 14 er OpenAI med modellen `gpt-5-mini` (PRD §8).
- `[ASSUMPTION]` Skjerm 6 viser et tilfelle der arbeidsgiveren ikke ble funnet. I testpar 1 står «Testvik kommune» i annonsen, så skjermen forutsetter en annonse uten tittellinjen.
- `[ASSUMPTION]` Skjerm 9 variant B bruker tittelen fra testpar 1, selv om en annonse uten tydelige krav i praksis ville vært en annen annonse.
- `[ASSUMPTION]` Feilskjermene (13) viser mock-stripen, fordi testoppsettet kan simulere tidsavbrudd og ugyldig analyse. I API-modus byttes stripen ut med den oransje API-stripen.
- `[ASSUMPTION]` Passordfeltet tømmes også ved feil innlogging (skjerm 1). PRD-en krever det bare for kontooppretting (FR-1).
- `[ASSUMPTION]` Fra steg 3 heter tilbakeknappen «Endre svar eller tekstvalg» (FR-21). PRD-en gir ikke knappen et navn.
- `[ASSUMPTION]` «Analyser kravene» er aktiv også når feltene er tomme, slik at valideringen i FR-8 (melding, ugyldig merking, fokus) kan skje. Knappen er bare deaktivert mens et kall pågår.
- `[ASSUMPTION]` Søknadsutkastet er skrevet for konseptet og følger reglene i briefen (tittel og arbeidsgiver, besøksvenn og gruppeprosjekt, «ikke førerkort ennå», signert «Ida Testesen»). Det er ikke en fasit for mock-svaret.
- `[ASSUMPTION]` Dialoger dekker ikke topplinjen, slik at modusstripen og «Logg ut» alltid er synlige. Det må avklares i UX-arbeidet om «Logg ut» skal virke mens en dialog er åpen.
- `[ASSUMPTION]` Målgruppen bruker hovedsakelig mobil. Det står ikke i PRD-en, men er grunnlaget for retningen i briefen.
- `[ASSUMPTION]` Impeccable-skillen ville vanligvis stilt spørsmål og skrevet PRODUCT.md og DESIGN.md. Uten mulighet for spørsmål er produktgrunnlaget hentet fra PRD-en og briefen, og tokens og mønstre står i denne fila i stedet for i en egen DESIGN.md. Retningen var gitt i oppdraget, så det ble ikke trukket noen alternative retninger («seed: none (pinned)»).

## Avvik fra briefen

- Skjerm 9 og 13 viser variantene i to kolonner på ett 1440 px-ark. Hver variant har primærknappen nederst i kolonnen i stedet for i en egen fast handlingslinje.
- Skjerm 15 stabler de to variantene vertikalt (varsel over, innloggingsside under) med en merknadsetikett mellom.
- Ellers ingen kjente avvik: alle 17 filnavn, knappetekster og meldingstekster følger briefen og PRD-en.
