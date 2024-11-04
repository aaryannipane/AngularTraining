import {
  CanActivate,
  CanActivateChild,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  async canActivate(): Promise<boolean> {
    

    if (!this.authService.IsAuthenticated) {
      let token = localStorage.getItem('token');
      if (token) {
        let data = await lastValueFrom(this.userService.verifyUser());
        console.log(data);

        this.authService.SetUser(data, true);
      }
    }

    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authService.IsAuthenticated) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}