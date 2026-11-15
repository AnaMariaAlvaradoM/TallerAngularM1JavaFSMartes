import { TestBed } from '@angular/core/testing';
import { FavoritosStore } from '../../app/services/favoritos-store';
import { configurar } from '../utilidades';

describe('3.2 · alternar y esFavorita', () => {
  beforeEach(() => configurar());

  it('alternar(id) agrega el id si no estaba', () => {
    const store = TestBed.inject(FavoritosStore);
    store.alternar(4);
    expect(store.ids(), 'Después de alternar(4), ids() debería ser [4]').toEqual([4]);
    expect(store.esFavorita(4), 'esFavorita(4) debería ser true').toBe(true);
    expect(store.esFavorita(5), 'esFavorita(5) debería ser false: nunca se marcó').toBe(false);
  });

  it('alternar(id) lo quita si ya estaba', () => {
    const store = TestBed.inject(FavoritosStore);
    store.alternar(2);
    store.alternar(5);
    store.alternar(2);
    expect(store.ids(), 'alternar(2) dos veces debería dejar solo [5]').toEqual([5]);
    expect(store.esFavorita(2), 'esFavorita(2) debería volver a false').toBe(false);
  });

  it('total cuenta las favoritas y nunca repite un id', () => {
    const store = TestBed.inject(FavoritosStore);
    store.alternar(1);
    store.alternar(3);
    expect(store.total(), 'Con 2 favoritas, total() debería ser 2').toBe(2);
    store.alternar(1);
    store.alternar(1);
    expect(store.total(), 'Quitar y volver a poner el 1 no debería repetirlo: total() sigue en 2').toBe(2);
    expect(new Set(store.ids()).size, 'ids() no debería tener ids repetidos').toBe(store.ids().length);
  });
});
