import { TestBed } from '@angular/core/testing';

import { PublicMethedService } from './public-methed.service';

describe('PublicMethedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicMethedService = TestBed.get(PublicMethedService);
    expect(service).toBeTruthy();
  });
});
