'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { Dialog } from '@radix-ui/themes'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { toast } from '@/lib/toast'
import type { Warehouse } from '@/types/api'
import { usePropertiesContext } from '../../context'

const DELETE_WAREHOUSE = gql`
  mutation RemoveWarehouse($id: String!) {
    removeWarehouse(id: $id) {
      id
    }
  }
`

export const Properties = () => {
  const t = useTranslations('inventory')
  const router = useRouter()
  const { loading, error, warehouses, refetch } = usePropertiesContext()
  const [deleteTarget, setDeleteTarget] = useState<Warehouse | null>(null)

  const [deleteWarehouse, { loading: deleting }] = useMutation(DELETE_WAREHOUSE)

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      await deleteWarehouse({ variables: { id: deleteTarget.id } })
      toast.success(t('deleteSuccess'))
      setDeleteTarget(null)
      refetch()
    } catch (err) {
      console.error('Error deleting warehouse:', err)
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

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className='p-8 text-center text-neutral-600/50'>
            {t('loading')}
          </td>
        </tr>
      </tbody>
    )
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className='p-8 text-center text-error-500'>
            {t('errorLoading')}: {error}
          </td>
        </tr>
      </tbody>
    )
  }

  if (warehouses.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className='p-8 text-center text-neutral-600/50'>
            {t('noResults')}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {warehouses.map((warehouse) => (
        <tr
          key={warehouse.id}
          className='border-b border-primary-500/5 last:border-b-0 hover:bg-primary-500/5 transition-colors'
        >
          <td className='p-4'>
            <div className='flex items-center gap-3'>
              {warehouse.images && warehouse.images.length > 0 ? (
                <div className='w-16 h-12 rounded-lg overflow-hidden relative'>
                  <NextImage
                    fill
                    src={warehouse.images[0]}
                    alt={warehouse.title}
                    className='object-cover'
                    unoptimized
                  />
                </div>
              ) : (
                <div className='w-16 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                  <Icon name='warehouse' className='text-primary-500' />
                </div>
              )}

              <div>
                <p className='font-bold text-neutral-600 text-sm'>{warehouse.title}</p>

                <p className='text-neutral-600/50 flex items-center gap-1'>
                  <Icon name='location_on' size='sm' />
                  <span>{warehouse.address}</span>
                </p>
              </div>
            </div>
          </td>

          <td className='p-4 text-neutral-600/60'>
            {warehouse.state}, {warehouse.country}
          </td>

          <td className='p-4 text-right font-bold text-neutral-600'>{warehouse.area_total} m²</td>

          <td className='p-4 text-center'>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black ${getStatusStyle(warehouse.status)}`}
            >
              {getStatusLabel(warehouse.status)}
            </span>
          </td>

          <td className='p-4 text-right font-bold text-neutral-600'>R$ {warehouse.price}/m²</td>

          <td className='p-4 text-center'>
            <div className='flex items-center justify-center gap-2'>
              <button
                type='button'
                title={t('actions.view')}
                className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
              >
                <Icon name='visibility' />
              </button>

              <button
                type='button'
                title={t('actions.edit')}
                onClick={() => router.push(`/admin/properties/${warehouse.id}/edit`)}
                className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
              >
                <Icon name='edit' />
              </button>

              <button
                type='button'
                title={t('actions.delete')}
                onClick={() => setDeleteTarget(warehouse)}
                className='p-2 rounded-lg hover:bg-error-500/10 text-neutral-600/40 hover:text-error-500 transition-colors'
              >
                <Icon name='delete' />
              </button>
            </div>
          </td>
        </tr>
      ))}

      <Dialog.Root open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <Dialog.Content maxWidth='400px'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center'>
              <Icon name='delete' className='text-red-500' size='md' />
            </div>

            <Dialog.Title className='text-lg font-bold text-neutral-600 !m-0'>
              {t('deleteModal.title')}
            </Dialog.Title>
          </div>

          <Dialog.Description className='text-sm text-neutral-600/60 py-4'>
            {t('deleteModal.confirm', { name: deleteTarget?.title ?? '' })}
          </Dialog.Description>

          <div className='flex items-center justify-end gap-3 pt-4'>
            <Dialog.Close>
              <Button type='button' variant='secondary'>
                {t('deleteModal.cancel')}
              </Button>
            </Dialog.Close>

            <Button variant='danger' onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Icon name='progress_activity' className='animate-spin' size='sm' />
                  {t('deleteModal.deleting')}
                </>
              ) : (
                <>
                  <Icon name='delete' size='sm' />
                  {t('deleteModal.delete')}
                </>
              )}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </tbody>
  )
}
