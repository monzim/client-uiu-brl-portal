import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
}

export function RichTextEditor({
  value,
  onChange,
  height = 400,
}: RichTextEditorProps) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key'}
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar: false,
        plugins: [
          'lists',
          'link',
          'image',
          'table',
          'code',
          'wordcount',
          'autolink',
        ],
        toolbar:
          'undo redo | bold italic underline | bullist numlist | link image | table | code',
        content_style:
          'body { font-family: "Plus Jakarta Sans", Inter, sans-serif; font-size: 16px; line-height: 1.8; }',
        images_upload_handler: async (blobInfo) => {
          const form = new FormData()
          form.append('file', blobInfo.blob(), blobInfo.filename())
          const res = await fetch('/api/upload', { method: 'POST', body: form })
          if (!res.ok) throw new Error('Image upload failed')
          const { url } = await res.json()
          return url
        },
        branding: false,
        promotion: false,
      }}
    />
  )
}
