import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {
  AuthState,
  AuthResult,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from '../models/auth.model';
import { MOCK_USERS } from '../data/mock-users';

const STORAGE_KEY = 'auth_user';
const USERS_KEY = 'auth_users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = this.loadUsers();
  private authState$ = new BehaviorSubject<AuthState>(this.loadState());

  get state$(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  get snapshot(): AuthState {
    return this.authState$.value;
  }

  login(req: LoginRequest): Observable<AuthResult> {
    const user = this.users.find(
      (u) => u.email === req.email && u.password === req.password,
    );

    if (!user) {
      return of({
        success: false,
        message: 'E-posta veya şifre hatalı.',
      }).pipe(delay(600));
    }

    const { password, ...safeUser } = user;
    return of({
      success: true,
      message: 'Giriş başarılı.',
      user: safeUser,
    }).pipe(
      delay(600),
      tap((result) => {
        if (result.success && result.user) {
          this.setState({ user: result.user, isAuthenticated: true });
          if (req.rememberMe) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
          } else {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
          }
        }
      }),
    );
  }

  register(req: RegisterRequest): Observable<AuthResult> {
    const exists = this.users.some((u) => u.email === req.email);

    if (exists) {
      return of({
        success: false,
        message: 'Bu e-posta adresi zaten kayıtlı.',
      }).pipe(delay(600));
    }

    const newUser: User = {
      id: this.users.length + 1,
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      phone: req.phone,
      password: req.password,
    };

    this.users.push(newUser);
    this.saveUsers();

    const { password, ...safeUser } = newUser;
    return of({
      success: true,
      message: 'Kayıt başarılı.',
      user: safeUser,
    }).pipe(
      delay(600),
      tap((result) => {
        if (result.success && result.user) {
          this.setState({ user: result.user, isAuthenticated: true });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.user));
        }
      }),
    );
  }

  forgotPassword(req: ForgotPasswordRequest): Observable<AuthResult> {
    const user = this.users.find((u) => u.email === req.email);

    if (!user) {
      return of({
        success: false,
        message: 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.',
      }).pipe(delay(600));
    }

    // Mock: generate a fake token
    const token = btoa(`${user.email}:${Date.now()}`);
    console.log(`[Mock] Şifre sıfırlama linki: /sifre-sifirla?token=${token}`);

    return of({
      success: true,
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
    }).pipe(delay(600));
  }

  resetPassword(req: ResetPasswordRequest): Observable<AuthResult> {
    let email: string;
    try {
      email = atob(req.token).split(':')[0];
    } catch {
      return of({
        success: false,
        message: 'Geçersiz veya süresi dolmuş bağlantı.',
      }).pipe(delay(600));
    }

    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return of({
        success: false,
        message: 'Geçersiz veya süresi dolmuş bağlantı.',
      }).pipe(delay(600));
    }

    user.password = req.password;
    this.saveUsers();

    return of({
      success: true,
      message: 'Şifreniz başarıyla güncellendi.',
    }).pipe(delay(600));
  }

  logout(): void {
    this.setState({ user: null, isAuthenticated: false });
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private setState(state: AuthState): void {
    this.authState$.next(state);
  }

  private loadState(): AuthState {
    const stored =
      localStorage.getItem(STORAGE_KEY) ??
      sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const user = JSON.parse(stored);
        return { user, isAuthenticated: true };
      } catch {
        return { user: null, isAuthenticated: false };
      }
    }

    return { user: null, isAuthenticated: false };
  }

  private loadUsers(): User[] {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fall through
      }
    }
    // Seed with mock users and persist
    localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
    return [...MOCK_USERS];
  }

  private saveUsers(): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
  }
}
