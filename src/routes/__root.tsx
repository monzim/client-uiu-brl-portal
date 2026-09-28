import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { NotFound } from '../components/NotFound'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '../lib/seo'

// Side-effect import: TanStack Start's manifest picks the stylesheet up from the
// client bundle and injects the <link> with the client build's hash. Importing it
// as `?url` instead bakes the SSR build's hash into the HTML, which does not exist
// in .output/public and 404s on first paint (unstyled page until hydration).
import '../styles.css'

const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: SITE_NAME,
      },
      {
        name: 'description',
        content: SITE_DESCRIPTION,
      },
      { name: 'theme-color', content: '#2a4d3f' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: SITE_NAME },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: FONT_STYLESHEET,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/icon-192.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })
  const isAdmin = pathname.startsWith('/admin')
  const preloadImages = getPreloadImages(pathname)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {preloadImages.map((href) => (
          <link
            key={href}
            rel="preload"
            as="image"
            href={href}
            fetchPriority="high"
          />
        ))}
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}

// Hero images to preload per route so the LCP image starts downloading before
// hydration. Keep in sync with each route's banner; dynamic heroes are omitted.
function getPreloadImages(pathname: string): string[] {
  if (pathname === '/')
    return ['/images/lab.webp', '/banner_images/banner_image7.jpg']
  if (pathname === '/faculty') return ['/work_picture/BRL_team_member.webp']
  if (pathname === '/news') return ['/banner_images/IMG20260225102648.webp']
  if (pathname === '/area') return ['/banner_images/banner_image1.webp']
  if (pathname === '/about') return ['/banner_images/3U-3.webp']
  if (pathname === '/assistants') return ['/banner_images/banner_image2.webp']
  if (pathname === '/awards') return ['/banner_images/banner_image3.jpg']
  if (pathname === '/equipment') return ['/banner_images/2.Microscope.webp']
  if (pathname === '/gallery') return ['/banner_images/gallery_banner.webp']
  if (pathname === '/partnership')
    return ['/banner_images/1.Inorganic-lab-pic.webp']
  if (pathname === '/privacy') return ['/images/lab.webp']
  if (pathname.startsWith('/projects/'))
    return ['/banner_images/banner_image1.webp']
  return []
}
