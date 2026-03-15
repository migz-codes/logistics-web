'use client'

import { useQuery } from '@apollo/client/react'
import { useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Icon } from '@/components/shared/ui/Icon'
import { GET_ME_QUERY, type GetMeResponse } from '@/lib/apollo/mutations/user'
import { userAtoms } from '@/lib/store/user'
import { tw } from '@/utils/tailwind'
import { useSidebarContext } from './context'
import { Logout } from './Logout'

export function AdminSidebar() {
  const t = useTranslations('navigation')
  const pathname = usePathname()
  const setUser = useSetAtom(userAtoms.user)
  const userRole = useAtomValue(userAtoms.userRole)
  const { data } = useQuery<GetMeResponse>(GET_ME_QUERY)
  const { isCollapsed, setIsCollapsed } = useSidebarContext()

  useEffect(() => {
    if (data?.getMe) setUser(data.getMe)
  }, [data, setUser])

  const sidebarLinks = [
    // {
    //   icon: 'analytics',
    //   label: t('dashboard'),
    //   href: '/admin/dashboard',
    //   active: pathname.includes('/admin/dashboard')
    // },
    // {
    //   icon: 'handshake',
    //   label: t('partnerHub'),
    //   href: '/admin/partner-hub',
    //   active: pathname.includes('/admin/partner-hub')
    // },
    {
      icon: 'warehouse',
      label: t('properties'),
      href: '/admin/properties',
      active: pathname.includes('/admin/properties')
    },
    {
      icon: 'business',
      label: t('companies'),
      href: '/admin/companies',
      active: pathname.includes('/admin/companies')
    },
    {
      icon: 'person',
      label: t('account'),
      href: '/admin/account',
      active: pathname.includes('/admin/account')
    },
    ...(userRole === 'ADMIN'
      ? [
          {
            icon: 'warehouse',
            label: t('allWarehouses'),
            href: '/admin/all-warehouses',
            active: pathname.includes('/admin/all-warehouses')
          },
          {
            icon: 'domain',
            label: t('allCompanies'),
            href: '/admin/all-companies',
            active: pathname.includes('/admin/all-companies')
          },
          {
            icon: 'group',
            label: t('allUsers'),
            href: '/admin/users',
            active: pathname.includes('/admin/users')
          }
        ]
      : [])
  ]

  return (
    <aside
      className={tw(
        'bg-neutral-600 text-white border-r border-neutral-dark/20 flex flex-col fixed inset-y-0 z-50 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className='p-4 border-b border-white/10 h-20 flex items-center'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {!isCollapsed && (
              <button
                type='button'
                onClick={() => setIsCollapsed(!isCollapsed)}
                className='text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10'
              >
                <Icon name='chevron_left' size='md' />
              </button>
            )}

            <div className='flex items-center gap-3'>
              {isCollapsed && (
                <button
                  type='button'
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className='text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10'
                >
                  <Icon name='chevron_right' size='md' />
                </button>
              )}

              {!isCollapsed && (
                <div className='flex items-center gap-3 animate-fade-in-left-delayed'>
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
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className='flex-1 p-2 space-y-1'>
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={tw(
              'flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all h-12',
              link.active
                ? 'text-white bg-white/5'
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            )}
            title={isCollapsed ? link.label : undefined}
          >
            <Icon name={link.icon} size='md' />
            {!isCollapsed && <span className='animate-fade-in-left'>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className='p-2 border-t border-white/10 space-y-2'>
        <Link
          href='/'
          className={tw(
            'flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all w-full text-white/50 hover:bg-white/5 hover:text-white h-12'
          )}
          title={isCollapsed ? t('backToSite') : undefined}
        >
          <Icon name='home' size='md' />
          {!isCollapsed && <span className='animate-fade-in-left'>{t('backToSite')}</span>}
        </Link>

        <div>
          <Logout />
        </div>
      </div>
    </aside>
  )
}
