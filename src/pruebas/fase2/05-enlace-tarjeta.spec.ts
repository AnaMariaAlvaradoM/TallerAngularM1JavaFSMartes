import { Mascota } from '../../app/models/mascota';
import { TarjetaMascota } from '../../app/components/tarjeta-mascota/tarjeta-mascota';
import { configurar, renderizar, texto, uno } from '../utilidades';

const base: Mascota = {
  id: 7,
  nombre: 'Pepa',
  especie: 'perro',
  edadMeses: 30,
  descripcion: 'Le encanta jugar con la pelota.',
  adoptada: false,
};

describe('2.5 · Enlace de la tarjeta', () => {
  beforeEach(() => configurar());

  it('la tarjeta tiene un enlace data-testid="ver-detalle" que lleva a /mascotas/<id>', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: base });
    const enlace = uno(fixture, '[data-testid="ver-detalle"]');
    expect(enlace, 'Falta el enlace con data-testid="ver-detalle"').not.toBeNull();
    expect(enlace?.getAttribute('href'), 'Para la mascota 7, ver-detalle debería llevar a /mascotas/7').toBe('/mascotas/7');
  });

  it('el enlace cambia con cada mascota y dice "Ver detalle"', async () => {
    const fixture = await renderizar(TarjetaMascota, { mascota: { ...base, id: 12 } });
    const enlace = uno(fixture, '[data-testid="ver-detalle"]');
    expect(enlace?.getAttribute('href'), 'Para la mascota 12 debería llevar a /mascotas/12 (usa el id de la mascota, no un número fijo)').toBe('/mascotas/12');
    expect(texto(enlace).toLowerCase(), 'El enlace debería decir "Ver detalle"').toContain('ver detalle');
  });
});
