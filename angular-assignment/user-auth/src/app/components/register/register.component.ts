import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../../validators/matchPassword.validator';
import { roleRequired } from '../../validators/roleRequired.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  currentDate = new Date().toISOString().split('T')[0];
  rolesDB: string[] = ['admin', 'seller', 'buyer'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%*.~])(?=.*[0-9])[a-zA-Z0-9!@#$%*.~]{4,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      }),
      dob: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      image: ['', [Validators.required]],
      roles: this.fb.array([], [roleRequired]),
      // roles: this.fb.group({
      //   admin: false,
      //   seller: false,
      //   buyer: false,
      // }),
    });

    this.registerForm.get('passwords')?.setValidators([matchPassword]);
    // this.registerForm.get('roles')?.setValidators([roleRequired]);

    let formRoles = this.registerForm.get('roles') as FormArray;

    this.rolesDB.forEach((elm) => {
      formRoles.push(this.fb.control(false));
    });
  }

  ngAfterViewInit(): void {}

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get passwords() {
    return this.registerForm.get('passwords');
  }
  get password() {
    return this.registerForm.get('passwords')?.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('passwords')?.get('confirmPassword');
  }
  get dob() {
    return this.registerForm.get('dob');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get state() {
    return this.registerForm.get('state');
  }
  get city() {
    return this.registerForm.get('city');
  }
  get image() {
    return this.registerForm.get('image');
  }
  get roles() {
    return this.registerForm.get('roles');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);

      if (field === 'passwords') {
        console.log('get passwords ');
        const password = formGroup.get(field)?.get('password');
        const confirmPassword = formGroup.get(field)?.get('confirmPassword');

        password?.markAsTouched({ onlySelf: true });
        password?.updateValueAndValidity();

        confirmPassword?.markAsTouched({ onlySelf: true });
        confirmPassword?.updateValueAndValidity();
      }

      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.updateValueAndValidity();
    });
  }

  onSubmit() {
    console.log('asd');

    this.validateAllFormFields(this.registerForm);
    console.log(this.registerForm.valid);
  }
}
