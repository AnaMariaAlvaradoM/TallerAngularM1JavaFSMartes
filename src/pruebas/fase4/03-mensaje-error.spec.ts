import { HttpErrorResponse } from '@angular/common/http';
import { mensajeDeError } from '../../app/shared/mensaje-error';

function errorCon(status: number): HttpErrorResponse {
  return new HttpErrorResponse({ status, statusText: 'Error', url: '/api/mascotas' });
}

describe('4.3 · mensajeDeError', () => {
  it('con status 0 (servidor apagado) dice que no se pudo conectar', () => {
    expect(mensajeDeError(errorCon(0)), 'Con status 0 el mensaje debería ser exactamente el del contrato').toBe('No pudimos conectar con el servidor. Intenta más tarde.');
  });

  it('con 404 dice que no encontró lo que buscas', () => {
    expect(mensajeDeError(errorCon(404)), 'Con 404 el mensaje debería ser exactamente el del contrato').toBe('No encontramos lo que buscas.');
  });

  it('con 500 dice que hubo un problema en el servidor', () => {
    expect(mensajeDeError(errorCon(500)), 'Con 500 el mensaje debería ser exactamente el del contrato').toBe('Tuvimos un problema en el servidor. Intenta más tarde.');
  });

  it('con 503 también es problema del servidor (500 o más)', () => {
    expect(mensajeDeError(errorCon(503)), 'Cualquier status de 500 en adelante es problema del servidor (usa >= 500)').toBe('Tuvimos un problema en el servidor. Intenta más tarde.');
  });

  it('con otro código (400) muestra el número', () => {
    expect(mensajeDeError(errorCon(400)), 'Con otro código el mensaje debería ser "Ocurrió un error (código 400)."').toBe('Ocurrió un error (código 400).');
  });
});
