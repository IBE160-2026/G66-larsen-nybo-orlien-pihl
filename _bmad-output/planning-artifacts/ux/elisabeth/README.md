# Elisabeths designkonsepter for Supersøker

**Dato:** 2026-11-22, revidert 2026-11-23 · **Laget av:** Elisabeth med Claude Code · **Status:** konseptskisser til gruppevurdering, ikke vedtatt design

Dette er tre av gruppens ni konsepter. Gruppa velger én retning, eventuelt med elementer fra flere, og den videreutvikles med `bmad-ux` til DESIGN.md og EXPERIENCE.md.

**Se konseptene:** åpne [oversikt.html](oversikt.html) i nettleseren (dobbeltklikk i Filutforsker). Oversikten viser alle fem skjermene i alle tre konseptene side om side som bilder. Ingen installasjon, server eller nettforbindelse trengs.

**Lage bildene på nytt** (etter endringer i et konsept): bildene i `skjermer/` lages av [verktoy/skjermbilder.cjs](verktoy/skjermbilder.cjs). Skriptet krever Node.js 22 eller nyere og Google Chrome, men ingen pakker. Kjør fra prosjektroten:

```sh
node _bmad-output/planning-artifacts/ux/elisabeth/verktoy/skjermbilder.cjs
```

Skriptet sjekker også at ingen av konseptene har horisontal overflyt ved 375 px. Ligger Chrome et annet sted, setter du `CHROME_PATH`.

- [Konsept 1 – Solnedgang](konsept-1-solnedgang.html)
- [Konsept 2 – Elektrisk](konsept-2-elektrisk.html)
- [Konsept 3 – Bento](konsept-3-bento.html)

## Verdt å vite før dere velger

- **Elektrisk:** Skriften Bahnschrift finnes bare på Windows. På Mac og mobil blir den byttet ut med systemskriften, og noe av særpreget forsvinner. Velger vi Elektrisk, må vi finne en nettskrift med lignende uttrykk.
- **Bento:** Flisene side om side passer best med få og korte krav. Med mange krav eller lange sitater blir radene ujevne. Fersken og mint kan leses som rødt og grønt («feil» og «riktig») og må forklares. Oppsettet bruker CSS-velgeren `:has()`, som ikke virker i eldre nettlesere.
- **Solnedgang:** Gradienter kan bli slitsomme over tid. Hvit tekst har lavest kontrast i den oransje enden (5,5:1), så gradienten må ikke bli lysere.
- **Alle tre:** Avhuking kan oppleves som en poengsum («3 av 4»), og det er et ikke-mål i PRD-en (SM-C1). Sjekklisten «Før du sender» står ikke i PRD-en. Bare 5 av de 17 skjermene er tegnet.

Detaljene står under hvert konsept nedenfor.

## Iterasjoner

Konseptene har gått gjennom tre runder. Alle tidligere versjoner finnes i git-historikken.

| Runde | Dato | Konsepter | Hvorfor endret |
|---|---|---|---|
| 1 | 2026-11-22 (commit `5cabb9b`) | Brevet vokser, Klar tale, Sjekkliste | Tre ulike retninger. Etter sammenligning med Helles og Mirandas konsepter likte Elisabeth Sjekkliste best og de to andre mindre. |
| 2 | 2026-11-23 (commit `9dd71bd`) | Huskelapp, Kveld, Fremdrift | Tre varianter av Sjekkliste. Oversikten ble bygget om etter mønster fra Helles, med alle skjermene side om side. Elisabeth syntes uttrykket ble litt kjedelig for målgruppen. |
| 3 | 2026-11-23 | **Solnedgang, Elektrisk, Bento** | Tre mer fargerike og spennende varianter av Sjekkliste, fordi appen i hovedsak skal appellere til unge jobbsøkere. |

I runde 3 er det bevisst holdt avstand til fargene som allerede er brukt av Miranda (limegrønt, lilla og svart i «Bold») og Helle (lilla, limegrønt og gult i «Kort og mot»). Fra de forkastede konseptene tar vi med to lærdommer: fokus må alltid ha god kontrast mot bakgrunnen (Klar tale), og brevet bør skille seg visuelt fra grensesnittet (Brevet vokser).

Felles for alle tre variantene:
- Kravene er punkter i en huskeliste. Fylt merke betyr at kravet er dokumentert i CV-en. Stiplet merke betyr at det ikke står i CV-en.
- Et krav med svar får merket «Svar lagt til», men punktet forblir åpent, fordi et svar ikke er dokumentasjon (FR-13, FR-18).
- På steg 3 blir huskelisten brukerens egen sjekkliste «Før du sender». «Teksten bygger på» står i høyre kolonne (FR-19).
- Ansettelsesvilkår står for seg med stiplet ramme og telles ikke med.
- Ingen poeng, nivåer eller premier. Uttrykket skal være spennende, men appen skal ikke gi en score (SM-C1).

## Grunnlag

- Skjermene, reglene og innholdet følger Helles [felles-brief.md](../helle/felles-brief.md) (PR #15), slik at konseptene kan sammenlignes skjerm for skjerm med hennes og Mirandas. Kildene er [PRD-en](../../prds/prd-supersoker-2026-11-03/prd.md) og [testpar 1](../../../../tests/fixtures/job-applications/01-mangler-sertifikat/).
- Svaret fra Ida er «Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.», som i Helles brief. Mirandas konsepter bruker «Jeg har ikke førerkort.».
- Hvert konsept viser **fem av de 17 skjermene** med samme nummer som i briefen: 01 Logg inn, 03 CV og annonse (tom), 08 Gap-analyse, 10 Søknadsutkast og 16 Mobil gap-analyse. Dette er skjermene der konseptene skiller seg mest fra hverandre. Konto-, feil- og varselskjermene (02, 04–07, 09, 11–15, 17) er ikke tegnet. De følger samme mønstre og kan tegnes for konseptet gruppa velger.
- Skjermene er statiske HTML-skisser. Ingenting kan klikkes, analyseres eller lagres.
- Alle tre er varianter av samme idé (Sjekkliste) og har identisk HTML. Bare stilarket skiller seg, så forskjellene er rent visuelle og lette å sammenligne. Ingen av dem overlapper de seks andre: rolig veiviser, arbeidsbenk med bevis og kort og mot (Helle), samt stegvis veiviser, editorial og bold (Miranda).

## Sammenligning

| | 1 · Solnedgang | 2 · Elektrisk | 3 · Bento |
|---|---|---|---|
| **Huskelisten** | Gradient-panel til venstre | Koboltblått panel, aktivt steg i korall | Himmelblå flis til venstre |
| **Kravene** | Svevende hvite kort under hverandre | Hvite kort, manglende krav på rosa | Pastell-fliser, dokumenterte krav side om side |
| **Uttrykk** | Varmt og energisk, Segoe UI Black | Kraftig og sporty, Bahnschrift | Lekent og luftig, svarte knapper |
| **Best for** | Et inspirerende førsteinntrykk | Fart og tydelig fremdrift | Rask oversikt over alle kravene |
| **Største risiko** | Gradienten kan bli for mye over tid | Mye blått kan føles tungt | Fliser side om side tåler få lange krav |

## Konsept 1 – Solnedgang

**Idé:** Sjekklisten med varm energi. Sidepanelet og primærknappene har en gradient fra bringebær via rosa til brent oransje. Kortene har ingen kantlinje, men svever med en myk skygge på en lys, rosa bakgrunn. Overskriftene står i Segoe UI Black og er tette og tunge.

| Token | Verdi | Kontrast |
|---|---|---|
| Hvit tekst på gradient | `#FFFFFF` på `#A3134D` → `#C2185B` → `#B8430A` | 7,6:1 → 5,9:1 → 5,5:1 (laveste punkt) |
| Blekk (tekst) | `#2A1620` på krem `#FFF7F2` | 16,1:1 |
| Dempet tekst | `#6A4B55` på hvit / krem | 7,6:1 / 7,2:1 |
| Bringebær (lenke, fokus) | `#C2185B` på hvit | 5,9:1 |
| Mangler (kant, ikon) | `#B8430A` på hvit | 5,5:1 |
| Mangler (merke) | `#2A1620` på `#FFE6D6` | 14,2:1 |
| Dokumentert (merke) | `#0F7B5F` på `#DDF5EC` | 4,6:1 |
| Feltkant (ikke-tekst) | `#8F7A82` på hvit | 4,0:1 (krav 3:1) |
| Typografi | Segoe UI Black / Arial Black for overskrifter, Segoe UI / system-ui for tekst | |
| Former | 20–24 px hjørner, pilleformede knapper med farget skygge | |

**Styrker**
- Varmt og optimistisk. Kan gjøre en kjedelig oppgave (å søke jobb) mer inspirerende.
- Gradienten gjør sidepanelet til et tydelig blikkfang uten at innholdet blir rotete.

**Svakheter og risiko**
- Gradienter går fort ut på dato og kan bli slitsomme ved daglig bruk.
- Hvit tekst har lavest kontrast i den oransje enden (5,5:1). Blir panelet høyere, må gradienten ikke gå lysere.

## Konsept 2 – Elektrisk

**Idé:** Sjekklisten med fart. Sidepanelet er koboltblått, stegene har store tall, og steget du er på lyser i korall. Overskrifter, stegliste og knapper står i Bahnschrift, en moderne og litt teknisk skrift som følger med Windows.

| Token | Verdi | Kontrast |
|---|---|---|
| Hvit på kobolt (panel, knapp) | `#FFFFFF` på `#1E3FD8` | 7,6:1 |
| Aktivt steg | `#0B1640` på korall `#FF7A59` | 6,8:1 |
| Blekk (tekst) | `#0B1640` på `#F4F6FF` | 16,2:1 |
| Dempet tekst | `#4A5480` på hvit / rosa `#FFF3EF` | 7,3:1 / 6,7:1 |
| Kobolt (lenke, seksjonstitler, fokus) | `#1E3FD8` på `#F4F6FF` | 7,1:1 |
| Mangler (kant, ikon) | `#C2341B` på hvit / rosa | 5,5:1 / 5,1:1 |
| Dokumentert (merke) | `#0A7A55` på `#E3F1E7` | 4,6:1 |
| Typografi | Bahnschrift for overskrifter, steg og knapper, Segoe UI / system-ui for tekst | |
| Former | 12–20 px hjørner, store runde steg-tall | |

Korall (`#FF7A59`) brukes bare som bakgrunn med mørk tekst. Mot hvit har den for lav kontrast til å brukes som tekstfarge.

**Styrker**
- Det er alltid lett å se hvor du er: korall-steget skiller seg kraftig ut.
- Bahnschrift gir et særpreg uten å laste ned skrifter.

**Svakheter og risiko**
- Bahnschrift finnes bare på Windows. På Mac og mobil faller den tilbake til systemskriften, og noe av særpreget forsvinner. En nettskrift med lignende uttrykk må vurderes. `[ASSUMPTION]`
- Den store blå flaten kan føles tung på små skjermer.

## Konsept 3 – Bento

**Idé:** Sjekklisten som fliser, slik som rommene i en bento-boks. Huskelisten er en himmelblå flis, krav som mangler dokumentasjon står på fersken, og dokumenterte krav står i mint, tre side om side. Knappene er svarte, og overskriftene er store og tette.

| Token | Verdi | Kontrast |
|---|---|---|
| Blekk (tekst) | `#12233D` på himmel `#DCEBFF` / mint `#E4F6EC` / fersken `#FFE8D6` | 13,0:1 / 14,0:1 / 13,3:1 |
| Dempet tekst | `#4A5568` på hvit / mint / fersken | 7,5:1 / 6,7:1 / 6,4:1 |
| Svart (knapp, lenke, fokus) | `#111827`, hvit tekst | 17,7:1 |
| Rosa (logo) | `#D6336C` på hvit | 4,6:1 |
| Mangler (ikon) | `#A63D12` på fersken | 5,4:1 |
| Dokumentert (ikon) | `#0B6B45` på mint | 5,8:1 |
| Feltkant (ikke-tekst) | `#7A8296` på hvit | 3,8:1 (krav 3:1) |
| Typografi | Segoe UI Variable Display for overskrifter (40 px, tett), Segoe UI / system-ui for tekst | |
| Former | 24–28 px hjørner, flater uten kantlinjer | |

**Styrker**
- Fargen på flisen forteller status før brukeren leser noe. Status vises likevel også med ikon og tekst, ikke bare med farge.
- Dokumenterte krav side om side gir rask oversikt og kortere side.

**Svakheter og risiko**
- Fliser side om side tåler få og korte krav. Med seks krav eller lange sitater blir radene ujevne.
- Fargekodingen (fersken og mint) må forklares første gang, ellers kan den oppleves som rødt og grønt, altså som «feil» og «riktig».
- Oppsettet bruker CSS-velgeren `:has()`, som ikke virker i eldre nettlesere.

## Risiko felles for alle tre

- Avhuking kan oppleves som en poengsum («3 av 4 hukt av»). Dette er den største risikoen mot ikke-målet om score (SM-C1). Prikkene er en opptelling og må testes.
- Sjekklisten «Før du sender» er et lite tillegg som ikke står i PRD-en. Den kan sløyfes uten at konseptet faller bort. `[ASSUMPTION]`

## Antagelser felles for alle tre

- `[ASSUMPTION]` Politiattest brukes som eksempel på ansettelsesvilkår. Testpar 1 har ingen vilkår (samme valg som i Helles brief).
- `[ASSUMPTION]` Søknadsutkastet er skrevet for hånd som eksempel på hva mock-svaret kan inneholde. Det bruker bare opplysninger fra CV-en og svaret.
- `[ASSUMPTION]` Testbrukerens e-post `test@supersoker.no` er en plassholder. Den riktige står i README når appen finnes.
- Omskrivingsvalget og «Endre CV eller annonse» er ikke tegnet på mobilskjermen (16). De ligger under «Lag tekst» på samme måte som på desktop.

## Kvalitetssikring

**Utført 2026-11-23 (runde 3)**
- Kontrast for alle nye fargepar er regnet ut med WCAG-formelen. All tekst holder minst 4,5:1 og alle feltkanter minst 3:1.
- Skjermbilder av alle fem skjermene i alle tre variantene med `verktoy/skjermbilder.cjs`. Sjekken fant at den stiplede rammen rundt ansettelsesvilkår (Politiattest) forsvant i Solnedgang og Elektrisk, fordi en ny regel som fjernet kantlinjen på alle kort overstyrte den. Vilkårene så dermed ut som vanlig tekst. Rammen ble lagt tilbake med en mer spesifikk regel.
- Ingen horisontal overflyt ved 375 px i noen av variantene (`scrollWidth` = 375).

**Utført 2026-11-23 (runde 2)**
- Kontrast regnet ut, skjermbilder tatt og overflyt målt. Lenkene i toppteksten til Kveld hadde nettleserens standardblå på mørk bakgrunn og ble rettet.

**Utført 2026-11-22 (første runde)**
- Kontrast for alle fargepar regnet ut, skjermbilder ved 1440 px, og ingen horisontal overflyt ved 375 px (iframe) eller 504 px.

**Ikke utført:** test med skjermleser, test på fysisk mobil og brukertest.

## Feil i KI-forslag som ble rettet

- **Oppdiktet påstand i søknadsutkastet.** Claudes første utkast skrev at Ida jobber med kundeservice «hver uke» hos Testvik Mat, men det står ikke i CV-en. Setningen ble endret til «jeg har deltidsjobb med kundeservice hos Testvik Mat.» Dette er samme type feil som ærlighetsregelen i FR-18 skal hindre, og den bør inn i testene for mock-svaret.
- **Feilaktig overflyt på mobil.** De første skjermbildene på 390 px så ut til å flyte over kanten i konsept 2. Det viste seg at headless Chrome ikke tegner smalere enn ca. 500 px, så skjermbildene var kuttet. Ny måling i en iframe på 375 px viste at sidene ikke har overflyt.
- **Gul fokus ga for lav kontrast.** Kontrollen viste at gul fokus alene mot hvit har 1,4:1. Fokus er derfor alltid tegnet med svart kant eller svart understrek.
- **Ansettelsesvilkår mistet rammen (runde 3).** Claude la til en regel som fjernet kantlinjen på alle kort for å få et luftigere uttrykk, uten å se at regelen også traff kortet for ansettelsesvilkår. Da så Politiattest ut som vanlig tekst og ikke som et vilkår som står for seg (FR-14). Feilen ble funnet på skjermbildene og rettet med en mer spesifikk regel for `.kort.vilkar`.
