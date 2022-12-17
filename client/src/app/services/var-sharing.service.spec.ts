import { TestBed } from '@angular/core/testing';

import { VarSharingService } from './var-sharing.service';

describe('VarSharingService', () => {
  let service: VarSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
