# Kvalitetsgjennomgang av PRD – Supersøker (2026-11-12)

Gjennomgått mot `.claude/skills/bmad-prd/assets/prd-validation-checklist.md`, brief.md og tilbakemelding-prd.md, etter revisjonen på branch `prd-revisjon-tilbakemelding` (commit 7697495). Gjennomgangen ble gjort av hovedagenten, uten underagenter.

## Samlet vurdering

Revisjonen løser faglærers punkt 4.2–4.5 og gjør beslutningene tydeligere. Prioriteringen fra punkt 4.1 har imidlertid laget tre nye motsetninger: FR-6, FR-14 og FR-28 er merket «bør», men ferdigkriteriene og briefens suksesskriterier forutsetter dem. Lengden er nesten uendret (7110 → 6960 ord), så faglærers ønske om en betydelig kortere PRD er ikke oppfylt.

## Beslutningsklarhet – sterk

Vedtakstabellen i §9 viser fase og berørte krav. Reserveregelen og kostnadsoverslaget gjør at NFR-8 kan følges. Vedtak 10, 12 og 13 venter på gruppas godkjenning, men PRD-en sier bare at de «ble tatt 2026-11-12».

### Funn
- **medium** Godkjenningsstatus for vedtak 10–14 er ikke synlig (§9, siste avsnitt). *Retting:* Skriv at vedtakene godkjennes av gruppa gjennom PR-en.

## Substans – sterk

Ingen nye funn. Kostnadsoverslaget har konkrete tall.

## Strategisk sammenheng – god

### Funn
- **high** FR-6 «bør» er i strid med SM-2 og briefkriterium 2 (§4.2, §8). Briefen krever at «filer uten lesbar tekst gir en forståelig melding», og SM-2 er et ferdigkriterium (§7.3). *Retting:* Sett FR-6 til «må».
- **medium** FR-14 «bør» er i strid med §7.3 («Alle fire testpar fungerer i mock») og T-1. Testpar 4 er nettopp tilfellet der alle krav er dokumentert. Uten FR-14 er det uklart hva brukeren ser. *Retting:* Sett FR-14 til «må». Kravet er lite.
- **medium** FR-28 «bør» svekker ærlighetstesen og SM-8. Uten FR-28 kan sensor lime inn egen tekst i mock-modus og få et testpar-svar som ser ut som en analyse av teksten. *Retting:* Sett FR-28 til «må».

## Testbarhet – god

Startverdiene gjør FR-4, FR-7, FR-13 og FR-30 testbare.

### Funn
- **low** NFR-2 har ingen skjermbredder. §7.3 viser til «dokumenterte mobil-/PC-størrelser» som ikke er definert noe sted. *Retting:* Overlat til UX (DESIGN.md), eller angi for eksempel 360 px og 1280 px.

## Scope og avgrensning – god

### Funn
- **low** «Endre CV eller annonse» uten faktisk endring gir en ny betalt analyse med uendret inndata (FR-21). Det ligger tett opp mot utsatt vedtak 6. *Retting:* Godta det, eller skriv at ny analyse bare kan startes når CV eller annonse faktisk er endret.

## Brukbarhet for neste fase – god

### Funn
- **medium** Lengden er nesten uendret, ca. 6960 ord (tilbakemelding 4.4). Tunge deler: T-tabellen, FR-27 og FR-30. *Retting:* Kort ned i språkvasken uten å fjerne krav.
- **low** Briefen navngir de to resultatfeltene «Gap-analyse» og «Søknadsbrev/forslag». PRD-en gjør det ikke. *Retting:* Overlat til UX.

## Formtilpasning – god

Én UJ er tilstrekkelig. Sensorreise er ikke lagt til (begrunnet i addendum).

## Mekaniske notater

- FR-1–FR-30, NFR-1–NFR-8, T-1–T-10, SM-1–SM-8 og SM-C1–C2 er kontinuerlige. Alle 30 FR-er har prioritet.
- `[ASSUMPTION]`: fem inline (FR-4, FR-7, FR-13, FR-30, §8). Alle står i §10.
- Lokale lenker fungerer. Gamle begreper («Lag søknadsbrev», «Brevet bygger på», «KI-utkastet», «utdatert») finnes bare i vedtakstabellen.

## Kildesjekk mot brief.md

Ingen krav fra briefen mangler. Eneste avvik er FR-6 (se over). Briefens punkt om «beskyttelse ved overføring» og om at modellkall samles i én modul står i addendum, til arkitekturen.

## Utfall (2026-11-12)

- FR-6, FR-14 og FR-28 er satt tilbake til «må». Alle FR-er er nå «må», og «bør» gjelder bare enkeltpunkter i FR-22 og FR-30.
- FR-21: ny analyse kan bare startes når CV eller annonse faktisk er endret.
- §9 sier at vedtak 10, 12 og 13 godkjennes av gruppa i PR-en.
- NFR-2 overlater skjermbreddene til UX. Navnene på resultatfeltene overlates også til UX.
- Innstrammet til ca. 6160 ord (−13 % fra 7110), uten at krav eller testbare konsekvenser er fjernet. Målet på 20 % ble ikke nådd: kravinnholdet bestemmer lengden.
