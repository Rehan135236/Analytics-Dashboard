import * as signalR from '@microsoft/signalr'

export type ConnectionState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'RECONNECTING'

export interface TelemetryEvent {
  id: string
  timestamp: string
  clusterId: string
  eventType: 'INFO' | 'WARN' | 'ERROR' | 'METRIC'
  message: string
  throughputEps: number
  latencyMs: number
}

type EventCallback = (event: TelemetryEvent) => void
type StateCallback = (state: ConnectionState) => void

class RealTimeTelemetryManager {
  private state: ConnectionState = 'DISCONNECTED'
  private subscribers: Set<EventCallback> = new Set()
  private stateSubscribers: Set<StateCallback> = new Set()
  private timer: any = null
  private signalRConnection: signalR.HubConnection | null = null
  private isSignalREnabled = false

  public getState(): ConnectionState {
    return this.state
  }

  private setState(newState: ConnectionState) {
    this.state = newState
    this.stateSubscribers.forEach((cb) => cb(newState))
  }

  public subscribeState(callback: StateCallback): () => void {
    this.stateSubscribers.add(callback)
    callback(this.state)
    return () => this.stateSubscribers.delete(callback)
  }

  public subscribe(callback: EventCallback): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  public connect(url: string = 'ws://localhost:5000/stream') {
    if (this.state === 'CONNECTED' || this.state === 'CONNECTING') return

    this.setState('CONNECTING')

    // If SignalR mode is activated (when backend is available)
    if (this.isSignalREnabled) {
      this.initSignalR(url)
      return
    }

    // Default: Enterprise In-Memory Telemetry Stream Simulator
    setTimeout(() => {
      this.setState('CONNECTED')
      this.startSimulationStream()
    }, 600)
  }

  public disconnect() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    if (this.signalRConnection) {
      this.signalRConnection.stop()
      this.signalRConnection = null
    }

    this.setState('DISCONNECTED')
  }

  private initSignalR(hubUrl: string) {
    try {
      this.signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect([0, 2000, 5000, 10000])
        .configureLogging(signalR.LogLevel.Warning)
        .build()

      this.signalRConnection.on('ReceiveTelemetry', (event: TelemetryEvent) => {
        this.subscribers.forEach((cb) => cb(event))
      })

      this.signalRConnection.onreconnecting(() => this.setState('RECONNECTING'))
      this.signalRConnection.onreconnected(() => this.setState('CONNECTED'))
      this.signalRConnection.onclose(() => this.setState('DISCONNECTED'))

      this.signalRConnection
        .start()
        .then(() => this.setState('CONNECTED'))
        .catch((err) => {
          console.warn('[RealTimeManager] SignalR connection failed, falling back to simulator:', err)
          this.startSimulationStream()
          this.setState('CONNECTED')
        })
    } catch {
      this.startSimulationStream()
      this.setState('CONNECTED')
    }
  }

  private startSimulationStream() {
    if (this.timer) return

    const eventTypes: Array<'INFO' | 'WARN' | 'ERROR' | 'METRIC'> = ['INFO', 'INFO', 'METRIC', 'WARN', 'INFO', 'METRIC']
    const nodes = ['CLUSTER-US-E1', 'EDGE-AUTH-EU', 'INGEST-AP-S1', 'VAULT-COLD-02', 'BALANCER-GLOBAL']

    this.timer = setInterval(() => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
      const node = nodes[Math.floor(Math.random() * nodes.length)]
      const eps = Math.floor(Math.random() * 45000) + 15000
      const latency = Math.floor(Math.random() * 25) + 20

      const event: TelemetryEvent = {
        id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString(),
        clusterId: node,
        eventType: type,
        throughputEps: eps,
        latencyMs: latency,
        message:
          type === 'WARN'
            ? `P99 tail latency exceeded nominal baseline by ${Math.floor(Math.random() * 20)}%`
            : type === 'ERROR'
            ? 'Heartbeat packet missed on replica slice'
            : `Stream ingestion processed batch of ${(eps / 10).toFixed(0)} events`,
      }

      this.subscribers.forEach((cb) => cb(event))
    }, 1200)
  }
}

export const realTimeManager = new RealTimeTelemetryManager()
