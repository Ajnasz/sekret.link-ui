import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
      };
  }

  getSecret(secretID: string, secretKey: string): Observable<Secret> {
      console.log('get secret');
      return this.http.get<Secret>(`${this.secretsURL}/${secretID}/${secretKey}`)
      .pipe(
          tap(_ => console.log(`fetch secret ${secretID}`)),
              catchError(this.handleError<Secret>('getSecret')));
  }

  saveSecret(secret: string): Observable<string> {
      console.log('save', secret);
      return of('/foo/bar');
  }
}
