export type Especie = 'perro' | 'gato';

export interface Mascota {
    id: number;
    nombre: string;
    especie: Especie;
    edadMeses: number;
    descripcion: string;
    adoptada: boolean;
}