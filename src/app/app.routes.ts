import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { NoEncontrada } from './pages/no-encontrada/no-encontrada';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    title: 'Huella Amiga',
  },
  {
    path: 'mascotas',
    loadComponent: () => import('./pages/listado-mascotas/listado-mascotas').then((m) => m.ListadoMascotas),
    title: 'Mascotas · Huella Amiga',
  },
  {
    path: 'mascotas/:id',
    loadComponent: () => import('./pages/detalle-mascota/detalle-mascota').then((m) => m.DetalleMascota),
    title: 'Detalle de mascota',
  },
  {
    path: '**',
    component: NoEncontrada,
    title: 'Página no encontrada',
  },
];
