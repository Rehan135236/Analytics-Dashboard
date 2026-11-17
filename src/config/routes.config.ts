/**
 * Centralized Route Paths for Nexus Analytics
 * Prevents hardcoded magic route strings throughout components.
 */
export const ROUTES = {
  // Public / Authentication
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },

  // Protected / App Modules
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  DATA_MANAGEMENT: '/data',
  USERS: '/users',
  REAL_TIME: '/monitoring',
  SETTINGS: '/settings',
} as const

export type AppRoute = typeof ROUTES[keyof typeof ROUTES]

