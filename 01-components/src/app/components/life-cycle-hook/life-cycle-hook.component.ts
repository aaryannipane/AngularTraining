import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-cycle-hook',
  templateUrl: './life-cycle-hook.component.html',
  styleUrl: './life-cycle-hook.component.css',
})
export class LifeCycleHookComponent implements OnInit, OnDestroy {
  constructor() {
    console.log('childComponent: constructor');
  }

  ngOnInit(): void {
    // runs after ngOnChange hook and runs one time only.
    // This hook is fired before any of the child directive properties are initialized.
    console.log('childComponent: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('childComponent: ngOnDestory');
  }
}
