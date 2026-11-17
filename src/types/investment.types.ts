export type AssetClass = 'Equities' | 'Fixed Income' | 'Alternatives' | 'Crypto' | 'Cash'

export interface Holding {
  id: string
  symbol: string
  name: string
  assetClass: AssetClass
  sector: string
  shares: number
  avgCost: number
  currentPrice: number
  marketValue: number
  allocationPct: number
  dayChangePct: number
  totalGainDollar: number
  totalGainPct: number
  rating: 'Overweight' | 'Neutral' | 'Underweight'
}

export interface PortfolioSummary {
  totalAum: number
  dayChangeDollar: number
  dayChangePct: number
  totalGainDollar: number
  totalGainPct: number
  sharpeRatio: number
  betaToSp500: number
  maxDrawdownPct: number
  annualYieldPct: number
  cashBalance: number
}

export interface PortfolioHistoryPoint {
  date: string
  portfolioValue: number
  portfolioReturnPct: number
  sp500ReturnPct: number
  nasdaqReturnPct: number
}

export interface MarketTickerItem {
  symbol: string
  name: string
  price: number
  change: number
  changePct: number
  sparkline?: number[]
}

export interface TradeOrderRequest {
  symbol: string
  side: 'BUY' | 'SELL'
  shares: number
  orderType: 'MARKET' | 'LIMIT'
  limitPrice?: number
}
