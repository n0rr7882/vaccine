import { TestBed, inject } from '@angular/core/testing';

import { DevlogService } from './devlog.service';

describe('DevlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevlogService]
    });
  });

  it('should be created', inject([DevlogService], (service: DevlogService) => {
    expect(service).toBeTruthy();
  }));
});
