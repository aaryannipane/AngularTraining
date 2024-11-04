import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// x is prefixed for not to execute test suite for homeComponent
// xdescribe('HomeComponent', () => {
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct content', () => {
    let pElements = el.queryAll(By.css('p'));
    expect(pElements[0].nativeElement.textContent).toBe('home works!');

    let btnElements = el.queryAll(By.css('.btn'));
    expect(btnElements[0].nativeElement.disabled).toBeTrue();

    component.title = 'Hello this is home component';
    fixture.detectChanges();
    let textElements = el.queryAll(By.css('.title'));
    expect(textElements[0].nativeElement.textContent).toBe(
      'Hello this is home component'
    );
  });
});
