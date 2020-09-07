import { TestBed } from '@angular/core/testing';

import { CashConfigService } from './cash-config.service';

describe('CashConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashConfigService = TestBed.get(CashConfigService);
    expect(service).toBeTruthy();
  });
});
