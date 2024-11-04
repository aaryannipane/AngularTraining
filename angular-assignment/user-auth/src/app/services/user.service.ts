import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://localhost:44352/api/v1';
  constructor(private _http: HttpClient) {}

  getStates() {
    return this._http.get(`${this.url}/states`);
  }

  getCitys(id: string) {
    return this._http.get(`${this.url}/citys/${id}`);
  }

  getRoles() {
    return this._http.get(`${this.url}/roles`);
  }

  registerUser(data: any) {
    return this._http.post(`${this.url}/user`, data);
  }

  loginUser(data: any) {
    return this._http.post(`${this.url}/login`, data);
  }

  verifyUser() {
    return this._http.get(`${this.url}/token/verify`);
  }
}
