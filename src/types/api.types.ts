export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface MetricTrend {
  timestamp: string
  revenue: number
  target: number
  expenses: number
  activeUsers: number
  latencyMs: number
}

export interface EnterpriseRecord {
  id: string
  name: string
  code: string
  category: 'Infrastructure' | 'Security' | 'Analytics' | 'Integration'
  region: 'US-East' | 'US-West' | 'EU-Central' | 'APAC-South'
  status: 'Healthy' | 'Degraded' | 'Critical' | 'Maintenance'
  healthScore: number
  throughputEps: number
  lastUpdated: string
}

