/* Presentasjon av faste skjermbilder. Ingen konto-, analyse- eller øktlogikk. */
(() => {
  'use strict';
  const editorial = document.body.dataset.concept === '2';
  const fixture = window.SUPERSOKER_SCENARIOS[0];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const screens = {cv: ['01','CV og annonse'], analyse: ['02','Analyse og svar'], tekst: ['03','Teksten']};
  const letter = `Søknad på stillingen som Sommervikar i hjemmetjenesten\n\nTil Testvik kommune\n\nJeg søker på stillingen som Sommervikar i hjemmetjenesten hos dere. Jeg er sykepleierstudent på andre året og trives med å jobbe med mennesker.\n\nSom besøksvenn i Røde Kors besøker jeg en eldre dame hver uke for samtale og turer. Gjennom deltidsjobben hos Testvik Mat har jeg også erfaring med kundeservice og med å svare på spørsmål.\n\nI et gruppeprosjekt i helsefremmende arbeid planla og holdt vi et kurs om fallforebygging for eldre. Jeg hadde ansvar for å koordinere gruppens møter.\n\nJeg har ikke førerkort.\n\nJeg håper å få anledning til å fortelle mer om bakgrunnen min i en samtale.\n\nVennlig hilsen\nIda Testesen`;
  const wordmark = editorial ? '<span class="monogram" aria-hidden="true">s.</span><span>supersøker<span class="logo-dot">.</span></span>' : '<span class="bold-mark" aria-hidden="true">↗</span><span>SUPER<br>SØKER<span class="logo-dot">.</span></span>';
  const heading = (n, title, description) => `<div class="page-heading"><div><p class="kicker">STEG ${n} AV 3</p><h1 id="title-${n}" tabindex="-1">${title}</h1><p class="intro">${description}</p></div><div class="job-stamp"><span class="small-label">SØKNADEN DIN</span><b>Sommervikar i hjemmetjenesten</b><span>Testvik kommune</span><span class="stamp-line">Ida Testesen · Fiktivt testpar 1</span></div></div>`;
  const button = (href, text, secondary = false) => `<a class="action${secondary ? ' secondary' : ''}" href="#${href}">${text}<span aria-hidden="true">↗</span></a>`;
  const choices = `<section class="writing-choice" aria-labelledby="writing-title"><div><p class="small-label">DITT VALG</p><h2 id="writing-title">Hvor mye skal Supersøker skrive?</h2></div><div class="choices"><div class="choice selected"><span class="radio-shape" aria-hidden="true"></span><div><b>Helt søknadsutkast</b><p>Et sammenhengende brev du redigerer selv.</p></div><span class="selected-caption">Valgt</span></div><div class="choice"><span class="radio-shape" aria-hidden="true"></span><div><b>Forslag til formuleringer</b><p>Setninger du kan bruke i ditt eget brev.</p></div></div></div><p class="snapshot-note">Fast visning av omskrivingsvalget. Ingen tekst genereres i denne mockupen.</p></section>`;

  document.getElementById('mockup').innerHTML = `
    <a class="skip" href="#screen-content">Hopp til innhold</a>
    <div class="review-bar"><span>STATISK DESIGNFORSLAG <b>0${editorial ? '2' : '3'}</b> / ${editorial ? 'PREMIUM · EDITORIAL' : 'MODERNE · BOLD'}</span><a href="sammenligning.html">← Sammenlign retningene</a></div>
    <div class="app-shell">
      <aside class="identity"><a class="wordmark" href="#analyse" aria-label="Supersøker – analysevisning">${wordmark}</a><div class="identity-story"><span class="small-label">DIN NESTE MULIGHET</span><p>${editorial ? 'Et godt<br>utgangspunkt.' : 'DIN ERFARING.<br>DITT NESTE<br>STEG.'}</p><span class="identity-symbol" aria-hidden="true">${editorial ? '✳' : '↗'}</span></div><p class="identity-bottom">Din erfaring.<br>Dine ord.</p></aside>
      <div class="app-body"><header class="app-header"><span class="edition">${editorial ? 'SØKNADSVERKSTEDET' : 'SØKNAD / 001'}</span><span class="user-name">Ida Testesen <span class="avatar" aria-hidden="true">IT</span></span></header>
      <div class="mock-note"><span aria-hidden="true">●</span><b>Mock-modus</b><span>Ferdiglagde eksempler. Ingen tekst sendes til en språkmodell.</span></div>
      <nav class="screen-nav" aria-label="Representative skjermbilder">${Object.entries(screens).map(([id,[number,name]]) => `<a href="#${id}" data-screen-link="${id}"><span class="nav-number">${number}</span><span>${name}</span><span class="nav-arrow" aria-hidden="true">↗</span></a>`).join('')}</nav>
      <main id="screen-content">
      <section data-screen="cv" aria-labelledby="title-1">
        ${heading('1','Hva tar du<br><em>med deg?</em>','Start med CV-en din og annonsen for jobben du vil søke på.')}
        <div class="example-strip"><div><b>Et realistisk utgangspunkt.</b><p>Fiktiv CV og en sommerjobb i hjemmetjenesten · Testpar 1 er lastet inn.</p></div><span class="example-loaded">Eksempel lastet inn ✓</span></div>
        <div class="documents"><article class="document-panel"><header><span class="panel-index">A /</span><div><h2>CV-en din</h2><p>Erfaringen vi tar utgangspunkt i</p></div><span class="document-type">TXT / PDF</span></header><div class="static-tabs"><b>Lim inn tekst</b><span>Last opp fil</span></div><label for="mock-cv">CV-tekst <span>Fast eksempel</span></label><textarea id="mock-cv" readonly rows="14">${escape(fixture.cv)}</textarea><p class="field-help">Sjekk at utdanning, erfaring og ferdigheter er med.</p></article><article class="document-panel"><header><span class="panel-index">B /</span><div><h2>Stillingsannonsen</h2><p>Muligheten du vil gripe</p></div></header><p class="ad-help">Lim inn hele annonsen, inkludert stillingstittel, arbeidsgiver og kravene de ser etter.</p><label for="mock-ad">Annonsetekst <span>Fast eksempel</span></label><textarea id="mock-ad" readonly rows="14">${escape(fixture.ad)}</textarea><p class="field-help">Bare tekst. Du trenger ikke en lenke.</p></article></div>
        <div class="job-fields"><div><label for="mock-job">Stillingstittel</label><input id="mock-job" readonly value="Sommervikar i hjemmetjenesten"></div><div><label for="mock-employer">Arbeidsgiver</label><input id="mock-employer" readonly value="Testvik kommune"></div></div><div class="bottom-actions"><p>◇ Bruk bare fiktive dokumenter.</p>${button('analyse','Analyser kravene')}</div>
      </section>

      <section data-screen="analyse" aria-labelledby="title-2">
        ${heading('2','Se hva du kan<br><em>bygge på.</em>','At noe ikke står i CV-en, betyr ikke at du mangler det.')}
        <div class="summary"><div class="summary-number" aria-hidden="true">3<span>/4</span></div><div><p class="small-label">DOKUMENTASJON I CV-EN</p><h2>3 av 4 kompetansekrav dokumentert</h2><p>Dette er en oversikt over dokumentasjon, ikke en vurdering av deg som kandidat.</p></div><span class="summary-symbol" aria-hidden="true">${editorial ? '✳' : '↗'}</span></div>
        <div class="analysis-board"><section class="gap-section" aria-labelledby="gap-heading"><div class="section-label"><span>01 /</span><h2 id="gap-heading">Her kan du fylle inn litt mer</h2></div><p class="section-description">Svar er valgfrie og gjelder bare denne søknaden.</p><article class="gap-card"><div class="requirement-heading"><span class="requirement-icon" aria-hidden="true">↗</span><span class="status missing">Mangler dokumentasjon</span></div><h3>Førerkort klasse B</h3><p>Dette står ikke i CV-en. Du kan beskrive relevant erfaring eller gå videre uten å svare.</p><label for="mock-answer">Hva vil du legge til? <span>Valgfritt</span></label><textarea id="mock-answer" rows="3" readonly placeholder="Skriv kort om erfaringen din …"></textarea><div class="answer-help"><span>Svaret brukes bare i denne søknaden.</span><span>0 / 1 000</span></div></article><p class="gentle-note"><span aria-hidden="true">◇</span> Vi spør heller enn å gjette.</p></section>
        <section class="documented-section" aria-labelledby="documented-heading"><div class="section-label"><span>02 /</span><h2 id="documented-heading">Dette er dokumentert i CV-en</h2></div><p class="section-description">Hvert krav viser utdraget som ligger til grunn.</p><div class="documented-list">${fixture.requirements.filter(r => r.status === 'dekket').map((r,i) => `<article class="documented-card"><span class="documented-number" aria-hidden="true">0${i+1}</span><div><div class="requirement-heading"><h3>${escape(r.krav)}</h3><span class="status documented">Dokumentert</span></div><blockquote>«${escape(r.kilde)}»<cite>Fra CV-teksten</cite></blockquote></div><span class="check" aria-hidden="true">✓</span></article>`).join('')}</div></section></div>
        ${choices}<div class="bottom-actions">${button('cv','Tilbake til CV og annonse',true)}${button('tekst','Lag tekst')}</div>
      </section>

      <section data-screen="tekst" aria-labelledby="title-3">
        ${heading('3','Nå gjør du teksten<br><em>til din.</em>','Les gjennom, juster og kopier når du er fornøyd. Du kjenner erfaringen din best.')}
        <div class="text-layout"><article class="letter-panel"><header><div><p class="small-label">DITT UTGANGSPUNKT</p><h2>Helt søknadsutkast</h2></div><span class="status">Simulert tekst</span></header><label for="mock-letter">Rediger teksten <span>Statisk forhåndsvisning</span></label><textarea id="mock-letter" readonly rows="24">${escape(letter)}</textarea><div class="letter-foot"><span>Egne redigeringer kontrolleres ikke automatisk.</span><span>Bokmål</span></div><div class="copy-preview"><span>Nøktern, profesjonell tone</span><span class="visual-button">Kopier tekst ⧉</span></div></article><aside class="source-panel"><p class="small-label">ET ÆRLIG UTGANGSPUNKT</p><h2>Teksten<br><em>bygger på</em></h2><p class="source-description">Grunnlag for den genererte teksten. Egne redigeringer kontrolleres ikke automatisk.</p><ul><li><b>Annonse</b>Sommervikar i hjemmetjenesten · Testvik kommune</li>${fixture.requirements.filter(r => r.status === 'dekket').map(r => `<li><b>CV · ${escape(r.krav)}</b>«${escape(r.kilde)}»</li>`).join('')}<li><b>Førerkort klasse B</b>Du har svart: «Jeg har ikke førerkort.». Oppgitt grunnlag, ikke bekreftet kompetanse.</li></ul><div class="session-callout"><b>Ta med deg teksten videre</b><p>Teksten tas vare på mens du er innlogget. Den slettes ved utlogging eller etter 30 minutter uten aktivitet. Kopier den før du avslutter.</p></div></aside></div><div class="bottom-actions">${button('analyse','Endre svar eller omskrivingsvalg',true)}<p>Tekstvisningen viser et fast, negativt eksempelsvar.</p></div>
      </section>
      <footer class="mock-footer"><span>SUPERSØKER / IBE160</span><p>Statisk designforslag. Felter og handlingsknapper viser utforming; lenker bytter bare mellom tre faste skjermbilder. Ingen analyse, lagring eller kopiering utføres.</p></footer>
      </main></div></div>`;

  let first = true;
  function showScreen() {
    const id = location.hash.slice(1);
    // Let the native skip link scroll within the currently selected screen.
    if (id === 'screen-content') return;
    const selected = Object.hasOwn(screens,id) ? id : 'analyse';
    document.querySelectorAll('section[data-screen]').forEach(section => section.hidden = section.dataset.screen !== selected);
    document.querySelectorAll('[data-screen-link]').forEach(link => {
      if (link.dataset.screenLink === selected) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    document.body.dataset.screen = selected;
    if (!first) { document.getElementById('title-' + Number(screens[selected][0])).focus({preventScroll:true}); window.scrollTo(0,0); }
    first = false;
  }
  addEventListener('hashchange',showScreen);
  showScreen();
})();
