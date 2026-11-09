import { MASCOTAS } from '../../app/data/mascotas.mock';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { RespuestaSimulada, configurar, renderizar, texto, todos, uno } from '../utilidades';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

async function escribir(fixture: Awaited<ReturnType<typeof renderizar>>, valor: string): Promise<void> {
  const campo = uno(fixture, 'input[data-testid="buscador"]') as HTMLInputElement | null;
  expect(campo, 'Falta el <input> con data-testid="buscador"').not.toBeNull();
  campo!.value = valor;
  campo!.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function nombres(fixture: Awaited<ReturnType<typeof renderizar>>): string[] {
  return todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e));
}

describe('3.4 · Buscador del listado', () => {
  beforeEach(() => configurar());

  it('filtra por nombre mientras escribes', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    await escribir(fixture, 'Luna');
    expect(nombres(fixture), 'Al escribir "Luna" solo debería quedar Luna (usa (input) y una signal)').toEqual(['Luna']);
  });

  it('no distingue mayúsculas ni minúsculas', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    await escribir(fixture, 'rOcK');
    expect(nombres(fixture), 'Al escribir "rOcK" debería quedar Rocky (compara todo en minúsculas)').toEqual(['Rocky']);
  });

  it('al borrar el texto vuelven todas', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    await escribir(fixture, 'zzz');
    expect(nombres(fixture), 'Con "zzz" no debería quedar ninguna').toEqual([]);
    await escribir(fixture, '');
    expect(nombres(fixture).length, `Con el buscador vacío deberían verse las ${MASCOTAS.length}`).toBe(MASCOTAS.length);
  });
});
