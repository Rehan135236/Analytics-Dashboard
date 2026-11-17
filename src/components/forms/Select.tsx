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
            className="block text-xs font-medium text-slate-300 select-none"
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
              'w-full appearance-none rounded-lg bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 transition-colors',
              'py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-950',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-900',
              error
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/40'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-slate-900 text-slate-100"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 pointer-events-none flex items-center gap-1.5">
            {error ? (
              <AlertCircle className="h-4 w-4 text-rose-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </div>
        </div>

        {error ? (
          <p id={errorId} className="text-[11px] text-rose-400 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[11px] text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

Select.displayName = 'Select'
