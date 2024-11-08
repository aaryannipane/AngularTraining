import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authObs$.subscribe({
      next: (data) => {
        this.isAuthenticated = data.isAuthenticated;
      },
    });
  }

  logout(event: any) {
    localStorage.removeItem('token');
    localStorage.clear();
    this.authService.SetUser(null, false);
    this.router.navigate(['login']);
  }
}
