import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/system')({
  beforeLoad: ({ context }) => {
    const ctx = context as { admin?: { role?: string } }
    if (ctx.admin?.role !== 'SUPERUSER') {
      throw redirect({ to: '/admin/news' })
    }
  },
  component: () => <Outlet />,
})
