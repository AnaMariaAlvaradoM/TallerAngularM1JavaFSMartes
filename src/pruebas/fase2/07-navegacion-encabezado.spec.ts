import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Encabezado } from '../../app/components/encabezado/encabezado';
import { renderizar, uno } from '../utilidades';

@Component({ template: '' })
class Vacia {}

describe('2.7 · Navegación en el encabezado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: Vacia },
          { path: 'mascotas', component: Vacia },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('tiene un enlace al inicio (/)', async () => {
    const fixture = await renderizar(Encabezado);
    expect(uno(fixture, 'a[href="/"]'), 'El encabezado debería tener un enlace con routerLink="/"').not.toBeNull();
  });

  it('tiene un enlace al listado (/mascotas)', async () => {
    const fixture = await renderizar(Encabezado);
    expect(uno(fixture, 'a[href="/mascotas"]'), 'El encabezado debería tener un enlace con routerLink="/mascotas"').not.toBeNull();
  });

  it('el enlace de /mascotas se marca cuando estás en /mascotas (routerLinkActive)', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    const fixture = await renderizar(Encabezado);
    const antes = uno(fixture, 'a[href="/mascotas"]')?.className ?? '';
    await router.navigateByUrl('/mascotas');
    fixture.detectChanges();
    await fixture.whenStable();
    const despues = uno(fixture, 'a[href="/mascotas"]')?.className ?? '';
    expect(despues, 'Al entrar a /mascotas, su enlace debería ganar una clase (usa routerLinkActive="activo")').not.toBe(antes);
  });
});
