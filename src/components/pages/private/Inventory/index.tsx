'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { getSupabaseClient } from '@/services/supabase/client'
import type { IProperty } from '@/types/supabase.types'
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

      const supabase = getSupabaseClient()

      const { count, error: countError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      if (countError) {
        throw countError
      }

      setTotalCount(count || 0)

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pagination.startIndex, pagination.endIndex - 1)

      if (error) {
        throw error
      }

      const formattedProperties =
        data?.map((property) => ({
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
  }, [pagination.startIndex, pagination.endIndex])

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
