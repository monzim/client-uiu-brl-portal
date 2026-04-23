import React from 'react'
import { cn } from '../../lib/utils'

export interface Column<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 select-none",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-20 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                       <span className="text-2xl text-gray-300">∅</span>
                    </div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                      No entries found
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={String(row[keyField])}
                  className="group hover:bg-emerald-50/30 transition-colors duration-200"
                >
                  {columns.map((col) => (
                    <td 
                      key={col.key} 
                      className={cn(
                        "px-6 py-4 text-gray-600 font-medium transition-all duration-200 group-hover:text-gray-900",
                        col.className
                      )}
                    >
                      {col.render ? col.render(row) : (
                        <span className="truncate block max-w-xs">
                          {String(row[col.key] ?? '')}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
