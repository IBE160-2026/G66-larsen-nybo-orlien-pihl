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

## Ideer til flere par

- **Krav som ikke kan dokumenteres i en CV**, for eksempel politiattest, som leveres etter ansettelse. Appen bør trolig ikke melde slike krav som gap. Det krever en egen kategori («vilkår ved ansettelse») som product brief ikke har ennå, så det må avklares med gruppa først.
