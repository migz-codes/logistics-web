'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import {
  type Company,
  DELETE_COMPANY_MUTATION,
  type DeleteCompanyResponse,
  GET_COMPANIES_QUERY,
  type GetCompaniesResponse
} from '@/lib/apollo/mutations/company'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
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

  const [deleteCompany, { loading: deleting }] =
    useMutation<DeleteCompanyResponse>(DELETE_COMPANY_MUTATION)

  useEffect(() => {
    if (!canAccess) {
      router.push('/admin/dashboard')
    }
  }, [canAccess, router])

  const handleDeleteCompany = async () => {
    if (!deleteTarget) return

    try {
      await deleteCompany({ variables: { id: deleteTarget.id } })
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
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-neutral-200'>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.name')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.logo')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.created')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.getMyCompanies && data.getMyCompanies.length > 0 ? (
                  data.getMyCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className='border-b border-neutral-100 hover:bg-neutral-50'
                    >
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                            <Icon name='business' className='text-primary-500' size='sm' />
                          </div>
                          <span className='text-sm font-medium text-neutral-600'>
                            {company.name}
                          </span>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={32}
                            height={32}
                            className='rounded object-cover'
                          />
                        ) : (
                          <div className='w-8 h-8 bg-neutral-200 rounded flex items-center justify-center'>
                            <Icon name='image' className='text-neutral-400' size='sm' />
                          </div>
                        )}
                      </td>
                      <td className='py-3 px-4 text-sm text-neutral-600/80'>
                        {new Date(company.created_at).toLocaleDateString()}
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-2'>
                          <CompanyForm
                            company={company}
                            onSuccess={refetch}
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
                          >
                            <Icon name='delete' size='sm' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className='py-12 text-center'>
                      <div className='flex flex-col items-center gap-3'>
                        <Icon name='business' className='text-neutral-400' size='xl' />
                        <p className='text-sm text-neutral-500'>{t('noCompanies')}</p>
                        <CompanyForm
                          onSuccess={refetch}
                          trigger={
                            <Button variant='primary' size='sm'>
                              <Icon name='add' size='sm' />
                              {t('createFirst')}
                            </Button>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Dialog.Root open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <Dialog.Content maxWidth='400px'>
          <div className='flex items-center gap-2 h-[48px] mb-6'>
            <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center'>
              <Icon name='delete' className='text-red-500' size='md' />
            </div>

            <div className='flex flex-col justify-center h-[48px]'>
              <Dialog.Title className='text-sm font-bold text-neutral-600 h-[24px] flex !m-[0px] !p-[0px]'>
                {t('deleteTitle')}
              </Dialog.Title>

              <Dialog.Description className='text-xs text-neutral-600/60 h-[24px] flex !m-[0px] !p-[0px]'>
                {t('deleteConfirm', { name: deleteTarget?.name ?? '' })}
              </Dialog.Description>
            </div>
          </div>

          <div className='flex items-center justify-end gap-3 pt-4 border-t border-neutral-200'>
            <Dialog.Close>
              <Button type='button' variant='secondary'>
                {t('form.cancel')}
              </Button>
            </Dialog.Close>

            <Button variant='primary' onClick={handleDeleteCompany} disabled={deleting}>
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
