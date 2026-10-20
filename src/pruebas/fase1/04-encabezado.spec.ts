import { reflectComponentType } from '@angular/core';
import { Encabezado } from '../../app/components/encabezado/encabezado';
import { configurar, renderizar, texto, uno } from '../utilidades';

describe('1.4 · Encabezado', () => {
  beforeEach(() => configurar());

  it('usa el selector app-encabezado', () => {
    expect(reflectComponentType(Encabezado)?.selector, 'El selector debería ser app-encabezado').toBe('app-encabezado');
  });

  it('muestra "Huella Amiga" en data-testid="titulo-app"', async () => {
    const fixture = await renderizar(Encabezado);
    expect(texto(uno(fixture, '[data-testid="titulo-app"]')), 'titulo-app debería decir Huella Amiga').toContain('Huella Amiga');
  });

  it('el título es un <h1>', async () => {
    const fixture = await renderizar(Encabezado);
    expect(uno(fixture, '[data-testid="titulo-app"]')?.tagName, 'data-testid="titulo-app" debería estar en un <h1>').toBe('H1');
  });
});
