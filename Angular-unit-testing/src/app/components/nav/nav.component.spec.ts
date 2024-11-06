import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { provideRouter, Route, Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let component: NavComponent;
  let router: Router;
  let linkDes: any;
  let routerLinks: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

    routerLinks = linkDes.map((de: any) => de.injector.get(RouterLink));
    fixture.detectChanges();
  });

  it('should have two routes', () => {
    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].href).toBe('/');
  });

  // prefix x is to ignore case
  //   xit('should have default route of home', () => {
  it('should have default route of home', () => {
    expect(router.url).toBe('/');
  });

  // f prefix focus it only this is run
  //   fit('should navigate to about when click on about link', fakeAsync(() => {
  it('should navigate to about when click on about link', fakeAsync(() => {
    const aboutLinkDebug = linkDes[1];
    aboutLinkDebug.triggerEventHandler('click', { button: 0 });
    flush();
    expect(router.url).toBe('/about');
  }));
});
