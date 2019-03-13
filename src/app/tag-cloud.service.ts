import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { WordsInterface } from '../assets/words';
import { BoxMullerService } from './box-muller.service';
import { GenerateGaussian } from './generate-gaussian';

@Injectable()
export class TagCloudService {

  private get filePath(): string {
    return `./assets/words${this.filePathNoise}.json`;
  };
  private filePathNoise: string = '';

  private mi: number = 0;
  private sigma: number = 0.5;
  private sigmaTest: number = 1;

  constructor(
    private httpClient: HttpClient,
    private boxMullerService: BoxMullerService
  ) {}

  getWords(): Observable<WordsInterface> {
    this.generateFilePathNoise();
    return this.httpClient.get<WordsInterface>(this.filePath).pipe(
      retry(3),
      catchError(this.handleGetFileError)
    );
  }

  private generateFilePathNoise() {
    this.filePathNoise = '';
    this.boxMullerService.generateGaussian(this.mi, this.sigma)
      .pipe(catchError(this.handleGenerateGaussianError))
      .subscribe(
        (values: GenerateGaussian) => {
          this.boxMullerService.generateGaussianTest(values, this.mi, this.sigma, this.sigmaTest).subscribe(
            test => {
              !test ? this.filePathNoise = Date.now().toString() : null;
            }
          );
        },
        error => {
          console.error(error);
        }
      );
  }

  private handleGenerateGaussianError(error: string) {
    return throwError('Wystąpił błąd: ' + error);
  };

  private handleGetFileError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Wystąpił błąd:', error.error.message);
    } else {
      console.error(
        `Serwer zwrócił błąd ${error.status}, ` +
        `odpowiedź: ${error.error}`);
    }
    return throwError('Wydarzyło się coś niepokojącego :( Proszę spróbować ponownie za chwilę.');
  };
}
