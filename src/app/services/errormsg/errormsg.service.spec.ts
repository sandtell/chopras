import { TestBed } from '@angular/core/testing';

import { ErrormsgService } from './errormsg.service';

describe('ErrormsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrormsgService = TestBed.get(ErrormsgService);
    expect(service).toBeTruthy();
  });
});
