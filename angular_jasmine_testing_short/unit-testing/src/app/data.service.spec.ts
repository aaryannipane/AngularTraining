import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { USERS } from '../mockData/user';
import { provideHttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    expect(service).toBeTruthy();
    service.getAllUsers().subscribe({
      next: (data: any) => {
        expect(data).toBeTruthy();
        expect(data.length).toBe(3);
      },
    });

    const mockReq = testingController.expectOne('api/users');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(USERS));
  });

  it('should update the user by id', () => {
    expect(service).toBeTruthy();
    let changes = {
      age: 24,
    };
    service.updateUser(1, changes).subscribe({
      next: (data: any) => {
        expect(data).toBeTruthy();
        console.log(data.id);

        expect(data.id).toBe(1);
      },
    });

    const mockReq = testingController.expectOne('api/user/1');
    expect(mockReq.request.method).toEqual('PUT');
    let modifiedUser = USERS[1];
    modifiedUser.age = 24;
    expect(mockReq.request.body.age).toEqual(changes.age);
    mockReq.flush(modifiedUser);
  });

  afterEach(() => {
    testingController.verify();
  });
});
