export interface Mascota {
    id: number;
    nombre: string;
    especie: 'perro' | 'gato';
    edadMeses: number;
    descripcion: string;
    adoptada: boolean;

}
