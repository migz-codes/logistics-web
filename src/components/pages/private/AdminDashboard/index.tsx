'use client'

import { useTranslations } from 'next-intl'
import { ActivityFeed } from './ActivityFeed'
import { AssetsOverview } from './AssetsOverview'
import { Charts } from './Charts'
import { DashboardHeader } from './DashboardHeader'
import { KpiCards } from './KpiCards'
import { PartnersTable } from './PartnersTable'
import { PendingApprovals } from './PendingApprovals'

export function AdminDashboardPage() {
  const t = useTranslations('dashboard')

  return (
    <>
      <DashboardHeader title={t('partnerHubTitle')} subtitle={t('partnerHubSubtitle')} />

      <KpiCards />

      <div className='grid lg:grid-cols-3 gap-8 mt-8'>
        <div className='lg:col-span-2'>
          <PartnersTable />
        </div>

        <div>
          <AssetsOverview />
        </div>
      </div>

      <DashboardHeader
        className='mt-8'
        title={t('strategicTitle')}
        subtitle={t('strategicSubtitle')}
      />

      <KpiCards
        kpis={[
          {
            icon: 'visibility',
            label: t('stats.newLeads'),
            value: '287',
            change: '+18%',
            changeType: 'positive'
          },
          {
            icon: 'trending_up',
            label: t('stats.conversionRate'),
            value: '12.8%',
            change: '+2.4%',
            changeType: 'positive'
          },
          {
            icon: 'attach_money',
            label: t('stats.revenueYTD'),
            value: 'R$ 42.5M',
            change: '+24%',
            changeType: 'positive'
          },
          {
            icon: 'apartment',
            label: t('stats.activeListings'),
            value: '156',
            change: '+8',
            changeType: 'positive'
          }
        ]}
      />

      <Charts />

      <div className='grid lg:grid-cols-2 gap-8 mt-8'>
        <PendingApprovals />
        <ActivityFeed />
      </div>
    </>
  )
}
