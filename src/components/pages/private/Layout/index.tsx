'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/pages/private/Layout/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  const sidebarLinks = [
    {
      icon: 'analytics',
      label: 'Dashboard',
      href: '/admin/dashboard',
      active: pathname.startsWith('/admin/dashboard/')
    },
    {
      icon: 'warehouse',
      label: 'Properties',
      href: '/admin/properties',
      active: pathname.startsWith('/admin/properties')
    }
  ]

  return (
    <div className='min-h-screen bg-surface-200 flex'>
      <AdminSidebar
        links={sidebarLinks}
        brandName='Logistics Portal'
        brandSubtitle='Admin Console'
      />

      <main className='flex-1 ml-64 p-8'>{children}</main>
    </div>
  )
}
