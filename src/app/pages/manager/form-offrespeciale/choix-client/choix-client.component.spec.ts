import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixClientComponent } from './choix-client.component';

describe('ChoixClientComponent', () => {
  let component: ChoixClientComponent;
  let fixture: ComponentFixture<ChoixClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixClientComponent]
    });
    fixture = TestBed.createComponent(ChoixClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
