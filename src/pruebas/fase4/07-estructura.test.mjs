// Pruebas de estructura de la Fase 4: leen tus archivos (sin comentarios) y revisan la arquitectura.
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { leer, archivosCon } from '../utilidades-estructura.mjs';

const enVistas = (ruta) => ruta.startsWith('src/app/pages/') || ruta.startsWith('src/app/components/');

it('ninguna página ni componente usa HttpClient: eso es trabajo de MascotasApi', () => {
  assert.ok(leer('services/mascotas-api.ts'), 'Aún no existe src/app/services/mascotas-api.ts para revisar');
  const conHttp = archivosCon('.ts', /\bHttpClient\b/).filter(enVistas);
  assert.deepEqual(conHttp, [], `Mueve las peticiones a MascotasApi y quita HttpClient de: ${conHttp.join(', ')}`);
});

it('ninguna página ni componente importa los datos de prueba (mascotas.mock)', () => {
  assert.ok(leer('services/mascotas-api.ts'), 'Aún no existe src/app/services/mascotas-api.ts para revisar');
  const conMock = archivosCon('.ts', /from\s*['"][^'"]*mascotas\.mock['"]/).filter(enVistas);
  assert.deepEqual(conMock, [], `Los datos ahora llegan de la API: quita el import de mascotas.mock en: ${conMock.join(', ')}`);
});

it('MascotasApi usa @Service() e inject(HttpClient)', () => {
  const api = leer('services/mascotas-api.ts');
  assert.match(api, /@Service\s*\(/, 'mascotas-api.ts debería usar @Service() (Angular 22), no @Injectable');
  assert.match(api, /inject\s*\(\s*HttpClient\s*\)/, 'mascotas-api.ts debería pedir el cliente con inject(HttpClient), no por el constructor');
});

it('las URLs son relativas (/api/...): el proxy las lleva al backend', () => {
  const api = leer('services/mascotas-api.ts');
  assert.match(api, /['"`]\/api\//, "mascotas-api.ts debería usar direcciones que empiezan por '/api/'");
  const conHost = archivosCon('.ts', /https?:\/\/(localhost|127\.0\.0\.1)/);
  assert.deepEqual(conHost, [], `No escribas http://localhost:8080 en el código: usa '/api/...' y deja que el proxy haga el resto. Revisa: ${conHost.join(', ')}`);
});

it('el listado y el detalle traducen los errores con mensajeDeError', () => {
  assert.match(leer('shared/mensaje-error.ts'), /export\s+function\s+mensajeDeError\b/, 'shared/mensaje-error.ts debería exportar la función mensajeDeError');
  assert.match(leer('pages/listado-mascotas/listado-mascotas.ts'), /\bmensajeDeError\s*\(/, 'listado-mascotas.ts debería usar mensajeDeError(...) al recibir un error');
  assert.match(leer('pages/detalle-mascota/detalle-mascota.ts'), /\bmensajeDeError\s*\(/, 'detalle-mascota.ts debería usar mensajeDeError(...) al recibir un error');
});

it('no usa Angular viejo para HTTP (HttpClientModule, constructor(private http…), @Injectable)', () => {
  const viejos = archivosCon('.ts', /\bHttpClientModule\b|constructor\s*\(\s*(private|public|protected)\s+\w+\s*:\s*HttpClient\b|@Injectable\s*\(/);
  assert.deepEqual(viejos, [], `HttpClient ya viene incluido en Angular 22: usa inject(HttpClient) y @Service() en: ${viejos.join(', ')}`);
});
