import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AppNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'danger'
  timestamp: string
  read: boolean
}

interface NotificationState {
  notifications: AppNotification[]
  unreadCount: number
}

const initialNotifications: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Cluster Telemetry Normal',
    message: 'Primary ingestion pipeline achieved 45,000 eps with zero drop rate.',
    type: 'success',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Latency Spike Alert',
    message: 'Node eu-west-03 latency elevated above 120ms threshold.',
    type: 'warning',
    timestamp: '25m ago',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Weekly Report Ready',
    message: 'Executive analytics summary ready for download in PDF/CSV.',
    type: 'info',
    timestamp: '2h ago',
    read: true,
  },
]

const initialState: NotificationState = {
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.read).length,
}

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<AppNotification, 'id' | 'timestamp' | 'read'>>) => {
      const newNotif: AppNotification = {
        ...action.payload,
        id: `notif_${Date.now()}`,
        timestamp: 'Just now',
        read: false,
      }
      state.notifications.unshift(newNotif)
      state.unreadCount += 1
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true
      })
      state.unreadCount = 0
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const target = state.notifications.find((n) => n.id === action.payload)
      if (target && !target.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { addNotification, markAllAsRead, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
