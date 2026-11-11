import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './components/encabezado/encabezado';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Encabezado, RouterOutlet],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
