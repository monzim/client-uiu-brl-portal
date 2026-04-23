import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, Pencil, Plus, Search, Trash2, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ConfirmationDialog } from '../components/admin/ConfirmationDialog'
import { DataTable } from '../components/admin/DataTable'
import { cn } from '../lib/utils'
import { getAdminFacultyList } from '../server/faculty'
import type { DbFaculty } from '../types/cms'

export const Route = createFileRoute('/admin/faculty/')({
  loader: () => getAdminFacultyList(),
  component: AdminFacultyPage,
})

function AdminFacultyPage() {
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
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q),
    )
  }, [data, searchQuery])

  const handleDelete = (slug: string) => {
    setSlugToDelete(slug)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!slugToDelete) return
    const res = await fetch(`/api/faculty/${slugToDelete}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setData((prev) => prev.filter((f) => f.slug !== slugToDelete))
    }
    setSlugToDelete(null)
  }

  const handleTogglePublish = async (item: DbFaculty) => {
    const res = await fetch(`/api/faculty/${item.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setData((prev) => prev.map((f) => (f.slug === item.slug ? updated : f)))
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
              Team Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Faculty <span className="text-emerald-600">Members</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
            Manage the faculty directory, including profiles, research
            interests, and contact information.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/faculty/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#0e1f1a] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Faculty Member
          </Link>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, designation or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
        <div className="flex items-center gap-6 px-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Total Members
            </span>
            <span className="text-lg font-bold text-gray-900">
              {data.length}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Visible
            </span>
            <span className="text-lg font-bold text-gray-900">
              {data.filter((f) => f.published).length}
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
            key: 'name',
            header: 'Faculty Profile',
            className: 'w-[40%]',
            render: (row) => (
              <Link
                to={
                  row.published
                    ? '/faculty/$facultyId'
                    : '/admin/faculty/$facultyId/edit'
                }
                params={{ facultyId: row.slug }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200 overflow-hidden">
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {row.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                    {row.designation}
                  </span>
                </div>
              </Link>
            ),
          },
          {
            key: 'contact',
            header: 'Contact Info',
            render: (row) => (
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold text-xs lowercase italic">
                  {row.email}
                </span>
                {row.phone && (
                  <span className="text-[10px] text-gray-400">{row.phone}</span>
                )}
              </div>
            ),
          },
          {
            key: 'published',
            header: 'Visibility',
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
                    row.published ? 'bg-emerald-500' : 'bg-gray-400',
                  )}
                />
                {row.published ? 'Visible' : 'Hidden'}
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
                  title={row.published ? 'Hide Profile' : 'Show Profile'}
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
                      to: '/admin/faculty/$facultyId/edit',
                      params: { facultyId: row.slug },
                    })
                  }
                  title="Edit Faculty"
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                >
                  <Pencil className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => handleDelete(row.slug)}
                  title="Delete Faculty"
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
        title="Delete Faculty Member"
        description="Are you sure you want to delete this faculty member? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
}
