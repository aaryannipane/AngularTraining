import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
type Alert = 'success' | 'info' | 'warning' | 'danger';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: any = [];
  private alertSub: Subject<any> = new Subject<any>();
  alertObs = this.alertSub.asObservable();
  constructor() {}
  setAlert(type: Alert, message: string) {
    this.alerts.push({ type, message });
    this.alertSub.next(this.alerts);

    setTimeout(() => {
      let idx = this.alerts.length - 1;
      this.alerts.splice(idx, 1);
      this.alertSub.next(this.alerts);
    }, 5000);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  clearAlerts() {
    this.alerts = [];
    this.alertSub.next(this.alerts);
  }
}
