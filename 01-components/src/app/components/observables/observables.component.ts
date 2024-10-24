import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  filter,
  from,
  fromEvent,
  Observable,
  of,
  map,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  take,
  interval,
  takeUntil,
  Subject,
  takeWhile,
  takeLast,
  first,
  last,
  single,
  skip,
  skipWhile,
  skipUntil,
  skipLast,
  tap,
  scan,
  reduce,
  debounceTime,
  debounce,
  delay,
  delayWhen,
  timer,
  throwError,
  catchError,
  retry,
  retryWhen,
  forkJoin,
} from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent implements OnInit, AfterViewInit {
  @ViewChild('btn', { static: true }) btn!: ElementRef;
  clicks$!: Observable<any>;
  count: number = 0;
  arr = [1, 2, 3, 4, 5, 6, 7];

  notifier = new Subject();

  ngOnInit(): void {
    // creating observable
    let obs;
    obs = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    let arr = [1, 2, 3, 4, 5, 6, 7];
    let array2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    // creating observable using 'of' operator
    obs = of(arr, array2, 10, 'from observable');

    // using from it accepts one arg that is array for iterable
    obs = from(arr);

    // pipe
    obs = obs.pipe(
      filter((data) => data < 7),
      map((data) => {
        return data * 2;
      })
    );

    // for proper examples visit site and see click event made using fromEvent

    // switchMap - (real world example fetching data) https://www.tektutorialshub.com/angular/using-switchmap-in-angular/#:~:text=We%20can%20easily%20solve%20the%20above%20issue
    // it unsubscribes from previous observable when new value is received
    obs = obs.pipe(
      switchMap((val) => {
        console.log(`source value : ${val}`);

        console.log('starting new observable');

        return of('a', 'b', 'c', 'd');
      })
    );

    // mergeMap - it is same like switchMap but it does not unsubscribe from previous observables when new val received
    // does't maintain the order
    // https://www.tektutorialshub.com/angular/using-mergemap-in-angular/
    obs = obs.pipe(
      mergeMap((val) => {
        console.log(`source value: ${val}`);
        console.log(`starting new observable`);

        return from(array2);
      })
    );

    // concatMap - https://www.tektutorialshub.com/angular/using-concatmap-in-angular/
    // it maintains the order
    obs = obs.pipe(
      concatMap((val) => {
        console.log(`source value: ${val}`);
        console.log(`starting new observable`);

        return from(array2);
      })
    );

    // consuming (subscribing) observable
    obs.subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('obs completed');
      },
    });
  }

  ngAfterViewInit(): void {
    this.clicks$ = fromEvent(this.btn.nativeElement, 'click');
    this.switchMapExample(); // unsubscribes last observer
    // this.mergeMapExample(); // no order
    // this.concatMapExample(); // with order
    // this.exhaustMapExample(); // ignores source when inner obs is not completed

    // this.takeExample();
    // this.takeUntilExample();
    // this.takeWhileExample();
    // this.takeLastExample();

    // this.firstExample();
    // this.lastExample();
    // this.singleExample();

    // this.skipExample();
    // this.skipWhileExample();
    // this.skipUntilExample();
    // this.skipLastExample();

    // this.scanExample();
    // this.reduceExample();

    // this.debounceTimeExample();
    // this.debounceExample();

    // this.delayExample();
    // this.delayWhenExample();

    // this.throwErrorExample();
    // this.catchExample();

    // this.retryExample();
  }

  delayedObs(count: number) {
    return new Observable((observer) => {
      setTimeout(() => observer.next(count + ' A'), 1000);
      setTimeout(() => observer.next(count + ' B'), 2000);
      setTimeout(() => observer.next(count + ' C'), 3000);
      setTimeout(() => observer.next(count + ' D'), 4000);
      setTimeout(() => {
        observer.next(count + ' E');
        observer.complete();
      }, 5000);
    });
  }

  //#region Maps
  switchMapExample() {
    this.count = 0;
    let obs = this.clicks$
      .pipe(
        switchMap(() => {
          this.count += 1;

          return forkJoin([
            this.delayedObs(this.count),
            ajax.get("https://dummyjson.com/products"),
          ]);
        })
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  mergeMapExample() {
    // order less - all output
    this.count = 0;
    let obs = this.clicks$
      .pipe(
        mergeMap(() => {
          this.count += 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  concatMapExample() {
    this.count = 0;
    let obs = this.clicks$
      .pipe(
        concatMap(() => {
          this.count = this.count + 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => console.log(val));
  }

  exhaustMapExample() {
    this.count = 0;
    let obs = this.clicks$
      .pipe(
        exhaustMap(() => {
          this.count += 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => {
        console.log(val);
      });
  }
  //#endregion

  //#region take, takeUntil, takeWhile, takeLast
  takeExample() {
    let obs = this.clicks$
      .pipe(
        exhaustMap(() => {
          return from(this.arr).pipe(take(2));
        })
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  takeUntilExample() {
    interval(1000).pipe(takeUntil(this.notifier)).subscribe(console.log);

    this.clicks$.subscribe(() => {
      this.notifier.next('notifier');
      this.notifier.complete();
    });
  }

  takeWhileExample() {
    // take while condition is true
    interval(1000)
      .pipe(takeWhile((val) => val < 3, true))
      .subscribe(console.log);
  }

  takeLastExample() {
    this.delayedObs(1).pipe(takeLast(2)).subscribe(console.log);
  }
  //#endregion

  //#region first, last, single
  firstExample() {
    from(this.arr)
      .pipe(first((val) => val == 2))
      .subscribe({ next: console.log, error: console.log });
  }

  lastExample() {
    this.delayedObs(1)
      .pipe(last((val) => val == '1 C', 'default val when no match'))
      .subscribe({ next: console.log, error: console.log });
  }

  singleExample() {
    // if match more than 2 values then error if no match then undefined if no emit then error
    this.delayedObs(1)
      .pipe(single((val) => val == '1 C'))
      .subscribe({ next: console.log, error: console.log });
  }
  //#endregion

  //#region Skip, SkipWhile, SkipUntil & SkipLast
  skipExample() {
    from(this.arr).pipe(skip(2)).subscribe(console.log);
  }

  skipWhileExample() {
    from(this.arr)
      .pipe(skipWhile((val) => val < 4))
      .subscribe(console.log);
  }

  skipUntilExample() {
    interval(1000).pipe(skipUntil(this.notifier)).subscribe(console.log);

    this.clicks$.subscribe(() => {
      this.notifier.next(1);
      // this.notifier.complete();
    });
  }

  skipLastExample() {
    from(this.arr)
      .pipe(
        tap((val) => console.log(`tap - ${val}`)),
        skipLast(2)
      )
      .subscribe(console.log);
  }
  //#endregion

  //#region Scan & Reduce operators

  scanExample() {
    from(this.arr)
      .pipe(scan((acc, val, idx) => acc + val, 10))
      .subscribe(console.log);
  }

  reduceExample() {
    from(this.arr)
      .pipe(reduce((acc, val, idx) => acc + val, 10))
      .subscribe(console.log);
  }

  //#endregion

  //#region DebounceTime & Debounce
  debounceTimeExample() {
    this.clicks$.pipe(debounceTime(1000)).subscribe(() => {
      console.log('btn clicked after debounce');
    });
  }

  debounceExample() {
    let delay = 500;
    this.clicks$
      .pipe(
        debounce(() => {
          delay += 100;
          console.log(delay);

          return interval(delay);
        })
      )
      .subscribe(() => {
        console.log('btn clicked after debounce');
      });
  }

  //#endregion

  //#region Delay & DelayWhen
  delayExample() {
    from(this.arr)
      .pipe(
        tap((data) => console.log('before- ' + data)),
        concatMap((item) => of(item).pipe(delay(2000))) // delay each item
        // delay(5000) //  delay all items
      )
      .subscribe(console.log);
  }

  delayWhenExample() {
    from(this.arr)
      .pipe(
        tap((data) => console.log('before- ' + data)),
        delayWhen(() => timer(5000))
      )
      .subscribe(console.log);
  }

  //#endregion

  //#region ThrowError & catchError
  throwErrorExample() {
    from(this.arr)
      .pipe(
        map((val) => {
          if (val == 2) throw new Error('Number is 2');

          return val;
        })
      )
      .subscribe({
        next: console.log,
        error: console.error,
      });
  }

  catchExample() {
    let count = 0;
    from(this.arr)
      .pipe(
        map((val) => {
          if (val == 2) throw new Error('Number is 2');

          return val;
        }),
        catchError((err, src) => {
          count += 1;
          console.log(err);
          if (count == 3) {
            throw new Error(err);
          } else {
            return src;
          }
        })
      )
      .subscribe({
        next: console.log,
        error: console.error,
      });
  }
  //#endregion

  //#region ReTry, ReTryWhen
  retryExample() {
    from(this.arr)
      .pipe(
        map((val) => {
          if (val == 2) {
            throw new Error('number is 2');
          }

          return val;
        }),
        retry(2) // if error then it try again for 2 times
      )
      .subscribe({ next: console.log, error: console.error });
  }

  //#endregion
}
