import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css',
})
export class AlertMessageComponent {
  alerts: any = [];

  constructor(private alertService: AlertService) {
    alertService.alertObs.subscribe({
      next: (data) => {
        this.alerts = data;
      },
    });
  }
}
