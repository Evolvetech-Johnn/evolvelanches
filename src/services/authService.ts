import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import api from './api';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.user) {
      const user: User = {
        ...response.data.user,
        id: response.data.user.id,
        token: response.data.token
      };
      this.setSession(user);
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    if (response.data.success && response.data.user) {
      const user: User = {
        ...response.data.user,
        id: response.data.user.id,
        token: response.data.token
      };
      this.setSession(user);
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('evolveUser');
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem('evolveUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private setSession(user: User): void {
    localStorage.setItem('evolveUser', JSON.stringify(user));
  }
}

export default new AuthService();
