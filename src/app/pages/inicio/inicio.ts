import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MASCOTAS } from '../../data/mascotas.mock';
import { Mascota } from '../../models/mascota';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, TarjetaMascota],
  template: `
    <section class="listado">
      <h2 class="listado__titulo">Adopta una mascota</h2>
      <p class="listado__total">Estas mascota(s) buscan hogar</p>

      <div class="listado__grilla">
        @for (mascota of mascotasDisponibles; track mascota.id) {
          <app-tarjeta-mascota [mascota]="mascota" />
        }
      </div>

      <p>
        <a class="boton" data-testid="ir-a-mascotas" routerLink="/mascotas">Ver todas</a>
      </p>
    </section>
  `,
})
export class Inicio implements OnInit {
  private readonly http = inject(HttpClient);
  mascotasDisponibles: Mascota[] = MASCOTAS.filter((mascota) => !mascota.adoptada).slice(0, 3);

  ngOnInit(): void {
    this.http.get<Mascota[]>('/api/mascotas').subscribe({
      next: (mascotas) => {
        this.mascotasDisponibles = (mascotas ?? MASCOTAS)
          .filter((mascota) => !mascota.adoptada)
          .slice(0, 3);
      },
      error: () => {
        this.mascotasDisponibles = MASCOTAS.filter((mascota) => !mascota.adoptada).slice(0, 3);
      },
    });
  }
}
