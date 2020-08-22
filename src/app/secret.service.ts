import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Secret } from './secret';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecretService {
  private secretsURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json'
    }),
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (_: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      console.log(result);

      return throwError(error);
    };
  }

  isValidKey(key: string): boolean {
    console.log('is valid key', key, /[a-z0-9]{27}/.test(key));
    return /[a-z0-9]{26,27}/.test(key);
  }


  getSecret(secretID: string, secretKey: string): Observable<Secret> {
    return this.http.get<Secret>(`${this.secretsURL}/${secretID}/${secretKey}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetch secret ${secretID}`)),
        catchError(this.handleError<Secret>('getSecret'))
      );
  }

  saveSecret(secret: string): Observable<Secret> {
    return this.http.post<Secret>(`${this.secretsURL}`, secret, this.httpOptions)
      .pipe(
        tap(res => console.log('create secret', secret, res)),
        catchError(this.handleError<Secret>('saveSecret'))
      );
  }
}
