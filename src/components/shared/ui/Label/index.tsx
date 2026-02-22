'use client'

import type { ReactNode } from 'react'

interface ILabelProps {
  id?: string
  label?: string
  error?: string
  children: ReactNode
}

export function Label({ id, label, error, children }: ILabelProps) {
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

      {children}

      {error && <span className='text-xs text-error-500 font-medium'>{error}</span>}
    </div>
  )
}
