# Testpar for gap-analyse og søknadsbrev

Fiktive par av CV og stillingsannonse med kjent fasit. De brukes til å sjekke at gap-analysen finner riktige gap, og som grunnlag for mock-svar og automatiske tester. Se suksesskriteriene i product brief.

**Alle personer, arbeidsgivere og adresser er oppdiktet.** Ekte CV-er skal aldri legges her.

## Innhold i hvert par

| Fil | Innhold |
|---|---|
| `cv.txt` | Fiktiv CV som ren tekst |
| `annonse.txt` | Fiktiv stillingsannonse som ren tekst |
| `fasit.json` | Forventet resultat: stillingstittel, arbeidsgiver og hvert krav i annonsen med status `dekket` eller `mangler` |

I `fasit.json` er `kilde` en tekstbit som står ordrett i `cv.txt`, og som viser hvor et dekket krav er dokumentert. Testene kan dermed sjekke at appen peker på riktig sted i CV-en.

## Parene

| Par | Tester |
|---|---|
| `01-mangler-sertifikat` | Ett manglende sertifikat (førerkort B); resten dekket |
| `02-mangler-verktoy` | Manglende verktøykompetanse (TIG-sveising), og et krav som er dekket med andre ord («Office-pakken» / «Word og Excel») |
| `03-studieprosjekt-dekker-krav` | Et krav (planlegge arrangementer) som bare er dokumentert i et studieprosjekt, og et manglende språkkrav (tysk) |
| `04-alle-krav-dekket` | Alle krav dokumentert: appen skal melde null gap og ikke finne på krav. Førstehjelpskurset dekker her et ekte krav (i par 1 var det en felle) |

## Ideer til flere par

Begge ideene avhenger av hvordan gap-analysen skal oppføre seg, og er derfor flyttet til «Innspill til PRD» i product briefens `addendum.md`. Par lages først når PRD har bestemt fasiten.

- **Krav som ikke kan dokumenteres i en CV**, for eksempel politiattest, som leveres etter ansettelse. Appen bør trolig ikke melde slike krav som gap. Det krever en egen kategori («vilkår ved ansettelse») som product brief ikke har.
- **Gråsoner med svake kunnskaper**, for eksempel «Tysk – grunnleggende fra ungdomsskolen» mot kravet «kunnskaper i tysk». Holdt utenfor par 3 fordi testpar bør ha en entydig fasit.
