import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendezVousComponent } from './form-rendez-vous.component';

describe('FormRendezVousComponent', () => {
  let component: FormRendezVousComponent;
  let fixture: ComponentFixture<FormRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRendezVousComponent]
    });
    fixture = TestBed.createComponent(FormRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
