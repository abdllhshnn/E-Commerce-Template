import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ForgotPassword } from '../../../core/state/actions/auth.actions';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  loading = signal(false);
  error = signal('');
  sent = signal(false);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.store.dispatch(new ForgotPassword(this.form.getRawValue())).subscribe({
      next: () => {
        this.loading.set(false);
        const authError = this.store.selectSnapshot((state) => state.auth.error);
        if (authError) {
          this.error.set(authError);
        } else {
          this.sent.set(true);
        }
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
