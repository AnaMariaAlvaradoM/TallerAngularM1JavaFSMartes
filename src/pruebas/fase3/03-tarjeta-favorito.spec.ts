import { Mascota } from '../../app/models/mascota';
import { TarjetaMascota } from '../../app/components/tarjeta-mascota/tarjeta-mascota';
import { configurar, renderizar, texto, uno } from '../utilidades';

const base: Mascota = {
  id: 9,
  nombre: 'Lola',
  especie: 'gato',
  edadMeses: 14,
  descripcion: 'Duerme en cualquier caja que encuentre.',
  adoptada: false,
};

describe('3.3 · Botón de favorito en la tarjeta', () => {
  beforeEach(() => configurar());

  it('tiene un botón data-testid="boton-favorito"', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: base });
    expect(uno(fixture, 'button[data-testid="boton-favorito"]'), 'Falta el <button> con data-testid="boton-favorito"').not.toBeNull();
  });

  it('al hacer clic emite favoritoAlternado con el id de la mascota', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: base });
    const emitidos: unknown[] = [];
    const tarjeta = fixture.componentInstance as unknown as { favoritoAlternado?: { subscribe: (fn: (v: unknown) => void) => unknown } };
    expect(tarjeta.favoritoAlternado, 'La tarjeta debería declarar favoritoAlternado = output<number>()').toBeDefined();
    tarjeta.favoritoAlternado?.subscribe((valor) => emitidos.push(valor));
    uno(fixture, 'button[data-testid="boton-favorito"]')?.click();
    expect(emitidos, 'Al hacer clic, favoritoAlternado debería emitir solo el id de la mascota (9): usa favoritoAlternado.emit(mascota().id)').toEqual([9]);
  });

  it('sin esFavorita (por defecto false) el botón dice "Me interesa"', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: base });
    expect(texto(uno(fixture, '[data-testid="boton-favorito"]')).toLowerCase(), 'Con esFavorita en false el botón debería decir "Me interesa" (declara esFavorita = input(false))').toContain('me interesa');
  });

  it('con esFavorita en true el botón dice "En mi lista"', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: base, esFavorita: true });
    expect(texto(uno(fixture, '[data-testid="boton-favorito"]')).toLowerCase(), 'Con esFavorita en true el botón debería decir "En mi lista"').toContain('en mi lista');
  });
});
