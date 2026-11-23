# Supersøker · Tre visuelle retninger

Oppdatert oppdrag fra Miranda: velge en **visuell retning**, med inspirasjon fra faglærers demonstrasjon av flere ulike designforslag. Konsept 2 og 3 er derfor skjermmockups, ikke komplette funksjonelle prototyper. Ingen retning er valgt.

## Åpne resultatene

Start med [sammenligning.html](sammenligning.html). Dobbeltklikk filen i Filutforsker og åpne i Chrome eller Edge. Ingen server, pakkeinstallasjon eller nettforbindelse trengs.

- [Konsept 1 – Stegvis veiviser](konsept-1-veiviser.html): eksisterende prototype, uendret.
- [Konsept 2 – Premium / Editorial](konsept-2-editorial.html#analyse).
- [Konsept 3 – Moderne / Bold](konsept-3-bold.html#analyse).

De nye forslagene har lenker mellom **CV og annonse**, **Analyse og svar** og **Teksten**. Felter viser faste eksempeldata. «Analyser kravene» og «Lag tekst» bytter bare til neste skjerm; kopieringsknappen og omskrivingsvalget er visuelle komponenter. Ingen data analyseres, genereres eller lagres.

## Felles innhold for rettferdig sammenligning

Alle tre viser Ida Testesen fra prosjektets fiktive testpar 1 og stillingen Sommervikar i hjemmetjenesten hos Testvik kommune.

| Skjerm | Felles tilstand |
|---|---|
| CV og annonse | Samme fulle CV og annonse, samme stillingstittel og arbeidsgiver |
| Analyse og svar | Førerkort B mangler dokumentasjon, tre andre krav er dokumentert med identiske CV-sitater. Svarfeltet er tomt. |
| Teksten | Samme søknadsutkast, signert Ida Testesen, med det ordrette svaret «Jeg har ikke førerkort.» og samme kildegrunnlag |

Tekstvisningen representerer situasjonen **etter** at søkeren har svart. De faste visningene er ikke knyttet sammen av en funksjonell brukerreise. Oppsummeringen 3 av 4 er dokumentasjonsopptelling, ingen matchscore.

Sammenligningssiden bytter samme skjerm og PC-/mobilbredde for alle tre. Bildene av konsept 1 er tatt fra den opprinnelige prototypen i en isolert nettleserøkt, uten å endre kildefiler eller tidligere bilder. Nye bilder ligger i `visuelle/kontroller/`.

## Designvalg

| | 1 · Stegvis veiviser | 2 · Premium / Editorial | 3 · Moderne / Bold |
|---|---|---|---|
| Identitet | Ryddig og trygg | Varm og redaksjonell | Grafisk og energisk |
| Typografi | Segoe UI, tydelige mellomtitler | Georgia med kursiv som aksent; Segoe UI til funksjonstekst | Impact til store overskrifter; Arial til funksjonstekst |
| Farger | Blått, hvitt og lys grått | Papir `#F5F0E7`, oliven `#4B5738`, varm brun `#A3784F` | Blekk `#19191D`, lime `#D9F773`, lilla `#6737D9` |
| Layout | Sentrert stegvis arbeidsflate og avrundede kort | Asymmetrisk, finlinjet dokumentlayout med god luft | Mørkt identitetsfelt, store typografiske flater og kompakte kort |
| Komponenter | Myke hjørner og dempede statuser | Små hjørner, finstrekede sitater og rolige statusmerker | Skarpe kanter, kraftige streker og forskjøvede skygger |
| Styrke | Gjenkjennelig og lett å orientere seg i | Rolig leseflyt og personlig, gjennomarbeidet uttrykk | Tydelig særpreg og sterk prioritering av innhold |
| Avveining | Mer konvensjonelt uttrykk | Mer plasskrevende; serif kan oppleves formelt | Store overskrifter og sterke aksenter kan ta oppmerksomhet fra detaljene |

Typografien bruker lokale skrifter og systemalternativer; ingen Google Fonts eller andre eksterne ressurser lastes inn. Oppsettet på ulike operativsystemer kan variere med tilgjengelige skrifter.

## PRD og avgrensning

Skjermene viser sentralt innhold fra FR-4–FR-9 (dokumenter og stilling), FR-11–FR-13 (kilder og manglende dokumentasjon), FR-15–FR-20 (omskrivingsvalg, ærlighet, tekst og grunnlag). Visuell tilpasning til mobil og tydelig statustekst støtter NFR-1–NFR-3. Mockups dokumenterer ikke at disse funksjonene er implementert.

Ingen nye produktfunksjoner er lagt til: ingen score, CV-råd, chat, eksport, språkvalg eller lagrede søknader. Konto-, feil- og tomtilstander ligger utenfor de tre representative skjermene; de finnes fortsatt i den uendrede prototypen for konsept 1.

Original `README.md` og konsept 1s øvrige filer er bevisst beholdt uendret. Dette notatet beskriver det nye visuelle oppdraget og erstatter ikke historikken.

## Kontroller

**Utført:** 93/93 nettleserkontroller besto i Chrome headless 156 på Windows. Ingen horisontal overflyt ved 375/390/1280/1440 px, ingen JavaScript-unntak eller eksterne HTTP-kall. Felles CV, annonse, sitater og hele søknadsteksten er sammenlignet automatisk mot konsept 1. Skjermnavigasjon, feltetiketter og sammenligningssidens seks skjerm-/breddevalg besto. Ti utvalgte tekstkontraster besto 4,5:1. Kontroll av konsept 1s filhasher og Git-diff bekrefter at tidligere filer er uendret.

20 skjermbilder og [rapporten](visuelle/kontroller/visuell-rapport.json) ligger i `visuelle/kontroller/`. Begge nye analysevisninger er også inspisert visuelt på PC/mobil, sammen med sammenligningssiden. Dette er kontroll av presentasjon, likt innhold og responsivitet, ikke en ny komplett funksjonstest av tre apper. Full skjermlesertest og testing på fysisk mobil er ikke utført.

Kjørbar kontroll fra prosjektroten med lokalt installert Node og Chrome på Windows:

```powershell
node _bmad-output/planning-artifacts/ux/miranda/visuelle/kontroller/visuell-kontroll.cjs
```
