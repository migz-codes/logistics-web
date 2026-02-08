import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

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
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-sage/10 text-sage',
    warning: 'bg-amber-500/10 text-amber-600',
    featured: 'bg-white/95 backdrop-blur-md text-primary shadow-sm',
    outline: 'border border-primary/20 text-primary bg-transparent'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[8px]',
    md: 'px-3 py-1 text-[10px]'
  }

  return (
    <span className={cn(baseClasses, variants[variant], sizes[size], className)}>{children}</span>
  )
}
