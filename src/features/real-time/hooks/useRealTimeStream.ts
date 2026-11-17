import { useState, useEffect } from 'react'
import {
  realTimeManager,
  type ConnectionState,
  type TelemetryEvent,
} from '@/services/realTimeManager'

export function useRealTimeStream() {
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    realTimeManager.getState()
  )
  const [events, setEvents] = useState<TelemetryEvent[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [currentEps, setCurrentEps] = useState(38400)

  useEffect(() => {
    // Subscribe to connection lifecycle updates
    const unsubscribeState = realTimeManager.subscribeState((newState) => {
      setConnectionState(newState)
    })

    // Subscribe to incoming stream events
    const unsubscribeEvents = realTimeManager.subscribe((event) => {
      if (!isPaused) {
        setEvents((prev) => [event, ...prev.slice(0, 49)]) // Buffer latest 50 events
        setCurrentEps(event.throughputEps)
      }
    })

    // Automatically initiate connection on mount
    realTimeManager.connect()

    return () => {
      unsubscribeState()
      unsubscribeEvents()
    }
  }, [isPaused])

  const togglePause = () => setIsPaused((prev) => !prev)
  const clearEvents = () => setEvents([])
  const reconnect = () => {
    realTimeManager.disconnect()
    realTimeManager.connect()
  }

  return {
    connectionState,
    events,
    isPaused,
    currentEps,
    togglePause,
    clearEvents,
    reconnect,
  }
}

