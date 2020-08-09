import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Secret } from './secret';

@Injectable({
    providedIn: 'root'
})
export class SecretService {
  private secretsURL = 'api/secret';

  constructor(
    private http: HttpClient
  ) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (_: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log('error', error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      return throwError(error)
    };
  }

  hasSecret(secretID: string): Observable<Secret> {
    return this.http.get<Secret>(`${this.secretsURL}/has/${secretID}`)
    .pipe(
      tap((secret: Secret) => {
        if (secret) {
          console.log(`has secret ${secret.ID}`);
        } else {
          console.error('has secret error', secret);
        }
      }),
        catchError(this.handleError<Secret>('hasSecret')));
  }

  getSecret(secretID: string, secretKey: string): Observable<Secret> {
    return this.http.get<Secret>(`${this.secretsURL}/read/${secretID}/${secretKey}`)
      .pipe(
        tap(_ => console.log(`fetch secret ${secretID}`)),
        catchError(this.handleError<Secret>('getSecret'))
      );
  }

  saveSecret(secret: string): Observable<Secret> {
    console.log('save secret', secret);
    return this.http.post<Secret>(`${this.secretsURL}`, {Data: secret, Created: null})
      .pipe(
        tap(_ => console.log('create secret', secret)),
        catchError(this.handleError<Secret>('saveSecret'))
      );
  }
}
