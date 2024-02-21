import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueTempsTravailMoyenComponent } from './statistique-temps-travail-moyen.component';

describe('StatistiqueTempsTravailMoyenComponent', () => {
  let component: StatistiqueTempsTravailMoyenComponent;
  let fixture: ComponentFixture<StatistiqueTempsTravailMoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueTempsTravailMoyenComponent]
    });
    fixture = TestBed.createComponent(StatistiqueTempsTravailMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
