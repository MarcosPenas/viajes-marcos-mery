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

## 🟢 Nada en curso ahora mismo

Última sesión activa: **PC del trabajo, 1-oct-2026** — dos cosas grandes:

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
| _(ninguno todavía)_ | | | El repo remoto sigue en `c8d9eb5` (29-jun-2026) |

---

## Estado de los repos git locales (comprobar con `git log --oneline -5` — esto puede quedar desactualizado)

| PC | Rama | Último commit local | ¿Desciende del remoto real? |
|---|---|---|---|
| Trabajo (`C:\Users\mpe.HP2008\...`) | `main` | `05d59e7` (1-oct-2026) — mapa propio con Leaflet + auditoría formal de imágenes (167/167, ver arriba) | Sí (cadena completa hasta `c8d9eb5`) |
| Casa (`C:\Users\marco\...`) | `main` | `be0aeb2` (29-sep-2026 tarde) — **desactualizado, ver nota arriba**; al menos 5 commits más encima de `cb9c4d1` (ver lista en "Nada en curso ahora mismo") | No — historial nuevo, `git init` desde cero |

**Importante para la próxima sesión en el PC de casa:** el contenido de tus 5 commits (`4c5d322`…`cb9c4d1`) ya está integrado en el commit `cdff33c` del PC del trabajo (se copió el estado final de los archivos, no cada commit individual). Cuando este PC empiece a hacer push a GitHub, el PC de casa deberá resetear su rama contra `origin/main` en vez de intentar pushear sus propios commits — ver "Decisiones ya tomadas" abajo. Si quieres conservar tu historial de 5 commits como referencia, créate una rama antes de resetear (`git branch backup-28sep`).

---

## Decisiones ya tomadas (no reabrir sin motivo)

- El PC del trabajo sube primero a GitHub (su historial no necesita `--force`)
- El PC de casa resetea su repo local contra `origin/main` después, en vez de fusionar los dos historiales
- El token de GitHub no se guarda en ningún archivo del repo (ni `.md`, ni `.claude/`) — se usa solo en el momento del push
- **(28-sep-2026)** No hay prisa por publicar — Marcos quiere acumular cambios ~1 semana en local primero. No iniciar un push sin que él lo pida explícitamente
- **(29-sep-2026)** El sistema de Mejoras es la app centralizada en `00_Guía Apps/Sistema_Mejoras/` — `MEJORAS.lnk` y `01_ESPECIFICACIONES/MEJORAS.json` de este proyecto están en `.gitignore` (herramienta personal, no va al repo público). El PC de casa necesita su propio `MEJORAS.lnk` (el de aquí no es portable, ver `CONTINUIDAD.md`)
