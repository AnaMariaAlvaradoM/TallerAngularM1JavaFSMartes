import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Etiqueta } from './etiqueta';

describe('Etiqueta', () => {
  let component: Etiqueta;
  let fixture: ComponentFixture<Etiqueta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Etiqueta],
    }).compileComponents();

    fixture = TestBed.createComponent(Etiqueta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
