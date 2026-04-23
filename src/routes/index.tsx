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

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'UIU Biomedical Research Lab | Pushing Boundaries in BME' },
      {
        name: 'description',
        content: 'The Biomedical Research Laboratory at United International University focuses on smart hydrogels, pharmacogenomics, and antimicrobial resistance.',
      },
      { property: 'og:title', content: 'UIU Biomedical Research Lab' },
      { property: 'og:description', content: 'Leading biomedical research in Bangladesh at United International University.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: App 
})

function App() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <div id="home"><Hero /></div>
      <QuoteSection />
      <div id="news"><NewsCarousel /></div>
      <div id="research">
        <div className="hidden lg:block">
          <ObjectivesSection />
        </div>
        <div className="block lg:hidden">
          <ResearchSection />
        </div>
      </div>
      <CollaborationSection />
      <div id="equipment"><EquipmentSection /></div>

      <div id="faculty"><FacultySection isHomePage={true} /></div>
      <CTASection />
    </main>
  )
}
