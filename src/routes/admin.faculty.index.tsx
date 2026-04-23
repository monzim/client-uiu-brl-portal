import React, { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { DataTable } from '../components/admin/DataTable'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { DbFaculty } from '../types/cms'
import { getAdminFacultyList } from '../server/faculty'

export const Route = createFileRoute('/admin/faculty/')({
  loader: () => getAdminFacultyList(),
  component: AdminFacultyPage,
})

function AdminFacultyPage() {
  const initialData = Route.useLoaderData()
  const [data, setData] = useState(initialData)
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this faculty member?')) return
    const res = await fetch(`/api/faculty/${id}`, { method: 'DELETE' })
    if (res.ok) setData((prev) => prev.filter((f) => f.id !== id))
  }

  const handleTogglePublish = async (item: DbFaculty) => {
    const res = await fetch(`/api/faculty/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setData((prev) => prev.map((f) => (f.id === item.id ? updated : f)))
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
            Faculty Members
          </h1>
        </div>
        <Link
          to="/admin/faculty/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0e1f1a] text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#2a4d3f] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Faculty
        </Link>
      </div>

      <DataTable
        data={data}
        keyField="id"
        columns={[
          {
            key: 'name',
            header: 'Name',
            render: (row) => (
              <span className="font-bold text-gray-800">{row.name}</span>
            ),
          },
          {
            key: 'designation',
            header: 'Designation',
            render: (row) => (
              <span className="text-gray-500">{row.designation}</span>
            ),
          },
          {
            key: 'email',
            header: 'Email',
            render: (row) => (
              <span className="text-gray-500 text-xs">{row.email}</span>
            ),
          },
          {
            key: 'published',
            header: 'Status',
            render: (row) => (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  row.published
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {row.published ? 'Visible' : 'Hidden'}
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
                  title={row.published ? 'Hide' : 'Show'}
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
                      to: '/admin/faculty/$facultyId/edit',
                      params: { facultyId: row.id },
                    })
                  }
                  className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
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
