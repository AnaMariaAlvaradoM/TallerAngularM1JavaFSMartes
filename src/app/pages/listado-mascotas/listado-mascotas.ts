import { Component, signal } from '@angular/core';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';
import { MASCOTAS } from '../../data/mascotas.mock';

@Component({
  imports: [TarjetaMascota],
  selector: 'app-listado-mascotas',
  styleUrl: './listado-mascotas.css',
  templateUrl: './listado-mascotas.html',
})
export class ListadoMascotas {
  mascotas = signal (MASCOTAS)
}
