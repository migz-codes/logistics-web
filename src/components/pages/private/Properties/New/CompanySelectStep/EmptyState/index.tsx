'use client'

import { useTranslations } from 'next-intl'
import { CompanyForm } from '@/components/pages/private/Companies/CompanyForm'
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
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer'>
            <Icon name='add' size='sm' />
            {t('companySelect.createFirst')}
          </div>
        }
      />
    </div>
  )
}
