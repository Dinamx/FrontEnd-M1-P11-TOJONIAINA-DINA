import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueBeneficeMensuelComponent } from './statistique-benefice-mensuel.component';

describe('StatistiqueBeneficeMensuelComponent', () => {
  let component: StatistiqueBeneficeMensuelComponent;
  let fixture: ComponentFixture<StatistiqueBeneficeMensuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueBeneficeMensuelComponent]
    });
    fixture = TestBed.createComponent(StatistiqueBeneficeMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
