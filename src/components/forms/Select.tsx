import React, { useId } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'w-full appearance-none rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 transition-colors shadow-2xs',
              'py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500',
              'dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:ring-offset-slate-950',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-900',
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/40'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 pointer-events-none flex items-center gap-1.5">
            {error ? (
              <AlertCircle className="h-4 w-4 text-rose-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </div>

        {error ? (
          <p id={errorId} className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[11px] text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

Select.displayName = 'Select'
