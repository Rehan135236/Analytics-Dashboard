import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import type { MetricTrend } from '@/types/api.types'

interface RevenueAreaChartProps {
  data: MetricTrend[]
  height?: number
}

// Custom Accessible Dark-Mode Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-slate-900 border border-slate-700/80 p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-slate-300 font-mono mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-slate-400">Actual Revenue:</span>
            <span className="font-mono font-bold text-white">
              ${Number(payload[0]?.value).toLocaleString()}
            </span>
          </div>
          {payload[1] && (
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-400">Target Goal:</span>
              <span className="font-mono font-medium text-cyan-300">
                ${Number(payload[1]?.value).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export const RevenueAreaChart: React.FC<RevenueAreaChartProps> = ({ data, height = 280 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="#06b6d4"
            strokeWidth={2}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#colorTarget)"
            name="Target"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

