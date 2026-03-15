'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_ALL_COMPANIES_QUERY,
  type GetAllCompaniesResponse,
  REMOVE_COMPANY_MUTATION,
  type RemoveCompanyResponse
} from '@/lib/apollo/mutations/company'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'
import type { Company } from '@/types/api'

export function AllCompaniesPage() {
  const t = useTranslations('allCompanies')
  const router = useRouter()
  const userRole = useAtomValue(userAtoms.userRole)
  const isAdmin = userRole === 'ADMIN'
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data, loading, refetch } = useQuery<GetAllCompaniesResponse>(GET_ALL_COMPANIES_QUERY, {
    skip: !isAdmin
  })

  const companies = data?.companies || []
  const totalCount = companies.length
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return companies.slice(start, start + itemsPerPage)
  }, [companies, currentPage])

  const getPageNumbers = () => {
    const pages: number[] = []
    const maxVisible = 5

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const [removeCompany, { loading: deleting }] =
    useMutation<RemoveCompanyResponse>(REMOVE_COMPANY_MUTATION)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/dashboard')
    }
  }, [isAdmin, router])

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

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <PageHeader title={t('title')} description={t('subtitle')} />

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
          <>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-neutral-200'>
                    <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                      {t('table.name')}
                    </th>

                    <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                      {t('table.owner')}
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
                  {paginatedCompanies.length > 0 ? (
                    paginatedCompanies.map((company) => (
                      <tr
                        key={company.id}
                        className='border-b border-neutral-100 hover:bg-neutral-50'
                      >
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-3'>
                            {company.logo ? (
                              <Image
                                src={company.logo}
                                alt={company.name}
                                width={32}
                                height={32}
                                className='w-8 h-8 rounded-lg object-cover'
                                unoptimized
                              />
                            ) : (
                              <div className='w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                                <Icon name='business' className='text-primary-500' size='sm' />
                              </div>
                            )}
                            <span className='text-sm font-medium text-neutral-600'>
                              {company.name}
                            </span>
                          </div>
                        </td>
                        <td className='py-3 px-4 text-sm text-neutral-600/80'>
                          {company.owner_id.slice(0, 8)}...
                        </td>
                        <td className='py-3 px-4 text-sm text-neutral-600/80'>
                          {new Date(company.created_at).toLocaleDateString()}
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
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
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages >= 1 && (
              <div className='p-4 border-t border-neutral-200 flex items-center justify-between'>
                <p className='text-sm text-neutral-600/60'>
                  {t('pagination.showing', {
                    from: (currentPage - 1) * itemsPerPage + 1,
                    to: Math.min(currentPage * itemsPerPage, totalCount),
                    total: totalCount
                  })}
                </p>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Icon name='chevron_left' size='sm' />
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      type='button'
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                        page === currentPage
                          ? 'bg-primary-500 text-white'
                          : 'hover:bg-primary-500/10 text-neutral-600/60'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type='button'
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Icon name='chevron_right' size='sm' />
                  </button>
                </div>
              </div>
            )}
          </>
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
                {t('cancel')}
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
