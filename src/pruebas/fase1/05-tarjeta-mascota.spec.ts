import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Mascota } from '../../app/models/mascota';
import { TarjetaMascota } from '../../app/components/tarjeta-mascota/tarjeta-mascota';
import { configurar, renderizar, texto, todos, uno } from '../utilidades';

const base: Mascota = {
  id: 7,
  nombre: 'Pepa',
  especie: 'perro',
  edadMeses: 30,
  descripcion: 'Le encanta jugar con la pelota.',
  adoptada: false,
};

async function pintar(cambios: Partial<Mascota> = {}) {
  return renderizar(TarjetaMascota, { mascota: { ...base, ...cambios } });
}

async function edadQueMuestra(edadMeses: number): Promise<string> {
  const fixture = await pintar({ edadMeses });
  const contenido = texto(uno(fixture, '[data-testid="edad-mascota"]'));
  const encontrada = contenido.match(/(\d+)\s+(meses|mes|años|año)(?![a-zñ])/i);
  return encontrada ? `${encontrada[1]} ${encontrada[2].toLowerCase()}` : `(no encontré una edad en "${contenido}")`;
}

async function etiquetas(cambios: Partial<Mascota> = {}): Promise<string[]> {
  const fixture = await pintar(cambios);
  return todos(fixture, 'app-etiqueta').map((e) => texto(e).toLowerCase());
}

describe('1.5 · Tarjeta de mascota', () => {
  beforeEach(() => configurar());

  it('usa el selector app-tarjeta-mascota', () => {
    expect(reflectComponentType(TarjetaMascota)?.selector, 'El selector debería ser app-tarjeta-mascota').toBe('app-tarjeta-mascota');
  });

  it('mascota es obligatoria (input.required)', () => {
    const fixture = TestBed.createComponent(TarjetaMascota);
    expect(() => fixture.detectChanges(), 'mascota debería declararse con input.required').toThrow();
  });

  it('muestra el nombre en data-testid="nombre-mascota"', async () => {
    const fixture = await pintar();
    expect(texto(uno(fixture, '[data-testid="nombre-mascota"]')), 'Debería mostrar el nombre Pepa').toBe('Pepa');
  });

  it('muestra la especie usando <app-etiqueta>', async () => {
    expect(await etiquetas({ especie: 'gato' }), 'Debería haber una app-etiqueta con la especie (gato)').toContain('gato');
  });

  it('muestra la etiqueta "Adoptada" si la mascota fue adoptada', async () => {
    expect(await etiquetas({ adoptada: true }), 'Con adoptada: true debería aparecer una app-etiqueta "Adoptada"').toContain('adoptada');
  });

  it('no muestra "Adoptada" si la mascota sigue disponible', async () => {
    expect(await etiquetas({ adoptada: false }), 'Con adoptada: false NO debería aparecer "Adoptada" (revisa tu @if)').not.toContain('adoptada');
  });

  it('con 1 mes muestra "1 mes"', async () => {
    expect(await edadQueMuestra(1), 'edadMeses 1 debería mostrarse como "1 mes"').toBe('1 mes');
  });

  it('de 2 a 11 meses muestra "N meses"', async () => {
    expect(await edadQueMuestra(2), 'edadMeses 2 debería mostrarse como "2 meses"').toBe('2 meses');
    expect(await edadQueMuestra(11), 'edadMeses 11 debería mostrarse como "11 meses" (revisa si usaste < 12)').toBe('11 meses');
  });

  it('de 12 a 23 meses muestra "1 año"', async () => {
    expect(await edadQueMuestra(12), 'edadMeses 12 debería mostrarse como "1 año"').toBe('1 año');
    expect(await edadQueMuestra(23), 'edadMeses 23 debería mostrarse como "1 año" (años enteros hacia abajo)').toBe('1 año');
  });

  it('con 24 meses o más muestra "N años"', async () => {
    expect(await edadQueMuestra(24), 'edadMeses 24 debería mostrarse como "2 años"').toBe('2 años');
    expect(await edadQueMuestra(30), 'edadMeses 30 debería mostrarse como "2 años" (usa Math.floor)').toBe('2 años');
    expect(await edadQueMuestra(60), 'edadMeses 60 debería mostrarse como "5 años"').toBe('5 años');
  });
});
