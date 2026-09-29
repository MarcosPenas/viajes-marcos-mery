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

Última sesión activa: PC del trabajo, 29-sep-2026 — huecos de contenido (Tra Su, Café Giảng, stubs Chau Doc) + auditoría sistemática foto↔sitio con script (4 huecos más corregidos, incl. una foto claramente equivocada en el mercado nocturno de Hoi An). Ver `HISTORIAL_DE_CAMBIOS.md`, continuaciones 5 y 6. Sin bloqueos activos ni acciones a medias.

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
| Trabajo (`C:\Users\mpe.HP2008\...`) | `main` | `6365479` (29-sep-2026) — 21 commits por encima de `origin/main`, incluye todo el trabajo del 28-sep del PC de casa | Sí (cadena completa hasta `c8d9eb5`) |
| Casa (`C:\Users\marco\...`) | `main` | `cb9c4d1` (28-sep-2026), 5 commits encima de `75ce58c` | No — historial nuevo, `git init` desde cero |

**Importante para la próxima sesión en el PC de casa:** el contenido de tus 5 commits (`4c5d322`…`cb9c4d1`) ya está integrado en el commit `cdff33c` del PC del trabajo (se copió el estado final de los archivos, no cada commit individual). Cuando este PC empiece a hacer push a GitHub, el PC de casa deberá resetear su rama contra `origin/main` en vez de intentar pushear sus propios commits — ver "Decisiones ya tomadas" abajo. Si quieres conservar tu historial de 5 commits como referencia, créate una rama antes de resetear (`git branch backup-28sep`).

---

## Decisiones ya tomadas (no reabrir sin motivo)

- El PC del trabajo sube primero a GitHub (su historial no necesita `--force`)
- El PC de casa resetea su repo local contra `origin/main` después, en vez de fusionar los dos historiales
- El token de GitHub no se guarda en ningún archivo del repo (ni `.md`, ni `.claude/`) — se usa solo en el momento del push
- **(28-sep-2026)** No hay prisa por publicar — Marcos quiere acumular cambios ~1 semana en local primero. No iniciar un push sin que él lo pida explícitamente
- **(29-sep-2026)** El sistema de Mejoras es la app centralizada en `00_Guía Apps/Sistema_Mejoras/` — `MEJORAS.lnk` y `01_ESPECIFICACIONES/MEJORAS.json` de este proyecto están en `.gitignore` (herramienta personal, no va al repo público). El PC de casa necesita su propio `MEJORAS.lnk` (el de aquí no es portable, ver `CONTINUIDAD.md`)
