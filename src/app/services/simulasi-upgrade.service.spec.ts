import { TestBed } from '@angular/core/testing';

import { SimulasiUpgradeService } from './simulasi-upgrade.service';

describe('SimulasiUpgradeService', () => {
  let service: SimulasiUpgradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulasiUpgradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
