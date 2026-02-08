'use client'

import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { ActivityFeed } from './ActivityFeed'
import { Charts } from './Charts'
import { KpiCards } from './KpiCards'
import { PendingApprovals } from './PendingApprovals'

export function StrategicDashboardPage() {
  return (
    <main className='flex-1 ml-64 p-8'>
      <DashboardHeader
        title='Strategic Dashboard'
        subtitle='Real-time overview of platform performance and key metrics.'
        showAddButton={false}
      />

      <KpiCards />

      <Charts />

      <div className='grid lg:grid-cols-2 gap-8 mt-8'>
        <PendingApprovals />
        <ActivityFeed />
      </div>
    </main>
  )
}
