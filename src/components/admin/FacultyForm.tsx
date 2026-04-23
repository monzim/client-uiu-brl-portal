import { useNavigate, useRouter } from '@tanstack/react-router'
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Check,
  ChevronDown,
  GraduationCap,
  Microscope,
  Plus,
  Trash2,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { slugify } from '../../lib/slug'
import { cn } from '../../lib/utils'
import type { DbFaculty, Publication, PublicationType } from '../../types/cms'
import { ConfirmationDialog } from './ConfirmationDialog'
import { ImageUpload } from './ImageUpload'
import { RichTextEditor } from './RichTextEditor'

interface FacultyFormProps {
  initial?: Partial<DbFaculty>
  facultyId?: string
}

const PUBLICATION_TYPES: { value: PublicationType; label: string }[] = [
  { value: 'journal', label: 'Journal Article' },
  { value: 'conference', label: 'Conference Paper' },
  { value: 'book', label: 'Book / Book Chapter' },
  { value: 'thesis', label: 'Thesis / Dissertation' },
  { value: 'other', label: 'Other' },
]

function emptyPublication(): Publication {
  return {
    title: '',
    authors: '',
    venue: '',
    year: new Date().getFullYear().toString(),
    type: 'journal',
    doi: '',
    url: '',
    note: '',
  }
}

const labelClass =
  'text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block'
const inputBase =
  'w-full bg-white border border-gray-200 p-3 text-sm transition-colors focus:outline-none focus:border-black placeholder:text-gray-200 font-medium'

function PublicationField({
  value,
  onChange,
}: {
  value: Publication[]
  onChange: (v: Publication[]) => void
}) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [isRemoveOpen, setIsRemoveOpen] = useState(false)
  const [removeIndex, setRemoveIndex] = useState<number | null>(null)

  const update = (i: number, patch: Partial<Publication>) => {
    const next = [...value]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }

  const remove = (i: number) => {
    setRemoveIndex(i)
    setIsRemoveOpen(true)
  }

  const confirmRemove = () => {
    if (removeIndex === null) return
    onChange(value.filter((_, j) => j !== removeIndex))
    setExpanded(null)
    setRemoveIndex(null)
  }

  const add = () => {
    const next = [...value, emptyPublication()]
    onChange(next)
    setExpanded(next.length - 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-black" />
          <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-black">
            Research Portfolio ({value.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={add}
          className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#0e1f1a] transition-colors cursor-pointer"
        >
          Add Publication
        </button>
      </div>

      <div className="border border-gray-200 divide-y divide-gray-200 bg-white">
        {value.map((pub, i) => (
          <div key={i} className="flex flex-col">
            <div
              className={cn(
                'flex items-center gap-4 px-6 py-4 transition-colors',
                expanded === i ? 'bg-gray-50' : 'hover:bg-gray-50/50',
              )}
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex-1 flex items-center gap-4 text-left min-w-0 group cursor-pointer"
              >
                <span className="text-[10px] font-bold text-gray-300 tabular-nums">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      'block text-sm font-bold truncate transition-colors uppercase tracking-tight',
                      expanded === i ? 'text-black' : 'text-gray-500',
                    )}
                  >
                    {pub.title || 'Untitled Research Entry'}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {pub.year || '----'} • {pub.type.toUpperCase()} •{' '}
                    {pub.venue || 'N/A'}
                  </span>
                </div>
              </button>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-gray-300 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-300 transition-transform duration-300',
                    expanded === i ? 'rotate-180' : '',
                  )}
                />
              </div>
            </div>

            {expanded === i && (
              <div className="px-10 py-10 border-t border-gray-100 bg-white space-y-10">
                <div className="space-y-2">
                  <label className={labelClass}>Document Title</label>
                  <textarea
                    value={pub.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                    className={cn(
                      inputBase,
                      'h-24 resize-none font-bold text-base bg-gray-50/30',
                    )}
                    placeholder="The full title of the publication"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className={labelClass}>Authors List</label>
                    <input
                      type="text"
                      value={pub.authors}
                      onChange={(e) => update(i, { authors: e.target.value })}
                      className={inputBase}
                      placeholder="e.g. John Doe, Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Publication Type</label>
                    <select
                      value={pub.type}
                      onChange={(e) =>
                        update(i, { type: e.target.value as PublicationType })
                      }
                      className={inputBase}
                    >
                      {PUBLICATION_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Venue / Journal / Publisher
                    </label>
                    <input
                      type="text"
                      value={pub.venue}
                      onChange={(e) => update(i, { venue: e.target.value })}
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Year</label>
                    <input
                      type="text"
                      value={pub.year}
                      onChange={(e) => update(i, { year: e.target.value })}
                      className={inputBase}
                      maxLength={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Digital Object Identifier (DOI)
                    </label>
                    <input
                      type="text"
                      value={pub.doi ?? ''}
                      onChange={(e) => update(i, { doi: e.target.value })}
                      className={cn(inputBase, 'font-mono text-xs')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Resource URL</label>
                    <input
                      type="url"
                      value={pub.url ?? ''}
                      onChange={(e) => update(i, { url: e.target.value })}
                      className={cn(inputBase, 'font-mono text-xs')}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmationDialog
        open={isRemoveOpen}
        onOpenChange={setIsRemoveOpen}
        title="Remove Publication"
        description="Are you sure you want to remove this publication? This action will take effect only after you save the form."
        onConfirm={confirmRemove}
        confirmText="Remove"
        variant="danger"
      />
    </div>
  )
}

function StringArrayField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  icon?: React.ElementType
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-black" />}
          <label className={labelClass + ' mb-0'}>{label}</label>
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, ''])}
          className="text-black hover:text-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
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
              className={inputBase}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="px-3 text-gray-300 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {value.length === 0 && (
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic py-2">
            No entries added
          </p>
        )}
      </div>
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
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [room, setRoom] = useState(initial?.room ?? '')
  const [image, setImage] = useState<string | null>(initial?.image ?? null)
  const [coverImage, setCoverImage] = useState<string | null>(
    initial?.coverImage ?? null,
  )
  const [profileDescription, setProfileDescription] = useState(
    initial?.profileDescription ?? '',
  )
  const [fullBio, setFullBio] = useState(initial?.fullBio ?? '')
  const [researchGeneral, setResearchGeneral] = useState(
    initial?.researchGeneral ?? '',
  )
  const [education, setEducation] = useState<string[]>(initial?.education ?? [])
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
  const [publications, setPublications] = useState<Publication[]>(
    Array.isArray(initial?.publications)
      ? (initial?.publications as Publication[])
      : [],
  )
  const [importantLinks, setImportantLinks] = useState<
    { label: string; url: string }[]
  >(Array.isArray(initial?.importantLinks) ? initial.importantLinks : [])
  const [published, setPublished] = useState(initial?.published ?? true)
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(name))
  }, [name, slugEdited])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
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
        phone: phone || null,
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

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleSubmit}>
        {/* Flat Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-[1500px] mx-auto px-8 py-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate({ to: '/admin/faculty' })}
                className="p-2 border border-gray-200 hover:border-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-0.5">
                  Faculty Directory / {facultyId ? 'EDITOR' : 'NEW PROFILE'}
                </p>
                <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
                  {name || 'Untitled Faculty'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Public Status:
                </span>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={cn(
                    'px-6 py-2 text-[10px] font-bold uppercase tracking-widest border transition-colors',
                    published
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-gray-200 text-gray-400 hover:border-black',
                  )}
                >
                  {published ? 'Published' : 'Hidden'}
                </button>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate({ to: '/admin/faculty' })}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-10 py-3.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0e1f1a] disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {facultyId ? 'Update Record' : 'Create Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-8 py-16">
          {error && (
            <div className="mb-12 p-5 border-l-4 border-red-600 bg-red-50 flex items-center gap-4 text-[10px] text-red-600 font-bold uppercase tracking-widest">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Primary content area */}
            <div className="lg:col-span-8 space-y-20">
              {/* Identity Section */}
              <div className="space-y-12">
                <div className="space-y-2">
                  <label className={labelClass}>Complete Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent border-b-2 border-gray-100 p-0 py-4 text-4xl font-bold text-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-100"
                    placeholder="e.g. Dr. Jane Smith"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  <div className="space-y-2">
                    <label className={labelClass}>Official Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      className={cn(inputBase, 'bg-gray-50/50 border-gray-100')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Departmental Unit</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className={cn(inputBase, 'bg-gray-50/50 border-gray-100')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Contact Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={cn(inputBase, 'bg-gray-50/50 border-gray-100')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Contact Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={cn(inputBase, 'bg-gray-50/50 border-gray-100')}
                      placeholder="e.g. +880 1234 567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Office Room</label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className={cn(inputBase, 'bg-gray-50/50 border-gray-100')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>URL Identity</label>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-300 font-mono text-xs">
                        /f/
                      </span>
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
                        className={cn(
                          inputBase,
                          'pl-8 font-mono text-xs bg-gray-50/50 border-gray-100',
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Listing Sort Index</label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(Number(e.target.value))}
                      className={cn(
                        inputBase,
                        'font-bold bg-gray-50/50 border-gray-100',
                      )}
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-12">
                <div className="space-y-3">
                  <label className={labelClass}>Quick Excerpt</label>
                  <textarea
                    value={profileDescription}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    required
                    rows={4}
                    className={cn(
                      inputBase,
                      'resize-none leading-relaxed text-base border-gray-100',
                    )}
                    placeholder="Short introductory paragraph..."
                  />
                </div>

                <div className="space-y-4">
                  <label className={labelClass}>
                    Professional Narrative / Bio
                  </label>
                  <div className="border-2 border-gray-100">
                    <RichTextEditor
                      id="faculty-bio-editor"
                      value={fullBio}
                      onChange={setFullBio}
                      height={450}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className={labelClass}>Research Philosophy</label>
                  <div className="border-2 border-gray-100">
                    <RichTextEditor
                      id="faculty-research-editor"
                      value={researchGeneral}
                      onChange={setResearchGeneral}
                      height={350}
                    />
                  </div>
                </div>
              </div>

              {/* Metadata Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <StringArrayField
                  label="Academic History"
                  value={education}
                  onChange={setEducation}
                  placeholder="Degree, Institution"
                  icon={GraduationCap}
                />
                <StringArrayField
                  label="Professional Tenure"
                  value={positionHeld}
                  onChange={setPositionHeld}
                  placeholder="Role, Organization"
                  icon={Briefcase}
                />
                <StringArrayField
                  label="Honors & Recognitions"
                  value={honors}
                  onChange={setHonors}
                  placeholder="Award name"
                  icon={Award}
                />
                <StringArrayField
                  label="Research Focus"
                  value={researchInterests}
                  onChange={setResearchInterests}
                  placeholder="Topic"
                  icon={Microscope}
                />
              </div>

              <PublicationField
                value={publications}
                onChange={setPublications}
              />
            </div>

            {/* Sidebar content area */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-12">
                <div className="space-y-4 pb-12 border-b border-gray-100">
                  <ImageUpload
                    value={image}
                    onChange={setImage}
                    label="Portait Shot"
                  />
                </div>
                <div className="space-y-4 pb-12 border-b border-gray-100">
                  <ImageUpload
                    value={coverImage}
                    onChange={setCoverImage}
                    label="Banner Asset"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <label className={labelClass + ' mb-0'}>
                      Institutional Links
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setImportantLinks([
                          ...importantLinks,
                          { label: '', url: '' },
                        ])
                      }
                      className="text-black"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {importantLinks.map((link, i) => (
                      <div
                        key={i}
                        className="space-y-4 p-5 bg-gray-50 border border-gray-100 relative group transition-colors hover:border-black"
                      >
                        <div className="space-y-1">
                          <label className={labelClass}>Provider</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const next = [...importantLinks]
                              next[i].label = e.target.value
                              setImportantLinks(next)
                            }}
                            className={cn(inputBase, 'py-2 bg-white')}
                            placeholder="e.g. ResearchGate"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>Direct URL</label>
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => {
                              const next = [...importantLinks]
                              next[i].url = e.target.value
                              setImportantLinks(next)
                            }}
                            className={cn(
                              inputBase,
                              'py-2 bg-white text-[11px] font-mono',
                            )}
                            placeholder="URL"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setImportantLinks(
                              importantLinks.filter((_, j) => j !== i),
                            )
                          }
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
