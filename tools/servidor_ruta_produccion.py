"""Sirve el proyecto bajo /viajes-marcos-mery/ (como GitHub Pages) para probar el service
worker y el modo sin conexión en local. Solo lectura: no crea enlaces ni toca archivos.

Uso:  py -3 tools/servidor_ruta_produccion.py 3001   →  http://localhost:3001/viajes-marcos-mery/
Prueba sin conexión: abrir la app, esperar ~20 s a que precargue las fotos, parar este
servidor y recargar: la app, los datos y las fotos deben seguir cargando."""
import functools, http.server, os, sys

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREFIX = '/viajes-marcos-mery'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3001


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split('?')[0] in ('/', PREFIX):
            self.send_response(301)
            self.send_header('Location', PREFIX + '/')
            self.end_headers()
            return
        super().do_GET()

    def translate_path(self, path):
        if path.startswith(PREFIX + '/'):
            path = path[len(PREFIX):]
        else:
            path = '/__fuera_de_la_app__'
        return super().translate_path(path)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


http.server.ThreadingHTTPServer(('127.0.0.1', PORT),
                                functools.partial(Handler, directory=PROJECT)).serve_forever()
