import { isSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FavoritosStore } from '../../app/services/favoritos-store';
import { configurar } from '../utilidades';

describe('3.1 · FavoritosStore', () => {
  beforeEach(() => configurar());

  it('se puede inyectar sin agregarlo a providers (@Service)', () => {
    const store = TestBed.inject(FavoritosStore);
    expect(store, 'FavoritosStore debería llevar @Service() para que Angular lo entregue en toda la app').toBeTruthy();
  });

  it('es una sola instancia para toda la app', () => {
    expect(TestBed.inject(FavoritosStore), 'Dos inject(FavoritosStore) deberían devolver el mismo objeto').toBe(TestBed.inject(FavoritosStore));
  });

  it('ids es una signal de solo lectura que empieza vacía', () => {
    const store = TestBed.inject(FavoritosStore);
    expect(isSignal(store.ids), 'ids debería ser una signal (por ejemplo, this.idsPrivados.asReadonly())').toBe(true);
    expect(store.ids(), 'Al empezar, ids() debería ser un arreglo vacío').toEqual([]);
    expect((store.ids as unknown as { set?: unknown }).set, 'ids no debería tener set: exponla con asReadonly() para que nadie la cambie desde afuera').toBeUndefined();
  });

  it('total es una signal derivada (computed) que empieza en 0', () => {
    const store = TestBed.inject(FavoritosStore);
    expect(isSignal(store.total), 'total debería ser una signal creada con computed(...)').toBe(true);
    expect(store.total(), 'Al empezar, total() debería ser 0').toBe(0);
    expect((store.total as unknown as { set?: unknown }).set, 'total no debería tener set: es un valor derivado con computed').toBeUndefined();
  });
});
