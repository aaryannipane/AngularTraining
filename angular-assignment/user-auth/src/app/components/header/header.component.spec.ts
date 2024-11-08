import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    let authServiceSpy = jasmine.createSpyObj('AuthService', [
      'authObs$',
      'SetUser',
    ]);
    authServiceSpy.authObs$ = of({ isAuthenticated: true });
    let routerSpy = jasmine.createSpyObj(Router, ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create and user is authenticated', () => {
    expect(component).toBeTruthy();
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should logout user', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'clear');
    const logoutButton = debugElement.query(By.css('.navbar-btn'));

    logoutButton.nativeElement.click();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
    expect(authService.SetUser).toHaveBeenCalledOnceWith(null, false);
    expect(router.navigate).toHaveBeenCalledOnceWith(['login']);
  });
});
