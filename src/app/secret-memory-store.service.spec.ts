import { TestBed } from '@angular/core/testing';

import { SecretMemoryStoreService } from './secret-memory-store.service';

describe('SecretMemoryStoreService', () => {
  let service: SecretMemoryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretMemoryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
