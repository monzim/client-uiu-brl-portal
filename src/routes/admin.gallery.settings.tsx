import { createFileRoute, useRouter } from '@tanstack/react-router'
import { AlertCircle, Check, Settings } from 'lucide-react'
import React, { useState } from 'react'
import { GalleryAdminTabs } from '../components/admin/GalleryAdminTabs'
import { ImageUpload } from '../components/admin/ImageUpload'
import { cn } from '../lib/utils'
import { getGallerySettings } from '../server/gallery'

export const Route = createFileRoute('/admin/gallery/settings')({
  loader: () => getGallerySettings(),
  component: AdminGallerySettingsPage,
})

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block'
const inputBase =
  'w-full bg-white border border-gray-200 p-3 text-sm transition-colors focus:outline-none focus:border-[#0e1f1a] placeholder:text-gray-300'

function AdminGallerySettingsPage() {
  const initial = Route.useLoaderData()
  const router = useRouter()
  const [heroTitle, setHeroTitle] = useState(initial.heroTitle)
  const [heroSubtitle, setHeroSubtitle] = useState(initial.heroSubtitle ?? '')
  const [heroImage, setHeroImage] = useState<string | null>(initial.heroImage)
  const [introText, setIntroText] = useState(initial.introText ?? '')
  const [metaTitle, setMetaTitle] = useState(initial.metaTitle)
  const [metaDescription, setMetaDescription] = useState(
    initial.metaDescription,
  )
  const [showCategoryFilter, setShowCategoryFilter] = useState(
    initial.showCategoryFilter,
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaved(false)
    setSaving(true)
    try {
      const res = await fetch('/api/gallery/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroTitle,
          heroSubtitle: heroSubtitle.trim() || null,
          heroImage,
          introText: introText.trim() || null,
          metaTitle,
          metaDescription,
          showCategoryFilter,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Save failed')
      }
      await router.invalidate()
      setSaved(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Settings className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
            Content Management
          </p>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Gallery <span className="text-emerald-600">Page Settings</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
          Banner, headline and SEO metadata for the public gallery page.
        </p>
      </div>

      <GalleryAdminTabs />

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-10"
      >
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-[10px] text-red-600 font-bold uppercase tracking-widest">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        {saved && !error && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
            <Check className="w-4 h-4 shrink-0" />
            Settings saved
          </div>
        )}

        <ImageUpload
          value={heroImage}
          onChange={setHeroImage}
          label="Hero Banner"
        />

        <div className="space-y-2">
          <label className={labelClass}>Hero Headline</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            required
            maxLength={200}
            className={cn(inputBase, 'text-xl font-bold')}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Hero Sub-heading (optional)</label>
          <input
            type="text"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            maxLength={500}
            className={inputBase}
            placeholder="Shown above the headline"
          />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Intro Text (optional)</label>
          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            rows={3}
            maxLength={2000}
            className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-medium leading-relaxed text-gray-600 focus:outline-none focus:border-black transition-colors"
            placeholder="Paragraph shown above the image grid..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-gray-100">
          <div className="space-y-2 pt-8">
            <label className={labelClass}>SEO Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              required
              maxLength={200}
              className={inputBase}
            />
          </div>
          <div className="space-y-2 md:pt-8">
            <label className={labelClass}>Album Filter</label>
            <button
              type="button"
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className={cn(
                'w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors',
                showCategoryFilter
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-gray-200 text-gray-400 hover:border-black',
              )}
            >
              {showCategoryFilter ? 'Filter Visible' : 'Filter Hidden'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>SEO Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            required
            rows={3}
            maxLength={500}
            className="w-full bg-gray-50 border border-gray-200 p-4 text-sm font-medium leading-relaxed text-gray-600 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0e1f1a] disabled:opacity-50 transition-colors rounded-xl"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
