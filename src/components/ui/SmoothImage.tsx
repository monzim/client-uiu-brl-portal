import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  containerClassName?: string
}

export function SmoothImage({
  src,
  alt,
  className,
  containerClassName,
  loading = 'eager',
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Handle already-cached images that fire onLoad before React attaches handlers
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [src])

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-brand-text/5',
        isLoaded && 'image-loaded',
        containerClassName,
      )}
    >
      {/* Shimmer placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-brand-text/10" />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn(
          'transition-[opacity,filter,transform] duration-1000 ease-out',
          isLoaded
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-xl scale-105',
          className,
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-text/10 text-brand-text/20 text-xs font-bold uppercase tracking-widest">
          Failed to load
        </div>
      )}
    </div>
  )
}
