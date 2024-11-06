import { Component } from '@angular/core';
import {
  ComponentFixture,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'test-component',
  standalone: true,
  template: `<div appHighlight>testing</div>`,
  imports: [HighlightDirective],
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let divElement: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    divElement = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should have red bg color', () => {
    expect(divElement.style.backgroundColor).toBe('red');
  });

  it('should increase font size when mouseEnter', () => {
    divElement.dispatchEvent(new Event('mouseenter'));
    expect(divElement.style.fontSize).toBe('30px');
  });

  it('should reset font size when mouseLeave', () => {
    divElement.dispatchEvent(new Event('mouseenter'));
    divElement.dispatchEvent(new Event('mouseleave'));
    expect(divElement.style.fontSize).toBe('20px');
  });
});
