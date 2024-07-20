import { Injectable } from '@angular/core';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root',
})
export class SecretMemoryStoreService {
  secret: Secret;
  password: string;

  constructor() {
    this.secret = null;
  }

  private resetSecret(): void {
    this.secret = null;
  }

  store(secret: Secret, password: string): void {
    this.secret = secret;
    this.password = password;
  }

  get(): { secret: Secret; password: string } {
    const secret: Secret = this.secret;
    const password = this.password;
    this.resetSecret();
    return { secret, password };
  }
}
