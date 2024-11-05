import { CanActivate, RedirectCommand, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate() {
    let isAuth = localStorage.getItem('isAuth');
    if (!!isAuth) {
      this.router.navigate(['']);
    }

    return true;
  }
}
