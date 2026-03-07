'use client'

import { useRouter } from 'next/navigation'
import type { IChildrenProps } from '@/types/react.types'

export const Button = ({ children }: IChildrenProps) => {
  const router = useRouter()

  const onLogoutClick = async () => {
    // TODO: Implement logout with custom backend API
    // Clear accessToken and refreshToken cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.replace('/signin')
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
