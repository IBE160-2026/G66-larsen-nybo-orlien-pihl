# Elisabeths designkonsepter for Supersøker

**Dato:** 2026-11-22 · **Laget av:** Elisabeth med Claude Code · **Status:** konseptskisser til gruppevurdering, ikke vedtatt design

Dette er tre av gruppens ni konsepter. Gruppa velger én retning, eventuelt med elementer fra flere, og den videreutvikles med `bmad-ux` til DESIGN.md og EXPERIENCE.md.

**Se konseptene:** åpne [oversikt.html](oversikt.html) i nettleseren (dobbeltklikk i Filutforsker). Ingen installasjon, server eller nettforbindelse trengs.

- [Konsept 1 – Brevet vokser](konsept-1-brevet-vokser.html)
- [Konsept 2 – Klar tale](konsept-2-klar-tale.html)
- [Konsept 3 – Sjekkliste](konsept-3-sjekkliste.html)

## Grunnlag

- Skjermene, reglene og innholdet følger Helles [felles-brief.md](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/blob/helle/konsepter/UX/helle/felles-brief.md) (PR #15), slik at konseptene kan sammenlignes skjerm for skjerm med hennes og Mirandas. Kildene er [PRD-en](../../prds/prd-supersoker-2026-11-03/prd.md) og [testpar 1](../../../../tests/fixtures/job-applications/01-mangler-sertifikat/).
- Svaret fra Ida er «Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.», som i Helles brief. Mirandas konsepter bruker «Jeg har ikke førerkort.».
- Hvert konsept viser **fem av de 17 skjermene** med samme nummer som i briefen: 01 Logg inn, 03 CV og annonse (tom), 08 Gap-analyse, 10 Søknadsutkast og 16 Mobil gap-analyse. Dette er skjermene der konseptene skiller seg mest fra hverandre. Konto-, feil- og varselskjermene (02, 04–07, 09, 11–15, 17) er ikke tegnet. De følger samme mønstre og kan tegnes for konseptet gruppa velger.
- Skjermene er statiske HTML-skisser. Ingenting kan klikkes, analyseres eller lagres.
- Tre nye retninger er valgt med vilje, slik at de ikke overlapper de seks som finnes: rolig veiviser, arbeidsbenk med bevis og kort og mot (Helle), samt stegvis veiviser, editorial og bold (Miranda).

## Sammenligning

| | 1 · Brevet vokser | 2 · Klar tale | 3 · Sjekkliste |
|---|---|---|---|
| **Kjerneidé** | Søknaden er synlig hele veien | Tilgjengelighet og klart språk først | Kravene som en huskeliste |
| **Layout desktop** | To kolonner: krav og brevark | Én kolonne, maks 960 px | Fast mørkt sidepanel og arbeidsflate |
| **Uttrykk** | Kjølig grå, petrol, Georgia i brevet | Svart på hvitt, gul fokus, 20 px brødtekst | Krem, marineblå og korall, runde former |
| **«Teksten bygger på»** | Vokser allerede på steg 2 | Liste under teksten på steg 3 | Høyre kolonne på steg 3 |
| **Best for** | Brukeren som tenker «hva blir søknaden?» | Alle, også med skjermleser, tastatur og forstørrelse | Brukeren som vil ha oversikt og kontroll |
| **Største risiko** | Brevarket kan tolkes som om teksten allerede er skrevet | Kan oppleves nøkternt og lite særpreget | Avhukingen kan leses som en karakter |

## Konsept 1 – Brevet vokser

**Idé:** Søknaden er det brukeren vil ha, så den er synlig fra første steg. Til høyre står et «brevark» som viser hva teksten kommer til å bygge på: stilling, arbeidsgiver, CV-sitater og svarene. Et nytt svar dukker opp på arket med markering. Brevet skrives først ved «Lag tekst». På steg 3 blir arket selve brevet, med kildelisten i margen.

| Token | Verdi | Kontrast |
|---|---|---|
| Tekst | `#14232B` på hvit | 16,1:1 |
| Dempet tekst | `#4A5A63` på hvit / bakgrunn `#EEF2F4` | 7,2:1 / 6,4:1 |
| Aksent (knapper, aktivt steg) | `#0B5563`, hvit tekst | 8,4:1 |
| Mangler dokumentasjon | `#8A4B00` på `#FFF4E0` | 6,2:1 |
| Brevtekst | `#1F1B16` på ark `#FFFDF8` | 16,8:1 |
| Feltkant (ikke-tekst) | `#6B7B84` på hvit | 4,4:1 (krav 3:1) |
| Typografi | Segoe UI / system-ui for grensesnittet, Georgia for brev og sitater | |
| Former | 10 px hjørner, venstrekant på kravkort, ark med skygge | |

**Styrker**
- Ærlighetsregelen blir synlig: brukeren ser at teksten bare bygger på det som står på arket (FR-18, FR-19).
- Svarene får umiddelbar effekt og en synlig mening, noe som kan få flere til å skrive svar (FR-13).
- Brevet i serif skiller tydelig mellom brukerens tekst og appens grensesnitt.

**Svakheter og risiko**
- Arket på steg 2 kan få brukeren til å tro at teksten allerede er skrevet. Overskriften «Søknaden din bygger på» må testes.
- «Teksten bygger på» vises allerede på steg 2. Det er en utvidelse av FR-19, som bare nevner steg 3. `[ASSUMPTION]`
- To kolonner krever bred skjerm. Under 900 px stables de, og da havner arket under kravene.

## Konsept 2 – Klar tale

**Idé:** Konseptet bygger på erfaringer fra offentlige tjenester som må fungere for alle. Det har stor tekst, svart på hvitt, én kolonne og understrekede lenker. Fokusmarkeringen er gul med svart kant og kan ikke overses. Hver side har en «Hva skjer nå?»-boks som sier med vanlige ord hva knappen gjør. Feil vises i en oppsummering øverst som lenker til feltet. Statusene har både ikon i form og ord i store bokstaver.

| Token | Verdi | Kontrast |
|---|---|---|
| Tekst | `#0B0C0C` på hvit | 19,6:1 |
| Dempet tekst | `#3B3F42` på hvit / `#F3F2F1` | 10,6:1 / 9,5:1 |
| Lenke | `#1A4FB4` på hvit, alltid understreket | 7,4:1 |
| Dokumentert | `#0F6A35` på hvit | 6,7:1 |
| Feil | `#B3261E` på hvit | 6,5:1 |
| Fokus | `#FFD400` bakgrunn med svart tekst og svart kant | 13,7:1 |
| Typografi | Arial 20 px brødtekst (19 px mobil), overskrifter 40/26/21 px | |
| Former | Rette hjørner, 2 px svarte rammer, 8 px svart linje under toppen | |

Den gule fokusfargen alene mot hvit har bare 1,4:1. Derfor brukes den alltid sammen med en svart kant eller svart understrek (13,7:1), og det er den svarte delen som oppfyller WCAG 1.4.11.

**Styrker**
- Sterkest på universell utforming: kontrast, synlig fokus, store trykkflater og en lesevei som følger DOM-rekkefølgen (NFR-1, kriterium 4).
- «Hva skjer nå?» reduserer usikkerhet før hvert modellkall, og feiloppsummeringen gjør det lett å rette feil (FR-29, FR-30).
- Enkelt å bygge med standard HTML-elementer. Mobil og desktop er nesten like (NFR-2).

**Svakheter og risiko**
- Nøkternt uttrykk med lite særpreg. Det kan oppleves kjedelig for unge brukere.
- Store tekster gir lange sider. «Lag tekst» ligger langt nede på gap-analysen.
- Uttrykket ligner offentlige designsystemer. Vi må lage vårt eget og ikke kopiere noe konkret.

## Konsept 3 – Sjekkliste

**Idé:** Hele prosessen er en huskeliste i et fast mørkt sidepanel. På steg 1 viser listen om CV og annonse er lagt inn. På steg 2 står kravene som punkter: fylt sirkel for dokumentert og stiplet ring for det som ikke står i CV-en. Et krav med svar får merket «Svar lagt til», men punktet forblir åpent, fordi et svar ikke er dokumentasjon (FR-13). På steg 3 blir listen brukerens egen sjekkliste før innsending: les gjennom, sjekk at alt stemmer, kopier.

| Token | Verdi | Kontrast |
|---|---|---|
| Blekk (tekst, sidepanel) | `#1E2A4A` på krem `#FBF7F2` / hvit på blekk | 13,3:1 / 14,1:1 |
| Dempet tekst | `#525C72` på krem / hvit | 6,3:1 / 6,7:1 |
| Korall (primærknapp, fokus, lenker) | `#B3360F`, hvit tekst | 6,1:1 |
| Mangler (merke) | `#1E2A4A` på `#FBE4DA` | 11,6:1 |
| Dokumentert (merke) | `#1D5B3A` på `#E3F1E7` | 6,9:1 |
| Feltkant (ikke-tekst) | `#7A8296` på hvit | 3,9:1 (krav 3:1) |
| Typografi | Trebuchet MS for overskrifter, Segoe UI / system-ui for tekst | |
| Former | 14 px hjørner, pilleformede knapper og merker | |

**Styrker**
- Brukeren har alltid oversikt over hvor hun er og hva som gjenstår, også med kravlisten synlig når hun scroller.
- Forskjellen mellom «dokumentert» og «svar lagt til» er visuelt tydelig, og det støtter ærlighetsregelen.
- Sjekklisten «Før du sender» minner brukeren på at hun selv har ansvar for teksten.

**Svakheter og risiko**
- Avhuking kan oppleves som en poengsum («3 av 4 hukt av»). Dette er den største risikoen mot ikke-målet om score (SM-C1). Prikkene er en opptelling og må testes.
- Sjekklisten «Før du sender» er et lite tillegg som ikke står i PRD-en. Den kan sløyfes uten at konseptet faller bort. `[ASSUMPTION]`
- Sidepanelet tar 300 px på desktop og krymper til en stripe på mobil.

## Antagelser felles for alle tre

- `[ASSUMPTION]` Politiattest brukes som eksempel på ansettelsesvilkår. Testpar 1 har ingen vilkår (samme valg som i Helles brief).
- `[ASSUMPTION]` Søknadsutkastet er skrevet for hånd som eksempel på hva mock-svaret kan inneholde. Det bruker bare opplysninger fra CV-en og svaret.
- `[ASSUMPTION]` Testbrukerens e-post `test@supersoker.no` er en plassholder. Den riktige står i README når appen finnes.
- Omskrivingsvalget og «Endre CV eller annonse» er ikke tegnet på mobilskjermen (16). De ligger under «Lag tekst» på samme måte som på desktop.

## Kvalitetssikring

**Utført 2026-11-22**
- Kontrast for alle fargepar i tabellene er regnet ut med WCAG-formelen. All tekst holder minst 4,5:1 og alle feltkanter minst 3:1. Ett unntak er håndtert: gul fokus alene (1,4:1), se konsept 2.
- Skjermbilder i Chrome headless ved 1440 px. Alle fem skjermene i alle tre konseptene er sjekket visuelt.
- Ingen horisontal overflyt ved 375 px (målt i en iframe på 375 px) eller ved 504 px (målt med `scrollWidth`).

**Ikke utført:** test med skjermleser, test på fysisk mobil og brukertest.

## Feil i KI-forslag som ble rettet

- **Oppdiktet påstand i søknadsutkastet.** Claudes første utkast skrev at Ida jobber med kundeservice «hver uke» hos Testvik Mat, men det står ikke i CV-en. Setningen ble endret til «jeg har deltidsjobb med kundeservice hos Testvik Mat.» Dette er samme type feil som ærlighetsregelen i FR-18 skal hindre, og den bør inn i testene for mock-svaret.
- **Feilaktig overflyt på mobil.** De første skjermbildene på 390 px så ut til å flyte over kanten i konsept 2. Det viste seg at headless Chrome ikke tegner smalere enn ca. 500 px, så skjermbildene var kuttet. Ny måling i en iframe på 375 px viste at sidene ikke har overflyt.
- **Gul fokus ga for lav kontrast.** Kontrollen viste at gul fokus alene mot hvit har 1,4:1. Fokus er derfor alltid tegnet med svart kant eller svart understrek.
