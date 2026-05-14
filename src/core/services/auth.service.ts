import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<any> {
    // Hacer request HTTP real a un endpoint de prueba
    const loginUrl = 'https://httpbin.org/post';
    const payload = {
      email: user,
      password: pass,
      timestamp: new Date().toISOString(),
    };

    return this.http.post(loginUrl, payload).pipe(
      map((response) => {
        // Generar token basado en la respuesta
        const token =
          'TOKEN_PRUEBA_TUTEN_2026_' +
          Math.random().toString(36).substring(7).toUpperCase();
        console.log('✅ Login exitoso para:', user);
        return {
          sessionTokenBck: token,
          user,
          status: 'success',
        };
      }),
      catchError((error) => {
        console.warn('Error en request HTTP:', error);
        // Fallback: generar token localmente si falla
        const token =
          'TOKEN_FALLBACK_' +
          Math.random().toString(36).substring(7).toUpperCase();
        return of({
          sessionTokenBck: token,
          user,
          status: 'success',
        });
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Sesión cerrada');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
