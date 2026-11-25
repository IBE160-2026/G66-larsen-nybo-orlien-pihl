# Felles modellkontrakt for Supersøker V1

**Status: Forslag til gruppevurdering.** Felttyper og underfelter er foreslått for issue #22. Alle fire JSON-eksemplene gjelder [testpar 1](../job-applications/01-mangler-sertifikat/).

## Kontraktversjon

Serverens svar for analyse og tekst har det påkrevde toppnivåfeltet `kontraktversjon` med heltallsverdien `1`. Feltet beskriver formatet til kontrakteksemplene og settes av serveren. Endringer som bryter formatet, krever ny versjon. Mock knytter i tillegg scenario-ID og fixtureversjon til kildegrunnlaget internt etter AD-5, slik at en revisjon av testdata kan identifiseres uavhengig av kontraktformatet.

## Analyse

[analyse.json](analyse.json) viser analysesvaret serveren setter sammen etter validering. Råsvaret fra adapteren inneholder `kompetansekrav` og `ansettelsesvilkar`.

| Felt | Type og regel |
| --- | --- |
| `stilling` | Objekt med `tittel` og `arbeidsgiver`, begge ikke-tomme strenger fra de bekreftede stillingsopplysningene i steg 1 etter FR-9 og AD-3. Serveren setter inn objektet og bruker disse feltene som grunnlag for analyseoverskrift og tekst. |
| `kompetansekrav` | Liste med objekter som inneholder `id`, `krav`, `status` og `kilde`. Listen kan være tom. |
| `kompetansekrav[].id` | Ikke-tom streng som er unik i analysen og brukes til å knytte svar og sitater til riktig krav. |
| `kompetansekrav[].krav` | Ikke-tom streng med et kompetansekrav eller ønske fra annonsen. |
| `kompetansekrav[].status` | `dekket` vises som «Dokumentert». `mangler` vises som «Mangler dokumentasjon» og betyr at CV-en mangler tilstrekkelig dokumentasjon for kravet. |
| `kompetansekrav[].kilde` | Ved `dekket` kreves et ikke-tomt, ordrett sitat fra den aktuelle, rettede CV-teksten. Ved `mangler` kreves JSON-verdien `null`. |
| `ansettelsesvilkar` | Liste med ikke-tomme strenger for vilkår fra annonsen, som krav om politiattest. Listen kan være tom. Vilkår vises uten kompetansestatus, svarfelt eller opptelling. |

Serveren kontrollerer JSON-struktur, påkrevde felt, typer, ID-er, statuser og sitatene mot CV-versjonen analysen gjelder. Ett ugyldig eller manglende sitat avviser hele analysen etter FR-11 og FR-30. Relevansen til ordrette sitater vurderes mot fasiten i T-2.

Vis manglende krav først. Meldingen om at alle kompetansekrav er dokumentert krever minst ett kompetansekrav, og da vises ingen svarfelt. Skill mellom tom analyse og analyse med bare ansettelsesvilkår med de respektive meldingene i FR-10. Begge tekstvalg er tilgjengelige i begge tilfeller etter FR-9 og FR-18.

## Tekst

[Helt søknadsutkast](helt-soknadsutkast.json) og [forslag til formuleringer](forslag-til-formuleringer.json) viser responsen uten brukersvar. [Helt søknadsutkast med negativt svar](helt-soknadsutkast-negativt-svar.json) viser hvordan «Jeg har ikke førerkort» beholdes i teksten og i kildegrunnlaget. Førerkortkravet har fortsatt status `mangler` i analysen, og `svar_gitt` viser at brukeren svarte.

| Felt | Type og regel |
| --- | --- |
| `resultattype` | Streng med verdien `helt_soknadsutkast` eller `forslag_til_formuleringer`. Verdien skal samsvare med brukerens valg. |
| `tekst` | Ikke-tom JSON-streng i begge resultattyper. Søknadsutkastet er et sammenhengende brev. Formuleringsforslagene har ett punkt per linje, med `- ` foran hvert punkt og `\n` som linjeskift i JSON. Dette er innholdet brukeren kan redigere og kopiere. |
| `kildegrunnlag.stilling` | Samme objekt som i den godkjente analysen. |
| `kildegrunnlag.cv_sitater` | Liste med objekter med `krav_id`, `krav` og `sitat`, alle strenger fra dokumenterte krav i analysen. |
| `kildegrunnlag.brukersvar` | Liste med objekter med strengfeltene `krav_id` og `krav` fra analysen og `svar` fra brukeren. Hvert svar er brukerens faktiske, ikke-blanke svar på et manglende krav i den aktuelle søknaden. FR-13 angir 1 000 tegn som startgrense. |
| `kildegrunnlag.manglende_krav` | Liste med objekter med `krav_id` og `krav` fra analysen samt `svar_gitt` (boolsk), beregnet ut fra om brukeren har svart på kravet. |
| `veiledning` | Liste med ikke-tomme strenger, eventuelt tom. Serveren bygger veiledningen regelbasert fra manglende krav og svarstatus. Det avgrenser veiledningen til opplysninger serveren kan utlede fra grunnlaget. Modellens vurdering av usikkerhet inngår derfor ikke i veiledningen. Serveren viser den separat under «Veiledning – ikke del av søknaden». Kopieringsfunksjonen kopierer bare `tekst`. |

Alle feltene i tabellene er påkrevde. Tomme lister brukes når det mangler oppføringer. Kravreferanser må peke på et krav med riktig status i den godkjente analysen. Et svar endrer ikke analysestatusen. Under «Teksten bygger på» vises alle oppgitte svar som brukeropplysninger. For ubesvarte krav vises at de er utelatt fra teksten. Bruk merknaden «Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.»

## Fra råsvar til visning

1. Mock- og API-adapteren leverer samme struktur for analyse. Serveren godkjenner analysen før visning eller bruk til tekst. For tekst leverer adapteren bare `resultattype` og `tekst`. Serveren validerer formen og tekstvalget og setter selv sammen `kildegrunnlag` og `veiledning`. Eventuelle kildepåstander fra modellen gir ingen autoritet som kildegrunnlag.
2. Serveren bygger kildegrunnlaget fra godkjent analyse og faktiske svar i den aktuelle søknaden. Generering bruker den relevante CV-en som grunnlag for søkerens opplysninger, inkludert navnet i brevet. Annonsen gir stillingskontekst. Begge tekstvalg bruker samme faktagrunnlag. Ubesvarte krav utelates fra teksten. Bevar negasjoner, forbehold og nivå i svarene. Utelat påstander med usikkert eller motstridende grunnlag. Et ansettelsesvilkår gir ingen dokumentasjon på at det er oppfylt. Strukturkontroll og ordrett sitatsjekk må suppleres med semantiske kontroller mot fasit og brevsjekkliste.
3. Etter AD-4 bindes analysen til dokumentrevisjonen og genereringen til dokument, analyse, svar og tekstvalg. Serveren publiserer bare for en aktiv økt og en fortsatt gyldig operasjon med gjeldende revisjoner, inkludert godkjent revisjon av egenredigert tekst ved erstatning. Serveren normaliserer tidsavbrudd, leverandørfeil og ugyldige svar internt. JSON-eksemplene viser vellykkede resultater. Ved feil viser serveren en forståelig melding etter FR-30 og beholder gyldige inndata. En eksplisitt ny prøve etter midlertidig feil kan utløse høyst ett nytt kall.
4. Mock er standard. Filene viser testpar 1 uten svar og ett søknadsutkast med negativt svar. FR-27 krever faste varianter med bekreftende, negative og begrensede svar for testpar med gap. For egen tekst i mock vises et tydelig merket fast eksempel med stillingsfelt fra eksempelgrunnlaget og sitatkontroll mot eksempel-CV-en, slik AD-5 beskriver. API-modus krever eksplisitt konfigurasjon og kontroller før utsending etter FR-29 og AD-5.

Kilder er PRD på `main` (FR-9–19 og FR-26–30), [arkitekturen i PR #46](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/pull/46) (AD-3–AD-5) og [forslaget i issue #22](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/issues/22#issuecomment-7139853886).

## Utførte dokumentkontroller

- Alle fire JSON-filer ble lest med Node.js sin JSON-parser. Lokale asserteringer kontrollerte versjon, filreferanser, krav-ID-er, kravtekster og kildegrunnlag. Formuleringsforslagene har fire punktlinjer.
- Analysen samsvarer med annonsen og fasiten for testpar 1. Tre dokumenterte krav har ordrette sitater fra `cv.txt` i analysen og i alle tekstresultatene (FR-11 og FR-19).
- Tekstresultatene ble lest mot testparet og PRD-en. Førerkort er utelatt fra redigerbar tekst uten svar. Med svar beholdes «Jeg har ikke førerkort» i tekst og kildegrunnlag, `svar_gitt` er `true`, og analysestatusen er fortsatt `mangler` (FR-13, FR-18 og FR-19). Veiledningen ligger separat og begge brevene bruker CV-navnet.
- Kjøring av mock, API, servervalidering og kopieringsfunksjon gjenstår til implementasjon.
