'use client'

import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
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
  const { loading, error, warehouses, refetch } = usePropertiesContext()

  const [deleteWarehouse] = useMutation(DELETE_WAREHOUSE)

  const handleDelete = async (id: string) => {
    try {
      await deleteWarehouse({ variables: { id } })
      refetch()
    } catch (err) {
      console.error('Error deleting warehouse:', err)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-success-500/10 text-success-500'
      case 'leased':
        return 'bg-secondary-500/10 text-secondary-500'
      case 'under-construction':
        return 'bg-amber-500/10 text-amber-500'
      case 'maintenance':
        return 'bg-error-500/10 text-error-500'
      default:
        return 'bg-neutral-500/10 text-neutral-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return t('status.available')
      case 'leased':
        return t('status.leased')
      case 'under-construction':
        return t('status.underConstruction')
      case 'maintenance':
        return t('status.maintenance')
      default:
        return status
    }
  }

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className='p-8 text-center text-neutral-600/50'>
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
          <td colSpan={7} className='p-8 text-center text-error-500'>
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
          <td colSpan={7} className='p-8 text-center text-neutral-600/50'>
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
              <div className='w-16 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center'>
                <Icon name='warehouse' className='text-primary-500' />
              </div>

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

          <td className='p-4 text-neutral-600/60'>{warehouse.category}</td>

          <td className='p-4 text-right font-bold text-neutral-600'>{warehouse.area} m²</td>

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
                className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
              >
                <Icon name='edit' />
              </button>

              <button
                type='button'
                title={t('actions.delete')}
                onClick={() => handleDelete(warehouse.id)}
                className='p-2 rounded-lg hover:bg-error-500/10 text-neutral-600/40 hover:text-error-500 transition-colors'
              >
                <Icon name='delete' />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
