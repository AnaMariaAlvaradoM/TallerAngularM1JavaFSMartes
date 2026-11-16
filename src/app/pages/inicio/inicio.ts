import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MASCOTAS } from '../../data/mascotas.mock';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';

@Component({
  imports: [TarjetaMascota, RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  mascotasDisponibles = MASCOTAS
  .filter(mascota => !mascota.adoptada)
  .slice(0, 3);
}
