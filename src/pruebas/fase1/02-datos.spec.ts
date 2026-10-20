import { MASCOTAS } from '../../app/data/mascotas.mock';

describe('1.2 · Datos de prueba', () => {
  it('MASCOTAS tiene al menos 6 mascotas', () => {
    expect(Array.isArray(MASCOTAS), 'MASCOTAS debería ser un arreglo').toBe(true);
    expect(MASCOTAS.length, 'MASCOTAS debería tener 6 mascotas o más').toBeGreaterThanOrEqual(6);
  });

  it('cada mascota tiene todos sus campos con el tipo correcto', () => {
    for (const m of MASCOTAS) {
      const quien = `La mascota con id ${m.id}`;
      expect(typeof m.id, `${quien}: id debería ser número`).toBe('number');
      expect(typeof m.nombre === 'string' && m.nombre.trim().length > 0, `${quien}: nombre no debería estar vacío`).toBe(true);
      expect(['perro', 'gato'], `${quien}: especie debería ser perro o gato`).toContain(m.especie);
      expect(Number.isInteger(m.edadMeses) && m.edadMeses > 0, `${quien}: edadMeses debería ser un entero mayor que 0`).toBe(true);
      expect(typeof m.descripcion, `${quien}: descripcion debería ser texto`).toBe('string');
      expect(typeof m.adoptada, `${quien}: adoptada debería ser true o false`).toBe('boolean');
    }
  });

  it('los id no se repiten', () => {
    const ids = MASCOTAS.map((m) => m.id);
    expect(new Set(ids).size, 'Cada mascota debería tener un id distinto (lo usa track)').toBe(ids.length);
  });

  it('hay al menos una mascota adoptada', () => {
    expect(MASCOTAS.some((m) => m.adoptada), 'Al menos una mascota debería tener adoptada: true').toBe(true);
  });

  it('hay al menos 2 gatos', () => {
    expect(MASCOTAS.filter((m) => m.especie === 'gato').length, 'Debería haber 2 gatos o más').toBeGreaterThanOrEqual(2);
  });
});
