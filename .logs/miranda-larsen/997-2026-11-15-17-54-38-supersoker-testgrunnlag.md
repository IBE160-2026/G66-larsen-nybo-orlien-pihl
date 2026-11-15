# Supersøker – testgrunnlag

## 2026-11-15 kl. 17:54 — Miranda Larsen

### Oppgave
Gjennomføre brukerens godkjente plan for selvstendig testgrunnlag på `miranda-testgrunnlag`, med prioritet T-8, T-9 og tekstbaserte PDF-varianter til T-1. Bevare eksisterende testpar, fasiter, andre brukeres filer og eksisterende uregistrerte filer. Ingen push eller merge; testarbeidet skal gjennomgås av Miranda før publisering.

### Plan
- Følge godkjent plan fra samtalen: nytt materiale bare under `tests/testgrunnlag/`, sporbarhetsmatrise T-1–T-10, supplerende scenarioer og fasiter samt fire PDF-er.
- Kontrollere data, ordrette sitater, vilkår og PDF-uttrekk separat fra app- og KI-testing. Markere ikke utførte tester «Ikke kjørt».
- Lese prosjektregler, tidligere logg og issues.md, og starte bmad-build etter skillens instruksjon.

### Resultat
Aktiv branch bekreftet som `miranda-testgrunnlag`. Lest sesjonsloggreglene, Mirandas tidligere PRD-logg og issues.md. Ingen eksisterende prosjektfiler hadde sporede endringer ved kontroll; eksisterende uregistrerte filer ble ikke endret.

Brukeren godtok planen fra forrige skrivebeskyttede gjennomgang. Dette er godkjenning av fremgangsmåten, ikke av testresultater eller nytt testmateriale.

Oppstart av `.agents/skills/bmad-build/SKILL.md` gjennom pålagt render_skill.py-kommando feilet med exitkode 1 og `HALT: missing config value communication_language`. Skillen krever uttrykkelig stopp ved feil og forbyr å kjøre workflow-kilden direkte. Ingen konfigurasjon er endret for å omgå stoppet. En parallell miljøkontroll viste også at `python.exe` ikke kunne kjøres («Ingen tilgang til filen»); tilgjengelige PDF-biblioteker er derfor ikke avklart.

Ingen testmaterialfiler er opprettet. Eksisterende testpar og fasiter er urørt. Ingen kontroll av nye fasiter eller PDF-uttrekk er utført. App-, mock-, KI- og installasjonstester: Ikke kjørt. Kun denne loggen og oppdatert issues.md inngår i separat lokal loggcommit. Ingen push eller merge.

### Åpne punkter
- Avklare manglende `communication_language` i byggskillens konfigurasjon før arbeidsflyten kan startes igjen. Deretter gjennomføre godkjent plan for testgrunnlaget; data- og PDF-kontroller samt app-/KI-tester er ikke utført.

## 2026-11-15 kl. 18:04 — Miranda Larsen

### Oppgave
Utføre brukerens uttrykkelige kommando `git cherry-pick b265f37` på aktiv branch.

### Plan
- Kontrollere branch, arbeidskopi og kildecommit, utføre cherry-pick og kontrollere resultatet.
- Dokumentere handlingen i egen sesjonslogg og oppdatere issues.md.

### Resultat
Cherry-pick utført uten konflikt på `miranda-testgrunnlag`; ny commit er `bb30f49`. Kun `_bmad/custom/config.toml` ble endret: `communication_language = "Norwegian Bokmål"` under `[core]`. Brukeren ba uttrykkelig om å hente denne endringen; ingen ny selvstendig produktbeslutning er tatt.

Kontrollert commitens diff og Git-status etterpå. Eksisterende uregistrerte filer og de fire testparene er urørt. Den tidligere manglende konfigurasjonsverdien er nå lagt inn; byggskillen er ikke startet på nytt, så vellykket workflow-oppstart er ikke verifisert. Ingen app-, KI- eller PDF-tester er kjørt. Ingen push eller merge. Denne fortsettelsen og issues.md committes separat som lokal loggcommit.

### Åpne punkter
- Gjennomføre godkjent testgrunnlagsplan og kontrollere byggskillens oppstart med den nye konfigurasjonen. Data-, PDF-, app- og KI-tester er fortsatt ikke utført.

## 2026-11-15 kl. 18:31 — Miranda Larsen

### Oppgave
Etter godkjent videreføring: bruke bmad-build til å ferdigstille selvstendig testgrunnlag for T-1, T-8 og T-9, med sporbarhet T-1–T-10. Bevare originalparene og eksisterende uregistrerte filer; lage separate lokale commits for testmateriale og egen logg. Ingen push, merge eller publisering før Mirandas gjennomgang.

### Plan
- Følge [godkjent intensjon og BMAD-spec](../../tests/testgrunnlag/spec-testgrunnlag.md), med PRD §8 som kravkilde og tidligere gjennomgang i denne loggen som kontinuitet.
- Registrere kildehasher, opprette fire PDF-er, to T-8-scenarioer og T-9 med grunnannonse og seks varianter under `tests/testgrunnlag/`.
- Kontrollere JSON, sitater, krav/vilkår, PDF-tekst og norske tegn; gjennomføre BMADs aktive oneshot-gjennomgang og rette funn før separat testcommit.

### Resultat
BMAD-rendering besto med exitkode 0 og `communication_language = "Norwegian Bokmål"`. Brukerens godkjente gjennomføringsbeskjed ga ingen uavklarte intensjonsvalg. Onesho­t-rute brukt for avgrenset, additiv dataleveranse uten appendringer. Specen er lagt under testgrunnlaget etter brukerens mappekrav. Eksisterende uregistrerte filer var kjent og uttrykkelig unntatt fra endringer; ingen slik fil ble inkludert.

Opprettet 26 filer under `tests/testgrunnlag/`: README, sporbarhetsmatrise, kontrollrapport, BMAD-spec, kildegrunnlag med SHA-256, kontroll-/PDF-skript, lokal `.gitattributes`, fire tekstbaserte PDF-er og scenariofiler. T-8 har blandet kompetanse/politiattest (to dokumenterte krav, ett manglende) og bare politiattest (null kompetansekrav). T-9 har felles CV, grunnannonse, seks varianter for manglende/tvetydig tittel/arbeidsgiver og fasit med konkrete brukeravklaringer/rettinger. Bare nye fiktive personer og arbeidsgivere er brukt.

Faktiske datakontroller: `uv run --no-cache tests/testgrunnlag/kontroller.py --lag-pdf` besto; kontroll uten generering besto, også etter alle reviewrettinger. Alle fire JSON-filer parses uten dupliserte nøkler. Krav- og vilkårstekstutdrag finnes i annonser; dokumenterende CV-sitater er ordrette. Kompetanseopptelling, separat politiattest, T-9-felt og sluttverdier er kontrollert. Gjennomlesing bekreftet sitatenes relevans og at bare-vilkår/T-9 ikke har kompetansekrav. Dette er vurdering av konstruerte testdata, ikke modellkvalitet.

PDF-kontroll med pypdf: fire ukrypterte énsides PDF-er uten bilder, hele tekstuttrekket lik original-CV etter normalisering av blanktegn, uendret antall av hvert norsk tegn æøåÆØÅ, og alle dokumenterende originalfasitsitater bevart. ReportLab 4.4.5 og pypdf 6.2.0 er direkte versjonsfestet; transitive avhengigheter er ikke låst. Bibliotekhenting krevde godkjent nettverkstilgang utenfor sandkassen; ingen modellkall. Git oppfattet først PDF som tekst; lokal binærregel rettet dette. PDF-blobene i staging var bytevis lik kontrollerte arbeidsfiler. `git diff --cached --check` og lokale Markdown-lenker besto.

Uavhengig Blind Hunter etter BMAD oneshot fant åtte forbedringer. Alle ble vurdert og godtatt med avgrensede rettinger: scenario/test-ID, mer fullstendig T-9-kontraktkontroll, eksakte stillingsfelt, ulike avklarte verdier for å avsløre hardkoding, konkret retting av funnet stilling, utelatelse av ubesvarte krav/separat veiledning, presis avhengighetsbeskrivelse og samsvar mellom vilkårstekst/kilde. Begrunnelser og grader står i specens Review Triage Log. Ingen reviewfunn er utsatt. Brukeren har godkjent planen; den ferdige leveransen er ikke påstått godkjent av Miranda eller gruppa.

SHA-256 før/etter bekreftet at 13 originale testparfiler og PRD er bytevis uendret. Alle 253 eksisterende uregistrerte filer har uendrede hasher. Ingen av Helles eller Elisabeths filer/logger er endret. Testmaterialet er committet separat i `0d4e84946113d8ea593a7e7251821927a3c5ef10`; kontroll av commitinnhold viser bare de 26 nye filene under testgrunnlaget. Denne loggen og issues.md inngår i egen path-begrenset lokal loggcommit.

App-, mock-, KI-, installasjons- og visuelle PDF-tester: Ikke kjørt. Ingen testadapter eller appkode er implementert. T-1s 24 appkombinasjoner er ikke testet; PDF-uttrekk her beviser ikke appens egen parser. Ekte modellserie og øvrig T-1–T-10 er fortsatt planlagt. Ingen push, merge eller publisering.

Oppstartshindringen og manglende testmateriale er løst i issues.md. Eldre testpunkt er videreført som faktisk app-/KI-testing; omtalen av PRD som draft er samordnet med gjeldende `final`, uten å erklære §10s startverdier bekreftet.

### Åpne punkter
- Miranda skal gjennomgå de nye fasitene, scenarioene og PDF-ene før materialet tas videre.
- Koble scenarioer til testadapter/mock og gjennomføre planlagt app-/KI-testing T-1–T-10, ekte modellserie innenfor budsjettet og dokumentert installasjon på annen PC. Visuell PDF-kontroll og appens PDF-parser er ikke testet.
- PRD §10s startverdier og arkitekturens regler for aktivitet, lagring, grenser/tidsavbrudd og konkret kostnadsplan må fortsatt avklares før berørt implementering/betalte kall.
