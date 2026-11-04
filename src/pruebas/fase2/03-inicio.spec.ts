import { reflectComponentType } from '@angular/core';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { Inicio } from '../../app/pages/inicio/inicio';
import { RespuestaSimulada, configurar, renderizar, texto, todos, uno } from '../utilidades';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

describe('2.3 · Inicio', () => {
  beforeEach(() => configurar());

  it('usa el selector app-inicio', () => {
    expect(reflectComponentType(Inicio)?.selector, 'El selector debería ser app-inicio').toBe('app-inicio');
  });

  it('tiene un enlace data-testid="ir-a-mascotas" hacia /mascotas', async () => {
    const fixture = await renderizar(Inicio, {}, api);
    const enlace = uno(fixture, '[data-testid="ir-a-mascotas"]');
    expect(enlace, 'Falta el enlace con data-testid="ir-a-mascotas"').not.toBeNull();
    expect(enlace?.getAttribute('href'), 'ir-a-mascotas debería llevar a /mascotas (usa routerLink)').toBe('/mascotas');
  });

  it('muestra 3 mascotas reutilizando <app-tarjeta-mascota>', async () => {
    const fixture = await renderizar(Inicio, {}, api);
    expect(todos(fixture, 'app-tarjeta-mascota').length, 'El inicio debería mostrar exactamente 3 tarjetas (pista: slice(0, 3))').toBe(3);
  });

  it('las 3 mascotas del inicio siguen disponibles (ninguna adoptada)', async () => {
    const fixture = await renderizar(Inicio, {}, api);
    const disponibles = MASCOTAS.filter((m) => !m.adoptada).map((m) => m.nombre);
    const nombres = todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e));
    expect(nombres.length, 'El inicio debería mostrar tarjetas con el nombre de cada mascota').toBeGreaterThan(0);
    for (const nombre of nombres) {
      expect(disponibles, `${nombre} ya fue adoptada: el inicio solo muestra disponibles (pista: filter)`).toContain(nombre);
    }
  });
});
