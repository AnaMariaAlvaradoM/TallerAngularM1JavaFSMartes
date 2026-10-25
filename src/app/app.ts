import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { ListadoMascotas } from './pages/listado-mascotas/listado-mascotas';

@Component({
  imports: [Encabezado, ListadoMascotas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}