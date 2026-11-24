/* Bytter bare referansebilde, aldri data eller filer i konsept 1. */
(() => {
  'use strict';
  let view = 'analyse', device = 'pc';
  const labels = {cv:'CV og annonse',analyse:'Analyse og svar',tekst:'Teksten'};
  function update() {
    document.body.dataset.device = device;
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.view === view)));
    document.querySelectorAll('button[data-device]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.device === device)));
    document.querySelectorAll('.concept-card').forEach(card => {
      const number = card.dataset.concept, src = `visuelle/kontroller/k${number}-${view}-${device}.png`;
      const img = card.querySelector('img'); img.src = src;
      img.alt = `Konsept ${number} – ${labels[view]} på ${device === 'pc' ? 'PC' : 'mobil'}`;
      card.querySelector('.image-link').href = src;
      if (number !== '1') card.querySelector('.open-concept').hash = view;
      card.querySelector('.preview-window').scrollTop = 0;
    });
    document.getElementById('gallery-status').textContent = `${labels[view]} · ${device === 'pc' ? 'PC' : 'Mobil'} · Samme skjerm og innhold i alle tre.`;
  }
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.view; update(); }));
  document.querySelectorAll('button[data-device]').forEach(button => button.addEventListener('click', () => { device = button.dataset.device; update(); }));
  update();
})();
