# Memoria Maestra — App Viajes Marcos & Mery

**Versión:** 3.0 (reescrita entera el 6-oct-2026; la 2.x era de septiembre y estaba desfasada)
**Propósito:** recuperar el proyecto en cualquier cuenta, máquina o IA solo con este documento.
**Documentos hermanos:** `COORDINACION_SESIONES.md` (qué pasa ahora entre los dos PCs, léelo primero), `CONTINUIDAD.md` (estado y pendientes), `HISTORIAL_DE_CAMBIOS.md` (qué se hizo, cuándo y por qué).

---

## RESUMEN EJECUTIVO

**Viajes Marcos & Mery** es una PWA (app web instalable en el móvil como si fuera nativa) que sirve de guía personal para el viaje de Marcos y Mery (María) a **Vietnam y Camboya: 26 días, del 5 al 30 de noviembre de 2026** (vuelos de ida Santiago → Barcelona → Shenzhen → Hanói y vuelta Hanói → Shenzhen → Barcelona → Santiago el 29-30). Sin servidor, sin login, sin base de datos: HTML/CSS/JS sin frameworks, publicado gratis en GitHub Pages y usable **sin conexión** durante el viaje.

- **URL:** https://marcospenas.github.io/viajes-marcos-mery
- **Repo:** https://github.com/MarcosPenas/viajes-marcos-mery (**público**)
- **Ruta local:** `...\MEGA\08_Scripts\App Viajes Marcos Mery`, sincronizada por MEGA entre el PC del trabajo (`C:\Users\mpe.HP2008\...`) y el de casa (`C:\Users\marco\...`). MEGA **no** sincroniza archivos que empiezan por punto (`.git`, `.gitignore`, `.claude/`): ver Parte 12.
- **Fuente del itinerario:** documento final de María (`itinerario final V&C (1).odt`), integrado y revisado línea a línea el 5-oct-2026 (`REVISION_ITINERARIO_MARIA.md`).

---

## PARTE 1 — QUÉ HACE LA APP (por pantalla)

| Pantalla | Qué tiene |
|---|---|
| **Inicio** | Foto de cabecera rotatoria, **estado del modo sin conexión** («✓ Lista para usar sin conexión · N fotos»), reloj doble (Santiago / Asia), tiempo de cada destino (rota cada 15 s; medias de noviembre sin conexión), ruta del viaje por zonas, consejos, **Notas** (notas libres, «Qué llevar» en 5 categorías, tareas previas), conversor EUR ↔ VND/KHR/USD (elige solo la moneda del país en que se está) y **frases de supervivencia** en vietnamita/jemer. Con un solo viaje se salta «Mis viajes». |
| **Hoy** | Antes del viaje: cuenta atrás, preparativos y avisos. Durante el viaje: **«Ahora / Siguiente»** (lo próximo con hora y botones de punto de salida, localizador, llamar), **avisos de hoy y mañana** (salida del hotel, vuelos, fronteras, madrugones, bus nocturno, tareas con fecha), el día completo y el progreso del viaje. «Viajar en el tiempo» simula cualquier día. |
| **Días** | Pestañas Días (lista por zonas), Transportes (todos los trayectos, con localizador) y Alojamiento (línea temporal; cada tarjeta abre la **ficha del alojamiento**). |
| **Día** | Resumen (transporte con localizador, hotel con dirección/teléfono/«Cómo llegar», ficha «Sobre la ciudad», cultura y contexto), Lugares (fichas con foto, descripción, consejos, mini mapa, «Cómo llegar», favorito, visitado), Qué comer, Mapa del día y Notas. |
| **Mapa** | Leaflet con 145 lugares por categoría, favoritos/visitados y «Cerca de mí» con seguimiento en vivo. |
| **Docs** | **Reservas del viaje** (cronológico: transportes con localizador y alojamientos, con HOY/MAÑANA), visados, documentos propios (enlaces a Drive) y datos de emergencia. |
| **SOS** (cabecera, siempre visible con un viaje abierto) | Emergencias y embajada del país en que se está, alojamiento de esta noche (cómo llegar, llamar) y acceso a Documentos. |

Tema claro/oscuro (sigue al sistema o al botón de la luna). Pantalla ampliable con los dedos (el 6-oct se quitó `user-scalable=no`; los campos de texto son de 16 px para que iOS no amplíe solo al escribir).

---

## PARTE 2 — ESTRUCTURA DE CARPETAS

```
App Viajes Marcos Mery\
├── index.html          ← entrada única de la SPA (aquí están los ?v=N vigentes)
├── manifest.json       ← PWA (start_url /viajes-marcos-mery/ — NO CAMBIAR)
├── sw.js               ← service worker (prefijo /viajes-marcos-mery/ — NO CAMBIAR)
├── css\styles.css      ← todos los estilos
├── js\data.js          ← itinerario (DEFAULT_DATA) + AppData (carga/guardado/fusión)
├── js\guia.js          ← contenido fijo: SURVIVAL_DICT, CULTURE_CARDS, HOTEL_INFO
├── js\app.js           ← toda la lógica y las vistas
├── img\icon-192.png, icon-512.png
├── img\fotos\          ← 194 fotos fijas de las fichas (revisadas a ojo, máx. 800 px)
├── img\places\         ← 11 portadas de días/ciudades e iconos de la Ruta
├── tools\check_imagenes.py           ← test OBLIGATORIO antes de publicar (debe dar OK)
├── tools\servidor_ruta_produccion.py ← prueba del modo sin conexión en local
├── tools\sin_foto.txt, fotos_compartidas.txt
├── CREDITOS_FOTOS.md   ← origen y licencia de cada foto
├── CLAUDE.md           ← instrucciones para la IA
├── 00_INSTALACION\     ← cómo instalar en otro PC
├── 01_ESPECIFICACIONES\ ← esta memoria, CONTINUIDAD, COORDINACION_SESIONES, HISTORIAL,
│                          REVISION_ITINERARIO_MARIA, PALETA_COLORES.html, auditorías de imágenes (JSON)
└── 02_DESARROLLO\      ← material antiguo, fuera de git (incluye portadas retiradas)
```

**Regla:** el código activo (`index.html`, `css/`, `js/`, `img/`, `sw.js`, `manifest.json`) debe estar en la **raíz** del repo: GitHub Pages lo sirve desde ahí.

---

## PARTE 3 — VERSIONES (la fuente de verdad es `index.html`)

Al tocar CSS o JS hay que subir su `?v=N` en `index.html`. Al tocar `DEFAULT_DATA` en `data.js` hay que subir **también** `DATA_VERSION` (dentro de `data.js`): si no, los móviles siguen con los datos guardados. Estado a 6-oct-2026 (comprobar siempre con grep, cambian casi a diario):

| Archivo | Versión |
|---|---|
| css/styles.css | `?v=100` |
| js/data.js | `?v=88`, `DATA_VERSION` 87 |
| js/guia.js | `?v=3` |
| js/app.js | `?v=179` |
| sw.js | cachés `viajes-shell-v4` y `viajes-media-v1` |

---

## PARTE 4 — DATOS (`js/data.js`)

- `DEFAULT_DATA.trips[0]`: el viaje, con `days[]` (26). Cada día: `date, city, country, block, summary, places[], restaurants[], transport[], hotel{}, tasks[], notes`.
- **Lugares** (`places`): `name, type, lat, lng, photo, notes, description, tips`. **Platos** (`restaurants`): ídem sin coordenadas.
- **Transportes:** `type` (flight, bus, train, ferry, car), `icon, details, from, to, km, time` y `ref: true` si tiene reserva (ver Parte 9). Cuentan en las estadísticas (una fila por medio: vuelos, trenes, buses, barcos, coche).
- **Hotel del día:** `name, address, phone, checkIn, checkOut, breakfast`. Lo que falte se completa con `HOTEL_INFO` (Parte 5).
- **Bloques (zonas):** Vuelos · El Norte · Angkor · Phnom Penh · Delta del Mekong · El Centro · Ninh Binh · Vuelta al Norte · El Cierre · Vuelta a casa. Colores en una sola tabla, `BLOCK_ZONE_COLORS` (app.js).
- `DEFAULT_DATA.tasks` (tareas previas con fecha), `contacts` (embajada/consulado), `localEmergency` (teléfonos por país).
- **Guardado:** localStorage `viajes_db` + `viajes_db_version`. Al subir `DATA_VERSION`, `AppData.mergeUserState` conserva lo del usuario: favoritos/visitados (`placeState`), **localizadores** (`bookingRefs`), notas, casillas de equipaje/tareas, elementos añadidos (id terminado en 13 cifras) y documentos.

---

## PARTE 5 — CONTENIDO FIJO (`js/guia.js`)

- `SURVIVAL_DICT` (`vi`/`km`: `lang, note, phrases[{es, local, pron}]`): frases de supervivencia (Inicio).
- `CULTURE_CARDS` (clave = `block`): tarjetas «Cultura y contexto» del Resumen del día.
- `HOTEL_INFO` (clave = `hotel.name` exacto): `address, phone, checkIn, checkOut, lat, lng, maps, desc` de los 12 alojamientos (dirección, teléfono y coordenadas de Google Maps; horarios de Booking/Trip/Agoda). **Si cambia un hotel en data.js, actualizar su entrada aquí.** Sin fotos de hoteles: tienen derechos y el repo es público (el botón de Google Maps lleva a fotos y opiniones).
- En `app.js`: `CITY_INFO` (curiosidades y platos por ciudad, para «Sobre <ciudad>»), `WEATHER_DESTINATIONS` (ruta real y medias de noviembre), `FX_RATES` (VND 29.600, KHR 4.630, USD 1,14 por € — actualizadas el 28-sep-2026), `TRANSPORT_TIPS`.

---

## PARTE 6 — LÓGICA PRINCIPAL (`js/app.js`)

Funciones a conocer (buscar por nombre; los números de línea cambian):

| Función / tabla | Para qué |
|---|---|
| `today()`, `isoLocal()` | Fecha **local** del móvil (no UTC: en Vietnam/Camboya UTC+7 se equivocaba de 00:00 a 07:00, corregido el 6-oct). |
| `navigate()` / `renderView()` | Router de la SPA. `clearHomeTimers()` cancela los temporizadores de Inicio al cambiar de vista. |
| `renderTripDashboard()`, `renderToday()`, `renderItinerary(tab)`, `renderDay(date)`, `renderMap()`, `renderDocs()` | Vistas. |
| `dayEvents(trip, date)` | Momentos con hora de un día: salida del hotel anterior, transportes y entrada en el nuevo. Base de lo siguiente. |
| `buildNowNextHTML`, `buildAlertsHTML`, `buildReservationsHTML`, `openSOS` | «Ahora/Siguiente», avisos, centro de reservas y hoja SOS. |
| `hotelInfo`, `hotelStay`, `hotelLinks`, `openHotelDetail` | Datos, estancia, enlaces y ficha de cada alojamiento. |
| `bookingRefHtml`, `editBookingRef`, `copyBookingRef` | Localizadores guardados solo en el móvil. |
| `cityForDayInfo`, `_cleanCityName`, `CITY_WIKI_ES`, `loadCitySummary` | Ficha «Sobre <ciudad>» (origen o destino en días de traslado; si no hay Wikipedia se muestra igualmente lo propio). |
| `loadWikiPhoto`, `_localImgSlug` | Fotos que no son fichas (iconos de la Ruta). **No modificar `_localImgSlug`.** Las fichas usan solo su `photo` fija (`data-fixed`). |
| `packCategory` | Categoría de «Qué llevar» según el emoji inicial del artículo. |
| `flagText` | Banderas emoji; en Windows (que no las dibuja) las cambia por imágenes. |
| `precacheCuratedPhotos`, `updateOfflineStatus` | Precarga para usar sin conexión e indicador en Inicio. |
| `BLOCK_ZONE_COLORS`, `zoneColor`, `applyZoneColors` | Colores de zona (tabla única). |

---

## PARTE 7 — MODO SIN CONEXIÓN (`sw.js`)

- **Armazón** (`SHELL`: index, css, js, manifest, iconos, Leaflet): red primero y caché si no hay. Al guardar una versión nueva (`?v=N`) se borran las anteriores del mismo archivo. Todo archivo nuevo de la app debe añadirse a `SHELL`.
- **Fotos y mosaicos del mapa:** caché primero; se guardan al verse. `precacheCuratedPhotos` (una vez al día con cobertura) guarda las 192 fotos de las fichas y los resúmenes de Wikipedia de todas las ciudades con su foto.
- **Wikipedia:** respuesta guardada al instante y se refresca en segundo plano.
- **Límite conocido:** los mosaicos del mapa solo funcionan sin conexión en las zonas vistas antes con cobertura (OpenStreetMap prohíbe descargarlos en bloque). Consejo: abrir con wifi el mapa de cada ciudad antes del viaje.
- **Probarlo en local:** `py -3 tools/servidor_ruta_produccion.py 3001` → http://localhost:3001/viajes-marcos-mery/, esperar ~20 s, parar el servidor y recargar. Probado el 6-oct: 515 fotos de los 26 días y todo lo demás sin fallos.

---

## PARTE 8 — SERVICIOS EXTERNOS

| Servicio | Para qué | Sin conexión |
|---|---|---|
| Wikipedia REST (es: resúmenes de ciudad; en: fotos de fondo) | «Sobre <ciudad>», fondos | Guardado por el SW |
| Wikimedia Commons | Carrusel de fotos extra de cada lugar | Solo lo ya visto |
| wttr.in | Tiempo | Medias de noviembre |
| OpenStreetMap | Mosaicos del mapa | Solo zonas vistas |
| flagcdn.com | Banderas del conversor (y de todo en Windows) | Guardadas al verse |
| Google Fonts (Poppins) | Tipografía | Usa la del sistema |
| unpkg (Leaflet 1.9.4, con `integrity`) | Mapas | En `SHELL` |

Si se cambia la URL de Leaflet, recalcular el `integrity` con el hash real (cabecera `content-digest`), nunca de memoria.

---

## PARTE 9 — PRIVACIDAD Y SEGURIDAD (el repo es PÚBLICO)

- **Nada personal en el repo:** ni pasaportes, ni pólizas, ni teléfonos privados (solo emergencias públicas y embajada).
- **Nunca localizadores de reserva** (con localizador + apellido se puede cancelar un vuelo; el apellido sale en el usuario de GitHub). Los transportes con reserva llevan `ref: true` y cada uno apunta su localizador en el móvil («🔒 Añadir localizador»), que se guarda en `DB.bookingRefs` y nunca se publica. Los 5 que estuvieron publicados del 3 al 6-oct siguen en el historial antiguo de GitHub (Marcos decidió no reescribirlo).
- **Token de GitHub:** el antiguo (expuesto en septiembre) está **revocado** desde el 2-oct-2026. Para publicar se usa el gestor de credenciales de Git de cada PC; si hiciera falta un token, crearlo en https://github.com/settings/tokens y no guardarlo en ningún archivo.

---

## PARTE 10 — CÓMO TRABAJAR

**Arrancar en local:** `py -3 -m http.server 3000 --directory "<ruta del proyecto>"` → http://localhost:3000 (en `.claude/launch.json` de cada PC como `viajes-app`).

**Antes de publicar:**
1. `py -3 tools/check_imagenes.py` → debe dar OK.
2. Comprobar que no hay localizadores ni datos personales en lo que se sube.
3. Versiones subidas (`?v=N` y, si cambió data.js, `DATA_VERSION`).
4. Opcional: prueba sin conexión (Parte 7).
5. Leer `COORDINACION_SESIONES.md` (quién tiene commits sin publicar) y anotar ahí la publicación.

**Publicar:** `git add …`, `git commit`, `git push` (GitHub Pages actualiza en 1-3 min). Comprobar en la URL de producción que salen los `?v=` nuevos.

**Añadir una foto a una ficha:** JPEG en `img/fotos/` (máx. 800 px, revisado a ojo), `photo:` en la ficha de data.js, quitarla de `tools/sin_foto.txt`, fila en `CREDITOS_FOTOS.md`, subir `?v=` y `DATA_VERSION`. Criterio: mejor sin foto (icono neutro) que una que no sea el sitio o el plato real.

**Emojis:** usar solo emojis que también dibuje Windows 10 (los recientes, como 🧭 🛕 🧳 🩺, salen como un cuadrado). Hay una comprobación en `HISTORIAL_DE_CAMBIOS.md` (6-oct, 4ª parte).

---

## PARTE 11 — REGLAS QUE NUNCA DEBEN ROMPERSE

1. Código activo en la raíz del repo (GitHub Pages).
2. `.bottom-nav` con `position: fixed`.
3. `sw.js`: todos los paths con el prefijo `/viajes-marcos-mery/`.
4. `manifest.json`: `start_url` = `/viajes-marcos-mery/`.
5. No modificar `_localImgSlug()`.
6. Al tocar CSS/JS, subir `?v=N`; al tocar `DEFAULT_DATA`, subir también `DATA_VERSION`.
7. Nada personal ni localizadores en el repo.
8. Fechas siempre con `today()`/`isoLocal()` (hora local), nunca `toISOString()`.
9. Entregar archivos completos, nunca fragmentos.

---

## PARTE 12 — DOS PCs Y GIT

- MEGA sincroniza los archivos entre el PC del trabajo y el de casa, **pero no los que empiezan por punto**: `.git`, `.gitignore` y `.claude/` son de cada PC. GitHub es la única sincronización del historial.
- **Ponerse al día:** `git fetch origin` + `git reset --mixed origin/main` (mueve el historial sin tocar archivos). **Nunca `--hard`:** MEGA ya habrá traído los archivos nuevos del otro PC y `--hard` los pisaría con versiones viejas (y MEGA propagaría la pérdida).
- Si el otro PC tiene commits sin publicar, no commitear en este: trabajar sobre los archivos y anotarlo en `COORDINACION_SESIONES.md`.
- El `.gitignore` local puede estar atrasado (MEGA no lo sincroniza): antes de commitear, comparar con el del repo (`git diff .gitignore`).
- `.claude/` está ignorado desde el 6-oct (cada PC tiene su `launch.json` con sus rutas).
- **Último estado:** publicado desde el PC del trabajo el 6-oct-2026 (`c376f15` + `0e4d86a`), con todo lo del 5-oct (de casa) y del 6-oct. El PC de casa debe hacer `git branch backup-5oct` + `git reset --mixed origin/main` y no subir sus commits del 5-oct.

---

## PARTE 13 — ITINERARIO Y FUENTES DE CONTENIDO

- Itinerario de 26 días integrado del documento de María (5-oct); decisiones y erratas en `REVISION_ITINERARIO_MARIA.md`.
- **Listas de Google Maps de Marcos** (pool de sitios; criterio de relevancia: ≥150-300 reseñas):

| Lista | Enlace |
|---|---|
| Vietnam Norte - Hanoi | https://maps.app.goo.gl/KSPSeLS9bKX3ic3VA |
| Vietnam Norte - Cat Ba | https://maps.app.goo.gl/Queu2j7QVMcGRuJv8 |
| Vietnam Norte - Ninh Binh | https://maps.app.goo.gl/SArHkwMsSthejCfw7 |
| Vietnam Centro | https://maps.app.goo.gl/LqHfBKmo5HiVkr3g9 |
| Vietnam Sur | https://maps.app.goo.gl/gJj2qZx4U8ufNCdS7 |
| Camboya Norte | https://maps.app.goo.gl/LFqn3pihLj3DEyTKA |
| Camboya Sur | https://maps.app.goo.gl/j2n7eXi5NrVSqVmC6 |

  Se abren en un navegador real (necesitan JavaScript). Por automatización solo cargan los primeros 20 sitios; para la lista completa, Claude en Chrome.
- Datos verificados el 6-oct-2026: el Mausoleo de Ho Chi Minh **abre** el 8-nov (mantenimiento 2026 del 4-sep al 2-nov); con pasaporte español **no hace falta visado para China** (escala en Shenzhen; exención de 30 días hasta el 31-dic-2026).

---

## PARTE 14 — PREFERENCIAS DE MARCOS

1. Español claro, sin tecnicismos innecesarios.
2. No afirmar que algo funciona sin probarlo; comprobar en el navegador.
3. Documentar cada cambio en `01_ESPECIFICACIONES` (HISTORIAL, CONTINUIDAD, COORDINACION y esta memoria si cambia algo estructural).
4. Publicar solo cuando Marcos lo pida.
5. Colores: sin violetas, rosas ni terracota/naranja; en oscuro, tonos que no contrasten de más; texto gris legible (mínimo 4,5:1).
6. Fotos: mejor ninguna que una que no sea el sitio real.
7. Ideas nuevas: apuntarlas, no implementarlas sin que las pida.

---

## PARTE 15 — LIMITACIONES CONOCIDAS (no son fallos)

- 22 fichas sin foto (icono neutro): platos muy locales sin foto libre; solución real, fotos propias.
- Mapa sin conexión solo en zonas vistas con cobertura (Parte 7).
- La instalación en iPhone (Safari) no se ha probado en un dispositivo real.
- Las banderas emoji salen como imagen en Windows (necesitan conexión la primera vez); en el móvil son emoji.

---

## PARTE 16 — HISTORIAL RESUMIDO

| Fecha | Hito |
|---|---|
| Jun-jul 2026 | Primera versión (23 días), PWA, GitHub Pages |
| 2-sep | Proyecto movido a MEGA y reorganizado |
| 7-sep | Arreglos de mapa (hash de Leaflet) y portadas; detectado que `.git` no se sincroniza |
| 28-sep | Itinerario reescrito (25 días, sin Koh Rong, con el Delta del Mekong) |
| 29-sep a 2-oct | Contenido de María, auditoría de imágenes, mapa Leaflet propio, bug de fotos ocultas; 2-oct primer push real y token revocado |
| 3-oct | Fotos congeladas (`img/fotos/`), service worker que por fin funciona, paleta sin violetas |
| 5-oct | Itinerario definitivo de María (26 días), colores unificados, contraste, revisión general |
| 6-oct | Frases y cultura, fichas reales de hoteles, traslados en estadísticas, Mausoleo/Shenzhen verificados, «Sobre la ciudad» sin cobertura, localizadores fuera del repo, publicación, «Ahora/Siguiente», avisos, centro de reservas, SOS, indicador sin conexión, fecha local, caché del SW, emojis compatibles, zoom |

Detalle completo en `HISTORIAL_DE_CAMBIOS.md`.

---

## ANEXO A — BLOQUE DE CONTEXTO PARA UNA IA NUEVA

> Soy Marcos. Tengo una PWA de guía de viaje (Vietnam y Camboya, 5-30 nov 2026, 26 días) hecha con Claude Code: HTML/CSS/JS sin frameworks, publicada en https://marcospenas.github.io/viajes-marcos-mery (repo público MarcosPenas/viajes-marcos-mery). La carpeta está en `...\MEGA\08_Scripts\App Viajes Marcos Mery` y se sincroniza por MEGA entre dos PCs, pero `.git` no (cada PC tiene su repo; ponerse al día con `git reset --mixed origin/main`, nunca `--hard`). Lee primero `01_ESPECIFICACIONES/COORDINACION_SESIONES.md`, luego `CONTINUIDAD.md` y `MEMORIA_MAESTRA.md`. Reglas: código en la raíz; `sw.js` y `manifest.json` con el prefijo `/viajes-marcos-mery/`; subir `?v=N` y `DATA_VERSION`; nada personal ni localizadores en el repo; `py -3 tools/check_imagenes.py` antes de publicar; publicar solo cuando yo lo pida.

---

## ANEXO B — PALETA

Referencia visual: `01_ESPECIFICACIONES/PALETA_COLORES.html`. Tabla única `BLOCK_ZONE_COLORS` (app.js): El Norte / Vuelta al Norte jade `#1A7B6B`, El Centro azul acero `#2f6fa3`, Angkor ocre `#b8861b`, Phnom Penh marrón `#8B5E3C`, Delta del Mekong verde `#2e8b57`, Ninh Binh verde oliva `#4a7c3f`, El Cierre oliva `#6b7f3a`, Vuelos / Vuelta a casa pizarra `#5c6b7a`. Dos mecanismos de tema que deben ir a la par: `html[data-theme="dark"]` y `@media (prefers-color-scheme: dark)` con `html:not([data-theme="light"])`. Texto en color de zona: `style="--zc:…;color:var(--zc)"` (se oscurece en claro y se aclara en oscuro).

## ANEXO C — GLOSARIO

| Término | Significado |
|---|---|
| PWA | App web instalable sin tienda |
| SW | Service worker: guarda la app y las fotos para usarlas sin conexión |
| SPA | Una sola página HTML; la navegación la hace JavaScript |
| `DATA_VERSION` | Versión de los datos de `data.js`; al subirla, los móviles recargan el itinerario conservando lo del usuario |
| `ref: true` | Transporte con reserva: la app ofrece guardar su localizador en el móvil |
| Fotos congeladas | Cada ficha usa solo su foto fija de `img/fotos/`, revisada a mano |
| VND / KHR | Dong vietnamita / riel camboyano |
