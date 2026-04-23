import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Mail,
  GraduationCap,
  Award,
  Globe,
  ArrowLeft,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { getFacultyItem } from '../server/faculty'
import type { DbFaculty } from '../types/cms'

export const Route = createFileRoute('/faculty/$facultyId')({
  // @ts-expect-error - parameterized createServerFn call
  loader: ({ params }) => getFacultyItem({ data: params.facultyId }),
  component: FacultyProfile,
})

function FacultyProfile() {
  const faculty = Route.useLoaderData()
  const [activeTab, setActiveTab] = useState('biography')

  if (!faculty) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl font-bold text-brand-text">Faculty not found</h1>
        <Link
          to="/faculty"
          className="mt-8 inline-block text-brand-text/60 hover:text-brand-text underline"
        >
          Return to Team
        </Link>
      </div>
    )
  }

  const importantLinks = faculty.importantLinks as { label: string; url: string }[]

  const tabs = [
    { id: 'biography', label: 'Biography & Work' },
    { id: 'qualification', label: 'Academic Qualification' },
    { id: 'research', label: 'Research Interest' },
    { id: 'publications', label: 'Publications' },
  ]

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Full Width Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={faculty.coverImage || 'https://images.pexels.com/photos/267511/pexels-photo-267511.jpeg'}
          alt="Banner"
          className="w-full h-full object-cover grayscale brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-text/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] w-full mx-auto px-6 pb-12">
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to Team
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-white/30" />
              <p className="text-sm md:text-base text-white/60 font-bold uppercase tracking-[0.3em]">
                {faculty.designation}
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              {faculty.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-10">
            <div>
              <div className="aspect-[4/4] bg-brand-border overflow-hidden rounded-[24px] border border-brand-border/50 shadow-xl mb-6">
                <img
                  src={
                    faculty.image ||
                    'https://images.pexels.com/photos/267511/pexels-photo-267511.jpeg'
                  }
                  alt={faculty.name}
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-brand-text tracking-tighter leading-tight mb-2">
                {faculty.name}
              </h2>
              <p className="text-xs font-bold text-brand-text/50 uppercase tracking-widest">
                {faculty.designation}
              </p>
            </div>

            <div className="space-y-8 bg-[#fbfbfb] p-8 border border-brand-border/50 rounded-xl">
              <h3 className="text-xl font-black text-brand-text uppercase tracking-tighter">
                Resources
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">
                    Contact
                  </p>
                  <div className="space-y-1">
                    {faculty.room && (
                      <p className="text-sm font-bold text-brand-text/70">
                        {faculty.room}
                      </p>
                    )}
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-sm font-bold text-brand-text hover:text-brand-accent transition-colors block break-all"
                    >
                      {faculty.email}
                    </a>
                  </div>
                </div>
                {importantLinks.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-brand-border/30">
                    <p className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.2em]">
                      Networks
                    </p>
                    <div className="flex flex-col gap-3">
                      {importantLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black text-brand-text/50 hover:text-brand-text transition-colors flex items-center gap-2 uppercase tracking-widest group"
                        >
                          <Globe className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />{' '}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {/* Tabs */}
            <div className="flex bg-[#f4f4f4] mb-12 overflow-x-auto no-scrollbar rounded-xl p-1.5 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max md:min-w-0 px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-brand-text text-white shadow-lg'
                      : 'text-brand-text/40 hover:text-brand-text hover:bg-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
              {activeTab === 'biography' && (
                <div className="animate-in fade-in duration-700 space-y-12">
                  {faculty.fullBio ? (
                    <div className="space-y-6 text-lg md:text-xl text-brand-text/70 leading-[1.8] font-medium">
                      {faculty.fullBio.split('\n').map((paragraph, index) =>
                        paragraph.trim() ? (
                          <p key={index}>{paragraph.trim()}</p>
                        ) : null,
                      )}
                    </div>
                  ) : (
                    <p className="text-lg text-brand-text/60 leading-relaxed font-medium">
                      {faculty.profileDescription}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-brand-border/30">
                    <div className="space-y-8">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-text/20">
                        Professional Journey
                      </h4>
                      <div className="relative pl-8 border-l border-brand-border/50 space-y-8 ml-2">
                        {faculty.positionHeld.map((c, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-white border-4 border-brand-text" />
                            <p className="text-base font-bold text-brand-text/60 leading-tight">
                              {c}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {faculty.honors.length > 0 && (
                      <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-text/20">
                          Recognition
                        </h4>
                        <div className="space-y-4">
                          {faculty.honors.map((a, i) => (
                            <div
                              key={i}
                              className="flex gap-4 p-5 bg-[#f9f9f9] border border-brand-border rounded-sm group hover:border-brand-text transition-colors"
                            >
                              <Award className="w-5 h-5 shrink-0 text-brand-text/30 group-hover:text-brand-text transition-colors" />
                              <span className="text-sm font-bold text-brand-text/70 uppercase tracking-tight leading-tight">
                                {a}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'qualification' && (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <div className="space-y-8">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-text/20 border-b border-brand-border/50 pb-3">
                      Academic Background
                    </h4>
                    <ul className="space-y-8">
                      {faculty.education.map((q, i) => (
                        <li key={i} className="flex gap-6 items-start group">
                          <div className="w-12 h-12 bg-[#f8f8f8] border border-brand-border flex items-center justify-center shrink-0 group-hover:bg-brand-text group-hover:border-brand-text transition-all duration-500">
                            <GraduationCap className="w-5 h-5 text-brand-text group-hover:text-white" />
                          </div>
                          <span className="text-lg md:text-xl font-bold text-brand-text/80 leading-snug pt-1">
                            {q}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'research' && (
                <div className="space-y-16 animate-in fade-in duration-500">
                  <div className="prose prose-xl max-w-none">
                    <h3 className="text-2xl font-black text-brand-text/90 mb-8 uppercase tracking-tighter">
                      Research Overview
                    </h3>
                    <p className="text-lg text-brand-text/60 leading-relaxed font-medium">
                      {faculty.researchGeneral || faculty.profileDescription}
                    </p>
                  </div>

                  {faculty.researchProjects.length > 0 && (
                    <div className="space-y-8">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-text/20 border-b border-brand-border/50 pb-3">
                        Ongoing Projects
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faculty.researchProjects.map((p, i) => (
                          <div
                            key={i}
                            className="p-8 bg-[#fbfbfb] border border-brand-border flex items-center gap-6 group hover:border-brand-text transition-all duration-500"
                          >
                            <div className="w-3 h-3 bg-brand-text/10 rounded-full group-hover:bg-brand-text transition-colors" />
                            <span className="text-lg font-black text-brand-text/80 uppercase tracking-tight">
                              {p}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-8">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-text/20 border-b border-brand-border/50 pb-3">
                      Specialized Interests
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {faculty.researchInterests.map((interest, i) => (
                        <span
                          key={i}
                          className="px-6 py-3 bg-white border border-brand-border text-[10px] font-black uppercase tracking-widest text-brand-text/50 hover:border-brand-text hover:text-brand-text transition-all cursor-default"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'publications' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="text-2xl font-black text-brand-text/90 mb-8 uppercase tracking-tighter">
                    Scholarly Publications
                  </h3>
                  {faculty.publications.length > 0 ? (
                    <ul className="space-y-8">
                      {faculty.publications.map((pub, i) => (
                        <li
                          key={i}
                          className="text-base md:text-lg font-bold text-brand-text/60 leading-relaxed border-l-4 border-brand-text/10 pl-8 hover:border-brand-text transition-colors"
                        >
                          {pub}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-20 bg-[#f9f9f9] text-center border border-brand-border">
                      <p className="text-brand-text/30 font-black uppercase tracking-[0.3em] text-[10px]">
                        Registry expansion in progress
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
