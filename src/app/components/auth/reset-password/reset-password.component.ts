import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );

  loading = signal(false);
  error = signal('');
  success = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  token = signal('');

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  ngOnInit(): void {
    const t = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.token.set(t);

    if (!t) {
      this.error.set('Geçersiz veya süresi dolmuş bağlantı.');
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.token()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth
      .resetPassword({
        token: this.token(),
        password: this.form.getRawValue().password,
      })
      .subscribe((result) => {
        this.loading.set(false);
        if (result.success) {
          this.success.set(true);
        } else {
          this.error.set(result.message);
        }
      });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');

    if (password && confirm && password.value !== confirm.value) {
      confirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }
}
