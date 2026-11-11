import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mascota } from '../../models/mascota';
import { Etiqueta } from '../../shared/etiqueta/etiqueta';

@Component({
  selector: 'app-tarjeta-mascota',
  standalone: true,
  imports: [Etiqueta, RouterLink],
  templateUrl: './tarjeta-mascota.html',
})
export class TarjetaMascota {
  mascota = input.required<Mascota>();

  edadEnTexto(): string {
    const edadMeses = this.mascota().edadMeses;

    if (edadMeses === 1) {
      return '1 mes';
    }

    if (edadMeses >= 2 && edadMeses <= 11) {
      return `${edadMeses} meses`;
    }

    if (edadMeses >= 12 && edadMeses <= 23) {
      return '1 año';
    }

    const años = Math.floor(edadMeses / 12);
    return `${años} años`;
  }
}
