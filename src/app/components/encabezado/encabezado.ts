import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  template: `
    <header class="encabezado">
      <h1 data-testid="titulo-app">Huella Amiga</h1>
    </header>
  `,
})
export class Encabezado {}
