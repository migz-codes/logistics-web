'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AdminSidebar } from '@/components/pages/private/Layout/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const t = useTranslations('navigation')

  const sidebarLinks = [
    {
      icon: 'analytics',
      label: t('dashboard'),
      href: '/admin/dashboard',
      active: pathname.startsWith('/admin/dashboard/')
    },
    {
      icon: 'warehouse',
      label: t('properties'),
      href: '/admin/properties',
      active: pathname.startsWith('/admin/properties')
    },
    {
      icon: 'person',
      label: t('account'),
      href: '/admin/account',
      active: pathname.startsWith('/admin/account')
    }
  ]

  return (
    <div className='min-h-screen bg-surface-200 flex'>
      <AdminSidebar
        links={sidebarLinks}
        brandName={t('brandName')}
        brandSubtitle={t('brandSubtitle')}
      />

      <main className='flex-1 ml-64 p-8'>{children}</main>
    </div>
  )
}
