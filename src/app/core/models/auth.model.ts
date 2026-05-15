export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}
