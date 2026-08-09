import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  /** Extra distance (px) before the viewport edge to start loading. Default: 200 */
  rootMargin?: string
  /** Placeholder height to keep the layout stable while the section hasn't rendered yet */
  placeholderHeight?: string
  className?: string
}

/**
 * LazySectionWrapper — defers rendering of below-the-fold sections until they
 * are near the viewport. This reduces the initial JS execution and image
 * decoding cost on first page load.
 *
 * Once the section enters the viewport it stays rendered (no unmounting).
 */
export function LazySection({
  children,
  rootMargin = '200px',
  placeholderHeight = '400px',
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If IntersectionObserver isn't available (SSR / old browsers) just render immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Only need to trigger once
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        children
      ) : (
        // Stable height placeholder so the page doesn't reflow when content loads
        <div style={{ minHeight: placeholderHeight }} aria-hidden="true" />
      )}
    </div>
  )
}
