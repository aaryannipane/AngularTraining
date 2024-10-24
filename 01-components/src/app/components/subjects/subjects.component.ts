import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent implements OnInit {
  subject$ = new Subject<number>();
  behaviorSubject$ = new BehaviorSubject(100);
  replaySubject$ = new ReplaySubject();
  asyncSubject$ = new AsyncSubject();
  obs$ = new Observable((observer) => {
    observer.next(Math.random());
    observer.complete();
  });

  ngOnInit(): void {
    // this.subject$.subscribe({
    //   next: (data) => console.log(`subject's sub1 - ${data}`),
    // });
    // this.subject$.subscribe({
    //   next: (data) => console.log(`subject's sub2 - ${data}`),
    // });
    // this.subject$.next(Math.random());
    // this.subject$.complete();
    // this.obs$.subscribe({
    //   next: (data) => console.log(`observer sub1 - ${data}`),
    // });
    // this.obs$.subscribe({
    //   next: (data) => console.log(`observer sub2 - ${data}`),
    // });
    // this.behaviorSubjectExample();
    // this.replaySubjectExample();
    this.asyncSubjectExample();
  }

  behaviorSubjectExample() {
    this.behaviorSubject$.subscribe({
      next: (data) => console.log(`behavior sub1 - ${data}`),
    });

    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);

    this.behaviorSubject$.subscribe({
      next: (data) => console.log(`behavior sub2 - ${data}`),
    });

    this.behaviorSubject$.next(3);
    this.behaviorSubject$.next(4);
  }

  replaySubjectExample() {
    this.replaySubject$.next('1');
    this.replaySubject$.next('2');

    this.replaySubject$.subscribe(
      (val) => console.log('Sub1 ' + val),
      (err) => console.error('Sub1 ' + err),
      () => console.log('Sub1 Complete')
    );

    this.replaySubject$.next('3');
    this.replaySubject$.next('4');

    this.replaySubject$.subscribe((val) => {
      console.log('sub2 ' + val);
    });

    this.replaySubject$.next('5');
    this.replaySubject$.complete(); // end of Subject

    this.replaySubject$.error('err');
    this.replaySubject$.next('6');

    this.replaySubject$.subscribe(
      (val) => {
        console.log('sub3 ' + val);
      },
      (err) => console.error('sub3 ' + err),
      () => console.log('Complete')
    );
  }

  asyncSubjectExample() {
    this.asyncSubject$.next('1');
    this.asyncSubject$.next('2');

    this.asyncSubject$.subscribe(
      (val) => console.log('Sub1 ' + val),
      (err) => console.error('Sub1 ' + err),
      () => console.log('Sub1 Complete')
    );

    this.asyncSubject$.next('3');
    this.asyncSubject$.next('4');

    this.asyncSubject$.subscribe((val) => {
      console.log('sub2 ' + val);
    });

    this.asyncSubject$.next('5');
    this.asyncSubject$.complete();

    this.asyncSubject$.error('err');

    this.asyncSubject$.next('6');

    this.asyncSubject$.subscribe(
      (val) => console.log('Sub3 ' + val),
      (err) => console.error('sub3 ' + err),
      () => console.log('Sub3 Complete')
    );
  }
}
