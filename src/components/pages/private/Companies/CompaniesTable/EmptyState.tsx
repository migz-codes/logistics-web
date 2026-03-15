'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { CompanyForm } from '../CompanyForm'

interface EmptyStateProps {
  onRefetch: () => void
  createText: string
}

export const EmptyState = ({ onRefetch, createText }: EmptyStateProps) => (
  <div className='flex flex-col items-center gap-3'>
    <Icon name='business' className='text-neutral-400' size='xl' />

    <p className='text-sm text-neutral-500'>No companies found</p>

    <CompanyForm
      onSuccess={onRefetch}
      trigger={
        <Button variant='primary' size='sm'>
          <Icon name='add' size='sm' />
          {createText}
        </Button>
      }
    />
  </div>
)
