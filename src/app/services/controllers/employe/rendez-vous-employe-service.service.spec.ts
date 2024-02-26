import { TestBed } from '@angular/core/testing';

import { RendezVousEmployeServiceService } from './rendez-vous-employe-service.service';

describe('RendezVousEmployeServiceService', () => {
  let service: RendezVousEmployeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendezVousEmployeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
