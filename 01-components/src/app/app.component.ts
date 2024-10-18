import { Component, ViewChild } from '@angular/core';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { RandomService } from './random.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private randomService: RandomService) {
    console.log(`App Component - ${this.randomService.randomValue}`);
  }

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
