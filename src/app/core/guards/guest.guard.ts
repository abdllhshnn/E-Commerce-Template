import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  if (!store.selectSnapshot(AuthState.isAuthenticated)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
