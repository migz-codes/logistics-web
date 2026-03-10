'use client'

import { useTranslations } from 'next-intl'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { KpiCards } from '../AdminDashboard/KpiCards'
import { PartnersTable } from '../AdminDashboard/PartnersTable'
import { AssetsOverview } from '../AdminDashboard/AssetsOverview'

export function PartnerHubPage() {
  const t = useTranslations('dashboard')

  return (
    <>
      <PageHeader title={t('partnerHubTitle')} description={t('partnerHubSubtitle')} />

      <KpiCards />

      <div className='grid lg:grid-cols-3 gap-8 mt-8'>
        <div className='lg:col-span-2'>
          <PartnersTable />
        </div>

        <div>
          <AssetsOverview />
        </div>
      </div>
    </>
  )
}
