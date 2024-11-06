import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GradeDirective } from './grade.directive';
import { DebugElement } from '@angular/core';
import { GradePipe } from './grade.pipe';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, By } from '@angular/platform-browser';

describe('GradeDirective', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, GradePipe, GradeDirective],
      imports: [BrowserModule, AppRoutingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    let mockElRef = {
      nativeElement: document.createElement('div'),
    };

    const directive = new GradeDirective(mockElRef);
    expect(directive).toBeTruthy();
  });

  it('should change the text color on mouse over', () => {
    let divs = el.queryAll(By.css('div'));
    let div0 = divs[0];
    let div1 = divs[1];
    let div2 = divs[2];
    let div3 = divs[3];
    let div4 = divs[4];
    div0.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(div0.nativeElement.style.color).toBe('green');
  });
});
