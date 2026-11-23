/* Statisk UX-simulering. Ingen server, autentisering eller språkmodell. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  // Textareas normalize Windows line endings. Compare normalized strings too.
  const scenarios = window.SUPERSOKER_SCENARIOS.map(scenario => ({...scenario, cv: scenario.cv.replace(/\r\n?/g,'\n'), ad: scenario.ad.replace(/\r\n?/g,'\n')}));
  const storageKey = 'supersoker-miranda-konsept-1-v1';
  const maxIdle = 30 * 60 * 1000;
  const fresh = () => ({ loggedIn: false, step: 1, cv: '', ad: '', title: '', employer: '', scenario: '0', answers: {}, generatedAnswers: {}, mode: 'full', generatedMode: 'full', analysis: null, letter: '', generatedKey: '', edited: false, lastInput: '', lastActivity: Date.now() });
  let state = fresh();
  let busy = false, generation = 0, cvRevision = 0, retryAction = null, pendingConfirm = null, register = false, focusBeforeDialog = null;
  const escape = text => String(text ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const inputKey = () => JSON.stringify([state.cv, state.ad, state.title, state.employer]);
  const textKey = () => JSON.stringify([state.answers, state.mode]);
  const isExpired = () => Date.now() - state.lastActivity >= maxIdle;

  function save() {
    try { if (state.loggedIn) sessionStorage.setItem(storageKey, JSON.stringify(state)); else sessionStorage.removeItem(storageKey); }
    catch { $('action-status').textContent = 'Nettleseren tillater ikke øktlagring. Data beholdes mens siden er åpen, men kan forsvinne ved oppdatering.'; }
  }
  function sync() {
    ['cv','ad'].forEach(id => state[id] = $(id).value);
    state.title = $('job-title').value;
    state.employer = $('employer').value;
    state.mode = document.querySelector('[name="output-mode"]:checked').value;
    state.letter = $('letter').value;
  }
  function fillInputs() {
    $('cv').value = state.cv; $('ad').value = state.ad;
    $('job-title').value = state.title; $('employer').value = state.employer;
    $('letter').value = state.letter;
    $('scenario').value = state.scenario;
    document.querySelector(`[name="output-mode"][value="${state.mode === 'tips' ? 'tips' : 'full'}"]`).checked = true;
    counters();
  }
  function counters() {
    ['cv','ad'].forEach(id => $(id + '-count').textContent = `${$(id).value.length.toLocaleString('nb-NO')} / 10 000`);
    $('letter-count').textContent = `${$('letter').value.length.toLocaleString('nb-NO')} tegn`;
  }
  function setInputLock() {
    const locked = Boolean(state.analysis);
    ['cv','ad','job-title','employer'].forEach(id => $(id).readOnly = locked || busy);
    ['load-example','cv-file','paste-tab','file-tab'].forEach(id => $(id).disabled = locked || busy);
    $('locked-input').hidden = !locked;
    $('analyse').hidden = locked;
    $('edit-input-1').hidden = !locked;
  }
  function updateControls() {
    const allowed = n => state.loggedIn && !busy && (n === 1 || n === 2 && state.analysis || n === 3 && state.generatedKey);
    document.querySelectorAll('[data-go]').forEach(button => {
      const n = Number(button.dataset.go);
      button.disabled = !allowed(n);
      if (button.closest('.step-nav')) {
        if (n === state.step) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current');
        button.classList.toggle('completed', n < state.step);
      }
    });
    $('view-result').hidden = !state.generatedKey;
    $('pending-changes').hidden = !state.generatedKey || textKey() === state.generatedKey;
    document.querySelectorAll('[data-answer], [data-preset], [name="output-mode"]').forEach(field => field.disabled = busy);
    $('generate').disabled = busy || Boolean(state.generatedKey && textKey() === state.generatedKey);
    $('analyse').disabled = busy || Boolean(state.lastInput && inputKey() === state.lastInput);
    $('load-scenario').disabled = busy;
    $('simulate-pdf').disabled = busy;
    setInputLock();
  }
  function go(step, focus = true) {
    if (busy || !state.loggedIn || step === 2 && !state.analysis || step === 3 && !state.generatedKey) return;
    state.step = step;
    [1,2,3].forEach(n => $('step-' + n).hidden = n !== step);
    updateControls(); save();
    if (focus) { $('heading-' + step).focus(); window.scrollTo({top: 160, behavior:'instant'}); }
  }
  function clearErrors() {
    ['cv','ad','job-title','employer'].forEach(id => { $(id).removeAttribute('aria-invalid'); $(id + '-error').textContent = ''; });
    $('action-error').hidden = true; $('action-status').textContent = ''; $('answer-error').textContent = '';
  }
  function confirmAction(title, description, action, label = 'Bekreft') {
    focusBeforeDialog = document.activeElement;
    $('dialog-heading').textContent = title; $('dialog-description').textContent = description;
    $('dialog-confirm').textContent = label; pendingConfirm = action;
    $('confirm-dialog').showModal(); $('dialog-cancel').focus();
  }
  function discardDerived() {
    generation++; cvRevision++; state.analysis = null; state.answers = {}; state.generatedAnswers = {}; state.letter = ''; state.generatedKey = ''; state.edited = false;
    state.mode = 'full'; $('letter').value = ''; $('copy-status').textContent = ''; clearErrors();
    $('missing-list').replaceChildren(); $('documented-list').replaceChildren(); $('basis').replaceChildren();
    $('conditions').replaceChildren(); $('guidance').replaceChildren();
    document.querySelector('[name="output-mode"][value="full"]').checked = true;
  }
  function requestEdit() {
    if (busy) return;
    confirmAction('Endre CV eller annonse?', 'Svarene, gap-analysen og teksten, inkludert egne redigeringer, forkastes. Avbryt beholder alt slik det er.', () => { discardDerived(); go(1); $('cv').focus(); }, 'Endre og forkast');
  }
  function loadScenario(id) {
    const doLoad = () => {
      discardDerived(); state.lastInput = ''; state.scenario = id;
      const base = scenarios[Number(id)] || scenarios[0];
      state.cv = base.cv; state.ad = scenarioAd(id); state.title = base.title; state.employer = base.employer;
      if (['none','only-conditions'].includes(id)) state.title = 'Sommervikar';
      fillInputs(); go(1); $('action-status').textContent = 'Eksempel lastet inn. Trykk «Analyser kravene».';
    };
    if (state.cv || state.ad || state.analysis) confirmAction('Laste inn et nytt eksempel?', 'CV, annonse, svar og eventuelle resultater erstattes med det valgte fiktive eksemplet.', doLoad, 'Last inn eksempel'); else doLoad();
  }
  function scenarioAd(id) {
    const base = scenarios[Number(id)] || scenarios[0];
    if (id === 'none') return 'Sommervikar – Testvik kommune\nVi tilbyr sommerarbeid i et inkluderende arbeidsmiljø. Ta kontakt for å høre mer.';
    if (id === 'only-conditions') return 'Sommervikar – Testvik kommune\nPolitiattest må fremlegges før tiltredelse.';
    return base.ad + (id === 'conditions' ? '\nPolitiattest må fremlegges før tiltredelse.' : '');
  }
  function scenarioAnalysis() {
    const source = scenarios[Number(state.scenario)] || scenarios[0];
    const custom = state.cv !== source.cv || state.ad !== scenarioAd(state.scenario);
    const data = custom ? scenarios[0] : source;
    const requirements = ['none','only-conditions'].includes(state.scenario) && !custom ? [] : data.requirements;
    const conditions = ['conditions','only-conditions'].includes(state.scenario) && !custom ? ['Politiattest må fremlegges før tiltredelse.'] : [];
    return { requirements, conditions, custom, source: data.id, sourceTitle: data.title, sourceEmployer: data.employer };
  }
  function answerPresets(requirement) {
    if (/førerkort/i.test(requirement.krav)) return ['Jeg har førerkort klasse B.','Jeg har ikke førerkort.','Jeg holder på å ta førerkort.'];
    if (requirement.id === 'tysk') return ['Jeg kan føre en enkel samtale på tysk.','Jeg kan ikke tysk.','Jeg holder på å lære tysk.'];
    return ['Jeg har brukt TIG-sveising på skolen.','Jeg har ikke erfaring med TIG-sveising.','Jeg holder på å lære TIG-sveising.'];
  }
  function renderAnalysis() {
    const {requirements,conditions,custom} = state.analysis;
    const missing = requirements.filter(r => r.status === 'mangler'), documented = requirements.filter(r => r.status === 'dekket');
    $('analysis-job').textContent = `${state.title} · ${state.employer}`;
    $('custom-warning').hidden = !custom;
    $('analysis-summary').textContent = requirements.length ? `${documented.length} av ${requirements.length} kompetansekrav dokumentert` : 'Ingen tydelige kompetansekrav funnet';
    $('missing-list').innerHTML = missing.length ? missing.map(r => `<article class="requirement gap"><div class="requirement-head"><h4>${escape(r.krav)}</h4><span class="pill">Mangler dokumentasjon</span></div><p class="hint">Dette står ikke i CV-en. Du kan beskrive relevant erfaring eller gå videre uten å svare.</p><label for="answer-${escape(r.id)}">Hva vil du legge til? <span class="label-detail">Valgfritt</span></label><textarea id="answer-${escape(r.id)}" data-answer="${escape(r.id)}" rows="2" maxlength="1000" aria-describedby="hint-${escape(r.id)}">${escape(state.answers[r.id] || '')}</textarea><div class="answer-footer"><span id="hint-${escape(r.id)}">Svaret brukes bare i denne søknaden.</span><span data-count="${escape(r.id)}">${(state.answers[r.id] || '').length} / 1 000</span></div><div class="answer-presets" aria-label="Fiktive eksempelsvar">${answerPresets(r).map((answer,i) => `<button type="button" data-preset-id="${escape(r.id)}" data-preset="${i}">Eksempel: ${['har erfaring','har ikke','under opplæring'][i]}</button>`).join('')}</div></article>`).join('') : `<div class="empty"><strong>${requirements.length ? 'Alle kompetansekrav i annonsen er dokumentert i CV-en.' : conditions.length ? 'Vi fant ingen tydelige kompetansekrav i annonsen.' : 'Vi fant ingen tydelige krav i annonsen.'}</strong><p>${requirements.length ? 'Du kan gå rett videre til omskrivingsvalget.' : 'Du kan rette annonsen eller lage tekst basert på CV-en og opplysningene du har gitt.'}</p></div>`;
    $('documented-list').innerHTML = documented.map(r => `<article class="requirement documented"><span class="check-icon" aria-hidden="true">✓</span><div><div class="requirement-head"><h4>${escape(r.krav)}</h4><span class="pill">Dokumentert</span></div><blockquote>«${escape(r.kilde)}»<br><span class="small">Fra ${custom ? 'eksempel-CV-en (testpar 1)' : 'CV-teksten'}</span></blockquote></div></article>`).join('');
    $('conditions').hidden = !conditions.length;
    $('conditions').innerHTML = conditions.length ? `<h3>Ansettelsesvilkår</h3><p>Vises separat fra kompetansekrav. Ingen attest lastes opp eller kontrolleres.</p><ul>${conditions.map(c => `<li>${escape(c)}</li>`).join('')}</ul>` : '';
    $('missing-list').querySelectorAll('[data-answer]').forEach(field => field.addEventListener('input', () => {
      state.answers[field.dataset.answer] = field.value;
      field.parentElement.querySelector('[data-count]').textContent = `${field.value.length} / 1 000`;
      save(); updateControls();
    }));
    $('missing-list').querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
      const r = missing.find(item => item.id === button.dataset.presetId);
      const field = $('answer-' + r.id);
      field.value = answerPresets(r)[Number(button.dataset.preset)]; field.dispatchEvent(new Event('input')); field.focus();
    }));
  }
  async function perform(kind, onSuccess) {
    if (busy || !state.loggedIn) return;
    if (isExpired()) return logout('Økten er utløpt. Midlertidige data er slettet.');
    busy = true; const ticket = ++generation;
    const failure = $('failure').value;
    $('failure').value = 'none'; $('action-error').hidden = true;
    $('action-status').textContent = kind === 'analysis' ? 'Analyserer … (simulert)' : 'Lager tekst … (simulert)';
    const button = kind === 'analysis' ? $('analyse') : $('generate');
    const original = button.innerHTML; button.textContent = kind === 'analysis' ? 'Analyserer …' : 'Lager tekst …';
    updateControls();
    await new Promise(resolve => setTimeout(resolve, 650));
    busy = false; button.innerHTML = original;
    if (ticket !== generation || !state.loggedIn) { updateControls(); return; }
    if (isExpired()) return logout('Økten er utløpt. Midlertidige data er slettet.');
    $('action-status').textContent = '';
    if (failure !== 'none' && !(failure === 'citation' && kind !== 'analysis')) {
      $('action-error').hidden = false;
      $('action-error-text').textContent = failure === 'timeout' ? 'Simulert tidsavbrudd: Vi fikk ikke svar. Inndataene dine er beholdt. Du kan prøve igjen.' : failure === 'citation' ? 'Simulert ugyldig sitat: Hele analysen ble avvist fordi dokumentasjonen ikke kunne bekreftes i CV-teksten. CV og annonse er beholdt.' : 'Simulert konfigurasjonsfeil: API-oppsettet er ugyldig. Den som kjører appen må rette konfigurasjonen. Ingen data er sendt.';
      $('retry').hidden = failure === 'config';
      retryAction = kind === 'analysis' ? analyse : generateText;
      updateControls(); return;
    }
    onSuccess(); save(); updateControls();
  }
  function analyse() {
    if (busy || state.analysis) return;
    sync(); clearErrors(); let invalid = null;
    [['cv','CV-en'],['ad','Stillingsannonsen'],['job-title','Stillingstittelen'],['employer','Arbeidsgiveren']].forEach(([id,label]) => {
      const field = $(id), limit = ['cv','ad'].includes(id) ? 10000 : Infinity;
      if (!field.value.trim() || field.value.length > limit) {
        field.setAttribute('aria-invalid','true');
        $(id + '-error').textContent = !field.value.trim() ? `${label} mangler. Fyll inn feltet før analysen.` : `${label} kan være høyst 10 000 tegn.`;
        invalid ||= field;
      }
    });
    if (invalid) { invalid.focus(); return; }
    if (state.lastInput === inputKey()) { $('action-status').textContent = 'Endre CV eller annonse før du starter en ny analyse.'; return; }
    perform('analysis', () => {
      state.analysis = scenarioAnalysis(); state.lastInput = inputKey();
      const source = scenarios.find(s => s.id === state.analysis.source);
      const citationText = state.analysis.custom ? source.cv : state.cv;
      if (state.analysis.requirements.some(r => r.status === 'dekket' && (!r.kilde || !citationText.includes(r.kilde)))) {
        state.analysis = null; state.lastInput = ''; $('action-error').hidden = false;
        $('action-error-text').textContent = 'Hele analysen ble avvist: Et sitat finnes ikke ordrett i CV-teksten. Inndataene er beholdt.';
        $('retry').hidden = false; retryAction = analyse; return;
      }
      renderAnalysis(); go(2);
    });
  }
  function buildText() {
    const source = scenarios.find(s => s.id === state.analysis.source), name = source.cv.split(/\r?\n/)[0];
    const profiles = {
      '01-mangler-sertifikat': ['Jeg er sykepleierstudent på andre året og trives med å jobbe med mennesker.', 'Som besøksvenn i Røde Kors besøker jeg en eldre dame hver uke for samtale og turer. Gjennom deltidsjobben hos Testvik Mat har jeg også erfaring med kundeservice og med å svare på spørsmål.', 'I et gruppeprosjekt i helsefremmende arbeid planla og holdt vi et kurs om fallforebygging for eldre. Jeg hadde ansvar for å koordinere gruppens møter.'],
      '02-mangler-verktoy': ['Jeg studerer flyteknikk på første året og har stor interesse for fly og motorer.', 'I sommerjobben hos Testvik Bilverksted arbeidet jeg med dekkskift, oljeskift og bremsearbeid. Jeg brukte håndverktøy og momentnøkkel, fulgte verkstedets sjekklister og kvitterte for utført arbeid.', 'Jeg har kjennskap til Word og Excel. På verkstedet brukte jeg Excel til å føre timelister og deleliste.'],
      '03-studieprosjekt-dekker-krav': ['Jeg studerer økonomi og administrasjon på andre året og trives med å møte nye mennesker.', 'Som kafémedarbeider hos Testvik Kaffebar har jeg erfaring med kundeservice ved disk og kassearbeid.', 'I emnet Prosjektledelse planla jeg en næringslivsdag for 80 deltakere sammen med tre medstudenter. Jeg hadde ansvar for program, påmelding og kontakt med foredragsholdere. Jeg snakker og skriver også flytende engelsk.'],
      '04-alle-krav-dekket': ['Jeg er barnehagelærerstudent på tredje året og er glad i å være ute med barn.', 'Som tilkallingsvikar i Testvik barnehage har jeg arbeidet på både småbarns- og storbarnsavdeling, med lek, måltider, stell og turer.', 'Som speiderleder planlegger og leder jeg ukentlige møter og helgeturer for barn mellom åtte og elleve år. Jeg har også gjennomført førstehjelpskurs for barn og unge.']
    };
    const paragraphs = profiles[source.id];
    const answers = state.analysis.requirements.filter(r => r.status === 'mangler' && state.answers[r.id]?.trim()).map(r => state.answers[r.id].trim());
    const answerParagraph = answers.length ? '\n\n' + answers.join('\n') : '';
    // Answers are deliberately copied verbatim, never classified as positive qualifications.
    if (state.mode === 'tips') return [`• Innledning: «Jeg søker på stillingen som ${state.title} hos ${state.employer}. ${paragraphs[0]}»`,...paragraphs.slice(1).map(paragraph => `• Relevant erfaring: «${paragraph}»`),...answers.map(answer => `• Tilleggsopplysningen din, med egne ord: «${answer}»`)].join('\n\n');
    return `Søknad på stillingen som ${state.title}\n\nTil ${state.employer}\n\nJeg søker på stillingen som ${state.title} hos dere. ${paragraphs[0]}\n\n${paragraphs.slice(1).join('\n\n')}${answerParagraph}\n\nJeg håper å få anledning til å fortelle mer om bakgrunnen min i en samtale.\n\nVennlig hilsen\n${name}`;
  }
  function renderResult() {
    $('letter').value = state.letter; $('result-type').textContent = state.generatedMode === 'tips' ? 'Forslag til formuleringer' : 'Helt søknadsutkast';
    const {requirements,custom} = state.analysis;
    const missing = requirements.filter(r => r.status === 'mangler');
    const basis = [`<li><b>Annonse</b>${escape(state.title)} · ${escape(state.employer)}</li>`];
    requirements.filter(r => r.status === 'dekket').forEach(r => basis.push(`<li><b>${custom ? 'Eksempel-CV' : 'CV'} · ${escape(r.krav)}</b>«${escape(r.kilde)}»</li>`));
    const usedAnswers = state.generatedAnswers;
    missing.forEach(r => basis.push(`<li><b>${escape(r.krav)}</b>${usedAnswers[r.id]?.trim() ? `Du har svart: «${escape(usedAnswers[r.id])}». Oppgitt grunnlag, ikke bekreftet kompetanse.` : 'Ikke besvart. Kravet nevnes ikke i teksten.'}</li>`));
    if (!requirements.length) basis.push('<li><b>Fiktiv CV</b>Eksempel på utdanning og erfaring fra valgt testpar.</li>');
    if (custom) basis.unshift('<li><b>Fast eksempel</b>Egne dokumenter er ikke analysert. CV-innholdet under kommer fra testpar 1.</li>');
    $('basis').innerHTML = basis.join('');
    const omitted = missing.filter(r => !usedAnswers[r.id]?.trim());
    $('guidance').hidden = !omitted.length;
    $('guidance').innerHTML = omitted.length ? `<h3>Veiledning – ikke del av søknaden</h3><p>Disse kravene er ikke besvart og nevnes ikke i teksten:</p><ul>${omitted.map(r => `<li>${escape(r.krav)}</li>`).join('')}</ul><p>Veiledningen følger ikke med når du kopierer.</p>` : '';
    $('copy-status').textContent = ''; counters();
  }
  function generateText() {
    if (busy || !state.analysis) return;
    sync();
    const tooLong = Object.entries(state.answers).find(([,answer]) => answer.length > 1000);
    if (tooLong) { $('answer-error').textContent = 'Hvert svar kan være høyst 1 000 tegn.'; $('answer-' + tooLong[0]).focus(); return; }
    if (state.generatedKey === textKey()) { go(3); return; }
    const generate = () => perform('text', () => { state.letter = buildText(); state.generatedMode = state.mode; state.generatedAnswers = {...state.answers}; state.generatedKey = textKey(); state.edited = false; renderResult(); go(3); });
    if (state.edited) confirmAction('Erstatte dine redigeringer?', 'Ny tekst erstatter teksten du har redigert. Kopier det du vil beholde først. Avbryt beholder teksten.', generate, 'Erstatt teksten'); else generate();
  }
  function login() {
    state.loggedIn = true; state.lastActivity = Date.now();
    $('password').value = ''; $('auth-error').textContent = ''; $('auth').hidden = true; $('workspace').hidden = false; $('logout').hidden = false;
    fillInputs(); go(state.step);
  }
  function logout(message = 'Du er logget ut. Midlertidige data er slettet.') {
    generation++; cvRevision++; busy = false; state = fresh(); save(); fillInputs(); clearErrors();
    ['missing-list','documented-list','basis','conditions','guidance'].forEach(id => $(id).replaceChildren());
    $('file-message').textContent = ''; $('cv-file').value = ''; $('failure').value = 'none';
    $('copy-status').textContent = ''; $('auth').hidden = false; $('workspace').hidden = true; $('logout').hidden = true;
    $('password').value = ''; $('auth-error').textContent = message; $('auth-heading').focus(); window.scrollTo(0,0);
  }
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(Number(button.dataset.go))));
  $('load-example').addEventListener('click', () => loadScenario('0'));
  $('load-scenario').addEventListener('click', () => loadScenario($('scenario').value));
  $('analyse').addEventListener('click', analyse); $('generate').addEventListener('click', generateText);
  $('view-result').addEventListener('click', () => go(3));
  ['edit-input-1','edit-input-3'].forEach(id => $(id).addEventListener('click', requestEdit));
  $('retry').addEventListener('click', () => { if (retryAction) retryAction(); });
  $('dialog-cancel').addEventListener('click', () => $('confirm-dialog').close());
  $('dialog-confirm').addEventListener('click', () => { const action = pendingConfirm; pendingConfirm = null; $('confirm-dialog').close(); action?.(); });
  $('confirm-dialog').addEventListener('close', () => { pendingConfirm = null; if (focusBeforeDialog?.isConnected && !focusBeforeDialog.closest('[hidden]')) focusBeforeDialog.focus(); });
  ['cv','ad','job-title','employer'].forEach(id => $(id).addEventListener('input', () => { if (id === 'cv') cvRevision++; sync(); counters(); save(); updateControls(); }));
  document.querySelectorAll('[name="output-mode"]').forEach(radio => radio.addEventListener('change', () => { state.mode = radio.value; save(); updateControls(); }));
  $('letter').addEventListener('input', () => { state.letter = $('letter').value; state.edited = true; counters(); save(); });
  $('copy').addEventListener('click', async () => {
    const text = $('letter').value;
    try { if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable'); await navigator.clipboard.writeText(text); $('copy-status').textContent = 'Kopiert. Lim inn teksten der du skriver søknaden.'; }
    catch { $('letter').focus(); $('letter').select(); $('copy-status').textContent = 'Teksten er markert. Trykk Ctrl+C (Cmd+C på Mac), eller bruk Kopier fra markeringsmenyen på mobil.'; }
  });
  function setCvMode(file) { $('file-area').hidden = !file; $('paste-tab').setAttribute('aria-pressed',String(!file)); $('file-tab').setAttribute('aria-pressed',String(file)); }
  $('paste-tab').addEventListener('click', () => setCvMode(false)); $('file-tab').addEventListener('click', () => setCvMode(true));
  $('cv-file').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file || state.analysis) return;
    const ticket = generation, fileRevision = ++cvRevision;
    const error = message => { $('file-message').textContent = message; event.target.value = ''; };
    if (file.size > 2 * 1024 * 1024) return error(`«${file.name}» er for stor. Grensen er 2 MB. Velg en mindre fil eller lim inn teksten.`);
    if (!/\.(txt|pdf)$/i.test(file.name)) return error(`«${file.name}» kan ikke leses. Velg TXT eller PDF, eller lim inn teksten.`);
    try {
      let text;
      if (/\.pdf$/i.test(file.name)) {
        text = (scenarios[Number(state.scenario)] || scenarios[0]).cv;
        $('file-message').textContent = `Simulert PDF-lesing av «${file.name}»: Her vises eksempel-CV-en, ikke filinnholdet. Sjekk at kolonner og overskrifter kom i riktig rekkefølge i en faktisk app.`;
      } else {
        text = await file.text();
        if (ticket !== generation || fileRevision !== cvRevision || !state.loggedIn || state.analysis) return;
        if (!text.trim()) return error(`«${file.name}» har ingen tekst. Prøv en annen fil eller lim inn teksten.`);
        if (text.length > 10000) return error('CV-teksten kan være høyst 10 000 tegn. Tidligere tekst er beholdt.');
        $('file-message').textContent = `«${file.name}» er lest lokalt. Kontroller og rett teksten under.`;
      }
      $('cv').value = text; sync(); counters(); save(); updateControls();
    } catch { error(`Vi kunne ikke lese «${file.name}». Prøv en ny TXT-fil eller lim inn teksten.`); }
  });
  $('simulate-pdf').addEventListener('click', () => {
    if (state.analysis) { $('action-status').textContent = 'Bruk «Endre CV eller annonse» før du prøver filopplasting.'; return; }
    go(1); setCvMode(true); $('file-message').textContent = 'Simulert feil: «cv-skannet.pdf» ser ut til å være skannet som bilde. Vi fant ingen lesbar tekst. Last opp en tekstbasert PDF eller TXT-fil, eller lim inn teksten. Tidligere gyldig CV-tekst er beholdt.'; $('cv-file').focus();
  });
  $('demo-login').addEventListener('click', login);
  $('auth-form').addEventListener('submit', event => {
    event.preventDefault();
    const email = $('email'), password = $('password');
    if (!email.value.trim() || !email.validity.valid) { $('auth-error').textContent = 'Skriv en gyldig e-postadresse, for eksempel deg@example.com.'; password.value = ''; email.focus(); return; }
    if (register && password.value.length < 8) { $('auth-error').textContent = 'Passordet må ha minst 8 tegn. Bruk et fiktivt passord i prototypen.'; password.value = ''; password.focus(); return; }
    if (!register && !(email.value === 'test@example.com' && password.value === 'Test1234')) { $('auth-error').textContent = 'E-post eller passord er feil. Bruk test@example.com / Test1234, eller knappen «Bruk testbruker».'; password.value = ''; password.focus(); return; }
    login();
  });
  function setAuthMode(value) { register = value; $('login-tab').setAttribute('aria-pressed',String(!value)); $('register-tab').setAttribute('aria-pressed',String(value)); $('auth-title').textContent = value ? 'Opprett en simulert konto' : 'Logg inn og kom i gang'; $('auth-submit').textContent = value ? 'Opprett konto og fortsett →' : 'Logg inn →'; $('auth-error').textContent = ''; $('password').value = ''; }
  $('login-tab').addEventListener('click', () => setAuthMode(false)); $('register-tab').addEventListener('click', () => setAuthMode(true));
  $('logout').addEventListener('click', () => logout()); $('expire-session').addEventListener('click', () => logout('Simulert øktutløp etter 30 minutter uten aktivitet. Midlertidige data er slettet.'));
  ['pointerdown','keydown','input'].forEach(type => document.addEventListener(type, () => { if (!state.loggedIn) return; if (isExpired()) logout('Økten er utløpt. Midlertidige data er slettet.'); else { state.lastActivity = Date.now(); save(); } }, {capture:true}));
  setInterval(() => { if (state.loggedIn && isExpired()) logout('Økten er utløpt. Midlertidige data er slettet.'); }, 5000);
  document.addEventListener('visibilitychange', () => { if (state.loggedIn && isExpired()) logout('Økten er utløpt. Midlertidige data er slettet.'); });
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey));
    if (stored?.loggedIn && stored.lastActivity && Date.now() - stored.lastActivity < maxIdle && [1,2,3].includes(stored.step)) { state = {...fresh(), ...stored}; fillInputs(); if (state.analysis) renderAnalysis(); if (state.generatedKey) renderResult(); $('auth').hidden = true; $('workspace').hidden = false; $('logout').hidden = false; go(state.step,false); }
    else sessionStorage.removeItem(storageKey);
  } catch { /* A blocked or invalid session starts with a clean prototype. */ }
  updateControls();
})();
