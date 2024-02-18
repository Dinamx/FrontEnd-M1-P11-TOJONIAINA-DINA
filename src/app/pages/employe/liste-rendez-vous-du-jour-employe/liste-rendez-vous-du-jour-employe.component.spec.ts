import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRendezVousDuJourEmployeComponent } from './liste-rendez-vous-du-jour-employe.component';

describe('ListeRendezVousDuJourEmployeComponent', () => {
  let component: ListeRendezVousDuJourEmployeComponent;
  let fixture: ComponentFixture<ListeRendezVousDuJourEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRendezVousDuJourEmployeComponent]
    });
    fixture = TestBed.createComponent(ListeRendezVousDuJourEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
