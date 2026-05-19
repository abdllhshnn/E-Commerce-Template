import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  authState = toSignal(this.authService.state$, {
    initialValue: this.authService.snapshot,
  });

  // Profile form
  profileForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{9}$/)]],
  });

  profileLoading = signal(false);
  profileMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form
  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  passwordLoading = signal(false);
  passwordMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor() {
    const user = this.authState().user;
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone ?? '',
      });
    }
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.profileLoading.set(true);
    this.profileMessage.set(null);

    this.profileService.updateProfile(this.profileForm.getRawValue()).subscribe((res) => {
      this.profileLoading.set(false);
      this.profileMessage.set({
        type: res.success ? 'success' : 'error',
        text: res.message,
      });
    });
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.passwordLoading.set(true);
    this.passwordMessage.set(null);

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();
    this.profileService.changePassword({ currentPassword, newPassword }).subscribe((res) => {
      this.passwordLoading.set(false);
      this.passwordMessage.set({
        type: res.success ? 'success' : 'error',
        text: res.message,
      });
      if (res.success) {
        this.passwordForm.reset();
      }
    });
  }
}
