import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
let url = 'https://localhost:44352/api/v1';

describe('UserService', () => {
  let userService: UserService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    userService = TestBed.inject(UserService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get all states', () => {
    userService.getStates().subscribe((states) => {
      expect(states).toBeTruthy();
    });

    const req = httpTest.expectOne(`${url}/states`);

    expect(req.request.method).toEqual('GET');
    req.flush([
      { Id: 1, Name: 'Maharashtra' },
      { Id: 2, Name: 'Gujarat' },
    ]);
  });

  it('should get all citys by state id', () => {
    const stateId = '1';
    userService.getCitys(stateId).subscribe((citys) => {
      expect(citys).toBeTruthy();
    });

    const req = httpTest.expectOne(`${url}/citys/${stateId}`);

    expect(req.request.method).toEqual('GET');
    req.flush([
      { Id: 1, Name: 'Mumbai' },
      { Id: 2, Name: 'Ulwe' },
    ]);
  });

  it('should get all roles', () => {
    userService.getRoles().subscribe((roles) => {
      expect(roles).toBeTruthy();
    });

    const req = httpTest.expectOne(`${url}/roles`);

    expect(req.request.method).toEqual('GET');
    req.flush([
      { Id: 1, Name: 'admin' },
      { Id: 2, Name: 'seller' },
      { Id: 3, Name: 'buyer' },
    ]);
  });

  it('should register user', () => {
    const userData = {
      firstName: 'Aryan',
      lastName: 'Nipane',
      username: 'aryannipane',
      email: 'aryan@gmail.com',
    };
    userService.registerUser(userData).subscribe();

    const req = httpTest.expectOne(`${url}/user`);

    expect(req.request.method).toEqual('POST');

    req.flush('');
  });

  it('should login user', () => {
    const userData = {
      username: 'aryannipane',
      password: 'aA2@',
    };
    const token = 'adsaidhsaasfsafb';
    userService.loginUser(userData).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.token).toBe(token);
    });

    const req = httpTest.expectOne(`${url}/login`);

    expect(req.request.method).toEqual('POST');

    req.flush({ token });
  });

  it('should give error for invalid username or email while login user', () => {
    const userData = {
      username: 'aryannipane',
      password: 'aA2@',
    };
    const errMessage = 'Invalid username or email';
    userService.loginUser(userData).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(err.error).toBe(errMessage);
      },
    });

    const req = httpTest.expectOne(`${url}/login`);

    expect(req.request.method).toEqual('POST');

    req.flush(errMessage, { status: 400, statusText: 'Bad Request' });
  });

  it('should give error for invalid password while login user', () => {
    const userData = {
      username: 'aryannipane',
      password: 'aA2@',
    };
    const errMessage = 'Invalid password';
    userService.loginUser(userData).subscribe({
      error: (err: HttpErrorResponse) => {
        expect(err.error).toBe(errMessage);
      },
    });

    const req = httpTest.expectOne(`${url}/login`);

    expect(req.request.method).toEqual('POST');

    req.flush(errMessage, { status: 401, statusText: 'Unauthorized' });
  });

  it('should get user', () => {
    const user = {
      FirstName: 'Aryan',
      LastName: 'Nipane',
      ProfileImage: 'aryan.jpg',
    };

    userService.getUser().subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.FirstName).toBe(user.FirstName);
    });

    const req = httpTest.expectOne(`${url}/user`);

    expect(req.request.method).toEqual('GET');

    req.flush(user);
  });

  it('should get invalid token error while get user', () => {
    const errorMessage = 'token is not valid';

    userService.getUser().subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorMessage);
      },
    });

    const req = httpTest.expectOne(`${url}/user`);

    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });

  it('should get invalid username error while get user', () => {
    const errorMessage = 'Invalid username';

    userService.getUser().subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorMessage);
        expect(error.status).toBe(400);
      },
    });

    const req = httpTest.expectOne(`${url}/user`);

    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
