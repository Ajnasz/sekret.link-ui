import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class SecretService {

  constructor() { }

  getSecret(secretID: string, secretKey: string): Observable<Secret> {
        return of({
            Data: `Secret of ${secretID}/${secretKey}`,
            Created: new Date(),
        });
  }

  saveSecret(secret: string): Observable<string> {
      console.log('save', secret);
      return of('/foo/bar');
  }
}
