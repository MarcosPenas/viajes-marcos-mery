# Memoria Maestra — App Viajes Marcos & Mery

**Versión:** 2.1  
**Fecha:** 7 septiembre 2026  
**Propósito:** Recuperación total del proyecto en cualquier cuenta, máquina o IA

---

## RESUMEN EJECUTIVO

**Viajes Marcos & Mery** es una PWA (Progressive Web App) instalable en móvil como si fuera una app nativa. Funciona como guía de viaje personal para un viaje de 23 días a Vietnam y Camboya (7–29 noviembre 2026). Sin servidor, sin backend, sin login. Todo el código, datos e imágenes están en archivos locales. Se publica en GitHub Pages de forma gratuita.

**URL pública:** https://marcospenas.github.io/viajes-marcos-mery  
**Repo GitHub:** https://github.com/MarcosPenas/viajes-marcos-mery  
**Ruta local:** `...\MEGA\08_Scripts\App Viajes Marcos Mery` (la carpeta se sincroniza vía MEGA entre el PC del trabajo, `C:\Users\mpe.HP2008\...`, y el de casa, `C:\Users\marco\...` — ver Parte 19 para lo que NO se sincroniza)  
**Estado:** [FUNCIONANDO] en producción. Instalable en Android e iOS.

---

## PARTE 1 — VISIÓN GENERAL

- **Tipo de app:** PWA · Single Page Application · Vanilla JS (sin frameworks, sin npm, sin build)
- **Para quién:** Uso personal exclusivo de Marcos y Mery. Sin login, sin contraseña.
- **Función:** Guía de viaje interactiva con itinerario de 23 días, fotos, mapas, tiempo, divisas, reloj, visados y documentos.
- **Hosting:** GitHub Pages (gratuito, repo público)
- **Offline:** Service Worker cachea ~200 imágenes + todo el código → funciona sin internet una vez instalada
- **Inicio del proyecto:** Junio 2026
- **Última actividad:** Septiembre 2026

---

## PARTE 2 — FUNCIONES DE LA APP

| Función | Estado |
|---|---|
| Vista Home — lista de viajes con cuenta regresiva | ✅ VALIDADO |
| Dashboard — tiempo, reloj, divisas, hero, consejos | ✅ VALIDADO |
| Itinerario — 23 días con pestañas Días/Hoteles/Comer | ✅ VALIDADO |
| Detalle de día — places, restaurantes, transporte, hotel, tareas | ✅ VALIDADO |
| Vista Hoy — día actual del viaje | ✅ VALIDADO |
| Mapa — Leaflet + embed Google My Maps | ✅ VALIDADO (estuvo roto hasta el fix del 7-sep-2026, ver Parte 12) |
| Docs — visados, documentos, datos de emergencia | ✅ VALIDADO |
| Galería de imágenes — carrusel local + Wikimedia Commons | ✅ FUNCIONANDO |
| Tiempo meteorológico — wttr.in + fallback offline | ✅ FUNCIONANDO |
| Reloj doble huso — Santiago UTC+1 / Asia UTC+7 | ✅ VALIDADO |
| Conversor divisas — EUR↔VND/KHR/USD (tasas fijas) | ✅ VALIDADO |
| Modo oscuro/claro con toggle | ✅ VALIDADO |
| Instalación PWA en Android | ✅ VALIDADO |
| Instalación PWA en iOS | ⚠️ EN PRUEBAS |
| Offline completo | ⚠️ PARCIAL (mapa y tipografía requieren internet) |

---

## PARTE 3 — ARQUITECTURA

```
USUARIO (móvil/escritorio)
        ↓
[index.html] — entrada única
        ├── css/styles.css      (estilos + temas)
        ├── js/data.js          (datos del viaje — window.AppData)
        ├── js/imageMap.js      (mapa nombre→imagen — window.IMAGE_MAP)
        └── js/app.js           (toda la lógica de la app)
                ├── WIKI_ARTICLES     (nombre→artículo Wikipedia, ~275 entradas)
                ├── loadWikiPhoto()   (3 niveles: IMAGE_MAP → local → Wikipedia)
                ├── loadCarousel()    (galería: local + Commons en background)
                ├── fetchWeather()    (wttr.in con caché 30 min)
                ├── navigate()        (SPA router)
                └── render*()         (renderizado de cada vista)

APIS EXTERNAS (requieren conexión):
- Wikipedia REST API: en.wikipedia.org/api/rest_v1/
- Wikimedia Commons: commons.wikimedia.org/w/api.php
- wttr.in: wttr.in/{ciudad}?format=j1
- Leaflet tiles: tile.openstreetmap.org
- Google Fonts: fonts.googleapis.com
- flagcdn.com: banderas para divisas

SERVICE WORKER (sw.js):
- Cache name: "viajes-v2"
- Cachea ~210 archivos al instalar (prefijo /viajes-marcos-mery/ en todos los paths)
- Estrategia cache-first con fallback a index.html

DEPLOY:
- git push → GitHub Pages automático (1-5 min)
- URL: https://marcospenas.github.io/viajes-marcos-mery
```

---

## PARTE 4 — TECNOLOGÍAS

| Tecnología | Versión | Uso | Requiere internet |
|---|---|---|---|
| HTML5/CSS3/JS ES2021 | — | Toda la app | No |
| Leaflet.js | 1.9.4 | Mapas interactivos | Sí (CDN) |
| Google Fonts (Poppins) | — | Tipografía | Sí (CDN) |
| Wikipedia REST API | v1 | Imágenes de lugares | Sí |
| Wikimedia Commons API | — | Galería de fotos | Sí |
| wttr.in | — | Tiempo meteorológico | Sí |
| flagcdn.com | — | Banderas en divisas | Sí |
| Service Worker API | — | Caché offline | No (nativo) |
| Web App Manifest | — | Instalación PWA | No |
| localStorage | — | Tareas, tema, documentos | No (nativo) |
| GitHub Pages | — | Hosting gratuito | — |
| Python 3 http.server | — | Servidor local dev | No |

**Sin npm, sin webpack, sin React, sin Vue. Todo vanilla.**

---

## PARTE 5 — ESTRUCTURA DE CARPETAS

```
C:\Users\mpe.HP2008\Documents\MEGA\08_Scripts\App Viajes Marcos Mery\
│
├── 00_INSTALACION\
│   └── LEEME_INSTALACION.md        ← cómo instalar en otro PC
│
├── 01_ESPECIFICACIONES\
│   ├── MEMORIA_MAESTRA.md          ← este documento
│   ├── CONTINUIDAD.md              ← estado actual + próximas tareas
│   └── HISTORIAL_DE_CAMBIOS.md     ← registro de cambios importantes
│
├── 02_DESARROLLO\
│   ├── CAPTURAS_Y_RECURSOS_GRAFICOS\   ← icono original + 12 capturas de pantalla
│   ├── HERRAMIENTAS_AUDITORIA\         ← scripts Python de auditoría de imágenes
│   ├── IMAGENES_ANTERIORES\            ← 24 imágenes de una versión anterior
│   └── SCRIPTS_OBSOLETOS\              ← 18 scripts fix_*.py ya no necesarios
│
├── .claude\
│   └── launch.json                 ← config servidor local para Claude Code
│
├── CLAUDE.md                       ← instrucciones para la IA
├── .gitignore                      ← excluye *.py, sw_files.json, __pycache__/
│
│   ── CÓDIGO ACTIVO DE LA APP (debe estar en raíz del repo para GitHub Pages) ──
│
├── css\
│   └── styles.css                  ← todos los estilos (v=64, 2795 líneas)
│
├── img\
│   ├── icon-192.png                ← icono PWA 192×192
│   ├── icon-512.png                ← icono PWA 512×512
│   └── places\                     ← ~200 imágenes JPG de lugares del viaje
│
├── js\
│   ├── app.js                      ← lógica completa (v=102, 3935 líneas)
│   ├── data.js                     ← datos del itinerario (v=21, 1222 líneas)
│   └── imageMap.js                 ← mapa nombre→imagen (v=12, 123 líneas)
│
├── index.html                      ← entrada única de la SPA
├── manifest.json                   ← configuración PWA
└── sw.js                           ← Service Worker (caché offline, 242 líneas)
```

**NOTA IMPORTANTE:** El código activo (index.html, css/, js/, img/, sw.js, manifest.json) debe permanecer en la raíz del repositorio. GitHub Pages solo puede servir desde la raíz o desde una carpeta llamada `docs/`. Moverlos a cualquier otra subcarpeta rompe la app online.

---

## PARTE 6 — VERSIONES DE ARCHIVOS

Al modificar cualquier archivo JS o CSS, hay que incrementar el número `?v=N` en `index.html` para evitar que el navegador sirva la versión antigua desde caché.

| Archivo | Versión vigente | Referencia en index.html |
|---|---|---|
| css/styles.css | v=64 | `<link rel="stylesheet" href="css/styles.css?v=64">` |
| js/app.js | v=103 | `<script src="js/app.js?v=103">` |
| js/data.js | v=22 | `<script src="js/data.js?v=22">` (`DATA_VERSION` interno también en 22) |
| js/imageMap.js | v=12 | `<script src="js/imageMap.js?v=12">` |
| sw.js cache name | viajes-v2 | Definido en sw.js: `const CACHE = "viajes-v2"` |

**Nota:** `js/data.js` tiene ADEMÁS una constante interna `DATA_VERSION` (línea ~1192) que controla cuándo el navegador descarta los datos guardados en `localStorage` y recarga `DEFAULT_DATA`. Si se edita cualquier dato dentro de `DEFAULT_DATA` (itinerario, `coverImage`, etc.) hay que subir **tanto** el `?v=N` en index.html **como** `DATA_VERSION` dentro del propio archivo — si no, los usuarios que ya abrieron la app antes seguirán viendo los datos viejos cacheados en su navegador aunque el archivo en el servidor esté actualizado.

---

## PARTE 7 — ARCHIVOS CLAVE (descripción)

### index.html
Punto de entrada único. Carga todos los recursos. Registra el Service Worker. Define la estructura HTML base con header, `<main id="view-content">` y `.bottom-nav` de 5 botones.

**Registro del SW:**
```javascript
navigator.serviceWorker.register('/sw.js')
```

### css/styles.css (v=64, 2795 líneas)
Todos los estilos. Sistema de temas mediante CSS variables:
- `:root` → tema oscuro (defecto)
- `@media (prefers-color-scheme: light)` → sigue al sistema
- `html[data-theme="dark"]` / `html[data-theme="light"]` → toggle manual

Variables clave: `--primary: #1a3a5c`, `--bg: #0f1923`, `--nav-h: 64px`

**CRÍTICO:** `.bottom-nav` usa `position: fixed`. Si se cambia a `absolute`, la nav desaparece en móvil cuando el contenido hace scroll.

### js/app.js (v=103, 3935 líneas)
Toda la lógica de la app. Secciones principales:
- Líneas 1–38: Inicialización de tema + variables globales
- Líneas 40–274: `WIKI_ARTICLES` (~275 entradas nombre→artículo Wikipedia)
- Líneas 276–493: Sistema de imágenes (fetchWikiEntry, searchCommonsImages, loadCarousel, loadWikiPhoto)
- Líneas 495–608: Utilidades (save, getTrip, formatDate, navigate, updateNav)
- Líneas 634–794: Tiempo meteorológico (fetchWeather, WEATHER_DESTINATIONS con fallback offline)
- Líneas 800–1329: Vistas Home, Dashboard, reloj dual, conversor divisas, stats
- Líneas 1330+: Vistas Itinerario, Día, Hoy, Mapa, Docs, Gastronomía, Hoteles

### js/data.js (v=22, 1222 líneas)
Define `window.DEFAULT_DATA` y `window.AppData`. Contiene los 23 días del itinerario completo. `AppData.loadData()` lee de localStorage (clave `viajes-app-data`) o usa DEFAULT_DATA si no hay datos guardados.

**Estructura de un día:**
```javascript
{
  date: 'YYYY-MM-DD', city, country, block,
  summary, places[], restaurants[], transport[], hotel{}, tasks[], notes
}
```
**Bloques geográficos:** "El Norte" · "El Centro" · "Camboya" · "Islas" · "El Cierre"

### js/imageMap.js (v=12, 123 líneas)
Define `window.IMAGE_MAP` — 115 entradas nombre exacto → `img/places/archivo.jpg`. Tiene **máxima prioridad** sobre Wikipedia en la carga de imágenes.

### manifest.json
```json
{
  "name": "Viajes Marcos & Mery",
  "short_name": "Mis Viajes",
  "start_url": "/viajes-marcos-mery/",
  "display": "standalone",
  "background_color": "#1a3a5c",
  "theme_color": "#1a3a5c",
  "icons": [
    {"src": "img/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable"},
    {"src": "img/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"}
  ]
}
```
**CRÍTICO:** `start_url` debe ser `/viajes-marcos-mery/`. No cambiar.

### sw.js (242 líneas)
Service Worker offline. Cache name: `"viajes-v2"`. Estrategia cache-first. Lista ~210 archivos en el array ASSETS, **todos con prefijo `/viajes-marcos-mery/`**. Al añadir imágenes nuevas: añadir a ASSETS + cambiar cache name a `"viajes-v3"`.

---

## PARTE 8 — CÓDIGO CRÍTICO

### Pipeline de carga de imágenes (loadWikiPhoto)
```javascript
// Prioridad:
// 1. data-photo directo (si no es picsum)
// 2. window.IMAGE_MAP[placeName] → img/places/archivo.jpg
// 3. img/places/<slug>.jpg (generado desde artículo Wikipedia)
// 4. Wikipedia REST API online
async function loadWikiPhoto(imgEl, placeName) { ... }
```

### Generación de slug (no cambiar nunca)
```javascript
function _localImgSlug(name) {
  return name.toLowerCase()
    .replace(/[^\p{L}\p{N}_]/gu, '_')
    .replace(/_+/g, '_').replace(/^_|_$/g, '');
}
```

### Tasas de cambio (actualizar antes del viaje)
```javascript
const FX_RATES = {
  VND: { name: 'Dong vietnamita', symbol: '₫', perEur: 27000 },
  KHR: { name: 'Riel camboyano',  symbol: '៛', perEur: 4400  },
  USD: { name: 'Dólar USA',       symbol: '$', perEur: 1.08  },
};
```

### Registro del Service Worker (index.html)
```javascript
navigator.serviceWorker.register('/sw.js')
```

---

## PARTE 9 — INTEGRACIONES EXTERNAS

| API | URL | Auth | Caché en app |
|---|---|---|---|
| Wikipedia REST | `en.wikipedia.org/api/rest_v1/page/summary/{article}` | Sin key | En memoria (_wikiCache) |
| Wikimedia Commons | `commons.wikimedia.org/w/api.php` | Sin key | No |
| wttr.in | `wttr.in/{ciudad}?format=j1` | Sin key | 30 min (weatherCache) |
| OpenStreetMap | tiles CDN | Sin key | No (offline: mapa no funciona) |
| Google Fonts | fonts.googleapis.com | Sin key | No (offline: usa system-ui) |
| flagcdn.com | flagcdn.com/{w}x{h}/{cc}.png | Sin key | No |

---

## PARTE 10 — CONFIGURACIÓN CLAVE

### GitHub Pages
- Repo: `MarcosPenas/viajes-marcos-mery` (público)
- Rama: `main`
- Source: raíz del repo
- URL: `https://marcospenas.github.io/viajes-marcos-mery`

### Git remote (con token)
```bash
git remote set-url origin https://MarcosPenas:[TOKEN]@github.com/MarcosPenas/viajes-marcos-mery.git
```
⚠️ El token `[REDACTED_GITHUB_TOKEN]` fue expuesto en el chat — **REGENERAR**.

### Servidor local de desarrollo
```bash
py -3 -m http.server 3000 --directory "C:\Users\mpe.HP2008\Documents\MEGA\08_Scripts\App Viajes Marcos Mery"
```
Abrir: http://localhost:3000

---

## PARTE 11 — FLUJOS DE TRABAJO

### Publicar un cambio
```bash
git add nombre_archivo
git commit -m "Descripción del cambio"
git push
# GitHub Pages actualiza en 1-5 minutos
```
Antes del push: incrementar `?v=N` en index.html si se modificó CSS o JS.

### Añadir imagen local a un lugar
1. Descargar imagen de Wikimedia Commons
2. Guardar como `img/places/nombre_slug.jpg`
3. Añadir entrada en `imageMap.js`: `'Nombre Lugar': 'img/places/nombre_slug.jpg',`
4. Añadir path en `sw.js` ASSETS: `"/viajes-marcos-mery/img/places/nombre_slug.jpg",`
5. Cambiar cache name en sw.js (ej: `"viajes-v3"`)
6. Incrementar versión de imageMap.js en index.html
7. Commit y push

### Instalar app en móvil Android
1. Chrome → `https://marcospenas.github.io/viajes-marcos-mery`
2. Menú ⋮ → "Añadir a pantalla de inicio"

---

## PARTE 12 — ERRORES CONOCIDOS Y SOLUCIONES

| Error | Causa | Solución |
|---|---|---|
| Bottom nav no visible en móvil | `position: absolute` en .bottom-nav | Usar `position: fixed` (ya corregido) |
| Textos azules en modo claro | `var(--primary)` en textos | Overrides `html[data-theme="light"]` (ya corregido en v=64) |
| App da 404 al abrir | sw.js sin prefijo `/viajes-marcos-mery/` | Regenerar sw.js con prefijo (ya corregido en viajes-v2) |
| `git push` falla | Token expirado o no en URL del remote | `git remote set-url origin https://MarcosPenas:[TOKEN]@...` |
| App no muestra cambios | Caché del SW | Incrementar `?v=N` en index.html + cambiar cache name en sw.js |
| App no muestra cambios en `data.js` aunque se suba `?v=N` | `AppData.loadData()` prioriza los datos guardados en `localStorage` sobre `DEFAULT_DATA` mientras `DATA_VERSION` (const interna en data.js) no suba | Incrementar también `DATA_VERSION` dentro de `js/data.js`, no solo el `?v=N` de index.html |
| Mapa en blanco (solo botón "Abrir en Google Maps") | Hash `integrity` del `<script>` de Leaflet en `index.html` corrupto → el navegador bloquea el script por SRI (Subresource Integrity) | Recalcular el hash real (`curl -sI https://unpkg.com/leaflet@1.9.4/dist/leaflet.js` → cabecera `content-digest`) y sustituirlo. **Corregido el 7-sep-2026**, hash correcto: `sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=` |
| Fotos de cabecera de día / portada del viaje no se ven (se ve un degradado liso) | Rutas antiguas `assets/images/places/...` (carpeta ya no existe desde la reorganización del 2-sep-2026) en `CITY_PHOTOS` (app.js) y `coverImage` (data.js) | Usar rutas `img/places/...` que sí existen. **Corregido el 7-sep-2026** |

---

## PARTE 13 — SEGURIDAD

### ⚠️ TOKEN DE GITHUB EXPUESTO — ACCIÓN URGENTE
El token `[REDACTED_GITHUB_TOKEN]` fue compartido visiblemente en el chat.

**Regenerar en:** https://github.com/settings/tokens → Tokens (classic) → Delete → Generate new token (scope: `repo`)

### Datos personales en repo público
`js/data.js` puede contener datos de emergencia (pasaportes, seguro médico). El repo es **público**. Revisar si hay datos sensibles y considerar eliminarlos del código.

---

## PARTE 14 — ESTADO ACTUAL (septiembre 2026)

### Funciona y está comprobado
- Toda la app desplegada en GitHub Pages y accesible
- Instalación como PWA en Android con icono personalizado
- Galería de ~200 imágenes locales funcionando
- Tiempo, reloj doble, conversor de divisas
- Modo oscuro/claro
- Service Worker con caché offline
- Mapa (Leaflet) — corregido el 7-sep-2026, ver Parte 12
- Fotos de cabecera de día y portada del viaje — corregido el 7-sep-2026, ver Parte 12

### Pendiente — CRÍTICO
- **Regenerar token de GitHub** (el anterior fue expuesto)
- **Hacer commit + push** de los cambios del 7-sep-2026 (fix Mapa + fotos) en cuanto se regenere el token — no hay repo `.git` inicializado en la carpeta local actual, hay que resolver eso primero (ver Parte 19)

### Pendiente — ALTO
- **Auditoría visual de imágenes** — ya se revisaron Home, Dashboard, Días, Día 1 (Hanói), Día 3 (Cat Ba), Hoy, Mapa y Docs (7-sep-2026); falta pasar por el resto de los 23 días
- **Revisar datos personales** en data.js (repo público) — revisado el 7-sep-2026: `localEmergency` y `contacts` solo tienen teléfonos públicos de policía/ambulancia y la embajada de España, no hay pasaportes ni nº de seguro. No se detectó `EMERGENCY_DATA` como tal (el nombre real de la clave es `localEmergency`)

### Pendiente — MEDIO
- Verificar instalación en iOS Safari
- Actualizar tasas de cambio antes de noviembre 2026
- Añadir Leaflet a caché del SW para funcionamiento offline del mapa

---

## PARTE 15 — PREFERENCIAS DEL USUARIO

1. Código completo siempre — nunca fragmentos sueltos
2. Indicar nombre exacto del archivo y si reemplaza al anterior
3. Incrementar `?v=N` al modificar CSS o JS
4. Explicar antes de modificar código funcional
5. No afirmar que algo funciona sin probarlo
6. Instrucciones paso a paso con comandos exactos
7. No repetir soluciones descartadas
8. Español claro, sin tecnicismos innecesarios
9. Advertir cuando un cambio puede afectar a otras partes
10. No reescribir en grande sin aprobación previa

---

## PARTE 16 — REGLAS QUE NUNCA DEBEN ROMPERSE

1. `index.html`, `css/`, `js/`, `img/`, `sw.js`, `manifest.json` → **deben estar en la raíz del repo** (GitHub Pages)
2. `.bottom-nav` → `position: fixed` (no cambiar a absolute)
3. `sw.js` → todos los paths con prefijo `/viajes-marcos-mery/`
4. `manifest.json` → `start_url: "/viajes-marcos-mery/"`
5. `_localImgSlug()` → no modificar (rompe carga de imágenes locales)
6. Al modificar CSS/JS → incrementar `?v=N` en index.html
7. Al modificar `DEFAULT_DATA` en `js/data.js` → incrementar TAMBIÉN la constante interna `DATA_VERSION` (no solo el `?v=N`), o los navegadores que ya visitaron la app seguirán usando los datos viejos de `localStorage`
8. Si se cambia la URL del script de Leaflet (CDN) → recalcular el atributo `integrity` con el hash real (cabecera `content-digest` de la respuesta), nunca copiarlo de memoria

---

## PARTE 17 — PLAN DE RECUPERACIÓN RÁPIDA

### En un ordenador nuevo
```bash
# 1. Clonar
git clone https://MarcosPenas:[TOKEN]@github.com/MarcosPenas/viajes-marcos-mery.git

# 2. Arrancar servidor local
py -3 -m http.server 3000 --directory "ruta/al/proyecto"

# 3. Abrir en Chrome
# http://localhost:3000

# 4. La app en producción ya funciona — no hace falta hacer nada más
# https://marcospenas.github.io/viajes-marcos-mery
```

---

## PARTE 18 — HISTORIAL RESUMIDO

| Fecha | Evento |
|---|---|
| Jun 2026 | Inicio del proyecto PWA |
| Jun–Jul 2026 | Desarrollo de vistas, itinerario 23 días, galería, mapas, divisas, reloj |
| Jul 2026 | Auditoría completa de imágenes (4 pases Python + deduplicación) |
| Jul 2026 | Deploy en GitHub Pages, manifest PWA, Service Worker |
| Jul 2026 | Fix paths SW (`viajes-v1` → `viajes-v2`) |
| Jul 2026 | Fix bottom nav (`absolute` → `fixed`) |
| Jul 2026 | Fix modo claro (textos azules) |
| Jul 2026 | Icono personalizado Vietnam & Camboya generado con IA |
| 17 Jul 2026 | Token de GitHub expuesto en chat |
| 17 Jul 2026 | Generación primera Memoria Maestra |
| 2 Sep 2026 | Proyecto movido a nueva ruta: `MEGA\08_Scripts\App Viajes Marcos Mery` |
| 2 Sep 2026 | Reorganización de carpetas según guía de organización |
| 2 Sep 2026 | Memoria Maestra v2 + documentos de continuidad actualizados |
| 7 Sep 2026 | Revisión completa del proyecto en nueva cuenta de Claude Code; detectado que no hay repo `.git` en la carpeta local |
| 7 Sep 2026 | Fix: hash `integrity` de Leaflet corrupto en index.html — el mapa no cargaba en ningún navegador (bloqueo por SRI) |
| 7 Sep 2026 | Fix: 11 rutas `assets/images/places/...` obsoletas (carpeta eliminada en la reorganización del 2-sep) sustituidas por `img/places/...` en `CITY_PHOTOS` (app.js) y `coverImage` (data.js) |
| 7 Sep 2026 | Fix: `DATA_VERSION` en data.js subido a 22 para que el fix de `coverImage` llegue a navegadores con datos viejos en localStorage |

---

## PARTE 19 — GIT LOCAL: CADA PC TIENE EL SUYO, NO SE SINCRONIZA POR MEGA

Al retomar el proyecto el 7-sep-2026 se comprobó que la carpeta local **no tenía `.git`** (`git status` → "not a git repository"). La documentación previa (CLAUDE.md, tarea pendiente #1) asumía que solo faltaba hacer `git add/commit/push`, pero en realidad no había repositorio inicializado en esta ruta.

**Causa raíz (confirmada 8-sep-2026):** `.megaignore` en la raíz de la carpeta MEGA (afecta a todos los proyectos sincronizados, no solo a este) contiene la regla `-:.*`, que excluye de la sincronización cualquier archivo/carpeta que empiece por punto — incluidos `.git` y `.claude/`. Como Marcos desarrolla este proyecto en paralelo desde dos PCs (trabajo y casa) que comparten la carpeta vía MEGA, **el resto de archivos sí se sincroniza entre ambos equipos, pero `.git` nunca lo ha hecho ni lo hará**. GitHub es el único mecanismo real de sincronización de historial entre los dos PCs — MEGA solo mueve código, imágenes y documentación.

**Consecuencia práctica:** el 7 y 8 de septiembre de 2026, sesiones de Claude Code en cada uno de los dos PCs detectaron el mismo problema en paralelo y cada una inicializó su propio repo git local, de forma independiente:
- **PC del trabajo** (esta máquina, ruta `C:\Users\mpe.HP2008\...`): se clonó el remoto público de GitHub a una carpeta aparte, se copió su `.git` (conservando los 3 commits reales de GitHub) a la carpeta del proyecto, y se hizo un commit nuevo (`e67e14c`) encima con la reorganización de carpetas, la documentación y los fixes de mapa/fotos. Este historial **sí desciende** del commit remoto (`c8d9eb5`), así que un `git push` normal (sin `--force`) debería funcionar una vez configurado `origin` y regenerado el token.
- **PC de casa** (ruta `C:\Users\marco\...`): hizo `git init -b main` desde cero y un commit propio (`75ce58c`, 227 archivos) sin relación con el historial remoto. Para subir ese habría hecho falta `--force` o `--allow-unrelated-histories`.

Ninguno de los dos se ha subido a GitHub todavía (ambos bloqueados por el token pendiente de regenerar). **Antes de hacer push desde cualquiera de los dos PCs, comprobar con Marcos en qué estado está el otro**, para no perder trabajo. Recomendación: subir primero desde el PC del trabajo (`e67e14c`, no necesita `--force`) y, después, en el PC de casa, descartar el commit local (`git fetch origin && git reset --hard origin/main`, o guardar `75ce58c` en una rama aparte por si acaso) y seguir desde ahí.

**Para cualquier sesión futura en cualquiera de los dos PCs:** no asumáis que el otro PC tiene el mismo commit — comprobad `git log --oneline -5` y compararlo contra lo que diga esta sección antes de hacer push o asumir el estado del repo.

---

## ANEXO A — BLOQUE DE CONTEXTO COMPACTO PARA NUEVA IA

**Pegar esto al inicio de una nueva conversación:**

---

Soy Marcos. Tengo una app PWA de guía de viaje personal que desarrollé con Claude Code.

**Proyecto:** Viajes Marcos & Mery — guía de viaje privada para Vietnam y Camboya, 23 días, 7–29 noviembre 2026.

**Stack:** HTML/CSS/JS vanilla puro. Sin frameworks, sin npm, sin backend, sin login.

**Ruta local:** `...\MEGA\08_Scripts\App Viajes Marcos Mery` — el PC del trabajo la tiene en `C:\Users\mpe.HP2008\Documents\MEGA\...`, el de casa en `C:\Users\marco\Documents\MEGA\...` (mismo contenido, sincronizado por MEGA; comprobar cuál eres antes de copiar comandos con ruta absoluta)  
**Código activo:** en la raíz de esa carpeta (index.html, css/, js/, img/, sw.js, manifest.json)  
**Repo GitHub:** `https://github.com/MarcosPenas/viajes-marcos-mery` (público, usuario: MarcosPenas)  
**URL pública:** `https://marcospenas.github.io/viajes-marcos-mery`
**Git local:** OJO — `.git` NO se sincroniza entre los dos PCs vía MEGA (ver Parte 19). Cada PC tiene su propio repo local y su propio commit; comprobar `git log --oneline -5` en la máquina en la que estés antes de asumir nada, y no hacer push sin confirmar con Marcos qué PC va primero

**Documentación:** Lee `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` y `01_ESPECIFICACIONES/CONTINUIDAD.md`. Si hay ideas de mejora pendientes de Marcos, están en `Mejoras.txt` (raíz).

**Versiones actuales de archivos:**
- styles.css → `?v=64`
- app.js → `?v=103` (3935 líneas)
- data.js → `?v=22` (1222 líneas; `DATA_VERSION` interno = 22)
- imageMap.js → `?v=12` (123 líneas, 115 entradas)
- Cache SW → `"viajes-v2"`

**Servidor local:**
```bash
py -3 -m http.server 3000 --directory "...\MEGA\08_Scripts\App Viajes Marcos Mery"   # sustituir por tu ruta (ver arriba)
```

**Reglas críticas:**
1. El código activo DEBE estar en la raíz del repo (GitHub Pages lo requiere)
2. `.bottom-nav` → `position: fixed`, no cambiar
3. `sw.js` → todos los paths con prefijo `/viajes-marcos-mery/`
4. Al modificar CSS/JS → incrementar `?v=N` en index.html
5. Entregar siempre el archivo completo, nunca fragmentos

**Pendiente urgente:** Regenerar token de GitHub en https://github.com/settings/tokens (el anterior fue expuesto en el chat). Además, la carpeta local NO tiene `.git` inicializado (ver Parte 19) — resolver eso antes de poder subir nada.

**Estado:** App funcionando en producción, con dos fixes locales (7-sep-2026) pendientes de subir a GitHub: mapa (Leaflet) y fotos de cabecera de día/portada. Próximo paso: resolver la incidencia del repo git local, regenerar token, subir los fixes, y seguir con la auditoría visual del resto de días.

---

## ANEXO B — LISTA DE IMÁGENES (img/places/)

Ver array ASSETS en `sw.js` para la lista completa de ~200 imágenes cacheadas.

## ANEXO C — ARTÍCULOS WIKIPEDIA MAPEADOS

Ver constante `WIKI_ARTICLES` en `js/app.js` líneas 40–274 (~275 entradas).

## ANEXO D — GLOSARIO

| Término | Significado |
|---|---|
| PWA | Progressive Web App — app web instalable sin tienda de apps |
| SW | Service Worker — script que cachea assets para offline |
| SPA | Single Page Application — una sola página HTML, nav por JS |
| IMAGE_MAP | `window.IMAGE_MAP` — mapa nombre→imagen local (máxima prioridad) |
| WIKI_ARTICLES | Objeto en app.js — mapa nombre→artículo Wikipedia |
| slug | Nombre de archivo: minúsculas, sin espacios, guiones bajos |
| VND / KHR | Dong vietnamita / Riel camboyano |
| viajes-v2 | Nombre actual del caché del Service Worker |
