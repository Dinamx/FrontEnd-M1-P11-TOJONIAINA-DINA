import { TestBed } from '@angular/core/testing';

import { OffrespecialeService } from './offrespeciale.service';

describe('OffrespecialeService', () => {
  let service: OffrespecialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffrespecialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
