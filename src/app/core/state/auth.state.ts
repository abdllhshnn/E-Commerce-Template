import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/auth.model';
import {
  Login, LoginSuccess, LoginFailed,
  Register, RegisterSuccess, RegisterFailed,
  ForgotPassword, ForgotPasswordSuccess, ForgotPasswordFailed,
  ResetPassword, ResetPasswordSuccess, ResetPasswordFailed,
  Logout, InitAuth,
} from './actions/auth.actions';

export interface AuthStateModel {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const defaults: AuthStateModel = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AuthState {
  private authService = inject(AuthService);

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static user(state: AuthStateModel): Omit<User, 'password'> | null {
    return state.user;
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Selector()
  static authInfo(state: AuthStateModel): { user: Omit<User, 'password'> | null; isAuthenticated: boolean } {
    return { user: state.user, isAuthenticated: state.isAuthenticated };
  }

  @Action(InitAuth)
  initAuth(ctx: StateContext<AuthStateModel>) {
    const snapshot = this.authService.snapshot;
    ctx.setState({
      ...ctx.getState(),
      user: snapshot.user,
      isAuthenticated: snapshot.isAuthenticated,
    });
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.login(action.payload).pipe(
      tap((result) => {
        if (result.success && result.user) {
          ctx.dispatch(new LoginSuccess(result.user));
        } else {
          ctx.dispatch(new LoginFailed(result.message));
        }
      }),
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      user: action.user,
      isAuthenticated: true,
      loading: false,
      error: null,
    });
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>, action: LoginFailed) {
    ctx.patchState({ loading: false, error: action.error });
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.register(action.payload).pipe(
      tap((result) => {
        if (result.success && result.user) {
          ctx.dispatch(new RegisterSuccess(result.user));
        } else {
          ctx.dispatch(new RegisterFailed(result.message));
        }
      }),
    );
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<AuthStateModel>, action: RegisterSuccess) {
    ctx.patchState({
      user: action.user,
      isAuthenticated: true,
      loading: false,
      error: null,
    });
  }

  @Action(RegisterFailed)
  registerFailed(ctx: StateContext<AuthStateModel>, action: RegisterFailed) {
    ctx.patchState({ loading: false, error: action.error });
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.forgotPassword(action.payload).pipe(
      tap((result) => {
        if (result.success) {
          ctx.dispatch(new ForgotPasswordSuccess());
        } else {
          ctx.dispatch(new ForgotPasswordFailed(result.message));
        }
      }),
    );
  }

  @Action(ForgotPasswordSuccess)
  forgotPasswordSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false, error: null });
  }

  @Action(ForgotPasswordFailed)
  forgotPasswordFailed(ctx: StateContext<AuthStateModel>, action: ForgotPasswordFailed) {
    ctx.patchState({ loading: false, error: action.error });
  }

  @Action(ResetPassword)
  resetPassword(ctx: StateContext<AuthStateModel>, action: ResetPassword) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.resetPassword(action.payload).pipe(
      tap((result) => {
        if (result.success) {
          ctx.dispatch(new ResetPasswordSuccess());
        } else {
          ctx.dispatch(new ResetPasswordFailed(result.message));
        }
      }),
    );
  }

  @Action(ResetPasswordSuccess)
  resetPasswordSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false, error: null });
  }

  @Action(ResetPasswordFailed)
  resetPasswordFailed(ctx: StateContext<AuthStateModel>, action: ResetPasswordFailed) {
    ctx.patchState({ loading: false, error: action.error });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.authService.logout();
    ctx.setState({ ...defaults });
  }
}
