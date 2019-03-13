import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { GenerateGaussian } from './generate-gaussian';

@Injectable({
  providedIn: 'root'
})
export class BoxMullerService {

  private EPSILON: number;
  private _2PI: number;
  private maxCounter: number;

  constructor() {
    this.EPSILON = typeof Number.EPSILON !== 'undefined' ? Number.EPSILON : 1/1e9;
    this._2PI = Math.PI * 2;
    this.maxCounter = 1e5;
  }

  generateGaussian(mean: number, std: number): Observable<GenerateGaussian> {
    let u1: number;
    let u2: number;
    let counter = 0;
    do {
      u1 = Math.random();
      u2 = Math.random();
      counter++;
    } while (u1 <= this.EPSILON && counter < this.maxCounter);
    if (counter >= this.maxCounter) {
      return throwError('Error while Gaussian Distribution generating');
    }
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(this._2PI * u2);
    let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(this._2PI * u2);
    return of({ v1: z0 * std + mean, v2: z1 * std + mean });
  }

  generateGaussianTest(values: GenerateGaussian, mi: number, sigma: number, sigmaTest: number): Observable<boolean> {
    return of(Math.abs(values.v1) <= mi + sigmaTest * sigma && Math.abs(values.v1) <= mi + sigmaTest * sigma);
  }
}
