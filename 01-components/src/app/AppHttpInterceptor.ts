import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
    console.log('interceptor constructor');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('interceptor');
    console.log(req);
    // https://stackoverflow.com/a/78216124
    // if no content type set then set it in interceptor
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    return next.handle(req);
  }
}
