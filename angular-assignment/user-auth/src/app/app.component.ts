import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'user-auth';
  constructor() {}

  async ngAfterViewInit(): Promise<void> {
    console.log('before promise');

    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 10000);
    });

    console.log('after promise');
  }
}
