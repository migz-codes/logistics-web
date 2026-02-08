'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  showAddButton?: boolean
  addButtonLabel?: string
  onAddClick?: () => void
}

export function DashboardHeader({
  title,
  subtitle,
  showAddButton = true,
  addButtonLabel = 'Invite Partner',
  onAddClick
}: DashboardHeaderProps) {
  return (
    <header className='mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
      <div>
        <h1 className='text-4xl font-extrabold text-earth dark:text-white flex items-center gap-3'>
          <span className='text-secondary'>//</span>
          {title}
        </h1>
        {subtitle && (
          <p className='text-earth/50 dark:text-slate-400 font-medium mt-2'>{subtitle}</p>
        )}
      </div>
      {showAddButton && (
        <Button
          variant='primary'
          icon={<Icon name='person_add' />}
          iconPosition='left'
          onClick={onAddClick}
        >
          {addButtonLabel}
        </Button>
      )}
    </header>
  )
}
