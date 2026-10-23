import { Component } from '@angular/core';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';
import { MASCOTAS } from '../../data/mascotas.mocks';

@Component({
  imports: [TarjetaMascota],
  selector: 'app-listado-mascotas',
  styleUrl: './listado-mascotas.css',
  templateUrl: './listado-mascotas.html',
})
export class ListadoMascotas {
  mascotas = MASCOTAS
}
