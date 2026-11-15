import { reflectComponentType } from '@angular/core';
import { NoEncontrada } from '../../app/pages/no-encontrada/no-encontrada';
import { configurar, renderizar, uno } from '../utilidades';

describe('2.6 · Página 404', () => {
  beforeEach(() => configurar());

  it('usa el selector app-no-encontrada', () => {
    expect(reflectComponentType(NoEncontrada)?.selector, 'El selector debería ser app-no-encontrada').toBe('app-no-encontrada');
  });

  it('muestra data-testid="pagina-404"', async () => {
    const fixture = await renderizar(NoEncontrada);
    expect(uno(fixture, '[data-testid="pagina-404"]'), 'Falta el elemento con data-testid="pagina-404"').not.toBeNull();
  });
});
