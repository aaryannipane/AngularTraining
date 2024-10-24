import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  defaultIfEmpty,
  every,
  from,
  of,
  timer,
  sequenceEqual,
  combineLatest,
  concat,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnInit {
  arr: number[] = [1, 2, 3, 4, 5];
  ngOnInit(): void {
    // this.timerExample();
    // this.defaultIfEmptyExample();
    // this.everyExample();

    // this.sequenceEqualExample();
    this.combineLatestExample();
  }

  timerExample() {
    timer(2000)
      .pipe(concatMap(() => from(this.arr)))
      .subscribe(console.log);
  }

  //#region Conditional Operators
  defaultIfEmptyExample() {
    from([])
      .pipe(defaultIfEmpty('no data found'))
      .subscribe((data) => console.log(`defaultIfEmptyExample - ${data}`));
  }

  everyExample() {
    from(this.arr)
      .pipe(every((v) => v < 10))
      .subscribe((v) => console.log(`everyExample - ${v}`));
  }

  sequenceEqualExample() {
    from(this.arr)
      .pipe(sequenceEqual(from([1, 2, 3, 4, 5])))
      .subscribe((d) => console.log(`sequenceEqualExample - ${d}`));
  }
  //#endregion

  //#region Combination Operators
  combineLatestExample() {
    combineLatest([from(this.arr), from()]).subscribe((d) =>
      console.log(`combineLatestExample - ${d}`)
    );
  }

  concatExample(){
    concat(from(this.arr), from())
  }
  //#endregion
}
