import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import type { PortfolioHistoryPoint } from '@/types/investment.types'

interface PortfolioPerformanceChartProps {
  data: PortfolioHistoryPoint[]
  showBenchmarkSp500?: boolean
  showBenchmarkNasdaq?: boolean
  height?: number
}

const CustomFinancialTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const portfolioPoint = payload.find((p: any) => p.dataKey === 'portfolioValue')
    const portfolioReturn = payload.find((p: any) => p.dataKey === 'portfolioReturnPct')
    const sp500 = payload.find((p: any) => p.dataKey === 'sp500ReturnPct')
    const nasdaq = payload.find((p: any) => p.dataKey === 'nasdaqReturnPct')

    return (
      <div className="rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700/80 p-3.5 shadow-xl backdrop-blur-md text-xs font-sans">
        <p className="font-semibold text-slate-500 dark:text-slate-400 font-mono mb-2">
          Period: <span className="text-slate-900 dark:text-white font-bold">{label}</span>
        </p>

        <div className="space-y-1.5 font-mono">
          {portfolioPoint && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                Portfolio Value:
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ${Number(portfolioPoint.value).toLocaleString()}
              </span>
            </div>
          )}

          {portfolioReturn && (
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">Total Return:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                +{Number(portfolioReturn.value).toFixed(2)}%
              </span>
            </div>
          )}

          {sp500 && (
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                S&P 500:
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                +{Number(sp500.value).toFixed(2)}%
              </span>
            </div>
          )}

          {nasdaq && (
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                NASDAQ:
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                +{Number(nasdaq.value).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export const PortfolioPerformanceChart: React.FC<PortfolioPerformanceChartProps> = ({
  data,
  showBenchmarkSp500 = true,
  showBenchmarkNasdaq = false,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#cbd5e1', opacity: 0.5 }}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomFinancialTooltip />} />

          <Area
            type="monotone"
            dataKey="portfolioValue"
            stroke="#4f46e5"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorPortfolio)"
            name="Portfolio"
          />

          {showBenchmarkSp500 && (
            <Line
              type="monotone"
              dataKey="sp500ReturnPct"
              stroke="#10b981"
              strokeWidth={1.8}
              strokeDasharray="4 4"
              dot={false}
              name="S&P 500"
            />
          )}

          {showBenchmarkNasdaq && (
            <Line
              type="monotone"
              dataKey="nasdaqReturnPct"
              stroke="#06b6d4"
              strokeWidth={1.8}
              strokeDasharray="2 2"
              dot={false}
              name="NASDAQ"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
