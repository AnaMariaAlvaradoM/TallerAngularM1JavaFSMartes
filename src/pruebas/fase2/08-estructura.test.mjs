// Pruebas de estructura de la Fase 2: leen tus archivos (sin comentarios) y revisan el router.
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { leer, archivosCon } from '../utilidades-estructura.mjs';

it('App muestra las páginas con <router-outlet />', () => {
  assert.match(leer('app.html'), /<router-outlet\b/, 'app.html debería tener <router-outlet /> donde antes estaba el listado');
});

it('app.config.ts usa withComponentInputBinding()', () => {
  assert.match(leer('app.config.ts'), /withComponentInputBinding\s*\(\s*\)/, 'app.config.ts debería tener provideRouter(routes, withComponentInputBinding())');
});

it('listado y detalle se cargan con loadComponent (lazy loading)', () => {
  const rutas = leer('app.routes.ts');
  const cuantas = (rutas.match(/\bloadComponent\s*:/g) || []).length;
  assert.ok(cuantas >= 2, `app.routes.ts debería usar loadComponent en mascotas y en mascotas/:id (encontré ${cuantas})`);
  assert.doesNotMatch(
    rutas,
    /^\s*import\s[^;]*from\s*['"]\.\/pages\/(listado-mascotas|detalle-mascota)\//m,
    'Borra los import de arriba de ListadoMascotas y DetalleMascota en app.routes.ts: si quedan, no hay lazy loading',
  );
});

it('no usa RouterModule (Angular viejo)', () => {
  assert.match(leer('app.routes.ts'), /\bpath\s*:/, 'Aún no hay rutas en app.routes.ts');
  const viejos = archivosCon('.ts', /\bRouterModule\b/);
  assert.deepEqual(viejos, [], `Cambia RouterModule.forRoot por provideRouter y RouterLink en: ${viejos.join(', ')}`);
});

it('el encabezado usa routerLink y routerLinkActive', () => {
  const plantilla = leer('components/encabezado/encabezado.html');
  assert.match(plantilla, /\brouterLink\b/, 'encabezado.html debería usar routerLink en sus enlaces');
  assert.match(plantilla, /\brouterLinkActive\b/, 'encabezado.html debería usar routerLinkActive para marcar la página actual');
});

it('los enlaces internos usan routerLink, no href (href recarga toda la app)', () => {
  assert.match(leer('components/tarjeta-mascota/tarjeta-mascota.html'), /\brouterLink\b/, 'tarjeta-mascota.html debería tener el enlace "Ver detalle" con routerLink');
  const conHref = archivosCon('.html', /\bhref\s*=\s*["']\/(?!\/)/);
  assert.deepEqual(conHref, [], `Cambia href="/..." por routerLink="/..." en: ${conHref.join(', ')}`);
});
