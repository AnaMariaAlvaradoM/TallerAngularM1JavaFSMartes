import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MASCOTAS } from '../../data/mascotas.mock';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-detalle-mascota',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (mascotaEncontrada) {
      <section class="tarjeta">
        <h2 data-testid="detalle-nombre">{{ mascotaEncontrada.nombre }}</h2>
        <p>{{ mascotaEncontrada.descripcion }}</p>
      </section>
    } @else {
      <section class="mensaje mensaje--error">
        <p data-testid="mascota-no-encontrada">Mascota no encontrada</p>
        <a class="boton" data-testid="volver-listado" routerLink="/mascotas">Volver al listado</a>
      </section>
    }
  `,
})
export class DetalleMascota {
  id = input.required<string>();

  get mascotaEncontrada(): Mascota | undefined {
    return MASCOTAS.find((mascota) => mascota.id === Number(this.id()));
  }
}
