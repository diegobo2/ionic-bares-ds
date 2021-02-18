import { TestBed } from '@angular/core/testing';

import { BarcrudService } from './barcrud.service';

describe('BarcrudService', () => {
  let service: BarcrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
