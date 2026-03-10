'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AdminSidebar } from '@/components/pages/private/Layout/AdminSidebar'
import { tw } from '@/utils/tailwind'
import { SidebarProvider } from './AdminSidebar/context'
import { PageTransition } from './PageTransition'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <SidebarProvider isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className='min-h-screen bg-surface-200 flex flex-row'>
        <AdminSidebar />

        <main
          className={tw('flex-1 p-8 transition-all duration-300', isCollapsed ? 'ml-16' : 'ml-64')}
        >
          <PageTransition pageKey={pathname}>{children}</PageTransition>
        </main>
      </div>
    </SidebarProvider>
  )
}
