import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import type { Holding } from '@/types/investment.types'

interface AssetAllocationDonutProps {
  holdings: Holding[]
  height?: number
}

const classColors: Record<string, string> = {
  Equities: '#4f46e5', // Electric Indigo
  'Fixed Income': '#0ea5e9', // Sky Blue
  Alternatives: '#f59e0b', // Amber Gold
  Crypto: '#8b5cf6', // Purple
  Cash: '#10b981', // Emerald
}

export const AssetAllocationDonut: React.FC<AssetAllocationDonutProps> = ({
  holdings,
  height = 240,
}) => {
  // Aggregate percentages by asset class
  const allocationMap = holdings.reduce((acc, h) => {
    acc[h.assetClass] = (acc[h.assetClass] || 0) + h.marketValue
    return acc
  }, {} as Record<string, number>)

  const total = Object.values(allocationMap).reduce((sum, v) => sum + v, 0)

  const data = Object.entries(allocationMap).map(([name, value]) => ({
    name,
    value,
    percentage: Number(((value / total) * 100).toFixed(1)),
    color: classColors[name] || '#64748b',
  }))

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      return (
        <div className="rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700/80 p-2.5 shadow-xl text-xs font-sans">
          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
          <p className="text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            ${(item.value / 1000000).toFixed(2)}M ({item.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ width: '100%', height }} className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomPieTooltip />} />
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
          ${(total / 1000000).toFixed(1)}M
        </span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
          Total AUM
        </span>
      </div>
    </div>
  )
}
