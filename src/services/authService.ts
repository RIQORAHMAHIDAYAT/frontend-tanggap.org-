import { api, isMockMode } from './api'

export interface LoginPayload {
  email: string
  password?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password?: string
  school?: string
}

export interface AuthResponse {
  token?: string
  user?: {
    id: string | number
    name: string
    email: string
    role?: string
    photo?: string
    school?: string
  }
  message?: string
}

export const authService = {
  /**
   * Endpoint: POST /auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (isMockMode()) {
      const mockRes: AuthResponse = {
        token: 'mock-token-demo',
        user: {
          id: 'user-mock-1',
          name: payload.email.split('@')[0] || 'Ahmat Fauzy',
          email: payload.email,
          role: 'student'
        },
        message: 'Login berhasil (Mock Mode)'
      }
      localStorage.setItem('tanggap_token', mockRes.token!)
      localStorage.setItem('tanggap_user', JSON.stringify(mockRes.user))
      window.dispatchEvent(new Event('storage'))
      return mockRes
    }

    const res = await api.post<AuthResponse>('auth/login', payload)
    if (res.token) {
      localStorage.setItem('tanggap_token', res.token)
    }
    if (res.user) {
      localStorage.setItem('tanggap_user', JSON.stringify(res.user))
    }
    window.dispatchEvent(new Event('storage'))
    return res
  },

  /**
   * Endpoint: POST /auth/register
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    if (isMockMode()) {
      const mockRes: AuthResponse = {
        token: 'mock-token-demo',
        user: {
          id: 'user-mock-1',
          name: payload.name,
          email: payload.email,
          role: 'student'
        },
        message: 'Registrasi berhasil (Mock Mode)'
      }
      return mockRes
    }

    const res = await api.post<AuthResponse>('auth/register', payload)
    if (res.token) {
      localStorage.setItem('tanggap_token', res.token)
    }
    if (res.user) {
      localStorage.setItem('tanggap_user', JSON.stringify(res.user))
    }
    window.dispatchEvent(new Event('storage'))
    return res
  },

  /**
   * Endpoint: GET /auth/me
   */
  async getProfile(): Promise<AuthResponse['user']> {
    if (isMockMode()) {
      const raw = localStorage.getItem('tanggap_user')
      return raw ? JSON.parse(raw) : undefined
    }
    return api.get<AuthResponse['user']>('auth/me')
  },

  /**
   * Logout user & bersihkan token
   */
  logout() {
    localStorage.removeItem('tanggap_token')
    localStorage.removeItem('tanggap_user')
    localStorage.removeItem('tanggap_school_code')
    window.dispatchEvent(new Event('storage'))
  },
}
