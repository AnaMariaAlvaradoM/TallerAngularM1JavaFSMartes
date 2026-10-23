import { Component, input } from '@angular/core';
import { Etiqueta } from '../../shared/etiqueta/etiqueta';
import { Mascota } from '../../models/mascota'; 

@Component({
  imports: [Etiqueta],
  selector: 'app-tarjeta-mascota',
  styleUrl: './tarjeta-mascota.css',
  templateUrl: './tarjeta-mascota.html',
})

export class TarjetaMascota {
  mascota = input.required<Mascota>();

  estaAdoptado(): boolean {
    return this.mascota().adoptado;
  }

}
