# 🐾 Fase 1 · Base y componentes

**Taller Módulo 1 · Huella Amiga** · Se publica: martes 20 de octubre · **Checkpoint: lunes 26 de octubre, 11:59 p. m.**

---

## 📨 Lo que pide la fundación

> **De:** Coordinación de Adopciones · Fundación Huella Amiga
> **Asunto:** Necesitamos un portal de adopción
>
> Hoy publicamos las mascotas en redes sociales y las solicitudes llegan por mensajes sueltos que se nos pierden. Lo primero que necesitamos es **ver todas las mascotas** con su nombre, especie, edad y si ya fueron adoptadas. Queremos que todas las tarjetas se vean igual, y que si mañana cambiamos el diseño, cambie en todas.

---

## 🎯 Qué vas a construir

Lo mismo que hicimos con Tarima en la Clase 1, aplicado a Huella Amiga:

| En clase (Tarima) | Tú (Huella Amiga) |
|---|---|
| `Evento` + `EVENTOS` | `Mascota` + `MASCOTAS` |
| `Etiqueta` | `Etiqueta` |
| `Encabezado` | `Encabezado` |
| `TarjetaEvento` + regla de cupos | `TarjetaMascota` + regla de edad |
| `ListadoEventos` con `@for` y `@empty` | `ListadoMascotas` con `@for` y `@empty` |

Todo tu código va dentro de **`src/app/`**. El kit de estilos ya está listo en `src/styles.css` (puedes usar sus clases: `encabezado`, `listado__grilla`, `tarjeta`, `etiqueta--exito`…).

---

## 📋 El contrato (nombres exactos)

Las pruebas buscan estos nombres **tal cual**. Si cambias uno, la prueba no lo encuentra.

### 1 · Modelo · `src/app/models/mascota.ts`

- Exporta `interface Mascota` con estos campos, todos obligatorios:

| Campo | Tipo |
|---|---|
| `id` | `number` |
| `nombre` | `string` |
| `especie` | `'perro' \| 'gato'` (solo esos dos valores, no `string`) |
| `edadMeses` | `number` |
| `descripcion` | `string` |
| `adoptada` | `boolean` |

Si quieres agregar más campos, que sean **opcionales** (con `?`).

### 2 · Datos de prueba · `src/app/data/mascotas.mock.ts`

- Exporta `const MASCOTAS: Mascota[]` con **al menos 6** mascotas.
- Al menos **1 adoptada** y al menos **2 gatos**.
- `id` sin repetir; `nombre` no vacío; `edadMeses` entero mayor que 0.

### 3 · Etiqueta · `src/app/shared/etiqueta/etiqueta.ts`

- Clase `Etiqueta`, selector `app-etiqueta`.
- Input obligatorio `texto` (con `input.required`).
- Muestra el texto dentro de un `<span data-testid="etiqueta">`.
- Puedes agregarle un input opcional de tono, como en clase.

### 4 · Encabezado · `src/app/components/encabezado/encabezado.ts`

- Clase `Encabezado`, selector `app-encabezado`.
- Muestra `Huella Amiga` en un `<h1 data-testid="titulo-app">`.

### 5 · Tarjeta · `src/app/components/tarjeta-mascota/tarjeta-mascota.ts`

- Clase `TarjetaMascota`, selector `app-tarjeta-mascota`.
- Input obligatorio `mascota` (con `input.required<Mascota>()`).
- Muestra el nombre en un elemento con `data-testid="nombre-mascota"`.
- Muestra la edad en un elemento con `data-testid="edad-mascota"` (regla abajo).
- Usa `<app-etiqueta>` para la **especie**.
- Usa `<app-etiqueta>` con el texto **Adoptada** solo si la mascota fue adoptada.

### 6 · Listado · `src/app/pages/listado-mascotas/listado-mascotas.ts`

- Clase `ListadoMascotas`, selector `app-listado-mascotas`, plantilla en `listado-mascotas.html`.
- Pinta una `<app-tarjeta-mascota>` por cada mascota, **con `@for` y `track`**.
- Muestra cuántas mascotas hay en un elemento con `data-testid="total-mascotas"` (por ejemplo: *6 mascotas buscan hogar*).
- Tiene un bloque `@empty` con un mensaje en un elemento con `data-testid="sin-mascotas"`.

### 7 · App y estructura

- `src/app/app.html` muestra `<app-encabezado />` y `<app-listado-mascotas />` (borra el texto de bienvenida).
- Existen las carpetas `components/`, `pages/`, `shared/`, `models/`, `data/` y `services/` dentro de `src/app/`.
- `services/` todavía está vacía: crea adentro un archivo vacío llamado **`.gitkeep`** para que Git la suba.

---

## 📐 Regla de negocio: la edad

La fundación guarda la edad en meses, pero la gente piensa en años.

| `edadMeses` | Se muestra |
|---|---|
| 1 | `1 mes` |
| 2 a 11 | `N meses` (por ejemplo `8 meses`) |
| 12 a 23 | `1 año` |
| 24 o más | `N años`, en años enteros hacia abajo (30 → `2 años`, 60 → `5 años`) |

**Pista:** igual que `estaAgotado()` en Tarima, la regla vive en un método de la tarjeta. Para "años enteros hacia abajo" existe `Math.floor`.

---

## ✅ Cómo saber que vas bien

```bash
npm run calificar -- 1
```

La Fase 1 tiene **7 partes y 35 pruebas**:

| Parte | Qué revisa | Pruebas |
|---|---|---|
| 1.1 | Modelo `Mascota` | 2 |
| 1.2 | Datos de prueba | 5 |
| 1.3 | `Etiqueta` | 4 |
| 1.4 | `Encabezado` | 3 |
| 1.5 | `TarjetaMascota` (incluye la regla de edad) | 10 |
| 1.6 | `ListadoMascotas` | 4 |
| 1.7 | Estructura y Angular 22 | 7 |

Y en el navegador (`ng serve`): el encabezado con **Huella Amiga** y una tarjeta por cada mascota, con su especie, su edad y "Adoptada" cuando corresponda.

---

## 🤖 Uso de IA en esta fase

- **Nivel permitido: 0 · Tutor.** Pregúntale a la IA para entender un error o un concepto; no le pidas que haga tus componentes.
- Revisa todo lo que te dé con el **Detector de Angular viejo** de la clase.
- Escribe tu primera entrada en [`BITACORA-IA.md`](../BITACORA-IA.md).

---

## 📤 Entrega

1. `git add .` → `git commit -m "Fase 1"` → `git push`.
2. Si aún no lo tienes, abre **tu único Pull Request** con tu nombre completo como título (README, Paso 6).
3. Revisa la nota en el comentario del PR.

**Checkpoint:** lunes 26 de octubre, 11:59 p. m. Ese día la profe revisa que tu PR exista y que la Fase 1 esté en ✅.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
