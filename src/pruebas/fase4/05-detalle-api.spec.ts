import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Mascota } from '../../app/models/mascota';
import { DetalleMascota } from '../../app/pages/detalle-mascota/detalle-mascota';
import { configurar, texto, uno } from '../utilidades';

// Pelusa NO está en tus datos de prueba: si aparece, es porque el detalle la pidió a la API.
const pelusa: Mascota = { id: 7, nombre: 'Pelusa', especie: 'gato', edadMeses: 40, descripcion: 'Llegó de la API', adoptada: false };

async function refrescar(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await new Promise((resolver) => setTimeout(resolver, 0));
  fixture.detectChanges();
}

async function abrirDetalle(id: string): Promise<ComponentFixture<DetalleMascota>> {
  const fixture = TestBed.createComponent(DetalleMascota);
  fixture.componentRef.setInput('id', id);
  await refrescar(fixture);
  return fixture;
}

function peticionesA(url: string) {
  return TestBed.inject(HttpTestingController).match((p) => p.method === 'GET' && p.url.endsWith(url));
}

describe('4.5 · Detalle conectado a la API', () => {
  beforeEach(() => configurar());

  it('pide GET /api/mascotas/{id} y muestra la mascota que responde', async () => {
    const fixture = await abrirDetalle('7');
    const peticiones = peticionesA('/api/mascotas/7');
    expect(peticiones.length, 'Con id "7" el detalle debería pedir GET /api/mascotas/7 (usa MascotasApi.obtener)').toBeGreaterThan(0);
    peticiones.forEach((p) => p.flush(pelusa));
    await refrescar(fixture);
    expect(texto(uno(fixture, '[data-testid="detalle-nombre"]')), 'El detalle debería mostrar a Pelusa, que llegó de la API').toBe('Pelusa');
  });

  it('si la API responde 404 muestra mascota-no-encontrada', async () => {
    const fixture = await abrirDetalle('999');
    peticionesA('/api/mascotas/999').forEach((p) => p.flush({ mensaje: 'No existe' }, { status: 404, statusText: 'Not Found' }));
    await refrescar(fixture);
    expect(uno(fixture, '[data-testid="mascota-no-encontrada"]'), 'Con 404 debería verse data-testid="mascota-no-encontrada"').not.toBeNull();
    expect(uno(fixture, '[data-testid="mensaje-error"]'), 'Un 404 no es un error del servidor: debería verse "Mascota no encontrada", no mensaje-error').toBeNull();
  });

  it('si la API responde 500 muestra mensaje-error y no "no encontrada"', async () => {
    const fixture = await abrirDetalle('7');
    peticionesA('/api/mascotas/7').forEach((p) => p.flush({ mensaje: 'falló' }, { status: 500, statusText: 'Error' }));
    await refrescar(fixture);
    expect(texto(uno(fixture, '[data-testid="mensaje-error"]')), 'Con 500 el detalle debería mostrar el mensaje de mensajeDeError').toContain('Tuvimos un problema en el servidor. Intenta más tarde.');
    expect(uno(fixture, '[data-testid="mascota-no-encontrada"]'), 'Un 500 no significa que la mascota no exista').toBeNull();
  });
});
