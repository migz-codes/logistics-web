'use client'

import type { ReactNode, SelectHTMLAttributes } from 'react'
import { tw } from '@/utils/tailwind'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: ReactNode
  options: SelectOption[]
  error?: string
}

export function Select({ label, icon, options, error, className, ...props }: SelectProps) {
  return (
    <div className='space-y-2'>
      {label && (
        <label
          htmlFor={props.id}
          className='block text-xs font-black text-earth/50 uppercase tracking-widest'
        >
          {label}
        </label>
      )}

      <div className='relative'>
        {icon && (
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none'>
            {icon}
          </span>
        )}
        <select
          className={tw(
            'w-full px-6 py-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-primary text-earth font-medium cursor-pointer',
            icon && 'pl-12',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
    </div>
  )
}
