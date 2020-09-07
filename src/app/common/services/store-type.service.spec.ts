import { TestBed } from '@angular/core/testing';

import { StoreTypeService } from './store-type.service';

describe('StoreTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreTypeService = TestBed.get(StoreTypeService);
    expect(service).toBeTruthy();
  });
});
