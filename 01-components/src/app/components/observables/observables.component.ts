import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, from, fromEvent, Observable, of, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent implements OnInit, AfterViewInit {
  @ViewChild('btn', { static: true }) btn!: ElementRef;

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

    // switchMap - (realworld example fetching data) https://www.tektutorialshub.com/angular/using-switchmap-in-angular/#:~:text=We%20can%20easily%20solve%20the%20above%20issue
    obs = obs.pipe(
      switchMap((val) => {
        console.log(`source value : ${val}`);

        console.log('starting new observable');

        return of('a', 'b', 'c', 'd');
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
    fromEvent(this.btn.nativeElement, 'click').subscribe((res) => {
      console.log(res);
      console.log('btn clicked');
    });
  }
}
