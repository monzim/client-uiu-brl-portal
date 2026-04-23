import React, { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { DataTable } from '../components/admin/DataTable'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { formatNewsDate } from '../types/cms'
import type { DbNews } from '../types/cms'
import { getAdminNewsList } from '../server/news'

export const Route = createFileRoute('/admin/news/')({
  loader: () => getAdminNewsList(),
  component: AdminNewsPage,
})

function AdminNewsPage() {
  const initialData = Route.useLoaderData()
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this news item?')) return
    const res = await fetch(`/api/news/${slug}`, { method: 'DELETE' })
    if (res.ok) setData((prev) => prev.filter((n) => n.slug !== slug))
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Content
          </p>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            News & Activities
          </h1>
        </div>
        <Link
          to="/admin/news/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0e1f1a] text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#2a4d3f] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add News
        </Link>
      </div>

      <DataTable
        data={data}
        keyField="id"
        columns={[
          {
            key: 'title',
            header: 'Title',
            render: (row) => (
              <span className="font-bold text-gray-800 line-clamp-1">
                {row.title}
              </span>
            ),
          },
          {
            key: 'date',
            header: 'Date',
            render: (row) => (
              <span className="text-gray-500 whitespace-nowrap">
                {formatNewsDate(row.date)}
              </span>
            ),
          },
          {
            key: 'published',
            header: 'Status',
            render: (row) => (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  row.published
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {row.published ? 'Published' : 'Draft'}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(row)}
                  title={row.published ? 'Unpublish' : 'Publish'}
                  className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {row.published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() =>
                    navigate({
                      to: '/admin/news/$newsId/edit',
                      params: { newsId: row.slug },
                    })
                  }
                  className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(row.slug)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
