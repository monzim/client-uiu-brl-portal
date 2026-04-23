import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Newspaper, Users, LogOut, LayoutDashboard } from 'lucide-react'

const navItems = [
  { to: '/admin/news', label: 'News', icon: Newspaper },
  { to: '/admin/faculty', label: 'Faculty', icon: Users },
]

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0e1f1a] text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-white/60" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
              BRL Admin
            </p>
            <p className="text-sm font-bold">Content Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
