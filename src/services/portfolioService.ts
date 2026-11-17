import {
  initialPortfolioSummary,
  initialHoldings,
  getPortfolioHistory,
} from './investmentData'
import type {
  Holding,
  PortfolioSummary,
  TradeOrderRequest,
} from '@/types/investment.types'

let inMemoryHoldings = [...initialHoldings]
let inMemorySummary = { ...initialPortfolioSummary }

export const portfolioService = {
  getSummary: async (): Promise<PortfolioSummary> => {
    await new Promise((res) => setTimeout(res, 200))
    return { ...inMemorySummary }
  },

  getHoldings: async (): Promise<Holding[]> => {
    await new Promise((res) => setTimeout(res, 250))
    return [...inMemoryHoldings]
  },

  getHistory: async (timeframe: '1W' | '1M' | '1Y' | '3Y' | 'ALL') => {
    await new Promise((res) => setTimeout(res, 200))
    return getPortfolioHistory(timeframe)
  },

  executeTrade: async (trade: TradeOrderRequest): Promise<Holding[]> => {
    await new Promise((res) => setTimeout(res, 400))
    const existingIndex = inMemoryHoldings.findIndex(
      (h) => h.symbol.toUpperCase() === trade.symbol.toUpperCase()
    )

    const executionPrice = trade.limitPrice || 150.0

    if (trade.side === 'BUY') {
      if (existingIndex >= 0) {
        const h = inMemoryHoldings[existingIndex]
        const newShares = h.shares + trade.shares
        const newCost = (h.shares * h.avgCost + trade.shares * executionPrice) / newShares
        inMemoryHoldings[existingIndex] = {
          ...h,
          shares: newShares,
          avgCost: Number(newCost.toFixed(2)),
          marketValue: Number((newShares * h.currentPrice).toFixed(0)),
        }
      } else {
        const newHolding: Holding = {
          id: `hld_${trade.symbol.toLowerCase()}`,
          symbol: trade.symbol.toUpperCase(),
          name: `${trade.symbol.toUpperCase()} Asset`,
          assetClass: 'Equities',
          sector: 'Broad Market',
          shares: trade.shares,
          avgCost: executionPrice,
          currentPrice: executionPrice,
          marketValue: trade.shares * executionPrice,
          allocationPct: 3.5,
          dayChangePct: 0.5,
          totalGainDollar: 0,
          totalGainPct: 0,
          rating: 'Neutral',
        }
        inMemoryHoldings.unshift(newHolding)
      }
    } else {
      // SELL
      if (existingIndex >= 0) {
        const h = inMemoryHoldings[existingIndex]
        const remainingShares = Math.max(0, h.shares - trade.shares)
        if (remainingShares === 0) {
          inMemoryHoldings = inMemoryHoldings.filter((_, idx) => idx !== existingIndex)
        } else {
          inMemoryHoldings[existingIndex] = {
            ...h,
            shares: remainingShares,
            marketValue: Number((remainingShares * h.currentPrice).toFixed(0)),
          }
        }
      }
    }

    // Recalculate Total AUM
    const newTotalAum = inMemoryHoldings.reduce((sum, h) => sum + h.marketValue, 0)
    inMemorySummary = {
      ...inMemorySummary,
      totalAum: newTotalAum,
    }

    return [...inMemoryHoldings]
  },
}
