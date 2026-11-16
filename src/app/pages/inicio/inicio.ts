import { Component } from '@angular/core';
import { MASCOTAS } from '../../data/mascotas.mock';
import { RouterLink } from '@angular/router';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';

@Component({
  imports: [RouterLink, TarjetaMascota],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  disponibles = MASCOTAS.filter((mascota) => !mascota.adoptada).slice(0, 3);
}
