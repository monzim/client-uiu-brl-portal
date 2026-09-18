import { Link, useRouterState } from '@tanstack/react-router'
import { Images, Layers, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'

const TABS = [
  { to: '/admin/gallery', label: 'Images', icon: Images, exact: true },
  {
    to: '/admin/gallery/categories',
    label: 'Albums',
    icon: Layers,
    exact: false,
  },
  {
    to: '/admin/gallery/settings',
    label: 'Page Settings',
    icon: Settings,
    exact: false,
  },
] as const

/** Sub-navigation shared by the three gallery management screens. */
export function GalleryAdminTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
      {TABS.map(({ to, label, icon: Icon, exact }) => {
        const active = exact
          ? pathname === to || pathname === `${to}/`
          : pathname.startsWith(to)
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all',
              active
                ? 'bg-[#0e1f1a] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100',
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        )
      })}
    </div>
  )
}
