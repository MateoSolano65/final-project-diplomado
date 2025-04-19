import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { LoginInterface } from '../../types';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    // Si estás usando @ionic/storage-angular, necesitas crear el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  login(data: LoginInterface) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data);
  }

  async logout() {
    await this._storage?.remove(environment.localStorage);
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this._storage?.get(environment.localStorage);
    return !!user;
  }
}
