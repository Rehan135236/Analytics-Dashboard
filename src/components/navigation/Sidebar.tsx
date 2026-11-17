import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  LineChart,
  Database,
  Users,
  Radio,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { ROUTES } from '@/config/routes.config'
import { cn } from '@/utils/cn'

export interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navItems = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Analytics', path: ROUTES.ANALYTICS, icon: LineChart },
  { name: 'Data Management', path: ROUTES.DATA_MANAGEMENT, icon: Database },
  { name: 'User Management', path: ROUTES.USERS, icon: Users },
  { name: 'Real-Time Feed', path: ROUTES.REAL_TIME, icon: Radio, badge: 'Live' },
  { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <aside
      className={cn(
        'border-r border-slate-800/80 bg-slate-950/95 flex flex-col justify-between shrink-0 transition-all duration-300 relative',
        isCollapsed ? 'w-18' : 'w-64'
      )}
    >
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800/80 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 shrink-0">
              N
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="font-semibold tracking-tight text-white text-base">Nexus</span>
                <span className="text-[10px] text-indigo-400 font-mono ml-1.5 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  ENTERPRISE
                </span>
              </div>
            )}
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-2.5 py-4 space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Platform Modules
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
                    'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isCollapsed ? 'justify-center' : 'justify-between',
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}

                {/* Status Dot when collapsed */}
                {isCollapsed && item.badge && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                )}
              </NavLink>
            )
          })}
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-3 border-t border-slate-800/80">
        <div
          className={cn(
            'flex items-center rounded-xl bg-slate-900/60 border border-slate-800/60 transition-all',
            isCollapsed ? 'p-2 justify-center' : 'p-2.5 gap-3'
          )}
        >
          <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-400 shrink-0">
            AD
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Alex Developer</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="h-3 w-3 shrink-0" />
                <span className="truncate">SuperAdmin</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
