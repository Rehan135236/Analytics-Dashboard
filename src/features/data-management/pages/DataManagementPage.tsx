import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Plus,
  Trash2,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { useEnterpriseRecords } from '../hooks/useEnterpriseRecords'
import type { EnterpriseRecord } from '@/types/api.types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/forms/Input'
import { Select } from '@/components/forms/Select'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/feedback/Modal'
import { Skeleton } from '@/components/ui/Skeleton'

export const DataManagementPage: React.FC = () => {
  const { records, isLoading, createRecord, deleteRecord, exportCsv } = useEnterpriseRecords()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false)

  // New Record Form State
  const [newRecordName, setNewRecordName] = useState('')
  const [newRecordCode, setNewRecordCode] = useState('')
  const [newRecordCategory, setNewRecordCategory] = useState<'Infrastructure' | 'Security' | 'Analytics' | 'Integration'>('Infrastructure')
  const [newRecordRegion, setNewRecordRegion] = useState<'US-East' | 'US-West' | 'EU-Central' | 'APAC-South'>('US-East')

  // Filter records by category before table
  const filteredData = useMemo(() => {
    if (categoryFilter === 'all') return records
    return records.filter((r) => r.category.toLowerCase() === categoryFilter.toLowerCase())
  }, [records, categoryFilter])

  // Table Column Definitions
  const columns = useMemo<ColumnDef<EnterpriseRecord>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button
            type="button"
            className="flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>Resource Name</span>
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-indigo-400" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <ArrowUpDown className="h-3 w-3 text-slate-600" />
            )}
          </button>
        ),
        cell: (info) => {
          const row = info.row.original
          return (
            <div>
              <p className="font-semibold text-slate-100 text-sm">{info.getValue<string>()}</p>
              <span className="font-mono text-[11px] text-slate-400">{row.code}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: (info) => (
          <span className="text-xs font-medium text-slate-300">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: (info) => (
          <span className="font-mono text-xs text-slate-400">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Health Status',
        cell: (info) => {
          const status = info.getValue<string>()
          switch (status) {
            case 'Healthy':
              return (
                <Badge variant="success" size="sm" dot>
                  Healthy
                </Badge>
              )
            case 'Degraded':
              return (
                <Badge variant="warning" size="sm" dot>
                  Degraded
                </Badge>
              )
            case 'Critical':
              return (
                <Badge variant="danger" size="sm" dot>
                  Critical
                </Badge>
              )
            default:
              return (
                <Badge variant="default" size="sm">
                  Maintenance
                </Badge>
              )
          }
        },
      },
      {
        accessorKey: 'healthScore',
        header: ({ column }) => (
          <button
            type="button"
            className="flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>Score</span>
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-indigo-400" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <ArrowUpDown className="h-3 w-3 text-slate-600" />
            )}
          </button>
        ),
        cell: (info) => (
          <span className="font-mono text-xs font-semibold text-slate-200">
            {info.getValue<number>()}%
          </span>
        ),
      },
      {
        accessorKey: 'throughputEps',
        header: 'Throughput',
        cell: (info) => (
          <span className="font-mono text-xs text-indigo-300">
            {info.getValue<number>().toLocaleString()} eps
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="text-right block">Actions</span>,
        cell: (info) => {
          const id = info.row.original.id
          return (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-1.5 h-8 w-8"
                onClick={() => deleteRecord(id)}
                title="Delete record"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        },
      },
    ],
    [deleteRecord]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  })

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRecordName || !newRecordCode) return

    await createRecord({
      name: newRecordName,
      code: newRecordCode,
      category: newRecordCategory,
      region: newRecordRegion,
      status: 'Healthy',
      healthScore: 99.5,
      throughputEps: Math.floor(Math.random() * 60000) + 10000,
    })

    setNewRecordName('')
    setNewRecordCode('')
    setIsAddModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Data Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise resource catalogue with multi-column sorting, search, and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={exportCsv}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Record
          </Button>
        </div>
      </div>

      {/* Table Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Global search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search records by name, code..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'infrastructure', label: 'Infrastructure' },
              { value: 'security', label: 'Security' },
              { value: 'analytics', label: 'Analytics' },
              { value: 'integration', label: 'Integration' },
            ]}
            className="w-40"
          />
        </div>

        {/* Column Visibility Toggle Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsColumnPickerOpen((prev) => !prev)}
            leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
          >
            Columns
          </Button>
        </div>
      </div>

      {/* Column Visibility Dropdown */}
      {isColumnPickerOpen && (
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap gap-4 text-xs">
          {table.getAllLeafColumns().map((column) => {
            if (column.id === 'actions') return null
            return (
              <label key={column.id} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="capitalize">{column.id}</span>
              </label>
            )
          })}
        </div>
      )}

      {/* Table Container */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-3 px-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length} className="p-4">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                    No enterprise records match your search criteria.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Page <strong className="text-white font-mono">{table.getState().pagination.pageIndex + 1}</strong> of{' '}
              <strong className="text-white font-mono">{Math.max(1, table.getPageCount())}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span>Total: {records.length} records</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Record Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision Enterprise Record"
        description="Register a new telemetry cluster or integration node."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddSubmit}>
              Create Resource
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Resource Name"
            placeholder="e.g. Asia Event Hub Gateway"
            value={newRecordName}
            onChange={(e) => setNewRecordName(e.target.value)}
            required
          />
          <Input
            label="Resource Code"
            placeholder="e.g. HUB-EVT-APAC-01"
            value={newRecordCode}
            onChange={(e) => setNewRecordCode(e.target.value)}
            required
          />
          <Select
            label="Category"
            value={newRecordCategory}
            onChange={(e) => setNewRecordCategory(e.target.value as any)}
            options={[
              { value: 'Infrastructure', label: 'Infrastructure' },
              { value: 'Security', label: 'Security' },
              { value: 'Analytics', label: 'Analytics' },
              { value: 'Integration', label: 'Integration' },
            ]}
          />
          <Select
            label="Deployment Region"
            value={newRecordRegion}
            onChange={(e) => setNewRecordRegion(e.target.value as any)}
            options={[
              { value: 'US-East', label: 'US-East (N. Virginia)' },
              { value: 'US-West', label: 'US-West (Oregon)' },
              { value: 'EU-Central', label: 'EU-Central (Frankfurt)' },
              { value: 'APAC-South', label: 'APAC-South (Mumbai)' },
            ]}
          />
        </form>
      </Modal>
    </div>
  )
}
