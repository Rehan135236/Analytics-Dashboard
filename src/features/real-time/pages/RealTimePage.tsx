import React, { useState, useEffect } from 'react'
import {
  Radio,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  Terminal,
  Activity,
  Code2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface MarketTick {
  id: string
  time: string
  symbol: string
  price: number
  changePct: number
  side: 'BUY' | 'SELL'
  size: number
  exchange: string
}

export const RealTimePage: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [ticks, setTicks] = useState<MarketTick[]>([])
  const [ticksPerSec, setTicksPerSec] = useState(142)

  // Real-time market tick generator
  useEffect(() => {
    if (isPaused) return

    const symbols = [
      { sym: 'NVDA', base: 148.6 },
      { sym: 'MSFT', base: 428.5 },
      { sym: 'AAPL', base: 228.3 },
      { sym: 'BTC/USD', base: 92840.0 },
      { sym: 'ETH/USD', base: 3410.0 },
      { sym: 'BND', base: 73.4 },
      { sym: 'GOLD', base: 2684.5 },
    ]
    const exchanges = ['NASDAQ', 'NYSE', 'CBOE', 'BINANCE-US', 'ARCA']

    const interval = setInterval(() => {
      const target = symbols[Math.floor(Math.random() * symbols.length)]
      const delta = (Math.random() * 0.4 - 0.2) // -0.2% to +0.2%
      const price = Number((target.base * (1 + delta / 100)).toFixed(2))
      const isBuy = Math.random() > 0.48

      const newTick: MarketTick = {
        id: `tick_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        time: new Date().toLocaleTimeString(),
        symbol: target.sym,
        price,
        changePct: Number(delta.toFixed(2)),
        side: isBuy ? 'BUY' : 'SELL',
        size: Math.floor(Math.random() * 800) + 50,
        exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
      }

      setTicks((prev) => [newTick, ...prev.slice(0, 49)])
      setTicksPerSec(Math.floor(Math.random() * 40) + 120)
    }, 900)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Real-Time Market Telemetry & Level 1 Quotes
            </h1>
            <Badge variant="success" size="sm" dot>
              SOCKET CONNECTED (WSS)
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sub-millisecond institutional market data feed streaming real-time equity & digital asset ticks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused((prev) => !prev)}
            leftIcon={isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          >
            {isPaused ? 'Resume Feed' : 'Pause Feed'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTicks([])}
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
          >
            Clear Log
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setTicks([])
              alert('Reconnected to NASDAQ ultra-low-latency market gateway.')
            }}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Reconnect Gateway
          </Button>
        </div>
      </div>

      {/* Real-Time Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 flex items-center justify-center">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Order Processing Rate</span>
            <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {ticksPerSec} <span className="text-xs font-normal text-slate-400">ticks/sec</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Stream Protocol</span>
            <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
              Native WebSocket / SignalR
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 flex items-center gap-4 shadow-2xs">
          <div className="h-10 w-10 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400 flex items-center justify-center">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Buffered In-Memory Ticks</span>
            <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {ticks.length} / 50 Quotes
            </p>
          </div>
        </div>
      </div>

      {/* Streaming Trade Tape */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <CardTitle>Live Order Execution Tape</CardTitle>
            </div>
            {isPaused && (
              <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 dark:text-amber-400 dark:bg-amber-500/10">
                TAPE PAUSED
              </span>
            )}
          </div>
          <CardDescription>
            Continuous real-time executions across global equity and sovereign debt exchanges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-y-auto space-y-2 text-white">
            {ticks.length === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                Awaiting market tick frames from exchange socket...
              </div>
            ) : (
              ticks.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:bg-slate-800/60 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 shrink-0">{t.time}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        t.side === 'BUY'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {t.side}
                    </span>
                    <span className="font-bold text-white tracking-wide">{t.symbol}</span>
                    <span className="text-slate-400 text-[11px] font-semibold">
                      {t.size} shares @ ${t.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
                    <span
                      className={`flex items-center gap-0.5 font-bold ${
                        t.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {t.changePct >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {t.changePct >= 0 ? '+' : ''}
                      {t.changePct}%
                    </span>
                    <span className="text-slate-400">{t.exchange}</span>
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
            <Code2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <CardTitle>C# ASP.NET Core SignalR Market Adapter</CardTitle>
          </div>
          <CardDescription>
            Institutional backend streaming hub broadcasting WebSocket ticks to connected frontend clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-slate-300">{`// C# ASP.NET Core 8 Web API SignalR Market Data Hub
using Microsoft.AspNetCore.SignalR;

namespace Nexus.Wealth.Hubs
{
    [Authorize(Policy = "InstitutionalAccess")]
    public class MarketFeedHub : Hub
    {
        public async Task BroadcastMarketTick(MarketTick tick)
        {
            // Pushes real-time stock and bond trade executions to React clients
            await Clients.All.SendAsync("ReceiveMarketTick", tick);
        }
    }
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
