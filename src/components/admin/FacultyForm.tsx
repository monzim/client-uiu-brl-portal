import React, { useState, useEffect } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { RichTextEditor } from './RichTextEditor'
import { ImageUpload } from './ImageUpload'
import { Plus, X } from 'lucide-react'
import type { DbFaculty } from '../../types/cms'
import { slugify } from '../../lib/slug'

interface FacultyFormProps {
  initial?: Partial<DbFaculty>
  facultyId?: string
}

function StringArrayField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-gray-500">
        {label}
      </label>
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...value]
              next[i] = e.target.value
              onChange(next)
            }}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ''])}
        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" /> Add {label}
      </button>
    </div>
  )
}

function LinkArrayField({
  value,
  onChange,
}: {
  value: { label: string; url: string }[]
  onChange: (v: { label: string; url: string }[]) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-gray-500">
        Important Links
      </label>
      {value.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={link.label}
            onChange={(e) => {
              const next = [...value]
              next[i] = { ...next[i], label: e.target.value }
              onChange(next)
            }}
            className="w-1/3 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            placeholder="Label (e.g. Google Scholar)"
          />
          <input
            type="url"
            value={link.url}
            onChange={(e) => {
              const next = [...value]
              next[i] = { ...next[i], url: e.target.value }
              onChange(next)
            }}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            placeholder="https://..."
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { label: '', url: '' }])}
        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" /> Add Link
      </button>
    </div>
  )
}

export function FacultyForm({ initial, facultyId }: FacultyFormProps) {
  const navigate = useNavigate()
  const router = useRouter()

  const [name, setName] = useState(initial?.name ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugEdited, setSlugEdited] = useState(!!initial?.slug)
  const [designation, setDesignation] = useState(initial?.designation ?? '')
  const [department, setDepartment] = useState(
    initial?.department ?? 'Department of Pharmacy',
  )
  const [email, setEmail] = useState(initial?.email ?? '')
  const [room, setRoom] = useState(initial?.room ?? '')
  const [image, setImage] = useState<string | null>(initial?.image ?? null)
  const [coverImage, setCoverImage] = useState<string | null>(initial?.coverImage ?? null)
  const [profileDescription, setProfileDescription] = useState(
    initial?.profileDescription ?? '',
  )
  const [fullBio, setFullBio] = useState(initial?.fullBio ?? '')
  const [researchGeneral, setResearchGeneral] = useState(
    initial?.researchGeneral ?? '',
  )
  const [education, setEducation] = useState<string[]>(
    initial?.education ?? [],
  )
  const [positionHeld, setPositionHeld] = useState<string[]>(
    initial?.positionHeld ?? [],
  )
  const [honors, setHonors] = useState<string[]>(initial?.honors ?? [])
  const [researchInterests, setResearchInterests] = useState<string[]>(
    initial?.researchInterests ?? [],
  )
  const [researchProjects, setResearchProjects] = useState<string[]>(
    initial?.researchProjects ?? [],
  )
  const [publications, setPublications] = useState<string[]>(
    initial?.publications ?? [],
  )
  const [importantLinks, setImportantLinks] = useState<
    { label: string; url: string }[]
  >(initial?.importantLinks ?? [])
  const [published, setPublished] = useState(initial?.published ?? true)
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0)

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
        coverImage,
        designation,
        department,
        email,
        room: room || null,
        image,
        profileDescription,
        fullBio: fullBio || null,
        researchGeneral: researchGeneral || null,
        education,
        positionHeld,
        honors,
        researchInterests,
        researchProjects,
        publications,
        importantLinks,
        published,
        sortOrder,
      }
      const res = facultyId
        ? await fetch(`/api/faculty/${facultyId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch('/api/faculty', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Save failed')
      }
      await router.invalidate()
      navigate({ to: '/admin/faculty' })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const fieldClass =
    'w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors'
  const labelClass =
    'text-xs font-black uppercase tracking-widest text-gray-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-bold">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className={labelClass}>URL Slug</label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-medium shrink-0">/faculty/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-'))
              setSlugEdited(true)
            }}
            required
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 transition-colors font-mono"
            placeholder="auto-generated-from-name"
          />
          {slugEdited && !initial?.slug && (
            <button
              type="button"
              onClick={() => { setSlug(slugify(name)); setSlugEdited(false) }}
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors shrink-0"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className={labelClass}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={fieldClass}
            placeholder="Dr. Full Name"
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className={fieldClass}
            placeholder="Professor / Lecturer"
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className={fieldClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={fieldClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Room</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={fieldClass}
            placeholder="Room No 916, UIU"
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={fieldClass}
            min={0}
          />
        </div>
      </div>

      <ImageUpload value={image} onChange={setImage} label="Profile Photo" />

      <ImageUpload value={coverImage} onChange={setCoverImage} label="Cover / Banner Image" />

      <div className="space-y-1">
        <label className={labelClass}>Short Profile Description</label>
        <textarea
          value={profileDescription}
          onChange={(e) => setProfileDescription(e.target.value)}
          required
          rows={3}
          className={fieldClass + ' resize-none'}
          placeholder="Brief profile shown in cards"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Full Bio</label>
        <RichTextEditor value={fullBio} onChange={setFullBio} height={300} />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Research Overview</label>
        <textarea
          value={researchGeneral}
          onChange={(e) => setResearchGeneral(e.target.value)}
          rows={4}
          className={fieldClass + ' resize-none'}
          placeholder="General research description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StringArrayField
          label="Education"
          value={education}
          onChange={setEducation}
          placeholder="Degree: University, Country"
        />
        <StringArrayField
          label="Positions Held"
          value={positionHeld}
          onChange={setPositionHeld}
          placeholder="Title, Institution"
        />
        <StringArrayField
          label="Honors & Awards"
          value={honors}
          onChange={setHonors}
          placeholder="Award name"
        />
        <StringArrayField
          label="Research Interests"
          value={researchInterests}
          onChange={setResearchInterests}
          placeholder="Research topic"
        />
        <StringArrayField
          label="Research Projects"
          value={researchProjects}
          onChange={setResearchProjects}
          placeholder="Project title"
        />
        <StringArrayField
          label="Publications"
          value={publications}
          onChange={setPublications}
          placeholder="Full citation"
        />
      </div>

      <LinkArrayField value={importantLinks} onChange={setImportantLinks} />

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
          {saving
            ? 'Saving...'
            : facultyId
              ? 'Save Changes'
              : 'Create Faculty'}
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: '/admin/faculty' })}
          className="px-6 py-3 border border-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-lg hover:border-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
