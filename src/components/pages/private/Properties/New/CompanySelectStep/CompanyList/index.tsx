'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { CompanyForm } from '@/components/pages/private/Companies/CompanyForm'
import { Icon } from '@/components/shared/ui/Icon'
import type { Company } from '@/types/api'
import { useCompanyStepContext } from '../context'

export function CompanyList() {
  const t = useTranslations('warehouseEditor')

  const { companies, selected, handleCompanyCreated, handleSelect } = useCompanyStepContext()

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {companies?.map((company: Company) => (
        <button
          key={company.id}
          type='button'
          onClick={() => handleSelect(company.id)}
          className={`
            p-4 rounded-xl border-2 transition-all text-left w-[216px]
            ${
              selected === company.id
                ? 'border-primary-500 bg-primary-500/5'
                : 'border-neutral-200 hover:border-primary-500/50 hover:bg-neutral-50'
            }
          `}
        >
          <div className='flex flex-col items-center gap-3'>
            {company.logo ? (
              <div className='rounded-lg w-[180px] h-[180px] overflow-hidden border'>
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={180}
                  height={180}
                  className='object-cover w-[180px] h-[180px] overflow-hidden'
                  unoptimized
                />
              </div>
            ) : (
              <div className='w-[100px] h-[100px] bg-primary-500/10 rounded-lg flex items-center justify-center'>
                <Icon name='business' className='text-primary-500' size='xl' />
              </div>
            )}

            <div className='flex-1 min-w-0 text-center w-full'>
              <h3 className='font-semibold text-neutral-600 truncate'>{company.name}</h3>
              <p className='text-xs text-neutral-600/60'>
                {new Date(company.created_at).toLocaleDateString()}
              </p>
            </div>

            {selected === company.id && (
              <Icon name='check_circle' className='text-primary-500' size='md' />
            )}
          </div>
        </button>
      ))}

      <CompanyForm
        onSuccess={handleCompanyCreated}
        trigger={
          <button
            type='button'
            className='p-4 rounded-xl border-2 border-dashed border-neutral-300 hover:border-primary-500 hover:bg-primary-500/5 transition-all flex items-center justify-center gap-3 min-h-[80px] w-[216px]'
          >
            <Icon name='add' className='text-primary-500' size='md' />
            <span className='font-medium text-neutral-600'>{t('companySelect.create')}</span>
          </button>
        }
      />
    </div>
  )
}
