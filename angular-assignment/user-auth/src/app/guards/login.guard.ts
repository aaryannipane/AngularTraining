import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate() {
    let token = localStorage.getItem('token');
    if (token) {
      if (!this.authService.IsAuthenticated) {
        let data = await lastValueFrom(this.userService.verifyUser());
        console.log(data);

        this.authService.SetUser(data, true);
      }
      this.router.navigate(['']);
    }

    return true;
  }
}
