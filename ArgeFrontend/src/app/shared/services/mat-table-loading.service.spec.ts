import { TestBed } from '@angular/core/testing';

import { MatTableLoadingService } from './mat-table-loading.service';

describe('MatTableLoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatTableLoadingService = TestBed.get(MatTableLoadingService);
    expect(service).toBeTruthy();
  });
});
