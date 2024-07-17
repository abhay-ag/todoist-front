import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, UserAuth } from './interfaces/UserInterface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = 'http://54.253.29.158/user';
  constructor(private http: HttpClient, private _router: Router) {}

  loginUser(user: UserAuth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this._apiUrl}/login`, user);
  }

  signupUser(user: UserAuth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this._apiUrl}/signup`, user);
  }

  signOutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
