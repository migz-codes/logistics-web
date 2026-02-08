'use client'

import { AssetsOverview } from './AssetsOverview'
import { DashboardHeader } from './DashboardHeader'
import { KpiCards } from './KpiCards'
import { PartnersTable } from './PartnersTable'

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
    </>
  )
}
