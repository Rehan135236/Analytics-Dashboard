import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MarketTickerBar } from '@/components/navigation/MarketTickerBar'
import { Sidebar } from '@/components/navigation/Sidebar'
import { Navbar } from '@/components/navigation/Navbar'
import { Modal } from '@/components/feedback/Modal'
import { Badge } from '@/components/ui/Badge'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage<boolean>(
    'nexus_sidebar_collapsed',
    false
  )
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-150">
      {/* Live Financial Market Ticker Bar */}
      <MarketTickerBar />

      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* Reusable Collapsible Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar */}
          <Navbar onOpenNotifications={() => setIsNotificationOpen(true)} />

          {/* Dynamic Nested Route Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </div>

      {/* Global Notifications Modal */}
      <Modal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        title="Fund Audit & Execution Alerts"
        description="Real-time order settlements, rebalance signals, and dividend credits"
      >
        <div className="space-y-3">
          {[
            {
              title: 'Dividend Credit: $14,250 received from Vanguard Total Bond (BND)',
              time: '4 minutes ago',
              type: 'success' as const,
            },
            {
              title: 'Rebalance Alert: NVIDIA Corp weight exceeds 18% portfolio ceiling',
              time: '28 minutes ago',
              type: 'warning' as const,
            },
            {
              title: 'Treasury Settlement: 10Y US Sovereign Auction settled successfully',
              time: '2 hours ago',
              type: 'info' as const,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950/60 dark:border-slate-800/80 flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {item.title}
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                  {item.time}
                </span>
              </div>
              <Badge variant={item.type} size="sm">
                {item.type}
              </Badge>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
