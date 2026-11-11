import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './encabezado.html',
})
export class Encabezado {}
