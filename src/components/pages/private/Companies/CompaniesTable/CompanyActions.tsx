'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_COMPANIES_QUERY,
  REMOVE_COMPANY_MUTATION,
  type RemoveCompanyResponse
} from '@/lib/apollo/mutations/company'
import { toast } from '@/lib/toast'
import type { Company } from '@/types/api'
import { CompanyForm } from '../CompanyForm'

interface CompanyActionsProps {
  company: Company
}

export const CompanyActions = ({ company }: CompanyActionsProps) => {
  const t = useTranslations('companies')

  const { refetch } = useQuery(GET_COMPANIES_QUERY, { skip: true })
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)

  const [removeCompany, { loading: deleting }] =
    useMutation<RemoveCompanyResponse>(REMOVE_COMPANY_MUTATION)

  const handleDelete = async () => {
    try {
      await removeCompany({ variables: { id: company.id } })
      toast.success(t('deleteSuccess'))
      refetch()
    } catch {
      toast.error(t('deleteError'))
    }
  }

  return (
    <>
      <div className='flex items-center gap-2'>
        <CompanyForm
          company={company}
          onSuccess={() => refetch()}
          trigger={
            <Button size='sm' variant='secondary'>
              <Icon name='edit' size='sm' />
            </Button>
          }
        />

        <Button
          size='sm'
          variant='secondary'
          onClick={() => setDeleteTarget(company)}
          disabled={deleting}
        >
          <Icon name='delete' size='sm' />
        </Button>
      </div>

      <Dialog.Root open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <Dialog.Content maxWidth='400px'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center'>
              <Icon name='delete' className='text-red-500' size='md' />
            </div>

            <Dialog.Title className='text-lg font-bold text-neutral-600 !m-0'>
              {t('deleteTitle')}
            </Dialog.Title>
          </div>

          <Dialog.Description className='text-sm text-neutral-600/60 py-4'>
            {t('deleteConfirm', { name: deleteTarget?.name ?? '' })}
          </Dialog.Description>

          <div className='flex items-center justify-end gap-3 pt-4'>
            <Dialog.Close>
              <Button type='button' variant='secondary'>
                Cancel
              </Button>
            </Dialog.Close>

            <Button variant='danger' onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Icon name='progress_activity' className='animate-spin' size='sm' />
                  {t('deleting')}
                </>
              ) : (
                <>
                  <Icon name='delete' size='sm' />
                  {t('delete')}
                </>
              )}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
