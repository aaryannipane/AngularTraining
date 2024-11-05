import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any = null;
  isLoading: boolean = false;

  constructor(private userService: UserService) {
    this.isLoading = true;
    userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
    });
  }
}
