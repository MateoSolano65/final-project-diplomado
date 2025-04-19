import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { LoginInterface } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: Storage) {}

  login(data: LoginInterface) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data);
  }

  logout() {
    return this.storage.removeItem(environment.localStorage);
  }
}
