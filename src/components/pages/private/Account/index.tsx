'use client'

import { useTranslations } from 'next-intl'
import { ProfileCard } from './ProfileCard'
import { SecurityCard } from './SecurityCard'

export function AccountPage() {
  const t = useTranslations('account')

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-2xl font-black text-neutral-600'>{t('title')}</h1>
        <p className='text-sm text-neutral-600/60 mt-1'>{t('subtitle')}</p>
      </div>

      <div className='grid lg:grid-cols-2 gap-8'>
        <ProfileCard />
        <SecurityCard />
      </div>
    </>
  )
}
