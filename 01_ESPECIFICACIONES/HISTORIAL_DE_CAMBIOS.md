# Historial de cambios — App Viajes Marcos & Mery

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
