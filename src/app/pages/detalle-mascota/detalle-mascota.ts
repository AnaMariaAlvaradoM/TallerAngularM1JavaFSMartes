import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MASCOTAS } from '../../data/mascotas.mock';

@Component({
  imports: [RouterLink],
  selector: 'app-detalle-mascota',
  styleUrl: './detalle-mascota.css',
  templateUrl: './detalle-mascota.html',
})
export class DetalleMascota {
  id = input.required<string>();

mascota = computed(() =>
  MASCOTAS.find(mascota => mascota.id === Number(this.id()))
);
}
