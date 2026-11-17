import { initialUsers } from './mockData'
import type { User } from '@/types/auth.types'

let inMemoryUsers: User[] = [...initialUsers]

export const userService = {
  getUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    return [...inMemoryUsers]
  },

  toggleUserStatus: async (userId: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const index = inMemoryUsers.findIndex((u) => u.id === userId)
    if (index === -1) throw new Error('User not found')

    inMemoryUsers[index] = {
      ...inMemoryUsers[index],
      isActive: !inMemoryUsers[index].isActive,
    }
    return inMemoryUsers[index]
  },
}
