import React, { useState } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { RichTextEditor } from './RichTextEditor'
import { ImageUpload } from './ImageUpload'
import type { DbNews } from '../../types/cms'

interface NewsFormProps {
  initial?: Partial<DbNews>
  newsId?: string
}

export function NewsForm({ initial, newsId }: NewsFormProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? '')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const body = { title, date: new Date(date).toISOString(), description, content, image, published }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-bold">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors"
          placeholder="News title"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
          Short Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors resize-none"
          placeholder="Brief summary shown in listings"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-500">
          Full Content
        </label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <ImageUpload value={image} onChange={setImage} label="Featured Image" />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 accent-[#2a4d3f]"
        />
        <label
          htmlFor="published"
          className="text-sm font-bold text-gray-700 cursor-pointer"
        >
          Published (visible on public site)
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#0e1f1a] text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-[#2a4d3f] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : newsId ? 'Save Changes' : 'Create News'}
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: '/admin/news' })}
          className="px-6 py-3 border border-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-lg hover:border-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
