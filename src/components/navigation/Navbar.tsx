import React, { useState, useEffect } from 'react'
import { Bell, Search, Menu, Command, Loader2, Moon, Sun } from 'lucide-react'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { useDebounce } from '@/hooks/useDebounce'
import { useTheme } from '@/features/settings/context/ThemeContext'

export interface NavbarProps {
  onToggleMobileMenu?: () => void
  onOpenNotifications?: () => void
  onSearchChange?: (query: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileMenu,
  onOpenNotifications,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 350)
  const isDebouncing = searchTerm !== debouncedSearch
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch)
    }
  }, [debouncedSearch, onSearchChange])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20 dark:border-slate-800/80 dark:bg-slate-950/70 transition-colors">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <Breadcrumbs />
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Global Asset Search */}
        <div className="relative hidden sm:block w-72">
          {isDebouncing ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          )}

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickers, assets (e.g. AAPL, NVDA)..."
            className="w-full pl-9 pr-14 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
          />

          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Quick Theme Switcher Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-colors cursor-pointer"
          title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </button>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 transition-colors cursor-pointer"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-950" />
        </button>
      </div>
    </header>
  )
}
