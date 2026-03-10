'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/pages/private/Layout/AdminSidebar'
import { tw } from '@/utils/tailwind'
import { SidebarProvider } from './AdminSidebar/context'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <SidebarProvider isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className='min-h-screen bg-surface-200 flex flex-row'>
        <AdminSidebar />

        <main
          className={tw('flex-1 p-8 transition-all duration-300', isCollapsed ? 'ml-16' : 'ml-64')}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
