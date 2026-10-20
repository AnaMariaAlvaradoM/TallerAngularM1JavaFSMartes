# 🐾 Huella Amiga · Taller Angular · Módulo 1

**Java Full Stack Developer · Dev Senior Code · martes**

---

## ¿Qué es esto?

**Huella Amiga** es una fundación (ficticia) de adopción de perros y gatos. Hoy publica sus mascotas en redes sociales y las solicitudes se le pierden. Durante el Módulo 1 vas a construir su portal en **Angular 22**, por fases:

- En clase, la profe construye **Tarima** (una cartelera cultural).
- Tú aplicas **el mismo concepto** a Huella Amiga. Mismo patrón, otro negocio: así aprendes a transferir, no a copiar.

### La nota se calcula sola

Cada vez que haces `git push`, GitHub corre las **pruebas automáticas** del taller sobre tu código y pone tu nota en tu Pull Request.

### ¿Qué es una prueba automática?

**Definición técnica:** código que ejecuta tu código con datos conocidos y compara el resultado con el esperado.

**En la vida real:** el control de calidad de una fábrica: cada pieza pasa por la misma revisión, sin excepciones y sin favoritismos.

Hay dos tipos en este taller:

- **Pruebas de comportamiento:** crean tus componentes y revisan lo que muestran en pantalla.
- **Pruebas de estructura:** leen tus archivos y revisan la arquitectura (carpetas, `@for`, que no uses Angular viejo).

---

## Las fases

| Fase | Se publica | Tema | Enunciado | Checkpoint |
|---|---|---|---|---|
| 1 | Mar 20 oct | Base y componentes | [`fases/FASE-1.md`](fases/FASE-1.md) | Lun 26 oct · 11:59 p. m. |
| 2 | Mar 27 oct | Navegación | Se publica después de la Clase 2 | Lun 2 nov |
| 3 | Mar 3 nov | Estado compartido + revisión entre pares | Se publica después de la Clase 3 | Lun 9 nov |
| 4 | Mar 10 nov | API real, refactor y entrega | Se publica después de la Clase 4 | Dom 15 nov |

Todas las fases se trabajan **en este mismo repo** y se entregan en **el mismo Pull Request**. Cuando se publica una fase nueva, actualizas tu copia (Paso 8) y sigues.

---

## Antes de empezar

| Herramienta | Versión | Cómo verificar |
|---|---|---|
| Node.js | **24 LTS** (24.15 o superior) | `node -v` |
| Angular CLI | **22** | `ng version` |
| Git | Cualquiera reciente | `git --version` |

Si te falta algo, revisa la guía de la Clase 1.

---

## Paso 1 · Fork (tu copia del repo)

**Definición técnica:** un *fork* es una copia de un repositorio en tu propia cuenta de GitHub, conectada con el original.

**En la vida real:** fotocopiar el cuaderno de la profe. Escribes en tu fotocopia; el original no cambia.

1. Inicia sesión en GitHub.
2. En la página de este repo, clic en **Fork** (arriba a la derecha).
3. Deja el nombre como está y clic en **Create fork**.

**Cómo saber que quedó bien:** arriba a la izquierda dice **tu-usuario / nombre-del-repo** y debajo *forked from …*.

---

## Paso 2 · Clone (bajarlo a tu computador)

1. En **tu fork** (no en el de la profe), clic en el botón verde **Code** y copia la URL HTTPS.
2. En VS Code abre la terminal (**Terminal → New Terminal**).
3. Ve a la carpeta donde guardas tus proyectos y ejecuta (cambia la URL por la tuya):

```bash
git clone https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
cd NOMBRE-DEL-REPO
code .
```

4. En la nueva ventana de VS Code, abre la terminal e instala las dependencias (tarda de 1 a 3 minutos):

```bash
npm install
```

5. Levanta la app para ver que todo funciona:

```bash
ng serve --open
```

**Resultado esperado:** el navegador abre `http://localhost:4200` con el texto *"Huella Amiga · Taller del Módulo 1"*. Detén el servidor con `Ctrl+C` cuando quieras.

---

## Paso 3 · Resolver la fase

1. Abre el enunciado de la fase: [`fases/FASE-1.md`](fases/FASE-1.md).
2. Todo tu código va dentro de **`src/app/`**.
3. Crea los componentes con el CLI, igual que en clase (`ng g c ... --skip-tests`).

### Las tres reglas de oro

1. **Nombres exactos.** Archivos, carpetas, clases, selectores y `data-testid` se escriben **tal cual** dice el enunciado. Las pruebas los buscan así.
2. **No toques `src/pruebas/`** ni los archivos de configuración (lista abajo).
3. **Angular 22.** Nada de `*ngFor`, `*ngIf`, `@Input()` ni `NgModule`.

### ¿Qué es un `data-testid`?

Es un atributo HTML que no cambia cómo se ve la página; sirve para que las pruebas encuentren un elemento sin depender del diseño. Ejemplo de la **forma** (no resuelve nada del taller):

```html
<p data-testid="saludo">Hola</p>
```

---

## Paso 4 · Ver tu nota en tu computador

Desde la carpeta del repo:

| Comando | Qué califica |
|---|---|
| `npm run calificar` | Todo lo publicado hasta hoy |
| `npm run calificar -- 1` | Solo la Fase 1 |
| `npm run calificar -- 1.5` | Solo la parte 1.5 (más rápido mientras corriges) |

Cada parte compila tu proyecto, así que tarda unos segundos por parte.

### Cómo leer el resultado

- ✅ todas las pruebas de esa parte pasan.
- 🟡 pasan algunas: debajo dice cuáles fallan y por qué.
- ❌ no pasa ninguna. Si dice **"No compiló"**, lee el mensaje: casi siempre es un archivo con otro nombre o un `imports` olvidado.

---

## Paso 5 · Subir tu trabajo

Desde la carpeta del repo, en este orden:

```bash
git add .
git commit -m "Fase 1"
git push
```

- `git add .` → mete en la caja todos los cambios.
- `git commit -m "..."` → cierra la caja y le pone una etiqueta.
- `git push` → envía la caja a **tu fork** en GitHub.

---

## Paso 6 · Abrir tu Pull Request (solo UNO en todo el módulo)

**Definición técnica:** un *Pull Request* (PR) es una solicitud para que revisen los cambios de tu fork contra el repo original.

**En la vida real:** radicar un documento en ventanilla: queda con número, se revisa y te responden ahí mismo.

1. En **tu fork**, clic en **Contribute → Open pull request**.
2. Revisa que diga: base repository **el de la profe** · base **main** ← head repository **el tuyo** · compare **main**.
3. **Título:** tu nombre completo (por ejemplo `Ana María Pérez Gómez`).
4. Clic en **Create pull request**.

Un solo PR para las 4 fases: cada `git push` lo actualiza solo. **No abras otro.**

---

## Paso 7 · Ver tu nota en GitHub

A los pocos minutos de cada `push`:

- En tu PR aparece un **comentario** con la nota y una tabla por parte.
- El PR tiene una **etiqueta** `Nota X.X`.
- El enlace **"Ver qué falta por corregir"** muestra el detalle de cada prueba.

Para subir la nota: corrige, prueba con `npm run calificar` y vuelve a hacer `git push`.

> [!IMPORTANT]
> **La nota se calcula sobre las fases publicadas.** Cuando sale una fase nueva, tu nota baja hasta que la completes: es normal.

> [!WARNING]
> **Fecha límite del taller:** domingo 15 de noviembre de 2026, 11:59 p. m. Después de esa hora los `push` ya no cambian la nota. Una primera entrega después del cierre queda con la etiqueta `⏰ Fuera de plazo`.

---

## Paso 8 · Cuando se publica una fase nueva

La profe agrega la fase al repo original. Tu fork no se actualiza solo:

1. En **tu fork** en GitHub, clic en **Sync fork → Update branch**.
2. En tu computador, desde la carpeta del repo:

```bash
git pull
npm install
```

3. Abre el nuevo `fases/FASE-N.md` y sigue con el Paso 3.

Si **Sync fork** dice que hay conflictos, es porque modificaste un archivo que no debías (ver abajo). Pide ayuda en la tutoría.

---

## Archivos que NO debes modificar

- `src/pruebas/` (todas las pruebas)
- `scripts/`
- `.github/`
- `package.json` y `package-lock.json`
- `angular.json`, `tsconfig.json`, `tsconfig.app.json` y `tsconfig.spec.json`

**Si los modificas:** tu PR queda con la etiqueta `⚠️ Revisar` y la profe lo revisa a mano. La nota se calcula igual, **con las pruebas originales**: cambiarlas no sube la nota.

---

## Errores frecuentes

### `ng` o `npm` no se reconoce como comando
Falta instalar Node.js 24 o Angular CLI 22 (o la terminal se abrió antes de instalarlos: ciérrala y ábrela).

### "The Angular CLI requires a minimum Node.js version…"
Tu Node es viejo. Instala Node 24 LTS desde nodejs.org.

### "No encuentro Angular en node_modules"
Te faltó `npm install` en la carpeta del repo.

### "No compiló: No encuentro el archivo src/app/…"
El archivo no existe con **ese nombre exacto** o está en otra carpeta. Revisa mayúsculas, guiones y la ruta.

### "…existe, pero no exporta …"
La clase se llama distinto. En Angular 22 es `TarjetaMascota`, no `TarjetaMascotaComponent`. Revisa también que diga `export class`.

### "Angular no conoce <app-…>"
Usas un componente en una plantilla sin agregarlo al `imports` del componente que lo usa.

### "Lees un input sin paréntesis"
Un `input()` se lee llamándolo: `mascota().nombre`, no `mascota.nombre`.

### "A tu @for le falta track"
Escribe `@for (mascota of mascotas; track mascota.id)`.

### Una prueba de estructura dice "Falta src/app/services"
Git no sube carpetas vacías. Crea dentro de `services/` un archivo vacío llamado `.gitkeep`.

### "Please tell me who you are" al hacer commit
Git no sabe tu nombre. Ejecuta una sola vez (con tus datos):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### Error 403 al hacer `git push`
Clonaste el repo de la profe en lugar de tu fork. Vuelve al Paso 2 con la URL de **tu** fork.

### Mi nota en el computador no coincide con la de GitHub
Te faltó `git push`, o GitHub aún no termina (mira la pestaña **Checks** del PR).

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
