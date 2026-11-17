export type Mascotas = 'Nombre' | 'Especie' | 'Edad' | 'Adoptada' ;

export interface Mascota {
  id: number;
  nombre: string;
  especie: 'perro' | 'gato';
  edadMeses: number;
  adoptada: boolean;
  descripcion: string;
}