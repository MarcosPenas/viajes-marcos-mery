# Guía de migración a otros destinos — App Viajes Marcos & Mery

**Versión:** 1.0 · 9 de octubre de 2026 (PC del trabajo) · Claude Opus 5.5
**Estado del sistema:** Fase 1 de 4 (guía e inventario hechos; el código aún no está separado del todo; ver Parte 7)

> **Para la IA que lea esto:** esta guía explica cómo reutilizar la app (estructura, código y reglas) para un viaje nuevo, sustituyendo todo el contenido de Vietnam y Camboya por el del destino nuevo. Léela entera antes de tocar nada. Después lee `MEMORIA_MAESTRA.md` (cómo funciona la app por dentro) y `CLAUDE.md` (reglas del proyecto). Si algo de esta guía no cuadra con el código, **manda el código**: compruébalo con grep y corrige esta guía en la misma sesión.

---

## PARTE 0 — RESUMEN EN 10 LÍNEAS

1. La app tiene tres capas: **motor** (código genérico), **identidad** (quiénes viajan y desde dónde) y **contenido del destino** (itinerario, lugares, fotos, hoteles, idioma, moneda, visados…).
2. Migrar = dejar el motor, revisar la identidad y **sustituir todo el contenido**.
3. Hoy el contenido está en `js/data.js` y `js/guia.js`, **pero también hay unas 25 tablas y textos de Vietnam/Camboya escritos dentro de `js/app.js`** (inventario en la Parte 4). Hasta terminar la Fase 2, migrar obliga a editar también `app.js`.
4. El viaje anterior no se borra: se **congela** (etiqueta de git y, si se quiere, su propia web).
5. **Regla crítica:** dos apps en `marcospenas.github.io` comparten el almacenamiento del móvil. Antes de publicar una segunda app hay que dar a cada una sus propios nombres de almacenamiento y de caché (Parte 3).
6. Las piezas del contenido se enlazan por **nombres exactos** (`block`, `city`, `hotel.name`, `country`…). Si se cambia un nombre en un sitio y no en los demás, la app no da error: simplemente deja de mostrar cosas. Contrato completo en la Parte 5.
7. Las fotos son siempre archivos propios del repo (`img/fotos/`, `img/places/`), verificadas a mano y con derechos claros. Nada de fotos aleatorias ni enlazadas.
8. El repo es público: nada de pasaportes, pólizas, localizadores ni teléfonos personales.
9. La comprobación final es la misma de siempre: barrido de todas las pantallas y días a 375 px, claro y oscuro, sin conexión, `check_imagenes.py` y búsqueda de restos del destino anterior (Parte 6, paso 8).
10. Se documenta todo en `01_ESPECIFICACIONES` del viaje nuevo, como en este.

---

## PARTE 1 — LAS TRES CAPAS

| Capa | Qué es | Dónde vive hoy | Al migrar |
|---|---|---|---|
| **Motor** | Pantallas, navegación, «Ahora/Siguiente», avisos, mapa Leaflet, conversor, notas, localizadores, modo sin conexión, temas, estilos | `js/app.js` (la lógica), `css/styles.css`, `sw.js`, `index.html` | Se conserva. Solo se toca para generalizar algo que estaba atado al destino |
| **Identidad** | Viajeros (Marcos & Mery), ciudad de casa (Santiago de Compostela, UTC+1 en noviembre), nacionalidad (española: visados y embajadas), idioma de la app (español), moneda de casa (EUR), nombre de la app y del repo | `index.html`, `manifest.json`, `sw.js` (`BASE`), `renderHome()`, reloj doble, tiempo de Santiago, textos de visados y embajadas | Se revisa: casi siempre sigue igual, salvo el nombre del repo y lo que dependa de la fecha (horario de verano) |
| **Contenido del destino** | Itinerario, días, bloques/zonas, ciudades, lugares, comida, transportes, hoteles, fotos, frases, cultura, visados, divisas, clima, husos horarios, emergencias, consejos, equipaje, tareas | `js/data.js`, `js/guia.js`, `img/fotos/`, `img/places/` **y tablas dentro de `js/app.js`** | Se sustituye entero |

---

## PARTE 2 — ESTADO ACTUAL (honesto)

- **Bien separado:** `js/data.js` (`DEFAULT_DATA`: el viaje, sus 26 días, tareas, embajadas y teléfonos de emergencia) y `js/guia.js` (`SURVIVAL_DICT`, `CULTURE_CARDS`, `HOTEL_INFO`) son contenido puro.
- **Mal separado:** `js/app.js` tiene contenido del destino mezclado con la lógica: textos de ciudades, fotos de portada, destinos del tiempo, divisas, husos horarios, colores y descripciones de cada zona, visados, requisitos de frontera, consejos, «momentos destacados» con fechas… (lista completa en la Parte 4.3).
- **Atado al destino en la propia lógica** (no basta con cambiar una tabla): la detección del país (`getCurrentCountry` devuelve `'vi'` o `'km'`), las noches por país de las estadísticas (solo Vietnam y Camboya), el reloj (UTC+1 y UTC+7 fijos) y el conversor (VND/KHR/USD).
- **Consecuencia:** hoy migrar es posible siguiendo esta guía, pero es laborioso y fácil de dejar restos. Las Fases 2 y 3 (Parte 7) lo convierten en «cambiar 3 archivos de contenido + fotos».

---

## PARTE 3 — DECISIÓN DE PARTIDA: ¿CÓMO CONVIVEN EL VIAJE NUEVO Y EL ANTERIOR?

| Opción | Cómo | A favor | En contra |
|---|---|---|---|
| **A. Repo nuevo por viaje (recomendada)** | Copia de la app a un repo nuevo (p. ej. `viajes-marcos-mery-japon`) y se sustituye el contenido. El de Vietnam queda tal cual, publicado, como recuerdo | Cada viaje queda intacto y se puede seguir abriendo. Riesgo cero para el viaje anterior | Obliga a separar almacenamiento y cachés (ver regla crítica). Las mejoras del motor hay que copiarlas a mano entre repos |
| B. Mismo repo, sustituir | Se etiqueta el estado final (`git tag viaje-vietnam-camboya-2026`) y se sustituye el contenido en el mismo repo | Misma URL; los móviles se actualizan solos | La app de Vietnam deja de existir en la web (solo queda en git). Los datos del móvil (notas, favoritos, localizadores) del viaje anterior se mezclan o se pierden al subir `DATA_VERSION` |
| C. Varios viajes en una app | `DB.trips` ya admite varios viajes (la pantalla «Mis viajes» existe) | Una sola app | Todas las tablas de contenido tendrían que ir por viaje. Mucho trabajo y más peso en el móvil. No compensa para un viaje al año |

**Recomendación:** opción A, y en cualquier caso **etiquetar el viaje terminado** (`git tag viaje-vietnam-camboya-2026` + push de la etiqueta) antes de empezar.

### ⚠️ Regla crítica: almacenamiento compartido en `marcospenas.github.io`

GitHub Pages sirve todos los repos del usuario desde el mismo origen (`https://marcospenas.github.io/<repo>/`). Para el navegador, **dos apps en ese dominio son la misma web**:

- **`localStorage` compartido.** Las claves `viajes_db`, `viajes_db_version` (`LS_KEY`/`LS_VER` en `data.js`), `theme` y `precache-stamp` (en `app.js`) las usarían las dos apps: la segunda pisaría el viaje, las notas, los favoritos y los localizadores de la primera.
- **Cachés compartidas.** `sw.js`, al activarse, **borra todas las cachés que no sean las suyas** (`keep = [SHELL_CACHE, MEDIA_CACHE]`). La app nueva borraría las fotos y el modo sin conexión de la de Vietnam (y al revés).

**Qué hacer (es parte de la Fase 2, imprescindible antes de publicar una segunda app):**
1. Un identificador único por app (p. ej. el `id` del viaje: `vietnam-camboya-2026`).
2. Claves de `localStorage` con ese prefijo (`<id>:db`, `<id>:theme`…), con una migración única que copie las claves antiguas en la app de Vietnam para no perder lo guardado en los móviles.
3. Nombres de caché con ese prefijo (`<id>-shell-v5`, `<id>-media-v1`) y `activate` que **solo borre las cachés de su propio prefijo**.
4. `BASE` en `sw.js`, `start_url` en `manifest.json` y `PREFIX` en `tools/servidor_ruta_produccion.py` con el nombre del repo nuevo. Las reglas 2 y 3 de `CLAUDE.md` («no cambiar») se refieren a mantener la app actual; en un repo nuevo se cambian, y siempre los tres a la vez.

Mientras esto no esté hecho: **no publicar ninguna otra app con este service worker en `marcospenas.github.io`**, tampoco de prueba, y menos durante el viaje.

---

## PARTE 4 — INVENTARIO: TODO LO QUE HAY QUE SUSTITUIR

Se citan identificadores, no números de línea (cambian a diario). Para encontrarlos: `grep -n "IDENTIFICADOR" js/app.js`.

### 4.1 `js/data.js` — datos del viaje

| Elemento | Qué contiene | Notas para migrar |
|---|---|---|
| `DEFAULT_DATA.trips[0]` | `id`, `name`, `subtitle`, `emoji`, `coverGradient`, `coverImage`, `myMapsUrl`, `startDate`, `endDate` | `id` nuevo y único. `myMapsUrl`: el My Maps embebido del viaje nuevo (o vacío) |
| `trips[0].days[]` | Un objeto por día: `date`, `city`, `country`, `block`, `summary`, `places[]`, `restaurants[]`, `transport[]`, `hotel`, `tasks`, `notes` | Formato exacto en la Parte 5 |
| `trips[0].tripNotes` | `packingList` (categorías por emoji inicial, ver `PACK_CATS`), `preTripTasks`, `freeNotes` | Reescribir el equipaje y las tareas previas para el destino |
| `tasks` (raíz) | Tareas con fecha (alimentan los avisos de «Hoy») | Fechas siempre antes del día en que hacen falta |
| `contacts` | Embajadas/consulados de España en cada país | Comprobar en exteriores.gob.es y anotar la fecha |
| `localEmergency` | Policía, ambulancia, bomberos por país | `country` con bandera y nombre, igual que en los días |
| `DATA_VERSION` | Versión de los datos | En un repo nuevo, empezar en 1 |
| `LS_KEY`, `LS_VER` | Claves de almacenamiento | Con prefijo propio (Parte 3) |

### 4.2 `js/guia.js` — contenido de consulta

| Elemento | Clave | Qué contiene |
|---|---|---|
| `SURVIVAL_DICT` | Código de idioma (`vi`, `km`) | Nombre del idioma, nota, frases (`es`, `local`, `pron`). Hoy, 19 en vietnamita y 18 en jemer |
| `CULTURE_CARDS` | Valor exacto de `block` | 2-4 tarjetas por zona (`icon`, `title`, `text`) |
| `HOTEL_INFO` | Valor exacto de `hotel.name` | Dirección, teléfono, entrada/salida, `lat`/`lng`, búsqueda de Maps, descripción. Sin fotos (derechos) |
| `TRAVEL_TIPS` | — (lista) | Consejos (`icon`, `title`, `html`, `enGuia`): clima, dinero, SIM, transporte, comida, salud, vacunas, templos, enchufes, fotos, regateo. Los que no llevan `enGuia` salen en Info › Guía › «Consejos generales». Todos dependen del destino |
| `TRIP_GUIDE`, `GUIDE_CHECKED` | — (lista de temas) | Info › Guía (29-oct-2026): temas (`id`, `icon`, `title`, `sub`, `items` en HTML con la etiqueta de fiabilidad `g-tag g-ok/g-info/g-warn`, `sources` con `t` y `u`) y fecha de revisión. Fronteras, dinero, transporte, internet: todo del destino y con fecha |
| `EMERGENCY_HELP`, `EMERGENCY_EXTRA` | — / país en minúsculas (`camboya`) | Info › Urgencias: «¿Qué ha pasado?» (situaciones con pasos) y teléfonos extra por país, además de `localEmergency` de `data.js` |
| `GUIDE_REMINDERS` | Fecha `AAAA-MM-DD` | Avisos de Hoy la víspera de momentos delicados del itinerario (dependen de las fechas del viaje) |
| `SUGGESTED_DOCS` | — (lista) | Info › Mi viaje: documentos sugeridos (`name`, `category` de `DOC_CATEGORIES`) |

### 4.3 `js/app.js` — contenido del destino metido en el código (lo que saca la Fase 2)

| Identificador | Dónde se ve | Qué contiene | Enlazado por |
|---|---|---|---|
| `CITY_INFO` | Día › «Sobre <ciudad>» | Comida típica y curiosidades por ciudad (texto propio) | Ciudad limpia de `day.city` |
| `CITY_INFO_ALIAS` | Ídem | Ciudades sin ficha (`'Barcelona': ''`) | Ídem |
| `CITY_WIKI_ES` | Ídem | Título exacto en Wikipedia en español cuando el nombre no basta | Ídem |
| `HERO_WIKI_ARTICLES` | Inicio, foto de portada rotatoria | 4 artículos de Wikipedia en inglés | — |
| `WEATHER_DESTINATIONS` | Inicio, tiempo | Ciudad, búsqueda en wttr.in, bloques, **medias del mes del viaje** (sin conexión) | `blocks` = valores de `block` |
| `WEATHER_CITY_WIKI` | Inicio, foto de fondo del tiempo | Artículo de Wikipedia por ciudad (incluye Santiago) | `label` del tiempo |
| `OFFLINE_SANTIAGO` y la primera entrada de `allCities` (en `renderTripDashboard`) | Inicio, tiempo de casa | Medias de Santiago en noviembre | Identidad + mes del viaje |
| `getCurrentCountry()` | Conversor y frases | Devuelve `'km'` si el país del día contiene «camboya», si no `'vi'` | **Lógica**, ver Fase 3 |
| `CLOCK_HOME`, `CLOCK_DEST` | Inicio, reloj doble | Ciudad y zona horaria de casa (`Europe/Madrid`) y del destino (`Asia/Ho_Chi_Minh`, «ICT»). Desde el 9-oct-2026 con zonas reales (`Intl`): el horario de verano va solo | Cambiar las dos constantes |
| `FX_RATES` y `switchFXCurrency` | Inicio, conversor | VND, KHR, USD con cambio fijo por euro (fecha del dato en `MEMORIA_MAESTRA`) | **Lógica** + datos |
| `nightsVI` / `nightsKH` (en las estadísticas de `renderTripDashboard`) | Inicio, «Noches por país» | Solo cuenta Vietnam y Camboya, banderas fijas | **Lógica**, ver Fase 3 |
| `ZONE_META` (dentro de `renderTripDashboard`) | Inicio, «Ruta del viaje» | Nombre visible, artículo/foto y descripción de cada zona | Valor de `block` |
| `BLOCK_ZONE` (dentro de `renderItinerary`) | Días | Nombre visible de cada zona | Valor de `block` |
| `BLOCK_ZONE_COLORS` | Toda la app | **Tabla única de colores por zona** (`color`, `lt`, `g`) | Valor de `block` |
| `FLIGHT_BLOCKS` | Estadísticas, reloj, ruta | Bloques que son solo vuelos (`Vuelos`, `Vuelta a casa`) | Valor de `block` |
| `CITY_PHOTOS` (dentro de `renderDay`) | Portada de cada día | Foto por ciudad (`img/places/`, `img/fotos/`) | Ciudad de `day.city` |
| `FLIGHT_AIRPORT` | «Cómo llegar» de los vuelos | Nombre completo del aeropuerto de salida | `transport.from` |
| `buildAlertsHTML()` | Hoy, avisos | Requisitos de entrada por país (Camboya, Vietnam —en avión o por el río—, China) escritos en el código. Los avisos de víspera ya están en `guia.js` (`GUIDE_REMINDERS`) | País de destino del día |
| `TRANSPORT_TIPS` | Días › Transportes y avisos | Genéricos salvo `train` (asiento del lado del mar Da Nang→Hue) | `transport.type`; `sleeper-bus` si `isOvernightTransport` |
| Texto «Media de noviembre · sin datos en vivo» (`weatherPill`) | Inicio, tiempo sin conexión | Mes del viaje | Las medias de `WEATHER_DESTINATIONS` y `OFFLINE_SANTIAGO` son de ese mes |
| `highlights` (dentro de `renderToday`, antes del viaje) | Hoy, cuenta atrás | 7 momentos estrella con fecha fija | — |
| Título «Embajada y consulado de España» y «Estáis en Vietnam/Camboya» (`infoEmergencyHTML`) | Info › Urgencias | Nacionalidad de los viajeros y países del destino | Identidad; país de `day.country` |

Genéricos (normalmente no se tocan, solo se amplían si el destino lo pide): `PLACE_TYPE_META` y `CIRCLE_ICONS` (tipos de lugar: templo, monumento, museo, mercado, naturaleza, playa, café, actividad), `TRANSPORT_ICONS`, `TRANSPORT_TYPE_INFO`, `DOC_CATEGORIES`, `PACK_CATS`, `WEATHER_ICONS`, `WEATHER_ES`.

### 4.4 Estilos, plataforma e identidad

| Archivo / elemento | Qué cambiar |
|---|---|
| `css/styles.css` `:root` `--zone-*` | Colores de zona antiguos con comentarios de Vietnam (Koh Rong incluido). Los colores reales salen de `BLOCK_ZONE_COLORS`; ajustar o borrar estas variables al migrar |
| `css/styles.css` `.visa-vn`, `.visa-kh` | Estilo de las tarjetas de visado por país |
| `index.html` | `<title>`, `apple-mobile-web-app-title`, `theme-color` |
| `manifest.json` | `name`, `short_name`, `description` («Vietnam & Camboya 2026»), `start_url`, colores |
| `sw.js` | `BASE`, nombres de caché (Parte 3) |
| `tools/servidor_ruta_produccion.py` | `PREFIX` |
| `renderHome()` | «Marcos & Mery», «Mis viajes» (identidad) |
| `img/icon-192.png`, `img/icon-512.png` | Icono (opcional) |
| `CLAUDE.md` | Viaje, fechas, URL, repo, rutas del prefijo |
| `00_INSTALACION/LEEME_INSTALACION.md` | URL de instalación |

### 4.5 Imágenes y sus herramientas

| Elemento | Regla |
|---|---|
| `img/fotos/<slug>.jpg` | Una foto fija por ficha (lugar o plato), revisada a mano. Máximo 1,5 MB. Derechos claros (Wikimedia Commons con licencia libre, Pexels, o fotos propias) |
| `img/places/` | Portadas de días, ciudades y zonas |
| `tools/check_imagenes.py` | Debe dar OK antes de cada publicación |
| `tools/sin_foto.txt` | Fichas que se quedan sin foto a propósito (icono neutro). Mejor sin foto que con una que no corresponde |
| `tools/fotos_compartidas.txt` | Grupos de fichas que comparten foto a sabiendas |
| `CREDITOS_FOTOS.md` (raíz) | Autor y licencia de cada foto |

En un repo nuevo: vaciar `img/fotos/` e `img/places/`, vaciar los dos `.txt` y empezar `CREDITOS_FOTOS.md` de cero.

### 4.6 Documentación

`01_ESPECIFICACIONES` del repo nuevo empieza con: `MEMORIA_MAESTRA.md` (copiada y adaptada: la parte técnica sirve casi entera), `CONTINUIDAD.md`, `HISTORIAL_DE_CAMBIOS.md` y `COORDINACION_SESIONES.md` nuevos, y **esta guía** (actualizada con lo aprendido en la migración). Lo específico de Vietnam (`REVISION_ITINERARIO_MARIA.md`, auditorías de imágenes, `PALETA_COLORES.html`) se queda en el repo de Vietnam.

---

## PARTE 5 — CONTRATO DEL CONTENIDO (formatos y claves que enlazan)

La app no valida el contenido: si algo no cuadra, simplemente no lo muestra. Por eso estas reglas son obligatorias.

### 5.1 Claves que tienen que coincidir exactamente

```
day.block   ──► BLOCK_ZONE_COLORS, ZONE_META, BLOCK_ZONE, CULTURE_CARDS,
                WEATHER_DESTINATIONS[].blocks, FLIGHT_BLOCKS
day.city    ──► CITY_INFO / CITY_INFO_ALIAS / CITY_WIKI_ES (ciudad «limpia»), CITY_PHOTOS
hotel.name  ──► HOTEL_INFO
day.country ──► getCurrentCountry, estadísticas de países y noches, avisos de frontera,
                localEmergency[].country, contacts[].country
transport.from (vuelos) ──► FLIGHT_AIRPORT
transport.type ──► TRANSPORT_ICONS, TRANSPORT_TYPE_INFO (incluye car = «Traslado»), TRANSPORT_TIPS
place.type  ──► PLACE_TYPE_META, CIRCLE_ICONS
```

### 5.2 Formato de cada campo de un día

| Campo | Formato | Ejemplo |
|---|---|---|
| `date` | `AAAA-MM-DD`, días consecutivos sin huecos | `'2026-11-07'` |
| `city` | Nombre visible. Días de traslado: `'Origen → Destino'`. Aclaraciones entre paréntesis o con `/` (se quitan para buscar la ficha) | `'Hanói → Siem Reap'`, `'Tam Coc / Ninh Binh'` |
| `country` | Bandera + nombre. Día de frontera: `'🇨🇳 China → 🇻🇳 Vietnam'` (la noche cuenta en el país de destino) | `'🇰🇭 Camboya'` |
| `block` | Nombre de la zona; agrupa días seguidos | `'El Centro'` |
| `summary` | 1-2 frases | — |
| `places[]` | `name`, `type`, `lat`, `lng` (verificadas), `notes`, `photo` (`img/fotos/…`), `description`, `tips` | — |
| `restaurants[]` | Igual que `places` (pestaña «Qué comer») | — |
| `transport[]` | `type` (`flight`, `train`, `bus`, `ferry`, `car`, `tuktuk`, `boat`), `icon`, `from`, `to`, `time`, `km`, `details`, `ref` | Ver abajo |
| `hotel` | `name` (clave de `HOTEL_INFO`) y campos opcionales; `name: ''` si se duerme en un transporte | — |
| `tasks`, `notes` | Tareas del día y notas libres | — |

**Transportes, detalles que usa la lógica:**
- `time`: `'HH:MM'` o `'HH:MM–HH:MM'` (con raya «–», no guion). Si se llega al día siguiente, añadir `(+1)`: así lo detectan «Ahora/Siguiente», los avisos y la ficha «Sobre la ciudad».
- Un transporte que sale de madrugada después de otro del mismo día (p. ej. un vuelo a la 01:45 tras otro a las 18:30) se interpreta como de la madrugada siguiente.
- `details` con `'Salida: <lugar>.'` → es el punto de salida de «Cómo llegar».
- **Noche en un transporte:** `overnight: true` (recomendado) o «Sleeper» en `details` → avisos, noches por país y consejos de bus nocturno. Desde el 9-oct-2026 ya **no** basta con «nocturno» (daba falsos avisos).
- `km` aproximados → estadísticas.
- `ref: true` → tiene reserva: el localizador se apunta **en el móvil** («🔒 Añadir localizador»), nunca en el repo.

### 5.3 Otras reglas del contenido

- **Ids:** los elementos de `data.js` llevan ids sin 13 cifras al final; los que crea el usuario en el móvil llevan `Date.now()`. Así `mergeUserState` sabe qué conservar al subir `DATA_VERSION`.
- **Fechas:** siempre `today()`/`isoLocal()` (hora local); nunca `toISOString()`.
- **Emojis:** solo los que Windows 10 dibuja (en el móvil se ven todos, pero las pruebas se hacen en Windows). Prohibidos, entre otros: 🧭 🛕 🧳 🩺 🧣 🥿 🩴 🩱 🦟 🧴 🧢 🧦 🟢. Banderas: `flagText()`/`flagImg()` las convierten en imagen en Windows.
- **Privacidad (repo público):** nada de pasaportes, pólizas, localizadores, teléfonos o correos personales. Sí: teléfonos públicos de emergencia, embajadas y hoteles.
- **Idioma y tono:** español de España, cercano, «auténtico y callejero» (el estilo de viaje de Marcos y Mery), con datos prácticos comprobados (precios, horarios, fecha de la comprobación).
- **Fuente de verdad:** el documento final de itinerario de María. Para los lugares, las listas de Google Maps de Marcos (pedirle los enlaces; para leerlas enteras hace falta Claude en Chrome, el scroll automático y Takeout no sirven).

---

## PARTE 6 — PROCEDIMIENTO PASO A PASO

**Paso 0 — Cerrar el viaje anterior.** Publicar su último estado, `git tag viaje-<destino>-<año>` y `git push origin --tags`. Anotarlo en su `HISTORIAL_DE_CAMBIOS.md`.

**Paso 1 — Decidir la opción** (Parte 3, recomendada la A) y comprobar que la Fase 2 está hecha (almacenamiento y cachés con prefijo). Si no lo está, hacerla primero en el repo de origen.

**Paso 2 — Crear el repo nuevo.** Copiar motor e identidad: `index.html`, `manifest.json`, `sw.js`, `css/`, `js/`, `tools/`, `img/icon-*.png`, `CLAUDE.md`, `.gitignore`, esta guía y la Memoria Maestra. **No** copiar `img/fotos/`, `img/places/`, `02_DESARROLLO/` ni el historial de Vietnam. Seguir las reglas de git de `CLAUDE.md` (dos PCs: GitHub es el único punto de sincronización; nunca `git reset --hard`).

**Paso 3 — Plataforma.** `BASE` (`sw.js`), `start_url` (`manifest.json`) y `PREFIX` (`servidor_ruta_produccion.py`) con el nombre del repo; prefijos de almacenamiento y caché; `<title>`, `manifest` y `CLAUDE.md`.

**Paso 4 — Recoger las fuentes** antes de escribir nada: itinerario definitivo, reservas (sin localizadores), listas de Google Maps, visados y requisitos de entrada para pasaporte español (fuentes oficiales, con fecha), embajadas (exteriores.gob.es), teléfonos de emergencia, moneda y cambio, husos horarios (y si hay horario de verano en las fechas del viaje), enchufes, SIM, apps de transporte, clima medio del mes.

**Paso 5 — `data.js`.** El viaje, los días (contrato de la Parte 5), equipaje, tareas previas y con fecha, `contacts`, `localEmergency`. `DATA_VERSION = 1`.

**Paso 6 — `guia.js`.** Frases del idioma o idiomas del destino (con pronunciación para hispanohablantes, de fuentes contrastadas), tarjetas de cultura por bloque y la ficha de cada hotel.

**Paso 7 — Tablas del destino.** Hasta la Fase 2, una por una las de la Parte 4.3 en `app.js`; después de la Fase 2, en `js/destino.js`. Los colores de zona: pocos, que se distingan entre sí y con contraste ≥ 4,5:1 en claro y oscuro (preferencias de Marcos: nada de violetas, rosas ni terracotas/naranjas).

**Paso 8 — Fotos.** Una por ficha, verificada (que sea ese sitio de verdad), con su crédito. Las que no tengan buena foto, a `sin_foto.txt`. `py -3 tools/check_imagenes.py` debe dar OK.

**Paso 9 — Verificación** (todo debe pasar):
- [ ] Búsqueda de restos del destino anterior en `js/`, `css/`, `index.html`, `manifest.json`, `sw.js`: `grep -rniE "vietnam|camboya|cambodia|hanói|hanoi|jemer|khmer|VND|KHR|dong|riel|angkor|mekong|siem reap|phnom|shenzhen" js css index.html manifest.json sw.js` → solo puede quedar lo que sea a propósito.
- [ ] Ninguna clave huérfana: cada `block` tiene color, `ZONE_META`, `BLOCK_ZONE` y (si procede) tarjetas de cultura y tiempo; cada `hotel.name` está en `HOTEL_INFO`; cada ciudad tiene `CITY_INFO` y foto o está en `CITY_INFO_ALIAS`.
- [ ] Barrido a 375 px de todas las pantallas y **todos los días con todas sus pestañas**: 0 errores de consola, 0 imágenes rotas, 0 desbordes, 0 textos «undefined/NaN».
- [ ] «Viajar en el tiempo» por cada día: Hoy, «Ahora/Siguiente», avisos, conversor, frases y reloj correctos para el país de ese día.
- [ ] Contraste ≥ 4,5:1 en claro y oscuro (con el panel del navegador visible).
- [ ] Modo sin conexión con `tools/servidor_ruta_produccion.py`.
- [ ] La app de Vietnam, abierta en el mismo navegador después de la nueva, conserva sus datos y su modo sin conexión (prueba de la regla crítica).
- [ ] `check_imagenes.py` OK y ningún dato privado en el repo.

**Paso 10 — Documentar y publicar.** Memoria Maestra, Continuidad e Historial del repo nuevo; corregir esta guía con lo aprendido. Publicar solo cuando Marcos lo pida.

---

## PARTE 7 — PLAN PARA COMPLETAR EL SISTEMA

| Fase | Qué | Riesgo | Cuándo |
|---|---|---|---|
| **1. Guía e inventario** | Este documento | Ninguno | ✅ 9-oct-2026 |
| **2. Separar el contenido** | Sacar todas las tablas de la Parte 4.3 de `app.js` a un archivo nuevo `js/destino.js` **sin cambiar nada de lo que se ve**, y dar prefijo propio al almacenamiento y a las cachés (con migración de las claves antiguas). Probar con el barrido completo | Bajo si se hace con el barrido completo (cambio mecánico) | Cuando Marcos lo pida. Puede hacerse antes del viaje si hay tiempo para probarlo; si no, después |
| **3. Generalizar la lógica** | País por código (`country` con código ISO en los datos), noches por país para cualquier país, reloj con zonas horarias reales (`Intl`, `Europe/Madrid`, `Asia/Ho_Chi_Minh`…), visados y requisitos de frontera desde los datos, monedas del conversor desde los datos, tiempo de casa según el mes | Medio (toca lógica) | Después del viaje, o al empezar la migración |
| **4. Plantilla y comprobador** | Un «destino de prueba» mínimo (2-3 días inventados) para demostrar que no queda nada de Vietnam, y `tools/check_migracion.py`: busca restos y claves huérfanas (bloques sin color, hoteles sin ficha, ciudades sin texto…) | Bajo | Después del viaje |

Al terminar la Fase 4, migrar será: copiar el repo, cambiar el nombre del repo en tres sitios, reescribir `data.js`, `guia.js` y `destino.js`, poner las fotos y pasar el comprobador.

---

## PARTE 8 — BLOQUE PARA ARRANCAR UNA IA NUEVA

Copiar y pegar al empezar la migración:

> Vamos a reutilizar la app de viajes de Marcos y Mery (PWA vanilla HTML/CSS/JS en GitHub Pages, sin servidor) para un viaje nuevo a **[DESTINO]**, del **[FECHA]** al **[FECHA]**. Lee primero `01_ESPECIFICACIONES/GUIA_MIGRACION_DESTINOS.md` entera, luego `MEMORIA_MAESTRA.md` y `CLAUDE.md`. Sigue el procedimiento de la Parte 6 en orden y respeta el contrato de la Parte 5. Antes de publicar nada en `marcospenas.github.io`, comprueba que se cumple la regla crítica de la Parte 3 (almacenamiento y cachés con prefijo propio). El repo es público: nada de datos personales ni localizadores. Fuente del itinerario: **[DOCUMENTO]**. Documenta cada cambio en `01_ESPECIFICACIONES` y no publiques hasta que Marcos lo pida.

---

## REGISTRO DE CAMBIOS DE ESTA GUÍA

| Fecha | Cambio |
|---|---|
| 29-oct-2026 | v1.3: «Docs» pasa a «Info» (Mi viaje · Guía · Urgencias). Los visados salen de `app.js` (`visaSection` borrado) y van a `guia.js` (`TRIP_GUIDE`, tema «Fronteras y papeles»), con `EMERGENCY_HELP`, `EMERGENCY_EXTRA`, `GUIDE_REMINDERS` y `SUGGESTED_DOCS`. |
| 9-oct-2026 | v1.2: reloj con `CLOCK_HOME`/`CLOCK_DEST`, `overnight: true` en el contrato, texto del mes en el tiempo sin conexión. |
| 9-oct-2026 | v1.1: los consejos pasan de `app.js` (donde no se mostraban) a `guia.js` (`TRAVEL_TIPS`, Docs). |
| 9-oct-2026 | v1.0: tres capas, opciones de convivencia, regla crítica del almacenamiento compartido, inventario completo, contrato del contenido, procedimiento, plan en 4 fases |
