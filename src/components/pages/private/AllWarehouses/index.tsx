'use client'

import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'

interface Warehouse {
  id: string
  title: string
  address: string
  city: string
  state: string
  country: string
  area_total: number
  price: string
  status: string
  images: string[]
  company?: {
    id: string
    name: string
  }
}

const GET_ALL_WAREHOUSES = gql`
  query GetAllWarehouses {
    warehouses {
      id
      title
      address
      city
      state
      country
      area_total
      price
      status
      images
      company {
        id
        name
      }
    }
  }
`

const DELETE_WAREHOUSE = gql`
  mutation RemoveWarehouse($id: String!) {
    removeWarehouse(id: $id) {
      id
    }
  }
`

interface GetAllWarehousesResponse {
  warehouses: Warehouse[]
}

export function AllWarehousesPage() {
  const t = useTranslations('allWarehouses')
  const router = useRouter()
  const userRole = useAtomValue(userAtoms.userRole)
  const isAdmin = userRole === 'ADMIN'
  const [deleteTarget, setDeleteTarget] = useState<Warehouse | null>(null)

  const { data, loading, refetch } = useQuery<GetAllWarehousesResponse>(GET_ALL_WAREHOUSES, {
    skip: !isAdmin
  })

  const [deleteWarehouse, { loading: deleting }] = useMutation(DELETE_WAREHOUSE)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/dashboard')
    }
  }, [isAdmin, router])

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      await deleteWarehouse({ variables: { id: deleteTarget.id } })
      toast.success(t('deleteSuccess'))
      setDeleteTarget(null)
      refetch()
    } catch {
      toast.error(t('deleteError'))
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-success-500/10 text-success-500'
      case 'UNAVAILABLE':
        return 'bg-error-500/10 text-error-500'
      default:
        return 'bg-neutral-500/10 text-neutral-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return t('status.available')
      case 'UNAVAILABLE':
        return t('status.unavailable')
      default:
        return status
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
            <Icon name='warehouse' className='text-primary-500' size='lg' />
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
                    {t('table.warehouse')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.company')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.region')}
                  </th>
                  <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.area')}
                  </th>
                  <th className='text-center py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.status')}
                  </th>
                  <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.price')}
                  </th>
                  <th className='text-center py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.warehouses && data.warehouses.length > 0 ? (
                  data.warehouses.map((warehouse) => (
                    <tr
                      key={warehouse.id}
                      className='border-b border-neutral-100 hover:bg-neutral-50'
                    >
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-3'>
                          {warehouse.images && warehouse.images.length > 0 ? (
                            <div className='w-12 h-9 rounded-lg overflow-hidden relative'>
                              <NextImage
                                fill
                                src={warehouse.images[0]}
                                alt={warehouse.title}
                                className='object-cover'
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className='w-12 h-9 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                              <Icon name='warehouse' className='text-primary-500' size='sm' />
                            </div>
                          )}
                          <div>
                            <p className='text-sm font-medium text-neutral-600'>
                              {warehouse.title}
                            </p>
                            <p className='text-xs text-neutral-600/50 flex items-center gap-1'>
                              <Icon name='location_on' size='sm' />
                              {warehouse.address}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 bg-primary-500/10 rounded flex items-center justify-center'>
                            <Icon name='business' className='text-primary-500' size='sm' />
                          </div>
                          <span className='text-sm text-neutral-600/80'>
                            {warehouse.company?.name || '-'}
                          </span>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-sm text-neutral-600/80'>
                        {warehouse.state}, {warehouse.country}
                      </td>
                      <td className='py-3 px-4 text-right text-sm font-medium text-neutral-600'>
                        {warehouse.area_total} m²
                      </td>
                      <td className='py-3 px-4 text-center'>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(warehouse.status)}`}
                        >
                          {getStatusLabel(warehouse.status)}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-right text-sm font-medium text-neutral-600'>
                        R$ {warehouse.price}/m²
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <Button
                            size='sm'
                            variant='secondary'
                            onClick={() => router.push(`/admin/properties/${warehouse.id}/edit`)}
                          >
                            <Icon name='edit' size='sm' />
                          </Button>
                          <Button
                            size='sm'
                            variant='secondary'
                            onClick={() => setDeleteTarget(warehouse)}
                          >
                            <Icon name='delete' size='sm' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='py-12 text-center'>
                      <div className='flex flex-col items-center gap-3'>
                        <Icon name='warehouse' className='text-neutral-400' size='xl' />
                        <p className='text-sm text-neutral-500'>{t('noWarehouses')}</p>
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
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center'>
              <Icon name='delete' className='text-red-500' size='md' />
            </div>

            <Dialog.Title className='text-lg font-bold text-neutral-600 !m-0'>
              {t('deleteTitle')}
            </Dialog.Title>
          </div>

          <Dialog.Description className='text-sm text-neutral-600/60 py-4'>
            {t('deleteConfirm', { name: deleteTarget?.title ?? '' })}
          </Dialog.Description>

          <div className='flex items-center justify-end gap-3 pt-4'>
            <Dialog.Close>
              <Button type='button' variant='secondary'>
                {t('cancel')}
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
