# Continuidad — App Viajes Marcos & Mery

**Actualizado:** 6 de octubre de 2026, mediodía (PC del trabajo)
**Sesión:** Claude Opus 5.5 (Claude Code)

---

## 👉 LEE ESTO PRIMERO (vigente)

**000000000. (6-oct-2026, noche, PC de casa) REVISIÓN PROFUNDA — hecho y SIN PUBLICAR.** Detalle en HISTORIAL 6-oct (PC de casa, noche): «Ahora/Siguiente» arreglado para el vuelo de madrugada del 29-nov y trayectos en curso, tiempo siempre en español, fechas de tareas corregidas, «✅» fuera de las Previas, 10 funciones muertas borradas. Barrido sin fallos. **Pendiente:** publicar cuando Marcos lo pida (`py -3 tools/check_imagenes.py` → OK) y repetir la auditoría de contraste con el panel del navegador visible (hoy dio lecturas falsas). Lo demás sigue igual: Lan Ha, pases de Angkor, fotos propias, localizadores en los móviles.

**00000000. (6-oct-2026, tarde, PC del trabajo) MEJORAS HECHAS Y PUBLICADAS (`50dde1f`, 6-oct noche) — leer primero.** Detalle en HISTORIAL 6-oct, 4ª parte. Hecho: «Ahora / Siguiente» en Hoy, avisos de hoy/mañana, centro de reservas en Docs, botón SOS, indicador sin conexión en Inicio, Wikipedia guardada para usar sin conexión, limpieza de la caché del SW, pines superpuestos, «Sobre la ciudad» con el destino el 22 y el 26, zoom, emojis que Windows no dibujaba, `DISH_WIKI` fuera, `.claude/` fuera del repo y **Memoria Maestra reescrita (v3.0)**. Además, **fallo serio corregido:** la fecha se calculaba en UTC y en Vietnam/Camboya de 00:00 a 07:00 la app creía que era el día anterior. Todo probado (barrido de 26 días, contraste, sin conexión). ~~Pendiente: publicar~~ ✅ publicado el 6-oct por la noche. Mejora opcional ofrecida a Marcos y sin hacer: que los tipos de cambio (fijos desde el 28-sep) se actualicen solos con conexión; si no, revisarlos a mano a principios de noviembre. Lo único que queda depende de Marcos/María (ver más abajo: Lan Ha, pases de Angkor, fotos propias, apuntar localizadores en los móviles).

**0000000. (6-oct-2026, PC del trabajo) REVISIÓN COMPLETA TERMINADA, SIN FALLOS CONOCIDOS.** Detalle en HISTORIAL 6-oct (dos partes).
- **Git: PUBLICADO el 6-oct desde el PC del trabajo** (`c376f15`, con todo lo del 5-oct y el 6-oct). El PC de casa debe hacer `git branch backup-5oct` + `git reset --mixed origin/main` y **no subir** sus commits del 5-oct (pasos en `COORDINACION_SESIONES.md`, bloque 🔴).
- **Localizadores de reservas:** ya no están en el repo (es público). Cada transporte con reserva tiene «🔒 Añadir localizador», que se guarda solo en el móvil. Los de vuelos y ferry se conservan solos al actualizar; los de buses y tren (Giant Ibis, tren Da Nang→Hue, sleeper Hue→Tam Coc, buses de Cat Ba) hay que apuntarlos a mano en cada móvil.
- **Hecho (1ª parte):** diccionario vietnamita/jemer y tarjetas culturales (nuevo `js/guia.js`), mini mapa con coordenadas, código muerto fuera, «Qué llevar» en 5 categorías, temporizadores de la portada, tiempo con la ruta real, conversor en Camboya, portadas 8,1 → 3,6 MB, accesibilidad, barra inferior en ordenador, favicon.
- **Hecho (2ª parte, pedido de Marcos):** los traslados en coche cuentan en las estadísticas (y 6 traslados que solo estaban en notas ya son transportes); fichas reales de los 12 hoteles (`HOTEL_INFO` en `guia.js`: dirección, teléfono, horarios, coordenadas, descripción, mapa); Mausoleo **abierto** el 8-nov; escala en Shenzhen **sin visado**; Wat Damnak; los 5 pines aproximados ya exactos; fichas «Sobre la ciudad» que se ocultaban o salían mal (Cat Ba, Hue, Shenzhen, 25-nov); descripciones de zona; banderas en Windows; `WIKI_ARTICLES` y portadas sin uso retiradas.
- **Verificado:** barrido de los 26 días, todas las pestañas, «Hoy» simulado, 12 fichas de hotel y todas las vistas (0 errores, 0 imágenes rotas, 0 desbordes), contraste claro/oscuro sin fallos, y **modo sin conexión probado** con `tools/servidor_ruta_produccion.py` (515 fotos sin conexión, 0 fallos). `py -3 tools/check_imagenes.py` → OK.
- **Solo queda lo que depende de Marcos/María:** (1) Lan Ha: excursión de 1 día o crucero 2D/1N (de eso depende la salida del Oversleep, 27 o 28); (2) comprar los 2 pases de Angkor; (3) fotos propias para las 22 fichas sin foto (se ve el icono neutro, es un acabado aceptable); (4) ~~publicar~~ ✅ publicado el 6-oct: abrir la app en cada móvil con wifi 1-2 veces, apuntar los localizadores de buses y tren, y probar el modo avión. Ideas futuras (Ahora/Siguiente, centro de reservas, alertas, SOS): no implementar sin que las pida.
- Restos inofensivos que se dejan a propósito: `DISH_WIKI` en `app.js` (tabla de fotos de platos ya sin uso; una comprobación automática de esa zona fue bloqueada por el sistema de permisos el 6-oct y se dejó para no forzarla) y 8 clases de HTML sin estilos propios (ganchos estructurales).

**000000. (5-oct-2026, madrugada, PC de casa) REVISIÓN GENERAL DE LA APP — PENDIENTES PARA LA PRÓXIMA SESIÓN (leer primero).**
Ya arreglado y publicado en local (sin push): estadísticas de km/transportes (usaban `window.TRIP_TRANSITS`, que no existía), zonas sin contar vuelos, noches por país (16 VN / 6 KH), fichas sin descripción, **las actualizaciones de datos ya no borran favoritos/notas/casillas** (`AppData.mergeUserState` en data.js, probado), botones «Cómo llegar / Favorito / Visitado» en cada lugar, mapa siguiendo el tema de la app y a toda altura, pestañas del día en una línea, **sección de emergencias** (salía vacía: `window.EMERGENCY_DATA` no existía) con la embajada de Hanói corregida (Le Hong Phong 4, emergencia 24h +84 93 633 3130) y Camboya cubierta por la Embajada en Bangkok + consulado honorario en Phnom Penh (lo de «gestiona desde Hanói» era falso), segundo repaso del anexo de María (~25 datos). Detalle en HISTORIAL 5-oct, 6ª parte.
**DETECTADO Y SIN ARREGLAR (por orden de importancia):** — **✅ 6-oct (PC del trabajo): puntos 1, 2, 3 y la «revisión sin terminar» hechos; el 6 resuelto pero pendiente de aplicar en `data.js` (ver bloque 0000000).**
1. **Datos perdidos de tres funciones**: `window.SURVIVAL_DICT` (diccionario de supervivencia en Ruta, `buildSurvivalDictHTML`), `window.GASTRO_BY_BLOCK` (gastronomía por zona: `buildFoodViewHTML`, `renderFood` y la pestaña `food` de Días, ~líneas 1646, 2493, 4053) y `window.CULTURE_CARDS` (tarjetas culturales en el Resumen del día, `buildCultureHTML`). No se definen en ningún sitio, así que esas secciones salen vacías sin avisar. Estaban en el commit inicial `bde33ca` (`git show bde33ca:<archivo>` / `git log -S "SURVIVAL_DICT ="`) → recuperarlos, revisarlos con el itinerario actual (ya no hay Koh Rong) y definirlos (en data.js o en un js aparte incluido en index.html y en `SHELL` de sw.js).
2. **Mini mapa de cada lugar** (`loadLugarMap(mapEl, placeName)`): busca la posición por el NOMBRE en vez de usar el `lat/lng` de la ficha → puede pintar el sitio en otro lugar. Pasarle las coordenadas.
3. **Código muerto** que confunde: el diseño «tnow» de `renderToday` (todo lo que hay tras el `return` del modo durante el viaje) y `buildHotelTimelineHTML` (sin llamadas). Borrar con cuidado.
4. Transportes en coche (`type: 'car'`) no cuentan en las estadísticas de transporte (solo vuelo, tren, bus y ferry); decidir si se añade una categoría.
5. **Pines aproximados**: Viet Hai, Ba Trai Dao, mercado de Tan An, isla de las clases de cocina (Thuan Tinh) y Callejón Colectivo Cũ (pedir coordenadas de Google Maps a Marcos).
6. Nota de Wat Damnak dice «Sede de Cambodian Living Arts»: sin verificar (lo verificado es el Center for Khmer Studies).
7. Contraste: solo las tarjetas de bloques ya pasados en Ruta quedan en 3,5-4,5:1 (atenuadas a propósito). Las banderas emoji salen como letras («KH») solo en Windows; en el móvil se ven bien.
8. Ideas (no implementar sin que Marcos lo pida): «centro de reservas» con todos los localizadores en una pantalla; resumen «Ahora / Siguiente» en Hoy; alertas; botón SOS.
**REVISIÓN SIN TERMINAR — falta revisar mañana:** notas libres, equipaje y tareas (añadir, borrar, marcar); modo «viajar en el tiempo»; conversor de moneda; tiempo sin conexión; service worker y modo offline (sw.js, precarga de fotos, manifest e iconos); vista Gastronomía (vacía, ver punto 1); pestaña «Qué comer» en detalle; precisión de los mini mapas; tamaño de las imágenes y rendimiento; accesibilidad (etiquetas de botones); vista en ordenador.
9. Pendiente de Marcos/María: Mausoleo el 8-nov, Lan Ha (excursión o crucero), comprar los 2 pases de Angkor, fotos propias de los 22 platos sin foto, **publicar** (`py -3 tools/check_imagenes.py` debe dar OK) y probar el modo sin conexión en un móvil.

**00000. (5-oct-2026, noche, PC de casa) CIERRE DE SESIÓN — leer primero.** Hecho hoy (detalle en HISTORIAL 5-oct, partes 1-5): itinerario definitivo de María integrado y repasado línea a línea (`REVISION_ITINERARIO_MARIA.md`); vuelta el 30-nov con bloque propio «Vuelta a casa»; 18 lugares opcionales en Siem Reap; ~60 pines del mapa corregidos; tabla única de colores de zona y contraste revisado con auditoría automática; acceso Hoy → Días con vuelta a Hoy; 207 de 229 fichas con foto. **Todo en local, 17+ commits SIN PUSH** — publicar solo cuando Marcos lo pida (`py -3 tools/check_imagenes.py` debe dar OK antes). **Pendiente de Marcos/María:** (1) ¿abre por dentro el Mausoleo de Ho Chi Minh el 8-nov?; (2) Lan Ha: excursión de 1 día o crucero 2D/1N, y reservar; (3) comprar los 2 pases de Angkor de 3 días; (4) coordenadas de Google Maps para Viet Hai, Ba Trai Dao, mercado de Tan An, isla de las clases de cocina y Callejón Colectivo Cũ (ahora aproximados); (5) fotos propias para las 22 fichas sin foto (sobre todo platos); (6) probar el modo sin conexión en un móvil real después de publicar.


**✅ (5-oct-2026) ITINERARIO DEFINITIVO DE MARÍA INTEGRADO — Y REPASADO LÍNEA A LÍNEA (todo su contenido está en la app; lista de errores, contradicciones y decisiones pendientes en `REVISION_ITINERARIO_MARIA.md`).** — ya no hay que esperar a que María termine el documento; la tarea de «volver a contrastar con el documento final» está hecha (ver HISTORIAL 5-oct, 2ª parte). El viaje ahora dura 26 días (5-30 nov). **Quedan abiertos (preguntar a Marcos):** (1) ~~noche del 20 al 21-nov sin alojamiento~~ ✅ resuelto: Villa Soleil es del 18 al 21 (errata del documento, confirmado por María); (2) ✅ pin de City of Ghosts corregido (16.360322, 107.712604, dato de Marcos); (3) ✅ el bus Chau Doc→Can Tho se compra allí y el correo de Trip del bus Hue→Tam Coc ya llegó (María, 5-oct); (4) decidir entre la excursión de 1 día y el crucero 2D/1N por Lan Ha (de eso depende la salida del Oversleep, el 27 o el 28).

**✅ HECHO (5-oct-2026, noche) — CONTRASTES Y COLORES COHERENTES EN TODA LA APP** (tabla única `BLOCK_ZONE_COLORS`; auditoría automática de contraste en claro y oscuro, antes y durante el viaje, sin fallos salvo las tarjetas de bloques ya pasados, atenuadas a propósito; ver HISTORIAL 5-oct, 5ª parte). Texto original de la tarea: La paleta en sí está aprobada (no cambiar los tonos elegidos), pero hay que: **(1) comprobar los contrastes que no se ven bien**, sobre todo en modo oscuro (quedan etiquetas pequeñas a 3,1-3,4:1; el aclarado `color-mix(... 38%, #fff)` de `[style*="--zc"]` al final de `styles.css`) y en claro con texto de color sobre fondo suave; revisar pantalla por pantalla en el navegador. **(2) que cada zona tenga el MISMO color en todas las partes de la app.** Hoy no pasa — hay varios mapas de colores en `js/app.js` que no coinciden: `ZONE_META` (~l.1735, Ruta), `ZONE_GRADIENTS` (~l.1763), `BLOCK_ZONE` (~l.2132, Días), `HTL_ZONE_COLORS` (~l.2366, Alojamiento), `BLOCK_COLORS` (~l.2561), `BLOCK_ZONE_COLORS` (~l.3160), el mapa de ~l.3915 y las variables `--zone-*` de `styles.css`. Diferencias ya vistas: **Norte** `#1A7B6B` vs `#2d6a4f` (Días) vs `#1a6e8a` (Alojamiento, que además se parece al azul del Centro); **Islas** `#0090C4` vs `#0077a8`/`#1a90b8`; **Cierre** `#6b7f3a` vs `#55672d`; **Camboya** `#b8861b` vs `#a8780f`. Delta del Mekong y Ninh Binh ya se unificaron el 5-oct. Lo ideal: una sola tabla de colores de zona en `app.js` que usen todas las pantallas. Actualizar `PALETA_COLORES.html` al terminar.

**0000. (3-oct noche, PC de casa) CIERRE DE SESIÓN — leer primero.** (a) **Publicado en producción** hasta `05e2559` (fotos congeladas, offline real, mejoras de modo oscuro/contraste). (b) **Local sin publicar:** cambio de paleta sin violetas/rosas/terracotas (`styles.css?v=84`, `app.js?v=148`) + `PALETA_COLORES.html` — hacer push cuando Marcos lo pida (ver HISTORIAL 3-oct, 4ª parte). (c) ~~**PENDIENTE FUTURO — REVISAR LAS PALETAS**~~ → **✅ 5-oct-2026: Marcos da la paleta por buena tal cual quedó el 3-oct, no tocar.** (Nota técnica no corregida: los bloques "Delta del Mekong" y "Ninh Binh" usan colores distintos según la pantalla — `ZONE_META`, `BLOCK_ZONE_COLORS`, `HTL_ZONE_COLORS` y el mapa de la línea ~2135 de `app.js` no coinciden.) Texto original: abrir `PALETA_COLORES.html`, confirmar/ajustar los colores nuevos (Centro azul acero `#2f6fa3`, Camboya ocre `#b8861b`, Cierre oliva `#6b7f3a`, categorías café/templo/otros), comprobar que las zonas se distinguen entre sí (Centro azul vs Islas turquesa; Camboya ocre vs Phnom Penh marrón) y repasar el contraste en oscuro (quedan etiquetas menores a 3,1-3,4:1). Preferencias de Marcos: **nada de violetas, rosas ni terracota/naranja**; en oscuro, tonos que no contrasten de más; texto gris con buen contraste. (d) **Resto de pendientes:** 22 fichas sin foto (`tools/sin_foto.txt`; ideal: fotos propias de Marcos/María), probar el offline en un móvil real tras abrir la app con wifi 1-2 veces, página de revisión visual de fotos (si la pide), ideas futuras (Ahora/Siguiente en Hoy, centro de reservas, alertas, SOS — «no implementar todavía»), Festival del Agua, volver a contrastar con el documento final de María. (e) **Antes de publicar siempre:** `py -3 tools/check_imagenes.py` debe dar OK.

**000. (3-oct tarde, PC de casa) FOTOS CONGELADAS — YA PUBLICADO en `main` (`e504cb2`).** Cada ficha usa solo su `photo` local fijo de `img/fotos/` (177 JPEG revisados a ojo uno a uno) o muestra el icono neutro si no hay foto fiable (22 fichas, lista en `tools/sin_foto.txt`; solución real: fotos propias de Marcos/María); se quitó la adivinanza por alias/IMAGE_MAP/Wikipedia para fichas y 11 fotos erróneas (una era aleatoria de picsum); además portadas de los 25 días con foto, `img/places/` podada a 19 archivos y `imageMap.js` eliminado (ver HISTORIAL 3-oct, 3ª parte). Créditos en `CREDITOS_FOTOS.md`; test previo a publicar `py -3 tools/check_imagenes.py` (debe dar OK; listas en `tools/sin_foto.txt` y `tools/fotos_compartidas.txt`). Pendiente: probar el offline en un móvil real (abrir con wifi 1-2 veces), fotos propias para las 22 fichas sin foto, y (si lo pide) página de revisión visual. Detalle en `HISTORIAL_DE_CAMBIOS.md` y `COORDINACION_SESIONES.md`.

**00. (3-oct, PC de casa) Git reconciliado y OFFLINE REAL arreglado.** (a) El repo de casa ya sigue a `origin/main` — no repetir el reset (ver `COORDINACION_SESIONES.md`). (b) **El service worker nunca había funcionado en producción** (`register('/sw.js')` daba 404 en GitHub Pages): reescrito `sw.js` + registro relativo + precarga diaria de fotos (`precacheCuratedPhotos` en `app.js`). Probado parando el servidor: app, datos, Leaflet y ~85% de fotos cargan offline (el resto son fichas sin foto real catalogadas). Los mosaicos del mapa solo offline donde se hayan visto antes con cobertura. **Todo esto está SIN PUSH** — para que llegue a los móviles hay que publicar, y los móviles necesitan abrir la app con wifi 1-2 veces. Detalle: `HISTORIAL_DE_CAMBIOS.md` 3-oct. También: el mapa ya tiene los 128/128 pines (3 coordenadas añadidas). Las tareas de "Qué comer 4-5 platos" y "Mapa offline" de la tabla de abajo están hechas (ver filas tachadas).

**0. Bug sistémico de fotos encontrado y corregido el 2-oct — si algo sigue viéndose en blanco, ya no debería ser este motivo.** La mayoría de "fotos que no cargan" que Marcos llevaba reportando NO eran huecos de contenido — eran un bug real en `makeCircle()` (app.js): los círculos de vista previa de "Qué ver"/"Qué comer" nunca pasaban el atributo `data-photo` al `<img>`, así que cualquier ficha con foto verificada directa (`photo:` en data.js) se veía en blanco ahí, aunque la misma foto cargara bien en la pestaña "Lugares" completa. Corregido, más 2 bugs del mismo patrón (botón "Ver restaurantes" no navegaba a ningún sitio; miniaturas de "Lugares" mostraban el icono nativo de "imagen rota" en vez de ocultarse). Además, ahora **cuando de verdad no hay foto disponible se muestra un icono de categoría gris neutro y apagado** (pedido explícito de Marcos: "que no llame la atención, que pase desapercibido"), nunca un círculo en blanco ni el icono de imagen rota del navegador. Ver `HISTORIAL_DE_CAMBIOS.md`, continuaciones 5 y 6 del 2-oct, para el detalle técnico completo. **Si Marcos reporta algo que sigue en blanco de verdad: probablemente es un hueco de contenido real (ya quedan ~35 catalogados, ver más abajo), no este bug — pero confirmar primero con un barrido en el navegador real antes de asumir nada, como se hizo aquí.**

**1. El mapa de la app YA NO depende de Google My Maps — está descartado por completo.** El documento "Vietnam" de My Maps nunca fue el mapa real de Marcos (lo creó una sesión anterior como contenedor para importar CSVs) y la mayoría de sus puntos nunca se geolocalizaron bien al importar. Ahora la pestaña "Mapa" es un **mapa Leaflet propio** con coordenadas reales (125/128 sitios geolocalizados vía Photon/OSM), pines por categoría, favorito/visitado persistente, y un botón "Cerca de mí" con **seguimiento en vivo** (punto azul que se mueve, no una foto fija). Si ves cualquier mención a "My Maps" o "iframe" en código o en bloques de más abajo de este archivo, está obsoleto — no tocar esa dirección, ver `HISTORIAL_DE_CAMBIOS.md` del 30-sep en adelante para el detalle.

**2. Auditoría formal de imágenes COMPLETADA el 1-oct, ampliada el 2-oct — las 102 `CHECK_MANUALLY` ya no existen, todas revisadas, y 8 de los `GENERIC_IMAGE`/`DUPLICATE` restantes ya tienen foto real también.** Resumen (ver `HISTORIAL_DE_CAMBIOS.md`, entradas del 1-oct y 2-oct, para el detalle completo):
- Catalogadas las 167 fichas (128 lugares + 39 restaurantes) y clasificadas por estado.
- **1-oct: 20 fotos realmente incorrectas corregidas**, 5 sitios dejados sin foto a propósito (Murales de Phùng Hưng, Mercado Ruso, Talleres Artesanales, Phare Circus, West Baray) — método de "hojas de contacto" (collages de miniaturas) para revisar las 102 `CHECK_MANUALLY` rápido.
- **2-oct: 8 fotos más** encontradas en Commons y aplicadas (Chợ nổi Cái Răng, Mercado Nocturno de Hội An, Old Quarter Hoi An, Bánh Mì Phượng, Montaña Sam, Calle del incienso de Thuy Xuan, Ngu Lam Peak, Bun Ca).
- **2-oct (continuación): 7 fichas más** cubiertas con fotos de **Pexels** (banco libre, sin problema de derechos) para los casos donde el hueco era un **concepto genérico** (plato o paisaje, no un lugar/marca concreto): Ốc, Dê (cabra, 2 fichas), Marisco (Da Nang/Cat Ba/último marisco, 3 fichas), Pueblos rurales de Siem Reap. Marcos pidió explícitamente buscar solución "aunque sea una foto de Google" — se aclaró que el repo es público (no privado) y se usó Pexels en su lugar por no tener problema de licencia.
- **Deliberadamente SIN foto (no es un hueco pendiente, es la decisión correcta):** ~24 fichas que son lugares o espectáculos concretos y reconocibles (Mercado Ruso, Phare Circus, Victoria Nui Sam Lodge, Ba Trai Dao, Viet Hai village, Talleres Artesanales, Murales de Phùng Hưng, etc.) — una foto de stock genérica los representaría tan mal como el alias equivocado que motivó esta auditoría. Probado con Phare Circus: una foto de "acróbata de circo" en Pexels no se parece en nada al espectáculo real. No forzar foto en estos casos.
- **IMPORTANTE — regenerar `AUDITORIA_IMAGENES_CLASIFICADA.json` después de CADA tanda de correcciones:** el 2-oct se descubrió que el JSON llevaba desactualizado desde una tanda sincronizada por MEGA. Antes de fiarte del JSON, comprueba contra `data.js` directamente si la ficha ya tiene `photo:` (que no sea `picsum.photos`, eso cuenta como "sin foto real").
- **Estado a media tarde del 2-oct:** `OK_VERIFIED` 48 + `OK_VERIFIED_THUMB` 87 + `GENERIC_IMAGE` 8 + `DUPLICATE` 14 + `PENDING_IMAGE` 10 = 167. **Tras la revisión plato a plato de la tarde (ver abajo), el total subió a 192 fichas** (se añadieron platos nuevos de "Qué comer" que no estaban en la auditoría original) — la mayoría ya con foto verificada, 16 siguen sin foto real encontrada (ver tarea pendiente más abajo).

**2-oct (continuación, revisión plato a plato pedida por Marcos): 13 fotos más**, tras comprobar uno por uno los 27 restaurantes que no resolvían imagen, con varias variantes de búsqueda por plato (ver `HISTORIAL_DE_CAMBIOS.md` continuación 7 para la lista completa).

**🔲 TAREA PENDIENTE — "el tema de las imágenes hay que dejarlo bien" (Marcos, 2-oct-2026):** quedan **16 platos sin foto real encontrada**, tras búsqueda exhaustiva con múltiples variantes de términos en Commons (y Pexels para los genéricos): Khmer Red Curry (Kari Sach Moan), Lẩu Mắm, Khô Cá Lóc, Cơm Gà Hội An, Hoành Thánh Chiên, Bánh Đập (se encontró un archivo con ese nombre pero era una ilustración dibujada, no una foto real — descartado), Bún Mắm Nêm, Chè Huế, Bánh Ép, Vả Trộn, Nem Chua Yên Mạc, Rượu Kim Sơn, Cá Rô Tổng Trường, Tu Hài Nướng, Bề Bề Rang Muối, Comida casera en Viet Hai. Son platos muy regionales/hiperlocales sin cobertura en bancos de imágenes libres. **Antes de repetir la búsqueda en Commons/Pexels (ya intentado a fondo), probar:**
- Buscar directamente en Google Images o Instagram/TripAdvisor el nombre del plato + "Vietnam"/"Cambodia" para localizar una foto con licencia reutilizable que Commons no tenga indexada
- Si Marcos tiene o puede conseguir una foto propia de algún viaje anterior o de un blog con licencia clara, usarla
- Como último recurso aceptable (ya decidido que NO vale una foto genérica que no sea el plato real): dejarlo con el icono de categoría neutro, que ya no se ve "roto" desde el fix del 2-oct — esto es un acabado aceptable, no un bug

Además, siguen ~24 fichas de LUGARES (no platos) en `GENERIC_IMAGE`/`DUPLICATE`/`PENDING_IMAGE` — la mayoría ya confirmadas "sin foto real disponible que no induzca a error" tras varias búsquedas (1-oct y 2-oct). Si Marcos navegando la app ve algo raro en un sitio `OK_VERIFIED_THUMB`, decir cuál para mirarlo a resolución completa.

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

App **publicada y al día en producción** desde el 2-oct-2026 — el itinerario de 25 días completo, el mapa Leaflet, la auditoría de imágenes y el bug de `data-photo` corregido ya están en GitHub Pages. El token de GitHub que bloqueaba el push está revocado y confirmado.

`.git` NO se sincroniza entre los dos PCs vía MEGA (ver Parte 12 de `MEMORIA_MAESTRA.md`) — cada PC tiene su propio repo local:

- **PC del trabajo** (`C:\Users\mpe.HP2008\...`): rama `main` == `origin/main` (comprobar con `git log --oneline -3`, debería coincidir con el remoto salvo commits muy recientes de esta misma sesión)
- **PC de casa** (`C:\Users\marco\...`): historial propio desactualizado, independiente del remoto. **Pendiente**: en su próxima sesión, resetear contra `origin/main` (`git fetch origin && git reset --hard origin/main`) en vez de intentar mezclar o pushear su historial local — ver `COORDINACION_SESIONES.md` para el detalle completo

- URL: https://marcospenas.github.io/viajes-marcos-mery
- Repo: https://github.com/MarcosPenas/viajes-marcos-mery (público)
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
| ~~Ampliar "Qué comer" a 4-5 platos/día~~ | ✅ Hecho (29-sep a 2-oct): 84+ platos en 25 días (4 por día en la mayoría; 2-3 en días de bus/vuelo), fotos revisadas plato a plato — quedan 16 hiperlocales sin foto real (ver tarea de imágenes arriba) |
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
| ~~Contenido rico de Hue, Tam Coc/Ninh Binh y Cat Ba~~ | ✅ Hecho el 2-oct-2026 — resultó que la mayoría del bloque (días 21-29) ya tenía contenido de sesiones anteriores (29-sep a 1-oct); solo quedaban 4 huecos reales. Investigados con WebSearch y rellenados: Mercado nocturno de Dong Ba, Paseo junto al río Perfume (Hue, día 22-nov), Atardecer en Flamingo Cat Ba Resort (día 26-nov), Ba Trai Dao (día 27-nov, con aviso de que la playa solo es visible 2-4h/día en marea baja). "Sitios pendientes del Old Quarter" (día 29-nov) se dejó sin description/tips a propósito — es un cajón de sastre genérico, no un sitio concreto. Ver `HISTORIAL_DE_CAMBIOS.md`, entrada 2-oct |
| Descargar/verificar imágenes reales | Los sitios nuevos dependen del fallback en vivo (Wikipedia/Commons) para la foto — funciona pero no está verificado uno a uno. Cuando el contenido esté más maduro, hacer una pasada de descarga a `img/places/` como se hizo en la auditoría del 7-sep-2026 (ahora obsoleta, era sobre la ruta vieja) |
| ~~Regenerar/revocar token de GitHub~~ | ✅ Hecho el 2-oct-2026 — token "viajes" (scope `repo`) revocado por Marcos en https://github.com/settings/tokens, confirmado en pantalla |
| ~~Subir a GitHub desde el PC del trabajo primero~~ | ✅ Hecho el 2-oct-2026 — `origin/main` en `81c5a1d` y commits posteriores, itinerario de 25 días publicado en https://marcospenas.github.io/viajes-marcos-mery. **Pendiente del PC de casa**: resetear contra `origin/main` en su próxima sesión (ver `COORDINACION_SESIONES.md`) |

### 🟡 MEDIA prioridad (antes del viaje — noviembre 2026)

| Tarea | Acción |
|---|---|
| ~~Actualizar tasas de cambio~~ | ✅ Hecho 28-sep-2026 (VND 29.600, KHR 4.630, USD 1,14/€) |
| Verificar instalación en iOS Safari | Probar en iPhone: Safari → compartir → "Añadir a pantalla de inicio" |
| ~~Mapa offline~~ | ✅ Hecho el 3-oct-2026 (sin push aún) — SW reescrito, Leaflet cacheado, fotos precargadas. Mosaicos solo offline donde se hayan visto antes con cobertura (política de OSM). **Pendiente tras publicar:** probar en un móvil real (modo avión) |

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
- `.git` NO se sincroniza entre el PC del trabajo y el de casa vía MEGA (`.megaignore` excluye archivos ocultos) — cada PC tiene su propio repo y commit local. Comprobar `git log --oneline -5` en la máquina en la que estés antes de hacer push o asumir el estado del repo (ver Parte 12 de la Memoria Maestra)
- El token de GitHub expuesto ya se quitó de `CLAUDE.md` (8-sep-2026), se limpió del historial git (2-oct-2026) y **ya está revocado** (confirmado por Marcos, 2-oct-2026) — este incidente está cerrado del todo
- Documentar cada cambio en `HISTORIAL_DE_CAMBIOS.md` y `CONTINUIDAD.md` a medida que se hace, no solo al cerrar la sesión
- Si hay un `Mejoras.txt` en la raíz con entradas pendientes: al aplicar una, moverla a `HECHAS` con `[COMPLETADO <fecha>]` y una línea `->` explicando qué se hizo — nunca borrarla, eso lo hace Marcos a mano

---

## Cómo arrancar el trabajo en la nueva sesión

1. Leer **`COORDINACION_SESIONES.md` primero** (estado activo entre los dos PCs), luego este archivo (sobre todo el bloque "LEE ESTO PRIMERO" de arriba) y `MEMORIA_MAESTRA.md` si hace falta más contexto
2. Comprobar que la app sigue funcionando: http://localhost:3000 (arrancar servidor) — la de producción (https://marcospenas.github.io/viajes-marcos-mery) **ya está publicada y al día** desde el 2-oct-2026 (itinerario de 25 días, mapa Leaflet, auditoría de imágenes, bug de data-photo corregido). Si algo no coincide entre local y producción, GitHub Pages puede tardar unos minutos en reconstruir tras el último push — refrescar con caché vacía antes de investigar un bug
3. Pedir a Marcos que confirme qué tarea quiere abordar primero
4. Lo más probable, por orden de lo que quedó pendiente el 2-oct-2026 (ver tabla de "Tareas pendientes" más abajo):
   - Las **16 fotos de platos sin encontrar** (tarea 🔲 marcada arriba en "LEE ESTO PRIMERO") — ya se intentó a fondo en Commons/Pexels, el siguiente paso sería Google Images/Instagram con licencia reutilizable o una foto propia de Marcos
   - **Ampliar "Qué comer" a 4-5 platos/día** donde todavía falte
   - Contrastar el contenido cuando María termine su documento .odt (sigue sin terminar, no era la versión definitiva)
   - Si Marcos trabaja desde el PC de casa: lo primero de todo, **resetear ese repo contra `origin/main`** (ver aviso 🔴 en `COORDINACION_SESIONES.md`) antes de tocar nada más

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
