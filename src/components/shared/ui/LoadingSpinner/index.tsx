'use client'

import { Icon } from '@/components/shared/ui/Icon'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function LoadingSpinner({ size = 'xl', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <Icon name='progress_activity' className='text-primary-500 animate-spin' size={size} />
    </div>
  )
}
