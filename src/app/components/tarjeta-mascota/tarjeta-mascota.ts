import { Component, computed, input } from '@angular/core';
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
  mostrarDescripcion = false;

  estaAdoptada = computed(() => this.mascota().adoptada);

  edadMascota = computed(() => {
    const meses = this.mascota().edadMeses;
    if (meses === 1) return '1 mes';
    if (meses < 12) return `${meses} meses`;

    const anos = Math.floor(meses / 12);
    return anos === 1 ? '1 año' : `${anos} años`;
  });

  adoptar() {
    this.mascota().adoptada = true;
  }

  verMas() {
    this.mostrarDescripcion = !this.mostrarDescripcion;
  }
}
