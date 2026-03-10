'use client'

import { useMutation } from '@apollo/client/react'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { LOGOUT_MUTATION, type LogoutResponse } from '@/lib/apollo'
import { clearAuthCookies, getRefreshToken } from '@/lib/auth'
import { userAtoms } from '@/lib/store/user'
import type { IChildrenProps } from '@/types/react.types'

export const Button = ({ children }: IChildrenProps) => {
  const router = useRouter()
  const [logout] = useMutation<LogoutResponse>(LOGOUT_MUTATION)
  const setUser = useSetAtom(userAtoms.user)

  const onLogoutClick = async () => {
    const refreshToken = await getRefreshToken()

    if (refreshToken) await logout({ variables: { refreshToken } })

    await clearAuthCookies()
    setUser(null)

    router.replace('/admin')
  }

  return (
    <button
      type='button'
      onClick={onLogoutClick}
      className='flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all w-full text-white/50 hover:bg-white/5 hover:text-white h-12'
    >
      {children}
    </button>
  )
}
