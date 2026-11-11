import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TarjetaMascota } from '../../components/tarjeta-mascota/tarjeta-mascota';
import { MASCOTAS } from '../../data/mascotas.mock';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-listado-mascotas',
  standalone: true,
  imports: [TarjetaMascota],
  templateUrl: './listado-mascotas.html',
})
export class ListadoMascotas implements OnInit {
  private readonly http = inject(HttpClient);
  mascotas: Mascota[] = MASCOTAS;

  ngOnInit(): void {
    this.http.get<Mascota[]>('/api/mascotas').subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas ?? MASCOTAS;
      },
      error: () => {
        this.mascotas = MASCOTAS;
      },
    });
  }
}
