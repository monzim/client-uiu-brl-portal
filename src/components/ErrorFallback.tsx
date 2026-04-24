import { Link } from '@tanstack/react-router'

interface ErrorFallbackProps {
  error: Error
  reset?: () => void
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-brand-text mb-2">Something went wrong</h2>
      <p className="text-brand-text/50 mb-6 max-w-md text-sm">
        {error.message || 'Failed to load this page. Please try again.'}
      </p>
      <div className="flex gap-4">
        {reset && (
          <button
            onClick={reset}
            className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Try again
          </button>
        )}
        <Link
          to="/"
          className="px-4 py-2 border border-brand-text/20 text-brand-text/70 rounded-lg text-sm font-medium hover:border-brand-text/40 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
