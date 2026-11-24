/*
 * Tar skjermbilder av hver skjerm i hvert konsept til oversikt.html, og sjekker
 * horisontal overflyt ved 375 px. Ingen avhengigheter: styrer lokal Chrome via
 * DevTools-protokollen (krever Node 22+ for innebygd WebSocket).
 *
 * Kjør fra prosjektroten:
 *   node _bmad-output/planning-artifacts/ux/elisabeth/verktoy/skjermbilder.cjs
 */
'use strict';
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const mappe = path.resolve(__dirname, '..');
const utMappe = path.join(mappe, 'skjermer');
const konsepter = ['konsept-1-solnedgang', 'konsept-2-elektrisk', 'konsept-3-bento'];
const skjermer = ['01', '03', '08', '10', '16']; // samme rekkefølge som figurene i konseptfilene
const chromeSti = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const vent = ms => new Promise(r => setTimeout(r, ms));

async function startChrome() {
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'supersoker-skjermbilder-'));
  const chrome = spawn(chromeSti, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
    '--remote-debugging-port=0', `--user-data-dir=${profil}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((ok, feil) => {
    let buffer = '';
    chrome.stderr.on('data', d => {
      buffer += d;
      const treff = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (treff) ok(treff[1]);
    });
    chrome.on('exit', kode => feil(new Error(`Chrome avsluttet (${kode}). Sett CHROME_PATH hvis Chrome ligger et annet sted.`)));
  });
  return { chrome, wsUrl };
}

function lagKlient(ws) {
  let nesteId = 0;
  const venter = new Map();
  ws.addEventListener('message', e => {
    const melding = JSON.parse(e.data);
    if (melding.id && venter.has(melding.id)) {
      const { ok, feil } = venter.get(melding.id);
      venter.delete(melding.id);
      melding.error ? feil(new Error(melding.error.message)) : ok(melding.result);
    }
  });
  return (method, params = {}, sessionId) => new Promise((ok, feil) => {
    const id = ++nesteId;
    venter.set(id, { ok, feil });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

async function main() {
  fs.mkdirSync(utMappe, { recursive: true });
  const { chrome, wsUrl } = await startChrome();
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r));
  const send = lagKlient(ws);
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => send(m, p, sessionId);
  const evaluer = async uttrykk => (await s('Runtime.evaluate', { expression: uttrykk, returnByValue: true })).result.value;
  const åpne = async (fil, bredde) => {
    await s('Emulation.setDeviceMetricsOverride', { width: bredde, height: 900, deviceScaleFactor: 1, mobile: false });
    await s('Page.navigate', { url: pathToFileURL(path.join(mappe, fil + '.html')).href });
    await vent(600);
  };

  let feil = 0;
  for (const konsept of konsepter) {
    await åpne(konsept, 1440);
    const bokser = await evaluer(`[...document.querySelectorAll('figure .ramme')].map(el => {
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
    })`);
    if (bokser.length !== skjermer.length) throw new Error(`${konsept}: fant ${bokser.length} skjermer, ventet ${skjermer.length}`);
    for (const [i, boks] of bokser.entries()) {
      const { data } = await s('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...boks, scale: 1 } });
      const navn = `${konsept.slice(0, 9)}-${skjermer[i]}.png`;
      fs.writeFileSync(path.join(utMappe, navn), Buffer.from(data, 'base64'));
      console.log('skrev skjermer/' + navn);
    }

    await åpne(konsept, 375);
    const bredde = await evaluer('document.documentElement.scrollWidth');
    const ok = bredde <= 375;
    if (!ok) feil++;
    console.log(`${ok ? 'OK  ' : 'FEIL'} ${konsept}: scrollWidth ${bredde} px ved 375 px`);
  }

  ws.close();
  chrome.kill();
  process.exitCode = feil ? 1 : 0;
}

main().catch(e => { console.error(e); process.exit(1); });
