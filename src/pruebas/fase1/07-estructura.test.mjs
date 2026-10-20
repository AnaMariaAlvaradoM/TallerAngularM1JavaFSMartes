// Pruebas de estructura: leen tus archivos (sin comentarios) y revisan la arquitectura.
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { APP, leer, archivosCon } from '../utilidades-estructura.mjs';

it('existen las carpetas components, pages, shared, models y data', () => {
  for (const carpeta of ['components', 'pages', 'shared', 'models', 'data']) {
    const ruta = `${APP}/${carpeta}`;
    assert.ok(existsSync(ruta) && statSync(ruta).isDirectory(), `Falta la carpeta src/app/${carpeta}`);
  }
});

it('existe la carpeta services (con un .gitkeep para que Git la suba)', () => {
  const ruta = `${APP}/services`;
  assert.ok(existsSync(ruta) && statSync(ruta).isDirectory(), 'Falta src/app/services: créala con un archivo vacío .gitkeep adentro');
});

it('el listado recorre las mascotas con @for y track', () => {
  assert.match(leer('pages/listado-mascotas/listado-mascotas.html'), /@for\s*\([^)]*;\s*track\s+/, 'listado-mascotas.html debería usar @for (...; track ...)');
});

it('el listado tiene @empty con data-testid="sin-mascotas"', () => {
  const plantilla = leer('pages/listado-mascotas/listado-mascotas.html');
  assert.match(plantilla, /@empty\s*\{[\s\S]*data-testid="sin-mascotas"/, 'Después del @for debería ir @empty { ... data-testid="sin-mascotas" ... }');
});

it('las plantillas no usan *ngFor ni *ngIf (Angular viejo)', () => {
  assert.ok(existsSync(`${APP}/components/tarjeta-mascota/tarjeta-mascota.html`), 'Aún no existe tarjeta-mascota.html para revisar');
  const viejas = archivosCon('.html', /\*ng(For|If)\b/);
  assert.deepEqual(viejas, [], `Cambia *ngFor/*ngIf por @for/@if en: ${viejas.join(', ')}`);
});

it('los componentes usan input() y no @Input() ni NgModule (Angular viejo)', () => {
  assert.match(leer('components/tarjeta-mascota/tarjeta-mascota.ts'), /\binput(\.required)?\s*[<(]/, 'tarjeta-mascota.ts debería declarar su mascota con input.required<Mascota>()');
  const viejos = archivosCon('.ts', /@Input\s*\(|@NgModule\s*\(/);
  assert.deepEqual(viejos, [], `Cambia @Input()/NgModule por input() y componentes standalone en: ${viejos.join(', ')}`);
});

it('App muestra el encabezado', () => {
  assert.match(leer('app.html'), /<app-encabezado\b/, 'app.html debería usar <app-encabezado />');
});
