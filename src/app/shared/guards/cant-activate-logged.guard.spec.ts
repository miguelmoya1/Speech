import { TestBed, async, inject } from '@angular/core/testing';

import { CantActivateLoggedGuard } from './cant-activate-logged.guard';

describe('CantActivateLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CantActivateLoggedGuard]
    });
  });

  it('should ...', inject([CantActivateLoggedGuard], (guard: CantActivateLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
