import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { routes } from '../../app/app.routes';
import { Inicio } from '../../app/pages/inicio/inicio';
import { ListadoMascotas } from '../../app/pages/listado-mascotas/listado-mascotas';
import { DetalleMascota } from '../../app/pages/detalle-mascota/detalle-mascota';
import { NoEncontrada } from '../../app/pages/no-encontrada/no-encontrada';

function ruta(path: string): Route | undefined {
  return routes.find((r) => r.path === path);
}

async function componenteDiferido(r: Route | undefined): Promise<unknown> {
  if (!r?.loadComponent) return undefined;
  const cargado = (await r.loadComponent()) as Type<unknown> | { default: Type<unknown> };
  return 'default' in cargado ? cargado.default : cargado;
}

describe('2.1 · Rutas', () => {
  it('la dirección vacía muestra Inicio', () => {
    expect(ruta('')?.component, "La ruta '' debería mostrar Inicio (component: Inicio)").toBe(Inicio);
  });

  it('mascotas carga ListadoMascotas con loadComponent', async () => {
    expect(ruta('mascotas'), "Falta la ruta 'mascotas' (sin barra inicial)").toBeDefined();
    expect(await componenteDiferido(ruta('mascotas')), "La ruta 'mascotas' debería usar loadComponent con ListadoMascotas").toBe(ListadoMascotas);
  });

  it('mascotas/:id carga DetalleMascota con loadComponent', async () => {
    expect(ruta('mascotas/:id'), "Falta la ruta 'mascotas/:id'").toBeDefined();
    expect(await componenteDiferido(ruta('mascotas/:id')), "La ruta 'mascotas/:id' debería usar loadComponent con DetalleMascota").toBe(DetalleMascota);
  });

  it("la ruta '**' va de última y muestra NoEncontrada", () => {
    const ultima = routes[routes.length - 1];
    expect(ultima?.path, "La última ruta debería ser '**' (si va antes, tapa a las demás)").toBe('**');
    expect(ultima?.component, "La ruta '**' debería mostrar NoEncontrada").toBe(NoEncontrada);
  });
});
