import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { WordsInterface } from '../assets/words';

@Injectable()
export class TagCloudService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getWords(): Observable<WordsInterface> {
    
    return this.httpClient.get<WordsInterface>('./assets/words.json').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened :( Please try again later.');
  };
}
