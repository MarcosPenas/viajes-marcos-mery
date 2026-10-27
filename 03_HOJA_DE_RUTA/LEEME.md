# Hoja de ruta de María — portada

Portada A4 vertical para imprimir delante de la hoja de ruta de María (`itinerario final V&C (1).odt`). Hecha el 17-oct-2026 a partir del icono de la app, como pidió María, sobre fondo blanco para imprimir.

| Archivo | Para qué |
|---|---|
| `portada_A4.pdf` | Imprimir aparte (A4, 1 página). Todo es vectorial menos el logotipo. |
| `portada_A4.png` | Meterla como primera página del .odt (2480×3508 px, 300 ppp). |
| `portada_A4.html` | Fuente. Usa la tipografía Poppins de Google Fonts. |

## Qué lleva

- El logotipo original a 1254 px: `02_DESARROLLO/CAPTURAS_Y_RECURSOS_GRAFICOS/ChatGPT Image 29 jun 2026, 11_48_09.png` (el de `img/icon-512.png` se queda corto para 16 cm). Si se mueve o se renombra, hay que cambiar la ruta en el HTML.
- Los colores son los del logotipo: verde del norte y de «VIETNAM», naranja del centro, rojo de Camboya y «CAMBOYA», turquesa del sur.
- «Ruta del viaje»: las 8 zonas con sus fechas, con chinchetas del color de su región, como en el mapa del icono. Si cambian fechas o zonas en `js/data.js`, hay que cambiarlas también aquí a mano.

## Imprimir

- **PDF aparte:** imprimir a tamaño real (100 %), en color.
- **Dentro del .odt (LibreOffice):** en la primera página, Formato → Página → márgenes a 0; Insertar → Imagen → `portada_A4.png`; ajustar a 21 × 29,7 cm, anclada a la página. Después, un salto de página.

## Regenerar el PDF y el PNG

Desde esta carpeta, con Chrome (tarda unos segundos porque espera a las fuentes):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="portada_A4.pdf" "file:///$(pwd -W)/portada_A4.html"
```

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --hide-scrollbars --window-size=794,1123 --force-device-scale-factor=3.125 --virtual-time-budget=15000 --screenshot="portada_raw.png" "file:///$(pwd -W)/portada_A4.html"
```

El segundo sale de 2481×3509: recortarlo a 2480×3508 y guardarlo con 300 ppp (por ejemplo con Pillow: `crop((0,0,2480,3508)).save(..., dpi=(300,300))`).

No usar `filter:` (sombras, brillo) en el CSS: Chrome convierte en imagen de baja resolución lo que lo lleva y en papel sale borroso.

## Ojo: el documento de María no va al repo

El repo es público y el .odt de María lleva los **localizadores de las reservas** (con localizador + apellido se puede cancelar un vuelo). Si se trae aquí para trabajar sobre él, que no se haga commit de él.
