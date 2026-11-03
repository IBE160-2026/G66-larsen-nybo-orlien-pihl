# PRD-revisjon på miranda – 2026-11-03

Status: forslag til gjennomgang. Ingen ny gruppegodkjenning, implementering eller test av appen. Helles struktur (§0–§10), brukerreise, FR-1–FR-30, NFR-1–NFR-8 og SM-numre er beholdt. Godkjent funksjonsomfang er bevart.

## Grunnlag

Lokalt prd.md ble sammenlignet med `origin/prd-utkast` ved `4bdab526d79a9e6866e43773a7586032df67274e` og var innholdslikt før revisjonen. Manglende `addendum.md`, `.memlog.md`, `extract-inputs.md` og `research-landscape.md` ble hentet fra den referansen uten merge eller overskriving av eksisterende filer. Helles tekst er bevart; addendum og memlog har særskilte revisjonstillegg.

## Endringer og begrunnelse

| Område | Forbedring | Hvorfor |
|---|---|---|
| §0 og §9 | Entydige kildelenker og skille mellom godkjent brief, Helles utkast og Mirandas forslag | Unngå at nye forslag fremstilles som gruppevedtak |
| FR-4–FR-9 | Uleselige/korrupte filer, blanktekst, opprydding og retting av tittel/arbeidsgiver | Konkret feilbehandling og tryggere faktagrunnlag |
| FR-11, FR-13, FR-18 | Ordrett sitatsjekk med begrensning; negasjoner og usikker kompetanse bevares | Hindre falsk dokumentasjon og overdrevne kvalifikasjoner |
| FR-17 og FR-19 | Veiledning utenfor kopiert søknadstekst; grunnlagslisten gjelder KI-utkastet | Unngå sammenblanding av søknad, råd og automatisk verifisering |
| FR-21–FR-23 | Utdatering, ny generering, varsel før tap og ignorering av sene svar | Hindre gjenbruk av feil grunnlag og tap av egne redigeringer |
| FR-27–FR-30 | Fire mock-scenarioer, samlede grenser, ventestatus, tidsavbrudd og dobbeltklikk | Testbar flyt, feilbehandling og kontroll på betalte kall |
| NFR-7, §7.3 og §8 | Installasjonstest på annen PC, ferdigkriterier og T-1–T-7 | Gjøre V1 etterprøvbar før trinn 2, i tråd med sensorveiledningen |
| §9 | Alle ni spørsmål beholdt, med Mirandas konkrete forslag og konsekvenser | Gruppen beholder beslutningsmyndigheten; ekstravalg blir ikke obligatoriske |

## Avklaringer som gjenstår

Gruppen må behandle §9 og gjenværende antakelser i §10 før relevante stories låses. Særlig politiattestkategori og tredje status endrer klassifisering/fasit; CV-råd ligger i trinn 2. Tre modellrunder skjerper testomfanget og må passe i 100 kr. Manuell regenerering med samme input er valgfri, med forsøksgrense som må vedtas. 30 minutters øktutløp og bevaring ved reload er forslag, ikke tidligere gruppevedtak.

## Kontroll og diff

Siste kvalitetssikring (2026-11-03): FR-13/FR-21 skiller nå mellom navigasjon/redigering og bekreftet oppstart av ny analyse. Endret CV/annonse ugyldiggjør gammel analyse straks; svar fjernes først ved bekreftet ny analyse. Avbrutt bekreftelse beholder utdaterte svar, mens analysefeil etter bekreftelse ikke gjenoppretter dem. FR-11/FR-30 avviser hele analysen ved ett ugyldig eller manglende dokumenterende CV-sitat, med forståelig melding og uten gyldige delresultater. T-4/T-6 speiler reglene.

FR-22/FR-23 og §9 punkt 7 har Mirandas uavklarte gruppeforslag om varsel etter 25 minutter, «Fortsett økten» før utløp og serverhåndhevet utlogging/sletting etter 30 minutter uten aktivitet. Dette er ikke et nytt obligatorisk V1-krav. Tredje status, ekstra brevversjoner og CV-forbedringer er fortsatt mulige senere forbedringer; mock-flyttester og ekte KI-kvalitetstester er holdt atskilt. Struktur og kravnumre er beholdt. Kildelenker og beslutningsstatus er kontrollert; lenken fra Mirandas sesjonslogg til PRD var allerede riktig og er beholdt.

Full PRD-diff mot Helles kildeversjon: [prd-miranda.diff](prd-miranda.diff). Dokumentkontroll og endelig resultat er ført i Mirandas sesjonslogg. Ingen program-, API- eller annen-PC-test er utført her. PRD og underlag holdes utenfor den separate lokale sesjonsloggcommiten. Ingen push eller merge utføres.
