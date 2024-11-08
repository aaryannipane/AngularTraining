import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageComponent } from './alert-message.component';
import { AlertService } from '../../services/alert.service';
import { of } from 'rxjs';

describe('AlertMessageComponent', () => {
  let component: AlertMessageComponent;
  let fixture: ComponentFixture<AlertMessageComponent>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    let alertServiceSpy = jasmine.createSpyObj(AlertService, ['alertObs']);
    await TestBed.configureTestingModule({
      declarations: [AlertMessageComponent],
      providers: [{ provide: AlertService, useValue: alertServiceSpy }],
    }).compileComponents();

    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    alertService.alertObs = of([{ message: 'success' }]);
    fixture = TestBed.createComponent(AlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
