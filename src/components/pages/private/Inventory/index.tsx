'use client'

import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { InventoryFilters } from './InventoryFilters'
import { InventoryTable } from './InventoryTable'

export function InventoryPage() {
  return (
    <main className='flex-1 ml-64 p-8'>
      <DashboardHeader
        title='Global Property Inventory'
        subtitle='Manage and monitor all assets across all regions.'
        showAddButton={true}
        addButtonLabel='Add Property'
      />

      <InventoryFilters />
      <InventoryTable />
    </main>
  )
}
