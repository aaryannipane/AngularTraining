import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';

@Directive({
  selector: '[ttClass]',
})
export class ttClassDirective implements OnInit {
  @Input() ttClass?: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add(this.ttClass);
  }
}
