import { TestBed } from '@angular/core/testing';

import { SerareaFieldService } from './serarea-field.service';

describe('SerareaFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerareaFieldService = TestBed.get(SerareaFieldService);
    expect(service).toBeTruthy();
  });
});
