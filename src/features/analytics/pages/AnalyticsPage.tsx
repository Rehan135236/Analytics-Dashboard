import React, { useState } from 'react'
import {
  Download,
  TrendingUp,
  Server,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/forms/Select'
import { RevenueAreaChart } from '../components/RevenueAreaChart'
import { PerformanceBarChart } from '../components/PerformanceBarChart'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'
import { Skeleton } from '@/components/ui/Skeleton'

export const AnalyticsPage: React.FC = () => {
  const { trends, isLoadingTrends } = useDashboardData()
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users'>('revenue')
  const [regionFilter, setRegionFilter] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Analytics Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparative performance telemetry, cohort analyses, and capacity forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Regions' },
              { value: 'us-east', label: 'US-East (N. Virginia)' },
              { value: 'eu-central', label: 'EU-Central (Frankfurt)' },
              { value: 'apac-south', label: 'APAC-South (Mumbai)' },
            ]}
            className="w-44"
          />

          <Button
            variant="outline"
            size="md"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert('Exporting aggregated dataset...')}
          >
            Export Dataset
          </Button>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Mean Ingestion Velocity</span>
            <p className="text-lg font-bold font-mono text-white">84.2 GB/sec</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Average P99 Latency</span>
            <p className="text-lg font-bold font-mono text-white">38.4 ms</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Active Node Instances</span>
            <p className="text-lg font-bold font-mono text-white">128 Nodes</p>
          </div>
        </div>
      </div>

      {/* Visualization Studio Panel */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Comparative Telemetry Analysis</CardTitle>
              <CardDescription>
                Cross-correlating traffic volumes and user concurrency over active reporting windows.
              </CardDescription>
            </div>

            {/* Toggle metric tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedMetric === 'revenue'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue & Goals
              </button>
              <button
                type="button"
                onClick={() => setSelectedMetric('users')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedMetric === 'users'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Active Concurrency
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingTrends ? (
            <Skeleton className="h-80 w-full rounded-xl" />
          ) : selectedMetric === 'revenue' ? (
            <RevenueAreaChart data={trends} height={320} />
          ) : (
            <PerformanceBarChart data={trends} height={320} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
