'use client'

import { useTranslations } from 'next-intl'
import { CompanyForm } from '@/components/pages/private/Companies/CompanyForm'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { useCompanyStepContext } from '../context'

export function EmptyState() {
  const t = useTranslations('warehouseEditor')

  const { handleCompanyCreated } = useCompanyStepContext()

  return (
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
  )
}
