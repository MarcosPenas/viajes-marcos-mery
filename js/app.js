// ============================================================
//  VIAJES MARCOS & MERY — App Principal
// ============================================================

// ── TEMA (claro / oscuro / auto) ─────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null
  if (saved) document.documentElement.dataset.theme = saved;
})();

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
    delete html.dataset.theme;
    localStorage.removeItem('theme');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
});

let DB = AppData.loadData();
let currentTripId = null;
let currentView = 'home';
let mapInstance = null;
let countdownTimer = null;
let _timeTravelDate = null; // null = fecha real; string 'YYYY-MM-DD' = simulación
let weatherCache = {};

// ── WIKIPEDIA PHOTO LOOKUP ─────────────────────────────────
const WIKI_ARTICLES = {
  // ── HANÓI — lugares ────────────────────────────────────────
  'Old Quarter — primera noche': 'Old_Quarter,_Hanoi',
  'Old Quarter': 'Old_Quarter,_Hanoi',
  'Lago Hoan Kiem y Templo Ngoc Son': 'Hoàn_Kiếm_Lake',
  'Lago Hoan Kiem': 'Hoàn_Kiếm_Lake',
  'Lago Hoan Kiem (despedida)': 'Hoàn_Kiếm_Lake',
  'Teatro de Marionetas de Agua Thang Long': 'Thăng_Long_Water_Puppet_Theatre',
  'Templo de la Literatura (Văn Miếu)': 'Temple_of_Literature,_Hanoi',
  'Templo de la Literatura': 'Temple_of_Literature,_Hanoi',
  'Mausoleo Ho Chi Minh y Pagoda de un Solo Pilar': 'Ho_Chi_Minh_Mausoleum',
  'Catedral de San José': 'Saint_Joseph\'s_Cathedral,_Hanoi',
  'Prisión Hoa Lo (Hanoi Hilton)': 'Hỏa_Lò_Prison',
  'Hanoi Train Street': 'Train_Street,_Hanoi',
  'Tren callejero de Hanói': 'Train_Street,_Hanoi',
  'Murales de Phùng Hưng (Street Art)': 'Street_art',
  'Isla de los Plátanos (Bãi Giữa)': 'Red_River_(Asia)',
  'Ciudadela Imperial de Thang Long': 'Imperial_Citadel_of_Thăng_Long',
  'Lago B-52 (Hữu Tiệp Lake)': 'Hữu_Tiệp_Lake',
  'Mercado Mayorista de Long Bien (madrugada)': 'Long_Biên_Bridge',
  'Lago Truc Bach y West Lake (Tây Hồ)': 'West_Lake_(Hanoi)',
  'Calle Phan Đình Phùng (La más bonita de Hanói)': 'Hanoi_Opera_House',
  'Compras en el Old Quarter': 'Old_Quarter,_Hanoi',
  'Masajes en Hanói': 'Hanoi',
  'Café de azotea sobre el Lago Hoan Kiem': 'Hoàn_Kiếm_Lake',
  'Último paseo — Old Quarter al amanecer': 'Old_Quarter,_Hanoi',
  'Última ruta de street food': 'Vietnamese_cuisine',
  'Ópera de Hanói': 'Hanoi_Opera_House',
  'Tren callejero (Train Street)': 'Train_Street,_Hanoi',

  // ── CAT BA ─────────────────────────────────────────────────
  'Canon Fort (mirador atardecer)': 'Lan_Ha_Bay',
  'Lan Ha Sky Bar — Flamingo Resort': 'Lan_Ha_Bay',
  'Ruta de playas Cat Co (1, 2 y 3)': 'Cát_Bà_island',
  'Playa salvaje de Tung Thu': 'Cát_Bà_island',
  'Hospital Cave (refugio militar subterráneo)': 'Cát_Bà_National_Park',
  'Cueva Trung Trang': 'Cát_Bà_National_Park',
  'Ngu Lam Peak (mirador alternativo)': 'Lan_Ha_Bay',
  'Parque Nacional Cat Ba': 'Cát_Bà_National_Park',
  'Miradores de Cat Ba': 'Lan_Ha_Bay',

  // ── LAN HA BAY ─────────────────────────────────────────────
  'Bahía de Lan Ha — crucero 2D/1N': 'Lan_Ha_Bay',
  'Kayak en cuevas de Lan Ha': 'Lan_Ha_Bay',
  'Aldea de Viet Hai (día 2)': 'Lan_Ha_Bay',
  'Lan Ha Bay': 'Lan_Ha_Bay',
  'Bahía de Lan Ha': 'Lan_Ha_Bay',
  'Cuevas de Lan Ha': 'Lan_Ha_Bay',

  // ── NINH BINH ──────────────────────────────────────────────
  'Llegada a Tam Coc — primer paseo en bici': 'Tam_Coc-Bích_Động',
  'Hang Mua (Monte Mua)': 'Mua_Cave',
  'Hang Mua': 'Mua_Cave',
  'Sampán por Tam Coc (3 cuevas)': 'Tam_Coc-Bích_Động',
  'Tam Coc': 'Tam_Coc-Bích_Động',
  'Pagoda Bich Dong': 'Bích_Động_Pagoda',
  'Trang An (barca y cuevas UNESCO)': 'Tràng_An',
  'Trang An': 'Tràng_An',
  'Ciudadela de Hoa Lu (antigua capital)': 'Hoa_Lư',
  'Pagoda Bai Dinh': 'Bái_Đính_Pagoda',
  'Parque Nacional de Cuc Phuong (opcional)': 'Cúc_Phương_National_Park',

  // ── HUE ────────────────────────────────────────────────────
  'Ciudad Imperial de Hue': 'Imperial_City,_Huế',
  'Pagoda Thien Mu': 'Thiên_Mụ_Pagoda',
  'Río Perfume + Dragon Boat': 'Perfume_River',
  'Río Perfume': 'Perfume_River',
  'Mercado Dong Ba': 'Đông_Ba_Market',
  'Tumba Imperial de Minh Mang': 'Tomb_of_Minh_Mạng',
  'Tumba Imperial de Khai Dinh': 'Tomb_of_Khải_Định',
  'Tumba Imperial de Tu Duc': 'Tomb_of_Tự_Đức',
  'Calle del Incienso de Thuy Xuan': 'Perfume_River',
  'Ho Thuy Tien (parque acuático abandonado)': 'Hồ_Thủy_Tiên',
  'Ho Thuy Tien (Parque abandonado)': 'Hồ_Thủy_Tiên',
  'Cementerio City of Ghosts (Đàn Nam Giao)': 'Imperial_City,_Huế',
  'Puente Thanh Toan (el Puente Japonés de Hue)': 'Thanh_Toàn_Bridge',
  'Pagodas de Hue': 'Thiên_Mụ_Pagoda',

  // ── DA NANG ────────────────────────────────────────────────
  'Marble Mountains (Ngũ Hành Sơn)': 'Marble_Mountains_(Vietnam)',
  'Marble Mountains': 'Marble_Mountains_(Vietnam)',
  'Puente del Dragón de Da Nang': 'Dragon_Bridge_(Đà_Nẵng)',
  'Puente del Dragón': 'Dragon_Bridge_(Đà_Nẵng)',

  // ── HOI AN ─────────────────────────────────────────────────
  'Hoi An Old Town — primera noche': 'Hội_An',
  'Casco Antiguo — Bono Old Quarter': 'Hội_An',
  'Casco Antiguo de Hoi An': 'Japanese_Covered_Bridge',
  'Old Town Hoi An': 'Hội_An',
  'Última mañana en el Old Town': 'Japanese_Covered_Bridge',
  'Puente Cubierto Japonés (Chua Cau)': 'Japanese_Covered_Bridge',
  'Calle Trần Phú — azoteas y Mot Hoi An': 'Hội_An',
  'Hoi An Memories Show': 'Hội_An',
  'Aldea de cerámica de Thanh Ha': 'Mỹ_Sơn',
  'Ruta en bici a la playa An Bang': 'An_Bàng_Beach',
  'Playa An Bang': 'An_Bàng_Beach',
  'Ruta en bici isla de Cam Kim': 'An_Bàng_Beach',
  'Ba Na Hills (opcional)': 'Bà_Nà_Hills',
  'Clase de cocina en isla Thuan Tinh': 'Hội_An',
  'Mercados de Hoi An': 'Hội_An',
  'Santuario de My Son': 'Mỹ_Sơn',
  'Talleres artesanales Hoi An': 'Japanese_Covered_Bridge',

  // ── SIEM REAP / ANGKOR ─────────────────────────────────────
  'Wat Preah Prom Rath': 'Siem_Reap',
  'Pub Street y Old Market': 'Siem_Reap',
  'Pub Street': 'Siem_Reap',
  'Le Pain Du Coeur': 'Siem_Reap',
  'Angkor Wat': 'Angkor_Wat',
  'Angkor Thom — Bayon y la Gran Ciudad': 'Angkor_Thom',
  'Ta Prohm (Templo Tomb Raider)': 'Ta_Prohm',
  'Ta Prohm': 'Ta_Prohm',
  'Amanecer en Angkor Wat (2º día)': 'Angkor_Wat',
  'Preah Khan (La Espada Sagrada)': 'Preah_Khan',
  'Neak Pean (Templo-Isla)': 'Neak_Poan',
  'Banteay Srei (La Joya de Angkor)': 'Banteay_Srei',
  'Pre Rup (atardecer)': 'Pre_Rup',
  'Ta Som': 'Ta_Som',
  'Srah Srang (El Estanque Real)': 'Srah_Srang',
  'Banteay Kdei (El Monasterio de las Celdas)': 'Banteay_Kdei',
  'Banteay Samré (El Templo del Rey Sambor)': 'Banteay_Samré',
  'El Mebon Oriental (Los Elefantes en el Islote)': 'East_Mebon',
  'Beng Mealea (templo devorado por la selva)': 'Beng_Mealea',
  'Beng Mealea': 'Beng_Mealea',
  'Grupo Roluos (orígenes de Angkor)': 'Roluos',
  'Templos a elegir': 'Preah_Khan',
  'Mercado de Angkor Night Market': 'Siem_Reap',

  // ── KOH RONG SANLOEM ───────────────────────────────────────
  'Saracen Bay': 'Koh_Rong_Saloem',
  'Sunset Beach': 'Koh_Rong',
  'Lazy Beach': 'Koh_Rong_Saloem',
  'M\'Pai Bay (pueblo local)': 'Koh_Rong',
  'Koh Rong Sanloem': 'Koh_Rong_Saloem',
  'Playa principal': 'Koh_Rong_Saloem',
  // Koh Rong (isla grande, día 25)
  'Trekking al Faro Militar (la más épica)': 'Koh_Rong',
  'Plancton Bioluminiscente (noche)': 'Bioluminescence',

  // ── PHNOM PENH ─────────────────────────────────────────────
  'Riverside (Siskiwath Quay)': 'Sisowath_Quay',
  'Central Market (Phsar Thmei)': 'Central_Market,_Phnom_Penh',
  'Tuol Sleng S-21 (Museo del Genocidio)': 'Tuol_Sleng_Genocide_Museum',
  'Choeung Ek (The Killing Fields)': 'Choeung_Ek',
  'Palacio Real y Pagoda de Plata': 'Royal_Palace,_Phnom_Penh',
  'Mercado Ruso (Tuol Tom Poung)': 'Russian_Market',
  'Wat Phnom': 'Wat_Phnom',
  'Museo Nacional de Camboya': 'National_Museum_of_Cambodia',
  'Monumento a la Independencia': 'Independence_Monument_(Phnom_Penh)',
  'Orillas del Mekong': 'Sisowath_Quay',
  'Museo del Genocidio Tuol Sleng (S-21)': 'Tuol_Sleng_Genocide_Museum',
  'Killing Fields de Choeung Ek': 'Choeung_Ek',

  // ── RESTAURANTES / PLATOS ───────────────────────────────────
  'Café Giang': 'Cà_phê_trứng',
  'Café Giang (Café de Huevo)': 'Cà_phê_trứng',
  'Café Phố Cổ (azotea secreta sobre el lago)': 'Hoàn_Kiếm_Lake',
  'Bún Chả Hương Liên (Obama Restaurant)': 'Bún_chả',
  'Bún Chả Hương Liên': 'Bún_chả',
  'Phở Cuốn Hương Mai': 'Phở',
  'The Note Coffee': 'Hanoi',
  'Street food Old Quarter': 'Vietnamese_cuisine',
  'Cà Phê Trứng': 'Cà_phê_trứng',
  'Bún chả Hương Liên': 'Bún_chả',
  'Pho Thin': 'Vietnamese_cuisine',
  'Phở Bò': 'Phở',
  'Bún bò Nam Bộ': 'Bún_bò_Nam_Bộ',
  'Chả cá Lã Vọng': 'Chả_cá_Lã_Vọng',
  'Bánh mì Phượng': 'Bánh_mì',
  'Bánh Mì': 'Bánh_xèo',
  'White Rose (Bánh Bao Vạc)': 'Bánh_bao_vạc',
  'White Rose Restaurant': 'Hội_An',
  'Cao Lau (Quán Cao Lầu Thanh)': 'Cao_lầu',
  'Cao Lầu Thanh': 'Cao_lầu',
  'Cao Lau': 'Cao_lầu',
  'Cơm Gà Bà Buội (arroz con pollo)': 'Vietnamese_cuisine',
  'Mì Quảng Bà Mua': 'Mì_Quảng',
  'Bún bò Huế': 'Bún_bò_Huế',
  'Cơm hến': 'Cơm_hến',
  'Mahob Khmer Restaurant': 'Fish_amok',
  'Cuisine Wat Damnak': 'Cambodian_cuisine',
  'Sugar Palm': 'Loc_lac',
  'Amok': 'Fish_amok',
  'Fish Amok': 'Fish_amok',
  'Le Pain Du Coeur': 'Siem_Reap',
  'Restaurante en la playa': 'Seafood',
  'Restaurante junto al Mekong': 'Sisowath_Quay',
  'Sovanna Restaurant': 'Nom_banh_chok',
  'Última ruta de street food': 'Vietnamese_cuisine',

  // ── PLATOS NUEVOS POR DÍA ──────────────────────────────────
  // Cat Ba
  'Mariscos frescos del puerto de Cat Ba': 'Cat_Ba_Island',
  'Chả Mực (tortilla de calamar Cat Ba)': 'Squid_as_food',
  'Phở o Bún Bò Nam Bộ (cocina vietnamita del norte)': 'Phở',
  // Lan Ha
  'Banquete a bordo del crucero (incluido)': 'Lan_Ha_Bay',
  // Ninh Binh
  'Thịt Dê Nướng (cabra a la parrilla)': 'Goat_meat',
  'Cơm Cháy (arroz tostado crujiente)': 'Rice_crust',
  'Cena ligera antes del bus nocturno': 'Vietnamese_cuisine',
  // Hue
  'Bún Bò Huế (sopa picante de Hue)': 'Bún_bò_Huế',
  'Bánh Khoái (crepe crujiente de Hue)': 'Huế',
  'Bánh Bèo + Bánh Nậm + Bánh Lọc (trío imperial)': 'Bánh_bèo',
  'Cơm Hến (arroz con almejas de Hue)': 'Cơm_hến',
  // Da Nang / Hoi An
  'Mì Quảng (fideos de cúrcuma, plato del Centro)': 'Mì_Quảng',
  'Bánh Mì de viaje en tren': 'Vietnamese_cuisine',
  'Bánh Mì Phượng (el mejor Bánh Mì del mundo, en Hoi An)': 'Bánh_mì',
  'Mì Quảng o Cao Lầu (primer plato de Hoi An)': 'Mì_Quảng',
  'Bánh Xèo (crepe crocante vietnamita)': 'Bánh_xèo',
  'Bánh Mì Phượng (para el camino a la playa)': 'Bánh_mì',
  'Último desayuno vietnamita (Hoi An)': 'Bánh_bèo',
  // Angkor / Camboya
  'Fish Amok (curry jemer en hoja de coco)': 'Fish_amok',
  'Lok Lak (ternera salteada camboyana)': 'Loc_lac',
  'Kuy Teav (sopa de fideos jemer del desayuno)': 'Kuy_teav',
  'Num Banh Chok (fideos jemer al amanecer)': 'Nom_banh_chok',
  'Amok de pollo o verduras (cena en Pub Street)': 'Cambodian_cuisine',
  'Khmer BBQ (última noche en Siem Reap)': 'Bai_sach_chrouk',
  // Koh Rong
  'Mariscos frescos a la brasa (Saracen Bay)': 'Seafood',
  'Cena a la luz de las velas en la playa': 'Seafood',
  'Comida post-trekking (bar de playa)': 'Tropical_fish',
  // Phnom Penh
  'Bai Sach Chrouk (cerdo a la brasa, desayuno de Phnom Penh)': 'Bai_sach_chrouk',
  'Lap Khmer (ceviche camboyano de ternera)': 'Cambodian_cuisine',
  'Nom Banh Chok (desayuno ligero antes del S-21)': 'Nom_banh_chok',
  'Cena jemer junto al Mekong (última en Camboya)': 'Phnom_Penh',
  // Hanói regreso
  'Phở Gà o Phở Bò (desayuno de reencuentro con Vietnam)': 'Vietnamese_cuisine',
  'Chả Cá Lã Vọng (el único plato del restaurante más antiguo de Hanói)': 'Chả_cá_Lã_Vọng',
  'Último Phở o Bánh Mì antes del vuelo': 'Bánh_mì',
};

const _wikiCache = {};

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

// Busca en Wikimedia Commons cuando no hay artículo en WIKI_ARTICLES
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

// Trae hasta N imágenes de Commons para un carrusel
async function _searchCommonsImages(query, limit = 8) {
  const key = '__carousel__' + query;
  if (_wikiCache[key]) return _wikiCache[key];
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search`
      + `&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}`
      + `&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query?.pages || {});
    const urls = pages
      .map(p => p.imageinfo?.[0]?.url)
      .filter(u => u && u.match(/\.(jpg|jpeg)/i));
    _wikiCache[key] = urls;
  } catch(e) { _wikiCache[key] = []; }
  return _wikiCache[key];
}

// Rellena un contenedor con un carrusel de fotos reales
async function loadCarousel(carouselEl, dotsEl, placeName) {
  if (!carouselEl.isConnected) return;

  // 1. Mostrar imagen local inmediatamente si existe
  const article = WIKI_ARTICLES[placeName];
  const localUrls = [];
  // IMAGE_MAP tiene prioridad: imagen única por lugar
  const mappedUrl = window.IMAGE_MAP && window.IMAGE_MAP[placeName];
  if (mappedUrl) {
    const ok = await new Promise(res => { const p = new Image(); p.onload = () => res(true); p.onerror = () => res(false); p.src = mappedUrl; });
    if (ok) localUrls.push(mappedUrl);
  }
  if (!localUrls.length && article) {
    const localSlug = _localImgSlug(article);
    const localUrl = `img/places/${localSlug}.jpg`;
    const ok = await new Promise(res => {
      const p = new Image(); p.onload = () => res(true); p.onerror = () => res(false); p.src = localUrl;
    });
    if (ok) localUrls.push(localUrl);
  }

  // Mostrar local de inmediato sin esperar red
  if (localUrls.length && carouselEl.isConnected) {
    _renderCarousel(carouselEl, dotsEl, localUrls, placeName);
  }

  // 2. Ampliar con imágenes de Commons en segundo plano (usar el artículo Wikipedia, no el nombre español)
  const thumbBase = localUrls[0]?.split('/').pop() || '';
  const searchTerm = article ? article.replace(/_/g, ' ') : placeName;
  const extras = await _searchCommonsImages(searchTerm, 10);
  const onlineUrls = extras.filter(u => u.split('/').pop().split('?')[0] !== thumbBase).slice(0, 7);

  const urls = [...localUrls, ...onlineUrls];
  if (urls.length > localUrls.length && carouselEl.isConnected) {
    _renderCarousel(carouselEl, dotsEl, urls, placeName);
  }
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
  // 1b. IMAGE_MAP — imagen única por nombre de lugar (mayor prioridad que artículo Wikipedia)
  const mappedUrl = window.IMAGE_MAP && window.IMAGE_MAP[placeName];
  if (mappedUrl) {
    const probe = new Image();
    const ok = await new Promise(res => { probe.onload = () => res(true); probe.onerror = () => res(false); probe.src = mappedUrl; });
    if (ok && imgEl.isConnected) { imgEl.onload = () => imgEl.classList.add('loaded'); imgEl.src = mappedUrl; return; }
  }
  // 2. Imagen local descargada en img/places/<slug>.jpg
  // article: desde WIKI_ARTICLES o el propio placeName si es un artículo directo (ej. círculos de zona)
  const article = WIKI_ARTICLES[placeName] || placeName;
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

function placeIcon(type) {
  const icons = { monument:'📍', restaurant:'🍜', cafe:'☕', hotel:'🏨',
    airport:'✈️', station:'🚆', city:'📍', other:'📌' };
  return icons[type] || '📍';
}

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
    b.classList.toggle('active', b.dataset.view === view);
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
    backBtn.onclick = () => navigate('itinerary');
  } else {
    backBtn.classList.remove('visible');
    backBtn.onclick = null;
  }
}

// ── RENDER DISPATCHER ──────────────────────────────────────

function renderView(view, extra) {
  const content = el('view-content');
  content.scrollTop = 0;
  content.classList.remove('fade-in');
  void content.offsetWidth;
  content.classList.add('fade-in');

  if (view !== 'map' && mapInstance) { mapInstance.remove(); mapInstance = null; }

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

// Destinos del viaje con medias históricas de noviembre (fallback offline)
const WEATHER_DESTINATIONS = [
  { label: 'Hanói',        query: 'Hanoi,Vietnam',        block: 'El Norte',  offline: { temp:'23', max:'27', min:'19', icon:'⛅', desc:'Parcialmente nublado', humidity:'75' } },
  { label: 'Cat Ba',       query: 'Cat Ba,Vietnam',       block: 'El Norte',  offline: { temp:'22', max:'26', min:'18', icon:'🌤️', desc:'Mayormente despejado', humidity:'78' } },
  { label: 'Ninh Binh',   query: 'Ninh Binh,Vietnam',   block: 'El Norte',  offline: { temp:'23', max:'27', min:'19', icon:'⛅', desc:'Nublado variable', humidity:'77' } },
  { label: 'Hue',          query: 'Hue,Vietnam',          block: 'El Centro', offline: { temp:'24', max:'28', min:'20', icon:'🌦️', desc:'Lluvias ocasionales', humidity:'82' } },
  { label: 'Da Nang',      query: 'Da Nang,Vietnam',      block: 'El Centro', offline: { temp:'25', max:'29', min:'21', icon:'🌤️', desc:'Soleado con nubes', humidity:'74' } },
  { label: 'Hoi An',       query: 'Hoi An,Vietnam',       block: 'El Centro', offline: { temp:'25', max:'29', min:'21', icon:'☀️', desc:'Soleado', humidity:'72' } },
  { label: 'Siem Reap',    query: 'Siem Reap,Cambodia',   block: 'Camboya',   offline: { temp:'28', max:'32', min:'22', icon:'☀️', desc:'Seco y soleado', humidity:'60' } },
  { label: 'Koh Rong',     query: 'Koh Rong,Cambodia',    block: 'Islas',     offline: { temp:'29', max:'31', min:'25', icon:'🌴', desc:'Tropical y cálido', humidity:'68' } },
  { label: 'Phnom Penh',   query: 'Phnom Penh,Cambodia',  block: 'El Cierre', offline: { temp:'29', max:'33', min:'23', icon:'☀️', desc:'Caluroso y seco', humidity:'58' } },
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
  'Koh Rong':   'Koh_Rong_Samloem',
  'Phnom Penh': 'Phnom_Penh',
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

  const inBlock  = WEATHER_DESTINATIONS.filter(d => d.block === currentBlock);
  const outBlock = WEATHER_DESTINATIONS.filter(d => d.block !== currentBlock);
  return [...inBlock, ...outBlock];
}

const WEATHER_CITY_COORDS = {
  'Santiago de Compostela': [42.8782, -8.5448],
  'Hanoi':                  [21.0285,  105.8542],
  'Ho Chi Minh City':       [10.8231,  106.6297],
  'Hoi An':                 [15.8801,  108.3380],
  'Hue':                    [16.4637,  107.5909],
  'Siem Reap':              [13.3671,  103.8448],
  'Phnom Penh':             [11.5564,  104.9282],
  'Ha Long':                [20.9101,  107.1839],
  'Ninh Binh':              [20.2539,  105.9750],
  'Da Nang':                [16.0544,  108.2022],
};
let _wcMapInstance = null;
let _wcMapTileAdded = false;

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
      <div class="wc-map" id="wc-map"></div>
    </div>`;
}

function initWeatherMap(label) {
  const mapEl = document.getElementById('wc-map');
  if (!mapEl || typeof L === 'undefined') return;
  const coords = WEATHER_CITY_COORDS[label];
  if (!coords) { mapEl.style.display = 'none'; return; }
  mapEl.style.display = 'block';
  if (_wcMapInstance) {
    _wcMapInstance.off(); _wcMapInstance.remove(); _wcMapInstance = null;
  }
  const map = L.map(mapEl, { zoomControl: false, dragging: false, scrollWheelZoom: false,
    doubleClickZoom: false, attributionControl: false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 13 }).addTo(map);
  map.setView(coords, 11);
  L.circleMarker(coords, { radius: 7, color: '#fff', fillColor: '#60a5fa', fillOpacity: 1, weight: 2 }).addTo(map);
  _wcMapInstance = map;
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
  'Visados':      'Vietnam: <strong>e-Visa online</strong> antes de salir (25 USD). Camboya: <strong>e-Visa online</strong> (36 USD) o a la llegada. Ambos necesitan pasaporte con <strong>mínimo 6 meses de vigencia</strong>.',
};

// ══════════════════════════════════════════════════════════
//  VIEW: INICIO / TRIP DASHBOARD (con tiempo)
// ══════════════════════════════════════════════════════════

async function renderTripDashboard() {
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
  setInterval(() => {
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
      // Init map after DOM is painted
      setTimeout(() => initWeatherMap(r.label), 60);
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
  wTimer = setInterval(() => { wIdx++; showWeatherCity(wIdx, false); }, 15000);

  // Reemplazar datos offline con reales cuando lleguen
  allCities.forEach((c, i) => {
    fetchWeather(c.query).then(w => {
      if (w) resolved[i].data = w;
    });
  });

  // ── Tick del reloj dual ──
  tickDualClock(trip);
  setInterval(() => tickDualClock(trip), 10000);

  // ── Inicializar conversor ──
  const langNow = getCurrentCountry(trip);
  if (langNow === 'km') { _fxRate = FX_RATES.KHR.perEur; }
  else { _fxRate = FX_RATES.VND.perEur; }

  // ── Tips rotantes con gradiente ──
  const tips = trip.travelTips || [];
  const tipGrads = [
    'linear-gradient(135deg,#1a3a5c,#2d6a8f)',
    'linear-gradient(135deg,#1b4332,#2d6a4f)',
    'linear-gradient(135deg,#3d2c5c,#6b46a1)',
    'linear-gradient(135deg,#7b3f00,#b5560d)',
    'linear-gradient(135deg,#0d3b4f,#1a7a8a)',
    'linear-gradient(135deg,#4a1942,#8b3a7e)',
    'linear-gradient(135deg,#1a3a5c,#2d6a8f)',
    'linear-gradient(135deg,#1b4332,#2d6a4f)',
    'linear-gradient(135deg,#3d2c5c,#6b46a1)',
    'linear-gradient(135deg,#7b3f00,#b5560d)',
    'linear-gradient(135deg,#0d3b4f,#1a7a8a)',
    'linear-gradient(135deg,#4a1942,#8b3a7e)',
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
        tipTimer = setInterval(() => { tipIdx++; showTip(tipIdx); }, 7000);
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
    var tipTimer = setInterval(() => { tipIdx++; showTip(tipIdx); }, 7000);
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
    if (d) return d.city;
    const next = trip.days.find(day => day.date > t);
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
  VND: { name: 'Dong vietnamita', cc: 'vn', symbol: '₫', perEur: 27000 },
  KHR: { name: 'Riel camboyano',  cc: 'kh', symbol: '៛', perEur: 4400  },
  USD: { name: 'Dólar USA',       cc: 'us', symbol: '$', perEur: 1.08  },
};
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
                 inputmode="decimal" oninput="calcFXFrom('eur')">
        </div>
        <div class="currency-divider">↕</div>
        <div class="currency-input-row">
          <div class="currency-local-badge" id="fx-local-badge">${flagImg(mainCur.cc, 24)} ${mainCur.symbol} ${mainCur.key}</div>
          <input class="currency-input" id="fx-local" type="number" placeholder="0"
                 inputmode="decimal" oninput="calcFXFrom('local')">
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
  const blocks = [...new Set(allDays.map(d => d.block).filter(Boolean))];
  const pastBlocks = new Set(allDays.filter(d => d.date < t).map(d => d.block).filter(Boolean));
  if (dayNum >= 0) pastBlocks.add(allDays[dayNum].block);

  // Países
  const countryByDay = allDays.map(d => d.country || '');
  const countries = [...new Set(countryByDay.filter(Boolean))];
  const doneCountries = new Set(allDays.filter(d => d.date <= t).map(d => d.country).filter(Boolean));

  // Noches por país
  const nightsVI = allDays.filter(d => (d.country||'').toLowerCase().includes('vietnam')).length;
  const nightsKH = allDays.filter(d => (d.country||'').toLowerCase().includes('camboy')||
    (d.country||'').toLowerCase().includes('cambodia')||
    (d.country||'').toLowerCase().includes('camboya')).length;

  // Tránsitos
  const transits = window.TRIP_TRANSITS || [];
  const doneTransits = transits.filter(tr => tr.date <= t);
  const pendingTransits = transits.filter(tr => tr.date > t);
  const nextTransit = pendingTransits[0];
  const flights = transits.filter(tr => tr.type === 'flight');
  const trains  = transits.filter(tr => tr.type === 'train');
  const buses   = transits.filter(tr => tr.type === 'bus' || tr.type === 'ferry');
  const doneFlights = doneTransits.filter(tr => tr.type === 'flight').length;
  const doneTrains  = doneTransits.filter(tr => tr.type === 'train').length;
  const doneBuses   = doneTransits.filter(tr => tr.type === 'bus' || tr.type === 'ferry').length;
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
          <div class="stat2-flags">🇻🇳 ${nightsVI}n &nbsp; 🇰🇭 ${nightsKH}n</div>
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
            <div class="stat2-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 21 9 3"/><path d="M19 21 15 3"/><path d="M6.8 15h10.4"/><path d="M8.5 9h7"/></svg></div>
            <div class="stat2-val">${kmDone.toLocaleString('es')}</div>
          </div>
          <div class="stat2-lbl">km recorridos</div>
          <div class="stat2-bar"><div class="stat2-bar-fill" style="width:${kmPct}%"></div></div>
          <div class="stat2-sub">de ${kmTotal.toLocaleString('es')} km totales</div>
        </div>

        <!-- Transportes -->
        <div class="stat2-card">
          <div class="stat2-lbl" style="margin-bottom:6px">Transportes</div>
          <div class="stat2-transit-row"><span>✈️</span><div class="stat2-tr-bar-wrap"><div class="stat2-tr-bar" style="width:${flights.length?Math.round(doneFlights/flights.length*100):0}%"></div></div><span class="stat2-tr-val">${doneFlights}/${flights.length}</span></div>
          <div class="stat2-transit-row"><span>🚆</span><div class="stat2-tr-bar-wrap"><div class="stat2-tr-bar" style="width:${trains.length?Math.round(doneTrains/trains.length*100):0}%"></div></div><span class="stat2-tr-val">${doneTrains}/${trains.length}</span></div>
          <div class="stat2-transit-row"><span>🚌</span><div class="stat2-tr-bar-wrap"><div class="stat2-tr-bar" style="width:${buses.length?Math.round(doneBuses/buses.length*100):0}%"></div></div><span class="stat2-tr-val">${doneBuses}/${buses.length}</span></div>
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
          <div class="snh-name">${nextHotel.hotel.name}${nextHotel.hotel.checkIn?' · Check-in '+nextHotel.hotel.checkIn:''}</div>
        </div>
      </div>` : ''}

    </div>`;
}

// ── DICCIONARIO DE SUPERVIVENCIA ───────────────────────────
function buildSurvivalDictHTML(trip) {
  if (!window.SURVIVAL_DICT) return '';
  const langKey = getCurrentCountry(trip) === 'km' ? 'km' : 'vi';
  const dict = window.SURVIVAL_DICT[langKey];
  if (!dict) return '';
  const phrases = dict.phrases;
  const langCC = { vi: 'vn', km: 'kh', th: 'th', ja: 'jp', zh: 'cn' }[langKey] || 'vn';
  const langName = langKey === 'vi' ? 'Vietnamita' : langKey === 'km' ? 'Jemer' : dict.lang;

  const cards = phrases.map(p => `
    <div class="dict-card">
      <div class="dict-es">${p.es}</div>
      <div class="dict-local">${p.local}</div>
      <div class="dict-pron">${p.pron}</div>
    </div>`).join('');

  return `
    <div class="dict-wrap">
      <div class="dict-header">
        <div class="dict-title">Frases de supervivencia</div>
        <div class="dict-lang-badge">${flagImg(langCC, 18)} ${langName}</div>
      </div>
      <div class="dict-scroll" id="dict-scroll">${cards}</div>
    </div>`;
}

// ── GASTRONOMÍA ────────────────────────────────────────────
function buildGastroHTML(block) {
  const dishes = (window.GASTRO_BY_BLOCK || {})[block];
  if (!dishes || !dishes.length) return '';
  return `
    <div class="section-title">🍽️ Qué comer aquí</div>
    <div class="gastro-scroll" style="padding:0 16px 6px">
      ${dishes.map(d => `
        <div class="gastro-card">
          <div class="gastro-emoji">${d.emoji}</div>
          <div class="gastro-name">${d.name}</div>
          <div class="gastro-desc">${d.desc}</div>
        </div>`).join('')}
    </div>`;
}

// ── TARJETAS CULTURALES ────────────────────────────────────
function buildCultureHTML(block) {
  const cards = (window.CULTURE_CARDS || {})[block];
  if (!cards || !cards.length) return '';
  return `
    <div class="section-title">📖 Cultura y contexto</div>
    <div class="culture-grid" style="padding:0 16px 8px">
      ${cards.map(c => `
        <div class="culture-card">
          <div class="culture-icon">${c.icon}</div>
          <div class="culture-title">${c.title}</div>
          <div class="culture-text">${c.text}</div>
        </div>`).join('')}
    </div>`;
}

// ── ALERTAS DE TRÁNSITO ────────────────────────────────────
function buildTransitAlertHTML(day) {
  if (!day || !day.transport || !day.transport.length) return '';
  const alerts = window.TRIP_TRANSITS || [];
  const todayTransit = alerts.filter(tr => tr.date === day.date && tr.notes);
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
        ${day.hotel && day.hotel.name ? `<div style="margin-top:8px;font-size:13px;color:var(--text-sm)">🏨 ${day.hotel.name}${day.hotel.checkIn ? ' · Check-in ' + day.hotel.checkIn : ''}</div>` : ''}
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
    'El Norte':   { color: '#1A7B6B', lt: '#d0f0e8', label: 'Vietnam Norte',   wiki: 'Lan_Ha_Bay',
                    desc: 'Hanói, Cat Ba, Lan Ha Bay y Ninh Binh. La esencia del norte: bahías cársticas, templos milenarios y pho auténtico.' },
    'El Centro':  { color: '#D4581A', lt: '#fde8d8', label: 'Vietnam Centro',   wiki: 'Hội_An',
                    desc: 'Hue, Da Nang y Hoi An. El tren panorámico HD3 por el Hai Van Pass, la ciudad imperial y los farolillos de seda.' },
    'Angkor':     { color: '#C1513A', lt: '#fde0da', label: 'Angkor & Siem Reap', wiki: 'Angkor_Wat',
                    desc: 'Siem Reap y los templos de Angkor. La civilización jemer en todo su esplendor: Angkor Wat al amanecer y la jungla infinita.' },
    'Koh Rong':   { color: '#0090C4', lt: '#cceeff', label: 'Koh Rong Sanloem', wiki: 'Koh_Rong_Saloem',
                    desc: 'La isla paradisíaca de Camboya. Playas de arena blanca, bioluminiscencia nocturna y el ritmo caribeño del Sudeste Asiático.' },
    'Phnom Penh': { color: '#8B5E3C', lt: '#f5e6d8', label: 'Phnom Penh',       wiki: 'Phnom_Penh',
                    desc: 'Capital de Camboya junto al Mekong. Historia jemer, mercados vivaces y la despedida del sudeste asiático antes del vuelo de regreso.' },
    'El Cierre':  { color: '#6B4FAE', lt: '#e8e0f8', label: 'El Cierre · Hanói', wiki: 'Hanoi',
                    desc: 'Los últimos días en Hanói antes de volar a casa. Phở de regreso, Chả Cá y los recuerdos del viaje de vuestra vida.' },
    'Cierre':     { color: '#6B4FAE', lt: '#e8e0f8', label: 'El Cierre · Hanói', wiki: 'Hanoi',
                    desc: 'Los últimos días en Hanói antes de volar a casa.' },
  };

  // Bloque activo (en qué bloque estamos hoy)
  const todayDate = today();
  const todayDay = trip.days.find(d => d.date === todayDate);
  const activeBlock = todayDay ? todayDay.block : null;

  // Gradientes vivos para los círculos por zona
  const ZONE_GRADIENTS = {
    'El Norte':   'linear-gradient(135deg,#22a07a,#1A7B6B)',
    'El Centro':  'linear-gradient(135deg,#e86828,#D4581A)',
    'Angkor':     'linear-gradient(135deg,#d96048,#C1513A)',
    'Koh Rong':   'linear-gradient(135deg,#22b0e8,#0090C4)',
    'Phnom Penh': 'linear-gradient(135deg,#b07848,#8B5E3C)',
    'El Cierre':  'linear-gradient(135deg,#8866cc,#6B4FAE)',
    'Cierre':     'linear-gradient(135deg,#8866cc,#6B4FAE)',
  };

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
            <img class="route-icon-photo" data-wiki="${meta.wiki || ''}" alt="${meta.label}" src="">
          </div>
          ${!isLast ? `<div class="route-connector" style="background:${connectorGrad};min-height:${12 + blockDays.length * 4}px"></div>` : ''}
        </div>
        <div class="route-card${isActive?' route-card-active':''}${isPast?' route-card-past':''}"
             id="rcard-${i}"
             style="--zone-color:${meta.color};--zone-color-lt:${meta.lt}"
             onclick="toggleRouteCard(${i})">
          <div class="route-card-header">
            <div class="route-card-name">${meta.label}</div>
            <span class="day-badge" style="background:${meta.lt};color:${meta.color}">${blockDays.length} días</span>
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
        <span class="tsr-num">${blocks.length}</span>
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
    'linear-gradient(135deg,#3d2c5c,#6b46a1)',
    'linear-gradient(135deg,#7b3f00,#b5560d)',
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

    <!-- Frases de supervivencia -->
    <div style="padding:14px 16px 0">
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
          <button class="notes-add-btn" onclick="addNote()">+</button>
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
          const groups = {};
          n.packingList.forEach((item, i) => {
            const cat = item.cat || '📦 Sin categoría';
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
                <button class="pack-cat-add-btn" onclick="addPackingItemToCat('${escHtml(cat)}','pci-${catId}')">+</button>
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
          <button class="notes-add-btn" onclick="addNoteItem('pretask')">+</button>
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
    if ((list[i].cat || '📦 Sin categoría') === cat) { insertIdx = i + 1; break; }
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
    'El Norte':  { color: '#2d6a4f', lt: '#d8f0e6', label: 'Vietnam Norte' },
    'El Centro': { color: '#8b4513', lt: '#f5e6da', label: 'Vietnam Centro' },
    'Camboya':   { color: '#b07d1a', lt: '#fdf3d8', label: 'Angkor & Camboya' },
    'Islas':     { color: '#0077a8', lt: '#d6f0fa', label: 'Koh Rong' },
    'Cierre':    { color: '#5b4080', lt: '#ede8f5', label: 'Cierre' },
    'El Cierre': { color: '#5b4080', lt: '#ede8f5', label: 'El Cierre' },
    'General':   { color: '#1a3a5c', lt: '#e8f0f8', label: 'General' },
  };

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
      <div class="block-section">
        <div class="block-section-header" style="color:${zone.color}">
          <span class="bsh-label">${zone.label}</span>
          <span class="bsh-count">${days.length} días</span>
        </div>
        <div class="block-days-list" style="border-left:3px solid ${zone.color}22">
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
                 style="${isToday ? `background:${zone.lt};` : ''}">
              <div class="day-date-box2" style="${isToday ? `color:${zone.color}` : ''}">
                <div class="day-num2">${dayNum}</div>
                <div class="day-mon2">${mon}</div>
              </div>
              <div class="day-body2">
                <div class="day-city2">${transportStr ? `<span>${transportStr}</span> ` : ''}${day.city}${isToday ? ' <span class="today-dot">●</span>' : ''}</div>
                ${places ? `<div class="day-places2">${places}</div>` : ''}
              </div>
              <div class="day-arrow2" style="color:${zone.color}">›</div>
            </div>`;
        }).join('')}
        </div>
      </div>`;
  });

  // ── Pestaña TRANSPORTES (lista de días) ──────────────────
  const TRANSPORT_TYPE_INFO = {
    'flight':      { label: 'Vuelos',         icon: '✈️',  color: '#1a3a5c' },
    'train':       { label: 'Tren',            icon: '🚆',  color: '#8b4513' },
    'sleeper-bus': { label: 'Bus nocturno',    icon: '🚌',  color: '#5b4080' },
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
      <div class="block-section">
        <div class="block-section-header" style="color:${zone.color}">
          <span class="bsh-label">${zone.label}</span>
          <span class="bsh-count">${bDays.length} días</span>
        </div>
        <div class="block-days-list" style="border-left:3px solid ${zone.color}22">
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
              </div>
            </div>`;
          }).join('');
          const rowId = 'trrow-' + day.date;
          const panelId = 'trpanel-' + day.date;
          return `
            <div class="day-row2${isToday?' day-today':''}${!hasTr?' day-row-no-tr':''}"
                 id="${rowId}"
                 onclick="${hasTr ? `toggleTransportPanel('${day.date}')` : ''}"
                 style="${isToday ? `background:${zone.lt};` : ''}${hasTr ? 'cursor:pointer' : 'cursor:default'}">
              <div class="day-date-box2" style="${hasTr ? `color:${zone.color}` : 'opacity:.38'}">
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
                   style="color:${hasTr?zone.color:'var(--border)'}">›</div>
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

  // Información enriquecida de alojamientos (foto, descripción, query de mapas)
  const HTL_INFO = {
    'Embrace Boutique Hanoi Hotel|Old Quarter, Hanói': {
      photo: 'img/places/old_quarter_hanoi.jpg',
      desc: 'Boutique hotel con habitaciones deluxe y desayuno incluido en pleno Old Quarter. Bajada del bus 86 en el 162 Trần Quang Khải. Restaurante propio, servicio de conserjería y ambiente colonial chic en el corazón de las 36 calles históricas.',
      maps: 'Embrace+Boutique+Hanoi+Hotel+Old+Quarter',
    },
    'The Oversleep Catba Hostel & Pool Bar|Cat Ba Town': {
      photo: 'img/places/cát_bà_national_park.jpg',
      desc: 'Hostal moderno con piscina y pool bar en Cat Ba Town. Habitación doble deluxe con balcón y vistas al mar. Sin desayuno incluido, pero rodeado de restaurantes de marisco y bares con música en vivo a pie de calle.',
      maps: 'The+Oversleep+Catba+Hostel+Cat+Ba+Town',
    },
    'Camarote del crucero|Bahía de Lan Ha': {
      photo: 'img/places/lan_ha_bay.jpg',
      desc: 'Dormir en un crucero en la Bahía de Lan Ha es una experiencia única: 1.600 islotes kársticos emergiendo del mar, kayak entre cuevas y amaneceres sobre el agua en total silencio. Comidas incluidas a bordo.',
      maps: 'Lan+Ha+Bay+Cat+Ba+Vietnam',
    },
    'Tam Coc Serenity Hotel & Bungalow|Tam Coc, Ninh Binh': {
      photo: 'img/places/mua_cave.jpg',
      desc: 'Hotel boutique con bungalows rodeados de arrozales y montañas kársticas en Tam Coc. Habitación doble superior con desayuno incluido. Bicicletas disponibles para explorar los campos y las grutas del río.',
      maps: 'Tam+Coc+Serenity+Hotel+Bungalow+Ninh+Binh',
    },
    'Por confirmar|Hue': {
      photo: 'img/places/imperial_city_huế.jpg',
      desc: 'Hue fue la capital imperial de Vietnam durante casi 150 años. La ciudad guarda una atmósfera tranquila, con la Ciudadela Imperial, las tumbas reales y la cocina más refinada del país.',
      maps: 'Hue+Vietnam+city+center',
    },
    'Por confirmar|Da Nang': {
      photo: 'img/places/dragon_bridge_đà_nẵng.jpg',
      desc: 'Da Nang combina ciudad moderna y playas espectaculares. Punto de tránsito clave entre Hue y Hoi An, con el Puente del Dragón, My Khe Beach y la mítica montaña de mármol.',
      maps: 'Da+Nang+Vietnam',
    },
    'Por confirmar|Hoi An': {
      photo: 'img/places/japanese_covered_bridge.jpg',
      desc: 'El casco antiguo de Hoi An (Patrimonio UNESCO) es una de las ciudades más fotogénicas de Asia. Farolillos de papel, arquitecturas chinas y coloniales, sastres a medida y la mejor comida del centro de Vietnam.',
      maps: 'Hoi+An+Ancient+Town+Vietnam',
    },
    'Por confirmar|Siem Reap': {
      photo: 'img/places/angkor_wat.jpg',
      desc: 'Siem Reap es la puerta de acceso a Angkor, el mayor complejo de templos del mundo. La ciudad tiene una Pub Street animada, mercados nocturnos y la energía de un destino que vive para los viajeros.',
      maps: 'Siem+Reap+Cambodia',
    },
    'Bungalow en la playa|Koh Rong Sanloem': {
      photo: 'img/places/koh_rong_saloem.jpg',
      desc: 'M\'Pay Bay, en Koh Rong Sanloem, es una de las playas más paradisíacas de Camboya. Aguas turquesas, fondo de arena blanca, plancton bioluminiscente por las noches y sin coches en toda la isla.',
      maps: 'Koh+Rong+Sanloem+Cambodia',
    },
    'Por confirmar|Phnom Penh': {
      photo: 'img/places/royal_palace_phnom_penh.jpg',
      desc: 'La capital camboyana, en la confluencia del Mekong y el Tonle Sap, mezcla historia colonial francesa con la densidad del sureste asiático. Ciudad que exige respeto por su historia y sorprende por su gastronomía.',
      maps: 'Phnom+Penh+Cambodia',
    },
    'Hotel Hanói (llegada noche)|Old Quarter, Hanói': {
      photo: 'img/places/hoàn_kiếm_lake.jpg',
      desc: 'De vuelta al Old Quarter de Hanói para la recta final del viaje. El barrio nunca duerme del todo: cafeterías de huevo, bia hơi en la esquina y los mismos callejones que lo empezaron todo.',
      maps: 'Old+Quarter+Hoan+Kiem+Hanoi+Vietnam',
    },
  };

  window._HTL_INFO_GLOBAL = HTL_INFO; // exponer para openHotelDetail

  const HTL_ZONE_COLORS = {
    'El Norte':'#1a6e8a','El Centro':'#c45e1a','Camboya':'#b84830',
    'Islas':'#1a90b8','Cierre':'#6644aa','El Cierre':'#6644aa',
  };
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
    const cardsHtml = zoneGroups.map(g => {
      const nights    = g.dates.length;
      const nightLbl  = nights === 1 ? '1 noche' : nights + ' noches';
      const isTransit = !g.name
        || g.name.toLowerCase().includes('en ruta')
        || (g.name.toLowerCase().includes('bus') && g.name.toLowerCase().includes('noct'));
      const dotColor  = isTransit ? zcolor + '80' : zcolor;
      const iconColor = isTransit ? 'var(--text-sm)' : zcolor;

      // Posicionamiento siempre 15:00 → 12:00 para garantizar que nunca se solapan
      // (los tiempos reales se muestran en el texto meta)
      const ciH = isTransit ? 12 : 15;
      const coH = isTransit ? 15 : 12;

      const startIdx = dateToIdx[g.dates[0]] !== undefined ? dateToIdx[g.dates[0]] : 0;
      const endIdx   = startIdx + nights - 1; // índice del último día de estancia

      const topPx    = startIdx * HTL_ROW_H + (ciH / 24) * HTL_ROW_H;
      const bottomPx = Math.min((endIdx + 1) * HTL_ROW_H + (coH / 24) * HTL_ROW_H, totalH);
      const heightPx = Math.max(bottomPx - topPx, 40); // mínimo 40px visible

      const metaParts = [];
      if (!isTransit) {
        metaParts.push('Check-in: '  + (g.checkIn  || '15:00'));
        metaParts.push('Check-out: ' + (g.checkOut || '12:00'));
      }

      return '<div class="htl2-card' + (isTransit ? ' htl2-card-transit' : '') + '"'
        + ' style="top:' + topPx.toFixed(1) + 'px;height:' + heightPx.toFixed(1) + 'px;'
        + 'border-color:' + (isTransit ? dotColor : zcolor + '55') + '"'
        + ' onclick="openHotelDetail(\'' + (g.name||'').replace(/'/g,"\\'") + '\',\'' + (g.address||'').replace(/'/g,"\\'") + '\',\'' + (g.checkIn||'') + '\',\'' + (g.checkOut||'') + '\',\'' + g.dates[0] + '\')">'
        + '<div class="htl2-card-top">'
        +   '<span class="htl2-card-icon" style="color:' + iconColor + '">' + _htlSvg(g.name) + '</span>'
        +   '<div class="htl2-card-info">'
        +     '<div class="htl2-card-name" style="color:' + iconColor + '">' + (g.name || 'En tránsito') + '</div>'
        +     (g.address ? '<div class="htl2-card-addr">' + g.address + '</div>' : '')
        +   '</div>'
        +   '<div class="htl2-card-nights" style="background:' + dotColor + '">' + nightLbl + '</div>'
        + '</div>'
        + (metaParts.length
            ? '<div class="htl2-card-meta">' + metaParts.join('&nbsp;·&nbsp;') + '</div>'
            : '')
        + '</div>';
    }).join('');

    hotelsHtml +=
      '<div class="htl2-zone">'
      + '<div class="block-section-header" style="color:' + zone.color + '">'
      +   '<span class="bsh-label">' + zone.label + '</span>'
      +   '<span class="bsh-count">' + zoneNights + ' noches</span>'
      + '</div>'
      + '<div class="htl2-wrapper" style="--rh:' + HTL_ROW_H + 'px">'
      +   '<div class="htl2-dates-col">' + dayCellsHtml + '</div>'
      +   '<div class="htl2-cards-col" style="height:' + totalH + 'px">' + cardsHtml + '</div>'
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

  if (activeTab === 'food') {
    // Lazy-load dish photos
    const GASTRO = window.GASTRO_BY_BLOCK || {};
    const blocks = [...new Set(trip.days.map(d => d.block).filter(Boolean))];
    blocks.forEach(block => {
      (GASTRO[block] || []).forEach((d, i) => {
        const slug = (block + '_' + i).replace(/\s/g,'_');
        _fetchDishPhoto(d.name).then(src => {
          if (!src) return;
          const img = document.getElementById('fci-' + slug);
          if (img) { img.src = src; }
        });
      });
    });
  }
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
    'Koh Rong Sanloem':'img/places/koh_rong_sanloem.jpg',
    'Phnom Penh':      'img/places/phnom_penh.jpg',
  };
  const BLOCK_COLORS = {
    'El Norte': '#2d6a4f', 'El Centro': '#8b4513',
    'Camboya': '#b07d1a', 'Islas': '#0077a8',
    'Cierre': '#5b4080', 'El Cierre': '#5b4080',
  };
  const cityPhoto = CITY_PHOTOS[day.city] || '';
  const blockColor = BLOCK_COLORS[day.block] || 'var(--primary)';
  const headerHtml = `
    <div class="day-hero" style="${cityPhoto
      ? `background-image:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.6) 100%),url('${cityPhoto}');background-size:cover;background-position:center`
      : `background:${blockColor}`}">
      <div class="day-hero-content">
        <div class="dh-meta">${formatDate(date).toUpperCase()} · DÍA ${dayNum}/${tripDuration(trip)}</div>
        <div class="dh-city">${day.city}</div>
        <div class="dh-bottom">
          <span class="dh-country">${day.country}</span>
          ${isToday ? '<span class="today-pill">HOY</span>' : ''}
        </div>
      </div>
    </div>`;

  // ── Tabs ──
  const tabsHtml = `
    <div class="day-tabs" id="day-tabs">
      <button class="day-tab active" onclick="showDayTab('resumen')">Resumen</button>
      <button class="day-tab" onclick="showDayTab('lugares')">Lugares</button>
      <button class="day-tab" onclick="showDayTab('comer')">Comer</button>
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
          </div>
        </div>`).join('')}
    </div>` : '';

  // Hotel en resumen
  const hotelHtml = hasHotel ? `
    <div class="dsc-card hotel-expand-card" onclick="toggleHotelExpand(this)" style="cursor:pointer">
      <div class="dsc-header">
        <span class="dsc-header-icon">🏨</span>
        <span class="dsc-title">${escHtml(day.hotel.name)}</span>
        <span class="hotel-chevron" style="margin-left:auto;font-size:18px;color:var(--text-sm);transition:transform .25s">›</span>
      </div>
      ${day.hotel.address ? `<div class="dsc-meta">📍 ${escHtml(day.hotel.address)}</div>` : ''}
      <div class="hotel-expand-body" style="display:none;margin-top:12px">
        <div class="hotel-times">
          ${day.hotel.checkIn  ? `<div class="hotel-time-box"><div class="hotel-label">Check-in</div><div class="hotel-value">${escHtml(day.hotel.checkIn)}</div></div>`  : ''}
          ${day.hotel.checkOut ? `<div class="hotel-time-box"><div class="hotel-label">Check-out</div><div class="hotel-value">${escHtml(day.hotel.checkOut)}</div></div>` : ''}
          ${day.hotel.breakfast ? `<div class="hotel-time-box"><div class="hotel-label">Desayuno</div><div class="hotel-value" style="color:#2ecc71">✓ Incluido</div></div>` : `<div class="hotel-time-box"><div class="hotel-label">Desayuno</div><div class="hotel-value" style="color:var(--text-sm)">No incluido</div></div>`}
        </div>
        ${day.hotel.phone ? `<div class="dsc-meta" style="margin-top:8px">📞 ${escHtml(day.hotel.phone)}</div>` : ''}
        ${day.hotel.address ? `<button class="dsc-maps-btn" style="margin-top:12px" onclick="event.stopPropagation();openHotelMaps('${escHtml(day.hotel.name)}','${escHtml(day.hotel.address)}')">📌 Cómo llegar</button>` : ''}
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
    cafe: { bg:'#e07aab', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
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
    temple: { bg:'#8B3DAF', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <rect x="5" y="20" width="26" height="10" rx="1" fill="white"/>
      <rect x="8" y="16" width="20" height="5" rx="1" fill="white"/>
      <path d="M6 16 L18 8 L30 16Z" fill="rgba(255,255,255,.9)"/>
      <rect x="14" y="24" width="4" height="6" rx="1" fill="rgba(139,61,175,.6)"/>
      <rect x="18" y="24" width="4" height="6" rx="1" fill="rgba(139,61,175,.6)"/>
    </svg>` },
    default: { bg:'#6b52ab', svg:`<svg viewBox="0 0 36 36" width="30" height="30">
      <path d="M18 5 Q13 11 13 16 Q13 22 18 23 Q23 22 23 16 Q23 11 18 5Z" fill="white"/>
      <path d="M6 17 Q11 12 15 15 Q18 23 15 26 Q9 23 6 17Z" fill="rgba(255,255,255,.75)"/>
      <path d="M30 17 Q25 12 21 15 Q18 23 21 26 Q27 23 30 17Z" fill="rgba(255,255,255,.75)"/>
      <path d="M10 27 Q13 21 18 23 Q23 21 26 27 Q23 32 18 31 Q13 32 10 27Z" fill="rgba(255,255,255,.75)"/>
      <circle cx="18" cy="18" r="3" fill="rgba(255,220,100,1)"/>
    </svg>` },
  };
  function makeCircle(item, fallbackEmoji) {
    const shortName = item.name.replace(/\s*\(.*\)/, '').split(' ').slice(0,2).join(' ');
    return `<div class="photo-circle-wrap" onclick="event.stopPropagation();showDayTab('lugares')">
      <div class="photo-circle-img-wrap">
        <img class="photo-circle-img" data-wiki="${escHtml(item.name)}" alt="${escHtml(shortName)}" src="">
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
        ${day.places.map(p => makeCircle(p, placeIcon(p.type))).join('')}
      </div>
      <button class="dsc-see-all" onclick="showDayTab('lugares')">Ver todos los lugares →</button>
    </div>` : '';

  // Restaurantes preview en resumen
  const restPreviewHtml = day.restaurants.length ? `
    <div class="dsc-card">
      <div class="dsc-header">
        <span class="dsc-header-icon">🍜</span>
        <span class="dsc-title">Dónde comer</span>
        <span class="dsc-count">${day.restaurants.length}</span>
      </div>
      <div class="photo-circles-row">
        ${day.restaurants.map(r => makeCircle(r, r.type === 'cafe' ? '☕' : '🍜')).join('')}
      </div>
      <button class="dsc-see-all" onclick="showDayTab('lugares')">Ver restaurantes →</button>
    </div>` : '';

  const tabResumen = `
    <div class="day-tab-panel" id="dtab-resumen">
      <div class="dsc-summary-text">${day.summary}</div>
      ${buildTransitAlertHTML(day)}
      ${taskProgressHtml}
      ${transportHtml}
      ${hotelHtml}
      ${lugaresPreviewHtml}
      ${restPreviewHtml}
      ${buildCultureHTML(day.block)}
      <div style="height:80px"></div>
    </div>`;

  // ── TAB: Lugares — acordeón ──
  function lugarCardHtml(item, idx, type, fallbackEmoji) {
    return `
      <div class="lugar-card" id="lc-${type}-${idx}" onclick="toggleLugar('${type}',${idx})">
        <!-- Cabecera colapsada -->
        <div class="lugar-card-header">
          <div class="lugar-thumb-wrap">
            <img class="lugar-thumb-img" data-wiki="${escHtml(item.name)}"
                 data-photo="${escHtml(item.photo || '')}"
                 alt="${escHtml(item.name)}"
                 onerror="this.style.display='none'">
            <span class="lugar-thumb-emoji">${fallbackEmoji}</span>
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
          </div>
          <div class="lugar-mini-map" id="lmap-${type}-${idx}" style="display:none"></div>
        </div>
      </div>`;
  }

  const tabLugares = `
    <div class="day-tab-panel hidden" id="dtab-lugares">
      ${day.places.length ? `
        <div class="section-title">📍 Lugares a visitar</div>
        ${day.places.map((p, i) => lugarCardHtml(p, i, 'place', placeIcon(p.type))).join('')}` : ''}
      ${day.restaurants.length ? `
        <div class="section-title">🍜 Dónde comer & beber</div>
        ${day.restaurants.map((r, i) => lugarCardHtml(r, i, 'rest', r.type === 'cafe' ? '☕' : '🍜')).join('')}` : ''}
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
                       data-wiki="${escHtml(r.name)}" data-photo="${escHtml(r.photo || '')}"
                       alt="${escHtml(r.name)}" src=""
                       onload="this.classList.add('loaded')">
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

  // ── TAB: Mapa ──
  const DAY_MAP_COORDS = {
    'Hanói':          [21.0285, 105.8542, 14],
    'Cat Ba':         [20.7291, 107.0475, 13],
    'Lan Ha Bay':     [20.7500, 107.0800, 12],
    'Ninh Binh':      [20.2506, 105.9745, 13],
    'Hue':            [16.4637, 107.5909, 13],
    'Da Nang':        [16.0544, 108.2022, 13],
    'Hoi An':         [15.8801, 108.3380, 14],
    'Siem Reap':      [13.3671, 103.8448, 13],
    'Angkor':         [13.4125, 103.8670, 13],
    'Koh Rong':       [10.5833, 103.3667, 13],
    'Phnom Penh':     [11.5564, 104.9282, 13],
  };
  const myMapsId = trip?.myMapsUrl?.match(/mid=([^&]+)/)?.[1];
  const cityKey = Object.keys(DAY_MAP_COORDS).find(k => day.city?.includes(k)) || '';
  const coords  = DAY_MAP_COORDS[cityKey];
  const iframeSrc = myMapsId && coords
    ? `https://www.google.com/maps/d/embed?mid=${myMapsId}&ll=${coords[0]},${coords[1]}&z=${coords[2]}`
    : null;
  const mapHeight = 'calc(100vh - var(--header-h) - var(--nav-h) - 96px - 56px)';
  const tabMapa = `
    <div class="day-tab-panel hidden" id="dtab-mapa">
      ${iframeSrc ? `
        <div style="position:relative;height:${mapHeight};">
          <div id="day-map-loading" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:#f0f4ff;z-index:1;pointer-events:none;">
            <div style="width:32px;height:32px;border:3px solid #c8d8f0;border-top-color:#1a3a5c;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <span style="color:#1a3a5c;font-size:13px;font-weight:600;">Cargando mapa…</span>
          </div>
          <iframe src="${iframeSrc}" style="width:100%;height:100%;border:none;display:block;"
            allowfullscreen onload="document.getElementById('day-map-loading').style.display='none'">
          </iframe>
        </div>
        <a href="https://maps.google.com/?q=${encodeURIComponent(day.city)}" target="_blank"
          style="display:flex;align-items:center;justify-content:center;gap:8px;height:56px;background:#1a3a5c;color:#fff;font-weight:600;font-size:14px;text-decoration:none;">
          🗺️ Abrir en Google Maps
        </a>` : `
        <div id="day-leaflet-map" style="height:${mapHeight}"></div>`}
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
          <p style="font-size:14px;line-height:1.7;color:var(--text-sm)">${day.notes}</p>
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
}

function lugarThumbError(el, emoji) {
  el.outerHTML = '<div class="lugar-thumb-fallback">' + emoji + '</div>';
}

const _lugarMapInstances = {};

async function loadLugarMap(mapEl, placeName) {
  if (!mapEl || mapEl.dataset.mapLoaded) return;
  mapEl.dataset.mapLoaded = '1';
  // Geocodificar con Nominatim
  const city = window._dayCity || '';
  const query = encodeURIComponent(placeName + (city ? ', ' + city : ''));
  let lat = null, lng = null;
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
      headers: { 'Accept-Language': 'es', 'User-Agent': 'ViajesMM/1.0' }
    });
    const data = await r.json();
    if (data[0]) { lat = parseFloat(data[0].lat); lng = parseFloat(data[0].lon); }
  } catch(e) {}
  if (!lat) return; // sin coordenadas, ocultar
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
      if (placeName) loadCarousel(carouselEl, dotsEl, placeName);
    }
    // Mini mapa
    const mapEl = document.getElementById('lmap-' + type + '-' + idx);
    if (mapEl) {
      const nameEl = card.querySelector('.lugar-name');
      const placeName = nameEl ? nameEl.textContent.trim() : '';
      if (placeName) loadLugarMap(mapEl, placeName);
    }
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
  const city = window._dayCity || 'Vietnam';
  const trip = getTrip(currentTripId);
  // Buscar coordenadas del punto del día
  const pt = trip.mapPoints.find(p => p.name === city) || { lat: 16.0, lng: 108.0 };
  setTimeout(() => {
    _dayMapInstance = L.map('day-leaflet-map').setView([pt.lat, pt.lng], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB', maxZoom: 19
    }).addTo(_dayMapInstance);
    L.marker([pt.lat, pt.lng])
      .addTo(_dayMapInstance)
      .bindPopup(`<strong>${pt.name}</strong>${pt.notes ? '<br><small>' + pt.notes + '</small>' : ''}`)
      .openPopup();
  }, 100);
}

function openHotelMaps(name, address) {
  const q = encodeURIComponent(name + ' ' + address);
  window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
}

function toggleHotelExpand(card) {
  const body = card.querySelector('.hotel-expand-body');
  const chevron = card.querySelector('.hotel-chevron');
  if (!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (chevron) chevron.style.transform = open ? '' : 'rotate(90deg)';
}

function openDayInMaps(city) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city)}`, '_blank');
}

function openHotelDetail(name, address, checkIn, checkOut, firstDate) {
  // Buscar info enriquecida
  const key = name + '|' + address;
  // HTL_INFO está dentro de renderItinerary, necesitamos una copia global
  const info = window._HTL_INFO_GLOBAL && window._HTL_INFO_GLOBAL[key];
  const photo    = info ? info.photo : '';
  const desc     = info ? info.desc  : '';
  const mapsQ    = info ? info.maps  : encodeURIComponent((name + ' ' + address).trim());
  const mapsUrl  = 'https://maps.google.com/?q=' + (info ? mapsQ : encodeURIComponent((name + ' ' + address).trim()));

  const isTransit = !name || name.toLowerCase().includes('en ruta') || name.toLowerCase().includes('bus noct');
  if (isTransit) return;

  const html = `
    <div class="htl-sheet-overlay" onclick="closeHotelDetail()"></div>
    <div class="htl-sheet">
      <div class="htl-sheet-drag" onclick="closeHotelDetail()"></div>
      ${photo ? `<div class="htl-sheet-photo" style="background-image:url('${photo}')"></div>` : ''}
      <div class="htl-sheet-body">
        <div class="htl-sheet-name">${name || 'Alojamiento'}</div>
        ${address ? `<div class="htl-sheet-addr">📍 ${address}</div>` : ''}
        <div class="htl-sheet-times">
          ${checkIn  ? `<div class="htl-sheet-time-box"><div class="htl-sheet-time-label">Check-in</div><div class="htl-sheet-time-val">${checkIn}</div></div>` : ''}
          ${checkOut ? `<div class="htl-sheet-time-box"><div class="htl-sheet-time-label">Check-out</div><div class="htl-sheet-time-val">${checkOut}</div></div>` : ''}
        </div>
        ${desc ? `<p class="htl-sheet-desc">${desc}</p>` : ''}
        <div class="htl-sheet-actions">
          <a class="htl-sheet-btn htl-sheet-btn-maps" href="${mapsUrl}" target="_blank" rel="noopener">
            🗺️ Ver en Google Maps
          </a>
          <button class="htl-sheet-btn htl-sheet-btn-day" onclick="closeHotelDetail();navigate('day','${firstDate}')">
            📅 Ver el día
          </button>
        </div>
      </div>
    </div>`;

  let wrap = document.getElementById('htl-sheet-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'htl-sheet-wrap';
    document.body.appendChild(wrap);
  }
  wrap.innerHTML = html;
  wrap.style.display = 'block';
  requestAnimationFrame(() => wrap.querySelector('.htl-sheet').classList.add('htl-sheet-open'));
}

function closeHotelDetail() {
  const wrap = document.getElementById('htl-sheet-wrap');
  if (!wrap) return;
  const sheet = wrap.querySelector('.htl-sheet');
  if (sheet) {
    sheet.classList.remove('htl-sheet-open');
    setTimeout(() => { wrap.style.display = 'none'; wrap.innerHTML = ''; }, 280);
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

const BLOCK_ZONE_COLORS = {
  'El Norte':   { color: '#1A7B6B', lt: '#d0f0e8' },
  'El Centro':  { color: '#D4581A', lt: '#fde8d8' },
  'Angkor':     { color: '#C1513A', lt: '#fde0da' },
  'Koh Rong':   { color: '#0090C4', lt: '#cceeff' },
  'Phnom Penh': { color: '#8B5E3C', lt: '#f5e6d8' },
  'Cierre':     { color: '#6B4FAE', lt: '#e8e0f8' },
  'El Cierre':  { color: '#6B4FAE', lt: '#e8e0f8' },
  'Camboya':    { color: '#C1513A', lt: '#fde0da' },
  'General':    { color: '#1a3a5c', lt: '#e8f0f8' },
};

function isNightTransport(tr) {
  return ['sleeper-bus','night-train'].includes(tr.type) ||
    /nocturno|noche|22:|23:|00:|01:/i.test(tr.details + (tr.from||''));
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

  return;

  // (código legacy — ya no se usa pero se conserva por referencia)
  const hour       = new Date().getHours();
  const isMorning  = hour < 14;
  const isEvening  = hour >= 18;
  const dayNum     = getDayNumber(trip, t);
  const zone       = BLOCK_ZONE_COLORS[day.block] || BLOCK_ZONE_COLORS['General'];

  const nightTrans   = day.transport.filter(isNightTransport);
  const morningTrans = day.transport.filter(tr => !isNightTransport(tr));

  const greeting = hour < 12 ? '🌅 Buenos días' : hour < 18 ? '☀️ Buenas tardes' : '🌙 Buenas noches';
  const d = new Date(t + 'T12:00:00');
  const dateLabel = d.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });

  // Sección alerta transporte nocturno (visible en tarde/noche)
  const nightAlertHtml = (!isMorning && nightTrans.length) ? `
    <div class="tnow-alert">
      <div class="tnow-alert-header">🌙 Esta noche</div>
      ${nightTrans.map(tr => `
        <div class="tnow-transport-card tnow-night">
          <div class="tnow-tr-icon">${tr.icon || '🚌'}</div>
          <div class="tnow-tr-body">
            <div class="tnow-tr-title">${tr.details}</div>
            <div class="tnow-tr-route">${tr.from || ''} → ${tr.to || ''}</div>
          </div>
        </div>
        ${(TRANSPORT_TIPS[tr.type] || []).length ? `
          <div class="tnow-tips-box">
            <div class="tnow-tips-title">💡 Consejos de la IA</div>
            ${(TRANSPORT_TIPS[tr.type] || []).map(tip => `<div class="tnow-tip">· ${tip}</div>`).join('')}
          </div>` : ''}
      `).join('')}
    </div>` : '';

  // Transporte de mañana (visible en mañana)
  const morningTransHtml = (isMorning && morningTrans.length) ? `
    <div class="tnow-section">
      <div class="tnow-sec-title">🚦 Transporte de hoy</div>
      ${morningTrans.map(tr => `
        <div class="tnow-transport-card">
          <div class="tnow-tr-icon">${tr.icon || transportIcon(tr.type)}</div>
          <div class="tnow-tr-body">
            <div class="tnow-tr-title">${tr.details}</div>
            <div class="tnow-tr-route">${tr.from || ''} ${tr.to ? '→ ' + tr.to : ''}</div>
          </div>
        </div>`).join('')}
    </div>` : '';

  // También mostrar transporte nocturno en mañana como aviso suave
  const nightPreviewHtml = (isMorning && nightTrans.length) ? `
    <div class="tnow-night-preview">
      <span>🌙</span>
      <span>Esta noche: ${nightTrans.map(tr => tr.details).join(' · ')}</span>
    </div>` : '';

  // Actividades — en tarde/noche omitir lugares si hay mucho contenido
  const showPlaces = isMorning || day.places.length <= 3;
  const placesHtml = showPlaces && day.places.length ? `
    <div class="tnow-section">
      <div class="tnow-sec-title">📍 Lugares de hoy</div>
      ${day.places.map(p => `
        <div class="tnow-place-row" onclick="navigate('day','${t}')">
          <span class="tnow-place-icon">${placeIcon(p.type)}</span>
          <div class="tnow-place-body">
            <div class="tnow-place-name">${p.name}</div>
            ${p.notes ? `<div class="tnow-place-notes">${p.notes}</div>` : ''}
          </div>
          <span class="tnow-place-arrow" style="color:${zone.color}">›</span>
        </div>`).join('')}
    </div>` : '';

  // Restaurantes — más prominentes por la tarde
  const restHtml = day.restaurants && day.restaurants.length ? `
    <div class="tnow-section">
      <div class="tnow-sec-title">${isEvening ? '🍜 ¿Dónde cenas?' : '🍜 Dónde comer'}</div>
      ${day.restaurants.map(r => `
        <div class="tnow-place-row">
          <span class="tnow-place-icon">${r.type === 'cafe' ? '☕' : '🍜'}</span>
          <div class="tnow-place-body">
            <div class="tnow-place-name">${r.name}</div>
            ${r.notes ? `<div class="tnow-place-notes">${r.notes}</div>` : ''}
          </div>
        </div>`).join('')}
    </div>` : '';

  // Tareas pendientes
  const pendingTasks = day.tasks.filter(tk => !tk.done);
  const tasksHtml = pendingTasks.length ? `
    <div class="tnow-section">
      <div class="tnow-sec-title">✅ Pendiente</div>
      ${pendingTasks.slice(0,3).map((tk, i) => `
        <div class="task-item" onclick="toggleTask('${t}',${day.tasks.indexOf(tk)})">
          <div class="task-check"></div>
          <div class="task-text">${tk.text}</div>
        </div>`).join('')}
    </div>` : '';

  // Notas del día
  const notesHtml = day.notes ? `
    <div class="tnow-section">
      <div class="tnow-notes">${day.notes}</div>
    </div>` : '';

  // Lo que hemos recorrido (días anteriores al efectivo)
  const pastDays = trip.days.filter(d => d.date < t);
  const recorridoHtml = pastDays.length ? (() => {
    const byBlock = {};
    pastDays.forEach(d => {
      if (!byBlock[d.block]) byBlock[d.block] = [];
      byBlock[d.block].push(d);
    });
    const blockEntries = Object.entries(byBlock);
    return `
    <div class="tnow-section" style="margin-top:8px">
      <div class="tnow-sec-title">🗺️ Lo que hemos recorrido</div>
      ${blockEntries.map(([block, days]) => {
        const zc = BLOCK_ZONE_COLORS[block] || BLOCK_ZONE_COLORS['General'];
        const cities = [...new Set(days.map(d => d.city.replace(/\s*→.*$/, '')))].join(', ');
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
          <div style="width:10px;height:10px;border-radius:50%;background:${zc.color};flex-shrink:0"></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--text)">${cities}</div>
            <div style="font-size:11px;color:var(--text-sm)">${days.length} día${days.length!==1?'s':''} · ${block}</div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  })() : '';

  // Banner de simulación temporal
  const simBannerHtml = isSimulated ? `
    <div style="background:#e8b800;color:#1a2a40;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:700">
      <span>⏰ Vista previa: ${new Date(t+'T12:00:00').toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'})}</span>
      <button onclick="exitTimeTravel()" style="background:#1a2a40;color:#e8b800;border:none;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:700;cursor:pointer">✕ Salir</button>
    </div>` : '';

  el('view-content').innerHTML = `
    ${simBannerHtml}
    <div class="tnow-top-bar" style="border-left:4px solid ${zone.color}">
      <div class="tnow-top-left">
        <div class="tnow-greeting">${isSimulated ? '🔮 Simulando' : greeting}</div>
        <div class="tnow-city">${day.city}</div>
      </div>
      <div class="tnow-daynum" style="color:${zone.color}">DÍA ${dayNum}</div>
    </div>

    ${nightAlertHtml}
    ${morningTransHtml}
    ${nightPreviewHtml}
    ${placesHtml}
    ${restHtml}
    ${tasksHtml}
    ${notesHtml}

    <div class="tnow-footer-link" onclick="navigate('day','${t}')">
      Ver el día completo →
    </div>

    ${recorridoHtml}

    <!-- Progreso del viaje -->
    <div style="padding:14px 16px 0">
      <div class="section-title" style="padding:0 0 8px">Progreso del viaje</div>
      ${buildTripStatsHTML(trip)}
    </div>

    <div style="height:80px"></div>`;

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
    { icon: '🛳️', text: 'Crucero Lan Ha Bay', date: '10–11 NOV' },
    { icon: '🌄', text: 'Amanecer en Hang Mua', date: '12 NOV' },
    { icon: '🚆', text: 'Tren panorámico Hai Van Pass', date: '15 NOV' },
    { icon: '🏮', text: 'Hoi An de noche', date: '16–19 NOV' },
    { icon: '🏯', text: 'Angkor Wat al amanecer', date: '21 NOV' },
    { icon: '🌴', text: 'Koh Rong Sanloem', date: '24–25 NOV' },
    { icon: '✨', text: 'Plancton bioluminiscente', date: '25 NOV' },
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
            <div class="text-xs" style="margin-top:2px">${formatDate(firstTransportDay.date)}</div>
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

function renderMap() {
  const trip = getTrip(currentTripId);
  setHeader('Mapa del viaje', false);

  const hasMyMaps = trip.myMapsUrl && trip.myMapsUrl.trim() !== '';

  if (hasMyMaps) {
    const viewerUrl = trip.myMapsUrl.replace('/embed?', '/viewer?');
    el('view-content').innerHTML = `
      <div id="maptab-mymaps" style="position:relative;">
        <div id="map-loading" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:#f0f4ff;z-index:1;pointer-events:none;">
          <div style="width:36px;height:36px;border:3px solid #c8d8f0;border-top-color:#1a3a5c;border-radius:50%;animation:spin 1s linear infinite;"></div>
          <span style="color:#1a3a5c;font-size:14px;font-weight:600;">Cargando mapa…</span>
        </div>
        <iframe
          src="${trip.myMapsUrl}"
          style="width:100%;height:calc(100vh - var(--header-h) - var(--nav-h) - 56px);border:none;display:block;"
          allowfullscreen
          onload="document.getElementById('map-loading').style.display='none'">
        </iframe>
        <a href="${viewerUrl}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;height:56px;background:#1a3a5c;color:#fff;font-weight:600;font-size:14px;text-decoration:none;">
          🗺️ Abrir en Google Maps
        </a>
      </div>`;
  } else {
    // ── Empty state + Leaflet oculto ──
    el('view-content').innerHTML = `
      <div class="map-empty-state">
        <div class="mes-illustration">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- fondo mapa con cuadrícula -->
            <rect width="160" height="120" rx="16" fill="#dce8ff"/>
            <!-- líneas de cuadrícula -->
            <line x1="0" y1="40" x2="160" y2="40" stroke="#b8ccf0" stroke-width="1"/>
            <line x1="0" y1="80" x2="160" y2="80" stroke="#b8ccf0" stroke-width="1"/>
            <line x1="53" y1="0" x2="53" y2="120" stroke="#b8ccf0" stroke-width="1"/>
            <line x1="107" y1="0" x2="107" y2="120" stroke="#b8ccf0" stroke-width="1"/>
            <!-- rutas -->
            <path d="M20 95 Q50 70 80 60 Q110 50 140 25" stroke="#93b4e8" stroke-width="2.5" stroke-dasharray="5 3" fill="none" stroke-linecap="round"/>
            <path d="M30 30 Q55 45 80 60" stroke="#a8c4f0" stroke-width="2" fill="none" stroke-linecap="round"/>
            <!-- pines de ubicación -->
            <circle cx="80" cy="60" r="10" fill="#1a3a5c" opacity=".9"/>
            <circle cx="80" cy="60" r="4" fill="white"/>
            <circle cx="30" cy="30" r="7" fill="#1a7b6b" opacity=".85"/>
            <circle cx="30" cy="30" r="3" fill="white"/>
            <circle cx="140" cy="25" r="7" fill="#D4581A" opacity=".85"/>
            <circle cx="140" cy="25" r="3" fill="white"/>
            <circle cx="20" cy="95" r="7" fill="#C1513A" opacity=".85"/>
            <circle cx="20" cy="95" r="3" fill="white"/>
            <!-- brújula esquina -->
            <circle cx="135" cy="95" r="14" fill="white" opacity=".7"/>
            <text x="135" y="101" text-anchor="middle" font-size="11" font-weight="700" fill="#1a3a5c" font-family="sans-serif">N</text>
          </svg>
        </div>
        <h3 class="mes-title">Tu mapa de viaje</h3>
        <p class="mes-sub">Crea tu mapa personalizado en <strong>Google My Maps</strong>, añade tus lugares favoritos y tenlo siempre disponible aquí.</p>
        <button onclick="promptMyMapsUrl()" class="mes-btn">+ Añadir Google My Maps</button>
      </div>
      <div id="leaflet-map" style="display:none"></div>`;
    initLeaflet(trip);
  }
}

function switchMapTab(tab) {
  document.querySelectorAll('.map-tab').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && tab === 'mymaps') || (i === 1 && tab === 'route'));
  });
  el('maptab-mymaps').style.display = tab === 'mymaps' ? 'block' : 'none';
  el('maptab-route').style.display  = tab === 'route'   ? 'block' : 'none';
  if (tab === 'route') initLeaflet(getTrip(currentTripId));
}

function promptMyMapsUrl() {
  const url = prompt('Pega la URL de embed de tu Google My Maps\n(Menú Compartir → Embed → copia el src del iframe):');
  if (!url || !url.includes('google.com/maps')) return;
  const trip = getTrip(currentTripId);
  trip.myMapsUrl = url;
  save();
  renderMap();
}

const MAP_ZONE_COLORS = {
  'Hanói':           { color: '#1A7B6B', label: 'Vietnam Norte' },
  'Cat Ba':          { color: '#1A7B6B', label: 'Vietnam Norte' },
  'Lan Ha Bay':      { color: '#1A7B6B', label: 'Vietnam Norte' },
  'Ninh Binh':       { color: '#1A7B6B', label: 'Vietnam Norte' },
  'Hue':             { color: '#D4581A', label: 'Vietnam Centro' },
  'Da Nang':         { color: '#D4581A', label: 'Vietnam Centro' },
  'Hoi An':          { color: '#D4581A', label: 'Vietnam Centro' },
  'Siem Reap':       { color: '#C1513A', label: 'Angkor & Camboya' },
  'Koh Rong Sanloem':{ color: '#0090C4', label: 'Islas' },
  'Phnom Penh':      { color: '#6B4FAE', label: 'El Cierre' },
};

function initLeaflet(trip) {
  const pts = trip.mapPoints;
  if (!pts.length) return;
  const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
  const avgLng = pts.reduce((s, p) => s + p.lng, 0) / pts.length;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  setTimeout(() => {
    const mapEl = el('leaflet-map');
    if (!mapEl) return;
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    mapInstance = L.map('leaflet-map').setView([avgLat, avgLng], 5);
    L.tileLayer(tileUrl, { attribution: '© CartoDB', maxZoom: 19 }).addTo(mapInstance);

    // Ruta de línea discontinua entre puntos
    if (pts.length > 1) {
      L.polyline(pts.map(p => [p.lat, p.lng]), {
        color: '#1a3a5c', weight: 2, opacity: .4, dashArray: '7,7'
      }).addTo(mapInstance);
    }

    // Pins con color por zona + número de orden
    pts.forEach((pt, idx) => {
      const zone = MAP_ZONE_COLORS[pt.name] || { color: '#1a3a5c', label: '' };
      const num = idx + 1;
      const icon = L.divIcon({
        html: `<div class="map-pin" style="background:${zone.color}"><span>${num}</span></div>`,
        iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34],
        className: ''
      });
      const zoneTag = zone.label ? `<span class="map-popup-zone" style="background:${zone.color}">${zone.label}</span>` : '';
      L.marker([pt.lat, pt.lng], { icon })
        .addTo(mapInstance)
        .bindPopup(`<div class="map-popup">${zoneTag}<strong>${pt.name}</strong>${pt.notes ? '<br><small>' + pt.notes + '</small>' : ''}</div>`);
    });
  }, 120);
}

// ══════════════════════════════════════════════════════════
//  VIEW: DOCUMENTOS
// ══════════════════════════════════════════════════════════

const DOC_CATEGORIES = {
  identificacion: { label: 'Identificación',  icon: '📋', color: '#e3f2fd' },
  vuelos:         { label: 'Vuelos',           icon: '✈️', color: '#f3e5f5' },
  transportes:    { label: 'Transportes',      icon: '🚌', color: '#e8f5e9' },
  reservas:       { label: 'Reservas',         icon: '🏨', color: '#fff3e0' },
  seguros:        { label: 'Seguros',          icon: '🔒', color: '#fce4ec' },
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

async function _fetchDishPhoto(dishName) {
  if (_dishPhotoCache[dishName]) return _dishPhotoCache[dishName];
  const article = DISH_WIKI[dishName];
  if (!article) return null;
  try {
    const entry = await _fetchWikiEntry(article);
    const src = entry?.large || entry?.small || null;
    _dishPhotoCache[dishName] = src;
    return src;
  } catch { return null; }
}

function buildHotelTimelineHTML(trip) {
  // Agrupar días consecutivos con el mismo alojamiento
  const groups = [];
  let current = null;
  trip.days.forEach(day => {
    const h = day.hotel || {};
    const key = (h.name || '') + '|' + (h.address || '');
    if (!current || current.key !== key) {
      current = { key, name: h.name || '', address: h.address || '',
                  checkIn: h.checkIn || '', checkOut: h.checkOut || '',
                  days: [day], block: day.block };
      groups.push(current);
    } else {
      current.days.push(day);
      if (h.checkOut) current.checkOut = h.checkOut;
    }
  });

  const ZONE_COLORS = {
    'El Norte':  '#1a6e8a', 'El Centro': '#c45e1a',
    'Camboya':   '#b84830', 'Islas':     '#1a90b8',
    'Cierre':    '#6644aa', 'El Cierre': '#6644aa',
  };
  const ZONE_LABELS = {
    'El Norte':  'Vietnam Norte',    'El Centro': 'Vietnam Centro',
    'Camboya':   'Angkor & Camboya', 'Islas':     'Koh Rong',
    'Cierre':    'Phnom Penh',       'El Cierre': 'Phnom Penh',
  };

  // Iconos SVG para tipos de alojamiento
  const _sv = p => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const HOTEL_SVG = {
    bed:  _sv('<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 18h20"/>'),
    boat: _sv('<path d="M2 21h20"/><path d="M4 9V5l8-2 8 2v4H4z"/><path d="M2 15c2 0 4 1 6 1s4-1 6-1 4 1 6 1"/>'),
    bus:  _sv('<rect x="1" y="3" width="22" height="16" rx="2"/><path d="M1 12h22"/><circle cx="7" cy="15.5" r="1.5"/><circle cx="17" cy="15.5" r="1.5"/>'),
    home: _sv('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  };
  function hotelSvg(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('crucero') || n.includes('camarote') || n.includes('barco')) return HOTEL_SVG.boat;
    if (n.includes('bus nocturno') || n.includes('en ruta')) return HOTEL_SVG.bus;
    if (n.includes('homestay') || n.includes('bungalow')) return HOTEL_SVG.home;
    return HOTEL_SVG.bed;
  }
  function fmtDate(d) {
    const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    const [,m,day] = d.split('-');
    return `${parseInt(day)} ${months[parseInt(m)-1]}`;
  }
  function nightsLabel(n) { return n === 1 ? '1 noche' : `${n} noches`; }
  const tripStart = new Date(trip.startDate + 'T12:00:00');
  function tripDayNum(dateStr) {
    return Math.round((new Date(dateStr + 'T12:00:00') - tripStart) / 86400000) + 1;
  }

  // Agrupar por zona geográfica
  const zoneGroups = [];
  let curZone = null;
  groups.forEach(g => {
    if (!curZone || curZone.block !== g.block) {
      curZone = { block: g.block, groups: [g] };
      zoneGroups.push(curZone);
    } else {
      curZone.groups.push(g);
    }
  });

  const totalNights = groups.reduce((acc, g) => acc + g.days.length, 0);

  let html = `
    <div class="htl-summary">
      <span class="htl-summary-num">${zoneGroups.length}</span>
      <span class="htl-summary-lbl">zonas</span>
      <span class="htl-summary-sep">·</span>
      <span class="htl-summary-num">${groups.length}</span>
      <span class="htl-summary-lbl">alojamientos</span>
      <span class="htl-summary-sep">·</span>
      <span class="htl-summary-num">${totalNights}</span>
      <span class="htl-summary-lbl">noches</span>
    </div>
    <div class="hotel-timeline">`;

  zoneGroups.forEach((zone, zi) => {
    const color = ZONE_COLORS[zone.block] || '#1a3a5c';
    const label = ZONE_LABELS[zone.block] || zone.block;
    const allDays = zone.groups.flatMap(g => g.days);
    const dayFrom = tripDayNum(allDays[0].date);
    const dayTo   = tripDayNum(allDays[allDays.length - 1].date);
    const zoneNights = allDays.length;

    html += `
      <div class="htl-zone-header" style="background:${color}14;border-color:${color}">
        <span class="htl-zone-label" style="color:${color}">${label}</span>
        <span class="htl-zone-stats">Días ${dayFrom}–${dayTo} · ${zoneNights} noches</span>
      </div>`;

    zone.groups.forEach((g, gi) => {
      const isLastOverall = zi === zoneGroups.length - 1 && gi === zone.groups.length - 1;
      const nextBlock = gi < zone.groups.length - 1 ? zone.block : (zoneGroups[zi + 1]?.block);
      const nextColor = ZONE_COLORS[nextBlock] || '#1a3a5c';
      const nights = g.days.length;
      const d1 = fmtDate(g.days[0].date);
      const d2 = fmtDate(g.days[g.days.length - 1].date);
      const dayF = tripDayNum(g.days[0].date);
      const dayT = tripDayNum(g.days[g.days.length - 1].date);
      const dayRange = nights === 1 ? `Día ${dayF}` : `Días ${dayF}–${dayT}`;
      const dateRange = nights === 1 ? d1 : `${d1} – ${d2}`;
      const isTransit = !g.name || (g.name.toLowerCase().includes('en ruta') || (g.name.toLowerCase().includes('bus') && g.name.toLowerCase().includes('noct')));

      html += `
        <div class="htl-row">
          <div class="htl-spine">
            <div class="htl-dot" style="background:${color};color:${color}"></div>
            ${!isLastOverall ? `<div class="htl-line" style="background:linear-gradient(to bottom,${color}80,${nextColor}80)"></div>` : ''}
          </div>
          <div class="htl-card${isTransit ? ' htl-card--transit' : ''}">
            <div class="htl-card-top">
              <div class="htl-icon-wrap" style="color:${color}">${hotelSvg(g.name)}</div>
              <div class="htl-info">
                <div class="htl-name">${g.name || 'En tránsito'}</div>
                ${g.address ? `<div class="htl-addr">${g.address}</div>` : ''}
              </div>
              <div class="htl-nights" style="background:${color}">${nightsLabel(nights)}</div>
            </div>
            <div class="htl-meta">
              <span class="htl-day-range" style="background:${color}18;color:${color}">${dayRange}</span>
              <span class="htl-dates">${dateRange}</span>
              ${g.checkIn  ? `<span class="htl-ci">&#8593; ${g.checkIn}</span>` : ''}
              ${g.checkOut ? `<span class="htl-co">&#8595; ${g.checkOut}</span>` : ''}
            </div>
          </div>
        </div>`;
    });
  });

  html += `</div>`;
  return html;
}

function buildFoodViewHTML(trip) {
  const GASTRO = window.GASTRO_BY_BLOCK || {};
  const blocks = [...new Set(trip.days.map(d => d.block).filter(Boolean))];
  const ZONE_COLORS = {
    'El Norte':  '#22a07a', 'El Centro': '#e86828',
    'Camboya':   '#d96048', 'Islas':     '#22b0e8',
    'Cierre':    '#8866cc', 'El Cierre': '#8866cc',
  };

  let html = `<div class="food-view">`;
  blocks.forEach(block => {
    const dishes = GASTRO[block];
    if (!dishes || !dishes.length) return;
    const color = ZONE_COLORS[block] || '#1a3a5c';
    html += `
      <div class="food-zone-header" style="--zone-col:${color}">
        <div class="food-zone-name">${block}</div>
      </div>
      <div class="food-list">`;
    dishes.forEach((d, i) => {
      const slug = (block + '_' + i).replace(/\s/g,'_');
      html += `
        <div class="food-card" id="fc-${slug}">
          <div class="food-card-img-wrap">
            <div class="food-card-img-placeholder">${d.emoji}</div>
            <img class="food-card-img" id="fci-${slug}" src="" alt="${d.name}" style="display:none" onload="this.style.display='block';this.previousElementSibling.style.display='none'">
          </div>
          <div class="food-card-body">
            <div class="food-card-name">${d.name}</div>
            <div class="food-card-desc">${d.desc}</div>
          </div>
        </div>`;
    });
    html += `</div>`;
  });
  html += `</div>`;
  return html;
}

function renderFood() {
  const trip = getTrip(currentTripId);
  if (!trip) return;
  setHeader('Gastronomía', false);
  // Redirigir a la pestaña Comer dentro de Días
  navigate('itinerary');
  setTimeout(() => renderItinerary('food'), 50);
}

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
        <div class="visa-country">🇻🇳 Vietnam</div>
        <div class="visa-name">e-Visa Vietnam</div>
        <div class="visa-detail">25 USD · online · 30 días</div>
        <div class="visa-steps">
          <div class="visa-step">1. Accede a evisa.xuatnhapcanh.gov.vn</div>
          <div class="visa-step">2. Rellena el formulario con datos del pasaporte</div>
          <div class="visa-step">3. Paga 25 USD con tarjeta</div>
          <div class="visa-step">4. Recibe el e-Visa por email en 3 días hábiles</div>
          <div class="visa-step">5. Imprímelo o guárdalo offline</div>
        </div>
        <div class="visa-warning">⚠️ Pasaporte con mínimo 6 meses de vigencia desde la fecha de regreso</div>
      </div>
      <div class="visa-card visa-kh">
        <div class="visa-country">🇰🇭 Camboya</div>
        <div class="visa-name">e-Visa Camboya</div>
        <div class="visa-detail">36 USD · online · 30 días</div>
        <div class="visa-steps">
          <div class="visa-step">1. Accede a evisa.gov.kh</div>
          <div class="visa-step">2. Sube foto pasaporte y foto personal</div>
          <div class="visa-step">3. Paga 36 USD con tarjeta</div>
          <div class="visa-step">4. Recibe aprobación en 3 días hábiles</div>
          <div class="visa-step">5. Imprime en color — lo comprueban en frontera</div>
        </div>
        <div class="visa-warning">⚠️ También disponible a la llegada pero hay colas largas. Online es más rápido.</div>
      </div>
    </div>`;

  // ── Emergencias ──
  const em = window.EMERGENCY_DATA || {};
  const emergencySection = `
    <div class="section-title">🆘 Datos de emergencia</div>
    <div class="emergency-card">
      <div class="em-block">
        <div class="em-title">📘 Pasaportes</div>
        ${(em.passports || []).map(p => `
          <div class="em-row">
            <span class="em-who">${p.who}</span>
            <span class="em-val">${p.number} · Cad. ${p.expires}</span>
          </div>
          ${p.notes ? `<div class="em-note">${p.notes}</div>` : ''}`).join('')}
      </div>
      <div class="em-block">
        <div class="em-title">🏥 Seguro médico</div>
        <div class="em-row"><span class="em-who">Compañía</span><span class="em-val">${em.insurance?.company || '—'}</span></div>
        <div class="em-row"><span class="em-who">Póliza</span><span class="em-val">${em.insurance?.policy || '—'}</span></div>
        <div class="em-row em-phone-row">
          <span class="em-who">Asistencia 24h</span>
          <a class="em-phone" href="tel:${em.insurance?.intlPhone}">${em.insurance?.intlPhone || '—'}</a>
        </div>
      </div>
      <div class="em-block">
        <div class="em-title">Embajadas de España</div>
        ${(em.embassies || []).map(e => `
          <div class="em-embassy">
            <div class="em-emb-country">${e.country} — ${e.name}</div>
            <div class="em-emb-addr">${e.address}</div>
            <a class="em-phone" href="tel:${e.phone}">${e.phone}</a>
          </div>`).join('')}
      </div>
      <div class="em-block">
        <div class="em-title">🚨 Emergencias locales</div>
        ${(em.localEmergency || []).map(e => `
          <div class="em-row">
            <span class="em-who">${e.country}</span>
            <span class="em-val">Policía: ${e.police} · Ambulancia: ${e.ambulance}</span>
          </div>`).join('')}
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

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  navigate('home');
});
