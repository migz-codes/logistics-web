'use client'

import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className='space-y-2'>
      {label && (
        <label className='block text-xs font-black text-earth/50 uppercase tracking-widest'>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-6 py-4 rounded-xl bg-cream border-none focus:ring-2 focus:ring-primary text-earth font-medium placeholder-earth/40 resize-none',
          error && 'ring-2 ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
    </div>
  )
}
