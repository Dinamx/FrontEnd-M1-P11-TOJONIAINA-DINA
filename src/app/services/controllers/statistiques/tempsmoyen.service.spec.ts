import { TestBed } from '@angular/core/testing';

import { TempsmoyenService } from './tempsmoyen.service';

describe('TempsmoyenService', () => {
  let service: TempsmoyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempsmoyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
