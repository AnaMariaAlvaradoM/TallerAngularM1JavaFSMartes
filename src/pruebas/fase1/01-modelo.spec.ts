import { Mascota } from '../../app/models/mascota';

// Si tu interfaz no tiene exactamente estos campos y tipos, este archivo no compila.
const ejemplo: Mascota = {
  id: 99,
  nombre: 'Prueba',
  especie: 'gato',
  edadMeses: 5,
  descripcion: 'Mascota de prueba',
  adoptada: false,
};

// @ts-expect-error: especie solo puede ser 'perro' o 'gato'
const especieInvalida: Mascota['especie'] = 'loro';

describe('1.1 · Modelo Mascota', () => {
  it('acepta una mascota con id, nombre, especie, edadMeses, descripcion y adoptada', () => {
    expect(ejemplo.nombre, 'La interfaz Mascota debería aceptar una mascota completa').toBe('Prueba');
  });

  it('especie solo acepta los valores perro o gato', () => {
    expect(especieInvalida, 'especie debería ser el tipo cerrado perro | gato').toBe('loro');
  });
});
