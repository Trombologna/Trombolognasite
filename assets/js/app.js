// Trombologna – Satira su Rotaie
// Vanilla JS. No dependencies. Content is satirical and client-side only.

(function() {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupNav();
    setupTicker();
    renderCantieri();
    setupScuse();
    setupRitardo();
    setupPoll();
    setupMappa();
    setupReports();
  });

  // THEME
  function setupTheme() {
    const btn = $('#theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('tb-theme');
    if (saved) root.setAttribute('data-theme', saved);
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      btn.setAttribute('aria-pressed', current === 'dark' ? 'false' : 'true');
      localStorage.setItem('tb-theme', current);
    });
  }

  // NAV
  function setupNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('menu');
    const mq = window.matchMedia('(max-width: 760px)');
    const setHidden = () => {
      if (mq.matches) menu.setAttribute('aria-hidden', 'true');
      else menu.removeAttribute('aria-hidden');
    };
    setHidden();
    window.addEventListener('resize', setHidden);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.setAttribute('aria-hidden', String(expanded));
    });
    menu.addEventListener('click', e => {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 760px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      }
    });
  }
// === Vignette dataset: add/remove entries as needed
const VIGNETTE = [
  {
    src: 'assets/img/vignette/Lepore2.png',
    alt: 'Una caricatura di una lepre con la faccia di Lepore accanto ad un cantiere in mezzo ad un ingorgo.',
    caption: '“Grazie a Trombologna, corro come una Lepore!”'
  },
  {
    src: 'assets/img/vignette/cartoon1.png',
    alt: 'Una caricatura di Lepore che guida un tram su Via Ugo Bassi circondato da persone che protestano con le trombette in mano.',
    caption: '“Se continuate a protestare, prolungheremo i cantieri a oltranza!”'
  },
  // Aggiungi qui le tue vignette…
];

  // HERO TICKER
  function setupTicker() {
    const el = $('#ticker-text');
    const messages = [
      'Sistema di verità in avvio...',
      'Allineo i coni arancioni...',
      'Misuro i ritardi con rigore scientifico...',
      'Calibro la pazienza cittadina...',
      'Pronto. È peggio di ieri, ma meglio di domani.'
    ];
    let i = 0;
    const next = () => {
      el.textContent = messages[i++ % messages.length];
    };
    next();
    setInterval(next, 2500);
  }

  // CANTIERI
  function renderCantieri() {
    const grid = $('#cantieri-grid');
    const cantieri = [
      'Linea Rossa – Centro',
      'Linea Verde – San Donato',
      'Linea Viola – Bolognina',
      'Linea Gialla – Porto–Saragozza',
      'Linea Blu – Savena',
      'Linea Arancio – Borgo Panigale',
      'Nodo Stazione',
      'Piazza che cambia nome ogni delibera',
      'Cavalcavia della Speranza'
    ];

    const todaySeed = new Date().toISOString().slice(0,10).replaceAll('-','');
    let seed = Number(todaySeed);
    const rand = () => {
      // xorshift32 – deterministic per day
      seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; 
      return Math.abs(seed % 1000) / 1000;
    };

    grid.innerHTML = '';
    cantieri.forEach((name, idx) => {
      const progress = Math.max(3, Math.min(97, Math.floor(rand()*100)));
      const mood = rand();
      let stato, badge;
      if (progress > 80 && mood > 0.6) { stato = 'Quasi'; badge = 'ok'; }
      else if (progress > 40) { stato = 'Forse'; badge = 'warn'; }
      else { stato = 'Mah'; badge = 'bad'; }

      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${name}</h3>
        <div class="row space-between">
          <span class="small">Avanzamento stimato</span>
          <span class="small">Stato: <strong class="${badge}">${stato}</strong></span>
        </div>
        <progress max="100" value="${progress}" aria-label="Avanzamento ${name}" style="width:100%; height: 1rem;"></progress>
        <p class="small">Indice di creatività della recinzione: ${(mood*10).toFixed(1)}/10</p>
      `;
      grid.appendChild(card);
    });
  }

  // SCUSE
  function setupScuse() {
    const scuse = [
      'Il semaforo ha visto la recinzione e si è emozionato. Rosso fisso.',
      'La talpa meccanica ha trovato il tortellino perfetto e si è fermata a pranzo.',
      'Il geometra ha srotolato il nastro bianco–rosso a spirale aurea. Ammirazione collettiva.',
      'Deviazione sulla deviazione: ora il bus fa il giro di Saturno.',
      'Si attende il via libera del Cono Supremo.',
      'La burocrazia ha chiesto una fotocopia della fotocopia del nulla osta.',
      'Il cantiere ha raggiunto la fase quantistica: esiste e non esiste finché non lo guardi.',
      'Il marciapiede sta facendo la muta in primavera.',
      'È stato ritrovato un reperto storico: un cartello “Lavori in corso” del 1997.',
      'Un camion ha parcheggiato nella quarta dimensione. Recupero in corso.'
    ];
    $('#btn-scusa').addEventListener('click', () => {
      const idx = Math.floor(Math.random() * scuse.length);
      $('#scusa-output').textContent = scuse[idx];
    });
  }

  // RITARDO
  function setupRitardo() {
    const form = $('#ritardo-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const cantieri = Number($('#sld-cantieri').value);
      const umore = Number($('#sel-umore').value);
      const meteo = Number($('#sel-meteo').value);
      // Formula scientificamente imprecisa ma moralmente corretta
      const base = cantieri * 4; // 4 minuti per cantiere
      const bonus = Math.ceil((cantieri**1.2) * (umore + meteo - 1));
      const ritardo = Math.min(480, Math.round(base + bonus));
      const fascia = ritardo > 120 ? 'apocalittico' : ritardo > 45 ? 'importante' : 'gestibile';
      $('#ritardo-output').textContent = `Ritardo stimato: ${ritardo} minuti – livello ${fascia}. Consiglio: un podcast lungo, acqua e pazienza zen.`;
    });
  }

  // POLL
  function setupPoll() {
    const form = $('#poll-form');
    const results = $('#poll-results');
    const key = 'tb-poll';
    const data = JSON.parse(localStorage.getItem(key) || '{"nevicata":0,"scudetto":0,"heat_death":0}');
    const render = () => {
      const total = data.nevicata + data.scudetto + data.heat_death || 1;
      results.innerHTML = `
        <div>Neve a Ferragosto <progress max="100" value="${(data.nevicata/total*100).toFixed(1)}"></progress> ${data.nevicata}</div>
        <div>Scudetto del Bologna <progress max="100" value="${(data.scudetto/total*100).toFixed(1)}"></progress> ${data.scudetto}</div>
        <div>Morte termica <progress max="100" value="${(data.heat_death/total*100).toFixed(1)}"></progress> ${data.heat_death}</div>
      `;
    };
    render();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const choice = (new FormData(form)).get('poll');
      if (!choice) return;
      data[choice]++;
      localStorage.setItem(key, JSON.stringify(data));
      render();
      form.reset();
    });
  }

  // MAPPA
  function setupMappa() {
    const phrases = {
      'Centro': 'Il centro è tranquillo: oggi aprono un cantiere solo per chiuderlo meglio domani.',
      'San Donato': 'San Donato è un puzzle: se trovi l’uscita vinci due fermate in più.',
      'Bolognina': 'Bolognina: il bus ha imparato una nuova scorciatoia... nel multiverso.',
      'Santo Stefano': 'Santo Stefano benedice i lavori, ma si raccomanda: “un cartello in meno, un sorriso in più”.',
      'Savena': 'Savena scorre, i cantieri pure. Corrente contraria prevista fino a orario di cena.',
      'Borgo Panigale': 'Borgo Panigale: metamorfosi da pista d’aeroporto a slalom cittadino.',
      'Navile': 'Navile: per navigare tra transenne servono remi e pazienza.',
      'Porto–Saragozza': 'Porto–Saragozza: i portici osservano e giudicano, ma offrono ombra.',
      'Reno': 'Reno: chi parte avvantaggiato si perde prima.'
    };
    $$('#quartieri button').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.q;
        $('#bollettino').textContent = phrases[q] || 'Tutto scorre, anche le deviazioni.';
      });
    });
  }

  // REPORTS
  function setupReports() {
    const form = $('#report-form');
    const list = $('#report-list');
    const key = 'tb-reports';

    const load = () => JSON.parse(localStorage.getItem(key) || '[]');
    const save = (items) => localStorage.setItem(key, JSON.stringify(items));

    const render = () => {
      const items = load().sort((a,b) => b.time - a.time);
      list.innerHTML = '';
      items.slice(0, 50).forEach(it => {
        const li = document.createElement('li');
        li.className = 'report';
        const date = new Date(it.time).toLocaleString();
        li.innerHTML = `
          <div class="report__meta">
            <span><strong>${it.luogo}</strong></span>
            <span class="report__cat">${it.cat}</span>
            <span>${date}</span>
            ${it.email ? `<span>${it.email}</span>` : ''}
            ${it.foto ? `<span>📷 ${it.foto}</span>` : ''}
          </div>
          <p>${escapeHTML(it.desc)}</p>
        `;
        list.appendChild(li);
      });
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      const item = {
        luogo: $('#rep-luogo').value.trim(),
        cat: $('#rep-cat').value,
        desc: $('#rep-desc').value.trim(),
        email: $('#rep-email').value.trim(),
        foto: $('#rep-foto').value.trim(),
        time: Date.now()
      };
      if (!item.luogo || !item.desc) return;
      const items = load();
      items.push(item);
      save(items);
      form.reset();
      render();
    });

    $('#btn-pulisci').addEventListener('click', () => {
      if (confirm('Sicuro di voler cancellare tutte le segnalazioni salvate sul tuo dispositivo?')) {
        localStorage.removeItem(key);
        render();
      }
    });

    $('#btn-esporta').addEventListener('click', () => {
      const items = load();
      const header = 'luogo,categoria,descrizione,email,foto,data\n';
      const rows = items.map(it => [
        csv(it.luogo),
        csv(it.cat),
        csv(it.desc),
        csv(it.email || ''),
        csv(it.foto || ''),
        csv(new Date(it.time).toISOString())
      ].join(',')).join('\n');
      const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'trombologna-segnalazioni.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    render();
  }
function initCarouselVignette() {
  const el = document.querySelector('[data-carousel="vignette"]');
  if (!el) return;

  const track = el.querySelector('.carousel__track');
  const dots = el.querySelector('.carousel__dots');
  const viewport = el.querySelector('.carousel__viewport');

  // Build slides and dots from VIGNETTE array
  VIGNETTE.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'carousel__slide';
    li.setAttribute('role', 'group');
    li.setAttribute('aria-label', `${i + 1} di ${VIGNETTE.length}`);

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.className = 'carousel__img';
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
    cap.textContent += ' (immagine non trovata)';
    console.warn('Vignetta non trovata:', item.src);
    });

    const cap = document.createElement('figcaption');
    cap.className = 'carousel__caption';
    cap.textContent = item.caption;

    fig.append(img, cap);
    li.append(fig);
    track.append(li);

    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Vai alla vignetta ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.append(dot);
  });

  let index = 0;
  const prevBtn = el.querySelector('[data-action="prev"]');
  const nextBtn = el.querySelector('[data-action="next"]');
  const slidesCount = VIGNETTE.length;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === slidesCount - 1);
  }
  function goTo(i) {
    index = Math.max(0, Math.min(slidesCount - 1, i));
    update();
    resetAutoplay();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // Keyboard navigation on the whole carousel region
  el.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    else if (e.key === 'ArrowRight') goTo(index + 1);
    else if (e.key === 'Home') goTo(0);
    else if (e.key === 'End') goTo(slidesCount - 1);
  });

  // Basic swipe (pointer) support
  let startX = null, activeId = null;
  viewport.addEventListener('pointerdown', (e) => {
    startX = e.clientX; activeId = e.pointerId; viewport.setPointerCapture(activeId);
  });
  viewport.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (dx > 30) goTo(index - 1);
    else if (dx < -30) goTo(index + 1);
    startX = null; activeId = null;
  });

  // Autoplay: pause on hover/focus, respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  function startAutoplay() {
    if (prefersReduced || slidesCount <= 1) return;
    timer = setInterval(() => {
      index = (index + 1) % slidesCount;
      update();
    }, 5000);
  }
  function stopAutoplay() { if (timer) { clearInterval(timer); timer = null; } }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  el.addEventListener('mouseenter', stopAutoplay);
  el.addEventListener('mouseleave', startAutoplay);
  el.addEventListener('focusin', stopAutoplay);
  el.addEventListener('focusout', startAutoplay);

  update();
  startAutoplay();
}

// Call it on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarouselVignette);
} else {
  initCarouselVignette();
}

  function csv(s) {
    if (s == null) return '';
    s = String(s).replaceAll('"', '""');
    return `"${s}"`;
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
})();
