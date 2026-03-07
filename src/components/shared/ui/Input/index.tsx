'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  icon?: ReactNode
  error?: string
}

export function Input({ id, label, icon, className, error, ...props }: InputProps) {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-sm font-medium text-neutral-600'>
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
    </div>
  )
}
