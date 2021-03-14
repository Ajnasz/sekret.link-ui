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
  private secretsURL = new URL(environment.apiURL);

  constructor(
    private http: HttpClient
  ) {}

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
  private handleError<T>(operation = 'operation', _?: T): (_: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      return throwError(error);
    };
  }

  isValidKey(key: string): boolean {
    return /[a-z0-9]{26,27}/.test(key);
  }


  getSecret(secretID: string, secretKey: string): Observable<Secret> {
    const url = new URL(this.secretsURL.href);
    url.pathname += `${secretID}/${secretKey}`;
    return this.http.get<Secret>(url.href, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetch secret ${secretID}`)),
        catchError(this.handleError<Secret>('getSecret'))
      );
  }

  saveSecret(secret: string, expire?: string, maxReads?: number): Observable<Secret> {
    const url = new URL(this.secretsURL.href);
    const queries: string[] = [];
    if (expire !== '') {
      queries.push(`expire=${expire}`);
    }
    if (maxReads > 0) {
      queries.push(`maxReads=${maxReads}`);
    }

    if (queries.length > 0) {
      url.search = `?${queries.join('&')}`;
    }
    return this.http.post<Secret>(url.href, secret, this.httpOptions)
      .pipe(
        tap(_ => console.log('secret created')),
        catchError(this.handleError<Secret>('saveSecret'))
      );
  }
}
