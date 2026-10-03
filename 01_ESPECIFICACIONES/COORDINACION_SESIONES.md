# Coordinación entre sesiones (PC trabajo ↔ PC casa)

Este archivo es un **tablón de estado activo**, no un histórico — a diferencia de `HISTORIAL_DE_CAMBIOS.md` (que registra qué se hizo y cuándo, cronológico, nunca se borra), aquí solo importa **el estado actual**: qué sesión está haciendo qué ahora mismo, qué decisiones están pendientes de coordinar entre las dos máquinas, y qué bloqueos hay. Se sobrescribe, no se acumula.

**Por qué existe:** `.git` no se sincroniza entre los dos PCs vía MEGA (ver Parte 19 de `MEMORIA_MAESTRA.md`), así que cualquier sesión de Claude Code en cualquiera de las dos máquinas debe leer esto **antes** de tocar git (push, reset, etc.) o de dar por hecho el estado del repo — y escribir aquí antes de hacer algo que el otro PC necesite saber.

**Regla para cualquier sesión (en cualquier PC):**
1. Leer este archivo al empezar la sesión, no solo `CONTINUIDAD.md`
2. Antes de un `git push`/`git reset`/cambio de rama: comprobar aquí si el otro PC tiene algo pendiente o en curso
3. Después de una acción que afecte al otro PC (push, cambio de decisión, bloqueo nuevo): actualizar este archivo en el mismo momento, no al final de la sesión
4. Si encuentras una sección con una fecha/sesión distinta a la tuya y no cuadra con lo que esperabas, decírselo a Marcos explícitamente antes de asumir nada

**⚠️ Nota del 29-sep-2026:** este archivo se quedó desactualizado durante la sesión maratoniana del 28-sep en el PC de casa (no se tocó pese a que `CONTINUIDAD.md` de esa sesión decía que sí) — seguía hablando de "esperando el token" cuando ya había 5 commits nuevos sin mencionar aquí. Si vas a hacer cambios largos de git, actualiza esto aunque estés concentrado en otra cosa.

---

## 🟡 3-oct-2026 (tarde) — PC de casa trabaja en la rama `fotos-congeladas` (NO fusionada, NO publicada)

Estrategia de fotos nueva: cada ficha lleva una foto local fija (`img/fotos/`) o ninguna; se acabó la adivinanza por alias/Wikipedia para fichas. Toca `js/data.js` (campo `photo` de las 212 fichas, DATA_VERSION 64), `js/app.js` (v141, `data-fixed`), `index.html`, `img/fotos/` (177 JPEG), poda de `img/places/` (19 archivos), `js/imageMap.js` eliminado, `CREDITOS_FOTOS.md`, `tools/check_imagenes.py`. **Si el PC del trabajo va a tocar fotos de fichas, `WIKI_ARTICLES`, `IMAGE_MAP` o `precacheCuratedPhotos`, avisar antes**: esos caminos quedan obsoletos (IMAGE_MAP ya no existe). Antes de publicar: `py -3 tools/check_imagenes.py` debe dar OK. La rama vive solo en el `.git` de casa; el resto de archivos llega por MEGA. Marcos decide cuándo fusionar con `main` y hacer push. Detalle: `HISTORIAL_DE_CAMBIOS.md` (3-oct, 2ª parte).

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
| 2-oct-2026 | Trabajo | `81c5a1d` | Primer push real del itinerario de 25 días — mapa Leaflet, auditoría de imágenes, bug de data-photo corregido. Historial local reescrito antes del push para quitar un token expuesto (ver aviso 🔴 arriba) |

---

## Estado de los repos git locales (comprobar con `git log --oneline -5` — esto puede quedar desactualizado)

| PC | Rama | Último commit local | ¿Desciende del remoto real? |
|---|---|---|---|
| Trabajo (`C:\Users\mpe.HP2008\...`) | `main` | `81c5a1d` (2-oct-2026) — == `origin/main`, ya publicado | Sí, es el remoto |
| Casa (`C:\Users\marco\...`) | `main` | Desconocido en este momento, probablemente desactualizado | No — historial propio independiente. **Debe resetear contra `origin/main` en la próxima sesión, ver aviso 🔴 arriba** |

---

## Decisiones ya tomadas (no reabrir sin motivo)

- El PC del trabajo sube primero a GitHub (su historial no necesita `--force`)
- El PC de casa resetea su repo local contra `origin/main` después, en vez de fusionar los dos historiales
- El token de GitHub no se guarda en ningún archivo del repo (ni `.md`, ni `.claude/`) — se usa solo en el momento del push
- ~~(28-sep-2026) No hay prisa por publicar — acumular ~1 semana en local primero~~ → **Superado el 2-oct-2026**: Marcos pidió explícitamente publicar, y se hizo (`81c5a1d`). A partir de ahora, cada sesión decide si pushear según lo que diga Marcos en esa sesión, no según esta nota antigua
- **(29-sep-2026)** El sistema de Mejoras es la app centralizada en `00_Guía Apps/Sistema_Mejoras/` — `MEJORAS.lnk` y `01_ESPECIFICACIONES/MEJORAS.json` de este proyecto están en `.gitignore` (herramienta personal, no va al repo público). El PC de casa necesita su propio `MEJORAS.lnk` (el de aquí no es portable, ver `CONTINUIDAD.md`)
