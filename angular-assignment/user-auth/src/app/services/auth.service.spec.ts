import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user details', () => {
    const user = {
      username: 'aryannipane',
    };
    const isAuth = true;

    service.SetUser(user, isAuth);

    expect(service.IsAuthenticated).toBe(true);
    expect(service.User).toEqual(user);
  });

  it('should set isAuth', () => {
    spyOn(localStorage, 'setItem');
    const isAuth = true;

    service.SetIsAuth(isAuth);

    expect(service.IsAuthenticated).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(
      'isAuth',
      JSON.stringify(isAuth)
    );
  });

  it('should set isAuth in constructor when isAuth is true and token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    let testService = new AuthService();

    expect(testService.IsAuthenticated).toBeTrue();
  });
});
