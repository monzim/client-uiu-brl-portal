import { useNavigate, useRouter } from '@tanstack/react-router'
import { AlertCircle, ArrowLeft, Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { slugify } from '../../lib/slug'
import { cn } from '../../lib/utils'
import type { DbGalleryCategory } from '../../types/cms'

interface GalleryCategoryFormProps {
  initial?: Partial<DbGalleryCategory>
  categoryId?: string
}

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block'
const inputBase =
  'w-full bg-white border border-gray-200 p-3 text-sm transition-colors focus:outline-none focus:border-[#0e1f1a] placeholder:text-gray-300'

export function GalleryCategoryForm({
  initial,
  categoryId,
}: GalleryCategoryFormProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const [name, setName] = useState(initial?.name ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugEdited, setSlugEdited] = useState(!!initial?.slug)
  const [description, setDescription] = useState(initial?.description ?? '')
  const [published, setPublished] = useState(initial?.published ?? true)
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(name))
  }, [name, slugEdited])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const body = {
        name,
        slug: slug.replace(/^-+|-+$/g, ''),
        description: description.trim() || null,
        published,
        sortOrder: Number(sortOrder) || 0,
      }
      const res = await fetch(
        categoryId
          ? `/api/gallery/categories/${categoryId}`
          : '/api/gallery/categories',
        {
          method: categoryId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Save failed')
      }
      await router.invalidate()
      navigate({ to: '/admin/gallery/categories' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-200">
          <div className="max-w-[1000px] mx-auto px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate({ to: '/admin/gallery/categories' })}
                className="p-2 border border-gray-200 hover:border-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">
                  CMS / Gallery / {categoryId ? 'Edit Album' : 'New Album'}
                </p>
                <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                  {name || 'Untitled Album'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={cn(
                  'px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors',
                  published
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-black',
                )}
              >
                {published ? 'Live' : 'Hidden'}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0e1f1a] disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {categoryId ? 'Commit Changes' : 'Create Album'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-8 py-12 space-y-10">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-[10px] text-red-600 font-bold uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className={labelClass}>Album Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
              className="w-full bg-transparent border-b border-gray-200 py-4 text-3xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-100"
              placeholder="e.g. Lab Work"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={labelClass}>URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, '')
                      .replace(/-+/g, '-'),
                  )
                  setSlugEdited(true)
                }}
                required
                className={cn(inputBase, 'font-mono text-xs bg-gray-50/50')}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={cn(inputBase, 'font-mono')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={2000}
              className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-medium leading-relaxed text-gray-600 focus:outline-none focus:border-black transition-colors"
              placeholder="Shown under the album filter on the public page..."
            />
          </div>
        </div>
      </form>
    </div>
  )
}
