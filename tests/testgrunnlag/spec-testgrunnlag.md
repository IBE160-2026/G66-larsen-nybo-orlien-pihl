---
title: 'Supersøker – selvstendig testgrunnlag'
type: 'chore'
created: '2026-11-15'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Brukerens godkjente testplan og gjennomføringsbeskjed 2026-11-15">

## Intent

Supersøker trenger selvstendig testmateriale til endelig PRD: fire tekstbaserte PDF-utgaver av eksisterende CV-er (T-1), to supplerende scenarioer med ansettelsesvilkår (T-8), og et scenario uten kompetansekrav med manglende/tvetydige stillingsopplysninger (T-9). Lag materialet og enkel sporbarhet T-1–T-10 under `tests/testgrunnlag/`. Originale fire testpar og fasiter skal være bytevis uendret. Bruk bare fiktive personer og arbeidsgivere.

Kontroller JSON, kompetansekrav, ordrette og relevante CV-sitater, separat behandling av politiattest, PDF-uttrekk og norske tegn. Dokumenter gjennomførte datakontroller separat fra app- og KI-tester, som merkes «Ikke kjørt». Lag separate lokale commits for testmateriale og Mirandas sesjonslogg; eksisterende uregistrerte filer og andres arbeid skal ikke endres eller inkluderes. Ingen push, merge eller publisering før brukerens gjennomgang.

</frozen-after-approval>

## Implementation Notes

- BMAD renderer uten feil og leser `Norwegian Bokmål`. Ingen uavklarte intensjonsvalg eller irreversible handlinger. Avgrenset, additivt datamateriale uten nye appavhengigheter: oneshot-rute.
- Brukerens mappekrav overstyrer standard plassering av denne specen under implementation-artifacts. Kjente uregistrerte filer er eksplisitt unntatt av brukeren; de blokkerer ikke arbeidet og røres ikke.
- Kilder: PRD §4.2–4.4 og §8, samt `tests/fixtures/job-applications/`. Ingen annen gruppemedlemsfil endres. Kildehashene registreres før oppretting i `kildegrunnlag.json`.
- Leveranse: README, matrise, kontrollrapport, kildegrunnlag, kontroll-/PDF-skript, fire PDF-er og scenariofiler med fasiter. T-9 bruker én felles CV og grunnfasit med navngitte annonsevarianter og forventede avklaringsfelt. Nye fasiter er testkontrakter, ikke en vedtatt app/API-modell.
- Standardfonter og tekstobjekter i PDF, uten rasterbilder. Uttrekk sammenlignes med hele originalteksten etter normalisering av blanktegn; norske tegn og fasitsitater kontrolleres separat.
- Originalene hashes på nytt etter arbeidet. Kontrollskript leser data og feiler ved avvik; bare eksplisitt PDF-generering skriver de fire nye PDF-ene. Ingen app- eller modellkall inngår.
- Fire PDF-er og alle scenarioer er opprettet; kontroller med pypdf og ReportLab består. Git oppfattet først PDF-ene som tekst. Lokal `.gitattributes` under testgrunnlaget retter dette og bevarer PDF-byte i staging/checkout.
- BMAD oneshot har én aktiv gjennomgang: Blind Hunter. Ingen aktive review-lag hoppet over. Full dispatch-gjennomgang er ikke del av den valgte oneshot-ruten.
- Etter alle rettinger er datakontrollen kjørt på nytt med exitkode 0. Alle JSON-filer, scenariofasiter, PDF-tekster, norske tegn og kildehasher består. Lokale Markdown-lenker er kontrollert. Alle 253 eksisterende uregistrerte filer har uendrede SHA-256-hasher. Status `done` gjelder leveransen av testgrunnlag, ikke appens T-1–T-10.

## Review Triage Log

Alle åtte funn fra uavhengig Blind Hunter er vurdert mot filene og rettet med avgrensede endringer; ingen er utsatt:

- low/patch: `scenario` manglet kontroll mot mappenavn. Nå kontrolleres scenario og test-ID samlet. Feil T-8-test-ID ville tidligere også normalt feile i T-9-grenen; sentral kontroll gjør kontrakten eksplisitt.
- medium/patch: T-9-handlinger og bruk av avklarte opplysninger var ikke fullstendig validert. Sentrale boolske regler og de tre bruksstedene valideres nå.
- medium/patch: Fjernede stillingsfelt kunne gi feilaktig bestått kontroll. Krever nå nøyaktig `tittel` og `arbeidsgiver` i funnet, avklart og rettet stilling.
- medium/patch: Identiske sluttverdier kunne skjule hardkodede standardverdier i fremtidige apptester. Tvetydige varianter bruker nå det andre alternativet, med kontroll av faktisk variasjon.
- medium/patch: Retting av funnet stilling manglet konkret input/fasit. Egen retting av begge felt er lagt til og kontrollert; README beskriver separat flyt.
- medium/patch: Ubesvart førerkortkrav var ikke uttrykkelig utelatt fra forslag. Fasit og README angir nå utelatelse og separat veiledning som ikke kopieres, etter FR-17.
- low/patch: Avhengighetsbeskrivelsen kunne oppfattes som fullstendig låsing. Presisert at bare de to direkte bibliotekene har eksakte versjoner; transitive avhengigheter er ikke låst.
- medium/patch: Vilkårstekst kunne avvike fra korrekt kildeutdrag. Skriptet krever nå samme forventede politiattesttekst i begge felt.
