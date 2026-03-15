'use client'

import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Card } from '@/components/shared/ui/Card'
import { userAtoms } from '@/lib/store/user'
import { CompaniesHeader } from './CompaniesHeader'
import { CompaniesTable } from './CompaniesTable'

export function CompaniesPage() {
  const t = useTranslations('companies')
  const router = useRouter()
  const userRole = useAtomValue(userAtoms.userRole)
  const canAccess = userRole === 'ADMIN' || userRole === 'INVESTOR_ADMIN'

  useEffect(() => {
    if (!canAccess) router.push('/admin/dashboard')
  }, [canAccess, router])

  if (!canAccess) return <></>

  return (
    <>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <Card variant='elevated' className='pb-4'>
        <CompaniesHeader />
        <CompaniesTable />
      </Card>
    </>
  )
}
