# Felles brief for designkonseptene (Helle, 2026-11-15)

Denne briefen ble gitt likt til alle tre subagentene, så konseptene dekker de samme sidene med det samme innholdet og kan sammenlignes side for side. Kilder: [PRD](../../prds/prd-supersoker-2026-11-03/prd.md), [UX-prototypen](../prototype-kjerneflyt.html) og [testpar 1](../../../../tests/fixtures/job-applications/01-mangler-sertifikat/).

## Oppdraget

Tre SVG-baserte designkonsepter for Supersøker v1, med tydelig ulik retning. **Brukervennlighet er viktigst**, kreativ variasjon nest viktigst. Gruppa (fire personer × tre konsepter = ni) velger retning før detaljarbeidet, så dette er konseptskisser, ikke ferdige spesifikasjoner. Det er ikke stilt avklaringsspørsmål; antagelser er skrevet ned i hvert konsept.

## Leveranse per konsept (`_bmad-output/planning-artifacts/ux/helle/konsept-N/`)

- `skjermer/NN-navn.svg` – én SVG per skjerm i listen under, med nøyaktig samme filnavn i alle konsepter.
- `index.html` – galleri som viser alle SVG-ene i rekkefølge med skjermnavn og 1–2 setninger om hva skjermen viser.
- `konsept.md` – navn og designretning, målgruppe-begrunnelse, designtokens (farger med hex og kontrastforhold, typografi, avstand, former), sentrale mønstre (stegnavigasjon, statusvisning, meldinger, fokus), styrker, svakheter/risikoer, og en liste over antagelser merket `[ASSUMPTION]`.

## Skjermene (samme liste i alle konsepter)

Desktop-skjermer er 1440 px brede, mobilskjermer 390 px. Høyden tilpasses innholdet.

| Fil | Innhold | Krav |
|---|---|---|
| `01-logg-inn.svg` | Innlogging med e-post og passord, lenke til «Opprett konto», hint om testbruker (se README), feilmeldingen for feil e-post/passord vist | FR-2, FR-3 |
| `02-opprett-konto.svg` | Opprett konto med valideringsfeil: e-post beholdt, passord tømt, melding om minst 8 tegn | FR-1 |
| `03-cv-og-annonse-tom.svg` | Steg 1 i tom tilstand: CV (veksle «Lim inn tekst» / «Last opp fil»), annonsefelt med hjelpetekst, «Last inn eksempel (testpar 1)», «Analyser kravene» | FR-4, FR-7, FR-27 |
| `04-cv-og-annonse-utfylt.svg` | Steg 1 etter opplasting av `cv-ida.pdf`: innlest tekst i redigerbart felt, PDF-påminnelse om kolonner og overskrifter, annonse utfylt, tegnteller | FR-5, FR-7 |
| `05-cv-og-annonse-feil.svg` | Feiltilstander: fila kan ikke leses (navngir fila, tilbyr ny opplasting/innliming) og tomt annonsefelt (melding ved feltet, merket ugyldig, fokus der) | FR-4, FR-6, FR-8 |
| `06-tittel-og-arbeidsgiver.svg` | Funnet stillingstittel vises og kan rettes; arbeidsgiver ble ikke funnet og etterspørres med forklaring | FR-9 |
| `07-analyserer.svg` | Venting: «Analyserer …», knappen deaktivert, inndata synlig/beholdt | FR-30 |
| `08-gap-analyse.svg` | Kjerneskjermen. Overskrift med tittel og arbeidsgiver, oppsummering «3 av 4 kompetansekrav er dokumentert i CV-en», manglende krav først med valgfritt svarfelt (utfylt), dokumenterte krav med sitat, egen seksjon for ansettelsesvilkår, omskrivingsvalg, «Lag tekst», «Endre CV eller annonse» | FR-10–FR-15 |
| `09-gap-tomtilstander.svg` | To varianter på samme ark: «Alle kompetansekrav i annonsen er dokumentert i CV-en.» (testpar 4) og «Vi fant ingen tydelige krav i annonsen …» | FR-10, FR-14 |
| `10-soknadsutkast.svg` | Helt søknadsutkast i redigerbart felt, listen «Teksten bygger på» ved siden av, «Kopier tekst» med bekreftelsen «Kopiert. Lim inn teksten der du skriver søknaden.», melding om sletting ved utlogging | FR-16, FR-19, FR-20 |
| `11-forslag-til-formuleringer.svg` | Forslag som liste, veiledning utenfor teksten merket «Veiledning – ikke del av søknaden», «Teksten bygger på» | FR-17, FR-19 |
| `12-endre-cv-dialog.svg` | Bekreftelsesdialog: svar, gap-analyse og tekst (også egenredigert) forkastes; «Avbryt» og bekreft | FR-21 |
| `13-feil-fra-sprakmodell.svg` | To varianter: tidsavbrudd («Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» + «Prøv igjen») og ugyldig analyse (sitat kunne ikke bekreftes) | FR-30 |
| `14-leverandorvarsel.svg` | API-modus: varsel før første modellkall som navngir leverandøren og må bekreftes | FR-25 |
| `15-oktvarsel.svg` | Varsel ved 25 min med «Fortsett økten», og innloggingssiden etter automatisk utlogging med forklaring om at data er slettet | FR-22, FR-23 |
| `16-mobil-gap-analyse.svg` | Gap-analysen på 390 px: kolonner stablet, steglisten viser bare aktivt steg | NFR-2 |
| `17-mobil-tekst.svg` | Søknadsutkastet på 390 px med «Teksten bygger på» og «Kopier tekst» | NFR-2 |

## Faste regler fra PRD-en som alle konsepter må følge

- Tre steg etter innlogging: **1 CV og annonse → 2 Gap-analyse → 3 Teksten**. Steglisten er synlig på desktop; på mobil vises bare aktivt steg.
- Hver side viser at **mock-modus er på og at ingen tekst sendes til en språkmodell** (unntak: skjerm 14, som viser API-modus).
- «Logg ut» er tilgjengelig fra alle sider etter innlogging.
- Status vises med **tekst og ikon/form, aldri bare farge**. Ordene er «Dokumentert» og «Mangler dokumentasjon». Teksten sier at kravet *ikke står i CV-en*, aldri at brukeren mangler kompetansen.
- Ingen poengsum, prosent, match-score eller rangering (ikke-mål og SM-C1). «3 av 4» er en opptelling, ikke en karakter.
- Ingen chat-grensesnitt (ikke-mål §6).
- Alle skjemafelt har synlige etiketter. Vis synlig fokusring på minst ett element per skjerm der det er naturlig. Kontrast WCAG 2.1 AA.
- All UI-tekst på norsk bokmål, med knappetekstene slik PRD-en skriver dem: «Analyser kravene», «Lag tekst», «Kopier tekst», «Endre CV eller annonse», «Prøv igjen», «Fortsett økten», «Last inn eksempel (testpar 1)».
- «Helt søknadsutkast» er forhåndsvalgt, med beskrivelsen «Et sammenhengende brev du redigerer selv.»; «Forslag til formuleringer» har «Setninger du kan bruke i ditt eget brev.».

## Felles innhold (testpar 1, fiktivt)

- **CV:** Ida Testesen, sykepleierstudent 2. år, Høgskolen i Testvik. Butikkmedarbeider (deltid) Testvik Mat; besøksvenn Røde Kors besøkstjeneste; gruppeprosjekt i helsefremmende arbeid (kurs om fallforebygging); Norsk – morsmål, Engelsk – godt; førstehjelpskurs Røde Kors (2024).
- **Annonse:** «Sommervikar i hjemmetjenesten – Testvik kommune», juni–august, turnus.
- **Krav og status:**
  - Førerkort klasse B — *Mangler dokumentasjon*. Svar fra brukeren: «Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.»
  - Gode norskkunnskaper, muntlig og skriftlig — *Dokumentert*, sitat «Norsk – morsmål»
  - Erfaring med eller interesse for å jobbe med mennesker — *Dokumentert*, sitat «Besøksvenn, Røde Kors besøkstjeneste»
  - Gode samarbeidsevner — *Dokumentert*, sitat «Gruppeprosjekt i helsefremmende arbeid»
- **Ansettelsesvilkår:** testpar 1 har ingen. For å vise komponenten brukes «Politiattest» som illustrasjon, merket i `konsept.md` som `[ASSUMPTION]`.
- **Søknadsutkastet** nevner tittel og arbeidsgiver, bruker besøksvenn- og gruppeprosjekt-eksemplene, bevarer at hun *ikke* har førerkort ennå (oppkjøring i april), og signeres «Ida Testesen».
- **Leverandør i skjerm 14:** OpenAI (PRD §8 nevner `gpt-5-mini`). `[ASSUMPTION]`
