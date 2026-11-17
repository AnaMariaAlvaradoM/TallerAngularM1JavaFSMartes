import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Mascota } from '../../app/models/mascota';
import { SolicitudAdopcion } from '../../app/models/solicitud-adopcion';
import { MascotasApi } from '../../app/services/mascotas-api';
import { configurar } from '../utilidades';

const pelusa: Mascota = { id: 7, nombre: 'Pelusa', especie: 'gato', edadMeses: 40, descripcion: 'Llegó de la API', adoptada: false };

describe('4.2 · MascotasApi', () => {
  beforeEach(() => configurar());

  it('se puede inyectar sin agregarlo a providers (@Service)', () => {
    expect(TestBed.inject(MascotasApi), 'MascotasApi debería llevar @Service() para que Angular lo entregue en toda la app').toBeTruthy();
  });

  it('listar() hace GET a /api/mascotas y entrega la lista', () => {
    const http = TestBed.inject(HttpTestingController);
    let recibidas: Mascota[] = [];
    TestBed.inject(MascotasApi).listar().subscribe((mascotas) => (recibidas = mascotas));
    const peticiones = http.match((p) => p.method === 'GET' && p.url.endsWith('/api/mascotas'));
    expect(peticiones.length, 'listar() debería hacer un GET a /api/mascotas (y la petición sale cuando alguien se suscribe)').toBe(1);
    peticiones[0]?.flush([pelusa]);
    expect(recibidas, 'listar() debería entregar el arreglo que responde la API').toEqual([pelusa]);
  });

  it('obtener(id) hace GET a /api/mascotas/{id}', () => {
    const http = TestBed.inject(HttpTestingController);
    let recibida: Mascota | undefined;
    TestBed.inject(MascotasApi).obtener(7).subscribe((mascota) => (recibida = mascota));
    const peticiones = http.match((p) => p.method === 'GET' && p.url.endsWith('/api/mascotas/7'));
    expect(peticiones.length, 'obtener(7) debería hacer un GET a /api/mascotas/7').toBe(1);
    peticiones[0]?.flush(pelusa);
    expect(recibida, 'obtener(id) debería entregar la mascota que responde la API').toEqual(pelusa);
  });

  it('enviarSolicitud(s) hace POST a /api/solicitudes con la solicitud en el cuerpo', () => {
    const http = TestBed.inject(HttpTestingController);
    const solicitud: SolicitudAdopcion = { mascotaId: 7, nombreCompleto: 'Laura Gómez', correo: 'laura@correo.co', motivo: 'Tengo espacio' };
    TestBed.inject(MascotasApi).enviarSolicitud(solicitud).subscribe();
    const peticiones = http.match((p) => p.method === 'POST' && p.url.endsWith('/api/solicitudes'));
    expect(peticiones.length, 'enviarSolicitud(s) debería hacer un POST a /api/solicitudes').toBe(1);
    expect(peticiones[0]?.request.body, 'El cuerpo del POST debería ser la solicitud tal cual').toEqual(solicitud);
  });
});
