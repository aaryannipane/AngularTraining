import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // check if token present
    let token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    // if present then add it in header
    // verify token request in app onInit component lifecycle not here

    return next.handle(req).pipe(
      catchError((x) => {
        if (x.status == '401') {
          this.authService.SetIsAuth(false);
          localStorage.clear();
          this.router.navigate(['login']);
        }

        return throwError(x);
      })
    );
  }
}
