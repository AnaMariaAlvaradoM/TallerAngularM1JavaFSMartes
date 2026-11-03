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
  edadFormateada(): string {
    const meses = this.mascota().edadMeses;

    if (meses === 1) {
      return '1 mes';
    }

    if (meses < 12) {
      return `${meses} meses`;
    }

    const anios = Math.floor(meses / 12);

    if (anios === 1) {
      return '1 año';
    }

    return `${anios} años`;
  }
}

