import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioService } from '@/services/portfolioService'
import type { TradeOrderRequest } from '@/types/investment.types'

export const PORTFOLIO_QUERY_KEYS = {
  summary: ['portfolio', 'summary'] as const,
  holdings: ['portfolio', 'holdings'] as const,
  history: (timeframe: string) => ['portfolio', 'history', timeframe] as const,
}

export function usePortfolioData(timeframe: '1W' | '1M' | '1Y' | '3Y' | 'ALL' = '1Y') {
  const queryClient = useQueryClient()

  const summaryQuery = useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.summary,
    queryFn: portfolioService.getSummary,
  })

  const holdingsQuery = useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.holdings,
    queryFn: portfolioService.getHoldings,
  })

  const historyQuery = useQuery({
    queryKey: PORTFOLIO_QUERY_KEYS.history(timeframe),
    queryFn: () => portfolioService.getHistory(timeframe),
  })

  const tradeMutation = useMutation({
    mutationFn: (trade: TradeOrderRequest) => portfolioService.executeTrade(trade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })

  return {
    summary: summaryQuery.data,
    isLoadingSummary: summaryQuery.isLoading,
    holdings: holdingsQuery.data || [],
    isLoadingHoldings: holdingsQuery.isLoading,
    history: historyQuery.data || [],
    isLoadingHistory: historyQuery.isLoading,
    executeTrade: tradeMutation.mutateAsync,
    isExecutingTrade: tradeMutation.isPending,
    refetchAll: () => {
      summaryQuery.refetch()
      holdingsQuery.refetch()
      historyQuery.refetch()
    },
  }
}
