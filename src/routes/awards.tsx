import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Trophy,
  Quote,
  Sparkles,
  Star,
  Flame,
} from 'lucide-react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { awardsData } from '../data/data'

export const Route = createFileRoute('/awards')({
  head: () => ({
    meta: [
      { title: 'Awards & Achievements | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content:
          'Celebrating the awards, achievements, and recognition received by the researchers and students of UIU BME Lab.',
      },
      { property: 'og:title', content: 'Awards | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AwardsPage,
})

// Extracts a comparable numeric value from an amount string like "$25,000" or "USD 1,000"
function parseAmountValue(amount?: string | number) {
  if (!amount) return 0
  const match = String(amount).replace(/,/g, '').match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

function AwardsPage() {
  const [owsdAward, ...otherAwards] = awardsData

  const amountValues = otherAwards.map((a) => parseAmountValue(a.amount))
  const maxAmountValue = Math.max(0, ...amountValues)
  const topFundedIndex =
    maxAmountValue > 0 ? amountValues.indexOf(maxAmountValue) : -1

  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src="/banner_images/banner_image3.jpg"
          alt="Awards Banner"
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Awards & <br className="hidden md:block" />
              Achievements.
            </h1>
          </div>
        </div>
      </section>

      {/* ─── OWSD Fellowship — Spotlight Hero ─── */}
      {owsdAward && (
        <section className="px-6 pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-[1400px] mx-auto relative overflow-hidden rounded-[40px] md:rounded-[64px] bg-brand-text text-brand-bg p-8 md:p-14 lg:p-20"
          >
            {/* ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full bg-[#d8b23f]/20 blur-[130px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 -left-24 w-[360px] h-[360px] rounded-full bg-[#d8b23f]/10 blur-[110px]"
            />

            {/* constellation backdrop */}
            <svg
              viewBox="0 0 800 600"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 w-full h-full opacity-[0.07]"
            >
              <g fill="#ffffff">
                <circle cx="70" cy="90" r="3" />
                <circle cx="180" cy="40" r="2" />
                <circle cx="300" cy="120" r="3" />
                <circle cx="500" cy="70" r="2" />
                <circle cx="640" cy="140" r="3" />
                <circle cx="750" cy="60" r="2" />
                <circle cx="140" cy="460" r="3" />
                <circle cx="420" cy="540" r="3" />
                <circle cx="680" cy="480" r="2" />
              </g>
              <g stroke="#ffffff" strokeWidth="1" opacity="0.6">
                <path d="M70 90L300 120M300 120L500 70M500 70L640 140M70 90L180 40M640 140L750 60" />
              </g>
            </svg>

            {/* corner ribbon */}
            <div className="absolute top-0 right-0 z-10">
              <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden">
                <div className="absolute top-[22px] right-[-38px] md:top-[28px] md:right-[-42px] w-[170px] md:w-[200px] rotate-45 bg-[#d8b23f] text-brand-text text-center py-1.5 md:py-2 shadow-lg">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                    Top Honor
                  </span>
                </div>
              </div>
            </div>

            {/* floating sparkles */}
            <motion.div
              className="absolute top-10 left-1/2 hidden md:block"
              animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-5 h-5 text-[#d8b23f]" />
            </motion.div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left — emblem + eyebrow + title + recipient + description */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[2px] bg-[#d8b23f]" aria-hidden="true" />
                  <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#d8b23f]">
                    Most Prestigious Recognition
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-7 mb-8">
                  {/* Gold medallion with orbiting ring */}
                  <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
                    >
                      <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className="w-full h-full">
                        <circle cx="48" cy="48" r="45" stroke="#d8b23f" strokeWidth="1.5" strokeDasharray="3 7" opacity="0.7" />
                        <circle cx="48" cy="3" r="4" fill="#d8b23f" opacity="0.9" />
                      </svg>
                    </motion.div>
                    <div className="absolute inset-1.5 rounded-full bg-[#d8b23f] flex items-center justify-center text-brand-text shadow-[0_0_50px_rgba(216,178,63,0.45)]">
                      <Trophy className="w-8 h-8 md:w-11 md:h-11" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl xl:text-6xl font-medium tracking-tight text-white leading-[1.05] uppercase">
                    {owsdAward.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-white/80 mb-8">
                  <Star className="w-4 h-4 text-[#d8b23f] shrink-0" fill="#d8b23f" />
                  <p className="text-sm md:text-lg font-bold tracking-widest uppercase">
                    {owsdAward.recipient}
                  </p>
                </div>

                {owsdAward.description && (
                  <p className="text-brand-bg/70 text-base md:text-lg leading-relaxed max-w-2xl">
                    {owsdAward.description}
                  </p>
                )}
              </div>

              {/* Right — amount + project panel, stacked as stat cards */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-5">
                {owsdAward.amount && (
                  <div className="relative rounded-3xl border border-[#d8b23f]/40 bg-[#d8b23f]/10 p-8 md:p-9 text-center overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#d8b23f]/20 blur-2xl"
                    />
                    <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#d8b23f] mb-2">
                      Grant Amount
                    </p>
                    <p className="text-4xl md:text-5xl font-medium text-white">
                      {owsdAward.amount}
                    </p>
                  </div>
                )}
                {owsdAward.projectTitle && (
                  <div className="relative rounded-3xl bg-white/5 border border-white/15 p-7 md:p-8">
                    <Quote className="w-5 h-5 text-[#d8b23f] mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">
                      Funded Project
                    </p>
                    <p className="font-medium leading-relaxed italic text-white/85 text-sm md:text-base break-words">
                      &ldquo;{owsdAward.projectTitle}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── Remaining awards — alternating trophy timeline ─── */}
      {otherAwards.length > 0 && (
        <section className="px-6 pt-20 md:pt-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-14 md:mb-20">
              <span className="w-8 h-[2px] bg-[#c9603f]" aria-hidden="true" />
              <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#c9603f]">
                Additional Recognitions
              </p>
            </div>

            <div className="relative">
              {/* center connecting line — desktop */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-text/15 to-transparent"
              />
              {/* left connecting line — mobile */}
              <div
                aria-hidden="true"
                className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-text/15 to-transparent"
              />

              <div className="flex flex-col gap-10 md:gap-8">
                {otherAwards.map((award, i) => {
                  const isEven = i % 2 === 0
                  const isTopFunded = i === topFundedIndex
                  const isDark = i % 2 === 0

                  return (
                    <div
                      key={i}
                      className={`relative flex pl-20 md:pl-0 ${
                        isEven ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      {/* timeline node */}
                      <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-10">
                        <div className="relative w-11 h-11 md:w-12 md:h-12">
                          <motion.div
                            className={`absolute inset-0 rounded-full ${
                              isTopFunded ? 'bg-[#d8b23f]/25' : 'bg-[#c9603f]/20'
                            }`}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                          />
                          <div
                            className={`absolute inset-0 rounded-full bg-brand-bg border-2 flex items-center justify-center ${
                              isTopFunded ? 'border-[#d8b23f]' : 'border-[#c9603f]'
                            }`}
                          >
                            <span
                              className={`text-[11px] md:text-xs font-bold ${
                                isTopFunded ? 'text-[#d8b23f]' : 'text-[#c9603f]'
                              }`}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* card */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`w-full md:w-[46%] group relative flex flex-col overflow-hidden rounded-[24px] md:rounded-[32px] border px-7 md:px-9 py-8 md:py-9 transition-all duration-500 hover:-translate-y-1.5 ${
                          isDark
                            ? 'bg-brand-text border-brand-text/10 text-brand-bg hover:shadow-[0_50px_100px_-60px_rgba(14,31,26,0.55)]'
                            : 'bg-white border-brand-border/70 text-brand-text hover:shadow-[0_40px_90px_-50px_rgba(14,31,26,0.3)]'
                        } ${
                          isTopFunded ? 'ring-1 ring-[#d8b23f]/50' : ''
                        }`}
                      >
                        {/* top accent line — grows on hover */}
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                            isTopFunded ? 'bg-[#d8b23f]' : 'bg-[#c9603f]'
                          }`}
                        />

                        {/* info + big amount */}
                        <div className="relative flex flex-col sm:flex-row sm:items-stretch gap-8 sm:gap-0">
                          {/* info column */}
                          <div className="flex-1 min-w-0 sm:pr-8 lg:pr-10">
                            {/* meta row */}
                            <div className="flex items-center justify-between gap-3 mb-6">
                              <span
                                className={`text-[11px] font-bold tabular-nums tracking-[0.25em] ${
                                  isTopFunded ? 'text-[#8f7315]' : 'text-[#a34a30]'
                                }`}
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {isTopFunded && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d8b23f]/15 border border-[#d8b23f]/35 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d8b23f]">
                                  <Flame className="w-3 h-3" /> Largest Grant
                                </span>
                              )}
                            </div>

                            {/* name */}
                            <h3
                              className={`text-xl md:text-[22px] font-semibold tracking-tight leading-snug break-words ${
                                isDark ? 'text-white' : 'text-brand-text'
                              }`}
                            >
                              {award.name}
                            </h3>

                            {/* recipient */}
                            <div
                              className={`flex items-center gap-3 mt-4 ${
                                isDark ? 'text-white/70' : 'text-brand-text/60'
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className={`w-6 h-[2px] shrink-0 ${
                                  isTopFunded ? 'bg-[#d8b23f]' : 'bg-[#c9603f]'
                                }`}
                              />
                              <p className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase leading-relaxed">
                                {award.recipient}
                              </p>
                            </div>
                          </div>

                          {/* big amount — opposite side of the card */}
                          {award.amount && (
                            <div
                              className={`pt-6 sm:pt-0 sm:pl-8 lg:pl-10 border-t sm:border-t-0 sm:border-l sm:flex sm:flex-col sm:justify-center ${
                                isTopFunded ? 'border-[#d8b23f]/30' : isDark ? 'border-white/10' : 'border-brand-border/60'
                              }`}
                            >
                              <p
                                className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
                                  isDark ? 'text-white/40' : 'text-brand-text/45'
                                }`}
                              >
                                Grant Amount
                              </p>
                              <p
                                className={`text-4xl md:text-[44px] xl:text-5xl font-semibold tracking-tight leading-none tabular-nums break-words ${
                                  isTopFunded
                                    ? 'text-[#d8b23f]'
                                    : isDark
                                      ? 'text-white'
                                      : 'text-brand-text'
                                }`}
                              >
                                {award.amount}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* project */}
                        {award.projectTitle && (
                          <div
                            className={`relative mt-8 pt-6 border-t ${
                              isDark ? 'border-white/10' : 'border-brand-border/50'
                            }`}
                          >
                            <p
                              className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 ${
                                isDark ? 'text-white/40' : 'text-brand-text/40'
                              }`}
                            >
                              Funded Project
                            </p>
                            <p
                              className={`text-sm font-medium leading-relaxed italic break-words ${
                                isDark ? 'text-white/75' : 'text-brand-text/70'
                              }`}
                            >
                              &ldquo;{award.projectTitle}&rdquo;
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}