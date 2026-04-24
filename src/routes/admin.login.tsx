import React, { useState } from 'react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { checkAdminAuth } from '../server/auth'
import { FlaskConical } from 'lucide-react'

export const Route = createFileRoute('/admin/login')({
  beforeLoad: async () => {
    const payload = await checkAdminAuth()
    if (payload) {
      throw redirect({ to: '/admin/news' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Login failed')
      }
      navigate({ to: '/admin/news' })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1f1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10">
          <FlaskConical className="w-8 h-8 text-white/60" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              UIU BRL
            </p>
            <p className="text-lg font-black text-white tracking-tight">
              Admin Panel
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 font-bold">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
              placeholder="admin@brl.uiu.ac.bd"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-[#0e1f1a] text-xs font-black uppercase tracking-widest rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/20 font-bold">
          Session expires after 1 hour
        </p>
      </div>
    </div>
  )
}
