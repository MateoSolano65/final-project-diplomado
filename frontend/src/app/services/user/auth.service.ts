import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { LoginInterface } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginInterface) {
    this.saveUserSession(data);
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data);
  }

  logout(): void {
    localStorage.removeItem(environment.localStorage);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(environment.localStorage);
    return !!user;
  }

  saveUserSession(userData: any): void {
    localStorage.setItem(environment.localStorage, JSON.stringify(userData));
  }

  getUserSession(): any | null {
    const data = localStorage.getItem(environment.localStorage);
    return data ? JSON.parse(data) : null;
  }
}
