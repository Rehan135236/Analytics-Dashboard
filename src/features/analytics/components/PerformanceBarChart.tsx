import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import type { MetricTrend } from '@/types/api.types'

interface PerformanceBarChartProps {
  data: MetricTrend[]
  height?: number
}

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-slate-900 border border-slate-700/80 p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-slate-300 font-mono mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Active Users:</span>
            <span className="font-mono font-bold text-white">
              {Number(payload[0]?.value).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ data, height = 280 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
          <XAxis
            dataKey="timestamp"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#334155', opacity: 0.5 }}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomBarTooltip />} />
          <Bar
            dataKey="activeUsers"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
            name="Active Users"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
