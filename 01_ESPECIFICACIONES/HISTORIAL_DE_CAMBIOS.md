# Historial de cambios — App Viajes Marcos & Mery

---

## 2026-10-03 (PC de casa, 3ª parte) — "Que todos los items tengan imagen": +12 fotos de fichas, portadas de los 25 días, poda de img/places, IMAGE_MAP eliminado

Marcos pidió comprobar que **todos** los items tienen imagen. Resultado de la comprobación y de lo que se hizo:

- **Fichas (lugares/platos): 190 de 212 con foto** (antes 178). Segunda ronda de búsqueda en Wikimedia Commons (consultas en inglés y vietnamita, ~35 fichas, cada candidata revisada a ojo en hojas de contacto): **12 fotos nuevas verificadas** — Murales de Phùng Hưng (mural real de la calle, sustituye a la foto aleatoria de picsum), Phare The Cambodian Circus, Mercado Ruso (foto real del mercado), Bosque de Tra Su, Clases de Cocina (Hoi An), Nem Chua Yên Mạc, Rượu Kim Sơn, Trekking a Viet Hai (sendero del P.N. Cat Ba), Khmer Red Curry, Fruta y café flotante en Cai Rang (barca vendedora en Cai Rang), Bún Mắm Nêm, Hoành Thánh Chiên. Bug detectado a tiempo por el test: al guardar la del trekking se pisó el archivo que usaba Ba Trai Dao (bahía de Lan Ha) → ahora cada una tiene su archivo (`ba-trai-dao.jpg`).
- **22 fichas siguen sin foto, a propósito** (icono neutro de categoría): Café Phố Cổ, El Callejón Colectivo Cũ, Lotus Silk Farm, Lap Khmer, Lẩu Mắm, Khô Cá Lóc, Victoria Nui Sam Lodge, Cena ligera antes del bus nocturno, Cơm Gà Hội An, Bánh Đập, Mercado de Ba Le, Mercado de Tan An, Talleres Artesanales, Aldea de Frescos de Da Nang, Mercado nocturno Son Tra, Chè Huế, Bánh Ép, Vả Trộn, Cá Rô Tổng Trường, Bề Bề Rang Muối, Tu Hài Nướng, Comida casera en Viet Hai. No existe en Commons una imagen verificable de cada una (lo que aparece son platos distintos, retratos, mapas, etc.); regla de Marcos: mejor sin foto que una equivocada. Solución real: fotos propias de Marcos/María (ver `CONTINUIDAD.md`).
- **Portadas de día: 25/25 con foto** (antes 10/25 — los días de traslado "Hanói → Siem Reap", "Tam Coc / Ninh Binh"… salían como bloque de color). `renderDay` usa ahora la foto del destino (`cityKey`); añadidas Chau Doc, Can Tho, Tam Coc y los dos aeropuertos (`img/fotos/aeropuerto-*.jpg`).
- **Iconos de ruta:** "Vuelos" y "Delta del Mekong" apuntaban a archivos locales inexistentes y dependían de Wikipedia en vivo (no funcionaban offline) → ahora fotos locales fijas (`meta.photo`).
- **Poda de `img/places/`:** 208 → 19 archivos (148 MB → ~12 MB; `img/` entero 26 MB). Solo se conservan los que usa el código (portadas, hoteles, iconos de ruta). `js/imageMap.js` eliminado (index.html, sw.js y el bloque 1b de `loadWikiPhoto`). Recuperables desde git (`ee3efae` y anteriores) si hiciera falta alguno.
- **`tools/check_imagenes.py`** ampliado: comprueba además que toda imagen `img/places|fotos/...` citada en `app.js`/`data.js`/`index.html` existe, y que los archivos de `img/fotos/` usados solo por el código (portadas) no cuentan como huérfanos. Estado: OK (212 fichas · 190 con foto · 22 sin foto · 177 archivos).
- **Verificado en navegador:** 451 imágenes de ficha cargadas, 0 rotas; 25/25 portadas; 9/9 iconos de ruta locales; 0 respuestas 404 de recursos propios en todas las vistas (Inicio, Días, Hoy, Mapa, Docs, días 1-25 en Lugares/Qué comer).
- Versiones: `DATA_VERSION` 65, `data.js?v=65`, `app.js?v=144`. `CREDITOS_FOTOS.md` regenerado (177 archivos).
- **Arreglo visual (pestaña Días):** en modo oscuro la cabecera de cada bloque («Vuelos · 2 días») tenía el color del fondo de la página y la tarjeta parecía no cerrarse por arriba (redondeo raro). `.block-section > .block-section-header { background: transparent }` — ahora la cabecera comparte fondo con el cuerpo y la tarjeta se ve completa, en oscuro y en claro. Después, a petición de Marcos, **línea horizontal divisoria** bajo cada cabecera de bloque (`border-bottom: 1px solid var(--border)`). `styles.css?v=79`. (El alojamiento `.htl2-zone` no se toca: su cabecera no está dentro de `.block-section`.)
- **Franja lateral de color de los bloques (Días y Transportes):** estaba en la lista de días, no en la tarjeta entera, así que arrancaba de golpe bajo la cabecera. Movida a `.block-section` (`border-left:3px solid <color>66`, `app.js?v=145`): ahora recorre la tarjeta completa y sigue su redondeo.
- **Fichas sin foto en modo oscuro:** el marcador (cuadro gris claro con icono blanco) deslumbraba sobre las tarjetas oscuras. Ahora, en oscuro, fondo `#2c3c56` e icono al 22 % de opacidad (miniaturas de lista, círculos de resumen y tarjeta de «Qué comer»); en claro no cambia. Reglas añadidas al final de `styles.css` en los dos mecanismos de tema (`html[data-theme="dark"]` y `@media (prefers-color-scheme: dark)` con `html:not([data-theme="light"])`).

---

## 2026-10-03 (PC de casa, 2ª parte) — Fotos CONGELADAS: cada ficha lleva una foto fija revisada o ninguna (rama `fotos-congeladas`)

**Problema de fondo:** la app elegía la foto de cada ficha "a posteriori" (`photo:` → `IMAGE_MAP` → archivo local por nombre/alias → resumen de Wikipedia en vivo). Esa adivinanza era la causa de casi todas las fotos que no salían o no correspondían, y cambiaba sola según lo que devolviera Wikipedia.

**Cambios (sin push, en la rama `fotos-congeladas`):**
- **Extraído lo que mostraba cada una de las 212 fichas** (84 de ellas dependían de la adivinanza), todas las imágenes **descargadas, redimensionadas (≤800 px) y guardadas en `img/fotos/`** (163 JPEG, ~14 MB) y **revisadas a ojo en hojas de contacto** (todas, una a una).
- `js/data.js` (DATA_VERSION 64): 178 fichas con `photo: 'img/fotos/<archivo>.jpg'` local fijo; 34 sin foto a propósito (icono neutro de su categoría, regla de Marcos "mejor sin foto que una equivocada"). **Quitadas 11 fotos erróneas o genéricas** que antes se mostraban: El Callejón Colectivo Cũ, Cena ligera antes del bus nocturno, Mercado Ruso (Tuol Tom Poung), Lap Khmer, Bosque de Tra Su, Fruta y café flotante en Cai Rang, Mercado de Tan An, Mercado de Ba Le, Clases de Cocina (las tres mostraban una calle de Hoi An), Trekking al pueblo de Viet Hai, y **Murales de Phùng Hưng** (era una foto aleatoria de `picsum`: rocas en una playa). **Amok del día 11** mostraba un grabado antiguo → ahora la foto real de Fish Amok. 0 referencias a `picsum` en `data.js`.
- `js/app.js` (v141): las fichas (círculos de resumen, miniatura de la lista, tarjeta de "Qué comer", carrusel de la ficha abierta) usan **solo** su `photo` fijo (`data-fixed="1"`); sin foto → icono, y el carrusel se oculta. Ya no se consulta `IMAGE_MAP`, alias ni Wikipedia para fichas. Lo que no son fichas (círculos de zona, iconos de ruta, fondo del tiempo, portada de ciudad) sigue como antes. `precacheCuratedPhotos` ahora solo precarga las fotos locales de las fichas (~163).
- **`CREDITOS_FOTOS.md`** (raíz, el repo es público): archivo → ficha → origen (Wikimedia Commons con enlace a la página del archivo, Pexels, o imagen principal de artículo de Wikipedia).
- **`tools/check_imagenes.py`** (test previo a publicar; `py -3 tools/check_imagenes.py`, código 1 si falla): foto inexistente/corrupta/pequeña/pesada, foto remota o `picsum`, ficha sin foto no declarada en `tools/sin_foto.txt`, **foto compartida entre fichas distintas no autorizada en `tools/fotos_compartidas.txt`** (12 grupos autorizados: el mismo plato o lugar repetido otro día), archivos huérfanos, hashes duplicados, lugares sin lat/lng. Estado: **OK** (212 fichas, 178 con foto, 34 sin). `.gitignore` tiene excepción para ese `.py`.

**Verificado en el navegador local:** recorridas las 25 jornadas (pestañas Lugares y Qué comer): 508 imágenes de ficha, 0 rotas, 0 remotas, 87 correctamente ocultas por no tener foto; el SW precarga las fotos locales (175 entradas en la caché de medios).

**Pendiente (no hecho):** (a) decidir con Marcos si se fusiona `fotos-congeladas` en `main` y se publica (no se ha hecho push); (b) podar `img/places/` (~148 MB, ya casi sin uso en fichas) en un commit aparte tras confirmar qué usan aún portadas/zonas/IMAGE_MAP; (c) paso 4 de la estrategia: página de revisión visual para Marcos (si la pide); (d) 34 fichas sin foto (16 platos hiperlocales + 18 lugares): si Marcos/María tienen fotos propias, basta con meterlas en `img/fotos/`, ponerlas en `photo:` y quitar la ficha de `tools/sin_foto.txt`.

**Archivos:** `js/data.js`, `js/app.js`, `index.html` (`data.js?v=64`, `app.js?v=141`), `img/fotos/*`, `CREDITOS_FOTOS.md`, `tools/*`, `.gitignore`.

---

## 2026-10-03 (PC de casa) — Git reconciliado con `origin/main` + modo offline real (el service worker NUNCA había funcionado en producción)

**1. Git del PC de casa.** Ver `COORDINACION_SESIONES.md` (bloque ✅ 3-oct). Resumen: instantánea local + rama `backup-3oct`, remoto añadido, árbol de trabajo comprobado idéntico a `origin/main` (`599f20a`), `reset --mixed` sin tocar archivos. Los archivos que llegaron por MEGA ya incluían todo el trabajo del PC del trabajo del 2-oct (fix de `makeCircle`, 13+7+8 fotos, platos, tarjetas de aeropuerto, mapa Leaflet) — no hubo que fusionar nada.

**2. Hallazgo: el offline de la app no existía en producción.** `index.html` registraba el service worker con `register('/sw.js')` — ruta absoluta de raíz. En GitHub Pages el sitio vive en `/viajes-marcos-mery/`, así que esa URL es `marcospenas.github.io/sw.js` → **404** (comprobado con `curl`: `/viajes-marcos-mery/sw.js` da 200, `/sw.js` da 404). El SW no se había registrado nunca en los móviles. Además, el `sw.js` antiguo habría fallado igualmente: usaba `cache.addAll()` con una lista de ~200 imágenes (incluidas 4 que se borraron por ser erróneas) y `addAll` rechaza todo si una sola da 404.

**3. Arreglo (modo "sin cobertura" real — idea nº2 de Marcos y tarea "Mapa offline"):**
- `index.html`: `register('sw.js')` (relativo → ámbito `/viajes-marcos-mery/` en producción).
- `sw.js` reescrito (conserva el prefijo `/viajes-marcos-mery/` en el shell): **shell con red primero y caché de respaldo** (las actualizaciones siguen llegando solas con cobertura, sin riesgo de dejar móviles atascados en una versión vieja); precaché tolerante a fallos (uno a uno, un 404 ya no rompe la instalación); **fotos y mosaicos del mapa con caché primero**, guardadas al verlas (límite 900); **resúmenes de la API de Wikipedia** (de donde salen las fotos "en vivo") con caché al instante + refresco en segundo plano; Leaflet (js+css de unpkg) cacheado para que el mapa arranque offline.
- `js/app.js` (`precacheCuratedPhotos`, v→140): con cobertura, una vez al día por versión de datos, y solo cuando el SW ya controla la página, pide al SW que descargue las fotos curadas del itinerario, las imágenes locales de `img/places/` y las miniaturas de Wikipedia de cada ficha.
- **Verificado en local parando el servidor** (simulando sin cobertura): la app arranca, los datos y Leaflet cargan, 56 de 66 fotos de 6 días de muestra cargan (las 10 restantes son las ya catalogadas sin foto real), 128 pines en el mapa. Caché tras la precarga: 76 resúmenes de Wikipedia + 74 imágenes locales + 162 remotas.
- **Límite conocido:** los **mosaicos del mapa solo funcionan offline en las zonas que se hayan visto antes con cobertura** — descargar mosaicos de OSM en bloque va contra su política de uso, así que no se precargan. Los pines, popups, favoritos y "cerca de mí" sí funcionan; el fondo del mapa será gris donde no se haya navegado antes. Para tenerlo offline en el viaje: abrir el mapa con wifi en el hotel y hacer zoom por las ciudades.
- **Primera apertura tras instalar/actualizar:** el SW necesita una visita con cobertura para instalarse y otra para precargar; no es necesario hacer nada especial, solo abrir la app con wifi una o dos veces antes de salir.

**4. 3 sitios sin coordenadas en el mapa** (pendiente de la lista del 30-sep) ya tienen `lat`/`lng` (Photon/OSM): Museo de Minas Terrestres (13.5396, 103.9458), Talleres Artesanales — Reaching Out Arts and Crafts (15.8766, 108.3274), Bến Ninh Kiều (aprox. 10.0342, 105.7875, cerca del embarcadero; sin resultado exacto del geocodificador). Ahora 128/128 pines.

**Archivos:** `sw.js`, `index.html` (registro del SW, `data.js?v=63`, `app.js?v=140`), `js/app.js`, `js/data.js` (DATA_VERSION 62→63). **Sin push todavía** — para que el offline llegue a los móviles hay que publicar (lo decide Marcos).

---

## 2026-10-02 (continuación 7) — Revisión plato por plato de "Qué comer": 13 fotos más, 16 sin encontrar tras búsqueda exhaustiva

Marcos pidió explícitamente revisar uno por uno TODOS los platos nuevos y asegurarse de que cada uno tiene su imagen, con "múltiples comprobaciones" antes de dar algo por imposible. Partiendo de los 27 restaurantes que no resolvían ninguna imagen (ver continuación 5), se intentó cada uno con 2-4 variantes de términos de búsqueda en Wikimedia Commons:

**13 fotos nuevas encontradas y verificadas a ojo:**
- Bánh Mì, Bánh Mì de viaje en bus (mismo bocadillo, foto real genuina del plato — antes dependían de resolución implícita por alias, ahora verificadas y con `photo:` directo)
- Lok Lak, Loc Lac de despedida de Siem Reap (mismo plato, reutilizada la misma foto real)
- Cerveza Angkor junto al Tonlé Sap (botellas de Angkor Beer reales)
- Café de despedida en el Old Quarter (cà phê sữa đá preparándose con el filtro phin)
- Samlor Kor Ko, Bobor (congee de pollo, foto tomada en Psar Chaa Market — la misma ciudad, Siem Reap)
- Coco fresco en la playa (coco entero con pajita, foto real — la primera encontrada mostraba la pulpa raspada, no el coco bebido, se descartó y se buscó otra)
- Nem Nướng Cái Răng, Bánh Tráng Cuốn Thịt Heo, Miến Lươn (fotos específicas del plato exacto)
- Banquete de marisco a bordo (reutilizada la foto de marisco ya verificada para otras entradas genéricas de "marisco de la zona")

**Un caso rechazado explícitamente:** para "Bánh Đập" se encontró un archivo en Commons titulado igual, pero resultó ser una **ilustración dibujada a mano, no una fotografía real** — descartada por no cumplir el criterio de "foto real verificada", queda sin imagen en vez de usar un dibujo.

**16 platos sin ninguna foto real encontrada en Commons, tras búsqueda exhaustiva con variantes (confirmado, no por falta de intentos):** Khmer Red Curry (Kari Sach Moan), Lẩu Mắm, Khô Cá Lóc, Cơm Gà Hội An, Hoành Thánh Chiên, Bánh Đập (ver nota de la ilustración), Bún Mắm Nêm, Chè Huế, Bánh Ép, Vả Trộn, Nem Chua Yên Mạc, Rượu Kim Sơn, Cá Rô Tổng Trường, Tu Hài Nướng, Bề Bề Rang Muối, Comida casera en Viet Hai. Son en su mayoría platos muy regionales/hiperlocales (especialidades de un solo pueblo o puesto) sin presencia en bancos de imágenes libres — ni Commons ni Pexels tienen cobertura. Quedan con el icono de categoría neutro en vez de sin foto en blanco (ver continuación 6).

**Archivos:** `js/data.js` (DATA_VERSION 61→62, 13 fotos directas nuevas), `index.html`, `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json` (192 fichas en total ahora, incluyendo platos añadidos después de la auditoría original de 167).

---

## 2026-10-02 (continuación 6) — 2 bugs más del mismo patrón: botón "Ver restaurantes" y miniaturas de "Lugares"

Mismo barrido: Marcos reportó que el botón "Ver restaurantes →" no llevaba a ningún sitio. Causa: llamaba a `showDayTab('lugares')` en vez de `showDayTab('comer')` (copy-paste del botón de arriba, "Ver todos los lugares"). Corregido. De paso, los círculos individuales (`makeCircle`) tenían el mismo problema — tanto los de "Qué ver" como los de "Qué comer" navegaban siempre a "Lugares" al hacer clic, nunca a "Qué comer" — se añadió un parámetro `targetTab` para que cada círculo sepa a qué pestaña pertenece.

**Segundo hallazgo, incienso del mismo bug raíz:** la vista "Lugares" (acordeón) tenía el mismo problema que ya se arregló en los círculos — el `<img>` de la miniatura no llevaba `src=""` explícito, así que cuando no había foto el navegador mostraba el icono nativo de "imagen rota" en vez de ocultarse (la regla CSS `[src=""] { display:none }` nunca llegaba a aplicar). Se corrigió añadiendo `src=""` y, a petición de Marcos ("pondría una imagen neutra... que no llame la atención"), se sustituyó el emoji de colores por el mismo icono `CIRCLE_ICONS` gris apagado ya usado en los círculos — consistente en toda la app.

**Archivos:** `js/app.js` (botón "Ver restaurantes" corregido, `makeCircle`/`lugarCardHtml` con tab/icono correctos, v→137), `css/styles.css` (`.lugar-thumb-fallback-icon` gris neutro, v→76).

---

## 2026-10-02 (continuación 5) — Bug sistémico encontrado: `data-photo` nunca se pasaba a los círculos de vista previa

Marcos pidió revisar sistemáticamente que todo el contenido nuevo tuviera foto, señalando (con razón) que tener que repetirlo caso por caso no debería hacer falta para algo tan básico. Al hacer un barrido real en el navegador (simulando la resolución de imagen de las 212 fichas del itinerario, no solo mirando el código) se encontró la causa raíz real:

**El bug:** `makeCircle()` en `app.js` — la función que pinta los círculos de "Qué ver"/"Qué comer" en el resumen del día — nunca incluía el atributo `data-photo` en el `<img>`, a diferencia de `lugarCardHtml()` (la vista de "Lugares" completa), que sí lo hacía. Resultado: **cualquier ficha que dependiera de su `photo:` directo (la fuente "verificada", máxima prioridad) para mostrar imagen se veía en blanco en el resumen del día**, aunque esa misma foto sí se viera perfectamente al entrar en la pestaña "Lugares". Esto explica la gran mayoría de círculos en blanco que Marcos llevaba reportando — no eran huecos de contenido, era un bug de renderizado que ocultaba fotos que sí existían.

**Segundo hallazgo, relacionado:** cuando de verdad no hay ninguna foto disponible (ni directa, ni por alias, ni local), el `<img>` se quedaba con `src=""` para siempre — un círculo liso del color de fondo, indistinguible de "roto" o "cargando". Se añadió un fallback real: cada círculo ahora muestra de fondo el icono de categoría (ya existía un objeto `CIRCLE_ICONS` con iconos SVG currados por tipo — monumento, templo, mercado, playa, naturaleza, restaurante, café — pero nunca se había conectado a ningún sitio del código). A petición de Marcos, el fallback se dejó con fondo gris neutro y el icono apagado (`opacity:.45; filter:grayscale(1)`), para que no llame la atención ni parezca un elemento de diseño — pasa desapercibido.

**Barrido completo de las 212 fichas (resolviendo en el navegador real, no por inspección de código):** 78 ya tenían foto directa — las 78 cargan bien, 0 rotas. De las 134 que dependían de alias/caché local/Wikipedia en vivo, 42 no resolvían nada. Se buscaron en Commons y se añadieron fotos reales verificadas a ojo para: Bánh Cuốn, Trey Aing, Nom Ansom Chek, Cá Lóc Nướng Trui (reuso), Nem Lụi Huế, Chè Bắp, Mắm Châu Đốc — quedan 35 sin foto real disponible tras varias búsquedas, la mayoría platos muy regionales sin cobertura en Commons o momentos de experiencia sin un plato/lugar concreto que fotografiar (p.ej. "Banquete de marisco a bordo", "Coco fresco en la playa") — correctamente sin foto, ahora con el icono neutro en vez de blanco.

**Archivos:** `js/app.js` (`makeCircle()` ahora pasa `data-photo` y pinta el fallback de `CIRCLE_ICONS`, v→136), `css/styles.css` (`.photo-circle-fallback` con fondo gris neutro, v→75), `js/data.js` (7 fotos directas nuevas, DATA_VERSION→61), `index.html`.

---

## 2026-10-02 (continuación 3) — 7 platos de la ampliación de "Qué comer" se quedaron sin foto: corregido

Marcos mandó capturas navegando la app en vivo mostrando varios círculos en blanco en "Qué comer". Causa: los platos añadidos en la tanda de ampliación "Qué comer" (sincronizada por MEGA, ver commit `c028ae8`) se escribieron solo con `notes`, sin `photo` ni alias en `WIKI_ARTICLES` — nunca pasaron por el pipeline de resolución de imágenes. Afectaba a: **Nem Rán (Chả Giò), Bún Đậu Mắm Tôm, Xôi Xéo, Nom Kroeung, Num Pang, Prahok Ktis, Nom Banh Chok Samlor Khmer**. Buscadas en Wikimedia Commons, descargadas y verificadas a ojo antes de aplicar (misma rigurosidad que el resto de la auditoría) — las 7 fotos son específicas del plato exacto, ninguna genérica.

**Nota para la próxima vez que se añada contenido nuevo en bloque:** después de escribir fichas nuevas (sitios o platos), comprobar que cada una resuelve una foto real antes de darlo por terminado — no basta con el texto. `AUDITORIA_IMAGENES_CLASIFICADA.json` solo cubría las 167 fichas que existían el 1-oct; estas 7 son nuevas y se han añadido al JSON (ahora 174 fichas en total).

**Archivos:** `js/data.js` (DATA_VERSION 57→58, 7 fotos directas nuevas), `index.html` (`data.js?v=58`), `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json` (7 fichas nuevas añadidas).

---

## 2026-10-02 (continuación 2) — Bancos de fotos libres (Pexels) para platos genéricos sin cobertura en Commons

Marcos pidió explícitamente buscar solución para los sitios sin foto en Commons, aclarando que no le preocupa usar una foto "de Google" porque la app es de uso privado. **Aclarado antes de aplicar nada:** el repo de esta app es en realidad **público** en GitHub (`github.com/MarcosPenas/viajes-marcos-mery`, ver `CLAUDE.md`), así que una foto de Google Imágenes (normalmente de un tercero sin licencia clara de reuso) sí podría dar problemas de derechos si el repo gana visibilidad. En su lugar se usó **Pexels** (banco de fotos con licencia libre de uso y modificación, sin necesidad de atribución) para los casos donde el hueco es un **concepto genérico** (un plato, un paisaje) y no un lugar/marca concreto:

- **Ốc (caracoles de río)** (25-nov): foto real de caracoles salteados con maíz y ajo frito.
- **Dê nướng (cabra a la parrilla)** (24-nov) y **Dê (cabra) en distintas preparaciones** (25-nov): misma foto de brochetas de cabra a la brasa (mismo concepto genérico, aceptable compartir).
- **Marisco de Da Nang** (21-nov), **Marisco de Cat Ba** (26-nov) y **Último marisco en Cat Ba** (28-nov): misma foto de marisco a la plancha recién servido (3 entradas genéricas de "marisco de la zona", sin plato específico identificable — compartir es aceptable, mismo criterio que Mì Quảng en 2 días).
- **Pueblos rurales, arrozales y palmeras de azúcar** (12-nov, Siem Reap): foto aérea real de arrozales, palmeras y aldeas camboyanas.

**Criterio para NO usar foto de stock en el resto de huecos (deliberado, no por falta de tiempo):** los ~24 casos restantes (Mercado Ruso, Phare Circus, Victoria Nui Sam Lodge, Ba Trai Dao, Viet Hai village, Talleres Artesanales, Murales de Phùng Hưng, etc.) son **lugares o espectáculos concretos y reconocibles**, no conceptos genéricos — una foto de stock de "un circo cualquiera" o "un mercado cualquiera" los representaría tan mal como el alias equivocado que motivó toda esta auditoría en primer lugar (ej. probado "circus acrobat performance" en Pexels para Phare: salió una acróbata occidental con malla de lentejuelas, nada que ver con el espectáculo real de narrativa jemer contemporánea de Phare — descartado). Para esos, sin foto sigue siendo mejor que una que induzca a error.

Verificado en el navegador (localStorage limpiado, recarga, día 25-nov/Tam Coc-Ninh Binh, pestaña "Qué comer") que las fotos cargan a tamaño completo.

**Archivos:** `js/data.js` (DATA_VERSION 56→57, 4 fotos directas nuevas cubriendo 7 fichas), `index.html` (`data.js?v=57`).

---

## 2026-10-02 (continuación) — 8 fotos reales más para los `GENERIC_IMAGE`/`DUPLICATE` restantes

Continuando el plan de corrección de imágenes (empezar por los grupos de menor número de imágenes distintas): tras comprobar que `AUDITORIA_IMAGENES_CLASIFICADA.json` estaba desactualizado (no se regeneró tras la última tanda sincronizada por MEGA — varios `GENERIC_IMAGE`/`DUPLICATE` del JSON ya tenían foto real en `data.js`), se recalculó el estado real contra `data.js` v55: de los 47 casos del JSON, **40 seguían realmente sin foto propia** (7 ya se habían arreglado sin que el JSON se actualizara). De esos 40, se buscaron en Wikimedia Commons, descargaron y verificaron a ojo antes de aplicar:

- **Chợ nổi Cái Răng (Mercado Flotante de Cai Rang)** (17-nov): antes picsum genérico → foto real de una barca vendiendo fruta a turistas en el mercado flotante.
- **Chợ đêm Hội An (Mercado Nocturno de los Farolillos)** (18-nov): sin foto → foto real nocturna de barcas cargadas de farolillos de colores en el río Thu Bon.
- **Old Quarter Hoi An (paseo introductorio)** (18-nov): sin foto → reutilizada la misma foto real del casco antiguo que ya tiene "Old Quarter (bono, 5 monumentos)" (19-nov) — es literalmente el mismo sitio real, duplicado aceptable por convención del proyecto.
- **Bánh Mì Phượng** (20-nov): compartía alias genérico `Bánh_mì` con la ficha genérica del bocadillo → foto real del interior/cartel de la tienda específica.
- **Montaña Sam (Nui Sam)** (17-nov): alias genérico `An_Giang` → foto real de la montaña vista desde la calle de Chau Doc.
- **Calle del incienso de Thuy Xuan** (22-nov, Hue): compartía alias `Perfume_River` indebidamente → foto real de los manojos de varillas de incienso de colores secándose (la estampa icónica de Thuy Xuan), categorizada en Commons como "2007 in Huế".
- **Ngu Lam Peak** (28-nov, Cat Ba): picsum genérico → foto real de las vistas kársticas desde el mirador.
- **Bun Ca** (16-nov, restaurante): alias genérico `Vietnamese_cuisine` → reutilizada la foto real ya verificada de "Bún Cá Châu Đốc" (mismo plato, misma región, un día después) — duplicado aceptable, mismo criterio que Mì Quảng en 2 días.

**No se encontró foto real específica en Commons** (búsqueda nueva, confirmando/ampliando hallazgos de sesiones anteriores): Ốc (caracoles de río), Victoria Nui Sam Lodge, Phare Circus, Lotus Silk Farm, Mercado Ruso, Talleres Artesanales, Mercado nocturno Son Tra, Aldea de Frescos de Da Nang, Viet Hai village, Ba Trai Dao, Marisco (Da Nang/Cat Ba), Dê (cabra). Quedan sin foto a propósito — mejor eso que una equivocada o forzada a compartir sin sentido.

Verificado en el navegador (localStorage limpiado, recarga, día 18-nov/Can Tho→Hoi An abierto) que las 4 fotos de ese día cargan correctamente.

**Archivos:** `js/data.js` (DATA_VERSION 55→56, 8 fotos directas nuevas), `index.html` (`data.js?v=56`).

**Pendiente:** regenerar `AUDITORIA_IMAGENES_CLASIFICADA.json` con el estado real tras esta tanda (y la anterior sincronizada por MEGA) — se quedó desactualizado dos veces seguidas por no regenerarse inmediatamente después de cada tanda de correcciones, como indica el propio plan en `CONTINUIDAD.md`. Quedan ~24 casos reales sin foto (los listados arriba como "no encontrada" + los que compartían exclusivamente entre sí, p.ej. Dê/Marisco).

---

## 2026-10-02 — Contenido rico (description/tips) para 4 huecos reales de Hue y Cat Ba

Dentro de la tarea ALTA prioridad "Contenido rico de Hue, Tam Coc/Ninh Binh y Cat Ba" (pendiente desde el 28-sep): al revisar `data.js` con un script, resultó que la mayoría de ese bloque YA tenía contenido (añadido en sesiones del 29-sep al 1-oct) — solo quedaban 4 sitios reales sin `description`/`tips` en todo el rango 21-29 nov, más una ficha "Sitios pendientes del Old Quarter" que es intencionalmente un cajón de sastre genérico (no un sitio concreto, se deja tal cual). Investigado con WebSearch y escrito contenido real para:

- **Mercado nocturno de Dong Ba** (día 22-nov, Hue): horario real (5:00-19:00, no es un mercado nocturno propiamente dicho pese al nombre — eso se explica en la descripción), qué hay en cada planta, mejores horas para comprar/fotografiar, consejo de regateo.
- **Paseo junto al río Perfume** (día 22-nov, Hue): qué son los paseos en barco-dragón con música ca Huế (Patrimonio Inmaterial UNESCO), precios reales (100.000-250.000 VND el cruce de 1h, desde 300.000 VND/h alquiler de barco entero), alternativa gratis del paseo peatonal.
- **Atardecer en Flamingo Cat Ba Resort** (día 26-nov, Cat Ba): qué es el resort (arquitectura "bosque vertical", 3 torres), la piscina infinita como mirador de atardecer accesible sin ser cliente, cercanía a las playas Cat Co 1/2.
- **Ba Trai Dao (Isla de los 3 melocotones)** (día 27-nov, Cat Ba): aviso importante no documentado antes — la playa solo es visible 2-4h al día en marea baja, el resto del tiempo la marea la cubre por completo.

Verificado en el navegador (localStorage limpiado, recarga, tarjeta de Mercado de Dong Ba abierta) que el contenido nuevo se renderiza correctamente.

**Archivos:** `js/data.js` (DATA_VERSION 54→55), `index.html` (`data.js?v=55`).

---

## 2026-10-01 (continuación 3) — Método de "hojas de contacto" para revisar las 102 `CHECK_MANUALLY`: 15 fichas procesadas, 12 fotos erróneas encontradas y corregidas

**Problema de escala:** revisar 102 imágenes una por una (navegar + mirar + decidir) habría costado demasiado. **Solución:** un script descarga las 102 imágenes actuales (las que ya carga la app hoy) y las monta en "hojas de contacto" — collages de 12 fotos en miniatura con su nombre y fecha debajo — para poder comparar muchas imágenes de un vistazo real, no solo por nombre de archivo. 9 hojas cubrieron las 102 fichas.

**Resultado de la primera pasada visual (9 hojas, 102 fichas):**
- **~84 correctas a simple vista** (coinciden claramente con lo que describen)
- **12 confirmadas incorrectas** tras ver la miniatura con claridad
- **3 marcadas "sospechosas" en la hoja de contacto, verificadas a resolución completa y resultaron SÍ ser correctas** (Museo del Genocidio Tuol Sleng mostraba el monumento del propio recinto, no la prisión — correcto; Ho Thuy Tien mostraba el cartel de entrada real; Ciudadela de Hoa Lu mostraba un jardín de un templo del propio recinto)

**Las 12 fotos confirmadas incorrectas y su corrección:**

| Sitio | Mostraba (incorrecto) | Corregido a |
|---|---|---|
| Lago B-52 (Hữu Tiệp Lake) | Un monumento genérico | Foto real de los restos del B-52 hundidos en el lago |
| Palacio Real de Phnom Penh | Un skyline urbano genérico | La Pagoda de Plata real, dentro del recinto del Palacio |
| Marble Mountains | Una montaña volcánica negra (¡nada que ver!) | Las montañas de mármol reales vistas desde la ciudad |
| Puente del Dragón (Da Nang) | Un parque genérico | La cabeza del dragón dorado real |
| Puente Thanh Toan (Hue) | Una vista aérea de ciudad genérica | El puente cubierto real sobre el estanque de lotos |
| Pagoda Bich Dong | Una foto histórica de personas (¡nada que ver!) | La pagoda real encajada en el acantilado |
| Cueva Trung Trang (Cat Ba) | Una vista aérea de campos de cultivo | El interior real de la cueva con estalactitas |
| Aldea de cerámica de Thanh Ha | Las ruinas de My Son (alias mal puesto desde el 29-sep) | Un alfarero real trabajando en el torno |
| Murales de Phùng Hưng | Una mujer con un barril de cerveza (¡nada que ver!) | Sin foto — no hay ninguna real en Commons |
| Mercado Ruso (Tuol Tom Poung) | Un skyline urbano genérico | Sin foto — no hay ninguna real en Commons |
| Talleres Artesanales (Hoi An) | El Puente Japonés otra vez (archivo local mal etiquetado) | Sin foto — borrado el archivo local erróneo |
| Phare, The Cambodian Circus | Gente charlando en un parque sin relación | Sin foto — no hay ninguna foto real de una actuación en Commons |
| West Baray (Plan A) | Una imagen satelital/mapa, no una foto real | Sin foto — no hay ninguna foto real del embalse en Commons |

**Todas las fotos nuevas descargadas y miradas a resolución completa antes de aplicar** — mismo método de siempre, nunca por nombre de archivo o coincidencia de alias.

**Las 9 hojas de contacto cubrían las 102 `CHECK_MANUALLY` completas** (no solo la primera) — se miraron las 9 de un tirón. Los 87 casos restantes que no mostraban ningún problema visible en la miniatura se reclasificaron a un estado nuevo, **`OK_VERIFIED_THUMB`**, distinto de `OK_VERIFIED`: significa "visto de verdad, coincide con lo que describe", pero en miniatura 260×260 dentro de una hoja de contacto, no a resolución completa de forma individual como los `OK_VERIFIED` originales. Es un nivel de confianza intermedio — mucho más fiable que "el nombre del alias suena bien" (el problema original que motivó toda la auditoría), pero no tan exhaustivo como mirar cada imagen a tamaño completo una por una.

**Estado final de la auditoría de las 167 fichas:** `OK_VERIFIED` 33 (resolución completa) + `OK_VERIFIED_THUMB` 87 (miniatura, hoja de contacto) + `GENERIC_IMAGE` 20 + `DUPLICATE` 17 + `PENDING_IMAGE` 10 = 167. **Las 102 `CHECK_MANUALLY` originales ya no existen como categoría — todas revisadas.** Si Marcos navegando la app ve algo que no encaje en un `OK_VERIFIED_THUMB`, decir el sitio concreto para mirarlo a resolución completa (el método de las últimas semanas: reportar en vivo + corregir al momento sigue funcionando bien).

**Archivos:** `js/data.js` (DATA_VERSION 51→52, 8 fotos directas nuevas/corregidas), `js/app.js` (6 alias eliminados — ya no apuntan a artículos equivocados —, v→133), `index.html`, `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json` (actualizado: 15 fichas reclasificadas), `img/places/talleres_artesanales_hoi_an.jpg` (borrado, contenido erróneo).

---

## 2026-10-01 (continuación 2) — Primera tanda de correcciones de la auditoría: 9 casos de los 46 `GENERIC_IMAGE`/`DUPLICATE`

Siguiendo el plan documentado en `CONTINUIDAD.md` (empezar por `GENERIC_IMAGE`+`DUPLICATE`, mayor impacto con menos imágenes distintas que buscar), se procesaron los grupos más claros:

**4 fotos reales encontradas, verificadas a ojo y aplicadas (pasan a `OK_VERIFIED`):**
- Mercado de pescado de Thanh Ha → foto real de mercado matutino de Hoi An (antes: foto genérica de calle sin relación con un mercado)
- Atardecer en Flamingo Cat Ba Resort → foto real de la piscina infinita del resort con vistas a la bahía (antes: compartía la foto genérica de Lan Ha Bay con otros 3 sitios)
- **Old Quarter (bono, 5 monumentos), día 19-nov en Hoi An** → foto real del casco antiguo de Hoi An. **Este no era solo un duplicado, era contenido erróneo**: el alias apuntaba a `Old_Quarter,_Hanoi` (¡Hanói, no Hoi An!), heredado de cuando ambas ciudades usan la expresión "Old Quarter" para cosas distintas
- Bún Cá Châu Đốc → foto real de un puesto callejero preparando sopa de fideos con pescado (antes: foto genérica "Vietnamese_cuisine")

**5 casos que la reconciliación del 30-sep (PC del trabajo) había vuelto a introducir sin saberlo** — ya se habían corregido el 29-sep por la noche (quitarles el alias genérico, dejarlas sin foto en vez de una compartida/equivocada), pero al sincronizar por MEGA los archivos del PC de casa sobrescribieron esa corrección sin que el PC del trabajo lo supiera (`.git` no viaja por MEGA, ver Parte 19). Vueltos a quitar hoy:
- Café Phố Cổ (duplicaba con Lago Hoan Kiem)
- Victoria Nui Sam Lodge (duplicaba con Montaña Sam)
- Mercado nocturno Son Tra y Aldea de Frescos de Da Nang (ambas con la foto genérica de Da Nang/Puente del Dragón)
- Lotus Silk Farm (duplicaba con "Pueblos rurales...")

**Archivos:** `js/data.js` (DATA_VERSION 50→51, 4 fotos directas nuevas), `js/app.js` (5 alias genéricos quitados, v→132), `index.html`, `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json` (actualizado a mano: 23 `OK_VERIFIED`, 20 `GENERIC_IMAGE`, 17 `DUPLICATE`, 102 `CHECK_MANUALLY`, 5 `PENDING_IMAGE` nuevos — los 5 que se quedaron sin foto a propósito).

**Pendiente de esta misma tanda (quedan ~11 grupos `GENERIC_IMAGE`/`DUPLICATE` sin procesar, sin fotos reales encontradas en Commons tras buscar):** Calle Trần Phú y Mercado de Tan An/Ba Le (Hoi An, siguen con la foto genérica de la ciudad), Clases de Cocina, Ốc/Dê cabra (platos sin foto específica en Commons), Lap Khmer. Los que SÍ se consideran aceptables por ser el mismo sitio/plato real (no se tocan): Chợ Châu Đốc en dos días distintos, Cai Rang mercado+fruta flotante, Mì Quảng en Hoi An y Da Nang (mismo plato, dos días), Old Quarter Hanói en 2 fichas de Hanói.

**Después de esto, sigue pendiente lo más grande:** las 102 fichas `CHECK_MANUALLY` — ninguna comprobada visualmente todavía, es la mayoría del itinerario.

---

## 2026-10-01 (continuación) — 2 fotos duplicadas más corregidas (quedaron a medias el 29-sep)

Al retomar la sesión, dos fixes de fotos quedaron a medio hacer el 29-sep cuando la sesión se cortó a mitad de búsqueda (ver nota de continuidad):
- **"Pescado de agua dulce del Mekong"** (restaurante, día 16-nov): el alias genérico `Mekong_Delta` resolvía a una foto de un puente, no de comida. Sustituido por una foto directa verificada de Cá Lóc Nướng Trui (pescado de río a la brasa, plato típico del Delta).
- **"Ninh Kieu Footbridge"** (día 17-nov): compartía foto exacta con "Bến Ninh Kiều (Muelle de Ninh Kieu)" — mismo caso que el user reportó con captura el 29-sep. Sustituida por una foto directa verificada del puente peatonal real (con su pabellón en forma de loto).

Ambas verificadas a ojo (descargadas y miradas) antes de aplicar, mismo método de siempre.

**Archivos:** `js/data.js` (DATA_VERSION 49→50), `index.html` (`data.js?v=50`).

---

## 2026-10-01 — Auditoría formal de imágenes: 167/167 catalogadas y clasificadas en 6 estados

Marcos pidió explícitamente (tras varios intentos previos que no llegaron a este nivel de rigor) una auditoría formal de TODAS las imágenes del itinerario, en dos fases, **sin modificar ninguna imagen todavía**:

**Fase 1 — Extracción completa.** Por cada lugar/restaurante del itinerario: ID (`fecha|nombre`), nombre, ciudad, imagen actual, URL original, origen (de qué mecanismo de `loadWikiPhoto()` viene: `photo:` directo / `IMAGE_MAP` / caché local / Wikipedia en vivo), y con qué otros sitios comparte la misma imagen exacta. Recogido **desde el propio navegador en vivo** (no una reimplementación en Node aparte — la lección de hoy mismo con el bug de `IMAGE_MAP` ya enseñó que reimplementar la lógica fuera del navegador real tiene puntos ciegos). Resultado: **167 de 167** (128 lugares + 39 restaurantes, coincide exactamente con el total real de `data.js` — condición que Marcos marcó como obligatoria antes de dar la tarea por terminada). Guardado en `01_ESPECIFICACIONES/AUDITORIA_IMAGENES.json`.

**Fase 2 — Clasificación en 6 estados**, usando exclusivamente los datos ya recogidos en la fase 1 (sin volver a comprobar nada nuevo):

| Estado | Nº | Criterio aplicado |
|---|---|---|
| `OK_VERIFIED` | 19 | Comprobado **visualmente, píxel a píxel**, en esta misma sesión (no solo por coincidencia de nombre) |
| `DUPLICATE` | 19 | Comparte imagen exacta con otro sitio y no encaja en `GENERIC_IMAGE` |
| `GENERIC_IMAGE` | 27 | La imagen viene de un alias genérico de ciudad/región/categoría de plato (`Hội_An`, `Da_Nang`, `An_Giang`, `Lan_Ha_Bay`, `Siem_Reap_province`, `Vietnamese_cuisine`, `Seafood`, `Goat_meat`, `Cambodian_cuisine`, `Hanoi`, `Perfume_River` en un caso, `Bánh_mì` en un caso), no de una fuente específica del lugar/plato concreto |
| `CHECK_MANUALLY` | 102 | Resuelta por coincidencia de nombre/alias (Wikipedia o archivo local cacheado) pero **nunca comprobada visualmente** — es la mayoría honesta: la app funciona y casi todo "carga algo", pero no está verificado que esa foto sea realmente la correcta |
| `WRONG_IMAGE` | 0 | Ninguna confirmada como incorrecta en esta pasada (requeriría comprobación visual fresca de las 102 `CHECK_MANUALLY`, que es el siguiente paso) |
| `PENDING_IMAGE` | 0 | Ninguna sin resolver — las 167 cargan *algo* |

**Hallazgo honesto más importante de esta auditoría:** de 167 sitios, solo 19 (11%) tienen la imagen verificada de verdad a ojo. El resto funciona porque el nombre/alias "suena a" lo correcto, que es exactamente el tipo de falso positivo que las auditorías anteriores (por script, por nombre de archivo) no podían pillar — y es la razón de que Marcos haya tenido que pedir esto varias veces.

**Bug propio corregido durante la clasificación:** el primer script marcaba "Bánh Mì" (genérico, día 9) como `GENERIC_IMAGE` solo por compartir alias con "Bánh Mì Phượng" (que sí lo es, es una tienda específica) — corregido antes de guardar el resultado final.

**Archivos nuevos (no se tocó ninguna imagen ni el algoritmo de resolución):** `01_ESPECIFICACIONES/AUDITORIA_IMAGENES.json` (extracción completa), `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json` (con estado + motivo por entrada). **Siguiente paso, pendiente de que Marcos lo pida:** revisar visualmente las 102 `CHECK_MANUALLY` una por una y decidir sobre las 27 `GENERIC_IMAGE` / 19 `DUPLICATE`.

---

## 2026-09-30 (continuación 3) — "Cerca de mí" pasa de foto fija a seguimiento en vivo

Marcos preguntó, tras ver el mapa nuevo: "¿si me voy moviendo me detecta ese mapa?" — la respuesta honesta era que no, `showNearMe()` solo hacía una lectura puntual (`getCurrentPosition`) al pulsar el botón, no seguía la posición.

**Cambio:** `showNearMe()` ahora usa `navigator.geolocation.watchPosition()` en vez de una lectura única. Mientras está activo:
- Un punto azul con pulso (`_youAreHereMarker`, `L.circleMarker`) se mueve en el mapa a cada actualización de posición del navegador, con la precisión (±metros) en el popup
- La primera vez que llega la posición, el mapa centra y hace zoom ahí automáticamente
- La lista de "sitios cercanos" del panel se recalcula en cada actualización, no solo al abrir
- El botón cambia a "🔴 Siguiendo en vivo — toca para parar"; tocarlo de nuevo llama a `stopNearMeTracking()`, que limpia el `watchPosition`, quita el punto azul y oculta el panel
- Si el usuario sale de la pestaña "Mapa" (a Días, Hoy, etc.) el seguimiento se para solo (`stopNearMeTracking()` añadido al limpiador de vista en `renderView`) — para no gastar batería de fondo sin que se note

**Verificado sin GPS real** (el navegador de esta sesión no tiene ubicación física): se sustituyó `navigator.geolocation.watchPosition` por una función que simula 3 posiciones caminando cerca del Lago Hoan Kiem cada 800ms, confirmando que el punto azul se mueve, el panel de cercanía se recalcula, y que tocar el botón de nuevo para el seguimiento y limpia todo correctamente.

**Archivos:** `js/app.js` (`showNearMe`, `stopNearMeTracking`, `updateNearMePanel`, `_geoWatchId`/`_youAreHereMarker` — v→131), `css/styles.css` (botón activo en rojo, animación de pulso del punto — v→73), `index.html`.

---

## 2026-09-30 (continuación 2) — Mapa propio con Leaflet: se abandona el iframe de My Maps

Marcos, después de varias idas y vueltas con el My Maps embebido ("no se corresponde con mis mapas", "ese mapa está incompleto"), aclaró el problema de raíz: **el documento "Vietnam" de My Maps no era ni siquiera su mapa real** — lo creó una sesión anterior como contenedor para importar los CSV de sus listas de Google Maps — y además, comprobado directamente en My Maps (tabla de datos de la capa "Hue": 18 filas reales), la mayoría de los puntos nunca llegaron a geolocalizarse durante esa importación: solo se plantaba un pin por capa (la ciudad), el resto se quedaba como texto sin coordenadas. Marcos propuso la solución correcta: mapa propio con Leaflet, sacando los puntos progresivamente, con categoría/descripción/día/favorito/visitado y "cerca de mí".

**Lo que se ha construido:**
- **125 de 128 sitios del itinerario geolocalizados** con coordenadas reales (`lat`/`lng` añadidos directamente a cada `place` de `js/data.js`). Fuente: Wikimedia/OSM vía el geocodificador **Photon** (komoot.io) — Nominatim (el habitual) devolvió **429 Too Many Requests** por el tráfico compartido del sandbox, no por nada nuestro; Photon no tiene ese límite tan estricto.
- **Verificación de calidad de cada coordenada**, no solo "¿hay resultado?": cada punto se comprobó contra el centro real de su ciudad (o de las dos ciudades, en días de trayecto) — cualquier resultado a más de 60 km se descartaba como coincidencia de nombre equivocada (ej. "Old Quarter Hoi An" resolviendo a un hotel en Hanói, "Wat Phnom" resolviendo a un pueblo a 260 km) y se sustituía por el centro de la ciudad correcta. 17 casos corregidos así; 3 sitios sin ningún resultado se quedan sin coordenadas por ahora.
- **`renderMap()` reescrito por completo**: ya no hay iframe de My Maps en ningún sitio de la app. Mapa Leaflet propio con:
  - Pines coloreados por categoría (`PLACE_TYPE_META`: templo, monumento, museo, mercado, naturaleza, playa, café, actividad), con leyenda arriba
  - Popup por sitio: día + ciudad, nombre, notas, y botones ★ (favorito) / ✓ (visitado) / "Ver día →"
  - **Favorito y visitado persistentes** (`DB.placeState`, guardado en localStorage vía el mismo `save()` de siempre)
  - **Botón "Cerca de mí"**: geolocalización del navegador + distancia real (fórmula de Haversine) a los sitios más cercanos, ordenados
- **Mini-mapa del día** (pestaña "Mapa" dentro de cada día) también reescrito: antes usaba `trip.mapPoints`, que **ni siquiera existía en `data.js`** (bug real preexistente, la función habría fallado en cuanto se llamara) — ahora usa los mismos puntos reales del día, coloreados igual que el mapa general.

**Bug encontrado y corregido de paso:** los mosaicos del mapa (CartoDB, `basemaps.cartocdn.com`) ya no cargan sin API key — esto **no lo rompí yo hoy**, el código viejo usaba la misma URL y habría fallado igual. Cambiado a los mosaicos estándar de OpenStreetMap (gratis, sin clave, confirmado con petición real). Para el modo oscuro, en vez de un segundo set de mosaicos (que también pediría clave), se invierte el mapa con CSS (`filter: invert(1) hue-rotate(180deg)`), truco estándar para mapas OSM en modo oscuro.

**Bug propio encontrado durante la construcción:** al reemplazar el `renderMap()` viejo, quedó una copia duplicada de `switchMapTab`/`promptMyMapsUrl`/`initLeaflet` más abajo en el archivo que pisaba silenciosamente las funciones nuevas (en JS, la última declaración de una función gana). Detectado revisando el archivo tras el primer intento, eliminado.

**Bug del script de fusión de coordenadas (detectado y corregido antes de aplicar nada):** el primer intento de insertar `lat`/`lng` en `data.js` con una expresión regular capturaba hasta el final de línea con `[^\n]*`, que en las fichas de una sola línea (`{ name: 'X', type: 'Y', notes: 'Z' }`) incluía el `}` de cierre — el resultado era sintaxis inválida. Revertido con `git checkout` y rehecho insertando justo después de `type: '...',`, verificado con `node -e "new Function(...)"` antes de dar nada por bueno.

**Interrupción durante la sesión:** un fallo temporal del verificador de permisos de la plataforma (no relacionado con esto, ni con la conexión de Marcos) bloqueó todas las herramientas (comandos, navegador) durante varios minutos justo cuando tocaba verificar el mapa en directo — de ahí que Marcos viera la zona del mapa vacía en un momento dado. Resuelto solo; verificado en cuanto se recuperó el acceso.

**Verificado en el navegador:** mapa cargando con mosaicos reales, marcadores agrupados correctamente por región (Hanói, Hue/Da Nang, Ninh Binh/Cat Ba, Siem Reap, Phnom Penh, Chau Doc/Can Tho), popup con datos correctos, favorito persistiendo en `DB.placeState`, y "cerca de mí" calculando distancias reales correctas (probado con una posición simulada en Hoan Kiem: Catedral de San José a 190 m, coincide con la realidad).

**Pendiente:** los 3 sitios sin coordenadas; revisar visualmente si algún pin quedó mal posicionado que el filtro automático no pillara (el umbral de 60 km no detecta errores "dentro" del radio de la ciudad, solo los que caen fuera).

**Archivos:** `js/data.js` (DATA_VERSION 48→49, 125 sitios con `lat`/`lng`, `placeState: {}` nuevo), `js/app.js` (`renderMap`, `initFullMap`, `initDayLeaflet`, `PLACE_TYPE_META`, favorito/visitado, cerca de mí — v→130), `css/styles.css` (leyenda, popup, panel de cerca de mí, filtro de mosaicos oscuros — v→72), `index.html`.

---

## 2026-09-30 (continuación) — Tarjetas de info de aeropuerto (pedido explícito, investigado con cuidado)

Primera de las tareas pendientes marcadas como 🔴 explícitas de Marcos: tarjetas de consejos/terminal para los días de aeropuerto, y una de "qué hacer al aterrizar" para el día de llegada a Hanói. Investigado con WebSearch antes de escribir nada de inmigración, tal y como pidió Marcos ("es delicado").

**Barcelona-El Prat (`CITY_INFO`):** confirmado que Shenzhen Airlines opera desde la Terminal 1 (puertas zona D principalmente) — antes el texto solo decía "comprobar bien desde cuál sale", ahora lo dice directamente.

**Shenzhen Bao'an (`CITY_INFO`):** corregido un dato que ya estaba desactualizado — la política de tránsito sin visado no es de 72-144h, subió a **240 horas (10 días)** desde diciembre de 2024, y España está entre los 54 países con acceso. Añadida nota práctica: para la conexión internacional-internacional en la T3 basta con seguir los carteles de "Transfer".

**Llegada a Hanói (notas del día 07-nov, no en `CITY_INFO` porque es específico de ESE día, no de la ciudad en general):** ficha nueva y completa con:
- Terminal T2 (internacional), proceso de inmigración+maletas+aduana (30-60 min)
- **Hallazgo importante de la investigación:** desde junio de 2026 Vietnam exige rellenar la "Vietnam Digital Arrival Card" ONLINE antes de volar (prearrival.immigration.gov.vn, dentro de las 72h antes del vuelo, genera un QR para enseñar en inmigración) — esto es ADEMÁS del eVisa, no lo sustituye. No estaba contemplado en ningún sitio de la app. Añadida también como tarea nueva (`pre3b`, fecha 06-nov, para que les salga de recordatorio el día antes de aterrizar)
- Transporte al centro: distancia (27 km, 35-50 min), opciones con precio (Grab 250-350k VND, taxi oficial 350-450k VND, bus 86 exprés 45k VND/persona) y aviso de la estafa clásica de taxis no oficiales dentro de la terminal

**Nota técnica:** el campo `notes` de cada día en `data.js` se inserta sin escapar en el HTML (a diferencia de `curiosities`/`food` de `CITY_INFO`, que sí pasan por `escHtml()`) — por eso el texto de Barcelona/Shenzhen no lleva markdown (no se renderizaría), mientras que en teoría `notes` sí admitiría etiquetas HTML simples si hiciera falta formatearlo más.

**Verificado en el navegador:** las 3 fichas cargan bien, la tarea nueva aparece en `DB.tasks` (que es una lista separada de `tripNotes.preTripTasks` — ojo, hay dos listas de checklist distintas en la app, no confundirlas).

**Archivos:** `js/data.js` (DATA_VERSION 47→48, día 07-nov y tarea `pre3b`), `js/app.js` (`CITY_INFO` Barcelona/Shenzhen, v→128), `index.html`.

Sources: [Shenzhen Airlines - Aeropuerto de Barcelona - El Prat](https://www.barcelona-airport.com/esp/aerolineas/shenzhen-airlines) · [240-Hour Visa-Free Transit at Shenzhen Baoan Airport](https://www.chinaairlinetravel.com/airport-guide/shenzhen-airport/144hours-visa.html) · [Vietnam Digital Arrival Card guide](https://www.traveloka.com/en-en/explore/tips/vietnam-digital-arrival-card/1007396) · [Noi Bai International Airport Arrival Guide](https://www.vietnamparadisetravel.com/blog/noi-bai-international-airport) · [Hanoi Airport to City: Transport Options & Costs](https://www.hanoitourism.org/hanoi-airport-to-city/)

---

## 2026-09-30 (PC del trabajo) — Reconciliación tras sincronización MEGA con la sesión del PC de casa: 28 fotos rotas encontradas y corregidas

Al retomar la sesión, `git status` mostró que varios archivos (`js/data.js`, `js/app.js`, `css/styles.css`, los `.md` de especificaciones, y 3 imágenes locales borradas) habían cambiado en el disco sin que este PC los hubiera commiteado — la sesión del PC de casa de anoche (29-sep, ver continuaciones 10-16) se sincronizó por MEGA encima del trabajo de este PC. Como `.git` no viaja por MEGA (ver Parte 19 de la Memoria Maestra), el resultado es un archivo de **contenido mezclado**: `git log` de este PC no tiene los commits de casa, pero los ARCHIVOS en disco sí llevan sus cambios, superpuestos a los míos de ayer tarde.

**Verificación exhaustiva antes de commitear nada:**
1. `git diff --numstat` confirmó que `HISTORIAL_DE_CAMBIOS.md` solo tenía inserciones (0 borrados) — su convención de "nunca se borra, se añade arriba" hizo que las dos sesiones convivieran bien ahí. `CONTINUIDAD.md`, `js/app.js` y `js/data.js` sí tenían borrados además de inserciones — contenido realmente divergente, no solo acumulado.
2. Comprobación de claves duplicadas en `WIKI_ARTICLES`: solo 2 duplicados inofensivos (mismo valor en ambas), nada roto por colisión de claves como pasó ayer.
3. **Auditoría completa en vivo (recorrido real por los 25 días, no un script aparte) encontró 28 fichas sin ninguna foto que cargara** (`src` vacío) — causa raíz: el PC de casa **renombró muchas entradas** en su `data.js` (añadiendo sufijos descriptivos, p.ej. `'Calle Trần Phú'` → `'Calle Trần Phú — azoteas y Mot Hoi An'`) y actualizó sus alias de `WIKI_ARTICLES` a juego — pero el `data.js` que llegó a este PC por MEGA se quedó con los nombres CORTOS originales. Los alias con el nombre largo no encontraban su ficha, y viceversa.

**Fix aplicado:** en vez de intentar adivinar o replicar los renombrados del PC de casa (arriesgado sin ver su commit real), se añadieron alias nuevos usando el nombre EXACTO que hay ahora en este `data.js`, reutilizando el mismo destino real que ya tenía la versión renombrada cuando existía uno equivalente (ej. `'Calle Trần Phú'` → `Hội_An`, igual que su `'Calle Trần Phú — azoteas...'` → `Hội_An`). Para las ~5 fichas de contenido totalmente nuevo del PC de casa (Banteay Srey Butterfly Centre, Lotus Silk Farm, Clases de Cocina, Mercado nocturno Son Tra, Aldea de Frescos de Da Nang — extras de Angkor y Da Nang, buen contenido) se buscó foto real en Wikimedia Commons desde cero, verificada a ojo antes de aplicarla (foto real de mariposa del propio Banteay Srey Butterfly Research Center para esa ficha).

**Bug adicional encontrado de paso (no introducido hoy, ya existía en el trabajo del PC de casa):** su alias `'Ruta de playas Cat Co (1, 2 y 3)': 'Cát_Bà_island'` usa el artículo con tildes, que no existe en Wikipedia — el real es `Cat_Ba_Island` (sin tildes). Corregido en la entrada equivalente de este PC; **queda pendiente corregir también la suya** si sigue usando el nombre con sufijo.

**Verificado con recorrido en vivo completo por los 25 días (en 4 tandas para evitar timeouts): 0 imágenes rotas en las 167 fichas del itinerario** (antes de este fix: 27-28 rotas). Sintaxis de ambos archivos comprobada con Node antes de comprometer nada.

**Archivos:** `js/data.js` (DATA_VERSION 46→47), `js/app.js` (v→127), `index.html`.

**Para la próxima sesión del PC de casa:** este commit no desciende de tus commits locales (`4dc5851`...`d48f9a4`) — sigue siendo el mismo problema de siempre, cada PC tiene su propio historial git y solo los ARCHIVOS se sincronizan por MEGA. Cuando retomes, compara tu `git log` con el de aquí antes de asumir cuál versión es la "buena" — ninguna de las dos es más correcta, son cambios en paralelo sobre la misma base.

---

## 2026-09-29 (continuación 16, PC de casa) — Bug estructural de fotos duplicadas encontrado y corregido (27 casos) + fixes de UI varios

**El hallazgo más importante de esta continuación.** Marcos fue navegando la app en vivo (mientras yo trabajaba en otras cosas en paralelo) y fue reportando, uno tras otro, sitios con miniaturas repetidas o directamente incorrectas: la Catedral de San José mostrando la Torre de la Tortuga del Lago Hoan Kiem, la Ciudadela de Thang Long mostrando el logo de un blog, "Lap Khmer" y "Amok" compartiendo foto (y ninguna de las dos su plato real), el Monumento al Pez Basa mostrando un pez de piscifactoría vivo en vez de la escultura, Montaña Sam y Victoria Nui Sam Lodge con la misma foto, Bến Ninh Kieu y su puente con la misma foto, Puente del Dragón/Love Lock Bridge/Mercado nocturno Son Tra los tres pareciendo el mismo puente, y la bahía de Lan Ha compartida por 3 sitios distintos de Cat Ba.

**Causa raíz identificada:** no eran casos aislados. Escribí un script que analiza el objeto `WIKI_ARTICLES` de `app.js` (la tabla que alias cada nombre de sitio a un artículo de Wikipedia para buscar su foto) y encontró que **72 artículos de Wikipedia estaban asignados a 2 o más nombres de sitio distintos** — de esos, cruzando contra los nombres que existen de verdad en el `data.js` actual (muchos eran nombres huérfanos del itinerario viejo, ya no usados, inofensivos), quedaron **15 grupos con dos o más sitios REALES compartiendo la misma foto**, sumando 27 líneas de alias duplicadas. Herencia de cuando se fueron asignando alias uno a uno durante la reescritura del itinerario del 28-sep, sin comprobar si ese artículo de Wikipedia ya estaba en uso por otro sitio.

**Corregido con un script de limpieza automática:** para cada grupo de sitios reales que compartían el mismo artículo, se conserva el alias solo en el primero (el más representativo) y se elimina de los demás — así cada uno cae al siguiente paso de la cadena de resolución (Wikipedia con su propio nombre, o sin foto) en vez de heredar la foto de otro sitio. **27 líneas de alias duplicadas eliminadas.** Además, 3 archivos locales confirmados con contenido erróneo (`catedral_san_jose_hanoi.jpg`, `café_phố_cổ_azotea_secreta_sobre_el_lago.jpg`, `imperial_citadel_of_thăng_long.jpg`) se borraron de `img/places/` tras verificar a ojo que no correspondían al lugar.

**5 fotos nuevas verificadas a ojo y añadidas con foto directa** (para los casos que valían la pena buscar en vez de dejar sin foto): Catedral de San José (real, neogótica), Ciudadela Imperial de Thang Long (puerta Doan Mon), Monumento al Pez Basa (la escultura real, no un pez vivo), Love Lock Bridge Da Nang (foto real del muelle con faroles). "Lap Khmer" se quedó sin foto (no hay ninguna en Commons) y "Amok de pollo o verduras" se renombró a "Amok" a secas, quedándose con la foto real de Fish Amok (la versión con cobertura fotográfica y la más icónica del plato nacional).

**Otros arreglos de UI reportados por Marcos mientras navegaba en vivo:**
- **"🍜 Dónde comer & beber" seguía apareciendo** en la pestaña "Lugares" de cada día pese a que ayer se renombró el título de la pestaña y de la vista previa — quedaba este tercer sitio sin tocar. Ahora dice "🍜 Qué comer" en los tres.
- **Pestaña "Qué comer" oculta en los días de aeropuerto** (Barcelona, Shenzhen) cuando no hay restaurantes registrados — antes se veía la pestaña vacía con "Sin platos registrados para esta zona", ahora directamente no aparece esa pestaña.
- **Corregido el "piquito"** (pequeño triángulo oscuro asomando en la esquina superior izquierda de las tarjetas de bloque en "Días"/"Transportes") — causa: la cabecera del bloque y la lista de días de abajo tenían cada una su propio `border-radius` y se superponían con un margen negativo de 1px, dejando un hueco de subpíxel en la esquina por el que se colaba el fondo. Solución de raíz: el redondeado y el `overflow:hidden` ahora se aplican una sola vez al contenedor `.block-section` que envuelve a ambos, en vez de intentar que coincidan por separado.

**Encontrado (no arreglado en la app, requiere acción de Marcos):** el mapa de la pestaña "Mapa" se veía en blanco. Probado el enlace `myMapsUrl` directamente sin sesión de Google → pide iniciar sesión ("The map you requested is only available to some users"). **El mapa de Google My Maps de Marcos no está compartido en modo público** ("Cualquier usuario con el enlace"), sino en un modo restringido — por eso el iframe embebido no puede cargarlo para nadie que no tenga su sesión de Google. Instrucciones dadas a Marcos: My Maps → mapa "Vietnam" → `⋮` → Compartir → Acceso general → "Cualquier usuario con el enlace" (Lector).

**Pendiente para la próxima sesión:**
- Confirmar con Marcos si ya cambió la visibilidad del mapa y volver a probar el iframe
- Bloque de tarjetas de "info del aeropuerto" (consejos, mapa de terminales si aplica, y para Hanói qué hacer nada más aterrizar) — pedido explícito, sin empezar
- Ampliar "Qué comer" de 2 a 4-5 platos por día donde tenga sentido, investigando en internet además de lo ya puesto — pedido explícito, sin empezar
- Seguir el barrido de fotos: quedan sitios sin revisar visualmente fuera de los que Marcos ha ido reportando en vivo; y de los 72 grupos de alias duplicados originales, quedan ~57 grupos con nombres huérfanos del itinerario viejo — limpiarlos en algún momento no es urgente (no causan bugs visibles, son código muerto) pero ensucian el archivo
- Seguir el criterio de relevancia turística en las listas de Google Maps que quedan: Vietnam Norte-Hanói (terminado el filtrado, falta Ninh Binh y repasar Cat Ba/Vietnam Sur que ya se hicieron en otra sesión con otro método)

**Archivos:** `js/app.js` (27 alias duplicados eliminados, rename "Qué comer" en Lugares, fix tab Qué comer condicional, v→126), `js/data.js` (5 fotos verificadas nuevas, Lap Khmer/Amok renombrado, DATA_VERSION→46), `css/styles.css` (fix border-radius/overflow de `.block-section`, v→70), `img/places/` (3 archivos erróneos borrados), `index.html`.

---

## 2026-09-29 (continuación 15, PC de casa) — Criterio de relevancia turística para las listas de Google Maps + primeros sitios añadidos

**Contexto:** Marcos pidió explícitamente no volcar los ~200 sitios de sus 7 listas de Google Maps tal cual ("muchos son simples lugares que apuntamos y a lo mejor vamos o no"), sino que estableciera yo un criterio de relevancia turística, comparando con webs de viaje, y metiera solo los que de verdad aportan.

**Criterio adoptado:** Google Maps ya da, para cada sitio guardado en una lista, su valoración media y (más importante) **el número de reseñas** — una señal agregada de miles de viajeros reales, equivalente a lo que daría cruzar manualmente contra TripAdvisor/webs de viaje sitio a sitio. Un sitio se considera de interés turístico real si tiene **aprox. ≥150-300 reseñas** (varía según lo nicho de la categoría) y no es ya una entrada distinta de algo que la app cubre con más detalle bajo otro nombre. Sitios con muy pocas reseñas o sin valoración (localidades sueltas, negocios genéricos) se descartan salvo que sean claramente icónicos pese a lo nicho (p.ej. un mercado nocturno pequeño pero único de una ciudad concreta).

**Método:** abrir cada una de las 7 listas compartidas (enlaces en `MEMORIA_MAESTRA.md`, Parte 20) en el navegador — son públicas, no requieren la sesión de Marcos — extraer todos los sitios con su categoría/reseñas, y contrastar nombre por nombre contra lo que ya existe en `data.js` para esa ciudad/día. Solo se procesa lo que no está ya cubierto.

**Lista "Camboya Sur" (10 sitios):** 8/10 ya cubiertos con ficha rica. El puerto internacional ya está referenciado como punto de salida del ferry (transporte, no ficha de sitio). Solo "Toul Tom Poung Evening Market" (4.0, 22 reseñas) se descarta por criterio — muy pocas reseñas, redundante con el Mercado Ruso de día que sí está cubierto.

**Lista "Camboya Norte" (26 sitios, Angkor/Siem Reap):** 23/26 ya cubiertos. 3 huecos reales por encima del umbral, ya identificados como "opcionales" en una sesión anterior pero nunca decididos — decisión tomada hoy, añadidos al día 12-nov (ruta rural hacia Banteay Srei, donde están los tres físicamente):
- **Museo de Minas Terrestres de Camboya** (4.6, 994 reseñas) — foto verificada (Commons, la vitrina de artillería inerte del propio museo)
- **Banteay Srey Butterfly Centre** (4.5, 500 reseñas) — sin foto, verificado que Commons no tiene ninguna imagen real del sitio
- **Lotus Silk Farm** (4.9, 3.949 reseñas — la de más reseñas de las tres) — sin foto, mismo motivo
- Descartada "Artisans Silk Farm" (166 reseñas, redundante con Lotus Silk Farm) y "Preah Dak" (sin reseñas, es una localidad, no un sitio)

**Dos sitios más, ya señalados como pendientes en sesiones anteriores y resueltos hoy con la misma autorización de Marcos:**
- **Santuario de My Son** (ruinas Cham, Patrimonio UNESCO, cerca de Hoi An) — añadido al 20-nov, foto verificada (Commons)
- **Península de Son Tra / Montaña de los Monos** (Da Nang, con la Pagoda Linh Ung y su Buda blanco de 67m) — añadido al 21-nov, foto verificada (Commons) — distinto del "Mercado nocturno Son Tra" que ya existía, mismo nombre de zona pero sitio distinto

Los 5 sitios nuevos verificados en el navegador tras aplicarlos: las 3 fotos nuevas cargan correctamente en las fichas, y los 2 sitios sin foto muestran el placeholder genérico esperado (no rotos, no con foto equivocada).

**Pendiente:** repetir el mismo método (abrir lista → extraer con reseñas → filtrar por el criterio → cruzar contra `data.js`) para las 4 listas grandes que quedan: Vietnam Norte-Hanói (46), Vietnam Centro (62, la más grande — Hoi An/Da Nang/Hue), Vietnam Norte-Ninh Binh (22) y Vietnam Norte-Cat Ba (11)/Vietnam Sur (13, estas dos ya se revisaron a fondo en una sesión anterior, probablemente con menos huecos).

**Archivos:** `js/data.js` (DATA_VERSION 42→43), `index.html` (`data.js?v=43`).

---

## 2026-09-29 (continuación 12, PC de casa) — Contenido de María: Hoi An (clases de cocina, talleres) y Da Nang (mercado nocturno, Aldea de Frescos)

**Contexto:** retomado el trabajo interrumpido de meter el contenido del documento `.odt` de María para los días 19-21 (Hoi An/Da Nang) que quedó pendiente en la continuación 10 al parar para verificar imágenes primero.

**Añadido a 2026-11-20 (Hoi An):**
- **Clases de Cocina**: las dos opciones que describe María (Isla de Thuan Tinh 35€ con mercado+barco+cocina, y "Cocina Tradicional" 34€ con huertos y técnicas de arroz).
- **Talleres Artesanales**: farolillos de cera y el taller con impacto social Reaching Out Vietnam (artesanos con discapacidad, calle Nguyễn Thái Học 103).
- Nota del día actualizada: ya no dice "pendiente: Clases de Cocina, Talleres Artesanales" porque ahora están metidos; se deja solo "Ba Na Hills (ver día 21)" y "Santuario de My Son" como pendientes reales.

**Añadido/enriquecido en 2026-11-21 (Da Nang):**
- **Mercado nocturno Son Tra** y **Love Lock Bridge**: tenían `notes: ''` (sin contenido) — rellenados con el detalle de María (zonas del mercado, horarios, ubicación exacta junto al Puente del Dragón).
- **Aldea de Frescos de Da Nang** (Làng Bích Họa): sitio nuevo, no existía ninguna ficha — barrio de murales a 2 min del hotel LaDa's House.

**Sobre las fotos de estos 5 sitios nuevos/enriquecidos: dejados sin `photo:` a propósito, no es un olvido.** Antes de escribirlas comprobé con un script (mismo método de commons_search que usa la app) qué encontraría el buscador en vivo para "Aldea de Frescos de Da Nang" — solo devuelve PDFs irrelevantes sin ninguna foto real del sitio, ni con el nombre en español ni en inglés. Como `loadWikiPhoto()` en `app.js` (la función que carga la miniatura en la ficha) solo prueba `WIKI_ARTICLES[nombre] → artículo de Wikipedia en inglés`, y no existe artículo para este sitio, el resultado real en la app es que la ficha se queda sin foto (no rota, sin `src`) — mismo comportamiento ya aceptado para otros sitios sin foto confirmada (p.ej. `Mercado de Tan An`, `Mercado de Ba Le`). Poner una `photo:` inventada o mal emparejada habría sido peor que dejarla vacía.

**Evitada una duplicación:** al escribir la ficha de "Calle Trần Phú" y "Night Market" para el 19-nov, comprobé que ya existían fichas equivalentes (con foto y descripción) para el día de llegada 18-nov (`Calle Trần Phú` y `Chợ đêm Hội An (Mercado Nocturno de los Farolillos)`) — retiradas las nuevas del 19-nov para no repetir el mismo sitio en dos días distintos de la ficha "Días".

**Sigue pendiente del documento de María:** el bono de 22 monumentos de Hoi An solo está resumido por categorías (no monumento a monumento — son 22 sitios, la app ya tiene las 5 categorías del bono con foto representativa, decisión de la continuación anterior de no crear 22 fichas individuales); Chau Doc/Can Tho siguen con el contenido resumido que ya tenían (el documento de María es muy breve ahí, no da para más).

**Archivos:** `js/data.js` (DATA_VERSION 39→40), `index.html` (`data.js?v=40`).

---

## 2026-09-29 (continuación 13, PC de casa) — Dos huecos de contenido en Chau Doc rellenados

Revisando el día 17-nov (Chau Doc → Can Tho) encontré dos sitios con `notes: ''` vacío: **Mausoleo de Thoại Ngọc Hầu** y **Victoria Nui Sam Lodge**. Rellenados con una frase factual breve cada uno (mandarín Nguyễn enterrado junto a sus dos esposas a los pies de la Montaña Sam; terraza-mirador de arrozales fronterizos con Camboya). Comprobado también que las 4 opciones nocturnas de Can Tho que lista María (Chợ đêm Đề Thám, Bờ kè Cái Khế, Chợ đêm Ninh Kiều, Chợ đêm Cần Thơ) ya estaban recogidas como nota de texto en el día (decisión de una sesión anterior, razonable dado que se solapan bastante con Bến Ninh Kiều/Ninh Kieu Footbridge que sí tienen ficha propia) — no se ha tocado.

**Archivos:** `js/data.js` (DATA_VERSION 40→41), `index.html` (`data.js?v=41`).

---

## 2026-09-29 (continuación 14, PC de casa) — Barrido final de huecos `notes: ''` en toda la app

Búsqueda de todos los sitios con `notes: ''` (vacío) en el archivo entero, no solo Chau Doc. Encontrados y rellenados 6 más: **Wat Damnak** (Siem Reap, sede de Cambodian Living Arts), **Mercado central Chợ Hội An** (horario de María: abre 06:00, subasta de pescadores 5-7h), **Mercado de pescado de Thanh Ha** (subasta de madrugada 03:00-07:00), **Mercado de Tan An/Tiger Market** y **Mercado de Ba Le** (horarios de María), **Mercado nocturno de Dong Ba** y **Paseo junto al río Perfume** (Hue — María no cubre Hue en su documento, así que estos dos son de conocimiento general, no de su texto). Solo queda un `notes: ''` en todo el archivo: "Cena de comida Khmer", un placeholder genérico de cena que ya tiene foto propia — no aporta rellenarlo.

**Archivos:** `js/data.js` (DATA_VERSION 41→42), `index.html` (`data.js?v=42`).

---

## 2026-09-29 (continuación 11, PC de casa) — CAUSA RAÍZ de los problemas de contraste: dos temas oscuros paralelos

**El hallazgo más importante de estos dos días de arreglos de contraste.** Marcos reportó que el bloque de Transportes "ya no se lee nada" en oscuro pese a que ya se había arreglado ayer (`.tr-inline`, ver continuación del 28-sep). Investigado a fondo: **la app tiene DOS bloques de CSS de tema oscuro totalmente independientes**:
1. `html[data-theme="dark"] { ... }` — el bloque donde se han ido añadiendo TODOS los arreglos de contraste de esta sesión y la de ayer. Solo se activa si el usuario ha tocado el interruptor de tema DENTRO de la app.
2. `@media (prefers-color-scheme: dark) { ... }` — un bloque paralelo, con las mismas variables pero **ninguno de los arreglos de componentes** (`.tr-inline`, `.docs-hint`, `.lugar-tips`, `.currency-*`, etc.), que se activa automáticamente si el sistema operativo/navegador está en modo oscuro **y el usuario nunca ha tocado el interruptor de la app**.

`initTheme()` en `js/app.js` solo fijaba `data-theme` en `<html>` si había una preferencia guardada en `localStorage` — si no (caso "auto", el que tiene cualquiera que no haya tocado el interruptor nunca, muy probablemente el caso de Marcos en el navegador/móvil que estaba mirando), `data-theme` se quedaba sin fijar y el navegador usaba el bloque `@media`, **desactualizado desde el primer arreglo de contraste que se hizo**. Esto explica por qué tantos arreglos de estos dos días "no se notaban" para Marcos pese a estar bien hechos y verificados en el navegador de pruebas (que si tenía data-theme explícito).

**Corregido de raíz:** `initTheme()` ahora SIEMPRE fija un `data-theme` explícito en `<html>`, incluso en modo "auto" — resolviendo `matchMedia('(prefers-color-scheme: dark)')` una vez al cargar y quedándose escuchando cambios del sistema mientras siga en "auto". Así todo el CSS de tema vive en un único sitio (`html[data-theme=...]`) y el bloque `@media` (~150 líneas, líneas 1993-2150 aprox.) queda efectivamente muerto — se ha dejado en el archivo por prudencia (no borrar código sin verificarlo del todo) pero ya no debería activarse nunca.

**Otros arreglos de esta continuación:**
- `DAY_MAP_COORDS` en `app.js` no tenía las ciudades nuevas del itinerario (Barcelona, Shenzhen, Chau Doc, Can Tho, y `'Tam Coc'` suelto) → esos días perdían el embed del My Maps de Marcos y cae a Leaflet. Añadidas las 5 claves que faltaban, confirmado que los 25 días resuelven ya a unas coordenadas.
- 5 fotos verificadas a ojo (descargadas y miradas antes de aplicar) y corregidas por ser iguales entre sitios distintos o directamente incorrectas: `Bayon` (compartía foto con Angkor Thom), `Lago Truc Bach` (compartía con West Lake), `Calle Phan Đình Phùng` (compartía con la Ópera — ahora foto real de la avenida con túnel de árboles), `Chợ Châu Đốc` ×2 (mostraba un mercado de Hong Kong, ahora mercado real de Chau Doc), `El Río Hậu` (mostraba un puente de otra ciudad, ahora una casa flotante real).
- `.block-section-header` (títulos de bloque en la pestaña Días) rediseñado para fundirse visualmente con la tarjeta de la lista de abajo — antes quedaba a medio camino entre texto suelto y tarjeta.
- "Dónde comer" → renombrado a **"Qué comer"** en el resumen y pestaña del día (petición de Marcos: hoy solo hay platos, no restaurantes reales con ubicación; cuando haya info de restaurantes real se añadirá un bloque nuevo "Dónde comer" con sitios identificados en el mapa).

**Pendiente explícito de Marcos, para próximas sesiones:** cuando haya información real de restaurantes (no solo platos típicos), crear un bloque "Dónde comer" separado con restaurantes concretos, identificados también en el mapa. Además, todos los sitios de las listas de Google Maps de Marcos deberían tener su propia ficha (info + imagen) en la app — de momento solo una parte de esas ~200 referencias tiene ficha propia.

**Archivos:** `js/app.js` (fix de tema raíz, `DAY_MAP_COORDS`, 3 alias `WIKI_ARTICLES`, rename "Qué comer", v→123), `css/styles.css` (`.block-section-header`/`.block-days-list`/`.bsh-count` rediseñados, v→69), `js/data.js` (3 `photo` directos, DATA_VERSION→38), `index.html`.

---

## 2026-09-29 (continuación 10, PC de casa) — Mapa sin coordenadas para las ciudades nuevas + 5 fotos verificadas a mano

**Contexto:** Marcos siguió esta misma mañana en otra sesión en el PC del trabajo (ver el bloque `## 👉 LEE ESTO PRIMERO` de `CONTINUIDAD.md` para el resumen completo de esa sesión). Al volver al PC de casa reportó que el mapa de la pestaña "Mapa" no aparecía en varios días, y pidió explícitamente no parchear solo los ejemplos que él viera sino repetir el proceso completo de la continuación 8 (recolección en vivo + agrupar por foto compartida + verificar a ojo antes de aplicar).

**Bug real de mapa encontrado y corregido:** `DAY_MAP_COORDS` en `js/app.js` (la tabla que decide si se muestra el My Maps embed de Marcos o se cae al Leaflet genérico) seguía con las claves de ciudad de la ruta ANTIGUA — nunca se actualizó tras la reescritura del itinerario del 28-sep. Días con ciudades nuevas (Barcelona, Shenzhen, Chau Doc, Can Tho) o con el nombre exacto sin coincidencia (`'Tam Coc'` solo, sin la palabra "Ninh Binh") no encontraban ninguna clave y perdían el mapa por completo. Añadidas las 5 claves que faltaban — confirmado por script que los 25 días ahora resuelven a unas coordenadas.

**Repetición del proceso de la continuación 8 (recolección en vivo + agrupar por foto compartida):** recolectadas las 157 fotos resueltas de sitios/restaurantes existentes (antes de añadir el contenido nuevo de María) y agrupadas por URL compartida entre nombres distintos — 19 grupos encontrados. La mayoría ya eran "genérico-pero-honesto" conocidos de la continuación 8 (mismo país/comida, sin foto específica disponible). **5 casos nuevos verificados a ojo (descargando la imagen y mirándola) y corregidos con foto real y distinta:**

| Sitio | Antes | Después (verificado a ojo) |
|---|---|---|
| `Bayon` | La misma foto que `Angkor Thom (South Gate)` (alias compartido a `Angkor_Thom`) | Alias propio a `Bayon` — foto real de las torres con caras |
| `Lago Truc Bach` | La misma foto que `West Lake (Tây Hồ)` | Alias propio a `Trúc_Bạch_Lake` — foto real del lago con su isla |
| `Calle Phan Đình Phùng` | La misma foto que el Palacio de la Ópera | Foto directa verificada (Commons) — la avenida con túnel de árboles y un ciclista con sombrero cónico, tal cual la describe María |
| `Chợ Châu Đốc` (dos entradas, día 16 y 17) | Foto de un mercado de Hong Kong (`WetmarketHK.jpg` — mal etiquetado en Wikipedia, ni siquiera es de Vietnam) | Foto directa verificada de "Chau Doc Market" en Commons |
| `El Río Hậu: Aldeas Flotantes y Comunidad Cham` | Foto de un puente en Cao Lãnh (ciudad distinta) | Foto directa verificada — casa flotante real en el río, con bandera vietnamita |

**Quedan sin tocar (mismo criterio que la continuación 8, no son fallos):** ~14 grupos más donde el nombre compartido es la misma entidad física (Bến Ninh Kiều/su puente, el mismo mercado mencionado dos días seguidos) o donde no se encontró ninguna foto más específica tras buscar (comida genérica vietnamita/camboyana, marisco, Old Quarter de Hoi An). Pendiente repetir esta misma recolección después de añadir el contenido nuevo de Chau Doc/Can Tho/Hoi An/Da Nang del documento de María.

**Archivos:** `js/app.js` (`DAY_MAP_COORDS`, 3 alias de `WIKI_ARTICLES`, v=122), `js/data.js` (3 campos `photo` directos añadidos, DATA_VERSION 37→38), `index.html`, `.gitignore` (añadido `MEJORAS.lnk`/`MEJORAS.json`, documentados pero no aplicados en el PC de casa).

---

## 2026-09-29 (continuación 9) — Dos fallos más vistos por Marcos: 5 fotos idénticas en Hoi An y 3 círculos vacíos en Inicio

Marcos, mirando la app en directo, encontró dos cosas más que la pasada anterior no cubrió:

**1. "La primero que abro Hoi An la misma imagen 7 veces repetida":** el día 19-nov (Hoi An), las 5 fichas de categorías del bono combinado (Casas Antiguas y Capillas Familiares, Salones de Asambleas Chinos, Museos Históricos, Puentes/Templos/Casas Comunales, Espectáculos/Demostraciones/Tumbas) mostraban todas la misma foto genérica de la ciudad — technically "correcto" según el razonamiento de la continuación 8 (son categorías abstractas del ticket, no sitios físicos), pero **visualmente se ve como un fallo real**, y Marcos tenía razón en señalarlo así. Corregido dándole a cada una una foto real y distinta de un sitio representativo de esa categoría: Casa Tan Ky (casas antiguas), Salón de Fujian (asambleas chinas), fachada del Museo de Hoi An (museos), Templo Quan Cong (puentes/templos), actuación de música tradicional vietnamita (espectáculos).

**2. "En Inicio ya hay dos sin imagen":** en el timeline de zonas de la pantalla de Inicio (los círculos de "Vuelos", "Vietnam Norte", "Angkor & Siem Reap"...), 3 bloques (`Vuelos`, `Delta del Mekong`, `Ninh Binh`) no tenían entrada en `ZONE_META` de `js/app.js` — sin la clave `wiki`, el círculo se quedaba con el color de fondo plano, sin foto, indistinguible de "roto". Bug real, no solo de contenido: los otros 6 bloques sí la tenían. Añadidas las 3 entradas que faltaban: vista aérea del aeropuerto de Barcelona-El Prat (Vuelos), el puente Cao Lãnh sobre el Mekong (Delta del Mekong), barcas entre los karst de Trang An (Ninh Binh).

**Archivos:** `js/data.js` (DATA_VERSION 36), `js/app.js` (`ZONE_META`, v=121), `index.html` (`?v=36`/`?v=121`).

---

## 2026-09-29 (continuación 8) — Auditoría visual real, sitio por sitio, imagen por imagen (pedido explícito tras queja de Marcos)

Marcos, con razón, se quejó de que los scripts anteriores (continuación 6) daban una falsa sensación de "ya está todo revisado" cuando en la práctica seguía encontrando fallos a simple vista (continuación 7) — pidió explícitamente dejar los scripts y mirar la app de verdad, imagen por imagen, "aunque sea 30 minutos". Esta es esa pasada.

**Método:** en vez de reimplementar la lógica de fotos en Node (como en la continuación 6, que resultó insuficiente), se usó el propio código en ejecución de la app — un bucle en la consola del navegador que recorre los 25 días reales vía `navigate('day', ...)`, deja que cargue cada foto con el pipeline real (`loadWikiPhoto`), y recoge el `src` final de cada imagen. Esto da el dato exacto de qué ve un usuario, no una aproximación. Con esos datos se agruparon las fotos que comparten URL entre varios sitios con nombres distintos — la señal más fiable de "aquí hay algo genérico o mal puesto" — y cada caso sospechoso se verificó **visualmente** (descargando la imagen candidata y mirándola) antes de aplicarla, no solo comprobando que "existe".

**Encontrados y corregidos con foto real y verificada a ojo (11 sitios):**
| Sitio | Antes | Después |
|---|---|---|
| `Cementerio City of Ghosts` (Hue) | Foto de la Ciudad Imperial (sitio totalmente distinto) | Foto real del cementerio de An Bang |
| `Amok de pollo o verduras` + `Lap Khmer` + `Cena de comida Khmer` | Foto de un bajorrelieve de piedra del templo Bayon (el artículo "Cambodian_cuisine" de Wikipedia tiene ESA foto de thumbnail — parece una pared, no comida) | Foto real de amok en hoja de plátano (Lap Khmer y Cena de comida Khmer se quedan con esta misma foto como genérico-pero-honesto, no se encontró foto específica de ninguna de las dos) |
| `Khmer BBQ` | Igual bajorrelieve | Foto real de una mesa de BBQ camboyano |
| `Bai Sach Chrouk` | Igual bajorrelieve | Foto real del plato (encontrada por la grafía alternativa "Bay sach chrouk") |
| `Mercado central Chợ Hội An` | Foto genérica de Hội An ciudad (compartida con otros 9 sitios distintos) | Foto real del mercado |
| `Bến Ninh Kiều` + `Ninh Kieu Footbridge` | Foto genérica de Can Tho (compartida con 4 sitios más) | Foto real del muelle/paseo (comparten foto entre sí porque es literalmente el mismo sitio) |
| `Chùa Ông Cần Thơ` | Igual genérica de Can Tho | Foto real del interior del templo chino |
| `Nhà cổ Bình Thủy` | Igual genérica de Can Tho | Foto real de la casa colonial |
| `Thiền viện Trúc Lâm Phương Nam` | Igual genérica de Can Tho | Foto real del monasterio |
| `Templo Bach Ma` (Hanói) | Foto genérica del Old Quarter (compartida con 3 sitios más) | Foto real de la fachada del templo |
| `Lan Ha Bay (crucero...)` | Foto genérica de la bahía (placeholder picsum sin resolver) | Foto real de juncos navegando entre los karst |
| `Cannon Fort` (Cat Ba) | Foto genérica de la isla (compartida con playas) | Foto real de las vistas desde el fuerte |

**Verificación del `Old Quarter Hoi An`/`Chợ đêm Hội An`:** re-confirmado que las 5 fichas "categoría del bono" (Casas Antiguas, Salones Chinos, Museos, Puentes/Templos, Espectáculos) comparten a propósito la foto genérica de Hội An — son literalmente categorías del ticket combinado, no sitios individuales, así que no es un fallo (`js/data.js:505-509`).

**Quedan generic-pero-honestos sin foto específica** (revisado, no se encontró nada mejor en Wikimedia Commons tras buscar): `Mercado de pescado de Thanh Ha`, `Mercado de Tan An (Tiger Market)`, `Mercado de Ba Le` (comparten foto de Hội An ciudad), `Bun Ca`/`Bún Cá Châu Đốc`/`Ốc (caracoles de río)` (genérico de comida vietnamita), `Marisco de Da Nang`/`Marisco de Cat Ba`/`Último marisco en Cat Ba` (genérico de marisco, por diseño — son entradas deliberadamente vagas), `Trekking al pueblo de Viet Hai`/`Ba Trai Dao`/`Ngu Lam Peak` (comparten foto de Lan Ha Bay). Ninguno de estos es una foto **incorrecta** (todas son del país/región correcta), solo no son específicas — nivel de prioridad mucho menor que los 11 corregidos arriba, que sí mostraban algo activamente distinto o ajeno al sitio.

**Confirmado con la misma recolección en vivo:** 0 imágenes rotas (`loaded: false`) en las 157 entradas únicas del itinerario tras el fix (antes de esto, `Phare, The Cambodian Circus` aparecía como rota en una primera pasada — resultó ser un falso positivo del tiempo de espera del propio script de recolección, no un fallo real; verificado por separado con más margen de espera).

**Archivos:** `js/data.js` (DATA_VERSION 35), `index.html` (`?v=35`).

---

## 2026-09-29 (continuación 7) — Marcos revisa la app en vivo: bug de contenido copiado (Old Market/Pub Street) y fotos genéricas repetidas

Marcos pidió ver la app en el navegador para comprobar él mismo si de verdad no había fallos de imágenes (razonable — el script de la continuación 6 solo pilla huecos "duros", como se advirtió). Con capturas del día 10-nov (Hanói → Siem Reap) y del día 14-nov (Phnom Penh) encontró dos problemas reales que el script no detecta porque no son fallos técnicos, son de **contenido y de variedad**:

**1. Bug de contenido real (no solo de foto) — `'Old Market (Phsar Chas)'`:** tenía copy-pasteado literalmente el texto de `'Pub Street'` (notes/description/tips idénticos, hablando de que se corta el tráfico a las 18:00, Angkor Beer, el bar Red Piano de Angelina Jolie…). Un mercado con la ficha de una calle de bares. Reescrita con contenido real y propio: mercado tradicional, producto fresco + ala de souvenirs, consejos de regateo.

**2. Cuatro sitios de un mismo día usando la misma foto genérica de ciudad:** en el día 10-nov, `Wat Preah Prom Rath`, `Old Market`, `Pub Street` y `Siem Reap River` alias-eaban los tres primeros a `Siem_Reap` (foto genérica de la ciudad, repetida) y el cuarto también. Visualmente parecía que la app estuviera rota, aunque técnicamente "cargaban algo". Corregido:
- `Wat Preah Prom Rath`: sin artículo propio en Wikipedia, pero sí fotos reales en Wikimedia Commons — foto directa (`photo:`) de las estatuas del templo.
- `Pub Street`: mismo caso, foto directa de la calle de noche.
- `Old Market (Phsar Chas)`: sí tiene artículo dedicado, mal encontrado antes — alias correcto a `Psar_Chas` ("Old Market (Siem Reap)"), foto real del interior del mercado.
- `Siem Reap River`: artículo dedicado `Siem_Reap_River` con foto real del río (antes usaba el genérico `Siem_Reap`). Además tenía `notes: ''` vacío — se le añadió descripción/tips reales.
- `Wat Damnak y alrededores`: no tenía el problema (ya usaba su propio alias con foto real), confirmado al revisar.

**3. Mismo patrón en comida — `Nom Banh Chok` y `Bai Sach Chrouk`:** ambos aliaseaban a `Cambodian_cuisine` (genérico) porque sus artículos de Wikipedia existen pero sin foto (ya detectado en la auditoría anterior). Encontrada foto real de `Nom Banh Chok` en Wikimedia Commons (búsqueda directa, no vía artículo de Wikipedia) — foto directa añadida. `Bai Sach Chrouk` se queda con el genérico: no se encontró ninguna foto específica en Commons tras buscar.

**Lección de proceso:** el script de verificación (continuación 6) comprueba "¿carga una foto?", no "¿es una foto específica y no genérica?", ni "¿el texto es del sitio correcto?". Estos dos tipos de fallo solo se pillan mirando la app de verdad, como hizo Marcos. Quedan más casos probablemente sin revisar en el resto del itinerario (~150 sitios) — el patrón de "varios sitios seguidos con la misma foto genérica de ciudad" es la señal más fácil de detectar a simple vista si se sigue revisando.

**Archivos:** `js/data.js` (DATA_VERSION 34), `js/app.js` (v=120), `index.html` (`?v=34`/`?v=120`).

---

## 2026-09-29 (continuación 6) — Auditoría sistemática foto↔sitio: script de verificación, 4 huecos reales corregidos

Fase 2 del encargo de Marcos ("analiza sitio por sitio imagen por imagen comida por comida"): en vez de revisar los ~156 sitios/platos del itinerario uno a uno a mano, se escribió un script en Node que replica exactamente la lógica de `loadWikiPhoto()` (mismo orden de prioridad: `photo` directo → `IMAGE_MAP` → imagen local en `img/places/` → alias de `WIKI_ARTICLES` → nombre crudo como artículo) y comprueba, para cada uno de los 156 sitios/restaurantes de `js/data.js`, si termina resolviendo a una imagen real o si cae en el último nivel (usar el propio nombre español/vietnamita como si fuera un slug de Wikipedia — casi garantizado que falla).

**Resultado:** 152 de 156 resuelven bien por alguna de las vías normales (100 con imagen local ya descargada, 20 vía `IMAGE_MAP`, 32 vía alias de Wikipedia con foto confirmada). Solo **4 caían al último nivel** sin alias — de esos, 2 daban 404 limpio (sin foto en absoluto) y, más grave, **1 resolvía "por accidente" a un artículo real pero completamente equivocado**:

| Sitio | Problema | Fix |
|---|---|---|
| `'Night market'` (día 18-nov, Hoi An) | El nombre en inglés genérico coincidía con el artículo real de Wikipedia "Night market" — pero su foto es de **Myeongdong, Seúl (Corea del Sur)**, nada que ver con Hoi An. Además tenía `notes: ''` vacío. | Renombrado a `'Chợ đêm Hội An (Mercado Nocturno de los Farolillos)'`, con descripción/tips del mercado nocturno real de la isleta An Hội; alias nuevo a `Hoi_An_Old_Town` |
| `'Old Quarter Hoi An (paseo introductorio)'` (día 18-nov) | Sin alias, 404 | Alias nuevo a `Hoi_An_Old_Town` — **ojo:** el artículo `Hoi_An` a secas es ahora una página de desambiguación (Wikipedia reorganizó el artículo de la ciudad en 2025), hay que usar `Hoi_An_Old_Town` específicamente |
| `'El Callejón Colectivo Cũ (Cư xá Cũ)'` (día 09-nov, Hanói) | Sin alias, 404. No existe artículo dedicado a los bloques de viviendas comunales de Đống Đa | Alias genérico a `Hanoi` (mejor una foto de la ciudad que ninguna) |
| `'Sitios pendientes del Old Quarter'` (día 29-nov, último día) | Sin alias, 404 (es un texto de resumen, no un sitio real) | Alias a `Old_Quarter,_Hanoi`, coherente con el resto de entradas del Old Quarter |

Verificado en el navegador leyendo `img.src`/`img.dataset.wiki` de cada tarjeta (no solo capturas de pantalla) — las 4 cargan ahora una foto real y correcta.

**Nota de proceso:** el script solo detecta huecos "duros" (sin foto en absoluto o alias mal formado). No detecta un alias que apunte a un artículo real pero semánticamente incorrecto salvo que, como en el caso de "Night market", el nombre del sitio coincida por casualidad con un título real de Wikipedia. Para pillar más casos como ese habría que revisar visualmente foto por foto — quedó descartado por volumen (~350 alias en `WIKI_ARTICLES`), pero si Marcos ve alguna foto que no encaje navegando la app, es la señal de que hay más.

**Archivos:** `js/data.js` (DATA_VERSION 33), `js/app.js` (v=119), `index.html` (`?v=33`/`?v=119`). Script de auditoría en el scratchpad de la sesión (no versionado, reproducible si hace falta).

---

## 2026-09-29 (continuación 5) — Huecos de contenido rellenados: Tra Su, Café Giảng, stubs de Chau Doc

Primera fase del encargo de Marcos ("completa toda la información faltante... analiza sitio por sitio imagen por imagen comida por comida"): antes de la auditoría sistemática de correspondencia foto↔sitio, se rellenaron los huecos de contenido detectados en la ronda anterior.

**Cambios en `js/data.js` (DATA_VERSION 31→32):**
- **Bosque de Tra Su (Cajuput)** — antes solo mencionado en texto libre en `notes` del día 16-nov ("valorar"); ahora es una ficha completa en `places[]` del día 17-nov (Chau Doc → Can Tho), con descripción del humedal de melaleuca y aviso de que compite con el resto del plan de esa mañana.
- **Monumento a la Hamburguesa del Delta** y **Chợ Châu Đốc** (día 16-nov) — tenían `notes: ''` vacío, sin descripción de ningún tipo. Rellenados con descripción + tips.
- **Café Giảng** — el itinerario solo tenía el plato genérico "Cà Phê Trứng" sin identificar el local. Renombrado a `'Café Giảng (Cà Phê Trứng)'` con la historia real (Nguyen Van Giang, ex-barman del Metropole, invento de 1946) y dirección.
- De paso, se enriqueció también `'Bún Chả Hương Liên'` (mismo día, 08-nov) que solo tenía una línea de `notes`.

**Cambios en `js/app.js` (v=117→118) — `WIKI_ARTICLES`:**
- `'Café Giảng (Cà Phê Trứng)'` → `Cà_phê_trứng` (nuevo alias por el renombrado).
- `'Bosque de Tra Su (Cajuput)'` → `Melaleuca_cajuputi` (no hay artículo dedicado a Tra Su con foto; se usa el árbol real que forma el bosque).
- **Bug encontrado y corregido de paso:** `'Monumento a la Hamburguesa del Delta'` y `'Chợ Châu Đốc (Mercado Central de Chau Doc)'` ya tenían alias apuntando a `An_Giang` (foto genérica de un templo, añadida en la auditoría anterior). Al añadir alias más específicos para estas mismas claves quedó una **clave duplicada en el objeto `WIKI_ARTICLES`** — en JS, la última gana, así que las nuevas quedaban silenciosamente ignoradas hasta que se detectó visualmente (ambas fichas mostraban la misma foto de templo, nada que ver con un pez o un mercado). Corregido sustituyendo el valor de las claves ya existentes en vez de añadir duplicados: `Pangasius_bocourti` (foto real de pez basa) y `Wet_market` (mercado genérico, no hay artículo específico de Chợ Châu Đốc con foto). Se aprovechó para aplicar el mismo fix a `'Chợ Châu Đốc en hora punta'` (mismo mercado, día 17-nov).
- Se hizo un barrido de claves duplicadas en todo `WIKI_ARTICLES` (script rápido en Node): 5 duplicados más, todos inofensivos (mismo valor repetido, no hay divergencia) — no se tocaron.

Verificado visualmente en el navegador (servidor local): las 4 fichas nuevas/corregidas cargan foto real y distinta entre sí (pez basa, mercado, bosque verde, foto histórica de Obama/Bourdain en Bún Chả Hương Liên, egg coffee).

**Archivos:** `js/data.js` (DATA_VERSION 32), `js/app.js` (v=118), `index.html` (`?v=32`/`?v=118`).

---

## 2026-09-29 (continuación 4) — Mapa de la app vinculado a las 7 listas de Google Maps

Cierre del tema "los mapas de la app no coinciden con mis mapas": Marcos importó manualmente las 7 listas (siguiendo el método `⋮` → "Volver a importar y combinar" → "Añadir más elementos" → Subir CSV) en las 10 capas de su My Maps ("Vietnam", `mid=194Es7AqKfUlcUO6Jttbp0-7O_fFw3Zk`, el mismo que la app embebe en la pestaña "Mapa"). Se verificó capa por capa (tabla de datos, no solo pines del mapa) hasta confirmar las 10 completas:

| Capa | Sitios nuevos | CSV usado |
|---|---|---|
| Hanoi | 45 | `01_Hanoi.csv` |
| Ninh Binh | 22 | `04_Ninh_Binh.csv` |
| Lan Ha Bay | 11 | `03_Cat_Ba.csv` (la lista original juntaba Cat Ba + Lan Ha Bay) |
| Cat Ba | 11 | `03_Cat_Ba.csv` (mismo archivo, en la otra capa) |
| Hue | 17 | `02c_Hue.csv` |
| Da Nang | 12 | `02b_Da_Nang.csv` |
| Hoi An | 33 | `02a_Hoi_An.csv` |
| Siem Reap | 26 | `06_Camboya_Norte.csv` |
| Phnom Penh | 10 | `07_Camboya_Sur.csv` |
| Koh Rong Sanloem *(nombre desactualizado — el contenido real es Chau Doc/Can Tho, Delta del Mekong)* | 13 | `05_Vietnam_Sur.csv` |

**Nota sobre `02_Vietnam_Centro.csv`:** el CSV original juntaba Hoi An+Da Nang+Hue (62 sitios) en un solo archivo, pero el mapa de Marcos tiene esas 3 como capas separadas — no coincidía. Se dividió en `02a_Hoi_An.csv` (33), `02b_Da_Nang.csv` (12) y `02c_Hue.csv` (17); el combinado se borró.

**Intento fallido documentado (para no repetirlo):** antes de que Marcos lo hiciera manualmente, se intentó automatizar la importación vía Claude para Chrome usando Google Sheets como intermediario (para evitar el diálogo nativo de archivo). La pestaña de Sheets dejó de responder a las capturas de pantalla (aunque `read_page` seguía funcionando) — demasiado arriesgado sin poder verificar visualmente lo que se escribía, así que se abandonó. Quedó una hoja de cálculo sin título vacía en el Drive de Marcos (inofensiva, se puede borrar).

**Archivos:** `02_DESARROLLO/csv_mymaps/` (7 CSV finales: `01_Hanoi`, `02a_Hoi_An`, `02b_Da_Nang`, `02c_Hue`, `03_Cat_Ba`, `04_Ninh_Binh`, `05_Vietnam_Sur`, `06_Camboya_Norte`, `07_Camboya_Sur` — 9 archivos para las 10 capas). No versionados en git (excluidos junto con `02_DESARROLLO/`).

---

## 2026-09-29 (continuación 3) — Auditoría de fotos completada: restaurantes y platos

Segunda mitad de la auditoría pedida por Marcos ("sitio por sitio, comida por comida") — la primera mitad (sitios, commit `942cd7d`) ya estaba hecha; esta cubre los 38 restaurantes/platos del itinerario.

**Resultado (commit `2230a20`):** 23 alias nuevos en `WIKI_ARTICLES`, cada uno verificado dos veces (existe + tiene foto real) contra la API de Wikipedia antes de darlo por bueno. Mismo patrón de bug que en los sitios: varios platos solo tenían alias para su forma "con paréntesis" (`"Khmer BBQ (última noche en Siem Reap)"`) pero el restaurante en `data.js` usa la forma corta (`"Khmer BBQ"`) — no coincidía nunca.

**Dos hallazgos de bugs preexistentes** (no introducidos hoy, llevaban tiempo así):
- `'Cao Lau'` (sin tilde) nunca coincidía con el nombre real en `data.js`, `'Cao Lầu'` (con tilde) — el plato llevaba toda la vida de la app sin foto pese a tener "alias" en el mapa.
- `'Bai_sach_chrouk'` y `'Nom_banh_chok'` (usados en 5 alias distintos, algunos de antes de esta sesión) resultaron ser artículos de Wikipedia **sin imagen** — pasaban la comprobación de "existe" pero no la de "tiene foto". Sustituidos por `'Cambodian_cuisine'` (con foto real) en los 5 sitios.

Verificado visualmente en el navegador: Phnom Penh (Lap Khmer, Amok), Chau Doc→Can Tho (Pescado de agua dulce, Bún Cá Châu Đốc, Fruta y café en Cai Rang, Hủ Tiếu) y Hoi An (Cao Lầu, Mì Quảng) — todos cargan foto real, ninguno en blanco.

**Auditoría de fotos — estado final:** sitios (`942cd7d`) ✅ + restaurantes (`2230a20`) ✅. Entre las dos, ~78 alias nuevos o corregidos en `WIKI_ARTICLES`. Dado el tamaño del mapa (~350 entradas), no se ha comprobado el 100% una por una — se auditaron sistemáticamente todos los sitios/platos de la reescritura de 25 días (los más propensos a tener huecos) y una muestra representativa se verificó visualmente sin fallos. Si Marcos ve alguna foto en blanco o incorrecta navegando la app, es el mejor momento para decirlo — con el itinerario ya estable, deberían ser casos sueltos, no un problema sistémico.

**Archivos:** `js/app.js` (v=117).

---

## 2026-09-29 (continuación 2) — Días de vuelo: ficha del aeropuerto, no de la ciudad

Marcos avisó: en Barcelona (05-nov) y Shenzhen (06-nov, escala) no hay plan de visitar la ciudad, son puramente días de tránsito — la ficha "Sobre `<ciudad>`" no debía hablar de la ciudad.

**Cambio (commit `7155070`):**
- `day.city` del 05-nov: `'Barcelona'` → `'Aeropuerto de Barcelona-El Prat'`
- `day.city` del 06-nov: `'Barcelona → Shenzhen (en vuelo)'` → `'Aeropuerto de Shenzhen (escala)'` — de paso corrige un bug: con el valor anterior, `_cleanCityName()` (que corta por `→`) devolvía "Barcelona" también para este día, así que la ficha del día 6 mostraba la MISMA información que el día 5 y nunca llegaba a mencionar Shenzhen
- `CITY_INFO`: entrada de Barcelona reescrita para hablar solo del aeropuerto (terminales T1/T2, tránsito); nueva entrada para Shenzhen (tránsito sin visado en China, T3 de Bao'an)

Verificado visualmente: ambas fichas cargan foto real y extracto de Wikipedia del aeropuerto correspondiente.

**Archivos:** `js/data.js` (DATA_VERSION 30→31), `js/app.js` (CITY_INFO, v=116), `index.html`.

---

## 2026-09-29 — Puesta al día tras 3 semanas + primera lista de Google Maps cruzada

**Contexto:** primera sesión en el PC del trabajo desde el 8-sep. Mientras tanto, el 28-sep hubo una sesión maratoniana en el PC de casa (itinerario de 25 días reescrito, ficha de ciudad, decenas de fixes) y el 14/24-sep se desplegó un nuevo sistema de "Mejoras" centralizado en varios proyectos. Nada de esto estaba comprometido en el repo git de este PC.

**Cambio 1 — Puesta al día del repo local:** verificada la app en el navegador (funciona bien, sin errores de JS), comprometido todo el trabajo pendiente del PC de casa (commit `cdff33c`) y el propio del trabajo (migración de Mejoras, commit `0f762d2`). `COORDINACION_SESIONES.md` actualizado — se había quedado desfasado, la sesión del 28-sep no lo tocó pese a decir que sí.

**Cambio 2 — Resuelto el "cabo suelto" del sistema de Mejoras:** es una app centralizada en `00_Guía Apps/Sistema_Mejoras/03_APLICACION/` (`Mejoras.vbs`), compartida por varios proyectos de Marcos. `MEJORAS.lnk` y `01_ESPECIFICACIONES/MEJORAS.json` añadidos a `.gitignore` (herramienta personal). Detectado y documentado por qué el `.lnk` no es portable entre los dos PCs: guarda una ruta absoluta (`C:\Users\mpe.HP2008\...`) que no existe en el otro usuario de Windows — cada PC necesita crear su propio acceso directo.

**Cambio 3 — Las 7 listas de Google Maps de Marcos, cruzadas por completo contra el itinerario:**

*Método:* el scroll automatizado del panel de resultados de Google Maps se resistió incluso en el Chrome real de Marcos con su sesión iniciada (probado con `computer scroll`, `find`+`scroll_to`, tecla End, y hasta pidiéndole a Marcos que scrolleara él mismo — se quedaba a medias, ~19-25 de cada lista). Se probaron 5 exportaciones de Google Takeout sin dar con el checkbox correcto ("Save"/"Guardado" tampoco funcionó). **Lo que sí funcionó:** Marcos usó Claude para Chrome (la extensión, con su sesión real) para abrir cada lista y hacer scroll de verdad hasta el final, y pegó el resultado completo. Las 7 listas confirmadas al 100% (189 sitios en total): Hanói 45/45 (Maps decía 46 pero solo hay 45 reales), Vietnam Centro 62/62, Cat Ba 11/11, Ninh Binh 22/22, Vietnam Sur 13/13, Camboya Norte 26/26, Camboya Sur 10/10.

*Resultado del cruce:*
- **Ninh Binh:** ya estaba muy completo. Solo se añadió una mención a la Pagoda Nhat Tru como tip dentro de la tarjeta de Hoa Lu (commit `07ca429`).
- **Camboya Norte:** el bloque de Angkor (3 días) ya cubría 18 de los ~25 sitios reales. Huecos reales, todos opcionales/menores, dejados para que Marcos decida: Museo de las Minas Terrestres, 2 granjas de seda, Butterfly Centre, Wat Damnak (commit `6ceae6a`).
- **Camboya Sur (Phnom Penh):** 100% ya cubierto, sin cambios.
- **Hanói:** prácticamente el 100% ya cubierto, como tarjeta propia o mencionado en tips de otra tarjeta. Sin cambios de código.
- **Vietnam Centro (Hoi An/Da Nang/Hue):** también muy completo, pero se encontraron 2 huecos reales que sí merecían arreglo (commit `6f225b2`):
  1. **Bug de contenido:** la tarjeta "Old Quarter" de Hoi An (19-nov) tenía la descripción de Hanói copiada por error (calles y foto de Hanói, no de Hoi An). Reescrita con contenido real.
  2. **Chùa Cầu (Puente Japonés)** — el símbolo más icónico de Hoi An (sale en el billete de 20.000 VND) — solo se mencionaba de pasada como referencia de otro puente, nunca tenía ficha propia. Añadida.
  3. **"Tumbas imperiales" en Hue estaba completamente vacío** (`notes: ''`) pese a ser de las visitas más importantes de la ciudad. Sustituido por dos tarjetas reales: Tumba de Tu Duc y Tumba de Minh Mang.
  
  Huecos menores dejados sin tocar (opcionales): Santuario de My Son y Ba Na Hills (ya mencionados como opcionales en notas), península de Son Tra.

**Conclusión general:** de las 189 entradas en las 7 listas de Marcos, la inmensa mayoría (>85%) ya estaban reflejadas en el itinerario de una forma u otra. Los pocos huecos reales encontrados eran sobre todo omisiones puntuales (Chùa Cầu, tumbas de Hue) más que contenido nuevo por descubrir — el trabajo previo de research ya era muy sólido.

---

## 2026-09-29 (continuación) — Auditoría de fotos (sitio por sitio) + intento de vincular los mapas

**Contexto:** Marcos vio en capturas que varios sitios y platos no cargan foto, y pidió una auditoría completa: comprobar sitio por sitio y comida por comida que la foto exista y sea la correcta.

**Diagnóstico:** la app resuelve la foto de cada sitio por coincidencia **exacta de texto** entre el `name` de `data.js` y las claves de `WIKI_ARTICLES` (~275 alias a artículos de Wikipedia, en `js/app.js`). Ese mapa se escribió para el itinerario de 23 días antiguo; con la reescritura a 25 días muchos nombres cambiaron aunque fuera un paréntesis, y dejaron de coincidir — la app cae entonces a una búsqueda "a ciegas" del nombre en Wikipedia, que falla para sitios muy específicos (mercados locales, restaurantes, miradores menores).

**Resultado (commit `942cd7d`):** ~55 alias nuevos o corregidos — ver detalle completo en el mensaje del commit. Cobertura añadida: todo el Delta del Mekong (nuevo, sin ningún alias previo), varios de Hanói, Angkor, y Hoi An/Da Nang/Hue, más los sitios de Cat Ba de hoy. Cada artículo se verificó dos veces contra la API real de Wikipedia (que existe, y que tiene foto — no solo texto) antes de darlo por bueno; se encontraron y evitaron varios casos donde el artículo existe pero no tiene imagen (`Châu_Đốc`) o solo tiene un `.gif` que la app no carga (`Minh_Mạng`). También se corrigió un error propio de nombre exacto ("Tumba de Minh Mang" vs. lo que había escrito mal). Verificado visualmente en el navegador tras el fix.

**Pendiente — todavía no completo:** la auditoría se centró en **sitios** ("Qué ver"). Falta revisar los **restaurantes/platos** de la misma forma (Marcos pidió explícitamente "comida por comida" también) y los días que quedan sin comprobar visualmente uno a uno.

**Intento de vincular el mapa de la app con los mapas guardados de Marcos:** el "Mapa" de la app embebe un único Google My Maps (`mid=194Es7Aq...`) que Marcos edita en su cuenta — no coincide con sus 7 listas guardadas ("de todos modos los mapas de la app no coinciden con mis mapas"). Se generaron 7 CSV (`02_DESARROLLO/csv_mymaps/`, con columna `Location` con pistas de geocodificación) a partir del texto completo de las 7 listas, listos para importarlos como capas nuevas en ese mismo My Maps vía Claude para Chrome (con la sesión real de Marcos, sin pedirle ninguna contraseña). La importación en sí se interrumpió por un fallo transitorio de la plataforma (el clasificador de seguridad dejó de responder durante varios minutos, afectando a todas las herramientas que escriben) — **sigue pendiente**, los CSV ya están listos.

**Archivos:** `js/app.js` (WIKI_ARTICLES, v=115), `02_DESARROLLO/csv_mymaps/*.csv` (nuevo, 7 archivos, ignorados por git — son un intermedio de trabajo).

**Incidencia técnica confirmada:** el panel de resultados de una lista de Google Maps ("Mis mapas") no carga los últimos elementos con scroll normal ni con `find`+`scroll_to` repetido — se quedó en 19 de 22 sitios pese a varios intentos (rueda del ratón, scroll_to sobre el último elemento visible, tecla End). No se encontró la forma de forzar la carga completa esta vez; para las próximas 3 listas (mucho más grandes) puede hacer falta otra estrategia — quizá pedirle a Marcos que exporte la lista, o aceptar la cobertura parcial como aquí.

**Decisión de ritmo respetada:** no se ha hecho `git push` — sigue vigente la decisión de Marcos del 28-sep de esperar ~1 semana antes de publicar.

**Archivos modificados:** `js/data.js` (DATA_VERSION 28→29, tip de Nhat Tru Pagoda), `index.html` (?v=29), `.gitignore`, `01_ESPECIFICACIONES/CONTINUIDAD.md`, `01_ESPECIFICACIONES/COORDINACION_SESIONES.md`.

---

## 2026-09-28 (continuación 3) — Contenido del documento .odt de María (pareja de Marcos)

**Contexto:** Marcos pasó `C:\Users\marco\Downloads\itinerario final V&C.odt`, un documento de investigación muy detallado escrito por su pareja (no es la versión definitiva, seguirá creciendo). Se extrajo el texto (ODT es un zip con `content.xml`) — 1410 líneas, ~158.000 caracteres. Cubre, con un nivel de detalle mucho mayor que cualquier fuente anterior: Hanói (día 1-3), Siem Reap (día 1-3), Phnom Penh (día 1-2), y se queda a medias en Chau Doc/Can Tho/Hoi An/Da Nang (pendiente, la propia María sigue escribiéndolo).

**Cambio:** Reescritas `description`/`tips` de 43 sitios con la información de este documento (mucho más rica y específica que la fuente anterior): las 19 de Hanói días 2-3, las 15 de Siem Reap (incluye Phare Circus, antes solo en el resumen del día), y las 9 de Phnom Penh.

**Hallazgo importante — conflicto de fechas con el Festival del Agua:** el documento de María menciona el Bon Om Touk (Festival del Agua de Camboya), el evento más grande del año en el país (regatas de barcos dragón, desfile lumínico, fuegos artificiales), que cae el **25 de noviembre** en Phnom Penh. Con el itinerario actual, ese día estaréis en Tam Coc/Ninh Binh — os lo perderíais por completo. Añadido como aviso (⚠️) en las notas del día 15-nov (Phnom Penh) para que Marcos lo vea. No se ha tocado la estructura de fechas — es una decisión suya si le importa lo suficiente como para reordenar el viaje.

**Pendiente para próximas sesiones:** procesar el resto del documento (Chau Doc, Can Tho, Hoi An, Da Nang — llega hasta el 21-nov) en cuanto María lo continúe, y luego seguir con las 4 listas grandes de Google Maps que quedaban pendientes (Vietnam Centro, Hanoi, Camboya Norte, Ninh Binh).

**Archivos modificados:** `js/data.js` (DATA_VERSION 27→28).

## 2026-09-28 (continuación 2) — Más platos, integración de Maps y overflow de divisas

**Cambio 1 — "Dónde comer" con varios platos por día:** a petición de Marcos ("si hay varios importantes meter varios"), los 20 días con comida ya rellenada pasan de 1 a 2 platos representativos (p.ej. Hanói: Phở + Bia Hơi un día, Bún Chả + Cà Phê Trứng otro).

**Cambio 2 — Primera pasada de integración con las listas de Google Maps de Marcos:** revisadas por completo las listas "Vietnam Norte - Cat Ba" (11 sitios) y "Vietnam Sur" (13 sitios, Chau Doc/Can Tho) contra el itinerario:
- Cat Ba: añadido "Ba Trai Dao" (isla), único sitio real que faltaba.
- Phnom Penh: ya estaba completo, sin cambios.
- Can Tho: el día 17 solo mencionaba Can Tho en una nota de texto suelta sin sitios propios — convertidos a tarjetas reales (Bến Ninh Kieu, Ninh Kieu Footbridge, Chùa Ông, Nhà cổ Bình Thủy, Thiền viện Trúc Lâm Phương Nam).
- **Pendiente:** las 4 listas grandes (Vietnam Centro 62, Vietnam Norte-Hanoi 46, Camboya Norte 26, Vietnam Norte-Ninh Binh 22) todavía no se han cruzado contra el itinerario — quedan para próximas sesiones.

**Cambio 3 — Bug real: tarjeta de divisas desbordaba (confirmado, no era caché):** medido en el propio DOM — las 3 pastillas VND/KHR/USD necesitaban 371px y solo había 307px disponibles (64px de desbordamiento real). Reducidos padding/gap/tamaño de icono en `.fx-tab` y `.currency-tabs`; confirmado con medición que ya no desborda (307px = 307px).

**Cambio 4 — Variable `--card` nunca se adaptaba al tema oscuro:** usada en 9 sitios (`.currency-card`, `.stat-card` y otras 7 tarjetas) pero solo definida una vez en `:root` (`#ffffff`), nunca dentro de `html[data-theme="dark"]` — esas 9 tarjetas se quedaban blancas siempre, con el mismo problema de fondo que ya se había corregido en otros componentes. Añadida `--card` a los bloques de tema oscuro (`#1a2535`) y claro (`#ffffff`, explícito) igual que ya tienen `--bg`/`--surface`.

**Archivos modificados:** `js/data.js` (v27, más platos y sitios de Can Tho), `css/styles.css` (v66→67: fix overflow divisas, variable `--card` por tema).

## 2026-09-28 (continuación) — Contenido, contraste y ficha "Sobre la ciudad"

**Contexto:** misma sesión que la reescritura del itinerario (ver entrada anterior). Marcos fue probando la app en vivo y reportando problemas según los veía; esta entrada agrupa todo lo que salió de esas pruebas.

**Cambio 1 — Tasas de cambio actualizadas:** `FX_RATES` en `js/app.js` estaba con tasas de hace tiempo. Consultadas tasas actuales (28-sep-2026) por WebSearch: VND 27.000→29.600/€, KHR 4.400→4.630/€, USD 1,08→1,14/€.

**Cambio 2 — "Lo que nos espera" (Home) desactualizado:** era un array hardcodeado en `app.js` (`const highlights = [...]`, no viene de `data.js`) con hitos de la ruta ANTIGUA (Koh Rong, fechas de un itinerario que ya no existe). Reescrito con 7 hitos del itinerario nuevo con sus fechas reales.

**Cambio 3 — Bug real: "países visitados" contaba 7 en vez de 4:** `buildTripStatsHTML()` contaba `[...new Set(trip.days.map(d => d.country))]` sobre el string CRUDO (con emoji y flechas), así que cada día de cruce de frontera ("🇪🇸 España → 🇨🇳 China", "🇰🇭 Camboya → 🇻🇳 Vietnam"...) contaba como un "país" nuevo. Añadida una función `primaryCountry()` que se queda solo con el primer país real del texto — mismo criterio que ya usaba (correctamente) el contador de la portada. Detectado porque Marcos vio "7" y sabía que debían ser 4 (España/China/Vietnam/Camboya).

**Cambio 4 — Contraste de texto ilegible en tema oscuro (bug sistémico):** más de 15 componentes (`.highlight-pill`, `.tr-inline`, `.htl-inline`, `.qa-btn`, `.doc-item2`, `.notes-tab`, `.docs-hint`, `.lugar-tips`, `.day-row`, etc.) tenían `background: white` o un hex claro **hardcodeado**, mientras el texto usaba variables de tema (`var(--text)`) que en oscuro son casi blancas → texto casi invisible sobre fondo casi blanco. Corregido cambiando los fondos base a `var(--surface)` donde no había ya una regla de tema, y añadiendo overrides a `html[data-theme="dark"]` donde el color base debía conservar un matiz (azul/ámbar/morado) en vez de ir neutro. **Lección para el futuro: nunca hardcodear un `background` claro sin comprobar cómo queda combinado con `var(--text...)` en tema oscuro.**

**Cambio 5 — Mini-mapa quitado de la tarjeta de tiempo:** Marcos no quería el mapa de Leaflet embebido en la tarjeta de clima de la portada ("antes estaba mejor"). Eliminados `.wc-map`, `initWeatherMap()` y su llamada; la tarjeta ahora es solo texto, a todo el ancho.

**Cambio 6 — Tarjeta blanca inconsistente en el detalle del día:** `.dsc-transport-card` (la tarjeta "🚆 Transporte" dentro de Resumen) no tenía override de tema oscuro y quedaba blanca rodeando contenido ya oscuro — "llama mucho la atención y no se integra". Añadido `html[data-theme="dark"] .dsc-transport-card { background: var(--surface); }`.

**Cambio 7 — Nueva ficha "Sobre `<ciudad>`" (petición de Marcos):** debajo de "Qué ver" en el resumen de cada día, tarjeta desplegable (colapsada por defecto, toca para abrir) con: 1) historia/contexto general — resumen en español sacado en vivo de Wikipedia (`es.wikipedia.org/api/rest_v1/page/summary/...`), con foto; 2) Curiosidades y 3) Platos típicos — contenido escrito a mano por ciudad (`CITY_INFO` en `app.js`, 11 ciudades: Barcelona, Hanói, Siem Reap, Phnom Penh, Chau Doc, Can Tho, Hoi An, Da Nang, Hue, Tam Coc, Cat Ba), pensado para su estilo de viaje (auténtico, no masificado).

**Cambio 8 — Apartado "Dónde comer" relleno:** estaba vacío casi todos los días (`restaurants: []`). Añadido 1 plato representativo por día (20 de 25 días) usando nombres ya verificados contra Wikipedia cuando existían.

**Cambio 9 — Reutilización de contenido verificado del itinerario anterior:** 65 de los 109 sitios del itinerario nuevo ya existían (con otro nombre a veces) en el itinerario antiguo, con `description`/`tips` escritos a mano y ya probados. En vez de reescribirlos desde cero, se extrajeron del commit `75ce58c` (antes de la reescritura) por nombre exacto y por coincidencia aproximada, y se fusionaron en los sitios nuevos — con sus correspondientes alias en `WIKI_ARTICLES` para que la foto siga resolviendo bien. Quedan ~44 sitios nuevos (Delta del Mekong sobre todo) sin `description`/`tips` largos todavía — usan el resumen breve (`notes`) y la búsqueda en vivo de Wikipedia como ya hacía la app antes.

**Cambio 10 — Bug propio: `_wikiCache`/`_citySummaryCache` sin declarar:** al insertar `CITY_INFO`, el `old_string` del edit se comió por error las dos líneas `const _wikiCache = {}; const _citySummaryCache = {};` sin volver a añadirlas — rompía la carga de TODAS las fotos de sitios (no solo las nuevas) con un `ReferenceError` silencioso. Detectado revisando la consola al verificar la ficha nueva, no porque Marcos lo reportara. Corregido.

**Cambio 11 — Aviso de proceso: `css/styles.css` nunca se versionó en toda la sesión.** Se hicieron ~10 cambios de CSS sin subir el `?v=N` de `index.html` (se quedó en 64 toda la sesión) — el navegador de pruebas servía una versión cacheada vieja de la hoja de estilos, lo que hizo parecer que algunos arreglos "no funcionaban" hasta que se subió a `?v=65` y se comprobó nuevamente. **Regla para el futuro: subir el `?v=N` de `styles.css` en el mismo momento en que se edita el CSS, no solo el de los `.js`.**

**Sobre las imágenes (debate con Marcos en esta sesión):** propuso descargar fotos directamente de Google Maps. Se explicó por qué no — son fotos de usuarios con licencia solo para Google, redistribuirlas sería reutilizar contenido con copyright ajeno sin permiso, independientemente de que el uso sea personal. En su lugar, la vía ya usada por la app (Wikipedia/Wikimedia Commons, licencia libre) es la correcta, y el Cambio 9 de arriba recupera automáticamente muchas fotos ya verificadas por ese camino.

**Archivos modificados:** `js/app.js` (v=103→112: FX_RATES, highlights, bug países, fixes de contraste CSS-adyacentes, mini-mapa quitado, CITY_INFO + ficha desplegable, restaurantes, alias WIKI_ARTICLES, fix `_wikiCache`), `css/styles.css` (v=64→65: fondos claros hardcodeados → `var(--surface)` / overrides oscuro, estilos nuevos de la ficha de ciudad), `js/data.js` (v25→26: 65 sitios con contenido verificado fusionado, restaurantes rellenados).

---

## 2026-09-28 — Itinerario definitivo (25 días) reescrito en data.js

**Cambio:** Marcos pegó el itinerario "casi definitivo" del viaje (vuelos, alojamientos y sitios día a día) y pidió actualizar la app. Se acordó con él un enfoque en dos fases: primero la "columna vertebral" (fechas, ciudades, vuelos, alojamientos, lista de sitios por día con notas breves — sin descripción/tips largos todavía), dejando el contenido rico para próximas sesiones a medida que revise más sitios en Google Maps.

**Motivo:** El itinerario cambió sustancialmente desde la última vez que se tocó la app (ruta completamente distinta desde el día 14: ahora cruza el Mekong en ferry a Chau Doc y Can Tho en vez de ir a Koh Rong; además se añaden 2 días previos de vuelos España→Barcelona→Shenzhen).

**Resultado:**
- `trip.startDate` cambiado de `2026-11-07` a `2026-11-05` (se decidió con Marcos incluir los 2 días de vuelos como parte del viaje en la app) → el viaje pasa de 23 a **25 días**. Subtítulo actualizado.
- El array `days` completo (antes 23 entradas) reescrito de cero con las 25 fechas, ciudades, bloques, vuelos/buses/ferry/tren (con localizador y equipaje de cada tramo), alojamientos y listas de sitios a visitar, siguiendo el itinerario que pegó Marcos. Cada sitio nuevo tiene `name`/`type`/`notes` pero de momento sin `description`/`tips`/`photo` largos (la UI ya tiene fallback para eso — ver hallazgo debajo).
- **Bug encontrado y arreglado (efecto secundario de la reescritura):** el reloj de doble huso horario de la portada mostraba "Barcelona" con la hora de Vietnam (UTC+7), porque `tickDualClock()` en `app.js` cogía el primer día futuro sin distinguir si es un día de vuelo. Arreglado añadiendo bloque `'Vuelos'` a los 2 días de España y haciendo que la función lo salte al buscar la "ciudad destino" (`js/app.js` ~línea 1160).
- **Bug encontrado y arreglado (pre-existente, no introducido hoy):** varias tablas de estilos/etiquetas por `block` en `app.js` (`BLOCK_ZONE`, `ZONE_COLORS`, `ZONE_LABELS`, `HTL_ZONE_COLORS`, `BLOCK_ZONE_COLORS`) tenían claves que **nunca coincidían** con los valores reales de `block` usados en `data.js` (ej. `'Camboya'`/`'Islas'`/`'Cierre'` en las tablas vs. `'Angkor'`/`'Koh Rong'`/`'Phnom Penh'` en los datos) — esto ya hacía que la pestaña "Alojamiento" mostrara la etiqueta genérica "General" para esos bloques, probablemente desde siempre. Añadidas las claves que faltaban (`Angkor`, `Phnom Penh`) a todas esas tablas, más las de los bloques nuevos de hoy (`Vuelos`, `Delta del Mekong`, `Ninh Binh`, `Vuelta al Norte`).
- El bloque `'El Norte'` se usa dos veces en el itinerario nuevo, sin ser contiguo (Hanói días 3-5 y Cat Ba días 22-24 de la app) — esto colapsaba ambos tramos en una sola sección con `[...new Set(...)]`. Se le dio al segundo tramo (Cat Ba) el nombre de bloque distinto `'Vuelta al Norte'` para evitar el bug de agrupación, con su propia entrada de estilo/color (mismo verde-azulado que "El Norte", para mantener la coherencia visual).
- Se creó `.claude/launch.json` en esta carpeta (no existía — otro efecto de que `.claude/` tampoco se sincroniza por MEGA, ver Parte 19 de `MEMORIA_MAESTRA.md`) para poder arrancar el servidor local de pruebas.
- Verificado en el navegador (servidor local): las 25 fechas, el reloj de doble huso, la pestaña "Días"/"Transportes"/"Alojamiento" y el detalle de un día con sitios sin descripción larga (fallback a "Sin información adicional." funcionando). Sin errores de JS en consola — solo 404 esperados de imágenes locales que aún no existen para los sitios nuevos (se resuelven solas vía Wikipedia en producción).
- **Recopilados pero NO volcados todavía en la app:** Marcos compartió 7 listas de Google Maps con ~190 sitios guardados, organizadas por región y ya alineadas con los bloques del itinerario (ver tabla en `MEMORIA_MAESTRA.md`, Parte 20). Quedan como pool de candidatos para ir decidiendo día a día en próximas sesiones.

**Archivos modificados:** `js/data.js` (reescritura completa de `days`, `startDate`, subtítulo, `DATA_VERSION` 22→24), `js/app.js` (fix reloj + tablas de bloques, v=103→106), `index.html` (versiones), `.claude/launch.json` (nuevo).

---

## 2026-09-08 — Descubierto: dos repos git locales independientes (trabajo + casa) + reconciliación

**Contexto:** esta sesión (PC del trabajo, `C:\Users\mpe.HP2008\...`) investigó por su cuenta, en paralelo y sin saberlo, el mismo problema que la sesión del PC de casa había resuelto poco antes (ver entrada anterior, "Repo git inicializado en local"). Cada sesión llegó a una solución distinta:
- **Esta sesión (trabajo):** clonó el remoto público de GitHub a una carpeta aparte, copió su `.git` (conservando los 3 commits reales) a la carpeta del proyecto, y comprometió encima la reorganización de carpetas + documentación + fixes de mapa/fotos → commit `e67e14c`, descendiente real del remoto `c8d9eb5`.
- **La sesión de casa (antes):** hizo `git init -b main` desde cero → commit `75ce58c`, sin relación con el historial remoto.

**Causa raíz de que esto pasara dos veces:** `.megaignore` en la raíz de MEGA excluye `.git` (y `.claude/`) de la sincronización entre los dos PCs (regla `-:.*`). El resto de archivos sí se sincroniza — de hecho, mientras esta sesión trabajaba, los cambios de documentación de la sesión de casa fueron llegando vía MEGA y se mezclaron sin querer con el commit `e67e14c` (git añadió lo que hubiera en disco en el momento del `git add -A`). Se revisó y corrigió esa mezcla a mano en `MEMORIA_MAESTRA.md`, `CONTINUIDAD.md` y `CLAUDE.md` para que no quedaran referencias cruzadas incoherentes (rutas del otro PC, número de commit del otro repo, etc.).

**Decisión tomada:** mantener el commit `e67e14c` de esta sesión como el que se sube primero (no necesita `--force`), y que el PC de casa resetee su repo contra `origin/main` después del push, en vez de intentar fusionar los dos historiales. Pendiente de que Marcos lo confirme y ejecute (ambos bloqueados por el token de GitHub sin regenerar).

**Otros cambios de esta sesión:**
- Quitado el token de GitHub en texto plano de `CLAUDE.md` (seguía ahí pese a estar marcado como "pendiente quitar" por la sesión de casa)
- Documentada la causa raíz del `.megaignore` de forma permanente en la Parte 19 de `MEMORIA_MAESTRA.md`, explicando que es una característica estructural del setup (no un bug a arreglar una vez) — cualquier sesión futura en cualquiera de los dos PCs debe tenerlo en cuenta
- Guardada esta convención en la memoria persistente de Claude Code (fuera del repo) para que futuras sesiones en el PC del trabajo comprueben cambios del otro PC al empezar, sin que Marcos tenga que pedirlo

---

## 2026-09-07 (continuación) — Repo git inicializado en local + convenciones de sesión

**Cambio 1 — `git init` + primer commit local:** Se confirmó por diff directo contra los raw files de GitHub (`index.html`, `js/data.js`, `js/app.js`) que el remoto (`https://github.com/MarcosPenas/viajes-marcos-mery`, commit `c8d9eb5`) estaba desactualizado respecto al local — no tenía los fixes de mapa/fotos de este mismo día. Se hizo `git init -b main` en la carpeta local (no existía `.git`, ver hallazgo más abajo) y un commit inicial con los 227 archivos activos del código y la documentación.

**Motivo:** Resolver la Parte 19 de `MEMORIA_MAESTRA.md` (repo git ausente) sin arriesgar perder historial — había que comprobar primero si el remoto iba por delante.

**Resultado:** Repo git local con un commit (`75ce58c`), rama `main`, sin `origin` configurado todavía. **Pendiente:** regenerar el token de GitHub (el anterior, `ghp_oyTnVy...`, sigue expuesto en texto plano en `CLAUDE.md` — hay que quitarlo de ahí antes de hacer push) y luego `git remote add origin` + `git push -u origin main --force` (hace falta `--force` o `--allow-unrelated-histories` porque el historial local es nuevo y no desciende del commit remoto).

**Archivos creados:** `.gitignore` (excluye `02_DESARROLLO/`, `*.py`, `sw_files.json`)

---

**Cambio 2 — Permisos del proyecto para reducir prompts:** Se creó `.claude/settings.json` (no existía) con un allowlist de comandos de solo lectura usados con frecuencia en las sesiones recientes de Marcos (en todos sus proyectos): `dotnet build`/`dotnet test`, `tasklist`, y varias herramientas MCP de solo lectura del navegador (`navigate`, `preview_start`, `get_page_text`, `tabs_context`) y de la sesión (`mark_chapter`). Se excluyeron deliberadamente intérpretes (`python`, `py`, `powershell`) y comandos destructivos (`rm`, `mkdir`, `taskkill`) por riesgo de ejecución arbitraria o de borrado.

**Motivo:** Petición explícita de Marcos de reducir interrupciones por permisos.

---

**Cambio 3 — Archivo `Mejoras.txt` creado:** Nuevo archivo en la raíz del proyecto con dos secciones, `PENDIENTES` y `HECHAS`, siguiendo el mismo formato que ya usa en otros proyectos (Monitor, Gestor de Descargas): al aplicar una mejora se mueve de `PENDIENTES` a `HECHAS` con `[COMPLETADO <fecha>]` (o `[DESCARTADO <fecha>]`) y una línea `->` explicando qué se hizo. Marcos borra las entradas de `HECHAS` manualmente cuando quiere.

---

**Convención de sesión adoptada (7-sep-2026):** A partir de ahora, cada cambio que se haga en este proyecto debe quedar documentado de inmediato en `HISTORIAL_DE_CAMBIOS.md` (esta entrada) y en `CONTINUIDAD.md` (estado y tareas pendientes) — no esperar al final de la sesión.

---

## 2026-09-07 — Fix Mapa (Leaflet) + fotos de cabecera + detección de repo git ausente

**Cambio 1 — Mapa en blanco:** El atributo `integrity` del `<script>` de Leaflet en `index.html` tenía un hash SHA-256 corrupto (`sha256-...NV/XN/WLs=` en vez de `sha256-...NV1lvTlZBo=`). Cualquier navegador con Subresource Integrity (todos los modernos) bloqueaba el script, dejando la vista "Mapa" completamente en blanco.

**Motivo:** Error de transcripción del hash en algún momento anterior (no hay registro de cuándo se introdujo). No se detectó porque la Memoria Maestra lo daba por "✅ VALIDADO" sin volver a probarlo.

**Resultado:** Hash corregido a `sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=`, verificado contra la cabecera `content-digest` que devuelve el propio CDN (`curl -sI https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`). No se pudo verificar en vivo dentro del navegador de pruebas de esta sesión (parece interceptar/reescribir el tráfico a CDNs externos) — pendiente de confirmar en un navegador real o en producción.

**Archivos modificados:** `index.html`

---

**Cambio 2 — Fotos de cabecera rotas:** 11 rutas a la carpeta `assets/images/places/` (eliminada en la reorganización del 2-sep-2026, las imágenes viven ahora en `img/places/`) seguían usándose en `CITY_PHOTOS` (objeto de `app.js`, cabecera de cada día para 10 ciudades) y en `coverImage` (portada del viaje, en `data.js`). Todas devolvían 404 y el fondo caía al color liso de respaldo.

**Motivo:** Rutas no actualizadas cuando se movieron las imágenes en la reorganización de carpetas.

**Resultado:** Las 11 rutas sustituidas por sus equivalentes en `img/places/`. Verificado visualmente: portada del viaje (Lan Ha Bay), Día 1 (Hanói) y Día 3 (Cat Ba) muestran su foto correctamente.

**Archivos modificados:** `js/app.js` (CITY_PHOTOS), `js/data.js` (coverImage)

---

**Hallazgo adicional — `DATA_VERSION`:** Al probar el fix de `coverImage`, se descubrió que `js/data.js` tiene una constante interna `DATA_VERSION` que controla si el navegador recarga `DEFAULT_DATA` o sigue usando lo guardado en `localStorage`. Sin subirla, el fix no llega a quien ya haya abierto la app antes (aunque se suba el `?v=N` de index.html). Se subió de 21 a 22. **Nueva regla para el futuro:** cualquier cambio en `DEFAULT_DATA` requiere subir tanto `?v=N` como `DATA_VERSION`.

**Versiones subidas en `index.html`:** `js/app.js` v=102→103, `js/data.js` v=21→22

---

**Hallazgo adicional — repo git ausente:** Se comprobó que la carpeta local `App Viajes Marcos Mery` no tiene `.git` inicializado (`git status` → "not a git repository"), pese a que la documentación asumía que solo faltaba hacer commit+push. Pendiente investigar si se perdió al mover el proyecto a MEGA (2-sep-2026) o si nunca se inicializó en esta ruta. Ver Parte 19 de `MEMORIA_MAESTRA.md`.

---

**Hallazgo adicional — datos personales:** Se revisó `js/data.js` buscando la clave `EMERGENCY_DATA` mencionada en `CLAUDE.md` — no existe con ese nombre; la clave real es `localEmergency` y solo contiene teléfonos públicos de policía/ambulancia/bomberos de Vietnam y Camboya, más los datos de la embajada de España. No hay pasaportes ni números de seguro médico. Tarea "revisar datos personales" dada por completada.

---

## 2026-09-02 — Reorganización de carpetas

**Cambio:** Reestructuración completa de la carpeta del proyecto según guía de organización de aplicaciones.

**Motivo:** Preparar el proyecto para continuidad en otra cuenta de Claude Code o con otra IA.

**Resultado:**
- `ESPECIFICACIONES/` → renombrada a `01_ESPECIFICACIONES/`
- `_ARCHIVO/` → movida a `02_DESARROLLO/SCRIPTS_OBSOLETOS/`
- `_HERRAMIENTAS/` → movida a `02_DESARROLLO/HERRAMIENTAS_AUDITORIA/`
- `Capturas/` → movida a `02_DESARROLLO/CAPTURAS_Y_RECURSOS_GRAFICOS/`
- `assets/images/places/` → movida a `02_DESARROLLO/IMAGENES_ANTERIORES/`
- Creadas: `00_INSTALACION/`, `02_DESARROLLO/`, `CLAUDE.md`
- Eliminado: `sw_files.json` (archivo temporal)
- Creados: `LEEME_INSTALACION.md`, `CONTINUIDAD.md`, `HISTORIAL_DE_CAMBIOS.md`

**Nota:** El código activo de la app (index.html, css/, js/, img/, sw.js, manifest.json) se mantiene en la raíz del repo — es obligatorio para GitHub Pages.

---

## 2026-07-17 — Generación de Memoria Maestra

**Cambio:** Creación del documento `MEMORIA_MAESTRA.md` con 32 partes + anexos.

**Motivo:** Documentar el proyecto completo para permitir su continuidad en otra cuenta.

**Resultado:** Documento generado en `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md`.

---

## 2026-07-17 — Movimiento del proyecto a nueva ruta

**Cambio:** El proyecto fue movido de `C:\Users\mpe.HP2008\Documents\viajes-marcos-mery` a `C:\Users\mpe.HP2008\Documents\MEGA\08_Scripts\App Viajes Marcos Mery`.

**Motivo:** El usuario quiso organizar el proyecto dentro de su carpeta MEGA/Scripts.

**Resultado:** Todo funcionando. `.claude/launch.json` actualizado con la nueva ruta.

---

## 2026-07-17 — Nuevo icono de la app

**Cambio:** Generación y despliegue de icono personalizado para la PWA.

**Motivo:** El icono genérico no identificaba el viaje. Se generó con IA (ChatGPT/imagen generativa) un icono con mapa Vietnam & Camboya, Angkor Wat, barca junk, palmeras y los nombres "Marcos & Mery".

**Archivos modificados:** `img/icon-192.png`, `img/icon-512.png`, `manifest.json`

**Resultado:** Icono visible en Android al instalar la PWA.

**Fuente de la imagen original:** `02_DESARROLLO/CAPTURAS_Y_RECURSOS_GRAFICOS/ChatGPT Image 29 jun 2026, 11_48_09.png`

---

## 2026-07-xx — Auditoría completa de imágenes (4 pases)

**Cambio:** Descarga, deduplicación y verificación de ~200 imágenes para `img/places/`.

**Motivo:** Las imágenes de Wikipedia en tiempo real son lentas y pueden ser incorrectas. Se descargaron versiones locales para que la app funcione offline.

**Resultado:** ~200 imágenes en `img/places/`, cacheadas en el Service Worker. Quedaron 4 duplicados inofensivos por diseño (dos nombres distintos apuntando a la misma imagen).

**Herramientas usadas:** Scripts Python en `02_DESARROLLO/HERRAMIENTAS_AUDITORIA/` (ya no necesarios para el funcionamiento de la app).

---

## 2026-07-xx — Fix Service Worker (viajes-v1 → viajes-v2)

**Cambio:** Regeneración de `sw.js` con prefijo `/viajes-marcos-mery/` en todos los paths.

**Motivo:** El SW anterior usaba paths desde la raíz (`/index.html`) lo que causaba 404 al usar la app offline, porque GitHub Pages sirve desde `/viajes-marcos-mery/` no desde `/`.

**Resultado:** App funciona offline correctamente.

---

## 2026-07-xx — Fix bottom nav (position:absolute → position:fixed)

**Cambio:** Corrección de CSS en `.bottom-nav`.

**Motivo:** Con `position: absolute` la barra de navegación inferior desaparecía en móvil cuando el contenido era más largo que la pantalla.

**Resultado:** Navegación siempre visible en móvil.

---

## 2026-07-xx — Fix modo claro (textos azules)

**Cambio:** Añadidos overrides CSS `html[data-theme="light"] .elemento { color: #1a202c; }`.

**Motivo:** Muchos elementos usaban `var(--primary)` como color de texto, que es azul marino en modo oscuro y quedaba azul también en modo claro.

**Resultado:** Textos correctamente oscuros en modo claro.
