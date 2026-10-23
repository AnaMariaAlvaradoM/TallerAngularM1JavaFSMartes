import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaMascota } from './tarjeta-mascota';

describe('TarjetaMascota', () => {
  let component: TarjetaMascota;
  let fixture: ComponentFixture<TarjetaMascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaMascota],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaMascota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
