import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T
  header: string
  render?: (value: any, item: T, index: number) => ReactNode
  className?: string
  useDefaultStyling?: boolean
  value?: keyof T | ((item: T) => any)
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  itemsPerPage: number
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  emptyState?: ReactNode
  rowKey?: keyof T | ((item: T, index: number) => string | number)
  className?: string
  onRowClick?: (item: T, index: number) => void
  pagination?: PaginationInfo
  onPageChange?: (page: number) => void
  translationNamespace?: string
}
