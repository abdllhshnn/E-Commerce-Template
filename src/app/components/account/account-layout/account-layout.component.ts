import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-account-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  authState = toSignal(this.authService.state$, {
    initialValue: this.authService.snapshot,
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
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
