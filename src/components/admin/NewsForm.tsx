import React, { useState, useEffect } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { RichTextEditor } from './RichTextEditor'
import { ImageUpload } from './ImageUpload'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'
import type { DbNews } from '../../types/cms'
import { slugify } from '../../lib/slug'
import { cn } from '../../lib/utils'

interface NewsFormProps {
  initial?: Partial<DbNews>
  newsId?: string
}

export function NewsForm({ initial, newsId }: NewsFormProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugEdited, setSlugEdited] = useState(!!initial?.slug)
  const [date, setDate] = useState(
    initial?.date
      ? new Date(initial.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  )
  const [description, setDescription] = useState(initial?.description ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [image, setImage] = useState<string | null>(initial?.image ?? null)
  const [published, setPublished] = useState(initial?.published ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(title))
  }, [title, slugEdited])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const body = { title, slug: slug.replace(/^-+|-+$/g, ''), date: new Date(date).toISOString(), description, content, image, published }
      const res = newsId
        ? await fetch(`/api/news/${newsId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Save failed')
      }
      await router.invalidate()
      navigate({ to: '/admin/news' })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block"
  const inputBase = "w-full bg-white border border-gray-200 p-3 text-sm transition-colors focus:outline-none focus:border-[#0e1f1a] placeholder:text-gray-300"

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleSubmit}>
        {/* Flat Professional Header */}
        <div className="border-b border-gray-200">
           <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => navigate({ to: '/admin/news' })}
                  className="p-2 border border-gray-200 hover:border-black transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">
                    CMS / News / {newsId ? 'Editor' : 'Composer'}
                  </p>
                  <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                    {title || 'Untitled Publication'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Visibility:</span>
                    <button
                      type="button"
                      onClick={() => setPublished(!published)}
                      className={cn(
                        "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors",
                        published 
                          ? "bg-emerald-600 border-emerald-600 text-white" 
                          : "bg-white border-gray-200 text-gray-400 hover:border-black"
                      )}
                    >
                      {published ? 'Live' : 'Hidden'}
                    </button>
                 </div>
                 
                 <div className="h-8 w-px bg-gray-200" />

                 <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigate({ to: '/admin/news' })}
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
                      {newsId ? 'Commit Changes' : 'Publish Entry'}
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
            {/* Primary Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-2">
                <label className={labelClass}>Main Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-4 text-4xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-100"
                  placeholder="The publication headline..."
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Short Summary</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-medium leading-relaxed text-gray-600 focus:outline-none focus:border-black transition-colors"
                  placeholder="Summary for preview cards..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <label className={labelClass + " mb-0"}>Full Content Body</label>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Markdown Enabled</span>
                </div>
                <div className="border border-gray-200 bg-white">
                  <RichTextEditor id="news-content-editor" value={content} onChange={setContent} height={700} />
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-12">
               <div className="space-y-8">
                  <div className="space-y-2 pb-8 border-b border-gray-100">
                    <label className={labelClass}>Release Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className={cn(inputBase, "font-bold text-black uppercase tracking-wider")}
                    />
                  </div>

                  <div className="space-y-2 pb-8 border-b border-gray-100">
                    <label className={labelClass}>URL Slug / ID</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 font-mono text-xs">/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => {
                          setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-'))
                          setSlugEdited(true)
                        }}
                        required
                        className={cn(inputBase, "font-mono text-xs text-gray-400 bg-gray-50/50")}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <ImageUpload 
                      value={image} 
                      onChange={setImage} 
                      label="Hero Asset" 
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
