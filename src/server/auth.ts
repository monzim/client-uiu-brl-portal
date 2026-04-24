'use server'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { verifyToken, AUTH_COOKIE, parseCookieHeader } from '#/lib/auth'

export const checkAdminAuth = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const cookieHeader = request?.headers.get('cookie') ?? ''
    const token = parseCookieHeader(cookieHeader, AUTH_COOKIE)
    if (!token) return null
    return verifyToken(token)
  },
)
