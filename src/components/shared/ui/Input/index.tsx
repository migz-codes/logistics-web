'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
  error?: string
}

export function Input({ label, icon, error, className, ...props }: InputProps) {
  return (
    <div className='space-y-2'>
      {label && (
        <label className='block text-xs font-black text-earth/50 uppercase tracking-widest'>
          {label}
        </label>
      )}
      <div className='relative'>
        {icon && (
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary'>{icon}</span>
        )}
        <input
          className={cn(
            'w-full px-6 py-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-primary text-earth font-medium placeholder-earth/40',
            // icon && 'pl-12',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
    </div>
  )
}
