// Service Worker — Viajes Marcos & Mery
// - Shell (HTML/CSS/JS/datos): red primero, caché como respaldo → las actualizaciones llegan solas
//   cuando hay cobertura y la app sigue abriendo sin ella.
// - Fotos y mosaicos del mapa: caché primero, se guardan al verlos (y las fotos curadas del
//   itinerario se pre-descargan en segundo plano cuando la app se abre con cobertura).
const SHELL_CACHE = 'viajes-shell-v3';
const MEDIA_CACHE = 'viajes-media-v1';
const MEDIA_MAX_ENTRIES = 900;
const BASE = '/viajes-marcos-mery/';

const SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'css/styles.css',
  BASE + 'js/app.js',
  BASE + 'js/data.js',
  BASE + 'js/guia.js',
  BASE + 'manifest.json',
  BASE + 'img/icon-192.png',
  BASE + 'img/icon-512.png'
];
const LEAFLET = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];
const CORS_HOSTS = ['upload.wikimedia.org', 'thumb.wikimedia.org', 'images.pexels.com', 'tile.openstreetmap.org', 'unpkg.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    // Uno a uno y tolerando fallos: un 404 suelto no debe impedir que el SW se instale.
    await Promise.allSettled(SHELL.map(u => shell.add(u)));
    await Promise.allSettled(LEAFLET.map(async u => {
      const r = await fetch(new Request(u, { mode: 'cors', credentials: 'omit' }));
      if (r.ok) await shell.put(u, r);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [SHELL_CACHE, MEDIA_CACHE];
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !keep.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

function isMedia(url, req) {
  return req.destination === 'image' || CORS_HOSTS.includes(url.hostname) && url.hostname !== 'unpkg.com';
}

async function trimMedia(cache) {
  const keys = await cache.keys();
  if (keys.length > MEDIA_MAX_ENTRIES) {
    await Promise.all(keys.slice(0, keys.length - MEDIA_MAX_ENTRIES).map(k => cache.delete(k)));
  }
}

async function fetchCors(req) {
  const url = new URL(req.url);
  if (CORS_HOSTS.includes(url.hostname)) {
    try {
      const r = await fetch(new Request(req.url, { mode: 'cors', credentials: 'omit' }));
      if (r.ok) return r;
    } catch (_) { /* cae al fetch normal */ }
  }
  return fetch(req);
}

async function mediaFirst(req) {
  const cache = await caches.open(MEDIA_CACHE);
  const hit = await cache.match(req.url);
  if (hit) return hit;
  try {
    const res = await fetchCors(req);
    if (res && (res.ok || res.type === 'opaque')) {
      cache.put(req.url, res.clone()).then(() => trimMedia(cache));
    }
    return res;
  } catch (err) {
    const local = await caches.match(req.url, { ignoreSearch: true });
    if (local) return local;
    throw err;
  }
}

async function networkFirst(req) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const shell = (await cache.match(BASE + 'index.html')) || (await cache.match(BASE));
      if (shell) return shell;
    }
    throw err;
  }
}

// Resúmenes de Wikipedia (de ahí salen las fotos "en vivo"): respuesta de caché al instante
// y se refresca en segundo plano; sin cobertura sirve lo último guardado.
async function wikiApi(req) {
  const cache = await caches.open(MEDIA_CACHE);
  const hit = await cache.match(req.url);
  const refresh = fetch(req).then(res => { if (res && res.ok) cache.put(req.url, res.clone()); return res; });
  if (hit) { refresh.catch(() => {}); return hit; }
  return refresh;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (/(^|\.)wikipedia\.org$/.test(url.hostname) && url.pathname.includes('/api/rest_v1/')) {
    e.respondWith(wikiApi(req));
    return;
  }

  if (url.hostname === 'unpkg.com') {
    e.respondWith(caches.match(req.url).then(hit => hit || fetch(req)));
    return;
  }
  if (url.origin === self.location.origin && req.destination !== 'image') {
    e.respondWith(networkFirst(req));
    return;
  }
  if (isMedia(url, req)) {
    e.respondWith(mediaFirst(req));
  }
});

// La app pide pre-descargar las fotos curadas del itinerario (solo con cobertura).
self.addEventListener('message', e => {
  const msg = e.data || {};
  if (msg.type !== 'precache' || !Array.isArray(msg.urls)) return;
  e.waitUntil((async () => {
    const cache = await caches.open(MEDIA_CACHE);
    let done = 0;
    for (const u of msg.urls) {
      try {
        if (await cache.match(u)) { done++; continue; }
        const r = await fetch(new Request(u, { mode: 'cors', credentials: 'omit' }));
        if (r.ok) { await cache.put(u, r); done++; }
      } catch (_) { /* sin cobertura o foto caída: se intentará otra vez más adelante */ }
    }
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type: 'precache-done', done, total: msg.urls.length }));
    await trimMedia(cache);
  })());
});
