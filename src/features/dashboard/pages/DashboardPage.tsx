import React, { useState } from 'react'
import {
  DollarSign,
  Users,
  Percent,
  Activity,
  Plus,
  RefreshCw,
} from 'lucide-react'
import { MetricCard } from '@/components/ui/MetricCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/forms/Select'
import { Modal } from '@/components/feedback/Modal'
import { Input } from '@/components/forms/Input'
import { RevenueAreaChart } from '@/features/analytics/components/RevenueAreaChart'
import { CategoryDonutChart } from '@/features/analytics/components/CategoryDonutChart'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'
import { useDashboardStore } from '@/store/zustand/useDashboardStore'
import { Skeleton } from '@/components/ui/Skeleton'

export const DashboardPage: React.FC = () => {
  const { trends, isLoadingTrends, distribution, isLoadingDistribution, refetch } = useDashboardData()
  const { timeRange, setTimeRange } = useDashboardStore()
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
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

      {/* KPI Cards */}
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

      {/* Live Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Velocity & Target Projection</CardTitle>
                <CardDescription>
                  Continuous financial stream mapped against quarterly milestones.
                </CardDescription>
              </div>
              <Badge variant="success" size="sm">
                +24.8% YoY
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingTrends ? (
              <Skeleton className="h-72 w-full rounded-xl" />
            ) : (
              <RevenueAreaChart data={trends} height={280} />
            )}
          </CardContent>
        </Card>

        {/* Workload Distribution Donut */}
        <Card>
          <CardHeader>
            <CardTitle>Workload Distribution</CardTitle>
            <CardDescription>Enterprise resource allocation breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingDistribution ? (
              <Skeleton className="h-56 w-full rounded-xl" />
            ) : (
              <CategoryDonutChart data={distribution} height={200} />
            )}

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              {distribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-200">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Modal */}
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
          <Input label="Report Title" defaultValue="Q4 Executive Performance & Growth Audit" />
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
