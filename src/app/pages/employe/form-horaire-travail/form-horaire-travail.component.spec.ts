import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHoraireTravailComponent } from './form-horaire-travail.component';

describe('FormHoraireTravailComponent', () => {
  let component: FormHoraireTravailComponent;
  let fixture: ComponentFixture<FormHoraireTravailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormHoraireTravailComponent]
    });
    fixture = TestBed.createComponent(FormHoraireTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
