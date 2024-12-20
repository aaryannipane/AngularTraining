import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private user: Object | null = null;

  private subject$ = new BehaviorSubject<{
    isAuthenticated: boolean;
    user: Object | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  public authObs$ = this.subject$.asObservable();

  constructor() {
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      if (!!isAuth && localStorage.getItem('token')) this.SetIsAuth(!!isAuth);
    }

    this.authObs$.subscribe({
      next: (data) => {
        this.isAuthenticated = data.isAuthenticated;
        this.user = data.user;
      },
    });
  }

  get IsAuthenticated() {
    return this.isAuthenticated;
  }

  get User() {
    return this.user;
  }

  public SetUser(user: Object | null, isAuthenticated: boolean) {
    this.subject$.next({ user, isAuthenticated });
  }

  public SetIsAuth(value: boolean) {
    this.subject$.next({ user: this.user, isAuthenticated: value });
    localStorage.setItem('isAuth', JSON.stringify(value));
  }
}
