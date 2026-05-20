import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthState } from '../../../core/state/auth.state';
import { Logout } from '../../../core/state/actions/auth.actions';

@Component({
  selector: 'app-account-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent {
  private store = inject(Store);
  private router = inject(Router);

  authState = toSignal(this.store.select(AuthState.authInfo), {
    initialValue: { user: null, isAuthenticated: false },
  });

  get initials(): string {
    const user = this.authState().user;
    if (!user) return '';
    return (
      (user.firstName?.charAt(0) ?? '') + (user.lastName?.charAt(0) ?? '')
    ).toUpperCase();
  }

  get fullName(): string {
    const user = this.authState().user;
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  }

  get email(): string {
    return this.authState().user?.email ?? '';
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/']);
  }
}
