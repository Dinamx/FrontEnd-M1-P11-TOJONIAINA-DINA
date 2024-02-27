import { TestBed } from '@angular/core/testing';

import { RendezvousServiceService } from './rendezvous-service.service';

describe('RendezvousServiceService', () => {
  let service: RendezvousServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendezvousServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
