'use client'

import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { ProfileCard } from './ProfileCard'
import { SecurityCard } from './SecurityCard'

export function AccountPage() {
  const t = useTranslations('account')

  return (
    <>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <div className='grid lg:grid-cols-2 gap-8'>
        <ProfileCard />
        <SecurityCard />
      </div>
    </>
  )
}
