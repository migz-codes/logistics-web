'use server'

import { cookies } from 'next/headers'

interface SetAuthCookiesParams {
  accessToken: string
  refreshToken: string
}

export async function setAuthCookies({ accessToken, refreshToken }: SetAuthCookiesParams) {
  const cookieStore = await cookies()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  cookieStore.set('accessToken', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}

export async function getRefreshToken() {
  const cookieStore = await cookies()
  return cookieStore.get('refreshToken')?.value || null
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}
