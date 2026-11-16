import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoMascotas } from './listado-mascotas';

describe('ListadoMascotas', () => {
  let component: ListadoMascotas;
  let fixture: ComponentFixture<ListadoMascotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoMascotas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoMascotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
