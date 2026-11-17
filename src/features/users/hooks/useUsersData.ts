import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const USER_QUERY_KEYS = {
  all: ['users'] as const,
}

export function useUsersData() {
  const queryClient = useQueryClient()

  const usersQuery = useQuery({
    queryKey: USER_QUERY_KEYS.all,
    queryFn: userService.getUsers,
  })

  const toggleStatusMutation = useMutation({
    mutationFn: (userId: string) => userService.toggleUserStatus(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all })
    },
  })

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    toggleUserStatus: toggleStatusMutation.mutateAsync,
    isToggling: toggleStatusMutation.isPending,
    refetch: usersQuery.refetch,
  }
}
