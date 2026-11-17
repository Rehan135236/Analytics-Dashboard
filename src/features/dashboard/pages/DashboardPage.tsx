import React, { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Plus,
  ArrowUpRight,
  RefreshCw,
  Sliders,
  CheckCircle,
} from 'lucide-react'
import { MetricCard } from '@/components/ui/MetricCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal } from '@/components/feedback/Modal'
import { Input } from '@/components/forms/Input'
import { Select } from '@/components/forms/Select'
import { PortfolioPerformanceChart } from '@/features/analytics/components/PortfolioPerformanceChart'
import { AssetAllocationDonut } from '@/features/analytics/components/AssetAllocationDonut'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { Skeleton } from '@/components/ui/Skeleton'

export const DashboardPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '1Y' | '3Y' | 'ALL'>('1Y')
  const [showSp500, setShowSp500] = useState(true)
  const [showNasdaq, setShowNasdaq] = useState(false)
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [isRebalanceModalOpen, setIsRebalanceModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Trade form state
  const [tradeSymbol, setTradeSymbol] = useState('NVDA')
  const [tradeSide, setTradeSide] = useState<'BUY' | 'SELL'>('BUY')
  const [tradeShares, setTradeShares] = useState(100)
  const [tradePrice, setTradePrice] = useState(148.6)
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState<string | null>(null)

  const {
    summary,
    isLoadingSummary,
    holdings,
    isLoadingHoldings,
    history,
    isLoadingHistory,
    executeTrade,
    isExecutingTrade,
    refetchAll,
  } = usePortfolioData(timeframe)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetchAll()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleExecuteTrade = async (e: React.FormEvent) => {
    e.preventDefault()
    await executeTrade({
      symbol: tradeSymbol,
      side: tradeSide,
      shares: Number(tradeShares),
      orderType: 'MARKET',
      limitPrice: Number(tradePrice),
    })

    setTradeSuccessMsg(`Order Filled: ${tradeSide} ${tradeShares} shares of ${tradeSymbol} @ $${tradePrice}`)
    setTimeout(() => {
      setTradeSuccessMsg(null)
      setIsTradeModalOpen(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Software Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Institutional Portfolio Overview
            </h1>
            <Badge variant="success" size="sm" dot>
              Real-Time Valuation
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global multi-asset portfolio performance, risk-adjusted returns, and tactical allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Sync Feeds
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsRebalanceModalOpen(true)}
            leftIcon={<Sliders className="h-3.5 w-3.5" />}
          >
            Rebalance
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsTradeModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Execute Trade
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio AUM"
          value={isLoadingSummary ? 'Loading...' : `$${summary?.totalAum.toLocaleString()}`}
          change={`+${summary?.dayChangePct}%`}
          isPositive
          comparisonLabel="+$184.2k today"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Unrealized Return"
          value={isLoadingSummary ? 'Loading...' : `+$${summary?.totalGainDollar.toLocaleString()}`}
          change={`+${summary?.totalGainPct}%`}
          isPositive
          comparisonLabel="all-time cumulative"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Sharpe Ratio (Annualized)"
          value={isLoadingSummary ? '...' : `${summary?.sharpeRatio}`}
          change="Institutional"
          isNeutral
          comparisonLabel="Risk-adjusted alpha"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <MetricCard
          title="Beta vs S&P 500"
          value={isLoadingSummary ? '...' : `${summary?.betaToSp500}`}
          change="Defensive (0.88x)"
          isPositive
          comparisonLabel="low drawdown risk"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>

      {/* Interactive Equity Curve & Benchmark Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Performance Chart with Interactive Controls */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle>Cumulative Equity & Benchmark Alpha</CardTitle>
                <CardDescription>
                  Portfolio trajectory compared against market benchmark indices.
                </CardDescription>
              </div>

              {/* Interactive Timeframe Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                {(['1W', '1M', '1Y', '3Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-white text-indigo-700 shadow-2xs dark:bg-indigo-600 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Benchmark Overlay Toggles */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                Overlays:
              </span>
              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showSp500}
                  onChange={(e) => setShowSp500(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  S&P 500 (+17.6%)
                </span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showNasdaq}
                  onChange={(e) => setShowNasdaq(e.target.checked)}
                  className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  NASDAQ (+26.4%)
                </span>
              </label>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <Skeleton className="h-72 w-full rounded-xl" />
            ) : (
              <PortfolioPerformanceChart
                data={history}
                showBenchmarkSp500={showSp500}
                showBenchmarkNasdaq={showNasdaq}
                height={290}
              />
            )}
          </CardContent>
        </Card>

        {/* Asset Class Allocation Donut */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Asset Allocation</CardTitle>
              <Badge variant="info" size="sm">
                Target Balanced
              </Badge>
            </div>
            <CardDescription>Multi-asset distribution across risk classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingHoldings ? (
              <Skeleton className="h-56 w-full rounded-xl" />
            ) : (
              <AssetAllocationDonut holdings={holdings} height={200} />
            )}

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {[
                { name: 'Global Equities', pct: '56.3%', val: '$8.36M', color: '#4f46e5' },
                { name: 'Fixed Income & Bonds', pct: '23.4%', val: '$3.47M', color: '#0ea5e9' },
                { name: 'Commodities & Gold', pct: '7.9%', val: '$1.17M', color: '#f59e0b' },
                { name: 'Cash & Short Treasuries', pct: '8.4%', val: '$1.25M', color: '#10b981' },
                { name: 'Digital Assets (BTC)', pct: '4.2%', val: '$0.63M', color: '#8b5cf6' },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{c.val}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{c.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Positions & Movers Micro-Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Holdings & Daily Movers</CardTitle>
              <CardDescription>Core positions ranked by portfolio weight and performance.</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() => window.location.assign('/data')}
            >
              View All Holdings
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Asset Class</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Market Value</th>
                <th className="py-3 px-4">Day Change</th>
                <th className="py-3 px-4">Total Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {holdings.slice(0, 5).map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-mono font-bold">
                        {h.symbol}
                      </span>
                      <span>{h.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{h.assetClass}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {h.allocationPct}%
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    ${h.marketValue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-mono font-semibold ${
                        h.dayChangePct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {h.dayChangePct >= 0 ? '+' : ''}
                      {h.dayChangePct}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      +${h.totalGainDollar.toLocaleString()} (+{h.totalGainPct}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Trade Execution Modal Dialog */}
      <Modal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        title="Execute Portfolio Trade Order"
        description="Submit market or limit order with immediate ledger settlement."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsTradeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleExecuteTrade}
              isLoading={isExecutingTrade}
            >
              Submit {tradeSide} Order
            </Button>
          </>
        }
      >
        <form onSubmit={handleExecuteTrade} className="space-y-4">
          {tradeSuccessMsg && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{tradeSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Order Action
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTradeSide('BUY')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tradeSide === 'BUY'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeSide('SELL')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tradeSide === 'SELL'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  SELL
                </button>
              </div>
            </div>

            <Select
              label="Asset Symbol"
              value={tradeSymbol}
              onChange={(e) => setTradeSymbol(e.target.value)}
              options={[
                { value: 'NVDA', label: 'NVDA — NVIDIA Corp' },
                { value: 'MSFT', label: 'MSFT — Microsoft Corp' },
                { value: 'AAPL', label: 'AAPL — Apple Inc' },
                { value: 'BND', label: 'BND — Vanguard Total Bond' },
                { value: 'TLT', label: 'TLT — 20+ Year Treasury' },
                { value: 'IAU', label: 'IAU — Gold Trust' },
                { value: 'IBIT', label: 'IBIT — Bitcoin Trust' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Number of Shares"
              type="number"
              value={tradeShares}
              onChange={(e) => setTradeShares(Number(e.target.value))}
              required
            />
            <Input
              label="Execution Price ($)"
              type="number"
              step="0.01"
              value={tradePrice}
              onChange={(e) => setTradePrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Estimated Total Capital:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              ${(tradeShares * tradePrice).toLocaleString()}
            </span>
          </div>
        </form>
      </Modal>

      {/* Rebalance Modal Dialog */}
      <Modal
        isOpen={isRebalanceModalOpen}
        onClose={() => setIsRebalanceModalOpen(false)}
        title="Tactical Asset Rebalancing"
        description="Realign current holdings with strategic model portfolio targets."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsRebalanceModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Auto-Rebalance orders dispatched across primary custodian!')
                setIsRebalanceModalOpen(false)
              }}
            >
              Confirm Rebalance
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            Current asset weights deviate from model targets by +2.1% in Equities. Rebalancing will trim Overweight tech assets and re-allocate $310,000 into Fixed Income.
          </p>

          <div className="space-y-2 font-mono">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span>Equities:</span>
              <span className="text-rose-600 dark:text-rose-400">Trim -2.1% ($310,000)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span>Fixed Income:</span>
              <span className="text-emerald-600 dark:text-emerald-400">Add +2.1% ($310,000)</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
