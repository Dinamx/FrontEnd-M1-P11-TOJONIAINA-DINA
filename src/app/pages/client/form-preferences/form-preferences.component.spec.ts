import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreferencesComponent } from './form-preferences.component';

describe('FormPreferencesComponent', () => {
  let component: FormPreferencesComponent;
  let fixture: ComponentFixture<FormPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPreferencesComponent]
    });
    fixture = TestBed.createComponent(FormPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
