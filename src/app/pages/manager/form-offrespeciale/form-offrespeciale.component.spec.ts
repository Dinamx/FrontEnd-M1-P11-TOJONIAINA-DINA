import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOffrespecialeComponent } from './form-offrespeciale.component';

describe('FormOffrespecialeComponent', () => {
  let component: FormOffrespecialeComponent;
  let fixture: ComponentFixture<FormOffrespecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormOffrespecialeComponent]
    });
    fixture = TestBed.createComponent(FormOffrespecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
