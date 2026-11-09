import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { NoEncontrada } from './pages/no-encontrada/no-encontrada';

export const routes: Routes = [{ path: '', component: Inicio },
    {
  path: 'mascotas',
  loadComponent: () =>
    import('./pages/listado-mascotas/listado-mascotas')
      .then(m => m.ListadoMascotas),
},
{
  path: 'mascotas/:id',
  loadComponent: () =>
    import('./pages/detalle-mascota/detalle-mascota')
      .then(m => m.DetalleMascota),
},
{ path: '**', component: NoEncontrada, title: 'Huella Amiga · Página no encontrada' }
];
