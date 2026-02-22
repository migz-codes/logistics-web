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
    <textarea
      id={id}
      className={tw(
        'w-full px-6 py-4 rounded-xl bg-surface-200 text-neutral-600 font-medium placeholder-neutral-600/40 resize-none border-2 !outline-none !ring-none',
        error
          ? 'border-error-500 focus:border-error-500'
          : 'border-transparent focus:border-primary-500',
        className
      )}
      {...props}
    />
  )
}
