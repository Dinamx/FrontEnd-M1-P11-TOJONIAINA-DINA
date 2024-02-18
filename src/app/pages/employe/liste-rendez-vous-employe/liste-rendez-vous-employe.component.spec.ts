import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRendezVousEmployeComponent } from './liste-rendez-vous-employe.component';

describe('ListeRendezVousEmployeComponent', () => {
  let component: ListeRendezVousEmployeComponent;
  let fixture: ComponentFixture<ListeRendezVousEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRendezVousEmployeComponent]
    });
    fixture = TestBed.createComponent(ListeRendezVousEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
