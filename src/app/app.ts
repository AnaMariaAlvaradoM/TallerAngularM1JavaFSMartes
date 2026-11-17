import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { ListadoMascotas } from './pages/listado-mascotas/listado-mascotas';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Encabezado, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}