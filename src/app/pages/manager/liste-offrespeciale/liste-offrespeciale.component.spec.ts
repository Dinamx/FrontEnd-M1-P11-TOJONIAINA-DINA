import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffrespecialeComponent } from './liste-offrespeciale.component';

describe('ListeOffrespecialeComponent', () => {
  let component: ListeOffrespecialeComponent;
  let fixture: ComponentFixture<ListeOffrespecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOffrespecialeComponent]
    });
    fixture = TestBed.createComponent(ListeOffrespecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
