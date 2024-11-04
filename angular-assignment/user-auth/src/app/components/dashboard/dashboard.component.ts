import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any = null;

  constructor(private authService: AuthService) {
    authService.authObs$.subscribe({
      next: (data) => {
        this.user = data.user;
      },
    });
  }
}
