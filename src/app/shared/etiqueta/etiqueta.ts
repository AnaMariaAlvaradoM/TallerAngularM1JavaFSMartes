import { Component, input } from '@angular/core';

@Component({
  selector: 'app-etiqueta',
  styleUrl: './etiqueta.css',
  templateUrl: './etiqueta.html',
})
export class Etiqueta {
  texto = input.required<string>();
  tono = input<'neutro' | 'alerta' | 'peligro' | 'exito' | 'info'>('neutro');
}