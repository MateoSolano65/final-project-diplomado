import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Verificar si existe información de usuario en localStorage
    const userInfo = localStorage.getItem(environment.localStorage);

    // Si no hay usuario autenticado, simplemente pasar la solicitud original
    if (!userInfo) {
      return next.handle(request);
    }

    try {
      // Extraer el token
      const { token } = JSON.parse(userInfo);

      // Clonar la solicitud y agregar el token de autorización
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pasar la solicitud modificada
      return next.handle(authRequest);
    } catch (error) {
      // Si hay algún error al procesar el token (por ejemplo, JSON inválido),
      // simplemente pasar la solicitud original
      console.error('Error al procesar el token de autenticación:', error);
      return next.handle(request);
    }
  }
}
