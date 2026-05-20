import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, User } from '../../models/auth.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginRequest) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public user: Omit<User, 'password'>) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Failed';
  constructor(public error: string) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegisterRequest) {}
}

export class RegisterSuccess {
  static readonly type = '[Auth] Register Success';
  constructor(public user: Omit<User, 'password'>) {}
}

export class RegisterFailed {
  static readonly type = '[Auth] Register Failed';
  constructor(public error: string) {}
}

export class ForgotPassword {
  static readonly type = '[Auth] Forgot Password';
  constructor(public payload: ForgotPasswordRequest) {}
}

export class ForgotPasswordSuccess {
  static readonly type = '[Auth] Forgot Password Success';
}

export class ForgotPasswordFailed {
  static readonly type = '[Auth] Forgot Password Failed';
  constructor(public error: string) {}
}

export class ResetPassword {
  static readonly type = '[Auth] Reset Password';
  constructor(public payload: ResetPasswordRequest) {}
}

export class ResetPasswordSuccess {
  static readonly type = '[Auth] Reset Password Success';
}

export class ResetPasswordFailed {
  static readonly type = '[Auth] Reset Password Failed';
  constructor(public error: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class InitAuth {
  static readonly type = '[Auth] Init';
}
