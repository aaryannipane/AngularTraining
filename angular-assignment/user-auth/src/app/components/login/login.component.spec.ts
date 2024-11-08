import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;
  let httpMock: HttpTestingController;
  let debugElement: DebugElement;

  beforeEach(async () => {
    let userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser']);
    let alertServiceSpy = jasmine.createSpyObj('AlertService', ['setAlert']);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['SetIsAuth']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, AppRoutingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set login form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should submit invlid form', () => {
    spyOn(component, 'validateAllFormFields');
    component.onSubmit();
    expect(component.validateAllFormFields).toHaveBeenCalledTimes(1);
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should submit valid form', () => {
    spyOn(component, 'validateAllFormFields');
    userService.loginUser.and.returnValue(of({ token: 'asdsadasd' }));
    component.loginForm.get('usernameEmail')?.setValue('aryannipane');
    component.loginForm.get('password')?.setValue('aA2@');
    component.onSubmit();
    expect(component.loginForm.valid).toBeTrue();
    expect(component.validateAllFormFields).toHaveBeenCalledOnceWith(
      component.loginForm
    );
    expect(userService.loginUser).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('should submit valid form and get error from server ', () => {
    let url = 'https://localhost:44352/api/v1';
    spyOn(component, 'validateAllFormFields');

    userService.loginUser.and.returnValue(
      throwError(() => ({
        error: {
          Message: 'Invalid username or password',
        },
      }))
    );
    component.loginForm.get('usernameEmail')?.setValue('aryannipane');
    component.loginForm.get('password')?.setValue('aA2@');
    component.onSubmit();

    expect(component.isSubmit).toBeFalse();
    expect(alertService.setAlert).toHaveBeenCalledTimes(1);
  });

  it('should toggle password eye', () => {
    const passwordEye = debugElement.query(By.css('.pass-eye '));

    expect(
      passwordEye.nativeElement.classList.contains('glyphicon-eye-open')
    ).toBeTrue();

    passwordEye.nativeElement.click();
    expect(
      passwordEye.nativeElement.classList.contains('glyphicon-eye-close')
    ).toBeTrue();

    passwordEye.nativeElement.click();
    expect(
      passwordEye.nativeElement.classList.contains('glyphicon-eye-open')
    ).toBeTrue();
  });
});
