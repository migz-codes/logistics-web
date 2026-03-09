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

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')?.value || null
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}

export async function refreshTokenAction(): Promise<{ success: boolean; accessToken?: string }> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!refreshToken) {
    return { success: false }
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    : 'http://localhost:3001/graphql'

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation RefreshToken($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              accessToken
              refreshToken
            }
          }
        `,
        variables: { refreshToken }
      })
    })

    const result = await response.json()

    if (result.data?.refreshToken) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        result.data.refreshToken
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
      })

      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
      })

      return { success: true, accessToken: newAccessToken }
    }

    return { success: false }
  } catch {
    return { success: false }
  }
}
