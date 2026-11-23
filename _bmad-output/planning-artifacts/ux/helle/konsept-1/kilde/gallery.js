const fs = require('fs'), path = require('path');
const ROOT = process.argv[2];
const items = [
  ['01-logg-inn', 'Logg inn', 'Innlogging etter feil e-post eller passord. Én felles melding som ikke avslører om e-posten finnes, fokus i passordfeltet og et rolig hint om testbrukeren i README.'],
  ['02-opprett-konto', 'Opprett konto', 'Valideringsfeil ved for kort passord: e-posten er beholdt, passordfeltet er tømt, merket ugyldig og har fokus, og meldingen sier hvordan det rettes.'],
  ['03-cv-og-annonse-tom', 'Steg 1 – tom tilstand', 'Første steg uten innhold. Stor stegindikator, tilbud om å laste inn testpar 1, veksler mellom innliming og opplasting, og «Analyser kravene» nederst i Neste-linjen.'],
  ['04-cv-og-annonse-utfylt', 'Steg 1 – utfylt', 'cv-ida.pdf er lest inn og vises som redigerbar tekst, med påminnelse om å sjekke kolonner og overskrifter. Tegntellere for CV og annonse.'],
  ['05-cv-og-annonse-feil', 'Steg 1 – feiltilstander', 'En fil som ikke kan leses, navngis, og tidligere CV-tekst beholdes. Tomt annonsefelt får melding rett ved feltet, rød kant og fokus.'],
  ['06-tittel-og-arbeidsgiver', 'Tittel og arbeidsgiver', 'Funnet stillingstittel kan rettes. Arbeidsgiveren ble ikke funnet, og en markert blokk forklarer hvorfor den trengs.'],
  ['07-analyserer', 'Analyserer', 'Venting: knappen er deaktivert og viser «Analyserer …», og CV-en og annonsen står synlig og uendret.'],
  ['08-gap-analyse', 'Steg 2 – gap-analyse', 'Kjerneskjermen. Opptellingen «3 av 4», manglende krav først som en «gjør dette nå»-blokk med svarfelt, deretter dokumenterte krav med sitat, ansettelsesvilkår og omskrivingsvalg.'],
  ['09-gap-tomtilstander', 'Steg 2 – tomtilstander', 'To varianter: alle kompetansekrav er dokumentert (testpar 4), og ingen tydelige krav i annonsen. Begge kan gå videre til «Lag tekst».'],
  ['10-soknadsutkast', 'Steg 3 – helt søknadsutkast', 'Brevet i et redigerbart felt med «Teksten bygger på» i en smal sidekolonne. Bekreftelsen «Kopiert.» og påminnelsen om sletting ved utlogging.'],
  ['11-forslag-til-formuleringer', 'Steg 3 – forslag til formuleringer', 'Forslag som liste. Veiledningen står i en egen boks merket «Veiledning – ikke del av søknaden» og følger ikke med ved kopiering.'],
  ['12-endre-cv-dialog', 'Endre CV eller annonse', 'Bekreftelsesdialog som lister hva som forkastes. «Avbryt» har fokus som det trygge valget.'],
  ['13-feil-fra-sprakmodell', 'Feil fra språkmodellen', 'Tidsavbrudd og ugyldig analyse. Meldingen står rett over «Prøv igjen» nederst, og inndataene er beholdt.'],
  ['14-leverandorvarsel', 'Leverandørvarsel (API-modus)', 'Før første modellkall: dialogen navngir OpenAI og sier at ingenting sendes før brukeren bekrefter.'],
  ['15-oktvarsel', 'Øktvarsel og utlogging', 'Varsel etter 25 minutter med «Fortsett økten», og innloggingssiden etter automatisk utlogging med forklaring om at dataene er slettet.'],
  ['16-mobil-gap-analyse', 'Mobil – gap-analyse', 'Gap-analysen på 390 px. Steglisten viser bare aktivt steg, alt er stablet, og knappene har full bredde nederst.'],
  ['17-mobil-tekst', 'Mobil – søknadsutkast', 'Søknadsutkastet på 390 px med åpnet panel «Teksten bygger på» og «Kopier tekst» nederst.'],
];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const nr = (i) => String(i + 1).padStart(2, '0');
const figs = items.map(([f, name, cap], i) => {
  const svg = fs.readFileSync(path.join(ROOT, 'skjermer', f + '.svg'), 'utf8');
  const desc = unesc(svg.match(/<desc id="d">([\s\S]*?)<\/desc>/)[1]);
  const w = +svg.match(/width="(\d+)"/)[1], h = +svg.match(/height="(\d+)"/)[1];
  const mob = w < 600;
  return `    <section class="skjerm${mob ? ' mobil' : ''}" id="${f}" aria-labelledby="${f}-h">
      <div class="tekst">
        <h2 id="${f}-h"><span class="nr">${nr(i)}</span> ${esc(name)}</h2>
        <p>${esc(cap)}</p>
        <p class="fil"><a href="skjermer/${f}.svg">Åpne ${f}.svg i full størrelse</a> <span class="mal">${w} × ${h} px</span></p>
      </div>
      <figure>
        <img src="skjermer/${f}.svg" width="${w}" height="${h}" loading="${i < 2 ? 'eager' : 'lazy'}" alt="${esc(desc)}">
      </figure>
    </section>`;
}).join('\n');
const toc = items.map(([f, name], i) => `          <li><a href="#${f}"><span class="nr">${nr(i)}</span> ${esc(name)}</a></li>`).join('\n');
const html = `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Konsept 1: Rolig veiviser – Supersøker</title>
  <style>
    :root {
      --bg: #F4EFE6; --surface: #FFFDF9; --sand: #EAE2D3; --line: #D9CFBE;
      --ink: #2A2520; --muted: #5B5247; --accent: #34557A; --mark: #F1DC9C;
      --font: Seravek, "Gill Sans Nova", Ubuntu, "Segoe UI", Calibri, "DejaVu Sans", "Helvetica Neue", Arial, sans-serif;
      color-scheme: light;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; scroll-padding-top: 24px; }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
    body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.65; }
    ::selection { background: var(--mark); color: var(--ink); }
    a { color: var(--accent); text-underline-offset: 3px; }
    a:hover { text-decoration-thickness: 2px; }
    :focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
    .hopp { position: absolute; left: 16px; top: -60px; background: var(--accent); color: #fff; padding: 10px 16px; border-radius: 8px; font-weight: 600; }
    .hopp:focus { top: 16px; }
    header.topp { border-bottom: 1px solid var(--line); padding: 18px clamp(20px, 4vw, 48px); display: flex; align-items: center; gap: 12px; }
    .merke { width: 30px; height: 30px; flex: none; }
    .navn { font-size: 1.3rem; font-weight: 600; }
    .sub { color: var(--muted); font-size: .95rem; margin-left: auto; }
    main { padding: 0 clamp(20px, 4vw, 48px) 96px; }
    .intro, .tekst { max-width: 720px; margin-inline: auto; }
    .intro { padding-block: 56px 40px; }
    h1 { font-size: clamp(1.9rem, 4vw, 2.4rem); line-height: 1.2; font-weight: 600; margin: 0 0 16px; text-wrap: balance; }
    .intro p { font-size: 1.15rem; margin: 0 0 16px; max-width: 65ch; }
    .intro .stille { color: var(--muted); font-size: 1rem; }
    nav.innhold { background: var(--sand); border-radius: 14px; padding: 22px 26px; margin-top: 28px; }
    nav.innhold h2 { font-size: 1.1rem; margin: 0 0 10px; }
    nav.innhold ol { list-style: none; margin: 0; padding: 0; columns: 2 260px; column-gap: 32px; }
    nav.innhold li { break-inside: avoid; padding: 3px 0; }
    .nr { font-variant-numeric: tabular-nums; color: var(--muted); font-weight: 400; margin-right: 6px; }
    .skjerm { border-top: 1px solid var(--line); padding-block: 56px 24px; }
    .tekst h2 { font-size: 1.5rem; line-height: 1.25; font-weight: 600; margin: 0 0 8px; }
    .tekst p { margin: 0 0 8px; max-width: 65ch; }
    .fil { font-size: .95rem; }
    .mal { color: var(--muted); margin-left: 8px; font-variant-numeric: tabular-nums; }
    figure { margin: 24px auto 0; max-width: 1200px; }
    figure img { display: block; width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--line); box-shadow: 0 10px 30px -12px rgba(42, 37, 32, .25); background: var(--bg); }
    .mobil figure { max-width: 390px; }
    footer { max-width: 720px; margin: 0 auto; padding: 32px 0 64px; color: var(--muted); font-size: .95rem; border-top: 1px solid var(--line); }
    @media (max-width: 600px) { .sub { display: none; } .intro { padding-block: 36px 28px; } .skjerm { padding-block: 40px 16px; } footer { padding-inline: 20px; } }
  </style>
</head>
<body>
  <a class="hopp" href="#innhold">Hopp til skjermene</a>
  <header class="topp">
    <svg class="merke" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="9" fill="#34557A"/><path d="M8 16l4.5 4.5 9.5-10" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span class="navn">Supersøker</span>
    <span class="sub">Designkonsept 1 av 3 · Helle · 2026-11-15</span>
  </header>
  <main id="innhold">
    <div class="intro">
      <h1>Konsept 1: Rolig veiviser</h1>
      <p>Én ting om gangen. En smal, luftig kolonne på varmt papir, en stor stegindikator øverst og én dempet blå aksent. Hvert steg ender i <strong>Neste-linjen</strong>: en kort setning om hva som skjer når du trykker, og primærknappen rett under.</p>
      <p class="stille">Skissene er statiske SVG-er med fiktive data fra testpar 1. De viser retning, ikke ferdig spesifikasjon. Begrunnelse, fargeverdier med kontrastforhold og antagelser står i <a href="konsept.md">konsept.md</a>.</p>
      <nav class="innhold" aria-labelledby="toc-h">
        <h2 id="toc-h">Skjermene</h2>
        <ol>
${toc}
        </ol>
      </nav>
    </div>
${figs}
  </main>
  <footer>
    <p>Felles brief: <a href="../felles-brief.md">_bmad-output/planning-artifacts/ux/helle/felles-brief.md</a>. Alle navn og dokumenter er fiktive.</p>
  </footer>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('index ok');
