import { verifyToken, AUTH_COOKIE, parseCookieHeader } from './auth'
import type { AdminJWTPayload } from './auth'

export function jsonResponse(
  data: unknown,
  init?: { status?: number; headers?: Record<string, string> },
): Response {
  return new Response(JSON.stringify(data), {
    status: init?.status ?? 200,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
}

export function errorResponse(message: string, status: number): Response {
  return jsonResponse({ message }, { status })
}

export async function getAuthPayload(
  request: Request,
): Promise<AdminJWTPayload | null> {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const token = parseCookieHeader(cookieHeader, AUTH_COOKIE)
  if (!token) return null
  return verifyToken(token)
}

export function setCookieHeader(
  name: string,
  value: string,
  maxAge: number,
  secure: boolean,
): string {
  return `${name}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure ? '; Secure' : ''}`
}

export function clearCookieHeader(name: string): string {
  return `${name}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`
}
