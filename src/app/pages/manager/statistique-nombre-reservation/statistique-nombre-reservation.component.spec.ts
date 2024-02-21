import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueNombreReservationComponent } from './statistique-nombre-reservation.component';

describe('StatistiqueNombreReservationComponent', () => {
  let component: StatistiqueNombreReservationComponent;
  let fixture: ComponentFixture<StatistiqueNombreReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueNombreReservationComponent]
    });
    fixture = TestBed.createComponent(StatistiqueNombreReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
