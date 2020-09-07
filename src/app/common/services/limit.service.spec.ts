import { TestBed } from '@angular/core/testing';

import { LimitService } from './limit.service';

describe('LimitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitService = TestBed.get(LimitService);
    expect(service).toBeTruthy();
  });
});
