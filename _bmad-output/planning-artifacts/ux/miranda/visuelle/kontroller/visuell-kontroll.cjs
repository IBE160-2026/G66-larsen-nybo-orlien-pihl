/* Lokal visuell kontroll uten eksterne pakker. Kjør med Node og Chrome på Windows. */
'use strict';
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {createHash} = require('node:crypto');
const out = __dirname;
const ux = path.resolve(out,'../..');
const profile = fs.mkdtempSync(path.join(os.tmpdir(),'supersoker-visual-'));
const originalPaths = ['konsept-1-veiviser.html','konsept-1.css','felles/prototype-logikk.js','felles/scenarioer.js','README.md','spec-konsept-1.md'];
const hash = relative => createHash('sha256').update(fs.readFileSync(path.join(ux,relative))).digest('hex');
const originalHashes = Object.fromEntries(originalPaths.map(p=>[p,hash(p)]));
const results = {date:new Date().toISOString(),browser:'Chrome headless/CDP on Windows',checks:[],consoleErrors:[],externalRequests:[],screenshots:[],contrast:[],originalHashes};
const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
let ws,nextId=0;
const pending=new Map();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function check(name,condition,details=''){results.checks.push({name,passed:Boolean(condition),details});console.log((condition?'PASS ':'FAIL ')+name);if(!condition)throw new Error(name+': '+details);}
async function send(method,params={}){const id=++nextId;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout '+method));},12000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r);},reject:e=>{clearTimeout(timer);reject(e);}});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function waitFor(expression){for(let i=0;i<70;i++){if(await evaluate(expression))return;await sleep(80);}throw new Error('Wait failed '+expression);}
async function click(id){await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`);await sleep(60);}
async function navigate(relative,ready){await send('Page.navigate',{url:pathToFileURL(path.join(ux,relative.split('#')[0])).href+(relative.includes('#')?'#'+relative.split('#')[1]:'')});await waitFor(ready);}
async function viewport(width,height){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});await evaluate('document.activeElement.blur();window.scrollTo(0,0)');await sleep(70);}
async function screenshot(name,width,height){await viewport(width,height);const metrics=await send('Page.getLayoutMetrics');const size=metrics.cssContentSize;const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:size.width,height:size.height,scale:1}});fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(shot.data,'base64'));results.screenshots.push({name:name+'.png',viewport:[width,height],size:[size.width,size.height]});}
async function shots(concept,screen){await screenshot(`k${concept}-${screen}-pc`,1440,1000);await screenshot(`k${concept}-${screen}-mobil`,390,844);}
async function setScreen(screen){await evaluate(`location.hash=${JSON.stringify(screen)}`);await waitFor(`document.body.dataset.screen===${JSON.stringify(screen)}`);}
async function start(){
 const endpoint=await new Promise((resolve,reject)=>{let text='';const timer=setTimeout(()=>reject(new Error('Chrome startup timeout '+text)),15000);browser.once('error',e=>{clearTimeout(timer);reject(e);});browser.stderr.on('data',data=>{text+=data;const m=text.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});});
 const port=new URL(endpoint).port;const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
 ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown')results.consoleErrors.push(m.params.exceptionDetails.text);else if(m.method==='Network.requestWillBeSent'&&/^https?:/.test(m.params.request.url))results.externalRequests.push(m.params.request.url);});
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');results.userAgent=await evaluate('navigator.userAgent');
}
async function contrast(concept){
 const pairs=await evaluate(`(()=>{const lum=rgb=>{const x=rgb.match(/\\d+(?:\\.\\d+)?/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return .2126*x[0]+.7152*x[1]+.0722*x[2];};return ['.intro','.gap-card > p','.status.missing','.status.documented','.bottom-actions .action:not(.secondary)'].map(selector=>{const e=document.querySelector('[data-screen="analyse"] '+selector),s=getComputedStyle(e);let p=e,bg=s.backgroundColor;while(bg==='rgba(0, 0, 0, 0)'&&p.parentElement){p=p.parentElement;bg=getComputedStyle(p).backgroundColor;}const a=lum(s.color),b=lum(bg);return {selector,color:s.color,background:bg,ratio:Math.round((Math.max(a,b)+.05)/(Math.min(a,b)+.05)*100)/100};});})()`);
 results.contrast.push({concept,pairs});for(const p of pairs)check(`k${concept} tekstkontrast ${p.selector}`,p.ratio>=4.5,JSON.stringify(p));
}
async function main(){
 await start();await viewport(1440,1000);
 await navigate('konsept-1-veiviser.html',`document.readyState==='complete' && !!document.getElementById('demo-login')`);
 await click('demo-login');await click('load-example');
 const baseline=await evaluate(`({cv:document.getElementById('cv').value,ad:document.getElementById('ad').value})`);
 await shots(1,'cv');await click('analyse');await waitFor(`!document.getElementById('step-2').hidden`);
 check('Referanse konsept 1 har ett gap og tre dokumenterte krav',await evaluate(`document.querySelectorAll('.requirement.gap').length===1&&document.querySelectorAll('.requirement.documented').length===3`));
 const referenceQuotes=await evaluate(`Array.from(document.querySelectorAll('.requirement.documented blockquote')).map(e=>e.firstChild.textContent.trim())`);
 await shots(1,'analyse');
 await evaluate(`(()=>{const e=document.querySelector('[data-answer]');e.value='Jeg har ikke førerkort.';e.dispatchEvent(new Event('input'));})()`);await click('generate');await waitFor(`!document.getElementById('step-3').hidden`);
 baseline.letter=await evaluate(`document.getElementById('letter').value`);await shots(1,'tekst');
 for(const concept of [2,3]){
  const file=concept===2?'konsept-2-editorial.html':'konsept-3-bold.html';
  await navigate(file+'#analyse',`document.readyState==='complete'&&document.body.dataset.screen==='analyse'`);
  check(`k${concept} analyse har felles stilling og dokumentasjon`,await evaluate(`document.querySelectorAll('.documented-card').length===3&&document.querySelectorAll('.gap-card').length===1&&document.querySelector('.summary h2').textContent==='3 av 4 kompetansekrav dokumentert'&&document.querySelector('.gap-card h3').textContent==='Førerkort klasse B'`));
  const quotes=await evaluate(`Array.from(document.querySelectorAll('.documented-card blockquote')).map(e=>e.firstChild.textContent.trim())`);
  check(`k${concept} samme CV-sitater som konsept 1`,JSON.stringify(quotes)===JSON.stringify(referenceQuotes),JSON.stringify(quotes));
  check(`k${concept} identisk CV og annonse`,await evaluate(`document.getElementById('mock-cv').value===${JSON.stringify(baseline.cv)}&&document.getElementById('mock-ad').value===${JSON.stringify(baseline.ad)}`));
  check(`k${concept} identisk søknadstekst med negativt svar`,await evaluate(`document.getElementById('mock-letter').value===${JSON.stringify(baseline.letter)}`));
  check(`k${concept} tydelig statisk mockup`,await evaluate(`document.querySelector('.mock-footer').textContent.includes('Statisk designforslag')&&document.getElementById('mock-letter').readOnly`));
  await contrast(concept);
  for(const screen of ['cv','analyse','tekst']){
   await setScreen(screen);
   check(`k${concept} navigasjon viser bare ${screen}`,await evaluate(`!document.body.hidden && Array.from(document.querySelectorAll('section[data-screen]')).filter(e=>e.getClientRects().length>0).length===1&&document.querySelector('[data-screen-link="${screen}"]').getAttribute('aria-current')==='page'`));
   check(`k${concept} felter har etiketter ${screen}`,await evaluate(`Array.from(document.querySelectorAll('[data-screen="${screen}"] input,[data-screen="${screen}"] textarea')).every(e=>e.labels.length>0)`));
   for(const width of [375,390,1280,1440]){await viewport(width,width<700?844:1000);check(`k${concept} ingen overflyt ${screen} ${width}px`,await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
   await shots(concept,screen);
  }
 }
 await navigate('sammenligning.html',`document.readyState==='complete'&&!!document.querySelector('.concept-grid')`);
 for(const screen of ['cv','analyse','tekst'])for(const device of ['pc','mobil']){
  await evaluate(`document.querySelector('[data-view="${screen}"]').click();document.querySelector('button[data-device="${device}"]').click()`);
  await waitFor(`Array.from(document.querySelectorAll('.concept-card img')).every(i=>i.complete&&i.naturalWidth>0)`);
  check(`Sammenligning samme skjerm/bredde ${screen}/${device}`,await evaluate(`Array.from(document.querySelectorAll('.concept-card img')).every(i=>i.src.endsWith('-${screen}-${device}.png'))`));
 }
 await evaluate(`document.querySelector('[data-view="analyse"]').click();document.querySelector('button[data-device="pc"]').click()`);
 await waitFor(`Array.from(document.querySelectorAll('.concept-card img')).every(i=>i.complete&&i.naturalWidth>0)`);
 for(const width of [375,390,1280,1440]){await viewport(width,width<700?844:1000);check(`Sammenligning ingen overflyt ${width}px`,await evaluate('document.documentElement.scrollWidth<=innerWidth'));}
 await screenshot('sammenligning-pc',1440,1000);await screenshot('sammenligning-mobil',390,844);
 for(const screen of ['cv','analyse','tekst'])for(const concept of [1,2,3])for(const device of ['pc','mobil'])check(`Skjermbilde har rendret innhold k${concept}/${screen}/${device}`,fs.statSync(path.join(out,`k${concept}-${screen}-${device}.png`)).size>15000);
 for(const p of originalPaths)check('Konsept 1 uendret: '+p,hash(p)===originalHashes[p]);
 check('Ingen JS-unntak',results.consoleErrors.length===0,JSON.stringify(results.consoleErrors));check('Ingen eksterne HTTP-kall',results.externalRequests.length===0,JSON.stringify(results.externalRequests));
}
(async()=>{try{await main();results.passed=true;}catch(error){results.passed=false;results.error=error.stack;console.error(error.stack);process.exitCode=1;}finally{fs.writeFileSync(path.join(out,'visuell-rapport.json'),JSON.stringify(results,null,2)+'\n');if(ws?.readyState===1){try{await send('Browser.close');}catch{}ws.close();}if(browser.exitCode===null){await sleep(700);if(browser.exitCode===null)browser.kill();}await sleep(300);try{const resolved=path.resolve(profile);if(resolved.startsWith(path.resolve(os.tmpdir())+path.sep)&&path.basename(resolved).startsWith('supersoker-visual-'))fs.rmSync(resolved,{recursive:true,force:true,maxRetries:5,retryDelay:200});}catch(e){console.error('Temp cleanup: '+e.message);}console.log('Rapport: '+path.join(out,'visuell-rapport.json'));}})();
