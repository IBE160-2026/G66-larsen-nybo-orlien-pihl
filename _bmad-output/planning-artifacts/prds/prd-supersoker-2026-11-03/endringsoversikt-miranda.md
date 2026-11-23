# PRD Supersøker – gruppevedtak dokumentert 2026-11-07

Status: Gruppas godkjenning av Mirandas ni forslag er opplyst av Miranda, og endringsplanen er godkjent. Dokumentasjonsdatoen er ikke en påstått møtedato. PRD beholdes som `draft` fordi de fire antakelsene i §10 fortsatt er uavklarte. Ingen app-, modell-, PDF- eller installasjonstester er gjennomført i denne økten.

## Grunnlag og sporbarhet

Revisjonen 2026-11-03 videreførte Helles struktur og underlag fra `origin/prd-utkast` ved `4bdab526d79a9e6866e43773a7586032df67274e`. Den revisjonen presenterte ni forslag uten å hevde gruppegodkjenning. Gruppas godkjenning er nå dokumentert i PRD §9 og som en ny oppføring i `.memlog.md`; historiske oppføringer er bevart. FR-1–FR-30, NFR-1–NFR-8, SM-numre og brukerreisen er beholdt.

## Vedtak og endringer

| Punkt | Fase og resultat | Berørte områder |
|---|---|---|
| 1 | V1: Ansettelsesvilkår vises separat, uten kompetansestatus/opptelling eller attestkontroll | Ordliste, FR-10–FR-14, SM-3, T-8 |
| 2 | Utsatt fra V1: Ingen tredje kompetansestatus | §4.3, §7.2, §9 |
| 3 | V1: Ordrett sitatkontroll; ett ugyldig/manglende sitat avviser hele analysen | FR-11/FR-30, T-2/T-6, addendum |
| 4 | V1: Fire testpar i tre påfølgende runder med begge omskrivingsvalg; kostnadsplan før betalte serier, samlet høyst 100 kr | NFR-8, §7.3, §8, addendum |
| 5 | V1: Tomtilstand uten krav tillater retting eller generering uten oppdiktede krav | FR-10/FR-14/FR-18, T-9 |
| 6 | Utsatt fra V1: Ny versjon med uendret inndata; forsøksregler avklares først ved eventuell innføring | FR-21, §7.2, §9 |
| 7 | V1: Varsel ved 25 minutter; serverhåndhevet utlogging/sletting ved 30 minutter uten aktivitet | Øktbegrep, FR-22–FR-23, T-6 |
| 8 | V1: Egenredigert tekst beholdes ved sideoppdatering i aktiv økt; ingen permanent dokumentlagring | FR-20/FR-22–FR-23, T-10 |
| 9 | Trinn 2: CV-råd utenfor søknadsteksten; ingen automatisk CV-redigering | §7.2, §9, addendum |

## Samordning og testplan

- Bare ansettelsesvilkår skilles fra ingen krav/vilkår. «Alle kompetansekrav dokumentert» krever minst ett kompetansekrav; vilkår omfattes ikke.
- FR-30 har uttrykkelig unntak fra feilbevaring for gamle svar/resultater som allerede er forkastet etter FR-21, og data slettet ved utlogging/utløp.
- T-6 omfatter vedtatte øktregler med simulert tid, fortsettelse før/etter utløp, lukket fane og sent modellsvar.
- T-8–T-10 beskriver nye planlagte tester for vilkår/opptelling, ingen krav, manglende/tvetydig/rettet tittel og arbeidsgiver samt sideoppdatering og sletting. Eksisterende testdata er ikke endret. Supplerende scenarioer/fasiter og PDF-varianter må implementeres senere.
- Mock-flyttester og ekte modellkvalitet er fortsatt atskilt. Alle app-/modelltester er planlagt arbeid, ikke utførte tester.

## Gjenværende avklaringer

De fire antakelsene i §10 er fortsatt uavklarte: tittel/arbeidsgiver, obligatoriske felt, bekreftelse én gang per økt før modellkall og kontrastmål. Arkitekturen må definere øvrig brukeraktivitet, midlertidig lagring og konkrete grenser/tidsavbrudd. Kostnadsplan og faktisk kvalitetssikring gjenstår. Punkt 2 og 6 er utsatt; punkt 9 tilhører trinn 2.

## Dokumentkontroll og avgrensning

Gjeldende dokumentdiff kan leses med `git diff -- _bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/`. Den uregistrerte `prd-miranda.diff` er urørt og representerer den tidligere revisjonen. Dokumentkontroll gjelder kravnumre, faseplassering, henvisninger og diff; den dokumenterer ikke appkvalitet. Bare Mirandas egen sesjonslogg og eventuelt hennes `issues.md` inngår i separat lokal loggcommit. Ingen push eller merge.
