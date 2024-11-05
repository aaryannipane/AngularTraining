import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'unit-testing';
  btnText = 'Subscribe';
  isSubscribe = false;
  marks = [97,68,83,29,75]

  subscribe() {
    setTimeout(() => {
      this.isSubscribe = true;
      this.btnText = 'Subscribed';
    }, 3000);
  }
}
