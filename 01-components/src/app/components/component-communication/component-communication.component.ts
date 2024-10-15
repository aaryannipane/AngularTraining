import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-component-communication',
  templateUrl: './component-communication.component.html',
  styleUrl: './component-communication.component.css',
  // inputs: ['message'], another way to take input
})
export class ComponentCommunicationComponent implements OnChanges {
  private _message?: string | undefined;

  // parent to child communication
  // using setter to detect change in property
  @Input('myMessage')
  set message(message: string | undefined) {
    this._message = message;
    console.log(message);
  }
  get message(): string | undefined {
    return this._message;
  }
  // detecting changes in input property using onChange lifecycle
  ngOnChanges(changes: SimpleChanges): void {
    for (let property in changes) {
      if (property === 'message') {
        console.log('previous value ' + changes[property].previousValue);
        console.log('current value ' + changes[property].currentValue);
        console.log('first change ' + changes[property].firstChange);
      }
    }
  }

  // child to parent communication
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();
  handleChange(e: any) {
    this.dataChanged.emit(this._message);
  }
}
