import React, { useState, useMemo } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { DataTable } from '../components/admin/DataTable'
import { ConfirmationDialog } from '../components/admin/ConfirmationDialog'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  FileText,
} from 'lucide-react'
import { formatNewsDate } from '../types/cms'
import type { DbNews } from '../types/cms'
import { getAdminNewsList } from '../server/news'
import { cn } from '../lib/utils'

export const Route = createFileRoute('/admin/news/')({
  loader: () => getAdminNewsList(),
  component: AdminNewsPage,
})

function AdminNewsPage() {
  const initialData = Route.useLoaderData()
  const [data, setData] = useState(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null)
  const navigate = useNavigate()

  const filteredData = useMemo(() => {
    if (!searchQuery) return data
    const q = searchQuery.toLowerCase()
    return data.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.slug.toLowerCase().includes(q),
    )
  }, [data, searchQuery])

  const handleDelete = (slug: string) => {
    setSlugToDelete(slug)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!slugToDelete) return
    const res = await fetch(`/api/news/${slugToDelete}`, { method: 'DELETE' })
    if (res.ok) {
      setData((prev) => prev.filter((n) => n.slug !== slugToDelete))
    }
    setSlugToDelete(null)
  }

  const handleTogglePublish = async (item: DbNews) => {
    const res = await fetch(`/api/news/${item.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setData((prev) => prev.map((n) => (n.slug === item.slug ? updated : n)))
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
              Content Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            News & <span className="text-emerald-600">Activities</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
            Create, edit, and manage your laboratory news and updates shown on
            the main website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/news/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#0e1f1a] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add News Item
          </Link>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search news by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
        <div className="flex items-center gap-6 px-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              {data.length}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Published
            </span>
            <span className="text-lg font-bold text-gray-900">
              {data.filter((n) => n.published).length}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <DataTable
        data={filteredData}
        keyField="id"
        columns={[
          {
            key: 'title',
            header: 'News Information',
            className: 'w-[50%]',
            render: (row) => (
              <Link
                to={
                  row.published ? '/news/$newsId' : '/admin/news/$newsId/edit'
                }
                params={{ newsId: row.slug }}
                className="flex flex-col"
              >
                <span className="font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {row.title}
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-tighter">
                  /{row.slug}
                </span>
              </Link>
            ),
          },
          {
            key: 'date',
            header: 'Published Date',
            render: (row) => (
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold text-xs">
                  {formatNewsDate(row.date)}
                </span>
                <span className="text-[10px] text-gray-400">
                  Created: {new Date(row.createdAt).toLocaleDateString()}
                </span>
              </div>
            ),
          },
          {
            key: 'published',
            header: 'Status',
            render: (row) => (
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
                  row.published
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-gray-100 text-gray-500 border border-gray-200',
                )}
              >
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    row.published
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-gray-400',
                  )}
                />
                {row.published ? 'Published' : 'Draft'}
              </div>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (row) => (
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => handleTogglePublish(row)}
                  title={row.published ? 'Set as Draft' : 'Publish Now'}
                  className={cn(
                    'p-2 rounded-lg transition-all active:scale-90',
                    row.published
                      ? 'text-amber-500 hover:bg-amber-50'
                      : 'text-emerald-500 hover:bg-emerald-50',
                  )}
                >
                  {row.published ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
                <button
                  onClick={() =>
                    navigate({
                      to: '/admin/news/$newsId/edit',
                      params: { newsId: row.slug },
                    })
                  }
                  title="Edit News"
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                >
                  <Pencil className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => handleDelete(row.slug)}
                  title="Delete News"
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ),
          },
        ]}
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete News Item"
        description="Are you sure you want to delete this news item? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
}
