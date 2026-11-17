import React, { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { marketTickers } from '@/services/investmentData'
import type { MarketTickerItem } from '@/types/investment.types'

export const MarketTickerBar: React.FC = () => {
  const [tickers, setTickers] = useState<MarketTickerItem[]>(marketTickers)
  const [flashingSymbol, setFlashingSymbol] = useState<string | null>(null)
  const [flashDirection, setFlashDirection] = useState<'up' | 'down'>('up')

  // Live price tick simulation (real-time software feel)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tickers.length)
      const targetTicker = tickers[randomIndex]
      const deltaPercent = (Math.random() * 0.16 - 0.08) // -0.08% to +0.08%
      const newPrice = Number((targetTicker.price * (1 + deltaPercent / 100)).toFixed(2))
      const isUp = deltaPercent >= 0

      setFlashingSymbol(targetTicker.symbol)
      setFlashDirection(isUp ? 'up' : 'down')

      setTickers((prev) =>
        prev.map((t, idx) => {
          if (idx === randomIndex) {
            const priceDiff = Number((newPrice - t.price).toFixed(2))
            return {
              ...t,
              price: newPrice,
              change: Number((t.change + priceDiff).toFixed(2)),
              changePct: Number((t.changePct + deltaPercent).toFixed(2)),
            }
          }
          return t
        })
      )

      setTimeout(() => setFlashingSymbol(null), 1000)
    }, 2200)

    return () => clearInterval(interval)
  }, [tickers])

  return (
    <div className="h-9 w-full bg-slate-900 text-white text-[11px] font-mono border-b border-slate-800/80 px-4 flex items-center overflow-x-auto no-scrollbar shrink-0 select-none">
      <div className="flex items-center gap-1.5 font-bold text-indigo-400 mr-4 shrink-0 tracking-wider">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>MARKETS:</span>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        {tickers.map((item) => {
          const isPositive = item.changePct >= 0
          const isFlashing = flashingSymbol === item.symbol

          return (
            <div
              key={item.symbol}
              className={`flex items-center gap-2 px-2 py-0.5 rounded transition-all duration-300 ${
                isFlashing
                  ? flashDirection === 'up'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                  : 'text-slate-300'
              }`}
            >
              <span className="font-semibold text-slate-200">{item.symbol}</span>
              <span className="font-bold text-white">${item.price.toLocaleString()}</span>
              <span
                className={`flex items-center gap-0.5 font-medium ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 shrink-0" />
                )}
                {isPositive ? '+' : ''}
                {item.changePct.toFixed(2)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
