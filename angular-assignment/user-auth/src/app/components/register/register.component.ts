import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../../validators/matchPassword.validator';
import { roleRequired } from '../../validators/roleRequired.validator';
import { dobValidator } from '../../validators/dob.validator';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  currentDate = new Date().toISOString().split('T')[0];
  rolesDB: any = [];
  states: any = [];
  citys: any = [];
  profileImageFile: any;
  isSubmit: boolean = false;
  isFileSelected: boolean = false;

  @ViewChild('profileImg') imgElm!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private renderer: Renderer2,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getStates().subscribe({
      next: (data) => {
        this.states = data as Array<any>;
      },
      error: (err) => {
        console.log(err);
        this.alertService.setAlert('danger', 'Failed to load state');
      },
    });

    // -------
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
          ),
        ],
      ],
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
      dob: [null, [Validators.required, dobValidator]],
      gender: ['', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      image: ['', [Validators.required]],
      roles: this.fb.array([], [roleRequired]),
    });

    this.registerForm.get('passwords')?.setValidators([matchPassword]);
    // this.registerForm.get('roles')?.setValidators([roleRequired]);

    this.registerForm.get('city')?.disable();

    this.userService.getRoles().subscribe({
      next: (data) => {
        let formRoles = this.registerForm.get('roles') as FormArray;
        this.rolesDB = data as Array<any>;
        this.rolesDB.forEach((elm: any) => {
          formRoles.push(this.fb.control(false));
        });
      },
      error: (err) => {
        console.log(err);
        this.alertService.setAlert('danger', 'Failed to load roles');
      },
    });
  }

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
    return this.registerForm.get('roles') as FormArray;
  }

  validateAllFormFields(formGroup: FormGroup) {
    this.isFileSelected = true;
    console.log('register component');

    console.log(formGroup.controls);

    console.log(Object.keys(formGroup.controls));
    // Object.keys(formGroup.controls)?.forEach((field) => {
    for (let field in formGroup.controls) {
      if (field === 'passwords') {
        const password = formGroup.get(field)?.get('password');
        const confirmPassword = formGroup.get(field)?.get('confirmPassword');

        password?.markAsTouched({ onlySelf: true });
        password?.updateValueAndValidity();

        confirmPassword?.markAsTouched({ onlySelf: true });
        confirmPassword?.updateValueAndValidity();
      }

      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      console.log(field);

      console.log(control);

      control?.updateValueAndValidity();
    }
  }

  onStateChange(event: Event) {
    if (!isNaN(this.state?.value)) {
      this.userService.getCitys(this.state?.value).subscribe({
        next: (data) => {
          this.citys = data as Array<any>;
          this.city?.enable();
          this.city?.reset();
        },
        error: (err) => {
          console.log(err);
          this.city?.disable();
          this.alertService.setAlert('danger', 'Failed to load state');
        },
      });
    }
  }

  onFileChange(event: Event) {
    if (this.image?.valid) {
      const element = event.currentTarget as HTMLInputElement;
      this.profileImageFile = element?.files?.[0];

      const reader = new FileReader();
      reader.onload = () => {
        var dataUrl = reader.result;
        this.renderer.setAttribute(
          this.imgElm.nativeElement,
          'src',
          dataUrl?.toString() ?? ''
        );
      };

      reader.readAsDataURL(this.profileImageFile);
    }
  }

  removeImg(event: Event) {
    this.isFileSelected = true;
    this.image?.patchValue('');
  }

  onSubmit() {
    this.validateAllFormFields(this.registerForm);
    console.log('inside on submit ');
    console.log(this.registerForm.errors);

    console.log('is valid form> ' + this.registerForm.get('image')?.valid);

    if (this.registerForm.valid) {
      console.log('form is valid');

      // create form data and fill value
      let fd = new FormData();
      Object.keys(this.registerForm.controls).forEach((key) => {
        if (key === 'passwords') {
          fd.append('password', this.password?.value);
        } else if (key === 'image') {
          fd.append(key, this.profileImageFile);
        } else if (key === 'roles') {
          let userSelectedRoles = this.registerForm.get('roles') as FormArray;
          this.rolesDB.forEach((el: any, idx: number) => {
            this.rolesDB[idx].IsSelected = userSelectedRoles.at(idx).value;
          });
          fd.append(key, JSON.stringify(this.rolesDB));
        } else {
          fd.append(key, this.registerForm.get(key)?.value);
        }
      });

      // fd.append(
      //   'rolesCustom',
      //   JSON.stringify({ admin: true, seller: false, buyer: false })
      // );

      this.isSubmit = true;
      this.userService.registerUser(fd).subscribe({
        next: () => {
          this.alertService.setAlert('success', 'user registered success');
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log(err);
          this.isSubmit = false;
          this.alertService.setAlert('warning', err.error.Message);
        },
      });
    }
  }

  onReset() {
    this.registerForm.reset();
    this.isFileSelected = false;
    this.city?.disable();
  }

  toggleEye(event: Event) {
    let el = event.target as HTMLSpanElement;
    if (el.classList.contains('glyphicon-eye-open')) {
      el.classList.remove('glyphicon-eye-open');
      el.classList.add('glyphicon-eye-close');
      (el.previousSibling! as HTMLInputElement).type = 'text';
    } else {
      el.classList.add('glyphicon-eye-open');
      el.classList.remove('glyphicon-eye-close');
      (el.previousSibling! as HTMLInputElement).type = 'password';
    }
  }
}
