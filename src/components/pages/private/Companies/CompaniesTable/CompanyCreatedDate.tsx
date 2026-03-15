'use client'

import type { Company } from '@/types/api'

interface CompanyCreatedDateProps {
  company: Company
}

export function CompanyCreatedDate({ company }: CompanyCreatedDateProps) {
  return (
    <span className='text-sm text-neutral-600/80'>
      {new Date(company.created_at).toLocaleDateString()}
    </span>
  )
}
