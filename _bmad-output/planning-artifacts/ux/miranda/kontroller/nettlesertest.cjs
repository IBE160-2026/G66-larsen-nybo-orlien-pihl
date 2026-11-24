/* Dependency-free local Chrome/CDP check. Run: node <path>/nettlesertest.cjs */
'use strict';
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const out = __dirname;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'supersoker-browser-'));
const results = {date: new Date().toISOString(), browser: 'Chrome headless via CDP', checks: [], consoleErrors: [], externalRequests: [], screenshots: []};
const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'], {windowsHide:true,stdio:['ignore','ignore','pipe']});
let ws, nextId = 0;
const pending = new Map();
const sleep = ms => new Promise(r => setTimeout(r,ms));
function check(name, condition, details='') { results.checks.push({name, passed: Boolean(condition), details}); if (!condition) throw new Error(name + ': ' + details); console.log('PASS ' + name); }
async function send(method, params={}) { const id=++nextId; return new Promise((resolve,reject) => { const timeout=setTimeout(()=>{pending.delete(id); reject(new Error('CDP timeout '+method));},12000); pending.set(id,{resolve:v=>{clearTimeout(timeout);resolve(v);},reject:e=>{clearTimeout(timeout);reject(e);}}); ws.send(JSON.stringify({id,method,params})); }); }
async function evaluate(expression) { const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true}); if(r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' '+JSON.stringify(r.exceptionDetails.exception)); return r.result.value; }
const click = async id => { await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`); await sleep(40); };
const value = id => evaluate(`document.getElementById(${JSON.stringify(id)}).value`);
const text = id => evaluate(`document.getElementById(${JSON.stringify(id)}).textContent`);
const visible = id => evaluate(`!document.getElementById(${JSON.stringify(id)}).hidden`);
const fill = (id,v) => evaluate(`(()=>{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(v)};e.dispatchEvent(new Event('input',{bubbles:true}));})()`);
async function waitFor(expression) { for(let i=0;i<60;i++) { if(await evaluate(expression)) return; await sleep(100); } throw new Error('Wait failed: '+expression); }
async function select(id,v) { await evaluate(`(()=>{let e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(v)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`); }
async function loadScenario(v) { await evaluate(`document.querySelector('.demo-tools').open=true`); await select('scenario',v); await click('load-scenario'); if(await evaluate(`document.getElementById('confirm-dialog').open`)) await click('dialog-confirm'); }
async function analysis() {await click('analyse');await waitFor(`!document.getElementById('step-2').hidden`);}
async function generate() { await click('generate'); if(await evaluate(`document.getElementById('confirm-dialog').open`)) await click('dialog-confirm'); await waitFor(`!document.getElementById('step-3').hidden`); }
async function go(n) { await evaluate(`document.querySelector('.step-nav [data-go="${n}"]').click()`); }
async function screenshot(name,width,height) { await evaluate('document.activeElement.blur();window.scrollTo(0,0)'); await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600}); await evaluate('window.scrollTo(0,0)'); await sleep(120); const overflow=await evaluate('document.documentElement.scrollWidth > innerWidth'); check('Ingen horisontal overflyt '+name,!overflow); const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true}); fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(shot.data,'base64')); results.screenshots.push(name+'.png'); }
async function main() {
  const browserURL=await new Promise((resolve,reject)=>{let stderr='';const timer=setTimeout(()=>reject(new Error('Chrome startup timeout '+stderr)),15000); browser.once('error',e=>{clearTimeout(timer);reject(e);});browser.stderr.on('data',d=>{stderr+=d.toString();const m=stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});});
  const port=new URL(browserURL).port;
  let targets=await (await fetch('http://127.0.0.1:'+port+'/json')).json();
  const target=targets.find(t=>t.type==='page');
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown'){results.consoleErrors.push(m.params.exceptionDetails.text);}else if(m.method==='Network.requestWillBeSent'&&/^https?:/.test(m.params.request.url)){results.externalRequests.push(m.params.request.url);}});
  await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:pathToFileURL(path.resolve(out,'../konsept-1-veiviser.html')).href});
  await waitFor(`document.readyState==='complete' && !!window.SUPERSOKER_SCENARIOS`);
  results.userAgent=await evaluate('navigator.userAgent');
  check('Start viser simulert konto og mock-modus',await visible('auth') && await evaluate(`document.querySelector('.mock-banner').textContent.includes('Mock-modus')`));
  await screenshot('innlogging-pc',1440,1100);
  await click('auth-submit');check('Ugyldig e-post valideres og får fokus',await evaluate(`document.activeElement.id==='email' && document.getElementById('auth-error').textContent.length>0`));
  await click('register-tab');await fill('email','fiktiv@example.com');await fill('password','kort');await click('auth-submit');check('Registrering krever åtte tegn',await text('auth-error').then(t=>t.includes('8 tegn')));
  await click('login-tab');await fill('email','test@example.com');await fill('password','Test1234');await click('auth-submit');
  check('Innlogging med testbruker',await visible('workspace'));
  await click('analyse');check('Tom CV blokkerer analyse og får fokus',await evaluate(`document.activeElement.id==='cv' && document.getElementById('cv').getAttribute('aria-invalid')==='true'`));
  await click('load-example');check('Eksempel fyller CV, annonse og stillingsdata', (await value('cv')).includes('Ida Testesen')&&(await value('ad')).includes('Testvik')&&Boolean(await value('job-title')));
  await screenshot('steg-1-pc',1440,1100);await screenshot('steg-1-mobil-375',375,900);await screenshot('steg-1-mobil-390',390,900);await screenshot('steg-1-pc-1280',1280,1100);
  await analysis();check('Analyse har ett gap og tre dokumenterte krav',await evaluate(`document.querySelectorAll('.requirement.gap').length===1 && document.querySelectorAll('.requirement.documented').length===3`));
  check('Stegbytte fokuserer overskriften',await evaluate(`document.activeElement.id==='heading-2'`));
  check('Dokumenterte krav har CV-sitater',await evaluate(`Array.from(document.querySelectorAll('.requirement.documented blockquote')).every(e=>e.textContent.trim().length>20)`));
  results.contrast=await evaluate(`(()=>{const lum=rgb=>{const c=rgb.match(/\\d+(?:\\.\\d+)?/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});return .2126*c[0]+.7152*c[1]+.0722*c[2];};return ['.section-subheading p','.requirement.gap label','#generate','.requirement.gap .pill','.requirement.documented .pill'].map(selector=>{const e=document.querySelector(selector),s=getComputedStyle(e);let p=e,bg=s.backgroundColor;while(bg==='rgba(0, 0, 0, 0)'&&p.parentElement){p=p.parentElement;bg=getComputedStyle(p).backgroundColor;}if(bg==='rgba(0, 0, 0, 0)')bg='rgb(255,255,255)';const a=lum(s.color),b=lum(bg);return {selector,color:s.color,background:bg,ratio:Math.round((Math.max(a,b)+.05)/(Math.min(a,b)+.05)*100)/100};});})()`);
  for(const pair of results.contrast) check('Tekstkontrast minst 4,5:1 '+pair.selector,pair.ratio>=4.5,JSON.stringify(pair));
  await screenshot('steg-2-mobil',390,900);await screenshot('steg-2-pc',1440,1100);
  const answerId=await evaluate(`document.querySelector('[data-answer]').id`);
  await fill(answerId,'Jeg har ikke førerkort.');await generate();
  check('Negativt svar beholdes ordrett i søknaden',(await value('letter')).includes('Jeg har ikke førerkort.')&&!(await value('letter')).includes('Jeg har førerkort'));
  await screenshot('steg-3-pc',1440,1100);await screenshot('steg-3-mobil',390,900);
  await fill('letter',(await value('letter'))+'\n\nMIN EGEN REDIGERING');const edited=await value('letter');
  await go(2);await go(3);check('Navigasjon beholder egenredigert tekst',(await value('letter'))===edited);
  await send('Page.reload');await waitFor(`document.readyState==='complete' && !document.getElementById('step-3').hidden`);check('Oppdatering beholder innlogget økt og redigering',(await value('letter'))===edited);
  // Clipboard fallback is forced so headless clipboard permissions do not mask the UX branch.
  await evaluate(`Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('test denied'))}})`);await click('copy');await sleep(80);
  check('Kopiering har markeringsfallback',await evaluate(`document.getElementById('copy-status').textContent.includes('markert') && document.getElementById('letter').selectionEnd-document.getElementById('letter').selectionStart===document.getElementById('letter').value.length`));
  await go(2);await fill(answerId,'Jeg holder på å ta førerkort.');await click('generate');check('Erstatning av egen tekst krever bekreftelse',await evaluate(`document.getElementById('confirm-dialog').open`));await click('dialog-cancel');await go(3);check('Avbrutt erstatning beholder teksten',(await value('letter'))===edited);
  await go(2);await click('generate');await click('dialog-confirm');await waitFor(`!document.getElementById('step-3').hidden`);check('Bekreftet erstatning bevarer begrensning',(await value('letter')).includes('Jeg holder på å ta førerkort.')&&!(await value('letter')).includes('MIN EGEN REDIGERING'));
  const before=await value('letter');await click('edit-input-3');await click('dialog-cancel');check('Avbrutt CV-endring beholder resultat og lås',(await value('letter'))===before&&await evaluate(`document.getElementById('cv').readOnly`));
  await click('edit-input-3');await click('dialog-confirm');check('Bekreftet CV-endring forkaster analyse, svar og tekst',await evaluate(`!document.getElementById('step-1').hidden && !document.getElementById('cv').readOnly && !document.getElementById('letter').value && !document.getElementById('missing-list').children.length`));
  await loadScenario('0');await select('failure','timeout');await click('analyse');await waitFor(`!document.getElementById('action-error').hidden`);check('Tidsavbrudd viser feil og beholder CV',(await text('action-error-text')).includes('tidsavbrudd')&&Boolean(await value('cv')));await click('retry');await waitFor(`!document.getElementById('step-2').hidden`);check('Manuell retry virker',await visible('step-2'));
  for(const scenario of ['0','1','2','3','none','conditions','only-conditions']) {
    await loadScenario(scenario);await analysis();
    if(scenario==='3') check('Alle krav dokumentert uten svarfelt',await evaluate(`document.querySelectorAll('[data-answer]').length===0 && document.getElementById('missing-list').textContent.includes('Alle kompetansekrav')`));
    if(scenario==='none') check('Ingen tydelige krav vises som tomtilstand',await text('missing-list').then(t=>t.includes('ingen tydelige krav')));
    if(scenario==='conditions'||scenario==='only-conditions') check('Ansettelsesvilkår er separat '+scenario,await visible('conditions')&&await text('conditions').then(t=>t.includes('Politiattest')));
    check('Kjent eksempel er ikke feilaktig merket egen tekst '+scenario,await evaluate(`document.getElementById('custom-warning').hidden`));
    await generate();check('Helt søknadsutkast er brev '+scenario,!(await value('letter')).startsWith('•')&&(await value('letter')).includes('Vennlig hilsen'));
    await go(2);
    await evaluate(`document.querySelector('[name="output-mode"][value="tips"]').click()`);await generate();
    check('Forslag er en liste '+scenario,(await value('letter')).startsWith('•'));
    check('Veiledning kopieres ikke som søknad '+scenario,!(await value('letter')).includes('Veiledning'));
  }
  await loadScenario('0');await select('failure','citation');await click('analyse');await waitFor(`!document.getElementById('action-error').hidden`);check('Ugyldig sitat avviser hele analysen',await evaluate(`document.getElementById('step-2').hidden && document.getElementById('action-error-text').textContent.includes('Hele analysen')`));
  await select('failure','config');await click('analyse');await waitFor(`!document.getElementById('action-error').hidden`);check('Konfigurasjonsfeil tilbyr ikke retry',await evaluate(`document.getElementById('retry').hidden`));
  await click('simulate-pdf');check('Skannet PDF vises tydelig som simulert',(await text('file-message')).includes('Simulert feil'));
  await click('expire-session');check('Simulert øktutløp tømmer data',await visible('auth')&&!(await value('cv'))&&await evaluate(`sessionStorage.getItem('supersoker-miranda-konsept-1-v1')===null`));
  await click('demo-login');await click('load-example');await analysis();await generate();await click('logout');await click('demo-login');check('Utlogging og ny innlogging gir tom økt',!(await value('cv'))&&!(await value('letter')));
  await click('file-tab');
  await evaluate(`(()=>{const dt=new DataTransfer();dt.items.add(new File(['Fiktiv Person\\nUTDANNING\\nFiktivt studium'],'cv.txt',{type:'text/plain'}));document.getElementById('cv-file').files=dt.files;document.getElementById('cv-file').dispatchEvent(new Event('change'));})()`);
  await waitFor(`document.getElementById('cv').value.includes('Fiktiv Person')`);check('TXT-opplasting leser faktisk lokal tekst',(await value('cv')).includes('Fiktivt studium'));
  const txtCv=await value('cv');
  await evaluate(`(()=>{const dt=new DataTransfer();dt.items.add(new File(['feil format'],'cv.docx'));document.getElementById('cv-file').files=dt.files;document.getElementById('cv-file').dispatchEvent(new Event('change'));})()`);
  check('Feil filformat bevarer gyldig CV',(await value('cv'))===txtCv&&(await text('file-message')).includes('kan ikke leses'));
  await evaluate(`(()=>{const dt=new DataTransfer();dt.items.add(new File([new Uint8Array(2*1024*1024+1)],'stor.txt',{type:'text/plain'}));document.getElementById('cv-file').files=dt.files;document.getElementById('cv-file').dispatchEvent(new Event('change'));})()`);
  check('Fil over 2 MB avvises uten datatap',(await value('cv'))===txtCv&&(await text('file-message')).includes('2 MB'));
  await evaluate(`(()=>{const dt=new DataTransfer();dt.items.add(new File(['%PDF-example'],'cv.pdf',{type:'application/pdf'}));document.getElementById('cv-file').files=dt.files;document.getElementById('cv-file').dispatchEvent(new Event('change'));})()`);
  check('PDF-funksjon er tydelig merket simulert',(await text('file-message')).includes('Simulert PDF-lesing'));
  await fill('cv','Fiktiv Person\\nAnnen erfaring');await fill('ad','Sommerjobb i Fiktiv AS med kundekontakt.');await fill('job-title','Sommerjobb');await fill('employer','Fiktiv AS');await analysis();check('Egen tekst merkes som fast eksempelsvar',await visible('custom-warning')&&(await text('custom-warning')).includes('ikke analysert'));
  await go(1);
  await evaluate(`document.getElementById('load-example').focus()`);await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});check('Tab flytter tastaturfokus',await evaluate(`document.activeElement.id!=='load-example' && document.activeElement!==document.body`));
  check('Synlige skjemafelt har etiketter',await evaluate(`Array.from(document.querySelectorAll('input:not([type="radio"]),textarea,select')).filter(e=>!!e.getClientRects().length).every(e=>e.labels?.length>0)`));
  check('Ingen eksterne HTTP-forespørsler fra appen',results.externalRequests.length===0,JSON.stringify(results.externalRequests));
  check('Ingen JavaScript-unntak i nettleseren',results.consoleErrors.length===0,JSON.stringify(results.consoleErrors));
}
(async()=>{try{await main();results.passed=true;}catch(error){results.passed=false;results.error=error.stack;console.error(error.stack);process.exitCode=1;}finally{fs.writeFileSync(path.join(out,'test-results.json'),JSON.stringify(results,null,2)+'\n');if(ws?.readyState===1){try{await send('Browser.close');}catch{}ws.close();}if(browser.exitCode===null){await sleep(800);if(browser.exitCode===null)browser.kill();}await sleep(400);try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});}catch(e){console.error('Temp profile cleanup: '+e.message);}console.log('Results: '+path.join(out,'test-results.json'));}})();
