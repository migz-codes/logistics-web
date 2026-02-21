'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  error?: string
  icon?: ReactNode
}

export function Input({ id, label, icon, error, className, ...props }: InputProps) {
  return (
    <div className='space-y-2'>
      {label && (
        <label
          className='block text-xs font-black text-neutral-600/50 uppercase tracking-widest'
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className='relative'>
        {icon && (
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary-500'>{icon}</span>
        )}

        <input
          id={id}
          className={tw(
            'w-full px-6 py-4 rounded-xl bg-surface-200 border-none focus:ring-2 focus:ring-primary-500 text-neutral-600 font-medium placeholder-neutral-600/40',
            icon && 'pl-12',
            error && 'ring-2 ring-error-500',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className='text-xs text-error-500 font-medium'>{error}</p>}
    </div>
  )
}
