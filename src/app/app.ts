import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';

@Component({
  imports: [Encabezado],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
