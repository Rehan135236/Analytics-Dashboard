import { initialRecords } from './mockData'
import type { EnterpriseRecord } from '@/types/api.types'

let inMemoryRecords: EnterpriseRecord[] = [...initialRecords]

export const dataService = {
  getRecords: async (): Promise<EnterpriseRecord[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...inMemoryRecords]
  },

  createRecord: async (
    record: Omit<EnterpriseRecord, 'id' | 'lastUpdated'>
  ): Promise<EnterpriseRecord> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newRecord: EnterpriseRecord = {
      ...record,
      id: `rec_${Date.now()}`,
      lastUpdated: 'Just now',
    }
    inMemoryRecords.unshift(newRecord)
    return newRecord
  },

  updateRecord: async (
    id: string,
    updates: Partial<EnterpriseRecord>
  ): Promise<EnterpriseRecord> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = inMemoryRecords.findIndex((r) => r.id === id)
    if (index === -1) throw new Error('Record not found')

    inMemoryRecords[index] = {
      ...inMemoryRecords[index],
      ...updates,
      lastUpdated: 'Just now',
    }
    return inMemoryRecords[index]
  },

  deleteRecord: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    inMemoryRecords = inMemoryRecords.filter((r) => r.id !== id)
    return true
  },

  exportToCsv: (records: EnterpriseRecord[]): void => {
    const headers = ['ID', 'Name', 'Code', 'Category', 'Region', 'Status', 'Health Score', 'Throughput EPS']
    const rows = records.map((r) => [
      r.id,
      `"${r.name}"`,
      r.code,
      r.category,
      r.region,
      r.status,
      r.healthScore,
      r.throughputEps,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `nexus_records_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}

