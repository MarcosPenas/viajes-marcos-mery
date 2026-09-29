# Historial de cambios — App Viajes Marcos & Mery

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
