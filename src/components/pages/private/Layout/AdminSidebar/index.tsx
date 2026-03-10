'use client'

import { useQuery } from '@apollo/client/react'
import { useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Icon } from '@/components/shared/ui/Icon'
import { GET_ME_QUERY, type GetMeResponse } from '@/lib/apollo'
import { userAtoms } from '@/lib/store/user'
import { tw } from '@/utils/tailwind'
import { Logout } from './Logout'

export function AdminSidebar() {
  const t = useTranslations('navigation')
  const pathname = usePathname()
  const setUser = useSetAtom(userAtoms.user)
  const isSuperAdmin = useAtomValue(userAtoms.isSuperAdmin)
  const { data } = useQuery<GetMeResponse>(GET_ME_QUERY)

  useEffect(() => {
    if (data?.getMe) {
      setUser(data.getMe)
    }
  }, [data, setUser])

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
    ...(isSuperAdmin
      ? [
          {
            icon: 'group',
            label: t('allUsers'),
            href: '/admin/users',
            active: pathname.startsWith('/admin/users')
          }
        ]
      : []),
    {
      icon: 'person',
      label: t('account'),
      href: '/admin/account',
      active: pathname.startsWith('/admin/account')
    }
  ]

  return (
    <aside className='w-64 bg-neutral-600 text-white border-r border-neutral-dark/20 flex flex-col fixed inset-y-0 z-50'>
      <div className='p-6 border-b border-white/10'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-white/10 flex items-center justify-center rounded-lg rotate-3'>
            <Icon name='rocket_launch' className='text-white -rotate-3' size='md' />
          </div>
          <div className='flex flex-col leading-none'>
            <span className='font-extrabold text-sm tracking-tight text-white uppercase'>
              {t('brandName')}
            </span>
            <span className='text-[8px] font-bold text-secondary-500 tracking-[0.2em] uppercase'>
              {t('brandSubtitle')}
            </span>
          </div>
        </div>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={tw(
              'flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all',
              link.active
                ? 'text-white bg-white/10'
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            )}
          >
            <Icon name={link.icon} size='md' />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className='p-4 border-t border-white/10 space-y-2'>
        <Link
          href='/'
          className='w-full text-white/50 hover:text-white rounded-2xl p-4 flex items-center gap-3 transition-all'
        >
          <Icon name='arrow_back' size='md' />
          <span className='text-sm font-medium'>{t('backToSite')}</span>
        </Link>

        <Logout />
      </div>
    </aside>
  )
}
