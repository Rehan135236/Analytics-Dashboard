import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { ROUTES } from '@/config/routes.config'

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  data: 'Data Management',
  users: 'User Management',
  monitoring: 'Real-Time Monitoring',
  settings: 'Settings',
  auth: 'Authentication',
  login: 'Sign In',
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-slate-400">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-900"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const displayName = routeNameMap[value.toLowerCase()] || value

        return (
          <React.Fragment key={to}>
            <ChevronRight className="h-3 w-3 text-slate-600 shrink-0" />
            {isLast ? (
              <span className="font-medium text-slate-200" aria-current="page">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-slate-200 transition-colors capitalize"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
