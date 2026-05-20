import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../core/state/auth.state';
import { ProfileState } from '../../../core/state/profile.state';
import { UpdateProfile, ChangePassword } from '../../../core/state/actions/profile.actions';

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
  private store = inject(Store);

  authState = toSignal(this.store.select(AuthState.authInfo), {
    initialValue: { user: null, isAuthenticated: false },
  });

  // Profile form
  profileForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{9}$/)]],
  });

  profileLoading = toSignal(this.store.select(ProfileState.profileLoading), { initialValue: false });
  profileMessage = toSignal(this.store.select(ProfileState.profileMessage), { initialValue: null });

  // Password form
  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  passwordLoading = toSignal(this.store.select(ProfileState.passwordLoading), { initialValue: false });
  passwordMessage = toSignal(this.store.select(ProfileState.passwordMessage), { initialValue: null });
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

    this.store.dispatch(new UpdateProfile(this.profileForm.getRawValue()));
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();
    this.store.dispatch(new ChangePassword({ currentPassword, newPassword })).subscribe(() => {
      const msg = this.store.selectSnapshot(ProfileState.passwordMessage);
      if (msg?.type === 'success') {
        this.passwordForm.reset();
      }
    });
  }
}
