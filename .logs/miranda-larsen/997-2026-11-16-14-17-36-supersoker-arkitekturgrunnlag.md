# Supersøker – undersøkelse av arkitekturgrunnlag

## 2026-11-16 kl. 14:17 — Miranda Larsen

### Oppgave
Miranda Eriksen Larsen ba om å undersøke grunnlaget på `miranda-arkitekturgrunnlag` og foreslå en avgrenset arbeidsplan som Helle, Elisabeth, faglærer og sensor kan etterprøve. Undersøk branch/status, endelig PRD, faglærers tilbakemelding, technology.md, sensorveiledning, UX/beslutninger, eksisterende arkitektur på tilgjengelige fjernbranches og BMAD-konfigurasjon. Koble V1-anbefalinger til FR/NFR/T, skill vedtak fra KI-forslag, gruppeavklaringer og UX-avhengigheter, og foreslå egen utkastmappe uten dokumentoverproduksjon.

Tillatt i denne runden: bare Mirandas sesjonslogg og eventuelt issues.md, med separat lokal loggcommit. Ingen appbygging, arkitekturdokumenter, konfigurasjonsendring, pakkeinstallasjon, betalte modellkall, push, merge eller sletting. Alle eksisterende lokale/uregistrerte filer og andres logger skal bevares. Neste fase krever Mirandas godkjenning.

### Plan
- Lese AGENTS.md, CLAUDE.md, sesjonslogg-skillen, egne eksisterende logger/issues og arkitekturskillen.
- Kontrollere arbeidsbranch og kildeversjoner; sammenholde faktiske GitHub-heads med lokale objekter uten fetch, checkout eller merge.
- Lese krav, historikk, relevante UX- og testunderlag; kontrollere BMADs sammenslåtte konfigurasjon skrivebeskyttet.
- Presentere avgrenset plan med begrunnelser og åpne valg; dokumentere her og vedlikeholde issues.md. Dette er planforslaget, ikke et opprettet arkitekturgrunnlag.

### Resultat

**Identitet, Git og bevaring.** Git-bruker er Miranda Larsen; fullt navn er opplyst av Miranda. Riktig branch var allerede aktiv. Baseline HEAD er `bfee4746e031556c368e06fc329c8ad99fce4abd`, identisk med live `origin/main` kontrollert via `git ls-remote --heads origin`. Lokal main er eldre (`55ef62c`) og er ikke brukt som grunnlag. Staging var tom og ingen sporede arbeidsfiler var endret. Eksisterende uregistrert innhold: `.agents/`, `AGENTS.md`, den gamle briefmappen `brief-AI CV & Job Application Assistant-2026-09-16/` og `prd-miranda.diff`; ingen av disse er redigert eller tatt med i commit. Ingen branch er byttet eller hentet.

**Kilder og versjoner.** Alle lokale prosjektkilder nedenfor er lest fra arbeidskopien ved baseline; diffkontroll viste ingen sporede avvik fra HEAD for planleggingsgrunnlag, sensorveiledning eller TOML-konfigurasjon.

| Kilde | Versjon / siste relevante commit |
|---|---|
| `_bmad-output/planning-artifacts/prds/prd-supersoker-2026-11-03/prd.md` | `d8502b065f84d016cbc656262f2c36afce35b08e`; updated 2026-11-12, status final |
| Samme PRD-mappes `tilbakemelding-prd.md` | `f737643d5ccd670eb72ba9c2d3fb2ecb94870b22`; faglærer vurderte eldre PRD `3cb9919`, ikke dagens revisjon |
| PRD-mappens `addendum.md` og `.memlog.md` | Lest ved baseline `bfee4746`; kronologi skiller gamle forslag fra senere vedtak |
| `architecture/technology.md` | `e3ad7cf6456f9ec5766004bed44ca2e8ddd73a00` |
| `.docs/sensorveiledning.md` | `4590e73f8a8e52780b141113f50837926e134ec1` |
| `ux/prototype-kjerneflyt.html` | `7b648d42d65db9c18922a0145f432f8e177aabd9`; også Elisabeths UX-logg lest |
| Mirandas UX README, DESIGNKONSEPTER og egne UX-/språklogger/issues | `origin/miranda-ux-konsepter` = `e7aa60562b64c7cfd4c8028e42bc561876134e8a` |
| Helles `UX/helle/felles-brief.md` og `oversikt.md` | `origin/helle/konsepter` = `c337acecd13a27930cd8cf23cb233a87d19ed22c` |
| Originaltestparenes README og rot-README | Lest ved baseline `bfee4746` |
| `tests/testgrunnlag/README.md`, sporbarhetsmatrise, kontrollrapport og egen sesjonslogg | `origin/miranda-testgrunnlag` = `814eceb047f6002c623d156927111251e9f675ec`; materialcommit `0d4e84946113d8ea593a7e7251821927a3c5ef10` |
| BMAD module-help, config/scripts, arkitekturskill/customize | Arbeidsbranchens sporede `.claude/skills/bmad-architecture/` og `_bmad/`; brukt `.agents`-skill er innholdslik sporet SKILL.md (diff exit 0) |

PRD-revisjonen ble merget i PR #12 ved `57f72d370e2bff4a22e5ca319d203cef0136ee4d`, som finnes i arbeidsbranchens historikk. Dette underbygger at final-betingelsen om merge er oppfylt; individuelle PR-godkjenninger/kommentarer er ikke kontrollert. Uregistrert AGENTS.md SHA-256: `7A92FEDDA17A67F196A9D5DA302CED4B5D3F7EA70EEE3A0351087BB61CA56A44`; lest `.agents`-SKILL.md: `4A256AFA9C725E0BF5B55961D21774F1EB00011DBE31509E280A955BDB1A5C09`.

**Eksisterende arbeid og begrensninger.** Live liste viste 17 fjernbranches, alle head-hasher samsvarte med tilgjengelige lokale origin-referanser. Filtrær for lokale branches og fjernreferanser samt historikk for arkitekturfilnavn ble undersøkt. Ingen egen Supersøker-arkitekturspine eller DESIGN.md/EXPERIENCE.md ble funnet; technology.md er en referanse for Pytagoras Website V2, ikke et Supersøker-vedtak. UX-forslag finnes hos Miranda og Helle; ingen endelig visuell retning er dokumentert i de leste notatene. Helles konsept 2 foreslår sitatposisjoner og kildepaneler; dette er et UX-avhengig forslag, ikke nytt bindende V1-krav. Mirandas sessionStorage og simulerte innlogging/PDF er prototypevalg, ikke apparkitektur. Arbeidsbranchens gamle prototype bruker blant annet «Lag søknadsbrev» og simulerer PDF; gjeldende PRD har forrang.

Mirandas testgrunnlag har allerede fire PDF-er og T-8/T-9-data på egen branch. Gjenbruk må vurderes etter hennes gjennomgang; ikke lag duplikater. Rapporterte datakontroller på den branchen er ikke kjørt på nytt her og beviser ikke app-, sikkerhets- eller modellkvalitet. Arbeid på andres maskiner, upushede commits uten lokale objekter, private artifacts og PR-/issue-kommentarer kan ikke utelukkes av denne undersøkelsen.

**BMAD-forhåndskontroll.** Relevant arbeidsflyt er `bmad-architecture` (CA), etter PRD/tilgjengelig UX og før epics/stories. Det er en kort arkitekturspine med append-only memlog for begrunnelser og beslutninger; denne runden aktiverer ikke opprettelsen. Coaching anbefales neste fase, med eksplisitt drøfting av tekniske valg. Skillens finale inkluderer lint og faglige gjennomganger; ingen slike arkitekturtester er kjørt nå.

Skrivebeskyttet `resolve_config.py` og `resolve_customization.py` kjørt med eksisterende Python 3.12 og `-B`, begge exit 0. Effektiv core: prosjekt `CV prosjekt`, dokumentspråk `Norwegian`, output `_bmad-output`; planning_artifacts og implementation_artifacts peker korrekt dit. `communication_language` og `user_name` mangler. Eldre YAML inneholder Helle/English og gamle `.docs`-stier, men inngår ikke i resolverens fire TOML-lag. Ingen personlige configlag eller arkitekturoverstyring funnet. Skillen sier at manglende felt får nøytrale standarder og ikke blokkerer; det er derfor ikke påvist en ny HALT i denne arkitekturflyten. Tidligere build-HALT på andre branches skal likevel forebygges før oppstart.

Minste foreslåtte rettelse, ikke utført: `communication_language = "Norwegian Bokmål"` under eksisterende `[core]` i `_bmad/custom/config.toml`. Tilsvarende rettelse finnes på UX-branchen ved `b265f371c7699cd72840a5e1146272abca2df378`; ikke merge hele UX-branchen bare for linjen. Miranda-identitet brukes fra oppdraget; ikke sett teamets user_name til Miranda. Prosjektnavnet er gammelt, men krever ingen rettelse for denne planen. Bind foreslått egen mappe eksplisitt neste fase fremfor standardmønsteret `architecture-{project_name}-{date}`. Konfigurasjonen er urørt.

`python`-aliaset var utilgjengelig og uv-oppslag traff sperret cache. Godkjent eskalert `uv --no-cache python find --offline` fant eksisterende tolk; ingen nedlasting/installasjon. GitHub-lesing feilet først i sandkassen og lyktes etter godkjent lesetilgang utenfor den. Ingen fetch eller endring av remote-referanser.

**Allerede vedtatt, etter gjeldende PRD.** Lokal demo, fiktive dokumenter, én brukerrolle, bare konto permanent, servervalidert CV/TXT/tekst-PDF uten OCR, to kompetansestatuser, separate ansettelsesvilkår, hele analysen avvises ved ett ugyldig dokumenterende sitat, to resultattyper, ærlighetsregel, redigering/kopiering, bekreftet forkasting ved endret CV/annonse, reload-bevaring, serverstyrt sletting ved 30 minutters inaktivitet, eierkontroll, leverandørbekreftelse én gang per økt, standard mock og eksplisitt API, ingen automatiske retries, 100 kr samlet utviklingstestbudsjett, modellserier/reserveregel og README-test på annen PC. Alle FR-er er må; 25-minuttersvarsel og enkelte samtidighetspunkter er bør. Etter-sletting-gjenoppretting er likevel forbudt som må i FR-23. Gamle utdateringsregler og tidligere fire produktantakelser er erstattet; §10 gjelder nå tekniske startverdier/prisantakelser.

**KI-forslag til avklaringer i neste fase – ikke vedtatt av Miranda/gruppa:**

| Tema | Anbefaling og avveining | Sporbarhet |
|---|---|---|
| Frontend/backend/konto | Sammenlign en enkel frontend servert av én modulær backend med separat frontendbygg. Vurder FastAPI fra technology.md som backendkandidat og lokal SQLite for kontoer mot Postgres-alternativet. Færre prosesser/ingen ekstern kontoavhengighet støtter ren lokal oppstart; separat frontend gir mer UI-verktøy, men flere avhengigheter. Fastsett moduler for konto, dokumentinnlesing, økt, analyse/generering, ikke mikrotjenester. Velg hashbibliotek og sikker øktcookie i neste fase. | FR-1–3/24, NFR-4/7, T-6/7 |
| CV/PDF | Egen servermodul for TXT/PDF, innholds-/størrelseskontroll, lesbart uttrekk og rydding av alle opplastings-/tempfiler også ved feil. Vurder pypdf, test faktisk parser mot eksisterende PDF-er og feilfiler. Ingen OCR. Avklar byte/MB og tegntelling før grenseprøver. | FR-4–9/29, NFR-3/5, T-1/5/9 |
| Økt og tilgang | Backend eier midlertidig tilstand i minne, med tidsstyrt rydding uavhengig av fane/forespørsel. Reload henter aktiv økt; restart kan miste økten og må dokumenteres. Ett serverprosesseksemplar er en enkel avgrensning; flere prosesser krever delt øktlager. Ikke lagre dokumenter i kontodatabasen. Definer reell brukeraktivitet og synkronisering av egenredigert tekst; bakgrunnskall/reload skal ikke forlenge økten. Økt-/forespørselsversjon må hindre at sent svar gjenoppretter slettede data. | FR-20–24/30, NFR-4/5, T-4/6/10 |
| Gap/sitater/generering | Én modellmodul med felles kontrakt for mock/API, strukturvalidering og regelbasert ordrett-sjekk mot rettet CV før noe analyseobjekt godtas. Hele ugyldige resultatet avvises. Separate kompetansekrav/vilkår og to tekstformater. Negasjoner/uklare svar bevares; relevans og ærlighet kontrolleres med fasit og ekte modell, ikke substringtesten alene. Definer også hvordan tittel/arbeidsgiver avklares før gap-kallet uten skjulte ekstra kall. | FR-9–19/21/30, NFR-8, T-2/3/4/6/8/9 |
| Mock/API/kostnad | Mock helt lokalt, faste navngitte scenarioer, egen tekst tydelig eksempel. API krever eksplisitt modus+nøkkel+bekreftet varsel; ugyldig oppsett stopper uten stille fallback. Sett samlet input-/outputtak, kostnadsreservasjon før hvert kall og varig forbruksteller uten CV/svar som ikke nullstilles ved logout/restart. Avklar samlet budsjett på tvers av gruppas maskiner, og behandle timeout som mulig belastet kall. Kontoens budsjettinnstilling er et tillegg, ikke dokumentert hard sperre alene. Leverandør, modell, pris/valuta og tokenberegning må verifiseres før betalte kall. | FR-25–30, NFR-4–6/8, T-1/3/5/6; PRD §8/10 |
| Lokal oppstart/test/README | Planlegg låste avhengigheter, .env.example, testbruker og automatisk mock-test uten nøkkel. Gjenbruk testgrunnlagsbranchens data etter gjennomgang. Enhetstester for sitater/tilstand/grenser, API-integrasjon for A/B/utløp og kjerneflyttester i mock; ekte modellserie holdes separat. README skal angi oppstart, seed, moduser, testscenarioer/kommandoer og begrensninger. Annen-PC-test registrerer miljø, commit og avvik. | FR-3/26/27, NFR-1–3/7/8, T-1–10, særlig T-7 |

technology.mds hosting, Redis, Supabase Storage, betaling, e-post, admin og eksterne innholdstjenester er ikke påkrevd for V1. Dens automatiske mock-fallback ved manglende nøkkel strider mot FR-29/30 i eksplisitt API-modus og skal ikke kopieres. Modellnavnet i PRD er foreløpig; ingen ny modell eller versjon er valgt her.

Primærkilder sjekket 2026-11-16 for kandidatenes egnethet, ikke endelig stack-/versjonsvedtak: [FastAPI features](https://fastapi.tiangolo.com/features/) (validering/API-kontrakt), [SQLite bruksområder](https://www.sqlite.org/whentouse.html) (lokal applagring), [pypdf tekstuttrekk](https://pypdf.readthedocs.io/en/7.0.0/user/extract-text.html) (ikke OCR). Dette støtter kandidatvurderingen, men erstatter ikke måling på prosjektets data eller kontroll av valgt starter/avhengighetsversjon neste fase. Ingen modellpriser er revalidert nå.

**Gruppa må ta stilling til:** stack og nødvendig forkunnskap; konto-/hash-/øktløsning; aktivitetsdefinisjon; startverdier, samlet input/output og endelig tidsavbrudd; leverandør/modell og håndheving av felles budsjett; hvilke bør-punkter tiden tillater; eventuell innføring av testgrunnlaget. Miranda må godkjenne konfigurasjonsrettelsen og neste fase. Ingen anbefaling er godtatt på gruppas vegne i denne økten.

**Avhengig av endelig UX:** komponent-/sideinndeling, kildepaneler og eventuell sitatposisjon/markering, dialogutforming, testbredder, leserekkefølge/fokus og presentasjon av feil/venting. Sikkerhetsregler, sletting og kravkontrakter kan avklares før visuelt konsept velges. Ikke la prototypeteknologi eller skissenes ekstra forslag bestemme produktomfanget.

**Foreslått avgrenset arbeidsplan etter godkjenning:**
1. Godkjenn minste språkfiks og kontroller resolveren igjen; avklar samordning med gruppas UX-/testarbeid uten merge nå.
2. Drøft realistiske stackalternativer, eierskap til tilstand og modellgrense; registrer anbefaling, alternativer, begrunnelse og godkjenner.
3. Lag kort utkast med dataflyt, øktlivsløp/tilgang/sletting, modellkontrakt, grenser og kostnadsstopp; koble til FR/NFR/T. Hold UX-valg eksplisitt åpne.
4. Kontroller utkastet mot final PRD, faglærers ønske om enkelhet og sensorens sporbarhet/kjørbarhet; la gruppa behandle valgene før epics/stories eller appbygging. Betalte målinger og implementasjon er egne senere oppdrag.

Foreslått mappe (ikke opprettet): `_bmad-output/planning-artifacts/architecture/miranda-supersoker-v1/`. Bare tre dokumenter: `ARCHITECTURE-SPINE.md` for kort teknisk kontrakt og diagram; `.memlog.md` for kildeversjoner, alternativer, begrunnelser, forslag/vedtak og ansvar; `avklaringer-og-testkobling.md` for lesbar gruppesjekkliste og FR/NFR/T-matrise, inkludert oppstart/README og UX-avhengigheter. Ingen ny generell technology.md, eget dokument per valg eller kopi av PRD/UX/testdata.

**Utførte kontroller:** branch/status/historikk, live remote-heads, fil-/arkitektur- og konfigurasjonsinspeksjon, kildediff og to resolvere. Ingen app-, PDF-, mock-, KI-, sikkerhets-, nettleser- eller installasjonstest kjørt. Tidligere rapporterte tester er bare lest. Bare denne loggen og egen issues.md skal inngå i path-begrenset lokal commit; commitinnhold/status kontrolleres etterpå. Ingen push, merge eller arkitekturopprettelse.

### Åpne punkter
- Miranda må godkjenne neste arkitekturfase og eventuell énlinjes språkfiks; gruppa må ta de tekniske valgene og behandle UX-avhengighetene før de låses.
- PRD §10s tekniske startverdier, brukeraktivitet, midlertidig lagring og samlet kostnadsplan gjenstår før berørt implementering/betalte kall (videreført eksisterende issue).
- Mirandas eksisterende testgrunnlag må gjennomgås før gjenbruk; T-1–T-10 og ekte modell-/annen-PC-testing gjenstår. PDF/T-8/T-9 skal ikke opprettes på nytt (presisert eksisterende testissue).
