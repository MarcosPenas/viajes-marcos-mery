# Coordinación entre sesiones (PC trabajo ↔ PC casa)

Este archivo es un **tablón de estado activo**, no un histórico — a diferencia de `HISTORIAL_DE_CAMBIOS.md` (que registra qué se hizo y cuándo, cronológico, nunca se borra), aquí solo importa **el estado actual**: qué sesión está haciendo qué ahora mismo, qué decisiones están pendientes de coordinar entre las dos máquinas, y qué bloqueos hay. Se sobrescribe, no se acumula.

**Por qué existe:** `.git` no se sincroniza entre los dos PCs vía MEGA (ver Parte 19 de `MEMORIA_MAESTRA.md`), así que cualquier sesión de Claude Code en cualquiera de las dos máquinas debe leer esto **antes** de tocar git (push, reset, etc.) o de dar por hecho el estado del repo — y escribir aquí antes de hacer algo que el otro PC necesite saber.

**Regla para cualquier sesión (en cualquier PC):**
1. Leer este archivo al empezar la sesión, no solo `CONTINUIDAD.md`
2. Antes de un `git push`/`git reset`/cambio de rama: comprobar aquí si el otro PC tiene algo pendiente o en curso
3. Después de una acción que afecte al otro PC (push, cambio de decisión, bloqueo nuevo): actualizar este archivo en el mismo momento, no al final de la sesión
4. Si encuentras una sección con una fecha/sesión distinta a la tuya y no cuadra con lo que esperabas, decírselo a Marcos explícitamente antes de asumir nada

---

## 🔴 Acción en curso ahora mismo

**Quién:** sesión "App Viajes - Pc Trabajo" (esta sesión, PC del trabajo)
**Qué:** a punto de regenerar el token de GitHub y hacer `git push` del commit `91d5136` (que incluye `e67e14c` encima del historial real de GitHub, `c8d9eb5`) a `origin/main`.
**Estado:** esperando que Marcos pegue el token nuevo en el chat de esta sesión.

**⚠️ Si estás en la sesión del PC de casa leyendo esto:** NO hagas `git push` de tu commit local `75ce58c` — no está relacionado con el historial real de GitHub y pisaría lo que se sube desde aquí. Cuando el push de esta sesión se confirme más abajo, ejecuta en el PC de casa:
```bash
git fetch origin
git branch backup-75ce58c        # opcional, por si quieres conservar tu commit como referencia
git reset --hard origin/main
```

---

## Últimos pushes a GitHub

| Fecha | PC | Commit subido | Notas |
|---|---|---|---|
| _(ninguno todavía)_ | | | El repo remoto sigue en `c8d9eb5` (29-jun-2026) mientras no se confirme el push de arriba |

---

## Estado de los repos git locales (puede quedar desactualizado — comprobar con `git log --oneline -5`)

| PC | Rama | Último commit local | ¿Desciende del remoto real? |
|---|---|---|---|
| Trabajo (`C:\Users\mpe.HP2008\...`) | `main` | `91d5136` | Sí (vía `e67e14c` ← `c8d9eb5`) |
| Casa (`C:\Users\marco\...`) | `main` | `75ce58c` | No — historial nuevo, `git init` desde cero |

---

## Decisiones ya tomadas (no reabrir sin motivo)

- El PC del trabajo sube primero a GitHub (su historial no necesita `--force`)
- El PC de casa resetea su repo local contra `origin/main` después, en vez de fusionar los dos historiales
- El token de GitHub no se guarda en ningún archivo del repo (ni `.md`, ni `.claude/`) — se usa solo en el momento del push
