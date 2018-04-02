import { TestBed, async, inject } from '@angular/core/testing';

import { SignGuard } from './sign.guard';

describe('SignGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignGuard]
    });
  });

  it('should ...', inject([SignGuard], (guard: SignGuard) => {
    expect(guard).toBeTruthy();
  }));
});
