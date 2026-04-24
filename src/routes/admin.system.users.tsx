import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, UserCog, Shield, Ban, CheckCircle2, X } from 'lucide-react'
import { DataTable } from '../components/admin/DataTable'
import { ConfirmationDialog } from '../components/admin/ConfirmationDialog'
import { getAdminUsersList } from '../server/superuser'
import { cn } from '../lib/utils'

type AdminUser = {
  id: string
  email: string
  role: 'ADMIN' | 'SUPERUSER'
  isBlocked: boolean
  createdAt: string | Date
}

export const Route = createFileRoute('/admin/system/users')({
  loader: () => getAdminUsersList(),
  component: AdminUsersPage,
})

function AdminUsersPage() {
  const initial = Route.useLoaderData()
  const context = Route.useRouteContext()
  const currentAdminId = 'admin' in context ? context.admin.adminId : undefined
  const [data, setData] = useState<AdminUser[]>(initial)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [blockTarget, setBlockTarget] = useState<AdminUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formEmail, setFormEmail] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formRole, setFormRole] = useState<'ADMIN' | 'SUPERUSER'>('ADMIN')
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/superuser/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formEmail, password: formPassword, role: formRole }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.message ?? 'Failed to create user')
        return
      }
      const created: AdminUser = await res.json()
      setData((prev) => [created, ...prev])
      setFormEmail('')
      setFormPassword('')
      setFormRole('ADMIN')
      setIsAddOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmBlock = async () => {
    if (!blockTarget) return
    const newState = !blockTarget.isBlocked
    const res = await fetch(`/api/superuser/users/${blockTarget.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isBlocked: newState }),
    })
    if (res.ok) {
      const updated: AdminUser = await res.json()
      setData((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    }
    setBlockTarget(null)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <UserCog className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60">
              Administration
            </p>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            User <span className="text-emerald-600">Management</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md font-medium">
            Create new admin accounts and control access. Superusers cannot be blocked.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#0e1f1a] text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      <DataTable
        data={data}
        keyField="id"
        columns={[
          {
            key: 'email',
            header: 'Email',
            className: 'w-[40%]',
            render: (row) => (
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{row.email}</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5">{row.id}</span>
              </div>
            ),
          },
          {
            key: 'role',
            header: 'Role',
            render: (row) => (
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
                  row.role === 'SUPERUSER'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-gray-50 text-gray-600 border-gray-200',
                )}
              >
                {row.role === 'SUPERUSER' && <Shield className="w-3 h-3" />}
                {row.role}
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
                  row.isBlocked
                    ? 'bg-red-50 text-red-700 border-red-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-100',
                )}
              >
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    row.isBlocked ? 'bg-red-500' : 'bg-emerald-500 animate-pulse',
                  )}
                />
                {row.isBlocked ? 'Blocked' : 'Active'}
              </div>
            ),
          },
          {
            key: 'createdAt',
            header: 'Created',
            render: (row) => (
              <span className="text-xs text-gray-600">
                {new Date(row.createdAt).toLocaleDateString()}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (row) => {
              const isSelf = row.id === currentAdminId
              const isSuperuser = row.role === 'SUPERUSER'
              const disabled = isSelf || isSuperuser
              return (
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => !disabled && setBlockTarget(row)}
                    disabled={disabled}
                    title={
                      isSelf
                        ? 'Cannot modify yourself'
                        : isSuperuser
                          ? 'Cannot modify a superuser'
                          : row.isBlocked
                            ? 'Unblock user'
                            : 'Block user'
                    }
                    className={cn(
                      'p-2 rounded-lg transition-all active:scale-90',
                      disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : row.isBlocked
                          ? 'text-emerald-500 hover:bg-emerald-50'
                          : 'text-red-500 hover:bg-red-50',
                    )}
                  >
                    {row.isBlocked ? (
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    ) : (
                      <Ban className="w-4.5 h-4.5" />
                    )}
                  </button>
                </div>
              )
            },
          },
        ]}
      />

      <Dialog.Root open={isAddOpen} onOpenChange={setIsAddOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] z-[101] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 outline-none p-8 border border-gray-200">
            <Dialog.Title className="text-sm font-bold text-black uppercase tracking-[0.1em] mb-1">
              Create Admin Account
            </Dialog.Title>
            <Dialog.Description className="text-xs text-gray-500 mb-6">
              Minimum 8 character password. Email must be unique.
            </Dialog.Description>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                  Role
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as 'ADMIN' | 'SUPERUSER')}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none font-medium"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPERUSER">Superuser</option>
                </select>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-colors border border-gray-200 rounded-xl"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>

            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-2 text-gray-300 hover:text-black transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmationDialog
        open={blockTarget !== null}
        onOpenChange={(open) => !open && setBlockTarget(null)}
        title={blockTarget?.isBlocked ? 'Unblock User' : 'Block User'}
        description={
          blockTarget?.isBlocked
            ? `Restore access for ${blockTarget.email}?`
            : `Revoke access for ${blockTarget?.email ?? ''}? They will not be able to log in.`
        }
        confirmText={blockTarget?.isBlocked ? 'Unblock' : 'Block'}
        variant={blockTarget?.isBlocked ? 'info' : 'danger'}
        onConfirm={handleConfirmBlock}
      />
    </div>
  )
}
