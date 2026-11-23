# Elisabeths designkonsepter for Supersøker

**Dato:** 2026-11-22, revidert 2026-11-23 · **Laget av:** Elisabeth med Claude Code · **Status:** konseptskisser til gruppevurdering, ikke vedtatt design

Dette er tre av gruppens ni konsepter. Gruppa velger én retning, eventuelt med elementer fra flere, og den videreutvikles med `bmad-ux` til DESIGN.md og EXPERIENCE.md.

**Se konseptene:** åpne [oversikt.html](oversikt.html) i nettleseren (dobbeltklikk i Filutforsker). Oversikten viser alle fem skjermene i alle tre konseptene side om side som bilder. Ingen installasjon, server eller nettforbindelse trengs.

**Lage bildene på nytt** (etter endringer i et konsept): bildene i `skjermer/` lages av [verktoy/skjermbilder.cjs](verktoy/skjermbilder.cjs). Skriptet krever Node.js 22 eller nyere og Google Chrome, men ingen pakker. Kjør fra prosjektroten:

```sh
node _bmad-output/planning-artifacts/ux/elisabeth/verktoy/skjermbilder.cjs
```

Skriptet sjekker også at ingen av konseptene har horisontal overflyt ved 375 px. Ligger Chrome et annet sted, setter du `CHROME_PATH`.

- [Konsept 1 – Huskelapp](konsept-1-huskelapp.html)
- [Konsept 2 – Kveld](konsept-2-kveld.html)
- [Konsept 3 – Fremdrift](konsept-3-fremdrift.html)

## Iterasjon: fra tre retninger til tre varianter av Sjekkliste

Første runde (2026-11-22, commit `5cabb9b`) hadde tre ulike retninger: *Brevet vokser*, *Klar tale* og *Sjekkliste*. Etter å ha sammenlignet dem med Helles og Mirandas konsepter likte Elisabeth Sjekkliste best og de to andre mindre. 2026-11-23 ble derfor alle tre erstattet av tre varianter av Sjekkliste. Kjerneideen er beholdt, men uttrykket og plasseringen av huskelisten varieres. De gamle filene finnes i git-historikken.

Fra de forkastede konseptene tar vi med to lærdommer: gul fokus må alltid ha en mørk kant (Klar tale), og brevet bør skille seg visuelt fra grensesnittet (Brevet vokser). Kveld bruker det siste.

Felles for alle tre variantene:
- Kravene er punkter i en huskeliste. Fylt merke betyr at kravet er dokumentert i CV-en. Stiplet merke betyr at det ikke står i CV-en.
- Et krav med svar får merket «Svar lagt til», men punktet forblir åpent, fordi et svar ikke er dokumentasjon (FR-13, FR-18).
- På steg 3 blir huskelisten brukerens egen sjekkliste «Før du sender». «Teksten bygger på» står i høyre kolonne (FR-19).
- Ansettelsesvilkår står for seg og telles ikke med.

## Grunnlag

- Skjermene, reglene og innholdet følger Helles [felles-brief.md](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/blob/helle/konsepter/UX/helle/felles-brief.md) (PR #15), slik at konseptene kan sammenlignes skjerm for skjerm med hennes og Mirandas. Kildene er [PRD-en](../../prds/prd-supersoker-2026-11-03/prd.md) og [testpar 1](../../../../tests/fixtures/job-applications/01-mangler-sertifikat/).
- Svaret fra Ida er «Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.», som i Helles brief. Mirandas konsepter bruker «Jeg har ikke førerkort.».
- Hvert konsept viser **fem av de 17 skjermene** med samme nummer som i briefen: 01 Logg inn, 03 CV og annonse (tom), 08 Gap-analyse, 10 Søknadsutkast og 16 Mobil gap-analyse. Dette er skjermene der konseptene skiller seg mest fra hverandre. Konto-, feil- og varselskjermene (02, 04–07, 09, 11–15, 17) er ikke tegnet. De følger samme mønstre og kan tegnes for konseptet gruppa velger.
- Skjermene er statiske HTML-skisser. Ingenting kan klikkes, analyseres eller lagres.
- Alle tre er varianter av samme idé (Sjekkliste) og har identisk HTML. Bare stilarket skiller seg, så forskjellene er rent visuelle og lette å sammenligne. Ingen av dem overlapper de seks andre: rolig veiviser, arbeidsbenk med bevis og kort og mot (Helle), samt stegvis veiviser, editorial og bold (Miranda).

## Sammenligning

| | 1 · Huskelapp | 2 · Kveld | 3 · Fremdrift |
|---|---|---|---|
| **Huskelisten** | Gul lapp, fast panel til venstre | Mørkt panel, fast til venstre | Mørkt bånd øverst med merker |
| **Status** | Fylt / stiplet firkant | Fylt sirkel / ravgul stiplet ring | Fylt sirkel / stiplet ring |
| **Uttrykk** | Lyst og varmt, Georgia i overskrifter | Mørkt tema, mint aksent, lyst brevark | Krem, marineblå og korall (som originalen) |
| **Layout** | Panel 300 px og arbeidsflate | Panel 300 px og arbeidsflate | Én kolonne, maks 920 px |
| **Best for** | Et personlig, uformelt preg | Unge brukere vant til mørke apper | Oversikt uten sidepanel |
| **Største risiko** | Papirpreget kan virke gammeldags | Lyst på mørkt er tyngre å lese i lange tekster | Båndet blir høyt med mange krav |

## Konsept 1 – Huskelapp

**Idé:** Huskelisten er en gul lapp festet til venstre, med firkantede avkrysningsbokser som på et papirark. Overskrifter og brevet står i Georgia. Knappene er blå med små hjørner, og «mangler dokumentasjon» har en brun kant.

| Token | Verdi | Kontrast |
|---|---|---|
| Blekk (tekst) | `#22303C` på lapp `#FFF1A8` / krem `#F7F4EC` | 11,8:1 / 12,3:1 |
| Dempet tekst | `#545F6B` på krem / hvit | 5,9:1 / 6,5:1 |
| Blå (knapp, lenke, fokus) | `#1F4FA3`, hvit tekst | 7,8:1 |
| Mangler (kant, ikon) | `#9A4A00` på hvit | 6,3:1 |
| Mangler (merke) | `#22303C` på `#FFE3C2` | 10,9:1 |
| Dokumentert (merke) | `#1E6B3A` på `#E2F0E6` | 5,5:1 |
| Feltkant (ikke-tekst) | `#7A8296` på hvit | 3,8:1 (krav 3:1) |
| Typografi | Georgia for overskrifter og brev, Segoe UI / system-ui for tekst | |
| Former | 8 px hjørner, firkantede bokser | |

Kanten mellom lappen og arbeidsflaten (`#D9C664`) har bare 1,5:1, men den er pynt og bærer ingen informasjon.

**Styrker**
- Avkrysningsboksene er et kjent bilde: en huskeliste man krysser av.
- Lyst og vennlig, med et mer personlig preg enn de andre konseptene.

**Svakheter og risiko**
- Papir og Georgia kan virke gammeldags for unge brukere.
- Firkantede bokser ligner skjemafelt man kan klikke i. Brukerne kan prøve å krysse av selv.

## Konsept 2 – Kveld

**Idé:** Samme oppsett som Sjekkliste, men i mørkt tema. Aksenten er mintgrønn, og åpne punkter er ravgule. Søknadsbrevet på steg 3 står som et lyst ark, slik at brukerens tekst skiller seg tydelig fra appen.

| Token | Verdi | Kontrast |
|---|---|---|
| Tekst | `#EEF1F5` på flate `#1F2630` / bakgrunn `#161B22` | 13,4:1 / 15,3:1 |
| Dempet tekst | `#AEB8C5` på flate / panel `#0F1319` | 7,6:1 / 9,3:1 |
| Mint (knapp, fokus) | `#7DD3C0`, mørk tekst `#0B0E13` | 11,0:1 |
| Mint lenke | `#7DD3C0` på bakgrunn | 9,8:1 |
| Mangler (kant, ikon) | `#F5B971` på flate | 8,8:1 |
| Mangler (merke) | `#1A1206` på `#F5B971` | 10,6:1 |
| Dokumentert (merke) | `#8BE0A4` på `#1D3527` | 8,4:1 |
| Brev | `#1B1F24` på `#F7F4EE` | 15,1:1 |
| Feltkant (ikke-tekst) | `#7C8797` mot felt `#0F1319` | 5,1:1 (krav 3:1) |
| Typografi | Segoe UI Semibold for overskrifter, Segoe UI / system-ui for tekst | |
| Former | 16 px hjørner, pilleformede knapper | |

**Styrker**
- Moderne uttrykk som mange unge kjenner fra andre apper.
- Det lyse brevarket gjør det tydelig hva som er brukerens tekst.

**Svakheter og risiko**
- Lys tekst på mørk bakgrunn er tyngre å lese i lange tekster, og noen med astigmatisme opplever den som uskarp.
- Mange brukere foretrekker lyst tema. Et ekte produkt bør følge systeminnstillingen (`prefers-color-scheme`) og ha begge. `[ASSUMPTION]`

## Konsept 3 – Fremdrift

**Idé:** Samme farger og former som den første Sjekkliste-skissen, men huskelisten er flyttet fra sidepanelet til et mørkt bånd øverst. Stegene og kravene står som merker på rad, og innholdet står i én kolonne.

| Token | Verdi | Kontrast |
|---|---|---|
| Blekk (tekst, bånd) | `#1E2A4A` på krem `#FBF7F2` / hvit på blekk | 13,3:1 / 14,1:1 |
| Aktivt merke | `#1E2A4A` på hvit | 14,1:1 |
| Dempet tekst | `#525C72` på krem / hvit | 6,3:1 / 6,7:1 |
| Korall (primærknapp, fokus, lenker) | `#B3360F`, hvit tekst | 6,1:1 |
| Mangler (merke) | `#1E2A4A` på `#FBE4DA` | 11,6:1 |
| Dokumentert (merke) | `#1D5B3A` på `#E3F1E7` | 6,9:1 |
| Feltkant (ikke-tekst) | `#7A8296` på hvit | 3,9:1 (krav 3:1) |
| Typografi | Trebuchet MS for overskrifter, Segoe UI / system-ui for tekst | |
| Former | 14 px hjørner, pilleformede knapper og merker | |

**Styrker**
- Hele bredden går til innholdet, og leseveien er enkel.
- Mobil og desktop ligner hverandre mer enn med sidepanel.

**Svakheter og risiko**
- Med mange krav blir båndet høyt, og kravene med «Står ikke i CV-en · svar lagt til» blir lange merker. På 1440 px brytes kravene over to linjer.
- Båndet bør være klistret (sticky) når brukeren scroller. Det er ikke vist i den statiske skissen.

## Risiko felles for alle tre

- Avhuking kan oppleves som en poengsum («3 av 4 hukt av»). Dette er den største risikoen mot ikke-målet om score (SM-C1). Prikkene er en opptelling og må testes.
- Sjekklisten «Før du sender» er et lite tillegg som ikke står i PRD-en. Den kan sløyfes uten at konseptet faller bort. `[ASSUMPTION]`

## Antagelser felles for alle tre

- `[ASSUMPTION]` Politiattest brukes som eksempel på ansettelsesvilkår. Testpar 1 har ingen vilkår (samme valg som i Helles brief).
- `[ASSUMPTION]` Søknadsutkastet er skrevet for hånd som eksempel på hva mock-svaret kan inneholde. Det bruker bare opplysninger fra CV-en og svaret.
- `[ASSUMPTION]` Testbrukerens e-post `test@supersoker.no` er en plassholder. Den riktige står i README når appen finnes.
- Omskrivingsvalget og «Endre CV eller annonse» er ikke tegnet på mobilskjermen (16). De ligger under «Lag tekst» på samme måte som på desktop.

## Kvalitetssikring

**Utført 2026-11-23 (variantene)**
- Kontrast for alle nye fargepar er regnet ut med WCAG-formelen. All tekst holder minst 5,5:1 og alle feltkanter minst 3:1.
- Skjermbilder i Chrome headless ved 1440 px av alle fem skjermene i alle tre variantene. Sjekken fant at lenkene i toppteksten til konsept 2 hadde nettleserens standardblå på mørk bakgrunn og var nesten uleselige. De fikk mintfargen.
- Ingen horisontal overflyt ved 375 px i noen av variantene (`scrollWidth` = 375, målt med `verktoy/skjermbilder.cjs` via Chrome DevTools-protokollen).

**Utført 2026-11-22 (første runde)**
- Kontrast for alle fargepar regnet ut, skjermbilder ved 1440 px, og ingen horisontal overflyt ved 375 px (iframe) eller 504 px.

**Ikke utført:** test med skjermleser, test på fysisk mobil og brukertest.

## Feil i KI-forslag som ble rettet

- **Oppdiktet påstand i søknadsutkastet.** Claudes første utkast skrev at Ida jobber med kundeservice «hver uke» hos Testvik Mat, men det står ikke i CV-en. Setningen ble endret til «jeg har deltidsjobb med kundeservice hos Testvik Mat.» Dette er samme type feil som ærlighetsregelen i FR-18 skal hindre, og den bør inn i testene for mock-svaret.
- **Feilaktig overflyt på mobil.** De første skjermbildene på 390 px så ut til å flyte over kanten i konsept 2. Det viste seg at headless Chrome ikke tegner smalere enn ca. 500 px, så skjermbildene var kuttet. Ny måling i en iframe på 375 px viste at sidene ikke har overflyt.
- **Gul fokus ga for lav kontrast.** Kontrollen viste at gul fokus alene mot hvit har 1,4:1. Fokus er derfor alltid tegnet med svart kant eller svart understrek.

