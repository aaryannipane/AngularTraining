import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-advance-component',
  templateUrl: './advance-component.component.html',
  styleUrl: './advance-component.component.css',
})
export class AdvanceComponentComponent
  implements AfterViewInit, OnDestroy, AfterContentInit
{
  firstName?: string;
  middleName?: string;
  lastName?: string;

  private clickListener: any;

  // el gets self component as reference
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // avoid using element ref's native element to manipulating dom instead use renderer2 for safe change
  @ViewChild('hello', { static: false }) divHello!: ElementRef;

  @ViewChildren(NgModel) modelRedList?: QueryList<NgModel>;

  // for projected content
  @ContentChild('para') para!: ElementRef;

  ngOnChanges() {
    console.log('  ChildComponent==>ngOnChanges');
  }

  ngOnInit() {
    console.log('  ChildComponent==>ngOnInit');
  }

  ngDoCheck() {
    // console.log('  ChildComponent==>ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log(this.para.nativeElement);
    console.log('  ChildComponent==>ngAfterContentInit');
  }

  ngAfterContentChecked() {
    // console.log('  ChildComponent==>ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('  ChildComponent==>AfterViewInit');

    this.modelRedList?.changes.subscribe((data) => console.log(data));

    // avoid this
    // this.divHello.nativeElement.innerHTML = "Hello Angular"

    // using renderer2
    // this.renderer.setProperty(
    //   this.divHello.nativeElement,
    //   'innerHTML',
    //   'Hello Angular'
    // );

    const text = this.renderer.createText(' -- Hello Angular'); // create text node
    this.renderer.appendChild(this.divHello.nativeElement, text); // append text node as a child

    this.renderer.setStyle(this.divHello.nativeElement, 'color', 'red');

    // remove style from element
    this.renderer.removeStyle(this.divHello.nativeElement, 'color');

    // create div element
    const div = this.renderer.createElement('div');
    // append using append child

    console.log(this.el);

    // listen to event using renderer2
    this.clickListener = this.renderer.listen(
      this.divHello.nativeElement,
      'click',
      () => {
        console.log('click elem');
      }
    );
  }

  ngAfterViewChecked() {
    // console.log('  ChildComponent==>AfterViewChecked');
  }

  show() {
    this.modelRedList?.forEach((element) => {
      console.log(element);
    });
  }

  ngOnDestroy(): void {
    this.clickListener.unsubscribe();
  }
}
