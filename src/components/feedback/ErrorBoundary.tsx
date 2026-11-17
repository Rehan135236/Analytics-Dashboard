import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo })
    console.error('[Nexus ErrorBoundary] Uncaught render error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-900/80 border border-rose-500/30 shadow-xl">
          <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white">
            Component Rendering Error
          </h2>
          <p className="mt-2 max-w-md text-xs text-slate-400 leading-relaxed">
            An unexpected error occurred while rendering this module. Our error boundary
            safely intercepted the issue to keep the rest of the application running.
          </p>

          {this.state.error && (
            <div className="mt-4 max-w-xl w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-left font-mono text-[11px] text-rose-300 overflow-x-auto">
              <p className="font-semibold">{this.state.error.toString()}</p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={this.handleReset}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Reload Application
            </Button>
            <Button
              variant="outline"
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            >
              Dismiss & Retry
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
