export type UserRole = 'SuperAdmin' | 'Analyst' | 'Viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department: string
  lastLogin: string
  isActive: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
