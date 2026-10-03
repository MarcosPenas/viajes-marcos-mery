#!/usr/bin/env python3
"""Test previo a publicar: comprueba que las fotos de las fichas (js/data.js) son correctas.

Uso:   py -3 tools/check_imagenes.py          (sale con código 1 si hay errores)
       py -3 tools/check_imagenes.py --init   (regenera tools/sin_foto.txt y tools/fotos_compartidas.txt
                                               con el estado actual; revisar el diff antes de commitear)

Reglas (ver CREDITOS_FOTOS.md): cada ficha tiene una foto local fija revisada a mano o está en
tools/sin_foto.txt (icono neutro). Nunca fotos remotas/aleatorias. Una misma foto solo puede servir a
varias fichas si el grupo está en tools/fotos_compartidas.txt (decisión consciente).
"""
import collections, hashlib, os, re, sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'js', 'data.js')
FOTOS = os.path.join(ROOT, 'img', 'fotos')
SIN_FOTO = os.path.join(ROOT, 'tools', 'sin_foto.txt')
COMPARTIDAS = os.path.join(ROOT, 'tools', 'fotos_compartidas.txt')
MAX_BYTES = 1_500_000

try:
    from PIL import Image
except ImportError:
    Image = None


def skip_str(t, i):
    q = t[i]; i += 1
    while i < len(t):
        if t[i] == '\\': i += 2; continue
        if t[i] == q: return i + 1
        i += 1
    raise ValueError('cadena sin cerrar')


def match_close(t, i, o, c):
    depth = 0
    while i < len(t):
        ch = t[i]
        if ch in '\'"`': i = skip_str(t, i); continue
        if ch == '/' and t[i:i + 2] == '//': i = t.index('\n', i); continue
        if ch == o: depth += 1
        elif ch == c:
            depth -= 1
            if depth == 0: return i
        i += 1
    raise ValueError('sin cierre')


def load_fichas():
    text = open(DATA, encoding='utf-8').read()
    starts = [(m.start(), m.group(1)) for m in re.finditer(r"\n        \{\n          date: '(\d{4}-\d{2}-\d{2})'", text)]
    fichas = []
    for di, (pos, date) in enumerate(starts):
        seg = text[pos:starts[di + 1][0] if di + 1 < len(starts) else len(text)]
        for kind, key in (('place', 'places'), ('rest', 'restaurants')):
            m = re.search(r"\n          " + key + r": \[", seg)
            if not m: continue
            a0 = m.end() - 1
            arr = seg[a0:match_close(seg, a0, '[', ']') + 1]
            i = 1
            while i < len(arr):
                c = arr[i]
                if c in '\'"`': i = skip_str(arr, i); continue
                if c == '/' and arr[i:i + 2] == '//': i = arr.index('\n', i); continue
                if c == '{':
                    j = match_close(arr, i, '{', '}')
                    obj = arr[i:j + 1]
                    nm = re.search(r"name:\s*'((?:[^'\\]|\\.)*)'", obj).group(1).replace("\\'", "'")
                    ph = re.search(r"photo:\s*'((?:[^'\\]|\\.)*)'", obj)
                    fichas.append({'date': date, 'kind': kind, 'name': nm,
                                   'photo': ph.group(1) if ph else None,
                                   'coords': bool(re.search(r"lat:\s*-?\d", obj)) if kind == 'place' else True})
                    i = j + 1
                    continue
                i += 1
    return fichas


def read_list(path):
    if not os.path.exists(path): return []
    return [l.rstrip('\n') for l in open(path, encoding='utf-8') if l.strip() and not l.startswith('#')]


def main():
    fichas = load_fichas()
    errors, warns = [], []
    sin_foto_now = sorted({f"{f['date']}|{f['name']}" for f in fichas if not f['photo']})
    groups = collections.defaultdict(list)
    for f in fichas:
        if f['photo']: groups[f['photo']].append(f"{f['date']}|{f['name']}")
    shared_now = sorted(f"{p} :: " + ' ## '.join(sorted(v)) for p, v in groups.items() if len(set(v)) > 1)

    if '--init' in sys.argv:
        open(SIN_FOTO, 'w', encoding='utf-8').write(
            '# Fichas SIN foto a propósito (icono neutro). Formato: fecha|nombre. Regenerar con --init.\n' + '\n'.join(sin_foto_now) + '\n')
        open(COMPARTIDAS, 'w', encoding='utf-8').write(
            '# Fotos que sirven a varias fichas a propósito (revisado). Formato: archivo :: ficha ## ficha\n' + '\n'.join(shared_now) + '\n')
        print('listas regeneradas:', len(sin_foto_now), 'sin foto;', len(shared_now), 'grupos compartidos')
        return 0

    for f in fichas:
        who = f"{f['date']} · {f['name']}"
        if not f['coords']: errors.append(f'{who}: lugar sin lat/lng')
        p = f['photo']
        if not p: continue
        if re.match(r'^(https?:)?//', p) or 'picsum' in p:
            errors.append(f'{who}: foto remota/aleatoria ({p[:60]})'); continue
        if not p.startswith('img/fotos/'):
            errors.append(f'{who}: foto fuera de img/fotos ({p})'); continue
        path = os.path.join(ROOT, p.replace('/', os.sep))
        if not os.path.exists(path):
            errors.append(f'{who}: no existe {p}'); continue
        size = os.path.getsize(path)
        if size > MAX_BYTES: errors.append(f'{who}: {p} pesa {size // 1000} KB (máx {MAX_BYTES // 1000})')
        try:
            if Image:
                with Image.open(path) as im:
                    im.verify()
                with Image.open(path) as im:
                    if im.width < 300: errors.append(f'{who}: {p} demasiado pequeña ({im.width}px)')
            elif open(path, 'rb').read(3) != b'\xff\xd8\xff':
                errors.append(f'{who}: {p} no parece JPEG')
        except Exception as ex:
            errors.append(f'{who}: {p} imagen corrupta ({ex})')

    sin_ok = set(read_list(SIN_FOTO))
    for s in sin_foto_now:
        if s not in sin_ok: errors.append(f'ficha sin foto no declarada: {s}  (añadir a tools/sin_foto.txt o ponerle foto)')
    for s in sorted(sin_ok - set(sin_foto_now)):
        warns.append(f'sin_foto.txt lista una ficha que ya tiene foto (o no existe): {s}')

    comp_ok = set(read_list(COMPARTIDAS))
    for g in shared_now:
        if g not in comp_ok:
            errors.append(f'foto compartida no autorizada: {g}')

    hashes = collections.defaultdict(list)
    referenced = {f['photo'].split('/')[-1] for f in fichas if f['photo']}
    for fn in sorted(os.listdir(FOTOS)):
        if fn not in referenced:
            errors.append(f'archivo huérfano en img/fotos (no lo usa ninguna ficha): {fn}')
        hashes[hashlib.md5(open(os.path.join(FOTOS, fn), 'rb').read()).hexdigest()].append(fn)
    for h, fns in hashes.items():
        if len(fns) > 1: errors.append(f'imágenes idénticas con distinto nombre: {fns}')

    con = sum(1 for f in fichas if f['photo'])
    print(f'{len(fichas)} fichas · {con} con foto · {len(fichas) - con} sin foto declarada · {len(os.listdir(FOTOS))} archivos')
    for w in warns: print('AVISO ', w)
    for e in errors: print('ERROR ', e)
    print('OK' if not errors else f'{len(errors)} errores')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
