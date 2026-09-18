import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Images,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
} from 'lucide-react'
import React, { useMemo, useRef, useState } from 'react'
import { ConfirmationDialog } from '../components/admin/ConfirmationDialog'
import { GalleryAdminTabs } from '../components/admin/GalleryAdminTabs'
import { cn } from '../lib/utils'
import { getAdminGallery } from '../server/gallery'
import { compareGalleryImages, galleryImageAlt } from '../types/cms'
import type { DbGalleryImage } from '../types/cms'

const UNCATEGORISED = '__none__'

export const Route = createFileRoute('/admin/gallery/')({
  loader: () => getAdminGallery(),
  component: AdminGalleryPage,
})

function AdminGalleryPage() {
  const { images: initialImages, categories } = Route.useLoaderData()
  const [images, setImages] = useState<DbGalleryImage[]>(initialImages)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [uploading, setUploading] = useState<{
    done: number
    total: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const categoryNames = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories],
  )

  const filteredImages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return images.filter((image) => {
      if (categoryFilter === UNCATEGORISED && image.categoryId) return false
      if (
        categoryFilter !== 'ALL' &&
        categoryFilter !== UNCATEGORISED &&
        image.categoryId !== categoryFilter
      )
        return false
      if (!q) return true
      return (
        image.caption.toLowerCase().includes(q) ||
        (image.description ?? '').toLowerCase().includes(q)
      )
    })
  }, [images, searchQuery, categoryFilter])

  // Reordering rewrites `sortOrder` across the whole list, so it is only offered
  // on the unfiltered view where positions match what the public page shows.
  const canReorder = categoryFilter === 'ALL' && searchQuery.trim() === ''

  const patchImage = async (
    image: DbGalleryImage,
    body: Partial<DbGalleryImage>,
  ) => {
    const res = await fetch(`/api/gallery/${image.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.message ?? 'Update failed')
      return
    }
    const updated: DbGalleryImage = await res.json()
    setImages((prev) =>
      prev
        .map((i) => (i.id === updated.id ? updated : i))
        .sort(compareGalleryImages),
    )
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= images.length) return

    const previous = images
    const next = [...images]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    const reordered = next.map((image, i) => ({ ...image, sortOrder: i }))
    setImages(reordered)

    const res = await fetch('/api/gallery/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: reordered.map(({ id, sortOrder }) => ({ id, sortOrder })),
      }),
    })
    if (!res.ok) {
      setImages(previous)
      setError('Could not save the new order')
    }
  }

  const confirmDelete = async () => {
    if (!idToDelete) return
    const res = await fetch(`/api/gallery/${idToDelete}`, { method: 'DELETE' })
    if (res.ok) {
      setImages((prev) => prev.filter((i) => i.id !== idToDelete))
    } else {
      setError('Delete failed')
    }
    setIdToDelete(null)
  }

  // Bulk upload: push each file through /api/upload, then create every record in
  // a single POST so a partial failure does not leave half a batch behind.
  const handleBulkUpload = async (files: FileList) => {
    setError(null)
    const list = Array.from(files)
    setUploading({ done: 0, total: list.length })
    try {
      const uploaded: { url: string; caption: string }[] = []
      for (const file of list) {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(`${file.name}: ${data.message ?? 'upload failed'}`)
        }
        const { url } = await res.json()
        uploaded.push({
          url,
          caption: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
        })
        setUploading((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev))
      }

      const created = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          uploaded.map((item) => ({
            ...item,
            categoryId:
              categoryFilter === 'ALL' || categoryFilter === UNCATEGORISED
                ? null
                : categoryFilter,
          })),
        ),
      })
      if (!created.ok) {
        const data = await created.json().catch(() => ({}))
        throw new Error(data.message ?? 'Could not save uploaded images')
      }
      const rows: DbGalleryImage[] = await created.json()
      setImages((prev) => [...prev, ...rows].sort(compareGalleryImages))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Images className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
              Content Management
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Laboratory <span className="text-emerald-600">Gallery</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
            Upload, caption, group and reorder every photo shown on the public
            gallery page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => uploadInputRef.current?.click()}
            disabled={uploading !== null}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl hover:border-black disabled:opacity-50 transition-all active:scale-95"
          >
            <Upload className="w-4 h-4" />
            {uploading
              ? `Uploading ${uploading.done}/${uploading.total}`
              : 'Bulk Upload'}
          </button>
          <Link
            to="/admin/gallery/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#0e1f1a] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Image
          </Link>
        </div>
      </div>

      <GalleryAdminTabs />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-600 font-bold uppercase tracking-widest flex items-center justify-between gap-4">
          {error}
          <button onClick={() => setError(null)} className="underline">
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search images by caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-56 px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="ALL">All albums</option>
          <option value={UNCATEGORISED}>Uncategorised</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-6 px-4 whitespace-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              {images.length}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Live
            </span>
            <span className="text-lg font-bold text-gray-900">
              {images.filter((i) => i.published).length}
            </span>
          </div>
        </div>
      </div>

      {!canReorder && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Clear the search and album filter to reorder images.
        </p>
      )}

      {filteredImages.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
            <Images className="w-5 h-5 text-gray-300" />
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            No images found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredImages.map((image) => {
            const index = images.findIndex((i) => i.id === image.id)
            return (
              <div
                key={image.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <img
                    src={image.url}
                    alt={galleryImageAlt(image)}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest',
                        image.published
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-900/80 text-white',
                      )}
                    >
                      {image.published ? 'Live' : 'Hidden'}
                    </span>
                    {image.featured && (
                      <span className="px-2 py-1 rounded-full bg-amber-400 text-[9px] font-black uppercase tracking-widest text-amber-950">
                        Featured
                      </span>
                    )}
                  </div>
                  {canReorder && (
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        title="Move earlier"
                        className="p-1.5 rounded-lg bg-white/90 text-gray-700 hover:bg-white disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => move(index, 1)}
                        disabled={index === images.length - 1}
                        title="Move later"
                        className="p-1.5 rounded-lg bg-white/90 text-gray-700 hover:bg-white disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">
                      {image.caption}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                      {image.categoryId
                        ? (categoryNames.get(image.categoryId) ??
                          'Unknown album')
                        : 'Uncategorised'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          patchImage(image, { published: !image.published })
                        }
                        title={image.published ? 'Hide' : 'Publish'}
                        className={cn(
                          'p-2 rounded-lg transition-all active:scale-90',
                          image.published
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-emerald-500 hover:bg-emerald-50',
                        )}
                      >
                        {image.published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          patchImage(image, { featured: !image.featured })
                        }
                        title={
                          image.featured ? 'Remove highlight' : 'Mark featured'
                        }
                        className={cn(
                          'p-2 rounded-lg transition-all active:scale-90',
                          image.featured
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-gray-300 hover:text-amber-500 hover:bg-amber-50',
                        )}
                      >
                        <Star
                          className={cn(
                            'w-4 h-4',
                            image.featured && 'fill-amber-400',
                          )}
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          navigate({
                            to: '/admin/gallery/$imageId/edit',
                            params: { imageId: image.id },
                          })
                        }
                        title="Edit image"
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIdToDelete(image.id)
                          setIsDeleteDialogOpen(true)
                        }}
                        title="Delete image"
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <input
        ref={uploadInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files
          if (files && files.length > 0) handleBulkUpload(files)
          e.target.value = ''
        }}
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Gallery Image"
        description="This removes the image from the gallery and deletes the stored file. This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
}
