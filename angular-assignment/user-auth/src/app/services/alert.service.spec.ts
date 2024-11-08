import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set success alert', fakeAsync(() => {
    let alertsLengthBefore = service.alerts.length;
    service.setAlert('success', 'Success Message Alert');
    expect(service.alerts.length).toBe(alertsLengthBefore + 1);
    // expect(window.setTimeout).toHaveBeenCalledTimes(1);

    console.error(service.alerts.length);

    flush();

    expect(service.alerts.length).toBe(alertsLengthBefore);
  }));

  it('should clear alert', () => {
    service.clearAlerts();
    expect(service.alerts).toEqual([]);
  });
});
