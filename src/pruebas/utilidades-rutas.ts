// Ayudas para las pruebas de navegación (Fase 2 en adelante). No es un archivo de pruebas.
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { RespuestaSimulada } from './utilidades';

function esperar(ms: number): Promise<void> {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

// Abre una dirección con el router de verdad y devuelve la página que quedó en pantalla.
// Si la página pide datos por HTTP (Fase 4), le responde con datos simulados.
export async function navegar(url: string, respuestas: RespuestaSimulada[] = []): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  const http = TestBed.inject(HttpTestingController);
  for (let ronda = 0; ronda < 3; ronda++) {
    harness.detectChanges();
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
  await Promise.race([harness.fixture.whenStable(), esperar(2000)]);
  harness.detectChanges();
  return harness.fixture.nativeElement as HTMLElement;
}
