import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from './Card'
import { cn } from '@/utils/cn'

export interface MetricCardProps {
  title: string
  value: string | number
  change?: string | number
  isPositive?: boolean
  isNeutral?: boolean
  comparisonLabel?: string
  icon?: React.ReactNode
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  isNeutral,
  comparisonLabel = 'vs last 30 days',
  icon,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
          {icon && (
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <h4 className="text-2xl font-bold tracking-tight text-white font-mono">{value}</h4>
        </div>

        {change !== undefined && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded-full border',
                isNeutral
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              )}
            >
              {isNeutral ? (
                <Minus className="h-3 w-3" />
              ) : isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </span>
            <span className="text-slate-400 text-[11px] truncate">{comparisonLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
