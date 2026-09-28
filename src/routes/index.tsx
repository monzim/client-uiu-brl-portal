import { createFileRoute } from '@tanstack/react-router'
import { pageMeta, SITE_DESCRIPTION, SITE_NAME } from '../lib/seo'
import { Hero } from '../components/Hero'
import { QuoteSection } from '../components/QuoteSection'
import { NewsCarousel } from '../components/NewsCarousel'
import { ObjectivesSection } from '../components/ObjectivesSection'
import { ResearchSection } from '../components/ResearchSection'
import { EquipmentSection } from '../components/EquipmentSection'
import { FacultySection } from '../components/FacultySection'
import { CTASection } from '../components/CTASection'
import { ErrorFallback } from '../components/ErrorFallback'
import { LazySection } from '../components/LazySection'
import { getNewsList } from '../server/news'
import { getFacultyList } from '../server/faculty'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [news, faculty] = await Promise.all([getNewsList(), getFacultyList()])
    return { news, faculty }
  },
  head: () => ({
    meta: pageMeta({ title: SITE_NAME }),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ResearchOrganization',
          name: 'Biomedical Research Laboratory, United International University',
          alternateName: SITE_NAME,
          description: SITE_DESCRIPTION,
          parentOrganization: {
            '@type': 'CollegeOrUniversity',
            name: 'United International University',
            url: 'https://www.uiu.ac.bd',
          },
        }),
      },
    ],
  }),
  errorComponent: ({ error, reset }) => (
    <ErrorFallback error={error} reset={reset} />
  ),
  component: App,
})

function App() {
  const { news, faculty } = Route.useLoaderData()

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero is above the fold — always rendered eagerly */}
      <div id="home">
        <Hero />
      </div>

      {/* QuoteSection is just below the fold — small rootMargin to start early */}

      <QuoteSection />

      {/* News carousel */}
      <LazySection rootMargin="300px" placeholderHeight="500px">
        <div id="news">
          <NewsCarousel news={news} />
        </div>
      </LazySection>

      {/* Research / Objectives — heavier components */}
      <LazySection rootMargin="200px" placeholderHeight="600px">
        <div id="research">
          <div className="hidden lg:block">
            <ObjectivesSection />
          </div>
          <div className="block lg:hidden">
            <ResearchSection />
          </div>
        </div>
      </LazySection>

      {/* Equipment — images heavy */}
      <LazySection rootMargin="200px" placeholderHeight="600px">
        <div id="equipment">
          <EquipmentSection />
        </div>
      </LazySection>

      {/* Faculty — network images */}
      <LazySection rootMargin="200px" placeholderHeight="600px">
        <div id="faculty">
          <FacultySection faculty={faculty as any} isHomePage={true} />
        </div>
      </LazySection>

      {/* CTA */}
      <LazySection rootMargin="200px" placeholderHeight="300px">
        <CTASection />
      </LazySection>
    </main>
  )
}
