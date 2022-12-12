import { TestBed } from '@angular/core/testing';

import { GlobalPubSubService } from './global-pub-sub.service';

describe('GlobalPubSubService', () => {
  let service: GlobalPubSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalPubSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
