import { createFileRoute, Link } from '@tanstack/react-router'
import { NewsForm } from '../components/admin/NewsForm'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/admin/news/new')({
  component: NewNewsPage,
})

function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/admin/news"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          News
        </p>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Add News Item
        </h1>
      </div>
      <NewsForm />
    </div>
  )
}
