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
  comparisonLabel = 'vs benchmark',
  icon,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden border-slate-200/90 dark:border-slate-800/90', className)}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            {title}
          </p>
          {icon && (
            <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-2.5 flex items-baseline justify-between">
          <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
            {value}
          </h4>
        </div>

        {change !== undefined && (
          <div className="mt-2.5 flex items-center gap-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-1 font-mono font-medium px-2 py-0.5 rounded-full border text-[11px]',
                isNeutral
                  ? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                  : isPositive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                  : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
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
            <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">
              {comparisonLabel}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
