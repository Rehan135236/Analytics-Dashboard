import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dataService } from '@/services/dataService'
import type { EnterpriseRecord } from '@/types/api.types'

export const DATA_QUERY_KEYS = {
  all: ['records'] as const,
}

export function useEnterpriseRecords() {
  const queryClient = useQueryClient()

  const recordsQuery = useQuery({
    queryKey: DATA_QUERY_KEYS.all,
    queryFn: dataService.getRecords,
  })

  const createMutation = useMutation({
    mutationFn: (newRecord: Omit<EnterpriseRecord, 'id' | 'lastUpdated'>) =>
      dataService.createRecord(newRecord),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATA_QUERY_KEYS.all })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => dataService.deleteRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DATA_QUERY_KEYS.all })
    },
  })

  return {
    records: recordsQuery.data || [],
    isLoading: recordsQuery.isLoading,
    isError: recordsQuery.isError,
    createRecord: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteRecord: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    refetch: recordsQuery.refetch,
    exportCsv: () => dataService.exportToCsv(recordsQuery.data || []),
  }
}
