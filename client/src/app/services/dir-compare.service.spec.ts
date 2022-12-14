import { TestBed } from '@angular/core/testing';

import { DirCompareService } from './dir-compare.service';

describe('DirCompareService', () => {
  let service: DirCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
