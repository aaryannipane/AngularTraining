import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.isSubmit = true;
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (data) => {
          this.alert.setAlert('success', 'login success');
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.alert.setAlert('danger', err.error.Message);
          this.isSubmit = false;
        },
      });
    }
  }
}
