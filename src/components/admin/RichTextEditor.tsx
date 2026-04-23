import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  id?: string
  value: string
  onChange: (content: string) => void
  height?: number
}

export function RichTextEditor({
  id,
  value,
  onChange,
  height = 500,
}: RichTextEditorProps) {
  return (
    <Editor
      id={id}
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'codesample',
          'wordcount',
          'emoticons',
          'help',
        ],
        toolbar:
          'undo redo | blocks | bold italic underline strikethrough | ' +
          'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image media table | ' +
          'codesample code fullscreen | removeformat help',
        content_style:
          'body { font-family: "Plus Jakarta Sans", Inter, sans-serif; font-size: 16px; line-height: 1.8; max-width: 100%; }',
        images_upload_handler: async (blobInfo) => {
          const form = new FormData()
          form.append('file', blobInfo.blob(), blobInfo.filename())
          const res = await fetch('/api/upload', { method: 'POST', body: form })
          if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Upload failed' }))
            throw new Error(err.error || 'Image upload failed')
          }
          const { url } = await res.json()
          return url
        },
        automatic_uploads: true,
        images_reuse_filename: true,
        file_picker_types: 'image',
        image_advtab: true,
        image_caption: true,
        link_default_target: '_blank',
        link_assume_external_targets: true,
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'TypeScript', value: 'typescript' },
          { text: 'CSS', value: 'css' },
          { text: 'Python', value: 'python' },
          { text: 'Bash', value: 'bash' },
          { text: 'JSON', value: 'json' },
        ],
        branding: false,
        promotion: false,
        skin: 'oxide',
        content_css: 'default',
      }}
    />
  )
}
