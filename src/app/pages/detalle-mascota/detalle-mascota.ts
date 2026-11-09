import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MASCOTAS } from '../../data/mascotas.mock';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';

@Component({
  imports: [RouterLink, TarjetaMascota],
  selector: 'app-detalle-mascota',
  styleUrl: './detalle-mascota.css',
  templateUrl: './detalle-mascota.html',
})
export class DetalleMascota {
  id = input.required<string>();

  mascotaActual = computed(() =>
    MASCOTAS.find((mascota) => mascota.id === Number(this.id())),
  );
}
