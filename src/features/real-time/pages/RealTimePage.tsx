import React from 'react'
import {
  Radio,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  Terminal,
  Activity,
  Code2,
} from 'lucide-react'
import { useRealTimeStream } from '../hooks/useRealTimeStream'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export const RealTimePage: React.FC = () => {
  const {
    connectionState,
    events,
    isPaused,
    currentEps,
    togglePause,
    clearEvents,
    reconnect,
  } = useRealTimeStream()

  const isConnected = connectionState === 'CONNECTED'
  const isReconnecting = connectionState === 'RECONNECTING'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Real-Time Telemetry</h1>
            <Badge
              variant={isConnected ? 'success' : isReconnecting ? 'warning' : 'danger'}
              size="sm"
              dot
            >
              {connectionState}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Streaming event ingestion ledger powered by native WebSocket & SignalR protocols.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePause}
            leftIcon={isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          >
            {isPaused ? 'Resume Stream' : 'Pause Stream'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearEvents}
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
          >
            Clear Log
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={reconnect}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Reconnect
          </Button>
        </div>
      </div>

      {/* Real-Time Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Stream Throughput</span>
            <p className="text-lg font-bold font-mono text-white">
              {currentEps.toLocaleString()} <span className="text-xs font-normal text-slate-400">eps</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Socket Protocol</span>
            <p className="text-lg font-bold font-mono text-emerald-400">WebSocket / WSS</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Buffered In-Memory Events</span>
            <p className="text-lg font-bold font-mono text-white">{events.length} / 50</p>
          </div>
        </div>
      </div>

      {/* Streaming Event Ledger Console */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <CardTitle>Live Cluster Ingestion Stream</CardTitle>
            </div>
            {isPaused && (
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                STREAM PAUSED
              </span>
            )}
          </div>
          <CardDescription>
            High-frequency message ledger capturing cluster telemetry, heartbeat audits, and edge spikes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-xl bg-slate-950 border border-slate-800/80 p-4 font-mono text-xs overflow-y-auto space-y-2">
            {events.length === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                Awaiting telemetry frames from edge socket...
              </div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/80 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 shrink-0">{evt.timestamp}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        evt.eventType === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400'
                          : evt.eventType === 'ERROR'
                          ? 'bg-rose-500/20 text-rose-400'
                          : evt.eventType === 'METRIC'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {evt.eventType}
                    </span>
                    <span className="text-slate-300 truncate">{evt.message}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
                    <span className="text-indigo-400 font-semibold">{evt.clusterId}</span>
                    <span>{evt.throughputEps.toLocaleString()} eps</span>
                    <span className="text-emerald-400">{evt.latencyMs}ms</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Backend Integration Blueprint: C# & ASP.NET Core SignalR */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-cyan-400" />
            <CardTitle>.NET Core Backend Integration Contract</CardTitle>
          </div>
          <CardDescription>
            Production C# ASP.NET Core SignalR Hub architecture used to feed this module.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-slate-400">{`// C# ASP.NET Core 8 Web API SignalR Hub
using Microsoft.AspNetCore.SignalR;

namespace Nexus.Analytics.Hubs
{
    [Authorize(Roles = "SuperAdmin,Analyst")]
    public class TelemetryHub : Hub
    {
        public async Task BroadcastTelemetry(TelemetryEvent telemetry)
        {
            // Pushes real-time telemetry frames to connected React clients
            await Clients.All.SendAsync("ReceiveTelemetry", telemetry);
        }
    }
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
