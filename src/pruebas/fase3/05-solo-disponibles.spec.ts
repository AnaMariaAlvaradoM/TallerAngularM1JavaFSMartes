import { MASCOTAS } from '../../app/data/mascotas.mock';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { RespuestaSimulada, configurar, renderizar, texto, todos, uno } from '../utilidades';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

describe('3.5 · Casilla "solo disponibles"', () => {
  beforeEach(() => configurar());

  it('al marcarla oculta las mascotas adoptadas', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    const casilla = uno(fixture, 'input[type="checkbox"][data-testid="solo-disponibles"]');
    expect(casilla, 'Falta el <input type="checkbox"> con data-testid="solo-disponibles"').not.toBeNull();
    casilla!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const esperadas = MASCOTAS.filter((m) => !m.adoptada).map((m) => m.nombre);
    expect(todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e)), 'Con la casilla marcada solo deberían verse las disponibles').toEqual(esperadas);
  });

  it('se combina con el buscador y al desmarcarla vuelven las adoptadas', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    const campo = uno(fixture, 'input[data-testid="buscador"]') as HTMLInputElement;
    campo.value = 'nube';
    campo.dispatchEvent(new Event('input'));
    const casilla = uno(fixture, 'input[data-testid="solo-disponibles"]')!;
    casilla.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(todos(fixture, '[data-testid="nombre-mascota"]').length, 'Nube está adoptada: con "nube" y la casilla marcada no debería quedar ninguna').toBe(0);
    casilla.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e)), 'Al desmarcar la casilla, Nube debería volver').toEqual(['Nube']);
  });
});
