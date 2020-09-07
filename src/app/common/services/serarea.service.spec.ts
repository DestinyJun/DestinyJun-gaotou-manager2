import { TestBed } from '@angular/core/testing';

import { SerareaService } from './serarea.service';

describe('SerareaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerareaService = TestBed.get(SerareaService);
    expect(service).toBeTruthy();
  });
});
