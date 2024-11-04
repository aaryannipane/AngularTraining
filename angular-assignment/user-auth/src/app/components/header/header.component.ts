import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authObs$.subscribe({
      next: (data) => {
        this.isAuthenticated = data.isAuthenticated;
      },
    });
  }

  logout(event: any) {
    localStorage.removeItem('token');
    this.authService.SetUser(null, false);
    this.router.navigate(['login']);
  }
}
