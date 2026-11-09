# 🐾 Fase 3 · Estado compartido + revisión entre pares

**Taller Módulo 1 · Huella Amiga** · Se publica: martes 10 de noviembre · **Checkpoint: lunes 16 de noviembre, 11:59 p. m.**

---

## 📨 Lo que pide la fundación

> **De:** Coordinación de Adopciones · Fundación Huella Amiga
> **Asunto:** Que la gente pueda guardar las que le gustan
>
> Ya podemos compartir el enlace de cada mascota, ¡qué alegría! Ahora nos escriben personas que vieron cinco o seis mascotas y no recuerdan cuáles les gustaron. Queremos que puedan **buscar por nombre**, ver **solo las que siguen disponibles** y marcar con un clic las que les interesan. Arriba, en el encabezado, que siempre se vea **cuántas llevan marcadas**, y que en **"Mi lista"** las encuentren juntas.

---

## 🎯 Qué vas a construir

Lo mismo que hicimos con Tarima en la Clase 3, aplicado a Huella Amiga:

| En clase (Tarima) | Tú (Huella Amiga) |
|---|---|
| Buscador y categorías con `signal` + `computed` | Buscador y casilla "solo disponibles" con `signal` + `computed` |
| `CarritoStore` con `@Service()` | `FavoritosStore` con `@Service()` |
| `entradaAgregada = output<Evento>()` en la tarjeta | `favoritoAlternado = output<number>()` en la tarjeta |
| Contador de entradas en el encabezado | Contador de favoritas en el encabezado |
| Página **Mis entradas** | Página **Mi lista** |

Todo tu código sigue dentro de **`src/app/`**. El kit de estilos ya trae `filtros`, `filtros__buscador`, `filtros__casilla` y `encabezado__contador`.

> [!TIP]
> Antes de empezar, actualiza tu fork (README, Paso 8): **Sync fork → Update branch**, y luego `git pull` y `npm install`.

---

## 📋 El contrato (nombres exactos)

Las pruebas buscan estos nombres **tal cual**. Si cambias uno, la prueba no lo encuentra.

### 1 · Servicio · `src/app/services/favoritos-store.ts`

- Clase `FavoritosStore` con **`@Service()`** (Angular 22, no `@Injectable`).
- Guarda los ids marcados en una signal **privada** (`signal<number[]>([])`).
- `ids`: la misma lista, **de solo lectura** (con `asReadonly()`).
- `total`: cuántas hay, con **`computed(...)`**.
- `alternar(id: number)`: si el id no está, lo agrega; si ya está, lo quita. Nunca lo repite.
- `esFavorita(id: number): boolean`.

### 2 · Tarjeta · `TarjetaMascota` (la de las fases anteriores)

- Nuevo input `esFavorita = input(false)`.
- Nuevo output `favoritoAlternado = output<number>()`.
- Un `<button>` con `data-testid="boton-favorito"` que al hacer clic **emite el id** de la mascota.
- El botón dice **🤍 Me interesa** cuando `esFavorita()` es `false` y **❤️ En mi lista** cuando es `true`.
- La tarjeta **no inyecta** `FavoritosStore`: solo avisa. Quien la usa decide qué hacer.

### 3 · Listado · `ListadoMascotas`

- Un `<input>` con `data-testid="buscador"`: filtra por nombre mientras escribes, **sin importar mayúsculas**.
- Un `<input type="checkbox">` con `data-testid="solo-disponibles"`: al marcarlo oculta las adoptadas.
- El texto del buscador y la casilla viven en el listado con **`signal(...)`** (estado local) y la lista filtrada se calcula con **`computed(...)`**.
- `total-mascotas` muestra cuántas quedan **después de filtrar**.
- Cada tarjeta recibe `[esFavorita]` y, cuando avisa con `(favoritoAlternado)`, el listado llama a `alternar` del servicio.

### 4 · Encabezado · `Encabezado`

- Un elemento con `data-testid="contador-favoritas"` que muestra `total()` del servicio.
- Un enlace a `/mi-lista` con `routerLink` y `routerLinkActive`.

### 5 · Mi lista · `src/app/pages/mi-lista/mi-lista.ts`

- Clase `MiLista`, selector `app-mi-lista`, en la ruta **`mi-lista`** con `loadComponent`, **antes** de `'**'`.
- Muestra solo las mascotas marcadas, con `<app-tarjeta-mascota>` y `[esFavorita]="true"`.
- Si no hay ninguna: un elemento con `data-testid="lista-vacia"`.
- Desde aquí también se puede quitar una mascota (el mismo botón de la tarjeta).

### 6 · Recomendado (no lo revisan las pruebas)

- En `Inicio`, conecta también el botón de la tarjeta al servicio: si no, "Me interesa" no hace nada en la portada.

---

## 📐 Reglas de negocio

- Una mascota está en la lista una sola vez: marcarla de nuevo la **quita**.
- El contador del encabezado cambia **solo**, sin recargar, desde cualquier página donde se marque.
- Buscar y "solo disponibles" se combinan: con "nube" y la casilla marcada no queda ninguna (Nube está adoptada).

**Pista:** el buscador y la casilla solo le importan al listado: **estado local**. La lista de favoritas la usan el listado, el encabezado y Mi lista: **estado compartido**, en el servicio. Y el total no se guarda en otra variable: se **deriva** con `computed`.

---

## 👥 Revisión entre pares (parte del 30 % de la revisión docente)

1. La profe publica en el grupo a quién te toca revisar.
2. Entra al Pull Request de tu compañero o compañera → **Files changed**.
3. Deja **un comentario** con esta lista:
   - ¿El estado local (buscador, casilla) está en el listado y el compartido (favoritas) en el servicio?
   - ¿La tarjeta emite con `output()` en lugar de usar el servicio?
   - ¿El total se calcula con `computed` y no se copia a mano?
   - ¿Hay señales de Angular viejo (`@Injectable`, `@Output`, `EventEmitter`, `BehaviorSubject`, `effect` para copiar valores)?
4. Propón **al menos una mejora concreta**, con el archivo y la línea (en **Files changed**, clic en el **+** de la línea).

---

## ✅ Cómo saber que vas bien

```bash
npm run calificar -- 3
```

La Fase 3 tiene **9 partes y 30 pruebas**:

| Parte | Qué revisa | Pruebas |
|---|---|---|
| 3.1 | `FavoritosStore`: `@Service`, `ids` de solo lectura y `total` con `computed` | 4 |
| 3.2 | `alternar` y `esFavorita` | 3 |
| 3.3 | Botón de favorito en la tarjeta (`input` + `output`) | 4 |
| 3.4 | Buscador del listado | 3 |
| 3.5 | Casilla "solo disponibles" | 2 |
| 3.6 | Total filtrado y favoritas desde el listado | 2 |
| 3.7 | Contador en el encabezado | 2 |
| 3.8 | Página Mi lista | 4 |
| 3.9 | Estructura del estado y Angular 22 | 6 |

Tu nota cuenta **las tres fases** (35 + 30 + 30 = 95 pruebas): mientras no termines la Fase 3, tu nota baja aunque las otras sigan en ✅. Es normal.

Y en el navegador (`ng serve`):

1. En `/mascotas`, escribe "lu": solo queda Luna, y el total dice 1.
2. Marca "Solo disponibles": desaparecen Tito y Nube.
3. Haz clic en **🤍 Me interesa** en dos mascotas: el contador del encabezado pasa a 2.
4. Ve a **Mi lista**: están las dos. Quita una: el contador baja a 1.

---

## 🤖 Uso de IA en esta fase

- **Nivel permitido: 1 · Revisor.** Escribe tú el servicio y el listado; después pídele a la IA que los revise.
- Pídele algo como: "Revisa este servicio de Angular 22. ¿Está bien separado el estado? No me lo reescribas: dime qué cambiarías y por qué".
- Revisa lo que te diga con el **Detector de Angular viejo**: ¿te propone `effect()` para copiar el total? ¿`BehaviorSubject`? ¿Expone la signal para que cualquiera la cambie?
- Escribe la **entrada 3** en [`BITACORA-IA.md`](../BITACORA-IA.md).

---

## 📤 Entrega

1. `git add .` → `git commit -m "Fase 3"` → `git push`.
2. Tu Pull Request se actualiza solo: **no abras otro**.
3. Revisa la nota en el comentario del PR y deja tu revisión en el PR de tu compañero.

**Checkpoint:** lunes 16 de noviembre, 11:59 p. m. Ese día la profe revisa que la Fase 3 esté en ✅ y que hayas dejado tu revisión.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
