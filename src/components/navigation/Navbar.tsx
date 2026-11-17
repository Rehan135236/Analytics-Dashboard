import React, { useState, useEffect } from 'react'
import { Bell, Search, Menu, Command, Loader2 } from 'lucide-react'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { useDebounce } from '@/hooks/useDebounce'

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

  // Notify parent or analytics search handler only when debounced value settles
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch)
    }
  }, [debouncedSearch, onSearchChange])

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
      {/* Left Area: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 h-8 w-8 text-slate-400 hover:text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <Breadcrumbs />
      </div>

      {/* Right Area: Search + Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar with Debounce Indicator */}
        <div className="relative hidden sm:block w-72">
          {isDebouncing ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-indigo-400 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          )}

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search metrics, reports, tables..."
            className="w-full pl-9 pr-14 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />

          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-[10px] text-slate-400 font-mono">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </div>
        </div>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
        </button>
      </div>
    </header>
  )
}
