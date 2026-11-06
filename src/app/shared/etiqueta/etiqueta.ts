import { Component, input } from '@angular/core';

type TonoEtiqueta = 'neutro' | 'exito' | 'alerta';

@Component({
  selector: 'app-etiqueta',
  standalone: true,
  template: `
    <span
      data-testid="etiqueta"
      class="etiqueta"
      [class.etiqueta--neutro]="tono() === 'neutro'"
      [class.etiqueta--exito]="tono() === 'exito'"
      [class.etiqueta--alerta]="tono() === 'alerta'"
    >
      {{ texto() }}
    </span>
  `,
})
export class Etiqueta {
  texto = input.required<string>();
  tono = input<TonoEtiqueta>('neutro');
}
