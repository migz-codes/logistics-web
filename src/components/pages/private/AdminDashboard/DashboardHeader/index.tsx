'use client'

import type { IClassNameProps } from '@/types/react.types'
import { tw } from '@/utils/tailwind'

interface DashboardHeaderProps extends IClassNameProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle, className }: DashboardHeaderProps) {
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
        {subtitle && <p className='text-neutral-600/50 font-medium mt-2'>{subtitle}</p>}
      </div>
    </header>
  )
}
