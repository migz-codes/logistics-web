'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { Select } from '@/components/shared/ui/Select'
import { usePropertiesContext } from '../context'

export function InventoryFilters() {
  const router = useRouter()
  const t = useTranslations('inventory')
  const { filters, setFilters } = usePropertiesContext()

  const regionOptions = [
    { value: '', label: t('filters.allRegions') },
    { value: 'SP', label: t('filters.southeast') },
    { value: 'RS', label: t('filters.south') },
    { value: 'BA', label: t('filters.northeast') },
    { value: 'AM', label: t('filters.north') },
    { value: 'GO', label: t('filters.midwest') }
  ]

  const statusOptions = [
    { value: '', label: t('filters.allStatus') },
    { value: 'AVAILABLE', label: t('filters.available') },
    { value: 'UNAVAILABLE', label: t('filters.unavailable') }
  ]

  const handleAddClick = () => {
    router.push('/admin/properties/new')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, region: e.target.value }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }))
  }

  return (
    <div className='bg-white rounded-2xl p-6 mb-6 border border-primary-500/5'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='relative'>
          <Icon
            name='search'
            className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600/40'
          />

          <input
            type='text'
            value={filters.search}
            onChange={handleSearchChange}
            placeholder={t('searchPlaceholder')}
            className='w-full pl-12 pr-4 py-3 rounded-xl bg-surface-200 border-none focus:ring-2 focus:ring-primary-500 text-sm font-medium'
          />
        </div>

        <Select
          options={regionOptions}
          value={filters.region}
          onChange={handleRegionChange}
          className='text-sm'
        />
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={handleStatusChange}
          className='text-sm'
        />

        <Button
          variant='primary'
          iconPosition='left'
          onClick={handleAddClick}
          icon={<Icon name='add' />}
        >
          {t('addWarehouse')}
        </Button>
      </div>
    </div>
  )
}
