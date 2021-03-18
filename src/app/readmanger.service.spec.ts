import { TestBed } from '@angular/core/testing';

import { ReadmangerService } from './readmanger.service';

describe('ReadmangerService', () => {
  let service: ReadmangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadmangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
