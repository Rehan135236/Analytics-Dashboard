import { useState } from 'react'
import {
  DollarSign,
  Users,
  Percent,
  Activity,
  Plus,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { MetricCard } from '@/components/ui/MetricCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/forms/Input'
import { Select } from '@/components/forms/Select'
import { Modal } from '@/components/feedback/Modal'

export const DashboardPage = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterPeriod, setFilterPeriod] = useState('30d')

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  return (
    <div className="space-y-6">
      {/* Header with Title and Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Executive Dashboard</h1>
            <Badge variant="info" size="sm" dot>
              Live Telemetry
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time business performance indicators and enterprise workload distribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            options={[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last quarter' },
              { value: '1y', label: 'Full Year' },
            ]}
            className="w-36"
          />

          <Button
            variant="secondary"
            size="md"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Sync
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsExportModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create Report
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Gross Revenue"
          value="$2,845,920"
          change="+14.2%"
          isPositive
          comparisonLabel="vs last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Subscriptions"
          value="48,219"
          change="+8.1%"
          isPositive
          comparisonLabel="vs last month"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Conversion Ratio"
          value="3.42%"
          change="-0.4%"
          isPositive={false}
          comparisonLabel="vs target"
          icon={<Percent className="h-4 w-4" />}
        />
        <MetricCard
          title="System SLA Uptime"
          value="99.98%"
          change="Optimal"
          isNeutral
          comparisonLabel="operational"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Design System Preview Section: Responsive Cards & Components Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Operational Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Enterprise Performance Overview</CardTitle>
                <CardDescription>
                  Comparative visualization layout ready for Recharts telemetry streaming.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                Deep Dive
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Visual placeholder box representing chart viewport */}
            <div className="h-64 rounded-xl border border-dashed border-slate-800 bg-slate-950/60 flex flex-col items-center justify-center text-center p-6">
              <Sparkles className="h-8 w-8 text-indigo-400 mb-2" />
              <p className="text-sm font-semibold text-slate-200">Recharts Telemetry Stage</p>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Phase 6 will mount interactive Recharts SVG area graphs, tooltip inspectors, and brush zoom controls here.
              </p>
            </div>

            {/* Micro Activity Feed */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Recent Pipeline Events
              </span>
              {[
                { title: 'APAC Region billing pipeline completed', status: 'success', time: '5m ago' },
                { title: 'Telemetry threshold reached on cluster-04', status: 'warning', time: '22m ago' },
                { title: 'Automated data backup verified in EU-Central', status: 'info', time: '1h ago' },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs"
                >
                  <span className="text-slate-300 font-medium">{ev.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[11px]">{ev.time}</span>
                    <Badge variant={ev.status as any} size="sm">
                      {ev.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* UI Design System Gallery Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Design System Controls</CardTitle>
            <CardDescription>Verified tokens and component variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Button Variants */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Button System
              </span>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Button variant="danger" size="sm">
                  Danger
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </div>

            {/* Badge System */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Badge Tokens
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success" dot>
                  Success
                </Badge>
                <Badge variant="warning" dot>
                  Warning
                </Badge>
                <Badge variant="danger" dot>
                  Danger
                </Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            {/* Input System */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Form Inputs
              </span>
              <Input
                label="Dataset Identifier"
                placeholder="e.g. ds_prod_analytics_2026"
                helperText="Alphanumeric unique identifier"
                leftIcon={<Filter className="h-3.5 w-3.5" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Demonstration */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Generate Enterprise Report"
        description="Configure export parameters for executive stakeholders."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsExportModalOpen(false)}>
              Queue Report Generation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Report Title"
            defaultValue="Q4 Executive Performance & Growth Audit"
          />
          <Select
            label="Export Format"
            options={[
              { value: 'pdf', label: 'Portable Document Format (.pdf)' },
              { value: 'csv', label: 'Comma-Separated Values (.csv)' },
              { value: 'json', label: 'Raw Analytics JSON (.json)' },
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}
