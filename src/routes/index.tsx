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
      <div id="home">
        <Hero />
      </div>
      <QuoteSection />
      <div id="news">
        <NewsCarousel news={news} />
      </div>
      <div id="research">
        <div className="hidden lg:block">
          <ObjectivesSection />
        </div>
        <div className="block lg:hidden">
          <ResearchSection />
        </div>
      </div>
      <CollaborationSection />
      <div id="equipment">
        <EquipmentSection />
      </div>

      <div id="faculty">
        <FacultySection faculty={faculty as any} isHomePage={true} />
      </div>
      <CTASection />
    </main>
  )
}
