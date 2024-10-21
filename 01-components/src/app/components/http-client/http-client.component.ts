import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css',
})
export class HttpClientComponent {
  loading: boolean = false;
  constructor(private http: HttpClient) {}

  getData() {
    // URL PARAMETERS
    const params = new HttpParams().set('q', 'phone');

    this.loading = true;
    this.http
      .get('https://dummyjson.com/products/search', {
        params: params,
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

  postData() {
    let product = { title: 'IPHONE 16' };
    this.http
      .post('https://dummyjson.com/products/add', JSON.stringify(product), {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(
        map((data) => {
          console.log('transform the response');
          console.log(data);

          return data;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
}
