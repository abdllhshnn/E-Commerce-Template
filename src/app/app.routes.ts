import { Routes } from '@angular/router';
import { authRoutes } from './components/auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';
import { accountRoutes } from './components/account/account.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./components/account/account-layout/account-layout.component').then(
            (m) => m.AccountLayoutComponent,
          ),
        canActivate: [authGuard],
        children: accountRoutes,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
