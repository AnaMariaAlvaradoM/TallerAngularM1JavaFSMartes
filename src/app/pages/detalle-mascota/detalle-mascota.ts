import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MASCOTAS } from '../../data/mascotas.mock';

@Component({
  selector: 'app-detalle-mascota',
  imports: [ RouterLink],
  templateUrl: './detalle-mascota.html',
})
export class DetalleMascota {
 id = input.required<string>();
 
 obtenerMascota() {
  return MASCOTAS.find(
    mascota => mascota.id === Number(this.id())
  );
}
}
