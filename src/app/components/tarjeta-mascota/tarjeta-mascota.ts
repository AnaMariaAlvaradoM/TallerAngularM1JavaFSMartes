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
    return this.mascota().adoptada;
  }

  edadTexto(): string {
    const edadM : number =  this.mascota().edadMeses;
    if(edadM < 12){
      return edadM === 1 ? '1 mes' : `${edadM} meses`; 
    }else{
      const anhios: number = Math.trunc(edadM / 12);
      return anhios ===1 ? '1 año' : `${anhios} años`;
    }
  }

}
