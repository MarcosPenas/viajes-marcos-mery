# Coordinación entre sesiones (PC trabajo ↔ PC casa)

Este archivo es un **tablón de estado activo**, no un histórico — a diferencia de `HISTORIAL_DE_CAMBIOS.md` (que registra qué se hizo y cuándo, cronológico, nunca se borra), aquí solo importa **el estado actual**: qué sesión está haciendo qué ahora mismo, qué decisiones están pendientes de coordinar entre las dos máquinas, y qué bloqueos hay. Se sobrescribe, no se acumula.

**Por qué existe:** `.git` no se sincroniza entre los dos PCs vía MEGA (ver Parte 12 de `MEMORIA_MAESTRA.md`), así que cualquier sesión de Claude Code en cualquiera de las dos máquinas debe leer esto **antes** de tocar git (push, reset, etc.) o de dar por hecho el estado del repo — y escribir aquí antes de hacer algo que el otro PC necesite saber.

**Regla para cualquier sesión (en cualquier PC):**
1. Leer este archivo al empezar la sesión, no solo `CONTINUIDAD.md`
2. Antes de un `git push`/`git reset`/cambio de rama: comprobar aquí si el otro PC tiene algo pendiente o en curso
3. Después de una acción que afecte al otro PC (push, cambio de decisión, bloqueo nuevo): actualizar este archivo en el mismo momento, no al final de la sesión
4. Si encuentras una sección con una fecha/sesión distinta a la tuya y no cuadra con lo que esperabas, decírselo a Marcos explícitamente antes de asumir nada

**⚠️ Nota del 29-sep-2026:** este archivo se quedó desactualizado durante la sesión maratoniana del 28-sep en el PC de casa (no se tocó pese a que `CONTINUIDAD.md` de esa sesión decía que sí) — seguía hablando de "esperando el token" cuando ya había 5 commits nuevos sin mencionar aquí. Si vas a hacer cambios largos de git, actualiza esto aunque estés concentrado en otra cosa.

---

## 🟠 6-oct-2026 (después de publicar) — Cambios NUEVOS SIN PUBLICAR en el PC del trabajo

Tras la publicación de abajo, el PC del trabajo hizo más cambios (HISTORIAL 6-oct, 4ª parte): `js/app.js`, `js/data.js` (`DATA_VERSION` 87, solo emojis de «Qué llevar»), `js/guia.js`, `css/styles.css`, `index.html`, `sw.js`, `.gitignore`, docs y `.claude/launch.json` sacado del repo (`git rm --cached`, el archivo local sigue). **Sin commit todavía**: los commitea y publica el PC del trabajo cuando Marcos lo pida. **El PC de casa no debe editar estos archivos hasta entonces** (o, si lo hace, avisar aquí antes). Cuando se publique, el PC de casa sigue los mismos pasos de abajo (`reset --mixed`, nunca `--hard`); su `.claude/launch.json` local no se toca.

---

## 🔴 6-oct-2026 (tarde) — PUBLICADO DESDE EL PC DEL TRABAJO: `origin/main` = `c376f15` (+ commit de documentación). EL PC DE CASA NO DEBE HACER PUSH DE SUS COMMITS DEL 5-OCT

Marcos pidió publicar desde el PC del trabajo. Como los commits del 5-oct solo existían en casa, el PC del trabajo hizo **un único commit (`c376f15`) con el estado completo de los archivos de MEGA**: todo lo del 5-oct (paleta, itinerario definitivo de María, etc.) + todo lo del 6-oct. El contenido es el mismo; lo que no está en GitHub es el desglose en 17+ commits del 5-oct (sigue en el repo local de casa; el detalle está en `HISTORIAL_DE_CAMBIOS.md`). Push normal, sin `--force`. Antes de publicar se **quitaron los localizadores de reservas** del repo (ver HISTORIAL 6-oct, 3ª parte).

**Para el PC de casa, en su próxima sesión (antes de tocar nada):**
1. `git branch backup-5oct` (conserva su historial detallado del 5-oct).
2. `git fetch origin && git reset --mixed origin/main` — **nunca `--hard`**. Los archivos de disco (MEGA) ya son los publicados.
3. `git checkout -- .gitignore` — MEGA no sincroniza archivos que empiezan por punto; el de GitHub ya incluye la excepción para `tools/servidor_ruta_produccion.py`.
4. `git status` debería quedar limpio (salvo `.claude/`, que es local de cada PC). Si sale algo más, es trabajo hecho en casa después del 6-oct: revisarlo antes de commitear.
5. **No hacer push de los commits del 5-oct** (su contenido ya está publicado; subirlos crearía un historial divergente).

**Para los móviles:** al abrir la app con cobertura se actualiza sola (`DATA_VERSION` 86). Los localizadores de vuelos y ferry que ya tenían se conservan; los de buses y tren hay que apuntarlos en cada transporte («🔒 Añadir localizador»).

---

## ✅ (resuelto por el bloque 🔴 de arriba) 6-oct-2026 — El PC del TRABAJO había cambiado archivos SIN COMMIT, también `data.js`

**Qué ha pasado:** dos sesiones seguidas en el PC del trabajo (detalle en `HISTORIAL_DE_CAMBIOS.md`, 6-oct, 1ª y 2ª parte): pendientes de la revisión del 5-oct, traslados en las estadísticas, fichas reales de los hoteles y barrido completo sin fallos. Archivos tocados: `js/app.js`, `css/styles.css`, `index.html`, `sw.js`, **`js/data.js`** (traslados, pines, Mausoleo, Shenzhen, Wat Damnak; `DATA_VERSION` 85), **`js/guia.js` (nuevo)**, **`tools/servidor_ruta_produccion.py` (nuevo)**, `img/places/` (9 portadas reducidas de peso y 8 sin uso movidas a `02_DESARROLLO/IMAGENES_ANTERIORES/places_retiradas_6oct/`) y los `.md` de `01_ESPECIFICACIONES`. **Nadie ha tocado `data.js` en casa desde el 5-oct 22:16** (comprobado por fecha antes de editarlo), así que no hay choque: el `data.js` de MEGA es el del 5-oct + lo del 6-oct.

**Git en el PC del trabajo:** NO se hizo commit (los commits del 5-oct solo existen en casa y no se pueden reconstruir aquí). Su `main` se movió con `git reset --mixed origin/main` (rama de respaldo `backup-work-6oct` en `599f20a`): historial = `origin/main` (`05e2559`), archivos = lo que hay en MEGA.

**Para el PC de casa, en su próxima sesión:**
1. **No empezar a editar nada antes de commitear lo del 6-oct.** `git status`: los cambios aparecerán como modificaciones encima de sus commits del 5-oct. Revisar el diff y commitearlos allí: `git add -A` + `git add -f tools/servidor_ruta_produccion.py` (los `.py` están en `.gitignore`). Las 8 portadas movidas saldrán como borradas en `img/places/`: es intencionado.
2. ~~Aplicar en `data.js` la corrección de Wat Damnak~~ → ya hecho en el PC del trabajo (2ª parte).
3. Cuando Marcos pida publicar: `py -3 tools/check_imagenes.py` (hoy da OK), opcionalmente la prueba sin conexión con `tools/servidor_ruta_produccion.py` (instrucciones dentro del archivo), y push desde casa (es quien tiene el historial completo).

**Para el PC del trabajo, la próxima vez:** antes de tocar nada, `git fetch origin`. Si casa ya publicó, **`git reset --mixed origin/main`** (no `--hard`: MEGA ya habrá traído los archivos y `--hard` los pisaría con versiones viejas). Si no ha publicado, no commitear aquí: trabajar sobre los archivos y dejarlo anotado en este tablón.

---

## 🟡 5-oct-2026 — MUCHOS cambios LOCALES sin publicar en el PC de casa (itinerario definitivo de María)

`main` local del PC de casa va **por delante de `origin/main`** con la paleta del 3-oct y todo el trabajo del 5-oct: itinerario definitivo de María integrado y repasado línea a línea, vuelta el 30-nov, 18 lugares opcionales en Siem Reap, ~60 pines del mapa corregidos, `data.js?v=84`, `app.js?v=166`, `styles.css?v=92` (revisión general de la app de la madrugada del 6-oct incluida). **Sin push** (Marcos aún no lo ha pedido). ~~El PC del trabajo NO debe tocar `js/data.js` hasta que esto se publique~~ → el 6-oct sí lo tocó, sin commitear (el riesgo era de choque de commits, no de archivos): ver bloque 🟠 de arriba. Detalle en `HISTORIAL_DE_CAMBIOS.md` (5-oct, partes 1-4) y `REVISION_ITINERARIO_MARIA.md`.

---

## 🟡 3-oct-2026 (noche) — Cambios LOCALES sin publicar en el PC de casa (paleta)

Tras el push `05e2559` quedaron en `main` local (sin push, Marcos aún no lo ha pedido): `PALETA_COLORES.html` y el cambio de paleta (sin violetas/rosas/terracotas; `styles.css?v=84`, `app.js?v=148`). Si el PC del trabajo toca colores/CSS de zonas, coordinar antes. ~~Pendiente futuro: revisar las paletas~~ → **✅ 5-oct-2026: Marcos aprueba la paleta tal cual.**

---

## ✅ 3-oct-2026 (tarde) — PUBLICADO: `origin/main` = `e504cb2` (fotos congeladas + offline + mejoras visuales)

El PC de casa hizo **push a `main`** (avance rápido, sin `--force`) y la web está en producción con `data.js?v=65`, `app.js?v=147`, `styles.css?v=83`. Incluye: service worker offline real, fotos congeladas (`img/fotos/`, 177 JPEG; cada ficha con foto fija o baldosa de categoría), `CREDITOS_FOTOS.md`, `tools/check_imagenes.py`, portadas de los 25 días, poda de `img/places/` (19 archivos), `imageMap.js` eliminado y mejoras de contraste/tarjetas en modo oscuro. Detalle en `HISTORIAL_DE_CAMBIOS.md` (3-oct, partes 1-3).

**Para el PC del trabajo:** su `main` local (`81c5a1d` y similares) ya no coincide con el remoto — ~~antes de tocar nada: `git fetch origin && git reset --hard origin/main`~~ **(corregido 6-oct: usar `--mixed`, nunca `--hard`, porque MEGA ya trae los archivos nuevos y `--hard` los pisaría; hecho el 6-oct, ver bloque 🟠 de arriba)**. **Antes de cada publicación futura, ejecutar `py -3 tools/check_imagenes.py` (debe dar OK).** No usar `IMAGE_MAP`/alias de `WIKI_ARTICLES` para fichas: ya no existen para ellas. La rama `fotos-congeladas` del PC de casa está fusionada en `main` (se puede borrar).

---

## ✅ 3-oct-2026 — PC de casa YA reconciliado con `origin/main` (no repetir el reset)

Sesión del PC de casa del 3-oct: el repo local de casa no tenía remoto configurado y su historial era independiente. Pasos hechos (sin perder nada): instantánea local de los archivos tal y como llegaron por MEGA (rama de respaldo `backup-3oct` en el repo de casa), `git remote add origin` + `git fetch`, comprobado que el árbol de trabajo era **idéntico a `origin/main`** (`599f20a`) salvo `.claude/*`, y `git reset --mixed origin/main` (mueve el historial, no toca archivos). Resultado: `main` de casa sigue ahora a `origin/main` y los siguientes pushes serán normales (sin `--force`). **No hay que volver a hacer el reset en casa.** `.claude/launch.json` de casa apunta a `C:\Users\marco\...` y `.claude/settings*.json` son locales — no commitear. El `.gitignore` se dejó el del repo publicado.

**Cambios nuevos de esta sesión (aún sin push, pendientes de que Marcos lo pida):** service worker offline reescrito y por fin registrado (ver `HISTORIAL_DE_CAMBIOS.md` 3-oct), 3 sitios con coordenadas nuevas en el mapa (`DATA_VERSION` 63). Si el PC del trabajo toca `sw.js`, `index.html` (registro del SW) o `js/app.js` (`precacheCuratedPhotos`), coordinar aquí antes.

---

## 🔴 (HISTÓRICO, ya resuelto arriba) Push hecho el 2-oct-2026, hashes de commit CAMBIADOS, PC de casa debe resetear

**El PC del trabajo publicó a GitHub el 2-oct-2026.** `origin/main` ya NO está en `c8d9eb5` (29-jun) — ahora está en `81c5a1d`. La app en producción (https://marcospenas.github.io/viajes-marcos-mery) debería reflejar el itinerario de 25 días con el mapa Leaflet y la auditoría de imágenes en los próximos minutos (GitHub Pages tarda un poco en reconstruir tras el push).

**Antes de pushear hubo que reescribir el historial local (`git filter-branch`)** porque GitHub bloqueó el push (push protection) al detectar un token real de GitHub expuesto en 3 commits antiguos (`MEMORIA_MAESTRA.md`/`CLAUDE.md`) — token que llevaba semanas documentado como "pendiente de regenerar" sin haberlo hecho nunca. Se redactó el token de todos los commits (sin necesidad de verlo, solo con un patrón `ghp_...`) y se purgaron los blobs antiguos del repo local. **Esto significa que TODOS los hashes de commit de este PC cambiaron** respecto a lo que decía este archivo antes (`05d59e7`, `c028ae8`, etc. ya no existen con esos hashes) — el nuevo historial es equivalente en contenido pero con hashes nuevos desde el principio.

**Para el PC de casa, la próxima vez que se abra una sesión ahí:** no intentar hacer push ni merge con el historial local de casa — resetear directamente contra `origin/main` (`git fetch origin && git reset --hard origin/main`), como ya decían las "Decisiones ya tomadas" de más abajo. Si se quiere conservar el historial local de casa por si acaso, crear una rama de respaldo antes (`git branch backup-2oct`).

~~**Pendiente urgente, todavía sin confirmar:** el token de GitHub que causó el bloqueo sigue sin revocar~~ → **✅ Revocado el 2-oct-2026**, confirmado por Marcos en pantalla (token "viajes", scope `repo`, borrado en https://github.com/settings/tokens). No queda ninguna credencial viva expuesta de este incidente.

---

## 🟢 Nada en curso ahora mismo

Última sesión activa: **PC del trabajo, 2-oct-2026** — además del push de arriba:

0. **Bug sistémico de fotos en blanco encontrado y corregido** (`makeCircle()` en app.js no pasaba `data-photo` al `<img>` de los círculos de vista previa) — ver `CONTINUIDAD.md` punto 0 de "LEE ESTO PRIMERO" y `HISTORIAL_DE_CAMBIOS.md` continuaciones 5-6 del 2-oct. Si el PC de casa ve círculos en blanco que no cuadran con esto, comprobar primero si ya se sincronizó este fix antes de investigar desde cero.

Lo de **1-oct** sigue vigente:

1. **Mapa propio con Leaflet, My Maps abandonado del todo** (ver `CONTINUIDAD.md` punto 1 de "LEE ESTO PRIMERO" y `HISTORIAL_DE_CAMBIOS.md` del 30-sep en adelante). Si el PC de casa tiene algo relacionado con `trip.myMapsUrl` o el iframe de My Maps en curso, está obsoleto — avisar a Marcos antes de seguir por ahí.
2. **Auditoría formal de imágenes completada** (167/167 fichas catalogadas y clasificadas en 6 estados — `01_ESPECIFICACIONES/AUDITORIA_IMAGENES.json` y `AUDITORIA_IMAGENES_CLASIFICADA.json`, nuevos). **No se ha corregido ninguna imagen todavía** — es el paso previo, pendiente de que Marcos confirme ir revisando una por una. **Si el PC de casa va a tocar fotos de sitios, leer primero `AUDITORIA_IMAGENES_CLASIFICADA.json`** para no pisar este trabajo ni duplicar esfuerzo — contiene el estado real (verificado/genérico/duplicado/sin comprobar) de cada una de las 167 fichas.

**Antes de esto (PC del trabajo, 30-sep-2026):** reconciliación tras la sincronización MEGA con la sesión maratoniana del PC de casa de la noche anterior (29-sep). al empezar esta sesión, `git status` mostró `js/data.js`, `js/app.js`, `css/styles.css` y los `.md` modificados en disco sin commits correspondientes aquí — vuestros cambios de anoche llegaron por MEGA (los archivos, no el git). Se encontraron **28 fichas del itinerario sin ninguna foto que cargara**, causadas porque renombrasteis varias entradas en `data.js` (con sufijos descriptivos) y actualizasteis sus alias en `WIKI_ARTICLES` a juego, pero el `data.js` que llegó aquí se quedó con los nombres cortos originales — desajuste entre archivo y alias. Corregido añadiendo alias nuevos con el nombre EXACTO que hay en el `data.js` de este PC (ver `HISTORIAL_DE_CAMBIOS.md`, entrada de 30-sep, para el detalle completo y la lista de las 28). **De paso, encontrado un bug en vuestro propio fix de anoche:** el alias `'Ruta de playas Cat Co (1, 2 y 3)': 'Cát_Bà_island'` usa un artículo de Wikipedia con tildes que no existe — el real es `Cat_Ba_Island` sin tildes. Si seguís usando el nombre con sufijo en vuestra copia, corregidlo también ahí.

**Antes de esto (PC de casa, 29-sep noche):** sesión larga, encima de todo el trabajo de la mañana del PC del trabajo. Lo más importante: **causa raíz de los problemas de contraste en oscuro** (dos bloques de CSS de tema independientes) y un **bug estructural de fotos duplicadas** — 27 alias de Wikipedia compartidos entre sitios reales distintos en `WIKI_ARTICLES`, encontrados con un script y corregidos (ver `HISTORIAL_DE_CAMBIOS.md`, continuación 16). También: contenido de María completado para Hoi An/Da Nang/Chau Doc/Can Tho, barrido de `notes: ''` vacíos, criterio de relevancia turística aplicado a 3 de las 7 listas de Google Maps de Marcos, y varios fixes de UI. **Encontrado y reportado a Marcos (no es bug de la app):** su My Maps está compartido en modo restringido, por eso el iframe de "Mapa" se ve en blanco — necesita cambiarlo él a "Cualquier usuario con el enlace". Commits en el PC de casa desde `cb9c4d1`: `4dc5851`, `50d078c`, `ff3a2ba`, `a11a793`, `be0aeb2`, `4e2294e`, `c90a8b5`, `96251fc`, `82a6ccb`, `17dbb58`, `7144ae4`, `2822ec7`, `d48f9a4`. Ver `HISTORIAL_DE_CAMBIOS.md`, continuaciones 10-16, para el detalle completo.

**Working tree de este PC limpio tras la reconciliación, sin bloqueos activos.** La tabla de "Estado de los repos git locales" de abajo sigue desactualizada — refrescar con `git log --oneline -20` en cada PC antes de decidir nada sobre push. **Patrón a vigilar:** las dos últimas sesiones (PC casa 29-sep noche, PC trabajo 30-sep) han tocado las MISMAS zonas del código (`WIKI_ARTICLES`, fotos de sitios) en paralelo sin coordinarse — si esto se repite, valdría la pena que cada sesión anuncie aquí qué área va a tocar antes de empezar, no solo al terminar.

**Decisión de ritmo vigente (Marcos, 28-sep-2026):** acumular cambios en local ~1 semana antes de publicar a GitHub/producción. No pushear por iniciativa propia — solo cuando Marcos lo pida explícitamente.

---

## Últimos pushes a GitHub

| Fecha | PC | Commit subido | Notas |
|---|---|---|---|
| 6-oct-2026 | Trabajo | `c376f15` (+ documentación) | Todo lo del 5-oct (de casa, por MEGA) y del 6-oct en un commit; localizadores fuera del repo. Avance rápido desde `05e2559` |
| 3-oct-2026 | Casa | `e504cb2` | Fotos congeladas + offline real + mejoras de modo oscuro (ver bloque ✅ de arriba). Avance rápido desde `599f20a` |
| 2-oct-2026 | Trabajo | `81c5a1d` | Primer push real del itinerario de 25 días — mapa Leaflet, auditoría de imágenes, bug de data-photo corregido. Historial local reescrito antes del push para quitar un token expuesto (ver aviso 🔴 arriba) |

---

## Estado de los repos git locales (comprobar con `git log --oneline -5` — esto puede quedar desactualizado)

| PC | Rama | Último commit local | ¿Desciende del remoto real? |
|---|---|---|---|
| Trabajo (`C:\Users\mpe.HP2008\...`) | `main` | == `origin/main` (publicado el 6-oct) | Sí, es el remoto |
| Casa (`C:\Users\marco\...`) | `main` | `05e2559` + 17+ commits del 5-oct **que NO deben subirse** | **Debe hacer `reset --mixed origin/main`** (ver bloque 🔴) |

---

## Decisiones ya tomadas (no reabrir sin motivo)

- El PC del trabajo sube primero a GitHub (su historial no necesita `--force`)
- El PC de casa resetea su repo local contra `origin/main` después, en vez de fusionar los dos historiales
- El token de GitHub no se guarda en ningún archivo del repo (ni `.md`, ni `.claude/`) — se usa solo en el momento del push
- ~~(28-sep-2026) No hay prisa por publicar — acumular ~1 semana en local primero~~ → **Superado el 2-oct-2026**: Marcos pidió explícitamente publicar, y se hizo (`81c5a1d`). A partir de ahora, cada sesión decide si pushear según lo que diga Marcos en esa sesión, no según esta nota antigua
- **(29-sep-2026)** El sistema de Mejoras es la app centralizada en `00_Guía Apps/Sistema_Mejoras/` — `MEJORAS.lnk` y `01_ESPECIFICACIONES/MEJORAS.json` de este proyecto están en `.gitignore` (herramienta personal, no va al repo público). El PC de casa necesita su propio `MEJORAS.lnk` (el de aquí no es portable, ver `CONTINUIDAD.md`)
