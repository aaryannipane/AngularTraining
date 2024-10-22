import { Component, Input, OnInit, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    // Accessing the state value
    // The state can be accessed by using the getCurrentNavigation method of the router (works only in the constructor)
    console.log('using router - ');
    console.log(this._router.getCurrentNavigation()?.extras.state);

    // Or use the history.state in the ngOnInit.
    // console.log(history.state);
  }
  @Input({ required: true, transform: appendHello, alias: 'mera-title' })
  title: string = 'Header';
  nameChange = output<string>();

  isDisabled = true;
  username = 'admin';
  color = 'red';

  onSave(event: any) {
    this.title = 'data saved';
    alert('save data');
    // when using $event
    // console.log((event.target as HTMLButtonElement).disabled);
    // when using Template reference variable
    console.log(event.disabled);
  }

  setNewName() {
    this.nameChange.emit(this.username);
  }

  ngOnInit(): void {
    this._ActivatedRoute.data.subscribe((data) => {
      console.log(data);
    });

    console.log("using history - ");
    
    console.log(history.state);
  }
}

function appendHello(value: string | undefined) {
  return 'Hello ' + value;
}
