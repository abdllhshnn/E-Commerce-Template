import { Routes } from '@angular/router';
import { authRoutes } from './components/auth/auth.routes';

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
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
