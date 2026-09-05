import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, Layers, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ConfirmationDialog } from '../components/admin/ConfirmationDialog'
import { DataTable } from '../components/admin/DataTable'
import { GalleryAdminTabs } from '../components/admin/GalleryAdminTabs'
import { cn } from '../lib/utils'
import { getAdminGallery } from '../server/gallery'
import type { DbGalleryCategory } from '../types/cms'

export const Route = createFileRoute('/admin/gallery/categories/')({
  loader: () => getAdminGallery(),
  component: AdminGalleryCategoriesPage,
})

function AdminGalleryCategoriesPage() {
  const { categories: initialCategories, images } = Route.useLoaderData()
  const [categories, setCategories] = useState(initialCategories)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const navigate = useNavigate()

  const countFor = (categoryId: string) =>
    images.filter((image) => image.categoryId === categoryId).length

  const handleTogglePublish = async (category: DbGalleryCategory) => {
    const res = await fetch(`/api/gallery/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !category.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setCategories((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      )
    }
  }

  const confirmDelete = async () => {
    if (!idToDelete) return
    const res = await fetch(`/api/gallery/categories/${idToDelete}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== idToDelete))
    }
    setIdToDelete(null)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
              Content Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Gallery <span className="text-emerald-600">Albums</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
            Albums become the filter tabs on the public gallery. Deleting one
            keeps its images — they move to “Uncategorised”.
          </p>
        </div>

        <Link
          to="/admin/gallery/categories/new"
          className="flex items-center gap-2 px-5 py-3 bg-[#0e1f1a] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Album
        </Link>
      </div>

      <GalleryAdminTabs />

      <DataTable
        data={categories}
        keyField="id"
        columns={[
          {
            key: 'name',
            header: 'Album',
            className: 'w-[45%]',
            render: (row) => (
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{row.name}</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-tighter">
                  /{row.slug}
                </span>
              </div>
            ),
          },
          {
            key: 'images',
            header: 'Images',
            render: (row) => (
              <span className="text-gray-900 font-semibold text-xs">
                {countFor(row.id)}
              </span>
            ),
          },
          {
            key: 'sortOrder',
            header: 'Order',
            render: (row) => (
              <span className="font-mono text-xs text-gray-500">
                {row.sortOrder}
              </span>
            ),
          },
          {
            key: 'published',
            header: 'Status',
            render: (row) => (
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest',
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
                {row.published ? 'Published' : 'Hidden'}
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
                  title={row.published ? 'Hide album' : 'Publish album'}
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
                      to: '/admin/gallery/categories/$categoryId/edit',
                      params: { categoryId: row.id },
                    })
                  }
                  title="Edit album"
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                >
                  <Pencil className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => {
                    setIdToDelete(row.id)
                    setIsDeleteDialogOpen(true)
                  }}
                  title="Delete album"
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
        title="Delete Album"
        description="The album is removed and its images become uncategorised. This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
}
