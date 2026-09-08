# Instalación y puesta en marcha — App Viajes Marcos & Mery

## Requisitos

- Git (para clonar y publicar cambios)
- Python 3.x (para el servidor local de desarrollo)
- Navegador Chrome, Edge o Firefox (para probar la app)

## Instalación en un ordenador nuevo

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/MarcosPenas/viajes-marcos-mery.git
```

Con token (necesario para hacer push):
```bash
git clone https://MarcosPenas:[TOKEN]@github.com/MarcosPenas/viajes-marcos-mery.git
```

El token se genera en: https://github.com/settings/tokens → Personal access tokens → Tokens (classic) → Generate new token. Scope mínimo necesario: `repo`.

### Paso 2 — Arrancar el servidor local

```bash
python3 -m http.server 3000 --directory "C:\ruta\donde\hayas\clonado\viajes-marcos-mery"
```

En Windows con Python instalado como `py`:
```bash
py -3 -m http.server 3000 --directory "C:\ruta\donde\hayas\clonado\viajes-marcos-mery"
```

### Paso 3 — Abrir la app en el navegador

Ir a: http://localhost:3000

### Paso 4 — Configurar el remote de Git con token

```bash
git remote set-url origin https://MarcosPenas:[TOKEN]@github.com/MarcosPenas/viajes-marcos-mery.git
```

---

## Publicar cambios en la app online

La app está publicada en: https://marcospenas.github.io/viajes-marcos-mery

Para actualizar:
```bash
git add nombre_del_archivo_modificado
git commit -m "Descripción del cambio"
git push
```

GitHub Pages actualiza la web automáticamente en 1-5 minutos.

---

## Regla importante al modificar archivos JS o CSS

Cuando se modifique `css/styles.css`, `js/app.js`, `js/data.js` o `js/imageMap.js`, hay que incrementar el número de versión en `index.html`:

```html
<link rel="stylesheet" href="css/styles.css?v=65">  <!-- subir número -->
<script src="js/app.js?v=103"></script>              <!-- subir número -->
```

Esto evita que los navegadores sirvan la versión antigua desde caché.

---

## Instalar la app en el móvil (Android)

1. Abrir Chrome en el móvil
2. Ir a `https://marcospenas.github.io/viajes-marcos-mery`
3. Menú ⋮ → "Añadir a pantalla de inicio"
4. El icono aparece en la pantalla de inicio del móvil

---

## Problemas frecuentes

| Problema | Causa probable | Solución |
|---|---|---|
| `git push` falla con error de autenticación | El token ha expirado o no está en la URL del remote | Regenerar token en GitHub y ejecutar `git remote set-url origin https://MarcosPenas:[TOKEN]@github.com/...` |
| La app instalada en móvil da 404 | El Service Worker tiene paths incorrectos | Verificar que `sw.js` usa el prefijo `/viajes-marcos-mery/` en todos los paths |
| La app no muestra cambios tras push | Caché del Service Worker | Forzar recarga en el móvil o desinstalar y reinstalar la app |
| El mapa no funciona sin conexión | Leaflet.js se carga desde CDN externo | Comportamiento esperado — el mapa requiere internet |
