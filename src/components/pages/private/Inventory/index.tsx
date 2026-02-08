'use client'

import { useTranslations } from 'next-intl'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { InventoryFilters } from './InventoryFilters'
import { InventoryTable } from './InventoryTable'

export function InventoryPage() {
  const t = useTranslations('inventory')

  return (
    <main className='flex-1 p-8'>
      <DashboardHeader title={t('globalTitle')} subtitle={t('globalSubtitle')} />

      <InventoryFilters />

      <InventoryTable />
    </main>
  )
}
