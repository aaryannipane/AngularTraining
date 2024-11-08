import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    userServiceSpy.getUser = () => {
      return of({
        FirstName: 'aryan',
        LastName: 'nipane',
        ProfileImage: 'image.jpg',
      });
    };
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
