import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/store/redux/store'
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
      <Provider store={store}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
