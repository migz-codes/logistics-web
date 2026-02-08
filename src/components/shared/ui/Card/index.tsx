import type { ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, variant = 'default', padding = 'lg' }: CardProps) {
  const baseClasses = 'bg-white rounded-[2rem] transition-all'

  const variants = {
    default: 'border border-primary/5',
    elevated: 'shadow-2xl border border-primary/5',
    outlined: 'border-2 border-primary/10'
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 md:p-10'
  }

  return (
    <div className={tw(baseClasses, variants[variant], paddings[padding], className)}>
      {children}
    </div>
  )
}
