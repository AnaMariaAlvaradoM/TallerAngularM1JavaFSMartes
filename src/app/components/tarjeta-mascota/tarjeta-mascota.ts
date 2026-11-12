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

  formatearEdad(): string {
    const edadMeses = Math.floor(this.mascota().edadMeses);
    if (edadMeses < 12) {
      return Math.floor(edadMeses) + (edadMeses === 1 ? " Mes" : " Meses");
    } else {
      const años = Math.floor(edadMeses / 12);
      return años + (años === 1 ? " Año" : " Años");
    }
  }

}
