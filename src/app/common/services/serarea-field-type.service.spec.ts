import { TestBed } from '@angular/core/testing';

import { SerareaFieldTypeService } from './serarea-field-type.service';

describe('SerareaFieldTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerareaFieldTypeService = TestBed.get(SerareaFieldTypeService);
    expect(service).toBeTruthy();
  });
});
