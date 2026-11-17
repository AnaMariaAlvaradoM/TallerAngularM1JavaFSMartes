import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './encabezado.css',
  templateUrl: './encabezado.html',
})
export class Encabezado {
  nombreApp = 'Huella Amiga';
  eslogan = 'Abre tu hogar, gana una familia';
}