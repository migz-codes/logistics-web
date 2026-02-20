import type { ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'featured' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'primary', size = 'md', className }: BadgeProps) {
  const baseClasses =
    'font-black uppercase tracking-widest rounded-full inline-flex items-center justify-center'

  const variants = {
    primary: 'bg-primary-500/10 text-primary-500',
    secondary: 'bg-secondary-500/10 text-secondary-500',
    success: 'bg-sage-500/10 text-sage-500',
    warning: 'bg-warning-500/10 text-warning-600',
    featured: 'bg-white/95 backdrop-blur-md text-primary-500 shadow-sm',
    outline: 'border border-primary-500/20 text-primary-500 bg-transparent'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[8px]',
    md: 'px-3 py-1 text-[10px]'
  }

  return (
    <span className={tw(baseClasses, variants[variant], sizes[size], className)}>{children}</span>
  )
}
