import { useNavigate, useRouter } from '@tanstack/react-router'
import { AlertCircle, ArrowLeft, Check, Star } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import type { DbGalleryCategory, DbGalleryImage } from '../../types/cms'
import { ImageUpload } from './ImageUpload'

interface GalleryImageFormProps {
  categories: DbGalleryCategory[]
  initial?: Partial<DbGalleryImage>
  imageId?: string
}

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block'
const inputBase =
  'w-full bg-white border border-gray-200 p-3 text-sm transition-colors focus:outline-none focus:border-[#0e1f1a] placeholder:text-gray-300'

function toDateInput(value: string | Date | null | undefined): string {
  if (!value) return ''
  return new Date(value).toISOString().split('T')[0]
}

export function GalleryImageForm({
  categories,
  initial,
  imageId,
}: GalleryImageFormProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const [url, setUrl] = useState<string | null>(initial?.url ?? null)
  const [caption, setCaption] = useState(initial?.caption ?? '')
  const [altText, setAltText] = useState(initial?.altText ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [published, setPublished] = useState(initial?.published ?? true)
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0))
  const [takenAt, setTakenAt] = useState(toDateInput(initial?.takenAt))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError('An image file is required')
      return
    }
    setError(null)
    setSaving(true)
    try {
      const body = {
        url,
        caption,
        altText: altText.trim() || null,
        description: description.trim() || null,
        categoryId: categoryId || null,
        featured,
        published,
        sortOrder: Number(sortOrder) || 0,
        takenAt: takenAt ? new Date(takenAt).toISOString() : null,
      }
      const res = await fetch(
        imageId ? `/api/gallery/${imageId}` : '/api/gallery',
        {
          method: imageId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Save failed')
      }
      await router.invalidate()
      navigate({ to: '/admin/gallery' })
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
          <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate({ to: '/admin/gallery' })}
                className="p-2 border border-gray-200 hover:border-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">
                  CMS / Gallery / {imageId ? 'Editor' : 'New Image'}
                </p>
                <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                  {caption || 'Untitled Image'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Visibility:
                </span>
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
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate({ to: '/admin/gallery' })}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black"
                >
                  Discard
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
                  {imageId ? 'Commit Changes' : 'Add To Gallery'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 py-12">
          {error && (
            <div className="mb-12 p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-[10px] text-red-600 font-bold uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-12">
              <ImageUpload
                value={url}
                onChange={setUrl}
                label="Gallery Asset"
              />

              <div className="space-y-2">
                <label className={labelClass}>Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                  maxLength={300}
                  className="w-full bg-transparent border-b border-gray-200 py-4 text-2xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-200"
                  placeholder="What is happening in this photo?"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Alt Text (accessibility, optional)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  maxLength={300}
                  className={inputBase}
                  placeholder="Defaults to the caption when left blank"
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={2000}
                  className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-medium leading-relaxed text-gray-600 focus:outline-none focus:border-black transition-colors"
                  placeholder="Longer context shown in the lightbox..."
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2 pb-8 border-b border-gray-100">
                <label className={labelClass}>Album / Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={cn(inputBase, 'font-medium')}
                >
                  <option value="">Uncategorised</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                      {category.published ? '' : ' (hidden)'}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 font-medium pt-1">
                  Categories become the filter tabs on the public gallery.
                </p>
              </div>

              <div className="space-y-2 pb-8 border-b border-gray-100">
                <label className={labelClass}>Date Taken (optional)</label>
                <input
                  type="date"
                  value={takenAt}
                  onChange={(e) => setTakenAt(e.target.value)}
                  className={cn(
                    inputBase,
                    'font-bold uppercase tracking-wider',
                  )}
                />
              </div>

              <div className="space-y-2 pb-8 border-b border-gray-100">
                <label className={labelClass}>Sort Order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={cn(inputBase, 'font-mono')}
                />
                <p className="text-[10px] text-gray-400 font-medium pt-1">
                  Lower numbers appear first; ties fall back to newest first.
                </p>
              </div>

              <div className="space-y-3">
                <label className={labelClass}>Highlight</label>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 w-full border text-[10px] font-bold uppercase tracking-widest transition-colors',
                    featured
                      ? 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-400 hover:border-black',
                  )}
                >
                  <Star
                    className={cn('w-4 h-4', featured && 'fill-amber-400')}
                  />
                  {featured ? 'Featured Image' : 'Mark As Featured'}
                </button>
                <p className="text-[10px] text-gray-400 font-medium">
                  Featured images are shown larger on the public gallery grid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
