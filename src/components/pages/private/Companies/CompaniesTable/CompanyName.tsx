'use client'

import Image from 'next/image'
import { Icon } from '@/components/shared/ui/Icon'
import type { Company } from '@/types/api'

interface CompanyNameProps {
  company: Company
}

export const CompanyName = ({ company }: CompanyNameProps) => (
  <div className='flex items-center gap-3'>
    <div className='bg-primary-500/10 rounded-lg flex items-center justify-center w-[48px] h-[48px]'>
      {company.logo ? (
        <Image
          width={48}
          height={48}
          unoptimized
          src={company.logo}
          alt={company.name}
          className='rounded object-cover w-full h-full'
        />
      ) : (
        <Icon name='business' className='text-primary-500' />
      )}
    </div>

    <span className='text-sm font-medium text-neutral-600'>{company.name}</span>
  </div>
)
