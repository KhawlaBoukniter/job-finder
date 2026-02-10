import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { User, UserCreate, UserDb, sanitizeUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private readonly STORAGE_KEY = 'auth_user';

  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor(private http: HttpClient, private router: Router) { }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  register(payload: UserCreate): Observable<User> {
    return this.http.get<UserDb[]>(`${this.apiUrl}?email=${payload.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return throwError(() => new Error('Email déjà utilisé'));
        }
        return this.http.post<UserDb>(this.apiUrl, payload);
      }),
      map(userDb => sanitizeUser(userDb)),
      tap(user => this.setSession(user))
    );
  }

  login(payload: Pick<UserCreate, 'email' | 'password'>): Observable<User> {
    return this.http.get<UserDb[]>(`${this.apiUrl}?email=${payload.email}&password=${payload.password}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Email ou mot de passe incorrect');
        }
        return sanitizeUser(users[0]);
      }),
      tap(user => this.setSession(user))
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  updateProfile(id: string, updates: Partial<User>): Observable<User> {
    return this.http.patch<UserDb>(`${this.apiUrl}/${id}`, updates).pipe(
      map(userDb => sanitizeUser(userDb)),
      tap(user => this.setSession(user))
    );
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.logout())
    );
  }

  private setSession(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
}
