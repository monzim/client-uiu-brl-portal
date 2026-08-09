import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { QuoteSection } from '../components/QuoteSection'
import { CollaborationSection } from '../components/CollaborationSection'
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
  errorComponent: ({ error, reset }) => <ErrorFallback error={error} reset={reset} />,
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
      <LazySection rootMargin="400px" placeholderHeight="500px">
        <QuoteSection />
      </LazySection>

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

      {/* Collaboration */}
      <LazySection rootMargin="200px" placeholderHeight="400px">
        <CollaborationSection />
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
