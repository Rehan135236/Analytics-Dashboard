import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User, UserRole } from '@/types/auth.types'

const initialMockUser: User = {
  id: 'usr_enterprise_01',
  name: 'Alex Developer',
  email: 'alex@nexuscorp.internal',
  role: 'SuperAdmin',
  department: 'Data Platform Architecture',
  lastLogin: new Date().toISOString(),
  isActive: true,
}

const initialState: AuthState = {
  user: initialMockUser,
  token: 'mock-jwt-token-nexus-enterprise-sec',
  isAuthenticated: true,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    switchPersona: (state, action: PayloadAction<UserRole>) => {
      if (state.user) {
        state.user.role = action.payload
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, switchPersona } = authSlice.actions
export default authSlice.reducer

