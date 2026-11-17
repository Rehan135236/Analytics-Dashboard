import { mockTrends, mockDistribution } from './mockData'
import type { MetricTrend } from '@/types/api.types'

/**
 * Service to simulate async API calls for analytics and telemetry
 */
export const analyticsService = {
  getMetricTrends: async (): Promise<MetricTrend[]> => {
    // Simulate 350ms network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 350))
    return [...mockTrends]
  },

  getCategoryDistribution: async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return [...mockDistribution]
  },
}

