# 🐾 Fase 2 · Navegación

**Taller Módulo 1 · Huella Amiga** · Se publica: martes 3 de noviembre · **Checkpoint: lunes 9 de noviembre, 11:59 p. m.**

---

## 📨 Lo que pide la fundación

> **De:** Coordinación de Adopciones · Fundación Huella Amiga
> **Asunto:** Queremos compartir a cada mascota
>
> Ya vemos todas las mascotas, ¡gracias! Ahora queremos mandar por WhatsApp el enlace de **una** mascota en particular, para que quien lo abra llegue directo a ella. También necesitamos una portada que invite a conocerlas, y que si alguien escribe mal la dirección no vea una pantalla en blanco.

---

## 🎯 Qué vas a construir

Lo mismo que hicimos con Tarima en la Clase 2, aplicado a Huella Amiga:

| En clase (Tarima) | Tú (Huella Amiga) |
|---|---|
| `''`, `eventos`, `eventos/:id`, `**` | `''`, `mascotas`, `mascotas/:id`, `**` |
| `Inicio` con 3 eventos con cupos | `Inicio` con 3 mascotas disponibles |
| `DetalleEvento` + "Evento no encontrado" | `DetalleMascota` + "Mascota no encontrada" |
| `NoEncontrada` | `NoEncontrada` |
| Nombre de la tarjeta con enlace | Botón **Ver detalle** en la tarjeta |
| Navegación del encabezado | Navegación del encabezado |

Todo tu código sigue dentro de **`src/app/`**. El kit de estilos ya trae la navegación del encabezado: `encabezado__nav` y la clase `activo` para el enlace de la página actual.

> [!TIP]
> Antes de empezar, actualiza tu fork (README, Paso 8): **Sync fork → Update branch**, y luego `git pull` y `npm install`.

---

## 📋 El contrato (nombres exactos)

Las pruebas buscan estos nombres **tal cual**. Si cambias uno, la prueba no lo encuentra.

### 1 · Rutas · `src/app/app.routes.ts`

| `path` | Página | Cómo se carga |
|---|---|---|
| `''` | `Inicio` | `component` |
| `'mascotas'` | `ListadoMascotas` | `loadComponent` (lazy loading) |
| `'mascotas/:id'` | `DetalleMascota` | `loadComponent` (lazy loading) |
| `'**'` | `NoEncontrada` | `component`, **siempre de última** |

- Los `path` van **sin** barra inicial.
- Arriba del archivo **no** importes `ListadoMascotas` ni `DetalleMascota`: si quedan esos `import`, no hay lazy loading.
- Puedes ponerle `title` a cada ruta (el nombre de la pestaña del navegador).

### 2 · Configuración · `src/app/app.config.ts`

- `provideRouter(routes, withComponentInputBinding())`. Sin esto, el `id` de la URL nunca llega al detalle.

### 3 · App · `src/app/app.html` y `app.ts`

- `app.html` muestra `<app-encabezado />` y, donde antes estaba el listado, `<router-outlet />`.
- `app.ts` importa `RouterOutlet` (y ya no necesita `ListadoMascotas`).

### 4 · Inicio · `src/app/pages/inicio/inicio.ts`

- Clase `Inicio`, selector `app-inicio`.
- Muestra **3** mascotas **disponibles** (no adoptadas), reutilizando `<app-tarjeta-mascota>`.
- Tiene un enlace con `data-testid="ir-a-mascotas"` hacia `/mascotas`.

### 5 · Detalle · `src/app/pages/detalle-mascota/detalle-mascota.ts`

- Clase `DetalleMascota`, selector `app-detalle-mascota`.
- Input obligatorio `id` (con `input.required`). Llega desde la URL **como texto**.
- Si la mascota existe: muestra su nombre en un elemento con `data-testid="detalle-nombre"`.
- Si no existe: muestra un elemento con `data-testid="mascota-no-encontrada"` que diga **Mascota no encontrada**, y un enlace con `data-testid="volver-listado"` hacia `/mascotas`.

### 6 · Tarjeta · `TarjetaMascota` (la de la Fase 1)

- Agrega un enlace **Ver detalle** con `data-testid="ver-detalle"` que lleve a `/mascotas/<id de esa mascota>`.

### 7 · Página 404 · `src/app/pages/no-encontrada/no-encontrada.ts`

- Clase `NoEncontrada`, selector `app-no-encontrada`.
- Muestra un elemento con `data-testid="pagina-404"`.

### 8 · Encabezado · `Encabezado` (el de la Fase 1)

- Enlaces a `/` y a `/mascotas` con `routerLink`.
- `routerLinkActive` en los enlaces, para marcar la página en la que estás (el kit usa la clase `activo`).

### 9 · Los enlaces internos

- Todos con `routerLink`, nunca con `href="/..."`: `href` recarga toda la aplicación.

---

## 📐 Reglas de negocio

- Si el `id` no existe (por ejemplo `/mascotas/999`), el detalle muestra **Mascota no encontrada** y un camino de regreso al listado.
- Cualquier dirección desconocida muestra la página 404.
- La portada solo invita con mascotas que todavía buscan hogar.

**Pista:** el `id` de la URL es texto (`'3'`) y el de tu mascota es número (`3`). TypeScript te va a avisar si los comparas directamente; para convertir texto en número existe `Number(...)`.

---

## ✅ Cómo saber que vas bien

```bash
npm run calificar -- 2
```

La Fase 2 tiene **8 partes y 30 pruebas**:

| Parte | Qué revisa | Pruebas |
|---|---|---|
| 2.1 | Las 4 rutas, lazy loading y `**` de última | 4 |
| 2.2 | Navegar de verdad a `/`, `/mascotas`, `/mascotas/<id>` y una dirección que no existe | 4 |
| 2.3 | `Inicio` | 4 |
| 2.4 | `DetalleMascota` (incluye el id que no existe) | 5 |
| 2.5 | Enlace **Ver detalle** de la tarjeta | 2 |
| 2.6 | `NoEncontrada` | 2 |
| 2.7 | Navegación del encabezado | 3 |
| 2.8 | Estructura del router y Angular 22 | 6 |

Tu nota cuenta **las dos fases** (35 + 30 = 65 pruebas): mientras no termines la Fase 2, tu nota baja aunque la Fase 1 siga en ✅. Es normal.

Y en el navegador (`ng serve`):

1. `http://localhost:4200` muestra la portada con 3 mascotas.
2. **Ver detalle** lleva a `/mascotas/<id>` sin recargar la página.
3. `http://localhost:4200/mascotas/999` dice "Mascota no encontrada".
4. `http://localhost:4200/cualquier-cosa` muestra la 404.
5. El enlace de la página actual se ve marcado en el encabezado.

---

## 🤖 Uso de IA en esta fase

- **Nivel permitido: 0 · Tutor.** Pregúntale a la IA para entender un error o un concepto; no le pidas que haga tus páginas.
- Si le pides un archivo de rutas, revísalo con el **Detector de rutas viejas** de la clase: ¿usa `RouterModule.forRoot`? ¿Puso `**` de última? ¿Usa `loadComponent`?
- Escribe la **entrada 2** en [`BITACORA-IA.md`](../BITACORA-IA.md).

---

## 📤 Entrega

1. `git add .` → `git commit -m "Fase 2"` → `git push`.
2. Tu Pull Request se actualiza solo: **no abras otro**.
3. Revisa la nota en el comentario del PR.

**Checkpoint:** lunes 9 de noviembre, 11:59 p. m. Ese día la profe revisa que la Fase 2 esté en ✅.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
