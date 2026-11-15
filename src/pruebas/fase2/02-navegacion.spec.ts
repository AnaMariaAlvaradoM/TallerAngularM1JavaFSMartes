import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app/app.config';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { RespuestaSimulada, texto } from '../utilidades';
import { navegar } from '../utilidades-rutas';

const elegida = MASCOTAS[1];
const api: RespuestaSimulada[] = [
  { metodo: 'GET', url: `/api/mascotas/${elegida.id}`, cuerpo: elegida },
  { metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS },
];

describe('2.2 · Navegación completa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('/ muestra la página de inicio', async () => {
    const pagina = await navegar('/', api);
    expect(pagina.querySelector('[data-testid="ir-a-mascotas"]'), 'En / debería verse el Inicio (con el enlace ir-a-mascotas)').not.toBeNull();
  });

  it('/mascotas muestra el listado', async () => {
    const pagina = await navegar('/mascotas', api);
    expect(pagina.querySelector('[data-testid="total-mascotas"]'), 'En /mascotas debería verse ListadoMascotas').not.toBeNull();
  });

  it('/mascotas/<id> muestra el detalle de esa mascota (withComponentInputBinding)', async () => {
    const pagina = await navegar(`/mascotas/${elegida.id}`, api);
    expect(
      texto(pagina.querySelector('[data-testid="detalle-nombre"]')),
      `En /mascotas/${elegida.id} debería verse ${elegida.nombre} (¿pusiste withComponentInputBinding() en app.config.ts?)`,
    ).toBe(elegida.nombre);
  });

  it('una dirección que no existe muestra la página 404', async () => {
    const pagina = await navegar('/esta-direccion-no-existe', api);
    expect(pagina.querySelector('[data-testid="pagina-404"]'), "Una URL desconocida debería mostrar NoEncontrada (ruta '**')").not.toBeNull();
  });
});
