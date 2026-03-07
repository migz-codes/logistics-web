'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import type { IProperty } from '@/types/property.types'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { PropertiesProvider } from './context'
import { InventoryFilters } from './InventoryFilters'
import { InventoryTable } from './InventoryTable'

export function InventoryPage() {
  const t = useTranslations('inventory')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [totalCount, setTotalCount] = useState(0)
  const [properties, setProperties] = useState<IProperty[]>([])

  const pagination = usePagination(totalCount, 10)

  const getProperties = useCallback(async () => {
    try {
      setLoading(true)
      setError(undefined)

      // TODO: Implement fetch from custom backend API
      // Example: GET /api/properties?page=${pagination.currentPage}&limit=10
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties?skip=${pagination.startIndex}&take=10`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch properties')
      }

      const result = await response.json()
      const data = result.data || []
      const count = result.total || 0

      setTotalCount(count)

      const formattedProperties =
        data?.map((property: IProperty) => ({
          ...property,
          name: property.title,
          location: property.address || `${property.city || ''}, ${property.state || ''}`.trim(),
          region: property.state,
          area: property.area ? `${property.area} m²` : 'N/A',
          price: property.price ? `$${property.price.toLocaleString()}` : 'N/A',
          status: property.status || 'Available',
          image: property.image || '/placeholder-property.jpg'
        })) || []

      setProperties(formattedProperties)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
    }
  }, [pagination.startIndex])

  useEffect(() => {
    getProperties()
  }, [getProperties])

  return (
    <PropertiesProvider
      error={error}
      loading={loading}
      properties={properties}
      pagination={pagination}
    >
      <main className='flex-1 p-8'>
        <DashboardHeader title={t('globalTitle')} subtitle={t('globalSubtitle')} />

        <InventoryFilters />

        <InventoryTable />
      </main>
    </PropertiesProvider>
  )
}
