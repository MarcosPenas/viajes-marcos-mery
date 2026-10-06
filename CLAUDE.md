# Instrucciones para Claude — App Viajes Marcos & Mery

---

## ⚠️ TAREAS PENDIENTES — HAZ ESTO PRIMERO

### 1. ~~Revocar el token de GitHub antiguo~~ — ✅ HECHO (2-oct-2026, confirmado por Marcos)

El token classic ("viajes", scope `repo`, sin caducidad) que estuvo expuesto en texto plano en `CLAUDE.md`/`MEMORIA_MAESTRA.md` durante semanas y que el 2-oct-2026 bloqueó un push real (GitHub push protection) ya está **revocado** — Marcos lo borró a mano en https://github.com/settings/tokens tras confirmarlo en pantalla. El historial local también se limpió con `git filter-branch` antes del push. Si hace falta un token nuevo para un futuro push, crearlo ahí mismo (scope `repo`) y usarlo solo en el momento del push, sin guardarlo en ningún archivo del repo.

### 2. Git local — cada PC tiene el suyo, no se sincroniza por MEGA (IMPORTANTE)

`.megaignore` en la raíz de MEGA excluye todo lo que empiece por punto (`-:.*`), así que `.git` nunca se sincroniza entre el PC del trabajo y el de casa — solo el resto de archivos (código, docs, imágenes). **GitHub es el único punto de sincronización real para el historial de versiones.**

**Los dos PCs ya siguen a `origin/main`** (casa se reconcilió el 3-oct, trabajo el 6-oct). **Nunca usar `git reset --hard` para ponerse al día:** MEGA ya habrá traído los archivos más nuevos del otro PC y `--hard` los pisaría con versiones viejas (y MEGA propagaría la pérdida). Usar `git reset --mixed origin/main` (mueve el historial sin tocar archivos). Quién tiene commits sin publicar y quién debe commitear qué: `01_ESPECIFICACIONES/COORDINACION_SESIONES.md` — **léelo siempre antes de tocar git**.

### 3. Revisar datos personales en repo público — ✅ HECHO (7-sep-2026, repo ya público)

Se revisó `js/data.js` (la clave real es `localEmergency`): solo contiene teléfonos públicos de emergencia y la embajada de España. No hay pasaportes ni datos de seguro médico. El repo ya está publicado, esto sigue vigente — cualquier dato nuevo que se añada debe pasar el mismo criterio. **Tampoco localizadores de reservas** (6-oct-2026): con localizador + apellido se puede cancelar un vuelo. Van solo en el móvil de cada uno (campo «🔒 Localizador» de cada transporte con `ref: true`).

---

## Qué es este proyecto

PWA (Progressive Web App) de guía de viaje personal para Marcos y Mery.  
Viaje: Vietnam & Camboya, 26 días, 5–30 noviembre 2026 (incluye 2 días de vuelos de ida Santiago→Barcelona→Shenzhen→Hanói y la vuelta Hanói→Shenzhen→Barcelona→Santiago el 29-30). Fuente definitiva del itinerario: documento final de María (`itinerario final V&C (1).odt`, integrado el 5-oct-2026).  
Sin servidor, sin login, sin base de datos. Todo es HTML/CSS/JS vanilla.

## Documentación principal

Lee estos archivos antes de hacer cualquier cambio:

1. `01_ESPECIFICACIONES/COORDINACION_SESIONES.md` — **léelo primero**: estado activo entre el PC del trabajo y el de casa (qué sesión está haciendo qué ahora mismo, decisiones de git pendientes de coordinar). Este proyecto se desarrolla en paralelo desde dos PCs sincronizados por MEGA — pero `.git` NO se sincroniza entre ellos (ver Parte 19 de la Memoria Maestra), así que este archivo es la única forma de saber qué ha hecho o está haciendo la otra sesión con git.
2. `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` — descripción completa del proyecto (32 partes)
3. `01_ESPECIFICACIONES/CONTINUIDAD.md` — estado actual y tareas pendientes

## Dónde está el código activo

El código de la app está en la **raíz del repositorio**:

```
index.html          ← entrada única de la SPA (mirar aquí los ?v=N actuales de cada archivo)
manifest.json       ← configuración PWA
sw.js               ← Service Worker offline
css/styles.css      ← todos los estilos
js/app.js           ← toda la lógica
js/data.js          ← datos del itinerario (DATA_VERSION interno — comprobar con grep, no asumir el número)
js/guia.js          ← frases, tarjetas culturales y fichas de los hoteles (HOTEL_INFO)
tools/              ← check_imagenes.py (antes de publicar) y servidor_ruta_produccion.py (prueba sin conexión)
img/icon-*.png      ← iconos de la app
img/fotos/          ← foto fija de cada ficha (ver tools/check_imagenes.py)
img/places/         ← portadas de días y ciudades
```

## Cómo arrancar en local

```bash
py -3 -m http.server 3000 --directory "C:\Users\mpe.HP2008\Documents\MEGA\08_Scripts\App Viajes Marcos Mery"
```

Luego abrir: http://localhost:3000

## App en producción

URL: https://marcospenas.github.io/viajes-marcos-mery  
Repo: https://github.com/MarcosPenas/viajes-marcos-mery (público)  
GitHub user: MarcosPenas

## Reglas que nunca deben romperse

1. Los archivos activos (index.html, css/, js/, img/, sw.js, manifest.json) **deben estar en la raíz del repo** — GitHub Pages los necesita ahí
2. `sw.js` usa el prefijo `/viajes-marcos-mery/` en todos sus paths — **no cambiar**
3. `start_url` en `manifest.json` es `/viajes-marcos-mery/` — **no cambiar**
4. `.bottom-nav` usa `position: fixed` — **no cambiar a absolute**
5. Al modificar CSS o JS → **incrementar `?v=N`** en index.html
6. Entregar **siempre el archivo completo**, nunca fragmentos

## Estructura de carpetas del proyecto

```
00_INSTALACION/          ← instrucciones de instalación
01_ESPECIFICACIONES/     ← documentación y memoria del proyecto
02_DESARROLLO/           ← scripts antiguos, capturas, imágenes anteriores
css/, js/, img/          ← código activo (NO MOVER)
index.html               ← código activo (NO MOVER)
manifest.json            ← código activo (NO MOVER)
sw.js                    ← código activo (NO MOVER)
```
