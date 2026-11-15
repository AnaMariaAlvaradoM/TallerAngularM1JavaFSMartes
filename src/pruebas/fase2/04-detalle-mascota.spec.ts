import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { DetalleMascota } from '../../app/pages/detalle-mascota/detalle-mascota';
import { RespuestaSimulada, configurar, renderizar, texto, uno } from '../utilidades';

const elegida = MASCOTAS[2];
const api: RespuestaSimulada[] = [
  { metodo: 'GET', url: `/api/mascotas/${elegida.id}`, cuerpo: elegida },
  { metodo: 'GET', url: '/api/mascotas/999', cuerpo: { mensaje: 'No existe' }, estado: 404 },
  { metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS },
];

// El router entrega el id como texto, igual que aquí: '3', no 3.
async function abrir(id: string) {
  return renderizar(DetalleMascota, { id }, api);
}

describe('2.4 · Detalle de mascota', () => {
  beforeEach(() => configurar());

  it('usa el selector app-detalle-mascota', () => {
    expect(reflectComponentType(DetalleMascota)?.selector, 'El selector debería ser app-detalle-mascota').toBe('app-detalle-mascota');
  });

  it('id es obligatorio (input.required)', () => {
    const fixture = TestBed.createComponent(DetalleMascota);
    expect(() => fixture.detectChanges(), 'id debería declararse con input.required').toThrow();
  });

  it('con un id que existe muestra el nombre en data-testid="detalle-nombre"', async () => {
    const fixture = await abrir(String(elegida.id));
    expect(
      texto(uno(fixture, '[data-testid="detalle-nombre"]')),
      `Con id "${elegida.id}" debería mostrar ${elegida.nombre} (el id llega como texto: ¿lo convertiste con Number?)`,
    ).toBe(elegida.nombre);
  });

  it('con un id que no existe muestra "Mascota no encontrada"', async () => {
    const fixture = await abrir('999');
    const aviso = uno(fixture, '[data-testid="mascota-no-encontrada"]');
    expect(aviso, 'Con id "999" debería aparecer data-testid="mascota-no-encontrada" (revisa tu @else)').not.toBeNull();
    expect(texto(aviso).toLowerCase(), 'El aviso debería decir "Mascota no encontrada"').toContain('no encontrada');
    expect(uno(fixture, '[data-testid="detalle-nombre"]'), 'Con un id que no existe no debería verse detalle-nombre').toBeNull();
  });

  it('con un id que no existe hay un enlace volver-listado hacia /mascotas', async () => {
    const fixture = await abrir('999');
    const enlace = uno(fixture, '[data-testid="volver-listado"]');
    expect(enlace, 'Falta el enlace con data-testid="volver-listado"').not.toBeNull();
    expect(enlace?.getAttribute('href'), 'volver-listado debería llevar a /mascotas (usa routerLink)').toBe('/mascotas');
  });
});
