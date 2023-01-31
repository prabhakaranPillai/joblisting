import { TestBed } from '@angular/core/testing';

import { ServerCallService } from './server-call.service';

describe('ServerCallService', () => {
  let service: ServerCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
