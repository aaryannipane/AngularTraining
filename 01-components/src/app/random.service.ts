import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  private _number = 0;
  constructor() {
    this._number = Math.random() * 500;
  }

  public get randomValue(): number {
    return this._number;
  }
}
