import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Etiqueta } from '../../app/shared/etiqueta/etiqueta';
import { configurar, renderizar, texto, uno } from '../utilidades';

describe('1.3 · Etiqueta', () => {
  beforeEach(() => configurar());

  it('usa el selector app-etiqueta', () => {
    expect(reflectComponentType(Etiqueta)?.selector, 'El selector debería ser app-etiqueta').toBe('app-etiqueta');
  });

  it('muestra el texto que recibe dentro de data-testid="etiqueta"', async () => {
    const fixture = await renderizar(Etiqueta, { texto: 'Perro' });
    expect(texto(uno(fixture, '[data-testid="etiqueta"]')), 'Con texto "Perro", la etiqueta debería mostrar Perro').toBe('Perro');
  });

  it('el elemento con data-testid="etiqueta" es un <span>', async () => {
    const fixture = await renderizar(Etiqueta, { texto: 'Gato' });
    expect(uno(fixture, '[data-testid="etiqueta"]')?.tagName, 'data-testid="etiqueta" debería estar en un <span>').toBe('SPAN');
  });

  it('texto es obligatorio (input.required)', () => {
    const fixture = TestBed.createComponent(Etiqueta);
    expect(() => fixture.detectChanges(), 'texto debería declararse con input.required').toThrow();
  });
});
