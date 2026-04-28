import React, { useState, useEffect } from 'react'
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
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) return
    
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setError(true)
  }, [src])

  return (
    <div className={cn("relative overflow-hidden bg-brand-text/5", containerClassName)}>
      {/* Loading Placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-brand-text/10" />
      )}
      
      {/* The Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-1000 ease-in-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          className
        )}
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
