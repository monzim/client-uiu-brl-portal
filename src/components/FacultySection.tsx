import React, { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { SmoothImage } from './ui/SmoothImage'
import type { DbFaculty } from '../types/cms'

interface FacultySectionProps {
  faculty: DbFaculty[]
  isHomePage?: boolean
}

const FacultyCard = ({
  faculty,
}: {
  faculty: DbFaculty
}) => (
  <Link
    to="/faculty/$facultyId"
    params={{ facultyId: faculty.slug }}
    className="group relative block h-[380px] w-[68vw] max-w-[300px] shrink-0 overflow-hidden rounded-2xl bg-brand-text text-white sm:w-[42vw] md:h-[420px] md:w-[29vw] lg:w-[21.5vw]"
  >
    <SmoothImage
      src={faculty.image || '/work_picture/BRL_team_member.webp'}
      alt={faculty.name}
      className="h-full w-full object-cover brightness-[0.78]"
      containerClassName="h-full w-full"
    />
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-text/95 via-brand-text/50 to-transparent" />
    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-bold tracking-tight text-white md:text-base">
          {faculty.name}
        </h4>
        <p className="mt-0.5 truncate text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/60">
          {faculty.designation}
        </p>
      </div>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-brand-text">
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover:rotate-45" />
      </div>
    </div>
  </Link>
)

const FacultyGridCard = ({ faculty }: { faculty: DbFaculty }) => (
  <Link
    to="/faculty/$facultyId"
    params={{ facultyId: faculty.slug }}
    className="group block"
  >
    <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[24px] bg-brand-border">
      <SmoothImage
        src={faculty.image || '/work_picture/BRL_team_member.webp'}
        alt={faculty.name}
        className="h-full w-full object-cover brightness-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        containerClassName="h-full w-full"
      />
      <div className="absolute inset-0 bg-brand-text/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-xl font-bold tracking-tight text-brand-text md:text-2xl">
            {faculty.name}
          </h4>
          <p className="mt-1 truncate text-[10px] font-extrabold uppercase  text-brand-text/60">
            {faculty.designation}
          </p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-text transition-colors duration-300 group-hover:bg-brand-text group-hover:text-brand-bg">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
      <p className="h-10 overflow-hidden text-sm font-medium leading-relaxed text-brand-text/60 line-clamp-2">
        {faculty.profileDescription}
      </p>
      <div className="flex items-center gap-3 border-t border-brand-border/60 pt-5 text-[10px] font-bold uppercase  text-brand-text">
        <span className="opacity-60 transition-opacity group-hover:opacity-100">
          View Profile
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </div>
  </Link>
)

export function FacultySection({
  faculty,
  isHomePage = false,
}: FacultySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollPosRef = useRef(0)

  useEffect(() => {
    const carousel = scrollRef.current
    if (!carousel) return

    scrollPosRef.current = carousel.scrollLeft
    const speed = 0.3

    const tick = () => {
      scrollPosRef.current += speed
      if (scrollPosRef.current >= carousel.scrollWidth - carousel.clientWidth) {
        scrollPosRef.current = 0
      }
      carousel.scrollLeft = scrollPosRef.current
      rafId = requestAnimationFrame(tick)
    }

    let rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const delta = direction === 'left' ? -340 : 340
    scrollPosRef.current = Math.max(0, scrollPosRef.current + delta)
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosRef.current
    }
  }

  if (!isHomePage) {
    return (
      <section id="faculty" className="px-6 py-24 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 max-w-2xl md:mb-20">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-text/40">
              Our Team
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-brand-text md:text-5xl">
              Meet the researchers behind the innovation.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-20 lg:grid-cols-3">
            {faculty.map((member) => (
              <FacultyGridCard key={member.id} faculty={member} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="faculty" className="bg-brand-text px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1400px] overflow-hidden px-1 py-2 sm:px-2 md:py-4">
        <div className="mb-8 flex items-start justify-between gap-6 md:mb-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">
              {isHomePage ? 'Leadership' : 'Our Team'}
            </p>
            <h2 className="text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl mb-8 sm:mb-10">
              {isHomePage
                ? 'Faculty Members.'
                : 'Meet the researchers behind the innovation.'}
            </h2>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Show previous faculty members"
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-brand-text"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Show more faculty members"
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-brand-text"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-4 overflow-x-auto pb-2"
        >
          {faculty.map((member) => (
            <FacultyCard
              key={member.id}
              faculty={member}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
