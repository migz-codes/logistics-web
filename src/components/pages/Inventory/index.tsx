'use client'

import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { InventoryFilters } from './InventoryFilters'
import { InventoryTable } from './InventoryTable'

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'analytics', active: false },
    { href: '/admin/inventory', label: 'Inventory', icon: 'warehouse', active: true },
    { href: '/admin/partners', label: 'Partners', icon: 'handshake', active: false },
    { href: '/admin/properties', label: 'Properties', icon: 'domain', active: false },
    { href: '/admin/settings', label: 'Settings', icon: 'settings', active: false }
]

export function InventoryPage() {
    return (
        <div className="min-h-screen bg-cream dark:bg-background-dark flex">
            <AdminSidebar
                brandName="Logistics Portal"
                brandSubtitle="Inventory"
                links={sidebarLinks}
                systemStatus="operational"
                systemStatusLabel="All Systems Online"
            />

            <main className="flex-1 ml-64 p-8">
                <DashboardHeader
                    title="Global Property Inventory"
                    subtitle="Manage and monitor all assets across all regions."
                    showAddButton={true}
                    addButtonLabel="Add Property"
                />

                <InventoryFilters />
                <InventoryTable />
            </main>
        </div>
    )
}
