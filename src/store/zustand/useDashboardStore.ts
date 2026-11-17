import { create } from 'zustand'

export type TimeRange = '7d' | '30d' | '90d' | '1y'
export type TableDensity = 'compact' | 'normal' | 'spacious'

interface DashboardStoreState {
  timeRange: TimeRange
  setTimeRange: (range: TimeRange) => void
  tableDensity: TableDensity
  setTableDensity: (density: TableDensity) => void
  visibleWidgets: {
    revenueChart: boolean
    performanceBar: boolean
    statusDonut: boolean
    activityFeed: boolean
  }
  toggleWidget: (widgetKey: keyof DashboardStoreState['visibleWidgets']) => void
  resetLayout: () => void
}

const defaultWidgets = {
  revenueChart: true,
  performanceBar: true,
  statusDonut: true,
  activityFeed: true,
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  timeRange: '30d',
  setTimeRange: (range) => set({ timeRange: range }),
  tableDensity: 'normal',
  setTableDensity: (density) => set({ tableDensity: density }),
  visibleWidgets: defaultWidgets,
  toggleWidget: (key) =>
    set((state) => ({
      visibleWidgets: {
        ...state.visibleWidgets,
        [key]: !state.visibleWidgets[key],
      },
    })),
  resetLayout: () => set({ visibleWidgets: defaultWidgets, timeRange: '30d', tableDensity: 'normal' }),
}))

