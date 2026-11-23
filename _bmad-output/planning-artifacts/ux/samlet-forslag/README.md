# Samlet designforslag for Supersøker

**Dato:** 2026-11-23 · **Laget av:** gruppa med Claude Code (økt hos Elisabeth) · **Status:** forslag til gruppa, ikke vedtatt design

**Se forslaget:** åpne [forslag.html](forslag.html) i nettleseren. Ingen installasjon eller nettforbindelse trengs.

## Bakgrunn

Gruppa sammenlignet de ni konseptene skjerm for skjerm (03, 08, 10 og 16) på [sammenligning/index.html](sammenligning/index.html). Siden har visningene «Alle ni» og «To mot to», og konsepter kan slås ut ett og ett. Bildene er kopiert fra de nyeste versjonene av PR #13, #15 og #18 per 2026-11-23. Innlogging (01) er ikke med, fordi den bare finnes for ett av Mirandas konsepter.

Gruppa slo ut seks konsepter i denne rekkefølgen: Elektrisk og Solnedgang (Elisabeth), Rolig veiviser og Arbeidsbenk med bevis (Helle), og Bold og Stegvis veiviser (Miranda). Disse tre sto igjen:

| Konsept | Laget av | PR |
|---|---|---|
| 2 · Premium / Editorial | Miranda | #13 |
| 3 · Kort og mot | Helle | #15 |
| 3 · Bento | Elisabeth | #18 |

Gruppa ba deretter om ett forslag basert på de tre, og uten mobilvisning.

## Hva er hentet fra hvor

| Element | Fra | Hvorfor |
|---|---|---|
| Papirbakgrunn, serif-overskrifter med kursiv aksent («Se hva du kan *bygge på.*») | Editorial | Gir et gjennomarbeidet, personlig uttrykk og en rolig leseflyt |
| Nummererte steg (*01*, *02*, *03*) med strek under aktivt steg | Editorial | Tydelig fremdrift uten å ta plass |
| «Søknaden din» i sidekolonnen | Editorial | Brukeren ser hele tiden hvilken stilling teksten gjelder |
| Brevet i serif på et eget ark | Editorial | Skiller brukerens tekst fra grensesnittet |
| Manglende krav som bredt kort med gult bånd | Kort og mot | Gult betyr «gjør noe her», ikke «feil». Rødt er forbeholdt ekte feil |
| «Fortell oss kort» med teller og coachende tekst | Kort og mot | Inviterer til å svare uten å presse |
| Bevis-klistremerke for CV-sitater (i fersken-rosa, ikke lime) | Kort og mot | Gjør ærlighetsregelen synlig (FR-11) |
| Fast handlingslinje nederst med primærknappen til høyre | Kort og mot | Neste steg er alltid på samme sted |
| «Oppgitt av deg. Supersøker har ikke kontrollert det.» | Kort og mot | Skiller brukerens svar fra dokumentasjon (FR-19) |
| Dokumenterte krav som fliser side om side (lyseblå, ikke mint) | Bento | Rask oversikt og kortere side |
| Huskeliste i sidekolonnen: krav (steg 2) og «Før du sender» (steg 3) | Bento / Sjekkliste | Brukeren ser hva som gjenstår |
| «Svar lagt til» holder punktet åpent | Bento / Sjekkliste | Et svar er ikke dokumentasjon (FR-13) |

## Farger: ikke lilla og grønt

Den første versjonen brukte aubergine og lime fra Kort og mot og mint fra Bento. Gruppa avviste lilla og grønt, så fargene ble byttet ut 2026-11-23:

| Rolle | Før | Nå |
|---|---|---|
| Primærfarge (knapper, aktivt steg, kursiv aksent, «Du er her», «Valgt») | Aubergine `#4B1D63` | Terrakotta `#A3401C` |
| Dokumentert (flis og hake) | Mint `#DDF3E4` / grønn `#1E6B45` | Lyseblå `#DCEAF7` / blå `#1F4E8C` |
| Bevis-klistremerke | Lime `#D7F57A` | Fersken-rosa `#FFCFC4` |
| Mock-stripe | Lime | Blekk `#1E1A24` med hvit tekst |

Fordi status nå bruker gult (mangler) og blått (dokumentert), forsvinner også risikoen for at fargene leses som rødt og grønt, altså «feil» og «riktig».

**Bevisst utelatt:**

- **Prikkene og «3/4»-tallet** (fra Bento og Editorial). Opptellingen står som en vanlig setning, slik som i Kort og mot. Det reduserer risikoen for at analysen leses som en poengsum (SM-C1).
- **Tung typografi på alle overskrifter** (fra Kort og mot). Serif og en tung sans-serif ble for mye sammen, så den tunge vekten brukes bare på kravtitler.

## Avvik fra PRD: ingen mobilvisning (NFR-2)

PRD-en sier i **NFR-2**: «Kjerneflyten fungerer på mobil og datamaskin. På smale skjermer stables kolonnene, og steglisten viser bare aktivt steg.» Akseptansekriteriene sier også at kjerneflyten skal kontrolleres «på mobil- og PC-størrelse».

Gruppa har bestemt at appen ikke skal brukes på mobil, så forslaget er tegnet for desktop (1280 px). Dette er et avvik fra PRD-en, og det må håndteres før implementering. `[ASSUMPTION]` Begrunnelsen er ikke skrevet ned av gruppa ennå.

**Gruppa må velge én av disse:**

1. **Endre NFR-2** til bare datamaskin, med begrunnelse, og oppdatere akseptansekriteriene. Helles brief antar at målgruppen bruker mobil mest, så den antagelsen må også trekkes tilbake.
2. **Behold et minimum:** ikke design for mobil, men la kolonnene stables på smale skjermer, slik at appen ikke brekker. Det koster lite i CSS og holder NFR-2 delvis oppfylt.

Uansett valg bør beslutningen og begrunnelsen dokumenteres (f.eks. med `bmad-correct-course` eller som en revisjon av PRD-en). Det er nettopp slike sporbare avvik sensor ser etter.

## Designtokens

| Token | Verdi | Kontrast |
|---|---|---|
| Blekk (tekst) | `#1E1A24` på papir `#F6F1E8` / kort `#FFFDF9` | 15,2:1 / 16,8:1 |
| Dempet tekst | `#5A5262` på papir / kort / gul / lyseblå | 6,6:1 / 7,3:1 / 6,6:1 / 6,1:1 |
| Terrakotta (knapp, lenke, kursiv aksent, «Du er her») | `#A3401C` på papir / kort / hvit tekst på terrakotta | 5,6:1 / 6,2:1 / 6,3:1 |
| Mangler: gult bånd | blekk på `#FFC247` | 10,6:1 |
| Mangler: «Fortell oss kort»-flate | blekk på `#FFF0CC` | 15,1:1 |
| Mangler: merke i huskelisten | `#8A5A00` på kort | 5,8:1 |
| Dokumentert: flis | blekk / dempet på lyseblå `#DCEAF7` | 14,0:1 / 6,1:1 |
| Dokumentert: merke og hake | `#1F4E8C` på hvit / lyseblå | 8,3:1 / 6,8:1 |
| Bevis-klistremerke | blekk på fersken-rosa `#FFCFC4` | 12,2:1 |
| Mock-stripe | hvit på blekk `#1E1A24` | 17,1:1 |
| Feil | `#B3261E` på kort | 6,4:1 |
| Feltkant (ikke-tekst) | `#857A8C` på kort / gul | 4,0:1 / 3,6:1 (krav 3:1) |
| Typografi | Georgia for overskrifter, steg-tall og brev, Segoe UI / system-ui for grensesnittet | |
| Former | 20–24 px hjørner på kort og fliser, pilleformede knapper og merker, klistremerket rotert 1,2° | |

Status vises aldri bare med farge: «Mangler dokumentasjon» har tekst og et spørsmålstegn, og «Dokumentert» har tekst og en hake.

## Åpne spørsmål til gruppa

- Skal NFR-2 endres, eller skal appen bare unngå å brekke på smale skjermer? Se over.
- Terrakotta (primærfarge) og feilrødt `#B3261E` ligger nær hverandre. På innloggingssiden står en rød feilmelding rett over en terrakotta knapp. Feilmeldinger har alltid ikon og tekst, men bør feilfargen gjøres tydeligere annerledes?
- Serif (Georgia) i overskriftene kan oppleves formelt. Passer det målgruppen, eller skal overskriftene være sans-serif?
- Klistremerket er rotert 1,2°. Er det sjarmerende eller pynt?
- Bare fire skjermer er tegnet (01, 03, 08 og 10). Feil-, varsel- og kontoskjermene tegnes når retningen er vedtatt, med `bmad-ux` (DESIGN.md og EXPERIENCE.md).

## Kvalitetssikring

- Kontrast for alle fargepar er regnet ut med WCAG-formelen. All tekst holder minst 5,2:1 (også etter fargebyttet) og alle feltkanter minst 3:1.
- Alle fire skjermene er sjekket visuelt på et skjermbilde ved 1440 px.
- **Ikke utført:** test med skjermleser, tastaturtest og brukertest. Skjermene er statiske skisser.

## Kilder

- [Mirandas konsepter (PR #13)](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/13), særlig `DESIGNKONSEPTER.md` og `konsept-2-editorial.html`
- [Helles konsepter (PR #15)](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/15), særlig `UX/helle/konsept-3/konsept.md`
- [Elisabeths konsepter (PR #18)](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/18), særlig `konsept-3-bento.html`
- [PRD](../../prds/prd-supersoker-2026-11-03/prd.md) og [testpar 1](../../../../tests/fixtures/job-applications/01-mangler-sertifikat/)
