import { TestBed } from '@angular/core/testing';

import { EducationShareService } from './education-share.service';

describe('EducationShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationShareService = TestBed.get(EducationShareService);
    expect(service).toBeTruthy();
  });
});
