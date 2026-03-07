'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'neutral' | 'whatsapp' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-sage-500 shadow-lg shadow-primary-500/10',
  secondary:
    'bg-secondary-500 text-white hover:bg-secondary-500/90 shadow-lg shadow-secondary-500/20',
  outline: 'border-2 border-primary-500/20 text-primary-500 hover:bg-primary-500 hover:text-white',
  neutral: 'bg-neutral-600 text-white hover:bg-neutral-dark shadow-lg shadow-neutral-600/10',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fb356] shadow-lg shadow-[#25D366]/20',
  ghost: 'text-neutral-600/70 hover:text-primary-500'
}

const sizes = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  iconPosition = 'right',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-bold rounded-2xl transition-all inline-flex items-center justify-center gap-2'

  return (
    <button className={tw(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
