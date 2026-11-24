# Supersøker – visuelle konsepter

## 2026-11-15 kl. 11:14 — Miranda Larsen

### Oppgave
Miranda endret oppdraget fra tre komplette prototyper til tre visuelt forskjellige designforslag etter faglærers demonstrasjon. Beholde konsept 1 uendret, lage Premium / Editorial og Moderne / Bold med samme representative innhold, en enkel sammenligningsside og kort dokumentasjon. Ingen push eller merge.

### Plan
- Videreføre [konsept 1-arbeidet](996-2026-11-15-10-50-00-supersoker-konsept-1.md) som uendret referanse. Følge bmad-build med avgrenset oneshot-spesifikasjon i UX-mappen etter brukerens instruks.
- Bruke fiktivt testpar 1 på tre faste skjermer: CV/annonse, gap-analyse og søknadstekst. Bare enkel visningsnavigasjon, ingen nye backend-simuleringer.
- Lage ulike typografiske/layoutmessige uttrykk, kontrollere PC/mobil og likt innhold, dokumentere resultat.
- Se [designvalg](../../_bmad-output/planning-artifacts/ux/miranda/DESIGNKONSEPTER.md) og [BMAD-notat](../../_bmad-output/planning-artifacts/ux/miranda/spec-visuelle-konsepter.md).

### Resultat
Laget konsept-2-editorial.html og konsept-3-bold.html, sammenligning.html, DESIGNKONSEPTER.md og nye støtteressurser under ux/miranda/visuelle. Konsept 2 bruker Georgia/serif, papirtoner/oliven/varm brun, fine streker og asymmetrisk layout. Konsept 3 bruker store kondenserte overskrifter, blekk/lime/lilla, mørkt sidefelt, skarpe kanter og grafiske kontraster. Sammenligningssiden kan bytte alle tre mellom samme skjerm og PC/mobil. Felter og kontroller i konsept 2/3 er statiske og merket; handlingslenker bytter bare mellom faste visninger.

Retningene Premium / Editorial og Moderne / Bold er brukerens bestilling. Konkret typografi, palett og komposisjon er implementerte KI-designforslag, ikke et vedtak om Supersøkers endelige design. Brukeren har uttrykkelig erstattet den tidligere forutsetningen om å godkjenne konsept 1 før bygging av konsept 2/3; dette betyr ikke at konsept 1 nå er valgt eller godkjent som endelig retning.

Utført: bmad-build rendret uten feil. Kontekstfri kildegjennomgang i aktivt Blind Hunter-lag fant ingen underbygde vesentlige avvik. Root fant ved visuell kontroll en skjermselektor som også skjulte body etter skjermbytte. Rettet til section[data-screen]; kontrollverktøyet ble styrket med faktisk synlighetskontroll og kontroll mot blanke bilder. Tilsvarende presentasjonsselektor ble avgrenset til knapper slik at body ikke fikk aria-pressed.

Endelig nettleserkjøring i Chrome headless 156 på Windows besto 93/93 kontroller, rapportdato 2026-11-15T10:12:18.181Z. Identisk CV, annonse, CV-sitater og full søknadstekst ble kontrollert mot konsept 1. Analyse har tomt svarfelt; tekstvisningen representerer neste situasjon med «Jeg har ikke førerkort.» ordrett. Alle nye skjermer og sammenligningssiden har ingen horisontal overflyt ved 375/390/1280/1440 px. Ti utvalgte tekstkontraster besto 4,5:1. Navigasjon, feltetiketter og sammenligningssidens seks skjerm-/breddekombinasjoner besto. Ingen JS-unntak eller eksterne HTTP-kall.

18 nye referansebilder og to sammenligningsbilder er lagret i visuelle/kontroller. Root inspiserte Editorial og Bold på PC/mobil og sammenligningssiden visuelt. Originale konsept 1-filer, README, kildekode og tidligere bilder/rapport er uendret, bekreftet med seks filhasher og tom Git-diff for alle tidligere sporede UX-filer. JS-syntakskontroll og staged git diff --check besto. Ingen full funksjonstest av tre apper, fysisk mobiltest eller full skjermleserrevisjon er utført; ingen slik funksjonell leveranse er bestilt nå.

Lokal designcommit: f5fed24e5c91d907a9be8a7a52e37a21ab806900. Commitinnholdet er kontrollert og omfatter bare nye filer i Mirandas UX-mappe. Andre gruppemedlemmers filer og eksisterende uregistrerte filer er urørt. Ingen push eller merge. Denne loggen og issues.md committes separat etter prosjektregelen.

### Åpne punkter
- Miranda/gruppa skal sammenligne de tre visuelle forslagene og velge eller presisere en retning før videre design- eller utviklingsarbeid.
