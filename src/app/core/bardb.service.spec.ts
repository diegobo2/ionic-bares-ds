import { TestBed } from '@angular/core/testing';

import { BardbService } from './bardb.service';

describe('BardbService', () => {
  let service: BardbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BardbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
