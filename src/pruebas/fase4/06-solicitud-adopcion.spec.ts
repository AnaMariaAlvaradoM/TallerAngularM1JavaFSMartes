import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Mascota } from '../../app/models/mascota';
import { DetalleMascota } from '../../app/pages/detalle-mascota/detalle-mascota';
import { configurar, uno } from '../utilidades';

const pelusa: Mascota = { id: 7, nombre: 'Pelusa', especie: 'gato', edadMeses: 40, descripcion: 'Llegó de la API', adoptada: false };

async function refrescar(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await new Promise((resolver) => setTimeout(resolver, 0));
  fixture.detectChanges();
}

async function abrirConPelusa(): Promise<ComponentFixture<DetalleMascota>> {
  const fixture = TestBed.createComponent(DetalleMascota);
  fixture.componentRef.setInput('id', '7');
  await refrescar(fixture);
  TestBed.inject(HttpTestingController)
    .match((p) => p.method === 'GET' && p.url.endsWith('/api/mascotas/7'))
    .forEach((p) => p.flush(pelusa));
  await refrescar(fixture);
  return fixture;
}

// Escribe en un campo como lo haría una persona (sirve con (input), (change) o ngModel).
async function escribir(fixture: ComponentFixture<unknown>, testid: string, valor: string): Promise<void> {
  const campo = uno(fixture, `[data-testid="${testid}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
  if (!campo) return;
  campo.value = valor;
  campo.dispatchEvent(new Event('input'));
  campo.dispatchEvent(new Event('change'));
  await refrescar(fixture);
}

function boton(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return uno(fixture, '[data-testid="enviar-solicitud"]') as HTMLButtonElement | null;
}

async function llenarTodo(fixture: ComponentFixture<unknown>): Promise<void> {
  await escribir(fixture, 'input-nombre', 'Laura Gómez');
  await escribir(fixture, 'input-correo', 'laura@correo.co');
  await escribir(fixture, 'input-motivo', 'Tengo patio y trabajo desde casa');
}

describe('4.6 · Solicitud de adopción', () => {
  beforeEach(() => configurar());

  it('el detalle tiene los campos input-nombre, input-correo, input-motivo y el botón enviar-solicitud', async () => {
    const fixture = await abrirConPelusa();
    for (const testid of ['input-nombre', 'input-correo', 'input-motivo', 'enviar-solicitud']) {
      expect(uno(fixture, `[data-testid="${testid}"]`), `Falta el elemento con data-testid="${testid}" en el detalle`).not.toBeNull();
    }
  });

  it('con los campos vacíos el botón está deshabilitado', async () => {
    const fixture = await abrirConPelusa();
    expect(boton(fixture)?.disabled, 'Con los campos vacíos, enviar-solicitud debería estar deshabilitado ([disabled])').toBe(true);
  });

  it('con un campo vacío sigue deshabilitado y con los tres llenos se habilita', async () => {
    const fixture = await abrirConPelusa();
    await escribir(fixture, 'input-nombre', 'Laura Gómez');
    await escribir(fixture, 'input-correo', 'laura@correo.co');
    expect(boton(fixture)?.disabled, 'Sin motivo, el botón debería seguir deshabilitado').toBe(true);
    await escribir(fixture, 'input-motivo', 'Tengo patio y trabajo desde casa');
    expect(boton(fixture)?.disabled, 'Con nombre, correo y motivo, el botón debería habilitarse').toBe(false);
  });

  it('al enviar hace POST /api/solicitudes con mascotaId, nombreCompleto, correo y motivo', async () => {
    const fixture = await abrirConPelusa();
    await llenarTodo(fixture);
    boton(fixture)?.click();
    await refrescar(fixture);
    const peticiones = TestBed.inject(HttpTestingController).match((p) => p.method === 'POST' && p.url.endsWith('/api/solicitudes'));
    expect(peticiones.length, 'Al hacer clic en enviar-solicitud debería salir un POST a /api/solicitudes (usa MascotasApi.enviarSolicitud)').toBe(1);
    expect(peticiones[0]?.request.body, 'El cuerpo debería llevar el id de la mascota y lo que se escribió en los campos').toEqual({
      mascotaId: 7,
      nombreCompleto: 'Laura Gómez',
      correo: 'laura@correo.co',
      motivo: 'Tengo patio y trabajo desde casa',
    });
  });

  it('si la API responde 201 muestra data-testid="solicitud-exitosa"', async () => {
    const fixture = await abrirConPelusa();
    await llenarTodo(fixture);
    boton(fixture)?.click();
    await refrescar(fixture);
    TestBed.inject(HttpTestingController)
      .match((p) => p.method === 'POST' && p.url.endsWith('/api/solicitudes'))
      .forEach((p) => p.flush({ id: 1 }, { status: 201, statusText: 'Created' }));
    await refrescar(fixture);
    expect(uno(fixture, '[data-testid="solicitud-exitosa"]'), 'Cuando la API responde 201 debería verse data-testid="solicitud-exitosa"').not.toBeNull();
  });
});
