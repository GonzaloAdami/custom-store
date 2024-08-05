import { TestBed } from '@angular/core/testing';

import { BDService } from './bd.service';

describe('BDService', () => {
  let service: BDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
