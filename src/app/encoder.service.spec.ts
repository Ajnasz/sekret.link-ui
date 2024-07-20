import { TestBed } from '@angular/core/testing';

import { EncoderService } from './encoder.service';

describe('EncoderService', () => {
  let service: EncoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encode and decode key', () => {
    const password = window.crypto.getRandomValues(new Uint8Array(32));
    const encoded = service.encodeKey(password);
    const decoded = service.decodeKey(encoded);

    expect(decoded).toEqual(password);
  });

  it('should encrypt and decrypt', () => {
    const data = 'Foo Bar Baz';
    const password = 'AsdfJKle';
    const encrypted = service.encryptData(data, password);
    const decrypted = service.decryptData(encrypted, password);

    expect(decrypted).toEqual(data);
  });
});
