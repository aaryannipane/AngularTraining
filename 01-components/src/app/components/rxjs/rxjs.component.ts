import { getLocaleFirstDayOfWeek } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  mergeWith,
  Observable,
  race,
  startWith,
  withLatestFrom,
  zip,
  distinct,
  distinctUntilChanged,
  elementAt,
  find,
  findIndex,
  sample,
  throttle,
  interval,
  tap,
  fromEvent,
  throttleTime,
  config,
  count,
  max,
  min,
  buffer,
  delay,
  delayWhen,
  bufferCount,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnInit, AfterViewInit {
  arr: number[] = [1, 2, 3, 4, 5];
  arr2: string[] = ['a', 'b', 'c', 'd'];

  @ViewChild('btn') btn!: ElementRef;
  click$!: Observable<any>;
  ngOnInit(): void {
    // this.timerExample();
    // this.defaultIfEmptyExample();
    // this.everyExample();
    // this.sequenceEqualExample();
    // this.combineLatestExample();
    // this.concatExample();
    // this.mergeWithExample();
    // this.raceExample();
    // this.startWithExample();
    // this.withLatestFromExample();
    // this.zipExample();
    // this.distinctExample();
    // this.distinctUntilChangedExample();
    // this.elementAtExample();
    // this.findExample();
    // this.findIndexExample();
    // this.sampleExample();
    // this.countExample();
    // this.maxExample();
    // this.minExample();
  }
  ngAfterViewInit(): void {
    this.click$ = fromEvent(this.btn.nativeElement, 'click');
    // this.throttleExample();
    // this.throttleTimeExample();

    // this.bufferExample();
    this.bufferCountExample();
  }

  delayedObs1(): Observable<number> {
    return new Observable((observer) => {
      setTimeout(() => observer.next(1), 1000);
      setTimeout(() => observer.next(2), 2000);
      setTimeout(() => observer.next(3), 3000);
      setTimeout(() => observer.next(4), 4000);
      setTimeout(() => {
        observer.next(5);
        observer.complete();
      }, 5000);
    });
  }

  delayedObs2() {
    return new Observable((observer) => {
      setTimeout(() => observer.next('a'), 500);
      setTimeout(() => observer.next('b'), 1500);
      setTimeout(() => observer.next('c'), 2000);
      setTimeout(() => observer.next('d'), 2500);
      setTimeout(() => {
        observer.next('e');
        observer.complete();
      }, 3000);
    });
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
    combineLatest([from(this.arr), from(this.arr2)]).subscribe((d) =>
      console.log(`combineLatestExample - ${d}`)
    );
  }

  concatExample() {
    concat(from(this.arr), from(this.arr2)).subscribe((d) =>
      console.log(`concatExample - ${d}`)
    );
  }

  mergeWithExample() {
    this.delayedObs1()
      .pipe(mergeWith(this.delayedObs2()))
      .subscribe((d) => console.log(`mergeWithExample - ${d}`));
  }

  raceExample() {
    race([this.delayedObs1(), this.delayedObs2()]).subscribe((d) =>
      console.log(`raceExample - ${d}`)
    );
  }

  startWithExample() {
    this.delayedObs1()
      .pipe(startWith('obs started'))
      .subscribe((d) => console.log(`startWithExample - ${d}`));
  }

  withLatestFromExample() {
    this.delayedObs1()
      .pipe(withLatestFrom(this.delayedObs2()))
      .subscribe((d) => console.log(`withLatestFromExample - ${d}`));
  }

  zipExample() {
    zip([this.delayedObs1(), this.delayedObs2()]).subscribe((d) =>
      console.log(`zipExample - ${d}`)
    );
  }
  //#endregion

  //#region Filtering Operators
  distinctExample() {
    from([1, 1, 2, 3, 4, 2, 3, 4, 2, 3])
      .pipe(distinct())
      .subscribe((d) => console.log(`distinctExample - ${d}`));
  }

  distinctUntilChangedExample() {
    from([1, 2, 2, 1, 3])
      .pipe(distinctUntilChanged())
      .subscribe((d) => console.log(`distinctUntilChangedExample - ${d}`));
  }

  elementAtExample() {
    this.delayedObs1()
      .pipe(elementAt(1))
      .subscribe((d) => console.log(`elementAtExample - ${d}`));
  }

  findExample() {
    this.delayedObs1()
      .pipe(find((x) => x == 2))
      .subscribe((d) => console.log(`findExample - ${d}`));
  }

  findIndexExample() {
    this.delayedObs1()
      .pipe(findIndex((x) => x == 2))
      .subscribe((d) => console.log(`findIndexExample - ${d}`));
  }

  sampleExample() {
    this.delayedObs1()
      .pipe(sample(this.delayedObs2()))
      .subscribe((d) => console.log(`sampleExample - ${d}`));
  }

  throttleExample() {
    this.click$
      .pipe(throttle(() => interval(1000)))
      .subscribe(() => console.log(`btn clicked`));

    from(this.arr)
      .pipe(
        tap((d) => console.log(d)),
        throttle(() => interval(1500))
      )
      .subscribe((d) => console.log(`throttleExample - ${d}`));
  }

  throttleTimeExample() {
    this.click$
      .pipe(throttleTime(5000, undefined, { leading: true, trailing: true }))
      .subscribe(() => console.log(`btn clicked`));
  }
  //#endregion

  //#region Mathematical Operators
  countExample() {
    this.delayedObs1()
      .pipe(count((d: number) => d > 1))
      .subscribe((d) => console.log(`countExample - ${d}`));
  }
  maxExample() {
    this.delayedObs1()
      .pipe(max())
      .subscribe((d) => console.log(`maxExample - ${d}`));
  }
  minExample() {
    this.delayedObs1()
      .pipe(min())
      .subscribe((d) => console.log(`minExample - ${d}`));
  }
  //#endregion

  //#region Transformation Operators
  bufferExample() {
    ajax
      .getJSON('https://dummyjson.com/products')
      .pipe(
        concatMap((response: any) =>
          from(response.products).pipe(
            concatMap((product) => from([product]).pipe(delay(500))) // emit each product with a 1-second delay
          )
        ),
        buffer(interval(1000)) // buffer every 4 seconds
      )
      .subscribe((data) => {
        console.log('Buffered products every 1s:', data);
      });
  }
  bufferCountExample() {
    ajax
      .getJSON('https://dummyjson.com/products')
      .pipe(
        concatMap((response: any) =>
          from(response.products).pipe(
            concatMap((product) => from([product]).pipe(delay(500))) // emit each product with a 1-second delay
          )
        ),
        bufferCount(5)
      )
      .subscribe((data) => {
        console.log('bufferCountExample: ', data);
      });
  }
  //#endregion
}
