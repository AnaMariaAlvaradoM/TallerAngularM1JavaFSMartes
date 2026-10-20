// Ayudas compartidas por las pruebas del taller. No es un archivo de pruebas.
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

export interface RespuestaSimulada {
  metodo: string;
  url: string;
  cuerpo: object | string | number | boolean | null;
  estado?: number;
}

export function configurar(): void {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
  });
}

function esperar(ms: number): Promise<void> {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

// Crea el componente, le pasa sus inputs y, si pide datos por HTTP, le responde
// con datos simulados. Así la misma prueba sirve con datos de prueba o con API.
export async function renderizar<T>(
  componente: Type<T>,
  entradas: Record<string, unknown> = {},
  respuestas: RespuestaSimulada[] = [],
): Promise<ComponentFixture<T>> {
  const fixture = TestBed.createComponent(componente);
  for (const [nombre, valor] of Object.entries(entradas)) {
    fixture.componentRef.setInput(nombre, valor);
  }
  const http = TestBed.inject(HttpTestingController);
  for (let ronda = 0; ronda < 3; ronda++) {
    fixture.detectChanges();
    await esperar(0);
    for (const respuesta of respuestas) {
      const pendientes = http.match(
        (peticion) => peticion.method === respuesta.metodo && peticion.url.endsWith(respuesta.url),
      );
      for (const peticion of pendientes) {
        const estado = respuesta.estado ?? 200;
        peticion.flush(respuesta.cuerpo, { status: estado, statusText: estado === 200 ? 'OK' : 'Error' });
      }
    }
  }
  await Promise.race([fixture.whenStable(), esperar(2000)]);
  fixture.detectChanges();
  return fixture;
}

export function todos(fixture: ComponentFixture<unknown>, selector: string): HTMLElement[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(selector));
}

export function uno(fixture: ComponentFixture<unknown>, selector: string): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(selector);
}

export function texto(elemento: Element | null | undefined): string {
  return (elemento?.textContent ?? '').replace(/\s+/g, ' ').trim();
}
