'use client'

import type { ReactNode } from 'react'
import { tw } from '@/utils/tailwind'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ isOpen, onClose, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      />

      {/* Modal */}
      <div
        className={tw(
          'relative w-full bg-white rounded-xl shadow-xl max-h-[90vh] overflow-auto',
          sizeClasses[size]
        )}
        role='document'
      >
        {/* Close button */}
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors'
          aria-label='Close modal'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
