import { SolicitudAdopcion } from '../../app/models/solicitud-adopcion';

// Si tu interfaz no tiene exactamente estos campos y tipos, este archivo no compila.
const ejemplo: SolicitudAdopcion = {
  mascotaId: 4,
  nombreCompleto: 'Laura Gómez',
  correo: 'laura@correo.co',
  motivo: 'Vivo en una casa con patio y trabajo desde casa.',
};

// @ts-expect-error: mascotaId es un número, no un texto
const idInvalido: SolicitudAdopcion['mascotaId'] = '4';

describe('4.1 · Modelo SolicitudAdopcion', () => {
  it('acepta una solicitud con mascotaId, nombreCompleto, correo y motivo', () => {
    expect(ejemplo.correo, 'La interfaz SolicitudAdopcion debería aceptar una solicitud completa').toBe('laura@correo.co');
  });

  it('mascotaId es un número (el mismo id de Mascota)', () => {
    expect(idInvalido, 'mascotaId debería ser de tipo number').toBe('4');
  });
});
