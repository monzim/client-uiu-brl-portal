const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tiny.cloud",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tiny.cloud",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-src https://cdn.tiny.cloud",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; '),
}

export default async () => {
  // Security headers are set via Nitro routeRules in vite.config.ts.
  // This file exports the header map for reference / testing.
  return SECURITY_HEADERS
}

export { SECURITY_HEADERS }
