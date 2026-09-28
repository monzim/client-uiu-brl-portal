import { createFileRoute } from '@tanstack/react-router'
import { buildRobotsTxt, getPublicOrigin } from '#/lib/sitemap'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildRobotsTxt(getPublicOrigin(request)), {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
          },
        }),
    },
  },
})
