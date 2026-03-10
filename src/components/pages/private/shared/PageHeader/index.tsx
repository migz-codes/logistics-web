'use client'

import type { IClassNameProps } from '@/types/react.types'
import { tw } from '@/utils/tailwind'

interface PageHeaderProps extends IClassNameProps {
  title: string
  description?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header
      className={tw(
        'mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6',
        className
      )}
    >
      <div>
        <h1 className='text-4xl font-extrabold text-neutral-600 flex items-center gap-3'>
          <span className='text-secondary-500'>{`//`}</span>
          {title}
        </h1>

        {description && <p className='text-neutral-600/50 font-medium mt-2'>{description}</p>}
      </div>
    </header>
  )
}
