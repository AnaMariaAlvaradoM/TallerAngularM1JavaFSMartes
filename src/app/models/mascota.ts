export type tipoEspecie = 'perro' | 'gato';

export interface Mascota {
    id : number
    nombre : string
    especie : tipoEspecie
    edadMeses : number
    descripcion : string
    adoptada : boolean
};
