# Utkast fra Miranda – til gruppevurdering

KI-utarbeidet for Miranda Eriksen Larsen, 2026-11-16. Dette er et beslutningsunderlag, ikke vedtatt arkitektur eller implementasjonsbevis. Les [spinen](ARCHITECTURE-SPINE.md) for dataflyt/regler og [.memlog.md](.memlog.md) for kildeversjoner og vurderingshistorikk.

## To realistiske oppsett

| | A – anbefalt forslag | B – alternativ |
|---|---|---|
| Frontend | HTML/Jinja2, CSS, små JavaScript-moduler servert av FastAPI | Vite `vanilla-ts`, ferdigbygg servert av samme backend |
| Backend/lagring | FastAPI, lokal SQLite for kontoer, pypdf-kandidat, RAM-økter | Samme backend og lagringsregler |
| Fordel for V1 | Én runtime og appprosess; ingen frontendbygg for installasjon. Færre deler å forklare og feilsøke | Typeverktøy og frontendbygg kan gjøre større UI-moduler enklere å vedlikeholde |
| Ulempe | Egen disiplin for UI-tilstand, gjenbruk og redigeringssynkronisering; enkel teknologi gjør ikke sikkerhet automatisk | Python og Node/bygg; utviklingsproxy og separate frontend-/backendkontrakter må vedlikeholdes. Typekontroll må legges til eksplisitt |
| Konsekvens | Passer avgrenset trestegsflyt og README-kravet, men gruppas kompetanse må bekreftes | Aktuelt hvis gruppa vurderer frontendverktøyene som viktigere enn ekstra oppsett |

Dette er en teknisk anbefaling uavhengig av prototypenes teknologi og visuelle uttrykk. [technology.md](../technology.md) er bakgrunn, ikke en tjenesteliste for Supersøker. Betaling, Redis, ekstern dokumentlagring, hosting og e-post er ikke begrunnet av V1. Automatisk mock-fallback ved feilkonfigurert API er forkastet fordi FR-30 krever tydelig feil.

Offisiell [FastAPI Full Stack Template](https://fastapi.tiangolo.com/project-generation/) er vurdert som mulig starter, men dens React/PostgreSQL/Docker-oppsett er større enn A trenger. For B finnes [create-vite med vanilla-ts](https://vite.dev/guide/). Ingen starter er kjørt eller kopiert.

## Forbruksteller og permanent lagring

PRD §3/4.5 sier at bare brukerkontoen lagres permanent. **En appstyrt forbruksteller som overlever omstart er også permanent lagring**, selv uten CV eller bruker-ID. Den er derfor ikke automatisk tillatt. KI-forslaget om en slik teller fra forundersøkelsen trekkes tilbake som standardløsning; det er ikke godtatt av Miranda eller gruppa.

Anbefaling uten nytt app-lagringsunntak: ingen varig teller; betalt modus er sperret ved hver oppstart inntil ansvarlig har avstemt tidligere faktiske kostnader og uavklarte reservasjoner og gitt en avgrenset kjørebevilgning. Innen kjøringen brukes RAM-reservasjon av maksimal kostnad før hvert kall. Bare én koordinert betalende kjøring om gangen foreslås; andre maskiner kjører mock. Leverandørens varsler/budsjettinnstillinger regnes ikke som hard sperre uten verifisering. Ingen konto-/prosjektinnstilling er endret her.

Dette er **ikke ferdig håndheving av NFR-6**: gruppa må avklare hvor et felles regnskap kan ligge, hvem som styrer det, hvordan avbrutte kjøringer avstemmes og hvordan restbudsjett verifiseres uten dobbeltbevilgning. Prosjektets test-/kostnadsdokumentasjon er ikke automatisk et tillatt nytt appdatastore. Alternativt kan gruppa uttrykkelig vedta et minimalt teknisk lagringsunntak og samordne PRD-en senere. Ingen av delene vedtas her. Inntil dette er løst, kan utkastet utvikles/testes i mock, men betalte kall kan ikke erklæres klare.

## Grenser og usikkerhet

Foreslåtte startverdier, **ikke bekreftede grensevedtak**: 2 000 000 filbyte, 10 000 Unicode-kodepunkter hver for CV/annonse, 1 000 per svar (PRD §10 konkretisert med måleenhet). Samlet forespørsel foreslås høyst 16 000 inputtokens inkludert instruksjoner og alle svar, og høyst 2 000 outputtokens per kall. Delgrensene kan derfor være oppfylt selv om samlet forespørsel avvises. Modellens fakturerbare tokenkategorier må inngå i regnestykket; ikke anta at synlig tekst er hele kostnaden.

30 sekunder beholdes som uprøvd timeout-startverdi. Avklaring av stillingsfelt kan gi ekstra kall utover PRD-overslagets 36 per serie; kallene må telles i kostnadsplanen. Modellnavnet `gpt-5-mini` i PRD er foreløpig, ikke valgt her. Modelltilgjengelighet, priser/valuta, tokenberegning, faktisk svartid og PDF-ressursgrenser er ikke målt. Ugyldig/ufullstendig svar avvises heller enn å forlenges automatisk. Alle disse punktene må kontrolleres før API aktiveres.

## Krav og eksisterende testgrunnlag

[Gjeldende PRD](../../prds/prd-supersoker-2026-11-03/prd.md) er final ved `d8502b0`, med merge PR #12 ved `57f72d3`. Kravene er vedtatt; teknisk løsning i AD-1–AD-5 er forslag. Faglærers [tilbakemelding](../../prds/prd-supersoker-2026-11-03/tilbakemelding-prd.md) begrunner enkelhet. [Sensorveiledningen](../../../../.docs/sensorveiledning.md) krever sporbarhet, meningsfulle tester og ren installasjon.

| Område | Krav | Planlagt kontroll, ikke utført her |
|---|---|---|
| Konto og eierkontroll, AD-1/2 | FR-1–3/24, NFR-4/5 | T-6: registrering, hash, feilinnlogging, direkte A/B-forespørsler og CSRF; testbruker etter installasjon |
| Dokumenter og stilling, AD-3/4 | FR-4–9/29, NFR-3 | T-1/5/9: tre innleggingsmåter, feil-PDF, norske tegn, blanke/grenseverdier og avklarte stillingsfelt |
| Analyse og kilder, AD-4 | FR-10–14/30, NFR-8 | T-2/6/8/9: ordrett kontroll av alle sitater, irrelevant ekte sitat vurdert separat, vilkår uten status/opptelling og riktige tomtilstander |
| Tekst og endring, AD-2/4 | FR-13/15–22, NFR-1–3 | T-1/3/4: begge formater, negasjoner, kildegrunnlag, veiledning utenfor kopiering, bekreft/avbryt og ingen kall ved navigasjon |
| Økt, AD-2 | FR-20–24/30 | T-4/6/10: reload med siste redigering, simulert 30-minuttersutløp, lukket fane, logout, sent svar og foreslått restartbegrensning |
| Mock/API og kostnad, AD-4/5 | FR-25–30, NFR-4–6/8 | T-1/3/5/6: scenarioadapter, leverandørbekreftelse, ingen eksterne mock-kall, ingen retries, timeout og sperre ved ukjent restbudsjett |
| Lokal kjøring og UX | FR-3/26/27, NFR-1–3/7/8 | T-7: annen PC etter README, tastatur/skjermleser/kontrast og gruppas skjermbredder; ekte modellserie etter PRD §8 separat |

**Planlagt kildegrunnlagskontroll (AD-4; FR-11/26–28/30, NFR-8; T-1/2/6):** Kontroller at reell analyse bruker CV-versjonen fra selve analysekallet, mens faste mock-resultater bruker scenarioets fiktive CV og testdataversjon. Bytt med vilje scenario/CV-grunnlag og legg inn ett ugyldig sitat blant gyldige: hele resultatet skal avvises også i mock. Manglende grunnlagskobling skal også avvises. Med egen tekst som ikke inneholder eksempelsitatene skal det faste eksemplet fortsatt kontrolleres mot riktig eksempel-CV; kontroller at resultat, sitater og kildevisning navngir eksempelscenarioet og tydelig sier at brukerens tekst ikke er analysert. Dette skal verken gi en falsk analyse av egen tekst eller omgå sitatkontrollen.

**Planlagt loggkontroll (AD-2; NFR-5; T-6):** Bruk særskilte fiktive markørstrenger i CV og svar. Fang appens, rammeverkets og modelladapterens tekniske logger ved normal flyt, ugyldig svar, valideringsfeil, unntak og tidsavbrudd, uten ekte modellkall. Kontroller at markørene ikke forekommer, og gjennomgå loggpunktene for rå payloads, modellsvar og unntaksdetaljer som kan lekke innhold. Bare feiltype/teknisk metadata skal være nødvendig. Prosjektets sesjonslogger fører kontrollens metode, resultat og avvik uten å kopiere markørinnholdet eller appens CV/svar. Dette skiller prosessdokumentasjon fra tekniske kjørelogger. Begge kontrollene er planlagte, ikke utført i denne dokumentrunden.

Originale [fire testpar](../../../../tests/fixtures/job-applications/README.md) ligger på denne branchen. Ekstra materiale refereres bare på `miranda-testgrunnlag` ved **`814eceb047f6002c623d156927111251e9f675ec`**, materialcommit `0d4e849`: [README](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/blob/814eceb047f6002c623d156927111251e9f675ec/tests/testgrunnlag/README.md) og [sporbarhetsmatrise](https://github.com/IBE160-2026/G66-larsen-nybo-orlien-pihl/blob/814eceb047f6002c623d156927111251e9f675ec/tests/testgrunnlag/sporbarhetsmatrise.md). Fire PDF-er og T-8/T-9-fasiter finnes der og skal gjennomgås før gjenbruk. Ingenting er kopiert eller merget. Rapportert datakontroll der er ikke app-/KI-testing her.

## Lokal oppstart som senere leveranse

For A skal implementasjonen senere levere låste Python-avhengigheter, `.env.example`, databaseoppretting og testbruker uten ekstrasteg, og én dokumentert oppstartskommando på loopback med én appprosess. Ingen nøkkel skal kreves for mock; frontendressurser skal være lokale. README må forklare kontolager, tap av RAM-økt ved restart, mock-scenarioer og kommandoer for enhets-, API- og kjerneflyttester. Hemmeligheter og kontodatabase holdes utenfor Git. Eksakte kommandoer skrives først når appen finnes og kan prøves; dette dokumentet later ikke som de allerede virker. Ren-PC-test etter NFR-7 skal registrere versjoner, commit, ansvarlig, tid og avvik.

## Kilder til kandidatvurderingen

Offisiell dokumentasjon kontrollert 2026-11-16. Ingen «nyeste versjon» eller kompatibel låsefil er bekreftet; bibliotekversjoner velges og testes ved implementasjon. pypdf stable viste 7.1.0, mens testgrunnlaget brukte 6.2.0; ingen av dem er valgt som appversjon.

- [FastAPI templates](https://fastapi.tiangolo.com/advanced/templates/): HTML-maler og statiske ressurser støttes; A er en vurdering av prosjektbehov, ikke dokumentasjonens påstand om beste oppsett.
- [FastAPI UploadFile](https://fastapi.tiangolo.com/tutorial/request-files/): kan spole til disk, så opprydding må omfatte rammeverkets opplastingsfil.
- [FastAPI passordhash](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/): Argon2/pwdlib er en dokumentert kandidat. JWT-oppsettet i eksemplet er ikke valgt som øktmodell.
- [SQLite bruksområder](https://www.sqlite.org/whentouse.html): lokal lagring og begrenset skrivekonkurranse passer den foreslåtte demoen; ingen delt nettverksdatabase foreslås.
- [pypdf tekstuttrekk](https://pypdf.readthedocs.io/en/stable/user/extract-text.html): ingen OCR, og dekomprimert innhold kan kreve mye minne.
- [Vite guide](https://vite.dev/guide/): offisiell vanilla-ts-starter; oppgitte Node-minima er 20.19+/22.12+, ikke en anbefaling om hvilken Node-versjon gruppa skal velge. [TypeScript-støtten](https://vite.dev/guide/features.html#typescript) erstatter ikke typekontroll.
- [OpenAI Python SDK retries](https://github.com/openai/openai-python#retries): standard gjentakelser må eksplisitt slås av ved eventuell bruk. Ingen SDK/modell er valgt eller kalt.

## Beslutninger som gjenstår

- Gruppa: A eller B, hash-/øktmekanisme, aktivitetsdefinisjon og restartbegrensning. Test særlig uferdig redigeringslagring ved umiddelbar reload; RAM alene beviser ikke FR-20/22.
- Gruppa: budsjettmekanisme og forholdet til permanent lagring før betalte kall; deretter modell, priser, grenser og målte tidsavbrudd.
- **UX-avhengig:** endelig komponentinndeling, kildepanel/sitatmarkering, dialoger, fokus og testbredder. Ingen av konseptene er valgt. 25-minuttersvarsel og øvrige bør-punkter beholder PRD-prioriteten.
- Miranda: gjennomgang av dette utkastet og eksisterende testmateriale. Dokumentene er draft; BMADs finale og godkjenning som implementasjonsgrunnlag er ikke gjennomført.

Kontrollstatus for denne leveransen registreres i sesjonsloggen og memlog. Dokumentkontroll betyr ikke beståtte app-, sikkerhets-, PDF-, installasjons- eller KI-tester.
