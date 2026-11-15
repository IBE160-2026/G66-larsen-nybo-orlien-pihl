# Kontrollrapport – testmateriale

Dato: 2026-11-15. Utført av Codex for Miranda Larsen på `miranda-testgrunnlag`, Windows/PowerShell. Python 3.12 via uv; ReportLab 4.4.5 og pypdf 6.2.0. PRD-/baselinecommiter og opprinnelige filhasher står i [kildegrunnlag.json](kildegrunnlag.json). Leveransens commit identifiseres med `git log -- tests/testgrunnlag/`; rapporten inneholder ikke sin egen commit-hash.

## Gjennomført datakontroll

Kommandoer: `uv run --no-cache tests/testgrunnlag/kontroller.py --lag-pdf` for oppretting og kontroll, deretter `uv run --no-cache tests/testgrunnlag/kontroller.py` for kontroll uten filskriving. Resultat: exitkode 0, alle kontroller bestått. Bibliotekhenting krevde nettverk utenfor sandkassen. Dette var installasjon av kontrollverktøy, ikke et modellkall.

| Kontroll | Faktisk resultat |
|---|---|
| Kildebevaring | 13 filer i originalmappen (README + fire CV/annonse/fasit-par) og PRD samsvarer bytevis med SHA-256 registrert før arbeidet. Ingen originalfil lagt til, slettet eller endret. |
| JSON | Alle fire nye JSON-filer parses uten dupliserte nøkler. Tre scenariofasiter har versjon 1 og «Ikke kjørt». |
| T-8 blandet | Tre kompetansekrav, to dokumentert, ett mangler. `Kundeservice ved disk` og `Norsk – morsmål` finnes ordrett i CV-en. Kravtekstutdrag finnes ordrett i annonsen. Bare førerkort får forventet svarfelt. |
| T-8 bare vilkår | Null kompetansekrav og gap, ingen svarfelt. Politiattest er separat uten status, kilde eller bidrag til kompetansetelling. Egen melding om ingen tydelige kompetansekrav. |
| T-9 | Grunnannonse + seks eksisterende variantfiler, alle med null krav og vilkår. Forventede avklaringsfelt, oppgitte brukersvar og sluttverdier er internt konsistente. Blanke testverdier er faktisk blanke. Avklaringer bruker også andre verdier enn grunnscenarioet; egen konkret retting av allerede funnet stilling er inkludert. |
| PDF-antall/format | Fire ukrypterte PDF-er, én A4-side hver, ingen bildeobjekter. Tekst kan leses ut med pypdf. |
| PDF-innhold | Hele tekstuttrekket fra hver PDF er lik tilhørende originale CV etter normalisering av blanktegn. Utdanning, arbeidserfaring, språk og alle dokumenterende originalfasitsitater finnes i uttrekket. |
| Norske tegn | Antallet av hvert tegn i `æøåÆØÅ` er identisk i hver original-CV og PDF-uttrekket. Tegn som ikke forekommer i originalen skal heller ikke legges til. |
| Git/PDF | Lokal `.gitattributes` behandler PDF-er som binære. De fire staged PDF-blobene er bytevis identiske med kontrollerte arbeidsfiler; ingen linjeskiftkonvertering. `git diff --cached --check` består. |
| Beskyttede filer/lenker | SHA-256 før/etter viser at alle 253 eksisterende uregistrerte filer er urørt. Alle lokale Markdown-lenker i testgrunnlaget peker til eksisterende mål. |

Gjennomlesing av de nye scenarioenes CV-er, annonser og fasiter er utført: kundeserviceerfaringen og norsk morsmål dokumenterer de to kravene; ingen opplysning dokumenterer førerkort eller politiattest. Bare-vilkår-annonsen inneholder ikke kompetansekrav. Alle T-9-annonsene tilbyr jobb/opplæring/lønn uten å stille kompetansekrav; varianter som omtaler to titler eller to arbeidsgivere angir uttrykkelig ikke hvilket alternativ som gjelder. Brukersvarene er testinput som skal gis etter avklaringsspørsmål, ikke en tillatelse til å gjette.

## Begrensning og teststatus

Kontrollskriptet kontrollerer testdataenes struktur og konsistens. Det tester ikke at appen viser riktige meldinger, avviser blanke felt, teller krav riktig eller genererer ærlig tekst. Beskrevne forventninger og `teststatus` i fasitene er ikke observerte appresultater.

- T-1s 24 kombinasjoner i app/mock: **Ikke kjørt**.
- T-8/T-9 analyse, avklaringsfelt, navigasjon og begge resultattyper i app/mock: **Ikke kjørt**.
- T-2/T-3 eller øvrige tester mot ekte KI: **Ikke kjørt**. Ingen modellkall eller kostnader til modelltesting.
- T-4–T-7 og T-10, inkludert feilfiler, tilgangskontroll, tilgjengelighet og annen PC: **Ikke kjørt**.
- Visuell PDF-gjennomgang i PDF-leser og appens egen PDF-parser: **Ikke kjørt**. Programmatisk fulltekstsjekk er utført som beskrevet over.

## Gjenstående arbeid

Miranda skal gjennomgå materialet før publisering. Appens testadapter/mock må senere få eksplisitt støtte for scenarioene; egen tekst i ordinær mock-modus er et fast eksempel og beviser ikke T-8/T-9. Utfør planlagt app-/KI-testing etter [sporbarhetsmatrisen](sporbarhetsmatrise.md), med resultater og avvik registrert. Grenseverdier og tidsregler følger PRD/arkitektur; denne leveransen avgjør dem ikke.
