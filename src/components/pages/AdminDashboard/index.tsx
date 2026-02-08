'use client'

import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'
import { DashboardHeader } from './DashboardHeader'
import { KpiCards } from './KpiCards'
import { PartnersTable } from './PartnersTable'
import { AssetsOverview } from './AssetsOverview'

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'analytics', active: true },
    { href: '/admin/inventory', label: 'Inventory', icon: 'warehouse', active: false },
    { href: '/admin/partners', label: 'Partners', icon: 'handshake', active: false },
    { href: '/admin/properties', label: 'Properties', icon: 'domain', active: false },
    { href: '/admin/settings', label: 'Settings', icon: 'settings', active: false }
]

export function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-cream dark:bg-background-dark flex">
            <AdminSidebar
                brandName="Logistics Portal"
                brandSubtitle="Admin Console"
                links={sidebarLinks}
                systemStatus="operational"
                systemStatusLabel="12 Nodes Active"
            />

            <main className="flex-1 ml-64 p-8">
                <DashboardHeader
                    title="Partner & Investor Hub"
                    subtitle="Centralized control for all investment and partnership activities."
                />

                <KpiCards />

                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                        <PartnersTable />
                    </div>
                    <div>
                        <AssetsOverview />
                    </div>
                </div>
            </main>
        </div>
    )
}
