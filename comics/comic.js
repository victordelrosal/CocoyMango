// Shared renderer for every Coco y Mango comic page.
// Each comic page defines window.COMIC = { episode, title, sub, lesson, panels:[...] }
// where each panel = { img, lettering:[ {type:'balloon'|'caption'|'sfx', ...} ] }.
(function () {
  const C = window.COMIC;
  if (!C) { console.error('[Cómic] window.COMIC no está definido.'); return; }

  document.title = `Coco y Mango · Cómic ${C.episode} — ${C.title}`;

  const body = document.body;
  body.innerHTML = `
    <div class="topbar">
      <a class="back" href="../index.html">← Volver</a>
      <span class="ep">Cómic · Episodio ${C.episode}</span>
    </div>
    <div class="cover">
      <div class="kicker">Coco y Mango · Cómic</div>
      <h1></h1>
      <div class="sub"></div>
    </div>
    <main class="comic" id="comic"></main>
    <div class="fin">
      <div class="word">¡FIN!</div>
      <p class="lesson"></p>
    </div>
    <footer>
      🦎 Coco y Mango · Hecho con amor en México 🇲🇽<br>
      Más cómics, muy pronto. · <a href="../index.html">Ver todas las historias</a>
    </footer>`;

  // Text content set safely (no innerHTML for author strings that may contain markup chars).
  body.querySelector('.cover h1').textContent = C.title;
  body.querySelector('.cover .sub').textContent = C.sub || 'Una aventura de Coco y Mango 🦎🇲🇽';
  body.querySelector('.fin .lesson').textContent = C.lesson || '';

  const comic = document.getElementById('comic');
  (C.panels || []).forEach((p, i) => {
    const fig = document.createElement('figure');
    fig.className = 'panel';

    const img = document.createElement('img');
    img.src = p.img; img.alt = `Viñeta ${i + 1}`; img.loading = 'lazy';

    const err = document.createElement('div');
    err.className = 'err';
    const w1 = document.createElement('span'); w1.style.fontSize = '1.8rem'; w1.textContent = '⚠️';
    const w2 = document.createElement('span'); w2.textContent = `Falta la viñeta ${i + 1}`;
    const w3 = document.createElement('span'); w3.style.cssText = 'font:11px monospace;opacity:.7'; w3.textContent = p.img;
    err.append(w1, w2, w3);

    img.onerror = () => { console.error(`[Cómic] Falta la viñeta ${i + 1}: ${p.img}`); img.style.display = 'none'; err.style.display = 'flex'; };
    fig.append(img, err);

    (p.lettering || []).forEach(L => {
      const el = document.createElement('div');
      if (L.style) el.setAttribute('style', L.style);
      if (L.type === 'balloon') {
        el.className = 'balloon ' + (L.cls || '');
        if (L.who) { const who = document.createElement('span'); who.className = 'who'; who.textContent = L.who; el.appendChild(who); }
        el.appendChild(document.createTextNode(L.text));
      } else if (L.type === 'caption') {
        el.className = 'caption ' + (L.cls || '');
        el.textContent = L.text;
      } else if (L.type === 'sfx') {
        el.className = 'sfx ' + (L.size || 'med');
        el.textContent = L.text;
      }
      fig.appendChild(el);
    });
    comic.appendChild(fig);
  });
})();
