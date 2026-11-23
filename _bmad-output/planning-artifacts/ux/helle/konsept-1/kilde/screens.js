// Genererer de 17 skjermene for konsept 1 «Rolig veiviser».
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
const { C, text, icon, button, btnWidth, link, label, fieldError, input, textarea, counter, message, chip, radioCard, toggle, sitat, rule, header, modeBanner, stepper, stepperMobile, nextBar, svgDoc, measure, SAFE } = L;

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const CV = `Ida Testesen
Testveien 1, 0000 Testvik
E-post: ida.testesen@example.com

PROFIL
Sykepleierstudent på 2. år som trives med å jobbe med mennesker. Pålitelig, blid og vant til å samarbeide i team.

UTDANNING
2025–nå  Bachelor i sykepleie, Høgskolen i Testvik (2. år)
2022–2025  Studiespesialisering, Testvik videregående skole

ARBEIDSERFARING
2023–nå  Butikkmedarbeider (deltid), Testvik Mat
Kundeservice, kassearbeid og varepåfylling.

FRIVILLIG ARBEID
2024–nå  Besøksvenn, Røde Kors besøkstjeneste
Besøker en eldre dame hver uke for samtale og turer.

STUDIEPROSJEKTER
2025  Gruppeprosjekt i helsefremmende arbeid
Planla og holdt et kurs om fallforebygging for eldre.

SPRÅK
Norsk – morsmål
Engelsk – godt, muntlig og skriftlig

ANNET
Førstehjelpskurs, Røde Kors (2024)`;

const AD = `Sommervikar i hjemmetjenesten – Testvik kommune

Hjemmetjenesten i Testvik kommune søker sommervikarer for perioden juni–august. Du vil bistå brukere i eget hjem med praktisk hjelp, personlig stell og sosial kontakt. Arbeidet foregår i turnus med dag- og kveldsvakter.

Vi ser etter deg som:
– har førerkort klasse B (krav, du kjører kommunens biler mellom brukerne)
– har gode norskkunnskaper, muntlig og skriftlig
– har erfaring med eller interesse for å jobbe med mennesker
– har gode samarbeidsevner`;

const LETTER = `Søknad på stillingen som sommervikar i hjemmetjenesten

Hei,

Jeg søker på stillingen som sommervikar i hjemmetjenesten i Testvik kommune for perioden juni–august. Jeg er sykepleierstudent på 2. år ved Høgskolen i Testvik og trives med å jobbe med mennesker.

Som besøksvenn i Røde Kors besøkstjeneste besøker jeg en eldre dame hver uke for samtale og turer. I et gruppeprosjekt i helsefremmende arbeid planla og holdt jeg et kurs om fallforebygging for eldre sammen med fire medstudenter, og jeg var ansvarlig for å koordinere gruppens møter.

Ved siden av studiene jobber jeg deltid som butikkmedarbeider hos Testvik Mat, der jeg hjelper kunder og svarer på spørsmål. Norsk er morsmålet mitt.

Jeg har ikke førerkort ennå, men jeg har oppkjøring i april.

Jeg ser fram til å høre fra dere.

Vennlig hilsen
Ida Testesen`;

const SUGGESTIONS = `• Jeg søker på stillingen som sommervikar i hjemmetjenesten i Testvik kommune for perioden juni–august.

• Som besøksvenn i Røde Kors besøkstjeneste besøker jeg en eldre dame hver uke for samtale og turer.

• I et gruppeprosjekt i helsefremmende arbeid planla og holdt jeg et kurs om fallforebygging for eldre sammen med fire medstudenter.

• Ved siden av studiene jobber jeg deltid som butikkmedarbeider hos Testvik Mat.

• Norsk er morsmålet mitt.

• Jeg har ikke førerkort ennå, men jeg har oppkjøring i april.`;

const DW = 1440, MW = 390;

// ---------- Sideramme ----------
function frame(W, o = {}) {
  const mob = W < 600;
  const wide = !!o.wide;
  const colW = mob ? W - 40 : wide ? 1036 : o.colW || 720;
  const colX = mob ? 20 : Math.round((W - colW) / 2);
  const p = { W, mob, colX, colW, parts: [], y: 0 };
  const hd = header(W, { loggedIn: o.loggedIn !== false, focusLogout: o.focusLogout });
  p.parts.push(hd.svg); p.y = hd.h;
  const bnX = mob ? 20 : (wide ? colX : Math.min(colX, 360));
  const bn = modeBanner(W, p.y, bnX, mob ? W - 40 : W - bnX - 48, { api: o.api });
  p.parts.push(bn.svg); p.y += bn.h + (mob ? 22 : 44);
  if (o.step) {
    if (mob) { const s = stepperMobile(colX, p.y, colW, o.step); p.parts.push(s.svg); p.y += s.h + 10; p.parts.push(rule(colX, p.y, colW)); p.y += 26; }
    else { const s = stepper(colX, p.y, colW, o.step); p.parts.push(s.svg); p.y += s.h + 40; }
  }
  p.add = (r, gap = 0) => { p.parts.push(r.svg); p.y += (r.h || 0) + gap; return r; };
  return p;
}
function h1(p, txt, o = {}) {
  const t = text(o.x ?? p.colX, p.y, [[txt, 600]], { size: p.mob ? 26 : 34, lh: p.mob ? 33 : 42, maxW: o.w ?? p.colW, cls: 'h' });
  return p.add(t, p.mob ? 10 : 12);
}
function h2(p, txt, o = {}) {
  const t = text(o.x ?? p.colX, p.y, [[txt, 600]], { size: p.mob ? 20 : 23, lh: p.mob ? 28 : 32, maxW: o.w ?? p.colW });
  return p.add(t, o.gap ?? 8);
}
function lead(p, txt, o = {}) {
  const t = text(o.x ?? p.colX, p.y, txt, { size: p.mob ? 16 : 19, lh: p.mob ? 26 : 31, maxW: o.w ?? p.colW, fill: o.fill || C.ink });
  return p.add(t, o.gap ?? (p.mob ? 24 : 36));
}
function body(p, runs, o = {}) {
  const t = text(o.x ?? p.colX, p.y, runs, { size: p.mob ? 16 : 17, lh: p.mob ? 25 : 28, maxW: o.w ?? p.colW, fill: o.fill || C.ink });
  return p.add(t, o.gap ?? 16);
}
function finish(p, file, title, desc, extraBottom = 72) {
  const H = Math.ceil(p.y + extraBottom);
  const svg = svgDoc(p.W, H, title, desc, (p.pre || '') + p.parts.join('\n') + (p.post ? p.post(H) : ''));
  fs.writeFileSync(path.join(OUT, file), svg);
  return H;
}
// Variant-ark: flere sider stablet, med en annoteringslist mellom (ikke del av UI)
function sheet(file, title, desc, variants) {
  let y = 0, out = '';
  for (const v of variants) {
    out += `<g aria-hidden="false"><rect x="0" y="${y}" width="${DW}" height="56" fill="${C.ink}"/><text x="48" y="${y + 36}" font-size="18" font-weight="600" fill="#FFFFFF">${L.esc(v.caption)}</text></g>`;
    y += 56;
    out += `<g transform="translate(0 ${y})"><rect width="${DW}" height="${v.h}" fill="${C.bg}"/>${v.svg}</g>`;
    y += v.h;
  }
  fs.writeFileSync(path.join(OUT, file), svgDoc(DW, y, title, desc, out));
}
function render(p, extraBottom = 72) { const H = Math.ceil(p.y + extraBottom); return { svg: p.parts.join('\n') + (p.post ? p.post(H) : ''), h: H }; }

function dialog(p, H, w, build, topY) {
  const dx = Math.round((p.W - w) / 2);
  const inner = build(dx + (p.mob ? 22 : 36), topY + (p.mob ? 24 : 34), w - (p.mob ? 44 : 72));
  const dh = inner.h + (p.mob ? 48 : 68);
  return `<rect x="0" y="0" width="${p.W}" height="${H}" fill="${C.scrim}" fill-opacity=".55"/>` +
    `<defs><filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#2A2520" flood-opacity=".28"/></filter></defs>` +
    `<rect x="${dx}" y="${topY}" width="${w}" height="${dh}" rx="16" fill="${C.surface}" filter="url(#sh)"/>` + inner.svg;
}

// ---------- 01 Logg inn ----------
function loginPage(o = {}) {
  const p = frame(DW, { loggedIn: false, colW: 480 });
  h1(p, 'Logg inn');
  lead(p, 'Supersøker hjelper deg å skrive en søknad som stemmer med CV-en din.', { gap: 28 });
  if (o.error) p.add(message(p.colX, p.y, p.colW, { kind: 'error', title: 'E-post eller passord er feil', body: 'Sjekk at du har skrevet riktig, og prøv igjen.' }), 28);
  if (o.loggedOut) p.add(message(p.colX, p.y, p.colW, { kind: 'info', icon: 'clock', title: 'Du ble logget ut', body: 'Du hadde ikke gjort noe på 30 minutter. CV-en, annonsen, svarene og teksten er slettet. Logg inn for å begynne på nytt.' }), 28);
  p.add(label(p.colX, p.y, 'E-post'), 8);
  p.add(input(p.colX, p.y, p.colW, { value: o.error ? 'ida.testesen@example.com' : '', state: o.loggedOut ? 'focus' : 'normal' }), 24);
  p.add(label(p.colX, p.y, 'Passord'), 8);
  p.add(input(p.colX, p.y, p.colW, { state: o.error ? 'focus' : 'normal', caret: o.error }), 32);
  p.add(button(p.colX, p.y, 'Logg inn', { w: p.colW, h: 56 }), 24);
  const lk = text(p.colX, p.y, 'Har du ikke konto?', { size: 17, lh: 26 });
  p.parts.push(lk.svg);
  p.add(link(p.colX + lk.w + 6, p.y + 2, 'Opprett konto', { weight: 600 }), 40);
  p.parts.push(rule(p.colX, p.y, p.colW)); p.y += 24;
  p.add(message(p.colX, p.y, p.colW, { kind: 'neutral', icon: 'key', title: 'Skal du teste appen?', titleInk: true, body: 'Logg inn med testbrukeren. E-post og passord står i README, under «Testbruker».', size: 15, lh: 23 }), 0);
  return p;
}
{
  const p = loginPage({ error: true });
  finish(p, '01-logg-inn.svg', 'Logg inn – feil e-post eller passord', 'Innloggingsside med e-post og passord. Feilmeldingen «E-post eller passord er feil» vises over skjemaet, e-posten er beholdt, og passordfeltet har fokus. Lenke til Opprett konto og hint om testbrukeren i README. Mock-modus vises øverst.');
}

// ---------- 02 Opprett konto ----------
{
  const p = frame(DW, { loggedIn: false, colW: 480 });
  h1(p, 'Opprett konto');
  lead(p, 'Du trenger bare e-post og passord. Navnet ditt lagres ikke – det hentes fra CV-en når teksten lages.', { gap: 28 });
  p.add(label(p.colX, p.y, 'E-post'), 8);
  p.add(input(p.colX, p.y, p.colW, { value: 'ida.testesen@example.com' }), 24);
  p.add(label(p.colX, p.y, 'Passord', { hint: 'Minst 8 tegn.', maxW: p.colW }), 8);
  p.add(fieldError(p.colX, p.y, 'Passordet er for kort. Skriv et passord på minst 8 tegn – vi har tømt feltet.', p.colW), 10);
  p.add(input(p.colX, p.y, p.colW, { state: 'invalidFocus', caret: true }), 32);
  p.add(button(p.colX, p.y, 'Opprett konto', { w: p.colW, h: 56 }), 24);
  const lk = text(p.colX, p.y, 'Har du allerede konto?', { size: 17, lh: 26 });
  p.parts.push(lk.svg);
  p.add(link(p.colX + lk.w + 6, p.y + 2, 'Logg inn', { weight: 600 }), 0);
  finish(p, '02-opprett-konto.svg', 'Opprett konto – for kort passord', 'Skjema for ny konto. E-postadressen er beholdt. Passordfeltet er tømt, merket ugyldig med rød kant og ikon, og har fokus. Meldingen sier at passordet må ha minst 8 tegn.');
}

// ---------- Steg 1 ----------
function step1(o = {}) {
  const p = frame(DW, { step: 1, api: o.api });
  h1(p, 'Legg inn CV og stillingsannonse');
  lead(p, 'Vi sammenligner CV-en med annonsen og viser hvilke krav CV-en dokumenterer. Alt du legger inn, slettes når du logger ut.', { gap: 28 });
  if (o.sample) {
    p.add(message(p.colX, p.y, p.colW, { kind: 'neutral', icon: 'compass', title: 'Vil du bare prøve først?', titleInk: true, body: 'Fyll inn en fiktiv CV og annonse fra testpar 1.', extra: (x, y) => button(x, y, 'Last inn eksempel (testpar 1)', { kind: 'secondary', h: 46, size: 16, padX: 18, focus: o.focusSample }) }), 44);
  }
  // CV
  h2(p, 'CV-en din', { gap: 14 });
  p.add(toggle(p.colX, p.y, ['Lim inn tekst', 'Last opp fil'], o.file ? 1 : 0), 22);
  if (o.file === 'ok') {
    // fil-linje
    const fy = p.y;
    p.parts.push(`<rect x="${p.colX}" y="${fy}" width="${p.colW}" height="64" rx="10" fill="${C.surface}" stroke="${C.line}"/>` + icon('file', p.colX + 18, fy + 20, 24, C.ink));
    p.parts.push(text(p.colX + 54, fy + 10, [['cv-ida.pdf', 600]], { size: 17, lh: 24 }).svg);
    p.parts.push(icon('checkCircle', p.colX + 54, fy + 36, 16, C.ok, 2) + text(p.colX + 76, fy + 32, [['Lest inn · 48 kB · originalfila er slettet', 400, C.ok]], { size: 14, lh: 22 }).svg);
    const bw = btnWidth('Velg en annen fil', { size: 16, padX: 16, icon: 'upload' });
    p.parts.push(button(p.colX + p.colW - bw - 12, fy + 10, 'Velg en annen fil', { kind: 'secondary', h: 44, size: 16, padX: 16, icon: 'upload' }).svg);
    p.y += 64 + 18;
    p.add(message(p.colX, p.y, p.colW, { kind: 'info', title: 'Sjekk rekkefølgen i teksten', body: 'PDF-er med kolonner kan bli lest i feil rekkefølge. Se at overskrifter og avsnitt står der de skal, og rett teksten under om noe er feil.' }), 24);
  }
  if (o.file === 'err') {
    p.add(message(p.colX, p.y, p.colW, { kind: 'error', title: 'Vi kunne ikke lese filen cv-ida-skannet.pdf', body: 'Prøv en TXT-fil eller tekstbasert PDF, eller lim inn teksten. CV-teksten du hadde fra før, er beholdt.', extra: (x, y) => {
      const a = button(x, y, 'Velg en annen fil', { kind: 'secondary', h: 44, size: 16, padX: 16, icon: 'upload' });
      const b = button(x + a.w + 12, y, 'Lim inn tekst i stedet', { kind: 'secondary', h: 44, size: 16, padX: 16, icon: 'pencil' });
      return { svg: a.svg + b.svg, h: 44 };
    } }), 24);
  }
  const cvLabel = o.file === 'ok' ? 'Teksten vi leste fra fila' : 'CV-tekst';
  const cvHint = o.file === 'ok' ? 'Du kan rette teksten her. Analysen bruker det som står i feltet.' : 'Lim inn hele CV-en: utdanning, erfaring og ferdigheter.';
  p.add(label(p.colX, p.y, cvLabel, { hint: cvHint, maxW: p.colW }), 10);
  const cvFilled = o.cvFilled;
  p.add(textarea(p.colX, p.y, p.colW, cvFilled ? 300 : 220, { text: cvFilled ? CV : '', state: o.cvState || 'normal', caretEmpty: o.cvState === 'focus' && !cvFilled }), 6);
  p.add(counter(p.colX + p.colW, p.y, cvFilled ? '961 / 10 000 tegn' : '0 / 10 000 tegn'), 40);
  // Annonse
  h2(p, 'Stillingsannonsen', { gap: 14 });
  p.add(label(p.colX, p.y, 'Annonsetekst', { hint: 'Ta med stillingstittel og arbeidsgiver, så kan teksten nevne dem.', maxW: p.colW }), 10);
  if (o.adError) p.add(fieldError(p.colX, p.y, 'Annonsen er tom. Lim inn teksten fra stillingsannonsen før du analyserer.', p.colW), 10);
  p.add(textarea(p.colX, p.y, p.colW, o.adFilled ? 260 : 200, { text: o.adFilled ? AD : '', state: o.adState || 'normal', caretEmpty: o.adState === 'invalidFocus' }), 6);
  p.add(counter(p.colX + p.colW, p.y, o.adFilled ? '701 / 10 000 tegn' : '0 / 10 000 tegn'), 40);
  p.add(nextBar(p.colX, p.y, p.colW, {
    text: o.busy ? 'Vi sjekker hvert krav mot CV-en. Det tar vanligvis under et halvt minutt.' : 'Vi finner kravene i annonsen og sjekker dem mot CV-en. Det tar noen sekunder.',
    primary: o.busy ? 'Analyserer …' : 'Analyser kravene', primaryKind: o.busy ? 'disabled' : 'primary', spinner: o.busy,
    status: o.status,
  }), 0);
  return p;
}
{
  const p = step1({ sample: true, cvState: 'focus' });
  finish(p, '03-cv-og-annonse-tom.svg', 'Steg 1, CV og annonse – tom tilstand', 'Første steg uten innhold. Stor stegindikator viser steg 1 av 3. Tilbud om å laste inn eksempel fra testpar 1, veksler mellom Lim inn tekst og Last opp fil, tomt CV-felt med fokus, tomt annonsefelt med hjelpetekst om tittel og arbeidsgiver, og knappen Analyser kravene nederst.');
}
{
  const p = step1({ file: 'ok', cvFilled: true, adFilled: true, cvState: 'focus' });
  finish(p, '04-cv-og-annonse-utfylt.svg', 'Steg 1, CV og annonse – utfylt etter opplasting', 'CV-en cv-ida.pdf er lest inn. Teksten vises i et redigerbart felt med påminnelse om å sjekke kolonner og overskrifter. Annonsen er limt inn. Tegntellere viser 961 og 701 av 10 000 tegn.');
}
{
  const p = step1({ file: 'err', cvFilled: true, adError: true, adState: 'invalidFocus' });
  finish(p, '05-cv-og-annonse-feil.svg', 'Steg 1, CV og annonse – feiltilstander', 'To feil. Fila cv-ida-skannet.pdf kunne ikke leses; meldingen navngir fila og tilbyr ny fil eller innliming, og tidligere CV-tekst er beholdt. Annonsefeltet er tomt, merket ugyldig med melding ved feltet, og har fokus.');
}

// ---------- 06 Tittel og arbeidsgiver ----------
{
  const p = frame(DW, { step: 1 });
  h1(p, 'Sjekk stillingstittel og arbeidsgiver');
  lead(p, 'Vi bruker dem i overskriften på gap-analysen og i teksten. Vi gjetter aldri: det vi ikke fant i annonsen, ber vi deg fylle inn.', { gap: 36 });
  p.add(label(p.colX, p.y, 'Stillingstittel', { required: true }), 8);
  p.add(input(p.colX, p.y, p.colW, { value: 'Sommervikar i hjemmetjenesten' }), 10);
  p.add({ svg: icon('checkCircle', p.colX, p.y + 2, 18, C.ok, 2) + text(p.colX + 26, p.y, [['Funnet i annonsen. Rett tittelen hvis den ikke stemmer.', 400, C.ok]], { size: 15, lh: 23 }).svg, h: 23 }, 36);
  // Arbeidsgiver – «gjør dette nå»
  const by = p.y, bx = p.colX - 24, bw = p.colW + 48;
  const inner = [];
  let y = by + 24;
  inner.push(chipLike(p.colX, y, 'Ikke funnet i annonsen', 'dashCircle')); y += 30 + 14;
  const t1 = text(p.colX, y, [['Arbeidsgiver', 600]], { size: 17, lh: 26 }); inner.push(t1.svg + `<text x="${p.colX + t1.w + 6}" y="${y + 19}" font-size="17" fill="${C.muted}">(må fylles ut)</text>`); y += 26 + 4;
  const t2 = text(p.colX, y, 'Vi fant ikke arbeidsgiveren i annonsen. Skriv navnet på arbeidsgiveren, så kan teksten nevne hvem du søker hos.', { size: 15, lh: 23, fill: C.ink, maxW: p.colW }); inner.push(t2.svg); y += t2.h + 10;
  inner.push(input(p.colX, y, p.colW, { state: 'focus', caret: true, placeholder: '' }).svg); y += 50 + 26;
  p.parts.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${y - by}" rx="14" fill="${C.gapBg}" stroke="${C.gapLine}"/>` + inner.join(''));
  p.y = y + 48;
  p.add(nextBar(p.colX, p.y, p.colW, { text: 'Når begge feltene er fylt inn, analyserer vi kravene.', primary: 'Analyser kravene', secondary: 'Tilbake til CV og annonse', secondaryIcon: 'arrowLeft' }), 0);
  finish(p, '06-tittel-og-arbeidsgiver.svg', 'Steg 1 – sjekk stillingstittel og arbeidsgiver', 'Stillingstittelen Sommervikar i hjemmetjenesten er funnet og kan rettes. Arbeidsgiver ble ikke funnet; en markert blokk forklarer hvorfor den trengs, og feltet har fokus. Analyser kravene nederst.');
}
function chipLike(x, y, lbl, ic) {
  const w = Math.round(measure(lbl, 15, 600) * SAFE + 50);
  return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${C.surface}" stroke="${C.gapLine}"/>` + icon(ic, x + 9, y + 5, 20, C.gap, 2) + `<text x="${x + 35}" y="${y + 20}" font-size="15" font-weight="600" fill="${C.gap}">${lbl}</text>`;
}

// ---------- 07 Analyserer ----------
{
  const p = step1({ cvFilled: true, adFilled: true, busy: true, cvState: 'normal',
    status: (x, y, w) => {
      const t = text(x, y, [['Analyserer …', 600, C.accent], [' Du kan lese gjennom teksten mens du venter. CV-en og annonsen er beholdt.', 400]], { size: 16, lh: 24, maxW: w });
      return { svg: `<g role="status">${t.svg}</g>`, h: t.h };
    } });
  finish(p, '07-analyserer.svg', 'Steg 1 – analyserer', 'Venting etter klikk på Analyser kravene. Knappen er deaktivert og viser Analyserer … med en spinner. CV-teksten og annonsen er fortsatt synlige og beholdt.');
}

// ---------- Steg 2: Gap-analyse ----------
function choiceGroup(p, focusFirst) {
  h2(p, 'Hvor mye skal Supersøker skrive?', { gap: 14 });
  p.add(radioCard(p.colX, p.y, p.colW, { title: 'Helt søknadsutkast', desc: 'Et sammenhengende brev du redigerer selv.', checked: true, focus: focusFirst }), 12);
  p.add(radioCard(p.colX, p.y, p.colW, { title: 'Forslag til formuleringer', desc: 'Setninger du kan bruke i ditt eget brev.' }), 44);
}
function docItem(p, krav, quote, o = {}) {
  const mob = p.mob;
  let s = '', y = p.y;
  const c = chip(p.colX, y, 'ok', { size: mob ? 14 : 15 }); s += c.svg; y += 30 + 10;
  const t = text(p.colX, y, [[krav, 600]], { size: mob ? 17 : 18, lh: mob ? 25 : 27, maxW: p.colW }); s += t.svg; y += t.h + 6;
  const f = text(p.colX, y, 'Fra CV-en:', { size: 15, lh: 23, fill: C.muted }); s += f.svg; y += 23 + 4;
  const q = sitat(p.colX + 4, y, quote, p.colW - 8, mob ? 15 : 16); s += q.svg; y += q.h;
  p.parts.push(s); p.y = y + 22;
  if (!o.last) { p.parts.push(rule(p.colX, p.y, p.colW)); p.y += 22; }
}
function gapBlock(p, o = {}) {
  const taState = o.noFocus ? 'normal' : 'focus';
  const mob = p.mob;
  const bx = mob ? p.colX - 12 : p.colX - 28, bw = mob ? p.colW + 24 : p.colW + 56, ix = mob ? p.colX : p.colX, iw = p.colW;
  const by = p.y; let y = by + (mob ? 20 : 28);
  const parts = [];
  const c = chip(ix, y, 'gap', { size: mob ? 14 : 15 }); parts.push(c.svg); y += 30 + 14;
  const t = text(ix, y, [['Førerkort klasse B', 600]], { size: mob ? 20 : 22, lh: mob ? 28 : 30, maxW: iw }); parts.push(t.svg); y += t.h + 6;
  const d = text(ix, y, 'Annonsen krever dette, men det står ikke i CV-en. Det betyr ikke at du mangler det.', { size: mob ? 15 : 17, lh: mob ? 24 : 27, maxW: iw }); parts.push(d.svg); y += d.h + 18;
  // «Gjør dette nå»
  parts.push(icon('pencil', ix, y + 2, 20, C.gap) + text(ix + 28, y, [['Gjør dette nå: ', 700, C.gap], ['fortell kort hva du har', 600]], { size: mob ? 16 : 17, lh: 26, maxW: iw - 28 }).svg);
  y += 26 + 12;
  const lb = label(ix, y, 'Ditt svar om førerkort', { optional: true, hint: 'Svaret brukes bare i denne søknaden. Skriv det slik det er – også hvis du ikke har det ennå. Teksten påstår aldri mer enn du skriver.', maxW: iw, size: mob ? 16 : 17, hintSize: mob ? 14 : 15, hintLh: mob ? 21 : 23 });
  parts.push(lb.svg); y += lb.h + 10;
  const ta = textarea(ix, y, iw, mob ? 108 : 96, { text: 'Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.', state: taState, caretAfter: !o.noFocus, size: mob ? 15 : 16 });
  parts.push(ta.svg); y += ta.h + 6;
  parts.push(counter(ix + iw, y, '56 / 1 000 tegn').svg); y += 22 + (mob ? 16 : 22);
  p.parts.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${y - by}" rx="14" fill="${C.gapBg}" stroke="${C.gapLine}"/>` + parts.join(''));
  p.y = y + (mob ? 32 : 48);
}
function conditions(p) {
  h2(p, 'Ansettelsesvilkår', { gap: 10 });
  const by = p.y, mob = p.mob;
  const t = text(p.colX + 44, by + 18, [['Politiattest', 600]], { size: mob ? 16 : 17, lh: 26, maxW: p.colW - 64 });
  const d = text(p.colX + 44, by + 18 + 28, 'Kan ikke dokumenteres i en CV. Telles ikke med over, og teksten påstår ikke at du har den.', { size: 15, lh: 23, fill: C.muted, maxW: p.colW - 64 });
  const h = 18 + 28 + d.h + 18;
  p.parts.push(`<rect x="${p.colX}" y="${by}" width="${p.colW}" height="${h}" rx="10" fill="none" stroke="${C.line}" stroke-width="1.5"/>` + icon('doc', p.colX + 14, by + 19, 22, C.muted) + t.svg + d.svg);
  p.y += h + 44;
}
function gapPage(W, o = {}) {
  const mob = W < 600;
  const p = frame(W, { step: 2 });
  h1(p, 'Gap-analyse: Sommervikar i hjemmetjenesten, Testvik kommune');
  const sm = text(p.colX, p.y, [['3 av 4 kompetansekrav', 700], [' er dokumentert i CV-en.', 400]], { size: mob ? 17 : 20, lh: mob ? 26 : 30, maxW: p.colW });
  p.add(sm, 6);
  body(p, 'Ett krav mangler dokumentasjon. Svar gjerne på det før vi lager teksten – det er valgfritt.', { fill: C.muted, gap: mob ? 24 : 36 });
  h2(p, 'Mangler dokumentasjon (1)', { gap: 14 });
  gapBlock(p, o);
  h2(p, 'Dokumentert i CV-en (3)', { gap: 18 });
  docItem(p, 'Gode norskkunnskaper, muntlig og skriftlig', 'Norsk – morsmål');
  docItem(p, 'Erfaring med eller interesse for å jobbe med mennesker', 'Besøksvenn, Røde Kors besøkstjeneste');
  docItem(p, 'Gode samarbeidsevner', 'Gruppeprosjekt i helsefremmende arbeid', { last: true });
  p.y += mob ? 18 : 26;
  conditions(p);
  choiceGroup(p, false);
  p.add(nextBar(p.colX, p.y, p.colW, { text: 'Vi skriver teksten ut fra CV-en, annonsen og svaret ditt.', primary: 'Lag tekst', secondary: 'Endre CV eller annonse', secondaryIcon: 'arrowLeft' }), 0);
  return p;
}
{
  const p = gapPage(DW);
  finish(p, '08-gap-analyse.svg', 'Steg 2 – gap-analyse', 'Overskrift med stillingstittel og arbeidsgiver. Opptellingen «3 av 4 kompetansekrav er dokumentert i CV-en». Kravet Førerkort klasse B mangler dokumentasjon og kommer først i en markert blokk med utfylt svar. Tre dokumenterte krav med sitat, politiattest som eget ansettelsesvilkår, omskrivingsvalg og knappene Lag tekst og Endre CV eller annonse.');
}

// ---------- 09 Tomtilstander ----------
{
  const a = frame(DW, { step: 2 });
  h1(a, 'Gap-analyse: Sommervikar – barnehageassistent, Testvik barnehage');
  a.y += 16;
  a.add(message(a.colX, a.y, a.colW, { kind: 'ok', title: 'Alle kompetansekrav i annonsen er dokumentert i CV-en.', titleInk: true, body: 'Du kan gå rett videre og velge hvor mye Supersøker skal skrive.' }), 40);
  h2(a, 'Dokumentert i CV-en (4)', { gap: 18 });
  docItem(a, 'Erfaring med arbeid med barn', 'Tilkallingsvikar, Testvik barnehage');
  docItem(a, 'Utdanning innen pedagogikk, gjerne påbegynt', 'Bachelor i barnehagelærerutdanning');
  docItem(a, 'Gjennomført førstehjelpskurs', 'Førstehjelpskurs for barn og unge');
  docItem(a, 'Interesse for friluftsliv', 'helgeturer i skog og fjell', { last: true });
  a.y += 26;
  choiceGroup(a, true);
  a.add(nextBar(a.colX, a.y, a.colW, { text: 'Vi skriver teksten ut fra CV-en og annonsen.', primary: 'Lag tekst', secondary: 'Endre CV eller annonse', secondaryIcon: 'arrowLeft' }), 0);

  const b = frame(DW, { step: 2 });
  h1(b, 'Gap-analyse: Ferievikar, Testvik bibliotek');
  b.y += 16;
  // tomtilstand
  const by = b.y; let y = by + 32;
  const parts = [];
  parts.push(`<circle cx="${b.colX + 40}" cy="${y + 26}" r="30" fill="${C.sand}"/>` + icon('search', b.colX + 24, y + 10, 32, C.ink));
  const t = text(b.colX + 96, y + 2, [['Vi fant ingen tydelige krav i annonsen.', 600]], { size: 20, lh: 30, maxW: b.colW - 128 }); parts.push(t.svg);
  const d = text(b.colX + 96, y + 2 + t.h + 6, 'Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt. Vi finner ikke på krav, og teksten påstår ikke at krav er dokumentert.', { size: 17, lh: 28, maxW: b.colW - 128 }); parts.push(d.svg);
  y += 2 + t.h + 6 + d.h + 18;
  const bt = button(b.colX + 96, y, 'Endre CV eller annonse', { kind: 'secondary', h: 46, size: 16, icon: 'arrowLeft', padX: 18 }); parts.push(bt.svg); y += 46 + 32;
  b.parts.push(`<rect x="${b.colX}" y="${by}" width="${b.colW}" height="${y - by}" rx="14" fill="none" stroke="${C.border}" stroke-width="1.5" stroke-dasharray="6 6"/>` + parts.join(''));
  b.y = y + 48;
  choiceGroup(b, false);
  b.add(nextBar(b.colX, b.y, b.colW, { text: 'Vi skriver teksten ut fra CV-en og annonsen, uten oppdiktede krav.', primary: 'Lag tekst' }), 0);
  sheet('09-gap-tomtilstander.svg', 'Steg 2 – to tomtilstander for gap-analysen', 'Variant A (testpar 4): melding om at alle kompetansekrav er dokumentert, ingen svarfelt, fire dokumenterte krav med sitat. Variant B: stiplet tomtilstand «Vi fant ingen tydelige krav i annonsen» med knapp for å endre CV eller annonse; begge kan lage tekst.', [
    { caption: 'Variant A – alle kompetansekrav er dokumentert (testpar 4)', ...render(a) },
    { caption: 'Variant B – ingen tydelige krav i annonsen (eget testscenario)', ...render(b) },
  ]);
}

// ---------- Steg 3 ----------
function basisPanel(x, y, w, o = {}) {
  const mob = o.mob;
  let s = '', cy = y;
  const head = (txt) => { const t = text(x, cy, [[txt, 600, C.muted]], { size: 15, lh: 22, maxW: w }); s += t.svg; cy += t.h + 6; };
  const item = (runs, ic = 'check', col = C.ok) => { const t = text(x + 26, cy, runs, { size: 15, lh: 23, maxW: w - 26 }); s += icon(ic, x, cy + 2, 18, col, 2) + t.svg; cy += t.h + 8; };
  if (!o.noTitle) { const t = text(x, cy, [['Teksten bygger på', 600]], { size: mob ? 18 : 20, lh: 28, maxW: w }); s += t.svg; cy += t.h + 4; }
  const n = text(x, cy, 'Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.', { size: 14, lh: 21, fill: C.muted, maxW: w }); s += n.svg; cy += n.h + 18;
  head('Stillingen');
  item([['Sommervikar i hjemmetjenesten', 400]], 'doc', C.muted);
  item([['Testvik kommune', 400]], 'doc', C.muted);
  cy += 8; head('Sitater fra CV-en');
  for (const q of ['Norsk – morsmål', 'Besøksvenn, Røde Kors besøkstjeneste', 'Gruppeprosjekt i helsefremmende arbeid']) item([['«' + q + '»', 400]]);
  cy += 8; head('Ditt svar – oppgitt av deg, ikke kontrollert');
  const t = text(x + 26, cy, [['Førerkort klasse B: ', 600], ['«Jeg har ikke førerkort ennå. Jeg har oppkjøring i april.»', 400]], { size: 15, lh: 23, maxW: w - 26 });
  s += icon('pencil', x, cy + 2, 18, C.gap, 2) + t.svg; cy += t.h + 8;
  cy += 8; head('Ikke brukt som oppfylt');
  item([['Politiattest (ansettelsesvilkår)', 400]], 'info', C.muted);
  return { svg: s, h: cy - y };
}
function step3(o = {}) {
  const p = frame(DW, { step: 3, wide: true });
  const mainW = 680, sideX = p.colX + mainW + 56, sideW = p.colW - mainW - 56;
  const suggestions = o.mode === 'forslag';
  h1(p, suggestions ? 'Forslag til formuleringer' : 'Søknadsutkastet ditt', { w: mainW });
  lead(p, suggestions ? 'Setninger du kan bruke i ditt eget brev. Rett dem fritt, og kopier dem når du er fornøyd.' : 'Les gjennom og rett det du vil. Det er ditt brev – Supersøker har bare skrevet et utkast.', { w: mainW, gap: 22 });
  const topY = p.y;
  p.add(message(p.colX, p.y, mainW, { kind: 'neutral', icon: 'clock', body: [['Teksten tas vare på mens du er innlogget,', 600], [' og slettes når du logger ut. Kopier den før det.', 400]], size: 16 }), 26);
  p.add(label(p.colX, p.y, suggestions ? 'Forslag (kan redigeres)' : 'Søknadsutkast (kan redigeres)', { maxW: mainW }), 10);
  p.add(textarea(p.colX, p.y, mainW, 0, { text: suggestions ? SUGGESTIONS : LETTER, size: 17, lh: 28, pad: 22, autoH: true }), 24);
  if (suggestions) {
    p.add(message(p.colX, p.y, mainW, { kind: 'gap', icon: 'compass', title: 'Veiledning – ikke del av søknaden', titleInk: true, body: 'Politiattest er et ansettelsesvilkår, og forslagene påstår ikke at du har den. «Kopier tekst» kopierer bare forslagene, ikke denne veiledningen.', size: 15, lh: 23 }), 28);
  }
  // sidekolonne
  const bp = basisPanel(sideX + 24, topY + 24, sideW - 48);
  p.parts.push(`<rect x="${sideX}" y="${topY}" width="${sideW}" height="${bp.h + 48}" rx="14" fill="${C.sand}"/>` + bp.svg);
  p.y = Math.max(p.y, topY + bp.h + 48 + 28);
  p.add(nextBar(p.colX, p.y, mainW, {
    text: suggestions ? 'Kopier forslagene og lim dem inn der du skriver søknaden.' : 'Kopier teksten og lim den inn der du skriver søknaden.',
    primary: 'Kopier tekst', primaryIcon: 'copy', focusPrimary: o.copied || o.focusCopy,
    secondary: 'Endre svar eller valg', secondaryIcon: 'arrowLeft',
    status: o.copied ? (x, y, w) => {
      const m = message(x, y, w, { kind: 'ok', body: [['Kopiert.', 600], [' Lim inn teksten der du skriver søknaden.', 400]], size: 16, pad: 14 });
      return { svg: `<g role="status">${m.svg}</g>`, h: m.h };
    } : null,
  }), 20);
  const lk = link(p.colX, p.y, 'Endre CV eller annonse', { size: 16 });
  p.add(lk, 0);
  return p;
}
{
  const p = step3({ copied: true });
  finish(p, '10-soknadsutkast.svg', 'Steg 3 – helt søknadsutkast', 'Søknadsbrevet til Ida Testesen i et redigerbart felt, med listen «Teksten bygger på» i en smal sidekolonne: stilling, sitater fra CV-en, svaret om førerkort og politiattest som ikke er brukt som oppfylt. Melding om at teksten slettes ved utlogging, og bekreftelsen «Kopiert. Lim inn teksten der du skriver søknaden.» ved Kopier tekst.');
}
{
  const p = step3({ mode: 'forslag', focusCopy: true });
  finish(p, '11-forslag-til-formuleringer.svg', 'Steg 3 – forslag til formuleringer', 'Forslag som punktliste i et redigerbart felt. Under feltet en tydelig adskilt boks merket «Veiledning – ikke del av søknaden», som ikke kopieres. Sidekolonnen «Teksten bygger på» og Kopier tekst med fokusring.');
}

// ---------- 12 Endre CV-dialog ----------
{
  const p = step3({});
  p.post = (H) => dialog(p, H, 600, (x, y, w) => {
    let s = '', cy = y;
    s += `<circle cx="${x + 24}" cy="${cy + 24}" r="24" fill="${C.errBg}"/>` + icon('trash', x + 12, cy + 12, 24, C.err);
    cy += 64;
    const t = text(x, cy, [['Endre CV eller annonse?', 600]], { size: 26, lh: 34, maxW: w }); s += t.svg; cy += t.h + 10;
    const b = text(x, cy, 'Hvis du går videre, forkaster vi dette:', { size: 17, lh: 28, maxW: w }); s += b.svg; cy += b.h + 8;
    for (const li of ['svaret ditt om førerkort', 'gap-analysen', 'teksten – også det du har redigert selv']) {
      s += `<circle cx="${x + 8}" cy="${cy + 14}" r="3.5" fill="${C.ink}"/>`;
      const l = text(x + 24, cy, li, { size: 17, lh: 28, maxW: w - 24 }); s += l.svg; cy += l.h + 2;
    }
    cy += 10;
    const k = text(x, cy, 'CV-en og annonsen beholdes, så du kan rette dem og analysere på nytt. Kopier teksten først hvis du vil ta vare på den.', { size: 16, lh: 25, fill: C.muted, maxW: w }); s += k.svg; cy += k.h + 30;
    const cw = btnWidth('Forkast og endre', { padX: 24 });
    s += button(x + w - cw, cy, 'Forkast og endre', { kind: 'danger', w: cw }).svg;
    const aw = btnWidth('Avbryt', { padX: 28 });
    s += button(x + w - cw - 12 - aw, cy, 'Avbryt', { kind: 'secondary', w: aw, focus: true }).svg;
    cy += 52;
    return { svg: s, h: cy - y };
  }, 300);
  finish(p, '12-endre-cv-dialog.svg', 'Bekreftelsesdialog – Endre CV eller annonse', 'Dialog over steg 3. Den lister hva som forkastes: svaret, gap-analysen og teksten, også egenredigert tekst. CV og annonse beholdes. Avbryt har fokus; Forkast og endre er markert som destruktiv.');
}

// ---------- 13 Feil fra språkmodell ----------
function errPage(kind) {
  const p = frame(DW, { step: 1 });
  h1(p, 'Legg inn CV og stillingsannonse');
  const msgO = kind === 'timeout'
    ? { title: 'Vi fikk ikke svar', body: 'Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.' }
    : { title: 'Analysen kunne ikke brukes', body: 'Analysen kunne ikke brukes fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt. Prøv analysen på nytt.' };
  lead(p, 'CV-en og annonsen står der du la dem inn. Du trenger ikke skrive noe på nytt.', { gap: 28 });
  h2(p, 'CV-en din', { gap: 14 });
  p.add(label(p.colX, p.y, 'CV-tekst'), 10);
  p.add(textarea(p.colX, p.y, p.colW, 164, { text: CV }), 6);
  p.add(counter(p.colX + p.colW, p.y, '961 / 10 000 tegn'), 32);
  h2(p, 'Stillingsannonsen', { gap: 14 });
  p.add(label(p.colX, p.y, 'Annonsetekst'), 10);
  p.add(textarea(p.colX, p.y, p.colW, 140, { text: AD }), 6);
  p.add(counter(p.colX + p.colW, p.y, '701 / 10 000 tegn'), 40);
  p.add(nextBar(p.colX, p.y, p.colW, {
    status: (x, y, w) => { const m = message(x, y, w, { kind: 'error', ...msgO, extra: kind === 'invalid' ? (tx, ty, tw) => text(tx, ty - 4, 'Ingen deler av analysen vises, fordi ett sitat ikke fantes ordrett i CV-en.', { size: 15, lh: 23, fill: C.muted, maxW: tw }) : null }); return { svg: `<g role="alert">${m.svg}</g>`, h: m.h }; },
    text: 'Prøv igjen starter ett nytt forsøk. Vi prøver aldri automatisk.', primary: 'Prøv igjen', focusPrimary: true }), 0);
  return p;
}
sheet('13-feil-fra-sprakmodell.svg', 'Feil fra språkmodellen – to varianter', 'Variant A: tidsavbrudd med «Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.» og knappen Prøv igjen med fokus. Variant B: ugyldig analyse fordi et sitat ikke kunne bekreftes; ingen delresultater vises. CV og annonse er beholdt i begge.', [
  { caption: 'Variant A – tidsavbrudd', ...render(errPage('timeout')) },
  { caption: 'Variant B – ugyldig analyse (sitat kunne ikke bekreftes)', ...render(errPage('invalid')) },
]);

// ---------- 14 Leverandørvarsel ----------
{
  const p = step1({ cvFilled: true, adFilled: true, api: true });
  p.post = (H) => dialog(p, H, 640, (x, y, w) => {
    let s = '', cy = y;
    s += `<circle cx="${x + 24}" cy="${cy + 24}" r="24" fill="${C.gapBg}"/>` + icon('send', x + 12, cy + 12, 24, C.gap);
    cy += 64;
    const t = text(x, cy, [['Teksten din sendes til OpenAI', 600]], { size: 26, lh: 34, maxW: w }); s += t.svg; cy += t.h + 10;
    const b = text(x, cy, 'For å analysere kravene sender Supersøker CV-teksten, annonsen og svarene dine til språkmodellen gpt-5-mini hos OpenAI.', { size: 17, lh: 28, maxW: w }); s += b.svg; cy += b.h + 14;
    const m = message(x, cy, w, { kind: 'neutral', icon: 'shield', body: [['Ingenting sendes før du bekrefter.', 600], [' Du får dette spørsmålet én gang per innlogging. Avbryter du, beholdes alt du har skrevet.', 400]], size: 15, lh: 23, pad: 14 });
    s += m.svg; cy += m.h + 30;
    const cw = btnWidth('Send og analyser', { padX: 24, icon: 'send' });
    s += button(x + w - cw, cy, 'Send og analyser', { w: cw, icon: 'send', focus: true }).svg;
    const aw = btnWidth('Avbryt', { padX: 28 });
    s += button(x + w - cw - 12 - aw, cy, 'Avbryt', { kind: 'secondary', w: aw }).svg;
    cy += 52;
    return { svg: s, h: cy - y };
  }, 380);
  finish(p, '14-leverandorvarsel.svg', 'API-modus – varsel før data sendes til språkmodell', 'Banneret øverst viser at API-modus er på. En dialog over steg 1 navngir leverandøren OpenAI og modellen gpt-5-mini, sier at ingenting sendes før brukeren bekrefter, og har knappene Avbryt og Send og analyser.');
}

// ---------- 15 Øktvarsel ----------
{
  const a = gapPage(DW, { noFocus: true });
  const ra = render(a);
  const dlg = dialog({ W: DW, mob: false }, ra.h, 600, (x, y, w) => {
    let s = '', cy = y;
    s += `<circle cx="${x + 24}" cy="${cy + 24}" r="24" fill="${C.accentSoft}"/>` + icon('clock', x + 12, cy + 12, 24, C.accent);
    cy += 64;
    const t = text(x, cy, [['Du blir logget ut om 5 minutter', 600]], { size: 26, lh: 34, maxW: w }); s += t.svg; cy += t.h + 10;
    const b = text(x, cy, 'Du har ikke gjort noe på 25 minutter. Når du logges ut, slettes CV-en, annonsen, svarene og teksten.', { size: 17, lh: 28, maxW: w }); s += b.svg; cy += b.h + 30;
    const cw = btnWidth('Fortsett økten', { padX: 28 });
    s += button(x + w - cw, cy, 'Fortsett økten', { w: cw, focus: true }).svg;
    const aw = btnWidth('Logg ut nå', { padX: 24, icon: 'logout' });
    s += button(x + w - cw - 12 - aw, cy, 'Logg ut nå', { kind: 'secondary', w: aw, icon: 'logout' }).svg;
    cy += 52;
    return { svg: s, h: cy - y };
  }, 330);
  const b = loginPage({ loggedOut: true });
  sheet('15-oktvarsel.svg', 'Øktvarsel og automatisk utlogging', 'Variant A: varsel etter 25 minutter uten aktivitet, med Fortsett økten i fokus og Logg ut nå. Variant B: innloggingssiden etter automatisk utlogging, med forklaring om at CV, annonse, svar og tekst er slettet.', [
    { caption: 'Variant A – varsel etter 25 minutter uten aktivitet', svg: ra.svg + dlg, h: ra.h },
    { caption: 'Variant B – innlogging etter automatisk utlogging (30 minutter)', ...render(b) },
  ]);
}

// ---------- 16 Mobil gap-analyse ----------
{
  const p = gapPage(MW);
  finish(p, '16-mobil-gap-analyse.svg', 'Mobil, 390 px – gap-analyse', 'Gap-analysen på smal skjerm. Steglisten viser bare aktivt steg (Steg 2 av 3, Gap-analyse) med en liten fremdriftslinje. Alt er stablet i én kolonne; manglende krav med svarfelt kommer først, og Lag tekst er en full bredde-knapp nederst.', 40);
}

// ---------- 17 Mobil tekst ----------
{
  const p = frame(MW, { step: 3 });
  h1(p, 'Søknadsutkastet ditt');
  lead(p, 'Les gjennom og rett det du vil. Det er ditt brev.', { gap: 18 });
  p.add(message(p.colX, p.y, p.colW, { kind: 'neutral', icon: 'clock', body: [['Teksten slettes når du logger ut.', 600], [' Kopier den før det.', 400]], size: 15, lh: 23, pad: 14 }), 20);
  p.add(label(p.colX, p.y, 'Søknadsutkast (kan redigeres)', { size: 16 }), 8);
  p.add(textarea(p.colX, p.y, p.colW, 420, { text: LETTER, size: 16, lh: 26, pad: 16 }), 24);
  // Sammenleggbart panel «Teksten bygger på», åpnet
  const by = p.y;
  const hdH = 56;
  let s = `<text x="${p.colX + 18}" y="${by + 35}" font-size="17" font-weight="600" fill="${C.ink}">Teksten bygger på</text>` + icon('chevronUp', p.colX + p.colW - 40, by + 17, 22, C.ink);
  const bp = basisPanel(p.colX + 18, by + hdH + 4, p.colW - 36, { mob: true, noTitle: true });
  const ph = hdH + 4 + bp.h + 14;
  p.parts.push(`<rect x="${p.colX}" y="${by}" width="${p.colW}" height="${ph}" rx="12" fill="${C.sand}"/>` + rule(p.colX + 18, by + hdH - 1, p.colW - 36, C.line) + s + bp.svg);
  p.y += ph + 28;
  p.add(nextBar(p.colX, p.y, p.colW, {
    primary: 'Kopier tekst', primaryIcon: 'copy', focusPrimary: true, secondary: 'Endre svar eller valg', secondaryIcon: 'arrowLeft',
    status: (x, y, w) => { const m = message(x, y, w, { kind: 'ok', body: [['Kopiert.', 600], [' Lim inn teksten der du skriver søknaden.', 400]], size: 15, lh: 23, pad: 14 }); return { svg: `<g role="status">${m.svg}</g>`, h: m.h }; },
  }), 18);
  const lk = link(p.colX, p.y, 'Endre CV eller annonse', { size: 16 });
  p.add(lk, 0);
  finish(p, '17-mobil-tekst.svg', 'Mobil, 390 px – søknadsutkastet', 'Søknadsutkastet på smal skjerm. Brevet i et redigerbart felt, deretter et åpnet sammenleggbart panel «Teksten bygger på», bekreftelsen Kopiert og Kopier tekst som full bredde-knapp nederst.', 40);
}
console.log('ok');
