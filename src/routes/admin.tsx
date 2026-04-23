import { createFileRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { checkAdminAuth } from '../server/auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/admin/login') return
    const payload = await checkAdminAuth()
    if (!payload) {
      throw redirect({ to: '/admin/login' })
    }
    return { admin: payload }
  },
  component: AdminLayout,
})

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isLogin = pathname === '/admin/login'

  if (isLogin) return <Outlet />

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
