import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-etiqueta',
  styleUrl: './etiqueta.css',
  templateUrl: './etiqueta.html',
})
export class Etiqueta {
  texto = input.required<string>();
}
