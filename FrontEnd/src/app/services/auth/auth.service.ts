import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private accessTokenKey = 'access_token';
  private roleKey = 'role';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(
    email: string,
    password: string,
    role: 'candidate' | 'recruiter'
  ): Observable<any> {
    const url = `${this.apiUrl}/${role}/login`;
    return this.http
      .post<{ access_token: string; refresh_token: string }>(url, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.setSession(response.access_token, role);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  private setSession(token: string, role: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.accessTokenKey, token);
      localStorage.setItem(this.roleKey, role);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.accessTokenKey);
    }
    return null;
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }

  getUser(): any {
    const decodedToken = this.decodeToken();
    return decodedToken
      ? {
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
        }
      : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.roleKey);
    }

    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error: ${error.error.error}`;
    }
    return throwError(errorMessage);
  }
}
