'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { useRefetchCompanies } from '@/hooks/useRefetchCompanies'
import { CompanyForm } from './CompanyForm'

export function CompaniesHeader() {
  const t = useTranslations('companies')
  const refetchCompanies = useRefetchCompanies()

  return (
    <div className='flex items-center gap-4 mb-6'>
      <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
        <Icon name='business' className='text-primary-500' size='lg' />
      </div>

      <div>
        <h2 className='text-lg font-bold text-neutral-600'>{t('listTitle')}</h2>
        <p className='text-sm text-neutral-600/60'>{t('listSubtitle')}</p>
      </div>

      <div className='mb-6 flex justify-end ml-auto'>
        <CompanyForm
          onSuccess={refetchCompanies}
          trigger={
            <Button variant='primary'>
              <Icon name='add' size='sm' />
              {t('create')}
            </Button>
          }
        />
      </div>
    </div>
  )
}
