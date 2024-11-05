import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GradeDirective } from './grade.directive';
import { DebugElement } from '@angular/core';

describe('GradeDirective', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });

    TestBed.createComponent(AppComponent);
  }));

  it('should create an instance', () => {
    let mockElRef = {
      nativeElement: document.createElement('div'),
    };

    const directive = new GradeDirective(mockElRef);
    expect(directive).toBeTruthy();
  });
});
