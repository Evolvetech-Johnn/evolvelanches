import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

// Mock Users Configuration
const MOCK_USERS = {
  ADMIN: {
    email: 'admin@evolve.com',
    password: 'Evolve@2026',
    data: { id: 1, name: 'Admin', role: 'admin' as const }
  },
  CLIENT: {
    password: 'Evolve@2026', // Generic password for testing
    data: { id: 2, name: 'Cliente Teste', role: 'client' as const }
  }
};

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In a real scenario, this would be:
    // const response = await api.post('/auth/login', credentials);
    // return response.data;

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));

    const { email, password } = credentials;

    if (email === MOCK_USERS.ADMIN.email && password === MOCK_USERS.ADMIN.password) {
      const adminUser: User = { ...MOCK_USERS.ADMIN.data, email, token: 'mock-admin-token' };
      this.setSession(adminUser);
      return { success: true, user: adminUser, token: adminUser.token };
    } else if (password === MOCK_USERS.CLIENT.password) {
      const clientUser: User = { ...MOCK_USERS.CLIENT.data, email, token: 'mock-client-token' };
      this.setSession(clientUser);
      return { success: true, user: clientUser, token: clientUser.token };
    } else {
      return { success: false, message: 'Credenciais inválidas' };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // const response = await api.post('/auth/register', data);
    // return response.data;

    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: 'client',
      token: 'mock-new-user-token'
    };
    this.setSession(newUser);
    return { success: true, user: newUser, token: newUser.token };
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
