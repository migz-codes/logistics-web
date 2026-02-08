'use client'

import Link from 'next/link'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

interface NavigationLink {
  href: string
  label: string
  active?: boolean
}

interface NavigationProps {
  brandName?: string
  brandIcon?: string
  brandSubtitle?: string
  links?: NavigationLink[]
  showLogin?: boolean
  showSignIn?: boolean
  loginLabel?: string
  signInLabel?: string
  variant?: 'default' | 'portal'
}

export function Navigation({
  brandName = 'Real Estate',
  brandIcon = 'home',
  brandSubtitle,
  links = [],
  showLogin = true,
  showSignIn = true,
  loginLabel = 'Log In',
  signInLabel = 'Sign In',
  variant = 'default'
}: NavigationProps) {
  return (
    <nav className='fixed top-0 w-full z-50 px-6 py-6'>
      <div className='max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-sm border border-primary/5'>
        {/* Brand */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-primary flex items-center justify-center rounded-xl rotate-3'>
            <Icon name={brandIcon} className='text-white -rotate-3' size='lg' />
          </div>
          <div className='flex flex-col leading-none'>
            <span className='font-extrabold text-2xl tracking-tight text-earth'>{brandName}</span>
            {brandSubtitle && (
              <span className='text-[10px] font-bold text-primary tracking-[0.2em] uppercase'>
                {brandSubtitle}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        {links.length > 0 && (
          <div className='hidden lg:flex items-center gap-10 text-sm font-bold uppercase tracking-wider'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  link.active ? 'text-primary' : 'text-earth hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className='flex items-center gap-4'>
          {showLogin && (
            <button className='px-6 py-2.5 text-sm font-bold text-earth/70 hover:text-primary transition-all'>
              {loginLabel}
            </button>
          )}
          {showSignIn && (
            <Button variant='primary' size='sm'>
              {signInLabel}
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
