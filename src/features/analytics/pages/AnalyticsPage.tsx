import React, { useState } from 'react'
import {
  Download,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  PieChart,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/forms/Select'
import { PortfolioPerformanceChart } from '../components/PortfolioPerformanceChart'
import { usePortfolioData } from '@/features/dashboard/hooks/usePortfolioData'
import { Skeleton } from '@/components/ui/Skeleton'

export const AnalyticsPage: React.FC = () => {
  const { history, isLoadingHistory } = usePortfolioData('1Y')
  const [riskHorizon, setRiskHorizon] = useState('1y')
  const [benchmarkTarget, setBenchmarkTarget] = useState('sp500')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Factor & Risk Analytics Studio
            </h1>
            <Badge variant="info" size="sm">
              Monte Carlo VaR
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Institutional risk decomposition, Value-at-Risk (VaR), Sharpe ratios, and factor sensitivities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={riskHorizon}
            onChange={(e) => setRiskHorizon(e.target.value)}
            options={[
              { value: '30d', label: 'Horizon: 30-Day Rolling' },
              { value: '1y', label: 'Horizon: 1-Year Annualized' },
              { value: '3y', label: 'Horizon: 3-Year Cycle' },
            ]}
            className="w-48"
          />

          <Button
            variant="outline"
            size="md"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert('Generating FactSet-compatible risk tearsheet...')}
          >
            Export Risk Tearsheet
          </Button>
        </div>
      </div>

      {/* Quantitative Risk Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Parametric VaR (95%)
            </span>
            <ShieldCheck className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">-$142,500</p>
          <span className="text-[11px] text-slate-500 font-medium">-0.96% 1-day maximum expected loss</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Annual Volatility (σ)
            </span>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">11.84%</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            vs 15.20% S&P 500 (-3.36% lower)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Jensen's Alpha (α)
            </span>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">+5.82%</p>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Excess return over benchmark
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Information Ratio
            </span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-2">1.48</p>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Top decile consistency</span>
        </div>
      </div>

      {/* Main Factor Comparison Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Cumulative Return & Benchmark Sensitivity</CardTitle>
              <CardDescription>
                Visualizing risk-managed downside capture against broad market indices.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={benchmarkTarget}
                onChange={(e) => setBenchmarkTarget(e.target.value)}
                options={[
                  { value: 'sp500', label: 'Benchmark: S&P 500 Index' },
                  { value: 'nasdaq', label: 'Benchmark: NASDAQ 100' },
                ]}
                className="w-52"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <Skeleton className="h-80 w-full rounded-xl" />
          ) : (
            <PortfolioPerformanceChart
              data={history}
              showBenchmarkSp500={benchmarkTarget === 'sp500'}
              showBenchmarkNasdaq={benchmarkTarget === 'nasdaq'}
              height={320}
            />
          )}
        </CardContent>
      </Card>

      {/* Sector Exposure & Factor Beta Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Exposure Breakdown */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sector Exposure Distribution</CardTitle>
              <PieChart className="h-4 w-4 text-indigo-500" />
            </div>
            <CardDescription>Portfolio weighting vs S&P 500 sector benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 font-sans text-xs">
              {[
                { sector: 'Information Technology', weight: 43.4, benchmark: 29.8, diff: '+13.6%' },
                { sector: 'Fixed Income & Bonds', weight: 23.4, benchmark: 0.0, diff: '+23.4%' },
                { sector: 'Commodities & Gold', weight: 7.9, benchmark: 0.0, diff: '+7.9%' },
                { sector: 'Cash & Short-Term Treasuries', weight: 8.4, benchmark: 0.0, diff: '+8.4%' },
                { sector: 'Healthcare & Life Sciences', weight: 6.8, benchmark: 11.2, diff: '-4.4%' },
                { sector: 'Financial Services', weight: 5.9, benchmark: 13.4, diff: '-7.5%' },
                { sector: 'Digital Assets (Crypto)', weight: 4.2, benchmark: 0.0, diff: '+4.2%' },
              ].map((sec, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{sec.sector}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">{sec.weight}%</span>
                    <span
                      className={`text-[11px] font-semibold ${
                        sec.diff.startsWith('+') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                      }`}
                    >
                      {sec.diff}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Multi-Factor Sensitivities */}
        <Card>
          <CardHeader>
            <CardTitle>Fama-French Multi-Factor Attribution</CardTitle>
            <CardDescription>Systematic risk factor loadings across equity holdings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { factor: 'Market Risk Factor (Beta)', value: '0.88', desc: 'Defensive market exposure with dampened drawdown risk' },
              { factor: 'Size Factor (SMB — Small Minus Big)', value: '-0.32', desc: 'Heavy tilt towards mega-cap blue-chip balance sheets' },
              { factor: 'Value Factor (HML — High Minus Low)', value: '-0.24', desc: 'Growth and high-quality earnings momentum orientation' },
              { factor: 'Momentum Factor (MOM)', value: '+0.58', desc: 'Strong positive exposure to top-decile 12-month performers' },
              { factor: 'Quality / Profitability (RMW)', value: '+0.74', desc: 'High operating margins and ROIC asset filtration' },
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{f.factor}</span>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                    {f.value}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{f.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
