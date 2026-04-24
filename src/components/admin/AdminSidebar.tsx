import React, { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  Newspaper,
  Users,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  UserCog,
  ClipboardList,
} from 'lucide-react'
import type { AdminRole } from '@prisma/client'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/admin/news', label: 'News & Activities', icon: Newspaper },
  { to: '/admin/faculty', label: 'Faculty Members', icon: Users },
]

const superuserNavItems = [
  { to: '/admin/system/users', label: 'User Management', icon: UserCog },
  { to: '/admin/system/audit-logs', label: 'Audit Logs', icon: ClipboardList },
]

interface AdminSidebarProps {
  role?: AdminRole
}

export function AdminSidebar({ role }: AdminSidebarProps = {}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    if (saved !== null) {
      setIsCollapsed(saved === 'true')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('admin-sidebar-collapsed', String(isCollapsed))
    }
  }, [isCollapsed, mounted])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <aside
      className={cn(
        'relative h-screen bg-[#0e1f1a] text-white flex flex-col transition-all duration-300 ease-in-out border-r border-white/5 shadow-xl shrink-0',
        isCollapsed ? 'w-20' : 'w-72'
      )}
    >
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
            <img 
              src="/images/transparent original logo.png" 
              alt="BRL Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap opacity-100 transition-opacity duration-300">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400/80">
                BRL Portal
              </span>
              <span className="text-sm font-bold text-white">Administration</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            Main Menu
          </p>
        )}
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                active
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
              title={isCollapsed ? label : ''}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-white' : 'group-hover:scale-110 transition-transform')} />
              {!isCollapsed && (
                <span className="whitespace-nowrap opacity-100 transition-opacity duration-300">
                  {label}
                </span>
              )}
              {active && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </Link>
          )
        })}

        {role === 'SUPERUSER' && (
          <>
            {!isCollapsed && (
              <p className="px-4 mt-6 mb-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                Administration
              </p>
            )}
            {superuserNavItems.map(({ to, label, icon: Icon }) => {
              const active = pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                    active
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                  title={isCollapsed ? label : ''}
                >
                  <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-white' : 'group-hover:scale-110 transition-transform')} />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap opacity-100 transition-opacity duration-300">
                      {label}
                    </span>
                  )}
                  {active && !isCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-2">
        {!isCollapsed && (
          <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            System
          </p>
        )}
        
        <button
          onClick={handleLogout}
          className={cn(
            'group flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all duration-200',
            'text-white/50 hover:text-red-400 hover:bg-red-500/10'
          )}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0e1f1a] flex items-center justify-center text-white hover:bg-emerald-400 transition-colors shadow-lg z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  )
}
