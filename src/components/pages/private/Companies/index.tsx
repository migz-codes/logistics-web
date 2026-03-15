'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_COMPANIES_QUERY,
  type GetCompaniesResponse,
  REMOVE_COMPANY_MUTATION,
  type RemoveCompanyResponse
} from '@/lib/apollo/mutations/company'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
import type { Company } from '@/types/api'
import { CompaniesTable } from './CompaniesTable'
import { CompanyForm } from './CompanyForm'

export function CompaniesPage() {
  const t = useTranslations('companies')
  const router = useRouter()
  const userRole = useAtomValue(userAtoms.userRole)
  const canAccess = userRole === 'ADMIN' || userRole === 'INVESTOR_ADMIN'
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)

  const { data, loading, refetch } = useQuery<GetCompaniesResponse>(GET_COMPANIES_QUERY, {
    skip: !canAccess
  })

  const [removeCompany, { loading: deleting }] =
    useMutation<RemoveCompanyResponse>(REMOVE_COMPANY_MUTATION)

  useEffect(() => {
    if (!canAccess) {
      router.push('/admin/dashboard')
    }
  }, [canAccess, router])

  const handleDeleteCompany = async () => {
    if (!deleteTarget) return

    try {
      await removeCompany({ variables: { id: deleteTarget.id } })
      toast.success(t('deleted'))
      setDeleteTarget(null)
      refetch()
    } catch {
      toast.error(t('deleteError'))
    }
  }

  if (!canAccess) {
    return null
  }

  return (
    <>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <div className='mb-6 flex justify-end'>
        <CompanyForm
          onSuccess={refetch}
          trigger={
            <Button variant='primary'>
              <Icon name='add' size='sm' />
              {t('create')}
            </Button>
          }
        />
      </div>

      <Card variant='elevated'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
            <Icon name='business' className='text-primary-500' size='lg' />
          </div>
          <div>
            <h2 className='text-lg font-bold text-neutral-600'>{t('listTitle')}</h2>
            <p className='text-sm text-neutral-600/60'>{t('listSubtitle')}</p>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Icon name='progress_activity' className='text-primary-500 animate-spin' size='xl' />
          </div>
        ) : (
          <CompaniesTable companies={data?.getMyCompanies || []} onRefetch={refetch} />
        )}
      </Card>

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
                {t('form.cancel')}
              </Button>
            </Dialog.Close>

            <Button variant='danger' onClick={handleDeleteCompany} disabled={deleting}>
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
