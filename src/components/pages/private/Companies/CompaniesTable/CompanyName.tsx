'use client'

import Image from 'next/image'
import { Icon } from '@/components/shared/ui/Icon'
import type { Company } from '@/types/api'

interface CompanyNameProps {
  company: Company
}

export const CompanyName = ({ company }: CompanyNameProps) => (
  <div className='flex items-center gap-3'>
    <div className='bg-primary-500/10 rounded-lg flex items-center justify-center'>
      {company.logo ? (
        <Image
          width={48}
          height={48}
          unoptimized
          src={company.logo}
          alt={company.name}
          className='rounded object-cover w-[64px] h-[64px]'
        />
      ) : (
        <Icon name='business' className='text-primary-500' size='sm' />
      )}
    </div>

    <span className='text-sm font-medium text-neutral-600'>{company.name}</span>
  </div>
)
