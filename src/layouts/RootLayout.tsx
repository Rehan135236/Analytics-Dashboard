import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  LineChart,
  Database,
  Users,
  Radio,
  Settings,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { ROUTES } from '@/config/routes.config'
import { cn } from '@/utils/cn'

const navItems = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Analytics', path: ROUTES.ANALYTICS, icon: LineChart },
  { name: 'Data Management', path: ROUTES.DATA_MANAGEMENT, icon: Database },
  { name: 'User Management', path: ROUTES.USERS, icon: Users },
  { name: 'Real-Time Feed', path: ROUTES.REAL_TIME, icon: Radio, badge: 'Live' },
  { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
]

export const RootLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/95 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Brand */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
              N
            </div>
            <div>
              <span className="font-semibold tracking-tight text-white text-base">Nexus</span>
              <span className="text-xs text-indigo-400 font-mono ml-1.5 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                v1.0
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                      isActive
                        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 transition-colors" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge ? (
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                  )}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* User Profile Footer Card */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-xs text-indigo-400">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">Alex Developer</p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                <span>Admin Role</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          {/* Global Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search metrics, reports, tables... (Ctrl + K)"
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500"></span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
