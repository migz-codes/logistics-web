'use client'

import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'
import { LOGOUT_MUTATION, type LogoutResponse } from '@/lib/apollo'
import { clearAuthCookies, getRefreshToken } from '@/lib/auth'
import type { IChildrenProps } from '@/types/react.types'

export const Button = ({ children }: IChildrenProps) => {
  const router = useRouter()
  const [logout] = useMutation<LogoutResponse>(LOGOUT_MUTATION)

  const onLogoutClick = async () => {
    const refreshToken = await getRefreshToken()

    if (refreshToken) await logout({ variables: { refreshToken } })

    await clearAuthCookies()

    router.replace('/admin')
  }

  return (
    <button
      type='button'
      onClick={onLogoutClick}
      className='w-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-2xl p-4 flex items-center gap-3 transition-all'
    >
      {children}
    </button>
  )
}
