import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighLight]',
})
export class AppHighlight implements OnInit {
  @HostBinding('style.border') border?: string;

  ngOnInit(): void {
    this.border = '5px solid blue';
  }

  @HostListener('mouseover')
  onMouseOver() {
    console.log('mouse over');

    this.border = '5px solid red';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    console.log('mouse leave');
    this.border = '5px solid blue';
  }
}
