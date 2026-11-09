import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app/app.config';
import { MASCOTAS } from '../../app/data/mascotas.mock';
import { FavoritosStore } from '../../app/services/favoritos-store';
import { RespuestaSimulada, texto } from '../utilidades';
import { navegar } from '../utilidades-rutas';

const api: RespuestaSimulada[] = [{ metodo: 'GET', url: '/api/mascotas', cuerpo: MASCOTAS }];

function nombres(pagina: HTMLElement): string[] {
  return Array.from(pagina.querySelectorAll('[data-testid="nombre-mascota"]')).map((e) => texto(e));
}

describe('3.8 · Página Mi lista', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('/mi-lista existe y sin favoritas muestra data-testid="lista-vacia"', async () => {
    const pagina = await navegar('/mi-lista', api);
    expect(pagina.querySelector('[data-testid="pagina-404"]'), "/mi-lista no debería caer en la 404: agrega la ruta 'mi-lista' antes de '**'").toBeNull();
    expect(pagina.querySelector('[data-testid="lista-vacia"]'), 'Sin favoritas, Mi lista debería mostrar data-testid="lista-vacia"').not.toBeNull();
  });

  it('muestra solo las mascotas marcadas, con la misma tarjeta', async () => {
    const store = TestBed.inject(FavoritosStore);
    store.alternar(MASCOTAS[3].id);
    store.alternar(MASCOTAS[1].id);
    const pagina = await navegar('/mi-lista', api);
    const esperadas = MASCOTAS.filter((m) => m.id === MASCOTAS[1].id || m.id === MASCOTAS[3].id).map((m) => m.nombre);
    expect([...nombres(pagina)].sort(), `Mi lista debería mostrar solo ${esperadas.join(' y ')}`).toEqual([...esperadas].sort());
    expect(pagina.querySelector('[data-testid="lista-vacia"]'), 'Con favoritas no debería verse lista-vacia').toBeNull();
  });

  it('las tarjetas de Mi lista dicen "En mi lista"', async () => {
    TestBed.inject(FavoritosStore).alternar(MASCOTAS[0].id);
    const pagina = await navegar('/mi-lista', api);
    const boton = pagina.querySelector('[data-testid="boton-favorito"]');
    expect(texto(boton).toLowerCase(), 'En Mi lista cada tarjeta debería recibir [esFavorita]="true"').toContain('en mi lista');
  });

  it('quitar una favorita desde Mi lista la saca de la página', async () => {
    TestBed.inject(FavoritosStore).alternar(MASCOTAS[0].id);
    const pagina = await navegar('/mi-lista', api);
    (pagina.querySelector('[data-testid="boton-favorito"]') as HTMLElement | null)?.click();
    await new Promise((resolver) => setTimeout(resolver, 0));
    expect(TestBed.inject(FavoritosStore).ids(), 'El botón de la tarjeta en Mi lista debería llamar a alternar(id)').toEqual([]);
  });
});
