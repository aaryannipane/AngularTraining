import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alert: AlertService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      usernameEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get usernameEmail() {
    return this.loginForm.get('usernameEmail');
  }
  get password() {
    return this.loginForm.get('password');
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      formGroup.get(field)?.markAsTouched();
      formGroup.get(field)?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.validateAllFormFields(this.loginForm);
    if (this.loginForm.valid) {
      console.log('login is valid');

      this.isSubmit = true;
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (data: { [index: string]: any }) => {
          this.alert.setAlert('success', 'login success');

          localStorage.setItem('token', data['token']);
          // this.authService.SetUser(data['user'], true);
          this.authService.SetIsAuth(true);

          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);

          this.alert.setAlert('danger', err.error.Message);
          this.isSubmit = false;
        },
      });
    }
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
