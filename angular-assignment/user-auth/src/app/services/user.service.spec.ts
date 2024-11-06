import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
let url = 'https://localhost:44352/api/v1';

fdescribe('UserService', () => {
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
});
