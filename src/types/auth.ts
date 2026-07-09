export interface User {
  id: number | string;
  name: string;
  email: string;
  role: "admin" | "client";
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
