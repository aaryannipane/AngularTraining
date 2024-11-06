import {
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { count, delay, of } from 'rxjs';
import { GradePipe } from './grade.pipe';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent, GradePipe],
    }).compileComponents();
  });

  // x is prefixed here to not to execute this specific test spec
  xit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'unit-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unit-testing');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('unit-testing');
  });

  xit('should render a button with text subscribe', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const el = fixture.debugElement;
    const component = fixture.componentInstance;

    const btnElements = el.queryAll(By.css('.subscribe'));
    component.isSubscribe = false;
    component.btnText = 'Subscribe';
    fixture.detectChanges();
    expect(btnElements[0].nativeElement.textContent).toBe('Subscribe');
    expect(btnElements[0].nativeElement.disabled).toBeFalse();
  });

  // it('should render a button with text subscribed and button should be disabled after click', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const el = fixture.debugElement;
  //   const component = fixture.componentInstance;

  //   component.isSubscribe = false;
  //   fixture.detectChanges();
  //   const btnElements = el.queryAll(By.css('.subscribe'));
  //   component.btnText = 'Subscribe';
  //   btnElements[0].nativeElement.click();
  //   fixture.detectChanges();
  //   expect(btnElements[0].nativeElement.textContent).toBe('Subscribed');
  //   expect(btnElements[0].nativeElement.disabled).toBeTrue();
  // });

  // TEST ASYNC OPERATIONS REQUEST AND ALL
  xit('should render a button with text subscribed and button should be disabled after click and async task is finished', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const el = fixture.debugElement;
    const component = fixture.componentInstance;

    component.isSubscribe = false;
    fixture.detectChanges();
    let btnElements = el.queryAll(By.css('.subscribe'));
    component.btnText = 'Subscribe';
    btnElements[0].nativeElement.click();

    // wait for async call
    setTimeout(() => {
      fixture.detectChanges();
      btnElements = el.queryAll(By.css('.subscribe'));
    }, 3000);

    // to wait till async request is completed then only do testing
    flush();

    expect(btnElements[0].nativeElement.textContent).toBe('Subscribed');
    expect(btnElements[0].nativeElement.disabled).toBeTrue();
  }));

  // TEST PROMISE | OBSERVABLE
  it('should test promise', fakeAsync(() => {
    let counter = 0;

    setTimeout(() => {
      counter += 2;
    }, 2000);

    setTimeout(() => {
      counter += 3;
    }, 3000);

    Promise.resolve().then(() => {
      counter++;
    });

    // it waits for all async task to be completed
    // flush();

    // executes microtask first like promise
    flushMicrotasks();
    expect(counter).toBe(1);

    // after 2s
    tick(2000);
    expect(counter).toBe(3);

    // after 3s
    tick(3000);
    expect(counter).toBe(6);
  }));

  it('should test observable', fakeAsync(() => {
    let isSubscribe = false;
    let obs$ = of(isSubscribe).pipe(delay(1000));

    obs$.subscribe({
      next: (data) => {
        isSubscribe = true;
      },
    });

    // waits 1s for async task then perform test
    tick(1000);

    expect(isSubscribe).toBeTrue();
  }));
});
