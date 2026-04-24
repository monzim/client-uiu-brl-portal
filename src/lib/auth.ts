import { SignJWT, jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'fallback-dev-secret-change-this!!',
  )

export interface AdminJWTPayload {
  adminId: string
  email: string
}

export async function signToken(payload: AdminJWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(getSecret())
}

export async function verifyToken(
  token: string,
): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as AdminJWTPayload
  } catch {
    return null
  }
}

export const AUTH_COOKIE = 'brl_admin_token'

export function parseCookieHeader(
  header: string,
  name: string,
): string | null {
  const match = header
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}
