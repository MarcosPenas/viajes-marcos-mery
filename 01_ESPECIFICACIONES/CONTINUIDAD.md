# Continuidad — App Viajes Marcos & Mery

**Actualizado:** 1 de octubre de 2026 (PC del trabajo)
**Sesión:** Claude Sonnet 5 (Claude Code)

---

## 👉 LEE ESTO PRIMERO (vigente — lo de abajo del 29-sep ya está superado, se deja como historial)

**1. El mapa de la app YA NO depende de Google My Maps — está descartado por completo.** El documento "Vietnam" de My Maps nunca fue el mapa real de Marcos (lo creó una sesión anterior como contenedor para importar CSVs) y la mayoría de sus puntos nunca se geolocalizaron bien al importar. Ahora la pestaña "Mapa" es un **mapa Leaflet propio** con coordenadas reales (125/128 sitios geolocalizados vía Photon/OSM), pines por categoría, favorito/visitado persistente, y un botón "Cerca de mí" con **seguimiento en vivo** (punto azul que se mueve, no una foto fija). Si ves cualquier mención a "My Maps" o "iframe" en código o en bloques de más abajo de este archivo, está obsoleto — no tocar esa dirección, ver `HISTORIAL_DE_CAMBIOS.md` del 30-sep en adelante para el detalle.

**2. Auditoría formal de imágenes COMPLETADA el 1-oct — las 102 `CHECK_MANUALLY` ya no existen, todas revisadas.** Resumen de todo el día (ver `HISTORIAL_DE_CAMBIOS.md`, entradas del 1-oct, para el detalle completo de las 3 continuaciones):
- Catalogadas las 167 fichas (128 lugares + 39 restaurantes) y clasificadas por estado.
- **Encontradas y corregidas 20 fotos realmente incorrectas** con foto nueva verificada a ojo (descargada y mirada a resolución completa antes de aplicar) — algunas muy llamativas: Marble Mountains mostraba una montaña volcánica negra, Pagoda Bich Dong mostraba una foto histórica de personas, Aldea de cerámica de Thanh Ha seguía mostrando las ruinas de My Son por un alias mal puesto.
- **5 sitios sin ninguna foto real disponible en Commons** se quedaron sin foto a propósito (mejor que una equivocada): Murales de Phùng Hưng, Mercado Ruso, Talleres Artesanales, Phare Circus, West Baray.
- **Método clave para revisar 102 imágenes sin que costara una eternidad:** en vez de navegar una por una, un script monta "hojas de contacto" (collages de 12 miniaturas con nombre y fecha) para comparar muchas imágenes reales de un vistazo — mucho más rápido que 102 idas y vueltas al navegador, y mucho más fiable que confiar en el nombre del alias.
- **Estado final:** `OK_VERIFIED` 33 (resolución completa) + `OK_VERIFIED_THUMB` 87 (vistas en miniatura vía hoja de contacto — buena confianza, no tan exhaustivo como resolución completa individual) + `GENERIC_IMAGE` 20 + `DUPLICATE` 17 + `PENDING_IMAGE` 10 = 167.

**Siguiente paso de la auditoría (opcional, baja prioridad):** si Marcos navegando la app ve algo raro en un sitio marcado `OK_VERIFIED_THUMB`, decir cuál para mirarlo a resolución completa — ese sigue siendo el método que mejor ha funcionado todo este tiempo. Los `GENERIC_IMAGE`/`DUPLICATE`/`PENDING_IMAGE` restantes son conocidos y de bajo impacto (ver `AUDITORIA_IMAGENES_CLASIFICADA.json`).

### Plan de corrección paso a paso para la próxima sesión (no empezar sin que Marcos lo pida)

**Cómo leer `AUDITORIA_IMAGENES_CLASIFICADA.json`:** array de 167 objetos, cada uno con `id` (`fecha|nombre`, clave única), `name`, `city`, `date`, `category` (`place`/`restaurant`), `current_image` (URL que carga hoy), `original_url`, `source` (de qué viene: `direct-photo`/`image-map`/`local-file`/`wiki-live`), `shared_with` (otros IDs con la misma imagen exacta), `status` (uno de los 6 estados) y `reason` (motivo en texto).

**[Actualizado 1-oct tarde: los conteos de esta sección (27/19/148) son los de ANTES de la primera tanda de correcciones — ver el nuevo conteo arriba en "LEE ESTO PRIMERO" (23/20/17/5/102). El resto del plan sigue vigente igual.]**

**Dato clave para priorizar el esfuerzo (conteo original, ya desactualizado):** de los 148 casos problemáticos, solo había **122 imágenes distintas** — y de ellas, las 102 `CHECK_MANUALLY` son 102 imágenes distintas (ninguna se repite entre sí, hay que mirarlas todas una por una sin atajos), mientras que las 27 `GENERIC_IMAGE` + 19 `DUPLICATE` solo representan ~20 imágenes distintas en total (muchas comparten la misma foto genérica) — **empezar por aquí es más rápido y de mayor impacto**.

**Orden recomendado:**
1. **`GENERIC_IMAGE` (27, ~12 fotos distintas a buscar):** cada grupo necesita una foto específica por sitio. Los grupos más grandes y con más impacto visual: los 5 mercados/actividades de Hội An compartiendo la foto de la ciudad, los 4 sitios de Cat Ba compartiendo la foto de Lan Ha Bay, los 3 platos compartiendo "Vietnamese_cuisine" genérico. Método que ya funcionó hoy y en sesiones anteriores: buscar en Wikimedia Commons (`commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=...`) un nombre específico del sitio, **descargar y mirar la foto antes de aplicarla** (con el tool `Read` sobre el archivo descargado — NUNCA dar por buena una foto solo por el nombre del archivo), y meterla como `photo:` directo en `data.js` (eso la hace "verified" automáticamente, prioridad máxima, nunca se recalcula).
2. **`DUPLICATE` (19, pocas fotos distintas):** revisar si son el mismo sitio real (ej. "Bến Ninh Kiều" y "Ninh Kieu Footbridge" — mismo lugar, compartir está bien) o sitios distintos forzados a compartir — solo estos últimos necesitan foto nueva.
3. **`CHECK_MANUALLY` (102, una foto por una, sin atajos):** para cada una, descargar la imagen actual (`current_image` del JSON) y mirarla con `Read` comparándola contra lo que describe `name`/el contenido de `data.js`. Si coincide → pasarla a `photo:` directo en `data.js` con esa misma URL (queda "verified"). Si NO coincide → buscar una real en Commons, verificarla a ojo, y añadirla igual. Si no se encuentra ninguna inequívoca → dejar marcada como `PENDING_IMAGE` en una copia actualizada del JSON de clasificación (no hace falta tocar `data.js` en ese caso).
4. **Método para extraer datos en bloque sin volver a reimplementar nada:** usar el navegador real de la app (`loadWikiPhoto`, `WIKI_ARTICLES`, `window.IMAGE_MAP`, `_localImgSlug`, `_fetchWikiEntry` ya están cargados en la página) — NO reimplementar la lógica en Node aparte, hoy mismo eso causó puntos ciegos reales (el caso de `IMAGE_MAP` con un archivo local ya borrado). El script usado hoy para generar el audit está documentado en `HISTORIAL_DE_CAMBIOS.md` (entrada 1-oct) si hace falta repetir la extracción tras corregir algo.
5. **Tras cada tanda de correcciones:** subir `DATA_VERSION` en `data.js` y el `?v=N` de `index.html`, volver a correr la extracción completa (paso 4) para regenerar `AUDITORIA_IMAGENES_CLASIFICADA.json` con los nuevos `OK_VERIFIED`, y documentar en `HISTORIAL_DE_CAMBIOS.md` qué se corrigió y por qué.

---

## ⚠️ Bloque del 29-sep (histórico, ya resuelto o superado — no usar como estado actual)

**El hallazgo del 29-sep (continuación 16):** la app tenía un **bug estructural de fotos duplicadas**, no casos sueltos. `WIKI_ARTICLES` en `app.js` (la tabla que dice qué artículo de Wikipedia mirar para la foto de cada sitio) tenía **72 artículos asignados a 2+ nombres de sitio distintos** — de esos, 15 grupos eran sitios reales y actuales del itinerario compartiendo la misma foto sin motivo. Corregido entonces; la auditoría de hoy (1-oct, ver arriba) es el seguimiento formal de ese mismo problema, hecho con rigor.

**[OBSOLETO] El mapa en blanco por My Maps restringido:** ya no aplica, ver punto 1 de arriba — el My Maps se abandonó por completo el 30-sep.

**Resto de lo hecho hoy (29-sep), cronológico — ver `HISTORIAL_DE_CAMBIOS.md` continuaciones 10 a 16 para el detalle completo de cada una:**
1. **Mañana, PC del trabajo:** git/Mejoras al día, cruce de listas de Google Maps, auditoría de fotos con script + visual.
2. **Tarde, PC de casa:** causa raíz de los dos temas oscuros paralelos (corregida), `DAY_MAP_COORDS` sin ciudades nuevas (corregido), 5 fotos verificadas, rediseño de cabeceras de bloque, Ba Na Hills, contenido de María para Hoi An/Da Nang (clases de cocina, talleres, Aldea de Frescos), barrido de `notes: ''` vacíos (8 sitios rellenados).
3. **Noche, PC de casa:** **criterio de relevancia turística** para las listas de Google Maps (ver más abajo) + My Son, Península de Son Tra, Museo de Minas, granjas de seda añadidos; luego el **bug estructural de fotos duplicadas** de arriba, encontrado mientras Marcos navegaba la app en vivo y reportaba cada caso.

**Criterio de relevancia turística adoptado para las listas de Google Maps (pedido explícito de Marcos, no volcar los ~200 sitios tal cual):** usar el número de reseñas de Google Maps como proxy de relevancia real (≥150-300 reseñas ≈ sitio con interés turístico genuino, contrastado con webs de viaje). Aplicado a Camboya Sur (10 sitios, nada nuevo — ya cubierto), Camboya Norte (26 sitios, 3 huecos reales añadidos) y Vietnam Centro (62 sitios, revisado — ya estaba todo cubierto, incluido Hue). **Falta aplicar el mismo criterio a:** Vietnam Norte-Hanói (45 sitios, parcialmente revisado — encontrado y añadido Tạ Hiện/Beer Street, falta terminar de confirmar el resto), Vietnam Norte-Ninh Binh (22, sin empezar), y repasar con este método más estricto Vietnam Norte-Cat Ba/Vietnam Sur (ya se hicieron en otra sesión con un método distinto, menos sistemático).

**Pedidos explícitos de Marcos, todavía SIN EMPEZAR — no perder de vista:**
- **Tarjetas de info de aeropuerto:** para los días de aeropuerto (Barcelona, Shenzhen), una tarjeta con consejos/mapa de terminales si aplica; y para el día de llegada a Hanói, una tarjeta explicando qué hacer nada más aterrizar (inmigración, cómo llegar a la ciudad, etc.) — investigar bien antes de escribir nada sobre visados/inmigración, es delicado.
- **Ampliar "Qué comer" de 2 a 4-5 platos por día** donde tenga sentido, investigando en internet además de lo que ya hay puesto.
- **Bloque "Dónde comer" separado** (restaurantes reales, identificados en el mapa) para cuando haya información real de restaurantes — todavía no hay.

**Sigue pendiente, ya conocido:** que los ~200 sitios de las listas de Google Maps de Marcos tengan cada uno su propia ficha (en curso con el criterio de relevancia, ver arriba — ya no es "volcar todo", es criterio + verificación); auditoría general de contraste "en toda la app" más allá de lo ya revisado.

---

## Estado actual

App **funcionando en producción** en GitHub Pages (versión antigua, 23 días) — el **itinerario de 25 días** vive solo en local todavía, en ambos PCs, **por decisión explícita de Marcos** (28-sep-2026: "acumular cambios en local ~1 semana antes de publicar", ver Tareas pendientes). No hay prisa por el push.

`.git` NO se sincroniza entre los dos PCs vía MEGA (ver Parte 19 de `MEMORIA_MAESTRA.md`) — cada PC tiene su propio repo y commits locales, independientes:

- **PC del trabajo** (`C:\Users\mpe.HP2008\...`): rama `main`, último commit ver `git log --oneline -3` (incluye todo el trabajo del 28-sep del PC de casa, comprometido aquí el 29-sep tras revisar que la app funciona bien) — desciende del historial real de GitHub (`c8d9eb5`), no necesita `--force` para el push
- **PC de casa** (`C:\Users\marco\...`): 5 commits propios (`4c5d322`…`cb9c4d1`) encima de `75ce58c` — historial sin relación con GitHub, necesitaría `--force`/`--allow-unrelated-histories`

Ninguno de los dos se ha subido todavía — ni por el token pendiente de regenerar, ni porque Marcos decidió esperar. Cuando llegue el momento: subir primero desde el PC del trabajo, luego resetear el de casa contra `origin/main` (ver `COORDINACION_SESIONES.md` para el estado más al día de esto).

- URL: https://marcospenas.github.io/viajes-marcos-mery
- Repo: https://github.com/MarcosPenas/viajes-marcos-mery
- Ruta local: `...\MEGA\08_Scripts\App Viajes Marcos Mery` (distinta según el PC, ver arriba)

---

## Qué se hizo en esta sesión (28 sep 2026) — resumen largo

**Bloque 1 — Itinerario de 25 días desde cero:**
1. Marcos pegó el itinerario "casi definitivo" (vuelos, alojamientos, plan día a día) — ruta muy distinta desde el día 14 respecto a la versión anterior (ya no hay Koh Rong; ahora ferry por el Mekong a Chau Doc y Can Tho)
2. `trip.startDate` ampliado a `2026-11-05` para incluir los 2 días de vuelos España→Barcelona→Shenzhen dentro de la app → el viaje pasa de 23 a **25 días**
3. Array `days` de `js/data.js` reescrito por completo (25 entradas), primero solo con la "columna vertebral" (fechas, vuelos, alojamientos, sitios con notas breves)
4. Bugs propios de la reescritura arreglados: reloj de doble huso mostrando Barcelona con hora de Vietnam; bug real de años atrás en varias tablas de colores por `block` que nunca tenían las claves reales (`Angkor`, `Phnom Penh`) y mostraban "General"; colisión de agrupación por reutilizar el bloque `'El Norte'` en dos tramos no contiguos (Hanói + Cat Ba, resuelto con `'Vuelta al Norte'`)

**Bloque 2 — Marcos fue probando la app en vivo y reportando problemas según los veía:**
5. Tasas de cambio actualizadas (consultadas por WebSearch: VND 29.600, KHR 4.630, USD 1,14 por €)
6. "Lo que nos espera" (Home) — era un array hardcodeado con hitos del itinerario VIEJO (Koh Rong, fechas antiguas), reescrito con hitos reales
7. Bug real: el contador de "países visitados" mostraba 7 en vez de 4 (contaba cada string de cruce de frontera como un país nuevo)
8. **Más de 15 componentes con texto ilegible en tema oscuro** (fondo claro hardcodeado + texto de variable de tema) — corregidos uno a uno a medida que Marcos los iba viendo en capturas: `.highlight-pill`, `.tr-inline`/`.htl-inline` (pestaña Transportes), `.dsc-transport-card`, `.lugar-tips`, `.docs-hint`, etc. También la variable `--card` (9 tarjetas, incluida la de divisas) nunca se adaptaba a tema oscuro — corregida
9. Mini-mapa quitado de la tarjeta de tiempo de la portada (a petición explícita de Marcos, "antes estaba mejor")
10. Bug real de overflow confirmado por medición en el DOM: la tarjeta de divisas desbordaba 64px con las 3 monedas — corregido (padding/gap/iconos más compactos)
11. **Nueva ficha "Sobre `<ciudad>`"** debajo de "Qué ver" en cada día — desplegable (colapsada por defecto), con historia (Wikipedia en vivo, español) + curiosidades + platos típicos curados a mano (`CITY_INFO`, 11 ciudades), pensada para el estilo de viaje de Marcos y Mery
12. "Dónde comer" pasa de vacío/1 plato a 2 platos representativos por día en 20 de los 25 días
13. **App ahora salta directamente a la portada del viaje al abrir**, sin pasar por "Mis Viajes" — a petición de Marcos, solo mientras haya un único viaje guardado (`DB.trips.length === 1`)

**Bloque 3 — Reutilización y contenido nuevo:**
14. 65 de los 109 sitios del itinerario nuevo recuperaron `description`/`tips` ya verificados del itinerario anterior (extraídos del commit git `75ce58c`, antes de la reescritura), con sus alias correspondientes en `WIKI_ARTICLES` para que la foto siga resolviendo bien
15. Bug propio grave (y arreglado en la misma sesión): al insertar la ficha de ciudad, un edit se comió por error las líneas `const _wikiCache = {}` / `const _citySummaryCache = {}`, rompiendo silenciosamente la carga de fotos de **todos** los sitios, no solo los nuevos
16. Marcos pasó `C:\Users\marco\Downloads\itinerario final V&C.odt`, un documento de investigación muy detallado escrito por María (su pareja) — **no es la versión definitiva, seguirá creciendo**. Se extrajo el texto (1410 líneas) y se reescribieron `description`/`tips` de **43 sitios** con esa información: Hanói días 2-3 (19), Siem Reap completo incl. Phare Circus (15), Phnom Penh completo (9)
17. **Hallazgo importante de ese documento:** el Festival del Agua de Camboya (Bon Om Touk, el evento más grande del año en el país) cae el **25 de noviembre** — pero ese día, en el itinerario actual, se está en Tam Coc, a un país de distancia. Se lo perderían por completo. Dejado como aviso ⚠️ en las notas del día 15-nov de la app
18. Primera pasada (parcial) de cruce contra las 7 listas de Google Maps de Marcos: Cat Ba (añadido "Ba Trai Dao") y Vietnam Sur/Can Tho (convertidos varios sitios de una nota de texto a tarjetas reales) — **las 4 listas grandes (Vietnam Centro 62, Hanói 46, Camboya Norte 26, Ninh Binh 22) se quedaron sin cruzar, ver Tareas pendientes**
19. Se generó y envió a Marcos un CSV con 109 sitios del itinerario para importar en su Google My Maps
20. Explicado a Marcos que nada de esto llega a sus móviles todavía (la PWA instalada apunta a GitHub Pages, no a esta carpeta local) — decidió explícitamente: acumular cambios en local ~1 semana más antes de publicar

**Cabo suelto — ✅ RESUELTO (29-sep-2026, PC del trabajo):** el sistema de Mejoras se rediseñó el 24-sep-2026 como una app **centralizada** en `C:\...\MEGA\08_Scripts\00_Guía Apps\Sistema_Mejoras\03_APLICACION\` (`Mejoras.vbs`, `Mejoras.html`, `Mejoras.ico`), compartida por todos los proyectos de Marcos — cada proyecto solo tiene `MEJORAS.lnk` (acceso directo a esa app centralizada) + `01_ESPECIFICACIONES/MEJORAS.json` (el buzón de datos de ESE proyecto, que la app centralizada lee/escribe). Está desplegado igual en Dj Hub, Gestor de Descargas, Monitor, NextCue, Stems Virtual Dj y Comparador de duplicados.

**Por qué fallaba en el PC de casa:** un acceso directo (`.lnk`) de Windows guarda una ruta ABSOLUTA fija al crearse. Este `MEJORAS.lnk` se creó en el PC del trabajo apuntando a `C:\Users\mpe.HP2008\...` — esa ruta no existe en el PC de casa (`C:\Users\marco\...`), así que el acceso directo rompe ahí aunque el resto de la carpeta `Sistema_Mejoras` sí se sincronice bien por MEGA. **Pendiente:** crear un `MEJORAS.lnk` propio en el PC de casa apuntando a su propia ruta (`C:\Users\marco\Documents\MEGA\08_Scripts\00_Guía Apps\Sistema_Mejoras\03_APLICACION\Mejoras.vbs`) — no sirve copiar el `.lnk` del otro PC. Esto es un problema del propio `Sistema_Mejoras` (afecta a todos los proyectos, no solo a este); avisar en esa carpeta si hace falta una solución más robusta (p.ej. un `.vbs` que resuelva la ruta desde `%USERPROFILE%` en vez de un `.lnk` fijo).

`01_ESPECIFICACIONES/MEJORAS.json` está vacío (0 pendientes, 0 hechas) — nada que migrar todavía en este proyecto. Ambos archivos (`MEJORAS.lnk`, `MEJORAS.json`) están en `.gitignore` — son herramienta personal, no van al repo público.

---

## Qué se hizo en la sesión del 7 sep 2026

1. Se leyó toda la documentación de `01_ESPECIFICACIONES/` y se hizo un resumen del estado del proyecto
2. Se arrancó el servidor local y se probó la app a fondo (Home, Dashboard, Días, Día 1, Día 3, Hoy, Mapa, Docs, toggle de tema)
3. Se encontraron y corrigieron 2 bugs reales:
   - **Mapa roto:** hash `integrity` de Leaflet corrupto en `index.html` bloqueaba el script en todo navegador con SRI activado. Corregido con el hash real (verificado contra la cabecera `content-digest` que envía el propio CDN).
   - **Fotos de cabecera rotas:** 11 rutas a la carpeta obsoleta `assets/images/places/` (eliminada en la reorganización del 2-sep) en `CITY_PHOTOS` (app.js) y `coverImage` (data.js). Sustituidas por las rutas correctas en `img/places/`.
4. Se descubrió que `js/data.js` tiene una constante `DATA_VERSION` (aparte del `?v=N` de index.html) que controla si el navegador recarga `DEFAULT_DATA` o sigue usando lo guardado en `localStorage`. Se subió de 21 a 22 para que el fix de `coverImage` llegue a quien ya haya abierto la app antes.
5. Se subieron versiones en `index.html`: `js/app.js` v=102→103, `js/data.js` v=21→22
6. **Se detectó que la carpeta local NO tenía `.git` inicializado** — la tarea pendiente de "solo hacer commit+push" de CLAUDE.md no se podía ejecutar tal cual; había que investigar primero si el remoto de GitHub estaba más adelantado o más atrasado que el local
7. Se revisó `js/data.js` buscando datos personales sensibles: `localEmergency`/`contacts` solo tienen teléfonos públicos de emergencia y la embajada de España — no hay pasaportes ni datos de seguro médico
8. Se comparó el local contra los raw files del remoto de GitHub (descarga directa, sin necesitar token) → confirmado que el remoto estaba desactualizado, sin commits que no existieran ya en local
9. Se creó `.gitignore` y se hizo `git init -b main` + primer commit (`75ce58c`, 227 archivos) — repo git local resuelto, pendiente solo el push (ver Crítico)
10. Se creó `.claude/settings.json` con un allowlist de comandos de solo lectura (dotnet build/test, tasklist, MCP del navegador) para reducir prompts de permisos, a petición de Marcos
11. Se creó `Mejoras.txt` en la raíz (formato `PENDIENTES`/`HECHAS`, igual que en Monitor y Gestor de Descargas) para que Marcos vaya anotando ideas de mejora
12. **Nueva convención adoptada:** documentar cada cambio de la sesión en `HISTORIAL_DE_CAMBIOS.md` y `CONTINUIDAD.md` a medida que se hace, no solo al final

---

## Qué se hizo en la sesión anterior (2 sep 2026)

1. El proyecto se movió de `C:\Users\mpe.HP2008\Documents\viajes-marcos-mery` a la ruta actual en MEGA\08_Scripts
2. Se reorganizaron las carpetas según la guía de organización de apps:
   - Creadas: `00_INSTALACION/`, `01_ESPECIFICACIONES/`, `02_DESARROLLO/`
   - Los scripts Python obsoletos pasaron a `02_DESARROLLO/SCRIPTS_OBSOLETOS/`
   - Las herramientas de auditoría pasaron a `02_DESARROLLO/HERRAMIENTAS_AUDITORIA/`
   - Las capturas de pantalla e icono original pasaron a `02_DESARROLLO/CAPTURAS_Y_RECURSOS_GRAFICOS/`
   - Las imágenes de una versión anterior pasaron a `02_DESARROLLO/IMAGENES_ANTERIORES/`
3. Se crearon: `CLAUDE.md`, `LEEME_INSTALACION.md`, `CONTINUIDAD.md`, `HISTORIAL_DE_CAMBIOS.md`
4. Se intentó mover el código a `docs/` (para limpiar la raíz) pero se revirtió — GitHub Pages solo acepta raíz o `docs/`, y el movimiento generaba complicaciones innecesarias
5. Se reescribió la `MEMORIA_MAESTRA.md` (v2) con encoding correcto y estructura actualizada

---

## Qué funciona y está comprobado

- Toda la app funcionando en producción
- Instalación como PWA en Android con icono personalizado
- Galería de ~200 imágenes locales
- Tiempo meteorológico, reloj doble huso, conversor de divisas
- Modo oscuro/claro
- Service Worker con caché offline
- Itinerario de 25 días reescrito (28-sep-2026) con la ruta y fechas definitivas — falta contenido rico (descripciones/tips/fotos) de los sitios nuevos

---

## Tareas pendientes

**Nota de ritmo (28-sep-2026):** Marcos decidió explícitamente acumular cambios en local ~1 semana antes de publicar — no hay prisa por el push. Prioriza el contenido/UX sobre el tema de GitHub salvo que él diga lo contrario.

### 🔴 Lo primero que hay que retomar mañana (pedido explícito hoy, sin terminar)

| Tarea | Acción |
|---|---|
| ~~Revisión visual de la auditoría de imágenes~~ | ✅ Completada el 1-oct-2026 — las 167 fichas revisadas (33 a resolución completa, 87 vía hoja de contacto en miniatura), 20 fotos incorrectas corregidas, 5 dejadas sin foto a propósito. Ver `HISTORIAL_DE_CAMBIOS.md`, continuaciones 1-3 del 1-oct. Quedan 20 `GENERIC_IMAGE` + 17 `DUPLICATE` + 10 `PENDING_IMAGE` de bajo impacto en `01_ESPECIFICACIONES/AUDITORIA_IMAGENES_CLASIFICADA.json`, no urgente |
| ~~Tarjetas de info de aeropuerto~~ | ✅ Hecho el 30-sep-2026 — investigado con WebSearch antes de escribir nada. Barcelona/Shenzhen (`CITY_INFO`) actualizados con terminal exacta y la política de tránsito de Shenzhen corregida (era 72-144h, ahora 240h desde dic-2024). Llegada a Hanói (notas del día 07-nov): proceso de inmigración, y **hallazgo importante** — desde junio 2026 hace falta la "Vietnam Digital Arrival Card" online (prearrival.immigration.gov.vn, dentro de 72h antes del vuelo, genera QR), no estaba contemplada en ningún sitio; añadida como tarea nueva también. Ver `HISTORIAL_DE_CAMBIOS.md` para el detalle y las fuentes |
| **Ampliar "Qué comer" a 4-5 platos/día** (pedido explícito, 29-sep-2026, sin empezar) | Actualmente 2 por día en la mayoría. Investigar en internet además de lo ya puesto, con criterio (no meter platos de relleno) |
| **Terminar el criterio de relevancia turística en las listas de Google Maps** (en curso) | Hecho: Camboya Sur, Camboya Norte, Vietnam Centro (62 sitios), Hanói (45 sitios), y **Ninh Binh (22 sitios, 1-oct-2026)** — ningún hueco nuevo, los 6 sitios por encima del umbral (La antigua capital de Hoa Lu 12.422 reseñas, Bai Dinh Pagoda 25.359, Báo Thiên Stupa 303, Bich Dong 6.983, Bai Dinh Ancient Pagoda 463, Tam Coc Van Lam Pier 211) ya están cubiertos. Falta: repasar Cat Ba/Vietnam Sur con este método más estricto (se hicieron antes con otro método menos sistemático, probablemente no hace falta repetir). Método: abrir la lista pública de Google Maps en el navegador, extraer sitio+reseñas, filtrar por relevancia (≥150-300 reseñas ≈ real interés turístico), cruzar contra `data.js`, verificar foto antes de añadir — ver `HISTORIAL_DE_CAMBIOS.md` continuación 15 |
| ~~Mapa: abandonar My Maps, mapa propio con Leaflet~~ | ✅ Hecho el 30-sep-2026 — el documento "Vietnam" de My Maps no era ni siquiera el mapa real de Marcos (lo creó una sesión anterior como contenedor para importar CSVs) y la mayoría de sus puntos nunca se geolocalizaron bien. Sustituido por completo por un mapa Leaflet propio: 125/128 sitios con coordenadas reales (Photon/OSM, verificadas contra el centro de cada ciudad), categorías por color, favorito/visitado persistente, "Cerca de mí" con distancias reales. Verificado en el navegador tras un bloqueo temporal de la plataforma a mitad de la construcción. Ver `HISTORIAL_DE_CAMBIOS.md`, continuación 2, para el detalle técnico completo (incluidos 3 bugs propios encontrados y corregidos durante la construcción). **Pendiente:** 3 sitios sin coordenadas (revisar manualmente), y una pasada visual por si algún pin quedó mal posicionado dentro del radio de tolerancia de 60 km |
| ~~Bug estructural de fotos duplicadas~~ | ✅ Hecho el 29-sep-2026 (continuación 16) — 27 alias de Wikipedia duplicados entre sitios reales, corregidos con script. Ver detalle arriba en "LEE ESTO PRIMERO" |
| **Seguir revisando visualmente si Marcos ve algo raro** | El método que mejor ha funcionado hoy: Marcos navega la app en directo y manda captura de cualquier miniatura que no encaje — cada caso se soluciona al momento (verificar en Commons, aplicar, o quitar la foto si no hay ninguna real disponible). Seguir así, no hace falta que sea Claude quien vaya buscando proactivamente sitio por sitio salvo que se pida explícitamente |
| ~~Continuar el documento .odt de María~~ | ✅ Hecho el 29-sep-2026 (continuaciones 12-14) — Chau Doc, Can Tho, Hoi An y Da Nang ya tienen todo el contenido que da el documento (llega hasta el 21-nov y se corta ahí porque María todavía lo está escribiendo). `C:\Users\marco\Downloads\itinerario final V&C.odt` — **comprobar si hay una versión más nueva/completa antes de dar el contenido por definitivo**, y cuando María lo termine, contrastar todo de nuevo (ver fila de abajo) |
| Contrastar TODO cuando María termine su documento | Marcos lo dijo explícitamente: "no es la versión definitiva, cuando la tengamos terminada contrastarás la info y meterás o quitarás lo que corresponda" — no dar por bueno el contenido actual de Hanói/Siem Reap/Phnom Penh como definitivo, es la mejor versión disponible HOY, no la final |
| Avisar del conflicto del Festival del Agua | Ya está como aviso en la app (día 15-nov), pero conviene comentárselo a Marcos en la próxima sesión por si quiere reordenar el viaje para no perdérselo (25-nov, Phnom Penh) |
| Bloque "Dónde comer" separado (restaurantes reales en el mapa) | Pendiente de que exista información real de restaurantes — todavía no la hay, no empezar hasta entonces |

### 🔵 Ideas para el futuro (Marcos, 30-sep-2026 — NO implementar todavía, primero lo pendiente de arriba)

Mandadas explícitamente como "apunta esto, primero arreglamos lo pendiente" — no empezar sin que él lo pida:

1. **"Ahora / Siguiente" en Hoy** — tarjeta grande arriba de "Hoy" con el próximo evento del itinerario (transporte, actividad con hora) y botones directos: 📍 Cómo llegar · 🎫 Reserva · 📞. La mejora que más valora Marcos ("para mí, la nº 1").
2. **Modo "sin cobertura" de verdad** — que TODO funcione offline antes de salir del hotel: itinerario, direcciones, reservas, teléfonos, notas, restaurantes, mapas básicos. Indicador tipo "✓ Día 12 disponible offline".
3. **Centro de reservas cronológico** — en Docs, vista tipo "MAÑANA · Vuelo VN123 · 08:20 · Terminal 1"; cada reserva con localizador grande, QR/PDF, dirección, horario, teléfono y botones Copiar localizador / Abrir reserva / Abrir Maps. Que los localizadores no queden enterrados en texto libre.
4. **Alertas inteligentes** generadas desde el itinerario — solo las útiles ("mañana vuelo: revisa pasaportes", "hoy traslado a las 12:30", "checkout a las 11:00"), no notificaciones por todo.
5. **"Información crítica" tipo SOS** — acceso rápido (mantener pulsado un botón o desde Home) a pasaporte/documentación, seguro, emergencias, embajada, hotel actual, contacto de emergencia.

### 🟠 ALTA prioridad

| Tarea | Acción |
|---|---|
| Contenido rico de Hue, Tam Coc/Ninh Binh y Cat Ba | Estos bloques (días 22-29) siguen sin `description`/`tips` de ninguna fuente rica todavía — ni del itinerario antiguo ni del documento de María (que no llega tan lejos) |
| Descargar/verificar imágenes reales | Los sitios nuevos dependen del fallback en vivo (Wikipedia/Commons) para la foto — funciona pero no está verificado uno a uno. Cuando el contenido esté más maduro, hacer una pasada de descarga a `img/places/` como se hizo en la auditoría del 7-sep-2026 (ahora obsoleta, era sobre la ruta vieja) |
| Regenerar token de GitHub | Solo cuando Marcos quiera publicar (dijo: dentro de ~1 semana). Ir a https://github.com/settings/tokens → eliminar el antiguo → generar uno nuevo → usarlo solo en el momento del push, sin guardarlo en ningún archivo |
| Subir a GitHub desde el PC del trabajo primero | `git push -u origin main` con el token nuevo (commit `e67e14c`, desciende del remoto, no hace falta `--force`). Luego, en el PC de casa: `git fetch origin && git reset --hard origin/main` (el commit local de casa parte de un historial no relacionado) |

### 🟡 MEDIA prioridad (antes del viaje — noviembre 2026)

| Tarea | Acción |
|---|---|
| ~~Actualizar tasas de cambio~~ | ✅ Hecho 28-sep-2026 (VND 29.600, KHR 4.630, USD 1,14/€) |
| Verificar instalación en iOS Safari | Probar en iPhone: Safari → compartir → "Añadir a pantalla de inicio" |
| Mapa offline | Descargar Leaflet.js localmente y añadirlo al array ASSETS de sw.js |

---

## Advertencias para la siguiente IA

- El código activo (`index.html`, `css/`, `js/`, `img/`, `sw.js`, `manifest.json`) está en la **raíz del repo** — no moverlo. GitHub Pages lo requiere ahí.
- No cambiar `position: fixed` en `.bottom-nav` de styles.css
- No cambiar el prefijo `/viajes-marcos-mery/` en los paths de sw.js
- No cambiar `start_url` en manifest.json
- No modificar la función `_localImgSlug()` en app.js
- Incrementar `?v=N` en index.html al modificar cualquier CSS o JS
- Si se modifica `DEFAULT_DATA` en `js/data.js`, incrementar TAMBIÉN la constante interna `DATA_VERSION` del propio archivo (no solo el `?v=N`), o los navegadores que ya visitaron la app seguirán viendo los datos viejos guardados en `localStorage`
- Entregar siempre archivos completos, nunca fragmentos
- `.git` NO se sincroniza entre el PC del trabajo y el de casa vía MEGA (`.megaignore` excluye archivos ocultos) — cada PC tiene su propio repo y commit local. Comprobar `git log --oneline -5` en la máquina en la que estés antes de hacer push o asumir el estado del repo (ver Parte 19 de la Memoria Maestra)
- El token de GitHub expuesto ya se quitó de `CLAUDE.md` (8-sep-2026) — pero sigue sin regenerarse; no hacer push sin regenerarlo primero
- Documentar cada cambio en `HISTORIAL_DE_CAMBIOS.md` y `CONTINUIDAD.md` a medida que se hace, no solo al cerrar la sesión
- Si hay un `Mejoras.txt` en la raíz con entradas pendientes: al aplicar una, moverla a `HECHAS` con `[COMPLETADO <fecha>]` y una línea `->` explicando qué se hizo — nunca borrarla, eso lo hace Marcos a mano

---

## Cómo arrancar el trabajo en la nueva sesión

1. Leer **`COORDINACION_SESIONES.md` primero** (estado activo entre los dos PCs — hoy se dejó muy detallado porque Marcos avisó que sigue mañana desde otro PC), luego este archivo y `MEMORIA_MAESTRA.md`
2. Comprobar que la app sigue funcionando: http://localhost:3000 (arrancar servidor) o https://marcospenas.github.io/viajes-marcos-mery (la de producción sigue en la versión vieja, nada de esta sesión se ha publicado)
3. Pedir al usuario que confirme qué tarea quiere abordar primero
4. Lo más probable: retomar el documento .odt de María y las 4 listas grandes de Google Maps — ver la sección 🔴 de "Tareas pendientes" arriba, tiene el detalle exacto de por dónde se quedó cada cosa

---

## Archivos modificados en la sesión del 28-sep-2026 (resumen — ver HISTORIAL_DE_CAMBIOS.md para el detalle completo)

- `js/data.js` — itinerario de 25 días reescrito por completo, 108 sitios con contenido enriquecido (65 del itinerario antiguo + 43 del documento de María), restaurantes rellenados, aviso del Festival del Agua. `DATA_VERSION` 22→28
- `js/app.js` — múltiples fixes de contraste, bug de conteo de países, ficha "Sobre la ciudad" nueva (`CITY_INFO`), mini-mapa del tiempo quitado, boot directo a la portada si hay 1 solo viaje, FX_RATES actualizado. v=103→114
- `css/styles.css` — fondos hardcodeados corregidos a `var(--surface)`/`var(--card)` con overrides de tema oscuro, fix de overflow en tarjeta de divisas. v=64→67
- `index.html` — versiones actualizadas en cada cambio de JS/CSS
- `.claude/launch.json` (nuevo, para esta máquina)
- `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` — nueva Parte 20 (itinerario + pool de Google Maps)
- `01_ESPECIFICACIONES/CONTINUIDAD.md` (este archivo)
- `01_ESPECIFICACIONES/HISTORIAL_DE_CAMBIOS.md` (4 entradas nuevas del 28-sep-2026, con todo el detalle técnico)
- `02_DESARROLLO/itinerario_25dias_para_my_maps.csv` (nuevo, generado y enviado a Marcos)
- 5 commits locales nuevos en el PC de casa (`4c5d322`…`cb9c4d1`, encima de `75ce58c`) — nada subido a GitHub

## Archivos modificados en la sesión del 7-sep-2026

- `index.html` — hash `integrity` de Leaflet corregido; `js/app.js` v=102→103, `js/data.js` v=21→22
- `js/app.js` — `CITY_PHOTOS` (líneas ~2337-2348): 10 rutas `assets/images/places/...` → `img/places/...`
- `js/data.js` — `coverImage` (línea 13): `assets/images/places/lan-ha-bay.jpg` → `img/places/lan_ha_bay.jpg`; `DATA_VERSION` (línea ~1192): 21 → 22
- `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` (v2.1 — documentados los fixes, la incidencia del `.git` y la regla de `DATA_VERSION`; luego actualizada la Parte 19 al resolverse)
- `01_ESPECIFICACIONES/CONTINUIDAD.md` (este archivo)
- `01_ESPECIFICACIONES/HISTORIAL_DE_CAMBIOS.md` (nueva entrada, ampliada durante la sesión)
- `.gitignore` (nuevo)
- `.claude/settings.json` (nuevo — allowlist de permisos)
- `Mejoras.txt` (nuevo — secciones PENDIENTES/HECHAS)
- Repo `git` inicializado en la raíz (`git init -b main` + commit `75ce58c`)

## Archivos modificados en la sesión del 2-sep-2026

Ningún archivo del código activo fue modificado en esa sesión de reorganización. Solo se crearon y modificaron archivos de documentación y configuración:
- `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` (reescrita v2)
- `01_ESPECIFICACIONES/CONTINUIDAD.md`
- `01_ESPECIFICACIONES/HISTORIAL_DE_CAMBIOS.md` (nuevo)
- `00_INSTALACION/LEEME_INSTALACION.md` (nuevo)
- `CLAUDE.md` (nuevo)
- `.claude/launch.json` (actualizado con nueva ruta)
