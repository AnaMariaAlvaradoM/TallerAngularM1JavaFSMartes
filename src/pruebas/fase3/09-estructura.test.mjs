// Pruebas de estructura de la Fase 3: leen tus archivos (sin comentarios) y revisan el estado.
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { leer, archivosCon } from '../utilidades-estructura.mjs';

it('el listado guarda su estado local con signal() y lo deriva con computed()', () => {
  const listado = leer('pages/listado-mascotas/listado-mascotas.ts');
  assert.match(listado, /\bsignal\s*[<(]/, 'listado-mascotas.ts debería guardar el texto del buscador y la casilla con signal(...)');
  assert.match(listado, /\bcomputed\s*\(/, 'listado-mascotas.ts debería calcular las mascotas filtradas con computed(...)');
});

it('FavoritosStore usa @Service() y expone ids con asReadonly()', () => {
  const store = leer('services/favoritos-store.ts');
  assert.match(store, /@Service\s*\(/, 'favoritos-store.ts debería usar @Service() (Angular 22), no @Injectable');
  assert.match(store, /\.asReadonly\s*\(\s*\)/, 'favoritos-store.ts debería exponer ids con asReadonly()');
  assert.match(store, /\bcomputed\s*\(/, 'favoritos-store.ts debería calcular total con computed(...)');
});

it('la tarjeta avisa con output() y no toca el servicio', () => {
  const tarjeta = leer('components/tarjeta-mascota/tarjeta-mascota.ts');
  assert.match(tarjeta, /\boutput\s*</, 'tarjeta-mascota.ts debería declarar favoritoAlternado = output<number>()');
  assert.doesNotMatch(tarjeta, /\binject\s*\(|FavoritosStore/, 'La tarjeta no debería inyectar FavoritosStore: emite el id y que el padre decida');
});

it('Mi lista y el encabezado leen el mismo servicio con inject()', () => {
  assert.match(leer('components/encabezado/encabezado.ts'), /inject\s*\(\s*FavoritosStore\s*\)/, 'encabezado.ts debería tener inject(FavoritosStore)');
  assert.match(leer('pages/mi-lista/mi-lista.ts'), /inject\s*\(\s*FavoritosStore\s*\)/, 'mi-lista.ts debería tener inject(FavoritosStore)');
});

it('mi-lista se carga con loadComponent, antes de la ruta **', () => {
  const rutas = leer('app.routes.ts');
  const miLista = rutas.search(/['"]mi-lista['"]/);
  const comodin = rutas.search(/['"]\*\*['"]/);
  assert.ok(miLista >= 0, "app.routes.ts debería tener la ruta 'mi-lista'");
  assert.ok(comodin < 0 || miLista < comodin, "La ruta 'mi-lista' debería ir antes de '**'");
  assert.match(rutas, /mi-lista\/mi-lista['"]\s*\)\s*\.then/, "La ruta 'mi-lista' debería usar loadComponent con import('./pages/mi-lista/mi-lista')");
});

it('no usa Angular viejo para el estado (@Injectable, @Output, EventEmitter, BehaviorSubject, effect)', () => {
  assert.ok(leer('services/favoritos-store.ts'), 'Aún no existe src/app/services/favoritos-store.ts para revisar');
  const viejos = archivosCon('.ts', /@Injectable\s*\(|@Output\s*\(|\bEventEmitter\b|\bBehaviorSubject\b|\beffect\s*\(/);
  assert.deepEqual(viejos, [], `Cambia a @Service(), output(), signal() y computed() en: ${viejos.join(', ')}`);
});
