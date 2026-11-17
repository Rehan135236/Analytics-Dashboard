import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '@/services/analyticsService'

export const DASHBOARD_QUERY_KEYS = {
  trends: ['analytics', 'trends'] as const,
  distribution: ['analytics', 'distribution'] as const,
}

export function useDashboardData() {
  const trendsQuery = useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.trends,
    queryFn: analyticsService.getMetricTrends,
  })

  const distributionQuery = useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.distribution,
    queryFn: analyticsService.getCategoryDistribution,
  })

  return {
    trends: trendsQuery.data || [],
    isLoadingTrends: trendsQuery.isLoading,
    distribution: distributionQuery.data || [],
    isLoadingDistribution: distributionQuery.isLoading,
    refetch: () => {
      trendsQuery.refetch()
      distributionQuery.refetch()
    },
  }
}
