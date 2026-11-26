# Supersøker – selvstendig testgrunnlag

Grunnlaget bygger på [PRD-en](../../_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md), særlig FR-4–FR-18 og §8. Se baselinecommit og SHA-256 for originalfilene i [kildegrunnlag.json](kildegrunnlag.json). Brukerens plan er samlet i [BMAD-specen](spec-testgrunnlag.md).

Materialet er klart for Mirandas gjennomgang. Det er ikke appkode, mock-svar eller dokumentasjon på beståtte app-/KI-tester. **Alle app-, mock-, KI- og installasjonstester: Ikke kjørt.** Bare kontroll av testmaterialet er utført; se [kontrollrapporten](kontrollrapport.md).

Alle nye personer, læresteder og arbeidsgivere er fiktive. E-postadresser bruker `example.com`. Ingen attest skal lastes opp eller kontrolleres. De fire [opprinnelige testparene](../fixtures/job-applications/README.md), inkludert deres fasiter, er uendret. Nye scenarioer utvider ikke automatisk PRD-ens serie med fire testpar for ekte modell.

## Filer og bruk

| Område | Innhold |
|---|---|
| [pdf/](pdf/) | Fire tekstbaserte CV-er med samme innhold som originalenes `cv.txt`; lokal `.gitattributes` bevarer PDF-byte ved Git-checkout |
| [T-8 kompetanse og vilkår](scenarioer/t8-kompetanse-og-vilkar/fasit.json) | CV, annonse og fasit: 2 dokumenterte krav, 1 manglende krav, 1 separat politiattestvilkår |
| [T-8 bare vilkår](scenarioer/t8-bare-vilkar/fasit.json) | CV, annonse og fasit: 0 kompetansekrav og 1 separat politiattestvilkår |
| [T-9 uten krav](scenarioer/t9-uten-krav/fasit.json) | Én CV, grunnannonse og seks varianter for stillingsopplysninger |
| [sporbarhetsmatrise.md](sporbarhetsmatrise.md) | T-1–T-10, krav, forventninger, tilgjengelig og manglende materiale |
| [kontroller.py](kontroller.py) | Gjentakbar datakontroll og eksplisitt PDF-generering |
| [kildegrunnlag.json](kildegrunnlag.json) | SHA-256-baseline for de 13 originale testfilene |

## Gjenta datakontrollene

Fra prosjektroten, med `uv` og Python ≥3.11:

```powershell
uv run --no-cache tests/testgrunnlag/kontroller.py
```

Første kjøring henter ReportLab 4.4.5 og pypdf 6.2.0, som har eksakte versjoner i skripthodet. Transitive avhengigheter er ikke låst. Ingen API-nøkkel er nødvendig. Kontrollmodus skriver ikke prosjektfiler. Avvik gir feil og exitkode forskjellig fra 0; bestått kontroll gir `BESTÅTT: datakontroll` og exitkode 0.

Vil du gjenskape de fire PDF-ene, bruk eksplisitt:

```powershell
uv run --no-cache tests/testgrunnlag/kontroller.py --lag-pdf
```

Dette skriver bare PDF-filene i denne mappen og kjører deretter datakontrollene. PDF-ene bruker Helvetica, tekstobjekter og én kolonne, uten bilder. Innholdet er hentet fra originalene uten tillegg. Linjer brytes for å passe A4; hele tekstuttrekket skal være identisk etter normalisering av blanktegn. Antall norske tegn og alle dokumenterende fasitsitater kontrolleres også.

Ved oppstart sammenligner skriptet SHA-256 for de 13 originale testfilene i arbeidskopien med baselinen. PRD-en er en levende kravkilde utenfor hashkontrollen. Et annet Git-oppsett kan gi andre linjeskift ved checkout. Undersøk eventuelle avvik før baselinen endres.

## Fasitenes kontrakt

De tre nye `fasit.json`-filene er testforventninger, ikke et krav til appens interne JSON-/API-format. `schema_versjon: 1` gjelder disse testfilene. Alle har `teststatus: "Ikke kjørt"`.

- `krav` inneholder bare kompetansekrav. `dekket` betyr «Dokumentert», og `mangler` betyr «Mangler dokumentasjon». `annonsekilde` er ordrett fra annonsen; `kilde` er ordrett fra CV-en og finnes bare for dokumenterte krav.
- `ansettelsesvilkar` er en egen liste uten status eller dokumenterende CV-sitat. Vilkår gir aldri kompetansegap, svarfelt eller bidrag til kompetanseopptellingen. T-8-fasitene bruker objekter med `id`, `vilkar` og `annonsekilde` for å kunne spore forventede vilkår til annonsen. Modellkontrakten i `main` bruker en liste med ikke-tomme tekststrenger. Når adapteren bygger mock-svar fra fasitene, skal den bruke `vilkar`-teksten fra hvert objekt som streng i listen.
- `forventet` beskriver opptelling, meldinger og handlinger. Forbudte politiattestpåstander er eksempler på meningsinnhold som ikke skal forekomme, ikke en fullstendig liste for enkel tekstmatching. Begge resultattyper må vurderes semantisk.
- T-9-fasiten gjelder alle sju annonser. `null` i `funnet_stilling` betyr at opplysningen må etterspørres. `brukersvar` er eksplisitt testinput etter at appen spør; dette er ikke noe modellen får gjette. Feltene i `stilling_etter_avklaring` er forventet sluttresultat.

Skriptet kontrollerer struktur, kildeutdrag og intern konsistens. Semantisk relevans og fravær av uuttalte krav er vurdert ved gjennomlesing av de fiktive dokumentene, se rapporten. Verken dette eller faste mock-svar dokumenterer kvaliteten på en ekte språkmodell.

## Planlagt gjennomføring av T-1, T-8 og T-9

Status for alle trinnene under: **Ikke kjørt**. Når en app/testadapter finnes, bruk eksplisitt valgte scenarioer. Dagens nye data er ikke koblet til mock-oppsettet. FR-28 sier at vilkårlig egen tekst i ordinær mock-modus bare gir et merket, fast eksempel; det er ikke gyldig bevis for T-8/T-9.

**T-1:** Kjør hvert originalpar med innlimt originaltekst, original TXT og tilsvarende PDF her. Velg både helt søknadsutkast og forslag til formuleringer: 4 × 3 × 2 = 24 kombinasjoner. Kontroller scenario/fasit, innlest tekst, PDF-påminnelse om leserekkefølge, retting før analyse, navigasjon, redigering og kopiering. PDF-uttrekk med pypdf her erstatter ikke appens egen opplasting og tekstuttrekk.

**T-8:** Last inn CV og annonse for hvert av de to scenarioene i en ny flyt. Sammenlign analysen med fasiten: vilkår separat uten status og svarfelt. Blandet scenario skal gi 2 av 3 dokumenterte kompetansekrav og ett valgfritt svarfelt for førerkort. Uten svar skal teksten ikke påstå førerkort eller godkjent politiattest. Førerkortkravet skal utelates helt fra forslagene; heller ikke «Jeg mangler førerkort» skal legges inn. Veiledning om utelatte krav skal stå utenfor teksten, merket «Veiledning – ikke del av søknaden», og skal ikke følge med «Kopier tekst». Bare-vilkår-scenarioet skal ha den egne tomtilstanden, null kompetansekrav og ingen «alle dokumentert»-melding. Kontroller mulighet til å rette annonsen og til å lage begge resultattyper; ingen av dem skal påstå at politiattestvilkåret er oppfylt.

**T-9:** Kjør grunnannonsen og hver variant i separat flyt med felles CV. Funnet tittel og arbeidsgiver skal vises og kunne rettes. For hvert felt i `etterspor`: kontroller at analyse er blokkert før avklaring, prøv tom streng, mellomrom, tabulator og linjeskift, og kontroller at blankt avvises. Fyll deretter inn `brukersvar`. Kontroller tomtilstandens ordlyd, null krav/vilkår/gap/svarfelt og ingen «alle dokumentert»-melding. Bruk avklart tittel/arbeidsgiver i analyseoverskrift og begge resultattyper, uten oppdiktede krav eller kvalifikasjoner. Kontroller at annonsen kan rettes og at relevant CV-eksempel brukes i helt utkast.

Ved faktisk testing registreres dato, testansvarlig, appcommit, scenario-/testgrunnlagscommit, modus, utførte steg, forventet/faktisk resultat og avvik. Ekte modell krever i tillegg modell-ID og promptversjon, og kostnadsplan innen PRD-ens budsjett før kall. Ikke skriv CV-tekst eller brukersvar til kjørelogger.

I de tvetydige T-9-variantene velger brukersvaret bevisst det andre alternativet: «Besøksvert» og/eller «Fabelvik Sommerverksted». En app som bruker grunnscenarioets verdier skal feile. Kjør også `retting_av_funnet_stilling` i en ny grunnscenario-flyt: rett allerede funnet tittel til «Kontorvikar» og arbeidsgiver til «Fabelvik Øvingskontor» før analyse. Forvent disse rettede verdiene i analyseoverskrift og begge resultattyper. Dette er eksplisitte fiktive brukerrettinger, ikke verdier modellen skal hente fra annonsen.
