'use client'

import type { TextareaHTMLAttributes } from 'react'
import { tw } from '@/utils/tailwind'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  id?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
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
      <textarea
        id={id}
        className={tw(
          'w-full px-6 py-4 rounded-xl bg-surface-200 border-none focus:ring-2 focus:ring-primary-500 text-neutral-600 font-medium placeholder-neutral-600/40 resize-none',
          error && 'ring-2 ring-error-500',
          className
        )}
        {...props}
      />
      {error && <p className='text-xs text-error-500 font-medium'>{error}</p>}
    </div>
  )
}
