import { Component } from '@angular/core';

@Component({
  selector: 'app-no-encontrada',
  standalone: true,
  template: `
    <section class="mensaje mensaje--error">
      <p data-testid="pagina-404">404 - Página no encontrada</p>
    </section>
  `,
})
export class NoEncontrada {}
