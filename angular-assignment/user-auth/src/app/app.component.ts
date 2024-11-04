import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'user-auth';
  constructor() {}

  async ngOnInit(): Promise<void> {
    let getProm = new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 5000);
    });

    let data = await getProm;
    console.log(data);
  }
}
