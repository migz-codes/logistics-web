'use client'

import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { ActivityFeed } from './ActivityFeed'
import { Charts } from './Charts'
import { KpiCards } from './KpiCards'
import { PendingApprovals } from './PendingApprovals'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'analytics', active: true },
  { href: '/admin/inventory', label: 'Inventory', icon: 'warehouse', active: false },
  { href: '/admin/partners', label: 'Partners', icon: 'handshake', active: false },
  { href: '/admin/properties', label: 'Properties', icon: 'domain', active: false },
  { href: '/admin/settings', label: 'Settings', icon: 'settings', active: false }
]

export function StrategicDashboardPage() {
  return (
    <div className='min-h-screen bg-cream dark:bg-background-dark flex'>
      <AdminSidebar
        brandName='Logistics Portal'
        brandSubtitle='Master Admin'
        links={sidebarLinks}
        systemStatus='operational'
        systemStatusLabel='All Systems Operational'
      />

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
    </div>
  )
}
