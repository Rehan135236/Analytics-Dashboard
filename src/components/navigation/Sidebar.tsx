import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  PieChart,
  LineChart,
  Table,
  Users,
  Radio,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { ROUTES } from '@/config/routes.config'
import { cn } from '@/utils/cn'

export interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navItems = [
  { name: 'Portfolio Overview', path: ROUTES.DASHBOARD, icon: PieChart },
  { name: 'Factor & Risk Analytics', path: ROUTES.ANALYTICS, icon: LineChart },
  { name: 'Holdings & Orders', path: ROUTES.DATA_MANAGEMENT, icon: Table },
  { name: 'Fund Access & Roles', path: ROUTES.USERS, icon: Users },
  { name: 'Live Market Ticker', path: ROUTES.REAL_TIME, icon: Radio, badge: 'Live' },
  { name: 'Account Settings', path: ROUTES.SETTINGS, icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <aside
      className={cn(
        'border-r border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950 flex flex-col justify-between shrink-0 transition-all duration-300 relative select-none',
        isCollapsed ? 'w-18' : 'w-64'
      )}
    >
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-slate-100 dark:border-slate-800/80 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base">
                  Nexus
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono ml-1.5 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20 font-semibold">
                  WEALTH
                </span>
              </div>
            )}
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 border border-transparent dark:border-slate-800/80 transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-2.5 py-4 space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Portfolio Management
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group relative cursor-pointer',
                    isCollapsed ? 'justify-center' : 'justify-between',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs dark:bg-indigo-600/15 dark:text-indigo-300 dark:border-indigo-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/80'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">
                    {item.badge}
                  </span>
                )}

                {/* Status Dot when collapsed */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                )}
              </NavLink>
            )
          })}
        </div>
      </div>

      {/* Institutional User Profile Card */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
        <div
          className={cn(
            'flex items-center rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800/60 transition-all',
            isCollapsed ? 'p-2 justify-center' : 'p-2.5 gap-3'
          )}
        >
          <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 dark:bg-indigo-600/20 dark:border-indigo-500/30 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
            PW
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                Principal Wealth Fund
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">Tier 1 Sovereign</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
