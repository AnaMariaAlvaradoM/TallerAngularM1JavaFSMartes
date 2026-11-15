import { TestBed } from '@angular/core/testing';
import { Encabezado } from '../../app/components/encabezado/encabezado';
import { FavoritosStore } from '../../app/services/favoritos-store';
import { configurar, renderizar, texto, uno } from '../utilidades';

describe('3.7 · Contador en el encabezado', () => {
  beforeEach(() => configurar());

  it('data-testid="contador-favoritas" empieza en 0', async () => {
    const fixture = await renderizar(Encabezado);
    const contador = uno(fixture, '[data-testid="contador-favoritas"]');
    expect(contador, 'Falta el elemento con data-testid="contador-favoritas" en el encabezado').not.toBeNull();
    expect(texto(contador), 'Sin favoritas el contador debería mostrar 0').toBe('0');
  });

  it('cambia solo cuando se marca o se quita una favorita', async () => {
    const fixture = await renderizar(Encabezado);
    const store = TestBed.inject(FavoritosStore);
    store.alternar(1);
    store.alternar(4);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(texto(uno(fixture, '[data-testid="contador-favoritas"]')), 'Con 2 favoritas el contador debería mostrar 2 (lee total() del servicio)').toBe('2');
    store.alternar(1);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(texto(uno(fixture, '[data-testid="contador-favoritas"]')), 'Al quitar una, el contador debería bajar a 1').toBe('1');
  });
});
