import { TestBed } from '@angular/core/testing';

import { SoldService } from './sold.service';

describe('SoldService', () => {
  let service: SoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
