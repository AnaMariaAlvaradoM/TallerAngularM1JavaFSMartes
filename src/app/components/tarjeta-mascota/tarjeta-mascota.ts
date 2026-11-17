import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { Mascota } from '../../models/mascota';
import { Etiqueta } from '../../shared/etiqueta/etiqueta';

@Component({
  selector: 'app-tarjeta-mascota',
  imports: [Etiqueta, RouterLink],
  templateUrl: './tarjeta-mascota.html',
  styleUrl: './tarjeta-mascota.css'
})
export class TarjetaMascota {

  mascota = input.required<Mascota>();

  edadMascota(): string {
    const edad = this.mascota().edadMeses;

    if (edad === 1) {
      return '1 mes';
    }
  
    if (edad < 12) {
      return `${edad} meses`;
    }
  
    if (edad < 24) {
      return '1 año';
    }
  
    return `${Math.floor(edad / 12)} años`;
  }
}