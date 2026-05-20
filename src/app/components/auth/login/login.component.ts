import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from '../../../core/state/actions/auth.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.store.dispatch(new Login(this.form.getRawValue())).subscribe({
      next: () => {
        this.loading.set(false);
        const authError = this.store.selectSnapshot((state) => state.auth.error);
        if (authError) {
          this.error.set(authError);
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
