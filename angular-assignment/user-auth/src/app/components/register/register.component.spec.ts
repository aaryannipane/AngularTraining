import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import {
  DebugElement,
  Renderer2,
  ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR,
} from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from '../../app-routing.module';
import { By } from '@angular/platform-browser';
import { dobValidator } from '../../validators/dob.validator';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;
  let userService: jasmine.SpyObj<UserService>;
  let formBuilder: jasmine.SpyObj<FormBuilder>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: Router;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getStates',
      'getCitys',
      'getRoles',
      'registerUser',
    ]);

    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['setAlert']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, AppRoutingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        Renderer2,
        {
          provide: AlertService,
          useValue: alertServiceSpy,
        },
        { provide: Router, useValue: routerSpy },
        // RouterTestingModule.withRoutes(routes)
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    formBuilder = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    userService.getStates.and.returnValue(of([{ Id: 1, Name: 'Maharashtra' }]));
    userService.getRoles.and.returnValue(of([{ Id: 1, Name: 'admin' }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit with get state success', () => {
    // fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();

    expect(userService.getStates).toHaveBeenCalled();

    expect(userService.getRoles).toHaveBeenCalled();
  });

  it('should test ngOnInit with get state fail and get role fail', () => {
    // fixture.detectChanges();

    userService.getStates.and.returnValue(
      throwError(() => new Error('failed to load state'))
    );

    userService.getRoles.and.returnValue(
      throwError(() => new Error('failed to load state'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(userService.getStates).toHaveBeenCalled();

    expect(userService.getRoles).toHaveBeenCalled();
  });

  it('should submit valid filled form', () => {
    spyOn(component, 'validateAllFormFields');

    userService.registerUser.and.returnValue(of({}));

    let registerForm = component.registerForm;

    registerForm.get('firstName')?.setValue('Aryan');
    registerForm.get('lastName')?.setValue('Nipane');
    registerForm.get('username')?.setValue('aryannipane');
    registerForm.get('email')?.setValue('aryan@gmail.com');
    registerForm.get('passwords')?.get('password')?.setValue('aA2@');
    registerForm.get('passwords')?.get('confirmPassword')?.setValue('aA2@');
    registerForm.get('dob')?.setValue(Date.now());
    registerForm.get('gender')?.setValue('Male');
    registerForm.get('state')?.setValue(1);
    registerForm.get('city')?.setValue(1);
    (registerForm.get('roles') as FormArray).controls.at(0)?.setValue(true);

    registerForm.get('image')?.setErrors(null);
    component.onSubmit();

    // fixture.detectChanges();

    expect(component.validateAllFormFields).toHaveBeenCalledTimes(1);
    expect(component.registerForm.valid).toBeTrue();
    expect(component.isSubmit).toBeTrue();
    expect(userService.registerUser).toHaveBeenCalledTimes(1);
    expect(alertService.setAlert).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledOnceWith(['login']);
  });

  it('should give invalid register form after submit', () => {
    // spyOn(component, 'validateAllFormFields');
    component.onSubmit();

    expect(component.registerForm.valid).toBeFalse();
  });

  it('should give error from register user on submit', () => {
    spyOn(component, 'validateAllFormFields');
    userService.registerUser.and.returnValue(
      throwError(() => ({ error: { Message: 'username is already taken' } }))
    );

    let registerForm = component.registerForm;

    registerForm.get('firstName')?.setValue('Aryan');
    registerForm.get('lastName')?.setValue('Nipane');
    registerForm.get('username')?.setValue('aryannipane');
    registerForm.get('email')?.setValue('aryan@gmail.com');
    registerForm.get('passwords')?.get('password')?.setValue('aA2@');
    registerForm.get('passwords')?.get('confirmPassword')?.setValue('aA2@');
    registerForm.get('dob')?.setValue(Date.now());
    registerForm.get('gender')?.setValue('Male');
    registerForm.get('state')?.setValue(1);
    registerForm.get('city')?.setValue(1);
    (registerForm.get('roles') as FormArray).controls.at(0)?.setValue(true);

    registerForm.get('image')?.setErrors(null);
    component.onSubmit();

    expect(component.registerForm.valid).toBeTrue();

    expect(userService.registerUser).toHaveBeenCalledTimes(1);
    expect(component.isSubmit).toBeFalse();
    expect(alertService.setAlert).toHaveBeenCalledTimes(1);
  });

  it('should set citys on change of state', () => {
    // spyOn(component, 'onStateChange')
    const citys = [
      { Id: 1, Name: 'Mumbai' },
      { Id: 2, Name: 'Ulwe' },
    ];
    userService.getCitys.and.returnValue(of(citys));

    const selectStateElement = debugElement.queryAll(By.css('select'))[0];

    component.registerForm.get('state')?.setValue('1');

    // fixture.detectChanges();
    selectStateElement.nativeElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(userService.getCitys).toHaveBeenCalledTimes(1);
    expect(component.citys).toEqual(citys);

    expect(component.registerForm.get('state')?.value).toBe('1');
  });

  it('should set city disable on change state with getCitys error', () => {
    // spyOn(component, 'onStateChange')
    const citys = [
      { Id: 1, Name: 'Mumbai' },
      { Id: 2, Name: 'Ulwe' },
    ];
    userService.getCitys.and.returnValue(
      throwError(() => new Error('get city failed'))
    );

    const selectStateElement = debugElement.queryAll(By.css('select'))[0];

    component.registerForm.get('state')?.setValue('1');

    // fixture.detectChanges();
    selectStateElement.nativeElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(userService.getCitys).toHaveBeenCalledTimes(1);
    expect(component.city?.disabled).toBeTrue();

    expect(component.registerForm.get('state')?.value).toBe('1');
  });

  it('should remove image', () => {
    // spyOn(component, 'removeImg');

    component.registerForm.get('image')?.setErrors(null);
    fixture.detectChanges();
    let removeButton = debugElement.queryAll(
      By.css('button[type="button"]')
    )[0];

    removeButton.nativeElement.click();
    expect(component.isFileSelected).toBeTrue();
    expect(component.registerForm.get('image')?.value).toBe('');
  });

  it('should reset the form', () => {
    component.onReset();

    expect(component.registerForm.valid).toBeFalse();
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

  it('should get invalid date', () => {
    let futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);
    component.registerForm
      .get('dob')
      ?.setValue(futureDate.toISOString().split('T')[0]);

    component.registerForm.get('dob')?.updateValueAndValidity();
    console.error('FOCUS');

    console.error(
      (component.registerForm.get('dob') as AbstractControl)?.value
    );

    expect(component.registerForm.get('dob')?.valid).toBeFalse();

    // let error = dobValidator(
    //   component.registerForm.get('dob') as AbstractControl
    // );
    // expect(error).toEqual({ noMatch: true });
  });
});
