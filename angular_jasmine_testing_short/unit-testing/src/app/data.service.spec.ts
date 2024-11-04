import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { USERS } from '../mockData/user';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
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
      next: (data) => {
        expect(data).toBeTruthy();
      },
    });

    const mockReq = testingController.expectOne('api/users');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(USERS));
  });
});
