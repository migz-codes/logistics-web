'use client'

import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'analytics', active: true },
  { href: '/admin/inventory', label: 'Inventory', icon: 'warehouse', active: false },
  { href: '/admin/partners', label: 'Partners', icon: 'handshake', active: false },
  { href: '/admin/properties', label: 'Properties', icon: 'domain', active: false },
  { href: '/admin/settings', label: 'Settings', icon: 'settings', active: false }
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='min-h-screen bg-cream flex'>
      <AdminSidebar
        links={sidebarLinks}
        brandName='Logistics Portal'
        brandSubtitle='Admin Console'
      />

      <main className='flex-1 ml-64 p-8'>{children}</main>
    </div>
  )
}
