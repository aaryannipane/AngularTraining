import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycle-hook',
  templateUrl: './life-cycle-hook.component.html',
  styleUrl: './life-cycle-hook.component.css',
})
export class LifeCycleHookComponent implements OnInit, OnDestroy, OnChanges, DoCheck{

  @Input() message: any;

  data: any = "this is my data"


  // 1
  constructor() {
    console.log('childComponent: constructor');
  }

  // 3
  ngOnInit(): void {
    // runs after ngOnChange hook and runs one time only.
    // This hook is fired before any of the child directive properties are initialized.
    console.log('childComponent: ngOnInit');
  }

  // last
  ngOnDestroy(): void {
    console.log('childComponent: ngOnDestory');
  }

  // 2
  ngOnChanges(changes: SimpleChanges): void {

    // runs when input value is changed. not change when reference value is not change in case of non primitive types
    console.log("childComponent: ngOnChanges called");
    for(let property in changes){
      if(property === 'message'){
        console.log("childComponent: ngOnChanges");
        
      }
    }
  }

  // 4
  ngDoCheck(): void {
    // run on every change property / input / bound events in parent and child
    // console.log("childComponent: ngDoCheck");
  }

  updateMessage(event:any){
    this.data = (event as HTMLInputElement).value;
  }
}
