import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Mascota } from '../../app/models/mascota';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { configurar, texto, todos, uno } from '../utilidades';

// Mascotas que NO están en tus datos de prueba: si aparecen, es porque el listado le pidió los datos a la API.
const desdeLaApi: Mascota[] = [
  { id: 7, nombre: 'Pelusa', especie: 'gato', edadMeses: 40, descripcion: 'Llegó de la API', adoptada: false },
  { id: 8, nombre: 'Bruno', especie: 'perro', edadMeses: 14, descripcion: 'También llegó de la API', adoptada: false },
];

async function refrescar(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await new Promise((resolver) => setTimeout(resolver, 0));
  fixture.detectChanges();
}

async function abrirListado(): Promise<ComponentFixture<ListadoMascotas>> {
  const fixture = TestBed.createComponent(ListadoMascotas);
  await refrescar(fixture);
  return fixture;
}

function peticionDelListado() {
  return TestBed.inject(HttpTestingController).match((p) => p.method === 'GET' && p.url.endsWith('/api/mascotas'));
}

describe('4.4 · Listado conectado a la API', () => {
  beforeEach(() => configurar());

  it('mientras llega la respuesta muestra data-testid="cargando"', async () => {
    const fixture = await abrirListado();
    expect(uno(fixture, '[data-testid="cargando"]'), 'Mientras la API no responde debería verse data-testid="cargando"').not.toBeNull();
    peticionDelListado().forEach((p) => p.flush(desdeLaApi));
    await refrescar(fixture);
    expect(uno(fixture, '[data-testid="cargando"]'), 'Cuando la API responde, cargando debería desaparecer').toBeNull();
  });

  it('muestra las mascotas que responde GET /api/mascotas (no los datos de prueba)', async () => {
    const fixture = await abrirListado();
    const peticiones = peticionDelListado();
    expect(peticiones.length, 'El listado debería pedir las mascotas con GET /api/mascotas (usa MascotasApi.listar())').toBeGreaterThan(0);
    peticiones.forEach((p) => p.flush(desdeLaApi));
    await refrescar(fixture);
    const nombres = todos(fixture, '[data-testid="nombre-mascota"]').map((e) => texto(e));
    expect(nombres, 'El listado debería mostrar Pelusa y Bruno, que llegaron de la API').toEqual(['Pelusa', 'Bruno']);
  });

  it('si el servidor está apagado (status 0) muestra mensaje-error con el texto del contrato', async () => {
    const fixture = await abrirListado();
    peticionDelListado().forEach((p) => p.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' }));
    await refrescar(fixture);
    const aviso = uno(fixture, '[data-testid="mensaje-error"]');
    expect(aviso, 'Si la petición falla debería verse data-testid="mensaje-error"').not.toBeNull();
    expect(texto(aviso), 'El mensaje debería salir de mensajeDeError (status 0)').toContain('No pudimos conectar con el servidor. Intenta más tarde.');
    expect(uno(fixture, '[data-testid="cargando"]'), 'Si hubo error, cargando debería desaparecer').toBeNull();
  });

  it('si la API responde 500 muestra el mensaje de problema en el servidor', async () => {
    const fixture = await abrirListado();
    peticionDelListado().forEach((p) => p.flush({ mensaje: 'falló' }, { status: 500, statusText: 'Error' }));
    await refrescar(fixture);
    expect(texto(uno(fixture, '[data-testid="mensaje-error"]')), 'Con 500 el listado debería mostrar el mensaje de mensajeDeError').toContain('Tuvimos un problema en el servidor. Intenta más tarde.');
  });
});
