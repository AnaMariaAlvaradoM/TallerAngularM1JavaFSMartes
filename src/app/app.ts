import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [Encabezado, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
