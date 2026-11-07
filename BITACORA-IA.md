# 🤖 Bitácora de IA · Huella Amiga

Una entrada por fase. Sé honesto: usar IA está permitido; lo que se evalúa es tu criterio para revisar lo que te da.

---

## Fase 1 · Base y componentes

**1. Qué le pedí a la IA (el prompt):**

Necesito construir la Fase 1 de un proyecto Angular de adopción de mascotas. Quiero crear los componentes `Etiqueta`, `Encabezado`, `TarjetaMascota`, `ListadoMascotas`, el modelo `Mascota`, los datos mock y la estructura de carpetas según la guía del taller, usando Angular 22 con `input()` y `@for`/`@empty`, sin Angular viejo.

**2. Qué me propuso (resumen, sin pegar todo):**

Generó la estructura de componentes standalone, el modelo tipado, datos de prueba con varias mascotas y plantillas con los selectores y `data-testid` pedido por las pruebas. También sugirió seguir la regla de edad en meses para mostrar años/meses correctamente.

**3. Qué detecté** (señales de Angular viejo, errores o cosas que no entendía):

Revisé que no debía usar `*ngFor`, `*ngIf`, `@Input()` ni `NgModule`. Tampoco debía crear el `App` con un texto de bienvenida y había que usar `input.required()` para los inputs obligatorios. Comprobé además que la cabecera y las etiquetas debían tener los `data-testid` exactos especificados por la prueba.

**4. Qué cambié y cómo lo verifiqué** (documentación, pruebas, navegador):

Creé la estructura en `src/app/`, los archivos de modelo y mock, los componentes standalone y el listado con `@for`/`@empty`. Luego ejecuté `npm run calificar -- 1` para verificar la fase 1 y corregir cualquier discrepancia antes de cerrar la entrega.

---

## Fase 2 · Navegación

**1. Qué le pedí a la IA (el prompt):**

Necesito completar la Fase 2 de un proyecto Angular con rutas para `/`, `/mascotas`, `/mascotas/:id` y `**`, plus lazy loading con `loadComponent`, el detalle de mascota con `input.required`, enlace del encabezado con `routerLinkActive` y la vista 404. Quiero evitar Angular viejo y asegurar los selectores exactos.

**2. Qué me propuso (resumen, sin pegar todo):**

Generó la configuración del Router con `withComponentInputBinding()`, rutas con lazy loading, componentes `Inicio`, `DetalleMascota` y `NoEncontrada`, así como el enlace de detalle en cada tarjeta y la navegación del encabezado.

**3. Qué detecté** (señales de Angular viejo, errores o cosas que no entendía):

Tuve que revisar que la ruta raíz y la 404 fueran componentes directos, que `mascotas` y `mascotas/:id` usaran `loadComponent`, y que los enlaces no fueran `href` sino `routerLink`. También había que recordar que el `id` de la URL llega como texto y debía convertirse con `Number(...)` al buscar la mascota.

**4. Qué cambié y cómo lo verifiqué** (documentación, pruebas, navegador):

Reemplacé la configuración del router, añadí la navegación con `routerLink`, creé las páginas `Inicio`, `DetalleMascota` y `NoEncontrada`, y dejé la tarjeta con el enlace "Ver detalle". Validé con `npm run calificar -- 2` y la fase 2 quedó en 29/30, con el último ajuste de estructura en el HTML del encabezado.

---
