import { Component } from '@angular/core';
import { Etiqueta } from './shared/etiqueta/etiqueta';

@Component({
  imports: [Etiqueta],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
