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
  const context = Route.useRouteContext()
  const isLogin = pathname === '/admin/login'

  if (isLogin) return <Outlet />

  const role = context && 'admin' in context ? context.admin.role : undefined

  return (
    <div className="flex min-h-screen bg-[#f8faf9] selection:bg-emerald-100 selection:text-emerald-900">
      <AdminSidebar role={role} />
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden pt-8 px-8 pb-12 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  )
}
