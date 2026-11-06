import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { ListadoMascotas } from './pages/listado-mascotas/listado-mascotas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Encabezado, ListadoMascotas],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
