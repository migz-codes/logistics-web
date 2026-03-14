'use client'

import { useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { GET_COMPANIES_QUERY, type GetCompaniesResponse } from '@/lib/apollo/mutations/company'
import { Content } from './Content'
import { CompanyStepProvider } from './context'

interface CompanySelectStepProps {
  selectedCompanyId: string
  onNext: (companyId: string) => void
}

export function CompanySelectStep({ selectedCompanyId, onNext }: CompanySelectStepProps) {
  const t = useTranslations('warehouseEditor')
  const [selected, setSelected] = useState<string>(selectedCompanyId)

  const { data, loading, refetch } = useQuery<GetCompaniesResponse>(GET_COMPANIES_QUERY)

  const companies = data?.getMyCompanies || []

  useEffect(() => {
    if (!selectedCompanyId && companies.length > 0 && !loading) {
      setSelected(companies[0].id)
    }
  }, [companies, loading, selectedCompanyId])

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

      <CompanyStepProvider
        loading={loading}
        companies={companies}
        selected={selected}
        handleSelect={handleSelect}
        handleCompanyCreated={handleCompanyCreated}
      >
        <Content />
      </CompanyStepProvider>

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
