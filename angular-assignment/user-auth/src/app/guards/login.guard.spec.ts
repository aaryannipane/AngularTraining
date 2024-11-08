import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { LoginGuard } from './login.guard';

describe('loginGuard', () => {
  //   const executeGuard: CanActivateFn = (...guardParameters) =>
  //     TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  let loginGuard: LoginGuard;
  let router: Router;
  beforeEach(() => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [LoginGuard, { provide: Router, useValue: routerSpy }],
    });
    loginGuard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('should can Activate with auth success', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    loginGuard.canActivate();

    expect(router.navigate).toHaveBeenCalledOnceWith(['']);
  });
});
