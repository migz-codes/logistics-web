'use client'

import { ActivityFeed } from './ActivityFeed'
import { AssetsOverview } from './AssetsOverview'
import { Charts } from './Charts'
import { DashboardHeader } from './DashboardHeader'
import { KpiCards } from './KpiCards'
import { PartnersTable } from './PartnersTable'
import { PendingApprovals } from './PendingApprovals'

export function AdminDashboardPage() {
  return (
    <>
      <DashboardHeader
        title='Partner & Investor Hub'
        subtitle='Centralized control for all investment and partnership activities.'
      />

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
        title='Strategic Dashboard'
        subtitle='Real-time overview of platform performance and key metrics.'
      />

      <KpiCards
        kpis={[
          {
            icon: 'visibility',
            label: 'New Leads (MTD)',
            value: '287',
            change: '+18%',
            changeType: 'positive'
          },
          {
            icon: 'trending_up',
            label: 'Conv. Rate',
            value: '12.8%',
            change: '+2.4%',
            changeType: 'positive'
          },
          {
            icon: 'attach_money',
            label: 'Revenue (YTD)',
            value: 'R$ 42.5M',
            change: '+24%',
            changeType: 'positive'
          },
          {
            icon: 'apartment',
            label: 'Active Listings',
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
