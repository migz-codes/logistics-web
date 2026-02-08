'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  const sidebarLinks = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'analytics',
      active: pathname.startsWith('/admin/dashboard/')
    },
    {
      href: '/admin/properties',
      label: 'Properties',
      icon: 'warehouse',
      active: pathname.startsWith('/admin/properties')
    }
  ]

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
