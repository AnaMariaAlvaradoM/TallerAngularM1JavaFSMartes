import { TestBed } from '@angular/core/testing';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { FavoritosStore } from '../../app/services/favoritos-store';
import { RespuestaSimulada, configurar, renderizar, texto, todos, uno } from '../utilidades';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

describe('3.6 · Total filtrado y favoritas desde el listado', () => {
  beforeEach(() => configurar());

  it('total-mascotas muestra la cantidad filtrada, no la total', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    uno(fixture, 'input[data-testid="solo-disponibles"]')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const disponibles = MASCOTAS.filter((m) => !m.adoptada).length;
    expect(texto(uno(fixture, '[data-testid="total-mascotas"]')).match(/\d+/)?.[0], `Con "solo disponibles" total-mascotas debería mostrar ${disponibles} (usa la lista filtrada)`).toBe(String(disponibles));
  });

  it('el botón de la tarjeta marca la mascota en FavoritosStore (el listado decide)', async () => {
    const fixture = await renderizar(ListadoMascotas, {}, api);
    const store = TestBed.inject(FavoritosStore);
    todos(fixture, '[data-testid="boton-favorito"]')[0]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(store.ids(), `Al hacer clic en la primera tarjeta, el listado debería llamar a alternar(${MASCOTAS[0].id})`).toEqual([MASCOTAS[0].id]);
    expect(texto(todos(fixture, '[data-testid="boton-favorito"]')[0]).toLowerCase(), 'Después del clic, esa tarjeta debería decir "En mi lista" (pásale [esFavorita])').toContain('en mi lista');
  });
});
