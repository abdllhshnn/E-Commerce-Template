import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest.guard';

const authLayout = () =>
  import('./auth-layout/auth-layout.component').then(
    (m) => m.AuthLayoutComponent,
  );

export const authRoutes: Routes = [
  {
    path: 'giris',
    canActivate: [guestGuard],
    loadComponent: authLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: 'kayit',
    canActivate: [guestGuard],
    loadComponent: authLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: 'sifremi-unuttum',
    canActivate: [guestGuard],
    loadComponent: authLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
      },
    ],
  },
  {
    path: 'sifre-sifirla',
    loadComponent: authLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
    ],
  },
];
