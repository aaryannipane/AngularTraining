import {
  Component,
  VERSION,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { RandomService } from './random.service';
import {
  NavigationEnd,
  Event as NavigationEvent,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  isLoading: boolean = false;
  constructor(private randomService: RandomService, private _router: Router) {
    console.log(`App Component - ${this.randomService.randomValue}`);

    this._router.events.subscribe((e: NavigationEvent) => {
      if (e instanceof NavigationStart) {
        console.log('--navigation start--');
      }
      if (e instanceof RouteConfigLoadStart) {
        console.log('--RouteConfigLoadStart--');
      }
      if (e instanceof RouteConfigLoadEnd) {
        console.log('--RouteConfigLoadEnd--');
      }

      if (e instanceof NavigationEnd) {
        console.log('--navigation end--');
      }

      if (e instanceof ResolveStart) {
        console.log('--ResolveStart--');
        this.isLoading = true;
      }

      if (e instanceof ResolveEnd) {
        console.log('--ResolveEnd--');
        this.isLoading = false;
      }
    });
  }

  title = `Angular ${VERSION.major}`;
  parentMessage?: string = 'message from parent';

  // we can pass component, element, element property, component services, templateref ... references
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
