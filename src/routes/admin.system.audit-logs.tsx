import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Prisma } from '@prisma/client'
import { DataTable } from '../components/admin/DataTable'
import { getAuditLogs } from '../server/superuser'
import { cn } from '../lib/utils'

type AuditLogRow = {
  id: string
  action: string
  adminId: string
  admin: { email: string }
  meta: Prisma.JsonValue
  createdAt: string | Date
}

type AuditLogPage = {
  data: AuditLogRow[]
  total: number
  page: number
  totalPages: number
}

const ACTION_OPTIONS = [
  'news.create', 'news.update', 'news.delete',
  'faculty.create', 'faculty.update', 'faculty.delete',
  'auth.login', 'auth.logout',
  'user.create', 'user.block', 'user.unblock',
]

function actionColor(action: string): string {
  if (action.startsWith('news.')) return 'bg-blue-50 text-blue-700 border-blue-100'
  if (action.startsWith('faculty.')) return 'bg-purple-50 text-purple-700 border-purple-100'
  if (action.startsWith('auth.')) return 'bg-amber-50 text-amber-700 border-amber-100'
  if (action.startsWith('user.')) return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

export const Route = createFileRoute('/admin/system/audit-logs')({
  // @ts-expect-error createServerFn typed input
  loader: () => getAuditLogs({ data: { page: 1 } }),
  component: AdminAuditLogsPage,
})

function AdminAuditLogsPage() {
  const initial = Route.useLoaderData()
  const [page, setPage] = useState(1)
  const [action, setAction] = useState('')
  const [result, setResult] = useState<AuditLogPage>(initial)
  const [loading, setLoading] = useState(false)

  const fetchPage = useCallback(async (p: number, a: string) => {
    setLoading(true)
    try {
      const qs = new URLSearchParams({ page: String(p), limit: '50' })
      if (a) qs.set('action', a)
      const res = await fetch(`/api/superuser/audit-logs?${qs.toString()}`)
      if (res.ok) {
        const body: AuditLogPage = await res.json()
        setResult(body)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (page === 1 && action === '') return
    fetchPage(page, action)
  }, [page, action, fetchPage])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
            Administration
          </p>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Audit <span className="text-emerald-600">Logs</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
          Every admin action recorded. Filter by action type or browse the full trail.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 w-full">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
            Filter by action
          </label>
          <select
            value={action}
            onChange={(e) => {
              setAction(e.target.value)
              setPage(1)
            }}
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 font-medium"
          >
            <option value="">All actions</option>
            {ACTION_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-6 px-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</span>
            <span className="text-lg font-bold text-gray-900">{result.total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Page</span>
            <span className="text-lg font-bold text-gray-900">
              {result.page} / {result.totalPages}
            </span>
          </div>
        </div>
      </div>

      <DataTable
        data={result.data}
        keyField="id"
        columns={[
          {
            key: 'createdAt',
            header: 'Timestamp',
            render: (row) => (
              <span className="text-xs text-gray-600 font-mono">
                {new Date(row.createdAt).toLocaleString()}
              </span>
            ),
          },
          {
            key: 'action',
            header: 'Action',
            render: (row) => (
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border font-mono',
                  actionColor(row.action),
                )}
              >
                {row.action}
              </span>
            ),
          },
          {
            key: 'admin',
            header: 'Admin',
            render: (row) => (
              <span className="font-semibold text-gray-900">{row.admin.email}</span>
            ),
          },
          {
            key: 'meta',
            header: 'Details',
            render: (row) => (
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {Object.entries((row.meta ?? {}) as Record<string, Prisma.JsonValue>).map(([k, v]) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-mono text-gray-600"
                  >
                    <span className="text-gray-400">{k}:</span>
                    <span className="text-gray-800">{String(v)}</span>
                  </span>
                ))}
              </div>
            ),
          },
        ]}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={loading || result.page <= 1}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-xs text-gray-500 font-medium">
          Showing page {result.page} of {result.totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(result.totalPages, p + 1))}
          disabled={loading || result.page >= result.totalPages}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
