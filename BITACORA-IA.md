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
