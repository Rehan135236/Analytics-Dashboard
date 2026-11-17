import React, { useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-slate-300 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'w-full rounded-lg bg-slate-950 border text-sm text-slate-100 placeholder-slate-500 transition-colors',
              'py-2 px-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-950',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-900',
              leftIcon ? 'pl-9' : 'pl-3',
              rightIcon || error ? 'pr-9' : 'pr-3',
              error
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/40 text-rose-100'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40',
              className
            )}
            {...props}
          />

          <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
            {error ? (
              <AlertCircle className="h-4 w-4 text-rose-500" />
            ) : (
              rightIcon && <div className="text-slate-400">{rightIcon}</div>
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

Input.displayName = 'Input'
