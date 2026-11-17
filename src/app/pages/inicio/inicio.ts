import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListadoMascotas } from '../listado-mascotas/listado-mascotas';
import { MASCOTAS } from '../../data/mascotas.mock';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';

@Component({  
  selector: 'app-inicio',
  imports: [TarjetaMascota, RouterLink],
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
 mascotasDisponibles = MASCOTAS.filter((m => !m.adoptada))
 .slice(0, 3);
}