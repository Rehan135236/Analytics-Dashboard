import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

interface CategoryDonutChartProps {
  data: Array<{ name: string; value: number; color: string }>
  height?: number
}

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="rounded-xl bg-slate-900 border border-slate-700/80 p-2.5 shadow-xl text-xs">
        <p className="font-semibold text-white">{item.name}</p>
        <p className="text-slate-400 font-mono mt-0.5">{item.value}% Workload Share</p>
      </div>
    )
  }
  return null
}

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({
  data,
  height = 240,
}) => {
  return (
    <div style={{ width: '100%', height }} className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomPieTooltip />} />
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
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
        <span className="text-xl font-bold font-mono text-white">100%</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Allocation</span>
      </div>
    </div>
  )
}
