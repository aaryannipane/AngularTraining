import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { UserComponent } from './user.component';
import { DebugElement } from '@angular/core';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    // get component with view and ts file
    fixture = TestBed.createComponent(UserComponent);

    // ts object
    component = fixture.componentInstance;

    // view element
    el = fixture.debugElement;

    // initial change detection
    fixture.detectChanges();
  });

  it('should show username after button click - (done)', (done) => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    // after 1 sec value is set

    setTimeout(() => {
      expect(component.username).toBe('Ramesh Verma');

      // this spec waits till done is call
      done();
    }, 1000);
  });

  it('should show username after button click - (fakeAsync)', fakeAsync(() => {
    // in async we cannot call real actual api

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    // after 1 sec value is set

    // 1s time is added
    tick(1000); // samay ko aage badaya

    expect(component.username).toBe('Ramesh Verma');
  }));

  it('should show username after button click - (flush)', fakeAsync(() => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    // after 1 sec value is set

    // waits till microTask and macroTask queue becomes empty
    flush();

    // for flushing only microTask Queue
    // flushMicrotasks(); // not works for setTimeout

    expect(component.username).toBe('Ramesh Verma');
  }));

  it('should show username after button click - (waitForAsync)', waitForAsync(() => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    // when actual api request is made we can use wait for Async

    fixture.whenStable().then(() => {
      expect(component.username).toBe('Ramesh Verma');
    });
  }));
});
