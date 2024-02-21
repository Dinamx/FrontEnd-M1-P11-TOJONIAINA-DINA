import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueChiffreDAffaireComponent } from './statistique-chiffre-d-affaire.component';

describe('StatistiqueChiffreDAffaireComponent', () => {
  let component: StatistiqueChiffreDAffaireComponent;
  let fixture: ComponentFixture<StatistiqueChiffreDAffaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueChiffreDAffaireComponent]
    });
    fixture = TestBed.createComponent(StatistiqueChiffreDAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
