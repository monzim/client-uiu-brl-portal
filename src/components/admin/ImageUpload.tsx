import { cn } from '#/lib/utils'
import { Loader2, Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string | null
  onChange: (url: string | null) => void
  label?: string
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = async (file: File) => {
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Upload failed')
      }
      const { url } = await res.json()
      onChange(url)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[10px] font-bold uppercase text-red-600 hover:bg-red-50 px-2 py-1 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {value ? (
        <div className="relative group border border-gray-200 bg-gray-50 aspect-video w-full max-w-xl">
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0e1f1a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-4 py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'relative border-2 border-dashed p-10 text-center cursor-pointer transition-colors',
            isDragging
              ? 'border-emerald-600 bg-emerald-50'
              : 'border-gray-200 bg-gray-50/30 hover:border-gray-400 hover:bg-gray-50',
            uploading && 'pointer-events-none opacity-60',
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Uploading Media...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-6 h-6 text-gray-300" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                  {isDragging ? 'Drop File' : 'Select or Drag Image'}
                </p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                  JPG, PNG, WEBP · 5MB Limit
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest bg-red-50 p-2 border border-red-100">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
