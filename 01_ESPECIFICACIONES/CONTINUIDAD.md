# Continuidad — App Viajes Marcos & Mery

**Actualizado:** 7 de septiembre de 2026  
**Sesión:** Claude Sonnet 5 (Claude Code) — nueva cuenta, primera sesión de continuidad  

---

## Estado actual

App **funcionando en producción** en GitHub Pages. **Importante:** Marcos desarrolla este proyecto en paralelo desde dos PCs (trabajo y casa) que comparten la carpeta vía MEGA — pero `.git` NO se sincroniza entre ellos (ver Parte 19 de `MEMORIA_MAESTRA.md`). Cada PC tiene su propio repo git local, iniciado independientemente el 7/8-sep-2026:

- **PC del trabajo** (`C:\Users\mpe.HP2008\...`): commit `e67e14c`, desciende del historial real de GitHub (`c8d9eb5`) — no necesita `--force` para el push
- **PC de casa** (`C:\Users\marco\...`): commit `75ce58c`, historial nuevo sin relación con GitHub — necesitaría `--force`/`--allow-unrelated-histories`

Ninguno de los dos se ha subido todavía (bloqueados por el token pendiente de regenerar). Recomendación: subir primero desde el PC del trabajo, luego resetear el de casa contra `origin/main`.

- URL: https://marcospenas.github.io/viajes-marcos-mery
- Repo: https://github.com/MarcosPenas/viajes-marcos-mery
- Ruta local: `...\MEGA\08_Scripts\App Viajes Marcos Mery` (distinta según el PC, ver arriba)

---

## Qué se hizo en esta sesión (7 sep 2026)

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
- Itinerario completo de 23 días

---

## Tareas pendientes

### 🔴 CRÍTICO — hacer antes de cualquier otra cosa

| Tarea | Acción |
|---|---|
| ~~Resolver la falta de repo `.git` local~~ | ✅ Hecho, cada PC por separado (ver Estado actual arriba) — `.git` no se sincroniza vía MEGA (`.megaignore` excluye archivos ocultos), así que no era un único problema a resolver una vez, sino algo que ocurrió en cada máquina |
| ~~Quitar el token de GitHub de `CLAUDE.md`~~ | ✅ Hecho el 8-sep-2026 (PC del trabajo) — sustituido por instrucciones sin el secreto en texto plano. El token en sí sigue sin regenerar |
| Regenerar token de GitHub | Ir a https://github.com/settings/tokens → Tokens (classic) → eliminar token antiguo → generar uno nuevo. Usarlo solo en el momento del push (no guardarlo en ningún archivo del repo) |
| Subir a GitHub desde el PC del trabajo | `git remote add origin https://github.com/MarcosPenas/viajes-marcos-mery.git` (si no está ya) + `git push -u origin main` con el token nuevo — el commit `e67e14c` desciende del remoto, no hace falta `--force` |
| Sincronizar el PC de casa después | Una vez subido desde el trabajo: `git fetch origin && git reset --hard origin/main` en el PC de casa (descarta el commit local `75ce58c`, o guardarlo antes en una rama con `git branch backup-75ce58c` por si acaso) |

### 🟠 ALTA prioridad

| Tarea | Acción |
|---|---|
| Auditoría visual de imágenes | Ya revisado el 7-sep-2026: Home, Dashboard, Días, Día 1 (Hanói), Día 3 (Cat Ba), Hoy, Mapa, Docs. Falta pasar por el resto de los 23 días |
| Revisar datos personales en repo público | ✅ Hecho el 7-sep-2026 — `js/data.js` (`localEmergency`, `contacts`) solo tiene teléfonos públicos de emergencia y la embajada de España, nada sensible |

### 🟡 MEDIA prioridad (antes del viaje — noviembre 2026)

| Tarea | Acción |
|---|---|
| Actualizar tasas de cambio | Editar `FX_RATES` en `js/app.js`: VND (actualmente 27.000/€), KHR (4.400/€), USD (1.08/€) |
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

1. Leer este archivo y `MEMORIA_MAESTRA.md`
2. Comprobar que la app sigue funcionando: http://localhost:3000 (arrancar servidor) o https://marcospenas.github.io/viajes-marcos-mery
3. Pedir al usuario que confirme qué tarea quiere abordar primero
4. Lo más probable: resolver lo del repo `.git` → regenerar token → subir los fixes del 7-sep-2026 → seguir la auditoría visual del resto de días

---

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
