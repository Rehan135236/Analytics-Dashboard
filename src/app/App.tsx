import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from '@/routes/AppRoutes'
import { ThemeProvider } from '@/features/settings/context/ThemeContext'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'

// Enterprise QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes fresh
      refetchOnWindowFocus: false, // Prevent aggressive refetches
      retry: 1, // Single retry on failure
    },
  },
})

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
