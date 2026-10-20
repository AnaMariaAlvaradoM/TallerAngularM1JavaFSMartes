import { reflectComponentType } from '@angular/core';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { RespuestaSimulada, configurar, renderizar, texto, todos, uno } from '../utilidades';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

describe('1.6 · Listado de mascotas', () => {
  beforeEach(() => configurar());

  it('usa el selector app-listado-mascotas', () => {
    expect(reflectComponentType(ListadoMascotas)?.selector, 'El selector debería ser app-listado-mascotas').toBe('app-listado-mascotas');
  });

  it('pinta una <app-tarjeta-mascota> por cada mascota', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    expect(todos(fixture, 'app-tarjeta-mascota').length, `Deberían verse ${MASCOTAS.length} tarjetas (usa @for)`).toBe(MASCOTAS.length);
  });

  it('cada tarjeta muestra el nombre de su mascota, en el mismo orden', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    const nombres = todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e));
    expect(nombres, 'Los nombres deberían salir en el orden de MASCOTAS').toEqual(MASCOTAS.map((m) => m.nombre));
  });

  it('data-testid="total-mascotas" muestra cuántas mascotas hay', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    const total = texto(uno(fixture, '[data-testid="total-mascotas"]'));
    expect(total.match(/\d+/)?.[0], `total-mascotas debería mostrar el número ${MASCOTAS.length}`).toBe(String(MASCOTAS.length));
  });
});
