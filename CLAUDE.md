# Instrucciones para Claude — App Viajes Marcos & Mery

---

## ⚠️ TAREAS PENDIENTES — HAZ ESTO PRIMERO

### 1. Resolver la falta de repositorio git local (BLOQUEA todo lo demás)

**7-sep-2026:** se comprobó que esta carpeta NO tiene `.git` inicializado (`git status` → "not a git repository"). No se puede hacer commit/push de nada, incluidos los fixes descritos abajo, hasta resolver esto. Ver detalle y opciones en `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` → Parte 19.

### 2. Regenerar token de GitHub (URGENTE — el anterior fue expuesto)

El token `[REDACTED_GITHUB_TOKEN]` quedó visible en el historial del chat. Aún no se ha regenerado.

Pasos:
1. Ir a https://github.com/settings/tokens
2. Eliminar ese token
3. Crear uno nuevo (scope: `repo`)
4. Ejecutar: `git remote set-url origin https://MarcosPenas:[NUEVO_TOKEN]@github.com/MarcosPenas/viajes-marcos-mery.git`

### 3. Subir los fixes del 7-sep-2026 en cuanto se resuelvan los puntos 1 y 2

`index.html`, `js/app.js`, `js/data.js` tienen corregidos en local el mapa (Leaflet) y las fotos de cabecera de día/portada — ver `01_ESPECIFICACIONES/HISTORIAL_DE_CAMBIOS.md`. No están subidos a GitHub todavía.

### 4. Auditoría visual de imágenes (en curso)

Ya revisado 7-sep-2026: Home, Dashboard, Días, Día 1 (Hanói), Día 3 (Cat Ba), Hoy, Mapa, Docs. Falta pasar por el resto de los 23 días uno a uno.

### 5. Revisar datos personales en repo público — ✅ HECHO (7-sep-2026)

Se revisó `js/data.js` (la clave real es `localEmergency`, no `EMERGENCY_DATA`): solo contiene teléfonos públicos de emergencia y la embajada de España. No hay pasaportes ni datos de seguro médico.

---

## Qué es este proyecto

PWA (Progressive Web App) de guía de viaje personal para Marcos y Mery.  
Viaje: Vietnam & Camboya, 23 días, 7–29 noviembre 2026.  
Sin servidor, sin login, sin base de datos. Todo es HTML/CSS/JS vanilla.

## Documentación principal

Lee estos dos archivos antes de hacer cualquier cambio:

1. `01_ESPECIFICACIONES/MEMORIA_MAESTRA.md` — descripción completa del proyecto (32 partes)
2. `01_ESPECIFICACIONES/CONTINUIDAD.md` — estado actual y tareas pendientes

## Dónde está el código activo

El código de la app está en la **raíz del repositorio**:

```
index.html          ← entrada única de la SPA
manifest.json       ← configuración PWA
sw.js               ← Service Worker offline
css/styles.css      ← todos los estilos (v=64)
js/app.js           ← toda la lógica (v=103, 3935 líneas)
js/data.js          ← datos del itinerario (v=22, 1222 líneas; DATA_VERSION interno también en 22)
js/imageMap.js      ← mapa nombre→imagen local (v=12)
img/icon-*.png      ← iconos de la app
img/places/         ← ~200 imágenes de lugares
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
