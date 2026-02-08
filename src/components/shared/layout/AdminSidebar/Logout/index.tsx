'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
import { getSupabaseClient } from '@/services/supabase/client'

export function Logout() {
  const t = useTranslations('navigation')
  const supabase = getSupabaseClient()
  const router = useRouter()

  const onLogoutClick = async () => {
    await supabase.auth.signOut()
    router.replace('/signin')
  }

  return (
    <button
      type='button'
      onClick={onLogoutClick}
      className='w-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-2xl p-4 flex items-center gap-3 transition-all'
    >
      <Icon name='logout' size='md' />
      <span className='text-sm font-medium'>{t('logout')}</span>
    </button>
  )
}
