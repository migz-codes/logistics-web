'use client'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import type { Warehouse } from '@/types/api'
import { DashboardHeader } from '../AdminDashboard/DashboardHeader'
import { type IFilters, PropertiesProvider } from './context'
import { InventoryFilters } from './Filters'
import { InventoryTable } from './Table'

const GET_WAREHOUSES = gql`
  query GetWarehouses($filters: WarehouseFiltersInput) {
    warehouses(filters: $filters) {
      id
      accountable_id
      company_id
      title
      description
      city
      state
      images
      area_total
      status
      price
      address
      country
      zip_code
      created_at
      updated_at
      address_complement
    }
    warehousesCount(filters: $filters)
  }
`

interface WarehousesQueryResult {
  warehouses: Warehouse[]
  warehousesCount: number
}

interface WarehouseFiltersInput {
  search?: string
  region?: string
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
