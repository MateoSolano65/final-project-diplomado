import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { LoginInterface } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$: Observable<boolean> =
    this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginInterface) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        this.saveUserSession(data);
        this.authStatusSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(environment.localStorage);
    this.authStatusSubject.next(false);
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
