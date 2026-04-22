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

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <div id="home"><Hero /></div>
      <QuoteSection />
      <CollaborationSection />
      <div id="news"><NewsCarousel /></div>
      <div id="research">
        <div className="hidden lg:block">
          <ObjectivesSection />
        </div>
        <div className="block lg:hidden">
          <ResearchSection />
        </div>
      </div>
      <div id="equipment"><EquipmentSection /></div>

      <div id="faculty"><FacultySection /></div>
      <CTASection />
    </main>
  )
}
