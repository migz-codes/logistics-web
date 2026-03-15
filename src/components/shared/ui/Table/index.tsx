'use client'

import { useTranslations } from 'next-intl'
import { Icon } from '@/components/shared/ui/Icon'
import type { TableProps } from './types'

export type { PaginationInfo, TableColumn, TableProps } from './types'

export function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyState,
  rowKey = 'id',
  className = '',
  onRowClick,
  pagination,
  onPageChange,
  translationNamespace = 'common'
}: TableProps<T>) {
  const t = useTranslations(translationNamespace)

  const getRowKey = (item: T, index: number) => {
    if (typeof rowKey === 'function') return rowKey(item, index)

    return item[rowKey] as string | number
  }

  const getPageNumbers = () => {
    if (!pagination) return []

    const { currentPage, totalPages } = pagination
    const maxVisiblePages = 5
    const pages: number[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className='py-12 text-center'>
        {emptyState || (
          <div className='flex flex-col items-center gap-3'>
            <div className='w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center'>
              <div className='w-6 h-6 bg-neutral-300 rounded' />
            </div>

            <p className='text-sm text-neutral-500'>{t('noDataAvailable')}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className={`overflow-x-auto ${className}`}>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-neutral-200'>
              {columns.map((column, index) => (
                <th
                  key={(column.key as string) || index}
                  className={`text-left py-3 px-4 text-sm font-semibold text-neutral-600 ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, itemIndex) => (
              <tr
                key={getRowKey(item, itemIndex)}
                className={`border-b border-neutral-100 hover:bg-neutral-50 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(item, itemIndex)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={(column.key as string) || colIndex}
                    className={`py-3 px-4 ${column.className || ''}`}
                  >
                    {(() => {
                      const getValue = () => {
                        if (column.value) {
                          if (typeof column.value === 'function') {
                            return column.value(item)
                          }
                          return item[column.value]
                        }
                        return item[column.key]
                      }

                      const value = getValue()

                      if (column.render) {
                        return column.render(value, item, itemIndex)
                      }

                      if (column.useDefaultStyling || typeof column.value === 'function') {
                        return <span className='text-sm text-neutral-600/80'>{value}</span>
                      }

                      return value
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages >= 1 && (
        <div className='p-4 border-t border-neutral-200 flex items-center justify-between'>
          <p className='text-sm text-neutral-600/60'>
            {t('pagination.showing', {
              from: (pagination.currentPage - 1) * pagination.itemsPerPage + 1,
              to: Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalCount),
              total: pagination.totalCount
            })}
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => onPageChange?.(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
              className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Icon name='chevron_left' size='sm' />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                type='button'
                onClick={() => onPageChange?.(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  page === pagination.currentPage
                    ? 'bg-primary-500 text-white'
                    : 'hover:bg-primary-500/10 text-neutral-600/60'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type='button'
              onClick={() =>
                onPageChange?.(Math.min(pagination.totalPages, pagination.currentPage + 1))
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Icon name='chevron_right' size='sm' />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
