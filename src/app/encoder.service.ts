import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncoderService {
  encryptData(data: string, password: string): string {
    return AES.encrypt(data, password).toString();
  }

  decryptData(data: string, password: string): string {
    return AES.decrypt(data, password).toString(enc.Utf8);
  }

  encodeKey(data: Uint8Array): string {
    return Array.prototype.map
      .call(new Uint8Array(data), (x: number) =>
        ('00' + x.toString(16)).slice(-2)
      )
      .join('');
  }

  decodeKey(str: string): Uint8Array {
    const o = [];
    for (let i = 0; i < str.length; i += 2) {
      o.push(parseInt(str.slice(i, i + 2), 16));
    }

    return new Uint8Array(o);
  }

  generatePassword(bits = 32): string {
    return this.encodeKey(window.crypto.getRandomValues(new Uint8Array(bits)));
  }
}
