import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTES } from '@/config/routes.config'
import { RootLayout } from '@/layouts/RootLayout'
import { Skeleton } from '@/components/ui/Skeleton'

// Enterprise Code Splitting via React.lazy
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)
const AnalyticsPage = lazy(() =>
  import('@/features/analytics/pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage }))
)
const DataManagementPage = lazy(() =>
  import('@/features/data-management/pages/DataManagementPage').then((m) => ({
    default: m.DataManagementPage,
  }))
)
const UsersPage = lazy(() =>
  import('@/features/users/pages/UsersPage').then((m) => ({ default: m.UsersPage }))
)
const RealTimePage = lazy(() =>
  import('@/features/real-time/pages/RealTimePage').then((m) => ({ default: m.RealTimePage }))
)
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
)
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
)

const PageSuspenseFallback = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-64 rounded-lg" />
    <Skeleton className="h-4 w-96 rounded-md" />
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>
    <Skeleton className="h-72 w-full rounded-xl mt-6" />
  </div>
)

const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: (
      <Suspense fallback={<PageSuspenseFallback />}>
        <LoginPage />
      </Suspense>
    ),
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
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ANALYTICS,
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.DATA_MANAGEMENT,
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <DataManagementPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.USERS,
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.REAL_TIME,
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <RealTimePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <Suspense fallback={<PageSuspenseFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
])

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />
}
