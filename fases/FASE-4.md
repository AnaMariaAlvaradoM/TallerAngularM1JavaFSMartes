# 🐾 Fase 4 · API real, refactor y entrega

**Taller Módulo 1 · Huella Amiga** · Se publica: martes 17 de noviembre · **Cierre del taller: domingo 22 de noviembre, 11:59 p. m.**

---

## 📨 Lo que pide la fundación

> **De:** Coordinación de Adopciones · Fundación Huella Amiga
> **Asunto:** Ya tenemos la API: ¡conéctenla!
>
> Nuestro equipo de sistemas terminó la API. Hoy, cada vez que llega una mascota nueva, alguien tiene que cambiar el código del portal para que aparezca; con la API eso se acaba. Necesitamos que el portal **muestre las mascotas que están en la API**, que si el servidor falla la persona vea **un mensaje claro** (nunca una pantalla en blanco ni un texto técnico) y, lo más importante, que desde la página de cada mascota se pueda **enviar la solicitud de adopción**. Con eso dejamos de perder solicitudes por chat.

---

## 🎯 Qué vas a construir

Lo mismo que hicimos con Tarima en la Clase 4, aplicado a Huella Amiga:

| En clase (Tarima) | Tú (Huella Amiga) |
|---|---|
| `EventosApi` con `@Service()` e `inject(HttpClient)` | `MascotasApi` con `@Service()` e `inject(HttpClient)` |
| Modelo `Reserva` | Modelo `SolicitudAdopcion` |
| `mensajeDeError(error)` en `shared/` | `mensajeDeError(error)` en `shared/` (mismo contrato) |
| Listado y detalle con `cargando` y `error` | Listado y detalle con `cargando` y `error` |
| Reserva con `POST /api/reservas` | Solicitud con `POST /api/solicitudes` |
| Adiós a `eventos.mock.ts` en las vistas | Adiós a `mascotas.mock.ts` en las vistas |

Todo tu código sigue dentro de **`src/app/`**. El kit de estilos ya trae `mensaje`, `mensaje--error`, `mensaje--exito`, `campo` y `boton:disabled`.

> [!TIP]
> Antes de empezar, actualiza tu fork (README, Paso 8): **Sync fork → Update branch**, y luego `git pull` y `npm install`. Con esa actualización llega también `proxy.conf.json`.

---

## 🔌 Antes de empezar: el backend y el proxy

1. Descarga `api-modulo1.jar` (enlace en la plataforma). Necesitas **JDK 21**.
2. En la carpeta donde lo guardaste: `java -jar api-modulo1.jar`
3. Abre `http://localhost:8080/api/mascotas`: debes ver un JSON con las mascotas.
4. En otra terminal, en tu repo: `ng serve`. Angular ya trae **`proxy.conf.json`** (lo puso la profe en la raíz): todo lo que pidas a `/api/...` desde `localhost:4200` lo reenvía a `localhost:8080`. Por eso en tu código las direcciones **empiezan por `/api/`** y nunca dicen `http://localhost:8080`.

| Método | URL | Respuestas |
|---|---|---|
| GET | `/api/mascotas` | `200` lista |
| GET | `/api/mascotas/{id}` | `200` · `404` |
| POST | `/api/solicitudes` | `201` · `400` (campos vacíos o correo inválido) |

Para practicar estados: `/api/mascotas?demora=3000` responde 3 segundos después y `/api/mascotas?simularError=500` responde con error 500.

> Las pruebas automáticas **no necesitan** el backend: simulan las respuestas. El backend es para que veas tu portal funcionando de verdad y tomes las capturas del README.

---

## 📋 El contrato (nombres exactos)

Las pruebas buscan estos nombres **tal cual**. Si cambias uno, la prueba no lo encuentra.

### 1 · Modelo · `src/app/models/solicitud-adopcion.ts`

```text
interface SolicitudAdopcion { mascotaId: number; nombreCompleto: string; correo: string; motivo: string }
```

### 2 · Servicio · `src/app/services/mascotas-api.ts`

- Clase `MascotasApi` con **`@Service()`** y el cliente con **`inject(HttpClient)`** (no por el constructor, no `HttpClientModule`).
- `listar()` → `GET /api/mascotas` → devuelve `Observable<Mascota[]>`.
- `obtener(id: number)` → `GET /api/mascotas/{id}` → `Observable<Mascota>`.
- `enviarSolicitud(solicitud: SolicitudAdopcion)` → `POST /api/solicitudes` con la solicitud como cuerpo.

### 3 · Errores · `src/app/shared/mensaje-error.ts`

Función `export function mensajeDeError(error: HttpErrorResponse): string`:

| `error.status` | Mensaje (exacto) |
|---|---|
| `0` (servidor apagado) | `No pudimos conectar con el servidor. Intenta más tarde.` |
| `404` | `No encontramos lo que buscas.` |
| `500` o más | `Tuvimos un problema en el servidor. Intenta más tarde.` |
| cualquier otro | `Ocurrió un error (código N).` (con el número) |

### 4 · Listado · `ListadoMascotas`

- Pide las mascotas a `MascotasApi.listar()` (ya no a `MASCOTAS`).
- Mientras llega la respuesta: un elemento con `data-testid="cargando"`.
- Si falla: un elemento con `data-testid="mensaje-error"` con el texto de `mensajeDeError`.
- El buscador, la casilla, el total filtrado y las favoritas de la Fase 3 **siguen funcionando** sobre los datos de la API.

### 5 · Detalle · `DetalleMascota`

- Pide la mascota con `MascotasApi.obtener(id)` (recuerda: el `id` llega como texto).
- Mientras llega: `data-testid="cargando"`.
- Si la API responde **404**: el mismo `data-testid="mascota-no-encontrada"` de la Fase 2.
- Si falla por otra razón (servidor apagado, 500…): `data-testid="mensaje-error"` con el texto de `mensajeDeError`.

### 6 · Formulario de solicitud (dentro del detalle)

- Campos: `data-testid="input-nombre"`, `data-testid="input-correo"` y `data-testid="input-motivo"` (este puede ser un `<textarea>`).
- Botón `data-testid="enviar-solicitud"`: **deshabilitado** mientras haya algún campo vacío.
- Al hacer clic: `enviarSolicitud({ mascotaId, nombreCompleto, correo, motivo })`.
- Si la API responde bien (`201`): un elemento con `data-testid="solicitud-exitosa"`.

### 7 · Refactor final

- Ninguna página ni componente importa `HttpClient`: eso es trabajo de `MascotasApi`.
- Ninguna página ni componente importa `mascotas.mock`. **No borres** `src/app/data/mascotas.mock.ts`: las pruebas lo siguen usando como datos simulados.
- `Inicio` y `MiLista` también piden los datos a `MascotasApi` (si no, la prueba de estructura los encuentra importando el mock).

---

## 📐 Reglas de negocio

- El botón de enviar se deshabilita si hay campos vacíos (un campo con solo espacios cuenta como vacío).
- Si el servidor está apagado, el mensaje lo dice claramente: **nunca** un texto técnico como `Http failure response…`.
- Un 404 no es un error del servidor: es "Mascota no encontrada", con su enlace para volver.

**Pista:** el componente muestra; el servicio trae los datos. Los estados `cargando` y `error` son **signals**, igual que el buscador de la Fase 3.

---

## ✅ Cómo saber que vas bien

```bash
npm run calificar -- 4
```

La Fase 4 tiene **7 partes y 29 pruebas**:

| Parte | Qué revisa | Pruebas |
|---|---|---|
| 4.1 | Modelo `SolicitudAdopcion` | 2 |
| 4.2 | `MascotasApi`: `@Service`, `listar`, `obtener` y `enviarSolicitud` | 4 |
| 4.3 | `mensajeDeError` con 0, 404, 500, 503 y 400 | 5 |
| 4.4 | Listado conectado: cargando, datos de la API y errores | 4 |
| 4.5 | Detalle conectado: datos de la API, 404 y 500 | 3 |
| 4.6 | Formulario de solicitud | 5 |
| 4.7 | Estructura de la conexión y Angular 22 | 6 |

Tu nota final cuenta **las cuatro fases** (35 + 30 + 30 + 29 = 124 pruebas).

Y en el navegador, con el backend corriendo y `ng serve`:

1. `/mascotas` muestra las mascotas que vienen de la API (las del JSON de `localhost:8080`).
2. Detén el backend (`Ctrl+C`) y recarga: aparece "Tuvimos un problema en el servidor. Intenta más tarde." (el proxy de Angular no encuentra el backend y responde `502`). Para ver el mensaje de "No pudimos conectar…" (status `0`), abre las herramientas del navegador (F12) → **Network** → **Offline**, y entra a otra página del portal desde el menú.
3. Vuelve a levantarlo, entra al detalle de una mascota, llena el formulario y envía: aparece el mensaje de éxito.
4. Abre `/mascotas/999`: "Mascota no encontrada".

---

## 📦 Entrega final (revisión docente · 30 %)

- **`README.md`** de tu repo (puedes reemplazar el de la profe en tu fork): qué hace la app, cómo correrla (backend + frontend) y **3 capturas** (listado, detalle con el formulario y un mensaje de error).
- **`BITACORA-IA.md`** con las **4 entradas**, una por fase.
- Calidad: nombres claros, cada pieza con una sola responsabilidad, nada de código comentado sobrante.

---

## 🤖 Uso de IA en esta fase

- **Nivel permitido: 2 · Copiloto.** La IA puede proponerte el servicio o el formulario, pero tú lees, explicas y pruebas cada línea.
- Pídele algo como: "En Angular 22, maneja los errores de esta petición HTTP para mostrar un mensaje claro al usuario. Usa inject(HttpClient) y signals".
- Revisa lo que te dé con el **Detector de Angular viejo**: ¿importó `HttpClientModule`? ¿Puso `constructor(private http: HttpClient)`? ¿Contempla el error `0` (servidor apagado)? ¿Le muestra al usuario el mensaje técnico crudo?
- Escribe la **entrada 4** en [`BITACORA-IA.md`](../BITACORA-IA.md).

---

## 📤 Entrega

1. `git add .` → `git commit -m "Fase 4"` → `git push`.
2. Tu Pull Request se actualiza solo: **no abras otro**.
3. Revisa la nota en el comentario del PR.

**Cierre del taller:** domingo 22 de noviembre, 11:59 p. m. A esa hora la nota se congela: lo que subas después ya no la cambia.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
