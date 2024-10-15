import { Component, ViewChild } from '@angular/core';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '01-components';
  parentMessage?: string | undefined = 'message from parent';
  @ViewChild(ComponentCommunicationComponent) child:
    | ComponentCommunicationComponent
    | any;

  displayChild = true;

  dataChangedHandler(message: string) {
    this.parentMessage = message;
    console.log('using view child in parent component' + this.child.message);
  }

  hide() {
    this.displayChild = !this.displayChild;
  }
}
