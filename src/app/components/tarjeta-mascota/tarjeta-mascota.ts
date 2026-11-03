import { Component, input } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { Etiqueta } from '../../shared/etiqueta/etiqueta';

@Component({
  imports: [Etiqueta],
  selector: 'app-tarjeta-mascota',
  styleUrl: './tarjeta-mascota.css',
  templateUrl: './tarjeta-mascota.html',
})
export class TarjetaMascota {
  mascota = input.required<Mascota>();

  mostrarEdad(): string {
    if (this.mascota().edadMeses === 1) {
      return "1 mes";

    } else if (this.mascota().edadMeses < 12) {
      return this.mascota().edadMeses + " meses"

    } else if (this.mascota().edadMeses >= 12 && this.mascota().edadMeses < 24) {
      return "1 año"

    } else {
      return Math.floor(this.mascota().edadMeses / 12) + " años";
    }
  }

}
