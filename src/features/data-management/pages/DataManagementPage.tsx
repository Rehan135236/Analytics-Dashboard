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
import { initialHoldings } from '@/services/investmentData'
import type { Holding, AssetClass } from '@/types/investment.types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/forms/Input'
import { Select } from '@/components/forms/Select'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/feedback/Modal'

export const DataManagementPage: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [assetClassFilter, setAssetClassFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false)

  // New Position Form State
  const [newSymbol, setNewSymbol] = useState('')
  const [newName, setNewName] = useState('')
  const [newClass, setNewClass] = useState<AssetClass>('Equities')
  const [newShares, setNewShares] = useState(100)
  const [newPrice, setNewPrice] = useState(150)

  // Filter records by asset class before table
  const filteredData = useMemo(() => {
    if (assetClassFilter === 'all') return holdings
    return holdings.filter((h) => h.assetClass.toLowerCase() === assetClassFilter.toLowerCase())
  }, [holdings, assetClassFilter])

  // Table Column Definitions
  const columns = useMemo<ColumnDef<Holding>[]>(
    () => [
      {
        accessorKey: 'symbol',
        header: ({ column }) => (
          <button
            type="button"
            className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>Ticker / Asset</span>
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <ArrowUpDown className="h-3 w-3 text-slate-400" />
            )}
          </button>
        ),
        cell: (info) => {
          const row = info.row.original
          return (
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                  {row.symbol}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white text-xs">{row.name}</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">{row.sector}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        cell: (info) => (
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'allocationPct',
        header: ({ column }) => (
          <button
            type="button"
            className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>Weight</span>
            <ArrowUpDown className="h-3 w-3 text-slate-400" />
          </button>
        ),
        cell: (info) => (
          <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
            {info.getValue<number>()}%
          </span>
        ),
      },
      {
        accessorKey: 'shares',
        header: 'Shares / Qty',
        cell: (info) => (
          <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
            {info.getValue<number>().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'currentPrice',
        header: 'Market Price',
        cell: (info) => (
          <span className="font-mono font-semibold text-xs text-slate-900 dark:text-white">
            ${info.getValue<number>().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'marketValue',
        header: ({ column }) => (
          <button
            type="button"
            className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>Market Value</span>
            <ArrowUpDown className="h-3 w-3 text-slate-400" />
          </button>
        ),
        cell: (info) => (
          <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
            ${info.getValue<number>().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'dayChangePct',
        header: '24h Change',
        cell: (info) => {
          const val = info.getValue<number>()
          const isPos = val >= 0
          return (
            <Badge variant={isPos ? 'success' : 'danger'} size="sm">
              {isPos ? '+' : ''}
              {val}%
            </Badge>
          )
        },
      },
      {
        accessorKey: 'totalGainDollar',
        header: 'Total P&L',
        cell: (info) => {
          const row = info.row.original
          return (
            <div className="font-mono text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                +${row.totalGainDollar.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">+{row.totalGainPct}%</span>
            </div>
          )
        },
      },
      {
        id: 'actions',
        header: () => <span className="text-right block">Actions</span>,
        cell: (info) => {
          const id = info.row.original.id
          return (
            <div className="flex justify-end gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 h-8 w-8"
                onClick={() => setHoldings((prev) => prev.filter((h) => h.id !== id))}
                title="Liquidate position"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        },
      },
    ],
    []
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
        pageSize: 7,
      },
    },
  })

  const handleExportCsv = () => {
    const headers = ['Symbol', 'Name', 'Asset Class', 'Weight %', 'Shares', 'Current Price', 'Market Value', 'Total P&L']
    const rows = holdings.map((h) => [
      h.symbol,
      `"${h.name}"`,
      h.assetClass,
      h.allocationPct,
      h.shares,
      h.currentPrice,
      h.marketValue,
      h.totalGainDollar,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `nexus_portfolio_holdings_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAddPosition = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSymbol || !newName) return

    const newH: Holding = {
      id: `hld_${newSymbol.toLowerCase()}_${Date.now()}`,
      symbol: newSymbol.toUpperCase(),
      name: newName,
      assetClass: newClass,
      sector: 'General Portfolio',
      shares: Number(newShares),
      avgCost: Number(newPrice),
      currentPrice: Number(newPrice),
      marketValue: Number(newShares) * Number(newPrice),
      allocationPct: 2.5,
      dayChangePct: 0.45,
      totalGainDollar: 0,
      totalGainPct: 0,
      rating: 'Neutral',
    }

    setHoldings((prev) => [newH, ...prev])
    setNewSymbol('')
    setNewName('')
    setIsAddModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Holdings & Position Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-asset positions with TanStack Table sorting, dynamic filtering, and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={handleExportCsv}
          >
            Export Holdings CSV
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Position
          </Button>
        </div>
      </div>

      {/* Table Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Global search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search ticker, company, or sector..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
            />
          </div>

          {/* Asset Class Filter */}
          <Select
            value={assetClassFilter}
            onChange={(e) => setAssetClassFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Asset Classes' },
              { value: 'equities', label: 'Equities' },
              { value: 'fixed income', label: 'Fixed Income' },
              { value: 'alternatives', label: 'Alternatives / Gold' },
              { value: 'crypto', label: 'Digital Assets (Crypto)' },
              { value: 'cash', label: 'Cash & Short-Term' },
            ]}
            className="w-44"
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
        <div className="p-3 rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex flex-wrap gap-4 text-xs shadow-sm">
          {table.getAllLeafColumns().map((column) => {
            if (column.id === 'actions') return null
            return (
              <label key={column.id} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  className="rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950"
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
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider dark:bg-slate-950/80 dark:border-slate-800 dark:text-slate-400">
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900/30">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-slate-500">
                    No holdings match your search criteria.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Page <strong className="text-slate-900 dark:text-white font-mono">{table.getState().pagination.pageIndex + 1}</strong> of{' '}
              <strong className="text-slate-900 dark:text-white font-mono">{Math.max(1, table.getPageCount())}</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>Total: {holdings.length} holdings</span>
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

      {/* Add Position Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Asset to Portfolio"
        description="Register a new equity, fixed income, or alternative position."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddPosition}>
              Add Position
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddPosition} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ticker Symbol"
              placeholder="e.g. GOOGL"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              required
            />
            <Input
              label="Asset / Company Name"
              placeholder="e.g. Alphabet Inc."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Asset Class"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value as any)}
              options={[
                { value: 'Equities', label: 'Equities' },
                { value: 'Fixed Income', label: 'Fixed Income' },
                { value: 'Alternatives', label: 'Alternatives' },
                { value: 'Crypto', label: 'Crypto' },
                { value: 'Cash', label: 'Cash' },
              ]}
            />
            <Input
              label="Shares / Units"
              type="number"
              value={newShares}
              onChange={(e) => setNewShares(Number(e.target.value))}
              required
            />
          </div>

          <Input
            label="Entry / Market Price ($)"
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            required
          />
        </form>
      </Modal>
    </div>
  )
}
