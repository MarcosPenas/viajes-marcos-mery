// ============================================================
//  VIAJES MARCOS & MERY — App Principal
// ============================================================

// ── TEMA (claro / oscuro / auto) ─────────────────────────────
// Importante: SIEMPRE se deja un data-theme explícito en <html>, incluso en
// modo "auto". Así todo el CSS de tema vive en un solo sitio
// (html[data-theme="dark"/"light"]) y no hace falta mantener duplicado el
// mismo juego de reglas dentro de @media (prefers-color-scheme: dark) —
// ese bloque se quedó desactualizado durante días porque los arreglos de
// contraste solo se añadían al bloque de data-theme explícito.
function _applyAutoTheme() {
  const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null (auto)
  if (saved) { document.documentElement.dataset.theme = saved; return; }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
}
_applyAutoTheme();
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) _applyAutoTheme();
  });
}

function toggleTheme() {
  const html = document.documentElement;
  const cur  = html.dataset.theme; // 'dark' | 'light' | undefined
  let next;
  if (!cur)        next = 'dark';
  else if (cur === 'dark')  next = 'light';
  else             next = null; // auto (sigue al sistema)
  if (next) {
    html.dataset.theme = next;
    localStorage.setItem('theme', next);
  } else {
    localStorage.removeItem('theme');
    _applyAutoTheme(); // vuelve a "auto", pero deja igualmente un data-theme explícito resuelto
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
});

let DB = AppData.loadData();
let currentTripId = null;
let currentView = 'home';
let dayReturnView = 'itinerary'; // a dónde vuelve la flecha del Día ('today' si se abrió desde Hoy)
let mapInstance = null;
let countdownTimer = null;
let _timeTravelDate = null; // null = fecha real; string 'YYYY-MM-DD' = simulación
let weatherCache = {};

// Comida típica y curiosidades por ciudad, para la ficha "Sobre <ciudad>" —
// contenido curado a mano (no viene de Wikipedia), pensado para el estilo de
// viaje de Marcos y Mery: auténtico, callejero, sin prisa
const CITY_INFO = {
  'Aeropuerto de Barcelona-El Prat': {
    food: 'Noche de tránsito, no de turismo — Barcelona ciudad no entra en el plan esta vez. Si hay hueco antes de dormir, un bocadillo de jamón o unas bravas cerca del hotel/aeropuerto; mañana ya toca comida de avión.',
    curiosities: 'El Prat tiene dos terminales (T1 y T2) bastante separadas entre sí — el vuelo internacional a Shenzhen (Shenzhen Airlines) sale de la Terminal 1, desde las puertas de embarque de la zona D (la gran mayoría de sus vuelos usan esa zona, alguna vez la E). Es un aeropuerto grande: llegar con margen, el check-in de la maleta facturada puede tener cola en la T1.'
  },
  'Aeropuerto de Shenzhen': { // sin «(escala)»: _cleanCityName quita los paréntesis (antes no se mostraba nunca)
    food: 'Escala de varias horas, sin salir del aeropuerto — Shenzhen ciudad tampoco entra en el plan. La Terminal 3 de Bao\'an tiene bastante oferta de comida dentro de la zona de tránsito internacional (cadenas chinas y occidentales), buen momento para probar algo local sin gastar un día entero.',
    curiosities: 'Con pasaporte español no hace falta visado para China: exención de hasta 30 días, prorrogada hasta el 31 de diciembre de 2026 (comprobado el 6-oct-2026) — de sobra para esta escala de 5h40min, aunque lo práctico es quedarse en la zona de tránsito. Para la conexión internacional-internacional en la T3 basta con seguir los carteles de "Transfer" (no hace falta recoger la maleta facturada si va facturada hasta Hanói). Llevar el billete de continuación a mano por si lo piden al pasar cualquier control. El edificio de la T3, con forma de manta ondulada, es obra del mismo estudio que el aeropuerto de Madrid-Barajas (Studio Fuksas).'
  },
  'Hanói': {
    food: 'La cuna del phở (mejor por la mañana, en puestos con taburetes bajos), el bún chả que hizo famoso Obama, el cà phê trứng (café de huevo) y el bia hơi callejero a 30 céntimos el vaso. Comer en la calle, sentados en plástico, es la experiencia real — los sitios con menú plastificado en inglés son para turistas.',
    curiosities: 'El Old Quarter tiene 36 calles, cada una históricamente dedicada a un gremio (seda, plata, farolillos…) y todavía se nota en lo que se vende. El tráfico de motos parece caótico pero tiene su lógica: para cruzar, camina despacio y constante, nunca corras ni te pares en seco.'
  },
  'Siem Reap': {
    food: 'La cocina jemer es más suave que la vietnamita: amok (curry de pescado al vapor en hoja de plátano), lok lak y sopas con hierba limón. Pub Street concentra la vida nocturna, pero los mejores platos suelen estar un par de calles más allá.',
    curiosities: 'Angkor Wat mira al oeste (no al este como casi todos los templos hindúes), por eso el amanecer detrás de sus torres es tan fotografiado. El pase de Angkor es personal e intransferible, con foto — lleva el pasaporte el primer día para sacarlo.'
  },
  'Phnom Penh': {
    food: 'Amok, lap khmer (ceviche de ternera) y desayunos de nom banh chok (fideos con salsa de pescado y hierbas) en los mercados. El Central Market y el Russian Market son buen sitio para street food barato y auténtico.',
    curiosities: 'La ciudad todavía procesa la memoria del genocidio de los jemeres rojos (1975-79) — Tuol Sleng y Choeung Ek no son visitas fáciles, pero ayudan a entender el país. Fuera de eso, el Riverside al atardecer es puro ambiente local, nada que ver con esa historia.'
  },
  'Chau Doc': {
    food: 'Zona fronteriza con fuerte influencia camboyana y cham (musulmana): bun ca (sopa de pescado) y mucho pescado del Mekong en general — es la región productora de pescado de agua dulce más importante de Vietnam.',
    curiosities: 'Aquí se cruza el Mekong hacia/desde Camboya en barco, mucho más interesante que un paso fronterizo terrestre. Hay comunidades flotantes reales (no un montaje turístico) a las que la gente accede en barca.'
  },
  'Can Tho': {
    food: 'Capital no oficial del Delta del Mekong — arroz, pescado y fruta tropical en todas sus formas. El mercado flotante de Cai Rang es también el sitio para desayunar flotando: cafés y vendedores de fideos pasan en barca entre los puestos de fruta.',
    curiosities: 'Cai Rang funciona mejor muy temprano (antes de las 8h) — a media mañana ya se ha vaciado gran parte del ambiente. Los barcos "anuncian" lo que venden colgando una muestra en un palo vertical (una piña, una col…), así que no hace falta gritar el género.'
  },
  'Hoi An': {
    food: 'Cao lầu (fideos gruesos que, dice la leyenda, solo saben igual con el agua de un pozo concreto de la ciudad), banh mi (aquí están entre los mejores de Vietnam) y white rose (banh bao vac, unas empanadillas de gambas translúcidas típicas del lugar).',
    curiosities: 'De noche, cuando se apagan las luces y se encienden los farolillos de seda, la ciudad cambia por completo — merece la pena volver a pasear el mismo sitio de día y de noche. Muchas sastrerías hacen ropa a medida en 24-48h, algo muy típico de Hoi An si hay tiempo.'
  },
  'Da Nang': {
    food: 'Mì Quảng (fideos de cúrcuma con gambas y cerdo, plato bandera de la región) y mucho marisco fresco en la costa. Ciudad más moderna y menos "de postal" que Hoi An, con buena comida de playa.',
    curiosities: 'El Puente del Dragón escupe fuego y agua los fines de semana por la noche (sábado ~21h) — merece la pena cuadrar la visita si coincide. Las Marble Mountains son 5 colinas de mármol/caliza con cuevas-templo dentro, no solo un mirador.'
  },
  'Hue': {
    food: 'La cocina más elaborada y "de palacio" de Vietnam — bun bo Hue (sopa picante con limoncillo), banh khoai (crepe crujiente) y platos pensados originalmente para la mesa imperial, en porciones pequeñas y muy cuidadas.',
    curiosities: 'Fue la capital imperial de Vietnam hasta 1945 — de ahí la Ciudadela y las tumbas de los emperadores, muy distintas en estilo entre sí porque cada uno diseñó la suya en vida. El río Perfume debe su nombre a las flores de los jardines río arriba, no a nada relacionado con perfumería.'
  },
  'Tam Coc': {
    food: 'Cabra (dê) en todas sus formas es la especialidad de Ninh Binh, junto con com chay (arroz de corteza crujiente). Zona rural, buena para comer en casas locales más que en restaurantes turísticos.',
    curiosities: 'A esta zona se la llama "la bahía de Ha Long en tierra firme" por sus torres de piedra caliza, pero navegando un río de arroz en vez de mar. Muchas barcas las reman los pies, no las manos — no es solo postureo, es la técnica real de la zona.'
  },
  'Cat Ba': {
    food: 'Marisco recién sacado del agua — las balsas flotantes de mariscos en la bahía sirven lo que acaban de pescar. Isla, así que aquí la dieta gira mucho más hacia el marisco que en el interior.',
    curiosities: 'Lan Ha Bay es hermana de la mucho más famosa Bahía de Ha Long, con los mismos karsts de piedra caliza pero muchísimo menos masificada. En noviembre, algunas zonas de la bahía tienen plancton bioluminiscente visible de noche si el mar está en calma.'
  },
};

const _wikiCache = {};
const _citySummaryCache = {};

// Nombre de ciudad "limpio" a partir del campo day.city (puede venir como
// "Hanói → Siem Reap" en días de traslado, o con una nota entre paréntesis)
// Ciudad del día para «Sobre <ciudad>»: la de origen en los días de traslado y sin
// paréntesis ni «/ Ninh Binh» (antes «Tam Coc / Ninh Binh» no encontraba nada).
// El día 30 (Barcelona → Santiago) es solo un enlace de vuelos de vuelta: sin ficha
// (el texto del aeropuerto es el de la ida y Barcelona ciudad no entra en el plan).
const CITY_INFO_ALIAS = { 'Barcelona': '' };
function _cleanCityName(city) {
  if (!city) return '';
  const c = city.split(/→|\//)[0].replace(/\(.*\)/, '').trim();
  return c in CITY_INFO_ALIAS ? CITY_INFO_ALIAS[c] : c;
}

// Título exacto en la Wikipedia en español cuando el nombre no basta:
// «Hue» da una página de desambiguación y «Cat Ba» no existe.
const CITY_WIKI_ES = { 'Hue': 'Huế (municipio)', 'Cat Ba': 'Isla Cát Bà' };

// Resumen en español de la ciudad/lugar del día, para la ficha "Sobre <ciudad>"
async function _fetchCitySummary(cityName) {
  if (_citySummaryCache[cityName]) return _citySummaryCache[cityName];
  try {
    const res = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(CITY_WIKI_ES[cityName] || cityName)}`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    if (data.type === 'disambiguation') throw new Error('desambiguación');
    _citySummaryCache[cityName] = {
      extract: data.extract || '',
      photo: data.thumbnail?.source || data.originalimage?.source || '',
      url: data.content_urls?.desktop?.page || '',
    };
  } catch(e) { _citySummaryCache[cityName] = {}; }
  return _citySummaryCache[cityName];
}

function toggleCityInfo(date) {
  const card = document.getElementById('city-info-' + date);
  if (card) card.classList.toggle('open');
}

async function loadCitySummary(cardEl, cityName) {
  if (!cardEl || cardEl.dataset.loaded) return;
  cardEl.dataset.loaded = '1';
  const info = await _fetchCitySummary(cityName);
  if (!cardEl.isConnected) return;
  const textEl  = cardEl.querySelector('.city-info-text');
  if (!info.extract) {
    // Sin resumen de Wikipedia (sin cobertura o sin artículo): antes se ocultaba la ficha
    // entera, también las curiosidades y platos propios, que están en la app.
    if (cardEl.querySelector('.city-info-extra')) { if (textEl) textEl.remove(); }
    else cardEl.style.display = 'none';
    return;
  }
  const photoEl = cardEl.querySelector('.city-info-photo');
  if (textEl) textEl.textContent = info.extract;
  if (photoEl && info.photo) {
    photoEl.style.backgroundImage = `url('${info.photo}')`;
    photoEl.style.display = 'block';
  }
}

async function _fetchWikiEntry(article) {
  if (_wikiCache[article]) return _wikiCache[article];
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`);
    const data = await res.json();
    const orig  = data.originalimage?.source || null;
    const thumb = data.thumbnail?.source || null;
    _wikiCache[article] = {
      large: orig || (thumb ? thumb.replace(/\/\d+px-/, '/1200px-') : null),
      small: thumb ? thumb.replace(/\/\d+px-/, '/500px-') : null,
    };
  } catch(e) { _wikiCache[article] = {}; }
  return _wikiCache[article];
}

// Busca en Wikimedia Commons cuando no hay artículo directo
async function _searchCommonsImage(query) {
  const key = '__commons__' + query;
  if (_wikiCache[key]) return _wikiCache[key];
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search`
      + `&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5`
      + `&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});
    const page = pages.find(p => {
      const u = (p.imageinfo?.[0]?.url || '').toLowerCase();
      return u.match(/\.(jpg|jpeg)/) && p.imageinfo?.[0]?.url;
    }) || pages.find(p => p.imageinfo?.[0]?.url);
    const url1000 = page?.imageinfo?.[0]?.url || null;
    _wikiCache[key] = {
      large: url1000,
      small: url1000 ? url1000.replace(/\/\d+px-/, '/500px-') : url1000,
    };
  } catch(e) { _wikiCache['__commons__' + query] = {}; }
  return _wikiCache[key];
}

// Foto grande de la ficha desplegada: SOLO la foto fija verificada (`photo` de data.js).
// Antes se completaba con imágenes buscadas por nombre en Commons, que era otra fuente de fotos que no cuadraban.
function loadCarousel(carouselEl, dotsEl, placeName, photoUrl) {
  if (!carouselEl.isConnected) return;
  if (!photoUrl) {
    carouselEl.style.display = 'none';
    if (dotsEl) dotsEl.style.display = 'none';
    return;
  }
  _renderCarousel(carouselEl, dotsEl, [photoUrl], placeName);
}

function _renderCarousel(carouselEl, dotsEl, urls, placeName) {
  const scrollPos = carouselEl.scrollLeft;
  carouselEl.innerHTML = urls.map(u =>
    `<img class="carousel-img" src="${u}" alt="${placeName}" loading="lazy">`
  ).join('');
  carouselEl.scrollLeft = scrollPos;

  const imgs = [...carouselEl.querySelectorAll('.carousel-img')];

  if (dotsEl && urls.length > 1) {
    dotsEl.innerHTML = urls.map((_, i) =>
      `<span class="carousel-dot${i===0?' active':''}"></span>`
    ).join('');
    const dots = [...dotsEl.querySelectorAll('.carousel-dot')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = imgs.indexOf(e.target);
          dots.forEach((d, di) => d.classList.toggle('active', di === i));
        }
      });
    }, { root: carouselEl, threshold: 0.5 });
    imgs.forEach(img => observer.observe(img));
  } else if (dotsEl) {
    dotsEl.style.display = 'none';
  }

  if (urls.length > 1 && !carouselEl._autoStarted) {
    carouselEl._autoStarted = true;
    let cur = 0;
    let userTouched = false;
    carouselEl.addEventListener('touchstart', () => { userTouched = true; }, { passive: true });
    carouselEl.addEventListener('mousedown',  () => { userTouched = true; }, { passive: true });
    const interval = setInterval(() => {
      if (!carouselEl.isConnected) { clearInterval(interval); return; }
      if (userTouched) { userTouched = false; return; }
      cur = (cur + 1) % carouselEl.querySelectorAll('.carousel-img').length;
      carouselEl.scrollTo({ left: cur * carouselEl.clientWidth, behavior: 'smooth' });
    }, 5000);
  }
}

function _localImgSlug(name) {
  // Use Unicode property escapes so Vietnamese/Khmer letters are preserved (matches Python's \w)
  return name.toLowerCase().replace(/[^\p{L}\p{N}_]/gu, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
}

async function loadWikiPhoto(imgEl, placeName) {
  // 1. item.photo directo (URL real en data.js, no picsum)
  const directUrl = imgEl.dataset.photo;
  if (directUrl && !directUrl.includes('picsum')) {
    imgEl.src = directUrl;
    imgEl.onload = () => imgEl.classList.add('loaded');
    return;
  }
  // Fichas de lugares/platos (data-fixed): solo foto fija verificada. Sin ella se queda el icono
  // de categoría — nunca se adivina por alias, caché antigua ni búsqueda en Wikipedia.
  if (imgEl.dataset.fixed) return;
  // 2. Imagen local descargada en img/places/<slug>.jpg
  // Aquí solo llegan artículos de Wikipedia directos (iconos de zona de la Ruta). La tabla de
  // alias nombre→artículo (WIKI_ARTICLES) se quitó el 6-oct-2026: desde las fotos congeladas
  // (3-oct) las fichas salen antes (data-fixed) y ya nunca se consultaba.
  const article = placeName;
  {
    const localSlug = _localImgSlug(article);
    const localUrl = `img/places/${localSlug}.jpg`;
    const probe = new Image();
    const localOk = await new Promise(res => {
      probe.onload  = () => res(true);
      probe.onerror = () => res(false);
      probe.src = localUrl;
    });
    if (localOk && imgEl.isConnected) {
      imgEl.onload = () => imgEl.classList.add('loaded');
      imgEl.src = localUrl;
      return;
    }
  }
  // 3. Fallback: Wikipedia online
  const isLarge = imgEl.dataset.wikiSize === 'large';
  let entry;
  if (article) entry = await _fetchWikiEntry(article);
  const src = isLarge ? (entry?.large || entry?.small) : (entry?.small || entry?.large);
  if (src && imgEl.isConnected) {
    imgEl.onload = () => imgEl.classList.add('loaded');
    imgEl.src = src;
  } else if (directUrl && imgEl.isConnected) {
    imgEl.onload = () => imgEl.classList.add('loaded');
    imgEl.src = directUrl;
  }
}

function loadPageWikiPhotos() {
  document.querySelectorAll('img[data-wiki]').forEach(img => {
    loadWikiPhoto(img, img.dataset.wiki);
  });
}

// Artículos Wikipedia con imágenes confirmadas para el hero rotante
const HERO_WIKI_ARTICLES = [
  'Ha_Long_Bay',
  'Angkor_Wat',
  'Imperial_City,_Huế',
  'Tràng_An_Scenic_Landscape_Complex',
];
async function loadHeroImages() {
  const layers = document.querySelectorAll('.hero-img-layer');
  if (!layers.length) return;
  await Promise.all(HERO_WIKI_ARTICLES.map(async (article, i) => {
    if (!layers[i]) return;
    const entry = await _fetchWikiEntry(article);
    const url = entry.large || entry.small;
    if (url && layers[i].isConnected)
      layers[i].style.backgroundImage = `url('${url}')`;
  }));
}
const HERO_WIKI_PLACES = HERO_WIKI_ARTICLES; // alias para heroLayersHtml count

// ── UTILS ──────────────────────────────────────────────────

function save() { AppData.saveData(DB); }
function getTrip(id) { return DB.trips.find(t => t.id === id); }
function today() { return new Date().toISOString().slice(0,10); }

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' });
}

function formatDateShort(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('es-ES', { day:'2-digit', month:'short' }).toUpperCase();
}

function daysBetween(a, b) {
  const da = new Date(a), db = new Date(b);
  return Math.round((db - da) / 86400000);
}

function tripDuration(trip) { return daysBetween(trip.startDate, trip.endDate) + 1; }

function getDayNumber(trip, date) { return daysBetween(trip.startDate, date) + 1; }

function todayDay(trip) {
  const t = today();
  if (t < trip.startDate || t > trip.endDate) return null;
  return trip.days.find(d => d.date === t) || null;
}

function nextFutureDay(trip) {
  const t = today();
  return trip.days.find(d => d.date >= t) || trip.days[0];
}

function daysUntilTrip(trip) { return daysBetween(today(), trip.startDate); }
function isTripActive(trip) { const t = today(); return t >= trip.startDate && t <= trip.endDate; }
function isTripPast(trip) { return today() > trip.endDate; }

function docIcon(type) {
  const icons = { flight:'✈️', visa:'🛃', insurance:'🔒', booking:'🏨', transport:'🚌', other:'📄' };
  return icons[type] || '📄';
}

function transportIcon(type) {
  const icons = { flight:'✈️', bus:'🚌', 'sleeper-bus':'🚌', train:'🚆',
    ferry:'🚢', boat:'🚢', taxi:'🚕', grab:'🚗', tuk:'🚗', bike:'🚲',
    tour:'🚐', 'bus+ferry':'🚐', 'ferry+minivan':'🚐', 'tuk-tuk':'🚗' };
  return icons[type] || '🚗';
}

function el(id) { return document.getElementById(id); }

function navigate(view, extra, tripId) {
  if (tripId) currentTripId = tripId;
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  if (_dayMapInstance) { _dayMapInstance.remove(); _dayMapInstance = null; }
  if (view === 'day') dayReturnView = (currentView === 'today' || (currentView === 'day' && dayReturnView === 'today')) ? 'today' : 'itinerary';
  currentView = view;
  const vc = el('view-content');
  vc.style.opacity = '0';
  renderView(view, extra);
  updateNav(view);
  // micro-fade in + force repaint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    vc.style.transition = 'opacity .2s ease';
    vc.style.opacity = '1';
  }));
}

// ── BOTTOM NAV ─────────────────────────────────────────────

function updateNav(view) {
  document.querySelectorAll('.nav-item').forEach(b => {
    const active = (view === 'day') ? dayReturnView : view; // un día abierto marca la pestaña desde la que se abrió
    b.classList.toggle('active', b.dataset.view === active);
  });
  el('bottom-nav').style.display = (view === 'home') ? 'none' : 'flex';
}

function setupNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.view;
      if (!v) return;
      if (v === 'trip' && !currentTripId) {
        // Si no hay viaje activo, auto-abre el primero disponible
        const firstTrip = DB.trips[0];
        if (firstTrip) { currentTripId = firstTrip.id; navigate('trip'); }
        return;
      }
      if (v && currentTripId) navigate(v);
    });
  });
}

function setHeader(title, showBack) {
  el('header-title').textContent = title;
  const backBtn = el('header-back');
  if (showBack) {
    backBtn.classList.add('visible');
    backBtn.onclick = () => navigate(currentView === 'day' ? dayReturnView : 'itinerary');
  } else {
    backBtn.classList.remove('visible');
    backBtn.onclick = null;
  }
}

// ── RENDER DISPATCHER ──────────────────────────────────────

// Temporizadores de la portada (foto de cabecera, tiempo, reloj, consejos). Se cancelan
// al cambiar de vista: antes se acumulaban en cada visita a Inicio y, p. ej., quedaban
// dos fotos de cabecera activas a la vez y la pastilla del tiempo cambiaba a saltos.
let _homeTimers = [];
function homeInterval(fn, ms) {
  const id = setInterval(fn, ms);
  _homeTimers.push(id);
  return id;
}
function clearHomeTimers() {
  _homeTimers.forEach(clearInterval);
  _homeTimers = [];
}

function renderView(view, extra) {
  const content = el('view-content');
  content.scrollTop = 0;
  content.classList.remove('fade-in');
  void content.offsetWidth;
  content.classList.add('fade-in');

  clearHomeTimers();
  if (view !== 'map' && mapInstance) { mapInstance.remove(); mapInstance = null; }
  if (view !== 'map') stopNearMeTracking();

  switch(view) {
    case 'home':      renderHome(); break;
    case 'trip':      renderTripDashboard(); break;
    case 'itinerary': renderItinerary(); break;
    case 'day':       renderDay(extra); break;
    case 'today':     renderToday(); break;
    case 'map':       renderMap(); break;
    case 'docs':      renderDocs(); break;
    default:          renderHome();
  }
}

// ══════════════════════════════════════════════════════════
//  WEATHER (wttr.in — sin API key)
// ══════════════════════════════════════════════════════════

const WEATHER_ICONS = {
  '113': '☀️', '116': '⛅', '119': '☁️', '122': '☁️',
  '143': '🌫️', '176': '🌦️', '179': '🌨️', '182': '🌧️',
  '185': '🌧️', '200': '⛈️', '227': '🌨️', '230': '❄️',
  '248': '🌫️', '260': '🌫️', '263': '🌦️', '266': '🌦️',
  '281': '🌧️', '284': '🌧️', '293': '🌦️', '296': '🌦️',
  '299': '🌧️', '302': '🌧️', '305': '🌧️', '308': '🌧️',
  '311': '🌧️', '314': '🌧️', '317': '🌧️', '320': '🌨️',
  '323': '🌨️', '326': '🌨️', '329': '❄️', '332': '❄️',
  '335': '❄️', '338': '❄️', '350': '🌧️', '353': '🌦️',
  '356': '🌧️', '359': '🌧️', '362': '🌧️', '365': '🌧️',
  '368': '🌨️', '371': '❄️', '374': '🌧️', '377': '🌧️',
  '386': '⛈️', '389': '⛈️', '392': '⛈️', '395': '❄️'
};

async function fetchWeather(city) {
  if (weatherCache[city] && Date.now() - weatherCache[city].ts < 1800000) {
    return weatherCache[city].data;
  }
  try {
    const resp = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!resp.ok) return null;
    const json = await resp.json();
    const cur = json.current_condition[0];
    const data = {
      temp: cur.temp_C,
      feels: cur.FeelsLikeC,
      desc: cur.lang_es ? cur.lang_es[0].value : cur.weatherDesc[0].value,
      icon: WEATHER_ICONS[cur.weatherCode] || '🌡️',
      humidity: cur.humidity,
      wind: cur.windspeedKmph,
      city: json.nearest_area[0].areaName[0].value,
      max: json.weather[0].maxtempC,
      min: json.weather[0].mintempC
    };
    weatherCache[city] = { ts: Date.now(), data };
    return data;
  } catch { return null; }
}

// Destinos del viaje, en el orden del itinerario, con medias aproximadas de noviembre
// (se muestran sin conexión o hasta que llega el tiempo real). `blocks` = bloques de
// data.js en los que se está en esa ciudad: sus destinos salen primero en la portada.
// Actualizado el 6-oct-2026: antes era la ruta antigua (Koh Rong, sin el Delta).
// Ojo: noviembre es el pico de la época de lluvias en Hue, Da Nang y Hoi An.
const WEATHER_DESTINATIONS = [
  { label: 'Hanói',      query: 'Hanoi,Vietnam',       blocks: ['El Norte', 'El Cierre'], offline: { temp:'23', max:'26', min:'19', icon:'⛅', desc:'Templado, algo nublado', humidity:'75' } },
  { label: 'Siem Reap',  query: 'Siem Reap,Cambodia',  blocks: ['Angkor'],                offline: { temp:'27', max:'31', min:'23', icon:'☀️', desc:'Caluroso, fin de las lluvias', humidity:'70' } },
  { label: 'Phnom Penh', query: 'Phnom Penh,Cambodia', blocks: ['Phnom Penh'],            offline: { temp:'28', max:'31', min:'24', icon:'🌤️', desc:'Caluroso y bastante seco', humidity:'70' } },
  { label: 'Chau Doc',   query: 'Chau Doc,Vietnam',    blocks: ['Delta del Mekong'],      offline: { temp:'27', max:'31', min:'24', icon:'🌦️', desc:'Calor húmedo, algún chubasco', humidity:'80' } },
  { label: 'Can Tho',    query: 'Can Tho,Vietnam',     blocks: ['Delta del Mekong'],      offline: { temp:'27', max:'31', min:'24', icon:'🌦️', desc:'Calor húmedo, algún chubasco', humidity:'80' } },
  { label: 'Hoi An',     query: 'Hoi An,Vietnam',      blocks: ['El Centro'],             offline: { temp:'24', max:'26', min:'21', icon:'🌧️', desc:'Lluvias frecuentes', humidity:'87' } },
  { label: 'Da Nang',    query: 'Da Nang,Vietnam',     blocks: ['El Centro'],             offline: { temp:'24', max:'26', min:'21', icon:'🌧️', desc:'Lluvias frecuentes', humidity:'85' } },
  { label: 'Hue',        query: 'Hue,Vietnam',         blocks: ['El Centro'],             offline: { temp:'22', max:'25', min:'20', icon:'🌧️', desc:'Muy lluvioso (su mes más húmedo)', humidity:'90' } },
  { label: 'Ninh Binh',  query: 'Ninh Binh,Vietnam',   blocks: ['Ninh Binh'],             offline: { temp:'23', max:'26', min:'19', icon:'⛅', desc:'Templado, nublado variable', humidity:'77' } },
  { label: 'Cat Ba',     query: 'Cat Ba,Vietnam',      blocks: ['Vuelta al Norte'],       offline: { temp:'22', max:'25', min:'19', icon:'🌤️', desc:'Templado, mayormente despejado', humidity:'78' } },
];

// Artículo Wikipedia para la foto de fondo del widget de tiempo
const WEATHER_CITY_WIKI = {
  'Santiago de Compostela': 'Santiago_de_Compostela',
  'Hanói':      'Hanoi',
  'Cat Ba':     'Cat_Ba_Island',
  'Ninh Binh':  'Ninh_Bình',
  'Hue':        'Imperial_City,_Huế',
  'Da Nang':    'Da_Nang',
  'Hoi An':     'Hội_An',
  'Siem Reap':  'Angkor_Wat',
  'Phnom Penh': 'Phnom_Penh',
  'Chau Doc':   'Châu_Đốc',
  'Can Tho':    'Cần_Thơ',
};

// Dado el viaje y la fecha de hoy, devuelve lista de destinos ordenada:
// primero los del bloque actual, luego el resto
function getContextualDestinations(trip) {
  const t = today();
  const todayD = trip.days.find(d => d.date === t);
  const currentBlock = todayD ? todayD.block : null;

  if (!currentBlock) {
    // Pre/post viaje: orden normal
    return WEATHER_DESTINATIONS;
  }

  const inBlock  = WEATHER_DESTINATIONS.filter(d => d.blocks.includes(currentBlock));
  const outBlock = WEATHER_DESTINATIONS.filter(d => !d.blocks.includes(currentBlock));
  return [...inBlock, ...outBlock];
}

function weatherPill(data, label) {
  const icon = data?.icon || '🌡️';
  const temp = data?.temp || '—';
  const desc = data?.desc || '…';
  const meta = data
    ? `<span>↑ ${data.max}°</span><span>↓ ${data.min}°</span><span>💧 ${data.humidity}%</span><span>💨 ${data.wind||'—'}km/h</span>`
    : '';
  return `
    <div class="weather-card">
      <div class="wc-left">
        <div class="wc-city">${label}</div>
        <div class="wc-temp-row">
          <div class="wc-temp">${temp}<span class="wc-deg">°</span></div>
          <span class="wc-icon">${icon}</span>
        </div>
        <div class="wc-desc">${desc}</div>
        ${meta ? `<div class="wc-meta">${meta}</div>` : ''}
      </div>
    </div>`;
}

function weatherWidget(data, locationLabel) {
  if (!data) return `
    <div class="weather-widget weather-loading">
      <span class="weather-icon">🌡️</span>
      <div class="weather-body">
        <div class="weather-temp">—°</div>
        <div class="weather-desc">Cargando tiempo…</div>
      </div>
    </div>`;
  return `
    <div class="weather-widget">
      <span class="weather-icon">${data.icon}</span>
      <div class="weather-body">
        <div class="weather-temp">${data.temp}°C</div>
        <div class="weather-desc">${data.desc}</div>
        <div class="weather-meta">↑${data.max}° ↓${data.min}° · 💧${data.humidity}% · 💨${data.wind}km/h</div>
      </div>
      <div class="weather-location">${locationLabel}</div>
    </div>`;
}

// ══════════════════════════════════════════════════════════
//  VIEW: HOME (lista de viajes)
// ══════════════════════════════════════════════════════════

function toggleRouteCard(idx) {
  const card = document.getElementById('rcard-' + idx);
  if (!card) return;
  const isOpen = card.classList.contains('open');
  // Cierra todas
  document.querySelectorAll('.route-card.open').forEach(c => c.classList.remove('open'));
  if (!isOpen) {
    card.classList.add('open');
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  }
}
// Alias para compatibilidad (popover antiguo ya no se usa)
function closeAllMetroPopovers() {
  document.querySelectorAll('.route-card.open').forEach(c => c.classList.remove('open'));
}
function toggleMetroPopover(idx) { toggleRouteCard(idx); }

function renderHome() {
  currentTripId = null;
  setHeader('Mis Viajes', false);
  el('bottom-nav').style.display = 'none';

  const content = el('view-content');
  const monthEs = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  content.innerHTML = `
    <div class="trips-home-header">
      <div class="thh-top">
        <div class="thh-avatar">✈️</div>
        <div>
          <div class="thh-name">Marcos & Mery</div>
          <div class="thh-sub">Mis viajes</div>
        </div>
      </div>
    </div>
    <div class="trips-list">
    ${DB.trips.map(trip => {
      const diff = daysUntilTrip(trip);
      const active = isTripActive(trip);
      const past = isTripPast(trip);
      const dur = tripDuration(trip);
      const startD = new Date(trip.startDate + 'T12:00:00');
      const monthLabel = monthEs[startD.getMonth()] + ' ' + startD.getFullYear();
      let countdownHtml = '';
      if (active) countdownHtml = `<div class="tc-countdown"><span class="tc-cd-label">En curso</span></div>`;
      else if (past) countdownHtml = `<div class="tc-countdown tc-cd-past"><span class="tc-cd-label">Completado</span></div>`;
      else if (diff > 0) countdownHtml = `<div class="tc-countdown"><span class="tc-cd-num">${diff}</span><span class="tc-cd-label">días</span></div>`;
      const imgSrc = trip.coverImage || '';
      const bgStyle = imgSrc
        ? `background-image:linear-gradient(to bottom,rgba(0,0,0,.05) 0%,rgba(0,0,0,.62) 70%,rgba(0,0,0,.75) 100%),url('${imgSrc}');background-size:cover;background-position:center`
        : `background:${trip.coverGradient}`;
      return `
        <div class="trip-card-v2" onclick="openTrip('${trip.id}')" style="${bgStyle}">
          <div class="tcv2-top">
            <div class="tcv2-dur">${dur} días</div>
            ${countdownHtml}
          </div>
          <div class="tcv2-bottom">
            <div class="tcv2-name">${trip.name}</div>
            <div class="tcv2-month">${monthLabel}</div>
          </div>
        </div>`;
    }).join('')}
    </div>
    <div style="height:24px"></div>`;
}

function openTrip(id) { currentTripId = id; navigate('trip'); }

// ══════════════════════════════════════════════════════════
//  TIP ROTATOR — iconos SVG y texto enriquecido
// ══════════════════════════════════════════════════════════
const _s = 'rgba(255,255,255,.9)', _sw = '1.8', _sl = 'round';
const TIP_SVG_ICONS = {
  'Vacunas':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="m18 2 4 4-1.5 1.5-4-4L18 2z"/><path d="M10.5 9.5 4 16 5.5 18l1.5 1.5L13 13"/><path d="m6 10 4 4M14 6l4 4M3 21l3-3"/></svg>`,
  'Dinero':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  'Clima':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
  'Conectividad': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="${_s}"/></svg>`,
  'Transporte':   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  'Comida':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
  'Templos':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M3 22h18M6 18V10M18 18V10M10 18v-4h4v4M2 10l10-8 10 8"/></svg>`,
  'Salud':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  'Electricidad': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none"/></svg>`,
  'Fotos':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  'Regateo':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1" fill="${_s}"/></svg>`,
  'Visados':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${_s}" stroke-width="${_sw}" stroke-linecap="${_sl}" stroke-linejoin="${_sl}"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M7 15h4M7 12h2"/></svg>`,
};
const TIP_BOLD_HTML = {
  'Vacunas':      'Consulta con tu médico <strong>6-8 semanas antes</strong>. Recomendadas: <strong>hepatitis A y B, tifoidea, tétanos</strong>. El paludismo no es riesgo en las zonas turísticas habituales.',
  'Dinero':       'Vietnam usa <strong>dong (VND)</strong>. Camboya acepta <strong>USD</strong> oficialmente — lleva billetes de 1, 5 y 10 dólares. Los cajeros funcionan bien en ciudades grandes.',
  'Clima':        'Noviembre es perfecta: <strong>estación seca</strong> en el sur y centro. En el norte puede refrescar de noche. Lleva una <strong>capa ligera</strong> para los templos con aire acondicionado.',
  'Conectividad': 'Compra una <strong>SIM vietnamita</strong> en el aeropuerto de Hanói (Viettel o Vietnamobile). Unos <strong>5€ por 15 GB</strong>. En Camboya, <strong>Smart Axiata</strong> es la mejor opción.',
  'Transporte':   'Usa <strong>Grab</strong> (el Uber de Asia) para taxis seguros con precio fijo. Para motos cortas, <strong>GrabBike</strong>. Los tuk-tuks en Camboya se negocian antes de subir.',
  'Comida':       'Come donde hay <strong>cola de locales</strong> — los puestos callejeros son más seguros de lo que parecen. Lleva siempre <strong>Imodium</strong>. El <strong>pho, el bánh mì</strong> y el amok camboyano son imprescindibles.',
  'Templos':      'Cubre <strong>hombros y rodillas</strong> para entrar a templos y pagodas. Los pañuelos sarong de la entrada son un gasto evitable si llevas <strong>ropa adecuada</strong>.',
  'Salud':        'Lleva un <strong>botiquín básico</strong>: Imodium, ibuprofeno, antihistamínico, vendas y desinfectante. El <strong>seguro de viaje con repatriación médica</strong> es imprescindible.',
  'Electricidad': 'Vietnam y Camboya usan enchufes <strong>tipo A, C y G (220 V)</strong>. Un <strong>adaptador universal</strong> cubre todo. Los hoteles suelen tener enchufes universales en los cuartos.',
  'Fotos':        'En <strong>Tuol Sleng y los Killing Fields</strong>, guarda el móvil con respeto. En Angkor, los mejores ángulos están en los <strong>rincones menos transitados</strong>.',
  'Regateo':      'En mercados, empieza en el <strong>40-50 % del precio pedido</strong>. En tiendas con precio fijo, no se regatea. Siempre con <strong>buen humor</strong> — el regateo agresivo es maleducado.',
  'Visados':      'Vietnam: <strong>sin visado</strong> con pasaporte español (exención de 45 días), pero hay que rellenar la <strong>Digital Arrival Card</strong> online en los 3 días previos. Camboya: <strong>e-Visa online</strong> (~36 USD) + Digital Arrival Card en los 7 días previos. Pasaporte con <strong>mínimo 6 meses de vigencia</strong>.',
};

// ══════════════════════════════════════════════════════════
//  VIEW: INICIO / TRIP DASHBOARD (con tiempo)
// ══════════════════════════════════════════════════════════

async function renderTripDashboard() {
  clearHomeTimers(); // también si se repinta sin pasar por renderView
  const trip = getTrip(currentTripId);
  if (!trip) return renderHome();
  setHeader(trip.name, false);

  const active = isTripActive(trip);
  const past = isTripPast(trip);
  const diff = daysUntilTrip(trip);
  const day = todayDay(trip);
  const nextDay = nextFutureDay(trip);

  // Pendientes globales
  const allPending = trip.days.flatMap(d =>
    d.tasks.filter(t => !t.done).map(t => ({ ...t, city: d.city, date: d.date }))
  );
  const pendingTotal = allPending.length;
  const pendingNext5 = allPending.slice(0, 4);

  // Render estructura inicial
  const content = el('view-content');
  content.innerHTML = buildDashboardHTML(trip, active, past, diff, day, nextDay, pendingTotal, pendingNext5);

  // ── Cargar imágenes Wikipedia (hero + wiki photos) ──
  loadHeroImages();
  loadPageWikiPhotos();

  // ── Hero rotante ──
  let heroIdx = 0;
  homeInterval(() => {
    const layers = document.querySelectorAll('.hero-img-layer');
    if (!layers.length) return;
    layers[heroIdx].classList.replace('active', 'inactive');
    heroIdx = (heroIdx + 1) % layers.length;
    layers[heroIdx].classList.replace('inactive', 'active');
  }, 5000);

  // ── Tiempo: pastilla única que cicla por Santiago + destinos ──
  const OFFLINE_SANTIAGO = { temp:'14', max:'17', min:'10', icon:'🌧️', desc:'Lluvia típica gallega', humidity:'85' };
  const destinations = getContextualDestinations(trip);

  const allCities = [
    { label: 'Santiago de Compostela', query: 'Santiago de Compostela', offline: OFFLINE_SANTIAGO, home: true },
    ...destinations.map(d => ({ label: d.label, query: d.query, offline: d.offline, home: false }))
  ];

  // Cargar todas las ciudades en paralelo y guardarlas en un array
  const resolved = allCities.map(c => ({ label: c.label, data: c.offline, home: c.home }));
  let wIdx = 0;
  let wTimer = null;

  function showWeatherCity(i, instant) {
    const slot = document.getElementById('weather-single');
    if (!slot) return;
    const r = resolved[i % resolved.length];
    const render = () => {
      if (!slot.isConnected) return;
      slot.innerHTML = weatherPill(r.data, r.label);
      // Cargar foto de fondo
      const bgImg = document.getElementById('wc-bg-img');
      if (bgImg) {
        const article = WEATHER_CITY_WIKI[r.label];
        if (article) {
          _fetchWikiEntry(article).then(entry => {
            const src = entry?.large || entry?.small;
            if (src && bgImg.isConnected) {
              bgImg.onload = () => bgImg.classList.add('loaded');
              bgImg.src = src;
            }
          });
        } else {
          _searchCommonsImage(r.label).then(entry => {
            const src = entry?.large || entry?.small;
            if (src && bgImg.isConnected) {
              bgImg.onload = () => bgImg.classList.add('loaded');
              bgImg.src = src;
            }
          });
        }
      }
      if (!instant) {
        slot.style.cssText = 'opacity:0;transition:none';
        setTimeout(() => {
          if (!slot.isConnected) return;
          slot.style.cssText = 'opacity:1;transition:opacity 2.2s ease';
        }, 40);
      } else {
        slot.style.cssText = 'opacity:1';
      }
    };
    if (instant) {
      render();
    } else {
      slot.style.cssText = 'opacity:0;transition:opacity 1.8s ease';
      setTimeout(render, 1800);
    }
  }

  // Mostrar Santiago inmediatamente (con dato offline si aún no ha cargado)
  showWeatherCity(0, true);
  wTimer = homeInterval(() => { wIdx++; showWeatherCity(wIdx, false); }, 15000);

  // Reemplazar datos offline con reales cuando lleguen (y repintar si es la ciudad visible)
  allCities.forEach((c, i) => {
    fetchWeather(c.query).then(w => {
      if (!w) return;
      resolved[i].data = w;
      if (i === wIdx % resolved.length) showWeatherCity(wIdx, true);
    });
  });

  // ── Tick del reloj dual ──
  tickDualClock(trip);
  homeInterval(() => tickDualClock(trip), 10000);

  // ── Inicializar conversor ──
  // Moneda del país en que se está. Antes solo cambiaba el tipo interno (_fxRate) y en
  // Camboya convertía a rieles mostrando la etiqueta y la pestaña de VND.
  switchFXCurrency(getCurrentCountry(trip) === 'km' ? 'KHR' : 'VND');

  // ── Tips rotantes con gradiente ──
  const tips = trip.travelTips || [];
  const tipGrads = [
    'linear-gradient(135deg,#1a3a5c,#2d6a8f)',
    'linear-gradient(135deg,#1b4332,#2d6a4f)',
    'linear-gradient(135deg,#1f4e79,#2f6fa3)',
    'linear-gradient(135deg,#2f3d17,#6b7f3a)',
    'linear-gradient(135deg,#0d3b4f,#1a7a8a)',
    'linear-gradient(135deg,#4a3510,#8a6a1c)',
    'linear-gradient(135deg,#1a3a5c,#2d6a8f)',
    'linear-gradient(135deg,#1b4332,#2d6a4f)',
    'linear-gradient(135deg,#1f4e79,#2f6fa3)',
    'linear-gradient(135deg,#2f3d17,#6b7f3a)',
    'linear-gradient(135deg,#0d3b4f,#1a7a8a)',
    'linear-gradient(135deg,#4a3510,#8a6a1c)',
  ];
  if (tips.length > 1) {
    let tipIdx = 0;
    // Pre-load tip photos
    const _tipPhotoCache = {};
    // Pre-load all hardcoded photos immediately
    tips.forEach((t, i) => { if (t.photo) _tipPhotoCache[i] = t.photo; });

    function showTip(i) {
      const idx = i % tips.length;
      const t = tips[idx];
      const rotator = document.getElementById('tip-rotator');
      const icon = document.getElementById('tip-icon');
      const title = document.getElementById('tip-title');
      const text = document.getElementById('tip-text');
      const counter = document.getElementById('tip-counter');
      const bgImg = document.getElementById('tip-bg-img');
      const bgOverlay = document.getElementById('tip-bg-overlay');
      if (!icon || !rotator) return;
      rotator.classList.add('tip-fade-out');
      setTimeout(() => {
        icon.innerHTML = TIP_SVG_ICONS[t.title] || t.icon;
        title.textContent = t.title;
        text.innerHTML = TIP_BOLD_HTML[t.title] || t.tip;
        if (counter) counter.textContent = `${idx + 1} / ${tips.length}`;
        if (bgOverlay) bgOverlay.style.background = tipGrads[idx] || tipGrads[0];
        document.querySelectorAll('.tip-dot').forEach((d, di) =>
          d.classList.toggle('active', di === idx));
        // Swap photo if available
        if (bgImg) {
          const src = _tipPhotoCache[idx];
          if (src) {
            bgImg.style.opacity = '0';
            bgImg.onload = () => {
              bgImg.style.opacity = '1';
              rotator?.classList.add('has-photo');
            };
            bgImg.src = src;
          } else {
            bgImg.style.opacity = '0';
            rotator?.classList.remove('has-photo');
            if (_tipPhotoCache[idx] === undefined) loadTipPhoto(idx);
          }
        }
        rotator.classList.remove('tip-fade-out');
      }, 300);
    }
    document.querySelectorAll('.tip-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        tipIdx = +dot.dataset.i;
        clearInterval(tipTimer);
        showTip(tipIdx);
        tipTimer = homeInterval(() => { tipIdx++; showTip(tipIdx); }, 7000);
      });
    });
    // Show first photo immediately (already in cache)
    setTimeout(() => {
      const bgImg = document.getElementById('tip-bg-img');
      const rotator = document.getElementById('tip-rotator');
      if (bgImg && _tipPhotoCache[0]) {
        bgImg.onload = () => { bgImg.style.opacity = '1'; rotator?.classList.add('has-photo'); };
        bgImg.src = _tipPhotoCache[0];
      }
    }, 100);
    var tipTimer = homeInterval(() => { tipIdx++; showTip(tipIdx); }, 7000);
  }
}

// ══════════════════════════════════════════════════════════
//  MÓDULOS NUEVOS DEL DASHBOARD
// ══════════════════════════════════════════════════════════

// Detecta en qué bloque/país estamos según la fecha
function getCurrentBlock(trip) {
  const t = today();
  const d = trip.days.find(day => day.date === t);
  return d ? d.block : null;
}
function getCurrentCountry(trip) {
  const t = today();
  const d = trip.days.find(day => day.date === t);
  if (!d) return null;
  const c = (d.country || '').toLowerCase();
  if (c.includes('camboya') || c.includes('cambodia') || c.includes('🇰🇭')) return 'km';
  return 'vi';
}

// ── RELOJ DE DOBLE HUSO ────────────────────────────────────
function buildDualClockHTML() {
  return `
    <div class="dual-clock-wrap">
      <div class="dc-card dc-home">
        <div class="dc-flag">🏠</div>
        <div class="dc-city">Santiago de Compostela</div>
        <div class="dc-time" id="dc-time-home">--:--</div>
        <div class="dc-tz">UTC+1</div>
      </div>
      <div class="dc-divider"></div>
      <div class="dc-card dc-dest">
        <div class="dc-flag">🌏</div>
        <div class="dc-city" id="dc-city-dest">Asia</div>
        <div class="dc-time" id="dc-time-dest">--:--</div>
        <div class="dc-tz" id="dc-tz-dest">UTC+7</div>
      </div>
    </div>`;
}

function tickDualClock(trip) {
  const homeEl   = document.getElementById('dc-time-home');
  const destEl   = document.getElementById('dc-time-dest');
  const cityEl   = document.getElementById('dc-city-dest');
  const tzEl     = document.getElementById('dc-tz-dest');
  if (!homeEl || !destEl) return;

  const now = new Date();
  // Santiago: UTC+1 (Spain in November, after DST ends last Sunday of Oct)
  const homeOffset = 1;
  // Current destination timezone
  const block = getCurrentBlock(trip);
  // Current city: today's day city, or nearest upcoming day's city
  const t = today();
  const destCity = (() => {
    const d = trip.days.find(day => day.date === t);
    if (d && !FLIGHT_BLOCKS.includes(d.block)) return d.city;
    // Días de vuelo (España→Asia) no son el "destino" a efectos de este reloj — saltar al primer día real
    const next = trip.days.find(day => day.date > t && !FLIGHT_BLOCKS.includes(day.block)) || trip.days.find(day => day.date > t);
    return next ? next.city : (trip.days[0]?.city || 'Destino');
  })();
  // Vietnam & Cambodia both UTC+7
  const destOffset = 7;

  const fmt = (d, off) => {
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const local = new Date(utc + off * 3600000);
    const h = String(local.getHours()).padStart(2,'0');
    const m = String(local.getMinutes()).padStart(2,'0');
    return `${h}:${m}`;
  };

  homeEl.textContent = fmt(now, homeOffset);
  destEl.textContent = fmt(now, destOffset);
  if (cityEl) cityEl.textContent = destCity;
  if (tzEl)   tzEl.textContent = 'UTC+7 · ICT';
}

// ── CONVERSOR DE DIVISAS ────────────────────────────────────
const FX_RATES = {
  VND: { name: 'Dong vietnamita', cc: 'vn', symbol: '₫', perEur: 29600 },
  KHR: { name: 'Riel camboyano',  cc: 'kh', symbol: '៛', perEur: 4630  },
  USD: { name: 'Dólar USA',       cc: 'us', symbol: '$', perEur: 1.14  },
};
// Banderas emoji (🇻🇳, 🇰🇭…): en el móvil se dibujan bien, pero Windows no tiene banderas y
// salen como letras («VN»). Solo en ese caso se cambian por imágenes; en el móvil se dejan
// como emoji para que todo siga funcionando sin conexión.
const SUPPORTS_FLAG_EMOJI = (() => {
  try {
    const c = document.createElement('canvas'); c.width = c.height = 24;
    const x = c.getContext('2d'); x.textBaseline = 'top'; x.font = '20px sans-serif';
    x.fillText('\u{1F1EA}\u{1F1F8}', 0, 0);
    const d = x.getImageData(0, 0, 24, 24).data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] > 0 && (Math.abs(d[i] - d[i + 1]) > 40 || Math.abs(d[i + 1] - d[i + 2]) > 40)) return true; // hay color: bandera real
    }
    return false;
  } catch (e) { return true; }
})();
function flagText(str) {
  const safe = escHtml(String(str || ''));
  if (SUPPORTS_FLAG_EMOJI) return safe;
  return safe.replace(/([\u{1F1E6}-\u{1F1FF}])([\u{1F1E6}-\u{1F1FF}])/gu, (m, a, b) => {
    const cc = String.fromCharCode(a.codePointAt(0) - 0x1F1E6 + 97, b.codePointAt(0) - 0x1F1E6 + 97);
    return `<img class="emoji-flag" src="https://flagcdn.com/20x15/${cc}.png" alt="${cc.toUpperCase()}" width="20" height="15">`;
  });
}

// flagcdn solo sirve ciertos tamaños (16, 20, 24, 28, 32…): 18 daba imagen rota.
function flagImg(cc, size) {
  const s = size || 32;
  return `<img src="https://flagcdn.com/${s}x${Math.round(s*0.75)}/${cc}.png" alt="${cc}" class="fx-flag-img" width="${s}" height="${Math.round(s*0.75)}" style="border-radius:3px;display:block">`;
}

function buildCurrencyHTML(trip) {
  // Siempre mostramos las 3 divisas: VND, KHR, USD
  const allCurs = [
    { key: 'VND', ...FX_RATES.VND },
    { key: 'KHR', ...FX_RATES.KHR },
    { key: 'USD', ...FX_RATES.USD },
  ];
  const mainCur = allCurs[0];

  return `
    <div class="currency-card">
      <div class="currency-header">
        <div class="currency-title">💶 Conversor de divisas</div>
        <div class="currency-rate-note" id="fx-rate-note">1 € = ${mainCur.perEur.toLocaleString('es')} ${mainCur.symbol}</div>
      </div>
      <div class="currency-body">
        <div class="currency-input-row">
          <div class="currency-eur-badge">${flagImg('eu', 24)} € EUR</div>
          <input class="currency-input" id="fx-eur" type="number" placeholder="0"
                 inputmode="decimal" oninput="calcFXFrom('eur')" aria-label="Cantidad en euros">
        </div>
        <div class="currency-divider">↕</div>
        <div class="currency-input-row">
          <div class="currency-local-badge" id="fx-local-badge">${flagImg(mainCur.cc, 24)} ${mainCur.symbol} ${mainCur.key}</div>
          <input class="currency-input" id="fx-local" type="number" placeholder="0"
                 inputmode="decimal" oninput="calcFXFrom('local')" aria-label="Cantidad en moneda local">
        </div>
      </div>
      <div class="currency-tabs" id="fx-tabs">
        ${allCurs.map((c, i) => `
          <button class="fx-tab ${i===0?'active':''}" onclick="switchFXCurrency('${c.key}')"
                  data-key="${c.key}">
            <span class="fx-tab-flag">${flagImg(c.cc, 32)}</span>
            <span class="fx-tab-info">
              <span class="fx-tab-key">${c.key}</span>
              <span class="fx-tab-name">${c.name}</span>
              <span class="fx-tab-rate">1€ = ${c.perEur > 10 ? Math.round(c.perEur).toLocaleString('es') : c.perEur.toFixed(2)} ${c.symbol}</span>
            </span>
          </button>`).join('')}
      </div>
    </div>`;
}

let _fxRate = FX_RATES.VND.perEur;
let _fxCurKey = 'VND';

function _fmtLocal(val) {
  return _fxRate > 10 ? Math.round(val).toLocaleString('es') : val.toFixed(2);
}

function calcFXFrom(from) {
  const eurEl   = document.getElementById('fx-eur');
  const localEl = document.getElementById('fx-local');
  if (!eurEl || !localEl) return;
  if (from === 'eur') {
    const eur = parseFloat(eurEl.value);
    if (isNaN(eur) || eurEl.value === '') { localEl.value = ''; return; }
    // toLocaleString('es') usa punto como separador de miles → eliminarlo; coma decimal → punto para input
    localEl.value = _fxRate > 10
      ? String(Math.round(eur * _fxRate))
      : (eur * _fxRate).toFixed(2);
  } else {
    const local = parseFloat(localEl.value);
    if (isNaN(local) || localEl.value === '') { eurEl.value = ''; return; }
    const eur = local / _fxRate;
    eurEl.value = eur.toFixed(2);
  }
}

function swapFX() {
  const eurEl   = document.getElementById('fx-eur');
  const localEl = document.getElementById('fx-local');
  if (!eurEl || !localEl) return;
  const tmp = eurEl.value;
  eurEl.value = localEl.value;
  localEl.value = tmp;
  if (eurEl.value) calcFXFrom('eur');
  else if (localEl.value) calcFXFrom('local');
  const btn = document.querySelector('.currency-swap-btn');
  if (btn) { btn.style.transform = 'rotate(180deg)'; setTimeout(() => btn.style.transform = '', 300); }
}

function switchFXCurrency(key) {
  const cur = FX_RATES[key];
  if (!cur) return;
  _fxRate = cur.perEur;
  _fxCurKey = key;
  document.querySelectorAll('.fx-tab').forEach(b => b.classList.toggle('active', b.dataset.key === key));
  const note  = document.getElementById('fx-rate-note');
  const badge = document.getElementById('fx-local-badge');
  if (note)  note.textContent = `1 € = ${cur.perEur > 10 ? Math.round(cur.perEur).toLocaleString('es') : cur.perEur.toFixed(2)} ${cur.symbol}`;
  if (badge) badge.innerHTML = `${flagImg(cur.cc, 24)} ${cur.symbol} ${key}`;
  const eurEl = document.getElementById('fx-eur');
  if (eurEl?.value) calcFXFrom('eur'); else calcFXFrom('local');
}

// ── STATS VIVAS ────────────────────────────────────────────
function buildTripStatsHTML(trip) {
  const t = today();
  const totalDays = tripDuration(trip);
  const allDays = trip.days;
  const dayNum = allDays.findIndex(d => d.date === t);
  const currentDay = dayNum >= 0 ? dayNum + 1 : (isTripPast(trip) ? totalDays : 0);
  const daysLeft = Math.max(0, totalDays - currentDay);
  const pct = Math.round((currentDay / totalDays) * 100);

  // Zonas
  const blocks = [...new Set(allDays.map(d => d.block).filter(b => b && !FLIGHT_BLOCKS.includes(b)))];
  const pastBlocks = new Set(allDays.filter(d => d.date < t).map(d => d.block).filter(b => b && !FLIGHT_BLOCKS.includes(b)));
  if (dayNum >= 0 && !FLIGHT_BLOCKS.includes(allDays[dayNum].block)) pastBlocks.add(allDays[dayNum].block);

  // Países — un día de tránsito fronterizo ("España → China") cuenta como el
  // primer país real del texto, no como una entrada nueva distinta
  const primaryCountry = c => (c || '').replace(/[^a-zA-ZÀ-ÿ ]/g, '').trim().split(' ').filter(Boolean)[0] || '';
  const countryByDay = allDays.map(d => primaryCountry(d.country));
  const countries = [...new Set(countryByDay.filter(Boolean))];
  const doneCountries = new Set(allDays.filter(d => d.date <= t).map(d => primaryCountry(d.country)).filter(Boolean));

  // Noches por país
  // Noches por país: la noche de cada día se pasa en el país de DESTINO del día («Vietnam → Camboya» = Camboya),
  // y solo cuenta si se duerme en tierra (hotel o bus nocturno), no en un vuelo.
  const destCountry = d => ((d.country || '').split('→').pop() || '').toLowerCase();
  const sleepsHere  = d => (d.hotel && d.hotel.name) || (d.transport || []).some(tr => /nocturno|sleeper/i.test(tr.details || ''));
  const nightsVI = allDays.filter(d => sleepsHere(d) && destCountry(d).includes('vietnam')).length;
  const nightsKH = allDays.filter(d => sleepsHere(d) && /camboya|cambodia/.test(destCountry(d))).length;

  // Tránsitos
  // Todos los trayectos del viaje con su fecha (km aproximados en data.js)
  const transits = trip.days.flatMap(d => (d.transport || []).map(tr => ({ ...tr, date: d.date })));
  const doneTransits = transits.filter(tr => tr.date <= t);
  const pendingTransits = transits.filter(tr => tr.date > t);
  const nextTransit = pendingTransits[0];
  // Una fila por medio de transporte (solo las que aparecen en el viaje). Los traslados en
  // coche (Grab, taxi, miniván) cuentan como un transporte más (decisión de Marcos, 6-oct-2026).
  const TRANSIT_ROWS = [
    { icon: '✈️', label: 'Vuelos',  types: ['flight'] },
    { icon: '🚆', label: 'Trenes',  types: ['train', 'night-train'] },
    { icon: '🚌', label: 'Buses',   types: ['bus', 'sleeper-bus'] },
    { icon: '⛴️', label: 'Barcos',  types: ['ferry', 'boat'] },
    { icon: '🚗', label: 'Coche',   types: ['car', 'taxi', 'tuktuk', 'van'] },
  ];
  const known = TRANSIT_ROWS.flatMap(r => r.types);
  TRANSIT_ROWS.push({ icon: '🧭', label: 'Otros', types: [...new Set(transits.map(tr => tr.type).filter(ty => !known.includes(ty)))] });
  const transitRows = TRANSIT_ROWS
    .map(r => ({ ...r, total: transits.filter(tr => r.types.includes(tr.type)).length,
                       done:  doneTransits.filter(tr => r.types.includes(tr.type)).length }))
    .filter(r => r.total > 0);
  const kmDone  = doneTransits.reduce((s, tr) => s + (tr.km || 0), 0);
  const kmTotal = transits.reduce((s, tr) => s + (tr.km || 0), 0);
  const kmPct   = kmTotal ? Math.round((kmDone / kmTotal) * 100) : 0;

  // Días hasta el viaje
  const tripStart = allDays[0]?.date;
  const tripEnd   = allDays[allDays.length-1]?.date;
  const msDay = 86400000;
  const daysToStart = tripStart ? Math.ceil((new Date(tripStart+' 12:00') - new Date()) / msDay) : null;
  const isBeforeTrip = daysToStart !== null && daysToStart > 0;

  // Próximo hotel
  const upcomingHotels = allDays.filter(d => d.date >= t && d.hotel?.name);
  const nextHotel = upcomingHotels[0];

  const TRANSPORT_ICONS = { flight:'✈️', train:'🚆', bus:'🚌', ferry:'⛴️', car:'🚗', tuktuk:'🚗', boat:'⛵' };

  return `
    <div class="stats-big">
      <!-- Barra de progreso principal -->
      <div class="stats-progress-card">
        <div class="spc-top">
          <div class="spc-label">${isBeforeTrip ? `Faltan ${daysToStart} días` : (isTripPast(trip) ? 'Viaje completado ✓' : `Día ${currentDay} de ${totalDays}`)}</div>
          <div class="spc-pct">${pct}%</div>
        </div>
        <div class="spc-bar"><div class="spc-bar-fill" style="width:${pct}%"></div></div>
        <div class="spc-bottom">
          <span>${allDays[0]?.date ? new Date(allDays[0].date+' 12:00').toLocaleDateString('es-ES',{day:'numeric',month:'short'}) : ''}</span>
          ${!isBeforeTrip && daysLeft > 0 ? `<span class="spc-left">Quedan <b>${daysLeft}</b> días</span>` : ''}
          <span>${allDays[allDays.length-1]?.date ? new Date(allDays[allDays.length-1].date+' 12:00').toLocaleDateString('es-ES',{day:'numeric',month:'short'}) : ''}</span>
        </div>
      </div>

      <!-- Grid de fichas -->
      <div class="stats-grid-2">

        <!-- Países -->
        <div class="stat2-card">
          <div class="stat2-top">
            <div class="stat2-icon">🌏</div>
            <div class="stat2-val">${doneCountries.size}<span class="stat2-of">/${countries.length}</span></div>
          </div>
          <div class="stat2-lbl">Países visitados</div>
          <div class="stat2-flags">${flagText('🇻🇳')} ${nightsVI}n &nbsp; ${flagText('🇰🇭')} ${nightsKH}n</div>
        </div>

        <!-- Zonas -->
        <div class="stat2-card">
          <div class="stat2-top">
            <div class="stat2-icon">📍</div>
            <div class="stat2-val">${pastBlocks.size}<span class="stat2-of">/${blocks.length}</span></div>
          </div>
          <div class="stat2-lbl">Zonas recorridas</div>
          <div class="stat2-dots">
            ${blocks.map(b => `<span class="stat2-dot ${pastBlocks.has(b)?'done':''}" title="${b}"></span>`).join('')}
          </div>
        </div>

        <!-- Km recorridos -->
        <div class="stat2-card stat2-km">
          <div class="stat2-top">
            <div class="stat2-icon">🛣️</div>
            <div class="stat2-val">${kmDone.toLocaleString('es')}</div>
          </div>
          <div class="stat2-lbl">km recorridos</div>
          <div class="stat2-bar"><div class="stat2-bar-fill" style="width:${kmPct}%"></div></div>
          <div class="stat2-sub">de ${kmTotal.toLocaleString('es')} km totales</div>
        </div>

        <!-- Transportes -->
        <div class="stat2-card">
          <div class="stat2-lbl" style="margin-bottom:6px">Transportes</div>
          ${transitRows.map(r => `<div class="stat2-transit-row" title="${r.label}"><span aria-label="${r.label}">${r.icon}</span><div class="stat2-tr-bar-wrap"><div class="stat2-tr-bar" style="width:${Math.round(r.done / r.total * 100)}%"></div></div><span class="stat2-tr-val">${r.done}/${r.total}</span></div>`).join('')}
        </div>

      </div>

      ${nextTransit ? `
      <!-- Próximo tránsito -->
      <div class="stat2-next-transit">
        <div class="snt-icon">${TRANSPORT_ICONS[nextTransit.type] || '🚌'}</div>
        <div class="snt-body">
          <div class="snt-label">Próximo tránsito · ${new Date(nextTransit.date+' 12:00').toLocaleDateString('es-ES',{day:'numeric',month:'short'})}</div>
          <div class="snt-route">${nextTransit.from} → ${nextTransit.to}</div>
          ${nextTransit.notes ? `<div class="snt-notes">${nextTransit.notes}</div>` : ''}
        </div>
      </div>` : ''}

      ${nextHotel ? `
      <!-- Próximo alojamiento -->
      <div class="stat2-next-hotel">
        <div class="snh-icon">🏨</div>
        <div class="snh-body">
          <div class="snh-label">Próximo alojamiento · ${new Date(nextHotel.date+' 12:00').toLocaleDateString('es-ES',{day:'numeric',month:'short'})}</div>
          <div class="snh-name">${escHtml(nextHotel.hotel.name)}${hotelInfo(nextHotel.hotel).checkIn ? ' · Entrada ' + escHtml(hotelInfo(nextHotel.hotel).checkIn) : ''}</div>
        </div>
      </div>` : ''}

    </div>`;
}

// ── DICCIONARIO DE SUPERVIVENCIA ───────────────────────────
// Datos en js/guia.js. Por defecto, el idioma del país en que se está (vietnamita
// fuera del viaje); el botón del idioma alterna vietnamita ⇄ jemer.
let _dictLang = null;

function buildSurvivalDictHTML(trip) {
  if (!window.SURVIVAL_DICT) return '';
  const langKey = _dictLang || (getCurrentCountry(trip) === 'km' ? 'km' : 'vi');
  const dict = window.SURVIVAL_DICT[langKey];
  if (!dict) return '';
  const langCC = { vi: 'vn', km: 'kh' }[langKey] || 'vn';
  const otherName = langKey === 'vi' ? 'jemer' : 'vietnamita';

  const cards = dict.phrases.map(p => `
    <div class="dict-card">
      <div class="dict-es">${p.es}</div>
      <div class="dict-local" lang="${langKey}">${p.local}</div>
      <div class="dict-pron">Se dice: ${p.pron}</div>
    </div>`).join('');

  return `
    <div class="dict-wrap">
      <div class="dict-header">
        <div class="dict-title">Frases de supervivencia</div>
        <button class="dict-lang-badge" onclick="toggleDictLang()" aria-label="Cambiar a ${otherName}">${flagImg(langCC, 20)} ${dict.lang} ⇄</button>
      </div>
      ${dict.note ? `<div class="dict-note">${dict.note}</div>` : ''}
      <div class="dict-scroll" id="dict-scroll">${cards}</div>
    </div>`;
}

function toggleDictLang() {
  const trip = getTrip(currentTripId);
  const box = document.getElementById('dict-box');
  if (!trip || !box) return;
  const cur = _dictLang || (getCurrentCountry(trip) === 'km' ? 'km' : 'vi');
  _dictLang = cur === 'vi' ? 'km' : 'vi';
  box.innerHTML = buildSurvivalDictHTML(trip);
}

// ── TARJETAS CULTURALES ────────────────────────────────────
// Datos en js/guia.js (CULTURE_CARDS), por bloque del itinerario.
function buildCultureHTML(block) {
  const cards = (window.CULTURE_CARDS || {})[block];
  if (!cards || !cards.length) return '';
  return `
    <div class="section-title">📖 Cultura y contexto</div>
    <div class="culture-grid" style="padding:0 16px 8px">
      ${cards.map(c => `
        <div class="culture-card">
          <div class="culture-icon" aria-hidden="true">${c.icon}</div>
          <div class="culture-body">
            <div class="culture-title">${c.title}</div>
            <div class="culture-text">${c.text}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

// ── ALERTAS DE TRÁNSITO ────────────────────────────────────
function buildTransitAlertHTML(day) {
  if (!day || !day.transport || !day.transport.length) return '';
  const todayTransit = day.transport.filter(tr => tr.notes);
  if (!todayTransit.length) return '';
  return `
    <div class="transit-alerts">
      ${todayTransit.map(tr => `
        <div class="transit-alert">
          <span class="transit-alert-icon">${tr.icon}</span>
          <div>
            <div class="transit-alert-route">${tr.from} → ${tr.to}</div>
            <div class="transit-alert-notes">${tr.notes}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

function buildDashboardHTML(trip, active, past, diff, day, nextDay, pendingTotal, pendingNext5) {
  // ── Estado del viaje ──
  let statusBadge = '';
  if (active) statusBadge = `<span class="status-badge status-active">🟢 Viaje en curso · Día ${getDayNumber(trip, today())}</span>`;
  else if (past) statusBadge = `<span class="status-badge status-past">✓ Viaje completado</span>`;
  else statusBadge = `<span class="status-badge status-future">⏳ ${diff} días para salir</span>`;

  // ── Sección de hoy (solo durante el viaje) ──
  let todaySection = '';
  if (active && day) {
    const tr = day.transport[0];
    todaySection = `
      <div class="section-title">Hoy · ${day.city}</div>
      <div class="card dashboard-today-card" onclick="navigate('today')">
        <div class="flex-between" style="margin-bottom:10px">
          <div style="font-size:15px;font-weight:800;color:var(--primary)">${day.city}</div>
          <span class="tag tag-green">Hoy</span>
        </div>
        <p style="font-size:13px;color:var(--text-sm);line-height:1.5">${day.summary.substring(0,100)}…</p>
        ${tr ? `<div class="transport-item" style="margin-top:10px;margin-bottom:0">
          <div class="transport-icon">${tr.icon || transportIcon(tr.type)}</div>
          <div class="transport-body">
            <div class="transport-detail">${tr.details}</div>
            <div class="transport-route">${tr.from} → ${tr.to}</div>
          </div>
        </div>` : ''}
        ${day.hotel && day.hotel.name ? `<div style="margin-top:8px;font-size:13px;color:var(--text-sm)">🏨 ${escHtml(day.hotel.name)}${hotelInfo(day.hotel).checkIn ? ' · Entrada ' + escHtml(hotelInfo(day.hotel).checkIn) : ''}</div>` : ''}
        <div style="margin-top:10px;font-size:12px;color:var(--primary);font-weight:700">Ver todo el día →</div>
      </div>`;
  }

  // ── Timeline horizontal estilo metro ──
  const blocks = [...new Set(trip.days.map(d => d.block).filter(Boolean))];
  const totalPlaces = trip.days.reduce((s, d) => s + d.places.length, 0);
  const totalNights = tripDuration(trip);
  const totalCountries = new Set(trip.days.map(d => (d.country||'').replace(/[^a-zA-ZÀ-ÿ ]/g,'').trim().split(' ').filter(Boolean)[0]).filter(Boolean)).size;

  const _svgMtn = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><polyline points="2 20 8 9 13 15 16 10 22 20"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`;
  const _svgLantern = `<svg viewBox="0 0 24 24" fill="white" width="26" height="26"><rect x="9" y="2" width="6" height="2.5" rx="1.2"/><path d="M7 4.5h10l1.5 8H5.5L7 4.5z"/><path d="M5.5 12.5L4 17h16l-1.5-4.5"/><rect x="9" y="17" width="6" height="2.5" rx="1.2"/><rect x="10.5" y="19.5" width="3" height="2" rx="0.8"/></svg>`;
  const _svgTemple = `<svg viewBox="0 0 24 24" fill="white" width="26" height="26"><path d="M12 3l1.5 3.5h-3L12 3z"/><rect x="7" y="6.5" width="10" height="2" rx="1"/><rect x="5" y="8.5" width="14" height="2" rx="1"/><rect x="3" y="10.5" width="18" height="9.5" rx="1"/><rect x="6" y="13" width="2.5" height="7"/><rect x="10.75" y="13" width="2.5" height="7"/><rect x="15.5" y="13" width="2.5" height="7"/></svg>`;
  const _svgWave = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round" width="26" height="26"><path d="M2 13c2-3 4.5-4.5 7-3.5s5 3.5 7 1 3.5-3 6-2"/><path d="M2 18c2-3 4.5-4.5 7-3.5s5 3.5 7 1 3.5-3 6-2"/></svg>`;
  const _svgPlane = `<svg viewBox="0 0 24 24" fill="white" width="26" height="26"><path d="M21 16l-8.5-4.5V4a2.5 2.5 0 0 0-5 0v7.5L3 16v2.5l4.5-1.5v3.5l-1.5 1H19l-1.5-1V17l4.5 1.5V16z"/></svg>`;

  const ZONE_META = {
    'Vuelos':     { color: '#5c6b7a', lt: '#e4e8ec', label: 'Vuelos', wiki: 'Barcelona–El_Prat_Airport', photo: 'img/fotos/aeropuerto-barcelona-el-prat.jpg',
                    desc: 'Barcelona y escala en Shenzhen antes de aterrizar en Hanói.' },
    'Vuelta a casa': { color: '#5c6b7a', lt: '#e4e8ec', label: 'Vuelta a casa', wiki: 'Barcelona–El_Prat_Airport', photo: 'img/fotos/aeropuerto-barcelona-el-prat.jpg',
                    desc: 'Escala en Shenzhen, llegada a Barcelona y último vuelo a Santiago.' },
    'Delta del Mekong': { color: '#2e8b57', lt: '#d6f0e0', label: 'Delta del Mekong', wiki: 'Mekong_Delta', photo: 'img/fotos/cho-noi-cai-rang.jpg',
                    desc: 'Chau Doc y Can Tho, cruzando la frontera camboyano-vietnamita por el río Mekong.' },
    'Ninh Binh':  { color: '#4a7c3f', lt: '#e0f0d8', label: 'Ninh Binh', wiki: 'Trang_An',
                    desc: 'Tam Coc y Trang An — la "Ha Long Bay terrestre", arrozales entre picos kársticos.' },
    'El Norte':   { color: '#1A7B6B', lt: '#d0f0e8', label: 'Vietnam Norte',   wiki: 'Lan_Ha_Bay',
                    desc: 'Hanói: el Old Quarter, el lago Hoan Kiem, templos milenarios y phở auténtico. El primer contacto con Vietnam.' },
    'Vuelta al Norte': { color: '#1A7B6B', lt: '#d0f0e8', label: 'Cat Ba · vuelta al Norte', wiki: 'Lan_Ha_Bay',
                    desc: 'Cat Ba y Lan Ha Bay antes de volver a Hanói para el vuelo de regreso.' },
    'El Centro':  { color: '#2f6fa3', lt: '#dbe8f4', label: 'Vietnam Centro',   wiki: 'Hội_An',
                    desc: 'Hoi An, Da Nang y Hue: los farolillos del casco antiguo, el tren panorámico por el paso de Hai Van y la ciudad imperial.' },
    'Angkor':     { color: '#b8861b', lt: '#f6ebcf', label: 'Angkor & Siem Reap', wiki: 'Angkor_Wat',
                    desc: 'Siem Reap y los templos de Angkor. La civilización jemer en todo su esplendor: Angkor Wat al amanecer y la jungla infinita.' },
    'Phnom Penh': { color: '#8B5E3C', lt: '#f5e6d8', label: 'Phnom Penh',       wiki: 'Phnom_Penh',
                    desc: 'Capital de Camboya junto al Mekong: el Palacio Real, la memoria de los Jemeres Rojos y mercados vivos, antes de cruzar a Vietnam en barco por el río.' },
    'El Cierre':  { color: '#6b7f3a', lt: '#e8edd6', label: 'El Cierre · Hanói', wiki: 'Hanoi',
                    desc: 'El último día en Hanói antes de volar a casa: phở de despedida, chả cá y los recuerdos del viaje de vuestra vida.' },
  };
  applyZoneColors(ZONE_META);

  // Bloque activo (en qué bloque estamos hoy)
  const todayDate = today();
  const todayDay = trip.days.find(d => d.date === todayDate);
  const activeBlock = todayDay ? todayDay.block : null;

  // Gradientes vivos para los círculos por zona
  const ZONE_GRADIENTS = Object.fromEntries(Object.entries(BLOCK_ZONE_COLORS)
    .filter(([, z]) => z.g).map(([k, z]) => [k, `linear-gradient(135deg,${z.g},${z.color})`]));

  const routeItems = blocks.map((b, i) => {
    const meta = ZONE_META[b] || { color: '#1a3a5c', lt: '#e8f0f8', icon: '📍', label: b, desc: '' };
    const grad  = ZONE_GRADIENTS[b] || `linear-gradient(135deg,${meta.color},${meta.color}cc)`;
    const blockDays = trip.days.filter(d => d.block === b);
    const cities = [...new Set(blockDays.map(d => d.city))];
    const isLast   = i === blocks.length - 1;
    const isActive = b === activeBlock;
    const isPast   = activeBlock && blocks.indexOf(activeBlock) > i;
    const nextMeta = !isLast ? (ZONE_META[blocks[i+1]] || meta) : null;
    const connectorGrad = nextMeta
      ? `linear-gradient(to bottom,${meta.color},${nextMeta.color})`
      : `${meta.color}`;

    const dayChips = blockDays.map(day => {
      const d = new Date(day.date + 'T12:00:00');
      const dateStr = d.getDate() + ' ' + d.toLocaleDateString('es-ES',{month:'short'});
      const cityShort = day.city.replace(/\s*→.*$/, '');
      return `<div class="rce-day-chip" onclick="event.stopPropagation();navigate('day','${day.date}')">
        <span class="rce-day-num">${dateStr}</span>
        <span class="rce-day-city">${cityShort}</span>
      </div>`;
    }).join('');

    return `
      <div class="route-row">
        <div class="route-row-left">
          <div class="route-icon-container" style="background:${grad}">
            <img class="route-icon-photo" data-wiki="${meta.wiki || ''}" data-photo="${meta.photo || ''}" alt="${meta.label}" src="">
          </div>
          ${!isLast ? `<div class="route-connector" style="background:${connectorGrad};min-height:${12 + blockDays.length * 4}px"></div>` : ''}
        </div>
        <div class="route-card${isActive?' route-card-active':''}${isPast?' route-card-past':''}"
             id="rcard-${i}"
             style="--zone-color:${meta.color};--zone-color-lt:${meta.lt}"
             onclick="toggleRouteCard(${i})">
          <div class="route-card-header">
            <div class="route-card-name">${meta.label}</div>
            <span class="day-badge" style="--zc:${meta.color};color:var(--zc)">${blockDays.length} días</span>
            <span class="route-card-arrow">›</span>
          </div>
          <div class="route-card-cities">${cities.join(' · ')}</div>
          <div class="route-card-expanded" id="rce-${i}">
            ${dayChips}
          </div>
        </div>
      </div>`;
  }).join('');

  const summarySection = `
    <div class="trip-stats-row">
      <div class="tsr-card">
        <span class="tsr-num">${totalNights}</span>
        <span class="tsr-lbl">días</span>
      </div>
      <div class="tsr-card">
        <span class="tsr-num">${totalPlaces}</span>
        <span class="tsr-lbl">lugares</span>
      </div>
      <div class="tsr-card">
        <span class="tsr-num">${blocks.filter(b => !FLIGHT_BLOCKS.includes(b)).length}</span>
        <span class="tsr-lbl">zonas</span>
      </div>
      <div class="tsr-card">
        <span class="tsr-num">${totalCountries}</span>
        <span class="tsr-lbl">países</span>
      </div>
    </div>
    <div class="route-map">
      ${routeItems}
    </div>`;

  // ── Tips de viaje (tarjeta grande rotante con gradiente) ──
  const tips = trip.travelTips || [];
  const tipGradients = [
    'linear-gradient(135deg,#1a3a5c,#2d6a8f)',
    'linear-gradient(135deg,#1b4332,#2d6a4f)',
    'linear-gradient(135deg,#1f4e79,#2f6fa3)',
    'linear-gradient(135deg,#2f3d17,#6b7f3a)',
    'linear-gradient(135deg,#0d3b4f,#1a7a8a)',
  ];
  const tipsSection = tips.length ? `
    <div class="section-title">Tips del viaje</div>
    <div class="tip-rotator" id="tip-rotator">
      <img class="tip-bg-img" id="tip-bg-img" src="" alt="">
      <div class="tip-bg-overlay" id="tip-bg-overlay" style="background:${tipGradients[0]}"></div>
      <div class="tip-rotator-card">
        <div class="tip-rotator-header">
          <span class="tip-rotator-icon" id="tip-icon">${TIP_SVG_ICONS[tips[0].title] || ''}</span>
          <span class="tip-rotator-title" id="tip-title">${tips[0].title}</span>
        </div>
        <p class="tip-rotator-text" id="tip-text">${TIP_BOLD_HTML[tips[0].title] || tips[0].tip}</p>
      </div>
      <div class="tip-rotator-footer">
        <div class="tip-rotator-dots" id="tip-dots">
          ${tips.map((_, i) => `<span class="tip-dot${i===0?' active':''}" data-i="${i}"></span>`).join('')}
        </div>
        <span class="tip-counter" id="tip-counter">1 / ${tips.length}</span>
      </div>
    </div>` : '';

  const heroLayersHtml = HERO_WIKI_PLACES.map((_, i) =>
    `<div class="hero-img-layer ${i===0?'active':'inactive'}"></div>`
  ).join('');

  return `
    <!-- Hero -->
    <div class="trip-hero" id="trip-hero">
      ${heroLayersHtml}
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="trip-hero-emoji">${trip.emoji}</span>
        <h2>${trip.name}</h2>
        <div class="hero-sub">${trip.subtitle}</div>
        <div style="margin-top:10px">${statusBadge}</div>
      </div>
    </div>

    <!-- Reloj dual + Tiempo -->
    <div style="padding:14px 16px 0">
      ${buildDualClockHTML()}
    </div>
    <div class="weather-stack-wrap">
      <div id="weather-single">${weatherPill(null, 'Cargando…', 'wp-single')}</div>
    </div>

    <!-- Ruta del viaje -->
    <div style="padding:14px 16px 0">
      <div class="section-title">Ruta del viaje</div>
      ${summarySection}
    </div>

    <!-- Tips del viaje -->
    ${tipsSection}

    <!-- Notas del viaje -->
    ${renderNotesSection(trip)}

    <!-- Conversor de divisas -->
    <div style="padding:14px 16px 0">
      ${buildCurrencyHTML(trip)}
    </div>

    <!-- Frases de supervivencia (la tarjeta ya lleva su propio margen lateral) -->
    <div id="dict-box" style="padding-top:14px">
      ${buildSurvivalDictHTML(trip)}
    </div>

    ${todaySection}

    <div style="height:80px"></div>`;
}

// ══════════════════════════════════════════════════════════
//  NOTAS DEL VIAJE
// ══════════════════════════════════════════════════════════

function ensureTripNotes(trip) {
  if (!trip.tripNotes) trip.tripNotes = { freeNotes: [], packingList: [], preTripTasks: [] };
}

// Categorías de «Qué llevar». Los artículos de data.js no traen `cat`: se deduce del
// emoji con el que empieza el texto. Los que añade el usuario guardan su `cat`.
const PACK_CATS = ['🛂 Documentos y dinero', '👕 Ropa y calzado', '💊 Salud e higiene', '🔌 Electrónica', '🎒 Otros'];

function packCategory(item) {
  if (item.cat && item.cat !== '📦 Sin categoría') return item.cat;
  const t = item.text || '';
  if (/^(🛂|📄|💳|💵)/u.test(t) || /fotos? de carn[eé]/i.test(t)) return PACK_CATS[0];
  if (/^(👕|🧣|🥿|🩴|🩱|🌂|🧦|🧢|👓)/u.test(t)) return PACK_CATS[1];
  if (/^(☀|🦟|💊|🩺|🧴|🚿)/u.test(t)) return PACK_CATS[2];
  if (/^(🔌|🔋|📷|📱|🎧|🔦)/u.test(t)) return PACK_CATS[3];
  return PACK_CATS[4];
}

function renderNotesSection(trip) {
  ensureTripNotes(trip);
  const n = trip.tripNotes;
  const packDone   = n.packingList.filter(i => i.done).length;
  const tasksDone  = n.preTripTasks.filter(i => i.done).length;

  return `
    <div class="section-title">Notas</div>

    <!-- Tabs de notas -->
    <div class="notes-tabs" id="notes-tabs">
      <button class="notes-tab active" onclick="showNotesTab('free')">📝 Notas</button>
      <button class="notes-tab" onclick="showNotesTab('packing')">🎒 Qué llevar</button>
      <button class="notes-tab" onclick="showNotesTab('pretask')">✅ Previas</button>
    </div>

    <!-- Panel: Nuevas notas -->
    <div class="notes-panel" id="panel-free">
      <div class="card notes-card">
        ${n.freeNotes.length === 0
          ? `<div class="notes-empty">Toca + para añadir una nota</div>`
          : n.freeNotes.map(note => `
              <div class="note-item" id="note-${note.id}">
                <div class="note-text">${escHtml(note.text)}</div>
                <button class="note-del" onclick="deleteNote('${note.id}')" aria-label="Borrar">✕</button>
              </div>`).join('')}
        <div class="notes-add-row">
          <input class="notes-input" id="input-free" type="text" placeholder="Escribe una nota…" onkeydown="if(event.key==='Enter')addNote()">
          <button class="notes-add-btn" onclick="addNote()" aria-label="Añadir nota">+</button>
        </div>
      </div>
    </div>

    <!-- Panel: Cosas que llevar -->
    <div class="notes-panel hidden" id="panel-packing">
      <div class="card notes-card">
        <div class="notes-progress-row">
          <div class="notes-progress-bar"><div class="notes-progress-fill" style="width:${n.packingList.length ? Math.round(packDone/n.packingList.length*100) : 0}%"></div></div>
          <span class="notes-progress-label">${packDone}/${n.packingList.length}</span>
        </div>
        ${(() => {
          // Siempre las categorías fijas (aunque estén vacías, para poder añadir en ellas)
          const groups = Object.fromEntries(PACK_CATS.map(c => [c, []]));
          n.packingList.forEach((item, i) => {
            const cat = packCategory(item);
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push({ item, i });
          });
          return Object.entries(groups).map(([cat, entries]) => {
            const catDone = entries.filter(e => e.item.done).length;
            const catId = cat.replace(/[^a-zA-Z0-9]/g,'_');
            return `
              <div class="pack-cat-header">
                <span class="pack-cat-label">${cat}</span>
                <span class="pack-cat-count">${catDone}/${entries.length}</span>
              </div>
              ${entries.map(({ item, i }) => `
                <div class="task-item ${item.done ? 'done' : ''}" onclick="toggleNoteItem('packing',${i})">
                  <div class="task-check">${item.done ? '✓' : ''}</div>
                  <div class="task-text">${escHtml(item.text)}</div>
                  <button class="note-del" onclick="event.stopPropagation();deleteNoteItem('packing',${i})" aria-label="Borrar">✕</button>
                </div>`).join('')}
              <div class="pack-cat-add-row">
                <input class="pack-cat-input" id="pci-${catId}" type="text" placeholder="Añadir en ${cat.replace(/^[^\s]+\s/,'').trim()}…"
                       onkeydown="if(event.key==='Enter')addPackingItemToCat('${escHtml(cat)}','pci-${catId}')">
                <button class="pack-cat-add-btn" onclick="addPackingItemToCat('${escHtml(cat)}','pci-${catId}')" aria-label="Añadir en ${escHtml(cat.replace(/^[^\s]+\s/,'').trim())}">+</button>
              </div>`;
          }).join('');
        })()}
      </div>
    </div>

    <!-- Panel: Tareas previas -->
    <div class="notes-panel hidden" id="panel-pretask">
      <div class="card notes-card">
        <div class="notes-progress-row">
          <div class="notes-progress-bar"><div class="notes-progress-fill" style="width:${n.preTripTasks.length ? Math.round(tasksDone/n.preTripTasks.length*100) : 0}%"></div></div>
          <span class="notes-progress-label">${tasksDone}/${n.preTripTasks.length}</span>
        </div>
        ${n.preTripTasks.map((item, i) => `
          <div class="task-item ${item.done ? 'done' : ''}" onclick="toggleNoteItem('pretask',${i})">
            <div class="task-check">${item.done ? '✓' : ''}</div>
            <div class="task-text">${escHtml(item.text)}</div>
            <button class="note-del" onclick="event.stopPropagation();deleteNoteItem('pretask',${i})" aria-label="Borrar">✕</button>
          </div>`).join('')}
        <div class="notes-add-row">
          <input class="notes-input" id="input-pretask" type="text" placeholder="Añadir tarea previa…" onkeydown="if(event.key==='Enter')addNoteItem('pretask')">
          <button class="notes-add-btn" onclick="addNoteItem('pretask')" aria-label="Añadir tarea previa">+</button>
        </div>
      </div>
    </div>`;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showNotesTab(tab) {
  document.querySelectorAll('.notes-tab').forEach((b, i) => {
    const tabs = ['free','packing','pretask'];
    b.classList.toggle('active', tabs[i] === tab);
  });
  ['free','packing','pretask'].forEach(t => {
    const panel = document.getElementById('panel-' + t);
    if (panel) panel.classList.toggle('hidden', t !== tab);
  });
}

function addNote() {
  const input = document.getElementById('input-free');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  trip.tripNotes.freeNotes.unshift({ id: 'fn' + Date.now(), text, ts: Date.now() });
  save();
  refreshNotesPanel(trip, 'free');
}

function deleteNote(noteId) {
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  trip.tripNotes.freeNotes = trip.tripNotes.freeNotes.filter(n => n.id !== noteId);
  save();
  refreshNotesPanel(trip, 'free');
}

function addNoteItem(type) {
  const inputId = 'input-' + type;
  const input = document.getElementById(inputId);
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  const list = type === 'packing' ? trip.tripNotes.packingList : trip.tripNotes.preTripTasks;
  list.push({ id: type + Date.now(), text, done: false });
  save();
  refreshNotesPanel(trip, type);
}

function addPackingItemToCat(cat, inputId) {
  const input = document.getElementById(inputId);
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  // Insert after last item of same cat, or at end
  const list = trip.tripNotes.packingList;
  let insertIdx = list.length;
  for (let i = list.length - 1; i >= 0; i--) {
    if (packCategory(list[i]) === cat) { insertIdx = i + 1; break; }
  }
  list.splice(insertIdx, 0, { id: 'pl' + Date.now(), cat, text, done: false });
  save();
  refreshNotesPanel(trip, 'packing');
}

function toggleNoteItem(type, idx) {
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  const list = type === 'packing' ? trip.tripNotes.packingList : trip.tripNotes.preTripTasks;
  if (list[idx]) { list[idx].done = !list[idx].done; save(); refreshNotesPanel(trip, type); }
}

function deleteNoteItem(type, idx) {
  const trip = getTrip(currentTripId);
  ensureTripNotes(trip);
  const key = type === 'packing' ? 'packingList' : 'preTripTasks';
  trip.tripNotes[key].splice(idx, 1);
  save();
  refreshNotesPanel(trip, type);
}

function refreshNotesPanel(trip, activeTab) {
  // Re-render only the notes section to avoid losing scroll position
  const section = document.getElementById('panel-free');
  if (!section) { renderTripDashboard(); return; }
  const container = section.parentElement;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = renderNotesSection(trip);
  // Replace panels and tabs in place
  ['notes-tabs','panel-free','panel-packing','panel-pretask'].forEach(id => {
    const old = document.getElementById(id);
    const neo = tempDiv.querySelector('#' + id);
    if (old && neo) old.replaceWith(neo);
  });
  showNotesTab(activeTab || 'free');
}

// ══════════════════════════════════════════════════════════
//  VIEW: ITINERARIO
// ══════════════════════════════════════════════════════════

function renderItinerary(tab) {
  const trip = getTrip(currentTripId);
  setHeader('Días del viaje', false);
  const t = today();
  const activeTab = tab || 'days';

  const BLOCK_ZONE = {
    'El Norte':  { color: '#1A7B6B', lt: '#d0f0e8', label: 'Vietnam Norte' },
    'Vuelta al Norte': { color: '#1A7B6B', lt: '#d0f0e8', label: 'Cat Ba · vuelta al Norte' },
    'Delta del Mekong': { color: '#2e8b57', lt: '#d6f0e0', label: 'Delta del Mekong' },
    'Vuelos':    { color: '#5c6b7a', lt: '#e4e8ec', label: 'Vuelos' },
    'Vuelta a casa': { color: '#5c6b7a', lt: '#e4e8ec', label: 'Vuelta a casa' },
    'Ninh Binh': { color: '#4a7c3f', lt: '#e0f0d8', label: 'Ninh Binh' },
    'El Centro': { color: '#2f6fa3', lt: '#dbe8f4', label: 'Vietnam Centro' },
    'Angkor':    { color: '#b8861b', lt: '#f6ebcf', label: 'Angkor & Siem Reap' },
    'Phnom Penh': { color: '#8B5E3C', lt: '#f5e6d8', label: 'Phnom Penh' },
    'El Cierre': { color: '#6b7f3a', lt: '#e8edd6', label: 'El Cierre' },
    'General':   { color: '#1a3a5c', lt: '#e8f0f8', label: 'General' },
  };
  applyZoneColors(BLOCK_ZONE);

  // ── Pestaña DÍAS ──────────────────────────────────────────
  let daysHtml = '';
  const blocks = {};
  trip.days.forEach(d => {
    const b = d.block || 'General';
    if (!blocks[b]) blocks[b] = [];
    blocks[b].push(d);
  });
  Object.entries(blocks).forEach(([blockName, days]) => {
    const zone = BLOCK_ZONE[blockName] || BLOCK_ZONE['General'];
    daysHtml += `
      <div class="block-section" style="border-left:3px solid ${zone.color}66">
        <div class="block-section-header" style="--zc:${zone.color};color:var(--zc)">
          <span class="bsh-label">${zone.label}</span>
          <span class="bsh-count">${days.length} días</span>
        </div>
        <div class="block-days-list">
        ${days.map(day => {
          const d = new Date(day.date + 'T12:00:00');
          const dayNum = d.getDate().toString().padStart(2,'0');
          const mon = d.toLocaleDateString('es-ES', {month:'short'}).toUpperCase();
          const isToday = day.date === t;
          const isPast = day.date < t;
          const places = day.places.map(p => p.name).slice(0,3).join(' · ');
          const transportStr = day.transport.map(tr => tr.icon || transportIcon(tr.type)).join('');
          return `
            <div class="day-row2${isToday?' day-today':''}"
                 onclick="navigate('day','${day.date}')"
                 style="${isToday ? `background:color-mix(in srgb, ${zone.color} 10%, transparent);` : ''}">
              <div class="day-date-box2" style="${isToday ? `--zc:${zone.color};color:var(--zc)` : ''}">
                <div class="day-num2">${dayNum}</div>
                <div class="day-mon2">${mon}</div>
              </div>
              <div class="day-body2">
                <div class="day-city2">${transportStr ? `<span>${transportStr}</span> ` : ''}${day.city}${isToday ? ' <span class="today-dot">●</span>' : ''}</div>
                ${places ? `<div class="day-places2">${places}</div>` : ''}
              </div>
              <div class="day-arrow2" style="--zc:${zone.color};color:var(--zc)">›</div>
            </div>`;
        }).join('')}
        </div>
      </div>`;
  });

  // ── Pestaña TRANSPORTES (lista de días) ──────────────────
  const TRANSPORT_TYPE_INFO = {
    'flight':      { label: 'Vuelos',         icon: '✈️',  color: '#1a3a5c' },
    'train':       { label: 'Tren',            icon: '🚆',  color: '#2f6fa3' },
    'sleeper-bus': { label: 'Bus nocturno',    icon: '🚌',  color: '#55672d' },
    'bus':         { label: 'Autobús',         icon: '🚐',  color: '#2d6a4f' },
    'bus+ferry':   { label: 'Bus + Ferry',     icon: '🚐',  color: '#0077a8' },
    'ferry':       { label: 'Ferry',           icon: '🚢',  color: '#0077a8' },
    'boat':        { label: 'Barco / Crucero', icon: '🚢',  color: '#0077a8' },
    'bike':        { label: 'Bicicleta',       icon: '🚲',  color: '#2d6a4f' },
  };

  let transportsHtml = '';
  Object.entries(blocks).forEach(([blockName, bDays]) => {
    const zone = BLOCK_ZONE[blockName] || BLOCK_ZONE['General'];
    transportsHtml += `
      <div class="block-section" style="border-left:3px solid ${zone.color}66">
        <div class="block-section-header" style="--zc:${zone.color};color:var(--zc)">
          <span class="bsh-label">${zone.label}</span>
          <span class="bsh-count">${bDays.length} días</span>
        </div>
        <div class="block-days-list">
        ${bDays.map(day => {
          const d = new Date(day.date + 'T12:00:00');
          const dayNum = d.getDate().toString().padStart(2,'0');
          const mon = d.toLocaleDateString('es-ES', {month:'short'}).toUpperCase();
          const isToday = day.date === t;
          const hasTr = day.transport.length > 0;
          const trHtml = day.transport.map(tr => {
            const info = TRANSPORT_TYPE_INFO[tr.type] || { icon: '🚗', color: zone.color };
            const route = tr.from && tr.to ? `${tr.from} → ${tr.to}` : (tr.from || tr.to || '');
            return `<div class="tr-inline" style="border-left:3px solid ${info.color}">
              <span class="tr-inline-icon">${info.icon}</span>
              <div class="tr-inline-body">
                ${tr.details ? `<div class="tr-inline-det">${tr.details}</div>` : ''}
                ${route ? `<div class="tr-inline-route">${route}</div>` : ''}
                ${bookingRefHtml(day.date, tr)}
              </div>
            </div>`;
          }).join('');
          const rowId = 'trrow-' + day.date;
          const panelId = 'trpanel-' + day.date;
          return `
            <div class="day-row2${isToday?' day-today':''}${!hasTr?' day-row-no-tr':''}"
                 id="${rowId}"
                 onclick="${hasTr ? `toggleTransportPanel('${day.date}')` : ''}"
                 style="${isToday ? `background:color-mix(in srgb, ${zone.color} 10%, transparent);` : ''}${hasTr ? 'cursor:pointer' : 'cursor:default'}">
              <div class="day-date-box2" style="${hasTr ? `--zc:${zone.color};color:var(--zc)` : 'color:var(--text-xs)'}">
                <div class="day-num2">${dayNum}</div>
                <div class="day-mon2">${mon}</div>
              </div>
              <div class="day-body2">
                <div class="day-city2" style="${!hasTr?'color:var(--text-xs)':''}">
                  ${day.city}${isToday ? ' <span class="today-dot">●</span>' : ''}
                </div>
                ${hasTr ? `<div class="tr-inline-list">${trHtml}</div>` : ''}
              </div>
              <div class="day-arrow2 tr-expand-arrow" id="arrow-${day.date}"
                   style="${hasTr ? `--zc:${zone.color};color:var(--zc)` : 'color:var(--text-xs);opacity:.5'}">›</div>
            </div>
            <div class="tr-detail-panel" id="${panelId}" style="display:none">
              ${day.transport.map(tr => {
                const info = TRANSPORT_TYPE_INFO[tr.type] || { icon: '🚗', label: tr.type, color: zone.color };
                const tips = TRANSPORT_TIPS[tr.type] || [];
                return `<div class="tr-detail-card" style="border-left:3px solid ${info.color}">
                  <div class="tr-detail-head">
                    <span class="tr-detail-icon">${info.icon}</span>
                    <span class="tr-detail-label" style="color:${info.color}">${info.label || tr.type}</span>
                    ${tr.time ? `<span class="tr-detail-time">${tr.time}</span>` : ''}
                  </div>
                  ${tr.from || tr.to ? `<div class="tr-detail-route">
                    <span class="tr-detail-from">${tr.from || ''}</span>
                    <span class="tr-detail-arrow">→</span>
                    <span class="tr-detail-to">${tr.to || ''}</span>
                  </div>` : ''}
                  ${tr.pickup ? `<div class="tr-detail-pickup"><span class="tr-detail-pickup-icon">📍</span>${tr.pickup}</div>` : ''}
                  ${tips.length ? `<div class="tr-detail-tips">
                    <div class="tr-detail-tips-title">💡 Consejos</div>
                    ${tips.map(tip => `<div class="tr-detail-tip">· ${tip}</div>`).join('')}
                  </div>` : ''}
                </div>`;
              }).join('')}
            </div>`;
        }).join('')}
        </div>
      </div>`;
  });

  // ── Pestaña ALOJAMIENTO (línea temporal por zonas) ────────
  // Agrupar días consecutivos con el mismo hotel
  const _htlGroups = [];
  let _hgCur = null, _hgKey = null;
  trip.days.forEach(day => {
    const h = day.hotel || {};
    const key = (h.name || '') + '|' + (h.address || '');
    if (key !== _hgKey) {
      _hgCur = { name: h.name||'', address: h.address||'',
                 checkIn: h.checkIn||'', checkOut: h.checkOut||'',
                 block: day.block, dates: [day.date] };
      _htlGroups.push(_hgCur);
      _hgKey = key;
    } else {
      _hgCur.dates.push(day.date);
      if (h.checkOut) _hgCur.checkOut = h.checkOut;
    }
  });
  // Agrupar hoteles por zona
  const _htlByZone = {};
  _htlGroups.forEach(g => {
    const b = g.block || 'General';
    if (!_htlByZone[b]) _htlByZone[b] = [];
    _htlByZone[b].push(g);
  });

  const HTL_ZONE_COLORS = Object.fromEntries(Object.keys(BLOCK_ZONE_COLORS).map(k => [k, zoneColor(k)]));
  const _svH = p => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const _HSVG = {
    bed:  _svH('<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 18h20"/>'),
    boat: _svH('<path d="M2 21h20"/><path d="M4 9V5l8-2 8 2v4H4z"/><path d="M2 15c2 0 4 1 6 1s4-1 6-1 4 1 6 1"/>'),
    bus:  _svH('<rect x="1" y="3" width="22" height="16" rx="2"/><path d="M1 12h22"/><circle cx="7" cy="15.5" r="1.5"/><circle cx="17" cy="15.5" r="1.5"/>'),
    home: _svH('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  };
  function _htlSvg(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('crucero') || n.includes('camarote')) return _HSVG.boat;
    if (n.includes('bus nocturno') || n.includes('en ruta')) return _HSVG.bus;
    if (n.includes('homestay') || n.includes('bungalow')) return _HSVG.home;
    return _HSVG.bed;
  }
  const _months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  const HTL_ROW_H = 84; // px por día (suficiente para 1 noche ~74px de tarjeta)

  let hotelsHtml = '';
  Object.keys(blocks).forEach(function(blockName) {
    const zone     = BLOCK_ZONE[blockName] || BLOCK_ZONE['General'];
    const zcolor   = HTL_ZONE_COLORS[blockName] || zone.color;
    const zoneGroups = _htlByZone[blockName] || [];
    if (!zoneGroups.length) return;
    const zoneNights = zoneGroups.reduce((s, g) => s + g.dates.length, 0);

    const zoneDays  = trip.days.filter(d => (d.block || '') === blockName);
    const totalRows = zoneDays.length;
    const totalH    = totalRows * HTL_ROW_H;

    // Mapa fecha → índice 0-based
    const dateToIdx = {};
    zoneDays.forEach((day, i) => { dateToIdx[day.date] = i; });

    // — Columna izquierda: celdas de día —
    const dayCellsHtml = zoneDays.map((day, i) => {
      const d  = new Date(day.date + 'T12:00:00');
      const dn = String(d.getDate()).padStart(2, '0');
      const dm = _months[d.getMonth()].toUpperCase();
      const isToday2 = day.date === t;
      return '<div class="htl2-day-cell' + (isToday2 ? ' htl2-today' : '') + '">'
        + '<div class="htl2-dn"'
        + (isToday2 ? ' style="color:' + zcolor + '"' : '') + '>' + dn + '</div>'
        + '<div class="htl2-dm">' + dm + '</div>'
        + '</div>';
    }).join('');

    // — Columna derecha: tarjetas absolutas con horas —
    let colH = totalH;
    const cardsHtml = zoneGroups.map(g => {
      const nights    = g.dates.length;
      const nightLbl  = nights === 1 ? '1 noche' : nights + ' noches';
      const isTransit = !g.name
        || g.name.toLowerCase().includes('en ruta')
        || (g.name.toLowerCase().includes('bus') && g.name.toLowerCase().includes('noct'));
      const dotColor  = isTransit ? zcolor + '80' : zcolor;

      // Posicionamiento siempre 15:00 → 12:00 para garantizar que nunca se solapan
      // (los tiempos reales se muestran en el texto meta)
      const ciH = isTransit ? 12 : 15;
      const coH = isTransit ? 15 : 12;

      const startIdx = dateToIdx[g.dates[0]] !== undefined ? dateToIdx[g.dates[0]] : 0;
      const endIdx   = startIdx + nights - 1; // índice del último día de estancia

      const topPx    = startIdx * HTL_ROW_H + (ciH / 24) * HTL_ROW_H;
      // Sin recortar al final de la zona: si la salida cae en el día siguiente (que ya es
      // de otra zona), antes la tarjeta quedaba en 40 px y el texto se salía.
      const bottomPx = (endIdx + 1) * HTL_ROW_H + (coH / 24) * HTL_ROW_H;
      const heightPx = Math.max(bottomPx - topPx, 64);
      colH = Math.max(colH, topPx + heightPx);

      // Horarios reales del alojamiento (data.js o HOTEL_INFO); antes se inventaban 15:00/12:00
      const hi = isTransit ? {} : hotelInfo(g);
      const metaParts = [];
      if (hi.checkIn)  metaParts.push('Entrada ' + hi.checkIn);
      if (hi.checkOut) metaParts.push('Salida ' + hi.checkOut);

      return '<div class="htl2-card' + (isTransit ? ' htl2-card-transit' : '') + '"'
        + ' style="top:' + topPx.toFixed(1) + 'px;height:' + heightPx.toFixed(1) + 'px;'
        + 'border-color:' + (isTransit ? dotColor : zcolor + '55') + '"'
        + (isTransit ? '' : ' role="button" tabindex="0" data-hotel="' + escHtml(g.name) + '" data-date="' + g.dates[0] + '"'
                         + ' onclick="openHotelDetail(this.dataset.hotel, this.dataset.date)"'
                         + ' onkeydown="if(event.key===\'Enter\')openHotelDetail(this.dataset.hotel, this.dataset.date)"') + '>'
        + '<div class="htl2-card-top">'
        +   '<span class="htl2-card-icon" style="' + (isTransit ? 'color:var(--text-sm)' : '--zc:' + zcolor + ';color:var(--zc)') + '">' + _htlSvg(g.name) + '</span>'
        +   '<div class="htl2-card-info">'
        +     '<div class="htl2-card-name" style="' + (isTransit ? 'color:var(--text-sm)' : '--zc:' + zcolor + ';color:var(--zc)') + '">' + (g.name || 'En tránsito') + '</div>'
        +     (hi.address ? '<div class="htl2-card-addr">' + escHtml(hi.address) + '</div>' : '')
        +   '</div>'
        +   '<div class="htl2-card-nights" style="--zc:' + zcolor + ';color:var(--zc)">' + nightLbl + '</div>'
        + '</div>'
        + (metaParts.length
            ? '<div class="htl2-card-meta">' + metaParts.join('&nbsp;·&nbsp;') + '</div>'
            : '')
        + '</div>';
    }).join('');

    hotelsHtml +=
      '<div class="htl2-zone">'
      + '<div class="block-section-header" style="--zc:' + zone.color + ';color:var(--zc)">'
      +   '<span class="bsh-label">' + zone.label + '</span>'
      +   '<span class="bsh-count">' + zoneNights + ' noches</span>'
      + '</div>'
      + '<div class="htl2-wrapper" style="--rh:' + HTL_ROW_H + 'px">'
      +   '<div class="htl2-dates-col">' + dayCellsHtml + '</div>'
      +   '<div class="htl2-cards-col" style="height:' + Math.ceil(colH) + 'px">' + cardsHtml + '</div>'
      + '</div>'
      + '</div>';
  });

  const tabsHtml = `
    <div class="itin-tabs">
      <button class="itin-tab${activeTab==='days'?' active':''}" onclick="renderItinerary('days')">📅 Días</button>
      <button class="itin-tab${activeTab==='transports'?' active':''}" onclick="renderItinerary('transports')">🚆 Transportes</button>
      <button class="itin-tab${activeTab==='hotels'?' active':''}" onclick="renderItinerary('hotels')">🏨 Alojamiento</button>
    </div>`;

  let bodyHtml;
  if (activeTab === 'transports') {
    bodyHtml = `<div class="itinerary-wrap">${transportsHtml}</div>`;
  } else if (activeTab === 'hotels') {
    bodyHtml = `<div class="itinerary-wrap">${hotelsHtml}</div>`;
  } else {
    bodyHtml = `<div class="itinerary-wrap">${daysHtml}</div>`;
  }
  el('view-content').innerHTML = tabsHtml + bodyHtml + '<div style="height:80px"></div>';
}

// ══════════════════════════════════════════════════════════
//  VIEW: FICHA DEL DÍA — 4 tabs
// ══════════════════════════════════════════════════════════

let _dayMapInstance = null;

function renderDay(date) {
  const trip = getTrip(currentTripId);
  const day = trip.days.find(d => d.date === date);
  if (!day) { navigate('itinerary'); return; }

  // Destruir mapa del día anterior si existe
  if (_dayMapInstance) { _dayMapInstance.remove(); _dayMapInstance = null; }

  const dayNum   = getDayNumber(trip, date);
  const isToday  = date === today();
  const pending  = day.tasks.filter(t => !t.done).length;
  const total    = day.tasks.length;
  const hasHotel = day.hotel && day.hotel.name;

  setHeader(`Día ${dayNum} · ${day.city}`, true);

  // ── Cabecera del día con foto de ciudad ──
  const CITY_PHOTOS = {
    'Hanói':           'img/places/hanoi.jpg',
    'Cat Ba':          'img/places/cát_bà_national_park.jpg',
    'Lan Ha Bay':      'img/places/lan_ha_bay.jpg',
    'Ninh Binh':       'img/places/tam_coc.jpg',
    'Hue':             'img/places/huế.jpg',
    'Da Nang':         'img/places/dragon_bridge_đà_nẵng.jpg',
    'Hoi An':          'img/places/old_town_hoi_an.jpg',
    'Siem Reap':       'img/places/angkor_wat.jpg',
    'Phnom Penh':      'img/places/phnom_penh.jpg',
    'Chau Doc':        'img/fotos/cho-chau-doc.jpg',
    'Can Tho':         'img/fotos/cho-noi-cai-rang.jpg',
    'Tam Coc':         'img/places/tam_coc.jpg',
    'Aeropuerto de Barcelona-El Prat': 'img/fotos/aeropuerto-barcelona-el-prat.jpg',
    'Barcelona':       'img/fotos/aeropuerto-barcelona-el-prat.jpg', // día 30: Barcelona → Santiago
    'Aeropuerto de Shenzhen (escala)': 'img/fotos/aeropuerto-shenzhen.jpg',
  };
  // Días de traslado ("Hanói → Siem Reap", "Tam Coc / Ninh Binh"): foto del destino, o del primer tramo si no hay
  const cityKey = c => {
    if (CITY_PHOTOS[c]) return c;
    const clean = s => s.replace(/\(.*?\)/g, '').trim();
    const dest = clean(c.split('→').pop());
    if (CITY_PHOTOS[dest]) return dest;
    const first = clean(c.split(/→|\//)[0]);
    return CITY_PHOTOS[first] ? first : c;
  };
  const BLOCK_COLORS = Object.fromEntries(Object.keys(BLOCK_ZONE_COLORS).map(k => [k, zoneColor(k)]));
  const cityPhoto = CITY_PHOTOS[cityKey(day.city)] || '';
  const blockColor = BLOCK_COLORS[day.block] || 'var(--primary)';
  const headerHtml = `
    <div class="day-hero" style="${cityPhoto
      ? `background-image:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.6) 100%),url('${cityPhoto}');background-size:cover;background-position:center`
      : `background:${blockColor}`}">
      <div class="day-hero-content">
        <div class="dh-meta">${formatDate(date).toUpperCase()} · DÍA ${dayNum}/${tripDuration(trip)}</div>
        <div class="dh-city">${day.city}</div>
        <div class="dh-bottom">
          <span class="dh-country">${flagText(day.country)}</span>
          ${isToday ? '<span class="today-pill">HOY</span>' : ''}
        </div>
      </div>
    </div>`;

  // ── Tabs ──
  const tabsHtml = `
    <div class="day-tabs" id="day-tabs">
      <button class="day-tab active" onclick="showDayTab('resumen')">Resumen</button>
      <button class="day-tab" onclick="showDayTab('lugares')">Lugares</button>
      ${day.restaurants.length ? `<button class="day-tab" onclick="showDayTab('comer')">Qué comer</button>` : ''}
      <button class="day-tab" onclick="showDayTab('mapa')">Mapa</button>
      <button class="day-tab" onclick="showDayTab('notas')">Notas</button>
    </div>`;

  // ── TAB: Resumen ──
  // Fotos en fila (círculos) de lugares + restaurantes
  const allItems = [...day.places, ...day.restaurants];
  const withPhotos = allItems.filter(p => p.photo);
  const photoCirclesHtml = withPhotos.length ? `
    <div class="photo-circles-row">
      ${withPhotos.map(p => `
        <div class="photo-circle-wrap">
          <div class="photo-circle" style="background-image:url('${p.photo}')"></div>
          <div class="photo-circle-label">${p.name.split(' ')[0]}</div>
        </div>`).join('')}
    </div>` : '';

  // Progreso de tareas
  const pct = total ? Math.round((total - pending) / total * 100) : 0;
  const taskProgressHtml = total ? `
    <div class="dsc-task-progress">
      <div class="dsc-task-bar"><div class="dsc-task-fill" style="width:${pct}%"></div></div>
      <span class="dsc-task-label">${total - pending}/${total} tareas</span>
    </div>` : '';

  // Transporte en resumen
  const transportHtml = day.transport.length ? `
    <div class="dsc-card dsc-transport-card">
      <div class="dsc-header"><span class="dsc-header-icon">🚌</span><span class="dsc-title">Transporte</span></div>
      ${day.transport.map(tr => `
        <div class="transport-item" style="margin-bottom:0">
          <div class="transport-icon">${tr.icon || transportIcon(tr.type)}</div>
          <div class="transport-body">
            <div class="transport-detail">${tr.details}</div>
            ${tr.from || tr.to ? `<div class="transport-route">${tr.from} → ${tr.to}</div>` : ''}
            ${bookingRefHtml(day.date, tr)}
          </div>
        </div>`).join('')}
    </div>` : '';

  // Hotel en resumen (datos completos vía hotelInfo: data.js + HOTEL_INFO de guia.js)
  const hInfo  = hasHotel ? hotelInfo(day.hotel) : null;
  const hLinks = hasHotel ? hotelLinks(hInfo) : null;
  const hotelHtml = hasHotel ? `
    <div class="dsc-card hotel-expand-card" role="button" tabindex="0" aria-expanded="false"
         onclick="toggleHotelExpand(this)" onkeydown="if(event.key==='Enter')toggleHotelExpand(this)" style="cursor:pointer">
      <div class="dsc-header">
        <span class="dsc-header-icon">🏨</span>
        <span class="dsc-title">${escHtml(day.hotel.name)}</span>
        <span class="hotel-chevron" style="margin-left:auto;font-size:18px;color:var(--text-sm);transition:transform .25s">›</span>
      </div>
      ${hInfo.address ? `<div class="dsc-meta">📍 ${escHtml(hInfo.address)}</div>` : ''}
      <div class="hotel-expand-body" style="display:none;margin-top:12px">
        <div class="hotel-times">
          ${hInfo.checkIn  ? `<div class="hotel-time-box"><div class="hotel-label">Entrada</div><div class="hotel-value">${escHtml(hInfo.checkIn)}</div></div>`  : ''}
          ${hInfo.checkOut ? `<div class="hotel-time-box"><div class="hotel-label">Salida</div><div class="hotel-value">${escHtml(hInfo.checkOut)}</div></div>` : ''}
          ${day.hotel.breakfast ? `<div class="hotel-time-box"><div class="hotel-label">Desayuno</div><div class="hotel-value hotel-bf-yes">✓ Incluido</div></div>` : `<div class="hotel-time-box"><div class="hotel-label">Desayuno</div><div class="hotel-value" style="color:var(--text-sm)">No incluido</div></div>`}
        </div>
        ${hInfo.phone ? `<a class="dsc-meta hotel-phone" style="margin-top:8px;display:block" href="${hLinks.tel}" onclick="event.stopPropagation()">📞 ${escHtml(hInfo.phone)}</a>` : ''}
        <div class="hotel-btns" onclick="event.stopPropagation()">
          <a class="dsc-maps-btn" href="${hLinks.dir}" target="_blank" rel="noopener">🧭 Cómo llegar</a>
          <button class="dsc-maps-btn" data-hotel="${escHtml(day.hotel.name)}" onclick="openHotelDetail(this.dataset.hotel,'${day.date}')">ℹ️ Ficha del alojamiento</button>
        </div>
      </div>
    </div>` : '';

  // Flat-design icons de temática vietnamita/camboyana — estilo ilustrado relleno
  const CIRCLE_ICONS = {
    monument: { bg:'#C8312A', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <rect x="14" y="27" width="8" height="7" rx="1.5" fill="white"/>
      <path d="M8 27 L18 20 L28 27Z" fill="white"/>
      <rect x="15" y="17" width="6" height="5" rx="1" fill="white"/>
      <path d="M10 17 L18 10 L26 17Z" fill="white"/>
      <rect x="17" y="7" width="2" height="4" rx="1" fill="rgba(255,220,80,1)"/>
      <circle cx="18" cy="6" r="2.5" fill="rgba(255,220,80,1)"/>
    </svg>` },
    beach: { bg:'#18A4C4', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M6 22 Q18 14 30 22" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M4 28 Q18 20 32 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M18 7 Q16 12 14 14 L22 14 Q20 12 18 7Z" fill="rgba(255,220,80,1)"/>
      <circle cx="18" cy="7" r="4" fill="rgba(255,200,50,1)"/>
    </svg>` },
    nature: { bg:'#3592C4', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M5 30 L13 12 L18 21 L21 15 L31 30Z" fill="white"/>
      <ellipse cx="26" cy="12" rx="5" ry="4" fill="rgba(255,255,255,.7)"/>
      <ellipse cx="30" cy="10" rx="4" ry="3" fill="rgba(255,255,255,.55)"/>
    </svg>` },
    restaurant: { bg:'#1e2d6b', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M8 18 Q8 30 18 30 Q28 30 28 18Z" fill="white"/>
      <rect x="7" y="14" width="22" height="5" rx="2.5" fill="white"/>
      <path d="M13 11 Q16 7 19 11 Q22 15 25 11" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>` },
    cafe: { bg:'#8a6a4a', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <rect x="14" y="13" width="9" height="8" rx="1.5" fill="white"/>
      <rect x="13" y="10" width="11" height="4" rx="2" fill="white"/>
      <path d="M15 21 Q15 30 18.5 30 Q22 30 22 21Z" fill="white"/>
      <rect x="14" y="28.5" width="9" height="3" rx="1.5" fill="white"/>
      <ellipse cx="18.5" cy="24" rx="2" ry="1" fill="rgba(180,100,60,.6)"/>
    </svg>` },
    market: { bg:'#E8992A', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M9 17 L18 7 L27 17Z" fill="white"/>
      <ellipse cx="18" cy="18" rx="10" ry="2.5" fill="rgba(255,255,255,.75)"/>
      <rect x="17" y="18" width="2" height="10" rx="1" fill="white"/>
      <circle cx="15" cy="29" r="2" fill="white"/>
      <circle cx="21" cy="29" r="2" fill="white"/>
    </svg>` },
    temple: { bg:'#b8861b', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <rect x="5" y="20" width="26" height="10" rx="1" fill="white"/>
      <rect x="8" y="16" width="20" height="5" rx="1" fill="white"/>
      <path d="M6 16 L18 8 L30 16Z" fill="rgba(255,255,255,.9)"/>
      <rect x="14" y="24" width="4" height="6" rx="1" fill="rgba(139,61,175,.6)"/>
      <rect x="18" y="24" width="4" height="6" rx="1" fill="rgba(139,61,175,.6)"/>
    </svg>` },
    default: { bg:'#5c6b7a', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M18 5 Q13 11 13 16 Q13 22 18 23 Q23 22 23 16 Q23 11 18 5Z" fill="white"/>
      <path d="M6 17 Q11 12 15 15 Q18 23 15 26 Q9 23 6 17Z" fill="rgba(255,255,255,.75)"/>
      <path d="M30 17 Q25 12 21 15 Q18 23 21 26 Q27 23 30 17Z" fill="rgba(255,255,255,.75)"/>
      <path d="M10 27 Q13 21 18 23 Q23 21 26 27 Q23 32 18 31 Q13 32 10 27Z" fill="rgba(255,255,255,.75)"/>
      <circle cx="18" cy="18" r="3" fill="rgba(255,220,100,1)"/>
    </svg>` },
  };
  function makeCircle(item, targetTab) {
    const shortName = item.name.replace(/\s*\(.*\)/, '').split(' ').slice(0,2).join(' ');
    const icon = CIRCLE_ICONS[item.type] || CIRCLE_ICONS.default;
    return `<div class="photo-circle-wrap" onclick="event.stopPropagation();showDayTab('${targetTab}')">
      <div class="photo-circle-img-wrap" style="--ph:${icon.bg}">
        <span class="photo-circle-fallback">${icon.svg}</span>
        <img class="photo-circle-img" data-wiki="${escHtml(item.name)}" data-photo="${escHtml(item.photo || '')}" data-fixed="1" alt="${escHtml(shortName)}" src="" onerror="this.style.display='none'">
      </div>
      <div class="photo-circle-label">${shortName}</div>
    </div>`;
  }

  // Lugares preview en resumen
  const lugaresPreviewHtml = day.places.length ? `
    <div class="dsc-card">
      <div class="dsc-header">
        <span class="dsc-header-icon">📍</span>
        <span class="dsc-title">Qué ver</span>
        <span class="dsc-count">${day.places.length}</span>
      </div>
      <div class="photo-circles-row">
        ${day.places.map(p => makeCircle(p, 'lugares')).join('')}
      </div>
      <button class="dsc-see-all" onclick="showDayTab('lugares')">Ver todos los lugares →</button>
    </div>` : '';

  // Ficha "Sobre <ciudad>" — resumen general del lugar donde se está ese día.
  // Desplegable para no ocupar tanto espacio: historia primero, luego
  // curiosidades y, si aporta algo, platos típicos al final.
  const cityForInfo = _cleanCityName(day.city);
  const cityCurated = CITY_INFO[cityForInfo];
  const citySummaryHtml = cityForInfo ? `
    <div class="dsc-card city-info-card" id="city-info-${date}" role="button" tabindex="0"
         onclick="toggleCityInfo('${date}')" onkeydown="if(event.key==='Enter')toggleCityInfo('${date}')">
      <div class="dsc-header">
        <span class="dsc-header-icon">🌏</span>
        <span class="dsc-title">Sobre ${escHtml(cityForInfo)}</span>
        <span class="city-info-arrow">▾</span>
      </div>
      <div class="city-info-body">
        <div class="city-info-photo" style="display:none"></div>
        <p class="city-info-text">Cargando información de ${escHtml(cityForInfo)}…</p>
        ${cityCurated ? `
          <div class="city-info-extra">
            <div class="city-info-extra-title">✨ Curiosidades</div>
            <p class="city-info-text">${escHtml(cityCurated.curiosities)}</p>
          </div>
          <div class="city-info-extra">
            <div class="city-info-extra-title">🍜 Platos típicos</div>
            <p class="city-info-text">${escHtml(cityCurated.food)}</p>
          </div>` : ''}
      </div>
    </div>` : '';

  // Restaurantes preview en resumen
  const restPreviewHtml = day.restaurants.length ? `
    <div class="dsc-card">
      <div class="dsc-header">
        <span class="dsc-header-icon">🍜</span>
        <span class="dsc-title">Qué comer</span>
        <span class="dsc-count">${day.restaurants.length}</span>
      </div>
      <div class="photo-circles-row">
        ${day.restaurants.map(r => makeCircle(r, 'comer')).join('')}
      </div>
      <button class="dsc-see-all" onclick="showDayTab('comer')">Ver todos los platos →</button>
    </div>` : '';

  const tabResumen = `
    <div class="day-tab-panel" id="dtab-resumen">
      <div class="dsc-summary-text">${day.summary}</div>
      ${buildTransitAlertHTML(day)}
      ${taskProgressHtml}
      ${transportHtml}
      ${hotelHtml}
      ${lugaresPreviewHtml}
      ${citySummaryHtml}
      ${restPreviewHtml}
      ${buildCultureHTML(day.block)}
      <div style="height:80px"></div>
    </div>`;

  // ── TAB: Lugares — acordeón ──
  function lugarCardHtml(item, idx, type) {
    const icon = CIRCLE_ICONS[item.type] || CIRCLE_ICONS.default;
    return `
      <div class="lugar-card" id="lc-${type}-${idx}" onclick="toggleLugar('${type}',${idx})">
        <!-- Cabecera colapsada -->
        <div class="lugar-card-header">
          <div class="lugar-thumb-wrap" style="--ph:${icon.bg}">
            <span class="lugar-thumb-fallback-icon">${icon.svg}</span>
            <img class="lugar-thumb-img" data-wiki="${escHtml(item.name)}"
                 data-photo="${escHtml(item.photo || '')}"
                 data-fixed="1"
                 alt="${escHtml(item.name)}"
                 src=""
                 onerror="this.style.display='none'">
          </div>
          <div class="lugar-body">
            <div class="lugar-name">${item.name}</div>
            ${item.notes ? `<div class="lugar-notes-short">${item.notes}</div>` : ''}
          </div>
          <div class="lugar-chevron">›</div>
        </div>
        <!-- Contenido expandido -->
        <div class="lugar-expanded">
          <div class="lugar-carousel" id="lcarousel-${type}-${idx}"></div>
          <div class="lugar-carousel-dots" id="ldots-${type}-${idx}"></div>
          <div class="lugar-expanded-body">
            ${item.description ? `<p class="lugar-description">${item.description}</p>` : ''}
            ${item.tips ? `<div class="lugar-tips"><span class="lugar-tips-icon">💡</span><div class="lugar-tips-text">${item.tips}</div></div>` : ''}
            ${!item.description && !item.tips ? `<p class="lugar-description" style="color:var(--text-xs)">${item.notes || 'Sin información adicional.'}</p>` : ''}
            ${type === 'place' && item.lat != null ? (() => {
              const st = getPlaceState(date, item.name);
              return `<div class="lugar-actions" onclick="event.stopPropagation()">
                <a class="lugar-act" href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}" target="_blank" rel="noopener">🧭 Cómo llegar</a>
                <button class="lugar-act${st.favorite ? ' on' : ''}" data-d="${date}" data-n="${escHtml(item.name)}"
                        onclick="togglePlaceFavorite(this.dataset.d, this.dataset.n); this.classList.toggle('on')">★ Favorito</button>
                <button class="lugar-act${st.visited ? ' on' : ''}" data-d="${date}" data-n="${escHtml(item.name)}"
                        onclick="togglePlaceVisited(this.dataset.d, this.dataset.n); this.classList.toggle('on')">✓ Visitado</button>
              </div>`;
            })() : ''}
          </div>
          ${typeof item.lat === 'number' && typeof item.lng === 'number'
            ? `<div class="lugar-mini-map" id="lmap-${type}-${idx}" data-lat="${item.lat}" data-lng="${item.lng}" style="display:none"></div>`
            : ''}
        </div>
      </div>`;
  }

  const tabLugares = `
    <div class="day-tab-panel hidden" id="dtab-lugares">
      ${day.places.length ? `
        <div class="section-title">📍 Lugares a visitar</div>
        ${day.places.map((p, i) => lugarCardHtml(p, i, 'place')).join('')}` : ''}
      ${day.restaurants.length ? `
        <div class="section-title">🍜 Qué comer</div>
        ${day.restaurants.map((r, i) => lugarCardHtml(r, i, 'rest')).join('')}` : ''}
      ${!day.places.length && !day.restaurants.length
        ? `<div class="empty-state"><span class="empty-icon">📍</span><p>No hay lugares registrados para este día.</p></div>` : ''}
      <div style="height:80px"></div>
    </div>`;

  // ── TAB: Comer ──
  const tabComer = `
    <div class="day-tab-panel hidden" id="dtab-comer">
      ${day.restaurants.length ? `
        <div class="food-list" style="padding-top:12px">
          ${day.restaurants.map((r, i) => {
            const slug = 'food_' + date.replace(/-/g,'') + '_' + i;
            const isSpecial = (r.notes || '').startsWith('⭐');
            const emoji = r.type === 'cafe' ? '☕' : '🍜';
            return `
              <div class="food-card">
                <div class="food-card-img-wrap">
                  <div class="food-card-img-placeholder">${emoji}</div>
                  <img class="food-card-img" id="fci-${slug}"
                       data-wiki="${escHtml(r.name)}" data-photo="${escHtml(r.photo || '')}" data-fixed="1"
                       alt="${escHtml(r.name)}" src=""
                       onload="this.classList.add('loaded')" onerror="this.style.display='none'">
                  ${isSpecial ? `<div style="position:absolute;top:10px;left:10px;background:#e8b800;color:#1a2a40;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px">⭐ Especialidad</div>` : ''}
                </div>
                <div class="food-card-body">
                  <div class="food-card-name">${escHtml(r.name)}</div>
                  <div class="food-card-desc">${escHtml(r.description || r.notes || '')}</div>
                  ${r.tips ? `<div style="margin-top:8px;font-size:12px;color:var(--accent);line-height:1.5">💡 ${escHtml(r.tips)}</div>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>` : `<div class="empty-state"><span class="empty-icon">🍽️</span><p>Sin platos registrados para esta zona.</p></div>`}
      <div style="height:80px"></div>
    </div>`;

  // ── TAB: Mapa (puntos reales del día con Leaflet, sin depender de My Maps) ──
  const mapHeight = 'calc(100vh - var(--header-h) - var(--nav-h) - 96px)';
  const dayPlacesWithCoords = (day.places || []).filter(p => typeof p.lat === 'number' && typeof p.lng === 'number');
  const tabMapa = `
    <div class="day-tab-panel hidden" id="dtab-mapa">
      ${dayPlacesWithCoords.length ? `
        <div id="day-leaflet-map" style="height:${mapHeight}"></div>` : `
        <div class="empty-state" style="height:${mapHeight};display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <span class="empty-icon">🗺️</span>
          <p>Todavía no hay coordenadas para los sitios de este día.</p>
        </div>`}
    </div>`;

  // ── TAB: Notas ──
  const tabNotas = `
    <div class="day-tab-panel hidden" id="dtab-notas">
      ${total ? `
        <div class="section-title">✅ Tareas
          <span class="tasks-badge ${pending === 0 ? 'tasks-done' : ''}">${pending === 0 ? '¡Todo hecho! 🎉' : pending + ' pendiente' + (pending > 1 ? 's' : '')}</span>
        </div>
        <div class="card">
          ${day.tasks.map((t, i) => `
            <div class="task-item ${t.done ? 'done' : ''}" onclick="toggleTask('${date}',${i})">
              <div class="task-check">${t.done ? '✓' : ''}</div>
              <div class="task-text">${t.text}</div>
            </div>`).join('')}
        </div>` : ''}
      ${day.notes ? `
        <div class="section-title">💬 Notas del día</div>
        <div class="card">
          <p style="font-size:14px;line-height:1.7;color:var(--text-sm);white-space:pre-line">${day.notes}</p>
        </div>` : ''}
      ${!total && !day.notes
        ? `<div class="empty-state"><span class="empty-icon">💬</span><p>Sin tareas ni notas para este día.</p></div>` : ''}
      <div style="height:80px"></div>
    </div>`;

  const stickyBar = '';

  el('view-content').innerHTML =
    headerHtml + tabsHtml + tabResumen + tabLugares + tabComer + tabMapa + tabNotas + stickyBar;

  // Inicializar mapa del día (lazy, cuando se abra el tab)
  window._dayDate = date;
  window._dayCity = day.city;

  // Cargar fotos reales de Wikipedia de forma asíncrona
  loadPageWikiPhotos();
  if (cityForInfo) loadCitySummary(document.getElementById('city-info-' + date), cityForInfo);
}

function lugarThumbError(el, emoji) {
  el.outerHTML = '<div class="lugar-thumb-fallback">' + emoji + '</div>';
}

const _lugarMapInstances = {};

// Mini mapa de un lugar con las coordenadas de su ficha (las mismas del mapa general).
// Antes se geocodificaba el NOMBRE con Nominatim y podía pintar el sitio en otro lugar;
// las fichas sin lat/lng (p. ej. los platos) ya no llevan mini mapa.
function loadLugarMap(mapEl) {
  if (!mapEl || mapEl.dataset.mapLoaded) return;
  const lat = parseFloat(mapEl.dataset.lat), lng = parseFloat(mapEl.dataset.lng);
  if (!isFinite(lat) || !isFinite(lng)) return;
  mapEl.dataset.mapLoaded = '1';
  mapEl.style.display = 'block';
  const id = mapEl.id;
  if (_lugarMapInstances[id]) { _lugarMapInstances[id].remove(); delete _lugarMapInstances[id]; }
  const m = L.map(id, { zoomControl: false, attributionControl: false }).setView([lat, lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(m);
  L.circleMarker([lat, lng], { radius: 8, color: '#1a3a5c', fillColor: '#2a6fc4', fillOpacity: 1, weight: 2 }).addTo(m);
  L.control.zoom({ position: 'bottomright' }).addTo(m);
  _lugarMapInstances[id] = m;
  setTimeout(() => m.invalidateSize(), 100);
}

function toggleLugar(type, idx) {
  const card = document.getElementById('lc-' + type + '-' + idx);
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  card.classList.toggle('open');
  if (!wasOpen) {
    const carouselEl = document.getElementById('lcarousel-' + type + '-' + idx);
    const dotsEl = document.getElementById('ldots-' + type + '-' + idx);
    if (carouselEl && !carouselEl.dataset.loaded) {
      carouselEl.dataset.loaded = '1';
      const nameEl = card.querySelector('.lugar-name');
      const placeName = nameEl ? nameEl.textContent.trim() : '';
      const thumb = card.querySelector('.lugar-thumb-img');
      const photoUrl = thumb ? thumb.dataset.photo : '';
      if (placeName) loadCarousel(carouselEl, dotsEl, placeName, photoUrl && !photoUrl.includes('picsum') ? photoUrl : '');
    }
    // Mini mapa
    loadLugarMap(document.getElementById('lmap-' + type + '-' + idx));
  } else {
    // Al cerrar, invalidar tamaño por si reabre
    const mapEl = document.getElementById('lmap-' + type + '-' + idx);
    const id = mapEl?.id;
    if (id && _lugarMapInstances[id]) setTimeout(() => _lugarMapInstances[id]?.invalidateSize(), 50);
  }
}

function showDayTab(tab) {
  document.querySelectorAll('.day-tab').forEach((b, i) => {
    const tabs = ['resumen','lugares','comer','mapa','notas'];
    b.classList.toggle('active', tabs[i] === tab);
  });
  ['resumen','lugares','comer','mapa','notas'].forEach(t => {
    const panel = document.getElementById('dtab-' + t);
    if (panel) panel.classList.toggle('hidden', t !== tab);
  });
  if (tab === 'mapa') initDayLeaflet();
  if (tab === 'comer') {
    const trip = getTrip(currentTripId);
    const day = trip?.days.find(d => d.date === window._dayDate);
    if (day) {
      day.restaurants.forEach((r, i) => {
        const slug = 'food_' + window._dayDate.replace(/-/g,'') + '_' + i;
        const img = document.getElementById('fci-' + slug);
        if (img) loadWikiPhoto(img, r.name);
      });
    }
  }
}

function initDayLeaflet() {
  const mapEl = document.getElementById('day-leaflet-map');
  if (!mapEl) return;
  if (_dayMapInstance) return; // ya iniciado
  const trip = getTrip(currentTripId);
  const day = trip.days.find(d => d.date === window._dayDate);
  const pts = (day?.places || [])
    .filter(p => typeof p.lat === 'number' && typeof p.lng === 'number')
    .map(p => ({ ...p, date: day.date, city: day.city }));
  if (!pts.length) return;
  const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
  const avgLng = pts.reduce((s, p) => s + p.lng, 0) / pts.length;
  setTimeout(() => {
    const mapEl2 = el('day-leaflet-map');
    _dayMapInstance = L.map('day-leaflet-map').setView([avgLat, avgLng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(_dayMapInstance);
    pts.forEach(pt => {
      const meta = placeTypeMeta(pt.type);
      const icon = L.divIcon({
        html: `<div class="map-pin" style="background:${meta.color}"><span>${meta.icon}</span></div>`,
        iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34],
        className: ''
      });
      L.marker([pt.lat, pt.lng], { icon, title: pt.name, alt: pt.name }).addTo(_dayMapInstance).bindPopup(buildPlacePopup(pt));
    });
  }, 100);
}

// ── LOCALIZADORES DE RESERVA (solo en el móvil) ───────────
// El repo es público: los localizadores no van en data.js (6-oct-2026). Los transportes con
// reserva llevan `ref: true` y aquí se apunta su localizador, que se guarda en DB.bookingRefs
// (localStorage, nunca se publica). Clave «fecha|tipo|destino».
function bookingRefKey(date, tr) { return date + '|' + tr.type + '|' + tr.to; }

function bookingRefHtml(date, tr) {
  if (!tr || !tr.ref) return '';
  const key  = bookingRefKey(date, tr);
  const code = (DB.bookingRefs || {})[key] || '';
  const k    = escHtml(key);
  return code
    ? `<div class="tr-ref" data-k="${k}" onclick="event.stopPropagation()">🔒 Localizador <b class="tr-ref-code">${escHtml(code)}</b>
         <button class="tr-ref-btn" data-k="${k}" onclick="copyBookingRef(this)">Copiar</button>
         <button class="tr-ref-btn" data-k="${k}" onclick="editBookingRef(this.dataset.k)">Cambiar</button></div>`
    : `<div class="tr-ref" data-k="${k}" onclick="event.stopPropagation()">
         <button class="tr-ref-btn" data-k="${k}" onclick="editBookingRef(this.dataset.k)">🔒 Añadir localizador</button>
         <span class="tr-ref-note">se guarda solo en este móvil</span></div>`;
}

function editBookingRef(key) {
  const cur = (DB.bookingRefs || {})[key] || '';
  const v = prompt('Localizador de la reserva\n(se guarda solo en este móvil, no se publica):', cur);
  if (v === null) return;
  DB.bookingRefs = DB.bookingRefs || {};
  const clean = v.trim();
  if (clean) DB.bookingRefs[key] = clean; else delete DB.bookingRefs[key];
  save();
  const [date, type, ...to] = key.split('|');
  const html = bookingRefHtml(date, { ref: true, type, to: to.join('|') });
  document.querySelectorAll('.tr-ref').forEach(el => { if (el.dataset.k === key) el.outerHTML = html; });
}

function copyBookingRef(btn) {
  const code = (DB.bookingRefs || {})[btn.dataset.k] || '';
  if (!code) return;
  const done = () => { btn.textContent = '✓ Copiado'; setTimeout(() => { btn.textContent = 'Copiar'; }, 1500); };
  if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, () => prompt('Copia el localizador:', code));
  else prompt('Copia el localizador:', code);
}

function toggleHotelExpand(card) {
  const body = card.querySelector('.hotel-expand-body');
  const chevron = card.querySelector('.hotel-chevron');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  card.setAttribute('aria-expanded', String(!open));
  if (chevron) chevron.style.transform = open ? '' : 'rotate(90deg)';
}

function openDayInMaps(city) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`, '_blank');
}

// Datos de un alojamiento: lo que traiga el día en data.js manda; lo que falte sale de
// HOTEL_INFO (js/guia.js: dirección, teléfono, horarios, coordenadas, descripción).
function hotelInfo(h) {
  const base = (window.HOTEL_INFO || {})[(h && h.name) || ''] || {};
  const pick = k => (h && h[k]) || base[k] || '';
  return { ...base, name: (h && h.name) || '', address: pick('address'), phone: pick('phone'),
           checkIn: pick('checkIn'), checkOut: pick('checkOut') };
}

// Estancia (días seguidos con el mismo alojamiento) que incluye la fecha dada
function hotelStay(trip, name, date) {
  const days = trip.days;
  let i = days.findIndex(d => d.date === date && d.hotel && d.hotel.name === name);
  if (i < 0) i = days.findIndex(d => d.hotel && d.hotel.name === name);
  if (i < 0) return null;
  let a = i, b = i;
  while (a > 0 && days[a - 1].hotel && days[a - 1].hotel.name === name) a--;
  while (b < days.length - 1 && days[b + 1].hotel && days[b + 1].hotel.name === name) b++;
  return { first: days[a], last: days[b], nights: b - a + 1, breakfast: days.slice(a, b + 1).some(d => d.hotel.breakfast) };
}

function hotelLinks(info) {
  const q = encodeURIComponent(((info.maps || info.name) + ', ' + (info.address || '')).replace(/, $/, ''));
  return {
    dir:   typeof info.lat === 'number' ? `https://www.google.com/maps/dir/?api=1&destination=${info.lat},${info.lng}` : `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    place: `https://www.google.com/maps/search/?api=1&query=${q}`,
    tel:   info.phone ? 'tel:' + info.phone.replace(/[^\d+]/g, '') : ''
  };
}

let _htlSheetMap = null;

function openHotelDetail(name, date) {
  const trip = getTrip(currentTripId);
  if (!trip || !name) return;
  const stay = hotelStay(trip, name, date);
  if (!stay) return;
  const info  = hotelInfo(stay.first.hotel);
  const links = hotelLinks(info);
  const fmt = iso => new Date(iso + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  const outDate = new Date(stay.last.date + 'T12:00:00'); outDate.setDate(outDate.getDate() + 1);
  const outIso  = outDate.toISOString().slice(0, 10);
  const hasMap  = typeof info.lat === 'number' && typeof info.lng === 'number';

  const html = `
    <div class="htl-sheet-overlay" onclick="closeHotelDetail()"></div>
    <div class="htl-sheet" role="dialog" aria-modal="true" aria-label="${escHtml(info.name)}">
      <button class="htl-sheet-drag" onclick="closeHotelDetail()" aria-label="Cerrar"></button>
      ${hasMap ? `<div class="htl-sheet-map" id="htl-sheet-map"></div>` : ''}
      <div class="htl-sheet-body">
        <div class="htl-sheet-name">${escHtml(info.name)}</div>
        <div class="htl-sheet-stay">${fmt(stay.first.date)} → ${fmt(outIso)} · ${stay.nights === 1 ? '1 noche' : stay.nights + ' noches'}</div>
        ${info.address ? `<div class="htl-sheet-addr">📍 ${escHtml(info.address)}</div>` : ''}
        ${info.phone ? `<a class="htl-sheet-phone" href="${links.tel}">📞 ${escHtml(info.phone)}</a>` : ''}
        <div class="htl-sheet-times">
          ${info.checkIn  ? `<div class="htl-sheet-time-box"><div class="htl-sheet-time-label">Entrada</div><div class="htl-sheet-time-val">${escHtml(info.checkIn)}</div></div>` : ''}
          ${info.checkOut ? `<div class="htl-sheet-time-box"><div class="htl-sheet-time-label">Salida</div><div class="htl-sheet-time-val">${escHtml(info.checkOut)}</div></div>` : ''}
          <div class="htl-sheet-time-box"><div class="htl-sheet-time-label">Desayuno</div><div class="htl-sheet-time-val htl-sheet-bf">${stay.breakfast ? 'Incluido' : 'No'}</div></div>
        </div>
        ${info.desc ? `<p class="htl-sheet-desc">${escHtml(info.desc)}</p>` : ''}
        <div class="htl-sheet-actions">
          <a class="htl-sheet-btn htl-sheet-btn-maps" href="${links.dir}" target="_blank" rel="noopener">🧭 Cómo llegar</a>
          <a class="htl-sheet-btn htl-sheet-btn-day" href="${links.place}" target="_blank" rel="noopener">🗺️ Fotos y opiniones en Google Maps</a>
          <button class="htl-sheet-btn htl-sheet-btn-day" onclick="closeHotelDetail();navigate('day','${stay.first.date}')">📅 Ver el día de llegada</button>
        </div>
      </div>
    </div>`;

  let wrap = document.getElementById('htl-sheet-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'htl-sheet-wrap';
    document.body.appendChild(wrap);
  }
  if (_htlSheetMap) { _htlSheetMap.remove(); _htlSheetMap = null; }
  wrap.innerHTML = html;
  wrap.style.display = 'block';
  requestAnimationFrame(() => wrap.querySelector('.htl-sheet').classList.add('htl-sheet-open'));
  if (hasMap && window.L) {
    _htlSheetMap = L.map('htl-sheet-map', { zoomControl: false, attributionControl: false }).setView([info.lat, info.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(_htlSheetMap);
    L.circleMarker([info.lat, info.lng], { radius: 9, color: '#1a3a5c', fillColor: '#2a6fc4', fillOpacity: 1, weight: 3 }).addTo(_htlSheetMap);
    L.control.zoom({ position: 'bottomright' }).addTo(_htlSheetMap);
    setTimeout(() => _htlSheetMap && _htlSheetMap.invalidateSize(), 320);
  }
}

function closeHotelDetail() {
  const wrap = document.getElementById('htl-sheet-wrap');
  if (!wrap) return;
  const sheet = wrap.querySelector('.htl-sheet');
  if (sheet) {
    sheet.classList.remove('htl-sheet-open');
    setTimeout(() => {
      if (_htlSheetMap) { _htlSheetMap.remove(); _htlSheetMap = null; }
      wrap.style.display = 'none'; wrap.innerHTML = '';
    }, 280);
  }
}

function toggleTransportPanel(date) {
  const panel = document.getElementById('trpanel-' + date);
  const arrow = document.getElementById('arrow-' + date);
  if (!panel) return;
  const open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : 'block';
  if (arrow) arrow.style.transform = open ? '' : 'rotate(90deg)';
}

function toggleTask(date, idx) {
  const trip = getTrip(currentTripId);
  const day = trip.days.find(d => d.date === date);
  if (day && day.tasks[idx] !== undefined) {
    day.tasks[idx].done = !day.tasks[idx].done;
    save();
    renderDay(date);
  }
}

// ══════════════════════════════════════════════════════════
//  VIEW: HOY
// ══════════════════════════════════════════════════════════

// Consejos contextuales por tipo de transporte
const TRANSPORT_TIPS = {
  'sleeper-bus': [
    'Recarga el móvil antes de subir — los enchufes del bus no siempre funcionan.',
    'Lleva tapones y antifaz: las luces se apagan tarde y vuelven a las 5am.',
    'Ten el pasaporte a mano por si hay controles nocturnos en la frontera.',
    'Los asientos delanteros vibran menos. Pide los de la fila 3-5.',
    'Guarda lo imprescindible en la mochila pequeña debajo de la litera.',
  ],
  'train': [
    'Asientos IZQUIERDA mirando a Da Nang para las vistas al mar en el Hai Van Pass.',
    'El tren HD3 sale de Hue a las 14:05 — llega a Da Nang a las ~17:40.',
    'El bar del tren sirve cerveza fría, fideos instantáneos y snacks.',
    'Los portaequipajes superiores son seguros — el equipaje grande va ahí.',
  ],
  'flight': [
    'Llega al aeropuerto con 2h de antelación aunque sea vuelo doméstico.',
    'Los líquidos van en bolsa de 1L en el equipaje de mano.',
    'Descarga la tarjeta de embarque en el móvil antes de ir al aeropuerto.',
  ],
  'ferry': [
    'Lleva algo de abrigo — la brisa en cubierta puede ser fresca.',
    'El mareo de barco mejora quedándote en cubierta mirando el horizonte.',
    'El equipaje grande se guarda abajo — sube solo con la mochila pequeña.',
  ],
  'boat': [
    'El crucero incluye comida y snorkel — confirma qué está incluido.',
    'Lleva protector solar resistente al agua y una capa ligera para la noche.',
    'Los camarotes son pequeños — lleva solo lo esencial a bordo.',
  ],
};

// ── COLORES DE ZONA: tabla ÚNICA para toda la app (paleta aprobada 3/5-oct-2026) ──
// color = tono principal · lt = fondo suave · g = tono claro para degradados.
// Todas las pantallas (Ruta, Días, Alojamiento, Hoy, Mapa, Comida…) leen de aquí.
const BLOCK_ZONE_COLORS = {
  'El Norte':         { color: '#1A7B6B', lt: '#d0f0e8', g: '#22a07a' },
  'Vuelta al Norte':  { color: '#1A7B6B', lt: '#d0f0e8', g: '#22a07a' },
  'El Centro':        { color: '#2f6fa3', lt: '#dbe8f4', g: '#5593c4' },
  'Angkor':           { color: '#b8861b', lt: '#f6ebcf', g: '#d4a63a' },
  'Phnom Penh':       { color: '#8B5E3C', lt: '#f5e6d8', g: '#b07848' },
  'Delta del Mekong': { color: '#2e8b57', lt: '#d6f0e0' },
  'Ninh Binh':        { color: '#4a7c3f', lt: '#e0f0d8' },
  'El Cierre':        { color: '#6b7f3a', lt: '#e8edd6', g: '#8aa04c' },
  'Vuelos':           { color: '#5c6b7a', lt: '#e4e8ec' },
  'Vuelta a casa':    { color: '#5c6b7a', lt: '#e4e8ec' },
  'General':          { color: '#1a3a5c', lt: '#e8f0f8' },
};
const zoneColor = b => (BLOCK_ZONE_COLORS[b] || BLOCK_ZONE_COLORS['General']).color;
// Bloques que son solo vuelos (no cuentan como «zonas» del viaje)
const FLIGHT_BLOCKS = ['Vuelos', 'Vuelta a casa'];
// Copia color/lt de la tabla única sobre una tabla local con más campos (etiquetas, fotos…)
function applyZoneColors(map) {
  Object.keys(map).forEach(k => { const z = BLOCK_ZONE_COLORS[k]; if (z) { map[k].color = z.color; map[k].lt = z.lt; } });
  return map;
}

function renderToday() {
  const trip = getTrip(currentTripId);

  // Modo "Viajar en el tiempo": simular fecha
  const simDate = _timeTravelDate;
  const isSimulated = !!simDate;

  const effectiveDate = simDate || today();
  const active = isSimulated
    ? (effectiveDate >= trip.startDate && effectiveDate <= trip.endDate)
    : isTripActive(trip);
  const past = isSimulated ? false : isTripPast(trip);

  if (!active) {
    setHeader('Hoy', false);
    renderTodayPreTrip(trip, past);
    return;
  }

  const t   = effectiveDate;
  const day = trip.days.find(d => d.date === t);

  if (!day) {
    setHeader('Hoy', false);
    el('view-content').innerHTML = `<div class="empty-state"><span class="empty-icon">📅</span><p>No hay datos para hoy.</p></div>`;
    return;
  }

  // Mostrar la vista de día completa (Resumen / Lugares / Comer / Mapa / Notas)
  renderDay(t);
  setHeader(`Hoy · Día ${getDayNumber(trip, t)}`, false);
  const toDias = document.createElement('div');
  toDias.className = 'today-to-dias';
  toDias.innerHTML = `<span>📅 Abrir este día en la pestaña Días</span><span class="today-to-dias-arrow">›</span>`;
  toDias.onclick = () => navigate('day', t);
  el('view-content').prepend(toDias);

  // Añadir banner de simulación temporal encima si aplica
  if (isSimulated) {
    const banner = document.createElement('div');
    banner.style.cssText = 'background:#e8b800;color:#1a2a40;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:700;position:sticky;top:0;z-index:10';
    banner.innerHTML = `<span>⏰ Vista previa: ${new Date(t+'T12:00:00').toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'})}</span>
      <button onclick="exitTimeTravel()" style="background:#1a2a40;color:#e8b800;border:none;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:700;cursor:pointer">✕ Salir</button>`;
    el('view-content').prepend(banner);
  }

  // Añadir sección de progreso del viaje al final
  const progressEl = document.createElement('div');
  progressEl.innerHTML = `
    <div style="padding:16px 16px 0">
      <div class="section-title" style="padding:0 0 8px">Progreso del viaje</div>
      ${buildTripStatsHTML(trip)}
    </div>
    <div style="height:80px"></div>`;
  el('view-content').appendChild(progressEl);
}

// ── HOY: antes del viaje (cuenta atrás bonita + preparativos) ──

function renderTodayPreTrip(trip, isPast) {
  if (isPast) {
    el('view-content').innerHTML = `
      <div class="countdown-finished">
        <div class="cf-emoji">🌏</div>
        <div class="cf-title">¡Qué viaje tan increíble!</div>
        <div class="cf-sub">${trip.name}</div>
        <div class="cf-dates">${formatDate(trip.startDate)} → ${formatDate(trip.endDate)}</div>
        <div style="margin-top:16px;font-size:14px;color:rgba(255,255,255,.75)">Los recuerdos duran para siempre ✨</div>
      </div>`;
    return;
  }

  // Cuenta atrás
  const start = new Date(trip.startDate + 'T00:00:00');
  const now = new Date();
  const totalMs = start - now;
  const totalDays = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const mins = Math.floor((totalMs % 3600000) / 60000);
  const secs = Math.floor((totalMs % 60000) / 1000);

  // Primeras tareas pendientes de los primeros días
  const prepTasks = trip.days.slice(0, 5).flatMap(d =>
    d.tasks.filter(t => !t.done).map(t => ({ ...t, city: d.city, date: d.date }))
  ).slice(0, 6);

  // Highlights del viaje
  const highlights = [
    { icon: '🛫', text: 'Vuelo a Asia (Barcelona→Shenzhen)', date: '6 NOV' },
    { icon: '🏯', text: 'Amanecer en Angkor Wat', date: '11 NOV' },
    { icon: '⛴️', text: 'Ferry por el Mekong a Chau Doc', date: '16 NOV' },
    { icon: '🎭', text: 'Hoi An Memories Show', date: '19 NOV' },
    { icon: '🚆', text: 'Tren panorámico Hai Van Pass', date: '22 NOV' },
    { icon: '🌄', text: 'Amanecer en Hang Mua', date: '25 NOV' },
    { icon: '🛳️', text: 'Lan Ha Bay en barco', date: '27 NOV' },
  ];

  el('view-content').innerHTML = `
    <!-- Countdown hero -->
    <div class="countdown-hero" style="background:${trip.coverGradient}">
      <div class="ch-label">Quedan</div>
      <div class="ch-numbers" id="cd-display">
        <div class="ch-num-block"><div class="ch-num" id="cd-days">${totalDays}</div><div class="ch-unit">días</div></div>
        <div class="ch-sep">:</div>
        <div class="ch-num-block"><div class="ch-num" id="cd-hours">${String(hours).padStart(2,'0')}</div><div class="ch-unit">horas</div></div>
        <div class="ch-sep">:</div>
        <div class="ch-num-block"><div class="ch-num" id="cd-mins">${String(mins).padStart(2,'0')}</div><div class="ch-unit">min</div></div>
        <div class="ch-sep">:</div>
        <div class="ch-num-block"><div class="ch-num" id="cd-secs">${String(secs).padStart(2,'0')}</div><div class="ch-unit">seg</div></div>
      </div>
      <div class="ch-dest">${trip.emoji} ${trip.name}</div>
      <div class="ch-date">Salida: ${formatDate(trip.startDate)}</div>
    </div>

    <!-- Lo que nos espera -->
    <div class="section-title">Lo que nos espera ✨</div>
    <div style="padding:0 16px;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      ${highlights.map(h => `
        <div class="highlight-pill">
          <span>${h.icon}</span>
          <span>${h.text}</span>
          <span class="hp-date">${h.date}</span>
        </div>`).join('')}
    </div>

    <!-- Preparativos pendientes -->
    ${prepTasks.length ? `
      <div class="section-title">Preparativos pendientes</div>
      <div class="card">
        ${prepTasks.map(t => `
          <div class="task-item" onclick="navigate('day','${t.date}')">
            <div class="task-check"></div>
            <div>
              <div class="task-text">${t.text}</div>
              <div class="text-xs" style="margin-top:2px">${t.city} · ${formatDateShort(t.date)}</div>
            </div>
          </div>`).join('')}
      </div>` : ''}

    <!-- Primer vuelo -->
    <div class="section-title">Primer movimiento</div>
    ${(() => {
      const firstTransportDay = trip.days.find(d => d.transport.length > 0);
      if (!firstTransportDay) return '';
      const tr = firstTransportDay.transport[0];
      return `<div style="padding:0 16px">
        <div class="transport-item" style="border:1px solid var(--border)">
          <div class="transport-icon">${tr.icon || transportIcon(tr.type)}</div>
          <div class="transport-body">
            <div class="transport-detail">${tr.details}</div>
            <div class="transport-route">${tr.from} → ${tr.to}</div>
            <div class="text-xs" style="margin-top:2px">${formatDate(firstTransportDay.date)}${tr.time ? ' · ' + tr.time : ''}</div>
            ${bookingRefHtml(firstTransportDay.date, tr)}
          </div>
        </div>
      </div>`;
    })()}

    <!-- Progreso del viaje — pre-viaje -->
    <div style="padding:14px 16px 0">
      <div class="section-title" style="padding:0 0 8px">Progreso del viaje</div>
      <div class="stats-pretrip-note">
        Esta sección se activará en <strong>${totalDays} días y ${hours} horas</strong> — cuando estés sobrevolando el mundo rumbo a ${trip.name} ✈️
      </div>
      ${buildTripStatsHTML(trip)}
    </div>

    <!-- Viajar en el tiempo -->
    <div style="padding:0 16px 16px">
      <button class="time-travel-btn" onclick="openTimeTravelModal()">
        <span style="font-size:20px">⏰</span>
        <div>
          <div style="font-weight:800;font-size:14px">Viajar en el tiempo</div>
          <div style="font-size:12px;opacity:.8">Elige un día y verás el viaje como se verá ese día</div>
        </div>
        <span style="margin-left:auto;font-size:20px">›</span>
      </button>
    </div>

    <div style="height:80px"></div>`;

  // Arrancar el timer de la cuenta atrás
  countdownTimer = setInterval(() => {
    const ms = new Date(trip.startDate + 'T00:00:00') - new Date();
    if (ms <= 0) { clearInterval(countdownTimer); return; }
    const d2 = Math.floor(ms / 86400000);
    const h2 = Math.floor((ms % 86400000) / 3600000);
    const m2 = Math.floor((ms % 3600000) / 60000);
    const s2 = Math.floor((ms % 60000) / 1000);
    const cdDays = el('cd-days'), cdH = el('cd-hours'), cdM = el('cd-mins'), cdS = el('cd-secs');
    if (cdDays) cdDays.textContent = d2;
    if (cdH)    cdH.textContent = String(h2).padStart(2,'0');
    if (cdM)    cdM.textContent = String(m2).padStart(2,'0');
    if (cdS)    cdS.textContent = String(s2).padStart(2,'0');
  }, 1000);
}

// ── VIAJAR EN EL TIEMPO ────────────────────────────────────
function openTimeTravelModal() {
  const trip = getTrip(currentTripId);
  if (!trip) return;

  // Agrupar días por bloque
  const blocks = [...new Set(trip.days.map(d => d.block).filter(Boolean))];
  const byBlock = {};
  trip.days.forEach(d => {
    if (!byBlock[d.block]) byBlock[d.block] = [];
    byBlock[d.block].push(d);
  });

  const blocksHtml = blocks.map(b => {
    const zc = BLOCK_ZONE_COLORS[b] || BLOCK_ZONE_COLORS['General'];
    const days = byBlock[b];
    const daysHtml = days.map((d, i) => {
      const dt = new Date(d.date + 'T12:00:00');
      const label = dt.toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' });
      const cityShort = d.city.replace(/\s*→.*$/, '');
      return `<div class="tt-day-item" onclick="setTimeTravel('${d.date}')">
        <div class="tt-day-num">Día ${i + 1 + trip.days.indexOf(days[0])}</div>
        <div class="tt-day-info">
          <div class="tt-day-city">${cityShort}</div>
          <div class="tt-day-date">${label}</div>
        </div>
        <span style="color:var(--text-sm)">›</span>
      </div>`;
    }).join('');
    return `<div class="tt-block-header" style="border-left:3px solid ${zc.color};color:${zc.color}">${b}</div>
      ${daysHtml}`;
  }).join('');

  const modal = document.createElement('div');
  modal.id = 'tt-modal';
  modal.innerHTML = `
    <div class="tt-backdrop" onclick="closeTimeTravelModal()"></div>
    <div class="tt-sheet">
      <div class="tt-sheet-header">
        <span style="font-size:20px">⏰</span>
        <span style="font-weight:800;font-size:16px">Viajar en el tiempo</span>
        <button onclick="closeTimeTravelModal()" style="margin-left:auto;background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-sm)">✕</button>
      </div>
      <div class="tt-sheet-body">
        <p style="font-size:13px;color:var(--text-sm);padding:0 4px 12px">Elige un día para ver cómo se verá la pantalla «Hoy» cuando estés en ese punto del viaje.</p>
        ${blocksHtml}
      </div>
    </div>`;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.querySelector('.tt-sheet').classList.add('open'));
}

function closeTimeTravelModal() {
  const modal = document.getElementById('tt-modal');
  if (!modal) return;
  const sheet = modal.querySelector('.tt-sheet');
  sheet.classList.remove('open');
  setTimeout(() => modal.remove(), 300);
}

function setTimeTravel(date) {
  _timeTravelDate = date;
  closeTimeTravelModal();
  setTimeout(() => { renderToday(); el('view-content').scrollTop = 0; }, 320);
}

function exitTimeTravel() {
  _timeTravelDate = null;
  renderToday();
}

// ══════════════════════════════════════════════════════════
//  VIEW: MAPA
// ══════════════════════════════════════════════════════════

const PLACE_TYPE_META = {
  temple:   { icon: '🛕', color: '#b8861b', label: 'Templos' },
  monument: { icon: '🏛️', color: '#1a3a5c', label: 'Monumentos' },
  museum:   { icon: '🖼️', color: '#55672d', label: 'Museos' },
  market:   { icon: '🛍️', color: '#e8a23d', label: 'Mercados' },
  nature:   { icon: '🌿', color: '#22a07a', label: 'Naturaleza' },
  beach:    { icon: '🏖️', color: '#22b0e8', label: 'Playas' },
  cafe:     { icon: '☕', color: '#8b5e3c', label: 'Cafés' },
  activity: { icon: '🎯', color: '#d94848', label: 'Actividades' },
};
function placeTypeMeta(type) { return PLACE_TYPE_META[type] || { icon: '📍', color: '#1a3a5c', label: 'Otros' }; }

function placeKey(date, name) { return date + '|' + name; }
function getPlaceState(date, name) {
  return (DB.placeState && DB.placeState[placeKey(date, name)]) || { favorite: false, visited: false };
}
function togglePlaceFavorite(date, name) {
  DB.placeState = DB.placeState || {};
  const k = placeKey(date, name);
  const cur = DB.placeState[k] || { favorite: false, visited: false };
  cur.favorite = !cur.favorite;
  DB.placeState[k] = cur;
  save();
  refreshFullMapMarker(date, name);
}
function togglePlaceVisited(date, name) {
  DB.placeState = DB.placeState || {};
  const k = placeKey(date, name);
  const cur = DB.placeState[k] || { favorite: false, visited: false };
  cur.visited = !cur.visited;
  DB.placeState[k] = cur;
  save();
  refreshFullMapMarker(date, name);
}

// Distancia entre dos puntos lat/lng en metros (fórmula de Haversine)
function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function formatDistance(m) {
  return m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1)} km`;
}

function collectMapPlaces(trip) {
  const out = [];
  trip.days.forEach(day => {
    (day.places || []).forEach(p => {
      if (typeof p.lat === 'number' && typeof p.lng === 'number') {
        out.push({ date: day.date, city: day.city, name: p.name, type: p.type, notes: p.notes, lat: p.lat, lng: p.lng });
      }
    });
  });
  return out;
}

function renderMap() {
  const trip = getTrip(currentTripId);
  setHeader('Mapa del viaje', false);

  const hasMyMaps = trip.myMapsUrl && trip.myMapsUrl.trim() !== '';
  const legendHtml = Object.entries(PLACE_TYPE_META).map(([type, meta]) =>
    `<span class="map-legend-chip" style="--mc:${meta.color};background:${meta.color}22;color:${meta.color}">${meta.icon} ${meta.label}</span>`
  ).join('');

  el('view-content').innerHTML = `
    <div id="maptab-full" style="position:relative;">
      <div class="map-legend">${legendHtml}</div>
      <div id="full-leaflet-map"></div>
      <button class="map-nearme-btn" onclick="showNearMe()">📍 Cerca de mí</button>
      <div id="map-nearme-panel" class="map-nearme-panel" style="display:none"></div>
    </div>`;
  initFullMap(trip);
}

function switchMapTab(tab) {
  // Compatibilidad: ya no hay pestañas separadas, el mapa propio es el único.
}

function promptMyMapsUrl() {
  const url = prompt('Pega la URL de embed de tu Google My Maps\n(Menú Compartir → Embed → copia el src del iframe):');
  if (!url || !url.includes('google.com/maps')) return;
  const trip = getTrip(currentTripId);
  trip.myMapsUrl = url;
  save();
  renderMap();
}

function buildPlacePopup(pt) {
  const meta = placeTypeMeta(pt.type);
  const state = getPlaceState(pt.date, pt.name);
  const d = new Date(pt.date + 'T12:00:00');
  const dateStr = d.getDate() + ' ' + d.toLocaleDateString('es-ES', { month: 'short' });
  const cityShort = (pt.city || '').replace(/\s*→.*$/, '');
  return `<div class="map-popup">
    <span class="map-popup-zone" style="background:${meta.color}">${meta.icon} ${dateStr} · ${cityShort}</span>
    <strong>${pt.name}</strong>
    ${pt.notes ? `<small>${pt.notes}</small>` : ''}
    <div class="mp-actions">
      <button class="mp-btn ${state.favorite ? 'mp-btn-active' : ''}" onclick="togglePlaceFavorite('${pt.date}','${pt.name.replace(/'/g, "\\'")}')" title="Favorito">★</button>
      <button class="mp-btn ${state.visited ? 'mp-btn-active' : ''}" onclick="togglePlaceVisited('${pt.date}','${pt.name.replace(/'/g, "\\'")}')" title="Visitado">✓</button>
      <button class="mp-btn" onclick="navigate('day','${pt.date}')">Ver día →</button>
    </div>
  </div>`;
}

let _fullMapMarkers = {}; // key: date|name -> {marker, pt}

function initFullMap(trip) {
  const pts = collectMapPlaces(trip);
  if (!pts.length) return;
  const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
  const avgLng = pts.reduce((s, p) => s + p.lng, 0) / pts.length;


  setTimeout(() => {
    const mapEl = el('full-leaflet-map');
    if (!mapEl) return;
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    mapInstance = L.map('full-leaflet-map').setView([avgLat, avgLng], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(mapInstance);

    _fullMapMarkers = {};
    pts.forEach(pt => {
      const meta = placeTypeMeta(pt.type);
      const state = getPlaceState(pt.date, pt.name);
      const icon = L.divIcon({
        html: `<div class="map-pin" style="background:${meta.color}${state.visited ? ';opacity:.5' : ''}"><span>${state.favorite ? '★' : meta.icon}</span></div>`,
        iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34],
        className: ''
      });
      const marker = L.marker([pt.lat, pt.lng], { icon, title: pt.name, alt: pt.name }).addTo(mapInstance).bindPopup(buildPlacePopup(pt));
      _fullMapMarkers[placeKey(pt.date, pt.name)] = { marker, pt };
    });
  }, 120);
}

function refreshFullMapMarker(date, name) {
  const entry = _fullMapMarkers[placeKey(date, name)];
  if (!entry || !mapInstance) return;
  const { marker, pt } = entry;
  const meta = placeTypeMeta(pt.type);
  const state = getPlaceState(date, name);
  marker.setIcon(L.divIcon({
    html: `<div class="map-pin" style="background:${meta.color}${state.visited ? ';opacity:.5' : ''}"><span>${state.favorite ? '★' : meta.icon}</span></div>`,
    iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34],
    className: ''
  }));
  marker.setPopupContent(buildPlacePopup(pt));
}

let _geoWatchId = null;
let _youAreHereMarker = null;
let _nearMeFirstFix = false;

function stopNearMeTracking() {
  if (_geoWatchId != null) { navigator.geolocation.clearWatch(_geoWatchId); _geoWatchId = null; }
  if (_youAreHereMarker && mapInstance) { mapInstance.removeLayer(_youAreHereMarker); }
  _youAreHereMarker = null;
  const btn = document.querySelector('.map-nearme-btn');
  if (btn) { btn.classList.remove('map-nearme-btn-active'); btn.innerHTML = '📍 Cerca de mí'; }
  const panel = el('map-nearme-panel');
  if (panel) panel.style.display = 'none';
}

function updateNearMePanel(latitude, longitude) {
  const panel = el('map-nearme-panel');
  if (!panel) return;
  const trip = getTrip(currentTripId);
  const pts = collectMapPlaces(trip)
    .map(pt => ({ ...pt, dist: haversineMeters(latitude, longitude, pt.lat, pt.lng) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 8);
  panel.innerHTML = pts.map(pt => {
    const meta = placeTypeMeta(pt.type);
    return `<div class="map-nearme-item" onclick="mapInstance.setView([${pt.lat},${pt.lng}],16); _fullMapMarkers['${placeKey(pt.date, pt.name).replace(/'/g, "\\'")}']?.marker.openPopup();">
      <span>${meta.icon}</span>
      <span class="mni-name">${pt.name}</span>
      <span class="mni-dist">${formatDistance(pt.dist)}</span>
    </div>`;
  }).join('') || '<div class="map-nearme-loading">Sin sitios geolocalizados cerca.</div>';
}

function showNearMe() {
  const panel = el('map-nearme-panel');
  if (!panel) return;
  // Si ya está siguiendo en vivo, el botón lo detiene
  if (_geoWatchId != null) { stopNearMeTracking(); return; }
  if (!navigator.geolocation) {
    panel.style.display = 'block';
    panel.innerHTML = `<div class="map-nearme-loading">Geolocalización no disponible en este navegador.</div>`;
    return;
  }
  panel.style.display = 'block';
  panel.innerHTML = `<div class="map-nearme-loading">📡 Buscando tu ubicación…</div>`;
  _nearMeFirstFix = true;
  const btn = document.querySelector('.map-nearme-btn');
  if (btn) { btn.classList.add('map-nearme-btn-active'); btn.innerHTML = '🔴 Siguiendo en vivo — toca para parar'; }

  _geoWatchId = navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude, accuracy } = pos.coords;
    updateNearMePanel(latitude, longitude);
    if (mapInstance) {
      if (_youAreHereMarker) {
        _youAreHereMarker.setLatLng([latitude, longitude]);
      } else {
        _youAreHereMarker = L.circleMarker([latitude, longitude], {
          radius: 9, color: '#fff', weight: 3, fillColor: '#2b7fff', fillOpacity: 1, className: 'you-are-here-dot'
        }).addTo(mapInstance).bindPopup('📍 Estás aquí' + (accuracy ? ` (±${Math.round(accuracy)}m)` : ''));
      }
      if (_nearMeFirstFix) { mapInstance.setView([latitude, longitude], 15); _nearMeFirstFix = false; }
    }
  }, err => {
    panel.innerHTML = `<div class="map-nearme-loading">No se pudo obtener tu ubicación (${err.message}). Actívala en el navegador.</div>`;
    stopNearMeTracking();
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 });
}

// ══════════════════════════════════════════════════════════
//  VIEW: DOCUMENTOS
// ══════════════════════════════════════════════════════════

const DOC_CATEGORIES = {
  identificacion: { label: 'Identificación',  icon: '📋', color: '#e3f2fd' },
  vuelos:         { label: 'Vuelos',           icon: '✈️', color: '#e0f0ee' },
  transportes:    { label: 'Transportes',      icon: '🚌', color: '#e8f5e9' },
  reservas:       { label: 'Reservas',         icon: '🏨', color: '#fff3e0' },
  seguros:        { label: 'Seguros',          icon: '🔒', color: '#f5ecd9' },
  otros:          { label: 'Otros',            icon: '📄', color: '#f5f5f5' },
};

// ══════════════════════════════════════════════════════════
//  GASTRONOMÍA — Vista completa
// ══════════════════════════════════════════════════════════
const DISH_WIKI = {
  'Phở Bò':              'Phở',
  'Bún Chả':             'Bún chả',
  'Cà Phê Trứng':        'Cà phê trứng',
  'Chả Cá Lã Vọng':      'Chả cá Lã Vọng',
  'Bánh Cuốn':           'Bánh cuốn',
  'Bia Hơi':             'Bia hơi',
  'Cao Lầu':             'Cao lầu',
  'Bánh Mì':             'Bánh mì',
  'Mì Quảng':            'Mì Quảng',
  'Bún Bò Huế':          'Bún bò Huế',
  'White Rose':          'White rose dumpling',
  'Com Gà':              'Cơm gà',
  'Fish Amok':           'Amok (food)',
  'Lok Lak':             'Lok lak',
  'Khmer Red Curry':     'Cambodian cuisine',
  'Nom Banh Chok':       'Nom banh chok',
  'Kuy Teav':            'Kuy teav',
  'Pimienta de Kampot':  'Kampot pepper',
  'Marisco fresco a la brasa': 'Grilled seafood',
  'Fruta tropical':      'Tropical fruit',
  'Lok Lak & Pimienta Kampot': 'Lok lak',
  'Soupe Phnomoise':     'Cambodian cuisine',
  'Happy Pizza':         'Happy pizza',
};

const _dishPhotoCache = {};

function renderDocs() {
  const trip = getTrip(currentTripId);
  setHeader('Documentos', false);
  const docs = trip.documents || [];

  // Agrupar por categoría
  const grouped = {};
  Object.keys(DOC_CATEGORIES).forEach(k => { grouped[k] = []; });
  docs.forEach(d => {
    const cat = DOC_CATEGORIES[d.category] ? d.category : 'otros';
    grouped[cat].push(d);
  });

  const categorySections = Object.entries(grouped)
    .filter(([, items]) => items.length > 0)
    .map(([cat, items]) => {
      const cfg = DOC_CATEGORIES[cat];
      return `
        <div class="section-title">${cfg.icon} ${cfg.label}</div>
        ${items.map(doc => `
          <div class="doc-item2 ${doc.confirmed ? 'doc-confirmed' : 'doc-pending'}"
               ${doc.url ? `onclick="openDoc('${doc.id}')"` : ''}>
            <div class="doc2-icon" style="background:${cfg.color}">${cfg.icon}</div>
            <div class="doc2-body">
              <div class="doc2-name">${doc.name}</div>
              ${doc.notes ? `<div class="doc2-notes">${doc.notes}</div>` : ''}
              ${doc.date  ? `<div class="doc2-date">📅 ${formatDateShort(doc.date)}</div>` : ''}
            </div>
            <div class="doc2-right">
              ${doc.url
                ? `<span class="doc-status confirmed">🔗</span>`
                : `<button class="doc-add-url" onclick="event.stopPropagation();addDocUrl('${doc.id}')">+ Link</button>`}
              <div class="doc-confirm-check ${doc.confirmed ? 'on' : ''}" onclick="event.stopPropagation();toggleDocConfirmed('${doc.id}')">
                ${doc.confirmed ? '✓' : ''}
              </div>
            </div>
          </div>`).join('')}`;
    }).join('');

  // ── Visados multi-país ──
  const visaSection = `
    <div class="section-title">🛃 Visados</div>
    <div class="visa-grid">
      <div class="visa-card visa-vn">
        <div class="visa-country">${flagText('🇻🇳')} Vietnam</div>
        <div class="visa-name">Sin visado</div>
        <div class="visa-detail">Exención · pasaporte español · hasta 45 días</div>
        <div class="visa-steps">
          <div class="visa-step">1. Dentro de los 3 días antes de llegar, entra en prearrival.immigration.gov.vn</div>
          <div class="visa-step">2. Rellena la Digital Arrival Card con los datos del pasaporte y del vuelo</div>
          <div class="visa-step">3. Guarda el código QR en el móvil (o impreso)</div>
          <div class="visa-step">4. En inmigración, cola general «Foreigners»: pasaporte + QR</div>
          <div class="visa-step">5. Se entra dos veces (7-nov y 16-nov por el Mekong): comprobar si hay que repetir el registro para la segunda</div>
        </div>
        <div class="visa-warning">⚠️ Pasaporte con mínimo 6 meses de vigencia (hasta mayo de 2027) y 2-3 páginas libres</div>
      </div>
      <div class="visa-card visa-kh">
        <div class="visa-country">${flagText('🇰🇭')} Camboya</div>
        <div class="visa-name">e-Visa Camboya</div>
        <div class="visa-detail">~36 USD · online · 30 días</div>
        <div class="visa-steps">
          <div class="visa-step">1. Accede a evisa.gov.kh</div>
          <div class="visa-step">2. Sube foto pasaporte y foto personal</div>
          <div class="visa-step">3. Paga 36 USD con tarjeta</div>
          <div class="visa-step">4. Recibe aprobación en 3 días hábiles</div>
          <div class="visa-step">5. Imprime 2 copias por persona (una al entrar y otra al salir)</div>
          <div class="visa-step">6. Rellena la Digital Arrival Card en arrival.gov.kh (7 días antes) y guarda el QR</div>
        </div>
        <div class="visa-warning">⚠️ También disponible a la llegada pero hay colas largas. Online es más rápido.</div>
      </div>
    </div>`;

  // ── Emergencias ──
  // Datos de emergencia: embajadas (DB.contacts) y teléfonos locales (DB.localEmergency) de data.js.
  // (Antes leía window.EMERGENCY_DATA, que no existía: la sección salía vacía.)
  const embassies = DB.contacts || [];
  const localEm   = DB.localEmergency || [];
  const tel = n => `<a class="em-phone" href="tel:${(n || '').replace(/\s+/g, '')}">${n}</a>`;
  const emergencySection = `
    <div class="section-title">🆘 Datos de emergencia</div>
    <div class="emergency-card">
      <div class="em-block">
        <div class="em-title">🚨 Emergencias locales</div>
        ${localEm.map(e => `
          <div class="em-row em-phone-row">
            <span class="em-who">${flagText(e.country)}</span>
            <span class="em-val">Policía ${tel(e.police)} · Ambulancia ${tel(e.ambulance)} · Bomberos ${tel(e.fire)}</span>
          </div>`).join('')}
      </div>
      <div class="em-block">
        <div class="em-title">${flagText('🇪🇸')} Embajada y consulado de España</div>
        ${embassies.map(e => `
          <div class="em-embassy">
            <div class="em-emb-country">${flagText(e.country)} — ${escHtml(e.name || '')}</div>
            <div class="em-emb-addr">${e.address}</div>
            <div class="em-row"><span class="em-who">Teléfono</span>${tel(e.phone)}</div>
            ${e.emergency ? `<div class="em-row"><span class="em-who">Emergencia 24h</span>${tel(e.emergency)}</div>` : ''}
            ${e.notes ? `<div class="em-note">${e.notes}</div>` : ''}
          </div>`).join('')}
      </div>
      <div class="em-block">
        <div class="em-title">🏥 Seguro médico y pasaportes</div>
        <div class="em-note">Por privacidad no se guardan aquí (el repositorio es público). Añade la póliza (con su teléfono de asistencia 24h) y las copias de los pasaportes en «Documentos», arriba, con un enlace a Google Drive.</div>
      </div>
    </div>`;

  el('view-content').innerHTML = `
    <div class="docs-hint">
      <span>💡</span>
      <span>Sube tus documentos a <strong>Google Drive</strong>, compártelos y pega el enlace con <em>"+ Link"</em>. Un toque los abre.</span>
    </div>

    ${visaSection}

    <div class="section-title">📁 Documentos</div>
    ${categorySections || `<div class="empty-state"><span class="empty-icon">📁</span><p>No hay documentos aún.</p></div>`}

    <div style="padding:12px 16px">
      <button onclick="addNewDoc()" class="add-doc-btn">+ Añadir documento</button>
    </div>

    ${emergencySection}

    <div style="height:80px"></div>`;
}

function openDoc(docId) {
  const trip = getTrip(currentTripId);
  const doc = (trip.documents || []).find(d => d.id === docId);
  if (doc && doc.url) window.open(doc.url, '_blank');
}

function addDocUrl(docId) {
  const url = prompt('Pega el enlace del documento (Google Drive, PDF online, etc.):');
  if (!url) return;
  const trip = getTrip(currentTripId);
  const doc = (trip.documents || []).find(d => d.id === docId);
  if (doc) { doc.url = url; save(); renderDocs(); }
}

function toggleDocConfirmed(docId) {
  const trip = getTrip(currentTripId);
  const doc = (trip.documents || []).find(d => d.id === docId);
  if (doc) { doc.confirmed = !doc.confirmed; save(); renderDocs(); }
}

function addNewDoc() {
  const name = prompt('Nombre del documento:');
  if (!name) return;
  const catKeys = Object.keys(DOC_CATEGORIES);
  const catList = catKeys.map((k, i) => `${i+1}. ${DOC_CATEGORIES[k].label}`).join('\n');
  const choice  = prompt(`Categoría:\n${catList}\n\nEscribe el número:`);
  const cat     = catKeys[(parseInt(choice) || 1) - 1] || 'otros';
  const trip    = getTrip(currentTripId);
  if (!trip.documents) trip.documents = [];
  trip.documents.push({ id: 'doc' + Date.now(), name, category: cat, notes: '', url: '', date: '', confirmed: false });
  save();
  renderDocs();
}

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════

// Pide al Service Worker que guarde para uso offline todas las fotos curadas del itinerario
// (solo si hay cobertura; las demás se guardan solas al verlas).
function precacheCuratedPhotos() {
  if (!('serviceWorker' in navigator) || !navigator.onLine) return;
  // Una vez al día por versión de datos: no repetir ~200 peticiones en cada apertura.
  const stamp = DATA_VERSION + ':' + new Date().toISOString().slice(0, 10);
  try { if (localStorage.getItem('precache-stamp') === stamp) return; } catch (_) {}
  navigator.serviceWorker.ready.then(async reg => {
    // Primera visita: el SW aún no controla la página, sus peticiones no se cachearían → esperar a la siguiente.
    if (!reg.active || !navigator.serviceWorker.controller) return;
    // Todas las fotos de fichas son ya archivos del propio sitio (img/fotos/*.jpg).
    const urls = new Set();
    const abs = rel => new URL(rel, location.href).href;
    DB.trips.forEach(t => (t.days || []).forEach(d =>
      [...(d.places || []), ...(d.restaurants || [])].forEach(p => {
        if (p.photo && !p.photo.includes('picsum')) urls.add(abs(p.photo));
      })));
    reg.active.postMessage({ type: 'precache', urls: [...urls] });
    try { localStorage.setItem('precache-stamp', stamp); } catch (_) {}
  }).catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  // Con un solo viaje guardado, nos saltamos "Mis Viajes" y vamos directos
  // a su portada. En cuanto haya más de uno, vuelve a mostrarse la lista.
  if (DB.trips.length === 1) {
    currentTripId = DB.trips[0].id;
    navigate('trip');
  } else {
    navigate('home');
  }
  setTimeout(precacheCuratedPhotos, 5000);
});
