import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTES } from '@/config/routes.config'
import { RootLayout } from '@/layouts/RootLayout'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { AnalyticsPage } from '@/features/analytics/pages/AnalyticsPage'
import { DataManagementPage } from '@/features/data-management/pages/DataManagementPage'
import { UsersPage } from '@/features/users/pages/UsersPage'
import { RealTimePage } from '@/features/real-time/pages/RealTimePage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <AnalyticsPage />,
      },
      {
        path: ROUTES.DATA_MANAGEMENT,
        element: <DataManagementPage />,
      },
      {
        path: ROUTES.USERS,
        element: <UsersPage />,
      },
      {
        path: ROUTES.REAL_TIME,
        element: <RealTimePage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}

