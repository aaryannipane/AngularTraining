import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css',
})
export class HttpClientComponent {
  loading: boolean = false;
  constructor(private http: HttpClient) {}

  getData() {
    this.loading = true;
    this.http
      .get('https://dummyjson.com/products', {
        observe: 'events',
        reportProgress: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('check console');
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          console.log('complete');

          this.loading = false;
        },
      });
  }
}
