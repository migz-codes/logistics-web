'use client'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import type { IWarehouse } from '@/types/property.types'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { type IFilters, PropertiesProvider } from './context'
import { InventoryFilters } from './Filters'
import { InventoryTable } from './Table'

const GET_WAREHOUSES = gql`
  query GetWarehouses($filters: WarehouseFiltersInput) {
    warehouses(filters: $filters) {
      id
      accountable_id
      title
      description
      city
      state
      category
      area
      status
      price
      address
      zip_code
      country
      created_at
      updated_at
    }
    warehousesCount(filters: $filters)
  }
`

interface WarehousesQueryResult {
  warehouses: IWarehouse[]
  warehousesCount: number
}

interface WarehouseFiltersInput {
  search?: string
  region?: string
  category?: string
  status?: string
  skip?: number
  take?: number
}

export function Properties() {
  const t = useTranslations('inventory')
  const itemsPerPage = 10

  const [filters, setFilters] = useState<IFilters>({
    search: '',
    region: '',
    category: '',
    status: ''
  })

  const [currentPage, setCurrentPage] = useState(1)

  const queryFilters = useMemo<WarehouseFiltersInput>(() => {
    const result: WarehouseFiltersInput = {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage
    }

    if (filters.search) result.search = filters.search
    if (filters.region) result.region = filters.region
    if (filters.category) result.category = filters.category
    if (filters.status) result.status = filters.status

    return result
  }, [filters, currentPage])

  const { data, loading, error, refetch } = useQuery<WarehousesQueryResult>(GET_WAREHOUSES, {
    variables: { filters: queryFilters }
  })

  const warehouses = data?.warehouses || []
  const totalCount = data?.warehousesCount || 0

  const pagination = usePagination(totalCount, itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFiltersChange: typeof setFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const paginationWithHandlers = {
    ...pagination,
    currentPage,
    goToPage: handlePageChange,
    nextPage: () => handlePageChange(currentPage + 1),
    prevPage: () => handlePageChange(currentPage - 1)
  }

  return (
    <PropertiesProvider
      error={error?.message}
      loading={loading}
      warehouses={warehouses}
      pagination={paginationWithHandlers}
      filters={filters}
      setFilters={handleFiltersChange}
      refetch={refetch}
    >
      <DashboardHeader title={t('globalTitle')} subtitle={t('globalSubtitle')} />

      <InventoryFilters />

      <InventoryTable />
    </PropertiesProvider>
  )
}
