'use client'

import { useQuery } from '@apollo/client/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { CompanyForm } from '@/components/pages/private/Companies/CompanyForm'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import {
  type Company,
  GET_COMPANIES_QUERY,
  type GetCompaniesResponse
} from '@/lib/apollo/mutations/company'

interface CompanySelectStepProps {
  selectedCompanyId: string
  onNext: (companyId: string) => void
}

export function CompanySelectStep({ selectedCompanyId, onNext }: CompanySelectStepProps) {
  const t = useTranslations('warehouseEditor')
  const [selected, setSelected] = useState<string>(selectedCompanyId)

  const { data, loading, refetch } = useQuery<GetCompaniesResponse>(GET_COMPANIES_QUERY)

  const companies = data?.getMyCompanies || []

  const handleSelect = (companyId: string) => {
    setSelected(companyId)
  }

  const handleNext = () => {
    if (selected) {
      onNext(selected)
    }
  }

  const handleCompanyCreated = () => {
    refetch()
  }

  return (
    <Card variant='elevated'>
      <h2 className='text-2xl font-bold text-neutral-600 mb-2 flex items-center gap-3'>
        <Icon name='business' className='text-primary-500' />
        {t('companySelect.title')}
      </h2>

      <p className='text-neutral-600/60 mb-8'>{t('companySelect.subtitle')}</p>

      {loading ? (
        <div className='flex items-center justify-center py-12'>
          <Icon name='progress_activity' className='text-primary-500 animate-spin' size='xl' />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {companies.map((company: Company) => (
            <button
              key={company.id}
              type='button'
              onClick={() => handleSelect(company.id)}
              className={`
                p-4 rounded-xl border-2 transition-all text-left
                ${
                  selected === company.id
                    ? 'border-primary-500 bg-primary-500/5'
                    : 'border-neutral-200 hover:border-primary-500/50 hover:bg-neutral-50'
                }
              `}
            >
              <div className='flex items-center gap-3'>
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={48}
                    height={48}
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <div className='w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                    <Icon name='business' className='text-primary-500' size='md' />
                  </div>
                )}

                <div className='flex-1 min-w-0'>
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
                className='p-4 rounded-xl border-2 border-dashed border-neutral-300 hover:border-primary-500 hover:bg-primary-500/5 transition-all flex items-center justify-center gap-3 min-h-[80px]'
              >
                <Icon name='add' className='text-primary-500' size='md' />
                <span className='font-medium text-neutral-600'>{t('companySelect.create')}</span>
              </button>
            }
          />
        </div>
      )}

      {companies.length === 0 && !loading && (
        <div className='text-center py-8'>
          <Icon name='business' className='text-neutral-400 mx-auto mb-3' size='xl' />
          <p className='text-neutral-500 mb-4'>{t('companySelect.noCompanies')}</p>
          <CompanyForm
            onSuccess={handleCompanyCreated}
            trigger={
              <Button variant='primary'>
                <Icon name='add' size='sm' />
                {t('companySelect.createFirst')}
              </Button>
            }
          />
        </div>
      )}

      <div className='flex justify-end pt-6 border-t border-primary-500/5 mt-6'>
        <Button
          type='button'
          variant='primary'
          onClick={handleNext}
          disabled={!selected}
          icon={<Icon name='arrow_forward' />}
        >
          {t('form.nextButton')}
        </Button>
      </div>
    </Card>
  )
}
