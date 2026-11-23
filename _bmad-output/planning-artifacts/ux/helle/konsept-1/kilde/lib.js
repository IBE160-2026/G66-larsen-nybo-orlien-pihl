// Felles byggesteiner for konsept 1 «Rolig veiviser». Genererer SVG-strenger.
const fs = require('fs');

// ---------- Fontmåling (Segoe UI-metrikk, med sikkerhetsmargin for andre fonter i stakken) ----------
function loadFont(file) {
  const b = fs.readFileSync(file);
  const n = b.readUInt16BE(4);
  const t = {};
  for (let i = 0; i < n; i++) {
    const o = 12 + i * 16;
    t[b.toString('latin1', o, o + 4)] = b.readUInt32BE(o + 8);
  }
  const upm = b.readUInt16BE(t.head + 18);
  const nH = b.readUInt16BE(t.hhea + 34);
  const adv = (g) => b.readUInt16BE(t.hmtx + 4 * Math.min(g, nH - 1));
  const cm = t.cmap, nt = b.readUInt16BE(cm + 2);
  let sub = null;
  for (let i = 0; i < nt; i++) {
    const p = b.readUInt16BE(cm + 4 + i * 8), e = b.readUInt16BE(cm + 6 + i * 8), off = b.readUInt32BE(cm + 8 + i * 8);
    if (p === 3 && e === 1 && !sub) sub = cm + off;
  }
  const segX2 = b.readUInt16BE(sub + 6), seg = segX2 / 2;
  const endO = sub + 14, startO = endO + segX2 + 2, deltaO = startO + segX2, rangeO = deltaO + segX2;
  const cache = new Map();
  function glyph(c) {
    for (let i = 0; i < seg; i++) {
      const end = b.readUInt16BE(endO + i * 2);
      if (c > end) continue;
      const start = b.readUInt16BE(startO + i * 2);
      if (c < start) return 0;
      const delta = b.readInt16BE(deltaO + i * 2), ro = b.readUInt16BE(rangeO + i * 2);
      if (ro === 0) return (c + delta) & 0xffff;
      const gi = b.readUInt16BE(rangeO + i * 2 + ro + (c - start) * 2);
      return gi === 0 ? 0 : (gi + delta) & 0xffff;
    }
    return 0;
  }
  return (ch) => {
    const c = ch.codePointAt(0);
    if (!cache.has(c)) cache.set(c, adv(glyph(c)) / upm);
    return cache.get(c);
  };
}
const F = 'C:/Windows/Fonts/';
const fonts = { 400: loadFont(F + 'segoeui.ttf'), 600: loadFont(F + 'seguisb.ttf'), 700: loadFont(F + 'segoeuib.ttf') };
const SAFE = 1.08; // andre fonter i stakken (Seravek, Ubuntu, DejaVu) kan være litt bredere
function measure(s, size, w = 400) {
  const f = fonts[w] || fonts[400];
  let x = 0;
  for (const ch of s) x += f(ch);
  return x * size;
}

// ---------- Tokens ----------
const C = {
  bg: '#F4EFE6', surface: '#FFFDF9', sand: '#EAE2D3', line: '#D9CFBE', border: '#857A69',
  ink: '#2A2520', muted: '#5B5247', accent: '#34557A', accentSoft: '#E2E8EF', accentLine: '#A9B9CC',
  ok: '#2D6644', okBg: '#E3EDE2', okLine: '#A8C4AE',
  gap: '#855000', gapBg: '#F6E9CF', gapLine: '#D6B475',
  err: '#A0392A', errBg: '#F8E3DD', errLine: '#DDA79C',
  mark: '#F1DC9C', disabledBg: '#E2DACC', disabledInk: '#5F574C', scrim: '#2A2520',
};
const FONT = "Seravek, 'Gill Sans Nova', Ubuntu, 'Segoe UI', Calibri, 'DejaVu Sans', 'Helvetica Neue', Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Tekst med manuell linjebryting ----------
// runs: streng eller [[tekst, vekt, farge?], ...]
function wrapRuns(runs, maxW, size) {
  if (typeof runs === 'string') runs = [[runs, 400]];
  const tokens = [];
  for (const [txt, w, fill] of runs) {
    const parts = txt === '\n' ? ['\n'] : txt.split(/(\s+)/);
    for (const p of parts) if (p !== '') tokens.push({ t: p, w: w || 400, fill, space: /^\s+$/.test(p) });
  }
  const lines = [[]];
  let cur = 0;
  for (const tk of tokens) {
    if (tk.t === '\n') { lines.push([]); cur = 0; continue; }
    const tw = measure(tk.t, size, tk.w) * SAFE;
    const line = lines[lines.length - 1];
    if (tk.space) { if (line.length) { line.push(tk); cur += tw; } continue; }
    if (cur + tw > maxW && line.length) {
      while (line.length && line[line.length - 1].space) line.pop();
      lines.push([tk]); cur = tw;
    } else { line.push(tk); cur += tw; }
  }
  for (const l of lines) while (l.length && l[l.length - 1].space) l.pop();
  return lines;
}
// Returnerer { svg, h, n, w }. y = topp av tekstblokken.
function text(x, y, runs, o = {}) {
  const size = o.size || 17, lh = o.lh || Math.round(size * 1.6), w0 = o.weight || 400;
  const fill = o.fill || C.ink, anchor = o.anchor || 'start';
  if (typeof runs === 'string') runs = runs.split('\n').flatMap((seg, i) => (i ? [['\n', w0], [seg, w0]] : [[seg, w0]]));
  else runs = runs.map(([t, w, f]) => [t, w || w0, f]);
  let lines = wrapRuns(runs, o.maxW || 1e9, size);
  if (o.maxLines && lines.length > o.maxLines) lines = lines.slice(0, o.maxLines);
  const base = y + (lh - size) / 2 + size * 0.8;
  let out = `<text x="${x}" y="${base.toFixed(1)}" font-size="${size}" font-weight="${w0}" fill="${fill}"${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>`;
  let maxW = 0;
  lines.forEach((l, i) => {
    let inner = '', lw = 0;
    let buf = '', bw = null, bf = null;
    const flush = () => {
      if (!buf) return;
      const attrs = (bw !== w0 ? ` font-weight="${bw}"` : '') + (bf && bf !== fill ? ` fill="${bf}"` : '');
      inner += attrs ? `<tspan${attrs}>${esc(buf)}</tspan>` : esc(buf);
      buf = '';
    };
    for (const tk of l) {
      if (tk.w !== bw || tk.fill !== bf) { flush(); bw = tk.w; bf = tk.fill; }
      buf += tk.t; lw += measure(tk.t, size, tk.w);
    }
    flush();
    maxW = Math.max(maxW, lw);
    out += `<tspan x="${x}"${i ? ` dy="${lh}"` : ''}>${inner || ' '}</tspan>`;
  });
  out += '</text>';
  return { svg: out, h: lines.length * lh, n: lines.length, w: maxW };
}

// ---------- Ikoner (24×24, strek 1.8, runde ender) ----------
const ICON = {
  check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9.2"/><path d="M7.8 12.3l2.9 2.9 5.5-5.6"/>',
  dashCircle: '<circle cx="12" cy="12" r="9.2" stroke-dasharray="3.2 2.6"/><path d="M12 8v8M8 12h8"/>',
  alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/>',
  info: '<circle cx="12" cy="12" r="9.2"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/>',
  logout: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M15 8l4 4-4 4M19 12H9.5"/>',
  upload: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15"/>',
  file: '<path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4"/>',
  copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="1.8"/><path d="M15.5 8.5V5.8A1.8 1.8 0 0 0 13.7 4H5.8A1.8 1.8 0 0 0 4 5.8v7.9a1.8 1.8 0 0 0 1.8 1.8h2.7"/>',
  clock: '<circle cx="12" cy="12" r="9.2"/><path d="M12 7v5.2l3.4 2"/>',
  shield: '<path d="M12 3.2l7.3 2.8v5.5c0 4.5-3 8-7.3 9.3-4.3-1.3-7.3-4.8-7.3-9.3V6z"/><path d="M8.6 12l2.4 2.4 4.4-4.5"/>',
  send: '<path d="M4 12l16-7.5-5.5 16-3-6.5z"/><path d="M11.5 14L20 4.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2L20 20"/>',
  chevronDown: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
  chevronUp: '<path d="M6.5 14.5L12 9l5.5 5.5"/>',
  arrowRight: '<path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"/>',
  arrowLeft: '<path d="M19 12H6M11 6.5L5.5 12l5.5 5.5"/>',
  key: '<circle cx="8" cy="14.5" r="4.3"/><path d="M11.2 11.5L19.5 3.5M16 7l2.8 2.8M14 9l2 2"/>',
  pencil: '<path d="M4.5 19.5l1-4.2L15.8 5a1.9 1.9 0 0 1 2.7 0l.5.5a1.9 1.9 0 0 1 0 2.7L8.7 18.5z"/><path d="M14 6.8l3.2 3.2"/>',
  doc: '<path d="M7 3.5h10A1.5 1.5 0 0 1 18.5 5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l.9 12.2a1.5 1.5 0 0 0 1.5 1.3h6.2a1.5 1.5 0 0 0 1.5-1.3L17.5 7"/>',
  compass: '<circle cx="12" cy="12" r="9.2"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
};
function icon(name, x, y, size = 22, color = C.ink, sw = 1.8) {
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s.toFixed(4)})" fill="none" stroke="${color}" color="${color}" stroke-width="${(sw / s).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</g>`;
}
function spinner(cx, cy, r, color) {
  return `<g aria-hidden="true"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-opacity=".3" stroke-width="2.4"/><path d="M${cx} ${cy - r}a${r} ${r} 0 0 1 ${r} ${r}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/></g>`;
}

// ---------- Komponenter ----------
function focusRing(x, y, w, h, rx) {
  return `<rect x="${x - 4.5}" y="${y - 4.5}" width="${w + 9}" height="${h + 9}" rx="${rx + 4.5}" fill="none" stroke="${C.accent}" stroke-width="3"/>`;
}
function btnWidth(label, o = {}) {
  const size = o.size || 17;
  return Math.round(measure(label, size, 600) * SAFE + (o.icon || o.spinner ? 30 : 0) + (o.padX || 24) * 2);
}
// kind: primary | secondary | danger | disabled
function button(x, y, label, o = {}) {
  const kind = o.kind || 'primary', h = o.h || 52, size = o.size || 17;
  const w = o.w || btnWidth(label, o);
  const st = {
    primary: [C.accent, '#FFFFFF', 'none'], secondary: [C.surface, C.ink, C.border],
    danger: [C.err, '#FFFFFF', 'none'], disabled: [C.disabledBg, C.disabledInk, 'none'],
  }[kind];
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${st[0]}"${st[2] !== 'none' ? ` stroke="${st[2]}" stroke-width="1.5"` : ''}/>`;
  const tw = measure(label, size, 600) + (o.icon || o.spinner ? 30 : 0);
  let tx = x + (w - tw) / 2;
  if (o.spinner) { s += spinner(tx + 10, y + h / 2, 8, st[1]); tx += 30; }
  else if (o.icon) { s += icon(o.icon, tx, y + h / 2 - 10, 20, st[1]); tx += 30; }
  s += `<text x="${tx.toFixed(1)}" y="${(y + h / 2 + size * 0.35).toFixed(1)}" font-size="${size}" font-weight="600" fill="${st[1]}">${esc(label)}</text>`;
  if (o.focus) s += focusRing(x, y, w, h, 10);
  return { svg: s, w, h };
}
function link(x, y, label, o = {}) {
  const size = o.size || 17;
  const base = y + size * 0.8;
  const w = measure(label, size, o.weight || 400);
  let s = `<text x="${x}" y="${base}" font-size="${size}" font-weight="${o.weight || 400}" fill="${C.accent}" text-decoration="underline">${esc(label)}</text>`;
  if (o.focus) s += `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${size * 1.25 + 8}" rx="4" fill="none" stroke="${C.accent}" stroke-width="3"/>`;
  return { svg: s, w, h: size * 1.25 };
}
// Etikett + valgfri hjelpetekst.
function label(x, y, txt, o = {}) {
  let s = '', h = 0;
  const runs = [[txt, 600]];
  if (o.optional) runs.push([' (valgfritt)', 400, C.muted]);
  if (o.required) runs.push([' (må fylles ut)', 400, C.muted]);
  const t = text(x, y, runs, { size: o.size || 17, lh: o.lh || 26, maxW: o.maxW });
  s += t.svg; h += t.h;
  if (o.hint) {
    const hh = text(x, y + h + 2, o.hint, { size: o.hintSize || 15, lh: o.hintLh || 23, fill: C.muted, maxW: o.maxW });
    s += hh.svg; h += hh.h + 2;
  }
  return { svg: s, h };
}
function fieldError(x, y, msg, maxW, size = 16) {
  const t = text(x + 28, y, [[msg, 600, C.err]], { size, lh: 24, maxW: maxW - 28 });
  return { svg: icon('alert', x, y + 1, 20, C.err) + t.svg, h: t.h };
}
// state: normal | focus | invalid | invalidFocus
function boxFrame(x, y, w, h, state) {
  const inv = state === 'invalid' || state === 'invalidFocus';
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.surface}" stroke="${inv ? C.err : state === 'focus' ? C.accent : C.border}" stroke-width="${inv || state === 'focus' ? 2 : 1.5}"/>`;
  if (state === 'focus' || state === 'invalidFocus') s += focusRing(x, y, w, h, 8);
  return s;
}
function input(x, y, w, o = {}) {
  const h = o.h || 50, size = o.size || 17;
  let s = boxFrame(x, y, w, h, o.state || 'normal');
  if (o.value) s += `<text x="${x + 14}" y="${y + h / 2 + size * 0.35}" font-size="${size}" fill="${C.ink}">${esc(o.value)}</text>`;
  if (o.caret) {
    const cx = x + 14 + (o.value ? measure(o.value, size) + 2 : 0);
    s += `<rect x="${cx}" y="${y + 13}" width="1.6" height="${h - 26}" fill="${C.ink}"/>`;
  }
  return { svg: s, h };
}
// Tekstområde; linjer klippes ved høyden og et rullefelt vises hvis det er mer tekst.
function textarea(x, y, w, h, o = {}) {
  const size = o.size || 16, lh = o.lh || 26, pad = o.pad || 16;
  if (o.autoH) h = pad * 2 - 4 + text(0, 0, o.text, { size, lh, maxW: w - pad * 2 - 14 }).n * lh;
  let s = boxFrame(x, y, w, h, o.state || 'normal');
  if (o.text) {
    const t = text(x + pad, y + pad - 2, o.text, { size, lh, maxW: w - pad * 2 - 14 });
    const fits = Math.floor((h - pad * 2 + 4) / lh);
    if (t.n > fits) {
      s += text(x + pad, y + pad - 2, o.text, { size, lh, maxW: w - pad * 2 - 14, maxLines: fits }).svg;
      const track = h - 16, thumb = Math.max(36, track * fits / t.n);
      s += `<rect x="${x + w - 11}" y="${y + 8}" width="5" height="${track}" rx="2.5" fill="${C.sand}"/><rect x="${x + w - 11}" y="${y + 8}" width="5" height="${thumb.toFixed(1)}" rx="2.5" fill="${C.border}"/>`;
    } else s += t.svg;
    if (o.caretAfter) {
      const lines = wrapRuns([[o.text, 400]], w - pad * 2 - 14, size);
      const last = lines[Math.min(lines.length, fits) - 1];
      const lw = last.reduce((a, tk) => a + measure(tk.t, size), 0);
      const ly = y + pad - 2 + (Math.min(lines.length, fits) - 1) * lh;
      s += `<rect x="${x + pad + lw + 2}" y="${ly + 4}" width="1.6" height="${lh - 8}" fill="${C.ink}"/>`;
    }
  }
  if (o.caretEmpty) s += `<rect x="${x + pad}" y="${y + pad + 2}" width="1.6" height="${lh - 8}" fill="${C.ink}"/>`;
  return { svg: s, h };
}
function counter(xRight, y, txt) {
  return { svg: `<text x="${xRight}" y="${y + 15}" font-size="14" fill="${C.muted}" text-anchor="end" style="font-variant-numeric: tabular-nums">${esc(txt)}</text>`, h: 22 };
}
// Melding/varsel. kind: error | info | ok | gap | neutral
function message(x, y, w, o) {
  const k = { error: [C.errBg, C.errLine, C.err, 'alert'], info: [C.accentSoft, C.accentLine, C.accent, 'info'], ok: [C.okBg, C.okLine, C.ok, 'checkCircle'], gap: [C.gapBg, C.gapLine, C.gap, 'info'], neutral: [C.sand, C.line, C.ink, 'info'] }[o.kind || 'info'];
  const pad = o.pad || 18, ix = 22, size = o.size || 16;
  const tx = x + pad + ix + 12, tw = w - (tx - x) - pad;
  let inner = '', cy = y + pad;
  if (o.title) { const t = text(tx, cy, [[o.title, 600, o.titleInk ? C.ink : k[2]]], { size: o.titleSize || 17, lh: 26, maxW: tw }); inner += t.svg; cy += t.h + 2; }
  if (o.body) { const t = text(tx, cy, o.body, { size, lh: o.lh || 25, maxW: tw }); inner += t.svg; cy += t.h; }
  if (o.extra) { const r = o.extra(tx, cy + 12, tw); inner += r.svg; cy += 12 + r.h; }
  const h = cy - y + pad;
  const s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${k[0]}" stroke="${k[1]}" stroke-width="1"/>` + icon(o.icon || k[3], x + pad, y + pad + 2, ix, k[2]) + inner;
  return { svg: s, h };
}
function chip(x, y, kind, o = {}) {
  const ok = kind === 'ok';
  const lbl = ok ? 'Dokumentert' : 'Mangler dokumentasjon';
  const size = o.size || 15;
  const w = Math.round(measure(lbl, size, 600) * SAFE + 26 + 24);
  const s = `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${ok ? C.okBg : C.surface}" stroke="${ok ? C.okLine : C.gapLine}"/>` +
    icon(ok ? 'checkCircle' : 'dashCircle', x + 9, y + 5, 20, ok ? C.ok : C.gap, 2) +
    `<text x="${x + 35}" y="${y + 20}" font-size="${size}" font-weight="600" fill="${ok ? C.ok : C.gap}">${lbl}</text>`;
  return { svg: s, w, h: 30 };
}
function radioCard(x, y, w, o) {
  const pad = 18;
  const t1 = text(x + 56, y + pad, [[o.title, 600]], { size: 17, lh: 26, maxW: w - 76 });
  const t2 = text(x + 56, y + pad + t1.h + 2, o.desc, { size: 15, lh: 23, fill: C.muted, maxW: w - 76 });
  const h = pad * 2 + t1.h + 2 + t2.h;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${o.checked ? '#F3F6F9' : C.surface}" stroke="${o.checked ? C.accent : C.border}" stroke-width="${o.checked ? 2 : 1.5}"/>`;
  const cy = y + pad + 13;
  s += `<circle cx="${x + 30}" cy="${cy}" r="10" fill="${C.surface}" stroke="${o.checked ? C.accent : C.border}" stroke-width="2"/>`;
  if (o.checked) s += `<circle cx="${x + 30}" cy="${cy}" r="5.5" fill="${C.accent}"/>`;
  if (o.focus) s += `<circle cx="${x + 30}" cy="${cy}" r="15.5" fill="none" stroke="${C.accent}" stroke-width="3"/>`;
  s += t1.svg + t2.svg;
  return { svg: s, h };
}
// Segmentert veksler (to knapper)
function toggle(x, y, labels, active, o = {}) {
  const size = 16, h = 44;
  const ws = labels.map((l) => Math.round(measure(l, size, 600) * SAFE + 30 + 40));
  const W = ws.reduce((a, b) => a + b, 0);
  let s = `<rect x="${x}" y="${y}" width="${W}" height="${h}" rx="10" fill="${C.surface}" stroke="${C.border}" stroke-width="1.5"/>`;
  let cx = x;
  labels.forEach((l, i) => {
    const on = i === active;
    if (on) s += `<rect x="${cx + 3}" y="${y + 3}" width="${ws[i] - 6}" height="${h - 6}" rx="8" fill="${C.accent}"/>`;
    s += icon(i === 0 ? 'pencil' : 'upload', cx + 18, y + 12, 20, on ? '#FFFFFF' : C.ink);
    s += `<text x="${cx + 46}" y="${y + 28}" font-size="${size}" font-weight="600" fill="${on ? '#FFFFFF' : C.ink}">${esc(l)}</text>`;
    if (o.focus === i) s += focusRing(cx, y, ws[i], h, 10);
    cx += ws[i];
  });
  return { svg: s, h, w: W };
}
function sitat(x, y, q, maxW, size = 16) {
  const lines = wrapRuns([['«' + q + '»', 400]], maxW, size);
  let s = '', cy = y;
  for (const l of lines) {
    const str = l.map((t) => t.t).join('');
    const w = measure(str, size);
    s += `<rect x="${x - 4}" y="${cy}" width="${(w + 8).toFixed(1)}" height="${size + 10}" rx="4" fill="${C.mark}"/>`;
    s += `<text x="${x}" y="${(cy + size * 0.82 + 5).toFixed(1)}" font-size="${size}" fill="${C.ink}">${esc(str)}</text>`;
    cy += size + 14;
  }
  return { svg: s, h: cy - y - 4 };
}
function rule(x, y, w, color = C.line) { return `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${color}"/>`; }

// ---------- Sideramme ----------
function header(W, o = {}) {
  const mob = W < 600, px = mob ? 20 : 48, h = mob ? 64 : 72;
  let s = `<rect x="0" y="0" width="${W}" height="${h}" fill="${C.bg}"/>` + rule(0, h - 1, W);
  const my = h / 2 - 15;
  s += `<g aria-hidden="true"><rect x="${px}" y="${my}" width="30" height="30" rx="9" fill="${C.accent}"/><path d="M${px + 8} ${my + 16}l4.5 4.5 9.5-10" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += `<text x="${px + 42}" y="${h / 2 + 8}" font-size="${mob ? 20 : 22}" font-weight="600" fill="${C.ink}">Supersøker</text>`;
  if (o.loggedIn) {
    const bw = btnWidth('Logg ut', { icon: 'logout', size: 16, padX: 16 });
    const bx = W - px - bw;
    s += button(bx, h / 2 - 20, 'Logg ut', { kind: 'secondary', icon: 'logout', h: 40, size: 16, padX: 16, focus: o.focusLogout }).svg;
    if (!mob) s += `<text x="${bx - 20}" y="${h / 2 + 5}" font-size="15" fill="${C.muted}" text-anchor="end">Innlogget som ida.testesen@example.com</text>`;
  }
  return { svg: s, h };
}
function modeBanner(W, y, colX, colW, o = {}) {
  const mob = W < 600, size = mob ? 15 : 16, lh = mob ? 23 : 24;
  const api = o.api;
  const runs = api
    ? [['API-modus er på.', 600], [' Når du bekrefter, sendes CV-teksten, annonsen og svarene dine til en ekstern språkmodell.', 400]]
    : [['Mock-modus er på.', 600], [' Svarene er ferdiglagde eksempler, og ingen tekst sendes til en språkmodell.', 400]];
  const t = text(colX + 32, y + 12, runs, { size, lh, maxW: colW - 32 });
  const h = t.h + 24;
  const s = `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${api ? C.gapBg : C.sand}"/>` + rule(0, y + h - 1, W, api ? C.gapLine : C.line) +
    icon(api ? 'send' : 'shield', colX, y + 12 + (lh - 22) / 2, 22, api ? C.gap : C.ink) + t.svg;
  return { svg: s, h };
}
const STEPS = ['CV og annonse', 'Gap-analyse', 'Teksten'];
function stepper(x, y, w, cur) {
  let s = '';
  const r = 20, cy = y + 28;
  const xs = [x + r + 6, x + w / 2, x + w - r - 6];
  for (let i = 0; i < 2; i++) {
    const done = cur > i + 1;
    s += done
      ? `<rect x="${xs[i] + r + 8}" y="${cy - 1.5}" width="${xs[i + 1] - xs[i] - 2 * r - 16}" height="3" rx="1.5" fill="${C.accent}"/>`
      : `<line x1="${xs[i] + r + 8}" y1="${cy}" x2="${xs[i + 1] - r - 8}" y2="${cy}" stroke="${C.border}" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>`;
  }
  xs.forEach((cx, i) => {
    const n = i + 1, anchor = i === 0 ? 'start' : i === 1 ? 'middle' : 'end';
    const lx = i === 0 ? x : i === 1 ? cx : x + w;
    if (n < cur) {
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.accent}"/><path d="M${cx - 8} ${cy}l5.5 5.5 10.5-11" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (n === cur) {
      s += `<circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="${C.accentSoft}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.accent}"/><text x="${cx}" y="${cy + 6.5}" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">${n}</text>`;
    } else {
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.surface}" stroke="${C.border}" stroke-width="2"/><text x="${cx}" y="${cy + 6.5}" font-size="18" font-weight="600" fill="${C.muted}" text-anchor="middle">${n}</text>`;
    }
    const ly = cy + r + 34;
    s += `<text x="${lx}" y="${ly}" font-size="18" font-weight="${n === cur ? 700 : 400}" fill="${n > cur ? C.muted : C.ink}" text-anchor="${anchor}">${STEPS[i]}</text>`;
    const sub = n < cur ? 'Ferdig' : n === cur ? 'Du er her' : '';
    if (sub) s += `<text x="${lx}" y="${ly + 22}" font-size="14" font-weight="${n === cur ? 600 : 400}" fill="${n === cur ? C.accent : C.muted}" text-anchor="${anchor}">${sub}</text>`;
  });
  return { svg: s, h: 28 + r + 34 + 30 };
}
function stepperMobile(x, y, w, cur) {
  let s = `<text x="${x}" y="${y + 15}" font-size="14" fill="${C.muted}">Steg ${cur} av 3</text>`;
  s += `<text x="${x}" y="${y + 44}" font-size="21" font-weight="700" fill="${C.ink}">${STEPS[cur - 1]}</text>`;
  const bw = 26, gap = 6, bx = x + w - (bw * 3 + gap * 2);
  for (let i = 0; i < 3; i++) s += `<rect x="${bx + i * (bw + gap)}" y="${y + 32}" width="${bw}" height="6" rx="3" fill="${i < cur ? C.accent : C.line}"/>`;
  s += `<text x="${x + w}" y="${y + 15}" font-size="14" fill="${C.muted}" text-anchor="end">Neste: ${cur < 3 ? STEPS[cur] : 'kopier teksten'}</text>`;
  return { svg: s, h: 56 };
}
// «Neste-linjen»: signaturmønsteret. Regel, setning om hva som skjer, så knappene.
function nextBar(x, y, w, o) {
  const mob = w < 400;
  let s = rule(x, y, w), cy = y + 24;
  if (o.status) { const r = o.status(x, cy, w); s += r.svg; cy += r.h + 18; }
  if (o.text) {
    const t = text(x + 30, cy, [['Neste: ', 600], [o.text, 400]], { size: mob ? 15 : 16, lh: 24, maxW: w - 30, fill: C.ink });
    s += icon('arrowRight', x, cy + 1, 20, C.accent) + t.svg; cy += t.h + 18;
  }
  const pk = o.primaryKind || 'primary';
  if (mob) {
    if (o.secondary) { const b = button(x, cy, o.secondary, { kind: 'secondary', w, h: 50, icon: o.secondaryIcon, focus: o.focusSecondary }); s += b.svg; cy += 50 + 12; }
    const b = button(x, cy, o.primary, { kind: pk, w, h: 56, icon: o.primaryIcon, spinner: o.spinner, focus: o.focusPrimary }); s += b.svg; cy += 56;
  } else {
    const pw = Math.max(240, btnWidth(o.primary, { icon: o.primaryIcon || o.spinner, padX: 32 }));
    s += button(x + w - pw, cy, o.primary, { kind: pk, w: pw, h: 56, icon: o.primaryIcon, spinner: o.spinner, focus: o.focusPrimary }).svg;
    if (o.secondary) s += button(x, cy + 2, o.secondary, { kind: 'secondary', h: 52, icon: o.secondaryIcon, focus: o.focusSecondary }).svg;
    cy += 56;
  }
  return { svg: s, h: cy - y };
}

function svgDoc(W, H, title, desc, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
${body}
</svg>
`;
}

module.exports = { C, FONT, esc, measure, text, wrapRuns, icon, spinner, button, btnWidth, link, label, fieldError, input, textarea, counter, message, chip, radioCard, toggle, sitat, rule, header, modeBanner, stepper, stepperMobile, nextBar, svgDoc, focusRing, SAFE };
