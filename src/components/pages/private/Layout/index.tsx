'use client'

import { AdminSidebar } from '@/components/pages/private/Layout/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='min-h-screen bg-surface-200 flex'>
      <AdminSidebar />

      <main className='flex-1 ml-64 p-8'>{children}</main>
    </div>
  )
}
