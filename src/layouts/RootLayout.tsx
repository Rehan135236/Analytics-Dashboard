import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/navigation/Sidebar'
import { Navbar } from '@/components/navigation/Navbar'
import { Modal } from '@/components/feedback/Modal'
import { Badge } from '@/components/ui/Badge'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const RootLayout = () => {
  // Persist sidebar collapsed/expanded preference across page reloads
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage<boolean>(
    'nexus_sidebar_collapsed',
    false
  )
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Reusable Collapsible Navigation Sidebar with Persisted State */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onOpenNotifications={() => setIsNotificationOpen(true)} />

        {/* Dynamic Nested Route Content wrapped in an Error Boundary */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Notifications Modal */}
      <Modal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        title="Notifications Center"
        description="System telemetry alerts and user audit activities"
      >
        <div className="space-y-3">
          {[
            {
              title: 'Database replica synchronization completed',
              time: '2 minutes ago',
              type: 'success' as const,
            },
            {
              title: 'Unusual query spike detected in region us-east',
              time: '14 minutes ago',
              type: 'warning' as const,
            },
            {
              title: 'Weekly automated analytics report generated',
              time: '1 hour ago',
              type: 'info' as const,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-xs font-medium text-slate-200">{item.title}</p>
                <span className="text-[11px] text-slate-400 mt-1 block">{item.time}</span>
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
